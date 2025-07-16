from importlib.metadata import version
from typing import Any


class Results:
    """The Results object collects information about the pipeline used
    to generate the metric results

    Args:
        results (dict): Dictionary with metric output
        matcher_info (dict): Dictionary with matcher name and parameters
        metric_info (dict): Dictionary with metric name and parameters
        gt_name (optional, str): Name of the ground truth data
        pred_name (optional, str): Name of the predicted data
    """

    def __init__(
        self,
        results: dict,
        matcher_info: dict | None,
        metric_info: dict,
        gt_name: str | None = None,
        pred_name: str | None = None,
    ):
        self.results = results
        self.matcher_info = matcher_info
        self.metric_info = metric_info
        self.gt_name = gt_name
        self.pred_name = pred_name

    @property
    def version(self) -> str:
        """Return current traccuracy version"""
        return version("traccuracy")

    def to_dict(self) -> dict[str, Any]:
        """Returns all attributes that are not None as a dictionary

        Returns:
            dict: Dictionary of Results attributes
        """
        output = {
            "version": self.version,
            "results": self.results,
            "matcher": self.matcher_info,
            "metric": self.metric_info,
        }
        if self.gt_name:
            output["gt"] = self.gt_name
        if self.pred_name:
            output["pred"] = self.pred_name

        return output
