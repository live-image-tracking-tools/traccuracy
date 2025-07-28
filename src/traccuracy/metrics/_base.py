from __future__ import annotations

import warnings
from abc import ABC, abstractmethod
from typing import TYPE_CHECKING

import numpy as np

from traccuracy.metrics._results import Results

if TYPE_CHECKING:
    from typing import Any

    from traccuracy.matchers._matched import Matched


MATCHING_TYPES = ["one-to-one", "one-to-many", "many-to-one", "many-to-many"]


class Metric(ABC):
    """The base class for Metrics

    Data should be passed directly into the compute method
    Kwargs should be specified in the constructor
    """

    def __init__(self, valid_matches: list):
        # Check that we have gotten a list of valid match types
        if len(valid_matches) == 0:
            raise TypeError("New metrics must provide a list of valid matching types")

        for mtype in valid_matches:
            if mtype not in MATCHING_TYPES:
                raise ValueError(
                    f"Matching type {mtype} is not supported. Choose from {{MATCHING_TYPES}}."
                )

        self.valid_match_types = valid_matches

    def _validate_matcher(self, matched: Matched) -> bool:
        """Verifies that the matched meets the assumptions of the metric
        Returns True if matcher is valid and False if matcher is not valid"""
        if not hasattr(self, "valid_match_types"):
            raise AttributeError("Metric subclass does not define valid_match_types")
        return matched.matching_type in self.valid_match_types

    @abstractmethod
    def _compute(
        self, matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
    ) -> dict:
        """The compute methods of Metric objects return a dictionary with counts and statistics.

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
        raise NotImplementedError

    def compute(
        self,
        matched: Matched,
        override_matcher: bool = False,
        relax_skips_gt: bool = False,
        relax_skips_pred: bool = False,
    ) -> Results:
        """The compute methods of Metric objects return a Results object populated with results
        and associated metadata

        Args:
            matched (traccuracy.matchers.Matched): Matched data object to compute metrics on
            override_matcher (bool): If True, the metric will not validate the matcher type
            relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
                graph have an equivalent multi-edge path in predicted graph
            relax_skips_pred (bool): If True, the metric will check if skips in the predicted
                graph have an equivalent multi-edge path in ground truth graph

        Returns:
            traccuracy.metrics._results.Results: Object containing metric results
                and associated pipeline metadata
        """
        if override_matcher:
            warnings.warn(
                "Overriding matcher/metric validation may result in "
                "unpredictable/incorrect metric results",
                stacklevel=2,
            )
        else:
            valid_matcher = self._validate_matcher(matched)
            if not valid_matcher:
                raise TypeError(
                    "The matched data uses a matcher that does not meet the requirements "
                    "of the metric. Check the documentation for the metric for more information."
                )

        res_dict = self._compute(
            matched,
            relax_skips_gt=relax_skips_gt,
            relax_skips_pred=relax_skips_pred,
        )

        run_info = self.info
        run_info["relax_skips_gt"] = relax_skips_gt
        run_info["relax_skips_pred"] = relax_skips_pred

        results = Results(
            results=res_dict,
            matcher_info=matched.matcher_info,
            metric_info=run_info,
            gt_name=matched.gt_graph.name,
            pred_name=matched.pred_graph.name,
        )
        return results

    @property
    def info(self) -> dict[str, Any]:
        """Dictionary with Metric name and any parameters"""
        return {"name": self.__class__.__name__, **self.__dict__}

    def _get_precision(self, numerator: int, denominator: int) -> float:
        """Compute precision and return np.nan if denominator is 0

        Args:
            numerator (int): Typically TP
            denominator (int): Typically TP + FP

        Returns:
            float: Precision
        """
        if denominator == 0:
            return np.nan
        return numerator / denominator

    def _get_recall(self, numerator: int, denominator: int) -> float:
        """Compute recall and return np.nan if denominator is 0

        Args:
            numerator (int): Typically TP
            denominator (int): Typically TP + FN

        Returns:
            float: Recall
        """
        if denominator == 0:
            return np.nan
        return numerator / denominator

    def _get_f1(self, precision: float, recall: float) -> float:
        """Compute F1 and return np.nan if precision and recall both equal 0

        Args:
            precision (float): Precision score
            recall (float): Recall score

        Returns:
            float: F1
        """
        if precision + recall == 0:
            return np.nan
        return 2 * (recall * precision) / (recall + precision)
