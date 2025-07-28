from __future__ import annotations

import logging
from abc import ABC, abstractmethod
from typing import Any

from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._matched import Matched

logger = logging.getLogger(__name__)


class Matcher(ABC):
    """The Matcher base class provides a wrapper around the compute_mapping method

    Each Matcher subclass will implement its own kwargs as needed.
    In use, the Matcher object will be initialized with kwargs prior to running compute_mapping
    on a particular dataset
    """

    # Set explicitly only if the matching type is guaranteed by the matcher
    _matching_type: str | None = None

    def compute_mapping(self, gt_graph: TrackingGraph, pred_graph: TrackingGraph) -> Matched:
        """Run the matching on a given set of gt and pred TrackingGraph and returns a Matched object
        with a new copy of each TrackingGraph

        Args:
            gt_graph (traccuracy.TrackingGraph): Tracking graph object for the gt
            pred_graph (traccuracy.TrackingGraph): Tracking graph object for the pred

        Returns:
            matched (traccuracy.matchers.Matched): Matched data object

        Raises:
            ValueError: gt and pred must be a TrackingGraph object
        """
        if not isinstance(gt_graph, TrackingGraph) or not isinstance(pred_graph, TrackingGraph):
            raise ValueError(
                "Input data must be a TrackingData object with a graph and segmentations"
            )

        mapping = self._compute_mapping(gt_graph, pred_graph)
        matched = Matched(gt_graph, pred_graph, mapping, self.info)

        # Report matching performance
        total_gt = len(matched.gt_graph.nodes)
        matched_gt = len(matched.gt_pred_map.keys())
        total_pred = len(matched.pred_graph.nodes)
        matched_pred = len(matched.pred_gt_map.keys())
        logger.info(f"Matched {matched_gt} out of {total_gt} ground truth nodes.")
        logger.info(f"Matched {matched_pred} out of {total_pred} predicted nodes.")

        return matched

    @abstractmethod
    def _compute_mapping(
        self, gt_graph: TrackingGraph, pred_graph: TrackingGraph
    ) -> list[tuple[Any, Any]]:
        """Computes a mapping of nodes in gt to nodes in pred and returns a mapping

        Returns:
            mapping: list of tuples

        Raises:
            NotImplementedError
        """
        raise NotImplementedError

    @property
    def info(self) -> dict[str, Any]:
        """Dictionary of Matcher name and any parameters"""
        info = {"name": self.__class__.__name__, **self.__dict__}
        if self._matching_type:
            info["matching type"] = self._matching_type
        return info
