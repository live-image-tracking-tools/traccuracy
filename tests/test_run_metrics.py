import pytest

from tests.test_utils import get_movie_with_graph
from traccuracy import run_metrics
from traccuracy.matchers._base import Matcher
from traccuracy.metrics._base import Metric


class DummyMetric(Metric):
    def __init__(self):
        super().__init__(["one-to-one"])

    def _compute(self, matched, relax_skips_gt=False, relax_skips_pred=False):
        return {}


class DummyMetricParam(Metric):
    def __init__(self, param="value"):
        super().__init__(["one-to-one"])
        self.param = param

    def _compute(self, matched, relax_skips_gt=False, relax_skips_pred=False):
        return {}


class DummyMatcher(Matcher):
    def __init__(self, mapping=None):
        if mapping:
            self.mapping = mapping
        else:
            self.mapping = []

    def _compute_mapping(self, gt_graph, pred_graph):
        return self.mapping


def test_run_metrics():
    graph = get_movie_with_graph()
    mapping = [(n, n) for n in graph.nodes()]

    # Check matcher input -- not instantiated
    with pytest.raises(TypeError):
        run_metrics(graph, graph, DummyMatcher, [DummyMetric()])

    # Check matcher input -- wrong type
    with pytest.raises(TypeError):
        run_metrics(graph, graph, "rando", DummyMetric())

    # Check metric input -- not instantiated
    with pytest.raises(TypeError):
        run_metrics(graph, graph, DummyMatcher(), [DummyMetric])

    # Check metric input -- wrong type
    with pytest.raises(TypeError):
        run_metrics(graph, graph, DummyMatcher(), [DummyMetric(), "rando"])

    # One metric
    matcher = DummyMatcher(mapping)
    metric = DummyMetric()
    results, _ = run_metrics(graph, graph, matcher, [metric])
    assert len(results) == 1
    assert results[0]["metric"]["name"] == "DummyMetric"

    # Duplicate metric with different params
    results, _ = run_metrics(
        graph,
        graph,
        DummyMatcher(mapping),
        [DummyMetricParam("param1"), DummyMetricParam("param2")],
    )
    assert len(results) == 2
    assert results[0]["metric"]["name"] == "DummyMetricParam"
    assert results[0]["metric"].get("param") == "param1"
    assert results[1]["metric"]["name"] == "DummyMetricParam"
    assert results[1]["metric"].get("param") == "param2"

    # Check that relaxing skips works
    results, _ = run_metrics(
        graph, graph, matcher, [metric], relax_skips_gt=True, relax_skips_pred=True
    )
    assert results[0]["metric"]["relax_skips_pred"] is True
    assert results[0]["metric"]["relax_skips_gt"] is True
