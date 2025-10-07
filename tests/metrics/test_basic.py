import examples.graphs as ex_graphs
import pytest

from traccuracy.metrics._basic import BasicMetrics
from traccuracy.track_errors._basic import classify_basic_errors


class TestBasicMetrics:
    m = BasicMetrics()

    @pytest.mark.parametrize("feature_type", ["node", "edge"])
    def test_no_gt(self, feature_type):
        matched = ex_graphs.empty_gt()
        classify_basic_errors(matched)

        with pytest.raises(
            UserWarning,
            match=f"No ground truth {feature_type}s present. Metrics may return np.nan",
        ):
            self.m._compute_stats(feature_type, matched)

    @pytest.mark.parametrize("feature_type", ["node", "edge"])
    def test_no_pred(self, feature_type):
        matched = ex_graphs.empty_pred()
        classify_basic_errors(matched)

        with pytest.raises(
            UserWarning,
            match=f"No predicted {feature_type}s present. Metrics may return np.nan",
        ):
            self.m._compute_stats(feature_type, matched)

    def test_e2e(self):
        matched = ex_graphs.good_matched()

        resdict = self.m._compute(matched)
        # Check for expected number of dict entries
        # Calculated values are checked elsewhere
        entries_per_feature = 8
        assert len(resdict.keys()) == 2 * entries_per_feature

    def test_all_errors_no_skips(self):
        matched = ex_graphs.all_basic_errors()
        resdict = self.m._compute(matched)

        # Expected counts
        node_tp = 5
        node_fn = 3
        node_fp = 3
        edge_tp = 1
        edge_fn = 6
        edge_fp = 6

        assert resdict["Total GT Nodes"] == node_tp + node_fn
        assert resdict["Total Pred Nodes"] == node_tp + node_fp
        assert resdict["True Positive Nodes"] == node_tp
        assert resdict["False Positive Nodes"] == node_fp
        assert resdict["False Negative Nodes"] == node_fn

        assert resdict["Total GT Edges"] == edge_tp + edge_fn
        assert resdict["Total Pred Edges"] == edge_tp + edge_fp
        assert resdict["True Positive Edges"] == edge_tp
        assert resdict["False Positive Edges"] == edge_fp
        assert resdict["False Negative Edges"] == edge_fn

    def test_all_errors_with_skips(self):
        matched = ex_graphs.all_basic_errors()
        # Compute strict first to test for double counting
        resdict = self.m._compute(matched)
        with pytest.warns(UserWarning, match="already calculated"):
            resdict = self.m._compute(matched, relax_skips_gt=True, relax_skips_pred=True)

        # Expected counts
        node_tp = 5
        node_fn = 3
        node_fp = 3
        edge_tp = 1
        edge_tp_gt_skip = edge_tp_pred_skip = 3
        edge_fn = 2
        edge_fn_skip = 1
        edge_fp = 2
        edge_fp_skip = 1
        total_gt_edges = 7
        total_pred_edges = 7

        assert resdict["Total GT Nodes"] == node_tp + node_fn
        assert resdict["Total Pred Nodes"] == node_tp + node_fp
        assert resdict["True Positive Nodes"] == node_tp
        assert resdict["False Positive Nodes"] == node_fp
        assert resdict["False Negative Nodes"] == node_fn

        assert resdict["Total GT Edges"] == total_gt_edges
        assert resdict["Total Pred Edges"] == total_pred_edges
        assert resdict["True Positive Edges"] == edge_tp
        assert resdict["False Positive Edges"] == edge_fp
        assert resdict["False Negative Edges"] == edge_fn
        assert resdict["Skip GT True Positive Edges"] == edge_tp_gt_skip
        assert resdict["Skip Pred True Positive Edges"] == edge_tp_pred_skip
        assert resdict["Skip False Positive Edges"] == edge_fp_skip
        assert resdict["Skip False Negative Edges"] == edge_fn_skip
