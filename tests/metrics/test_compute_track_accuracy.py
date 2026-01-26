import math

import numpy as np
import pytest

import tests.examples.graphs as ex_graphs
from traccuracy.metrics._compute_track_accuracy import compute_track_accuracy
from traccuracy.track_errors._basic import classify_basic_errors
from traccuracy.track_errors._ctc import evaluate_ctc_events


def get_accuracy(result: dict, window: int) -> float:
    """Extract accuracy for a specific window size from result dict."""
    correct, total = result.get(window, (0, 0))
    if total == 0:
        return np.nan
    return correct / total


@pytest.mark.parametrize("error_type", ["basic", "ctc"])
class TestStandards:
    def add_errors(self, matched, error_type):
        if error_type == "basic":
            classify_basic_errors(matched)
        elif error_type == "ctc":
            evaluate_ctc_events(matched)
        else:
            raise ValueError(f"Error type {error_type} not recognized")

    @pytest.mark.parametrize("window", [1, 2])
    def test_empty_gt(self, error_type, window):
        matched = ex_graphs.empty_gt()
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert math.isnan(accuracy)

    @pytest.mark.parametrize("window", [1, 2])
    def test_empty_pred(self, error_type, window):
        matched = ex_graphs.empty_pred()
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == 0.0

    @pytest.mark.parametrize("window", [1, 2])
    def test_good_match(self, error_type, window):
        matched = ex_graphs.good_matched()
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        # All TP
        assert accuracy == 1.0

    @pytest.mark.parametrize(
        ("t", "window", "acc"),
        [
            (0, 1, 0.5),
            (0, 2, 0.0),
            (1, 1, 0.0),
            (1, 2, 0.0),
            (2, 1, 0.5),
            (2, 2, 0.0),
        ],
    )
    def test_fn_node(self, error_type, t, window, acc):
        matched = ex_graphs.fn_node_matched(t)
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == acc

    @pytest.mark.parametrize(
        ("edge_er", "window", "acc"),
        [
            (0, 1, 0.5),
            (0, 2, 0.0),
            (1, 1, 0.5),
            (1, 2, 0.0),
        ],
    )
    def test_fn_edge(self, error_type, edge_er, window, acc):
        matched = ex_graphs.fn_edge_matched(edge_er)
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == acc

    @pytest.mark.parametrize("t", [1, 2, 3])
    @pytest.mark.parametrize("window", [1, 2])
    def test_fp_node(self, error_type, t, window):
        matched = ex_graphs.fp_node_matched(t)
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == 1.0

    @pytest.mark.parametrize("edge_er", [0, 1])
    @pytest.mark.parametrize("window", [1, 2])
    def test_fp_edge(self, error_type, edge_er, window):
        matched = ex_graphs.fp_edge_matched(edge_er)
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == 1.0

    @pytest.mark.parametrize(("window", "acc"), [(1, 0.25), (2, 0.0)])
    def test_crossover(self, error_type, window, acc):
        matched = ex_graphs.crossover_edge()
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == acc

    @pytest.mark.parametrize(
        ("t", "window", "basic_acc", "ctc_acc"),
        [
            (0, 1, 1.0, 0.5),  # basic: all TP; ctc: 1/2 (NON_SPLIT detected)
            (0, 2, 1.0, 0.0),  # basic: all TP; ctc: 0/1
            (1, 1, 1.0, 0.0),  # basic: all TP; ctc: 0/2 (both start nodes FN)
            (1, 2, np.nan, np.nan),  # no 2-edge segments exist
            (2, 1, 1.0, 0.5),  # basic: all TP; ctc: 1/2
            (2, 2, 1.0, 0.0),  # basic: all TP; ctc: 0/1
        ],
    )
    def test_node_two_to_one(self, error_type, t, window, basic_acc, ctc_acc):
        matched = ex_graphs.node_two_to_one(t)
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        acc = ctc_acc if error_type == "ctc" else basic_acc
        if math.isnan(acc):
            assert math.isnan(accuracy)
        else:
            assert pytest.approx(accuracy, abs=0.01) == acc

    @pytest.mark.parametrize(
        ("t", "window", "acc"),
        [
            (0, 1, 0.0),
            (0, 2, 0.0),
            (1, 1, 0.0),
            (1, 2, 0.0),
        ],
    )
    def test_edge_two_to_one(self, error_type, t, window, acc):
        if error_type == "ctc":
            matched = ex_graphs.edge_two_to_one(t)
            self.add_errors(matched, error_type)
            result = compute_track_accuracy(matched, window, error_type=error_type)
            accuracy = get_accuracy(result, window)
            assert accuracy == acc

    # Skipping the following cases because they are not handled by basic or ctc errors
    # ex_graphs.node_one_to_two
    # ex_graphs.edge_one_to_two


# TODO: Skip edge tests - to be implemented once we verify basic tests pass
# @pytest.mark.parametrize("error_type", ["basic", "ctc"])
# @pytest.mark.parametrize("relax_gt_skip_edges", [False, True])
# @pytest.mark.parametrize("relax_pred_skip_edges", [False, True])
# class TestGapClose:
#     def test_fn_gap_close_edge(self, error_type):
#         matched = ex_graphs.gap_close_gt_gap()

#     def test_fp_gap_close_edge(self, error_type):
#         matched = ex_graphs.gap_close_pred_gap()

#     def test_good_gap_close_edge(self, error_type):
#         matched = ex_graphs.gap_close_matched_gap()

#     def test_gap_close_offset_edge(self, error_type):
#         matched = ex_graphs.gap_close_offset()

#     def test_gap_close_division_edges(self, error_type):
#         matched = ex_graphs.div_parent_gap()

#     def test_gap_close_daughter_edge(self, error_type):
#         matched = ex_graphs.div_daughter_gap()
