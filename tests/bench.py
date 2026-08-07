import copy
import os
from pathlib import Path

import numpy as np
import pandas as pd
import pytest

from traccuracy import TrackingGraph
from traccuracy.loaders import (
    load_ctc_data,
    load_tiffs,
)
from traccuracy.loaders._ctc import _check_ctc, _get_node_attributes
from traccuracy.loaders._napari import load_napari_data
from traccuracy.loaders._point import load_point_data
from traccuracy.matchers import CTCMatcher, IOUMatcher, PointMatcher, PointSegMatcher
from traccuracy.metrics import (
    BasicMetrics,
    CHOTAMetric,
    CompleteTracks,
    CompleteTracksByLength,
    CTCMetrics,
    DivisionMetrics,
    TrackOverlapMetrics,
)
from traccuracy.metrics._cca import CellCycleAccuracy

ROOT_DIR = Path(__file__).resolve().parents[1]
TIMEOUT = 300


@pytest.fixture(scope="function")
def gt_data_2d():
    path = "downloads/Fluo-N2DL-HeLa/01_GT/TRA"
    return load_ctc_data(
        os.path.join(ROOT_DIR, path),
        os.path.join(ROOT_DIR, path, "man_track.txt"),
        run_checks=False,
    )


@pytest.fixture(scope="function")
def gt_data_3d():
    path = "downloads/Fluo-N3DH-CE/01_GT/TRA"
    return load_ctc_data(
        os.path.join(ROOT_DIR, path),
        os.path.join(ROOT_DIR, path, "man_track.txt"),
        run_checks=False,
    )


@pytest.fixture(scope="function")
def pred_data_2d(gt_data_2d):
    # For now this is also GT data.
    return copy.deepcopy(gt_data_2d)


@pytest.fixture(scope="function")
def pred_data_3d(gt_data_3d):
    # For now this is also GT data.
    return copy.deepcopy(gt_data_3d)


@pytest.fixture(scope="function")
def ctc_matched_2d(gt_data_2d, pred_data_2d):
    return CTCMatcher().compute_mapping(gt_data_2d, pred_data_2d)


@pytest.fixture(scope="function")
def ctc_matched_3d(gt_data_3d, pred_data_3d):
    return CTCMatcher().compute_mapping(gt_data_3d, pred_data_3d)


@pytest.fixture(scope="function")
def iou_matched_2d(gt_data_2d, pred_data_2d):
    return IOUMatcher(iou_threshold=0.1, one_to_one=True).compute_mapping(gt_data_2d, pred_data_2d)


@pytest.fixture(scope="function")
def iou_matched_3d(gt_data_3d, pred_data_3d):
    return IOUMatcher(iou_threshold=0.1, one_to_one=True).compute_mapping(gt_data_3d, pred_data_3d)


@pytest.mark.parametrize(
    "dataset",
    ["PhC-C2DL-PSC", "Fluo-N3DH-CE"],
    ids=["2d", "3d"],
)
def test_load_gt_ctc_data(
    benchmark,
    dataset,
):
    path = f"downloads/{dataset}/01_GT/TRA"

    benchmark.pedantic(
        load_ctc_data,
        args=(
            os.path.join(ROOT_DIR, path),
            os.path.join(ROOT_DIR, path, "man_track.txt"),
        ),
        kwargs={"run_checks": False},
        rounds=1,
        iterations=1,
    )


# TODO Add 3d results
@pytest.mark.parametrize(
    "path",
    [
        "examples/sample-data/Fluo-N2DL-HeLa/01_RES",
    ],
    ids=["2d"],
)
def test_load_pred_ctc_data(benchmark, path):
    benchmark.pedantic(
        load_ctc_data,
        args=(
            os.path.join(ROOT_DIR, path),
            os.path.join(ROOT_DIR, path, "res_track.txt"),
        ),
        kwargs={"run_checks": False},
        rounds=1,
        iterations=1,
    )


def test_load_points(benchmark, tmpdir):
    nrows = 300
    df = pd.DataFrame(
        {
            "t": range(nrows),
            "x": range(nrows),
            "y": range(nrows),
            "z": range(nrows),
            "parent": range(-1, nrows - 1),
            "node_id": range(nrows),
        }
    )
    filepath = os.path.join(tmpdir, "test.csv")
    df.to_csv(filepath)
    benchmark(load_point_data, filepath)


# Match the size of the 2D CTC loader benchmark (Fluo-N2DL-HeLa 01_GT):
# ~92 frames, ~90 cells per frame -> ~8k detections.
NAPARI_N_FRAMES = 92
NAPARI_CELLS_PER_FRAME = 90


def _synthetic_napari_data():
    """Fluo-N2DL-HeLa-sized napari tracks data: one track per cell, each
    present in every frame, laid out on a grid so per-frame labels are unique.

    Returns ``(data, segmentation)``: ``data`` has columns [track_id, t, y, x]
    and ``segmentation`` is (T, Y, X) with each cell's label at its grid pixel.
    """
    n_cells = NAPARI_CELLS_PER_FRAME
    grid = int(np.ceil(np.sqrt(n_cells)))  # square-ish grid of cell positions
    ys, xs = np.divmod(np.arange(n_cells), grid)

    track_ids = np.tile(np.arange(1, n_cells + 1), NAPARI_N_FRAMES)
    times = np.repeat(np.arange(NAPARI_N_FRAMES), n_cells)
    y = np.tile(ys, NAPARI_N_FRAMES)
    x = np.tile(xs, NAPARI_N_FRAMES)
    data = np.column_stack([track_ids, times, y, x]).astype(float)

    # Each cell's label lives at its grid pixel; labels are unique within a frame.
    segmentation = np.zeros((NAPARI_N_FRAMES, grid, grid), dtype=np.uint16)
    for cell in range(n_cells):
        segmentation[:, ys[cell], xs[cell]] = cell + 1
    return data, segmentation


def test_load_napari(benchmark):
    data, _ = _synthetic_napari_data()
    benchmark(load_napari_data, data)


def test_load_napari_implicit_seg(benchmark):
    data, segmentation = _synthetic_napari_data()
    benchmark(load_napari_data, data, segmentation=segmentation)


@pytest.mark.parametrize(
    "dataset",
    ["PhC-C2DL-PSC", "Fluo-N3DH-CE"],
    ids=["2d", "3d"],
)
def test_ctc_checks(benchmark, dataset):
    path = f"downloads/{dataset}/01_GT/TRA"
    names = ["Cell_ID", "Start", "End", "Parent_ID"]
    tracks = pd.read_csv(
        os.path.join(ROOT_DIR, path, "man_track.txt"),
        header=None,
        sep=" ",
        names=names,
    )
    masks = load_tiffs(os.path.join(ROOT_DIR, path))
    detections = _get_node_attributes(masks)
    benchmark(_check_ctc, tracks, detections, masks)


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "gt_data,pred_data",
    [
        ("gt_data_2d", "pred_data_2d"),
        ("gt_data_3d", "pred_data_3d"),
    ],
    ids=["2d", "3d"],
)
def test_ctc_matcher(benchmark, gt_data, pred_data, request):
    gt_data = request.getfixturevalue(gt_data)
    pred_data = request.getfixturevalue(pred_data)
    benchmark.pedantic(
        CTCMatcher().compute_mapping,
        args=(gt_data, pred_data),
        rounds=1,
        iterations=1,
    )


@pytest.mark.parametrize(
    "ctc_matched",
    ["ctc_matched_2d", "ctc_matched_3d"],
    ids=["2d", "3d"],
)
def test_ctc_metrics(benchmark, ctc_matched, request):
    ctc_matched = request.getfixturevalue(ctc_matched)

    def run_compute():
        return CTCMetrics().compute(ctc_matched)

    benchmark.pedantic(run_compute, rounds=1, iterations=1)


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "gt_data,pred_data",
    [
        ("gt_data_2d", "pred_data_2d"),
        ("gt_data_3d", "pred_data_3d"),
    ],
    ids=["2d", "3d"],
)
def test_iou_matcher(benchmark, gt_data, pred_data, request):
    gt_data = request.getfixturevalue(gt_data)
    pred_data = request.getfixturevalue(pred_data)
    benchmark.pedantic(
        IOUMatcher(iou_threshold=0.1).compute_mapping,
        args=(gt_data, pred_data),
        rounds=1,
        iterations=1,
    )


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "gt_data,pred_data",
    [
        ("gt_data_2d", "pred_data_2d"),
        ("gt_data_3d", "pred_data_3d"),
    ],
    ids=["2d", "3d"],
)
def test_point_matcher(benchmark, gt_data, pred_data, request):
    gt_data = request.getfixturevalue(gt_data)
    pred_data = request.getfixturevalue(pred_data)
    benchmark.pedantic(
        PointMatcher(threshold=50).compute_mapping,
        args=(gt_data, pred_data),
        rounds=1,
        iterations=1,
    )


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "gt_data,pred_data",
    [
        ("gt_data_2d", "pred_data_2d"),
        ("gt_data_3d", "pred_data_3d"),
    ],
    ids=["2d", "3d"],
)
def test_point_seg_matcher(benchmark, gt_data, pred_data, request):
    gt_data = request.getfixturevalue(gt_data)
    pred_data = request.getfixturevalue(pred_data)
    # Remove segmentations from pred data
    pred_data = TrackingGraph(pred_data.graph, location_keys=gt_data.location_keys)

    benchmark.pedantic(
        PointSegMatcher().compute_mapping,
        args=(gt_data, pred_data),
        rounds=1,
        iterations=1,
    )


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "iou_matched",
    ["iou_matched_2d", "iou_matched_3d"],
    ids=["2d", "3d"],
)
def test_iou_div_metrics(benchmark, iou_matched, request):
    iou_matched = request.getfixturevalue(iou_matched)

    def run_compute():
        return DivisionMetrics().compute(iou_matched)

    benchmark.pedantic(run_compute, rounds=1, iterations=1)


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "iou_matched",
    ["iou_matched_2d", "iou_matched_3d"],
    ids=["2d", "3d"],
)
def test_basic_metrics(benchmark, iou_matched, request):
    matched = request.getfixturevalue(iou_matched)

    def run_compute():
        return BasicMetrics().compute(matched)

    benchmark.pedantic(run_compute, rounds=1, iterations=1)


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "iou_matched",
    ["iou_matched_2d", "iou_matched_3d"],
    ids=["2d", "3d"],
)
def test_overlap_metrics(benchmark, iou_matched, request):
    matched = request.getfixturevalue(iou_matched)

    def run_compute():
        return TrackOverlapMetrics().compute(matched)

    benchmark.pedantic(run_compute, rounds=1, iterations=1)


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "iou_matched",
    ["iou_matched_2d", "iou_matched_3d"],
    ids=["2d", "3d"],
)
def test_cca_metric(benchmark, iou_matched, request):
    matched = request.getfixturevalue(iou_matched)

    def run_compute():
        return CellCycleAccuracy().compute(matched)

    benchmark.pedantic(run_compute, rounds=1, iterations=1)


@pytest.mark.parametrize(
    "ctc_matched",
    ["ctc_matched_2d", "ctc_matched_3d"],
    ids=["2d", "3d"],
)
def test_chota_metric(benchmark, ctc_matched, request):
    ctc_matched = request.getfixturevalue(ctc_matched)

    def run_compute():
        return CHOTAMetric().compute(ctc_matched)

    benchmark.pedantic(run_compute, rounds=1, iterations=1)


@pytest.mark.parametrize(
    "ctc_matched",
    ["ctc_matched_2d", "ctc_matched_3d"],
    ids=["2d", "3d"],
)
def test_complete_tracks_metric(benchmark, ctc_matched, request):
    ctc_matched = request.getfixturevalue(ctc_matched)

    def run_compute():
        return CompleteTracks(error_type="ctc").compute(ctc_matched)

    benchmark.pedantic(run_compute, rounds=1, iterations=1)


@pytest.mark.timeout(TIMEOUT)
@pytest.mark.parametrize(
    "iou_matched",
    ["iou_matched_2d", "iou_matched_3d"],
    ids=["2d", "3d"],
)
def test_complete_tracks_by_length_metric(benchmark, iou_matched, request):
    matched = request.getfixturevalue(iou_matched)

    def run_compute():
        return CompleteTracksByLength(max_length=50, error_type="basic").compute(matched)

    benchmark.pedantic(run_compute, rounds=1, iterations=1)
