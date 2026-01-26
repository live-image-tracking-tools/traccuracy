import re

import networkx as nx
import numpy as np
import pytest

import tests.examples.segs as ex_segs
from tests.test_utils import get_movie_with_graph
from traccuracy import TrackingGraph
from traccuracy.matchers._point_seg import PointSegMatcher, match_point_to_seg


def get_ids_locations(node_dict, loc_keys):
    ids = list(node_dict.keys())
    locs = [[node_dict[_id][key] for key in loc_keys] for _id in ids]
    return ids, locs


class TestStandards:
    """Test match_point_to_seg for all the standard cases

    Tests are written for gt segmentation and predicted points
    """

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.good_segmentation_2d(), ("x", "y")),
            (ex_segs.good_segmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_good_seg(self, data, loc_keys):
        gt_seg = data[0].segmentation
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        matches = match_point_to_seg(pred_ids, pred_locs, gt_seg)
        # dict from pred_id to gt_seg_label
        assert matches == {2: 1}

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.false_positive_segmentation_2d(), ("x", "y")),
            (ex_segs.false_positive_segmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_false_pos(self, data, loc_keys):
        gt_seg = data[0].segmentation
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        matches = match_point_to_seg(pred_ids, pred_locs, gt_seg)
        # dict from pred_id to gt_seg_label
        # Empty dict if no match
        assert matches == {}

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.false_negative_segmentation_2d(), ("x", "y")),
            (ex_segs.false_negative_segmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_false_neg(self, data, loc_keys):
        gt_seg = data[0].segmentation
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        matches = match_point_to_seg(pred_ids, pred_locs, gt_seg)
        # dict from pred_id to gt_seg_label
        # empty dict b/c no predicted detection
        assert matches == {}

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.oversegmentation_2d(), ("x", "y")),
            (ex_segs.oversegmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_overseg(self, data, loc_keys):
        gt_seg = data[0].segmentation
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        matches = match_point_to_seg(pred_ids, pred_locs, gt_seg)
        # dict from pred_id to gt_seg_label
        assert matches == {3: 1, 2: 1}

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.undersegmentation_2d(), ("x", "y")),
            (ex_segs.undersegmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_underseg(self, data, loc_keys):
        gt_seg = data[0].segmentation
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        matches = match_point_to_seg(pred_ids, pred_locs, gt_seg)
        # dict from pred_id to gt_seg_label
        assert matches == {3: 1}

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.no_overlap_2d(), ("x", "y")),
            (ex_segs.no_overlap_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_no_overlap(self, data, loc_keys):
        gt_seg = data[0].segmentation
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        matches = match_point_to_seg(pred_ids, pred_locs, gt_seg)
        # dict from pred_id to gt_seg_label
        assert matches == {}

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.multicell_2d(), ("x", "y")),
            (ex_segs.multicell_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_no_multicell(self, data, loc_keys):
        gt_seg = data[0].segmentation
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        matches = match_point_to_seg(pred_ids, pred_locs, gt_seg)
        # dict from pred_id to gt_seg_label
        assert matches == {3: 1}


class TestPointSegMatcher:
    n_frames = 3
    n_labels = 3
    track_graph = get_movie_with_graph(ndims=3, n_frames=n_frames, n_labels=n_labels)

    matcher = PointSegMatcher()

    def test_no_loc_key(self):
        data = TrackingGraph(self.track_graph.graph)
        with pytest.raises(
            ValueError, match=re.escape("Must provide location key(s) to access node locations")
        ):
            self.matcher._compute_mapping(data, self.track_graph)

    def test_no_seg(self):
        data = TrackingGraph(self.track_graph.graph, location_keys=self.track_graph.location_keys)
        with pytest.raises(ValueError, match=r"Data provided does not contain segmentations."):
            self.matcher._compute_mapping(data, data)

    def test_both_seg(self):
        with pytest.raises(
            ValueError,
            match=r"Both datasets have segmentations. "
            r"Please provide only one dataset with segmentations.",
        ):
            self.matcher._compute_mapping(self.track_graph, self.track_graph)

    def test_diff_node_ids(self):
        # Relabel nodes to distinguish point nodes from seg nodes
        pgraph = nx.relabel_nodes(
            self.track_graph.graph, {node: node + 100 for node in self.track_graph.graph}
        )
        point_data = TrackingGraph(pgraph, location_keys=self.track_graph.location_keys)
        # Nodes ids are label_time so not an exact mapping from segmentation label value
        seg_data = self.track_graph

        matched = self.matcher.compute_mapping(point_data, seg_data)
        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same after subtracting 100 from point node
        for pair in matched.mapping:
            assert pair[0] - 100 == pair[1]

        # Check matching going in the other direction
        matched = self.matcher.compute_mapping(seg_data, point_data)
        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same after removing p prefix
        for pair in matched.mapping:
            assert pair[0] == pair[1] - 100

    def test_empty(self):
        point_empty = TrackingGraph(nx.DiGraph(), location_keys=("x", "y"))
        seg_empty = TrackingGraph(
            nx.DiGraph(), segmentation=np.ndarray(shape=(), dtype="int64"), location_keys=("x", "y")
        )

        matched = self.matcher.compute_mapping(point_empty, seg_empty)
        assert len(matched.mapping) == 0
