"""Compare two matched `TrackingGraph`s, group every resulting divergence
into one "case", and produce a text report plus a GraphML + plot per case.

A case is a connected component of the graph formed by: every node/edge
traccuracy flagged as FP or FN (plus one tracklet neighbor on each side,
for context), union both graphs, plus an undirected "match" edge between
every pair of nodes the matcher paired up. That's exactly the graph each
case's plot is drawn from, so the report and the images always agree on
what a "case" is -- there's deliberately no further categorization
(shifted/swapped/missing-edge/etc.) on top; the plot shows the shape of
the divergence directly, which is clearer than naming it.
"""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

import networkx as nx

from traccuracy import EdgeFlag, NodeFlag, run_metrics
from traccuracy.matchers import PointMatcher
from traccuracy.metrics import BasicMetrics

if TYPE_CHECKING:
    from traccuracy import TrackingGraph
    from traccuracy.matchers._base import Matcher

GT_COLOR = "black"
PRED_COLOR = "tab:blue"
MATCH_COLOR = "grey"


def _error_node_ids(graph: nx.DiGraph, fp_fn_nodes, fp_fn_edges) -> set:
    """Nodes flagged FP or FN, plus each flagged node's immediate
    predecessor and successor in the full graph, for context."""
    nodes = set(fp_fn_nodes)
    for u, v in fp_fn_edges:
        nodes.add(u)
        nodes.add(v)
    for node_id in list(nodes):
        nodes.update(succ for _, succ in graph.out_edges(node_id))
        nodes.update(pred for pred, _ in graph.in_edges(node_id))
    return nodes


def _prefixed(sub: nx.DiGraph, source: str) -> nx.DiGraph:
    """Rename every node to `<source>:<original_id>`, keeping the original
    id and source label as attributes."""
    renamed = nx.relabel_nodes(sub, {n: f"{source}:{n}" for n in sub.nodes}, copy=True)
    for node_id, attrs in renamed.nodes(data=True):
        attrs["source"] = source
        attrs["source_id"] = node_id.split(":", 1)[1]
    return renamed


def _merged_graph_with_matches(gt_sub: nx.DiGraph, pred_sub: nx.DiGraph, mapping) -> nx.Graph:
    merged = nx.Graph()
    merged.add_nodes_from(gt_sub.nodes(data=True))
    merged.add_nodes_from(pred_sub.nodes(data=True))
    merged.add_edges_from(
        (u, v, {**d, "edge_type": "tracklet"}) for u, v, d in gt_sub.edges(data=True)
    )
    merged.add_edges_from(
        (u, v, {**d, "edge_type": "tracklet"}) for u, v, d in pred_sub.edges(data=True)
    )

    for gt_id, pred_id in mapping:
        gt_node, pred_node = f"gt:{gt_id}", f"pred:{pred_id}"
        if gt_node in merged and pred_node in merged:
            merged.add_edge(gt_node, pred_node, edge_type="match")

    return merged


def compare_lineages(
    gt_graph: TrackingGraph,
    pred_graph: TrackingGraph,
    gt_full_label: str,
    pred_full_label: str,
    matcher: Matcher | None = None,
) -> dict:
    """Match two `TrackingGraph`s and group every resulting divergence into
    cases (connected components of flagged nodes/edges + match edges --
    see module docstring).

    `gt_graph`/`pred_graph` are matched against each other with `matcher`
    (a `PointMatcher` with a default threshold of 5, if not given).
    `gt_full_label`/`pred_full_label` are their display names, used in the
    report and plot legends. "gt" (ground truth) and "pred" (prediction)
    are traccuracy's own terminology for the two sides of a matching --
    which one is passed as which doesn't change the comparison's content.

    Returns a dict with:
    - gt_full_label, pred_full_label: the display names passed in.
    - cases: list of `networkx.Graph`, one per divergence -- each node
      carries `source` ("gt"/"pred"), `source_id`, plus all of its
      original attributes (including the frame and location keys of its
      originating `TrackingGraph`); each edge carries `edge_type`
      ("tracklet" or "match").
    """
    if matcher is None:
        matcher = PointMatcher(threshold=5)
    _, matched = run_metrics(gt_graph, pred_graph, matcher=matcher, metrics=[BasicMetrics()])

    fp_nodes = pred_graph.get_nodes_with_flag(NodeFlag.FALSE_POS)
    fn_nodes = gt_graph.get_nodes_with_flag(NodeFlag.FALSE_NEG)
    fp_edges = pred_graph.get_edges_with_flag(EdgeFlag.FALSE_POS)
    fn_edges = gt_graph.get_edges_with_flag(EdgeFlag.FALSE_NEG)

    gt_ids = _error_node_ids(gt_graph.graph, fn_nodes, fn_edges)
    pred_ids = _error_node_ids(pred_graph.graph, fp_nodes, fp_edges)

    # pull in each side's matched counterpart too, even if it has no FP/FN
    # flag of its own -- otherwise a match edge has nothing to connect to.
    gt_ids |= {
        m
        for n in pred_ids
        if (m := matched.get_pred_gt_match(n)) is not None and m in gt_graph.graph
    }
    pred_ids |= {
        m
        for n in gt_ids
        if (m := matched.get_gt_pred_match(n)) is not None and m in pred_graph.graph
    }

    gt_sub = _prefixed(gt_graph.graph.subgraph(gt_ids).copy(), "gt")
    pred_sub = _prefixed(pred_graph.graph.subgraph(pred_ids).copy(), "pred")
    merged = _merged_graph_with_matches(gt_sub, pred_sub, matched.mapping)

    cases = [merged.subgraph(component).copy() for component in nx.connected_components(merged)]

    return {
        "gt_full_label": gt_full_label,
        "pred_full_label": pred_full_label,
        "cases": cases,
    }


def _case_summary(case_graph: nx.Graph, frame_key: str) -> str:
    """One line per case: each side's distinct node(s) and time range(s),
    e.g. `A: cell_1 [12-27]  B: cell_1 [12-25], cell_2 [12-25]`."""
    parts = []
    for source, tag in (("gt", "A"), ("pred", "B")):
        by_id: dict[str, list[int]] = {}
        for _, attrs in case_graph.nodes(data=True):
            if attrs["source"] == source:
                by_id.setdefault(attrs["source_id"], []).append(attrs[frame_key])
        ranges = ", ".join(
            f"{node_id} [{min(ts)}-{max(ts)}]" for node_id, ts in sorted(by_id.items())
        )
        if ranges:
            parts.append(f"{tag}: {ranges}")
    return "  ".join(parts)


def format_report(title: str, result: dict, frame_key: str = "t") -> str:
    cases = result["cases"]
    lines = [
        title,
        f"  A = {result['gt_full_label']}",
        f"  B = {result['pred_full_label']}",
        f"  {len(cases)} divergence(s) found." if cases else "  No divergences found.",
    ]
    # case numbers match the exported case_<n>.graphml/.png filenames (see
    # export_cases), so a reader can go straight from a report line to its plot.
    lines.extend(f"  [case {i}] {_case_summary(case, frame_key)}" for i, case in enumerate(cases))
    return "\n".join(lines) + "\n"


def _collapsed_coord(attrs: dict, location_keys: tuple[str, ...]) -> float:
    """Collapse the node's location keys into a single 1D plotting
    coordinate by summing them.

    Using a single axis alone can land two genuinely distinct nodes at the
    same plotted position if they only differ along another axis; summing
    all of them spreads out positions that are actually different in
    space, even if they happen to share one coordinate.
    """
    return sum(attrs[key] for key in location_keys)


def plot_case_graph(
    case_graph: nx.Graph,
    gt_full_label: str,
    pred_full_label: str,
    out_path: Path,
    frame_key: str = "t",
    location_keys: tuple[str, ...] = ("x", "y", "z"),
) -> None:
    """Plot a case's nodes (frame on x, location keys collapsed to a
    single plotting coordinate on y), gt in black and pred in blue,
    tracklet edges solid, and match edges dashed grey. Nodes at the same
    plotted position get a tiny offset so they don't fully overlap."""
    import matplotlib.pyplot as plt
    from matplotlib.patches import Patch

    colors = {"gt": GT_COLOR, "pred": PRED_COLOR}
    labels = {"gt": gt_full_label, "pred": pred_full_label}
    all_y = [_collapsed_coord(attrs, location_keys) for _, attrs in case_graph.nodes(data=True)]
    y_range = (max(all_y) - min(all_y)) if len(all_y) > 1 else 1.0
    y_offset = max(y_range, 1.0) * 0.03
    plot_dy = {"gt": -y_offset, "pred": y_offset}
    label_dy = {"gt": -max(y_range, 1.0) * 0.06, "pred": max(y_range, 1.0) * 0.06}

    def _pos(node_id):
        attrs = case_graph.nodes[node_id]
        return attrs[frame_key], _collapsed_coord(attrs, location_keys) + plot_dy[attrs["source"]]

    # Label only the earliest-timepoint node per (source, source_id) track --
    # labeling every node gets unreadable fast once a track spans many
    # timepoints.
    first_node_per_track: dict[tuple[str, str], str] = {}
    for node_id, attrs in sorted(case_graph.nodes(data=True), key=lambda item: item[1][frame_key]):
        key = (attrs["source"], attrs["source_id"])
        first_node_per_track.setdefault(key, node_id)
    label_nodes = set(first_node_per_track.values())

    n_timepoints = len({attrs[frame_key] for _, attrs in case_graph.nodes(data=True)})
    fig, ax = plt.subplots(figsize=(max(6, n_timepoints * 0.9), 4))
    for node_id, attrs in case_graph.nodes(data=True):
        color = colors[attrs["source"]]
        x, y = _pos(node_id)
        ax.scatter(x, y, color=color, zorder=3)
        if node_id in label_nodes:
            ax.text(
                x,
                y + label_dy[attrs["source"]],
                str(attrs["source_id"]),
                color=color,
                ha="center",
                va="center",
                fontsize=9,
            )

    for u, v, attrs in case_graph.edges(data=True):
        xs, ys = zip(_pos(u), _pos(v))
        if attrs["edge_type"] == "match":
            ax.plot(xs, ys, color=MATCH_COLOR, linestyle="dashed", zorder=1)
        else:
            ax.plot(xs, ys, color=colors[case_graph.nodes[u]["source"]], zorder=2)

    handles = [Patch(color=colors[s], label=labels[s]) for s in ("gt", "pred")]
    ax.legend(handles=handles, loc="best", fontsize=8)

    ax.set_xlabel(frame_key)
    ax.set_yticks([])
    ax.margins(x=0.3, y=0.3)
    fig.tight_layout()
    fig.savefig(out_path, dpi=150)
    plt.close(fig)


def export_cases(
    result: dict,
    output_dir: Path,
    frame_key: str = "t",
    location_keys: tuple[str, ...] = ("x", "y", "z"),
) -> int:
    """Write one GraphML + PNG per case in `result["cases"]` to `output_dir`."""
    output_dir.mkdir(parents=True, exist_ok=True)
    for i, case_graph in enumerate(result["cases"]):
        nx.write_graphml(case_graph, output_dir / f"case_{i}.graphml")
        plot_case_graph(
            case_graph,
            result["gt_full_label"],
            result["pred_full_label"],
            output_dir / f"case_{i}.png",
            frame_key=frame_key,
            location_keys=location_keys,
        )
    return len(result["cases"])
