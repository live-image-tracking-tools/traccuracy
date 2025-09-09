from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

import numpy as np

from traccuracy import EdgeFlag, NodeFlag
from traccuracy.track_errors._basic import classify_basic_errors
from traccuracy.track_errors._ctc import evaluate_ctc_events
from traccuracy.track_errors._divisions import evaluate_division_events

from ._base import Metric

if TYPE_CHECKING:
    from collections.abc import Hashable

    from traccuracy import TrackingGraph
    from traccuracy.matchers import Matched


class CompleteTracks(Metric):
    """The fraction of tracklets and lineages that are completely correctly reconstructed.

    If the reconstruction continues beyond the ground truth track, this is NOT
    counted as incorrect.

    If a False Positive Division occurs within the ground truth track (or, for the CTC
    errors, a wrong semantic edge), this IS counted as incorrect.
    """

    def __init__(self, error_type: str = "basic"):
        """
        Args:
            error_type (str, optional): Whether to use "basic" or "ctc" errors for
                computing if tracks are correct or not. Defaults to "basic".
        """
        valid_matches = ["one-to-one", "many-to-one"]
        super().__init__(valid_matches)
        if error_type not in ["ctc", "basic"]:
            raise ValueError(f"Unrecognized error type {error_type}. Should be 'ctc' or 'basic'")
        self.error_type = error_type

    def _compute(
        self, matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
    ) -> dict:
        """The compute methods of Metric objects return a dictionary with counts and statistics.
        Currently expects either CTC error annotation or basic errors + division errors.

        Args:
            matched (traccuracy.matchers.Matched): Matched data object to compute metrics on
            relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
                graph have an equivalent multi-edge path in predicted graph
            relax_skips_pred (bool): If True, the metric will check if skips in the predicted
                graph have an equivalent multi-edge path in ground truth graph

        Raises:
            NotImplementedError

        Returns:
            dict: Dictionary of metric names and int/float values
        """
        if self.error_type == "basic":
            classify_basic_errors(
                matched, relax_skips_gt=relax_skips_gt, relax_skips_pred=relax_skips_pred
            )
            evaluate_division_events(
                matched, relax_skips_gt=relax_skips_gt, relax_skips_pred=relax_skips_pred
            )
        else:
            if relax_skips_gt or relax_skips_pred:
                warnings.warn(
                    "CTC metrics do not support relaxing skip edges. "
                    "Ignoring relax_skips_gt and relax_skips_pred.",
                    stacklevel=2,
                )
            evaluate_ctc_events(matched)
        total_tracklets = 0
        total_lineages = 0
        correct_tracklets = 0
        correct_lineages = 0
        gt_nxgraph = matched.gt_graph.graph
        lineage_starts = [node for node, in_degree in gt_nxgraph.in_degree() if in_degree == 0]  # type: ignore
        for lineage_start in lineage_starts:
            tracklet_starts = [lineage_start]
            curr_nodes = [lineage_start]
            while len(curr_nodes) > 0:
                next_succs = []
                for succ in curr_nodes:
                    daughters = list(gt_nxgraph.successors(succ))
                    next_succs.extend(daughters)
                    if len(daughters) == 2:
                        tracklet_starts.extend(daughters)
                curr_nodes = next_succs

            subtracklets_correct = [
                self._check_tracklet_correct(
                    tracklet_start,
                    matched,
                    relax_skips_gt=relax_skips_gt,
                    relax_skips_pred=relax_skips_pred,
                )
                for tracklet_start in tracklet_starts
            ]
            total_tracklets += len(tracklet_starts)
            correct_tracklets += sum(subtracklets_correct)
            total_lineages += 1
            if all(subtracklets_correct):
                correct_lineages += 1

        return {
            "total_lineages": total_lineages,
            "total_tracklets": total_tracklets,
            "correct_lineages": correct_lineages,
            "correct_tracklets": correct_tracklets,
            "complete_lineages": correct_lineages / total_lineages
            if total_lineages > 0
            else np.nan,
            "complete_tracklets": correct_tracklets / total_tracklets
            if total_tracklets > 0
            else np.nan,
        }

    def _check_tracklet_correct(
        self, start_node: Hashable, matched: Matched, relax_skips_gt: bool, relax_skips_pred: bool
    ) -> bool:
        if not self._check_gt_node_correct(start_node, matched, relax_skips_pred=relax_skips_pred):
            return False
        out_edges = list(matched.gt_graph.graph.out_edges(start_node))
        while len(out_edges) == 1:
            out_edge = out_edges[0]
            if not self._check_gt_edge_correct(
                out_edge, matched.gt_graph, relax_skips_gt, relax_skips_pred
            ):
                return False
            curr_node = out_edge[1]
            if not self._check_gt_node_correct(
                curr_node, matched, relax_skips_pred=relax_skips_pred
            ):
                return False
            out_edges = list(matched.gt_graph.graph.out_edges(curr_node))
        return True

    def _check_gt_node_correct(
        self, node: Hashable, matched: Matched, relax_skips_pred: bool
    ) -> bool:
        node_tp = NodeFlag.TRUE_POS if self.error_type == "basic" else NodeFlag.CTC_TRUE_POS
        gt_track = matched.gt_graph
        # check if this gt node is a true pos
        if node_tp in gt_track.nodes[node]:
            # check if it is not matched to a FP-DIV, if applicable
            if self.error_type == "basic":
                matched_nodes = matched.get_gt_pred_matches(node)
                for pred_node in matched_nodes:
                    if NodeFlag.FP_DIV in matched.pred_graph.nodes[pred_node]:
                        return False
            return True
        else:
            # if skip edges are relaxed, check if the node is between skip tps
            if relax_skips_pred:
                for prev_edge in gt_track.graph.in_edges(node):
                    if EdgeFlag.SKIP_TRUE_POS not in gt_track.edges[prev_edge]:
                        return False

                for next_edge in gt_track.graph.out_edges(node):
                    if EdgeFlag.SKIP_TRUE_POS not in gt_track.edges[next_edge]:
                        return False
            # it's not a TP or between skip edges, so it's just wrong
            else:
                return False
        return True

    def _check_gt_edge_correct(
        self,
        edge: tuple[Hashable, Hashable],
        gt_track: TrackingGraph,
        relax_skips_gt: bool,
        relax_skips_pred: bool,
    ) -> bool:
        edge_data = gt_track.edges[edge]
        # check if it is a TP
        if self.error_type == "ctc":
            # the ctc errors don't annotate edge TPs, so instead we check for absence of
            # all the error types
            tp = True
            errors = [EdgeFlag.CTC_FALSE_NEG, EdgeFlag.WRONG_SEMANTIC]
            for error in errors:
                if error in edge_data:
                    tp = False
                    break
            if tp:
                return True
        else:
            if EdgeFlag.TRUE_POS in edge_data:
                return True
        is_skip_edge = gt_track.is_skip_edge(edge)
        if is_skip_edge and relax_skips_gt and EdgeFlag.SKIP_TRUE_POS in edge_data:
            return True
        if (not is_skip_edge) and relax_skips_pred and EdgeFlag.SKIP_TRUE_POS in edge_data:
            return True
        if relax_skips_pred and EdgeFlag.SKIP_TRUE_POS in edge_data:
            return True
        return False
