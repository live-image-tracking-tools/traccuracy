import networkx as nx
import pytest

import tests.examples.graphs as ex_graphs
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


class TestMatched:
    def test_get_match(self):
        # One to one check each direction
        matched = ex_graphs.good_matched()
        gt = 1
        pred = 4
        assert matched.get_gt_pred_match(gt) == pred
        assert matched.get_pred_gt_match(pred) == gt

        # Many to one fails if asking for one match
        matched = ex_graphs.node_two_to_one(0)
        with pytest.raises(TypeError):
            matched.get_pred_gt_match(4)

    def test_get_matches(self):
        # One to one still returns list
        matched = ex_graphs.good_matched()
        gt = 1
        pred = 4
        assert matched.get_gt_pred_matches(gt) == [pred]
        assert matched.get_pred_gt_matches(pred) == [gt]

        # Many to one
        matched = ex_graphs.node_two_to_one(0)
        pred = 4
        gt = [1, 7]
        assert matched.get_pred_gt_matches(pred) == gt
        assert matched.get_gt_pred_matches(gt[0]) == [pred]
        assert matched.get_gt_pred_matches(gt[1]) == [pred]

    def test_matching_type_cache(self):
        # Test caching
        matched = ex_graphs.good_matched()
        assert matched._matching_type is None
        assert matched.matching_type == "one-to-one"
        assert matched._matching_type == "one-to-one"

    def test_matching_type_from_info(self):
        graph = TrackingGraph(nx.DiGraph())

        # Matching type can be set from the matcher info
        matcher = DummyMatcherWithType()
        matched = matcher.compute_mapping(graph, graph)
        assert matched._matching_type == "one-to-one"

    def test_matching_type(self):
        graph = TrackingGraph(nx.DiGraph())

        # Test empty mapping
        matched = Matched(graph, graph, [], {})
        with pytest.raises(
            UserWarning, match=r"Mapping is empty. Defaulting to type of one-to-one"
        ):
            assert matched.matching_type == "one-to-one"

        # One to one
        matched = ex_graphs.good_matched()
        assert matched.matching_type == "one-to-one"

        # One to many (with more than 2)
        matched = Matched(graph, graph, [(1, 2), (1, 3), (1, 4), (5, 6)], {})
        assert matched.matching_type == "one-to-many"

        # Many to one
        matched = Matched(graph, graph, [(2, 1), (3, 1), (4, 5)], {})
        assert matched.matching_type == "many-to-one"

        # Many to many
        matched = Matched(graph, graph, [(1, 2), (1, 3), (4, 5), (6, 5)], {})
        assert matched.matching_type == "many-to-many"
