import copy
import re

import networkx as nx
import pytest

import tests.examples.segs as ex_segs
from examples.segs import SegmentationData
from tests.test_utils import get_movie_with_graph
from traccuracy import TrackingGraph
from traccuracy.matchers._point import PointMatcher


class TestStandards:
    """Test _match_frame for each standard test case"""

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.good_segmentation_2d(), ("x", "y")),
            (ex_segs.good_segmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_good_seg(
        self, data: tuple[SegmentationData, SegmentationData], loc_keys: tuple[str, ...]
    ):
        gt_nodes = ex_segs.nodes_from_segmentation(data[0].segmentation, pos_keys=loc_keys)
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)

        def get_ids_locations(node_dict, loc_keys):
            ids = list(node_dict.keys())
            locs = [[node_dict[_id][key] for key in loc_keys] for _id in ids]
            return ids, locs

        gt_ids, gt_locs = get_ids_locations(gt_nodes, loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        # high threshold
        matcher = PointMatcher(threshold=50)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == [(1, 2)]

        # low threshold
        matcher = PointMatcher(threshold=1)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == []

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.false_positive_segmentation_2d(), ("x", "y")),
            (ex_segs.false_positive_segmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_false_pos(
        self, data: tuple[SegmentationData, SegmentationData], loc_keys: tuple[str, ...]
    ):
        gt_nodes = ex_segs.nodes_from_segmentation(data[0].segmentation, pos_keys=loc_keys)
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)

        def get_ids_locations(node_dict, loc_keys):
            ids = list(node_dict.keys())
            locs = [[node_dict[_id][key] for key in loc_keys] for _id in ids]
            return ids, locs

        gt_ids, gt_locs = get_ids_locations(gt_nodes, loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        # high threshold
        matcher = PointMatcher(threshold=50)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == []

        # low threshold
        matcher = PointMatcher(threshold=1)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == []

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.false_negative_segmentation_2d(), ("x", "y")),
            (ex_segs.false_negative_segmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_false_neg(
        self, data: tuple[SegmentationData, SegmentationData], loc_keys: tuple[str, ...]
    ):
        gt_nodes = ex_segs.nodes_from_segmentation(data[0].segmentation, pos_keys=loc_keys)
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)

        def get_ids_locations(node_dict, loc_keys):
            ids = list(node_dict.keys())
            locs = [[node_dict[_id][key] for key in loc_keys] for _id in ids]
            return ids, locs

        gt_ids, gt_locs = get_ids_locations(gt_nodes, loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        # high threshold
        matcher = PointMatcher(threshold=50)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == []

        # low threshold
        matcher = PointMatcher(threshold=1)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == []

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.oversegmentation_2d(), ("x", "y")),
            (ex_segs.oversegmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_overseg(
        self, data: tuple[SegmentationData, SegmentationData], loc_keys: tuple[str, ...]
    ):
        gt_nodes = ex_segs.nodes_from_segmentation(data[0].segmentation, pos_keys=loc_keys)
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)

        def get_ids_locations(node_dict, loc_keys):
            ids = list(node_dict.keys())
            locs = [[node_dict[_id][key] for key in loc_keys] for _id in ids]
            return ids, locs

        gt_ids, gt_locs = get_ids_locations(gt_nodes, loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        # high threshold
        matcher = PointMatcher(threshold=50)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        # the center of the seg with label 2 is closer than that of the seg with label 3
        assert matches == [(1, 2)]

        # low threshold
        matcher = PointMatcher(threshold=1)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == []

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.undersegmentation_2d(), ("x", "y")),
            (ex_segs.undersegmentation_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_underseg(
        self, data: tuple[SegmentationData, SegmentationData], loc_keys: tuple[str, ...]
    ):
        gt_nodes = ex_segs.nodes_from_segmentation(data[0].segmentation, pos_keys=loc_keys)
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)

        def get_ids_locations(node_dict, loc_keys):
            ids = list(node_dict.keys())
            locs = [[node_dict[_id][key] for key in loc_keys] for _id in ids]
            return ids, locs

        gt_ids, gt_locs = get_ids_locations(gt_nodes, loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        # high threshold
        matcher = PointMatcher(threshold=50)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        # the center of the seg with label 1 is closer than that of the seg with label 2
        assert matches == [(1, 3)]

        # low threshold
        matcher = PointMatcher(threshold=1)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == []

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.multicell_2d(), ("x", "y")),
            (ex_segs.multicell_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_multicell(
        self, data: tuple[SegmentationData, SegmentationData], loc_keys: tuple[str, ...]
    ):
        gt_nodes = ex_segs.nodes_from_segmentation(data[0].segmentation, pos_keys=loc_keys)
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)

        def get_ids_locations(node_dict, loc_keys):
            ids = list(node_dict.keys())
            locs = [[node_dict[_id][key] for key in loc_keys] for _id in ids]
            return ids, locs

        gt_ids, gt_locs = get_ids_locations(gt_nodes, loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        # high threshold
        matcher = PointMatcher(threshold=50)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == [(1, 3), (2, 4)]

        # low threshold
        matcher = PointMatcher(threshold=1)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == [(1, 3)]

    @pytest.mark.parametrize(
        "data,loc_keys",
        [
            (ex_segs.no_overlap_2d(), ("x", "y")),
            (ex_segs.no_overlap_3d(), ("x", "y", "z")),
        ],
        ids=["2D", "3D"],
    )
    def test_no_overlaps(
        self, data: tuple[SegmentationData, SegmentationData], loc_keys: tuple[str, ...]
    ):
        gt_nodes = ex_segs.nodes_from_segmentation(data[0].segmentation, pos_keys=loc_keys)
        pred_nodes = ex_segs.nodes_from_segmentation(data[1].segmentation, pos_keys=loc_keys)

        def get_ids_locations(node_dict, loc_keys):
            ids = list(node_dict.keys())
            locs = [[node_dict[_id][key] for key in loc_keys] for _id in ids]
            return ids, locs

        gt_ids, gt_locs = get_ids_locations(gt_nodes, loc_keys)
        pred_ids, pred_locs = get_ids_locations(pred_nodes, loc_keys)

        # high threshold
        matcher = PointMatcher(threshold=50)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        # the center of the seg with label 2 is closer than that of the seg with label 3
        assert matches == [(1, 2)]

        # low threshold
        matcher = PointMatcher(threshold=1)
        matches = matcher._match_frame(gt_ids, gt_locs, pred_ids, pred_locs)
        assert matches == []


class TestPointMatcher:
    n_frames = 3
    n_labels = 3
    track_graph = get_movie_with_graph(ndims=3, n_frames=n_frames, n_labels=n_labels)

    def test_no_loc_key(self):
        data = TrackingGraph(self.track_graph.graph)
        matcher = PointMatcher(threshold=5)
        with pytest.raises(
            ValueError, match=re.escape("Must provide location key(s) to access node locations")
        ):
            matcher.compute_mapping(data, data)

    def test_empty(self):
        data = self.track_graph
        empty = TrackingGraph(nx.DiGraph(), location_keys=data.location_keys)
        matcher = PointMatcher(threshold=5)
        matched = matcher.compute_mapping(data, empty)
        assert matched.matcher_info["name"] == "PointMatcher"
        assert matched.matcher_info["threshold"] == 5
        assert matched.matcher_info["scale_factor"] is None
        assert len(matched.mapping) == 0
        # should not need to compute matching type, should be provided since Point Matcher
        # is always one-to-one
        assert matched._matching_type == "one-to-one"
        assert matched.matching_type == "one-to-one"

        # try the other way just to be thorough
        matched = matcher.compute_mapping(empty, data)
        assert len(matched.mapping) == 0

    def test_no_segmentation(self):
        data = self.track_graph
        matcher = PointMatcher(threshold=5)
        matched = matcher.compute_mapping(data, data)
        assert matched.matcher_info["name"] == "PointMatcher"
        assert matched.matcher_info["threshold"] == 5
        assert matched.matcher_info["scale_factor"] is None
        # should not need to compute matching type, should be provided since Point Matcher
        # is always one-to-one
        assert matched._matching_type == "one-to-one"
        assert matched.matching_type == "one-to-one"
        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same
        for pair in matched.mapping:
            assert pair[0] == pair[1]

    def test_with_segmentation(self):
        data = self.track_graph
        matcher = PointMatcher(threshold=5)
        matched = matcher.compute_mapping(data, data)
        assert matched.matcher_info["name"] == "PointMatcher"
        assert matched.matcher_info["threshold"] == 5
        assert matched.matcher_info["scale_factor"] is None
        # should not need to compute matching type, should be provided since Point Matcher
        # is always one-to-one
        assert matched._matching_type == "one-to-one"
        assert matched.matching_type == "one-to-one"
        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same
        for pair in matched.mapping:
            assert pair[0] == pair[1]

    def test_threshold(self):
        pred_data = self.track_graph
        gt_data = copy.deepcopy(self.track_graph)
        for node in gt_data.graph.nodes():
            gt_data.graph.nodes[node]["x"] = gt_data.graph.nodes[node]["x"] + 5

        # threshold equal to distance
        matcher = PointMatcher(threshold=5)
        matched = matcher.compute_mapping(gt_data, pred_data)
        assert matched.matcher_info["name"] == "PointMatcher"
        assert matched.matcher_info["threshold"] == 5
        assert matched.matcher_info["scale_factor"] is None
        # should not need to compute matching type, should be provided since Point Matcher
        # is always one-to-one
        assert matched._matching_type == "one-to-one"
        assert matched.matching_type == "one-to-one"
        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same
        for pair in matched.mapping:
            assert pair[0] == pair[1]

        # threshold less than distances
        matcher = PointMatcher(threshold=4)
        matched = matcher.compute_mapping(gt_data, pred_data)
        assert matched.matcher_info["name"] == "PointMatcher"
        assert matched.matcher_info["threshold"] == 4
        assert matched.matcher_info["scale_factor"] is None
        # should not need to compute matching type, should be provided since Point Matcher
        # is always one-to-one
        assert matched._matching_type == "one-to-one"
        assert matched.matching_type == "one-to-one"
        # Check for correct number of pairs
        assert len(matched.mapping) == 0

    def test_scale_factor(self):
        pred_data = self.track_graph
        gt_data = copy.deepcopy(self.track_graph)
        for node in gt_data.graph.nodes():
            gt_data.graph.nodes[node]["x"] = gt_data.graph.nodes[node]["x"] + 5

        # scale in the x dimension
        matcher = PointMatcher(threshold=5, scale_factor=(2, 1))
        matched = matcher.compute_mapping(gt_data, pred_data)
        assert matched.matcher_info["name"] == "PointMatcher"
        assert matched.matcher_info["threshold"] == 5
        assert matched.matcher_info["scale_factor"] == (2, 1)
        # should not need to compute matching type, should be provided since Point Matcher
        # is always one-to-one
        assert matched._matching_type == "one-to-one"
        assert matched.matching_type == "one-to-one"
        # Check for correct number of pairs
        assert len(matched.mapping) == 0

        # scale in another dimension
        matcher = PointMatcher(threshold=5, scale_factor=(1, 2))
        matched = matcher.compute_mapping(gt_data, pred_data)
        assert matched.matcher_info["name"] == "PointMatcher"
        assert matched.matcher_info["threshold"] == 5
        assert matched.matcher_info["scale_factor"] == (1, 2)
        # should not need to compute matching type, should be provided since Point Matcher
        # is always one-to-one
        assert matched._matching_type == "one-to-one"
        assert matched.matching_type == "one-to-one"
        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same
        for pair in matched.mapping:
            assert pair[0] == pair[1]
