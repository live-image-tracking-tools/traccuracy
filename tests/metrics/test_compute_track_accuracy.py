import numpy as np
import pytest

import tests.examples.graphs as ex_graphs
from traccuracy.metrics._compute_track_accuracy import compute_track_accuracy
from traccuracy.track_errors._ctc import evaluate_ctc_events
from traccuracy.track_errors.basic import _classify_edges, _classify_nodes


@pytest.mark.parametrize("error_type", ["basic", "ctc"])
class TestStandards:
    def add_errors(self, matched, error_type):
        if error_type == "basic":
            _classify_nodes(matched)
            _classify_edges(matched)
        elif error_type == "ctc":
            evaluate_ctc_events(matched)
        else:
            raise ValueError(f"Error type {error_type} not recognized")

    @pytest.mark.parametrize("window", [1, 2])
    def test_empty_gt(self, error_type, window):
        matched = ex_graphs.empty_gt()
        self.add_errors(matched, error_type)
        accuracy = compute_track_accuracy(matched, window)
        assert accuracy == np.nan

    @pytest.mark.parametrize("window", [1, 2])
    def test_empty_pred(self, error_type, window):
        matched = ex_graphs.empty_pred()
        self.add_errors(matched, error_type)
        accuracy = compute_track_accuracy(matched, window)
        assert accuracy == 0.0

    @pytest.mark.parametrize("window", [1, 2])
    def test_good_match(self, error_type, window):
        matched = ex_graphs.good_matched()
        self.add_errors(matched, error_type)
        accuracy = compute_track_accuracy(matched, window)

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
        accuracy = compute_track_accuracy(matched, window)
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
        accuracy = compute_track_accuracy(matched, window)
        assert accuracy == acc

    @pytest.mark.parametrize("t", [1, 2, 3])
    @pytest.mark.parametrize("window", [1, 2])
    def test_fp_node(self, error_type, t, window):
        matched = ex_graphs.fp_node_matched(t)
        self.add_errors(matched, error_type)
        accuracy = compute_track_accuracy(matched, window)
        assert accuracy == 1.0

    @pytest.mark.parametrize("edge_er", [0, 1])
    @pytest.mark.parametrize("window", [1, 2])
    def test_fp_edge(self, error_type, edge_er, window):
        matched = ex_graphs.fp_edge_matched(edge_er)
        self.add_errors(matched, error_type)
        accuracy = compute_track_accuracy(matched, window)
        assert accuracy == 1.0

    @pytest.mark.parametrize(("window", "acc"), [(1, 0.25), (2, 0.0)])
    def test_crossover(self, error_type, window, acc):
        matched = ex_graphs.crossover_edge()
        self.add_errors(matched, error_type)
        accuracy = compute_track_accuracy(matched, window)
        assert accuracy == acc

    @pytest.mark.parametrize(
        ("t", "window", "acc"),
        [
            (0, 1, 0.33),
            (0, 2, 0.0),
            (1, 1, 0.0),
            (1, 2, 0.0),
            (2, 1, 0.33),
            (2, 2, 0.0),
        ],
    )
    def test_node_two_to_one(self, error_type, t, window, acc):
        if error_type == "ctc":
            matched = ex_graphs.node_two_to_one(t)
            self.add_errors(matched, error_type)
            accuracy = compute_track_accuracy(matched, window)
            assert accuracy == acc

    @pytest.mark.parametrize(
        ("t", "window", "acc"),
        [
            (0, 1, 0.0),
            (0, 2, 0.0),
            (1, 1, 0.0),
            (1, 2, 0.0),
            (2, 1, 0.0),
            (2, 2, 0.0),
        ],
    )
    def test_edge_two_to_one(self, error_type, t, window, acc):
        if error_type == "ctc":
            matched = ex_graphs.edge_two_to_one(t)
            self.add_errors(matched, error_type)
            accuracy = compute_track_accuracy(matched, window)
            assert accuracy == acc

    # Skipping the following cases because they are not handled by basic or ctc errors
    # ex_graphs.node_one_to_two
    # ex_graphs.edge_one_to_two


# TODO: punting on skip edge tests until the PR annotating them is merged
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
