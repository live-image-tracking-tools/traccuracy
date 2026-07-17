import numpy as np
import pytest

from traccuracy._tracking_graph import TrackingGraph
from traccuracy.loaders._napari import load_napari_data


class Test_load_napari_data:
    def test_simple_2d_track(self):
        # One track over three frames: [track_id, t, y, x].
        data = np.array(
            [[1, 0, 10, 20], [1, 1, 11, 21], [1, 2, 12, 22]], dtype=float
        )
        tg = load_napari_data(data)
        assert isinstance(tg, TrackingGraph)
        assert tg.graph.number_of_nodes() == 3
        # Consecutive detections of the same track are connected.
        assert tg.graph.number_of_edges() == 2
        # Frame attr is an int, positions carried through.
        first = tg.graph.nodes[1]
        assert first["t"] == 0 and isinstance(first["t"], int)
        assert first["y"] == 10 and first["x"] == 20

    def test_3d_locations(self):
        data = np.array([[1, 0, 3, 4, 5], [1, 1, 3, 4, 5]], dtype=float)
        tg = load_napari_data(data)
        assert tg.location_keys == ("z", "y", "x")
        assert tg.graph.nodes[1]["z"] == 3

    def test_division_via_graph(self):
        # Track 1 (frames 0-1) divides into tracks 2 and 3 (frame 2).
        data = np.array(
            [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [2, 2, 1, 1],
                [3, 2, -1, -1],
            ],
            dtype=float,
        )
        graph = {2: [1], 3: [1]}
        tg = load_napari_data(data, graph=graph)
        # 1 within-track edge + 2 division edges from track 1's last node.
        assert tg.graph.number_of_edges() == 3
        parent_last = 2  # node id of track 1's frame-1 detection (row idx 1 + 1)
        assert tg.graph.out_degree(parent_last) == 2

    def test_segmentation_and_seg_id(self):
        data = np.array([[1, 0, 0, 0], [1, 1, 0, 0]], dtype=float)
        seg = np.ones((2, 4, 4), dtype=int)
        tg = load_napari_data(
            data,
            properties={"seg": [7, 7]},
            segmentation=seg,
            seg_id_key="seg",
        )
        assert tg.graph.nodes[1]["segmentation_id"] == 7
        assert tg.segmentation is not None

    def test_bad_shape_raises(self):
        with pytest.raises(ValueError, match="shape"):
            load_napari_data(np.zeros((3, 3)))  # only 1 spatial col

    def test_duplicate_track_time_raises(self):
        data = np.array([[1, 0, 0, 0], [1, 0, 1, 1]], dtype=float)
        with pytest.raises(ValueError, match="same time"):
            load_napari_data(data)

    def test_merge_raises(self):
        data = np.array([[1, 0, 0, 0], [2, 0, 1, 1], [3, 1, 2, 2]], dtype=float)
        graph = {3: [1, 2]}  # track 3 has two parents -> merge
        with pytest.raises(ValueError, match="multiple parents"):
            load_napari_data(data, graph=graph)

    def test_seg_without_key_raises(self):
        data = np.array([[1, 0, 0, 0]], dtype=float)
        with pytest.raises(ValueError, match="must be provided together"):
            load_napari_data(data, segmentation=np.ones((1, 2, 2), int))

    def test_seg_id_length_mismatch_raises(self):
        data = np.array([[1, 0, 0, 0], [1, 1, 0, 0]], dtype=float)
        with pytest.raises(ValueError, match="must align"):
            load_napari_data(
                data,
                properties={"seg": [7]},  # too short
                segmentation=np.ones((2, 4, 4), int),
                seg_id_key="seg",
            )

    def test_time_gap_within_track(self):
        # Missing frame 1: skip edge from frame 0 to frame 2 is allowed.
        data = np.array([[1, 0, 0, 0], [1, 2, 0, 0]], dtype=float)
        tg = load_napari_data(data)
        assert tg.graph.number_of_edges() == 1


    def test_scalar_parent_in_graph(self):
        # napari allows {child: parent} with a bare int parent, not just a list.
        data = np.array([[1, 0, 0, 0], [1, 1, 0, 0], [2, 2, 1, 1]], dtype=float)
        graph = {2: 1}  # scalar parent
        tg = load_napari_data(data, graph=graph)
        # within-track edge (track 1) + one division edge parent->child
        assert tg.graph.number_of_edges() == 2
