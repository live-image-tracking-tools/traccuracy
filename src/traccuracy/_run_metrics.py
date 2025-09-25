from __future__ import annotations

from typing import TYPE_CHECKING

from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._base import Matcher
from traccuracy.metrics._base import Metric

if TYPE_CHECKING:
    from traccuracy.matchers._matched import Matched


def run_metrics(
    gt_data: TrackingGraph,
    pred_data: TrackingGraph,
    matcher: Matcher,
    metrics: list[Metric],
    relax_skips_gt: bool = False,
    relax_skips_pred: bool = False,
) -> tuple[list[dict], Matched]:
    """Compute given metrics on data using the given matcher.

    The returned result dictionary will contain all metrics computed by
    the given Metric classes, as well as general summary numbers
    e.g. false positive/false negative detection and edge counts.

    Args:
        gt_data (traccuracy.TrackingGraph): ground truth graph and optionally segmentation
        pred_data (traccuracy.TrackingGraph): predicted graph and optionally segmentation
        matcher (traccuracy.matchers._base.Matcher): instantiated matcher object
        metrics (List[traccuracy.metrics._base.Metric]): list of instantiated metrics objects
            to compute
        relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
            graph have an equivalent multi-edge path in predicted graph
        relax_skips_pred (bool): If True, the metric will check if skips in the predicted
            graph have an equivalent multi-edge path in ground truth graph

    Returns:
        List[Dict]: List of dictionaries with one dictionary per Metric object
        Matched: Matched data which includes annotated graphs
    """
    if not isinstance(gt_data, TrackingGraph) or not isinstance(pred_data, TrackingGraph):
        raise TypeError("gt_data and pred_data must be TrackingGraph objects")

    if not isinstance(matcher, Matcher):
        raise TypeError("matcher must be an instantiated Matcher object")

    if not all(isinstance(m, Metric) for m in metrics):
        raise TypeError("metrics must be a list of instantiated Metric objects")

    matched = matcher.compute_mapping(gt_data, pred_data)
    results = []
    for _metric in metrics:
        result = _metric.compute(
            matched, relax_skips_gt=relax_skips_gt, relax_skips_pred=relax_skips_pred
        )
        results.append(result.to_dict())
    return results, matched
