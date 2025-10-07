import os
from collections import Counter

import networkx as nx
import numpy as np
import pandas as pd
import pytest

import tests.examples.segs as ex_segs
from tests.test_utils import get_movie_with_graph
from traccuracy._tracking_graph import TrackingGraph
from traccuracy.loaders._ctc import _get_node_attributes, ctc_to_graph, load_tiffs
from traccuracy.matchers._iou import (
    IOUMatcher,
    _construct_time_to_seg_id_map,
    _match_nodes,
    match_iou,
)


class TestStandards:
    """Test _match_nodes against standard test cases"""

    @pytest.mark.parametrize(
        "data",
        [ex_segs.good_segmentation_2d(), ex_segs.good_segmentation_3d()],
        ids=["2D", "3D"],
    )
    def test_good_seg(self, data):
        ex_matches = [(1, 2)]

        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.4,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # Low threshold one_to_one
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.4,
            one_to_one=True,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # High threshold -- no matches
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.9,
        )
        ex_matches = []
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

    @pytest.mark.parametrize(
        "data",
        [
            ex_segs.false_positive_segmentation_2d(),
            ex_segs.false_positive_segmentation_3d(),
        ],
        ids=["2D", "3D"],
    )
    def test_false_pos(self, data):
        ex_matches = []

        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

    @pytest.mark.parametrize(
        "data",
        [
            ex_segs.false_negative_segmentation_2d(),
            ex_segs.false_negative_segmentation_3d(),
        ],
        ids=["2D", "3D"],
    )
    def test_false_neg(self, data):
        ex_matches = []

        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

    @pytest.mark.parametrize(
        "data",
        [ex_segs.oversegmentation_2d(), ex_segs.oversegmentation_3d()],
        ids=["2D", "3D"],
    )
    def test_split(self, data):
        # Low threshold, both match
        ex_matches = [(1, 2), (1, 3)]
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.3,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # High threshold, no match
        ex_matches = []
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.7,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # Low threshold, one to one, only one matches
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.3,
            one_to_one=True,
        )
        comp_matches = list(zip(gtcells, rescells, strict=False))
        assert ((1, 2) in comp_matches) != ((1, 3) in comp_matches)

    @pytest.mark.parametrize(
        "data",
        [ex_segs.undersegmentation_2d(), ex_segs.undersegmentation_3d()],
        ids=["2D", "3D"],
    )
    def test_merge(self, data):
        # Low threshold, both match
        ex_matches = [(1, 3), (2, 3)]
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.3,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # High threshold, no match
        ex_matches = []
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.7,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # Low threshold, one to one, only one matches
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
            threshold=0.3,
            one_to_one=True,
        )
        comp_matches = list(zip(gtcells, rescells, strict=False))
        assert ((1, 3) in comp_matches) != ((2, 3) in comp_matches)

    @pytest.mark.parametrize(
        "data", [ex_segs.multicell_2d(), ex_segs.multicell_3d()], ids=["2D", "3D"]
    )
    def test_multiple_objects(self, data):
        ex_matches = [(1, 3)]
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

    @pytest.mark.parametrize(
        "data", [ex_segs.no_overlap_2d(), ex_segs.no_overlap_3d()], ids=["2D", "3D"]
    )
    def test_no_overlap(self, data):
        ex_matches = []
        gtcells, rescells = _match_nodes(
            gt=data[0].segmentation,
            res=data[1].segmentation,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

    def test_input_error(self):
        im = np.zeros((10, 10))
        with pytest.raises(
            ValueError, match="Threshold of 0 is not valid unless one_to_one is True"
        ):
            # Test that threshold 0 is not valid when not one-to-one
            _match_nodes(
                im,
                im,
                gt_boxes=np.array([[0, 0, 10, 10]]),
                res_boxes=np.array([[0, 0, 10, 10]]),
                gt_labels=np.array([1]),
                res_labels=np.array([2]),
                threshold=0.0,
            )

    @pytest.mark.parametrize(
        "data", [ex_segs.no_overlap_2d(), ex_segs.no_overlap_3d()], ids=["2D", "3D"]
    )
    def test_non_sequential(self, data):
        """test when the segmentation ids are high numbers (the lower numbers should never appear)
        At one point dummy nodes introduced from padding the iou matrix were appearing in the final
        matching
        See https://github.com/live-image-tracking-tools/traccuracy/pull/173#discussion_r1882231345
        """
        gt, pred = data[0].segmentation, data[1].segmentation
        # Change id of segmentation to non sequntial high value
        gt[gt == 1] = 100
        pred[pred == 2] = 200

        ex_matches = []
        gtcells, rescells = _match_nodes(
            gt=gt,
            res=pred,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # Check case with one to one threshold 0
        gtcells, rescells = _match_nodes(
            gt=gt,
            res=pred,
            gt_boxes=data[0].boxes,
            res_boxes=data[1].boxes,
            gt_labels=data[0].labels,
            res_labels=data[1].labels,
        )
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))


def test__construct_time_to_seg_id_map():
    # Test 2d data
    n_frames = 3
    n_labels = 3
    track_graph = get_movie_with_graph(ndims=3, n_frames=n_frames, n_labels=n_labels)
    # Get lookup from string id to node id
    id_lut = {}
    for node, attrs in track_graph.graph.nodes.items():
        id_lut[node] = attrs["string_id"]

    time_to_seg_id_map = _construct_time_to_seg_id_map(track_graph)
    for t in range(n_frames):
        for i in range(1, n_labels):
            assert id_lut[time_to_seg_id_map[t][i]] == f"{i}_{t}"

    # Test 3d data
    track_graph = get_movie_with_graph(ndims=4, n_frames=n_frames, n_labels=n_labels)
    # Get lookup from string id to node id
    id_lut = {}
    for node, attrs in track_graph.graph.nodes.items():
        id_lut[node] = attrs["string_id"]

    time_to_seg_id_map = _construct_time_to_seg_id_map(track_graph)
    for t in range(n_frames):
        for i in range(1, n_labels):
            assert id_lut[time_to_seg_id_map[t][i]] == f"{i}_{t}"


class Test_match_iou:
    def test_bad_input(self):
        # Bad input
        with pytest.raises(
            ValueError,
            match="Input data must be a TrackingData object with a graph and segmentations",
        ):
            match_iou("not tracking data", "not tracking data")

    def test_bad_shapes(self):
        # shapes don't match
        with pytest.raises(ValueError, match="Segmentation shapes must match between gt and pred"):
            match_iou(
                TrackingGraph(nx.DiGraph(), segmentation=np.zeros((5, 10, 10), dtype=np.uint16)),
                TrackingGraph(nx.DiGraph(), segmentation=np.zeros((5, 10, 5), dtype=np.uint16)),
            )

    def test_no_segmentation(self):
        with pytest.raises(
            ValueError, match="TrackingGraph must contain a segmentation array for IoU matching"
        ):
            match_iou(
                TrackingGraph(nx.DiGraph()),
                TrackingGraph(nx.DiGraph()),
            )

    def test_end_to_end_2d(self):
        # Test 2d data
        n_frames = 3
        n_labels = 3
        track_graph = get_movie_with_graph(ndims=3, n_frames=n_frames, n_labels=n_labels)
        mapper = match_iou(
            track_graph,
            track_graph,
        )

        # Check for correct number of pairs
        assert len(mapper) == n_frames * n_labels
        # gt and pred node should be the same
        for pair in mapper:
            assert pair[0] == pair[1]

    def test_end_to_end_3d(self):
        # Check 3d data
        n_frames = 3
        n_labels = 3
        track_graph = get_movie_with_graph(ndims=4, n_frames=n_frames, n_labels=n_labels)
        mapper = match_iou(
            track_graph,
            track_graph,
        )

        # Check for correct number of pairs
        assert len(mapper) == n_frames * n_labels
        # gt and pred node should be the same
        for pair in mapper:
            assert pair[0] == pair[1]


class TestIOUMatched:
    matcher = IOUMatcher()
    n_frames = 3
    n_labels = 3
    track_graph = get_movie_with_graph(ndims=3, n_frames=n_frames, n_labels=n_labels)

    def test_no_segmentation(self):
        # No segmentation
        track_graph = get_movie_with_graph()
        data = TrackingGraph(track_graph.graph)

        with pytest.raises(ValueError):
            self.matcher.compute_mapping(data, data)

    def test_e2e(self):
        matched = self.matcher.compute_mapping(
            gt_graph=self.track_graph, pred_graph=self.track_graph
        )

        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same
        for pair in matched.mapping:
            assert pair[0] == pair[1]

    def test_e2e_threshold(self):
        matcher = IOUMatcher(iou_threshold=1.0)
        matched = matcher.compute_mapping(gt_graph=self.track_graph, pred_graph=self.track_graph)

        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same
        for pair in matched.mapping:
            assert pair[0] == pair[1]

    def test_e2e_one_to_one(self):
        matcher = IOUMatcher(one_to_one=True)
        matched = matcher.compute_mapping(gt_graph=self.track_graph, pred_graph=self.track_graph)

        # Check for correct number of pairs
        assert len(matched.mapping) == self.n_frames * self.n_labels
        # gt and pred node should be the same
        for pair in matched.mapping:
            assert pair[0] == pair[1]


def test_matching_from_in_memory():
    """Test that passing CTC data from in-memory computes regionprops."""
    test_dir = os.path.abspath(__file__)
    data_dir = os.path.abspath(
        os.path.join(test_dir, "../../../examples/sample-data/Fluo-N2DL-HeLa/01_RES/")
    )

    gt_ims = load_tiffs(data_dir)
    det_gt_df = _get_node_attributes(gt_ims)
    # drop bbox so it has to be recomputed
    det_gt_df.drop(columns=["bbox"], inplace=True)

    names = ["Cell_ID", "Start", "End", "Parent_ID"]
    gt_tracks = pd.read_csv(
        os.path.join(data_dir, "res_track.txt"), header=None, sep=" ", names=names
    )

    gt_graph = ctc_to_graph(gt_tracks, det_gt_df)
    gt_t_graph = TrackingGraph(gt_graph, segmentation=gt_ims, location_keys=["y", "x"])

    with pytest.warns(
        UserWarning,
        match=r"'.*_boxes' and/or '.*_labels' are not provided, using 'regionprops' to get them",
    ):
        matched = IOUMatcher().compute_mapping(gt_t_graph, gt_t_graph)
    assert len(matched.mapping) == len(gt_t_graph.nodes)
