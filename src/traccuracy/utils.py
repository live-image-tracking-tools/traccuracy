from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Hashable

    from traccuracy.matchers._base import Matched


def is_equivalent_expanded_skip_edge(
    skip_other_matched: Matched,
    skip_src: Hashable,
    skip_dst: Hashable,
    matched_src: Hashable,
    matched_dst: Hashable,
) -> bool:
    """True if edge skip_src -> skip_dst is equivalent to edges matched_src ->...-> matched_dst.

    A skip edge skip_src -> skip_dst is equivalent to edges connecting matched_src and
    matched_dst if:
        - skip_src is a valid match for matched_src,
        - skip_dst is a valid match for matched_dst,
        - matched_src is an ancestor of matched_dst (regardless of intervening nodes),
        - all nodes on the path matched_src -> .. -> matched_dst have incoming and outgoing
        degrees of 1, AND
        - all nodes on the path matched_src -> .. -> matched_dst have no valid matches in
        skip_matched.

    Parameters
    ----------
    skip_other_matched : Matched
        Matched object containing mapping between skip nodes and other nodes
    skip_src : Hashable
        ID of source node of skip edge
    skip_dst : Hashable
        ID of destination node of skip edge
    other_src : Hashable
        matched node of skip_src
    other_dst : Hashable
        matched node of skip_dst
    """
    if (skip_src, matched_src) not in skip_other_matched.mapping and (
        matched_src,
        skip_src,
    ) not in skip_other_matched.mapping:
        return False
    if (skip_dst, matched_dst) not in skip_other_matched.mapping and (
        matched_dst,
        skip_dst,
    ) not in skip_other_matched.mapping:
        return False
    gt_graph = skip_other_matched.gt_graph.graph
    pred_graph = skip_other_matched.pred_graph.graph

    # figure out which graph contains the skip edge and which contains the matched "edge"
    # this allows us to run all remaining checks in one direction only
    skip_graph = gt_graph if (skip_src, skip_dst) in gt_graph.edges else pred_graph
    other_graph = pred_graph if skip_graph is gt_graph else gt_graph
    assert (skip_src, skip_dst) in skip_graph.edges, (
        "Couldn't determine which matched graph contains skip edge"
    )
    assert skip_graph != other_graph, (
        f"Couldn't determine which graph contains skip edge and which contains matched {'edge'}!r"
    )
    if skip_graph is gt_graph:
        other_skip_map = skip_other_matched.pred_gt_map
    else:
        other_skip_map = skip_other_matched.gt_pred_map

    # if matched_dst has incoming degree > 1, skip_edge is definitely not equivalent
    # (can only happen in graphs with merges, but we technically allow them)
    if other_graph.in_degree(matched_dst) > 1:  # type: ignore[operator]
        return False
    other_predecessors = list(other_graph.predecessors(matched_dst))
    while len(other_predecessors):
        other_pred = other_predecessors[0]
        if other_pred == matched_src:
            # we've traversed back to matched_src with all conditions met
            return True
        # otherwise we have to keep traversing
        # check that this predecessor doesn't have a match in skip graph
        if other_pred in other_skip_map:
            return False
        # check that this predecessor has incoming & outgoing degree of 1
        if other_graph.in_degree(other_pred) > 1 or other_graph.out_degree(other_pred) > 1:  # type: ignore[operator]
            return False
        other_predecessors = list(other_graph.predecessors(other_pred))
    # if we get here, matched_src is not an ancestor of matched_dst
    return False
