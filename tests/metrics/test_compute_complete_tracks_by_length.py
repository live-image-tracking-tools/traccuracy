import math

import networkx as nx
import numpy as np
import pytest

import tests.examples.graphs as ex_graphs
from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._matched import Matched
from traccuracy.metrics._compute_complete_tracks_by_length import (
    CORRECT,
    EMPTY,
    _build_grid,
    _get_continuation_value,
    compute_complete_tracks_by_length,
)
from traccuracy.track_errors._basic import classify_basic_errors
from traccuracy.track_errors._ctc import evaluate_ctc_events
from traccuracy.track_errors._divisions import evaluate_division_events


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

    @pytest.mark.filterwarnings("ignore:Mapping is empty")
    @pytest.mark.parametrize("window", [1, 2])
    def test_empty_gt(self, error_type, window):
        matched = ex_graphs.empty_gt()
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert math.isnan(accuracy)

    @pytest.mark.filterwarnings("ignore:Mapping is empty")
    @pytest.mark.parametrize("window", [1, 2])
    def test_empty_pred(self, error_type, window):
        matched = ex_graphs.empty_pred()
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == 0.0

    @pytest.mark.parametrize("window", [1, 2])
    def test_good_match(self, error_type, window):
        matched = ex_graphs.good_matched()
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
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
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
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
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == acc

    @pytest.mark.parametrize("t", [1, 2, 3])
    @pytest.mark.parametrize("window", [1, 2])
    def test_fp_node(self, error_type, t, window):
        matched = ex_graphs.fp_node_matched(t)
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == 1.0

    @pytest.mark.parametrize("edge_er", [0, 1])
    @pytest.mark.parametrize("window", [1, 2])
    def test_fp_edge(self, error_type, edge_er, window):
        matched = ex_graphs.fp_edge_matched(edge_er)
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == 1.0

    @pytest.mark.parametrize(("window", "acc"), [(1, 0.25), (2, 0.0)])
    def test_crossover(self, error_type, window, acc):
        matched = ex_graphs.crossover_edge()
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert accuracy == acc

    @pytest.mark.parametrize(
        ("t", "window", "acc"),
        [
            (0, 1, 0.5),  # ctc: 1/2 (NON_SPLIT detected)
            (0, 2, 0.0),  # ctc: 0/1
            (1, 1, 0.0),  # ctc: 0/2 (both start nodes FN)
            (1, 2, 0.0),  # short tracks still count at w=2
            (2, 1, 0.5),  # ctc: 1/2
            (2, 2, 0.0),  # ctc: 0/1
        ],
    )
    def test_node_two_to_one(self, error_type, t, window, acc):
        # node_two_to_one produces a many-to-one matching, which basic errors
        # don't support — only run for ctc.
        if error_type != "ctc":
            return
        matched = ex_graphs.node_two_to_one(t)
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
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
            result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
            accuracy = get_accuracy(result, window)
            assert accuracy == acc

    # Skipping the following cases because they are not handled by basic or ctc errors
    # ex_graphs.node_one_to_two
    # ex_graphs.edge_one_to_two


# Skip edge tests - only basic error type supports skip edges
class TestSkipEdges:
    @pytest.mark.parametrize(
        ("relax_gt", "relax_pred", "window", "correct", "total"),
        [
            # gap_close_gt_gap: GT has skip edge t=0->t=2, pred has full path
            # GT nodes: 1(t=0), 3(t=2), 4(t=3). Skip edge 1->3, real edge 3->4.
            #
            # Skip edge 1->3 spans 2 frames, so it interpolates into:
            #   w=1: 2 interpolated segments (t=0->t=1, t=1->t=2)
            #   w=2: 1 segment (the skip edge itself, t=0->t=2)
            # Then continuing the path from node 1 with real edge 3->4:
            #   w=1: 1 real segment (3->4, t=2->t=3)
            #   w=2: 1 interpolated continuation (t=1->t=3)
            #   w=3: 1 segment (t=0->t=3)
            #
            # Without relax: skip edge 1->3 is NOT correct, 3->4 IS correct
            # Interpolated segments from skip edge share its correctness (incorrect)
            (False, False, 1, 1, 3),  # 1 correct (3->4) out of 3
            (False, False, 2, 0, 2),  # 0 correct out of 2
            (False, False, 3, 0, 1),  # 0 correct out of 1
            # With relax_skips_gt: skip edge becomes SKIP_TRUE_POS, all correct
            (True, False, 1, 3, 3),
            (True, False, 2, 2, 2),
            (True, False, 3, 1, 1),
            # relax_skips_pred doesn't help (skip is in GT, not pred)
            (False, True, 1, 1, 3),
            (False, True, 2, 0, 2),
            (False, True, 3, 0, 1),
        ],
    )
    def test_gap_close_gt_gap(self, relax_gt, relax_pred, window, correct, total):
        matched = ex_graphs.gap_close_gt_gap()
        classify_basic_errors(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_complete_tracks_by_length(
            matched,
            window,
            error_type="basic",
            relax_skips_gt=relax_gt,
            relax_skips_pred=relax_pred,
        )
        assert result[window] == (correct, total)

    @pytest.mark.parametrize(
        ("relax_gt", "relax_pred", "window", "correct", "total"),
        [
            # gap_close_pred_gap: GT has full path, pred has skip edge
            # GT edges: 1->2, 2->3, 3->4. No GT skip edges, no interpolation.
            # Node 3 not matched. Total: w1=3, w2=2, w3=1
            # Without relax: only edge 1->2 is TRUE_POS
            (False, False, 1, 1, 3),
            (False, False, 2, 0, 2),
            (False, False, 3, 0, 1),
            # relax_skips_gt doesn't help (skip is in pred, not GT)
            (True, False, 1, 1, 3),
            (True, False, 2, 0, 2),
            (True, False, 3, 0, 1),
            # With relax_skips_pred: GT path matches pred skip
            (False, True, 1, 3, 3),
            (False, True, 2, 2, 2),
            (False, True, 3, 1, 1),
        ],
    )
    def test_gap_close_pred_gap(self, relax_gt, relax_pred, window, correct, total):
        matched = ex_graphs.gap_close_pred_gap()
        classify_basic_errors(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_complete_tracks_by_length(
            matched,
            window,
            error_type="basic",
            relax_skips_gt=relax_gt,
            relax_skips_pred=relax_pred,
        )
        assert result[window] == (correct, total)

    @pytest.mark.parametrize(
        ("relax_gt", "relax_pred", "window", "correct", "total"),
        [
            # gap_close_matched_gap: both GT and pred have skip at same location
            # GT nodes: 1(t=0), 3(t=2), 4(t=3). Same topology as gt_gap.
            # Skip edges align, so all edges TRUE_POS without relaxation.
            # Interpolation gives same totals as gt_gap, all correct.
            (False, False, 1, 3, 3),
            (False, False, 2, 2, 2),
            (False, False, 3, 1, 1),
            (True, False, 1, 3, 3),
            (True, False, 2, 2, 2),
            (True, False, 3, 1, 1),
            (False, True, 1, 3, 3),
            (False, True, 2, 2, 2),
            (False, True, 3, 1, 1),
        ],
    )
    def test_gap_close_matched_gap(self, relax_gt, relax_pred, window, correct, total):
        matched = ex_graphs.gap_close_matched_gap()
        classify_basic_errors(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_complete_tracks_by_length(
            matched,
            window,
            error_type="basic",
            relax_skips_gt=relax_gt,
            relax_skips_pred=relax_pred,
        )
        assert result[window] == (correct, total)

    @pytest.mark.parametrize(
        ("relax_gt", "relax_pred", "window", "correct", "total"),
        [
            # gap_close_offset: GT skip at 1->3, pred skip at 6->8
            # GT nodes: 1(t=0), 3(t=2), 4(t=3). Same topology as gt_gap.
            # Node 3 never matched. All segments incorrect.
            # Interpolation gives same totals, all incorrect.
            (False, False, 1, 0, 3),
            (False, False, 2, 0, 2),
            (False, False, 3, 0, 1),
            (True, False, 1, 0, 3),
            (True, False, 2, 0, 2),
            (True, False, 3, 0, 1),
            (False, True, 1, 0, 3),
            (False, True, 2, 0, 2),
            (False, True, 3, 0, 1),
        ],
    )
    def test_gap_close_offset(self, relax_gt, relax_pred, window, correct, total):
        matched = ex_graphs.gap_close_offset()
        classify_basic_errors(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_complete_tracks_by_length(
            matched,
            window,
            error_type="basic",
            relax_skips_gt=relax_gt,
            relax_skips_pred=relax_pred,
        )
        assert result[window] == (correct, total)


# Division tests - test FN_DIV and FP_DIV error detection
# Note: evaluate_division_events internally calls classify_basic_errors
@pytest.mark.parametrize("error_type", ["basic", "ctc"])
class TestDivisions:
    def add_errors(self, matched, error_type):
        # evaluate_division_events internally calls classify_basic_errors
        # For CTC, we need to call evaluate_ctc_events first, then division events
        if error_type == "ctc":
            evaluate_ctc_events(matched)
        evaluate_division_events(matched)

    @pytest.mark.parametrize(
        ("t_div", "window", "acc"),
        [
            # good_div: perfect match, all segments correct
            # t_div=0: 4 edges, window 1 = 4 segments, window 2 = 2 segments
            (0, 1, 1.0),
            (0, 2, 1.0),
            # t_div=1: 3 edges, window 1 = 3 segments, window 2 = 1 segment
            (1, 1, 1.0),
            (1, 2, 1.0),
            # t_div=2: 4 edges, window 1 = 4 segments, window 2 = 2 segments
            (2, 1, 1.0),
            (2, 2, 1.0),
        ],
    )
    def test_good_div(self, error_type, t_div, window, acc):
        matched = ex_graphs.good_div(t_div)
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert pytest.approx(accuracy, abs=0.01) == acc

    @pytest.mark.parametrize(
        ("t_div", "window", "basic_acc", "ctc_acc"),
        [
            # one_child: pred missing one daughter edge
            # FN_DIV is NOT a node error; only the missing edge is FN.
            # basic: surviving daughter edge is TP
            # CTC: surviving daughter edge marked WRONG_SEMANTIC (CTC penalizes it)
            (0, 1, 3 / 4, 2 / 4),  # basic: 3/4, ctc: 2/4
            (0, 2, 1 / 2, 0 / 2),  # basic: 1/2, ctc: 0/2
            (1, 1, 2 / 3, 1 / 3),  # basic: 2/3, ctc: 1/3
            (1, 2, 1 / 3, 0 / 3),  # basic: 1/3, ctc: 0/3
        ],
    )
    def test_one_child(self, error_type, t_div, window, basic_acc, ctc_acc):
        matched = ex_graphs.one_child(t_div)
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        acc = ctc_acc if error_type == "ctc" else basic_acc
        assert pytest.approx(accuracy, abs=0.01) == acc

    @pytest.mark.parametrize(
        ("t_div", "window", "acc"),
        [
            # no_children: pred missing both daughter edges -> FN edge errors
            # FN_DIV is not a node error; both daughter edges are FN
            (0, 1, 2 / 4),  # 2/4 (both daughter edges FN, tracklet edges TP)
            (0, 2, 0.0),  # 0/2 (both branches have FN edges)
            (1, 1, 1 / 3),  # 1/3 (edge 0->1 correct, both daughter edges FN)
            (1, 2, 0.0),  # 0/1 (all branches touch FN edges)
        ],
    )
    def test_no_children(self, error_type, t_div, window, acc):
        matched = ex_graphs.no_children(t_div)
        self.add_errors(matched, error_type)
        result = compute_complete_tracks_by_length(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert pytest.approx(accuracy, abs=0.01) == acc


# Division + skip edge tests - only basic error type supports skip edges
class TestDivisionSkipEdges:
    @pytest.mark.parametrize(
        ("relax_gt", "relax_pred", "window", "acc"),
        [
            # div_daughter_gap: pred has skip edge past one daughter
            # GT: longer_division(2) - division at t=2, daughters at t=3,4
            # Pred: daughter node 11 removed, skip edge 10->13 added
            # Without relaxation: node 4 unmatched, segments through it incorrect
            (False, False, 1, 4 / 6),
            (False, False, 2, 2 / 4),
            (False, False, 3, 2 / 6),  # daughter tracks shorter than w=3 still count
            # relax_skips_gt doesn't help (skip is in pred)
            (True, False, 1, 4 / 6),
            (True, False, 2, 2 / 4),
            (True, False, 3, 2 / 6),
            # relax_skips_pred: skip edge matches GT multi-edge path
            (False, True, 1, 1.0),
            (False, True, 2, 1.0),
            (False, True, 3, 1.0),
        ],
    )
    def test_div_daughter_gap(self, relax_gt, relax_pred, window, acc):
        matched = ex_graphs.div_daughter_gap()
        # evaluate_division_events internally calls classify_basic_errors
        evaluate_division_events(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_complete_tracks_by_length(
            matched,
            window,
            error_type="basic",
            relax_skips_gt=relax_gt,
            relax_skips_pred=relax_pred,
        )
        accuracy = get_accuracy(result, window)
        assert pytest.approx(accuracy, abs=0.01) == acc

    @pytest.mark.parametrize(
        ("relax_gt", "relax_pred", "window", "acc"),
        [
            # div_daughter_dual_gap: pred has skip edges past both daughters
            # Both daughter nodes removed, skip edges to grandchildren
            (False, False, 1, 2 / 6),
            (False, False, 2, 1 / 6),  # short daughter tracks still count
            (False, False, 3, 0.0),
            # relax_skips_pred fixes everything
            (False, True, 1, 1.0),
            (False, True, 2, 1.0),
            (False, True, 3, 1.0),
        ],
    )
    def test_div_daughter_dual_gap(self, relax_gt, relax_pred, window, acc):
        matched = ex_graphs.div_daughter_dual_gap()
        # evaluate_division_events internally calls classify_basic_errors
        evaluate_division_events(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_complete_tracks_by_length(
            matched,
            window,
            error_type="basic",
            relax_skips_gt=relax_gt,
            relax_skips_pred=relax_pred,
        )
        accuracy = get_accuracy(result, window)
        assert pytest.approx(accuracy, abs=0.01) == acc


class TestTracklets:
    """Test lineages=False path (uses get_tracklets instead of get_lineages)."""

    @pytest.mark.parametrize("window", [1, 2])
    def test_good_div_tracklets(self, window):
        matched = ex_graphs.good_div(1)
        evaluate_division_events(matched)
        # With lineages=False, tracklets are split at divisions.
        # All edges are correct, so all segments should be correct.
        result = compute_complete_tracks_by_length(
            matched, window, lineages=False, error_type="basic"
        )
        accuracy = get_accuracy(result, window)
        assert accuracy == 1.0


class TestSingleFrameComponent:
    """Test that a single-frame GT graph produces no segments."""

    @pytest.mark.filterwarnings("ignore:Mapping is empty")
    def test_single_node_graph(self):
        # A single node at t=0: T = end_frame - start_frame - 1 = 0
        g = nx.DiGraph()
        g.add_node(1, t=0, y=0)
        gt = TrackingGraph(g, location_keys=("y",))
        pred = TrackingGraph(nx.DiGraph())
        matched = Matched(gt, pred, [], {})
        classify_basic_errors(matched)
        result = compute_complete_tracks_by_length(matched, 1, error_type="basic")
        # Single node has no edges, so no segments exist
        _correct, total = result.get(1, (0, 0))
        assert total == 0


class TestGetContinuationValue:
    """Unit tests for _get_continuation_value."""

    def test_past_end_of_grid(self):
        # A 2-step grid: prev_grid has entries at t=0 and t=1.
        # Asking for continuation at t=1 means next_t=2, which is past the end.
        prev_grid = [[CORRECT], [CORRECT]]
        result = _get_continuation_value(row=0, t=1, prev_grid=prev_grid, divisions=None)
        assert result == EMPTY

    def test_at_end_of_grid(self):
        # Asking for continuation at t=0 means next_t=1, which is valid.
        prev_grid = [[CORRECT], [CORRECT]]
        result = _get_continuation_value(row=0, t=0, prev_grid=prev_grid, divisions=None)
        assert result == CORRECT

    def test_empty_grid(self):
        result = _get_continuation_value(row=0, t=0, prev_grid=[], divisions=None)
        assert result == EMPTY


class TestWindowLargerThanTrack:
    """Test that max_window larger than the track length works correctly."""

    def test_window_exceeds_track(self):
        # good_matched has 3 nodes and 2 edges, so T=2.
        # max_window=4 means w=3 and w=4 have no segments (cur_len <= 0).
        matched = ex_graphs.good_matched()
        classify_basic_errors(matched)
        result = compute_complete_tracks_by_length(matched, 4, error_type="basic")
        # w=1 and w=2 should have segments; w=3 and w=4 should not
        assert result[1] == (2, 2)
        assert result[2] == (1, 1)
        assert 3 not in result
        assert 4 not in result


class TestBuildGrid:
    """Unit tests for _build_grid."""

    @pytest.mark.filterwarnings("ignore:Mapping is empty")
    def test_empty_gt_graph(self):
        gt = TrackingGraph(nx.DiGraph())
        pred = TrackingGraph(nx.DiGraph())
        matched = Matched(gt, pred, [], {})
        # No nodes, so start_frame/end_frame are None
        grid, divisions, num_rows = _build_grid(
            gt.graph, matched, is_ctc=False, relax_skips_gt=False, relax_skips_pred=False
        )
        assert grid == []
        assert divisions == {}
        assert num_rows == 0
