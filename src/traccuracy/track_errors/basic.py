from __future__ import annotations

import logging
from typing import TYPE_CHECKING

from traccuracy._tracking_graph import EdgeFlag, NodeFlag

if TYPE_CHECKING:
    from traccuracy.matchers import Matched

logger = logging.getLogger(__name__)


def classify_basic_errors(
        matched: Matched,
        relax_skips_gt: bool = False,
        relax_skips_pred: bool = False
    ) -> None:
    _classify_nodes(matched)
    _classify_edges(matched, relax_skips_gt, relax_skips_pred)


def _classify_nodes(matched: Matched) -> None:
    """Classify a pair of GT/pred nodes as true positives if the match to only
    one other node. Supports one-to-one

    False positive nodes are all those remaining in the pred graph that are not true positives.
    False negative nodes are all those remaining in the gt graph that are not true positives.
    Args:
        matched (traccuracy.matches.Matched): Matched data object containing gt
            and pred graphs with their associated mapping
    """
    pred_graph = matched.pred_graph
    gt_graph = matched.gt_graph

    if pred_graph.node_errors and gt_graph.node_errors:
        logger.warning("Node errors already calculated. Skipping graph annotation")
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


def _classify_edges(matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False) -> None:
    """Assign edges as true positives if both the source and target nodes are true positives
    in the gt graph and the corresponding edge exists in the predicted graph. Supports one-to-one
    matching.

    All remaining edges in the gt are false negatives and all remaining edges in the prediction
    are false negatives.

    Args:
        matched (traccuracy.matches.Matched): Matched data object containing gt
            and pred graphs with their associated mapping
    """
    pred_graph = matched.pred_graph
    gt_graph = matched.gt_graph

    if pred_graph.edge_errors and gt_graph.edge_errors:
        logger.warning("Edge errors already calculated. Skipping graph annotation")
        return

    # Node errors are needed for edge annotation
    if not pred_graph.node_errors and not gt_graph.node_errors:
        logger.warning("Node errors have not been annotated. Running node annotation.")
        _classify_nodes(matched)

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

        if (source_pred, target_pred) in pred_graph.edges:
            gt_graph.remove_flag_from_edge((source, target), EdgeFlag.FALSE_NEG)
            gt_graph.set_flag_on_edge((source, target), EdgeFlag.TRUE_POS)
            pred_graph.set_flag_on_edge((source_pred, target_pred), EdgeFlag.TRUE_POS)

    # Any pred edges that aren't marked as TP are FP
    pred_fp_edges = set(pred_graph.edges) - set(pred_graph.get_edges_with_flag(EdgeFlag.TRUE_POS))
    for edge in pred_fp_edges:
        pred_graph.set_flag_on_edge(edge, EdgeFlag.FALSE_POS)

    pred_graph.edge_errors = True
    gt_graph.edge_errors = True
