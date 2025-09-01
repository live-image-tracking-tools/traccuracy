"""Fast R-CNN via numba

adapted from Fast R-CNN
Written by Sergey Karayev
Licensed under The MIT License [see LICENSE for details]
Copyright (c) 2015 Microsoft
"""

import warnings
from collections.abc import Hashable, Iterable

import networkx as nx
import numpy as np
from skimage.measure import regionprops


def _union_slice(a: tuple[slice], b: tuple[slice]) -> tuple[slice, ...]:
    """returns the union of slice tuples a and b"""
    starts = tuple(min(_a.start, _b.start) for _a, _b in zip(a, b, strict=True))
    stops = tuple(max(_a.stop, _b.stop) for _a, _b in zip(a, b, strict=True))
    return tuple(slice(start, stop) for start, stop in zip(starts, stops, strict=True))


def _bbox_to_slice(bbox: tuple[int, int, int, int]) -> tuple[slice, ...]:
    """returns the slice tuple for a given bounding box"""
    ndim = len(bbox) // 2
    return tuple(slice(bbox[i], bbox[i + ndim]) for i in range(ndim))


def graph_bbox_and_labels(
    graph: nx.DiGraph,
    nodes: Iterable[Hashable],
) -> tuple[np.ndarray | None, np.ndarray | None]:
    """
    Get bounding boxes and labels for a list of nodes in a graph.
    If a node is missing the 'bbox' or 'segmentation_id' attributes,
    it returns None for both bounding boxes and labels.

    Args:
        graph (nx.DiGraph): The graph to get the bounding boxes and labels from.
        nodes (list[Hashable]): The nodes to get the bounding boxes and labels for.

    Returns:
        tuple[np.ndarray | None, np.ndarray | None]: The bounding boxes and labels for the nodes.
    """
    try:
        gt_boxes = np.asarray([graph.nodes[node]["bbox"] for node in nodes])
        gt_labels = np.asarray([graph.nodes[node]["segmentation_id"] for node in nodes])
    except KeyError:
        gt_boxes, gt_labels = None, None
    return gt_boxes, gt_labels


def get_labels_with_overlap(
    gt_frame: np.ndarray,
    res_frame: np.ndarray,
    gt_boxes: np.ndarray | None = None,
    res_boxes: np.ndarray | None = None,
    gt_labels: np.ndarray | None = None,
    res_labels: np.ndarray | None = None,
    overlap: str = "iou",
) -> list[tuple[int, int, float]]:
    """Get all labels IDs in gt_frame and res_frame whose bounding boxes overlap,
    and a metric of pixel overlap (either ``iou`` or ``iogt``).

    Args:
        gt_frame (np.ndarray): ground truth segmentation for a single frame
        res_frame (np.ndarray): result segmentation for a given frame
        gt_boxes (np.ndarray): ground truth bounding boxes for a single frame
        res_boxes (np.ndarray): result bounding boxes for a given frame
        gt_labels (np.ndarray): ground truth labels for a single frame
        res_labels (np.ndarray): result labels for a given frame
        overlap (str, optional): Choose between intersection-over-ground-truth (``iogt``)
            or intersection-over-union (``iou``). Defaults to ``iou``.

    Returns: list[tuple[int, int, float]] A list of tuples of overlapping labels and their
        overlap values. Each tuple contains (gt_label, res_label, overlap_value).
    """

    if gt_boxes is None or gt_labels is None:
        warnings.warn(
            "'gt_boxes' and/or 'gt_labels' are not provided, using 'regionprops' to get them",
            stacklevel=2,
        )
        gt_boxes_list = []
        gt_labels_list = []
        for prop in regionprops(gt_frame):
            gt_boxes_list.append(prop.bbox)
            gt_labels_list.append(prop.label)
        gt_boxes = np.asarray(gt_boxes_list)
        gt_labels = np.asarray(gt_labels_list)

    if res_boxes is None or res_labels is None:
        warnings.warn(
            "'res_boxes' and/or 'res_labels' are not provided, using 'regionprops' to get them",
            stacklevel=2,
        )
        res_boxes_list = []
        res_labels_list = []
        for prop in regionprops(res_frame):
            res_boxes_list.append(prop.bbox)
            res_labels_list.append(prop.label)
        res_boxes = np.asarray(res_boxes_list)
        res_labels = np.asarray(res_labels_list)

    if len(gt_labels) == 0 or len(res_labels) == 0:
        return []

    gt_slices = [_bbox_to_slice(bbox) for bbox in gt_boxes]
    res_slices = [_bbox_to_slice(bbox) for bbox in res_boxes]

    if gt_frame.ndim == 3:
        overlaps = compute_overlap_3D(gt_boxes.astype(np.float64), res_boxes.astype(np.float64))
    else:
        overlaps = compute_overlap(
            gt_boxes.astype(np.float64), res_boxes.astype(np.float64)
        )  # has the form [gt_bbox, res_bbox]

    # Find the bboxes that have overlap at all (ind_ corresponds to box number - starting at 0)
    ind_gt, ind_res = np.nonzero(overlaps)

    output = []
    for i, j in zip(ind_gt, ind_res, strict=True):
        sslice = _union_slice(gt_slices[i], res_slices[j])
        gt_mask = gt_frame[sslice] == gt_labels[i]
        res_mask = res_frame[sslice] == res_labels[j]
        area_inter = np.count_nonzero(np.logical_and(gt_mask, res_mask))

        if overlap == "iou":
            denom = np.count_nonzero(np.logical_or(gt_mask, res_mask))
        elif overlap == "iogt":
            denom = np.count_nonzero(gt_mask)
        else:
            raise ValueError(f"Unknown overlap type: {overlap}")

        output.append(
            (
                int(gt_labels[i]),
                int(res_labels[j]),
                float(area_inter / denom if denom > 0 else 0),
            )
        )
    return output


def compute_overlap(boxes: np.ndarray, query_boxes: np.ndarray) -> np.ndarray:
    """
    Args
        boxes: (N, 4) ndarray of float
        query_boxes: (K, 4) ndarray of float

    Returns
        overlaps: (N, K) ndarray of overlap between boxes and query_boxes
    """
    N = boxes.shape[0]
    K = query_boxes.shape[0]
    overlaps = np.zeros((N, K), dtype=np.float64)
    for k in range(K):
        box_area = (query_boxes[k, 2] - query_boxes[k, 0] + 1) * (
            query_boxes[k, 3] - query_boxes[k, 1] + 1
        )
        for n in range(N):
            iw = min(boxes[n, 2], query_boxes[k, 2]) - max(boxes[n, 0], query_boxes[k, 0]) + 1
            if iw > 0:
                ih = min(boxes[n, 3], query_boxes[k, 3]) - max(boxes[n, 1], query_boxes[k, 1]) + 1
                if ih > 0:
                    ua = np.float64(
                        (boxes[n, 2] - boxes[n, 0] + 1) * (boxes[n, 3] - boxes[n, 1] + 1)
                        + box_area
                        - iw * ih
                    )
                    overlaps[n, k] = iw * ih / ua
    return overlaps


def compute_overlap_3D(boxes: np.ndarray, query_boxes: np.ndarray) -> np.ndarray:
    """
    Args
        boxes: (N, 6) ndarray of float
        query_boxes: (K, 6) ndarray of float

    Returns
        overlaps: (N, K) ndarray of overlap between boxes and query_boxes
    """
    N = boxes.shape[0]
    K = query_boxes.shape[0]
    overlaps = np.zeros((N, K), dtype=np.float64)
    for k in range(K):
        box_volume = (
            (query_boxes[k, 3] - query_boxes[k, 0] + 1)
            * (query_boxes[k, 4] - query_boxes[k, 1] + 1)
            * (query_boxes[k, 5] - query_boxes[k, 2] + 1)
        )
        for n in range(N):
            id_ = min(boxes[n, 3], query_boxes[k, 3]) - max(boxes[n, 0], query_boxes[k, 0]) + 1
            if id_ > 0:
                iw = min(boxes[n, 4], query_boxes[k, 4]) - max(boxes[n, 1], query_boxes[k, 1]) + 1
                if iw > 0:
                    ih = (
                        min(boxes[n, 5], query_boxes[k, 5])
                        - max(boxes[n, 2], query_boxes[k, 2])
                        + 1
                    )
                    if ih > 0:
                        ua = np.float64(
                            (boxes[n, 3] - boxes[n, 0] + 1)
                            * (boxes[n, 4] - boxes[n, 1] + 1)
                            * (boxes[n, 5] - boxes[n, 2] + 1)
                            + box_volume
                            - iw * ih * id_
                        )
                        overlaps[n, k] = iw * ih * id_ / ua
    return overlaps


try:
    import numba
except ImportError:
    import os
    import warnings

    if not os.getenv("NO_JIT_WARNING", False):
        warnings.warn(
            "Numba not installed, falling back to slower numpy implementation. "
            "Install numba for a significant speedup.  Set the environment "
            "variable NO_JIT_WARNING=1 to disable this warning.",
            stacklevel=2,
        )
else:
    # compute_overlap 2d and 3d have the same signature
    signature = [
        "f8[:,::1](f8[:,::1], f8[:,::1])",
        numba.types.Array(numba.float64, 2, "C", readonly=True)(
            numba.types.Array(numba.float64, 2, "C", readonly=True),
            numba.types.Array(numba.float64, 2, "C", readonly=True),
        ),
    ]

    # variables that appear in the body of each function
    common_locals = {
        "N": numba.uint64,
        "K": numba.uint64,
        "overlaps": numba.types.Array(numba.float64, 2, "C"),
        "iw": numba.float64,
        "ih": numba.float64,
        "ua": numba.float64,
        "n": numba.uint64,
        "k": numba.uint64,
    }

    compute_overlap = numba.njit(
        signature,
        locals={**common_locals, "box_area": numba.float64},
        fastmath=True,
        nogil=True,
        boundscheck=False,
    )(compute_overlap)

    compute_overlap_3D = numba.njit(
        signature,
        locals={**common_locals, "id_": numba.float64, "box_volume": numba.float64},
        fastmath=True,
        nogil=True,
        boundscheck=False,
    )(compute_overlap_3D)
