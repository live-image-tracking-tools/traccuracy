from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

from traccuracy._tracking_graph import EdgeFlag, NodeFlag
from traccuracy.matchers._base import Matched
from traccuracy.track_errors.basic import classify_basic_errors

from ._base import Metric

if TYPE_CHECKING:
    from traccuracy.matchers import Matched


class BasicMetrics(Metric):
    """Generates basic statistics describing node and edge errors"""

    def __init__(self) -> None:
        valid_matching_types = ["one-to-one"]
        super().__init__(valid_matching_types)

    def _compute(self, matched: Matched) -> dict:
        # Run error analysis on nodes and edges
        classify_basic_errors(matched)

        node_stats = self._compute_stats("node", matched)
        edge_stats = self._compute_stats("edge", matched)

        return {**node_stats, **edge_stats}

    def _compute_stats(self, feature_type: str, matched: Matched) -> dict[str, int | float]:
        # Get counts
        if feature_type == "node":
            tp = len(matched.gt_graph.get_nodes_with_flag(NodeFlag.TRUE_POS))
            fp = len(matched.pred_graph.get_nodes_with_flag(NodeFlag.FALSE_POS))
            fn = len(matched.gt_graph.get_nodes_with_flag(NodeFlag.FALSE_NEG))
        elif feature_type == "edge":
            tp = len(matched.gt_graph.get_edges_with_flag(EdgeFlag.TRUE_POS))
            fp = len(matched.pred_graph.get_edges_with_flag(EdgeFlag.FALSE_POS))
            fn = len(matched.gt_graph.get_edges_with_flag(EdgeFlag.FALSE_NEG))

        # Compute totals
        gt_total = tp + fn
        pred_total = tp + fp

        if gt_total == 0:
            warnings.warn(
                f"No ground truth {feature_type}s present. Metrics may return np.nan",
                stacklevel=2,
            )
        if pred_total == 0:
            warnings.warn(
                f"No predicted {feature_type}s present. Metrics may return np.nan",
                stacklevel=2,
            )

        # Compute stats
        precision = self._get_precision(tp, pred_total)
        recall = self._get_recall(tp, gt_total)
        f1 = self._get_f1(precision, recall)

        feature_type = feature_type.capitalize()

        return {
            f"Total GT {feature_type}s": gt_total,
            f"Total Pred {feature_type}s": pred_total,
            f"True Positive {feature_type}s": tp,
            f"False Positive {feature_type}s": fp,
            f"False Negative {feature_type}s": fn,
            f"{feature_type} Recall": recall,
            f"{feature_type} Precision": precision,
            f"{feature_type} F1": f1,
        }
