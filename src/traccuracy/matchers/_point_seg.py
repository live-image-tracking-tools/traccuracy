from __future__ import annotations

from typing import TYPE_CHECKING, cast

from ._base import Matcher

if TYPE_CHECKING:
    from collections.abc import Hashable
    from typing import Any

    import numpy as np

    from traccuracy._tracking_graph import TrackingGraph


class PointSegMatcher(Matcher):
    """A matcher that constructs a mapping from a set of points to a segmentation
    array by determining if a point falls within a segmentation label.

    Either the predicted data or the ground truth can contain a segmentation array,
    but not both. The matcher will map many points to a single segmentation label.
    """

    def _compute_mapping(
        self, gt_graph: TrackingGraph, pred_graph: TrackingGraph
    ) -> list[tuple[Any, Any]]:
        # Identify which data has segmentations
        # s data has seg, p data has points
        # Fail if both have segmentations or segmentations missing
        if gt_graph.segmentation is not None and pred_graph.segmentation is not None:
            raise ValueError(
                "Both datasets have segmentations. "
                "Please provide only one dataset with segmentations."
            )
        elif gt_graph.segmentation is not None:
            seg_source = "gt"
            s_graph = gt_graph
            p_graph = pred_graph
        elif pred_graph.segmentation is not None:
            seg_source = "pred"
            s_graph = pred_graph
            p_graph = gt_graph
        else:
            raise ValueError("Data provided does not contain segmentations.")

        # Cast s_graph.segmentation to ndarray to eliminate none possibility
        s_graph.segmentation = cast("np.ndarray", s_graph.segmentation)

        mapping: list[tuple[Any, Any]] = []
        if s_graph.start_frame is None or s_graph.end_frame is None:
            return mapping

        map_p_nodes, map_s_nodes = [], []
        for frame in range(s_graph.start_frame, s_graph.end_frame):
            # Get mapping from p_nodes to s_seg_ids
            p_nodes = list(p_graph.nodes_by_frame.get(frame, []))
            p_locations = [p_graph.get_location(node) for node in p_nodes]
            frame_map = match_point_to_seg(p_nodes, p_locations, s_graph.segmentation[frame])

            # Construct lookup from seg_id to s_node id
            seg_to_snode = {}
            for node in s_graph.nodes_by_frame[frame]:
                seg_id = s_graph.nodes[node][s_graph.label_key]
                seg_to_snode[seg_id] = node

            # Convert s_seg_ids to s_nodes
            for p_node, seg_id in frame_map.items():
                map_p_nodes.append(p_node)
                map_s_nodes.append(seg_to_snode[seg_id])

        # Construct mapping from tuples of two lists so order gt -> pred is correct
        if seg_source == "gt":
            mapping = list(zip(map_s_nodes, map_p_nodes, strict=False))
        else:
            mapping = list(zip(map_p_nodes, map_s_nodes, strict=False))

        return mapping


def match_point_to_seg(
    node_ids: list[Hashable], locs: list[list[float]], seg: np.ndarray
) -> dict[Hashable, int]:
    """For a single timepoint, identify the segmentation ids which a set of points index into

    Args:
        node_ids (list[Hashable]): A list of node ids
        locs (list[list[float]]): A list of locations corresponding to the list of node ids
        seg (np.ndarray): A 2D segmentation array

    Returns:
        dict[Hashable, int]: A dictionary mapping from node_id to segmentation value
    """
    node_to_segid = {}
    for node, loc in zip(node_ids, locs, strict=False):
        # Check if loc is inside of segmentation after casting to int for indexing
        seg_val = seg[tuple([int(x) for x in loc])]
        if seg_val != 0:
            node_to_segid[node] = seg_val

    return node_to_segid
