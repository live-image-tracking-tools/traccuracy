from collections import Counter

import networkx as nx
import numpy as np
import pytest

import tests.examples.segs as ex_segs
from tests.test_utils import get_movie_with_graph
from traccuracy._tracking_graph import TrackingGraph
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

        # Low threshold
        gtcells, rescells = _match_nodes(*data, threshold=0.4)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # Low threshold one_to_one
        gtcells, rescells = _match_nodes(*data, threshold=0.4, one_to_one=True)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # High threshold -- no matches
        gtcells, rescells = _match_nodes(*data, threshold=0.9)
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

        gtcells, rescells = _match_nodes(*data)
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

        gtcells, rescells = _match_nodes(*data)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

    @pytest.mark.parametrize(
        "data",
        [ex_segs.oversegmentation_2d(), ex_segs.oversegmentation_3d()],
        ids=["2D", "3D"],
    )
    def test_split(self, data):
        # Low threshold, both match
        ex_matches = [(1, 2), (1, 3)]
        gtcells, rescells = _match_nodes(*data, threshold=0.3)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # High threshold, no match
        ex_matches = []
        gtcells, rescells = _match_nodes(*data, threshold=0.7)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # Low threshold, one to one, only one matches
        gtcells, rescells = _match_nodes(*data, threshold=0.3, one_to_one=True)
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
        gtcells, rescells = _match_nodes(*data, threshold=0.3)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # High threshold, no match
        ex_matches = []
        gtcells, rescells = _match_nodes(*data, threshold=0.7)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # Low threshold, one to one, only one matches
        gtcells, rescells = _match_nodes(*data, threshold=0.3, one_to_one=True)
        comp_matches = list(zip(gtcells, rescells, strict=False))
        assert ((1, 3) in comp_matches) != ((2, 3) in comp_matches)

    @pytest.mark.parametrize(
        "data", [ex_segs.multicell_2d(), ex_segs.multicell_3d()], ids=["2D", "3D"]
    )
    def test_multiple_objects(self, data):
        ex_matches = [(1, 3)]
        gtcells, rescells = _match_nodes(*data)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

    @pytest.mark.parametrize(
        "data", [ex_segs.no_overlap_2d(), ex_segs.no_overlap_3d()], ids=["2D", "3D"]
    )
    def test_no_overlap(self, data):
        ex_matches = []
        gtcells, rescells = _match_nodes(*data)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

    def test_input_error(self):
        im = np.zeros((10, 10))
        with pytest.raises(
            ValueError, match="Threshold of 0 is not valid unless one_to_one is True"
        ):
            # Test that threshold 0 is not valid when not one-to-one
            gtcells, rescells = _match_nodes(im, im, threshold=0.0)

    @pytest.mark.parametrize(
        "data", [ex_segs.no_overlap_2d(), ex_segs.no_overlap_3d()], ids=["2D", "3D"]
    )
    def test_non_sequential(self, data):
        """test when the segmentation ids are high numbers (the lower numbers should never appear)
        At one point dummy nodes introduced from padding the iou matrix were appearing in the final
        matching
        See https://github.com/live-image-tracking-tools/traccuracy/pull/173#discussion_r1882231345
        """
        gt, pred = data[0], data[1]
        # Change id of segmentation to non sequntial high value
        gt[gt == 1] = 100
        pred[pred == 2] = 200

        ex_matches = []
        gtcells, rescells = _match_nodes(gt, pred)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))

        # Check case with one to one threshold 0
        gtcells, rescells = _match_nodes(gt, pred)
        assert Counter(ex_matches) == Counter(list(zip(gtcells, rescells, strict=False)))


def test__construct_time_to_seg_id_map():
    # Test 2d data
    n_frames = 3
    n_labels = 3
    track_graph = get_movie_with_graph(ndims=3, n_frames=n_frames, n_labels=n_labels)
    time_to_seg_id_map = _construct_time_to_seg_id_map(track_graph)
    for t in range(n_frames):
        for i in range(1, n_labels):
            assert time_to_seg_id_map[t][i] == f"{i}_{t}"

    # Test 3d data
    track_graph = get_movie_with_graph(ndims=4, n_frames=n_frames, n_labels=n_labels)
    time_to_seg_id_map = _construct_time_to_seg_id_map(track_graph)
    for t in range(n_frames):
        for i in range(1, n_labels):
            assert time_to_seg_id_map[t][i] == f"{i}_{t}"


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
