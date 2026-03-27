import pytest

from tests.test_utils import get_movie_with_graph
from traccuracy import TrackingGraph, run_metrics
from traccuracy.matchers._base import Matcher
from traccuracy.matchers._iou import IOUMatcher
from traccuracy.metrics._base import Metric
from traccuracy.metrics._basic import BasicMetrics


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


def test_run_metrics_with_border_margin():
    """Full pipeline: border_margin on both graphs, IOU matching, basic metrics."""
    graph = get_movie_with_graph(ndims=3, n_frames=3, n_labels=3)

    gt = TrackingGraph(
        graph.graph.copy(),
        segmentation=graph.segmentation,
        location_keys=graph.location_keys,
        label_key=graph.label_key,
        border_margin=30.0,
    )
    pred = TrackingGraph(
        graph.graph.copy(),
        segmentation=graph.segmentation,
        location_keys=graph.location_keys,
        label_key=graph.label_key,
        border_margin=30.0,
    )
    # Both should have fewer nodes
    assert len(gt.graph.nodes) < len(graph.graph.nodes)

    results, matched = run_metrics(gt, pred, IOUMatcher(), [BasicMetrics()])
    assert len(results) == 1
    # All remaining nodes should match (same data)
    assert len(matched.mapping) == len(gt.graph.nodes)
    # border_margin should be recorded in Results
    assert results[0]["gt"]["border_margin"] == 30.0
    assert results[0]["pred"]["border_margin"] == 30.0
