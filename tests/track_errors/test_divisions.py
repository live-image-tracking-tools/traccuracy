import pytest

import tests.examples.graphs as ex_graphs
from tests.test_utils import get_division_graphs
from traccuracy import NodeFlag, TrackingGraph
from traccuracy.matchers._matched import Matched
from traccuracy.track_errors._divisions import (
    _classify_divisions,
    _correct_shifted_divisions,
    _get_pred_by_t,
    _get_succ_by_t,
    evaluate_division_events,
)
from traccuracy.utils import get_corrected_division_graphs_with_delta


def assert_corrected_graphs(matched, gt_node, pred_node, n_frames, allow_skips=False):
    corrected_gt, corrected_pred = get_corrected_division_graphs_with_delta(
        matched, n_frames, relax_skip_edges=allow_skips
    )

    attrs = corrected_gt.nodes[gt_node]
    assert NodeFlag.FN_DIV not in attrs
    assert NodeFlag.TP_DIV in attrs

    attrs = corrected_pred.nodes[pred_node]
    assert NodeFlag.FP_DIV not in attrs
    assert NodeFlag.TP_DIV in attrs


def swap_gt_pred(matched: Matched):
    # flip mapping
    flipped_map = [(b, a) for (a, b) in matched.mapping]
    return Matched(
        gt_graph=matched.pred_graph,
        pred_graph=matched.gt_graph,
        mapping=flipped_map,
        matcher_info={},
    )


def test_inconsistent_annotations_raises():
    matched = ex_graphs.good_matched()
    _classify_divisions(matched)

    gt_graph = matched.gt_graph
    pred_graph = ex_graphs.good_matched().pred_graph
    matched = Matched(gt_graph=gt_graph, pred_graph=pred_graph, mapping=[], matcher_info={})
    with pytest.raises(ValueError, match="both or neither of the graphs"):
        _classify_divisions(matched)


class TestStandardsDivisions:
    """Test _classify_divisions against standard cases

    Tests are written for sparse annotations
    """

    @pytest.mark.parametrize("t_div,div_node", [(0, (1, 6)), (1, (2, 6)), (2, (3, 8))])
    def test_good_div(self, t_div, div_node):
        matched = ex_graphs.good_div(t_div)
        _classify_divisions(matched)

        assert matched.gt_graph.nodes[div_node[0]].get(NodeFlag.TP_DIV) is True
        assert matched.pred_graph.nodes[div_node[1]].get(NodeFlag.TP_DIV) is True

    @pytest.mark.parametrize("t_div,pred_div_node", [(0, 6), (1, 6)])
    def test_fp_div(self, t_div, pred_div_node):
        matched = ex_graphs.fp_div(t_div)
        _classify_divisions(matched)

        pred_node_attr = matched.pred_graph.nodes[pred_div_node]
        assert pred_node_attr.get(NodeFlag.FP_DIV) is True

    @pytest.mark.parametrize("t_div,gt_div_node", [(0, 1), (1, 2)])
    def test_one_child(self, t_div, gt_div_node):
        matched = ex_graphs.one_child(t_div)
        _classify_divisions(matched)

        gt_node_attr = matched.gt_graph.nodes[gt_div_node]
        assert gt_node_attr.get(NodeFlag.FN_DIV) is True

    @pytest.mark.parametrize("t_div,gt_div_node", [(0, 1), (1, 2)])
    def test_no_children(self, t_div, gt_div_node):
        matched = ex_graphs.no_children(t_div)
        _classify_divisions(matched)

        gt_node_attr = matched.gt_graph.nodes[gt_div_node]
        assert gt_node_attr.get(NodeFlag.FN_DIV) is True

    @pytest.mark.parametrize("t_div,gt_div_node,pred_div_node", [(0, 1, 8), (1, 2, 7)])
    def test_wrong_child(self, t_div, gt_div_node, pred_div_node):
        matched = ex_graphs.wrong_child(t_div)
        _classify_divisions(matched)

        gt_node_attr = matched.gt_graph.nodes[gt_div_node]
        assert gt_node_attr.get(NodeFlag.WC_DIV) is True

        pred_node_attr = matched.pred_graph.nodes[pred_div_node]
        assert pred_node_attr.get(NodeFlag.WC_DIV) is True

    @pytest.mark.parametrize("t_div,gt_div_node,pred_div_node", [(0, 1, 6), (1, 2, 6)])
    def test_wrong_children(self, t_div, gt_div_node, pred_div_node):
        matched = ex_graphs.wrong_children(t_div)
        _classify_divisions(matched)

        gt_node_attr = matched.gt_graph.nodes[gt_div_node]
        assert gt_node_attr.get(NodeFlag.WC_DIV) is True

        pred_node_attr = matched.pred_graph.nodes[pred_div_node]
        assert pred_node_attr.get(NodeFlag.WC_DIV) is True


class Test_get_pred_by_t:
    g = ex_graphs.basic_graph()

    def test_predecessor_available(self):
        start_node = 3
        delta = 2
        node = _get_pred_by_t(self.g, start_node, delta)
        assert node == 1

    def test_no_predecessor(self):
        start_node = 2
        delta = 2
        node = _get_pred_by_t(self.g, start_node, delta)
        assert node is None


class Test_get_succ_by_t:
    g = ex_graphs.basic_division(2)

    def across_division(self):
        # Return none if looking across division
        start_node = 3
        delta = 2
        succ = _get_succ_by_t(self.g, start_node, delta)
        assert succ is None

    def valid_succ(self):
        # Find 2 frames forward with valid node
        start_node = 1
        delta = 2
        succ = _get_succ_by_t(self.g, start_node, delta)
        assert succ == 3

    def no_succ(self):
        # Forward without valid node returns None
        start_node = 4
        delta = 1
        succ = _get_succ_by_t(self.g, start_node, delta)
        assert succ is None


class TestStandardShifted:
    """Test correct_shifted_divisions against standard shifted cases"""

    @pytest.mark.filterwarnings("ignore::UserWarning")
    @pytest.mark.parametrize("n_frames", [1, 2])
    @pytest.mark.parametrize(
        "matched, gt_node, pred_node",
        [(ex_graphs.div_1early_end(), 2, 9), (ex_graphs.div_1early_mid(), 3, 9)],
        ids=["div_1early_end", "div_1early_mid"],
    )
    def test_div_1early(self, n_frames, matched, gt_node, pred_node):
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=n_frames)

        attrs = matched.gt_graph.nodes[gt_node]
        assert NodeFlag.FN_DIV in attrs
        assert attrs.get("min_buffer_correct") == 1

        attrs = matched.pred_graph.nodes[pred_node]
        assert NodeFlag.FP_DIV in attrs
        assert attrs.get("min_buffer_correct") == 1

        assert_corrected_graphs(matched, gt_node, pred_node, n_frames)

    @pytest.mark.filterwarnings("ignore::UserWarning")
    @pytest.mark.parametrize("n_frames", [1, 3])
    @pytest.mark.parametrize(
        "matched, gt_node, pred_node",
        [(ex_graphs.div_2early_end(), 3, 8), (ex_graphs.div_2early_mid(), 4, 8)],
        ids=["div_2early_end", "div_2early_mid"],
    )
    def test_div_2early(self, n_frames, matched, gt_node, pred_node):
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=n_frames)

        attrs = matched.gt_graph.nodes[gt_node]
        assert attrs.get(NodeFlag.FN_DIV) is True

        attrs = matched.pred_graph.nodes[pred_node]
        assert attrs.get(NodeFlag.FP_DIV) is True
        if n_frames == 3:  # corrected
            attrs = matched.gt_graph.nodes[gt_node]
            assert attrs.get("min_buffer_correct") == 3

            attrs = matched.pred_graph.nodes[pred_node]
            assert attrs.get("min_buffer_correct") == 3

            assert_corrected_graphs(matched, gt_node, pred_node, n_frames)

    @pytest.mark.filterwarnings("ignore::UserWarning")
    @pytest.mark.parametrize("n_frames", [1, 2])
    @pytest.mark.parametrize(
        "matched, gt_node, pred_node",
        [(ex_graphs.div_1late_end(), 1, 11), (ex_graphs.div_1late_mid(), 2, 11)],
        ids=["div_1late_end", "div_1late_mid"],
    )
    def test_div_1late(self, n_frames, matched, gt_node, pred_node):
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=n_frames)

        attrs = matched.gt_graph.nodes[gt_node]
        assert attrs.get(NodeFlag.FN_DIV) is True
        assert attrs.get("min_buffer_correct") == 1

        attrs = matched.pred_graph.nodes[pred_node]
        assert attrs.get(NodeFlag.FP_DIV) is True
        assert attrs.get("min_buffer_correct") == 1

        assert_corrected_graphs(matched, gt_node, pred_node, n_frames)

    @pytest.mark.filterwarnings("ignore::UserWarning")
    @pytest.mark.parametrize("n_frames", [1, 3])
    @pytest.mark.parametrize(
        "matched, gt_node, pred_node",
        [(ex_graphs.div_2late_end(), 1, 12), (ex_graphs.div_2late_mid(), 2, 12)],
        ids=["div_2late_end", "div_2late_mid"],
    )
    def test_div_2late(self, n_frames, matched, gt_node, pred_node):
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=n_frames)

        if n_frames == 1:  # Not corrected
            attrs = matched.gt_graph.nodes[gt_node]
            assert attrs.get(NodeFlag.FN_DIV) is True

            attrs = matched.pred_graph.nodes[pred_node]
            assert attrs.get(NodeFlag.FP_DIV) is True

        elif n_frames == 3:  # corrected
            attrs = matched.gt_graph.nodes[gt_node]
            assert NodeFlag.FN_DIV in attrs
            assert attrs.get("min_buffer_correct") == 3

            attrs = matched.pred_graph.nodes[pred_node]
            assert NodeFlag.FP_DIV in attrs
            assert attrs.get("min_buffer_correct") == 3

            assert_corrected_graphs(matched, gt_node, pred_node, n_frames)

    def test_minimal_matching(self):
        matched = ex_graphs.div_shift_min_match()
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=1)

        attrs = matched.gt_graph.nodes[2]
        assert NodeFlag.FN_DIV in attrs
        assert attrs.get("min_buffer_correct") == 1

        attrs = matched.pred_graph.nodes[11]
        assert NodeFlag.FP_DIV in attrs
        assert attrs.get("min_buffer_correct") == 1

        assert_corrected_graphs(matched, 2, 11, 1)

    @pytest.mark.parametrize(
        "matched",
        [
            ex_graphs.div_shift_bad_match_pred(),
            ex_graphs.div_shift_bad_match_daughter(),
        ],
        ids=["pred", "daughters"],
    )
    def test_bad_matching(self, matched):
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=1)

        # No correction of shifted divisions b/c matching criteria not met
        attrs = matched.gt_graph.nodes[2]
        assert attrs.get(NodeFlag.TP_DIV) is None
        assert attrs.get(NodeFlag.FN_DIV) is True

        attrs = matched.pred_graph.nodes[11]
        assert attrs.get(NodeFlag.TP_DIV) is None
        assert attrs.get(NodeFlag.FP_DIV) is True


class TestGapCloseDivisions:
    def test_gap_close_no_shift(self):
        matched = ex_graphs.div_parent_gap()
        # without a shift we should have an FP and an FN division
        # as the parent nodes are in different frames
        _classify_divisions(matched)
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_daughter_gap()
        _classify_divisions(matched)
        # with the division in the correct frame, but no shifting
        # we have an incorrect child
        assert NodeFlag.WC_DIV in matched.pred_graph.nodes[10]
        assert NodeFlag.WC_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_daughter_dual_gap()
        _classify_divisions(matched)
        # both children are now incorrect b/c they are in the next frame
        assert NodeFlag.WC_DIV in matched.pred_graph.nodes[10]
        assert NodeFlag.WC_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_parent_daughter_gap()
        _classify_divisions(matched)
        # Both a FP/FN division
        # daughters are not detected at all
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_shifted_one_side_skip()
        _classify_divisions(matched)
        # Contains both a skip edge and a frame shift so incorrect
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

    def test_gap_close_pred_skip_no_shift(self):
        matched = ex_graphs.div_parent_gap()
        # without a shift we should have an FP and an FN division
        # as the parent nodes are in different frames
        # Still incorrect with skip edges and no shift
        _classify_divisions(matched, relax_skips_pred=True)
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

        # Check that the skip flag is set
        assert matched.pred_graph.division_skip_pred_relaxed is True

        # Parent matched, but one daughter has a skip edge
        matched = ex_graphs.div_daughter_gap()
        _classify_divisions(matched, relax_skips_pred=True)
        # division is correct with skip edge to daughter
        assert NodeFlag.TP_DIV_SKIP in matched.pred_graph.nodes[10]
        assert NodeFlag.TP_DIV_SKIP in matched.gt_graph.nodes[3]

        # parent matched with two outgoing skip edges
        matched = ex_graphs.div_daughter_dual_gap()
        _classify_divisions(matched, relax_skips_pred=True)
        # both children connected by skip edges so correct
        assert NodeFlag.TP_DIV_SKIP in matched.pred_graph.nodes[10]
        assert NodeFlag.TP_DIV_SKIP in matched.gt_graph.nodes[3]

        # Div one frame early with two outgoing skip edges over two timepoints
        matched = ex_graphs.div_parent_daughter_gap()
        _classify_divisions(matched, relax_skips_pred=True)
        # Division in wrong frame w/o shift so skip edges don't correct
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_shifted_one_side_skip()
        _classify_divisions(matched, relax_skips_pred=True)
        # Contains both a skip edge and a frame shift so incorrect
        # Even after allowing skip edge parent nodes still don't match
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

    def test_gap_close_gt_skip_no_shift(self):
        matched = swap_gt_pred(ex_graphs.div_parent_gap())
        # without a shift we should have an FP and an FN division
        # as the parent nodes are in different frames
        # Still incorrect with skip edges and no shift
        _classify_divisions(matched, relax_skips_gt=True)
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[3]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[9]

        # Check that the skip flag is set
        assert matched.gt_graph.division_skip_gt_relaxed is True

        # Parent matched, but one daughter has a skip edge
        matched = swap_gt_pred(ex_graphs.div_daughter_gap())
        _classify_divisions(matched, relax_skips_gt=True)
        # division is correct with skip edge to daughter
        assert NodeFlag.TP_DIV_SKIP in matched.pred_graph.nodes[3]
        assert NodeFlag.TP_DIV_SKIP in matched.gt_graph.nodes[10]

        # parent matched with two outgoing skip edges
        matched = swap_gt_pred(ex_graphs.div_daughter_dual_gap())
        _classify_divisions(matched, relax_skips_gt=True)
        # both children connected by skip edges so correct
        assert NodeFlag.TP_DIV_SKIP in matched.pred_graph.nodes[3]
        assert NodeFlag.TP_DIV_SKIP in matched.gt_graph.nodes[10]

        # Div one frame early with two outgoing skip edges over two timepoints
        matched = swap_gt_pred(ex_graphs.div_parent_daughter_gap())
        _classify_divisions(matched, relax_skips_gt=True)
        # Division in wrong frame w/o shift so skip edges don't correct
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[3]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[9]

        matched = swap_gt_pred(ex_graphs.div_shifted_one_side_skip())
        _classify_divisions(matched, relax_skips_gt=True)
        # Contains both a skip edge and a frame shift so incorrect
        # Even after allowing skip edge parent nodes still don't match
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[3]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[9]

    def test_gap_close_shift(self):
        matched = ex_graphs.div_parent_gap()
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=1)
        # division is not corrected because `get_succ_by_t` traverses
        # two successors given a delta of 1, but our immediate successors
        # are two frames apart. We therefore end up checking children 13 and 14
        # against gt children 4 and 5.
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_daughter_gap()
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=1)
        # `_correct_shifted_divisions` only checks pairs of TP/FP
        # divisions, so the WC_DIV is not corrected. To correct it,
        # we would need to check shifted successors of all WC_DIV
        # matched nodes
        assert NodeFlag.WC_DIV in matched.pred_graph.nodes[10]
        assert NodeFlag.WC_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_daughter_dual_gap()
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=1)
        # both children are now incorrect b/c they are in the next frame
        assert NodeFlag.WC_DIV in matched.pred_graph.nodes[10]
        assert NodeFlag.WC_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_parent_daughter_gap()
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=1)
        # Both a FP/FN division
        # daughters are not detected at all
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

        matched = ex_graphs.div_shifted_one_side_skip()
        _classify_divisions(matched)
        _correct_shifted_divisions(matched, n_frames=1)
        # Contains both a skip edge and a frame shift so incorrect
        # Frame shift won't correct issue without allowing skips
        assert NodeFlag.FP_DIV in matched.pred_graph.nodes[9]
        assert NodeFlag.FN_DIV in matched.gt_graph.nodes[3]

    def test_gap_close_shift_pred_skip(self):
        matched = ex_graphs.div_parent_gap()
        _classify_divisions(matched, relax_skips_pred=True)
        _correct_shifted_divisions(matched, n_frames=1, relaxed=True)
        # becomes correct b/c div is now matched with 1 frame offset
        # And daughters are connected by skip edge
        attrs = matched.pred_graph.nodes[9]
        assert NodeFlag.FP_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1
        attrs = matched.gt_graph.nodes[3]
        assert NodeFlag.FN_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1

        matched = ex_graphs.div_parent_daughter_gap()
        _classify_divisions(matched, relax_skips_pred=True)
        _correct_shifted_divisions(matched, n_frames=1, relaxed=True)
        # buffer allows offset division to be correct
        # skip edge connects to daughters
        attrs = matched.pred_graph.nodes[9]
        assert NodeFlag.FP_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1
        attrs = matched.gt_graph.nodes[3]
        assert NodeFlag.FN_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1

        matched = ex_graphs.div_shifted_one_side_skip()
        _classify_divisions(matched, relax_skips_pred=True)
        _correct_shifted_divisions(matched, n_frames=1, relaxed=True)
        # Contains both a skip edge and a frame shift
        attrs = matched.pred_graph.nodes[9]
        assert NodeFlag.FP_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1
        attrs = matched.gt_graph.nodes[3]
        assert NodeFlag.FN_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1

    def test_gap_close_shift_gt_skip(self):
        matched = swap_gt_pred(ex_graphs.div_parent_gap())
        _classify_divisions(matched, relax_skips_gt=True)
        _correct_shifted_divisions(matched, n_frames=1, relaxed=True)
        # becomes correct b/c div is now matched with 1 frame offset
        # And daughters are connected by skip edge
        attrs = matched.pred_graph.nodes[3]
        assert NodeFlag.FP_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1
        attrs = matched.gt_graph.nodes[9]
        assert NodeFlag.FN_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1

        matched = swap_gt_pred(ex_graphs.div_parent_daughter_gap())
        _classify_divisions(matched, relax_skips_gt=True)
        _correct_shifted_divisions(matched, n_frames=1, relaxed=True)
        # buffer allows offset division to be correct
        # skip edge connects to daughters
        attrs = matched.pred_graph.nodes[3]
        assert NodeFlag.FP_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1
        attrs = matched.gt_graph.nodes[9]
        assert NodeFlag.FN_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1

        matched = swap_gt_pred(ex_graphs.div_shifted_one_side_skip())
        _classify_divisions(matched, relax_skips_gt=True)
        _correct_shifted_divisions(matched, n_frames=1, relaxed=True)
        # Contains both a skip edge and a frame shift
        attrs = matched.pred_graph.nodes[3]
        assert NodeFlag.FP_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1
        attrs = matched.gt_graph.nodes[9]
        assert NodeFlag.FN_DIV in attrs
        assert attrs.get("min_buffer_skip_correct") == 1


def test_evaluate_division_events():
    g_gt, g_pred, map_gt, map_pred = get_division_graphs()
    mapper = list(zip(map_gt, map_pred, strict=False))
    frame_buffer = 2

    matched_data = Matched(
        TrackingGraph(g_gt), TrackingGraph(g_pred), mapper, {"name": "DummyMatcher"}
    )

    matched = evaluate_division_events(matched_data, max_frame_buffer=frame_buffer)

    for node in matched.gt_graph.get_nodes_with_flag(NodeFlag.FN_DIV):
        assert "min_buffer_correct" in matched.gt_graph.nodes[node]
    for node in matched.pred_graph.get_nodes_with_flag(NodeFlag.FP_DIV):
        assert "min_buffer_correct" in matched.pred_graph.nodes[node]
