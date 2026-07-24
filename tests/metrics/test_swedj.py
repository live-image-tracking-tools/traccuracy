"""Tests for the sparse-ground-truth tracking metrics (SparseWeightedEdgeDivisionJaccard).

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
from traccuracy.metrics import SparseWeightedEdgeDivisionJaccard


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
        gt, pred, PointMatcher(threshold=max_distance), [SparseWeightedEdgeDivisionJaccard()]
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
        gt, pred, PointMatcher(threshold=max_distance), [SparseWeightedEdgeDivisionJaccard()]
    )
    return results[0]["results"]["edge_jaccard"]


# ---------------------------------------------------------------------------
# Edge + division parity on small hand-built graphs. The first nine cases are ported
# from the competition's own sandbox suite (tests/test_division_sandbox_examples.py),
# including the ``hack2`` weakly-connected-component exploit and the directed-topology
# regression cases; the last two are self-constructed. Each case is
# (gt_nodes, gt_edges, pred_nodes, pred_edges, expected (e_tp,e_fp,e_fn,d_tp,d_fp,d_fn),
# max_distance), with nodes as ``name -> (t, y)`` on the z=x=0 plane.
# ---------------------------------------------------------------------------

_GT_DIV_NODES = {
    "P": (0, 0.0),
    "D": (1, 0.0),
    "C1": (2, 5.0),
    "C2": (2, -5.0),
    "G1": (3, 5.0),
    "G2": (3, -5.0),
}
_GT_DIV_EDGES = [("P", "D"), ("D", "C1"), ("D", "C2"), ("C1", "G1"), ("C2", "G2")]

_SANDBOX_CASES: dict = {
    "perfect_division": (
        _GT_DIV_NODES,
        _GT_DIV_EDGES,
        _GT_DIV_NODES,
        _GT_DIV_EDGES,
        (5, 0, 0, 1, 0, 0),
        1.0,
    ),
    "missed_division": (
        _GT_DIV_NODES,
        _GT_DIV_EDGES,
        {"P": (0, 0.0), "D": (1, 0.0), "C1": (2, 5.0), "G1": (3, 5.0)},
        [("P", "D"), ("D", "C1"), ("C1", "G1")],
        (3, 0, 2, 0, 0, 1),
        1.0,
    ),
    "delayed_local_division": (
        _GT_DIV_NODES,
        _GT_DIV_EDGES,
        {"P": (0, 0.0), "D": (1, 0.0), "M": (2, 0.0), "G1": (3, 5.0), "G2": (3, -5.0)},
        [("P", "D"), ("D", "M"), ("M", "G1"), ("M", "G2")],
        (1, 3, 4, 1, 0, 0),
        1.0,
    ),
    "dummy_branch_same_lineage": (
        _GT_DIV_NODES,
        _GT_DIV_EDGES,
        {"P": (0, 0.0), "D": (1, 0.0), "C1": (2, 5.0), "X": (2, 50.0), "G2": (3, -5.0)},
        [("P", "D"), ("D", "C1"), ("D", "X"), ("C1", "G2")],
        (2, 2, 3, 0, 1, 1),
        1.0,
    ),
    "spurious_linear_division": (
        {"A": (0, 20.0), "B": (1, 20.0), "C": (2, 20.0)},
        [("A", "B"), ("B", "C")],
        {"A": (0, 20.0), "B": (1, 20.0), "C1": (2, 20.0), "C2": (2, 25.0)},
        [("A", "B"), ("B", "C1"), ("B", "C2")],
        (2, 1, 0, 0, 1, 0),
        1.0,
    ),
    "cross_component_children": (
        {"A0": (0, 0.0), "A1": (1, 0.0), "B0": (0, 20.0), "B1": (1, 20.0)},
        [("A0", "A1"), ("B0", "B1")],
        {"P": (0, 0.0), "C1": (1, 0.0), "C2": (1, 20.0)},
        [("P", "C1"), ("P", "C2")],
        (1, 1, 1, 0, 1, 0),
        1.0,
    ),
    "cross_component_grandchild_fallback": (
        {"A1": (1, 0.0), "A2": (2, 0.0), "B1": (1, 20.0), "B2": (2, 20.0)},
        [("A1", "A2"), ("B1", "B2")],
        {"F": (0, 10.0), "A": (1, 0.0), "U": (1, 40.0), "B": (2, 20.0)},
        [("F", "A"), ("F", "U"), ("U", "B")],
        (0, 1, 2, 0, 1, 0),
        1.0,
    ),
    "disconnected_daughter": (
        _GT_DIV_NODES,
        _GT_DIV_EDGES,
        _GT_DIV_NODES,
        [("P", "D"), ("D", "C1"), ("C1", "G1"), ("C2", "G2")],
        (4, 0, 1, 0, 0, 1),
        1.0,
    ),
    "hack2": (
        {
            "61": (1, 10.0),
            "62": (2, 10.0),
            "63": (3, 0.0),
            "64": (3, 20.0),
            "66": (4, 20.0),
            "98": (4, 0.0),
            "99": (1, -40.0),
            "100": (2, -40.0),
            "101": (3, -25.0),
            "102": (4, -25.0),
            "103": (3, -45.0),
            "104": (4, -45.0),
        },
        [
            ("61", "62"),
            ("62", "63"),
            ("62", "64"),
            ("64", "66"),
            ("63", "98"),
            ("99", "100"),
            ("100", "101"),
            ("101", "102"),
            ("100", "103"),
            ("103", "104"),
        ],
        {
            "105": (0, 15.0),
            "106": (2, 15.0),
            "107": (3, 30.0),
            "108": (3, 5.0),
            "109": (4, 5.0),
            "110": (4, 30.0),
            "114": (4, -20.0),
            "115": (3, -50.0),
            "116": (4, -50.0),
            "121": (5, -50.0),
            "122": (1, 55.0),
            "124": (2, 55.0),
            "130": (3, 55.0),
            "132": (1, 15.0),
            "153": (2, -35.0),
        },
        [
            ("106", "107"),
            ("108", "109"),
            ("107", "110"),
            ("115", "116"),
            ("116", "121"),
            ("122", "124"),
            ("124", "108"),
            ("124", "130"),
            ("130", "114"),
            ("105", "132"),
            ("132", "106"),
            ("105", "122"),
            ("122", "153"),
            ("106", "115"),
        ],
        (5, 4, 5, 0, 4, 2),
        10.0,
    ),
    # --- self-constructed ---
    # Two independent divisions on far-apart lanes: both recovered, paired 1:1.
    "self_two_divisions": (
        {
            "P": (0, 0.0),
            "D": (1, 0.0),
            "C1": (2, 5.0),
            "C2": (2, -5.0),
            "Q": (0, 100.0),
            "E": (1, 100.0),
            "K1": (2, 105.0),
            "K2": (2, 95.0),
        },
        [("P", "D"), ("D", "C1"), ("D", "C2"), ("Q", "E"), ("E", "K1"), ("E", "K2")],
        {
            "P": (0, 0.0),
            "D": (1, 0.0),
            "C1": (2, 5.0),
            "C2": (2, -5.0),
            "Q": (0, 100.0),
            "E": (1, 100.0),
            "K1": (2, 105.0),
            "K2": (2, 95.0),
        },
        [("P", "D"), ("D", "C1"), ("D", "C2"), ("Q", "E"), ("E", "K1"), ("E", "K2")],
        (6, 0, 0, 2, 0, 0),
        1.0,
    ),
    # Self-constructed shared-branch exploit: the fork's two matched daughters both sit on
    # its C1 branch (via C1 and its grandchild), while the second branch is a dummy far
    # node. Directed topology rejects it, so it is a division FP, not a TP.
    "self_shared_branch_exploit": (
        _GT_DIV_NODES,
        _GT_DIV_EDGES,
        {"P": (0, 0.0), "D": (1, 0.0), "C1": (2, 5.0), "GX": (3, -5.0), "Z": (2, 80.0)},
        [("P", "D"), ("D", "C1"), ("D", "Z"), ("C1", "GX")],
        (2, 2, 3, 0, 1, 1),
        1.0,
    ),
}


def _spec_graph(nodes: dict, edges: list) -> TrackingGraph:
    g = nx.DiGraph()
    ids = {}
    for name, (t, y) in nodes.items():
        ids[name] = len(ids)
        g.add_node(ids[name], t=int(t), z=0.0, y=float(y), x=0.0)
    for s, d in edges:
        g.add_edge(ids[s], ids[d])
    return TrackingGraph(g, frame_key="t", label_key=None, location_keys=("z", "y", "x"))


@pytest.mark.parametrize("name", sorted(_SANDBOX_CASES))
def test_edge_and_division_sandbox_parity(name: str) -> None:
    gt_n, gt_e, pred_n, pred_e, expected, md = _SANDBOX_CASES[name]
    gt = _spec_graph(gt_n, gt_e)
    pred = _spec_graph(pred_n, pred_e)
    assert _counts(pred, gt, md) == expected


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
    # GT: A(0) -> B(1) -> C(2); D is a far background node at t=1. Only edges spanning a
    # single forward step are scored; backward/same-frame edges are dropped.
    base = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},  # A start
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},  # B interior
        2: {"t": 2, "z": 0.0, "y": 0.0, "x": 0.0},  # C end
    }
    d = {3: {"t": 1, "z": 100.0, "y": 100.0, "x": 100.0}}
    penalized = 2 / 3  # 2 / (2 + 1 valid-timing FP)

    def pred(extra):
        return _build({**base, **d}, [(0, 1), (1, 2), extra])

    def gt():
        return _build(dict(base), [(0, 1), (1, 2)])

    assert _edge_jaccard(pred((3, 0)), gt(), 5.0) == pytest.approx(1.0)  # D->A backward: dropped
    assert _edge_jaccard(pred((3, 1)), gt(), 5.0) == pytest.approx(1.0)  # D->B same-frame: dropped
    assert _edge_jaccard(pred((3, 2)), gt(), 5.0) == pytest.approx(penalized)  # D->C fwd: penalized
    assert _edge_jaccard(pred((0, 3)), gt(), 5.0) == pytest.approx(penalized)  # A->D fwd: penalized
    assert _edge_jaccard(pred((1, 3)), gt(), 5.0) == pytest.approx(1.0)  # B->D same-frame: dropped
    assert _edge_jaccard(pred((2, 3)), gt(), 5.0) == pytest.approx(1.0)  # C->D backward: dropped


def test_missing_division_child_penalized() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 10.0, "x": 0.0},
        2: {"t": 1, "z": 0.0, "y": -10.0, "x": 0.0},
    }
    gt = _build(nodes, [(0, 1), (0, 2)])
    pred = _build(nodes, [(0, 1)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1 / 2)


def test_division_spurious_third_child_dropped_by_cap() -> None:
    # GT divides node 1 -> {2, 3}. Predicting a spurious 3rd child gives node 1 three
    # outgoing edges; the out-degree cap keeps the first two (the GT ones) and drops the
    # third, so the spurious child is invisible and the edge score stays 1.0.
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
    assert _edge_jaccard(pred, gt, 5.0) == pytest.approx(1.0)


def test_cross_track_edge_penalized_only_when_forward() -> None:
    # Two tracks A(0)->B(1)->C(2) and D(0)->E(1)->F(2). A same-frame cross-track edge
    # B->E is dropped (score 1.0); a forward cross-track edge B->F is a valid-timing FP.
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
    # B->E (1->4) is same-frame -> dropped -> 1.0
    assert _edge_jaccard(_build(nodes, [*gt_edges, (1, 4)]), gt, 1.0) == pytest.approx(1.0)
    # B->F (1->5) is a forward cross-track FP -> 4/(4+1+0) = 4/5
    assert _edge_jaccard(_build(nodes, [*gt_edges, (1, 5)]), gt, 1.0) == pytest.approx(4 / 5)


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


def test_self_loops_on_interior_nodes_dropped() -> None:
    # Self-loops are same-frame edges (Δt=0) -> dropped, not penalized -> score 1.0.
    nodes = _line(5)
    gt_edges = [(i, i + 1) for i in range(4)]
    gt = _build(nodes, gt_edges)
    pred = _build(nodes, [*gt_edges, (1, 1), (2, 2), (3, 3)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1.0)


def test_reverse_edge_at_boundary_invisible() -> None:
    nodes = {
        0: {"t": 0, "z": 0.0, "y": 0.0, "x": 0.0},
        1: {"t": 1, "z": 0.0, "y": 0.0, "x": 0.0},
    }
    gt = _build(nodes, [(0, 1)])
    pred = _build(nodes, [(0, 1), (1, 0)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(1.0)


def test_dense_bipartite_cross_edges_capped_by_id() -> None:
    # GT: A0->B0, A1->B1, A2->B2. Pred is the full 3x3 bipartite; each source has 3
    # forward edges, so the out-degree cap keeps its first two (insertion order) and
    # drops the third. A2's true edge A2->B2 is inserted last and dropped:
    # intersection=2, valid_pred=6, gt=3 -> 2/(3+6-2) = 2/7.
    nodes = {}
    for i in range(3):
        nodes[i] = {"t": 0, "z": 0.0, "y": float(i * 50), "x": 0.0}
        nodes[i + 3] = {"t": 1, "z": 0.0, "y": float(i * 50), "x": 0.0}
    gt = _build(nodes, [(i, i + 3) for i in range(3)])
    pred = _build(nodes, [(i, j + 3) for i in range(3) for j in range(3)])
    assert _edge_jaccard(pred, gt, 1.0) == pytest.approx(2 / 7)


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
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=1.0), [SparseWeightedEdgeDivisionJaccard()]
    )
    r = results[0]["results"]
    assert r["num_pred_nodes"] == 3
    assert r["node_recall"] == pytest.approx(2 / 3)  # 2 of 3 GT nodes matched


def test_adjusted_jaccard_nan_without_estimate() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=0.5), [SparseWeightedEdgeDivisionJaccard()]
    )
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
        gt, pred, PointMatcher(threshold=0.5), [SparseWeightedEdgeDivisionJaccard(n_gt_nodes=2)]
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
        gt,
        pred,
        PointMatcher(threshold=7.0),
        [SparseWeightedEdgeDivisionJaccard(n_gt_nodes=n_pred)],
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
    results, _ = run_metrics(
        gt, empty, PointMatcher(threshold=1.0), [SparseWeightedEdgeDivisionJaccard()]
    )
    r = results[0]["results"]
    assert (r["edge_tp"], r["edge_fp"], r["edge_fn"]) == (0, 0, 2)
    assert r["edge_jaccard"] == pytest.approx(0.0)


def test_relax_skips_warns_and_is_ignored() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    matched = PointMatcher(threshold=0.5).compute_mapping(gt, pred)
    with pytest.warns(UserWarning, match="does not support relaxing skip edges"):
        SparseWeightedEdgeDivisionJaccard()._compute(matched, relax_skips_gt=True)


def test_requires_distance_matcher() -> None:
    # A one-to-one matcher without a distance threshold fails validation in compute().
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    mapping = [(0, 0), (1, 1), (2, 2)]
    matched = Matched(gt, pred, mapping, {"name": "DummyMatcher", "matching type": "one-to-one"})
    with pytest.raises(TypeError, match="does not meet the requirements"):
        SparseWeightedEdgeDivisionJaccard().compute(matched)
    # Even bypassing validation, _compute needs a distance threshold to re-match divisions.
    with pytest.raises(TypeError, match="needs a distance matcher"):
        SparseWeightedEdgeDivisionJaccard()._compute(matched)


def test_invalid_constructor_args() -> None:
    with pytest.raises(ValueError, match="n_gt_nodes must be positive"):
        SparseWeightedEdgeDivisionJaccard(n_gt_nodes=0)
    with pytest.raises(ValueError, match="n_gt_nodes must be positive"):
        SparseWeightedEdgeDivisionJaccard(n_gt_nodes=-5)
    with pytest.raises(ValueError, match="must be non-negative"):
        SparseWeightedEdgeDivisionJaccard(division_weight=-0.1)
    with pytest.raises(ValueError, match="must be non-negative"):
        SparseWeightedEdgeDivisionJaccard(node_ratio_weight=-1.0)


# ---------------------------------------------------------------------------
# Dense/sparse capability marker (SWEDJ-specific; the general marker mechanism
# and the classification of the other metrics are covered in test_base.py).
# ---------------------------------------------------------------------------


def test_swedj_is_sparse_capable() -> None:
    assert SparseWeightedEdgeDivisionJaccard.supports_sparse_gt is True
    assert SparseWeightedEdgeDivisionJaccard().supports_sparse_gt is True


def test_swedj_marker_surfaces_in_results() -> None:
    gt = _build(_line(3), [(0, 1), (1, 2)])
    pred = _build(_line(3), [(0, 1), (1, 2)])
    results, _ = run_metrics(
        gt, pred, PointMatcher(threshold=0.5), [SparseWeightedEdgeDivisionJaccard()]
    )
    assert results[0]["metric"]["supports_sparse_gt"] is True
