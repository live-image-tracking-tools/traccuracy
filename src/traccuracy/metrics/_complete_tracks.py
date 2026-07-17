from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

import numpy as np

from traccuracy.track_errors._basic import classify_basic_errors
from traccuracy.track_errors._ctc import evaluate_ctc_events
from traccuracy.track_errors._divisions import evaluate_division_events

from ._base import Metric
from ._compute_complete_tracks_by_length import (
    _has_fp_division,
    _is_edge_correct,
    _is_node_correct,
)

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

    # Only ground-truth tracklets/lineages are scored; predictions beyond the ground
    # truth are never penalized, so this metric is valid on sparse ground truth.
    supports_sparse_gt = True

    def __init__(self, error_type: str = "basic"):
        valid_matches = ["one-to-one", "many-to-one"]
        super().__init__(valid_matches)
        if error_type not in ["ctc", "basic"]:
            raise ValueError(f"Unrecognized error type {error_type}. Should be 'ctc' or 'basic'")
        self.error_type = error_type
        self.is_ctc = error_type == "ctc"

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
                _is_edge_correct(
                    div_edge,
                    matched,
                    self.is_ctc,
                    relax_skips_gt,
                    relax_skips_pred,
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

    def _check_node_and_div(self, node: Hashable, matched: Matched, relax_skips_pred: bool) -> bool:
        """Check if a GT node is correct and has no false positive division."""
        return _is_node_correct(
            node, matched, self.is_ctc, relax_skips_pred
        ) and not _has_fp_division(node, matched, self.is_ctc)

    def _check_tracklet_correct(
        self, start_node: Hashable, matched: Matched, relax_skips_gt: bool, relax_skips_pred: bool
    ) -> bool:
        if not self._check_node_and_div(start_node, matched, relax_skips_pred):
            return False
        out_edges = list(matched.gt_graph.graph.out_edges(start_node))
        while len(out_edges) == 1:
            out_edge = out_edges[0]
            if not _is_edge_correct(
                out_edge, matched, self.is_ctc, relax_skips_gt, relax_skips_pred
            ):
                return False
            curr_node = out_edge[1]
            if not self._check_node_and_div(curr_node, matched, relax_skips_pred):
                return False
            out_edges = list(matched.gt_graph.graph.out_edges(curr_node))
        return True
