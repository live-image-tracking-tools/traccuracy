"""This submodule implements routines for Track Purity (TP) and Target Effectiveness (TE) scores.

Definitions (Bise et al., 2011; Chen, 2021; Fukai et al., 2022):

- TE for a single ground truth track T^g_j is calculated by finding the predicted track T^p_k
  that overlaps with T^g_j in the largest number of the frames and then dividing
  the overlap frame counts by the total frame counts for T^g_j.
  The TE for the total dataset is calculated as the mean of TEs for all ground truth tracks,
  weighted by the length of the tracks.

- TP is defined analogously, with T^g_j and T^p_j being swapped in the definition.
"""

from __future__ import annotations

from collections import defaultdict
from itertools import product
from typing import TYPE_CHECKING, Any

import numpy as np

from traccuracy.matchers._base import Matched

from ._base import Metric

if TYPE_CHECKING:
    import networkx as nx

    from traccuracy.matchers._matched import Matched


class TrackOverlapMetrics(Metric):
    """Calculate metrics for longest track overlaps.

    - Target Effectiveness: fraction of longest overlapping prediction
                            tracklets on each GT tracklet
    - Track Purity : fraction of longest overlapping GT
                     tracklets on each prediction tracklet

    Args:
        matched_data (traccuracy.matchers.Matched): Matched object for set of GT and Pred data
        include_division_edges (bool, optional): If True, include edges at division.

    """

    def __init__(self, include_division_edges: bool = True):
        valid_match_types = ["many-to-one", "one-to-one"]
        super().__init__(valid_match_types)
        self.include_division_edges = include_division_edges

    def _compute(
        self, matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
    ) -> dict[str, float | np.floating[Any]]:
        if relax_skips_gt or relax_skips_pred:
            raise NotImplementedError(
                "Cannot currently compute track overlap metrics with relaxed skips."
            )

        gt_tracklets = matched.gt_graph.get_tracklets(
            include_division_edges=self.include_division_edges
        )
        pred_tracklets = matched.pred_graph.get_tracklets(
            include_division_edges=self.include_division_edges
        )

        # calculate track purity and target effectiveness
        track_purity, _ = _calc_overlap_score(pred_tracklets, gt_tracklets, matched.pred_gt_map)
        target_effectiveness, track_fractions = _calc_overlap_score(
            gt_tracklets, pred_tracklets, matched.gt_pred_map
        )
        return {
            "track_purity": track_purity,
            "target_effectiveness": target_effectiveness,
            "track_fractions": track_fractions,
        }


def _calc_overlap_score(
    reference_tracklets: list[nx.DiGraph],
    overlap_tracklets: list[nx.DiGraph],
    overlap_reference_mapping: dict[Any, list[Any]],
) -> tuple[float | np.floating[Any], float | np.floating[Any]]:
    """Get weighted/unweighted fraction of reference_tracklets overlapped by overlap_tracklets.

    The weighted average is calculated as the total number of maximally
    overlapping edges divided by the total number of edges in the reference tracklets.
    The unweighted average is calculated as the mean of the fraction of maximally
    overlapping edges for each reference tracklet.

    Args:
        reference_tracklets (List[TrackingGraph]): The reference tracklets
        overlap_tracklets (List[TrackingGraph]): The tracklets that overlap
        overlap_reference_mapping (Dict[Any, List[Any]]): Mapping as a dict
            from the overlap tracklet nodes to the reference tracklet nodes

    Returns:
        tuple[float | np.floating[Any], float | np.floating[Any]]: A tuple containing the
            weighted and unweighted averages of the overlap fractions.
    """
    max_overlap = 0
    total_count = 0
    track_fractions = []
    overlap_edge_to_tid = {
        edge: i for i in range(len(overlap_tracklets)) for edge in overlap_tracklets[i].edges()
    }
    for reference_tracklet in reference_tracklets:
        tracklet_length = len(reference_tracklet.edges())
        overlapping_id_to_count: dict[int, int] = defaultdict(lambda: 0)
        for ref_src, ref_tgt in reference_tracklet.edges():
            overlap_src = overlap_reference_mapping.get(ref_src, [])
            overlap_tgt = overlap_reference_mapping.get(ref_tgt, [])
            # any edge that has both nodes in an overlap tracklet
            # could be overlapping
            for src, tgt in product(overlap_src, overlap_tgt):
                if (src, tgt) in overlap_edge_to_tid:
                    overlapping_id_to_count[overlap_edge_to_tid[(src, tgt)]] += 1
        total_count += tracklet_length
        tracklet_overlap = max(overlapping_id_to_count.values(), default=0)
        max_overlap += tracklet_overlap
        if tracklet_length:
            track_fractions.append(tracklet_overlap / tracklet_length)
    weighted_average = max_overlap / total_count if total_count > 0 else np.nan
    unweighted_average = np.mean(track_fractions) if track_fractions else np.nan
    return weighted_average, unweighted_average
