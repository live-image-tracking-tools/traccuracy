import warnings
from collections import defaultdict
from collections.abc import Hashable
from typing import Any

from traccuracy._tracking_graph import TrackingGraph


class Matched:
    """Data class storing gt graph, pred graph, computed mapping, and matcher info.

    The computed mapping type (e.g. one-to-one) is computed in the matched object.

    :ivar gt_pred_map: A dictionary from gt node to list of matched pred nodes
    :ivar pred_gt_map: A dictionary from pred node to list of matched gt nodes

    Args:
        gt_graph (traccuracy.TrackingGraph): Tracking graph object for the gt
        pred_graph (traccuracy.TrackingGraph): Tracking graph object for the pred
        mapping (list[tuple[Any, Any]]): List of tuples where each tuple maps
            a gt node to a pred node
        matcher_info (dict): Dictionary containing name and parameters from
            the matcher that generated the mapping
    """

    def __init__(
        self,
        gt_graph: TrackingGraph,
        pred_graph: TrackingGraph,
        mapping: list[tuple[Any, Any]],
        matcher_info: dict,
    ):
        self.gt_graph = gt_graph
        self.pred_graph = pred_graph
        self.mapping = mapping
        self.matcher_info = matcher_info

        gt_pred_map = defaultdict(list)
        pred_gt_map = defaultdict(list)
        for gt_id, pred_id in mapping:
            pred_gt_map[pred_id].append(gt_id)
            gt_pred_map[gt_id].append(pred_id)

        # Set back to normal dict to remove default dict behavior
        self.gt_pred_map = dict(gt_pred_map)
        self.pred_gt_map = dict(pred_gt_map)

        self._matching_type = self.matcher_info.get("matching type")

    @property
    def matching_type(self) -> str:
        """Determines the matching type from gt to pred:
        one-to-one, one-to-many, many-to-one, many-to-many"""
        if self._matching_type is not None:
            return self._matching_type

        if len(self.mapping) == 0:
            warnings.warn("Mapping is empty. Defaulting to type of one-to-one", stacklevel=2)

        pred_type = "one"
        for matches in self.gt_pred_map.values():
            if len(matches) > 1:
                pred_type = "many"
                break

        gt_type = "one"
        for matches in self.pred_gt_map.values():
            if len(matches) > 1:
                gt_type = "many"
                break

        self._matching_type = f"{gt_type}-to-{pred_type}"
        self.matcher_info["matching type"] = self._matching_type
        return self._matching_type

    def _get_match(self, node: Hashable, map: dict[Hashable, list]) -> Hashable | None:
        if node in map:
            match = map[node]
            if len(match) > 1:
                raise TypeError(
                    "Single match requested but multiple available."
                    "Use `Matched.get_gt_pred_matches`"
                    "or `Matched.get_pred_gt_matches`"
                )
            return match[0]
        return None

    def get_gt_pred_match(self, gt_node: Hashable) -> Hashable | None:
        """Looks for a single pred node matched to a gt node

        Assumes the matching is one-to-one

        Args:
            gt_node (Hashable): ground truth node

        Returns:
            Hashable | None: Predicted node id if there is a match or none
                if there is no match
        """
        return self._get_match(gt_node, self.gt_pred_map)

    def get_pred_gt_match(self, pred_node: Hashable) -> Hashable | None:
        """Looks for a single gt node that matches a pred node

        Args:
            pred_node (Hashable): predicted node id

        Returns:
            Hashable | None: Ground truth node id if there is a match or none
                if there is no match
        """
        return self._get_match(pred_node, self.pred_gt_map)

    def _get_matches(self, node: Hashable, map: dict[Hashable, list]) -> list:
        return map.get(node, [])

    def get_gt_pred_matches(self, gt_node: Hashable) -> list[Hashable]:
        """Look for predicted node matches to a gt node

        Args:
            gt_node (Hashable): Ground truth node id

        Returns:
            list(Hashable): List of matching predicted nodes
        """
        return self._get_matches(gt_node, self.gt_pred_map)

    def get_pred_gt_matches(self, pred_node: Hashable) -> list[Hashable]:
        """Look for gt node matches to a predicted node

        Args:
            pred_node (Hashable): Predicted node ID

        Returns:
            list(hashable): List of matching ground truth nodes
        """
        return self._get_matches(pred_node, self.pred_gt_map)
