from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

import networkx as nx
import numpy as np
from scipy.sparse import coo_array
from skan.csr import PathGraph, summarize

from traccuracy.metrics._base import Metric

if TYPE_CHECKING:
    from traccuracy._tracking_graph import TrackingGraph
    from traccuracy.matchers._base import Matched


class CellCycleAccuracy(Metric):
    """The CCA metric captures the ability of a method to identify a distribution of cell
    cycle lengths that matches the distribution present in the ground truth. The evaluation
    is done on distributions and therefore does not require a matching of solution to the
    ground truth. It ranges from [0,1] with higher values indicating better performance.

    This metric is part of the biologically inspired metrics introduced by the CTC
    and defined in Ulman 2017.
    """

    def __init__(self) -> None:
        # CCA does not use matching and therefore any matching type is valid
        valid_matching_types = ["one-to-one", "many-to-one", "one-to-many", "many-to-many"]
        super().__init__(valid_matching_types)

    def _compute(
        self, data: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
    ) -> dict[str, float]:
        gt_lengths = _get_lengths(data.gt_graph)
        pred_lengths = _get_lengths(data.pred_graph)

        cca = _get_cca(gt_lengths, pred_lengths)
        return {"CCA": cca}


def _get_lengths(track_graph: TrackingGraph) -> np.ndarray:
    """Identifies the length of complete cell cycles in a tracking graph

    Args:
        track_graph (TrackingGraph): The graph to evaluate

    Returns:
        np.ndarray[int]: an array of complete cell cycle lengths
    """
    # Can't create a sparse graph from disconnected nodes
    if track_graph.graph.number_of_edges() == 0:
        return np.array([])

    coords_array = np.asarray(
        [  # type: ignore
            [node_info[track_graph.frame_key], *[node_info[k] for k in track_graph.location_keys]]  # type: ignore
            for _, node_info in track_graph.graph.nodes(data=True)
        ],
        dtype=np.float64,
    )

    sparse_graph = nx.to_scipy_sparse_array(track_graph.graph, dtype=np.float64, format="coo")  # type: ignore

    # build sparse array with frame spans of edges as weight
    # this ensures gap-closing edges have the right "length"
    i, j = sparse_graph.coords
    t = coords_array[:, 0]
    frame_span = np.abs(t[i] - t[j])
    weighted_sparse_graph = coo_array((frame_span, (i, j)), shape=sparse_graph.shape).tocsr()

    csr_graph = weighted_sparse_graph + weighted_sparse_graph.T
    skan_graph = PathGraph.from_graph(adj=csr_graph, node_coordinates=coords_array)
    summary = summarize(skan_graph, separator="_")
    # branch_type 2 is junction to junction i.e. division to division
    division_to_division = summary[summary.branch_type == 2]
    cycle_lengths = division_to_division.branch_distance.values.astype(np.uint32)
    return cycle_lengths


def _get_cca(gt_lengths: np.ndarray, pred_lengths: np.ndarray) -> float:
    """Compute CCA given two arrays of cell cycle lengths

    Args:
        gt_lengths (np.ndarray[int]): cell cycle lengths from the ground truth data
        pred_lengths (np.ndarray[int]): cell cycle lengths from the predicted data

    Returns:
        float: the cell cycle accuracy
    """
    # GT and pred must both contain complete cell cycles to compute this metric
    if np.sum(gt_lengths) == 0 or np.sum(pred_lengths) == 0:
        warnings.warn(
            "GT and pred data do not both contain complete cell cycles. Returning CCA = 0",
            stacklevel=2,
        )
        return np.nan

    n_bins = np.max([np.max(gt_lengths), np.max(pred_lengths)]) + 1

    # Compute cumulative sum
    gt_cumsum = _get_cumsum(gt_lengths, n_bins)
    pred_cumsum = _get_cumsum(pred_lengths, n_bins)

    cca = 1 - np.max(np.abs(gt_cumsum - pred_cumsum))
    return cca


def _get_cumsum(lengths: np.ndarray, n_bins: int) -> np.ndarray:
    """Given an array of cell cycle lengths, computes cumulative sum from a normalized
    histogram of the lengths

    Args:
        lengths (np.ndarray[int]): an array of cell cycle lengths
        n_bins (int): number of bins for counting histogram

    Returns:
        np.ndarray: an array the cumulative sum of the normalized histogram
    """
    # Compute track length histogram
    hist = np.bincount(lengths, minlength=n_bins)

    # Normalize
    hist = hist / hist.sum()

    # Compute cumsum
    cumsum = np.cumsum(hist)

    return cumsum
