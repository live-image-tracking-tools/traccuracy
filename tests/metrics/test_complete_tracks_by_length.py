import networkx as nx
import numpy as np
import pytest

import tests.examples.graphs as ex_graphs
from tests.examples.larger_examples import larger_example_1
from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._matched import Matched
from traccuracy.metrics._complete_tracks_by_length import CompleteTracksByLength


class TestValidation:
    def test_invalid_error_type(self):
        with pytest.raises(ValueError, match="Unrecognized error type"):
            CompleteTracksByLength(error_type="invalid")

    @pytest.mark.filterwarnings("ignore:Mapping is empty")
    def test_empty_gt_graph_warns(self):
        gt = TrackingGraph(nx.DiGraph())
        pred = TrackingGraph(nx.DiGraph())
        matched = Matched(gt, pred, [], {})
        metric = CompleteTracksByLength(max_length=2)
        with pytest.warns(UserWarning, match="empty graph"):
            result = metric.compute(matched)
        assert result.results == {}

    @pytest.mark.filterwarnings(
        "ignore:Mapping is empty",
        "ignore:Node errors already calculated",
        "ignore:Edge errors already calculated",
    )
    def test_ctc_relax_skips_warns(self):
        matched = ex_graphs.good_matched()
        metric = CompleteTracksByLength(max_length=1, error_type="ctc")
        with pytest.warns(UserWarning, match="do not support relaxing skip edges"):
            metric.compute(matched, relax_skips_gt=True)


# End-to-end test using CompleteTracksByLength class on larger example
@pytest.mark.filterwarnings(
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
    "ignore:Division annotations already present",
)
@pytest.mark.parametrize("error_type", ["basic", "ctc"])
class TestLargerExample:
    @pytest.mark.parametrize(
        ("window", "basic_correct", "ctc_correct", "total"),
        [
            # basic and CTC diverge because CTC marks WRONG_SEMANTIC on the
            # surviving daughter edge when the other daughter is missing,
            # while basic only marks the missing edge as FN.
            (1, 12, 10, 20),
            (2, 11, 9, 20),
            (3, 9, 7, 17),
            (4, 5, 4, 9),
        ],
    )
    def test_larger_example_1(self, error_type, window, basic_correct, ctc_correct, total):
        matched = larger_example_1()
        metric = CompleteTracksByLength(max_length=window, error_type=error_type)
        result = metric.compute(matched)
        # Lists are 0-indexed: index 0 = window 1
        idx = window - 1
        correct = ctc_correct if error_type == "ctc" else basic_correct
        assert result.results["correct"][idx] == correct
        assert result.results["total"][idx] == total
        if total > 0:
            expected_acc = correct / total
            assert pytest.approx(result.results["accuracy"][idx], abs=0.01) == expected_acc

    def test_larger_example_1_sparse_only_keeps_every_key(self, error_type):
        # CompleteTracksByLength never penalizes prediction beyond the ground
        # truth, so none of its keys are dense-only: sparse_only should be a no-op.
        metric = CompleteTracksByLength(max_length=2, error_type=error_type)

        full = metric.compute(larger_example_1()).results
        sparse = metric.compute(larger_example_1(), sparse_only=True).results

        assert sparse == full
        assert set(sparse.keys()) == {"correct", "total", "accuracy"}


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
        metric = CompleteTracksByLength(max_length=window, error_type="ctc")
        result = metric.compute(matched)
        actual_acc = result.results["accuracy"][window - 1]
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
        metric = CompleteTracksByLength(max_length=window, error_type="ctc")
        result = metric.compute(matched)
        actual_acc = result.results["accuracy"][window - 1]
        if np.isnan(expected_acc):
            assert np.isnan(actual_acc)
        else:
            assert pytest.approx(actual_acc, abs=0.01) == expected_acc


@pytest.mark.filterwarnings(
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
    "ignore:Division annotations already present",
)
class TestDefaultMaxWindow:
    """Test that max_length=None uses the full GT time range."""

    def test_default_matches_explicit(self):
        matched = larger_example_1()
        expected_max = matched.gt_graph.end_frame - matched.gt_graph.start_frame - 1

        default_metric = CompleteTracksByLength(max_length=None)
        explicit_metric = CompleteTracksByLength(max_length=expected_max)

        default_result = default_metric.compute(matched)
        explicit_result = explicit_metric.compute(matched)

        assert default_result.results == explicit_result.results

    def test_default_window_range(self):
        matched = larger_example_1()
        expected_max = matched.gt_graph.end_frame - matched.gt_graph.start_frame - 1

        metric = CompleteTracksByLength(max_length=None)
        result = metric.compute(matched)

        assert len(result.results["correct"]) == expected_max
        assert len(result.results["total"]) == expected_max
        assert len(result.results["accuracy"]) == expected_max
