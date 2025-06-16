import pytest

import examples.graphs as ex_graphs
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
