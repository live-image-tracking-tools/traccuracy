from importlib.metadata import version
from typing import Any


class Results:
    """The Results object collects information about the pipeline used
    to generate the metric results

    Args:
        results (dict): Dictionary with metric output
        matcher_info (dict): Dictionary with matcher name and parameters
        metric_info (dict): Dictionary with metric name and parameters
        gt_info (dict): Dictionary with ground truth graph info
            (name, border_margin, etc.)
        pred_info (dict): Dictionary with predicted graph info
            (name, border_margin, etc.)
    """

    def __init__(
        self,
        results: dict,
        matcher_info: dict | None,
        metric_info: dict,
        gt_info: dict | None = None,
        pred_info: dict | None = None,
    ):
        self.results = results
        self.matcher_info = matcher_info
        self.metric_info = metric_info
        self.gt_info = gt_info or {}
        self.pred_info = pred_info or {}

    @property
    def version(self) -> str:
        """Return current traccuracy version"""
        return version("traccuracy")

    def to_dict(self) -> dict[str, Any]:
        """Returns all attributes that are not None as a dictionary

        Returns:
            dict: Dictionary of Results attributes
        """
        output: dict[str, Any] = {
            "version": self.version,
            "results": self.results,
            "matcher": self.matcher_info,
            "metric": self.metric_info,
            "gt": self.gt_info,
            "pred": self.pred_info,
        }

        return output
