from __future__ import annotations

from typing import TYPE_CHECKING

from tqdm import tqdm

if TYPE_CHECKING:
    from collections.abc import Hashable

    import numpy as np

    from traccuracy._tracking_graph import TrackingGraph

from ._base import Matcher
from ._compute_overlap import get_labels_with_overlap


class CTCMatcher(Matcher):
    """Match graph nodes based on measure used in cell tracking challenge benchmarking.

    A computed marker (segmentation) is matched to a reference marker if the computed
    marker covers a majority of the reference marker.

    Each reference marker can therefore only be matched to one computed marker, but
    multiple reference markers can be assigned to a single computed marker.

    See https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0144959
    for complete details.
    """

    # CTC can return many-to-one or one-to-one
    _matching_type = None

    def _compute_mapping(
        self, gt_graph: TrackingGraph, pred_graph: TrackingGraph
    ) -> list[tuple[Hashable, Hashable]]:
        """Run ctc matching

        Args:
            gt_graph (TrackingGraph): Tracking graph object for the gt
            pred_graph (TrackingGraph): Tracking graph object for the pred

        Returns:
            traccuracy.matchers.Matched: Matched data object containing the CTC mapping

        Raises:
            ValueError: if GT and pred segmentations are None or are not the same shape
        """
        gt = gt_graph
        pred = pred_graph
        gt_label_key = gt_graph.label_key
        pred_label_key = pred_graph.label_key
        G_gt, mask_gt = gt, gt.segmentation
        G_pred, mask_pred = pred, pred.segmentation

        if mask_gt is None or mask_pred is None:
            raise ValueError("Segmentation is None, cannot perform matching")

        if mask_gt.shape != mask_pred.shape:
            raise ValueError("Segmentation shapes must match between gt and pred")

        mapping: list[tuple] = []
        # Get overlaps for each frame
        if gt.start_frame is None or gt.end_frame is None:
            return mapping

        for i, t in enumerate(
            tqdm(
                range(gt.start_frame, gt.end_frame),
                desc="Matching frames",
            )
        ):
            gt_frame = mask_gt[i]
            pred_frame = mask_pred[i]
            gt_frame_nodes = gt.nodes_by_frame[t]
            pred_frame_nodes = pred.nodes_by_frame[t]

            # get the labels for this frame
            gt_label_to_id = {
                G_gt.graph.nodes[node][gt_label_key]: node
                for node in gt_frame_nodes
                if gt_label_key in G_gt.graph.nodes[node]
            }

            pred_label_to_id = {
                G_pred.graph.nodes[node][pred_label_key]: node
                for node in pred_frame_nodes
                if pred_label_key in G_pred.graph.nodes[node]
            }

            frame_map = match_frame_majority(gt_frame, pred_frame)
            # Switch from segmentation ids to node ids
            for gt_label, pred_label in frame_map:
                mapping.append((gt_label_to_id[gt_label], pred_label_to_id[pred_label]))

        return mapping


def match_frame_majority(
    gt_frame: np.ndarray, pred_frame: np.ndarray
) -> list[tuple[Hashable, Hashable]]:
    mapping: list[tuple[Hashable, Hashable]] = []
    overlaps = get_labels_with_overlap(gt_frame, pred_frame, overlap="iogt")

    for gt_label, pred_label, iogt in overlaps:
        # CTC metrics only match comp IDs to a single GT ID if there is majority overlap
        if iogt > 0.5:
            mapping.append((gt_label, pred_label))

    return mapping
