from __future__ import annotations

import warnings
from typing import TYPE_CHECKING, TypeVar

import numpy as np

from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._point import PointMatcher
from traccuracy.metrics._base import Metric

if TYPE_CHECKING:
    from collections.abc import Hashable

    import networkx as nx

    from traccuracy.matchers._matched import Matched

# Bipartite matching is used both for (gt division -> pred fork) node-id pairing and for
# (gt daughter lineage -> pred child-branch index) pairing, so it is generic in its key.
_MatchKey = TypeVar("_MatchKey", bound="Hashable")


class SparseWeightedEdgeDivisionJaccard(Metric):
    """Sparse Weighted Edge and Division Jaccard (SWEDJ) for *sparsely* annotated ground truth.

    Edge and division Jaccard for ground truth in which only a subset of the real cells
    are annotated. This is a traccuracy implementation of the scoring used by the
    `royerlab cell tracking competition
    <https://github.com/royerlab/kaggle-cell-tracking-competition>`_ (see that
    repository's ``metrics.md``). It is designed for ground truth in which only a
    subset of the real cells are annotated: predicted nodes and edges that have no
    ground truth counterpart are *ignored* rather than penalized as false positives,
    so a method is not punished for correctly tracking cells the annotator skipped.
    This is why :attr:`supports_sparse_gt` is ``True``.

    Nodes are matched one-to-one by centroid distance, which is what the
    :class:`~traccuracy.matchers.PointMatcher` computes, so this metric requires a
    ``PointMatcher`` matching. The matcher's ``threshold`` and ``scale_factor`` are
    reused for the per-division local re-matching described below.

    **Edge Jaccard.** A predicted edge ``(u, v)`` is a true positive when ``u`` and
    ``v`` are matched to ground truth nodes ``gu`` and ``gv`` that are themselves
    connected by a ground truth edge. A predicted edge is a false positive only when
    it is not a true positive *and* there is ground truth evidence against it: either
    the source is matched to a ground truth node with an outgoing edge, or the target
    is matched to a ground truth node with an incoming edge. Predicted edges with no
    such evidence (e.g. both endpoints unmatched, or matched to track ends/starts) are
    ignored. Every ground truth edge without a matching predicted edge is a false
    negative. ``edge_jaccard = TP / (TP + FP + FN)``.

    **Adjusted edge Jaccard.** To penalize excess predicted nodes, the edge Jaccard is
    scaled toward zero as the predicted node count exceeds a coarse estimate of the
    true node count (``n_gt_nodes``, which includes the unannotated cells)::

        total_node_ratio = (num_pred_nodes - n_gt_nodes) / n_gt_nodes
        adj_edge_jaccard = max(0, edge_jaccard * (1 - node_ratio_weight * total_node_ratio))

    When ``n_gt_nodes`` is not provided, ``total_node_ratio`` and ``adj_edge_jaccard``
    are ``NaN`` (the excess-node penalty is skipped) and the combined ``score`` falls
    back to the raw ``edge_jaccard`` term.

    **Division Jaccard.** Divisions are scored with a +/- 1 frame tolerance using a local
    window. For each ground truth dividing node (out-degree >= 2), the surrounding
    subgraph (parent, divider, children, grandchildren) is extracted and the prediction
    is re-matched against it locally. A predicted fork recovers a ground truth division
    (true positive) only under *directed local topology*: the fork or its immediate
    predecessor matches a ground truth parent-side node, and a bipartite matching
    associates the two ground truth daughter lineages with two *distinct* child branches
    of that same fork (the two supporting matches may fall at different timepoints, which
    absorbs the +/- 1 tolerance). Merely sharing a weakly connected component is not
    enough. Forks whose two child branches have nearest matched evidence in different
    ground truth connected components, or whose local branches merge, are rejected. A
    maximum-cardinality bipartite matching pairs each predicted fork with at most one
    ground truth division; unpaired ground truth divisions are false negatives. A
    predicted fork is a false positive if it was considered for a division, matches an
    annotated ground truth node, or is cross-component/merged, and is not itself a true
    positive. ``division_jaccard = TP / (TP + FP + FN)``, or ``NaN`` when there are no
    divisions anywhere.

    **Combined score.** ``score = adj_edge_jaccard + division_weight * division_jaccard``
    (or ``edge_jaccard`` in place of ``adj_edge_jaccard`` when ``n_gt_nodes`` is not
    given; the division term is dropped when there are no divisions). A single traccuracy
    metric is computed on one (prediction, ground truth) pair; the competition's
    dataset-level score micro-averages the per-pair counts, which the caller can do by
    summing the ``*_tp``/``*_fp``/``*_fn`` outputs across pairs before taking the
    Jaccard.

    Args:
        n_gt_nodes (float | None, optional): Coarse estimate of the total number of true
            nodes for this pair (including cells the ground truth does not annotate),
            used for the adjusted edge Jaccard. Must be positive if given. Defaults to
            None, which skips the excess-node penalty (the adjusted Jaccard is NaN and
            the combined score falls back to the raw edge Jaccard).
        division_weight (float, optional): Weight of the division Jaccard in the combined
            score. Defaults to 0.1.
        node_ratio_weight (float, optional): Coefficient of the excess-node penalty in
            the adjusted edge Jaccard. Defaults to 0.1.
        zero_division (float, optional): Value returned for a Jaccard with an empty
            denominator (no true positives, false positives or false negatives).
            Defaults to ``np.nan``.
    """

    # Unmatched predictions are never penalized, so the metric is valid on sparse GT.
    supports_sparse_gt = True

    def __init__(
        self,
        n_gt_nodes: float | None = None,
        division_weight: float = 0.1,
        node_ratio_weight: float = 0.1,
        zero_division: float = np.nan,
    ) -> None:
        """Initialize SWEDJ. See the class docstring for details."""
        super().__init__(valid_matches=["one-to-one"], zero_division=zero_division)
        if n_gt_nodes is not None and n_gt_nodes <= 0:
            raise ValueError(f"n_gt_nodes must be positive if provided, got {n_gt_nodes}")
        if division_weight < 0 or node_ratio_weight < 0:
            raise ValueError(
                "division_weight and node_ratio_weight must be non-negative, got "
                f"{division_weight} and {node_ratio_weight}"
            )
        self.n_gt_nodes = n_gt_nodes
        self.division_weight = division_weight
        self.node_ratio_weight = node_ratio_weight

    def _validate_matcher(self, matched: Matched) -> bool:
        """Verify the matcher is one-to-one *and* distance-based.

        Division scoring re-matches the prediction against each ground truth division
        subgraph by centroid distance, so the matcher must expose a distance
        ``threshold`` (as :class:`~traccuracy.matchers.PointMatcher` does). Going
        through ``_validate_matcher`` means the requirement honors the ``compute``
        ``override_matcher`` escape hatch, like every other metric.
        """
        return super()._validate_matcher(matched) and "threshold" in matched.matcher_info

    def _compute(
        self,
        matched: Matched,
        relax_skips_gt: bool = False,
        relax_skips_pred: bool = False,
    ) -> dict:
        """Compute the sparse edge and division Jaccard metrics.

        Args:
            matched (traccuracy.matchers.Matched): Matched data, produced by a
                :class:`~traccuracy.matchers.PointMatcher`.
            relax_skips_gt (bool): Ignored; the metric does not support relaxing skip
                edges and warns if this is set.
            relax_skips_pred (bool): Ignored; the metric does not support relaxing skip
                edges and warns if this is set.

        Returns:
            dict: Edge and division counts, per-pair Jaccards, ``num_pred_nodes``,
            ``node_recall``, ``total_node_ratio`` and ``adj_edge_jaccard`` (NaN unless
            ``n_gt_nodes`` was provided), and the combined ``score``.
        """
        if relax_skips_gt or relax_skips_pred:
            warnings.warn(
                "SparseWeightedEdgeDivisionJaccard does not support relaxing skip edges. "
                "Ignoring relax_skips_gt and relax_skips_pred.",
                stacklevel=2,
            )

        # The matcher is validated to expose a distance threshold in _validate_matcher,
        # but an override_matcher=True caller can bypass that, so guard explicitly.
        threshold = matched.matcher_info.get("threshold")
        if threshold is None:
            raise TypeError(
                "SparseWeightedEdgeDivisionJaccard re-matches divisions by centroid distance and "
                "needs a distance matcher exposing 'threshold' (e.g. PointMatcher)."
            )
        scale = matched.matcher_info.get("scale_factor")

        gt = matched.gt_graph
        pred = matched.pred_graph

        edge_tp, edge_fp, edge_fn = self._edge_counts(matched)
        edge_jaccard = self._jaccard(edge_tp, edge_fp, edge_fn)

        div_tp, div_fp, div_fn = self._division_counts(matched, threshold, scale)
        has_divisions = (div_tp + div_fp + div_fn) > 0
        # _jaccard already returns self.zero_division on an empty denominator, so this
        # is NaN (by default) when there are no divisions anywhere.
        division_jaccard = self._jaccard(div_tp, div_fp, div_fn)

        num_pred_nodes = pred.graph.number_of_nodes()
        num_gt_nodes = gt.graph.number_of_nodes()
        node_recall = len(matched.gt_pred_map) / num_gt_nodes if num_gt_nodes > 0 else float("nan")

        if self.n_gt_nodes is not None:
            total_node_ratio = (num_pred_nodes - self.n_gt_nodes) / self.n_gt_nodes
        else:
            total_node_ratio = float("nan")

        if not np.isnan(edge_jaccard) and not np.isnan(total_node_ratio):
            adj_edge_jaccard = max(
                0.0, edge_jaccard * (1 - self.node_ratio_weight * total_node_ratio)
            )
        else:
            adj_edge_jaccard = float("nan")

        # The combined score uses the adjusted edge Jaccard when an ``n_gt_nodes``
        # estimate is available; otherwise it falls back to the raw ``edge_jaccard`` so
        # the metric returns a usable score out of the box (``adj_edge_jaccard`` and
        # ``total_node_ratio`` stay NaN to signal the excess-node penalty was skipped).
        score_base = edge_jaccard if np.isnan(adj_edge_jaccard) else adj_edge_jaccard
        if has_divisions:
            score = score_base + self.division_weight * division_jaccard
        else:
            score = score_base

        return {
            "edge_tp": edge_tp,
            "edge_fp": edge_fp,
            "edge_fn": edge_fn,
            "edge_jaccard": edge_jaccard,
            "division_tp": div_tp,
            "division_fp": div_fp,
            "division_fn": div_fn,
            "division_jaccard": division_jaccard,
            "num_pred_nodes": num_pred_nodes,
            "node_recall": node_recall,
            "total_node_ratio": total_node_ratio,
            "adj_edge_jaccard": adj_edge_jaccard,
            "score": score,
        }

    def _jaccard(self, tp: int, fp: int, fn: int) -> float:
        """Return ``tp / (tp + fp + fn)``, or ``self.zero_division`` if the denominator is 0."""
        denom = tp + fp + fn
        return tp / denom if denom > 0 else float(self.zero_division)

    def _edge_counts(self, matched: Matched) -> tuple[int, int, int]:
        """Count true/false positive and false negative edges under the sparse rule.

        Predicted edges are first hardened against implausible topology (mirroring the
        competition): only strictly consecutive forward edges (``t_target == t_source + 1``)
        are scored, and a source keeps at most two outgoing edges (a division has at most
        two children), keeping the first two in insertion order. Backward, same-frame,
        gap-closing and surplus edges are dropped, not penalized.
        """
        gt_graph = matched.gt_graph.graph
        pred = matched.pred_graph
        pred_graph = pred.graph
        frame_key = pred.frame_key
        gt_num_edges = gt_graph.number_of_edges()

        kept: list[tuple[Hashable, Hashable]] = []
        out_kept: dict[Hashable, int] = {}
        for u, v in pred_graph.edges():
            if pred_graph.nodes[v][frame_key] - pred_graph.nodes[u][frame_key] != 1:
                continue
            if out_kept.get(u, 0) >= 2:
                continue
            out_kept[u] = out_kept.get(u, 0) + 1
            kept.append((u, v))

        if not kept:
            return 0, 0, gt_num_edges

        edge_tp = 0
        valid_pred = 0
        for u, v in kept:
            gu = matched.get_pred_gt_match(u)
            gv = matched.get_pred_gt_match(v)
            out_valid = gu is not None and gt_graph.out_degree(gu) >= 1
            in_valid = gv is not None and gt_graph.in_degree(gv) >= 1
            is_tp = gu is not None and gv is not None and gt_graph.has_edge(gu, gv)
            if is_tp:
                edge_tp += 1
            if out_valid or in_valid:
                valid_pred += 1

        edge_fp = valid_pred - edge_tp
        edge_fn = gt_num_edges - edge_tp
        return edge_tp, edge_fp, edge_fn

    def _division_counts(
        self,
        matched: Matched,
        threshold: float,
        scale: tuple[float, ...] | list[float] | None,
    ) -> tuple[int, int, int]:
        """Count true/false positive and false negative divisions.

        For each GT division, the prediction is re-matched locally against its
        parent/divider/children/grandchildren window. A candidate predicted fork must
        have *directed local topology*: the fork or its immediate predecessor matches a
        GT parent-side node, and matches from two GT daughter lineages lie on two
        distinct child branches of that fork. Forks whose child branches point at
        different GT connected components, or whose local branches merge, are rejected
        (computed from the global matching). A maximum-cardinality bipartite matching
        then pairs GT divisions with forks: paired divisions are true positives,
        unpaired GT divisions are false negatives. False positives are the set of
        predicted forks that were considered for a division, are matched onto an
        annotated GT node, or are cross-component/merged, minus the true-positive forks.
        """
        gt = matched.gt_graph
        pred = matched.pred_graph
        pred_graph = pred.graph
        pred_forks = set(pred.get_divisions())

        matcher = PointMatcher(threshold=threshold, scale_factor=scale)

        evaluable_forks, cross_component_forks, malformed_forks = self._pred_division_fork_sets(
            matched
        )
        invalid_forks = cross_component_forks | malformed_forks

        candidates: dict[Hashable, set[Hashable]] = {}
        considered: set[Hashable] = set()
        for divider in gt.get_divisions():
            sub_nodes = self._division_subgraph_nodes(gt, divider)
            gt_sub = self._subgraph_tracking_graph(gt, sub_nodes)
            local = matcher.compute_mapping(gt_sub, pred)
            grouped = self._matched_division_nodes(local, gt_sub, divider)
            if grouped is None:
                candidates[divider] = set()
                continue

            parent_ids, daughter_ids = grouped
            local_nodes = set(parent_ids)
            for parent_id in parent_ids:
                local_nodes.update(pred_graph.successors(parent_id))
            local_forks = local_nodes & pred_forks
            considered |= local_forks
            candidates[divider] = {
                fork
                for fork in local_forks - invalid_forks
                if self._fork_has_local_topology(pred_graph, fork, parent_ids, daughter_ids)
            }

        pairing = self._bipartite_max_matching(candidates)
        tp_forks = set(pairing.values())
        div_tp = len(pairing)
        div_fn = len(candidates) - div_tp
        fp_forks = (considered | evaluable_forks | invalid_forks) - tp_forks
        return div_tp, len(fp_forks), div_fn

    @staticmethod
    def _division_subgraph_nodes(tg: TrackingGraph, divider: Hashable) -> set[Hashable]:
        """Return the node ids of a division event: parent, divider, children, grandchildren."""
        graph = tg.graph
        parents = list(graph.predecessors(divider))
        children = list(graph.successors(divider))
        grandchildren = [gc for child in children for gc in graph.successors(child)]
        return {*parents, divider, *children, *grandchildren}

    @staticmethod
    def _subgraph_tracking_graph(tg: TrackingGraph, node_ids: set[Hashable]) -> TrackingGraph:
        """Build a TrackingGraph from the induced subgraph of *tg* on *node_ids*."""
        sub = tg.graph.subgraph(node_ids).copy()
        return TrackingGraph(
            sub,
            frame_key=tg.frame_key,
            label_key=None,
            location_keys=tg.location_keys,
            validate=False,
        )

    @staticmethod
    def _matched_division_nodes(
        local: Matched, gt_sub: TrackingGraph, divider: Hashable
    ) -> tuple[set[Hashable], list[set[Hashable]]] | None:
        """Group locally-matched prediction nodes by their role in a GT division window.

        Returns ``(parent_ids, daughter_ids)`` where *parent_ids* are prediction nodes
        matched to the GT divider or its immediate predecessor (grandparent), and
        *daughter_ids* is one set per GT child of prediction nodes matched to that child
        or its immediate successors (grandchildren). Returns None if there are fewer than
        two GT children, no parent-side match, or fewer than two daughter lineages hit.
        """
        node_to_gt = {pred_id: gts[0] for pred_id, gts in local.pred_gt_map.items()}
        if not node_to_gt:
            return None
        sub_graph = gt_sub.graph
        gt_children = list(sub_graph.successors(divider))
        if len(gt_children) < 2:
            return None

        gt_parent_ids = {divider, *sub_graph.predecessors(divider)}
        parent_ids = {p for p, g in node_to_gt.items() if g in gt_parent_ids}
        daughter_ids = [
            {p for p, g in node_to_gt.items() if g in {child, *sub_graph.successors(child)}}
            for child in gt_children
        ]
        if not parent_ids or sum(bool(ids) for ids in daughter_ids) < 2:
            return None
        return parent_ids, daughter_ids

    def _fork_has_local_topology(
        self,
        pred_graph: nx.DiGraph,
        pred_div: Hashable,
        parent_ids: set[Hashable],
        daughter_ids: list[set[Hashable]],
    ) -> bool:
        """Check a predicted fork's directed local topology against a GT division.

        The fork or its immediate predecessor must be a matched parent-side node, and a
        bipartite matching between the GT daughter lineages and the fork's own child
        branches (each a direct child plus its immediate successors) must associate at
        least two GT lineages with two *distinct* predicted branches. Merely sharing a
        weakly connected component is not sufficient.
        """
        pred_parent_ids = {pred_div, *pred_graph.predecessors(pred_div)}
        if pred_parent_ids.isdisjoint(parent_ids):
            return False

        pred_lineages = [
            {child, *pred_graph.successors(child)} for child in pred_graph.successors(pred_div)
        ]
        lineage_edges = {
            gt_lineage: {
                branch
                for branch, branch_ids in enumerate(pred_lineages)
                if not matched_ids.isdisjoint(branch_ids)
            }
            for gt_lineage, matched_ids in enumerate(daughter_ids)
        }
        return len(self._bipartite_max_matching(lineage_edges)) >= 2

    def _pred_division_fork_sets(
        self, matched: Matched
    ) -> tuple[set[Hashable], set[Hashable], set[Hashable]]:
        """Return (evaluable, cross-component, malformed) predicted forks from the global match.

        - *evaluable*: forks matched to an annotated GT node (out-degree >= 1) — these are
          judgeable, hence false-positive candidates.
        - *cross-component*: forks whose two distinct child branches have nearest matched
          evidence in different GT connected components (direct-child evidence takes
          precedence; an unmatched child may fall back to an unambiguous grandchild).
        - *malformed*: forks with a locally merged branch (a child with a parent other
          than the fork, or a grandchild with a parent other than its child).
        """
        gt_graph = matched.gt_graph.graph
        pred_graph = matched.pred_graph.graph
        pred_to_gt = {pred_id: gts[0] for pred_id, gts in matched.pred_gt_map.items()}
        pred_forks = {n for n in pred_graph.nodes if pred_graph.out_degree(n) >= 2}

        evaluable_forks = {
            fork
            for fork in pred_forks
            if fork in pred_to_gt and gt_graph.out_degree(pred_to_gt[fork]) >= 1
        }

        gt_component = self._gt_weak_component_ids(gt_graph)
        cross_component_forks: set[Hashable] = set()
        malformed_forks: set[Hashable] = set()
        for fork in pred_forks:
            branch_evidence: list[Hashable] = []
            malformed = False
            for child in pred_graph.successors(fork):
                component, is_malformed = self._branch_component_evidence(
                    pred_graph, fork, child, pred_to_gt, gt_component
                )
                if is_malformed:
                    malformed_forks.add(fork)
                    malformed = True
                    break
                if component is not None:
                    branch_evidence.append(component)
            if not malformed and len({*branch_evidence}) >= 2:
                cross_component_forks.add(fork)

        return evaluable_forks, cross_component_forks, malformed_forks

    @staticmethod
    def _gt_weak_component_ids(gt_graph: nx.DiGraph) -> dict[Hashable, Hashable]:
        """Map each GT node to a representative id of its weakly connected component."""
        component_ids: dict[Hashable, Hashable] = {}
        for seed in gt_graph.nodes:
            if seed in component_ids:
                continue
            component_ids[seed] = seed
            stack = [seed]
            while stack:
                current = stack.pop()
                for neighbor in (*gt_graph.successors(current), *gt_graph.predecessors(current)):
                    if neighbor not in component_ids:
                        component_ids[neighbor] = seed
                        stack.append(neighbor)
        return component_ids

    @staticmethod
    def _branch_component_evidence(
        pred_graph: nx.DiGraph,
        pred_div: Hashable,
        child: Hashable,
        pred_to_gt: dict[Hashable, Hashable],
        gt_component: dict[Hashable, Hashable],
    ) -> tuple[Hashable | None, bool]:
        """Return one GT component id for a predicted child branch, and a malformed flag.

        Direct-child evidence takes precedence over grandchildren so downstream errors do
        not invalidate a correctly matched division. Grandchildren are fallback evidence
        only when the child is unmatched. The boolean marks a locally merged branch that
        cannot be assigned uniquely to this fork.
        """
        if set(pred_graph.predecessors(child)) != {pred_div}:
            return None, True
        if child in pred_to_gt:
            return gt_component[pred_to_gt[child]], False

        grandchildren = list(pred_graph.successors(child))
        if any(set(pred_graph.predecessors(node)) != {child} for node in grandchildren):
            return None, True

        components = {
            gt_component[pred_to_gt[node]] for node in grandchildren if node in pred_to_gt
        }
        if len(components) == 1:
            return next(iter(components)), False
        return None, False

    @staticmethod
    def _bipartite_max_matching(
        candidates: dict[_MatchKey, set[_MatchKey]],
    ) -> dict[_MatchKey, _MatchKey]:
        """Maximum-cardinality bipartite matching over a left->candidates adjacency.

        Used both to pair ground truth divisions with predicted forks and to pair a
        ground truth division's daughter lineages with a fork's child branches. Returns
        only the matched pairs, so each right vertex is used at most once.

        Uses recursive augmenting-path search (matching the competition reference). The
        recursion depth is bounded by the number of left vertices, which is small in
        practice; datasets with many hundreds of heavily overlapping divisions could in
        principle approach Python's recursion limit.
        """
        match_right: dict[_MatchKey, _MatchKey] = {}
        match_left: dict[_MatchKey, _MatchKey] = {}

        def augment(left: _MatchKey, seen: set[_MatchKey]) -> bool:
            for right in candidates.get(left, ()):
                if right in seen:
                    continue
                seen.add(right)
                if right not in match_right or augment(match_right[right], seen):
                    match_left[left] = right
                    match_right[right] = left
                    return True
            return False

        for left in candidates:
            augment(left, set())
        return match_left
