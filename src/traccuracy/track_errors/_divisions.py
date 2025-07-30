from __future__ import annotations

import itertools
import warnings
from typing import TYPE_CHECKING

import networkx as nx
import numpy as np

from traccuracy._tracking_graph import EdgeFlag, NodeFlag
from traccuracy.track_errors._basic import classify_basic_errors

if TYPE_CHECKING:
    from collections.abc import Hashable

    from traccuracy import TrackingGraph
    from traccuracy.matchers._matched import Matched


def _classify_divisions(
    matched_data: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
) -> None:
    """Identify each division as a true positive, false positive or false negative

    This function only works on node mappers that are one-to-one

    Graphs are annotated in place and therefore not returned

    Args:
        matched_data (traccuracy.matchers.Matched): Matched data object
            containing gt and pred graphs with their associated mapping
        relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
            graph have an equivalent multi-edge path in predicted graph
        relax_skips_pred (bool): If True, the metric will check if skips in the predicted
            graph have an equivalent multi-edge path in ground truth graph

    Raises:
        ValueError: mapper must contain a one-to-one mapping of nodes
    """
    g_gt = matched_data.gt_graph
    g_pred = matched_data.pred_graph

    if g_pred.division_annotations + g_gt.division_annotations == 1:
        graph_with_errors = "pred graph" if g_pred.division_annotations else "GT graph"
        raise ValueError(
            f"Only {graph_with_errors} has division annotations. "
            "Please ensure either both or neither "
            + "of the graphs have traccuracy annotations before running metrics."
        )

    if (
        g_pred.division_annotations
        and g_gt.division_annotations
        # if we're not requiring relaxation OR it's already been computed,
        # we can skip division classification
        and (not relax_skips_gt or g_gt.division_skip_gt_relaxed)
        and (not relax_skips_pred or g_pred.division_skip_pred_relaxed)
    ):
        warnings.warn(
            "Division annotations already present. Skipping graph annotation.", stacklevel=2
        )
        return

    # Classify edge errors, will be skipped if already computed
    classify_basic_errors(
        matched_data, relax_skips_gt=relax_skips_gt, relax_skips_pred=relax_skips_pred
    )

    # Collect list of divisions
    div_gt = g_gt.get_divisions()
    div_pred = g_pred.get_divisions()

    for gt_node in div_gt:
        # Find possible matching nodes
        pred_node = matched_data.get_gt_pred_match(gt_node)
        # No matching node so division missed
        if pred_node is None:
            g_gt.set_flag_on_node(gt_node, NodeFlag.FN_DIV)
        # Pred node not labeled as division then fn div
        elif pred_node not in div_pred:
            g_gt.set_flag_on_node(gt_node, NodeFlag.FN_DIV)
        # Check if the division has the correct daughters
        else:
            # New strategy: infer if daughters match based on the edge error annotations
            gt_out_edges = g_gt.graph.out_edges(gt_node)
            correct_daughters = 0
            skip_div = False
            for edge in gt_out_edges:
                flags = g_gt.edges[edge]
                # Edge is correct so daughter node also matches
                if EdgeFlag.TRUE_POS in flags:
                    correct_daughters += 1
                elif (relax_skips_gt or relax_skips_pred) and EdgeFlag.SKIP_TRUE_POS in flags:
                    correct_daughters += 1
                    skip_div = True

            # Entirely correct division
            if correct_daughters == 2 and not skip_div:
                g_gt.set_flag_on_node(gt_node, NodeFlag.TP_DIV)
                g_pred.set_flag_on_node(pred_node, NodeFlag.TP_DIV)
            elif correct_daughters == 2 and skip_div:
                g_gt.set_flag_on_node(gt_node, NodeFlag.TP_DIV_SKIP)
                g_pred.set_flag_on_node(pred_node, NodeFlag.TP_DIV_SKIP)
            # If at least one daughter is wrong, then wrong child division regardless of skip status
            else:
                g_gt.set_flag_on_node(gt_node, NodeFlag.WC_DIV)
                g_pred.set_flag_on_node(pred_node, NodeFlag.WC_DIV)

        # Remove pred division to record that we have classified it
        if pred_node in div_pred:
            div_pred.remove(pred_node)

    # Any remaining pred divisions are false positives
    for fp_div in div_pred:
        g_pred.set_flag_on_node(fp_div, NodeFlag.FP_DIV)

    # Set division annotation flag
    g_gt.division_annotations = True
    g_pred.division_annotations = True
    g_gt.division_skip_gt_relaxed = relax_skips_gt
    g_pred.division_skip_pred_relaxed = relax_skips_pred


def _get_pred_by_t(g: TrackingGraph, node: Hashable, delta_frames: int) -> Hashable:
    """For a given graph and node, traverses back by predecessor until delta_frames

    Warning: if skip edges are present in the path, this function will traverse the
    number of edges specified by delta_frames, but will traverse more frames
    than specified by delta_frames

    Args:
        g (TrackingGraph): TrackingGraph to search on
        node (hashable): Key of starting node
        delta_frames (int): Frame of the predecessor target node

    Raises:
        ValueError: Cannot operate on graphs with merges

    Returns:
        hashable: Node key of predecessor in target frame
    """
    for _ in range(delta_frames):
        nodes = list(g.graph.predecessors(node))
        # Exit if there are no predecessors
        if len(nodes) == 0:
            return None
        # Fail if finding merges
        elif len(nodes) > 1:
            raise ValueError("Cannot operate on graphs with merges")
        node = nodes[0]

    return node


def _get_succ_by_t(g: TrackingGraph, node: Hashable, delta_frames: int) -> Hashable:
    """For a given node, find the successors after delta frames

    If a division event is discovered, returns None

    Warning: if skip edges are present in the path, this function will traverse the
    number of edges specified by delta_frames, but will traverse more frames
    than specified by delta_frames

    Args:
        g (TrackingGraph): TrackingGraph to search on
        node (hashable): Key of starting node
        delta_frames (int): Frame of the successor target node

    Returns:
        hashable: Node id of successor
    """
    for _ in range(delta_frames):
        nodes = list(g.graph.successors(node))
        # Exit if there are no successors another division
        if len(nodes) == 0 or len(nodes) >= 2:
            return None
        node = nodes[0]

    return node


def _correct_shifted_divisions(
    matched_data: Matched, n_frames: int = 1, relaxed: bool = False
) -> None:
    """Allows for divisions to occur within a frame buffer and still be correct

    This implementation asserts that the parent lineages and daughter lineages must match.
    Matching is determined based on the provided mapper
    Does not support merges

    Annotations are made directly on the matched data object. FP/FN divisions store
    a `min_buffer_correct` attribute that indicates the minimum frame buffer value
    that would correct the division.

    Args:
        matched_data (traccuracy.matchers.Matched): Matched data object
            containing gt and pred graphs with their associated mapping
        n_frames (int): Number of frames to include in the frame buffer
        relaxed (bool): If True, the metric will check if skips in the ground truth
            or predicted graph have an equivalent multi-edge path in the other graph
    """
    g_gt = matched_data.gt_graph
    g_pred = matched_data.pred_graph
    mapper = matched_data.mapping

    fp_divs = g_pred.get_nodes_with_flag(NodeFlag.FP_DIV)
    fn_divs = g_gt.get_nodes_with_flag(NodeFlag.FN_DIV)

    # Compare all pairs of fp and fn
    for fp_node, fn_node in itertools.product(fp_divs, fn_divs):
        correct = False
        fp_node_info = g_pred.graph.nodes[fp_node]
        fn_node_info = g_gt.graph.nodes[fn_node]
        t_fp = fp_node_info[g_pred.frame_key]
        t_fn = fn_node_info[g_gt.frame_key]

        if relaxed:
            gt_skip = any(
                EdgeFlag.SKIP_TRUE_POS in g_gt.graph.edges[(fn_node, succ)]
                or EdgeFlag.SKIP_FALSE_NEG in g_gt.graph.edges[(fn_node, succ)]
                for succ in g_gt.graph.successors(fn_node)
            )
            pred_skip = any(
                EdgeFlag.SKIP_TRUE_POS in g_pred.graph.edges[(fp_node, succ)]
                or EdgeFlag.SKIP_FALSE_POS in g_pred.graph.edges[(fp_node, succ)]
                for succ in g_pred.graph.successors(fp_node)
            )
            skip_div = gt_skip or pred_skip
        else:
            skip_div = False

        # Move on if this division has already been corrected by a smaller buffer value
        if (
            fp_node_info.get("min_buffer_correct", np.nan) is not np.nan
            or fn_node_info.get("min_buffer_correct", np.nan) is not np.nan
        ) or (
            skip_div
            and (
                fp_node_info.get("min_buffer_skip_correct", np.nan) is not np.nan
                or fn_node_info.get("min_buffer_skip_correct", np.nan) is not np.nan
            )
        ):
            continue

        # Move on if nodes are not within frame buffer or within same frame
        if abs(t_fp - t_fn) > n_frames or t_fp == t_fn:
            continue

        # False positive in pred occurs before false negative in gt
        if t_fp < t_fn:
            # Check if fp node matches predecessor of fn
            fn_pred = _get_pred_by_t(g_gt, fn_node, t_fn - t_fp)
            # Check if the match exists
            if (fn_pred, fp_node) not in mapper:
                # Match does not exist so divisions cannot match
                continue

            # Start with the earliest division aka t_fp
            # Walk successors until we get to two daughters
            pred_succs = [fp_node]
            valid = True
            while len(pred_succs) < 2:
                if len(pred_succs) == 0:
                    valid = False
                    break
                pred_succs = list(g_pred.graph.successors(pred_succs[0]))

            # Graph ran out of successors so can't match the shifted division
            if not valid:
                continue

            # For each daughter, walk successors until we find a true positive node
            correct_daughters = 0
            for daughter in pred_succs:
                daughter_succs = [daughter]
                # Stop walking if we hit another division or run out of successors
                while len(daughter_succs) < 2 and len(daughter_succs) > 0:
                    # Check if the successor grabbed on the previous loop is a tp
                    if NodeFlag.TRUE_POS in g_pred.graph.nodes[daughter_succs[0]]:
                        # Check if there is a valid gt path between the matched gt node
                        # and the fn_pred node
                        # Node on the gt graph that is matched to the fp node
                        source = fn_pred
                        # Node on the gt graph that is matched to the pred daughter successor
                        target = matched_data.get_pred_gt_match(daughter_succs[0])
                        if nx.has_path(g_gt.graph, source, target):
                            correct_daughters += 1
                            break
                    # Grab the next successor
                    daughter_succs = list(g_pred.graph.successors(daughter_succs[0]))

            # If both daughters are correct, then this is a correct shifted division
            if correct_daughters == 2:
                correct = True

        # False negative in gt occurs before false positive in pred
        else:
            # Check if fp node matches fn predecessor
            fp_pred = _get_pred_by_t(g_pred, fp_node, t_fp - t_fn)
            # Check if match exists
            if (fn_node, fp_pred) not in mapper:
                # Match does not exist so divisions cannot match
                continue

            # Start with the earliest division aka fn
            # Walk gt graph from fn_node until we get to two daughters
            gt_succs = [fn_node]
            valid = True
            while len(gt_succs) < 2:
                if len(gt_succs) == 0:
                    valid = False
                    break
                gt_succs = list(g_gt.graph.successors(gt_succs[0]))

            # Graph ran out of successors so can't match the shifted division
            if not valid:
                continue

            # For each daughter, walk gt successors until we find a true positive node
            correct_daughters = 0
            for daughter in gt_succs:
                daughter_succs = [daughter]
                # Stop walking if we hit another division or run out of successors
                while len(daughter_succs) < 2 and len(daughter_succs) > 0:
                    # Check if the successor grabbed on the previous loop is a tp
                    if NodeFlag.TRUE_POS in g_gt.graph.nodes[daughter_succs[0]]:
                        # Check if there is a valid pred path between the matched pred node
                        # and the fp_pred node
                        # Node on the pred graph that is matched to the fn node
                        source = fp_pred
                        # Node on the pred graph that is matched to the gt daughter successor
                        target = matched_data.get_gt_pred_match(daughter_succs[0])
                        if nx.has_path(g_pred.graph, source, target):
                            correct_daughters += 1
                            break
                    # Grab the next successor
                    daughter_succs = list(g_gt.graph.successors(daughter_succs[0]))

            # If both daughters are correct, then this is a correct shifted division
            if correct_daughters == 2:
                correct = True

        if correct and not skip_div:
            # set the current frame buffer as the minimum correct frame
            g_gt.graph.nodes[fn_node]["min_buffer_correct"] = n_frames
            g_pred.graph.nodes[fp_node]["min_buffer_correct"] = n_frames
        elif correct and skip_div:
            g_gt.graph.nodes[fn_node]["min_buffer_skip_correct"] = n_frames
            g_pred.graph.nodes[fp_node]["min_buffer_skip_correct"] = n_frames


def evaluate_division_events(
    matched_data: Matched,
    max_frame_buffer: int = 0,
    relax_skips_gt: bool = False,
    relax_skips_pred: bool = False,
) -> Matched:
    """Classify division errors and correct shifted divisions according to frame_buffer

    Note: A copy of matched_data will be created for each frame_buffer other than 0.
    For large graphs, creating copies may introduce memory problems.

    Args:
        matched_data (traccuracy.matchers.Matched): Matched data object containing
            gt and pred graphs with their associated mapping
        max_frame_buffer (int, optional): Maximum value of frame buffer to use in correcting
            shifted divisions. Divisions will be evaluated for all integer values of frame
            buffer between 0 and max_frame_buffer
        relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
            graph have an equivalent multi-edge path in predicted graph
        relax_skips_pred (bool): If True, the metric will check if skips in the predicted
            graph have an equivalent multi-edge path in ground truth graph

    Returns:
        matched_data (traccuracy.matchers.Matched): Matched data object with annotated FP, FN and TP
            divisions, with a `min_buffer_correct` attribute indicating the minimum frame
            buffer value that corrects this division, if applicable.
    """

    # Baseline division classification
    _classify_divisions(
        matched_data, relax_skips_gt=relax_skips_gt, relax_skips_pred=relax_skips_pred
    )
    gt_graph = matched_data.gt_graph
    pred_graph = matched_data.pred_graph

    # mark all FN divisions with NaN "min_buffer_correct" value
    for node in gt_graph.get_nodes_with_flag(NodeFlag.FN_DIV):
        gt_graph.graph.nodes[node]["min_buffer_correct"] = np.nan
    # mark all FP divisions with NaN "min_buffer_correct" value
    for node in pred_graph.get_nodes_with_flag(NodeFlag.FP_DIV):
        pred_graph.graph.nodes[node]["min_buffer_correct"] = np.nan

    # Annotate divisions that would be corrected by frame buffer
    for delta in range(1, max_frame_buffer + 1):
        _correct_shifted_divisions(
            matched_data, n_frames=delta, relaxed=(relax_skips_gt or relax_skips_pred)
        )

    return matched_data
