from __future__ import annotations

import copy
from typing import TYPE_CHECKING

import networkx as nx
import numpy as np

from traccuracy._tracking_graph import NodeFlag

if TYPE_CHECKING:
    from collections.abc import Hashable

    from traccuracy._tracking_graph import TrackingGraph
    from traccuracy.matchers._matched import Matched


def get_equivalent_skip_edge(
    skip_other_matched: Matched,
    skip_src: Hashable,
    skip_dst: Hashable,
    matched_src: Hashable,
    matched_dst: Hashable,
) -> list[Hashable]:
    """Get path `matched_src ->...-> matched_dst` equivalent to `skip_src -> skip_dst`.

    A skip edge `skip_src -> skip_dst` is equivalent to a path connecting `matched_src` and
    `matched_dst` if:

    - `skip_src` is a valid match for `matched_src`,
    - `skip_dst` is a valid match for `matched_dst`,
    - `matched_src` is an ancestor of `matched_dst` (regardless of intervening nodes) AND
    - all nodes on the path `matched_src ->...-> matched_dst` have no valid matches in
        `skip_other_matched`.

    Args:
        skip_other_matched (traccuracy.matchers._base.Matched): Matched object mapping
            skip nodes to other nodes
        skip_src (Hashable): ID of source node of skip edge
        skip_dst (Hashable): ID of destination node of skip edge
        matched_src (Hashable): matched node of skip_src
        matched_dst (Hashable): matched node of skip_dst

    Returns:
        list[Hashable]: path from matched_src to matched_dst, or empty list if no such path.
    """
    if (skip_src, matched_src) not in skip_other_matched.mapping and (
        matched_src,
        skip_src,
    ) not in skip_other_matched.mapping:
        return []
    if (skip_dst, matched_dst) not in skip_other_matched.mapping and (
        matched_dst,
        skip_dst,
    ) not in skip_other_matched.mapping:
        return []
    gt_graph = skip_other_matched.gt_graph.graph
    pred_graph = skip_other_matched.pred_graph.graph

    # figure out which graph contains the skip edge and which contains the matched "edge"
    # this allows us to run all remaining checks in one direction only
    skip_graph = gt_graph if (skip_src, skip_dst) in gt_graph.edges else pred_graph
    other_graph = pred_graph if skip_graph is gt_graph else gt_graph
    assert (skip_src, skip_dst) in skip_graph.edges, (
        "Couldn't determine which matched graph contains skip edge"
    )
    assert skip_graph != other_graph, (
        f"Couldn't determine which graph contains skip edge and which contains matched {'edge'}!r"
    )
    if skip_graph is gt_graph:
        other_skip_map = skip_other_matched.pred_gt_map
    else:
        other_skip_map = skip_other_matched.gt_pred_map

    # check if there's a path in other_graph from matched_src to matched_dst
    try:
        equivalent_path = nx.shortest_path(other_graph, matched_src, matched_dst)
    except nx.NetworkXNoPath:
        return []

    # equivalent path includes src and dst which we know are matched
    # check that no other nodes in the path have a match
    for path_node in equivalent_path[1:-1]:
        if path_node in other_skip_map:
            return []
    return equivalent_path


def get_corrected_division_graphs_with_delta(
    matched: Matched, frame_buffer: int = 0
) -> tuple[TrackingGraph, TrackingGraph]:
    """Returns copies of graphs with divisions corrected.

    All divisions corrected by a frame_buffer value less than or equal
    to the given frame buffer are marked as `TP_DIV`.

    Args:
        matched (traccuracy.matchers._base.Matched): Matched object for set of GT and Pred data.
            Must be annotated with division events.
        frame_buffer (int): Maximum frame buffer to use for division correction

    Returns:
        tuple[traccuracy.TrackingGraph, traccuracy.TrackingGraph]: Tuple of corrected
        GT and Pred graphs
    """
    if not matched.gt_graph.division_annotations:
        raise ValueError("Ground truth graph must have divisions annotated.")
    if not matched.pred_graph.division_annotations:
        raise ValueError("Predicted graph must have divisions annotated.")
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
