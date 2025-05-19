from __future__ import annotations

import copy
from typing import TYPE_CHECKING

import numpy as np

from traccuracy._tracking_graph import NodeFlag, TrackingGraph

if TYPE_CHECKING:
    from traccuracy.matchers._base import Matched


def get_corrected_division_graphs_with_delta(
    matched: Matched, frame_buffer: int = 0
) -> tuple[TrackingGraph, TrackingGraph]:
    """Returns copies of graphs with divisions corrected.

    All divisions corrected by a frame_buffer value less than or equal
    to the given frame buffer are marked as `TP_DIV`.

    Args:
        matched (traccuracy.matchers.Matched): Matched object for set of GT and Pred data.
            Must be annotated with division events.
        frame_buffer (int): Maximum frame buffer to use for division correction

    Returns:
        tuple[traccuracy.TrackingGraph, traccuracy.TrackingGraph]: Tuple of corrected
        GT and Pred graphs
    """
    corrected_gt_graph = copy.deepcopy(matched.gt_graph)
    corrected_pred_graph = copy.deepcopy(matched.pred_graph)

    for node in corrected_gt_graph.get_nodes_with_flag(NodeFlag.FN_DIV):
        if corrected_gt_graph.graph.nodes[node].get("min_buffer_correct", np.nan) <= frame_buffer:
            corrected_gt_graph.graph.nodes[node].pop(NodeFlag.FN_DIV)
            corrected_gt_graph.graph.nodes[node][NodeFlag.TP_DIV] = True
    for node in corrected_pred_graph.get_nodes_with_flag(NodeFlag.FP_DIV):
        if corrected_pred_graph.graph.nodes[node].get("min_buffer_correct", np.nan) <= frame_buffer:
            corrected_pred_graph.graph.nodes[node].pop(NodeFlag.FP_DIV)
            corrected_pred_graph.graph.nodes[node][NodeFlag.TP_DIV] = True

    return corrected_gt_graph, corrected_pred_graph
