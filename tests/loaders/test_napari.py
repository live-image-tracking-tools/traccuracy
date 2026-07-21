import numpy as np
import pytest

from traccuracy._tracking_graph import TrackingGraph
from traccuracy.loaders._napari import load_napari_data


class Test_load_napari_data:
    def test_simple_2d_track(self):
        # One track over three frames: [track_id, t, y, x].
        data = np.array([[1, 0, 10, 20], [1, 1, 11, 21], [1, 2, 12, 22]], dtype=float)
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

    def test_merge_via_graph(self):
        # Tracks 1 and 2 (frame 0) merge into track 3 (frame 1).
        data = np.array([[1, 0, 0, 0], [2, 0, 1, 1], [3, 1, 2, 2]], dtype=float)
        graph = {3: [1, 2]}  # track 3 has two parents -> merge node
        tg = load_napari_data(data, graph=graph)
        # both parents' last nodes connect to track 3's first node.
        assert tg.graph.number_of_edges() == 2
        merge_node = 3  # node id of track 3's frame-1 detection (row idx 2 + 1)
        assert tg.graph.in_degree(merge_node) == 2

    def test_seg_id_key_without_segmentation_raises(self):
        data = np.array([[1, 0, 0, 0]], dtype=float)
        with pytest.raises(ValueError, match="without segmentation"):
            load_napari_data(data, properties={"seg": [1]}, seg_id_key="seg")

    def test_implicit_matching_from_positions(self):
        # No seg_id_key: label is read from the pixel under each position.
        # Two detections of one track sitting on distinct labels in each frame.
        data = np.array([[1, 0, 1, 1], [1, 1, 3, 3]], dtype=float)
        seg = np.zeros((2, 5, 5), dtype=int)
        seg[0, 1, 1] = 4
        seg[1, 3, 3] = 9
        tg = load_napari_data(data, segmentation=seg)
        assert tg.graph.nodes[1]["segmentation_id"] == 4
        assert tg.graph.nodes[2]["segmentation_id"] == 9
        assert tg.segmentation is not None

    def test_implicit_matching_rounds_position(self):
        # Float positions are rounded to the nearest voxel before indexing.
        data = np.array([[1, 0, 1.4, 2.6]], dtype=float)
        seg = np.zeros((1, 5, 5), dtype=int)
        seg[0, 1, 3] = 5  # round(1.4)=1, round(2.6)=3
        tg = load_napari_data(data, segmentation=seg)
        assert tg.graph.nodes[1]["segmentation_id"] == 5

    def test_implicit_matching_background_raises(self):
        # A point landing on label 0 has no mask to match.
        data = np.array([[1, 0, 0, 0]], dtype=float)
        seg = np.zeros((1, 4, 4), dtype=int)  # all background
        with pytest.raises(ValueError, match="background"):
            load_napari_data(data, segmentation=seg)

    def test_implicit_matching_out_of_bounds_raises(self):
        data = np.array([[1, 0, 10, 10]], dtype=float)  # outside a 4x4 frame
        seg = np.ones((1, 4, 4), dtype=int)
        with pytest.raises(ValueError, match="outside the segmentation"):
            load_napari_data(data, segmentation=seg)

    def test_implicit_matching_dim_mismatch_raises(self):
        # 3D data (z,y,x) but a 2D+time segmentation.
        data = np.array([[1, 0, 1, 1, 1]], dtype=float)
        seg = np.ones((1, 4, 4), dtype=int)  # only (T, Y, X)
        with pytest.raises(ValueError, match="dims"):
            load_napari_data(data, segmentation=seg)

    def test_duplicate_label_in_frame_raises(self):
        # Two detections in the same frame resolving to the same label.
        data = np.array([[1, 0, 1, 1], [2, 0, 2, 2]], dtype=float)
        seg = np.zeros((1, 5, 5), dtype=int)
        seg[0, 1, 1] = 3
        seg[0, 2, 2] = 3  # same label -> ambiguous match
        with pytest.raises(ValueError, match="same segmentation label"):
            load_napari_data(data, segmentation=seg)

    def test_seg_id_length_mismatch_raises(self):
        data = np.array([[1, 0, 0, 0], [1, 1, 0, 0]], dtype=float)
        with pytest.raises(ValueError, match="must align"):
            load_napari_data(
                data,
                properties={"seg": [7]},  # too short
                segmentation=np.ones((2, 4, 4), int),
                seg_id_key="seg",
            )

    def test_explicit_non_integer_label_raises(self):
        # A float label column must not silently truncate (6.9 -> 6).
        data = np.array([[1, 0, 1, 1]], dtype=float)
        seg = np.zeros((1, 5, 5), dtype=int)
        seg[0, 1, 1] = 7
        with pytest.raises(ValueError, match="integer label ids"):
            load_napari_data(
                data,
                properties={"seg": [6.9]},
                segmentation=seg,
                seg_id_key="seg",
            )

    def test_non_integer_track_id_raises(self):
        # Float track ids must not silently truncate/merge (1.4 & 1.9 -> 1).
        data = np.array([[1.4, 0, 0, 0], [1.9, 1, 1, 1]], dtype=float)
        with pytest.raises(ValueError, match="track ids"):
            load_napari_data(data)

    def test_empty_data_with_segmentation(self):
        # Empty data + segmentation must not crash on the implicit label read.
        data = np.zeros((0, 4), dtype=float)
        tg = load_napari_data(data, segmentation=np.ones((1, 4, 4), int))
        assert tg.graph.number_of_nodes() == 0

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

    def test_numpy_scalar_parent_in_graph(self):
        # A numpy 0-d array / numpy scalar parent (from a numpy-backed graph
        # dict) must be treated as a scalar, not raise on len().
        data = np.array([[1, 0, 0, 0], [1, 1, 0, 0], [2, 2, 1, 1]], dtype=float)
        graph = {2: np.array(1)}  # 0-d array parent
        tg = load_napari_data(data, graph=graph)
        assert tg.graph.number_of_edges() == 2

    def test_non_integer_time_raises(self):
        # Distinct-but-close times must not silently truncate to one frame.
        data = np.array([[1, 1.4, 0, 0], [1, 1.6, 0, 0]], dtype=float)
        with pytest.raises(ValueError, match="integer-valued"):
            load_napari_data(data)
