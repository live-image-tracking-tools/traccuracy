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
    """The fraction of tracks that are completely correctly reconstructed.

    Either full lineages or tracklets can be considered as the "tracks" to reconstruct.
    Can be computed with either the CTC errors or the basic errors and division errors.

    If the reconstruction continues beyond the ground truth track, this is NOT
    counted as incorrect.

    If a False Positive Division occurs within the ground truth track (or, for the CTC
    errors, a wrong semantic edge), this IS counted as incorrect.
    """

    def __init__(self, lineage: bool = False, error_type: str = "basic"):
        """
        Args:
            lineage (bool, optional): _description_. Defaults to False.
            error_type (str, optional): _description_. Defaults to "basic".
        """
        valid_matches = ["one-to-one", "one-to-many", "many-to-one", "many-to-many"]
        super().__init__(valid_matches)
        self.lineage = lineage
        assert error_type in ["ctc", "basic"]
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

        gt_tracks = (
            matched.gt_graph.get_lineages()
            if self.lineage
            else matched.gt_graph.get_tracklets(include_division_edges=False)
        )
        total_tracks = 0
        tracks_correct = 0
        for track in gt_tracks:
            track_correct = True
            for node in track.nodes:
                node_correct = self._check_node_correct(node, matched, relax_skips_pred)
                print(node, node_correct)
                # stop as soon as one node is incorrect
                if not node_correct:
                    track_correct = False
                    break

            for edge in track.edges:
                edge_correct = self._check_gt_edge_correct(
                    edge, matched.gt_graph, relax_skips_gt, relax_skips_pred
                )
                print(edge, edge_correct)
                # stop as soon as one edge is incorrect
                if not edge_correct:
                    track_correct = False
                    break

            total_tracks += 1
            if track_correct:
                tracks_correct += 1

        return {
            "total_tracks": total_tracks,
            "correct_tracks": tracks_correct,
            "complete_tracks": tracks_correct / total_tracks if total_tracks > 0 else np.nan,
        }

    def _check_node_correct(self, node: Hashable, matched: Matched, relax_skips_pred: bool) -> bool:
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
