from __future__ import annotations

import warnings
from collections import Counter, deque
from typing import TYPE_CHECKING

import numpy as np

from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._point import PointMatcher
from traccuracy.metrics._base import Metric

if TYPE_CHECKING:
    from collections.abc import Hashable

    import networkx as nx

    from traccuracy.matchers._matched import Matched


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

    **Division Jaccard.** Divisions are scored with a +/- 1 frame tolerance. For each
    ground truth dividing node (out-degree >= 2), the surrounding subgraph
    (parent, divider, children, grandchildren) is extracted and the prediction is
    re-matched against it locally. A ground truth division is recovered (true positive)
    when a single weakly connected component of the prediction (a) has a matched node at
    a pre-split ("one-node-stage") timepoint, (b) touches both daughter lineages (at
    possibly different timepoints, which absorbs the +/- 1 tolerance), and (c) contains a
    predicted dividing node. A maximum-cardinality bipartite matching pairs each
    predicted fork with at most one ground truth division. A predicted fork whose
    (global) match lands on an annotated ground truth node but that is not paired to any
    ground truth division is a false positive. ``division_jaccard = TP / (TP + FP + FN)``,
    or ``NaN`` when there are no divisions anywhere.

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
        """Initialize the sparse tracking metrics. See class docstring for details."""
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
        """Count true/false positive and false negative edges under the sparse rule."""
        gt_graph = matched.gt_graph.graph
        pred_graph = matched.pred_graph.graph
        gt_num_edges = gt_graph.number_of_edges()

        if pred_graph.number_of_edges() == 0:
            return 0, 0, gt_num_edges

        edge_tp = 0
        valid_pred = 0
        for u, v in pred_graph.edges():
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

        True positives and false negatives come from a per-division local re-matching
        plus a bipartite pairing; false positives use the global matching, mirroring
        the competition reference implementation.
        """
        gt = matched.gt_graph
        pred = matched.pred_graph
        gt_graph = gt.graph
        pred_forks = set(pred.get_divisions())

        matcher = PointMatcher(threshold=threshold, scale_factor=scale)

        # For each GT division, locally re-match the prediction and collect the
        # predicted forks that could account for it.
        candidates: dict[Hashable, set[Hashable]] = {}
        for divider in gt.get_divisions():
            sub_nodes = self._division_subgraph_nodes(gt, divider)
            gt_sub = self._subgraph_tracking_graph(gt, sub_nodes)
            local = matcher.compute_mapping(gt_sub, pred)
            matched_pred_nodes = set(local.pred_gt_map.keys())

            div_candidates: set[Hashable] = set()
            for component, visited in self._weakly_connected_components(
                pred.graph, matched_pred_nodes
            ):
                if self._covers_division(local, gt_sub, divider, component):
                    div_candidates |= visited & pred_forks
            candidates[divider] = div_candidates

        pairing = self._bipartite_max_matching(candidates)
        div_tp = sum(1 for divider in candidates if divider in pairing)
        div_fn = len(candidates) - div_tp

        # False positives: predicted forks matched (globally) onto an annotated GT node
        # that are not paired to any GT division.
        matched_pred_divs = 0
        for fork in pred_forks:
            gt_node = matched.get_pred_gt_match(fork)
            if gt_node is not None and gt_graph.out_degree(gt_node) >= 1:
                matched_pred_divs += 1
        div_fp = max(0, matched_pred_divs - div_tp)

        return div_tp, div_fp, div_fn

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
    def _weakly_connected_components(
        graph: nx.DiGraph, node_ids: set[Hashable]
    ) -> list[tuple[set[Hashable], set[Hashable]]]:
        """Partition *node_ids* into weakly connected components of *graph*.

        Returns one ``(component, visited)`` pair per component, where ``component`` is
        the subset of *node_ids* in that component and ``visited`` is every graph node
        reachable from it (including unmatched intermediaries, so callers can find
        predicted forks sitting between matched nodes).
        """
        remaining = set(node_ids)
        components: list[tuple[set[Hashable], set[Hashable]]] = []
        while remaining:
            seed = next(iter(remaining))
            visited: set[Hashable] = {seed}
            component: set[Hashable] = {seed}
            queue: deque[Hashable] = deque([seed])
            while queue:
                current = queue.popleft()
                neighbors = list(graph.successors(current)) + list(graph.predecessors(current))
                for neighbor in neighbors:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)
                        if neighbor in remaining:
                            component.add(neighbor)
            components.append((component, visited))
            remaining -= component
        return components

    @staticmethod
    def _covers_division(
        local: Matched,
        gt_sub: TrackingGraph,
        divider: Hashable,
        component: set[Hashable],
    ) -> bool:
        """Check whether a predicted component recovers a ground truth division.

        Requires a matched prediction node at a pre-split (one-node-stage) timepoint and
        matched nodes touching at least two distinct daughter lineages of *divider*.
        """
        if not component:
            return False

        sub_graph = gt_sub.graph
        frame_key = gt_sub.frame_key
        time_counts = Counter(sub_graph.nodes[n][frame_key] for n in sub_graph.nodes)
        one_node_times = {t for t, count in time_counts.items() if count == 1}
        if not one_node_times:
            return False

        children = list(sub_graph.successors(divider))
        if len(children) < 2:
            return False
        lineages = [
            SparseWeightedEdgeDivisionJaccard._descendants(sub_graph, child) for child in children
        ]

        pred_graph = local.pred_graph.graph
        pred_frame_key = local.pred_graph.frame_key
        has_one_node_stage = False
        matched_gt_ids: set[Hashable] = set()
        for pred_node in component:
            gt_node = local.get_pred_gt_match(pred_node)
            if gt_node is None:
                continue
            matched_gt_ids.add(gt_node)
            if pred_graph.nodes[pred_node][pred_frame_key] in one_node_times:
                has_one_node_stage = True

        if not has_one_node_stage:
            return False
        lineages_covered = sum(1 for lineage in lineages if lineage & matched_gt_ids)
        return lineages_covered >= 2

    @staticmethod
    def _descendants(graph: nx.DiGraph, seed: Hashable) -> set[Hashable]:
        """Return *seed* and all nodes reachable from it going forward in time."""
        out: set[Hashable] = {seed}
        stack = [seed]
        while stack:
            for nxt in graph.successors(stack.pop()):
                if nxt not in out:
                    out.add(nxt)
                    stack.append(nxt)
        return out

    @staticmethod
    def _bipartite_max_matching(
        candidates: dict[Hashable, set[Hashable]],
    ) -> dict[Hashable, Hashable]:
        """Maximum-cardinality bipartite matching (GT division -> predicted fork).

        ``candidates`` maps each ground truth division to the predicted forks that could
        account for it. Returns only the matched pairs, so each predicted fork is
        credited to at most one ground truth division.

        Uses recursive augmenting-path search (matching the competition reference). The
        recursion depth is bounded by the number of ground truth divisions, which is
        small in practice; datasets with many hundreds of heavily overlapping divisions
        could in principle approach Python's recursion limit.
        """
        match_right: dict[Hashable, Hashable] = {}
        match_left: dict[Hashable, Hashable] = {}

        def augment(left: Hashable, seen: set[Hashable]) -> bool:
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
