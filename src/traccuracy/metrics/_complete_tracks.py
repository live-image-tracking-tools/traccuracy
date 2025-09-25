from __future__ import annotations

import itertools
import warnings
from typing import TYPE_CHECKING

import numpy as np

from traccuracy._tracking_graph import EdgeFlag, NodeFlag
from traccuracy.track_errors._basic import classify_basic_errors
from traccuracy.track_errors._ctc import evaluate_ctc_events
from traccuracy.track_errors._divisions import evaluate_division_events

from ._base import Metric

if TYPE_CHECKING:
    from collections.abc import Hashable

    from traccuracy.matchers import Matched


class CompleteTracks(Metric):
    """The fraction of tracklets and lineages that are completely correctly reconstructed.

    If the reconstruction continues beyond the ground truth track, this is NOT
    counted as incorrect, nor are false positive tracks penalized, making this suitable
    for evaluating with sparse ground truth annotations.

    If a False Positive Division occurs within the ground truth track (or, for the CTC
    errors, a wrong semantic edge), this IS counted as incorrect.

    Args:
        error_type (str, optional): Whether to use "basic" or "ctc" errors for
            computing if tracks are correct or not. Defaults to "basic".

    The compute function returns a results dictionary with the following entries:

        - `total_lineages` - the number of connected components in the ground truth graph
        - `correct_lineages` - the number of fully correct connected components
        - `complete_lineages` - `correct_lineages` / `total_lineages`, or np.nan if
          `total_lineages` is 0
        - `total_tracklets` - the number of tracklets in the ground truth graph,
          defined as the connected components of the graph after division edges are removed.
          Division edges are not included in the tracklets, or counted at all in the tracklet
          metrics.
        - `correct_tracklets` - the number of fully correct tracklets
        - `complete_tracklets` - `correct_tracklets` / `total_tracklets`, or np.nan if
          `total_tracklets` is 0

    """

    def __init__(self, error_type: str = "basic"):
        valid_matches = ["one-to-one", "many-to-one"]
        super().__init__(valid_matches)
        if error_type not in ["ctc", "basic"]:
            raise ValueError(f"Unrecognized error type {error_type}. Should be 'ctc' or 'basic'")
        self.error_type = error_type

    def _compute(
        self, matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
    ) -> dict:
        """Computes the fraction of fully correct tracklets and lineages in the matched object.

        If skip edges are relaxed in one graph, then skip_tp edges in the other graph are
        counted as correct, along with nodes between the skip_tp edges in that graph.

        Args:
            matched (traccuracy.matchers.Matched): Matched data object to compute metrics on
            relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
                graph have an equivalent multi-edge path in predicted graph
            relax_skips_pred (bool): If True, the metric will check if skips in the predicted
                graph have an equivalent multi-edge path in ground truth graph

        Returns:
            dict: A results dictionary with the following entries:
                - `total_lineages` - the number of connected components in the ground truth graph
                - `correct_lineages` - the number of fully correct connected components
                - `complete_lineages` - `correct_lineages` / `total_lineages`, or np.nan if
                    `total_lineages` is 0
                - `total_tracklets` - the number of tracklets in the ground truth graph, defined
                    as the connected components of the graph after division edges are removed.
                    Division edges are not included in the tracklets, or counted at all
                    in the tracklet metrics.
                - `correct_tracklets` - the number of fully correct tracklets
                - `complete_tracklets` - `correct_tracklets` / `total_tracklets`, or np.nan if
                    `total_tracklets` is 0

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
        # Only directly considering gt graph
        # Entirely FP lineages are not penalized
        # Nor are lineages continuing beyond gt lineage
        gt_nxgraph = matched.gt_graph.graph
        lineage_starts = [node for node, in_degree in gt_nxgraph.in_degree() if in_degree == 0]  # type: ignore
        for lineage_start in lineage_starts:
            # Within each lineage, find all division edges and daughters that start tracklets
            tracklet_starts = [lineage_start]
            div_edges = []
            curr_nodes = [lineage_start]
            while len(curr_nodes) > 0:
                next_succs = []
                for succ in curr_nodes:
                    daughters = list(gt_nxgraph.successors(succ))
                    next_succs.extend(daughters)
                    if len(daughters) == 2:
                        tracklet_starts.extend(daughters)
                        div_edges.extend([(succ, daught) for daught in daughters])
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
            div_edges_correct = [
                self._check_gt_edge_correct(
                    div_edge,
                    matched,
                    relax_skips_gt=relax_skips_gt,
                    relax_skips_pred=relax_skips_pred,
                )
                for div_edge in div_edges
            ]
            lineage_correct = all(subtracklets_correct) and all(div_edges_correct)
            total_tracklets += len(tracklet_starts)
            correct_tracklets += sum(subtracklets_correct)
            total_lineages += 1
            correct_lineages += lineage_correct

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
            if not self._check_gt_edge_correct(out_edge, matched, relax_skips_gt, relax_skips_pred):
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
            # (enough to check that one prev edge is a skip TP)
            if relax_skips_pred:
                for prev_edge in gt_track.graph.in_edges(node):
                    if EdgeFlag.SKIP_TRUE_POS in gt_track.edges[prev_edge]:
                        return True
        # it's not a TP or between skip edges, so it's just wrong
        return False

    def _check_gt_edge_correct(
        self,
        edge: tuple[Hashable, Hashable],
        matched: Matched,
        relax_skips_gt: bool,
        relax_skips_pred: bool,
    ) -> bool:
        gt_track = matched.gt_graph
        pred_track = matched.pred_graph
        edge_data = gt_track.edges[edge]
        # check if it is a TP
        if self.error_type == "ctc":
            # the ctc errors don't annotate edge TPs, so instead we check for absence of
            # all the error types. Wrong semantic are only annotated on the pred graph,
            # so we need to find the matched edge and check it
            tp = True
            if EdgeFlag.CTC_FALSE_NEG in edge_data:
                tp = False
            else:
                matched_sources = matched.get_gt_pred_matches(edge[0])
                matched_targets = matched.get_gt_pred_matches(edge[1])
                matched_edges = [
                    (source, target)
                    for source, target in itertools.product(matched_sources, matched_targets)
                    if pred_track.graph.has_edge(source, target)
                ]
                for matched_edge in matched_edges:
                    if EdgeFlag.WRONG_SEMANTIC in pred_track.graph.edges[matched_edge]:
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
        return False
