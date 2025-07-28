import numpy as np
import pytest

from tests.examples import graphs as ex_graphs
from tests.examples import larger_examples as ex_graphs_larger
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

    @pytest.mark.parametrize(
        ("incl_div_edges", "tp", "te"),
        [
            (True, 2 / 4, 2 / 6),
            (False, 2 / 2, 2 / 4),
        ],
    )
    def test_div_daughter_dual_gap(self, incl_div_edges, tp, te):
        matched = ex_graphs.div_daughter_dual_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "tp", "te"),
        [
            (True, 13 / 18, 11 / 20),
            (False, 8 / 14, 8 / 14),
        ],
    )
    def test_larger_example_1(self, incl_div_edges, tp, te):
        matched = ex_graphs_larger.larger_example_1()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
