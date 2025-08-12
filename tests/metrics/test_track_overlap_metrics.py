import numpy as np
import pytest

from tests.examples import graphs as ex_graphs
from tests.examples import larger_examples as ex_graphs_larger
from traccuracy.metrics._track_overlap import TrackOverlapMetrics


def test_overlap_relax_warning():
    matched = ex_graphs.gap_close_gt_gap()
    metric = TrackOverlapMetrics()
    with pytest.warns(
        UserWarning,
        match="Relaxing skips for either predicted or ground truth graphs",
    ):
        results = metric.compute(matched, relax_skips_gt=True).results
    assert results["track_purity"] == 1
    assert results["target_effectiveness"] == 1
    assert results["track_fractions"] == 1

    with pytest.warns(
        UserWarning,
        match="Relaxing skips for either predicted or ground truth graphs",
    ):
        results = metric.compute(matched, relax_skips_pred=True).results
    assert results["track_purity"] == 1
    assert results["target_effectiveness"] == 1
    assert results["track_fractions"] == 1


class TestStandardOverlapMetrics:
    tp = "track_purity"
    te = "target_effectiveness"
    tf = "track_fractions"

    @pytest.mark.parametrize("incl_div_edges", [True, False])
    def test_empty_gt(self, incl_div_edges):
        matched = ex_graphs.empty_gt()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == 0
        assert np.isnan(results[self.te])
        assert np.isnan(results[self.tf])

    @pytest.mark.parametrize("incl_div_edges", [True, False])
    def test_empty_pred(self, incl_div_edges):
        matched = ex_graphs.empty_pred()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert np.isnan(results[self.tp])
        assert results[self.te] == 0
        assert results[self.tf] == 0

    @pytest.mark.parametrize("incl_div_edges", [True, False])
    def test_good_match(self, incl_div_edges):
        matched = ex_graphs.good_matched()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == 1
        assert results[self.te] == 1
        assert results[self.tf] == 1

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
        assert results[self.tf] == te

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
        assert results[self.tf] == te

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
        assert results[self.tf] == te

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
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "tp", "te"), [(True, 0.5, 0.25), (False, 0.5, 0.25)]
    )
    def test_crossover(self, incl_div_edges, tp, te):
        matched = ex_graphs.crossover_edge()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("time", "tp", "te"),
        [
            (0, 1, 1),
            (1, 0.5, 1),
            (2, 1, 1),
        ],
    )
    def test_node_two_to_one(self, time, tp, te):
        matched = ex_graphs.node_two_to_one(time)
        metric = TrackOverlapMetrics()
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("time", "tp", "te"),
        [
            (0, 1, 3 / 4),
            (1, 1, 3 / 4),
        ],
    )
    def test_edge_two_to_one(self, time, tp, te):
        matched = ex_graphs.edge_two_to_one(time)
        metric = TrackOverlapMetrics()
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("time", "tp", "te"),
        [
            (0, 1, 1),
            (1, 1, 0.5),
            (2, 1, 1),
        ],
    )
    def test_node_one_to_two(self, time, tp, te):
        matched = ex_graphs.node_one_to_two(time)
        metric = TrackOverlapMetrics()
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("time", "tp", "te"),
        [
            (0, 3 / 4, 1),
            (1, 3 / 4, 1),
        ],
    )
    def test_edge_one_to_two(self, time, tp, te):
        matched = ex_graphs.edge_one_to_two(time)
        metric = TrackOverlapMetrics()
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("relax_edges", "tp", "te"),
        [
            (False, 2 / 3, 2 / 8),
            (True, 1, 6 / 8),
        ],
    )
    def test_gap_close_two_to_one(self, relax_edges, tp, te):
        matched = ex_graphs.gap_close_two_to_one()
        metric = TrackOverlapMetrics()
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "relax_edges", "tp", "te"),
        [
            (True, False, 1 / 3, 0.5),
            (False, False, 1 / 3, 0.5),
            (True, True, 1, 1),
            (False, True, 1, 1),
        ],
    )
    def test_gap_close_gt_gap(self, incl_div_edges, relax_edges, tp, te):
        matched = ex_graphs.gap_close_gt_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "relax_edges", "tp", "te"),
        [
            (True, False, 0.5, 1 / 3),
            (False, False, 0.5, 1 / 3),
            (True, True, 1, 1),
            (False, True, 1, 1),
        ],
    )
    def test_gap_close_pred_gap(self, incl_div_edges, relax_edges, tp, te):
        matched = ex_graphs.gap_close_pred_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "relax_edges", "tp", "te"),
        [(True, False, 1, 1), (False, False, 1, 1), (True, True, 1, 1), (False, True, 1, 1)],
    )
    def test_gap_close_matched_gap(self, incl_div_edges, relax_edges, tp, te):
        matched = ex_graphs.gap_close_matched_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "relax_edges", "tp", "te"),
        [(True, False, 0, 0), (False, False, 0, 0), (True, True, 0, 0), (False, True, 0, 0)],
    )
    def test_gap_close_offset(self, relax_edges, incl_div_edges, tp, te):
        matched = ex_graphs.gap_close_offset()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "relax_edges", "tp", "te"),
        [
            (True, False, 1 / 7, 1 / 7),
            (False, False, 1 / 7, 1 / 7),
            (True, True, 4 / 7, 4 / 7),
            (False, True, 4 / 7, 4 / 7),
        ],
    )
    def test_gap_all_basic_errors(self, incl_div_edges, relax_edges, tp, te):
        matched = ex_graphs.all_basic_errors()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "t_div", "tp", "te", "tf"),
        [
            (True, 0, 3 / 4, 1, 1),
            (True, 1, 2 / 3, 0.5, 0.5),
            (False, 0, 1, 2 / 3, 1.5 / 2),
            (False, 1, 1, 0.5, 0.5),
        ],
    )
    def test_fp_div(self, incl_div_edges, tp, te, tf, t_div):
        matched = ex_graphs.fp_div(t_div)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == tf

    @pytest.mark.parametrize(
        ("incl_div_edges", "t_div", "tp", "te", "tf"),
        [
            (True, 0, 1, 3 / 4, 1.5 / 2),
            (True, 1, 0.5, 2 / 3, 2 / 3),
            (False, 0, 2 / 3, 1, 1),
            (False, 1, 0.5, 1, 1),
        ],
    )
    def test_one_child(self, incl_div_edges, tp, te, tf, t_div):
        matched = ex_graphs.one_child(t_div)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == tf

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
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "t_div", "tp", "te", "tf"),
        [
            (True, 0, 3 / 4, 3 / 5, 2 / 3),
            (True, 1, 2 / 3, 2 / 3, 2 / 3),
            (False, 0, 1, 2 / 3, 2 / 3),
            (False, 1, 1, 1, 1),
        ],
    )
    def test_wrong_child(self, incl_div_edges, tp, te, tf, t_div):
        matched = ex_graphs.wrong_child(t_div)
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == tf

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
        assert results[self.tf] == te

    @pytest.mark.parametrize(
        ("incl_div_edges", "relax_edges", "tp", "te", "tf"),
        [
            (True, False, 4 / 5, 4 / 6, 4 / 6),
            (False, False, 3 / 3, 3 / 4, 2 / 3),
            (True, True, 1, 1, 1),
            (False, True, 3 / 3, 3 / 4, 2 / 3),
        ],
    )
    def test_div_daughter_gap(self, incl_div_edges, relax_edges, tp, te, tf):
        matched = ex_graphs.div_daughter_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == tf

    @pytest.mark.parametrize(
        ("incl_div_edges", "relax_edges", "tp", "te", "tf"),
        [
            (True, False, 2 / 4, 2 / 6, 1 / 3),
            (False, False, 2 / 2, 2 / 4, 1 / 3),
            (True, True, 1, 1, 1),
            (False, True, 1, 2 / 4, 1 / 3),
        ],
    )
    def test_div_daughter_dual_gap(self, incl_div_edges, relax_edges, tp, te, tf):
        matched = ex_graphs.div_daughter_dual_gap()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        assert results[self.tf] == tf

    @pytest.mark.parametrize(
        ("incl_div_edges", "relax_edges", "tp", "te", "tf"),
        [
            (True, False, 13 / 18, 11 / 20, 5.25 / 9),
            (False, False, 8 / 14, 8 / 14, 16 / 27),
            # making sure relaxing affects nothing where
            # there are no skip edges
            (True, True, 13 / 18, 11 / 20, 5.25 / 9),
            (False, True, 8 / 14, 8 / 14, 16 / 27),
        ],
    )
    def test_larger_example_1(self, incl_div_edges, relax_edges, tp, te, tf):
        matched = ex_graphs_larger.larger_example_1()
        metric = TrackOverlapMetrics(include_division_edges=incl_div_edges)
        results = metric._compute(matched, relax_skips_gt=relax_edges, relax_skips_pred=relax_edges)
        assert results[self.tp] == tp
        assert results[self.te] == te
        # tf of 16/27 leads to a floating point error, so we compare against
        # a very small tolerance here instead
        assert abs(results[self.tf] - tf) < 1e-10
