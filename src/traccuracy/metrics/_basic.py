from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

from traccuracy._tracking_graph import EdgeFlag, NodeFlag
from traccuracy.matchers._base import Matched
from traccuracy.track_errors._basic import classify_basic_errors

from ._base import Metric

if TYPE_CHECKING:
    from traccuracy.matchers import Matched


class BasicMetrics(Metric):
    """Generates basic statistics describing node and edge errors

    These metrics are written assuming that the ground truth annotations
    are dense. If that is not the case, interpret the numbers carefully.
    Consider eliminating metrics that use the number of false positives.
    """

    def __init__(self) -> None:
        valid_matching_types = ["one-to-one"]
        super().__init__(valid_matching_types)

    def _compute(
        self, matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
    ) -> dict:
        # Run error analysis on nodes and edges
        classify_basic_errors(
            matched, relax_skips_gt=relax_skips_gt, relax_skips_pred=relax_skips_pred
        )

        node_stats = self._compute_stats("node", matched)
        edge_stats = self._compute_stats(
            "edge", matched, relaxed=(relax_skips_gt or relax_skips_pred)
        )

        return {**node_stats, **edge_stats}

    def _compute_stats(
        self, feature_type: str, matched: Matched, relaxed: bool = False
    ) -> dict[str, int | float]:
        # Get counts
        if feature_type == "node":
            tp = len(matched.gt_graph.get_nodes_with_flag(NodeFlag.TRUE_POS))
            fp = len(matched.pred_graph.get_nodes_with_flag(NodeFlag.FALSE_POS))
            fn = len(matched.gt_graph.get_nodes_with_flag(NodeFlag.FALSE_NEG))
        elif feature_type == "edge" and not relaxed:
            tp = len(matched.gt_graph.get_edges_with_flag(EdgeFlag.TRUE_POS))
            fp = len(matched.pred_graph.get_edges_with_flag(EdgeFlag.FALSE_POS))
            fn = len(matched.gt_graph.get_edges_with_flag(EdgeFlag.FALSE_NEG))
        elif feature_type == "edge" and relaxed:
            # count non skip flags
            tp = ...
            fp = ...
            fn = ...
            # count skip flags
            tp_skip = ...
            fp_skip = ...
            fn_skip = ...

        # Compute totals
        if not relaxed:
            gt_total = tp + fn
            pred_total = tp + fp
        else:
            gt_total = tp + tp_skip + fn + fn_skip
            pred_total = tp + tp_skip + fp + fp_skip

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
        if not relaxed:
            precision = self._get_precision(tp, pred_total)
            recall = self._get_recall(tp, gt_total)
            f1 = self._get_f1(precision, recall)
        else:
            precision = self._get_precision(tp + tp_skip, pred_total)
            recall = self._get_recall(tp + tp_skip, gt_total)
            f1 = self._get_f1(precision, recall)

        feature_type = feature_type.capitalize()

        stats = {
            f"Total GT {feature_type}s": gt_total,
            f"Total Pred {feature_type}s": pred_total,
            f"True Positive {feature_type}s": tp,
            f"False Positive {feature_type}s": fp,
            f"False Negative {feature_type}s": fn,
            f"{feature_type} Recall": recall,
            f"{feature_type} Precision": precision,
            f"{feature_type} F1": f1,
        }

        if relaxed:
            stats = {
                **stats,
                f"Skip True Positive {feature_type}s": tp_skip,
                f"Skip False Positive {feature_type}s": fp_skip,
                f"Skip False Negative {feature_type}s": fn_skip,
            }

        return stats

    def count_skip_errors(self, matched: Matched, error_type: str):
        if error_type == "tp":
            basic_flag = EdgeFlag.TRUE_POS
            skip_flag = EdgeFlag.SKIP_TRUE_POS
            graph = matched.gt_graph
        elif error_type == "fp":
            basic_flag = EdgeFlag.FALSE_POS
            skip_flag = EdgeFlag.SKIP_FALSE_POS
            graph = matched.pred_graph
        elif error_type == "fn":
            basic_flag = EdgeFlag.FALSE_NEG
            skip_flag = EdgeFlag.SKIP_FALSE_NEG
            graph = matched.gt_graph

        basic_edges = ...
