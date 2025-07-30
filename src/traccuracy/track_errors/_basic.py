from __future__ import annotations

import itertools
import logging
import warnings
from typing import TYPE_CHECKING

from traccuracy._tracking_graph import EdgeFlag, NodeFlag
from traccuracy.utils import get_equivalent_skip_edge

if TYPE_CHECKING:
    from traccuracy.matchers._matched import Matched

logger = logging.getLogger(__name__)


def classify_basic_errors(
    matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
) -> None:
    """Classify basic node and edge errors in the matched graphs.

    A pair of GT/pred nodes is classified as true positive if the
    matching is one-to-one. False positive nodes are all those remaining
    in the pred graph. False negative nodes are all those remaining in the
    GT graph.

    A pair of GT/pred edges is classified as true positive if both the source
    and target nodes are true positives, and the GT graph contains the edge.
    All remaining edges in the GT graph are false negatives, and all
    remaining edges in the prediction graph are false positives.

    Args:
        matched (traccuracy.matchers.Matched): Matched data object containing gt
            and pred graphs with their associated mapping
        relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
            graph have an equivalent multi-edge path in predicted graph
        relax_skips_pred (bool): If True, the metric will check if skips in the predicted
            graph have an equivalent multi-edge path in ground truth graph
    """
    _classify_nodes(matched)
    _classify_edges(matched, relax_skips_gt, relax_skips_pred)


def _classify_nodes(matched: Matched) -> None:
    """Classify a pair of GT/pred nodes as true positives if the match to only
    one other node. Supports one-to-one

    False positive nodes are all those remaining in the pred graph that are not true positives.
    False negative nodes are all those remaining in the gt graph that are not true positives.
    Args:
        matched (traccuracy.matchers.Matched): Matched data object containing gt
            and pred graphs with their associated mapping
    """
    pred_graph = matched.pred_graph
    gt_graph = matched.gt_graph

    if pred_graph.node_errors + gt_graph.node_errors == 1:
        graph_with_errors = "pred graph" if pred_graph.node_errors else "GT graph"
        raise ValueError(
            f"Only {graph_with_errors} has node errors annotated. Please ensure either both "
            + "or neither of the graphs have traccuracy annotations before running metrics."
        )

    if pred_graph.node_errors and gt_graph.node_errors:
        warnings.warn("Node errors already calculated. Skipping graph annotation", stacklevel=2)
        return

    # Label as TP if the node is matched
    for gt_id, pred_id in matched.mapping:
        gt_graph.set_flag_on_node(gt_id, NodeFlag.TRUE_POS)
        pred_graph.set_flag_on_node(pred_id, NodeFlag.TRUE_POS)

    # Any node not labeled as TP in prediction is a false positive
    fp_nodes = set(pred_graph.nodes) - set(pred_graph.get_nodes_with_flag(NodeFlag.TRUE_POS))
    for node in fp_nodes:
        pred_graph.set_flag_on_node(node, NodeFlag.FALSE_POS)

    # Any node not labeled as TP in GT is a false negative
    fn_nodes = set(gt_graph.nodes) - set(gt_graph.get_nodes_with_flag(NodeFlag.TRUE_POS))
    for node in fn_nodes:
        gt_graph.set_flag_on_node(node, NodeFlag.FALSE_NEG)

    gt_graph.node_errors = True
    pred_graph.node_errors = True


def _classify_edges(
    matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
) -> None:
    """Assign edges as true positives if both the source and target nodes are true positives
    in the gt graph and the corresponding edge exists in the predicted graph. Supports one-to-one
    matching.

    All remaining edges in the gt are false negatives and all remaining edges in the prediction
    are false negatives.

    Args:
        matched (traccuracy.matches.Matched): Matched data object containing gt
            and pred graphs with their associated mapping
        relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
            graph have an equivalent multi-edge path in predicted graph
        relax_skips_pred (bool): If True, the metric will check if skips in the predicted
            graph have an equivalent multi-edge path in ground truth graph
    """
    pred_graph = matched.pred_graph
    gt_graph = matched.gt_graph

    # if only one of the graphs has been annotated, we raise
    # because we'll likely leave things in an inconsistent state
    if pred_graph.edge_errors + gt_graph.edge_errors == 1:
        graph_with_errors = "pred graph" if pred_graph.edge_errors else "GT graph"
        raise ValueError(
            f"Only {graph_with_errors} has edge errors annotated. Please ensure either both or"
            " neither of the graphs have traccuracy annotations before running metrics."
        )

    if (
        pred_graph.edge_errors
        and gt_graph.edge_errors
        # if we're not requiring relaxation OR it's already been computed,
        # we can skip edge classification
        and (not relax_skips_gt or gt_graph.skip_edges_gt_relaxed)
        and (not relax_skips_pred or pred_graph.skip_edges_pred_relaxed)
    ):
        warnings.warn("Edge errors already calculated. Skipping graph annotation", stacklevel=2)
        return

    # Node errors are needed for edge annotation
    if not pred_graph.node_errors and not gt_graph.node_errors:
        logger.info("Node errors have not been annotated. Running node annotation.", stacklevel=2)
        _classify_nodes(matched)

    gt_skips = set()
    pred_skips = set()
    if relax_skips_gt:
        gt_skips = gt_graph.get_skip_edges()
        for edge in gt_skips:
            gt_graph.set_flag_on_edge(edge, EdgeFlag.SKIP_FALSE_NEG)

    if relax_skips_pred:
        pred_skips = pred_graph.get_skip_edges()

    # Set all gt edges to false neg and flip to true if match is found
    gt_graph.set_flag_on_all_edges(EdgeFlag.FALSE_NEG)

    # Extract subset of gt edges where both nodes are matched
    gt_tp_nodes = gt_graph.get_nodes_with_flag(NodeFlag.TRUE_POS)
    sub_gt_graph = gt_graph.graph.subgraph(gt_tp_nodes)

    # Process all gt edges with matched nodes to look for matched edge
    for source, target in sub_gt_graph.edges:
        # Lookup pred nodes corresponding to gt edge nodes
        source_pred = matched.get_gt_pred_match(source)
        target_pred = matched.get_gt_pred_match(target)

        if relax_skips_gt and (source, target) in gt_skips:
            if equivalent_path := get_equivalent_skip_edge(
                matched, source, target, source_pred, target_pred
            ):
                gt_graph.remove_flag_from_edge((source, target), EdgeFlag.SKIP_FALSE_NEG)
                gt_graph.set_flag_on_edge((source, target), EdgeFlag.SKIP_TRUE_POS)
                for pth_src, pth_tgt in itertools.pairwise(equivalent_path):
                    pred_graph.set_flag_on_edge((pth_src, pth_tgt), EdgeFlag.SKIP_TRUE_POS)

        if (source_pred, target_pred) in pred_graph.edges:
            gt_graph.remove_flag_from_edge((source, target), EdgeFlag.FALSE_NEG)
            gt_graph.set_flag_on_edge((source, target), EdgeFlag.TRUE_POS)
            pred_graph.set_flag_on_edge((source_pred, target_pred), EdgeFlag.TRUE_POS)

    # Any pred edges that aren't marked as TP are FP
    pred_fp_edges = set(pred_graph.edges) - set(pred_graph.get_edges_with_flag(EdgeFlag.TRUE_POS))
    for edge in pred_fp_edges:
        pred_graph.set_flag_on_edge(edge, EdgeFlag.FALSE_POS)

    # Need to go through pred skip edges separately to check if
    # they have an equivalent path in GT (since they won't be captured by checking GT edges)
    if relax_skips_pred:
        for source_pred, target_pred in pred_skips:
            # source and dest must be matched
            if (
                NodeFlag.TRUE_POS not in pred_graph.nodes[source_pred]
                or NodeFlag.TRUE_POS not in pred_graph.nodes[target_pred]
            ):
                continue

            # Lookup GT nodes corresponding to pred edge nodes
            source_gt = matched.get_pred_gt_match(source_pred)
            target_gt = matched.get_pred_gt_match(target_pred)

            if equivalent_path := get_equivalent_skip_edge(
                matched, source_pred, target_pred, source_gt, target_gt
            ):
                pred_graph.set_flag_on_edge((source_pred, target_pred), EdgeFlag.SKIP_TRUE_POS)
                for pth_src, pth_tgt in itertools.pairwise(equivalent_path):
                    gt_graph.set_flag_on_edge((pth_src, pth_tgt), EdgeFlag.SKIP_TRUE_POS)

        skip_tps = pred_graph.get_edges_with_flag(EdgeFlag.SKIP_TRUE_POS)
        fp_skips = pred_skips - skip_tps
        for edge in fp_skips:
            pred_graph.set_flag_on_edge(edge, EdgeFlag.SKIP_FALSE_POS)

    pred_graph.edge_errors = True
    gt_graph.edge_errors = True
    gt_graph.skip_edges_gt_relaxed = relax_skips_gt
    pred_graph.skip_edges_pred_relaxed = relax_skips_pred
