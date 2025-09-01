import networkx as nx
import numpy as np
import pytest

from traccuracy import TrackingGraph
from traccuracy.matchers._matched import Matched
from traccuracy.metrics._base import Metric


class ValidMetric(Metric):
    def __init__(self):
        super().__init__(valid_matches=["one-to-one"])

    def _compute(
        self, matched, override_matcher=False, relax_skips_gt=False, relax_skips_pred=False
    ):
        return {}


class TestMetric:
    matched = Matched(TrackingGraph(nx.DiGraph()), TrackingGraph(nx.DiGraph()), [], {})

    def test_missing_attribute(self):
        # Should fail if super init isn't called and subclass init isn't used
        # Error doesn't occur until metric._validate_matcher is called
        class DummyMetric(Metric):
            def __init__(self):
                pass

            def _compute(self):
                pass

        metric = DummyMetric()
        with pytest.raises(
            AttributeError, match="Metric subclass does not define valid_match_types"
        ):
            metric._validate_matcher(self.matched)

    def test_empty_list(self):
        class DummyMetric(Metric):
            def __init__(self):
                super().__init__(valid_matches=[])

            def _compute(self):
                pass

        with pytest.raises(
            TypeError, match="New metrics must provide a list of valid matching types"
        ):
            DummyMetric()

    def test_invalid_option(self):
        bad_option = "not-valid"

        class DummyMetric(Metric):
            def __init__(self):
                super().__init__(valid_matches=[bad_option])

            def _compute(self):
                pass

        with pytest.raises(ValueError, match=r"Matching type .* is not supported."):
            DummyMetric()

    def test_matcher_override(self):
        class DummyMetric(Metric):
            def __init__(self):
                super().__init__(valid_matches=["one-to-one"])

            def _compute(self):
                return {"success": True}

        graph = TrackingGraph(nx.DiGraph())
        matched = Matched(graph, graph, [(1, 2), (1, 3)], {"matching type": "many-to-many"})

        metric = DummyMetric()

        # Fail without override
        message = (
            "The matched data uses a matcher that does not meet the requirements "
            "of the metric. Check the documentation for the metric for more information."
        )
        with pytest.raises(TypeError, match=message):
            metric.compute(matched)

        # Override triggers warning
        message = (
            "Overriding matcher/metric validation may result in "
            "unpredictable/incorrect metric results"
        )
        with pytest.raises(UserWarning, match=message):
            results = metric.compute(matched, override_matcher=True)
            assert "success" in results.results

    def test_precision(self):
        m = ValidMetric()
        assert np.isnan(m._get_precision(numerator=0, denominator=0))
        assert m._get_precision(numerator=10, denominator=10) == 1
        assert m._get_precision(numerator=0, denominator=10) == 0

    def test_recall(self):
        m = ValidMetric()
        assert np.isnan(m._get_recall(numerator=0, denominator=0))
        assert m._get_recall(numerator=0, denominator=10) == 0
        assert m._get_recall(numerator=10, denominator=10) == 1

    def test_f1(self):
        m = ValidMetric()
        assert np.isnan(m._get_f1(precision=0, recall=0))
        assert m._get_f1(precision=0, recall=1) == 0
        assert m._get_f1(precision=1, recall=1) == 1

    def test_relax_info(self):
        m = ValidMetric()

        # relax_skips_gt and relax_skips_pred are False by default
        with pytest.warns(UserWarning, match="Mapping is empty"):
            results = m.compute(self.matched)
        assert results.metric_info["relax_skips_gt"] is False
        assert results.metric_info["relax_skips_pred"] is False

        # relax_skips makes it into results when passed
        # don't need to check for warning here as matching type was set
        # in previous validation step
        results = m.compute(self.matched, relax_skips_gt=True, relax_skips_pred=False)
        assert results.metric_info["relax_skips_gt"] is True
        assert results.metric_info["relax_skips_pred"] is False
