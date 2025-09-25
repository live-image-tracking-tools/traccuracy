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

expected_skip_edge_cases = [
    # matched, relax_gt, relax_pred, (total, correct, fraction)
    (ex_graphs.gap_close_gt_gap, False, False, (1, 0, 0)),
    (ex_graphs.gap_close_pred_gap, False, False, (1, 0, 0)),
    (ex_graphs.gap_close_matched_gap, False, False, (1, 1, 1)),
    (ex_graphs.gap_close_offset, False, False, (1, 0, 0)),
    (ex_graphs.gap_close_gt_gap, True, False, (1, 1, 1)),
    (ex_graphs.gap_close_pred_gap, True, False, (1, 0, 0)),
    (ex_graphs.gap_close_matched_gap, True, False, (1, 1, 1)),
    (ex_graphs.gap_close_offset, True, False, (1, 0, 0)),
    (ex_graphs.gap_close_gt_gap, False, True, (1, 0, 0)),
    (ex_graphs.gap_close_pred_gap, False, True, (1, 1, 1)),
    (ex_graphs.gap_close_matched_gap, False, True, (1, 1, 1)),
    (ex_graphs.gap_close_offset, False, True, (1, 0, 0)),
]

expected_div_cases = [
    # matched, params, (total_lin, correct_lin, frac_lin, total_tra, correct_tra, fraction_tra)
    (ex_graphs.good_div, (0, 1, 2), (1, 1, 1, 3, 3, 1)),
    (ex_graphs.fp_div, (0, 1), (2, 1, 0.5, 2, 1, 0.5)),
    (ex_graphs.one_child, (0, 1), (1, 0, 0, 3, 3, 1)),
    (ex_graphs.no_children, (0, 1), (1, 0, 0, 3, 3, 1)),
    (ex_graphs.wrong_child, (0, 1), (2, 1, 0.5, 4, 3, 0.75)),
    (ex_graphs.wrong_children, (0, 1), (1, 0, 0, 3, 1, 1 / 3)),
]

expected_div_skip_cases = [
    # matched, relax_gt, relax_pred, (total_lin, correct_lin, frac_lin,
    #                                 total_tra, correct_tra, frac_tra)
    (ex_graphs.div_daughter_gap, False, False, (1, 0, 0, 3, 2, 2 / 3)),
    (ex_graphs.div_daughter_gap, False, True, (1, 1, 1, 3, 3, 1)),
    (ex_graphs.div_daughter_gap, True, False, (1, 0, 0, 3, 2, 2 / 3)),
    (ex_graphs.div_daughter_gap, True, True, (1, 1, 1, 3, 3, 1)),
    (ex_graphs.div_daughter_dual_gap, False, False, (1, 0, 0, 3, 1, 1 / 3)),
    (ex_graphs.div_daughter_dual_gap, False, True, (1, 1, 1, 3, 3, 1)),
    (ex_graphs.div_daughter_dual_gap, True, False, (1, 0, 0, 3, 1, 1 / 3)),
    (ex_graphs.div_daughter_dual_gap, True, True, (1, 1, 1, 3, 3, 1)),
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
@pytest.mark.parametrize(
    "matched_func,relax_gt,relax_pred,expected_result", expected_skip_edge_cases
)
def test_skip_edges(matched_func, relax_gt, relax_pred, expected_result):
    # only valid on basic
    complete_tracks = CompleteTracks(error_type="basic")
    matched = matched_func()
    result = complete_tracks.compute(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
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
)
@pytest.mark.parametrize("error_type", ["basic", "ctc"])
@pytest.mark.parametrize("matched_func,params,expected_result", expected_div_cases)
def test_div_examples(error_type, matched_func, params, expected_result):
    complete_tracks = CompleteTracks(error_type=error_type)
    for param in params:
        matched = matched_func(param)
        result = complete_tracks.compute(matched)
        total_lin, correct_lin, fraction_lin, total_tra, correct_tra, fraction_tra = expected_result

        assert result.results["total_tracklets"] == total_tra
        assert result.results["correct_tracklets"] == correct_tra
        if fraction_tra is np.nan:
            assert result.results["complete_tracklets"] is np.nan
        else:
            assert result.results["complete_tracklets"] == fraction_tra

        assert result.results["total_lineages"] == total_lin
        assert result.results["correct_lineages"] == correct_lin
        if fraction_lin is np.nan:
            assert result.results["complete_lineages"] is np.nan
        else:
            assert result.results["complete_lineages"] == fraction_lin


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
@pytest.mark.parametrize("error_type", ["basic"])  # can't relax skips for ctc
@pytest.mark.parametrize(
    "matched_func,relax_gt,relax_pred,expected_result", expected_div_skip_cases
)
def test_div_skip_examples(error_type, matched_func, relax_gt, relax_pred, expected_result):
    complete_tracks = CompleteTracks(error_type=error_type)
    matched = matched_func()
    result = complete_tracks.compute(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
    total_lin, correct_lin, fraction_lin, total_tra, correct_tra, fraction_tra = expected_result

    assert result.results["total_tracklets"] == total_tra
    assert result.results["correct_tracklets"] == correct_tra
    if fraction_tra is np.nan:
        assert result.results["complete_tracklets"] is np.nan
    else:
        assert result.results["complete_tracklets"] == fraction_tra

    assert result.results["total_lineages"] == total_lin
    assert result.results["correct_lineages"] == correct_lin
    if fraction_lin is np.nan:
        assert result.results["complete_lineages"] is np.nan
    else:
        assert result.results["complete_lineages"] == fraction_lin


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


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
def test_invalid_input():
    with pytest.raises(ValueError, match="Unrecognized error type"):
        CompleteTracks(error_type="abcdefg")

    ct = CompleteTracks(error_type="ctc")
    matched = ex_graphs.empty_gt()
    with pytest.warns(UserWarning, match="CTC metrics do not support relaxing skip edges"):
        ct.compute(matched, relax_skips_gt=True)
