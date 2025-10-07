from collections import Counter

import networkx as nx
import numpy as np
import pytest
from examples.segs import SegmentationData

import tests.examples.segs as ex_segs
from tests.test_utils import get_annotated_movie
from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._compute_overlap import get_labels_with_overlap
from traccuracy.matchers._ctc import CTCMatcher


def _match_frame_majority(
    gt_data: SegmentationData, pred_data: SegmentationData
) -> list[tuple[int, int]]:
    """Helper function to test CTC-style matching logic"""

    overlaps = get_labels_with_overlap(
        gt_data.segmentation,
        pred_data.segmentation,
        gt_boxes=gt_data.boxes,
        res_boxes=pred_data.boxes,
        gt_labels=gt_data.labels,
        res_labels=pred_data.labels,
        overlap="iogt",
    )

    mapping = []
    for gt_label, pred_label, iogt in overlaps:
        # CTC metrics only match comp IDs to a single GT ID if there is majority overlap
        if iogt > 0.5:
            mapping.append((gt_label, pred_label))

    return mapping


class TestCTCMatcher:
    matcher = CTCMatcher()

    def test_bad_shape_input(self):
        # shapes don't match
        with pytest.raises(ValueError):
            self.matcher.compute_mapping(
                TrackingGraph(nx.DiGraph(), segmentation=np.zeros((5, 10, 10), dtype=np.uint16)),
                TrackingGraph(nx.DiGraph(), segmentation=np.zeros((5, 10, 5), dtype=np.uint16)),
            )

    def test_end_to_end(self):
        n_labels = 3
        n_frames = 3
        movie = get_annotated_movie(
            img_size=256, labels_per_frame=n_labels, frames=n_frames, mov_type="repeated"
        )

        # We can assume each object is present and connected across each frame
        g = nx.DiGraph()
        for t in range(n_frames - 1):
            for i in range(1, n_labels + 1):
                g.add_edge(f"{i}_{t}", f"{i}_{t + 1}")

        attrs = {}
        for t in range(n_frames):
            for i in range(1, n_labels + 1):
                attrs[f"{i}_{t}"] = {
                    "t": t,
                    "y": 0,
                    "x": 0,
                    "segmentation_id": i,
                    "bbox": np.array([0, 0, 256, 256]),
                }
        nx.set_node_attributes(g, attrs)

        # Convert ids to ints
        g = nx.convert_node_labels_to_integers(g, first_label=1)

        matched = self.matcher.compute_mapping(
            TrackingGraph(g, segmentation=movie),
            TrackingGraph(g, segmentation=movie),
        )

        # Check for correct number of pairs
        assert len(matched.mapping) == n_frames * n_labels

        # gt and pred node should be the same
        for pair in matched.mapping:
            assert pair[0] == pair[1]


class TestStandards:
    """Test match_frame_majority against standard test cases"""

    @pytest.mark.parametrize(
        "data",
        [ex_segs.good_segmentation_2d(), ex_segs.good_segmentation_3d()],
        ids=["2D", "3D"],
    )
    def test_good_seg(self, data):
        ex_match = [(1, 2)]
        gt_data, pred_data = data
        comp_match = _match_frame_majority(gt_data, pred_data)
        assert Counter(ex_match) == Counter(comp_match)

    @pytest.mark.parametrize(
        "data",
        [
            ex_segs.false_positive_segmentation_2d(),
            ex_segs.false_positive_segmentation_3d(),
        ],
        ids=["2D", "3D"],
    )
    def test_false_pos_seg(self, data):
        ex_match = []
        gt_data, pred_data = data
        comp_match = _match_frame_majority(gt_data, pred_data)
        assert Counter(ex_match) == Counter(comp_match)

    @pytest.mark.parametrize(
        "data",
        [
            ex_segs.false_negative_segmentation_2d(),
            ex_segs.false_negative_segmentation_3d(),
        ],
        ids=["2D", "3D"],
    )
    def test_false_neg_seg(self, data):
        ex_match = []
        gt_data, pred_data = data
        comp_match = _match_frame_majority(gt_data, pred_data)
        assert Counter(ex_match) == Counter(comp_match)

    @pytest.mark.parametrize(
        "data",
        [ex_segs.oversegmentation_2d(), ex_segs.oversegmentation_3d()],
        ids=["2D", "3D"],
    )
    def test_split(self, data):
        ex_match = [(1, 2)]
        gt_data, pred_data = data
        comp_match = _match_frame_majority(gt_data, pred_data)
        assert Counter(ex_match) == Counter(comp_match)

    @pytest.mark.parametrize(
        "data",
        [ex_segs.undersegmentation_2d(), ex_segs.undersegmentation_3d()],
        ids=["2D", "3D"],
    )
    def test_merge(self, data):
        ex_match = [(1, 3), (2, 3)]
        gt_data, pred_data = data
        comp_match = _match_frame_majority(gt_data, pred_data)
        assert Counter(ex_match) == Counter(comp_match)

    @pytest.mark.parametrize(
        "data",
        [ex_segs.no_overlap_2d(), ex_segs.no_overlap_3d()],
        ids=["2D", "3D"],
    )
    def test_no_overlap(self, data):
        ex_match = []
        gt_data, pred_data = data
        comp_match = _match_frame_majority(gt_data, pred_data)
        assert Counter(ex_match) == Counter(comp_match)

    @pytest.mark.parametrize(
        "data",
        [ex_segs.multicell_2d(), ex_segs.multicell_3d()],
        ids=["2D", "3D"],
    )
    def test_multicell(self, data):
        ex_match = [(1, 3)]
        gt_data, pred_data = data
        comp_match = _match_frame_majority(gt_data, pred_data)
        assert Counter(ex_match) == Counter(comp_match)
