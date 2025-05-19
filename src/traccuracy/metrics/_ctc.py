from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

import numpy as np

from traccuracy._tracking_graph import EdgeFlag, NodeFlag
from traccuracy.matchers._base import Matched
from traccuracy.track_errors._ctc import evaluate_ctc_events

from ._base import Metric

if TYPE_CHECKING:
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
