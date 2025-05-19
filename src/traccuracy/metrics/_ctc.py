from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

import numpy as np

from traccuracy._tracking_graph import EdgeFlag, NodeFlag, TrackingGraph
from traccuracy.matchers._base import Matched
from traccuracy.track_errors._ctc import evaluate_ctc_events

from ._base import Metric

if TYPE_CHECKING:
    from collections.abc import Hashable

    from traccuracy.matchers import Matched


class AOGMMetrics(Metric):
    def __init__(
        self,
        vertex_ns_weight: float = 1,
        vertex_fp_weight: float = 1,
        vertex_fn_weight: float = 1,
        edge_fp_weight: float = 1,
        edge_fn_weight: float = 1,
        edge_ws_weight: float = 1,
    ) -> None:
        valid_matching_types = ["one-to-one", "many-to-one"]
        super().__init__(valid_matching_types)

        self.v_weights = {
            "ns": vertex_ns_weight,
            "fp": vertex_fp_weight,
            "fn": vertex_fn_weight,
        }
        self.e_weights = {
            "fp": edge_fp_weight,
            "fn": edge_fn_weight,
            "ws": edge_ws_weight,
        }

    def _compute(self, data: Matched) -> dict[str, float]:
        evaluate_ctc_events(data)

        vertex_error_counts: dict[str, float] = {
            "ns": len(data.pred_graph.get_nodes_with_flag(NodeFlag.NON_SPLIT)),
            "fp": len(data.pred_graph.get_nodes_with_flag(NodeFlag.CTC_FALSE_POS)),
            "fn": len(data.gt_graph.get_nodes_with_flag(NodeFlag.CTC_FALSE_NEG)),
        }
        edge_error_counts: dict[str, float] = {
            "ws": len(data.pred_graph.get_edges_with_flag(EdgeFlag.WRONG_SEMANTIC)),
            "fp": len(data.pred_graph.get_edges_with_flag(EdgeFlag.CTC_FALSE_POS)),
            "fn": len(data.gt_graph.get_edges_with_flag(EdgeFlag.CTC_FALSE_NEG)),
        }
        error_sum = get_weighted_error_sum(
            vertex_error_counts,
            edge_error_counts,
            self.v_weights["ns"],
            self.v_weights["fp"],
            self.v_weights["fn"],
            self.e_weights["fp"],
            self.e_weights["fn"],
            self.e_weights["ws"],
        )
        return {
            "AOGM": error_sum,
            "fp_nodes": vertex_error_counts["fp"],
            "fn_nodes": vertex_error_counts["fn"],
            "ns_nodes": vertex_error_counts["ns"],
            "fp_edges": edge_error_counts["fp"],
            "fn_edges": edge_error_counts["fn"],
            "ws_edges": edge_error_counts["ws"],
        }


class CTCMetrics(AOGMMetrics):
    def __init__(self) -> None:
        vertex_weight_ns = 5
        vertex_weight_fn = 10
        vertex_weight_fp = 1

        edge_weight_fp = 1
        edge_weight_fn = 1.5
        edge_weight_ws = 1
        super().__init__(
            vertex_ns_weight=vertex_weight_ns,
            vertex_fp_weight=vertex_weight_fp,
            vertex_fn_weight=vertex_weight_fn,
            edge_fp_weight=edge_weight_fp,
            edge_fn_weight=edge_weight_fn,
            edge_ws_weight=edge_weight_ws,
        )

    def _compute(self, data: Matched) -> dict[str, float]:
        errors = super()._compute(data)
        gt_graph = data.gt_graph.graph
        n_nodes = gt_graph.number_of_nodes()
        n_edges = gt_graph.number_of_edges()

        tra = self._get_tra(errors, n_nodes, n_edges)
        errors["TRA"] = tra

        det = self._get_det(errors, n_nodes)
        errors["DET"] = det

        lnk = self._get_lnk(errors, n_edges)
        errors["LNK"] = lnk

        return errors

    def _get_tra(self, errors: dict[str, float], n_nodes: int, n_edges: int) -> float:
        """Get the TRA score from the error counts and total number of gt nodes and edges

        Args:
            errors (dict[str, int]): A dictionary containing the AOGM
            n_nodes (int): The number of nodes in the ground truth graph
            n_edges (int): The number of edges in the ground truth graph

        Returns:
            float: the TRA score, computed with the CTC metric weights, or np.nan if
                the AOGM_0 is 0
        """
        aogm_0 = n_nodes * self.v_weights["fn"] + n_edges * self.e_weights["fn"]
        if aogm_0 == 0:
            warnings.warn(
                UserWarning(
                    f"AOGM0 is 0 - cannot compute TRA from GT graph with {n_nodes} nodes and"
                    + f" {n_edges} edges with {self.v_weights['fn']} vertex FN weight and"
                    + f" {self.e_weights['fn']} edge FN weight"
                ),
                stacklevel=1,
            )
            return np.nan
        aogm = errors["AOGM"]
        tra = 1 - min(aogm, aogm_0) / aogm_0
        return tra

    def _get_det(self, errors: dict[str, float], n_nodes: int) -> float:
        """Get the DET score from the error counts and total number of gt nodes

        Args:
            errors (dict[str, int]): A dictionary containing the counts
                of each type of node error (fp_nodes, fn_nodes, ns_nodes)
            n_nodes (int): The number of nodes in the ground truth graph

        Returns:
            float: the DET score, computed with the CTC metric weights, or np.nan
                if there are no nodes in the gt graph
        """
        if n_nodes == 0:
            warnings.warn(
                UserWarning("No nodes in the GT graph, cannot compute DET."),
                stacklevel=1,
            )
            return np.nan

        aogmd_0 = n_nodes * self.v_weights["fn"]
        aogmd = get_weighted_vertex_error_sum(
            {
                "ns": errors["ns_nodes"],
                "fp": errors["fp_nodes"],
                "fn": errors["fn_nodes"],
            },
            self.v_weights["ns"],
            self.v_weights["fp"],
            self.v_weights["fn"],
        )
        det = 1 - min(aogmd, aogmd_0) / aogmd_0
        return det

    def _get_lnk(self, errors: dict[str, float], n_edges: int) -> float:
        """Get the DET score from the error counts and total number of gt edges

        Args:
            errors (dict[str, int]): A dictionary containing the counts
                of each type of edge error (fp_edges, fn_edges, ws_edges)
            n_edges (int): The number of edges in the ground truth graph

        Returns:
            float: the TRA score, computed with the CTC metric weights, or np.nan if
                there are no edges in the GT graph
        """
        if n_edges == 0:
            warnings.warn(
                UserWarning("No edges in the GT graph, cannot compute LNK."),
                stacklevel=1,
            )
            return np.nan

        aogma_0 = n_edges * self.e_weights["fn"]
        aogma = get_weighted_edge_error_sum(
            {
                "fp": errors["fp_edges"],
                "fn": errors["fn_edges"],
                "ws": errors["ws_edges"],
            },
            self.e_weights["fp"],
            self.e_weights["fn"],
            self.e_weights["ws"],
        )
        lnk = 1 - min(aogma, aogma_0) / aogma_0
        return lnk


def get_weighted_vertex_error_sum(
    vertex_error_counts: dict[str, float],
    vertex_ns_weight: float = 1,
    vertex_fp_weight: float = 1,
    vertex_fn_weight: float = 1,
) -> float:
    vertex_ns_count = vertex_error_counts["ns"]
    vertex_fp_count = vertex_error_counts["fp"]
    vertex_fn_count = vertex_error_counts["fn"]
    vertex_error_sum = (
        vertex_ns_weight * vertex_ns_count
        + vertex_fp_weight * vertex_fp_count
        + vertex_fn_weight * vertex_fn_count
    )
    return vertex_error_sum


def get_weighted_edge_error_sum(
    edge_error_counts: dict[str, float],
    edge_fp_weight: float = 1,
    edge_fn_weight: float = 1,
    edge_ws_weight: float = 1,
) -> float:
    edge_fp_count = edge_error_counts["fp"]
    edge_fn_count = edge_error_counts["fn"]
    edge_ws_count = edge_error_counts["ws"]
    edge_error_sum = (
        edge_fp_weight * edge_fp_count
        + edge_fn_weight * edge_fn_count
        + edge_ws_weight * edge_ws_count
    )
    return edge_error_sum


def get_weighted_error_sum(
    vertex_error_counts: dict[str, float],
    edge_error_counts: dict[str, float],
    vertex_ns_weight: float = 1,
    vertex_fp_weight: float = 1,
    vertex_fn_weight: float = 1,
    edge_fp_weight: float = 1,
    edge_fn_weight: float = 1,
    edge_ws_weight: float = 1,
) -> float:
    vertex_error_sum = get_weighted_vertex_error_sum(
        vertex_error_counts, vertex_ns_weight, vertex_fp_weight, vertex_fn_weight
    )
    edge_error_sum = get_weighted_edge_error_sum(
        edge_error_counts, edge_fp_weight, edge_fn_weight, edge_ws_weight
    )
    return vertex_error_sum + edge_error_sum


class CellCycleAccuracy(Metric):
    """The CCA metric captures the ability of a method to identify a distribution of cell
    cycle lengths that matches the distribution present in the ground truth. The evaluation
    is done on distributions and therefore does not require a matching of solution to the
    ground truth. It ranges from [0,1] with higher values indicating better performance.

    This metric is part of the biologically inspired metrics introduced by the CTC
    and defined in Ulman 2017.
    """

    def __init__(self) -> None:
        valid_matching_types = ["one-to-one", "many-to-one", "one-to-many", "many-to-many"]
        super().__init__(valid_matching_types)

    def _get_lengths(self, track_graph: TrackingGraph) -> list[int]:
        """Identifies the length of complete cell cycles in a tracking graph

        Args:
            track_graph (TrackingGraph): The graph to evaluate

        Returns:
            list[int]: a list of complete cell cycle lengths
        """
        lengths = []
        # Loop over subgraphs
        for g in track_graph.get_connected_components():
            divs = g.get_divisions()
            # Need at least two divisions to calculate cell cycle length
            if len(list(divs)) >= 2:
                lengths.extend(self._get_subgraph_lengths(g, divs))

        return lengths

    def _get_subgraph_lengths(self, subgraph: TrackingGraph, divs: list[Hashable]) -> list[int]:
        """For a given subgraph, computes the lengths of complete cell cycles by walking the
        graph from one division to the next

        Args:
            subgraph (TrackingGraph): a TrackingGraph containing a single subgraph of
                connected components
            divs (list[Hashable]): a list of dividing nodes in the subgraph

        Returns:
            list[int]: a list of the lengths of complete cell cycles in the subgraph
        """
        lengths = []

        # Collect list of direct daughters
        daughters = []
        for div in divs:
            daughters.extend(list(subgraph.graph.successors(div)))

        for node in daughters:
            # Start length at 1 because we're already looking at the daughter
            length = 1
            succs = list(subgraph.graph.successors(node))
            while len(succs) == 1:
                length += 1
                succs = list(subgraph.graph.successors(succs[0]))

            # Must end in another division to be valid cycle
            if len(succs) == 2:
                lengths.append(length)

        return lengths

    def _get_cumsum(self, lengths: list[int], bins: np.ndarray) -> np.ndarray:
        """Given a list of cell cycle lengths, computes cumulative sum from a normalized
        histogram of the lengths

        Args:
            lengths (list[int]): a list of cell cycle lengths
            bins (np.ndarray): bins for the histogram usually determined
                by the max cell cycle length

        Returns:
            np.ndarray: an array the cumulative sum of the normalized histogram
        """
        # Compute track length histogram
        hist, _ = np.histogram(lengths, bins=bins)

        # Normalize
        hist = hist / hist.sum()

        # Compute cumsum
        cumsum = np.cumsum(hist)

        return cumsum

    def _compute(self, data: Matched) -> dict[str, float]:
        gt_lengths = self._get_lengths(data.gt_graph)
        pred_lengths = self._get_lengths(data.pred_graph)

        cca = self._get_cca(gt_lengths, pred_lengths)
        return {"CCA": cca}

    def _get_cca(self, gt_lengths: list[int], pred_lengths: list[int]) -> float:
        """Compute CCA given two lists of cell cycle lengths

        Args:
            gt_lengths (list[int]): cell cycle lengths from the ground truth data
            pred_lengths (list[int]): cell cycle lengths from the predicted data

        Returns:
            float: the cell cycle accuracy
        """
        # GT and pred must both contain complete cell cycles to compute this metric
        if np.sum(gt_lengths) == 0 or np.sum(pred_lengths) == 0:
            warnings.warn(
                "GT and pred data do not both contain complete cell cycles. Returning CCA = 0",
                stacklevel=2,
            )
            return 0

        max_track_length = np.max([np.max(gt_lengths), np.max(pred_lengths)])
        bins = np.arange(0, max_track_length + 1)

        # Compute cumulative sum
        gt_cumsum = self._get_cumsum(gt_lengths, bins)
        pred_cumsum = self._get_cumsum(pred_lengths, bins)

        cca = 1 - np.max(np.abs(gt_cumsum - pred_cumsum))
        return cca
