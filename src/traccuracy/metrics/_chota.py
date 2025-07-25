import warnings

import numpy as np
import networkx as nx

from sklearn.neighbors import VALID_METRICS
from traccuracy.matchers._base import Matched
from traccuracy.metrics._base import Metric


def _tracklets_graph(
    graph: nx.DiGraph,
    tracklets: list[nx.DiGraph],
    pred_track_ids: dict[int, int],
) -> nx.DiGraph:
    """
    Create a graph of tracklets.
    """
    graph = nx.DiGraph()
    seen = set()

    graph.add_nodes_from(range(len(tracklets)))

    for tracklet in tracklets:
        for node in tracklet.nodes:
            for neighbor in graph.out_edges(node):
                edge = (node, pred_track_ids[neighbor])
                if edge not in seen:
                    graph.add_edge(*edge)
                    seen.add(edge)
    
    return graph


def _assign_trajectories(
    tracklets_graph: nx.DiGraph,
) -> list[np.ndarray]:
    """
    For each tracklet, it creates a list of tracklets indicating if
    they are reachable by traversing backwards in time.

    Args:
        graph (nx.DiGraph): The graph to assign trajectories to.
        tracklets (list[nx.DiGraph]): The tracklets to assign trajectories to.

    Returns:
        list[np.ndarray]: The assigned trajectories.
    """
    # by default, each tracklet is only assigned to itself
    tracklet_assignments = [
        np.asarray([n], dtype=int)
        for n in tracklets_graph.nodes
    ]

    for tracklet in tracklets_graph.nodes:
        trajectory_tracklets = list(
            nx.bfs_tree(tracklets_graph, tracklet).nodes
        ) + list(
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
        super().__init__(valid_matches=VALID_METRICS)

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
            
        pred_tracklets_graph = _tracklets_graph(matched.pred_graph.graph, pred_tracklets, pred_track_ids)
        gt_tracklets_graph = _tracklets_graph(matched.gt_graph.graph, gt_tracklets, gt_track_ids)

        pred_tracklet_assignments = _assign_trajectories(pred_tracklets_graph)
        gt_tracklet_assignments = _assign_trajectories(gt_tracklets_graph)

        # this could be wrong if the mapping is not one-to-one
        fp = len(matched.pred_graph.nodes) - len(matched.mapping)
        fn = len(matched.gt_graph.nodes) - len(matched.mapping)

        # required because of the many-to-many mapping
        fp = max(fp, 0)
        fn = max(fn, 0)

        tracks_overlap = np.zeros(
            (len(pred_tracklets), len(gt_tracklets)), dtype=int,
        )

        pred_tracklet_mask = np.zeros_like(tracks_overlap, dtype=bool)
        gt_tracklet_mask = np.zeros_like(tracks_overlap, dtype=bool)

        for pred_node, gt_node in matched.mapping:
            pred_track_id = pred_track_ids[pred_node]
            gt_track_id = gt_track_ids[gt_node]
            tracks_overlap[pred_track_id, gt_track_id] += 1

        total_A_sigma = 0
        for i in range(len(pred_tracklets)):
            pred_tracklet_mask.fill(False)
            pred_tracklet_mask[pred_tracklet_assignments[i], :] = True

            for j in np.nonzero(tracks_overlap[i, :])[0]:
                gt_tracklet_mask.fill(False)
                gt_tracklet_mask[:, gt_tracklet_assignments[j]] = True

                tpa = np.sum(pred_tracklet_mask & gt_tracklet_mask)
                fpa = len(pred_tracklet_assignments[i]) - tpa
                fna = len(gt_tracklet_assignments[j]) - tpa

                A_sigma = tracks_overlap[i, j] * tpa / (tpa + fpa + fna)
                total_A_sigma += A_sigma
        
        union = fp + fn + len(matched.mapping)

        return {
            "CHOTA": np.sqrt(total_A_sigma / union).item(),
        }
