from __future__ import annotations

from collections import defaultdict
from typing import TYPE_CHECKING, Any

from traccuracy._tracking_graph import EdgeFlag, NodeFlag

if TYPE_CHECKING:
    from traccuracy._tracking_graph import TrackingGraph
    from traccuracy.matchers import Matched


def compute_track_accuracy(
    matched: Matched,
    window: int,
    lineages: bool = True,
    error_type: str = "basic",
    relax_skips_gt: bool = False,
    relax_skips_pred: bool = False,
) -> dict[int, tuple[int, int]]:
    """Compute the fraction of GT track segments correctly reconstructed.

    Uses a sliding window approach: for each window size from 1 to `window`,
    counts how many GT track segments of that length are correctly reconstructed.

    Args:
        matched: Matched data object with annotated errors
        window: Maximum window size to evaluate
        lineages: If True, evaluate on full lineages. If False, on tracklets.
        error_type: "basic" or "ctc" - which error classification was used
        relax_skips_gt: If True, SKIP_TRUE_POS edges in GT count as correct
        relax_skips_pred: If True, SKIP_TRUE_POS edges in pred count as correct

    Returns:
        Dictionary mapping window size (int) to tuple of (correct_count, total_count)
    """
    total_segments: dict[int, int] = {}
    correct_segments: dict[int, int] = {}

    for i in range(1, window + 1):
        total_segments[i] = 0
        correct_segments[i] = 0

    # Determine which flags to check based on error type
    is_ctc = error_type == "ctc"
    node_tp = NodeFlag.CTC_TRUE_POS if is_ctc else NodeFlag.TRUE_POS

    # Get components (lineages or tracklets)
    if lineages:
        components = matched.gt_graph.get_lineages()
    else:
        components = matched.gt_graph.get_tracklets(include_division_edges=False)

    gt_graph = matched.gt_graph
    pred_graph = matched.pred_graph

    for gt_track in components:
        # Build nodes_by_frame for temporal ordering
        nodes_by_frame: dict[int, list] = defaultdict(list)
        for node, data in gt_track.nodes(data=True):
            nodes_by_frame[data[gt_graph.frame_key]].append(node)

        sorted_frames = sorted(nodes_by_frame.keys())
        for start_frame in sorted_frames:
            gt_start_nodes = nodes_by_frame[start_frame]
            for gt_start_node in gt_start_nodes:
                start_edges = list(gt_track.out_edges(gt_start_node))
                for start_edge in start_edges:
                    window_size = 1
                    correct = True
                    current_nodes = [gt_start_node]
                    next_edges = [start_edge]

                    while len(next_edges) > 0:
                        if correct:
                            # Check current nodes (all must be TP)
                            for gt_node in current_nodes:
                                if not _is_node_correct(
                                    gt_node,
                                    gt_graph,
                                    pred_graph,
                                    matched,
                                    node_tp,
                                    is_ctc,
                                    relax_skips_pred,
                                ):
                                    correct = False
                                    break

                            # Check next edges (all must be TP or SKIP_TRUE_POS)
                            # Note: We don't need to explicitly check end nodes (edge targets)
                            # because edge TP implies both endpoint nodes are TP.
                            if correct:
                                for gt_edge in next_edges:
                                    if not _is_edge_correct(
                                        gt_edge,
                                        gt_graph,
                                        pred_graph,
                                        matched,
                                        is_ctc,
                                        relax_skips_gt,
                                        relax_skips_pred,
                                    ):
                                        correct = False
                                        break

                        # Update segment counts
                        total_segments[window_size] += 1
                        if correct:
                            correct_segments[window_size] += 1

                        # Update loop variables
                        window_size += 1
                        # Get target nodes from current edges (v from (u, v))
                        current_nodes = [v for _, v in next_edges]
                        # Get outgoing edges from those nodes
                        next_edges = []
                        for node in current_nodes:
                            next_edges.extend(gt_track.out_edges(node))

                        if window_size > window:
                            break

    result = {}
    for i in range(1, window + 1):
        result[i] = (correct_segments[i], total_segments[i])
    return result


def _is_node_correct(
    gt_node: Any,
    gt_graph: TrackingGraph,
    pred_graph: TrackingGraph,
    matched: Matched,
    node_tp: NodeFlag,
    is_ctc: bool,
    relax_skips_pred: bool,
) -> bool:
    """Check if a GT node is correctly matched.

    For basic errors:
    - GT node must have the TRUE_POS flag
    - GT node must not have FN_DIV flag
    - Matched pred nodes must also have TRUE_POS flag
    - Matched pred nodes must not have FP_DIV flag

    For CTC errors:
    - GT node must have the CTC_TRUE_POS flag
    - GT node must not have FN_DIV flag
    - Matched pred nodes must not have FP_DIV flag

    If relax_skips_pred is True, nodes between SKIP_TRUE_POS edges are also correct.
    """
    gt_node_data = gt_graph.nodes[gt_node]

    # Check for division errors on GT node (FN_DIV means missed division)
    if NodeFlag.FN_DIV in gt_node_data:
        return False

    # Check if GT node is a TP
    if node_tp in gt_node_data:
        # Check matched pred nodes for FP_DIV (false positive division)
        pred_nodes = matched.get_gt_pred_matches(gt_node)
        for on in pred_nodes:
            if NodeFlag.FP_DIV in pred_graph.nodes[on]:
                return False

        if is_ctc:
            # CTC only checks GT node, not pred node TP flags
            return True
        else:
            # Basic errors: also check that all matched pred nodes are TP
            for on in pred_nodes:
                if node_tp not in pred_graph.nodes[on]:
                    return False
            return True

    # If not a TP, check if it's between skip edges (when relaxing)
    if relax_skips_pred:
        # Check if any incoming edge is a SKIP_TRUE_POS
        for prev_edge in gt_graph.graph.in_edges(gt_node):
            if EdgeFlag.SKIP_TRUE_POS in gt_graph.edges[prev_edge]:
                return True

    return False


def _is_edge_correct(
    gt_edge: tuple[Any, Any],
    gt_graph: TrackingGraph,
    pred_graph: TrackingGraph,
    matched: Matched,
    is_ctc: bool,
    relax_skips_gt: bool,
    relax_skips_pred: bool,
) -> bool:
    """Check if a GT edge is correctly matched.

    For basic errors: edge is correct if it has the TRUE_POS flag.
    For CTC errors: edge is correct if it does NOT have CTC_FALSE_NEG flag,
        and matched pred edges don't have WRONG_SEMANTIC or INTERTRACK_EDGE.
    If skip relaxation is enabled, SKIP_TRUE_POS also counts as correct.
    """
    edge_data = gt_graph.edges[gt_edge]

    if is_ctc:
        # CTC errors don't annotate edge TPs, so check for absence of error flags
        if EdgeFlag.CTC_FALSE_NEG in edge_data:
            return False

        # Also check matched pred edges for CTC error flags
        matched_sources = matched.get_gt_pred_matches(gt_edge[0])
        matched_targets = matched.get_gt_pred_matches(gt_edge[1])
        for src in matched_sources:
            for tgt in matched_targets:
                if pred_graph.graph.has_edge(src, tgt):
                    pred_edge_data = pred_graph.edges[(src, tgt)]
                    if EdgeFlag.WRONG_SEMANTIC in pred_edge_data:
                        return False
                    if EdgeFlag.INTERTRACK_EDGE in pred_edge_data:
                        return False
        return True
    else:
        # Check for regular TP
        if EdgeFlag.TRUE_POS in edge_data:
            return True

    # Check for skip TP if relaxation is enabled
    if (relax_skips_gt or relax_skips_pred) and EdgeFlag.SKIP_TRUE_POS in edge_data:
        return True

    return False
