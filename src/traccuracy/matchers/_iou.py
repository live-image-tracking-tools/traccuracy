from __future__ import annotations

from typing import TYPE_CHECKING

import numpy as np
import pylapy
from tqdm import tqdm

from traccuracy._tracking_graph import TrackingGraph

from ._base import Matcher
from ._compute_overlap import get_labels_with_overlap, graph_bbox_and_labels

if TYPE_CHECKING:
    from collections.abc import Hashable


def _match_nodes(
    gt: np.ndarray,
    res: np.ndarray,
    gt_boxes: np.ndarray | None = None,
    res_boxes: np.ndarray | None = None,
    gt_labels: np.ndarray | None = None,
    res_labels: np.ndarray | None = None,
    threshold: float = 0.5,
    one_to_one: bool = False,
) -> tuple[np.ndarray, np.ndarray]:
    """Identify overlapping objects according to IoU and a threshold for minimum overlap.

    Args:
        gt (np.ndarray): labeled frame
        res (np.ndarray): labeled frame
        gt_boxes (np.ndarray | None): bounding boxes for the gt frame
        res_boxes (np.ndarray | None): bounding boxes for the res frame
        gt_labels (np.ndarray | None): labels for the gt frame
        res_labels (np.ndarray | None): labels for the res frame
        threshold (optional, float): threshold value for IoU to count as same cell. Default 1.
            If segmentations are identical, 1 works well.
            For imperfect segmentations try 0.6-0.8 to get better matching
        one_to_one (optional, bool): If True, forces the mapping to be one-to-one by running
            linear assignment on the thresholded iou array. Default False.

    Returns:
        gtcells (np.ndarray): Array of overlapping ids in the gt frame.
        rescells (np.ndarray): Array of overlapping ids in the res frame.
    """
    if threshold == 0.0 and not one_to_one:
        raise ValueError("Threshold of 0 is not valid unless one_to_one is True")

    ious = get_labels_with_overlap(
        gt,
        res,
        gt_boxes=gt_boxes,
        res_boxes=res_boxes,
        gt_labels=gt_labels,
        res_labels=res_labels,
        overlap="iou",
    )

    if not ious:
        return np.array([], dtype=np.intp), np.array([], dtype=np.intp)
    iou_arr = np.array(ious)  # shape (N, 3)

    # filter to IOUs above threshold
    mask = iou_arr[:, 2] >= threshold
    filtered_ious = iou_arr[mask]
    if len(filtered_ious) == 0:
        return np.array([], dtype=np.intp), np.array([], dtype=np.intp)

    if one_to_one:
        pairs = _one_to_one_assignment(filtered_ious)
    else:
        pairs = (filtered_ious[:, 0].astype(np.intp), filtered_ious[:, 1].astype(np.intp))

    return pairs[0], pairs[1]


def _one_to_one_assignment(
    ious: np.ndarray,
    unmapped_cost: int = 4,
) -> tuple[np.ndarray, np.ndarray]:
    """Perform linear assignment on IoU overlaps to create a one-to-one mapping.

    Builds a compact cost matrix using only the labels that appear in the overlaps,
    avoiding allocation of a large dense matrix indexed by max label value.

    Args:
        ious: List of (gt_label, res_label, iou_value) tuples from get_labels_with_overlap,
            already filtered to remove matches below threshold
        unmapped_cost (float, optional): Cost of an unassigned cell.
            Lower values leads to more unassigned cells. Defaults to 4.

    Returns:
        tuple: Tuple of two arrays containing matched gt and res label indices.
    """
    gt_labels_set: set[int] = set(ious[:, 0])
    res_labels_set: set[int] = set(ious[:, 1])

    gt_label_list = sorted(gt_labels_set)
    res_label_list = sorted(res_labels_set)
    gt_idx = {label: i for i, label in enumerate(gt_label_list)}
    res_idx = {label: i for i, label in enumerate(res_label_list)}

    cost = np.ones((len(gt_label_list), len(res_label_list)))

    gt_indices = np.array([gt_idx[idx] for idx in ious[:, 0]])
    res_indices = np.array([res_idx[idx] for idx in ious[:, 1]])
    cost[gt_indices, res_indices] = 1 - ious[:, 2]

    cost[cost == 1] = np.inf

    solver = pylapy.LapSolver(implementation="scipy", sparse_implementation="csgraph")
    assignments = solver.sparse_solve(cost, eta=unmapped_cost + 1)

    rows = np.array([gt_label_list[r] for r, _ in assignments], dtype=np.intp)
    cols = np.array([res_label_list[c] for _, c in assignments], dtype=np.intp)

    return rows, cols


def _construct_time_to_seg_id_map(
    graph: TrackingGraph,
) -> dict[int, dict[Hashable, Hashable]]:
    """For each time frame in the graph, create a mapping from segmentation ids
    (the ids in the segmentation array, stored in graph.label_key) to the
    node ids (the ids of the TrackingGraph nodes).

    Args:
        graph(TrackingGraph): a tracking graph with a label_key on each node

    Returns:
      dict[int, dict[Hashable, Hashable]]: a dictionary from {time: {segmentation_id: node_id}}

    Raises:
        AssertionError: If two nodes in a time frame have the same segmentation_id
    """
    time_to_seg_id_map: dict[int, dict[Hashable, Hashable]] = {}

    if graph.label_key is None:
        raise ValueError("No label_key provided for input TrackingGraph")

    for node_id, data in graph.nodes(data=True):
        time = data[graph.frame_key]
        seg_id = data[graph.label_key]
        seg_id_to_node_id_map = time_to_seg_id_map.get(time, {})
        assert seg_id not in seg_id_to_node_id_map, (
            f"Segmentation ID {seg_id} occurred twice in frame {time}."
        )
        seg_id_to_node_id_map[seg_id] = node_id
        time_to_seg_id_map[time] = seg_id_to_node_id_map
    return time_to_seg_id_map


def match_iou(
    gt: TrackingGraph, pred: TrackingGraph, threshold: float = 0.6, one_to_one: bool = False
) -> list[tuple[Hashable, Hashable]]:
    """Identifies pairs of cells between gt and pred that have iou > threshold

    This can return more than one match for any node
    Assumes that within a frame, each object has a unique segmentation label
    and that the label is recorded on each node using label_key

    Args:
        gt (traccuracy.TrackingGraph): Tracking data object containing graph and segmentations
        pred (traccuracy.TrackingGraph): Tracking data object containing graph and segmentations
        threshold (float, optional): Minimum IoU for matching cells. Defaults to 0.6.
        one_to_one (optional, bool): If True, forces the mapping to be one-to-one by running
            linear assignment on the thresholded iou array. Default False.

    Returns:
        list[(gt_node, pred_node)]: list of tuples where each tuple contains a gt node and pred node

    Raises:
        ValueError: gt and pred must be a TrackingData object
        ValueError: GT and pred segmentations must be the same shape
    """
    if not isinstance(gt, TrackingGraph) or not isinstance(pred, TrackingGraph):
        raise ValueError("Input data must be a TrackingData object with a graph and segmentations")

    if gt.segmentation is None or pred.segmentation is None:
        raise ValueError("TrackingGraph must contain a segmentation array for IoU matching")

    if gt.segmentation.shape != pred.segmentation.shape:
        raise ValueError("Segmentation shapes must match between gt and pred")

    gt_seg = gt.segmentation
    pred_seg = pred.segmentation

    mapper: list[tuple[Hashable, Hashable]] = []

    if gt.start_frame is None or gt.end_frame is None:
        return mapper

    gt_time_to_seg_id_map = _construct_time_to_seg_id_map(gt)
    pred_time_to_seg_id_map = _construct_time_to_seg_id_map(pred)

    for i, t in enumerate(
        tqdm(
            range(gt.start_frame, gt.end_frame),
            desc="Matching frames",
        )
    ):
        gt_nodes = gt.nodes_by_frame[t]
        pred_nodes = pred.nodes_by_frame[t]

        gt_boxes, gt_labels = graph_bbox_and_labels(gt.graph, gt_nodes, gt.label_key)
        pred_boxes, pred_labels = graph_bbox_and_labels(pred.graph, pred_nodes, pred.label_key)

        matches = _match_nodes(
            gt_seg[i],
            pred_seg[i],
            gt_boxes=gt_boxes,
            res_boxes=pred_boxes,
            gt_labels=gt_labels,
            res_labels=pred_labels,
            threshold=threshold,
            one_to_one=one_to_one,
        )
        # Construct node id tuple for each match
        for gt_seg_id, pred_seg_id in zip(*matches, strict=True):
            # Skip if either seg label has no corresponding graph node
            # (e.g. node removed by border_margin filtering)
            gt_seg_map = gt_time_to_seg_id_map.get(t, {})
            pred_seg_map = pred_time_to_seg_id_map.get(t, {})
            if gt_seg_id not in gt_seg_map or pred_seg_id not in pred_seg_map:
                continue
            mapper.append((gt_seg_map[gt_seg_id], pred_seg_map[pred_seg_id]))
    return mapper


class IOUMatcher(Matcher):
    """Constructs a mapping between gt and pred nodes using the IoU of the segmentations

    Lower values for iou_threshold will be more permissive of imperfect matches

    Args:
        iou_threshold (float, optional): Minimum IoU value to assign a match. Defaults to 0.6.
        one_to_one (optional, bool): If True, forces the mapping to be one-to-one by running
            linear assignment on the thresholded iou array. Default False.
    """

    def __init__(self, iou_threshold: float = 0.6, one_to_one: bool = False):
        self.iou_threshold = iou_threshold
        self.one_to_one = one_to_one

        # If either condition is met, matching must be one to one
        if one_to_one or iou_threshold > 0.5:
            self._matching_type = "one-to-one"

    def _compute_mapping(
        self, gt_graph: TrackingGraph, pred_graph: TrackingGraph
    ) -> list[tuple[Hashable, Hashable]]:
        """Computes IOU mapping for a set of graphs

        Args:
            gt_graph (TrackingGraph): Tracking graph object for the gt with segmentation data
            pred_graph (TrackingGraph): Tracking graph object for the pred with segmentation data

        Raises:
            ValueError: Segmentation data must be provided for both gt and pred data

        Returns:
            Matched: Matched data object containing IOU mapping
        """
        # Check that segmentations exist in the data
        if gt_graph.segmentation is None or pred_graph.segmentation is None:
            raise ValueError("Segmentation data must be provided for both gt and pred data")

        mapping = match_iou(
            gt_graph,
            pred_graph,
            threshold=self.iou_threshold,
            one_to_one=self.one_to_one,
        )

        return mapping
