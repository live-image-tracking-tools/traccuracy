"""This submodule classifies division errors in tracking graphs

Each division is classified as one of the following:
- true positive
- false positive
- false negative

These functions require two `TrackingGraph` objects and a mapper between
nodes in the two graphs. Divisions are identified as correct if both the parent
and daughter nodes match between the GT and predicted graph.

Temporal tolerance for correct divisions is implemented to allow for cases in
which the exact frame that a division event occurs is somewhat arbitrary due to
a high frame rate or variable segmentation or detection. Consider the following
graphs as an example::

    G1
                                2_4
    1_0 -- 1_1 -- 1_2 -- 1_3 -<
                                3_4
    G2
                  2_2 -- 2_3 -- 2_4
    1_0 -- 1_1 -<
                  3_2 -- 3_3 -- 3_4

After classifying basic division errors, we consider all false positive and false
negative divisions. If a pair of errors occurs within the specified frame buffer,
the pair is considered a true positive division if the parent nodes and daughter
nodes match. We determine the "parent node" of the late division, e.g. node 1_3 in
graph G1, by traversing back along the graph until we find the node in the same frame
as the parent node of the early division. We repeat the process for finding daughters
of the early division, by advancing along the graph to find nodes in the same frame
as the late division daughters.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING

import numpy as np

from traccuracy._tracking_graph import NodeFlag
from traccuracy.matchers._base import Matched
from traccuracy.track_errors.divisions import _evaluate_division_events

from ._base import Metric

if TYPE_CHECKING:
    from traccuracy import TrackingGraph
    from traccuracy.matchers import Matched

logger = logging.getLogger(__name__)


class DivisionMetrics(Metric):
    """Classify division events and provide the following summary metrics

    - Division Recall
    - Division Precision
    - Division F1 Score
    - Mitotic Branching Correctness: TP / (TP + FP + FN) as defined by Ulicna, K.,
        Vallardi, G., Charras, G. & Lowe, A. R. Automated deep lineage tree analysis
        using a Bayesian single cell tracking approach. Frontiers in Computer Science
        3, 734559 (2021).

    Args:
        max_frame_buffer (int, optional): Maximum value of frame buffer to use in correcting
            shifted divisions. Divisions will be evaluated for all integer values of frame
            buffer between 0 and max_frame_buffer
    """

    def __init__(self, max_frame_buffer: int = 0) -> None:
        valid_matching_types = ["one-to-one"]
        super().__init__(valid_matching_types)

        self.frame_buffer = max_frame_buffer

    def _compute(self, data: Matched) -> dict[str, dict[str, float]]:
        """Runs `_evaluate_division_events` and calculates summary metrics for each frame buffer

        Args:
            matched_data (traccuracy.matchers.Matched): Matched object for set of GT and Pred data
                Must meet the `needs_one_to_one` criteria

        Returns:
            dict: Returns a nested dictionary with one dictionary per frame buffer value
        """
        _evaluate_division_events(
            data,
            max_frame_buffer=self.frame_buffer,
        )

        return self._calculate_metrics(data.gt_graph, data.pred_graph)

    def _get_mbc(self, gt_div_count: int, tp_division_count: int, fp_division_count: int) -> float:
        """Computes Mitotic Branching Correctness and returns nan if there are no gt
        divisions and no false positives

        Args:
            gt_div_count (int): Total number of gt divisions
            tp_division_count (int): Total number of tp divisions
            fp_division_count (int): Total number of fp divisions

        Returns:
            float: Mitotic branching correctness
        """
        if gt_div_count + fp_division_count == 0:
            return np.nan
        return tp_division_count / (fp_division_count + gt_div_count)

    def _calculate_metrics(
        self, g_gt: TrackingGraph, g_pred: TrackingGraph
    ) -> dict[str, dict[str, float]]:
        gt_div_count = len(g_gt.get_divisions())
        pred_div_count = len(g_pred.get_divisions())
        tp_division_count = len(g_gt.get_nodes_with_flag(NodeFlag.TP_DIV))
        fn_division_count = len(g_gt.get_nodes_with_flag(NodeFlag.FN_DIV))
        fp_division_count = len(g_pred.get_nodes_with_flag(NodeFlag.FP_DIV))
        wc_division_count = len(g_pred.get_nodes_with_flag(NodeFlag.WC_DIV))

        if gt_div_count == 0:
            logger.warning("No ground truth divisions present. Metrics may return np.nan")

        recall = self._get_recall(tp_division_count, gt_div_count)
        precision = self._get_precision(tp_division_count, pred_div_count)
        f1 = self._get_f1(recall, precision)
        mbc = self._get_mbc(gt_div_count, tp_division_count, fp_division_count)

        res_dict = {}
        res_dict["Frame Buffer 0"] = {
            "Division Recall": recall,
            "Division Precision": precision,
            "Division F1": f1,
            "Mitotic Branching Correctness": mbc,
            "Total GT Divisions": gt_div_count,
            "Total Predicted Divisions": pred_div_count,
            "True Positive Divisions": tp_division_count,
            "False Positive Divisions": fp_division_count,
            "False Negative Divisions": fn_division_count,
            "Wrong Children Divisions": wc_division_count,
        }
        for fb in range(1, self.frame_buffer + 1):
            new_tp_div_count = 0
            for node in g_pred.graph.nodes:
                node_info = g_pred.graph.nodes[node]
                if node_info.get("min_buffer_correct", np.nan) <= fb:
                    new_tp_div_count += 1
            new_fp_div_count = fp_division_count - new_tp_div_count
            new_fn_div_count = fn_division_count - new_tp_div_count
            new_tp_div_count += tp_division_count
            recall = self._get_recall(new_tp_div_count, gt_div_count)
            precision = self._get_precision(new_tp_div_count, pred_div_count)
            f1 = self._get_f1(recall, precision)
            mbc = self._get_mbc(gt_div_count, tp_division_count, new_fp_div_count)

            res_dict[f"Frame Buffer {fb}"] = {
                "Division Recall": recall,
                "Division Precision": precision,
                "Division F1": f1,
                "Mitotic Branching Correctness": mbc,
                "Total GT Divisions": gt_div_count,
                "Total Predicted Divisions": pred_div_count,
                "True Positive Divisions": new_tp_div_count,
                "False Positive Divisions": new_fp_div_count,
                "False Negative Divisions": new_fn_div_count,
                "Wrong Children Divisions": wc_division_count,
            }

        return res_dict
