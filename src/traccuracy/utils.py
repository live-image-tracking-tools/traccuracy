from __future__ import annotations

import copy
import json
import os
from typing import TYPE_CHECKING, Any

import networkx as nx
import numpy as np
from geff import GeffMetadata, write

from traccuracy._tracking_graph import NodeFlag
from traccuracy.matchers._matched import Matched
from traccuracy.metrics._results import Results

if TYPE_CHECKING:
    from collections.abc import Hashable

    from traccuracy._tracking_graph import TrackingGraph


def get_equivalent_skip_edge(
    skip_other_matched: Matched,
    skip_src: Hashable,
    skip_dst: Hashable,
    matched_src: Hashable,
    matched_dst: Hashable,
) -> list[Hashable]:
    """Get path `matched_src ->...-> matched_dst` equivalent to `skip_src -> skip_dst`.

    A skip edge `skip_src -> skip_dst` is equivalent to a path connecting `matched_src` and
    `matched_dst` if:

    - `skip_src` is a valid match for `matched_src`,
    - `skip_dst` is a valid match for `matched_dst`,
    - `matched_src` is an ancestor of `matched_dst` (regardless of intervening nodes) AND
    - all nodes on the path `matched_src ->...-> matched_dst` have no valid matches in
        `skip_other_matched`.

    Args:
        skip_other_matched (traccuracy.matchers._base.Matched): Matched object mapping
            skip nodes to other nodes
        skip_src (Hashable): ID of source node of skip edge
        skip_dst (Hashable): ID of destination node of skip edge
        matched_src (Hashable): matched node of skip_src
        matched_dst (Hashable): matched node of skip_dst

    Returns:
        list[Hashable]: path from matched_src to matched_dst, or empty list if no such path.
    """
    if (skip_src, matched_src) not in skip_other_matched.mapping and (
        matched_src,
        skip_src,
    ) not in skip_other_matched.mapping:
        return []
    if (skip_dst, matched_dst) not in skip_other_matched.mapping and (
        matched_dst,
        skip_dst,
    ) not in skip_other_matched.mapping:
        return []
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

    # check if there's a path in other_graph from matched_src to matched_dst
    try:
        equivalent_path = nx.shortest_path(other_graph, matched_src, matched_dst)
    except nx.NetworkXNoPath:
        return []

    # equivalent path includes src and dst which we know are matched
    # check that no other nodes in the path have a match
    for path_node in equivalent_path[1:-1]:
        if path_node in other_skip_map:
            return []
    return equivalent_path


def get_corrected_division_graphs_with_delta(
    matched: Matched, frame_buffer: int = 0, relax_skip_edges: bool = False
) -> tuple[TrackingGraph, TrackingGraph]:
    """Returns copies of graphs with divisions corrected.

    All divisions corrected by a frame_buffer value less than or equal
    to the given frame buffer are marked as `TP_DIV`.

    Args:
        matched (traccuracy.matchers._base.Matched): Matched object for set of GT and Pred data.
            Must be annotated with division events.
        frame_buffer (int): Maximum frame buffer to use for division correction
        relax_skip_edges (bool): If True, will allow divisions that incorporate skip edges from
            parent to daughter

    Returns:
        tuple[traccuracy.TrackingGraph, traccuracy.TrackingGraph]: Tuple of corrected
            GT and Pred graphs
    """
    if not matched.gt_graph.division_annotations:
        raise ValueError("Ground truth graph must have divisions annotated.")
    if not matched.pred_graph.division_annotations:
        raise ValueError("Predicted graph must have divisions annotated.")
    corrected_gt_graph = copy.deepcopy(matched.gt_graph)
    corrected_pred_graph = copy.deepcopy(matched.pred_graph)

    # Need to copy to avoid issues with the set changing as we loop over it
    for node in copy.copy(corrected_gt_graph.get_nodes_with_flag(NodeFlag.FN_DIV)):
        if (
            corrected_gt_graph.graph.nodes[node].get(NodeFlag.MIN_BUFFER_CORRECT.value, np.nan)
            <= frame_buffer
        ):
            corrected_gt_graph.remove_flag_from_node(node, NodeFlag.FN_DIV)
            corrected_gt_graph.set_flag_on_node(node, NodeFlag.TP_DIV)
        elif (
            relax_skip_edges
            and corrected_gt_graph.graph.nodes[node].get(
                NodeFlag.MIN_BUFFER_CORRECT_SKIP.value, np.nan
            )
            <= frame_buffer
        ):
            corrected_gt_graph.remove_flag_from_node(node, NodeFlag.FN_DIV)
            corrected_gt_graph.set_flag_on_node(node, NodeFlag.TP_DIV)
    for node in copy.copy(corrected_pred_graph.get_nodes_with_flag(NodeFlag.FP_DIV)):
        if (
            corrected_pred_graph.graph.nodes[node].get(NodeFlag.MIN_BUFFER_CORRECT.value, np.nan)
            <= frame_buffer
        ):
            corrected_pred_graph.remove_flag_from_node(node, NodeFlag.FP_DIV)
            corrected_pred_graph.set_flag_on_node(node, NodeFlag.TP_DIV)
        elif (
            relax_skip_edges
            and corrected_pred_graph.graph.nodes[node].get(
                NodeFlag.MIN_BUFFER_CORRECT_SKIP.value, np.nan
            )
            <= frame_buffer
        ):
            corrected_pred_graph.remove_flag_from_node(node, NodeFlag.FP_DIV)
            corrected_pred_graph.set_flag_on_node(node, NodeFlag.TP_DIV)

    return corrected_gt_graph, corrected_pred_graph


def export_graphs_to_geff(
    out_zarr: str,
    matched: Matched,
    results: list[Results] | list[dict[str, Any]],
    target_frame_buffer: int = 0,
) -> None:
    """Export annotated tracking graphs as geffs along with a summary of traccuracy results

    Output file structure:
    out_zarr.zarr/
    ├── gt.geff
    ├── pred.geff
    └── traccuracy-results.json

    Args:
        out_zarr (str): Path to output zarr
        matched (traccuracy.matchers._base.Matched): Matched object containing
            annotated TrackingGraphs
        results ( list[traccuracy.metrics._results.Results] | list[dict[str, Any]): List of Results
            output by Metric.compute OR results objects as dictionary as returned by `run_metrics`
        target_frame_buffer (int, optional): If divisions are annotated, target_frame_buffer can
            be used to run `get_corrected_divisions_with_delta` in order to provide division
            annotations for a specific frame buffer. Defaults to 0.

    Raises:
        ValueError: matched argument must be an instance of `Matched`
        ValueError: results argument must be a list of Results or dictionary objects
        ValueError: Zarr already exists at out_zarr
        ValueError: Requested target frame buffer {target_frame_buffer} exceeds computed "
            "frame buffer {max_frame_buffer}
    """
    if not isinstance(matched, Matched):
        raise ValueError("matched argument must be an instance of `Matched`")

    if not isinstance(results, list):
        raise ValueError("results argument must be a list")

    if "~" in str(out_zarr):
        out_zarr = os.path.expanduser(str(out_zarr))

    # Check if zarr exists
    if os.path.exists(out_zarr):
        raise ValueError(f"Zarr already exists at {out_zarr}")

    res_dicts: list[dict[str, Any]] = []
    for res in results:
        if isinstance(res, Results):
            res_dicts.append(res.to_dict())
        elif isinstance(res, dict):
            res_dicts.append(res)
        else:
            raise ValueError("results argument must be a list of Results objects or dictionaries")

    # Check if divs in results and frame buffer is valid
    reannotate_div = False
    for res in res_dicts:
        if res["metric"]["name"] == "DivisionMetrics":
            max_frame_buffer = res["metric"]["frame_buffer"]
            if target_frame_buffer > max_frame_buffer:
                raise ValueError(
                    f"Requested target frame buffer {target_frame_buffer} exceeds computed "
                    f"frame buffer {max_frame_buffer}"
                )
            else:
                reannotate_div = True
                relaxed = res["metric"]["relax_skips_gt"] or res["metric"]["relax_skips_pred"]

    if reannotate_div:
        gt, pred = get_corrected_division_graphs_with_delta(
            matched, frame_buffer=target_frame_buffer, relax_skip_edges=relaxed
        )
    else:
        gt = matched.gt_graph
        pred = matched.pred_graph

    # Determine names of geffs
    gt_name = f"{gt.name}.geff" if gt.name else "gt.geff"
    pred_name = f"{pred.name}.geff" if pred.name else "pred.geff"

    # Write geffs
    for tg, name in zip([gt, pred], [gt_name, pred_name], strict=True):
        geff_path = os.path.join(out_zarr, name)
        axis_names = [tg.frame_key]
        if tg.location_keys is not None:
            axis_names.extend(tg.location_keys)
        write(
            graph=tg.graph,
            store=geff_path,
            axis_names=axis_names,
            axis_types=["time"] + ["space"] * (len(axis_names) - 1),  # type: ignore
        )
        # Update metadata for division flags with buffer
        if reannotate_div:
            meta = GeffMetadata.read(geff_path)
            for flag in [
                NodeFlag.TP_DIV,
                NodeFlag.TP_DIV_SKIP,
                NodeFlag.FP_DIV,
                NodeFlag.FN_DIV,
                NodeFlag.WC_DIV,
            ]:
                if flag in meta.node_props_metadata:  # type: ignore
                    meta.node_props_metadata[  # type: ignore
                        flag
                    ].description = f"Target frame buffer {target_frame_buffer}"
            meta.write(geff_path)

    # Write results json
    save_results_json(res_dicts, os.path.join(out_zarr, "traccuracy-results.json"))


def save_results_json(results: list[Results] | list[dict[str, Any]], out_path: str) -> None:
    """Save a list of results to a traccuracy export json

    Args:
        results (list[traccuracy.metrics._results.Results] | list[dict[str, Any]): List of either
            results dictionaries or results objects
        out_path (str): Path to save json file

    Raises:
        ValueError: out_path already exists
        ValueError: results argument must be a list of Results objects or dictionaries
        ValueError: results argument must be a list
    """
    if "~" in str(out_path):
        out_path = os.path.expanduser(str(out_path))

    if not isinstance(results, list):
        raise ValueError("results argument must be a list")

    if os.path.exists(out_path):
        raise ValueError(f"out_path {out_path} already exists")

    res_dicts: list[dict[str, Any]] = []
    for res in results:
        if isinstance(res, Results):
            res_dicts.append(res.to_dict())
        elif isinstance(res, dict):
            res_dicts.append(res)
        else:
            raise ValueError("results argument must be a list of Results objects or dictionaries")

    with open(out_path, mode="w") as f:
        json.dump({"traccuracy": res_dicts}, f)
