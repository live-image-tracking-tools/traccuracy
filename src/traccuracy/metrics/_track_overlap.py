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

import warnings
from collections import defaultdict
from itertools import pairwise, product
from typing import TYPE_CHECKING, Any

import numpy as np

from traccuracy.matchers._base import Matched
from traccuracy.utils import get_equivalent_skip_edge

from ._base import Metric

if TYPE_CHECKING:
    import networkx as nx

    from traccuracy._tracking_graph import TrackingGraph
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
        valid_match_types = ["many-to-one", "one-to-one", "one-to-many"]
        super().__init__(valid_match_types)
        self.include_division_edges = include_division_edges

    def _compute(
        self, matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
    ) -> dict[str, float | np.floating[Any]]:
        if relax_skips_gt + relax_skips_pred == 1:
            warnings.warn(
                "Relaxing skips for either predicted or ground truth graphs"
                + " will still affect all overlap metrics.",
                stacklevel=2,
            )
        relaxed = relax_skips_gt or relax_skips_pred
        gt_graph = matched.gt_graph
        pred_graph = matched.pred_graph

        gt_tracklets = gt_graph.get_tracklets(include_division_edges=self.include_division_edges)
        pred_tracklets = pred_graph.get_tracklets(
            include_division_edges=self.include_division_edges
        )

        # if skips are not relaxed, we pass through an empty set of "relevant skips"
        # this means for all downstream compute, skip edges will only be matched
        # if the exact same skip edge exists in the other graph
        gt_skips = (
            _get_relevant_skip_edges(gt_graph, self.include_division_edges) if relaxed else set()
        )
        pred_skips = (
            _get_relevant_skip_edges(pred_graph, self.include_division_edges) if relaxed else set()
        )

        gt_skip_to_path_length, pred_path_to_gt_skip_map = _get_skip_path_maps(
            matched, gt_skips, matched.gt_pred_map
        )
        pred_skip_to_path_length, gt_path_to_pred_skip_map = _get_skip_path_maps(
            matched, pred_skips, matched.pred_gt_map
        )

        # calculate track purity and target effectiveness
        track_purity, _ = _calc_overlap_score(
            pred_tracklets,
            gt_tracklets,
            matched.pred_gt_map,
            pred_skip_to_path_length,  # ref skips
            gt_path_to_pred_skip_map,  # overlap_path_to_reference_skip_map
            pred_path_to_gt_skip_map,  # reference_path_to_overlap_skip_map
        )
        target_effectiveness, track_fractions = _calc_overlap_score(
            gt_tracklets,
            pred_tracklets,
            matched.gt_pred_map,
            gt_skip_to_path_length,  # ref skips
            pred_path_to_gt_skip_map,  # overlap_path_to_reference_skip_map
            gt_path_to_pred_skip_map,  # reference_path_to_overlap_skip_map
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
    reference_skips: dict[tuple[int, int], int],
    overlap_path_to_reference_skip_map: dict[Any, dict[str, Any]],
    reference_path_to_overlap_skip_map: dict[Any, dict[str, Any]],
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
        reference_skips (Dict[Tuple[int, int], int]): Mapping of skip edges in
            the reference tracklets to their lengths
        overlap_path_to_reference_skip_map (Dict[Any, Dict[str, Any]]): Mapping
            from nodes in overlap tracklet equivalent paths to the edge they are
            part of and the reference skip edge they cover
        reference_path_to_overlap_skip_map (Dict[Any, Dict[str, Any]]): Mapping
            from nodes in reference tracklet equivalent paths to the edge they are
            part of and the overlapping skip edge they cover

    Returns:
        tuple[float | np.floating[Any], float | np.floating[Any]]: A tuple containing the
            weighted and unweighted averages of the overlap fractions.
    """
    max_overlap = 0
    total_count = 0
    track_fractions = []
    # maps each edge to their tracklet index
    overlap_edge_to_tid = {
        edge: i for i in range(len(overlap_tracklets)) for edge in overlap_tracklets[i].edges()
    }

    for reference_tracklet in reference_tracklets:
        tracklet_length = len(reference_tracklet.edges())
        # maps overlap track ID to the number of edges of the current reference tracklet
        # that overlap
        overlapping_id_to_count: dict[int, int] = defaultdict(lambda: 0)
        for ref_src, ref_tgt in reference_tracklet.edges():
            if (ref_src, ref_tgt) in reference_skips:
                # if this is a skip edge, there is some equivalent path in the overlaps
                # let's find an edge on that path and update the count
                for node in overlap_path_to_reference_skip_map:
                    path_info = overlap_path_to_reference_skip_map[node]
                    found = False
                    for i, skip_edge in enumerate(path_info["skip_edge"]):
                        if skip_edge == (ref_src, ref_tgt):
                            edge_in_path = path_info["edge_in_path"][i]
                            overlapping_id_to_count[overlap_edge_to_tid[edge_in_path]] += 1
                            found = True
                            break
                    if found:
                        break
                continue
            # this edge is part of an equivalent path for an overlap skip edge
            # we need to find that skip edge and update its count by 1
            if (
                ref_src in reference_path_to_overlap_skip_map
                and ref_tgt in reference_path_to_overlap_skip_map
            ):
                # both nodes are in the path, but one of them might be part of multiple skip
                # edges. We therefore find the specific edge that both ref_src and ref_tgt are
                # part of
                skip_info = reference_path_to_overlap_skip_map[ref_src]
                edge_in_path = skip_info["edge_in_path"]
                for i, edge in enumerate(edge_in_path):
                    if edge[0] == ref_src and edge[1] == ref_tgt:
                        equivalent_skip_edge = skip_info["skip_edge"][i]
                        overlapping_id_to_count[overlap_edge_to_tid[equivalent_skip_edge]] += 1
                        break
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


def _get_relevant_skip_edges(
    graph: TrackingGraph, include_division_edges: bool
) -> set[tuple[Any, Any]]:
    """Get relevant skip edges from the graph, potentially including division edges.

    Args:
        graph (TrackingGraph): graph to extract skip edges from
        include_division_edges (bool): True if parent-daughter edges should be included,
            otherwise False.

    Returns:
        set[tuple[Any, Any]]: skip edges on graph with/without division edges.
    """
    skips = graph.get_skip_edges()
    if include_division_edges:
        return skips
    # if division edges are not included, we only consider skips that are not division edges
    for skip_src, skip_tgt in skips.copy():
        if graph.graph.out_degree(skip_src) > 1:  # type: ignore
            skips.remove((skip_src, skip_tgt))
    return skips


def _get_skip_path_maps(
    matched: Matched,
    skips: set[tuple[Any, Any]],
    skip_to_other_map: dict[Any, list[Any]],
) -> tuple[dict[tuple[Any, Any], int], dict[Any, dict[str, list[tuple[Any, Any]]]]]:
    """Get information about equivalent paths for skip edges.

    For each skip edge, find the equivalent path in the matched graph
    and return a mapping of skip edges to their equivalent path lengths.
    Also returns a mapping from nodes along equivalent paths to the
    edge they are part of and the skip edge they cover.

    Args:
        matched (traccuracy.matchers.Matched): The matched object
        containing the graphs.
        skips (set[tuple[Any, Any]]): Set of skip edges to process.
        skip_to_other_map (dict[Any, list[Any]]): Mapping of nodes in
        graph with skips to nodes in the other graph.

    Returns:
        tuple[dict[tuple[Any, Any], int], dict[Any, dict[str, Any]]]:
            A tuple containing:
            - A dictionary mapping skip edges to their equivalent path lengths.
            - A dictionary mapping nodes in equivalent paths to the edge they are part of
              and the skip edge they cover.
    """
    skip_to_equivalent_path_length = {}
    path_node_to_skip_map: dict[Any, dict[str, list[tuple[Any, Any]]]] = defaultdict(
        lambda: defaultdict(list)
    )
    for skip_src, skip_tgt in skips:
        matched_src = skip_to_other_map.get(skip_src, [])
        matched_tgt = skip_to_other_map.get(skip_tgt, [])
        for possible_src, possible_tgt in product(matched_src, matched_tgt):
            equivalent_path = get_equivalent_skip_edge(
                matched, skip_src, skip_tgt, possible_src, possible_tgt
            )
            if equivalent_path:
                for edge_src, edge_tgt in pairwise(equivalent_path):
                    path_node_to_skip_map[edge_src]["edge_in_path"].append((edge_src, edge_tgt))
                    path_node_to_skip_map[edge_src]["skip_edge"].append((skip_src, skip_tgt))
                    path_node_to_skip_map[edge_tgt]["edge_in_path"].append((edge_src, edge_tgt))
                    path_node_to_skip_map[edge_tgt]["skip_edge"].append((skip_src, skip_tgt))
                skip_to_equivalent_path_length[(skip_src, skip_tgt)] = len(equivalent_path) - 1
    return skip_to_equivalent_path_length, path_node_to_skip_map
