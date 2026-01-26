from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

import numpy as np

from traccuracy.track_errors._basic import classify_basic_errors
from traccuracy.track_errors._ctc import evaluate_ctc_events
from traccuracy.track_errors._divisions import evaluate_division_events

from ._base import Metric
from ._compute_track_accuracy import compute_track_accuracy

if TYPE_CHECKING:
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
        max_window: Maximum window size in frames to evaluate (default: 50)
        lineages: If True, evaluate on full lineages (connected components).
            If False, evaluate on tracklets (segments between divisions).
        error_type: "basic" or "ctc" error classification scheme

    The compute function returns a results dictionary with entries for each
    window size from 1 to max_window:
        - `window_{N}_correct` - number of correct segments of size N frames
        - `window_{N}_total` - total number of segments of size N frames
        - `window_{N}_accuracy` - correct/total, or np.nan if total is 0

    """

    def __init__(
        self,
        max_window: int = 50,
        lineages: bool = True,
        error_type: str = "basic",
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
        self.error_type = error_type

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
            Dictionary with window_{N}_correct, window_{N}_total, and
            window_{N}_accuracy for each window size N from 1 to max_window.
        """
        # Run error classification
        if self.error_type == "basic":
            # Warn if using many-to-one matching with basic errors
            if matched.matcher_info.get("type") == "many-to-one":
                warnings.warn(
                    "Using basic errors with many-to-one matching. "
                    "Division error classification may not work correctly. "
                    "Consider using error_type='ctc' for many-to-one matching.",
                    stacklevel=2,
                )
            classify_basic_errors(
                matched, relax_skips_gt=relax_skips_gt, relax_skips_pred=relax_skips_pred
            )
            # Run division error classification (only for basic errors)
            # CTC handles division errors via WRONG_SEMANTIC edge flags
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

        # Compute segment counts
        segment_counts = compute_track_accuracy(
            matched,
            self.max_window,
            self.lineages,
            error_type=self.error_type,
            relax_skips_gt=relax_skips_gt,
            relax_skips_pred=relax_skips_pred,
        )

        # Convert to results dict with computed accuracies
        results: dict = {}
        for window_size in range(1, self.max_window + 1):
            correct, total = segment_counts.get(window_size, (0, 0))
            key = f"window_{window_size}"
            results[f"{key}_correct"] = correct
            results[f"{key}_total"] = total
            results[f"{key}_accuracy"] = correct / total if total > 0 else np.nan

        return results
