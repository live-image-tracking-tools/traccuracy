from __future__ import annotations

from typing import TYPE_CHECKING

import pylapy
from scipy.spatial import KDTree

from ._base import Matcher

if TYPE_CHECKING:
    from collections.abc import Hashable
    from typing import Any

    import numpy as np
    from scipy.sparse import coo_matrix

    from traccuracy._tracking_graph import TrackingGraph


class PointMatcher(Matcher):
    """A one-to-one matcher that uses Hungarian matching to minimize global
    distance of node pairs with a maximum distance threshold beyond which nodes
    will not be matched.
    Note: this matcher computes the Euclidean distance based on the location on the
    points. If the data is not isotropic, the scale parameter can be used to rescale
    the locations in each dimension to reflect "real-world" distances.

    Args:
        threshold (float): The maximum distance to allow node matchings (inclusive), in
            (potentially rescaled) pixels.
        scale_factor (tuple[float, ...] | list[float] | None, optional):  If provided,
            multiply the node locations by the scale factor in each dimension before
            computing the distance. Useful if the data is not isotropic to ensure that
            distances are computed in a space that reflects real world distances.
    """

    def __init__(
        self,
        threshold: float,
        scale_factor: tuple[float, ...] | list[float] | None = None,
    ):
        self.threshold = threshold
        self.scale_factor = scale_factor
        # this matching is always one-to-one
        self._matching_type = "one-to-one"

        # Lap solver using scipy
        self._solver = pylapy.LapSolver(implementation="scipy", sparse_implementation="csgraph")

    def _compute_mapping(
        self, gt_graph: TrackingGraph, pred_graph: TrackingGraph
    ) -> list[tuple[Any, Any]]:
        mapping: list[tuple[Any, Any]] = []
        if gt_graph.start_frame is None or gt_graph.end_frame is None:
            return mapping
        for frame in range(gt_graph.start_frame, gt_graph.end_frame):
            # Sorting node ids to ensure deterministic solution when there are ties
            # Ignoring typing because technically "Hashable" node ids are not
            # always sortable, but we don't anticipate non-sortable types
            gt_nodes = sorted(gt_graph.nodes_by_frame.get(frame, []))  # type: ignore
            pred_nodes = sorted(pred_graph.nodes_by_frame.get(frame, []))  # type: ignore
            gt_locations = [gt_graph.get_location(node) for node in gt_nodes]
            pred_locations = [pred_graph.get_location(node) for node in pred_nodes]
            if self.scale_factor is not None:
                assert len(self.scale_factor) == len(gt_locations[0]), (
                    f"scale factor {self.scale_factor} has different length than "
                    f"location {gt_locations[0]}"
                )
                gt_locations = [
                    [loc[d] * self.scale_factor[d] for d in range(len(loc))] for loc in gt_locations
                ]
                pred_locations = [
                    [loc[d] * self.scale_factor[d] for d in range(len(loc))]
                    for loc in pred_locations
                ]
            matches = self._match_frame(
                gt_nodes,
                gt_locations,
                pred_nodes,
                pred_locations,
            )
            mapping.extend(matches)
        return mapping

    def _match_frame(
        self,
        gt_nodes: list[Hashable],
        gt_locations: list[list[float] | tuple[float] | np.ndarray],
        pred_nodes: list[Hashable],
        pred_locations: list[list[float] | tuple[float] | np.ndarray],
    ) -> list[tuple[Any, Any]]:
        mapping: list[tuple[Any, Any]] = []
        if len(gt_nodes) == 0 or len(pred_nodes) == 0:
            return mapping
        gt_kdtree = KDTree(gt_locations)
        pred_kdtree = KDTree(pred_locations)

        # indices correspond to indices in the gt_nodes, pred_nodes lists
        sdm: coo_matrix = gt_kdtree.sparse_distance_matrix(
            pred_kdtree, max_distance=self.threshold, output_type="coo_matrix"
        )

        # Let's keep threshold * 4 for compatibility. But one could probably do
        # hard thresholding instead (using hard=True) which is indeed what we want to do
        links = self._solver.sparse_solve(sdm, self.threshold).T

        # Go back to matched node ids from matrix indices
        for row, col in links.T.tolist():
            gt_id = gt_nodes[row]
            pred_id = pred_nodes[col]
            mapping.append((gt_id, pred_id))
        return mapping
