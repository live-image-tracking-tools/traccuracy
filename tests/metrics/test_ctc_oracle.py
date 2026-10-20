"""Equivalence tests of CTCMetrics against the official CTC evaluation software."""

from __future__ import annotations

import os
import platform
import re
import shutil
import stat
import subprocess
from dataclasses import dataclass
from pathlib import Path

import pytest

from tests.test_utils import download_gt_data
from traccuracy.loaders import load_ctc_data
from traccuracy.matchers import CTCMatcher
from traccuracy.metrics import CTCMetrics

ROOT_DIR = Path(__file__).resolve().parents[2]
DOWNLOADS = ROOT_DIR / "downloads"
EVALUATION_SOFTWARE_URL = "https://public.celltrackingchallenge.net/software/EvaluationSoftware.zip"

LOG_SECTIONS = {
    "Splitting Operations": "ns_nodes",
    "False Negative Vertices": "fn_nodes",
    "False Positive Vertices": "fp_nodes",
    "Redundant Edges To Be Deleted": "fp_edges",
    "Edges To Be Added": "fn_edges",
    "Edges with Wrong Semantics": "ws_edges",
}
WEIGHTS = {
    "ns_nodes": 5,
    "fn_nodes": 10,
    "fp_nodes": 1,
    "fp_edges": 1,
    "fn_edges": 1.5,
    "ws_edges": 1,
}


@dataclass
class KnownDiff:
    offset: int
    reason: str


@dataclass
class OracleCase:
    name: str
    data_url: str
    gt_dir: Path
    res_dir: Path
    sequence: str
    known_diffs: dict[str, KnownDiff]


NS_DIFF = (
    "ns_nodes counts non-split pred nodes, but the CTC counts one split operation per extra "
    "GT node covered by a pred node"
)
WS_DIFF = (
    "the CTC treats every parent-child link (track label change) as an inter-track edge, "
    "but traccuracy only considers edges out of divisions and into merges"
)

CASES = [
    OracleCase(
        name="testing_dataset-03",
        data_url=EVALUATION_SOFTWARE_URL,
        gt_dir=DOWNLOADS / "testing_dataset/03_GT",
        res_dir=DOWNLOADS / "testing_dataset/03_RES",
        sequence="03",
        # pred label 8 at t=4 covers 3 GT cells
        known_diffs={"ns_nodes": KnownDiff(-1, NS_DIFF)},
    ),
    OracleCase(
        name="Fluo-N2DL-HeLa-01",
        data_url="http://data.celltrackingchallenge.net/training-datasets/Fluo-N2DL-HeLa.zip",
        gt_dir=DOWNLOADS / "Fluo-N2DL-HeLa/01_GT",
        res_dir=ROOT_DIR / "examples/sample-data/Fluo-N2DL-HeLa/01_RES",
        sequence="01",
        # 5 single-daughter parent links in RES are missed,
        # and 1 RES single-daughter link matching a GT division is flagged
        known_diffs={"ws_edges": KnownDiff(-4, WS_DIFF)},
    ),
]
RESULT_KEYS = [*WEIGHTS, "AOGM", "TRA", "DET"]


def _aogm(counts: dict[str, float], keys=WEIGHTS) -> float:
    return sum(WEIGHTS[k] * counts[k] for k in keys)


def _scores(counts: dict[str, float], n_nodes: int, n_edges: int) -> dict[str, float]:
    """AOGM, TRA and DET as defined by the CTC, from the error counts and GT size"""
    aogm = _aogm(counts)
    aogm_0 = 10 * n_nodes + 1.5 * n_edges
    aogm_d = _aogm(counts, ["ns_nodes", "fn_nodes", "fp_nodes"])
    aogm_d0 = 10 * n_nodes
    return {
        "AOGM": aogm,
        "TRA": 1 - min(aogm, aogm_0) / aogm_0,
        "DET": 1 - min(aogm_d, aogm_d0) / aogm_d0,
    }


@pytest.fixture(scope="module")
def ctc_binaries(tmp_path_factory) -> Path:
    if env := os.environ.get("CTC_EVALUATION_SOFTWARE"):
        src = Path(env)
    else:
        download_gt_data(EVALUATION_SOFTWARE_URL, ROOT_DIR)
        platform_dir = {"Linux": "Linux", "Darwin": "Mac", "Windows": "Win"}.get(platform.system())
        if platform_dir is None:
            pytest.skip(f"No CTC evaluation software for {platform.system()}")
        src = DOWNLOADS / platform_dir
    suffix = ".exe" if platform.system() == "Windows" else ""
    if not (src / f"TRAMeasure{suffix}").exists():
        raise FileNotFoundError(f"CTC evaluation software not found in {src}")
    dst = tmp_path_factory.mktemp("ctc_bin")
    for f in src.iterdir():
        shutil.copyfile(f, dst / f.name)
        (dst / f.name).chmod((dst / f.name).stat().st_mode | stat.S_IXUSR)
    return dst


def _run_measure(binary: Path, dataset: Path, sequence: str) -> float:
    proc = subprocess.run(
        [str(binary), str(dataset), sequence, "3"],
        capture_output=True,
        text=True,
        timeout=600,
        check=False,
        # The static Linux binaries (glibc 2.27) segfault in a UTF-8 locale when iconv
        # dlopens system gconv modules that use DT_RELR relocations (e.g. Ubuntu 26.04)
        env={**os.environ, "LC_ALL": "C"},
    )
    match = re.search(r"(TRA|DET) measure: ([\d.]+)", proc.stdout)
    if match is None:
        raise RuntimeError(
            f"{binary.name} failed with exit code {proc.returncode}:\n{proc.stdout}\n{proc.stderr}"
        )
    return float(match.group(2))


def _parse_tra_log(log: Path) -> dict[str, int]:
    counts: dict[str, int] = {}
    key = None
    for line in log.read_text().splitlines():
        if line.startswith("-----"):
            header = line.strip("-").split(" (Penalty")[0]
            key = LOG_SECTIONS[header]
            counts[key] = 0
        elif line.startswith("====="):
            key = None
        elif key is not None and line.strip():
            counts[key] += 1
    assert set(counts) == set(LOG_SECTIONS.values()), f"Unexpected log format in {log}"
    return counts


@pytest.fixture(scope="module", params=CASES, ids=lambda c: c.name)
def oracle_case(request, ctc_binaries, tmp_path_factory):
    case: OracleCase = request.param
    download_gt_data(case.data_url, ROOT_DIR)
    dataset = tmp_path_factory.mktemp(case.name)
    shutil.copytree(case.gt_dir / "TRA", dataset / f"{case.sequence}_GT/TRA")
    res_dir = dataset / f"{case.sequence}_RES"
    res_dir.mkdir()
    for f in case.res_dir.iterdir():
        shutil.copyfile(f, res_dir / f.name)

    suffix = ".exe" if platform.system() == "Windows" else ""
    oracle: dict[str, float] = {}
    oracle["TRA"] = _run_measure(ctc_binaries / f"TRAMeasure{suffix}", dataset, case.sequence)
    oracle["DET"] = _run_measure(ctc_binaries / f"DETMeasure{suffix}", dataset, case.sequence)
    oracle.update(_parse_tra_log(res_dir / "TRA_log.txt"))

    gt_data = load_ctc_data(str(case.gt_dir / "TRA"), run_checks=False)
    pred_data = load_ctc_data(str(case.res_dir), run_checks=False)
    matched = CTCMatcher().compute_mapping(gt_data, pred_data)
    actual = CTCMetrics().compute(matched).results

    return case, oracle, actual, gt_data.graph.number_of_nodes(), gt_data.graph.number_of_edges()


def test_oracle_scores_follow_from_error_counts(oracle_case):
    _, oracle, _, n_nodes, n_edges = oracle_case
    scores = _scores(oracle, n_nodes, n_edges)
    # the CLI prints 6 decimals
    assert oracle["TRA"] == pytest.approx(scores["TRA"], abs=1e-6)
    assert oracle["DET"] == pytest.approx(scores["DET"], abs=1e-6)


@pytest.mark.parametrize("key", RESULT_KEYS)
def test_ctc_metrics_match_oracle(oracle_case, key):
    case, oracle, actual, n_nodes, n_edges = oracle_case
    # shift the oracle counts by the known differences
    unshifted = {k: oracle[k] for k in WEIGHTS}
    unshifted.update(_scores(unshifted, n_nodes, n_edges))
    expected = {k: oracle[k] + (d.offset if (d := case.known_diffs.get(k)) else 0) for k in WEIGHTS}
    expected.update(_scores(expected, n_nodes, n_edges))

    reasons = "; ".join(
        f"known difference in {k} ({d.offset:+d}): {d.reason}" for k, d in case.known_diffs.items()
    )
    assert actual[key] == pytest.approx(expected[key], abs=1e-9), (
        f"{reasons}. Update it if this was fixed."
    )
    if expected[key] != unshifted[key]:
        pytest.xfail(reasons)
