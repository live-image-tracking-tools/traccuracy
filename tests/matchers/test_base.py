from tests.test_utils import get_movie_with_graph
from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._base import Matcher
from traccuracy.matchers._matched import Matched


class DummyMatcher(Matcher):
    def _compute_mapping(self, gt_graph: TrackingGraph, pred_graph: TrackingGraph) -> Matched:
        return []


class DummyMatcherParam(DummyMatcher):
    def __init__(self, param="default"):
        self.param = param


class DummyMatcherWithType(DummyMatcher):
    _matching_type = "one-to-one"


def test_matched_info():
    matcher = DummyMatcher()
    # Check that matcher info is correctly generated
    assert matcher.info["name"] == "DummyMatcher"
    # Only one key because there are no parameters
    assert len(matcher.info.keys()) == 1

    matcher = DummyMatcherParam(param="not-default")
    # Check for parameter key
    assert matcher.info["param"] == "not-default"
    assert "mapping" not in matcher.info

    # Check that matcher info is assigned to matched object
    graph = get_movie_with_graph()
    matched = matcher.compute_mapping(graph, graph)
    assert matched.matcher_info is not None
    assert matched.matcher_info["name"] == "DummyMatcherParam"
    assert "mapping" not in matched.matcher_info
