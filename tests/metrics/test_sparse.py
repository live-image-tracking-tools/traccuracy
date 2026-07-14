"""Tests for the sparse-ground-truth tracking metrics (SparseTrackingMetrics).

The exact edge-Jaccard fractions in the edge unit tests are ported from the reference
implementation in the royerlab cell-tracking-competition
(https://github.com/royerlab/kaggle-cell-tracking-competition) and pin parity with it.
The division tests use minimal, hand-built graphs in the same style as the other
traccuracy division fixtures (see ``tests/examples/graphs.py``).
"""

from __future__ import annotations

import math

import networkx as nx
import pytest

from traccuracy import TrackingGraph, run_metrics
from traccuracy.matchers import PointMatcher
from traccuracy.matchers._matched import Matched
from traccuracy.metrics import (
    BasicMetrics,
    CompleteTracks,
    CompleteTracksByLength,
    CTCMetrics,
    DivisionMetrics,
    SparseTrackingMetrics,
)


def _build(nodes: dict, edges: list[tuple]) -> TrackingGraph:
    """Build a TrackingGraph from a ``{name: {t, z, y, x}}`` dict and ``[(src, tgt)]`` list.

    Node names must be non-negative integers (traccuracy requires integer node ids).
    """
    graph = nx.DiGraph()
    for name, attrs in nodes.items():
        graph.add_node(name, **attrs)
    graph.add_edges_from(edges)
    return TrackingGraph(graph, frame_key="t", label_key=None, location_keys=("z", "y", "x"))


def _node(t: float, y: float) -> dict:
    return {"t": t, "z": 0.0, "y": float(y), "x": 0.0}


def _counts(pred: TrackingGraph, gt: TrackingGraph, max_distance: float = 7.0) -> tuple:
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=max_distance), [SparseTrackingMetrics()]
    )
    r = results[0]["results"]
    return (
        r["edge_tp"],
        r["edge_fp"],
        r["edge_fn"],
        r["division_tp"],
        r["division_fp"],
        r["division_fn"],
    )


def _edge_jaccard(pred: TrackingGraph, gt: TrackingGraph, max_distance: float = 7.0) -> float:
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=max_distance), [SparseTrackingMetrics()]
    )
    return results[0]["results"]["edge_jaccard"]


# ---------------------------------------------------------------------------
# Division metrics on minimal, hand-built graphs (repo fixture style). Each isolates
# one behavior with counts that are obvious by construction. A dividing lineage is
# parent -> divider -> {daughter, daughter}; daughters split +/- 5 in y (< the 7 unit
# match threshold), and tracks sit on far-apart y lanes so they never cross-match.
# ---------------------------------------------------------------------------


def test_division_true_positive() -> None:
    # Perfect division: divider at t1, both daughters recovered.
    nodes = {0: _node(0, 0), 1: _node(1, 0), 2: _node(2, 5), 3: _node(2, -5)}
    edges = [(0, 1), (1, 2), (1, 3)]
    gt = _build(nodes, edges)
    pred = _build({k + 10: v for k, v in nodes.items()}, [(u + 10, v + 10) for u, v in edges])
    assert _counts(pred, gt) == (3, 0, 0, 1, 0, 0)


def test_division_false_negative() -> None:
    # GT divides but the prediction is a straight track -> the division is missed.
    gt = _build(
        {0: _node(0, 0), 1: _node(1, 0), 2: _node(2, 5), 3: _node(2, -5)},
        [(0, 1), (1, 2), (1, 3)],
    )
    # Predicted track follows one daughter only, no fork.
    pred = _build(
        {10: _node(0, 0), 11: _node(1, 0), 12: _node(2, 5)},
        [(10, 11), (11, 12)],
    )
    assert _counts(pred, gt) == (2, 0, 1, 0, 0, 1)


def test_division_false_positive() -> None:
    # GT is a straight (annotated) track; the prediction invents a fork on it.
    gt = _build(
        {0: _node(0, 0), 1: _node(1, 0), 2: _node(2, 0)},
        [(0, 1), (1, 2)],
    )
    pred = _build(
        {10: _node(0, 0), 11: _node(1, 0), 12: _node(2, 0), 13: _node(2, -5)},
        [(10, 11), (11, 12), (11, 13)],  # node 11 forks; 13 is unmatched background
    )
    # Spurious fork on an annotated GT node -> division FP; the extra edge -> edge FP.
    assert _counts(pred, gt) == (2, 1, 0, 0, 1, 0)


def test_division_late_within_tolerance() -> None:
    # Prediction forks one frame after the GT split; still a TP (+/- 1 tolerance). One
    # daughter lineage is touched only at the grandchild frame, exercising the
    # "lineages may be hit at different timepoints" rule.
    gt = _build(
        {
            0: _node(0, 0),
            1: _node(1, 0),  # GT divider
            2: _node(2, 5),
            3: _node(2, -5),
            4: _node(3, 5),
            5: _node(3, -5),
        },
        [(0, 1), (1, 2), (1, 3), (2, 4), (3, 5)],
    )
    pred = _build(
        {
            10: _node(0, 0),
            11: _node(1, 0),
            12: _node(2, 5),  # pred divider, one frame late
            13: _node(3, 5),
            14: _node(3, -5),
        },
        [(10, 11), (11, 12), (12, 13), (12, 14)],
    )
    _, _, _, div_tp, div_fp, div_fn = _counts(pred, gt)
    assert (div_tp, div_fp, div_fn) == (1, 0, 0)


def test_two_divisions_paired_independently() -> None:
    # Two separate divisions on far-apart lanes, both recovered -> tp=2.
    nodes = {
        0: _node(0, 0),
        1: _node(1, 0),
        2: _node(2, 5),
        3: _node(2, -5),
        4: _node(0, 100),
        5: _node(1, 100),
        6: _node(2, 105),
        7: _node(2, 95),
    }
    edges = [(0, 1), (1, 2), (1, 3), (4, 5), (5, 6), (5, 7)]
    gt = _build(nodes, edges)
    pred = _build({k + 10: v for k, v in nodes.items()}, [(u + 10, v + 10) for u, v in edges])
    assert _counts(pred, gt) == (6, 0, 0, 2, 0, 0)


# ---------------------------------------------------------------------------
# Edge-Jaccard unit tests, ported from the competition test_metrics.py.
# Every position is on the z=y=x axes; distances are Euclidean.
# ---------------------------------------------------------------------------


def _line(n: int) -> dict:
    return {i: {"t": i, "z": 0.0, "y": 0.0, "x": float(i)} for i in range(n)}


def test_perfect_prediction_scores_one() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    assert _edge_jaccard(pred, gt, 0.5) == pytest.approx(1.0)


def test_extra_edge_at_track_end_not_penalized() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(4), [(0, 1), (1, 2), (2, 3)])
    assert _edge_jaccard(pred, gt, 0.5) == pytest.approx(1.0)


def test_extra_edge_at_track_start_not_penalized() -> None:
    gt_nodes = {i: {"t": i, "z": 0.0, "y": 0.0, "x": float(i)} for i in range(1, 4)}
    gt = _build(gt_nodes, [(1, 2), (2, 3)])
    pred = _build(_line(4), [(0, 1), (1, 2), (2, 3)])
    assert _edge_jaccard(pred, gt, 0.5) == pytest.approx(1.0)


def test_spurious_edge_to_gt_interior_is_penalized() -> None:
    # GT: A(0) -> B(1) -> C(2); D is a far background node at t=1.
    base = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},  # A start
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},  # B interior
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},  # C end
    }
    d = {3: {"t": 1, "z": 100.0, "y": 100.0, "x": 100.0}}
    perfect = 2 / 3  # 2 / (2 + 1 FP)

    def pred(extra):
        return _build({**base, **d}, [(0, 1), (1, 2), extra])

    def gt():
        return _build(dict(base), [(0, 1), (1, 2)])

    assert _edge_jaccard(pred((3, 0)), gt(), 5.0) == pytest.approx(1.0)  # D->A (A in_deg 0)
    assert _edge_jaccard(pred((3, 1)), gt(), 5.0) == pytest.approx(perfect)  # D->B penalized
    assert _edge_jaccard(pred((3, 2)), gt(), 5.0) == pytest.approx(perfect)  # D->C penalized
    assert _edge_jaccard(pred((0, 3)), gt(), 5.0) == pytest.approx(perfect)  # A->D penalized
    assert _edge_jaccard(pred((1, 3)), gt(), 5.0) == pytest.approx(perfect)  # B->D penalized
    assert _edge_jaccard(pred((2, 3)), gt(), 5.0) == pytest.approx(1.0)  # C->D (C out_deg 0)


def test_missing_division_child_penalized() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 10.0, "x": 0.0},
        2: {"t": 1, "z": 0.0, "y": -10.0, "x": 0.0},
    }
    gt = _build(nodes, [(0, 1), (0, 2)])
    pred = _build(nodes, [(0, 1)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1 / 2)


def test_division_spurious_child_penalized() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 10.0, "x": 0.0},
        3: {"t": 2, "z": 0.0, "y": -10.0, "x": 0.0},
    }
    gt_edges = [(0, 1), (1, 2), (1, 3)]
    gt = _build(nodes, gt_edges)
    pred_nodes = {**nodes, 4: {"t": 2, "z": 100.0, "y": 100.0, "x": 100.0}}
    pred = _build(pred_nodes, [*gt_edges, (1, 4)])
    assert _edge_jaccard(pred, gt, 5.0) == pytest.approx(3 / 4)


def test_cross_track_interior_edge_penalized() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
        3: {"t": 0, "z": 0.0, "y": 50.0, "x": 0.0},
        4: {"t": 1, "z": 0.0, "y": 50.0, "x": 0.0},
        5: {"t": 2, "z": 0.0, "y": 50.0, "x": 0.0},
    }
    gt_edges = [(0, 1), (1, 2), (3, 4), (4, 5)]
    gt = _build(nodes, gt_edges)
    pred = _build(nodes, [*gt_edges, (1, 4)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(4 / 5)


def test_reparenting_node_penalized() -> None:
    gt = _build(
        {
            0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
            1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
            2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
        },
        [(0, 1), (1, 2)],
    )
    pred = _build(
        {
            3: {"t": 0, "z": 100.0, "y": 100.0, "x": 100.0},
            1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
            2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
        },
        [(3, 1), (1, 2)],
    )
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1 / 3)


def test_self_loops_on_interior_nodes_penalized() -> None:
    nodes = _line(5)
    gt_edges = [(i, i + 1) for i in range(4)]
    gt = _build(nodes, gt_edges)
    pred = _build(nodes, [*gt_edges, (1, 1), (2, 2), (3, 3)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(4 / 7)


def test_reverse_edge_at_boundary_invisible() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(nodes, [(0, 1)])
    pred = _build(nodes, [(0, 1), (1, 0)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1.0)


def test_dense_bipartite_cross_edges_penalized() -> None:
    nodes = {}
    for i in range(3):
        nodes[i] = {"t": 0, "z": 0.0, "y": float(i * 50), "x": 0.0}
        nodes[i + 3] = {"t": 1, "z": 0.0, "y": float(i * 50), "x": 0.0}
    gt = _build(nodes, [(i, i + 3) for i in range(3)])
    pred = _build(nodes, [(i, j + 3) for i in range(3) for j in range(3)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1 / 3)


def test_skip_connection_scores_zero() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 2)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(0.0)


def test_false_merge_into_interior_penalized() -> None:
    gt_nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(gt_nodes, [(0, 1), (1, 2)])
    pred = _build(
        {**gt_nodes, 3: {"t": 0, "z": 100.0, "y": 100.0, "x": 100.0}},
        [(0, 1), (1, 2), (3, 1)],
    )
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(2 / 3)


def test_false_merge_into_track_start_invisible() -> None:
    gt_nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(gt_nodes, [(0, 1), (1, 2)])
    pred = _build(
        {**gt_nodes, 3: {"t": 0, "z": 100.0, "y": 100.0, "x": 100.0}},
        [(0, 1), (1, 2), (3, 0)],
    )
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1.0)


def test_score_asymmetric_big_pred_vs_small_gt() -> None:
    small = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    big = {**small, 2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0}}
    assert _edge_jaccard(
        _build(big, [(0, 1), (1, 2)]), _build(small, [(0, 1)]), 1.0
    ) == pytest.approx(1.0)
    assert _edge_jaccard(
        _build(small, [(0, 1)]), _build(big, [(0, 1), (1, 2)]), 1.0
    ) == pytest.approx(0.5)


def test_unmatched_noise_edges_invisible() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(nodes, [(0, 1), (1, 2)])
    pred_nodes = dict(nodes)
    for i in range(20):
        pred_nodes[10 + i] = {"t": i % 3, "z": 500.0 + i, "y": 500.0 + i, "x": 500.0 + i}
    noise = [(10 + i, 10 + i + 1) for i in range(19)]
    pred = _build(pred_nodes, [(0, 1), (1, 2), *noise])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1.0)


def test_distance_threshold_inclusive() -> None:
    def two(y: float) -> dict:
        return {0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0}, 1: {"t": 1, "z": 0.0, "y": y, "x": 0.0}}

    gt = _build(two(0.0), [(0, 1)])
    assert _edge_jaccard(_build(two(14.0), [(0, 1)]), gt, 15.0) == pytest.approx(1.0)
    assert _edge_jaccard(_build(two(16.0), [(0, 1)]), gt, 15.0) == pytest.approx(0.0)


# ---------------------------------------------------------------------------
# Derived outputs: node recall, adjusted Jaccard, combined score.
# ---------------------------------------------------------------------------


def test_node_recall_and_num_pred_nodes() -> None:
    # GT track of 3 nodes; prediction matches 2 of them plus an extra background node.
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(
        {10: _node(0, 0), 11: _node(1, 0), 12: _node(5, 500)},
        [(10, 11)],
    )
    results, _ = run_metrics(gt, pred, PointMatcher(threshold=1.0), [SparseTrackingMetrics()])
    r = results[0]["results"]
    assert r["num_pred_nodes"] == 3
    assert r["node_recall"] == pytest.approx(2 / 3)  # 2 of 3 GT nodes matched


def test_adjusted_jaccard_nan_without_estimate() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    results, _ = run_metrics(gt, pred, PointMatcher(threshold=0.5), [SparseTrackingMetrics()])
    r = results[0]["results"]
    # Without n_gt_nodes the excess-node penalty is skipped: ratio and adjusted Jaccard
    # are NaN, but score falls back to the raw edge Jaccard so it stays usable.
    assert math.isnan(r["total_node_ratio"])
    assert math.isnan(r["adj_edge_jaccard"])
    assert r["edge_jaccard"] == pytest.approx(1.0)
    assert r["score"] == pytest.approx(1.0)


def test_adjusted_jaccard_penalizes_excess_nodes() -> None:
    # Perfect edges (jaccard 1.0), but 3 predicted nodes vs an estimate of 2 true nodes.
    gt = _build(_line(2), [(0, 1)])
    pred = _build(_line(3), [(0, 1), (1, 2)])  # extra node 2, edge (1,2) invisible -> jaccard 1.0
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=0.5), [SparseTrackingMetrics(n_gt_nodes=2)]
    )
    r = results[0]["results"]
    assert r["edge_jaccard"] == pytest.approx(1.0)
    assert r["total_node_ratio"] == pytest.approx((3 - 2) / 2)
    # adj = 1.0 * (1 - 0.1 * 0.5) = 0.95
    assert r["adj_edge_jaccard"] == pytest.approx(0.95)
    assert r["score"] == pytest.approx(0.95)  # no divisions -> division term dropped


def test_score_includes_division_term() -> None:
    # A graph with a division so division_jaccard is finite and enters the score.
    nodes = {0: _node(0, 0), 1: _node(1, 0), 2: _node(2, 5), 3: _node(2, -5)}
    edges = [(0, 1), (1, 2), (1, 3)]
    gt = _build(nodes, edges)
    pred = _build({k + 10: v for k, v in nodes.items()}, [(u + 10, v + 10) for u, v in edges])
    n_pred = pred.graph.number_of_nodes()
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=7.0), [SparseTrackingMetrics(n_gt_nodes=n_pred)]
    )
    r = results[0]["results"]
    assert r["division_jaccard"] == pytest.approx(1.0)
    # total_node_ratio == 0 -> adj == edge_jaccard; score = adj + 0.1 * division_jaccard
    assert r["adj_edge_jaccard"] == pytest.approx(r["edge_jaccard"])
    assert r["score"] == pytest.approx(r["adj_edge_jaccard"] + 0.1 * r["division_jaccard"])


def test_empty_prediction_scores_zero_edges() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    empty = TrackingGraph(
        nx.DiGraph(), frame_key="t", label_key=None, location_keys=("z", "y", "x")
    )
    results, _ = run_metrics(gt, empty, PointMatcher(threshold=1.0), [SparseTrackingMetrics()])
    r = results[0]["results"]
    assert (r["edge_tp"], r["edge_fp"], r["edge_fn"]) == (0, 0, 2)
    assert r["edge_jaccard"] == pytest.approx(0.0)


def test_relax_skips_warns_and_is_ignored() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    matched = PointMatcher(threshold=0.5).compute_mapping(gt, pred)
    with pytest.warns(UserWarning, match="does not support relaxing skip edges"):
        SparseTrackingMetrics()._compute(matched, relax_skips_gt=True)


def test_requires_distance_matcher() -> None:
    # A one-to-one matcher without a distance threshold fails validation in compute().
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    mapping = [(0, 0), (1, 1), (2, 2)]
    matched = Matched(gt, pred, mapping, {"name": "DummyMatcher", "matching type": "one-to-one"})
    with pytest.raises(TypeError, match="does not meet the requirements"):
        SparseTrackingMetrics().compute(matched)
    # Even bypassing validation, _compute needs a distance threshold to re-match divisions.
    with pytest.raises(TypeError, match="needs a distance matcher"):
        SparseTrackingMetrics()._compute(matched)


def test_invalid_constructor_args() -> None:
    with pytest.raises(ValueError, match="n_gt_nodes must be positive"):
        SparseTrackingMetrics(n_gt_nodes=0)
    with pytest.raises(ValueError, match="n_gt_nodes must be positive"):
        SparseTrackingMetrics(n_gt_nodes=-5)
    with pytest.raises(ValueError, match="must be non-negative"):
        SparseTrackingMetrics(division_weight=-0.1)
    with pytest.raises(ValueError, match="must be non-negative"):
        SparseTrackingMetrics(node_ratio_weight=-1.0)


# ---------------------------------------------------------------------------
# Dense/sparse capability marker.
# ---------------------------------------------------------------------------


def test_sparse_metric_marker() -> None:
    assert SparseTrackingMetrics.supports_sparse_gt is True
    assert SparseTrackingMetrics().supports_sparse_gt is True


@pytest.mark.parametrize(
    ("metric", "expected"),
    [
        (BasicMetrics(), False),
        (CTCMetrics(), False),
        (DivisionMetrics(), False),
        (CompleteTracks(), True),
        (CompleteTracksByLength(), True),
        (SparseTrackingMetrics(), True),
    ],
)
def test_supports_sparse_gt_values(metric, expected) -> None:
    assert metric.supports_sparse_gt is expected


def test_marker_surfaces_in_results() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    results, _ = run_metrics(gt, pred, PointMatcher(threshold=0.5), [SparseTrackingMetrics()])
    assert results[0]["metric"]["supports_sparse_gt"] is True


def test_dense_marker_surfaces_in_results() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    matched = PointMatcher(threshold=0.5).compute_mapping(gt, pred)
    result = BasicMetrics().compute(matched)
    assert result.to_dict()["metric"]["supports_sparse_gt"] is False
