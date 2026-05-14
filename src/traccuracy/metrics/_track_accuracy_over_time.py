from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

import numpy as np

from traccuracy.track_errors._ctc import evaluate_ctc_events
from traccuracy.track_errors._divisions import evaluate_division_events

from ._base import Metric
from ._compute_track_accuracy import compute_track_accuracy

if TYPE_CHECKING:
    from typing import Literal

    from traccuracy.matchers import Matched


class TrackAccuracyOverTime(Metric):
    """Track accuracy measured over sliding windows of different sizes.

    For each window size from 1 to max_window, computes the fraction of
    ground truth track segments that are correctly reconstructed.

    Window size is measured in frames (time difference), not edge count.
    A segment of size N spans N frames from start to end. For example:
    - A segment of size 1 spans 1 frame (node at t=0 to node at t=1)
    - A segment of size 2 spans 2 frames (node at t=0 to node at t=2)

    Skip edges that span multiple frames count toward their actual frame
    difference. For example, a skip edge from t=0 to t=3 contributes a
    segment of size 3, not size 1.

    At division points, all branches are included in the same segment -
    a segment is only correct if all branches are correct.

    A segment is counted as correct if:
    - The starting node is a true positive
    - All edges along the path are true positives

    Important counting rules:
    - Isolated nodes (nodes with no outgoing edges) are NOT counted
    - Segments only exist at their actual frame spans (no intermediate sizes
      for skip edges)
    - Tracks shorter than window size N do not contribute to the total for
      window N

    This metric helps identify whether tracking errors occur more frequently
    in short or long tracks, providing granular insight into tracking quality
    at different temporal scales.

    Args:
        max_window (int | None): Maximum window size in frames to evaluate. The default
            is None, which uses gt_tracks.end - gt_tracks.start
        lineages: If True, evaluate on full lineages (connected components).
            If False, evaluate on tracklets (segments between divisions).
        error_type: "basic" or "ctc" error classification scheme

    The compute function returns a results dictionary with three lists,
    each indexed by window size (index 0 = window 1, index 1 = window 2, etc.):

    - ``correct`` - number of correct segments at each window size
    - ``total`` - total number of segments at each window size
    - ``accuracy`` - correct/total at each window size, or np.nan if total is 0

    """

    def __init__(
        self,
        max_window: int | None = None,
        lineages: bool = True,
        error_type: Literal["basic", "ctc"] = "basic",
    ):
        # CTC supports many-to-one because it doesn't use division error classification
        # (divisions handled via WRONG_SEMANTIC edge flags instead)
        # Basic errors require one-to-one for proper division error classification
        valid_matches = ["one-to-one", "many-to-one"]
        super().__init__(valid_matches)

        if error_type not in ["ctc", "basic"]:
            raise ValueError(f"Unrecognized error type {error_type}. Should be 'ctc' or 'basic'")
        self.max_window = max_window
        self.lineages = lineages
        self.error_type: Literal["basic", "ctc"] = error_type

    def _compute(
        self,
        matched: Matched,
        relax_skips_gt: bool = False,
        relax_skips_pred: bool = False,
    ) -> dict:
        """Compute track accuracy over time for the matched object.

        Args:
            matched: Matched data object to compute metrics on
            relax_skips_gt: If True, check if skips in the ground truth graph
                have an equivalent multi-edge path in predicted graph
            relax_skips_pred: If True, check if skips in the predicted graph
                have an equivalent multi-edge path in ground truth graph

        Returns:
            Dictionary with "correct", "total", and "accuracy" lists,
            each of length max_window (index 0 = window 1, etc.).
        """
        if matched.gt_graph.start_frame is None or matched.gt_graph.end_frame is None:
            warnings.warn(
                "GT graph has no frame range (empty graph). Returning empty results.",
                stacklevel=2,
            )
            return {}

        # Run error classification
        if self.error_type == "basic":
            # Run division error classification (only for basic errors)
            # CTC handles division errors via WRONG_SEMANTIC edge flags
            # Note: evaluate_division_events internally calls classify_basic_errors
            evaluate_division_events(
                matched, relax_skips_gt=relax_skips_gt, relax_skips_pred=relax_skips_pred
            )
        else:
            if relax_skips_gt or relax_skips_pred:
                warnings.warn(
                    "CTC metrics do not support relaxing skip edges. "
                    "Ignoring relax_skips_gt and relax_skips_pred.",
                    stacklevel=2,
                )
            evaluate_ctc_events(matched)

        if self.max_window is None:
            max_window = matched.gt_graph.end_frame - matched.gt_graph.start_frame - 1
        else:
            max_window = self.max_window

        # Compute segment counts
        segment_counts = compute_track_accuracy(
            matched,
            max_window,
            self.lineages,
            error_type=self.error_type,
            relax_skips_gt=relax_skips_gt,
            relax_skips_pred=relax_skips_pred,
        )

        # Convert to results dict with lists (index 0 = window 1, etc.)
        correct_list: list[int] = []
        total_list: list[int] = []
        accuracy_list: list[float] = []
        for window_size in range(1, max_window + 1):
            correct, total = segment_counts.get(window_size, (0, 0))
            correct_list.append(correct)
            total_list.append(total)
            accuracy_list.append(correct / total if total > 0 else np.nan)

        return {
            "correct": correct_list,
            "total": total_list,
            "accuracy": accuracy_list,
        }
