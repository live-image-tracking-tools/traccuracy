import math

import numpy as np
import pytest

import tests.examples.graphs as ex_graphs
from tests.examples.larger_examples import larger_example_1
from traccuracy.metrics._compute_track_accuracy import compute_track_accuracy
from traccuracy.metrics._track_accuracy_over_time import TrackAccuracyOverTime
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


# Skip edge tests - only basic error type supports skip edges
class TestSkipEdges:
    @pytest.mark.parametrize(
        ("relax_gt", "relax_pred", "window", "acc"),
        [
            # gap_close_gt_gap: GT has skip edge t=0->t=2, pred has full path
            # GT edges: 1->3 (skip spanning 2 frames), 3->4 (1 frame)
            # Time-based windows: w1 has only 3->4, w2 has only 1->3
            # Without relax: edge 1->3 not TRUE_POS, edge 3->4 is TRUE_POS
            (False, False, 1, 1.0),  # w1: 1/1 (only 3->4, which is correct)
            (False, False, 2, 0.0),  # w2: 0/1 (only 1->3, skip not relaxed)
            # With relax_skips_gt: edge 1->3 becomes SKIP_TRUE_POS
            (True, False, 1, 1.0),
            (True, False, 2, 1.0),  # w2: 1/1 (skip edge now correct)
            # relax_skips_pred doesn't help (skip is in GT, not pred)
            (False, True, 1, 1.0),
            (False, True, 2, 0.0),
        ],
    )
    def test_gap_close_gt_gap(self, relax_gt, relax_pred, window, acc):
        matched = ex_graphs.gap_close_gt_gap()
        classify_basic_errors(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_track_accuracy(
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
            # gap_close_pred_gap: GT has full path, pred has skip edge
            # GT edges: 1->2, 2->3, 3->4. Node 3 not matched. Total: w1=3, w2=2
            # Without relax: only edge 1->2 is TRUE_POS
            (False, False, 1, 1 / 3),
            (False, False, 2, 0.0),
            # relax_skips_gt doesn't help (skip is in pred, not GT)
            (True, False, 1, 1 / 3),
            (True, False, 2, 0.0),
            # With relax_skips_pred: GT path matches pred skip
            (False, True, 1, 1.0),
            (False, True, 2, 1.0),
        ],
    )
    def test_gap_close_pred_gap(self, relax_gt, relax_pred, window, acc):
        matched = ex_graphs.gap_close_pred_gap()
        classify_basic_errors(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_track_accuracy(
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
            # gap_close_matched_gap: both GT and pred have skip at same location
            # GT edges: 1->3 (skip), 3->4. All nodes matched.
            # Skip edges align, so all edges TRUE_POS without relaxation
            (False, False, 1, 1.0),
            (False, False, 2, 1.0),
            (True, False, 1, 1.0),
            (True, False, 2, 1.0),
            (False, True, 1, 1.0),
            (False, True, 2, 1.0),
        ],
    )
    def test_gap_close_matched_gap(self, relax_gt, relax_pred, window, acc):
        matched = ex_graphs.gap_close_matched_gap()
        classify_basic_errors(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_track_accuracy(
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
            # gap_close_offset: GT skip at 1->3, pred skip at 6->8
            # Node 3 never matched. All segments incorrect.
            (False, False, 1, 0.0),
            (False, False, 2, 0.0),
            (True, False, 1, 0.0),
            (True, False, 2, 0.0),
            (False, True, 1, 0.0),
            (False, True, 2, 0.0),
        ],
    )
    def test_gap_close_offset(self, relax_gt, relax_pred, window, acc):
        matched = ex_graphs.gap_close_offset()
        classify_basic_errors(matched, relax_skips_gt=relax_gt, relax_skips_pred=relax_pred)
        result = compute_track_accuracy(
            matched,
            window,
            error_type="basic",
            relax_skips_gt=relax_gt,
            relax_skips_pred=relax_pred,
        )
        accuracy = get_accuracy(result, window)
        assert pytest.approx(accuracy, abs=0.01) == acc


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
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert pytest.approx(accuracy, abs=0.01) == acc

    @pytest.mark.parametrize(
        ("t_div", "window", "acc"),
        [
            # one_child: pred missing one daughter edge -> FN_DIV on GT division node
            # Division node should be marked incorrect
            # t_div=0: division at node 1, segments starting at 1 incorrect
            (0, 1, 0.5),  # 2/4 (segments at 2,3 correct, segments at 1 wrong)
            (0, 2, 0.0),  # 0/2 (all window-2 segments go through node 1)
            # t_div=1: division at node 2, segment at 1 correct, segments at 2 wrong
            (1, 1, 1 / 3),  # 1/3 (segment at 1 correct, segments at 2 wrong due to FN_DIV)
            (1, 2, 0.0),  # 0/1 (window-2 goes through node 2 which has FN_DIV)
        ],
    )
    def test_one_child(self, error_type, t_div, window, acc):
        matched = ex_graphs.one_child(t_div)
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
        accuracy = get_accuracy(result, window)
        assert pytest.approx(accuracy, abs=0.01) == acc

    @pytest.mark.parametrize(
        ("t_div", "window", "acc"),
        [
            # no_children: pred missing both daughter edges -> FN_DIV
            # Same pattern as one_child
            (0, 1, 0.5),
            (0, 2, 0.0),
            (1, 1, 1 / 3),  # Same as one_child: segment at 1 correct, segments at 2 wrong
            (1, 2, 0.0),
        ],
    )
    def test_no_children(self, error_type, t_div, window, acc):
        matched = ex_graphs.no_children(t_div)
        self.add_errors(matched, error_type)
        result = compute_track_accuracy(matched, window, error_type=error_type)
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
            (False, False, 3, 0.0),
            # relax_skips_gt doesn't help (skip is in pred)
            (True, False, 1, 4 / 6),
            (True, False, 2, 2 / 4),
            (True, False, 3, 0.0),
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
        result = compute_track_accuracy(
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
            (False, False, 2, 1 / 4),
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
        result = compute_track_accuracy(
            matched,
            window,
            error_type="basic",
            relax_skips_gt=relax_gt,
            relax_skips_pred=relax_pred,
        )
        accuracy = get_accuracy(result, window)
        assert pytest.approx(accuracy, abs=0.01) == acc


# End-to-end test using TrackAccuracyOverTime class on larger example
@pytest.mark.filterwarnings(
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
    "ignore:Division annotations already present",
)
@pytest.mark.parametrize("error_type", ["basic", "ctc"])
class TestLargerExample:
    @pytest.mark.parametrize(
        ("window", "correct", "total"),
        [
            (1, 10, 20),
            (2, 5, 13),
            (3, 2, 6),
            (4, 1, 3),
        ],
    )
    def test_larger_example_1(self, error_type, window, correct, total):
        matched = larger_example_1()
        metric = TrackAccuracyOverTime(max_window=window, error_type=error_type)
        result = metric.compute(matched)
        assert result.results[f"window_{window}_correct"] == correct
        assert result.results[f"window_{window}_total"] == total
        if total > 0:
            expected_acc = correct / total
            assert (
                pytest.approx(result.results[f"window_{window}_accuracy"], abs=0.01) == expected_acc
            )


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
class TestManyToOne:
    """Test that CTC metrics work with many-to-one matching."""

    @pytest.mark.parametrize(
        ("idx", "window", "expected_acc"),
        [
            (0, 1, 0.5),  # First node FN - one of two segments correct at window 1
            (0, 2, 0.0),  # Both segments include the FN edge
            (1, 1, 0.0),  # Middle node FN - no correct segments
            (2, 1, 0.5),  # Last node FN - one of two segments correct
        ],
    )
    def test_node_two_to_one_ctc(self, idx, window, expected_acc):
        """CTC should work with many-to-one matching (no division errors checked)."""
        matched = ex_graphs.node_two_to_one(idx)
        metric = TrackAccuracyOverTime(max_window=window, error_type="ctc")
        result = metric.compute(matched)
        actual_acc = result.results[f"window_{window}_accuracy"]
        if np.isnan(expected_acc):
            assert np.isnan(actual_acc)
        else:
            assert pytest.approx(actual_acc, abs=0.01) == expected_acc

    @pytest.mark.parametrize(
        ("idx", "window", "expected_acc"),
        [
            (0, 1, 0.0),  # First edge wrong - no correct segments
            (1, 1, 0.0),  # Last edge wrong - no correct segments
        ],
    )
    def test_edge_two_to_one_ctc(self, idx, window, expected_acc):
        """CTC should work with many-to-one matching for edge errors."""
        matched = ex_graphs.edge_two_to_one(idx)
        metric = TrackAccuracyOverTime(max_window=window, error_type="ctc")
        result = metric.compute(matched)
        actual_acc = result.results[f"window_{window}_accuracy"]
        if np.isnan(expected_acc):
            assert np.isnan(actual_acc)
        else:
            assert pytest.approx(actual_acc, abs=0.01) == expected_acc
