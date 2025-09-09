import numpy as np
import pytest

import tests.examples.graphs as ex_graphs
from tests.examples.larger_examples import larger_example_1
from traccuracy.metrics._complete_tracks import CompleteTracks

expected_results_one_to_one_single = [
    # (matched, (total tracklets/lineages, correct tracklets/lineages, fraction))
    (ex_graphs.empty_gt, (0, 0, np.nan)),
    (ex_graphs.empty_pred, (1, 0, 0)),
    (ex_graphs.good_matched, (1, 1, 1)),
    (ex_graphs.crossover_edge, (2, 0, 0)),
]

expected_results_one_to_one_multi = [
    (ex_graphs.fn_node_matched, (1, 0, 0)),
    (ex_graphs.fn_edge_matched, (1, 0, 0)),
    (ex_graphs.fp_node_matched, (1, 1, 1)),
    (ex_graphs.fp_edge_matched, (1, 1, 1)),
]

# only for CTC errors
expected_results_two_to_one = [
    (ex_graphs.node_two_to_one, (2, 0, 0)),
    (ex_graphs.edge_two_to_one, (2, 0, 0)),
]

expected_skip_edge_cases_no_relax = [
    (ex_graphs.gap_close_gt_gap, (1, 0, 0)),
    (ex_graphs.gap_close_pred_gap, (1, 0, 0)),
    (ex_graphs.gap_close_matched_gap, (1, 1, 1)),
    (ex_graphs.gap_close_offset, (1, 0, 0)),
]

expected_skip_edge_cases_relax_gt = [
    (ex_graphs.gap_close_gt_gap, (1, 1, 1)),
    (ex_graphs.gap_close_pred_gap, (1, 0, 0)),
    (ex_graphs.gap_close_matched_gap, (1, 1, 1)),
    (ex_graphs.gap_close_offset, (1, 0, 0)),
]

expected_skip_edge_cases_relax_pred = [
    (ex_graphs.gap_close_gt_gap, (1, 0, 0)),
    (ex_graphs.gap_close_pred_gap, (1, 1, 1)),
    (ex_graphs.gap_close_matched_gap, (1, 1, 1)),
    (ex_graphs.gap_close_offset, (1, 0, 0)),
]


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
@pytest.mark.parametrize("error_type", ["basic", "ctc"])
@pytest.mark.parametrize("matched_func,expected_result", expected_results_one_to_one_single)
def test_one_to_one_single(error_type, matched_func, expected_result):
    complete_tracks = CompleteTracks(error_type=error_type)
    matched = matched_func()
    result = complete_tracks.compute(matched)
    total, correct, fraction = expected_result
    assert result.results["total_tracklets"] == total
    assert result.results["correct_tracklets"] == correct
    if fraction is np.nan:
        assert result.results["complete_tracklets"] is np.nan
    else:
        assert result.results["complete_tracklets"] == fraction


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
    "ignore:Division annotations already present",
)
@pytest.mark.parametrize("error_type", ["basic", "ctc"])
@pytest.mark.parametrize("matched_func,expected_result", expected_results_one_to_one_multi)
def test_one_to_one_multi(error_type, matched_func, expected_result):
    complete_tracks = CompleteTracks(error_type=error_type)
    for i in range(3):
        if "edge" in matched_func.__name__ and i == 2:
            continue
        matched = matched_func(i)
        result = complete_tracks.compute(matched)
        assert result.results["total_tracklets"] == expected_result[0]
        assert result.results["correct_tracklets"] == expected_result[1]
        if expected_result[2] is np.nan:
            assert result.results["complete_tracklets"] is np.nan
        else:
            assert result.results["complete_tracklets"] == expected_result[2]


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
@pytest.mark.parametrize("matched_func,expected_result", expected_results_two_to_one)
def test_two_to_one(matched_func, expected_result):
    complete_tracks = CompleteTracks(error_type="ctc")
    for i in range(3):
        if "edge" in matched_func.__name__ and i == 2:
            continue
        matched = matched_func(i)
        result = complete_tracks.compute(matched)
        assert result.results["total_tracklets"] == expected_result[0]
        assert result.results["correct_tracklets"] == expected_result[1]
        if expected_result[2] is np.nan:
            assert result.results["complete_tracklets"] is np.nan
        else:
            assert result.results["complete_tracklets"] == expected_result[2]


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
@pytest.mark.parametrize("matched_func,expected_result", expected_skip_edge_cases_no_relax)
def test_skip_edges(matched_func, expected_result):
    # only valid on basic
    complete_tracks = CompleteTracks(error_type="basic")
    matched = matched_func()
    result = complete_tracks.compute(matched)
    assert result.results["total_tracklets"] == expected_result[0]
    assert result.results["correct_tracklets"] == expected_result[1]
    if expected_result[2] is np.nan:
        assert result.results["complete_tracklets"] is np.nan
    else:
        assert result.results["complete_tracklets"] == expected_result[2]


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
@pytest.mark.parametrize("matched_func,expected_result", expected_skip_edge_cases_relax_gt)
def test_skip_edges_relax_gt(matched_func, expected_result):
    # only valid on basic
    complete_tracks = CompleteTracks(error_type="basic")
    matched = matched_func()
    result = complete_tracks.compute(matched, relax_skips_gt=True)
    assert result.results["total_tracklets"] == expected_result[0]
    assert result.results["correct_tracklets"] == expected_result[1]
    if expected_result[2] is np.nan:
        assert result.results["complete_tracklets"] is np.nan
    else:
        assert result.results["complete_tracklets"] == expected_result[2]


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
@pytest.mark.parametrize("matched_func,expected_result", expected_skip_edge_cases_relax_pred)
def test_skip_edges_relax_pred(matched_func, expected_result):
    # only valid on basic
    complete_tracks = CompleteTracks(error_type="basic")
    matched = matched_func()
    result = complete_tracks.compute(matched, relax_skips_pred=True)
    assert result.results["total_tracklets"] == expected_result[0]
    assert result.results["correct_tracklets"] == expected_result[1]
    if expected_result[2] is np.nan:
        assert result.results["complete_tracklets"] is np.nan
    else:
        assert result.results["complete_tracklets"] == expected_result[2]


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
@pytest.mark.parametrize("error_type", ["basic", "ctc"])
def test_larger_example(error_type):
    larger_example = larger_example_1()
    complete_tracks = CompleteTracks(error_type=error_type)

    result = complete_tracks.compute(larger_example)
    total_tracklets, correct_tracklets, complete_tracklets = (10, 6, 0.6)
    assert result.results["total_tracklets"] == total_tracklets
    assert result.results["correct_tracklets"] == correct_tracklets
    assert result.results["complete_tracklets"] == complete_tracklets

    total_lineages, correct_lineages, complete_lineages = (4, 2, 0.5)
    assert result.results["total_lineages"] == total_lineages
    assert result.results["correct_lineages"] == correct_lineages
    assert result.results["complete_lineages"] == complete_lineages
