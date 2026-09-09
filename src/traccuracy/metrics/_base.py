from __future__ import annotations

import warnings
from abc import ABC, abstractmethod
from typing import TYPE_CHECKING

import numpy as np

from traccuracy.metrics._results import Results

if TYPE_CHECKING:
    from typing import Any

    from traccuracy.matchers._matched import Matched


MATCHING_TYPES = ["one-to-one", "one-to-many", "many-to-one", "many-to-many"]


class Metric(ABC):
    """The base class for Metrics

    Data should be passed directly into the compute method
    Kwargs should be specified in the constructor

    Most metrics assume **dense** ground truth (every real cell is annotated), so a
    predicted node/edge/division with no ground truth match is treated as a false
    positive. On **sparse** ground truth, where only a subset of cells are
    annotated, that over-penalizes correct predictions of unannotated cells.

    Subclasses can classify each key in the dict returned by ``_compute`` (matched
    by name, regardless of how deeply it is nested, e.g. under a per-frame-buffer
    bucket) via ``sparse_safe_keys`` and ``agnostic_keys``:

    - ``sparse_safe_keys``: the key is a quality/error assessment that does not
      assume predictions with no match are false positives so it remains valid when
      ground truth is sparse.
    - ``agnostic_keys``: the key is a raw count or other value that is not itself a
      quality assessment (e.g. "Total GT Nodes", "Total Pred Nodes"). It is accurate
      regardless of annotation density, so no claim is made either way.
    - Anything not listed in either set is treated as dense-only: it counts or
      derives from unmatched predictions (false positives, precision, F1, ...) and
      will over-penalize correct predictions of unannotated ground truth.

    The two sets must be disjoint frozensets; ``__init_subclass__`` checks that when
    the subclass is defined.
    """

    #: See the "sparse-safe" bullet in the class docstring.
    sparse_safe_keys: frozenset[str] = frozenset()
    #: See the "agnostic" bullet in the class docstring.
    agnostic_keys: frozenset[str] = frozenset()

    def __init_subclass__(cls, **kwargs: Any) -> None:
        """Check a subclass's declared key sets when the class is defined.

        Runs at class definition rather than on instantiation, so a contradictory
        declaration fails on import instead of lurking in a metric that a given run
        never happens to instantiate.

        Args:
            **kwargs: Forwarded to ``super().__init_subclass__``.

        Raises:
            TypeError: Either declaration is not a frozenset.
            ValueError: A key is declared both sparse-safe and agnostic.
        """
        super().__init_subclass__(**kwargs)
        for name in ("sparse_safe_keys", "agnostic_keys"):
            declared = getattr(cls, name)
            if not isinstance(declared, frozenset):
                raise TypeError(
                    f"{cls.__name__}.{name} must be a frozenset, got "
                    f"{type(declared).__name__}. Declared key sets are immutable so "
                    "they cannot be edited into an overlap in place after this check "
                    "runs; rebinding the attribute later is still unchecked."
                )
        overlap = cls.sparse_safe_keys & cls.agnostic_keys
        if overlap:
            raise ValueError(
                f"{cls.__name__} declares {sorted(overlap)} as both sparse-safe and "
                "agnostic (either side may be inherited). _classify_sparse_safe "
                "resolves such a key to sparse-safe and the contradiction goes "
                "unnoticed, so put each key in exactly one set."
            )

    def __init__(self, valid_matches: list, zero_division: float = np.nan):
        """Initialize metric.

        Args:
            valid_matches: List of valid matching types for this metric.
            zero_division: Value to return for metrics that result in a 0/0 division.
                Defaults to np.nan. Set to 0.0 to return 0 and raise a warning
                instead, similar to scikit-learn's ``zero_division`` parameter.
        """
        # Check that we have gotten a list of valid match types
        if len(valid_matches) == 0:
            raise TypeError("New metrics must provide a list of valid matching types")

        for mtype in valid_matches:
            if mtype not in MATCHING_TYPES:
                raise ValueError(
                    f"Matching type {mtype} is not supported. Choose from {{MATCHING_TYPES}}."
                )

        self.valid_match_types = valid_matches
        self.zero_division = zero_division

    def _validate_matcher(self, matched: Matched) -> bool:
        """Verifies that the matched meets the assumptions of the metric
        Returns True if matcher is valid and False if matcher is not valid"""
        if not hasattr(self, "valid_match_types"):
            raise AttributeError("Metric subclass does not define valid_match_types")
        return matched.matching_type in self.valid_match_types

    def _classify_sparse_safe(self, key: str) -> str:
        """Classify a single output key from ``_compute`` for sparse ground truth.

        Args:
            key: A key from the dict returned by ``_compute``, e.g. "False Positive
                Nodes". For nested results (e.g. per-frame-buffer buckets), pass the
                inner leaf key, not the outer bucket key.

        Returns:
            str: One of "sparse_safe", "agnostic", or "dense_only". See the class
                docstring for what each means.
        """
        if key in type(self).sparse_safe_keys:
            return "sparse_safe"
        if key in type(self).agnostic_keys:
            return "agnostic"
        return "dense_only"

    #: Substrings (matched case-insensitively) identifying sparse-safe keys that are still
    #: susceptible to inflation from over-prediction on sparse ground truth, e.g. "Node Recall"
    #: or "complete_lineages". See ``_sparse_caveats``.
    _sparse_inflatable_substrings = (
        "recall",
        "accuracy",
        "complete_",
        "track_fractions",
        "target_effectiveness",
    )

    def _sparse_caveats(self, key: str) -> str | None:
        """Warn if a sparse-safe key can still be inflated by over-prediction.

        Args:
            key: A key from the dict returned by ``_compute``.

        Returns:
            str | None: A warning message if ``key`` matches one of
                ``_sparse_inflatable_substrings``, else None.
        """
        key_lower = key.lower()
        if any(substring in key_lower for substring in self._sparse_inflatable_substrings):
            return (
                f"Warning: {key} on sparse ground truth can be inflated by predicting way too "
                "many nodes/edges. Don't use this metric in isolation to compare methods."
            )
        return None

    def _filter_sparse_safe(self, results: dict) -> tuple[dict, list[str]]:
        """Recursively filter a ``_compute`` results dict down to sparse-safe/agnostic keys.

        Keys whose value is itself a dict (e.g. the "Frame Buffer 0" buckets in
        ``DivisionMetrics``) are recursed into rather than classified directly,
        since only their leaf keys represent actual metric values.

        Args:
            results: A (possibly nested) dict as returned by ``_compute``.

        Returns:
            dict: `results` with every dense-only leaf key removed.
            list[str]: Deduplicated warnings about sparse-safe keys that can still be
                inflated by over-prediction (see ``_sparse_caveats``). Nested buckets
                (e.g. per-frame-buffer) commonly repeat the same leaf key, so the same
                caveat is only reported once.
        """
        filtered = {}
        caveats: dict[str, None] = {}  # dict used as an ordered set to dedupe caveats
        for key, value in results.items():
            if isinstance(value, dict):
                filtered[key], nested_caveats = self._filter_sparse_safe(value)
                caveats.update(dict.fromkeys(nested_caveats))
            elif self._classify_sparse_safe(key) in ("sparse_safe", "agnostic"):
                filtered[key] = value
                caveat = self._sparse_caveats(key)
                if caveat is not None:
                    caveats[caveat] = None
        return filtered, list(caveats)

    @abstractmethod
    def _compute(
        self, matched: Matched, relax_skips_gt: bool = False, relax_skips_pred: bool = False
    ) -> dict:
        """The compute methods of Metric objects return a dictionary with counts and statistics.

        Args:
            matched (traccuracy.matchers.Matched): Matched data object to compute metrics on
            relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
                graph have an equivalent multi-edge path in predicted graph
            relax_skips_pred (bool): If True, the metric will check if skips in the predicted
                graph have an equivalent multi-edge path in ground truth graph

        Raises:
            NotImplementedError

        Returns:
            dict: Dictionary of metric names and int/float values
        """
        raise NotImplementedError

    def compute(
        self,
        matched: Matched,
        override_matcher: bool = False,
        relax_skips_gt: bool = False,
        relax_skips_pred: bool = False,
        sparse_only: bool = False,
    ) -> Results:
        """The compute methods of Metric objects return a Results object populated with results
        and associated metadata

        Args:
            matched (traccuracy.matchers.Matched): Matched data object to compute metrics on
            override_matcher (bool): If True, the metric will not validate the matcher type
            relax_skips_gt (bool): If True, the metric will check if skips in the ground truth
                graph have an equivalent multi-edge path in predicted graph
            relax_skips_pred (bool): If True, the metric will check if skips in the predicted
                graph have an equivalent multi-edge path in ground truth graph
            sparse_only (bool): If True, returns only metrics that are valid on sparse ground
                truth. A ``matched.gt_graph`` constructed with ``is_sparse_gt=True`` forces this
                on regardless, since sparseness is a property of the annotations. If the metric
                declares no sparse-safe or agnostic keys at all it cannot report anything, so
                ``_compute`` is skipped and an empty result is returned with a warning.

        Returns:
            traccuracy.metrics._results.Results: Object containing metric results
                and associated pipeline metadata
        """
        if override_matcher:
            warnings.warn(
                "Overriding matcher/metric validation may result in "
                "unpredictable/incorrect metric results",
                stacklevel=2,
            )
        else:
            valid_matcher = self._validate_matcher(matched)
            if not valid_matcher:
                raise TypeError(
                    "The matched data uses a matcher that does not meet the requirements "
                    "of the metric. Check the documentation for the metric for more information."
                )

        # Sparseness is a property of the annotations, not a per-run choice, so a GT graph
        # marked sparse forces filtering on.
        if matched.gt_graph.is_sparse_gt and not sparse_only:
            sparse_only = True
            warnings.warn(
                "GT graph is marked is_sparse_gt=True. Setting Metrics sparse_only flag to True",
                stacklevel=2,
            )

        # Whether anything can survive filtering is a class-level property, so answer it
        # before paying for _compute instead of computing and discarding everything.
        caveats: list = []
        res_dict: dict
        if sparse_only and not (type(self).sparse_safe_keys | type(self).agnostic_keys):
            warnings.warn(
                f"{type(self).__name__} has no sparse-safe or agnostic keys, so "
                "sparse_only=True filtered every result out. This metric is not "
                "meaningful on sparse ground truth.",
                stacklevel=2,
            )
            res_dict = {}
        else:
            res_dict = self._compute(
                matched,
                relax_skips_gt=relax_skips_gt,
                relax_skips_pred=relax_skips_pred,
            )
            if sparse_only:
                res_dict, caveats = self._filter_sparse_safe(res_dict)

        run_info = self.info
        run_info["relax_skips_gt"] = relax_skips_gt
        run_info["relax_skips_pred"] = relax_skips_pred
        run_info["sparse_only"] = sparse_only

        if caveats:
            run_info["sparse_metric_warnings"] = caveats

        results = Results(
            results=res_dict,
            matcher_info=matched.matcher_info,
            metric_info=run_info,
            gt_info={
                "name": matched.gt_graph.name,
                "border_margin": matched.gt_graph.border_margin,
            },
            pred_info={
                "name": matched.pred_graph.name,
                "border_margin": matched.pred_graph.border_margin,
            },
        )
        return results

    @property
    def info(self) -> dict[str, Any]:
        """Dictionary with Metric name and any parameters"""
        return {
            "name": self.__class__.__name__,
            **self.__dict__,
            # Converted to sorted tuples (rather than mirrored as instance attributes)
            # so they stay JSON-serializable in ``Results.metric_info``.
            "sparse_safe_keys": tuple(sorted(type(self).sparse_safe_keys)),
            "agnostic_keys": tuple(sorted(type(self).agnostic_keys)),
        }

    def _get_precision(self, numerator: int, denominator: int) -> float:
        """Compute precision.

        Returns ``self.zero_division`` (default ``np.nan``) when *denominator*
        is 0.  If ``self.zero_division == 0``, a ``UserWarning`` is raised.

        Args:
            numerator (int): Typically TP
            denominator (int): Typically TP + FP

        Returns:
            float: Precision
        """
        if denominator == 0:
            if self.zero_division == 0:
                warnings.warn(
                    "Precision is ill-defined and set to 0 due to no predicted elements.",
                    stacklevel=2,
                )
            return float(self.zero_division)
        return numerator / denominator

    def _get_recall(self, numerator: int, denominator: int) -> float:
        """Compute recall.

        Returns ``self.zero_division`` (default ``np.nan``) when *denominator*
        is 0.  If ``self.zero_division == 0``, a ``UserWarning`` is raised.

        Args:
            numerator (int): Typically TP
            denominator (int): Typically TP + FN

        Returns:
            float: Recall
        """
        if denominator == 0:
            if self.zero_division == 0:
                warnings.warn(
                    "Recall is ill-defined and set to 0 due to no ground truth elements.",
                    stacklevel=2,
                )
            return float(self.zero_division)
        return numerator / denominator

    def _get_f1(self, precision: float, recall: float) -> float:
        """Compute F1.

        Returns ``np.nan`` if either input is nan, or 0 if either input is 0.

        Args:
            precision (float): Precision score
            recall (float): Recall score

        Returns:
            float: F1
        """
        # F1 can only ever be nan for an empty GT graph and empty
        # pred graph. In all other cases, it should be 0 if either
        # precision or recall is 0 (or nan)
        if np.isnan(precision) and np.isnan(recall):
            return np.nan
        if np.isnan(precision) or np.isnan(recall):
            return 0.0
        if precision == 0 or recall == 0:
            return 0.0
        return 2 * (recall * precision) / (recall + precision)
