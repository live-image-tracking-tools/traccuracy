from copy import deepcopy

import networkx as nx
import numpy as np
import pytest

from tests.examples import graphs as ex_graphs
from traccuracy import TrackingGraph
from traccuracy.matchers import Matched
from traccuracy.metrics._track_overlap import TrackOverlapMetrics


class TestStandardOverlapMetrics:
    tp = "track_purity"
    te = "target_effectiveness"

    @pytest.mark.parametrize("incl_div_edges", [True, False])
    def test_empty_gt(self, incl_div_edges):
        matched = ex_graphs.empty_gt()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == 0
        assert np.isnan(results[self.te])

    @pytest.mark.parametrize("incl_div_edges", [True, False])
    def test_empty_pred(self, incl_div_edges):
        matched = ex_graphs.empty_pred()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert np.isnan(results[self.tp])
        assert results[self.te] == 0

    @pytest.mark.parametrize("incl_div_edges", [True, False])
    def test_good_match(self, incl_div_edges):
        matched = ex_graphs.good_matched()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == 1
        assert results[self.te] == 1

    @pytest.mark.parametrize(
        ("t", "incl_div_edges", "tp", "te"),
        [
            (0, True, 1, 0.5),
            (0, False, 1, 0.5),
            (1, True, np.nan, 0),
            (1, False, np.nan, 0),
            (2, True, 1, 0.5),
            (2, False, 1, 0.5),
        ],
    )
    def test_fn_node(self, t, incl_div_edges, tp, te):
        matched = ex_graphs.fn_node_matched(t)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)

        if tp is np.nan:
            assert results[self.tp] is tp
        else:
            assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("edge_er", "incl_div_edges", "tp", "te"),
        [
            (0, True, 1, 0.5),
            (0, False, 1, 0.5),
            (1, True, 1, 0.5),
            (1, False, 1, 0.5),
        ],
    )
    def test_fn_edge(self, edge_er, incl_div_edges, tp, te):
        matched = ex_graphs.fn_edge_matched(edge_er)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("t", "incl_div_edges", "tp", "te"),
        [
            (0, True, 1, 1),
            (0, False, 1, 1),
            (1, True, 1, 1),
            (1, False, 1, 1),
            (2, True, 1, 1),
            (2, False, 1, 1),
        ],
    )
    def test_fp_node(self, t, incl_div_edges, tp, te):
        matched = ex_graphs.fp_node_matched(t)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("edge_er", "incl_div_edges", "tp", "te"),
        [
            (0, True, 2 / 3, 1),
            (0, False, 2 / 3, 1),
            (1, True, 2 / 3, 1),
            (1, False, 2 / 3, 1),
        ],
    )
    def test_fp_edge(self, edge_er, incl_div_edges, tp, te):
        matched = ex_graphs.fp_edge_matched(edge_er)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "tp", "te"), [(True, 0.5, 0.25), (False, 0.5, 0.25)]
    )
    def test_crossover(self, incl_div_edges, tp, te):
        matched = ex_graphs.crossover_edge()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    # Skipping the following cases because they are not one to one
    # ex_graphs.node_two_to_one
    # ex_graphs.edge_two_to_one
    # ex_graphs.node_one_to_two
    # ex_graphs.edge_one_to_two

    @pytest.mark.parametrize(
        ("incl_div_edges", "tp", "te"), [(True, 1 / 3, 0.5), (False, 1 / 3, 0.5)]
    )
    def test_gap_close_gt_gap(self, incl_div_edges, tp, te):
        matched = ex_graphs.gap_close_gt_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "tp", "te"), [(True, 0.5, 1 / 3), (False, 0.5, 1 / 3)]
    )
    def test_gap_close_pred_gap(self, incl_div_edges, tp, te):
        matched = ex_graphs.gap_close_pred_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(("incl_div_edges", "tp", "te"), [(True, 1, 1), (False, 1, 1)])
    def test_gap_close_matched_gap(self, incl_div_edges, tp, te):
        matched = ex_graphs.gap_close_matched_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(("incl_div_edges", "tp", "te"), [(True, 0, 0), (False, 0, 0)])
    def test_gap_close_offset(self, incl_div_edges, tp, te):
        matched = ex_graphs.gap_close_offset()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "tp", "te"), [(True, 1 / 7, 1 / 7), (False, 1 / 7, 1 / 7)]
    )
    def test_gap_all_basic_errors(self, incl_div_edges, tp, te):
        matched = ex_graphs.all_basic_errors()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "t_div", "tp", "te"),
        [
            (True, 0, 3 / 4, 1),
            (True, 1, 2 / 3, 0.5),
            (False, 0, 1, 2 / 3),
            (False, 1, 1, 0.5),
        ],
    )
    def test_fp_div(self, incl_div_edges, tp, te, t_div):
        matched = ex_graphs.fp_div(t_div)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "t_div", "tp", "te"),
        [
            (True, 0, 1, 3 / 4),
            (True, 1, 0.5, 2 / 3),
            (False, 0, 2 / 3, 1),
            (False, 1, 0.5, 1),
        ],
    )
    def test_one_child(self, incl_div_edges, tp, te, t_div):
        matched = ex_graphs.one_child(t_div)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "t_div", "tp", "te"),
        [
            (True, 0, 1, 0.5),
            (True, 1, 1, 1 / 3),
            (False, 0, 1, 1),
            (False, 1, 1, 1),
        ],
    )
    def test_no_children(self, incl_div_edges, tp, te, t_div):
        matched = ex_graphs.no_children(t_div)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "t_div", "tp", "te"),
        [
            (True, 0, 3 / 4, 3 / 5),
            (True, 1, 2 / 3, 2 / 3),
            (False, 0, 1, 2 / 3),
            (False, 1, 1, 1),
        ],
    )
    def test_wrong_child(self, incl_div_edges, tp, te, t_div):
        matched = ex_graphs.wrong_child(t_div)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "t_div", "tp", "te"),
        [
            (True, 0, 0, 0),
            (True, 1, 1 / 3, 1 / 3),
            (False, 0, 0, 0),
            (False, 1, 1, 1),
        ],
    )
    def test_wrong_children(self, incl_div_edges, tp, te, t_div):
        matched = ex_graphs.wrong_children(t_div)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "tp", "te"),
        [
            (True, 4 / 5, 4 / 6),
            (False, 3 / 3, 3 / 4),
        ],
    )
    def test_div_daughter_gap(self, incl_div_edges, tp, te):
        matched = ex_graphs.div_daughter_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    # @pytest.mark.parametrize(
    #     ("incl_div_edges", "tp", "te"),
    #     [
    #         (True,  2/4, 2/6),
    #         (False, 2/2, 2/4),
    #     ]
    # )
    # def test_div_daughter_dual_gap(self, incl_div_edges, tp, te):
    #     matched = ex_graphs.div_daughter_dual_gap()
    #     metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
    #     results = metric._compute(matched)
    #     assert results[self.tp] == tp
    #     assert results[self.te] == te


def add_frame(tree):
    attrs = {}
    for node in tree.nodes:
        attrs[node] = {"t": int(node.split("_")[0]), "x": 0, "y": 0}
    nx.set_node_attributes(tree, attrs)
    return tree


TEST_TREES = [
    {
        "name": "simple1",
        "gt_edges": [
            # 0 - 0 - 0 - 0 - 0 - 0
            #           |
            #           - 1 - 1 - 1
            #
            #     2 - 2 - 2 - 2
            ("0_0", "1_0"),
            ("1_0", "2_0"),
            ("2_0", "3_0"),
            ("3_0", "4_0"),
            ("4_0", "5_0"),
            ("2_0", "3_1"),
            ("3_1", "4_1"),
            ("4_1", "5_1"),
            ("1_2", "2_2"),
            ("2_2", "3_2"),
            ("3_2", "4_2"),
        ],
        "pred_edges": [
            # 0 - 0 - 0 - 0   0 - 0
            #           |
            #           - 1
            #               - 1 - 1
            #               |
            #     2 - 2 - 2 -
            ("0_0", "1_0"),
            ("1_0", "2_0"),
            ("2_0", "3_0"),
            ("4_0", "5_0"),
            ("2_0", "3_1"),
            ("1_2", "2_2"),
            ("2_2", "3_2"),
            ("3_2", "4_1"),
            ("4_1", "5_1"),
            ("4_1", "5_1"),
            ("4_1", "5_1"),
        ],
        "results_with_division_edges": {
            "track_purity": 7 / 9,
            "target_effectiveness": 6 / 11,
        },
        "results_without_division_edges": {
            "track_purity": 5 / 7,
            "target_effectiveness": 6 / 9,
        },
    },
    {
        "name": "overlap",
        # 0 - 0 - 0 - 0
        #       |
        #       - 1 - 1
        "gt_edges": [
            ("0_0", "1_0"),
            ("1_0", "2_0"),
            ("2_0", "3_0"),
            ("1_0", "2_1"),
            ("2_1", "3_1"),
        ],
        # 0 - 0 - 0
        #       |
        #       - 1 - 1
        #     2 - 2 - 2
        # (2 and 1 overlap)
        "pred_edges": [
            ("0_0", "1_0"),
            ("1_0", "2_0"),
            ("1_0", "2_1"),
            ("2_1", "3_1"),
            ("1_2", "2_2"),
            ("2_2", "3_2"),
        ],
        "mapping": [  # GT to pred mapping
            ("0_0", "0_0"),
            ("1_0", "1_0"),
            ("2_0", "2_0"),
            ("3_0", "3_0"),
            ("2_1", "2_1"),
            ("3_1", "3_1"),
            ("2_1", "2_2"),
            ("3_1", "3_2"),
        ],
        "results_with_division_edges": {
            "track_purity": 5 / 6,
            "target_effectiveness": 4 / 5,
        },
        "results_without_division_edges": {
            "track_purity": 3 / 4,
            "target_effectiveness": 2 / 3,
        },
    },
]

simple2 = deepcopy(TEST_TREES[0])
simple2["name"] = "simple2"
# 0 - 0 - 0 - 0   0 - 0
#           |
#           - 1
#               - 1 - 1
#               |
#     2 - 2 - 2 -
#           |
#           - 3 - 3
simple2["pred_edges"].extend(
    [
        ("2_2", "3_3"),
        ("3_3", "4_3"),
    ]
)
simple2["results_with_division_edges"] = {
    "track_purity": 7 / 11,
    "target_effectiveness": 5 / 11,
}
simple2["results_without_division_edges"] = {
    "track_purity": 5 / 7,
    "target_effectiveness": 5 / 9,
}
TEST_TREES.append(simple2)
assert TEST_TREES[0] != TEST_TREES[1]


@pytest.mark.parametrize("data", TEST_TREES)
@pytest.mark.parametrize("inverse", [False, True])
def test_track_overlap_metrics(data, inverse) -> None:
    g_gt = add_frame(nx.from_edgelist(data["gt_edges"], create_using=nx.DiGraph))
    g_pred = add_frame(nx.from_edgelist(data["pred_edges"], create_using=nx.DiGraph))
    if "mapping" in data:
        mapping = data["mapping"]
    else:
        mapping = [(n, n) for n in g_gt.nodes]

    if inverse:
        g_gt, g_pred = g_pred, g_gt
        mapping = [(b, a) for a, b in mapping]

    matched = Matched(TrackingGraph(g_gt), TrackingGraph(g_pred), mapping, {"name": "DummyMatcher"})

    metric = TrackOverlapMetrics()
    results = metric._compute(matched)
    assert results

    expected = data["results_with_division_edges"]
    if inverse:
        expected = {
            "track_purity": expected["target_effectiveness"],
            "target_effectiveness": expected["track_purity"],
        }
    assert results == expected, f"{data['name']} failed with division edges"

    metric = TrackOverlapMetrics(include_division_edges=False)
    results = metric._compute(matched)
    assert results

    expected = data["results_without_division_edges"]
    if inverse:
        expected = {
            "track_purity": expected["target_effectiveness"],
            "target_effectiveness": expected["track_purity"],
        }
    assert results == expected, f"{data['name']} failed without division edges"


@pytest.mark.parametrize(
    ["graph", "expected_purity", "expected_effectiveness"],
    [
        # purity: there are three edges in pred graph, and only one is in GT
        # because GT edge 1 -> 3 means we expect pred edge 5 -> 7
        # but pred holds 5 -> 6 -> 7
        # effectiveness: there are two edges in GT graph, and only one is in pred
        # because pred edges 5 -> 6 and 6 -> 7 means we expect GT edges
        # 1 -> ? and ? -> 3, but GT holds 1 -> 3
        (ex_graphs.gap_close_gt_gap, 1 / 3, 1 / 2),
        # there are two edges in pred graph, and only one matches GT
        # both cases are opposite to the previous test
        (ex_graphs.gap_close_pred_gap, 1 / 2, 1 / 3),
        # there are two edges in both graphs, but the gaps are offset.
        # there are no overlapping edges
        (ex_graphs.gap_close_offset, 0, 0),
        # identical graphs, perfect overlap
        (ex_graphs.gap_close_matched_gap, 1, 1),
    ],
)
def test_track_overlap_gap_close(graph, expected_purity, expected_effectiveness):
    matched = graph()
    metric = TrackOverlapMetrics()
    results = metric.compute(matched)

    assert results.results["track_purity"] == expected_purity
    assert results.results["target_effectiveness"] == expected_effectiveness


@pytest.mark.parametrize(
    ["graph", "include_div_edges", "expected_purity", "expected_effectiveness"],
    [
        # 6 edges in GT, 5 edges in pred
        # 3 of the 5 pred edges are maximally overlapping a GT tracklet
        # 3 of the 6 GT edges are maximally overlapping a pred tracklet
        (ex_graphs.div_parent_gap, True, 3 / 5, 3 / 6),
        # removed branch edges
        # 3 of the 3 pred edges are maximally overlapping a GT tracklet
        # 3 of the 4 GT edges are maximally overlapping a pred tracklet
        (ex_graphs.div_parent_gap, False, 3 / 3, 3 / 4),
        # 6 edges in GT, 5 edges in pred, one of them is a branch edge
        # 4 of the edges in pred are maximally overlapping a GT tracklet
        # (all edges of the two non-skip tracklets)
        # 4 of the 6 GT edges are maximally overlapping a pred tracklet
        # (the branch skip edge leads to 2 non-overlapped GT edges)
        (ex_graphs.div_daughter_gap, True, 4 / 5, 4 / 6),
        # removed branch edges, means we only have two tracklets in pred
        # 3 pred edges are maximally overlapping a GT tracklet
        # 3 GT edges are maximally overlapping a pred tracklet
        # one tracklet of one edge fully unmatched
        (ex_graphs.div_daughter_gap, False, 3 / 3, 3 / 4),
    ],
)
def test_track_overlap_gap_close_divisions(
    graph, include_div_edges, expected_purity, expected_effectiveness
):
    matched = graph()
    metric = TrackOverlapMetrics(include_division_edges=include_div_edges)
    results = metric.compute(matched)

    assert results.results["track_purity"] == expected_purity
    assert results.results["target_effectiveness"] == expected_effectiveness
