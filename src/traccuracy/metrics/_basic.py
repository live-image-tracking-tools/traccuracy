from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

from traccuracy._tracking_graph import EdgeFlag, NodeFlag
from traccuracy.matchers._matched import Matched
from traccuracy.track_errors._basic import classify_basic_errors

from ._base import Metric

if TYPE_CHECKING:
    from traccuracy.matchers._matched import Matched


class BasicMetrics(Metric):
    """Generates basic statistics describing node and edge errors

    If `relax_skips_gt` or `relax_skips_pred` is True,  we can match
    skip edges in the prediction to a series of edges in the gt, or vice versa.
    The total number of skip TPs/FNs/FPs will be reported and these
    counts will be incorporated in the calculation of precision/recall/F1.

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
            tp, tp_gt_skip, tp_pred_skip, fp, fp_skip, fn, fn_skip = self._count_errors_with_skips(
                matched
            )

        # Compute totals
        if feature_type == "node":
            gt_total = len(matched.gt_graph.nodes)
            pred_total = len(matched.pred_graph.nodes)
        elif feature_type == "edge":
            gt_total = len(matched.gt_graph.edges)
            pred_total = len(matched.pred_graph.edges)

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
            precision = self._get_precision(tp + tp_pred_skip, pred_total)
            recall = self._get_recall(tp + tp_gt_skip, gt_total)
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
                f"Skip GT True Positive {feature_type}s": tp_gt_skip,
                f"Skip Pred True Positive {feature_type}s": tp_pred_skip,
                f"Skip False Positive {feature_type}s": fp_skip,
                f"Skip False Negative {feature_type}s": fn_skip,
            }

        return stats

    def _count_errors_with_skips(
        self, matched: Matched
    ) -> tuple[int, int, int, int, int, int, int]:
        """Go through each edge in the graph to count error flags

        If there is a skip flag it takes precedence and only the skip flag is counted,
        not any other basic error that is on the same edge.
        """
        tp, tp_gt_skip, tp_pred_skip = 0, 0, 0
        fp, fp_skip = 0, 0
        fn, fn_skip = 0, 0

        # Count on gt graph first which will be source of tp counts
        for attrs in matched.gt_graph.graph.edges.values():
            if EdgeFlag.SKIP_TRUE_POS in attrs:
                tp_gt_skip += 1
            elif EdgeFlag.SKIP_FALSE_NEG in attrs:
                fn_skip += 1
            elif EdgeFlag.TRUE_POS in attrs:
                tp += 1
            elif EdgeFlag.FALSE_NEG in attrs:
                fn += 1

        for attrs in matched.pred_graph.graph.edges.values():
            if EdgeFlag.SKIP_TRUE_POS in attrs:
                tp_pred_skip += 1
            elif EdgeFlag.SKIP_FALSE_POS in attrs:
                fp_skip += 1
            elif EdgeFlag.FALSE_POS in attrs:
                fp += 1

        return tp, tp_gt_skip, tp_pred_skip, fp, fp_skip, fn, fn_skip
