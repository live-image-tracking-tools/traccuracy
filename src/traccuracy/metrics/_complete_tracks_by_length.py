from __future__ import annotations

import warnings
from typing import TYPE_CHECKING

import numpy as np

from traccuracy.track_errors._ctc import evaluate_ctc_events
from traccuracy.track_errors._divisions import evaluate_division_events

from ._base import Metric
from ._compute_complete_tracks_by_length import compute_complete_tracks_by_length

if TYPE_CHECKING:
    from typing import Literal

    from traccuracy.matchers import Matched


class CompleteTracksByLength(Metric):
    """Fraction of fully correct tracks as a function of track length.

    This is the CTC-BIO Complete Tracks metric generalized to every track
    length: for each length from 1 to ``max_length`` (in frames), it
    computes the accuracy (number correct / number total) of the ground
    truth track segments that span that many frames. At the maximum length
    this reduces to ``CompleteTracks``.

    Length is measured in frames (time difference), not edge count.
    A segment of length N spans N frames from start to end. For example:

    - A segment of length 1 spans 1 frame (node at t=0 to node at t=1)
    - A segment of length 2 spans 2 frames (node at t=0 to node at t=2)

    Skip edges that span multiple frames are decomposed into individual
    single-frame edges, each carrying the skip edge's correctness. For
    example, a skip edge from t=0 to t=3 contributes three length-1
    segments (t=0->1, t=1->2, t=2->3), and likewise contributes to the
    length-2 and length-3 totals.

    At division points, all branches are included in the same segment -
    a segment is only correct if all branches are correct.

    A segment is counted as correct if:

    - The starting node is a true positive
    - All edges along the path are true positives

    Important counting rules:

    - Isolated nodes (nodes with no outgoing edges) are NOT counted
    - Skip edges are decomposed into single-frame edges, so they
      contribute at every length they span (see above)
    - Tracks shorter than length N still contribute 1 to the total for
      length N (correct iff the entire track is correct)

    This metric helps identify whether tracking errors occur more frequently
    in short or long tracks, providing granular insight into tracking quality
    at different temporal scales.

    Args:
        max_length (int | None): Maximum track length in frames to evaluate. The default
            is None, which uses gt_tracks.end - gt_tracks.start
        lineages: If True, evaluate on full lineages (connected components).
            If False, evaluate on tracklets (segments between divisions).
        error_type: "basic" or "ctc" error classification scheme

    The compute function returns a results dictionary with three lists,
    each indexed by track length (index 0 = length 1, index 1 = length 2, etc.):

    - ``correct`` - number of correct segments at each length
    - ``total`` - total number of segments at each length
    - ``accuracy`` - correct/total at each length, or np.nan if total is 0

    """

    # Only ground-truth segments are scored; predictions beyond the ground truth are
    # never penalized, so this metric is valid on sparse ground truth.
    supports_sparse_gt = True

    def __init__(
        self,
        max_length: int | None = None,
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
        self.max_length = max_length
        self.lineages = lineages
        self.error_type: Literal["basic", "ctc"] = error_type

    def _compute(
        self,
        matched: Matched,
        relax_skips_gt: bool = False,
        relax_skips_pred: bool = False,
    ) -> dict:
        """Compute complete tracks by length for the matched object.

        Args:
            matched: Matched data object to compute metrics on
            relax_skips_gt: If True, check if skips in the ground truth graph
                have an equivalent multi-edge path in predicted graph
            relax_skips_pred: If True, check if skips in the predicted graph
                have an equivalent multi-edge path in ground truth graph

        Returns:
            Dictionary with "correct", "total", and "accuracy" lists,
            each of length max_length (index 0 = length 1, etc.).
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

        if self.max_length is None:
            max_length = matched.gt_graph.end_frame - matched.gt_graph.start_frame - 1
        else:
            max_length = self.max_length

        # Compute segment counts
        segment_counts = compute_complete_tracks_by_length(
            matched,
            max_length,
            self.lineages,
            error_type=self.error_type,
            relax_skips_gt=relax_skips_gt,
            relax_skips_pred=relax_skips_pred,
        )

        # Convert to results dict with lists (index 0 = length 1, etc.)
        correct_list: list[int] = []
        total_list: list[int] = []
        accuracy_list: list[float] = []
        for length in range(1, max_length + 1):
            correct, total = segment_counts.get(length, (0, 0))
            correct_list.append(correct)
            total_list.append(total)
            accuracy_list.append(correct / total if total > 0 else np.nan)

        return {
            "correct": correct_list,
            "total": total_list,
            "accuracy": accuracy_list,
        }
