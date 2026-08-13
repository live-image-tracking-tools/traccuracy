import warnings

import networkx as nx
import numpy as np
import pytest

from traccuracy import TrackingGraph
from traccuracy.matchers._matched import Matched
from traccuracy.metrics._base import Metric


class ValidMetric(Metric):
    def __init__(self, **kwargs):
        super().__init__(valid_matches=["one-to-one"], **kwargs)

    def _compute(
        self, matched, override_matcher=False, relax_skips_gt=False, relax_skips_pred=False
    ):
        return {}


class TestMetric:
    matched = Matched(TrackingGraph(nx.DiGraph()), TrackingGraph(nx.DiGraph()), [], {})

    def test_missing_attribute(self):
        # Should fail if super init isn't called and subclass init isn't used
        # Error doesn't occur until metric._validate_matcher is called
        class DummyMetric(Metric):
            def __init__(self):
                pass

            def _compute(self):
                pass

        metric = DummyMetric()
        with pytest.raises(
            AttributeError, match="Metric subclass does not define valid_match_types"
        ):
            metric._validate_matcher(self.matched)

    def test_empty_list(self):
        class DummyMetric(Metric):
            def __init__(self):
                super().__init__(valid_matches=[])

            def _compute(self):
                pass

        with pytest.raises(
            TypeError, match="New metrics must provide a list of valid matching types"
        ):
            DummyMetric()

    def test_invalid_option(self):
        bad_option = "not-valid"

        class DummyMetric(Metric):
            def __init__(self):
                super().__init__(valid_matches=[bad_option])

            def _compute(self):
                pass

        with pytest.raises(ValueError, match=r"Matching type .* is not supported."):
            DummyMetric()

    def test_matcher_override(self):
        class DummyMetric(Metric):
            def __init__(self):
                super().__init__(valid_matches=["one-to-one"])

            def _compute(self):
                return {"success": True}

        graph = TrackingGraph(nx.DiGraph())
        matched = Matched(graph, graph, [(1, 2), (1, 3)], {"matching type": "many-to-many"})

        metric = DummyMetric()

        # Fail without override
        message = (
            "The matched data uses a matcher that does not meet the requirements "
            "of the metric. Check the documentation for the metric for more information."
        )
        with pytest.raises(TypeError, match=message):
            metric.compute(matched)

        # Override triggers warning
        message = (
            "Overriding matcher/metric validation may result in "
            "unpredictable/incorrect metric results"
        )
        with pytest.raises(UserWarning, match=message):
            results = metric.compute(matched, override_matcher=True)
            assert "success" in results.results

    def test_precision(self):
        m = ValidMetric()
        assert np.isnan(m._get_precision(numerator=0, denominator=0))
        assert m._get_precision(numerator=10, denominator=10) == 1
        assert m._get_precision(numerator=0, denominator=10) == 0

    def test_precision_zero_division(self):
        m = ValidMetric(zero_division=0.0)
        with pytest.warns(UserWarning, match="Precision is ill-defined"):
            assert m._get_precision(numerator=0, denominator=0) == 0
        assert m._get_precision(numerator=10, denominator=10) == 1

    def test_recall(self):
        m = ValidMetric()
        assert np.isnan(m._get_recall(numerator=0, denominator=0))
        assert m._get_recall(numerator=0, denominator=10) == 0
        assert m._get_recall(numerator=10, denominator=10) == 1

    def test_recall_zero_division(self):
        m = ValidMetric(zero_division=0.0)
        with pytest.warns(UserWarning, match="Recall is ill-defined"):
            assert m._get_recall(numerator=0, denominator=0) == 0
        assert m._get_recall(numerator=10, denominator=10) == 1

    def test_f1(self):
        m = ValidMetric()
        assert m._get_f1(precision=0, recall=0) == 0
        assert m._get_f1(precision=0, recall=1) == 0
        assert m._get_f1(precision=1, recall=0) == 0
        assert m._get_f1(precision=1, recall=1) == 1
        # no TPs no FPs but must've been some FNs
        assert m._get_f1(precision=np.nan, recall=0) == 0
        # no TPs no FNs but must've been some FPs
        assert m._get_f1(precision=0, recall=np.nan) == 0
        # actually not possible inputs for a real dataset, but should
        # still be 0 because denom. would be non-zero
        assert m._get_f1(precision=1, recall=np.nan) == 0
        # the only time we want a nan is if both recall and precision are nan
        # this means no TPs, no FPs, no FNs, which can only
        # happen if both GT and pred graphs are empty
        assert np.isnan(m._get_f1(precision=np.nan, recall=np.nan))

    def test_relax_info(self):
        m = ValidMetric()

        # relax_skips_gt and relax_skips_pred are False by default
        with pytest.warns(UserWarning, match="Mapping is empty"):
            results = m.compute(self.matched)
        assert results.metric_info["relax_skips_gt"] is False
        assert results.metric_info["relax_skips_pred"] is False

        # relax_skips makes it into results when passed
        # don't need to check for warning here as matching type was set
        # in previous validation step
        results = m.compute(self.matched, relax_skips_gt=True, relax_skips_pred=False)
        assert results.metric_info["relax_skips_gt"] is True
        assert results.metric_info["relax_skips_pred"] is False

    def test_classify_sparse_gt_default_dense_only(self):
        # A metric that does not opt in classifies every key as dense-only.
        m = ValidMetric()
        assert m._classify_sparse_safe("anything") == "dense_only"
        assert m.sparse_safe_keys == frozenset()
        assert m.agnostic_keys == frozenset()
        assert m.info["sparse_safe_keys"] == ()
        assert m.info["agnostic_keys"] == ()

    def test_classify_sparse_gt_opt_in(self):
        # A subclass can declare specific keys as sparse-safe or agnostic; anything
        # else still falls back to dense-only.
        class MixedMetric(ValidMetric):
            sparse_safe_keys = frozenset({"safe_key"})
            agnostic_keys = frozenset({"neutral_key"})

        m = MixedMetric()
        assert m._classify_sparse_safe("safe_key") == "sparse_safe"
        assert m._classify_sparse_safe("neutral_key") == "agnostic"
        assert m._classify_sparse_safe("other_key") == "dense_only"

    def test_classify_sparse_gt_surfaces_in_results(self):
        class MixedMetric(ValidMetric):
            sparse_safe_keys = frozenset({"safe_key"})
            agnostic_keys = frozenset({"neutral_key"})

        # Fresh matched with the matching type set so no "empty mapping" warning fires.
        matched = Matched(
            TrackingGraph(nx.DiGraph()),
            TrackingGraph(nx.DiGraph()),
            [],
            {"matching type": "one-to-one"},
        )
        results = MixedMetric().compute(matched)
        assert results.metric_info["sparse_safe_keys"] == ("safe_key",)
        assert results.metric_info["agnostic_keys"] == ("neutral_key",)

    def test_sparse_only_skips_metric_with_no_safe_keys(self):
        # A metric that declares no sparse-safe/agnostic keys (the default) can never
        # report anything under sparse_only, which is knowable from the class alone --
        # so _compute should be skipped entirely rather than computed and discarded.
        class DenseOnlyMetric(ValidMetric):
            def __init__(self, **kwargs):
                super().__init__(**kwargs)
                self.computed = False

            def _compute(self, matched, relax_skips_gt=False, relax_skips_pred=False):
                self.computed = True
                return {"dense_key": 1}

        matched = Matched(
            TrackingGraph(nx.DiGraph()),
            TrackingGraph(nx.DiGraph()),
            [],
            {"matching type": "one-to-one"},
        )
        metric = DenseOnlyMetric()
        with pytest.warns(UserWarning, match="not meaningful on sparse ground truth"):
            results = metric.compute(matched, sparse_only=True)
        assert results.results == {}
        assert metric.computed is False

    def test_sparse_only_does_not_warn_when_compute_is_legitimately_empty(self):
        # An empty _compute result must not be mistaken for "this metric has no
        # sparse-safe keys" -- e.g. CompleteTracksByLength returns {} for a graph with
        # no frame range while declaring three sparse-safe/agnostic keys.
        class EmptyResultMetric(ValidMetric):
            sparse_safe_keys = frozenset({"safe_key"})

            def _compute(self, matched, relax_skips_gt=False, relax_skips_pred=False):
                return {}

        matched = Matched(
            TrackingGraph(nx.DiGraph()),
            TrackingGraph(nx.DiGraph()),
            [],
            {"matching type": "one-to-one"},
        )
        with warnings.catch_warnings():
            warnings.simplefilter("error")
            results = EmptyResultMetric().compute(matched, sparse_only=True)
        assert results.results == {}

    def test_set_sparse_to_true_with_sparse_gt(self):
        # Warn and override sparse_only flag if gt graph marked as sparse
        class MixedMetric(ValidMetric):
            sparse_safe_keys = frozenset({"safe_key"})
            agnostic_keys = frozenset({"neutral_key"})

            def _compute(self, matched, relax_skips_gt, relax_skips_pred):
                return {"safe_key": 0, "neutral_key": 1, "dense_key": 2}

        matched = Matched(
            TrackingGraph(nx.DiGraph(), is_sparse_gt=True),
            TrackingGraph(nx.DiGraph()),
            [],
            {"matching type": "one-to-one"},
        )

        with pytest.warns(
            UserWarning,
            match="GT graph is marked is_sparse_gt=True. Setting Metrics sparse_only flag to True",
        ):
            results = MixedMetric().compute(matched)
        assert results.metric_info["sparse_only"] is True
        # The flag actually filtered, rather than only being recorded in the metadata.
        assert results.results == {"safe_key": 0, "neutral_key": 1}

    def test_explicit_sparse_only_false_does_not_override_sparse_gt(self):
        # Sparseness describes the annotations, so the graph flag wins over the kwarg.
        class MixedMetric(ValidMetric):
            sparse_safe_keys = frozenset({"safe_key"})

            def _compute(self, matched, relax_skips_gt=False, relax_skips_pred=False):
                return {"safe_key": 0, "dense_key": 1}

        matched = Matched(
            TrackingGraph(nx.DiGraph(), is_sparse_gt=True),
            TrackingGraph(nx.DiGraph()),
            [],
            {"matching type": "one-to-one"},
        )
        with pytest.warns(UserWarning, match="GT graph is marked is_sparse_gt=True"):
            results = MixedMetric().compute(matched, sparse_only=False)
        assert results.metric_info["sparse_only"] is True
        assert results.results == {"safe_key": 0}


def test_filter_sparse_safe_flat_dict():
    # A metric's own classification is tested per-metric (see e.g. test_basic.py,
    # test_divisions.py); this only tests the generic filtering mechanism.
    class MixedMetric(ValidMetric):
        sparse_safe_keys = frozenset({"safe_key"})
        agnostic_keys = frozenset({"neutral_key"})

    m = MixedMetric()
    filtered, _ = m._filter_sparse_safe({"safe_key": 1, "neutral_key": 2, "dense_only_key": 3})
    assert filtered == {"safe_key": 1, "neutral_key": 2}


def test_filter_sparse_safe_recurses_into_nested_dicts():
    # A key whose value is itself a dict (e.g. a per-frame-buffer bucket) is
    # recursed into rather than classified directly -- only its leaf keys
    # represent actual metric values.
    class MixedMetric(ValidMetric):
        sparse_safe_keys = frozenset({"safe_key"})
        agnostic_keys = frozenset({"neutral_key"})

    m = MixedMetric()
    filtered, _ = m._filter_sparse_safe(
        {
            "Bucket 0": {"safe_key": 1, "neutral_key": 2, "dense_only_key": 3},
            "Bucket 1": {"safe_key": 4, "dense_only_key": 5},
        }
    )
    assert filtered == {
        "Bucket 0": {"safe_key": 1, "neutral_key": 2},
        "Bucket 1": {"safe_key": 4},
    }


def test_filter_sparse_safe_caveats():
    # Sparse-safe keys that can still be inflated by over-prediction (e.g. "recall") should
    # produce a caveat; other sparse-safe/agnostic keys should not.
    class MixedMetric(ValidMetric):
        sparse_safe_keys = frozenset({"Node Recall", "True Positive Nodes"})
        agnostic_keys = frozenset({"neutral_key"})

    m = MixedMetric()
    _, caveats = m._filter_sparse_safe(
        {"Node Recall": 0.5, "True Positive Nodes": 1, "neutral_key": 2, "dense_only_key": 3}
    )
    assert caveats == [m._sparse_caveats("Node Recall")]


def test_filter_sparse_safe_caveats_deduplicated_across_nested_dicts():
    # Nested buckets (e.g. per-frame-buffer) commonly repeat the same leaf key, so the same
    # caveat should only be reported once.
    class MixedMetric(ValidMetric):
        sparse_safe_keys = frozenset({"Node Recall"})

    m = MixedMetric()
    _, caveats = m._filter_sparse_safe(
        {
            "Bucket 0": {"Node Recall": 0.5},
            "Bucket 1": {"Node Recall": 0.6},
        }
    )
    assert caveats == [m._sparse_caveats("Node Recall")]
