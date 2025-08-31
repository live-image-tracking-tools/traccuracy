import os
from pathlib import Path

import numpy as np
import pytest

from tests.test_utils import get_movie_with_graph, gt_data
from traccuracy.loaders import load_ctc_data
from traccuracy.matchers import CTCMatcher
from traccuracy.metrics import CTCMetrics

ROOT_DIR = Path(__file__).resolve().parents[2]


@pytest.fixture(scope="module")
def gt_hela():
    url = "http://data.celltrackingchallenge.net/training-datasets/Fluo-N2DL-HeLa.zip"
    path = "downloads/Fluo-N2DL-HeLa/01_GT/TRA"
    return gt_data(url, ROOT_DIR, path)


@pytest.fixture(scope="module")
def pred_hela():
    path = "examples/sample-data/Fluo-N2DL-HeLa/01_RES"
    return load_ctc_data(
        os.path.join(ROOT_DIR, path),
        os.path.join(ROOT_DIR, path, "res_track.txt"),
    )


def test_ctc_metrics(gt_hela, pred_hela):
    ctc_matched = CTCMatcher().compute_mapping(gt_hela, pred_hela)
    ctc_results = CTCMetrics().compute(ctc_matched)

    assert ctc_results.results["fn_edges"] == 87
    assert ctc_results.results["fn_nodes"] == 39
    assert ctc_results.results["fp_edges"] == 60
    assert ctc_results.results["fp_nodes"] == 0
    assert ctc_results.results["ns_nodes"] == 0
    assert ctc_results.results["ws_edges"] == 47


def test_compute_mapping():
    # Test 2d data
    n_frames = 3
    n_labels = 3
    track_graph = get_movie_with_graph(ndims=3, n_frames=n_frames, n_labels=n_labels)

    matched = CTCMatcher().compute_mapping(gt_graph=track_graph, pred_graph=track_graph)
    results = CTCMetrics()._compute(matched)
    assert results
    assert "TRA" in results
    assert "DET" in results
    assert results["TRA"] == 1
    assert results["DET"] == 1


def test_get_det():
    metrics = CTCMetrics()
    n_nodes = 100

    # "normal" case
    errors = {
        "fp_nodes": 4,  # weighted 1
        "fn_nodes": 3,  # weighted 10
        "ns_nodes": 5,  # weighted 5
        "fp_edges": 1,
        "fn_edges": 20,
        "ws_edges": 4,
    }
    weighted_sum = 1 * errors["fp_nodes"] + 10 * errors["fn_nodes"] + 5 * errors["ns_nodes"]
    det_aogm0 = n_nodes * 10
    exp_det = 1 - weighted_sum / det_aogm0
    assert metrics._get_det(errors, n_nodes) == exp_det

    # edge case (editing graph is more expensive than constructing it)
    # because of too many fp nodes
    errors["fp_nodes"] = 1000
    assert metrics._get_det(errors, n_nodes) == 0

    # edge case no node errors, only edges
    errors["fp_nodes"] = 0
    errors["fn_nodes"] = 0
    errors["ns_nodes"] = 0
    assert metrics._get_det(errors, n_nodes) == 1

    with pytest.warns(UserWarning, match="No nodes in the GT graph, cannot compute DET."):
        assert np.isnan(metrics._get_det(errors, 0))


def test_get_lnk():
    metrics = CTCMetrics()
    n_edges = 100

    # "normal" case
    errors = {
        "fp_nodes": 4,
        "fn_nodes": 3,
        "ns_nodes": 5,
        "fp_edges": 1,  # weighted 1
        "fn_edges": 20,  # weighted 1.5
        "ws_edges": 4,  # weighted 1
    }
    weighted_sum = errors["fp_edges"] + 1.5 * errors["fn_edges"] + errors["ws_edges"]
    aogma_0 = n_edges * 1.5
    exp_lnk = 1 - weighted_sum / aogma_0
    assert metrics._get_lnk(errors, n_edges) == exp_lnk

    # edge case (editing graph is more expensive than constructing it)
    errors["fn_edges"] = 50
    errors["fp_edges"] = 100
    assert metrics._get_lnk(errors, n_edges) == 0

    # edge case no edge errors, only nodes
    errors["fp_edges"] = 0
    errors["fn_edges"] = 0
    errors["ws_edges"] = 0
    assert metrics._get_lnk(errors, n_edges) == 1

    # no edges warns and returns nan
    with pytest.warns(UserWarning, match="No edges in the GT graph, cannot compute LNK."):
        assert np.isnan(metrics._get_lnk(errors, 0))


def test_get_tra():
    metrics = CTCMetrics()
    n_nodes = 100
    n_edges = 100

    # "normal" case
    errors = {
        "fp_nodes": 4,
        "fn_nodes": 3,
        "ns_nodes": 5,
        "fp_edges": 1,
        "fn_edges": 20,
        "ws_edges": 4,
    }
    weighted_sum = (
        1 * errors["fp_nodes"]
        + 10 * errors["fn_nodes"]
        + 5 * errors["ns_nodes"]
        + errors["fp_edges"]
        + 1.5 * errors["fn_edges"]
        + errors["ws_edges"]
    )
    errors["AOGM"] = weighted_sum
    aogmd_0 = n_nodes * 10
    aogma_0 = n_edges * 1.5
    exp_tra = 1 - weighted_sum / (aogmd_0 + aogma_0)
    assert metrics._get_tra(errors, n_nodes, n_edges) == exp_tra

    # edge case (editing graph is more expensive than constructing it)
    errors["AOGM"] = 1200
    assert metrics._get_tra(errors, n_nodes, n_edges) == 0

    # edge case no errors
    errors["AOGM"] = 0
    assert metrics._get_tra(errors, n_nodes, n_edges) == 1

    # edge case AOGM_0 is 0
    with pytest.warns(UserWarning, match="AOGM0 is 0"):
        assert np.isnan(metrics._get_tra(errors, 0, 0))
