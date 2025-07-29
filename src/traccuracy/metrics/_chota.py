import warnings
from collections import Counter

import networkx as nx
import numpy as np

from traccuracy.matchers._base import Matched
from traccuracy.metrics._base import MATCHING_TYPES, Metric


def _tracklets_graph(
    graph: nx.DiGraph,
    tracklets: list[nx.DiGraph],
    pred_track_ids: dict[int, int],
) -> nx.DiGraph:
    """
    Create a graph of tracklets.
    It's a compressed graph representation where each simple path (tracklet) is a node.

    Args:
        graph (nx.DiGraph): The original segments' graph.
        tracklets (list[nx.DiGraph]): A partition of the original segments' graph into tracklets.
        pred_track_ids (dict[int, int]): The mapping between nodes and tracklets.

    Returns:
        nx.DiGraph: The tracklets graph.
    """
    tracklet_graph: nx.DiGraph[int] = nx.DiGraph()
    seen = set()

    tracklet_graph.add_nodes_from(range(len(tracklets)))

    for tracklet in tracklets:
        for node in tracklet.nodes:
            for node_edge in graph.out_edges(node):
                tracklet_edge = (pred_track_ids[node_edge[0]], pred_track_ids[node_edge[1]])
                if tracklet_edge not in seen:
                    tracklet_graph.add_edge(*tracklet_edge)
                    seen.add(tracklet_edge)

    return tracklet_graph


def _assign_trajectories(
    tracklets_graph: nx.DiGraph,
) -> list[np.ndarray]:
    """
    For each tracklet, it creates a list of tracklets indicating if
    they are reachable by traversing backwards in time.

    Args:
        tracklets_graph (nx.DiGraph): The graph to assign trajectories to.

    Returns:
        list[np.ndarray]: The assigned trajectories.
    """
    # by default, each tracklet is only assigned to itself
    tracklet_assignments = [np.asarray([n], dtype=int) for n in tracklets_graph.nodes]

    for tracklet in tracklets_graph.nodes:
        trajectory_tracklets = list(nx.bfs_tree(tracklets_graph, tracklet).nodes) + list(
            nx.bfs_tree(tracklets_graph, tracklet, reverse=True).nodes
        )
        tracklet_assignments[tracklet] = np.asarray(trajectory_tracklets)

    return tracklet_assignments


class CHOTAMetric(Metric):
    """
    Cell Higher Order Tracking Accuracy.
    https://arxiv.org/pdf/2408.11571

    Reference implementation:
    https://github.com/CellTrackingChallenge/py-ctcmetrics/blob/main/ctc_metrics/metrics/hota/chota.py

    """

    def __init__(self) -> None:
        # many-to-many matches are an edge case, but they are allowed
        super().__init__(valid_matches=MATCHING_TYPES)

    def _compute(
        self,
        matched: Matched,
        relax_skips_gt: bool = False,
        relax_skips_pred: bool = False,
    ) -> dict[str, float]:
        """
        Compute the CHOTA metric.

        Args:
            matched (Matched): The matched data.
            relax_skips_gt (bool): Whether to relax skip edges in the ground truth.
            relax_skips_pred (bool): Whether to relax skip edges in the predicted.

        Returns:
            dict[str, float]: The CHOTA metric.
        """
        if relax_skips_gt or relax_skips_pred:
            warnings.warn(
                "CTC metrics do not support relaxing skip edges. "
                "Ignoring relax_skips_gt and relax_skips_pred.",
                stacklevel=2,
            )

        pred_tracklets = matched.pred_graph.get_tracklets(False)
        gt_tracklets = matched.gt_graph.get_tracklets(False)

        pred_track_ids = {}
        for i, tracklet in enumerate(pred_tracklets):
            for node in tracklet.nodes:
                pred_track_ids[node] = i

        gt_track_ids = {}
        for i, tracklet in enumerate(gt_tracklets):
            for node in tracklet.nodes:
                gt_track_ids[node] = i

        pred_tracklets_graph = _tracklets_graph(
            matched.pred_graph.graph, pred_tracklets, pred_track_ids
        )
        gt_tracklets_graph = _tracklets_graph(matched.gt_graph.graph, gt_tracklets, gt_track_ids)

        pred_tracklet_assignments = _assign_trajectories(pred_tracklets_graph)
        gt_tracklet_assignments = _assign_trajectories(gt_tracklets_graph)

        fp = len(matched.pred_graph.nodes) - len(matched.mapping)
        fn = len(matched.gt_graph.nodes) - len(matched.mapping)

        # repeated predicted matching are counted as false positives
        counter = Counter([pred_node_id for _, pred_node_id in matched.mapping])
        for v in counter.values():
            if v > 1:
                fp += v - 1

        # repeated ground truth matching are counted as false negatives
        counter = Counter([gt_node_id for gt_node_id, _ in matched.mapping])
        for v in counter.values():
            if v > 1:
                fn += v - 1

        print(f"{fp=} {fn=}")

        tracklets_overlap = np.zeros(
            (len(pred_tracklets), len(gt_tracklets)),
            dtype=int,
        )

        pred_tracklet_mask = np.zeros_like(tracklets_overlap, dtype=bool)
        gt_tracklet_mask = np.zeros_like(tracklets_overlap, dtype=bool)

        for gt_node, pred_node in matched.mapping:
            pred_track_id = pred_track_ids[pred_node]
            gt_track_id = gt_track_ids[gt_node]
            tracklets_overlap[pred_track_id, gt_track_id] += 1

        total_A_sigma = 0
        for i in range(len(pred_tracklets)):
            pred_tracklet_mask.fill(False)
            pred_tracklet_mask[pred_tracklet_assignments[i], :] = True
            pred_overlap_sum = tracklets_overlap[pred_tracklet_assignments[i], :].sum()

            for j in np.nonzero(tracklets_overlap[i, :])[0]:
                gt_tracklet_mask.fill(False)
                gt_tracklet_mask[:, gt_tracklet_assignments[j]] = True

                tpa = tracklets_overlap[pred_tracklet_mask & gt_tracklet_mask].sum()
                fpa = pred_overlap_sum - tpa
                fna = tracklets_overlap[:, gt_tracklet_assignments[j]].sum() - tpa

                tpa, fpa, fna = tpa.item(), fpa.item(), fna.item()
                print(f"{tpa=} {fpa=} {fna=}")

                A_sigma = tracklets_overlap[i, j] * tpa / (tpa + fpa + fna)
                total_A_sigma += A_sigma

        union = fp + fn + len(matched.mapping)

        print(f"{fp=} {fn=} {len(matched.mapping)=}")
        print(total_A_sigma, union)

        return {
            "CHOTA": np.sqrt(total_A_sigma / union).item(),
        }
