"""Pin each metric's declared sparse-safe/agnostic keys to the keys it actually returns.

``sparse_safe_keys``/``agnostic_keys`` repeat result-key strings that ``_compute`` builds
independently -- ``BasicMetrics`` composes them with f-strings and never writes them as
literals, and ``DivisionMetrics`` writes them out twice. Nothing ties the two together, and
the failure is silent: an unrecognized key is classified ``dense_only`` and quietly dropped
from sparse results, while a declared key that no longer exists is a dead no-op. These tests
turn both into a test failure.
"""

import networkx as nx
import pytest

import tests.examples.graphs as ex_graphs
from tests.examples.larger_examples import larger_example_1
from tests.test_utils import get_division_graphs, get_movie_with_graph
from traccuracy import TrackingGraph
from traccuracy.matchers import CTCMatcher
from traccuracy.matchers._matched import Matched
from traccuracy.metrics import (
    AOGMMetrics,
    BasicMetrics,
    CellCycleAccuracy,
    CHOTAMetric,
    CompleteTracks,
    CompleteTracksByLength,
    CTCMetrics,
    DivisionMetrics,
    TrackOverlapMetrics,
)
from traccuracy.metrics._base import Metric

ALL_METRIC_CLASSES = [
    AOGMMetrics,
    BasicMetrics,
    CHOTAMetric,
    CTCMetrics,
    CellCycleAccuracy,
    CompleteTracks,
    CompleteTracksByLength,
    DivisionMetrics,
    TrackOverlapMetrics,
]


def _division_matched():
    g_gt, g_pred, map_gt, map_pred = get_division_graphs()
    mapper = list(zip(map_gt, map_pred, strict=False))
    return Matched(TrackingGraph(g_gt), TrackingGraph(g_pred), mapper, {"name": "DummyMatcher"})


def _ctc_matched():
    track_graph = get_movie_with_graph(ndims=3, n_frames=3, n_labels=3)
    return CTCMatcher().compute_mapping(gt_graph=track_graph, pred_graph=track_graph)


def _leaf_keys(results: dict) -> set[str]:
    """Collect the keys `_filter_sparse_safe` would classify, recursing into nested dicts."""
    keys = set()
    for key, value in results.items():
        if isinstance(value, dict):
            keys |= _leaf_keys(value)
        else:
            keys.add(key)
    return keys


# (metric factory, [(matched factory, _compute kwargs), ...]). Several metrics only emit
# some keys under relaxed skips, so each metric lists every case needed to produce its
# full key set, and the assertion is made against the union.
DECLARED_KEY_CASES = [
    pytest.param(
        BasicMetrics,
        [
            (ex_graphs.all_basic_errors, {}),
            (
                ex_graphs.all_basic_errors,
                {"relax_skips_gt": True, "relax_skips_pred": True},
            ),
        ],
        id="BasicMetrics",
    ),
    pytest.param(
        lambda: DivisionMetrics(max_frame_buffer=2),
        [
            (_division_matched, {}),
            (
                ex_graphs.div_daughter_gap,
                {"relax_skips_gt": True, "relax_skips_pred": True},
            ),
        ],
        id="DivisionMetrics",
    ),
    pytest.param(
        lambda: CompleteTracks(error_type="basic"),
        [(larger_example_1, {})],
        id="CompleteTracks-basic",
    ),
    pytest.param(
        lambda: CompleteTracks(error_type="ctc"),
        [(larger_example_1, {})],
        id="CompleteTracks-ctc",
    ),
    pytest.param(
        lambda: CompleteTracksByLength(max_length=2),
        [(larger_example_1, {})],
        id="CompleteTracksByLength",
    ),
    pytest.param(
        TrackOverlapMetrics,
        [(ex_graphs.gap_close_gt_gap, {})],
        id="TrackOverlapMetrics",
    ),
    pytest.param(CTCMetrics, [(_ctc_matched, {})], id="CTCMetrics"),
    pytest.param(AOGMMetrics, [(_ctc_matched, {})], id="AOGMMetrics"),
]


@pytest.mark.filterwarnings(
    "ignore:Mapping is empty",
    "ignore:Node errors already calculated",
    "ignore:Edge errors already calculated",
)
@pytest.mark.parametrize(("metric_factory", "cases"), DECLARED_KEY_CASES)
def test_declared_keys_are_actually_returned(metric_factory, cases):
    declared = metric_factory().sparse_safe_keys | metric_factory().agnostic_keys

    produced: set[str] = set()
    for matched_factory, compute_kwargs in cases:
        # A fresh metric and matched per case: reusing either replays error
        # classification and warns "already calculated".
        produced |= _leaf_keys(metric_factory()._compute(matched_factory(), **compute_kwargs))

    assert declared <= produced, (
        f"declared but never returned: {sorted(declared - produced)}. A renamed or "
        "misspelled key is silently treated as dense-only and dropped from sparse results."
    )


@pytest.mark.parametrize("metric_class", ALL_METRIC_CLASSES, ids=lambda c: c.__name__)
def test_sparse_safe_and_agnostic_are_disjoint(metric_class):
    # A key in both sets resolves to "sparse_safe" silently, hiding the contradiction.
    overlap = metric_class.sparse_safe_keys & metric_class.agnostic_keys
    assert not overlap, f"{metric_class.__name__} classifies {sorted(overlap)} as both"


def test_metrics_without_declared_keys_are_skipped_not_computed():
    # CCA and CHOTA declare nothing, so under sparse ground truth they cannot report
    # anything. Guards the list in the docs table against silently going stale.
    for metric_class in (CellCycleAccuracy, CHOTAMetric):
        assert not metric_class.sparse_safe_keys
        assert not metric_class.agnostic_keys


def test_every_metric_subclass_is_covered():
    # A new Metric subclass should be added to ALL_METRIC_CLASSES so its declared keys
    # get checked rather than silently skipped.
    subclasses = {c for c in Metric.__subclasses__() if c.__module__.startswith("traccuracy")}
    subclasses |= {
        sub
        for c in subclasses
        for sub in c.__subclasses__()
        if sub.__module__.startswith("traccuracy")
    }
    uncovered = sorted(c.__name__ for c in subclasses - set(ALL_METRIC_CLASSES))
    assert not uncovered, f"uncovered Metric subclasses: {uncovered}"


def test_leaf_keys_recurses():
    assert _leaf_keys({"Frame Buffer 0": {"a": 1}, "b": 2}) == {"a", "b"}
    assert _leaf_keys({}) == set()
    # A list value (CompleteTracksByLength returns lists) is a leaf, not a container.
    assert _leaf_keys({"accuracy": [1, 2]}) == {"accuracy"}


def test_declared_keys_survive_a_real_sparse_compute():
    # End-to-end: a graph marked sparse at construction filters down to exactly the
    # declared keys, with no dense-only leftovers.
    g = nx.DiGraph()
    g.add_node(1, t=0, y=0, x=0)
    g.add_node(2, t=1, y=0, x=0)
    g.add_edge(1, 2)
    gt = TrackingGraph(g.copy(), location_keys=("y", "x"), is_sparse_gt=True)
    pred = TrackingGraph(g.copy(), location_keys=("y", "x"))
    matched = Matched(gt, pred, [(1, 1), (2, 2)], {"matching type": "one-to-one"})

    with pytest.warns(UserWarning, match="GT graph is marked is_sparse_gt=True"):
        results = BasicMetrics().compute(matched).results

    declared = BasicMetrics.sparse_safe_keys | BasicMetrics.agnostic_keys
    assert set(results.keys()) <= declared
    assert "Node Precision" not in results
    assert "Node Recall" in results
