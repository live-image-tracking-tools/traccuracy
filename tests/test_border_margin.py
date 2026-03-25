import networkx as nx
import numpy as np
import pytest

from traccuracy import TrackingGraph


def _make_graph_with_seg(node_positions, edges, spatial_shape=(10, 10)):
    """Build a TrackingGraph with nodes at given (y, x) positions and a dummy segmentation.

    Args:
        node_positions: list of (id, t, y, x) tuples
        edges: list of (source, target) tuples
        spatial_shape: (H, W) of each frame
    """
    n_frames = max(t for _, t, _, _ in node_positions) + 1
    seg = np.zeros((n_frames, *spatial_shape), dtype=np.uint16)

    g = nx.DiGraph()
    for nid, t, y, x in node_positions:
        g.add_node(nid, t=t, y=y, x=x, segmentation_id=nid)
        # paint a single pixel so the segmentation isn't totally empty
        yi, xi = round(y), round(x)
        if 0 <= yi < spatial_shape[0] and 0 <= xi < spatial_shape[1]:
            seg[t, yi, xi] = nid
    g.add_edges_from(edges)
    return g, seg


class TestBorderMarginNoop:
    def test_none_is_default(self):
        g, seg = _make_graph_with_seg([(1, 0, 5.0, 5.0), (2, 1, 5.0, 5.0)], [(1, 2)])
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"))
        assert len(tg.graph.nodes) == 2
        assert len(tg.graph.edges) == 1

    def test_zero_margin_removes_nothing(self):
        g, seg = _make_graph_with_seg([(1, 0, 5.0, 5.0), (2, 1, 5.0, 5.0)], [(1, 2)])
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"), border_margin=0.0)
        assert len(tg.graph.nodes) == 2


class TestBorderMarginFiltering:
    def test_removes_node_near_border(self):
        # Node 1 at (0.5, 5) -> min dist to border = 0.5
        # Node 2 at (5, 5) -> min dist = 4 (to top/bottom edge)
        g, seg = _make_graph_with_seg(
            [(1, 0, 0.5, 5.0), (2, 0, 5.0, 5.0)], [], spatial_shape=(10, 10)
        )
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"), border_margin=1.0)
        assert 1 not in tg.graph.nodes
        assert 2 in tg.graph.nodes

    def test_removes_edges_of_filtered_nodes(self):
        # Node 1 near border, node 2 and 3 interior, edges 1->2 and 2->3
        g, seg = _make_graph_with_seg(
            [(1, 0, 0.0, 5.0), (2, 1, 5.0, 5.0), (3, 2, 5.0, 5.0)],
            [(1, 2), (2, 3)],
        )
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"), border_margin=1.0)
        assert 1 not in tg.graph.nodes
        assert (1, 2) not in tg.graph.edges
        # interior edge preserved
        assert (2, 3) in tg.graph.edges

    def test_margin_threshold_boundary(self):
        # Node at distance exactly equal to margin should be removed (< not <=)
        # Node at (1.0, 5.0) in 10x10: min dist = min(1, 8, 5, 4) = 1.0
        g, seg = _make_graph_with_seg(
            [(1, 0, 1.0, 5.0), (2, 0, 2.0, 5.0)], [], spatial_shape=(10, 10)
        )
        # margin=1.0: node at dist 1.0 is NOT removed (1.0 < 1.0 is False)
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"), border_margin=1.0)
        assert 1 in tg.graph.nodes

        # margin=1.5: node at dist 1.0 IS removed (1.0 < 1.5)
        g, seg = _make_graph_with_seg(
            [(1, 0, 1.0, 5.0), (2, 0, 5.0, 5.0)], [], spatial_shape=(10, 10)
        )
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"), border_margin=1.5)
        assert 1 not in tg.graph.nodes
        assert 2 in tg.graph.nodes

    def test_all_four_borders(self):
        # Nodes near each of the 4 borders of a 20x20 image
        g, seg = _make_graph_with_seg(
            [
                (1, 0, 0.5, 10.0),  # near top
                (2, 0, 19.5, 10.0),  # near bottom
                (3, 0, 10.0, 0.5),  # near left
                (4, 0, 10.0, 19.5),  # near right
                (5, 0, 10.0, 10.0),  # center
            ],
            [],
            spatial_shape=(20, 20),
        )
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"), border_margin=2.0)
        for nid in [1, 2, 3, 4]:
            assert nid not in tg.graph.nodes
        assert 5 in tg.graph.nodes

    def test_3d_spatial(self):
        # 3D segmentation: (T, Z, Y, X) = (1, 10, 10, 10)
        seg = np.zeros((1, 10, 10, 10), dtype=np.uint16)
        g = nx.DiGraph()
        # Node near z=0 border
        g.add_node(1, t=0, z=0.3, y=5.0, x=5.0, segmentation_id=1)
        # Node in center
        g.add_node(2, t=0, z=5.0, y=5.0, x=5.0, segmentation_id=2)
        tg = TrackingGraph(g, segmentation=seg, location_keys=("z", "y", "x"), border_margin=1.0)
        assert 1 not in tg.graph.nodes
        assert 2 in tg.graph.nodes

    def test_nodes_by_frame_consistent(self):
        g, seg = _make_graph_with_seg(
            [(1, 0, 0.0, 5.0), (2, 0, 5.0, 5.0), (3, 1, 5.0, 5.0)],
            [(2, 3)],
        )
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"), border_margin=1.0)
        # Node 1 removed from frame 0
        assert 1 not in tg.nodes_by_frame[0]
        assert 2 in tg.nodes_by_frame[0]
        assert 3 in tg.nodes_by_frame[1]

    def test_segmentation_zeroed_for_removed_nodes(self):
        # Build a segmentation where node 1 (near border) has a multi-pixel mask
        seg = np.zeros((1, 10, 10), dtype=np.uint16)
        seg[0, 0, 3:7] = 1  # node 1: row 0, several pixels
        seg[0, 5, 3:7] = 2  # node 2: row 5, interior

        g = nx.DiGraph()
        g.add_node(1, t=0, y=0.0, x=5.0, segmentation_id=1)
        g.add_node(2, t=0, y=5.0, x=5.0, segmentation_id=2)
        tg = TrackingGraph(g, segmentation=seg, location_keys=("y", "x"), border_margin=1.0)
        # Node 1 removed, its segmentation label zeroed
        assert 1 not in tg.graph.nodes
        assert np.count_nonzero(tg.segmentation[0] == 1) == 0
        # Node 2 interior, segmentation intact
        assert 2 in tg.graph.nodes
        assert np.count_nonzero(tg.segmentation[0] == 2) == 4

    def test_segmentation_zeroing_prevents_matcher_overlap(self):
        # Scenario: GT cell near border removed, pred cell interior overlaps it.
        # Without seg zeroing, the matcher would find an overlap with a non-existent
        # GT node. With zeroing, no overlap is found.
        from traccuracy.matchers._compute_overlap import get_labels_with_overlap

        seg_gt = np.zeros((1, 10, 10), dtype=np.uint16)
        seg_pred = np.zeros((1, 10, 10), dtype=np.uint16)
        # GT cell 1: near top border, spans rows 0-2
        seg_gt[0, 0:3, 4:6] = 1
        # GT cell 2: interior
        seg_gt[0, 5, 5] = 2
        # Pred cell 10: overlaps GT cell 1's area but centroid is at row 2
        seg_pred[0, 1:4, 4:6] = 10
        # Pred cell 20: interior
        seg_pred[0, 5, 5] = 20

        g_gt = nx.DiGraph()
        g_gt.add_node(1, t=0, y=1.0, x=4.5, segmentation_id=1)
        g_gt.add_node(2, t=0, y=5.0, x=5.0, segmentation_id=2)

        tg_gt = TrackingGraph(
            g_gt, segmentation=seg_gt, location_keys=("y", "x"), border_margin=2.0
        )

        # GT node 1 should be removed and its seg zeroed
        assert 1 not in tg_gt.graph.nodes
        # Verify no overlap between removed GT label and pred label
        import warnings

        with warnings.catch_warnings():
            warnings.simplefilter("ignore", UserWarning)
            overlaps = get_labels_with_overlap(tg_gt.segmentation[0], seg_pred[0])
        gt_labels_in_overlaps = {gt_label for gt_label, _, _ in overlaps}
        assert 1 not in gt_labels_in_overlaps


class TestBorderMarginValidation:
    def test_raises_without_segmentation(self):
        g = nx.DiGraph()
        g.add_node(1, t=0, y=5.0, x=5.0)
        with pytest.raises(ValueError, match="`segmentation` is required"):
            TrackingGraph(g, location_keys=("y", "x"), border_margin=5.0)

    def test_raises_with_string_location_keys(self):
        seg = np.zeros((1, 10, 10), dtype=np.uint16)
        g = nx.DiGraph()
        g.add_node(1, t=0, pos=[5.0, 5.0], segmentation_id=1)
        with pytest.raises(ValueError, match="`location_keys` must be a tuple"):
            TrackingGraph(g, segmentation=seg, location_keys="pos", border_margin=5.0)

    def test_raises_without_location_keys(self):
        seg = np.zeros((1, 10, 10), dtype=np.uint16)
        g = nx.DiGraph()
        g.add_node(1, t=0, y=5.0, x=5.0, segmentation_id=1)
        with pytest.raises(ValueError, match="`location_keys` must be a tuple"):
            TrackingGraph(g, segmentation=seg, border_margin=5.0)

    def test_raises_on_dimension_mismatch(self):
        # 2D seg but 3D location keys
        seg = np.zeros((1, 10, 10), dtype=np.uint16)
        g = nx.DiGraph()
        g.add_node(1, t=0, z=5.0, y=5.0, x=5.0, segmentation_id=1)
        with pytest.raises(ValueError, match="does not match number of location_keys"):
            TrackingGraph(
                g,
                segmentation=seg,
                location_keys=("z", "y", "x"),
                border_margin=5.0,
            )
