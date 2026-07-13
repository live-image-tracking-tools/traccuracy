"""Tests for the sparse-ground-truth tracking metrics (SparseTrackingMetrics).

The frozen counts in ``SANDBOX_EXPECTED`` and the exact edge-Jaccard fractions in the
unit tests are ported verbatim from the reference implementation in the royerlab
cell-tracking-competition
(https://github.com/royerlab/kaggle-cell-tracking-competition), so this suite is a
parity check that the traccuracy port reproduces the competition metric exactly.
"""

from __future__ import annotations

import json
import math
from pathlib import Path

import networkx as nx
import pytest

from traccuracy import TrackingGraph, run_metrics
from traccuracy.matchers import PointMatcher
from traccuracy.matchers._matched import Matched
from traccuracy.metrics import (
    BasicMetrics,
    CompleteTracks,
    CompleteTracksByLength,
    CTCMetrics,
    DivisionMetrics,
    SparseTrackingMetrics,
)

SANDBOX_DIR = Path(__file__).resolve().parents[1] / "examples" / "sparse_sandbox"

# (edge_tp, edge_fp, edge_fn, division_tp, division_fp, division_fn), copied verbatim
# from the competition's tests/test_division_sandbox_examples.py::EXPECTED.
SANDBOX_EXPECTED: dict[str, tuple[int, int, int, int, int, int]] = {
    "3_division": (2, 2, 0, 0, 1, 0),
    "edges_wrong_division_ok": (0, 5, 8, 1, 0, 1),
    "complex": (2, 2, 8, 1, 0, 0),
    "complex2": (4, 4, 6, 1, 0, 0),
    "division": (4, 1, 3, 1, 1, 1),
    "division_at_end": (5, 0, 1, 1, 0, 0),
    "division_node_stage": (3, 3, 1, 1, 1, 0),
    "division_test": (4, 2, 2, 1, 0, 0),
    "duplicated_division": (0, 8, 5, 1, 0, 0),
    "late_division": (2, 3, 4, 1, 0, 0),
    "merge_delay": (3, 2, 2, 1, 0, 0),
    "node_conflict": (3, 2, 4, 1, 0, 0),
    "simple": (2, 2, 4, 0, 0, 0),
    "successive_div": (3, 2, 3, 1, 0, 1),
}


def _build(nodes: dict, edges: list[tuple]) -> TrackingGraph:
    """Build a TrackingGraph from a ``{name: {t, z, y, x}}`` dict and ``[(src, tgt)]`` list.

    Node names must be non-negative integers (traccuracy requires integer node ids).
    """
    graph = nx.DiGraph()
    for name, attrs in nodes.items():
        graph.add_node(name, **attrs)
    graph.add_edges_from(edges)
    return TrackingGraph(graph, frame_key="t", label_key=None, location_keys=("z", "y", "x"))


def _tg_from_sandbox(section: dict) -> TrackingGraph:
    """Build a TrackingGraph from a sandbox JSON section (nodes carry y only; z=x=0)."""
    graph = nx.DiGraph()
    for node in section["nodes"]:
        graph.add_node(int(node["uid"]), t=int(node["t"]), z=0.0, y=float(node["y"]), x=0.0)
    for edge in section["edges"]:
        graph.add_edge(int(edge["source"]), int(edge["target"]))
    return TrackingGraph(graph, frame_key="t", label_key=None, location_keys=("z", "y", "x"))


def _counts(pred: TrackingGraph, gt: TrackingGraph, max_distance: float = 7.0) -> tuple:
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=max_distance), [SparseTrackingMetrics()]
    )
    r = results[0]["results"]
    return (
        r["edge_tp"],
        r["edge_fp"],
        r["edge_fn"],
        r["division_tp"],
        r["division_fp"],
        r["division_fn"],
    )


def _edge_jaccard(pred: TrackingGraph, gt: TrackingGraph, max_distance: float = 7.0) -> float:
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=max_distance), [SparseTrackingMetrics()]
    )
    return results[0]["results"]["edge_jaccard"]


# ---------------------------------------------------------------------------
# Parity: frozen sandbox counts (edge + division TP/FP/FN)
# ---------------------------------------------------------------------------


def test_all_sandbox_examples_present() -> None:
    on_disk = {p.stem for p in SANDBOX_DIR.glob("*.json")}
    assert on_disk == set(SANDBOX_EXPECTED)


@pytest.mark.parametrize("name", sorted(SANDBOX_EXPECTED))
def test_sandbox_parity(name: str) -> None:
    data = json.loads((SANDBOX_DIR / f"{name}.json").read_text())
    gt = _tg_from_sandbox(data["gt"])
    pred = _tg_from_sandbox(data["pred"])
    max_distance = data.get("max_distance", 7.0)
    assert _counts(pred, gt, max_distance) == SANDBOX_EXPECTED[name]


# ---------------------------------------------------------------------------
# Edge-Jaccard unit tests, ported from the competition test_metrics.py.
# Every position is on the z=y=x axes; distances are Euclidean.
# ---------------------------------------------------------------------------


def _line(n: int) -> dict:
    return {i: {"t": i, "z": 0.0, "y": 0.0, "x": float(i)} for i in range(n)}


def test_perfect_prediction_scores_one() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    assert _edge_jaccard(pred, gt, 0.5) == pytest.approx(1.0)


def test_extra_edge_at_track_end_not_penalized() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(4), [(0, 1), (1, 2), (2, 3)])
    assert _edge_jaccard(pred, gt, 0.5) == pytest.approx(1.0)


def test_extra_edge_at_track_start_not_penalized() -> None:
    gt_nodes = {i: {"t": i, "z": 0.0, "y": 0.0, "x": float(i)} for i in range(1, 4)}
    gt = _build(gt_nodes, [(1, 2), (2, 3)])
    pred = _build(_line(4), [(0, 1), (1, 2), (2, 3)])
    assert _edge_jaccard(pred, gt, 0.5) == pytest.approx(1.0)


def test_spurious_edge_to_gt_interior_is_penalized() -> None:
    # GT: A(0) -> B(1) -> C(2); D is a far background node at t=1.
    base = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},  # A start
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},  # B interior
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},  # C end
    }
    d = {3: {"t": 1, "z": 100.0, "y": 100.0, "x": 100.0}}
    perfect = 2 / 3  # 2 / (2 + 1 FP)

    def pred(extra):
        return _build({**base, **d}, [(0, 1), (1, 2), extra])

    def gt():
        return _build(dict(base), [(0, 1), (1, 2)])

    assert _edge_jaccard(pred((3, 0)), gt(), 5.0) == pytest.approx(1.0)  # D->A (A in_deg 0)
    assert _edge_jaccard(pred((3, 1)), gt(), 5.0) == pytest.approx(perfect)  # D->B penalized
    assert _edge_jaccard(pred((3, 2)), gt(), 5.0) == pytest.approx(perfect)  # D->C penalized
    assert _edge_jaccard(pred((0, 3)), gt(), 5.0) == pytest.approx(perfect)  # A->D penalized
    assert _edge_jaccard(pred((1, 3)), gt(), 5.0) == pytest.approx(perfect)  # B->D penalized
    assert _edge_jaccard(pred((2, 3)), gt(), 5.0) == pytest.approx(1.0)  # C->D (C out_deg 0)


def test_missing_division_child_penalized() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 10.0, "x": 0.0},
        2: {"t": 1, "z": 0.0, "y": -10.0, "x": 0.0},
    }
    gt = _build(nodes, [(0, 1), (0, 2)])
    pred = _build(nodes, [(0, 1)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1 / 2)


def test_division_spurious_child_penalized() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 10.0, "x": 0.0},
        3: {"t": 2, "z": 0.0, "y": -10.0, "x": 0.0},
    }
    gt_edges = [(0, 1), (1, 2), (1, 3)]
    gt = _build(nodes, gt_edges)
    pred_nodes = {**nodes, 4: {"t": 2, "z": 100.0, "y": 100.0, "x": 100.0}}
    pred = _build(pred_nodes, [*gt_edges, (1, 4)])
    assert _edge_jaccard(pred, gt, 5.0) == pytest.approx(3 / 4)


def test_cross_track_interior_edge_penalized() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
        3: {"t": 0, "z": 0.0, "y": 50.0, "x": 0.0},
        4: {"t": 1, "z": 0.0, "y": 50.0, "x": 0.0},
        5: {"t": 2, "z": 0.0, "y": 50.0, "x": 0.0},
    }
    gt_edges = [(0, 1), (1, 2), (3, 4), (4, 5)]
    gt = _build(nodes, gt_edges)
    pred = _build(nodes, [*gt_edges, (1, 4)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(4 / 5)


def test_reparenting_node_penalized() -> None:
    gt = _build(
        {
            0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
            1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
            2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
        },
        [(0, 1), (1, 2)],
    )
    pred = _build(
        {
            3: {"t": 0, "z": 100.0, "y": 100.0, "x": 100.0},
            1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
            2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
        },
        [(3, 1), (1, 2)],
    )
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1 / 3)


def test_self_loops_on_interior_nodes_penalized() -> None:
    nodes = _line(5)
    gt_edges = [(i, i + 1) for i in range(4)]
    gt = _build(nodes, gt_edges)
    pred = _build(nodes, [*gt_edges, (1, 1), (2, 2), (3, 3)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(4 / 7)


def test_reverse_edge_at_boundary_invisible() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(nodes, [(0, 1)])
    pred = _build(nodes, [(0, 1), (1, 0)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1.0)


def test_dense_bipartite_cross_edges_penalized() -> None:
    nodes = {}
    for i in range(3):
        nodes[i] = {"t": 0, "z": 0.0, "y": float(i * 50), "x": 0.0}
        nodes[i + 3] = {"t": 1, "z": 0.0, "y": float(i * 50), "x": 0.0}
    gt = _build(nodes, [(i, i + 3) for i in range(3)])
    pred = _build(nodes, [(i, j + 3) for i in range(3) for j in range(3)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1 / 3)


def test_skip_connection_scores_zero() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 2)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(0.0)


def test_false_merge_into_interior_penalized() -> None:
    gt_nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(gt_nodes, [(0, 1), (1, 2)])
    pred = _build(
        {**gt_nodes, 3: {"t": 0, "z": 100.0, "y": 100.0, "x": 100.0}},
        [(0, 1), (1, 2), (3, 1)],
    )
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(2 / 3)


def test_false_merge_into_track_start_invisible() -> None:
    gt_nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(gt_nodes, [(0, 1), (1, 2)])
    pred = _build(
        {**gt_nodes, 3: {"t": 0, "z": 100.0, "y": 100.0, "x": 100.0}},
        [(0, 1), (1, 2), (3, 0)],
    )
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1.0)


def test_score_asymmetric_big_pred_vs_small_gt() -> None:
    small = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    big = {**small, 2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0}}
    assert _edge_jaccard(
        _build(big, [(0, 1), (1, 2)]), _build(small, [(0, 1)]), 1.0
    ) == pytest.approx(1.0)
    assert _edge_jaccard(
        _build(small, [(0, 1)]), _build(big, [(0, 1), (1, 2)]), 1.0
    ) == pytest.approx(0.5)


def test_unmatched_noise_edges_invisible() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(nodes, [(0, 1), (1, 2)])
    pred_nodes = dict(nodes)
    for i in range(20):
        pred_nodes[10 + i] = {"t": i % 3, "z": 500.0 + i, "y": 500.0 + i, "x": 500.0 + i}
    noise = [(10 + i, 10 + i + 1) for i in range(19)]
    pred = _build(pred_nodes, [(0, 1), (1, 2), *noise])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1.0)


def test_distance_threshold_inclusive() -> None:
    def two(y: float) -> dict:
        return {0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0}, 1: {"t": 1, "z": 0.0, "y": y, "x": 0.0}}

    gt = _build(two(0.0), [(0, 1)])
    assert _edge_jaccard(_build(two(14.0), [(0, 1)]), gt, 15.0) == pytest.approx(1.0)
    assert _edge_jaccard(_build(two(16.0), [(0, 1)]), gt, 15.0) == pytest.approx(0.0)


# ---------------------------------------------------------------------------
# Derived outputs: node recall, adjusted Jaccard, combined score.
# ---------------------------------------------------------------------------


def test_node_recall_and_num_pred_nodes() -> None:
    data = json.loads((SANDBOX_DIR / "simple.json").read_text())
    gt = _tg_from_sandbox(data["gt"])
    pred = _tg_from_sandbox(data["pred"])
    results, _ = run_metrics(gt, pred, PointMatcher(threshold=7.0), [SparseTrackingMetrics()])
    r = results[0]["results"]
    assert r["num_pred_nodes"] == pred.graph.number_of_nodes()
    assert 0.0 <= r["node_recall"] <= 1.0


def test_adjusted_jaccard_nan_without_estimate() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    results, _ = run_metrics(gt, pred, PointMatcher(threshold=0.5), [SparseTrackingMetrics()])
    r = results[0]["results"]
    assert math.isnan(r["total_node_ratio"])
    assert math.isnan(r["adj_edge_jaccard"])
    assert math.isnan(r["score"])
    assert r["edge_jaccard"] == pytest.approx(1.0)


def test_adjusted_jaccard_penalizes_excess_nodes() -> None:
    # Perfect edges (jaccard 1.0), but 3 predicted nodes vs an estimate of 2 true nodes.
    gt = _build(_line(2), [(0, 1)])
    pred = _build(_line(3), [(0, 1), (1, 2)])  # extra node 2, edge (1,2) invisible -> jaccard 1.0
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=0.5), [SparseTrackingMetrics(n_gt_nodes=2)]
    )
    r = results[0]["results"]
    assert r["edge_jaccard"] == pytest.approx(1.0)
    assert r["total_node_ratio"] == pytest.approx((3 - 2) / 2)
    # adj = 1.0 * (1 - 0.1 * 0.5) = 0.95
    assert r["adj_edge_jaccard"] == pytest.approx(0.95)
    assert r["score"] == pytest.approx(0.95)  # no divisions -> division term dropped


def test_score_includes_division_term() -> None:
    data = json.loads((SANDBOX_DIR / "division.json").read_text())
    gt = _tg_from_sandbox(data["gt"])
    pred = _tg_from_sandbox(data["pred"])
    n_pred = pred.graph.number_of_nodes()
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=7.0), [SparseTrackingMetrics(n_gt_nodes=n_pred)]
    )
    r = results[0]["results"]
    # total_node_ratio == 0 -> adj == edge_jaccard; score = adj + 0.1 * division_jaccard
    assert r["adj_edge_jaccard"] == pytest.approx(r["edge_jaccard"])
    assert r["score"] == pytest.approx(r["adj_edge_jaccard"] + 0.1 * r["division_jaccard"])


def test_empty_prediction_scores_zero_edges() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    empty = TrackingGraph(
        nx.DiGraph(), frame_key="t", label_key=None, location_keys=("z", "y", "x")
    )
    results, _ = run_metrics(gt, empty, PointMatcher(threshold=1.0), [SparseTrackingMetrics()])
    r = results[0]["results"]
    assert (r["edge_tp"], r["edge_fp"], r["edge_fn"]) == (0, 0, 2)
    assert r["edge_jaccard"] == pytest.approx(0.0)


def test_relax_skips_warns_and_is_ignored() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    matched = PointMatcher(threshold=0.5).compute_mapping(gt, pred)
    with pytest.warns(UserWarning, match="does not support relaxing skip edges"):
        SparseTrackingMetrics()._compute(matched, relax_skips_gt=True)


def test_requires_point_matcher() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    mapping = [(0, 0), (1, 1), (2, 2)]
    matched = Matched(gt, pred, mapping, {"name": "DummyMatcher", "matching type": "one-to-one"})
    with pytest.raises(TypeError, match="requires a PointMatcher"):
        SparseTrackingMetrics()._compute(matched)


# ---------------------------------------------------------------------------
# Dense/sparse capability marker.
# ---------------------------------------------------------------------------


def test_sparse_metric_marker() -> None:
    assert SparseTrackingMetrics.supports_sparse_gt is True
    assert SparseTrackingMetrics().supports_sparse_gt is True


@pytest.mark.parametrize(
    ("metric", "expected"),
    [
        (BasicMetrics(), False),
        (CTCMetrics(), False),
        (DivisionMetrics(), False),
        (CompleteTracks(), True),
        (CompleteTracksByLength(), True),
        (SparseTrackingMetrics(), True),
    ],
)
def test_supports_sparse_gt_values(metric, expected) -> None:
    assert metric.supports_sparse_gt is expected


def test_marker_surfaces_in_results() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    results, _ = run_metrics(gt, pred, PointMatcher(threshold=0.5), [SparseTrackingMetrics()])
    assert results[0]["metric"]["supports_sparse_gt"] is True


def test_dense_marker_surfaces_in_results() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    matched = PointMatcher(threshold=0.5).compute_mapping(gt, pred)
    result = BasicMetrics().compute(matched)
    assert result.to_dict()["metric"]["supports_sparse_gt"] is False
