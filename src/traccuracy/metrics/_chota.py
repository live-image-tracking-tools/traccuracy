import logging
import warnings

import networkx as nx
import numpy as np

from traccuracy._tracking_graph import NodeFlag
from traccuracy.matchers._base import Matched
from traccuracy.metrics._base import MATCHING_TYPES, Metric
from traccuracy.metrics._ctc import evaluate_ctc_events

LOG = logging.getLogger(__name__)


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
        trajectory_tracklets = (
            list(nx.bfs_tree(tracklets_graph, tracklet).nodes)
            + list(nx.bfs_tree(tracklets_graph, tracklet, reverse=True).nodes)[1:]
        )  # avoiding including self twice
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
                "The CHOTA metric does not support relaxing skip edges. "
                "Ignoring relax_skips_gt and relax_skips_pred.",
                stacklevel=2,
            )

        pred_tracklets = matched.pred_graph.get_tracklets(False)
        gt_tracklets = matched.gt_graph.get_tracklets(False)

        # Construct mapping between node ids and the id of the tracklet that contains the node
        pred_track_ids = {}
        for i, tracklet in enumerate(pred_tracklets):
            for node in tracklet.nodes:
                pred_track_ids[node] = i

        gt_track_ids = {}
        for i, tracklet in enumerate(gt_tracklets):
            for node in tracklet.nodes:
                gt_track_ids[node] = i

        # Make a compressed graph where each tracklet becomes a node on the graph
        pred_tracklets_graph = _tracklets_graph(
            matched.pred_graph.graph, pred_tracklets, pred_track_ids
        )
        gt_tracklets_graph = _tracklets_graph(matched.gt_graph.graph, gt_tracklets, gt_track_ids)

        # required to compute the basic errors
        evaluate_ctc_events(matched)

        # count the number of false positives and false negatives nodes per tracklet
        tracklets_fp = np.zeros(len(pred_tracklets), dtype=int)
        tracklets_fn = np.zeros(len(gt_tracklets), dtype=int)

        fp_nodes = matched.pred_graph.get_nodes_with_flag(NodeFlag.CTC_FALSE_POS)
        for node in fp_nodes:
            pred_track_id = pred_track_ids[node]
            tracklets_fp[pred_track_id] += 1

        fn_nodes = matched.gt_graph.get_nodes_with_flag(NodeFlag.CTC_FALSE_NEG)
        for node in fn_nodes:
            gt_track_id = gt_track_ids[node]
            tracklets_fn[gt_track_id] += 1

        # For each tracklet, identify all tracklets that can be reached
        # by traversing backwards in time
        pred_tracklet_assignments = _assign_trajectories(pred_tracklets_graph)
        gt_tracklet_assignments = _assign_trajectories(gt_tracklets_graph)

        # counts the number of matched nodes that are shared between a pred and gt tracklets
        tracklets_overlap = np.zeros(
            (len(gt_tracklets), len(pred_tracklets)),
            dtype=int,
        )
        for gt_node, pred_node in matched.mapping:
            pred_track_id = pred_track_ids[pred_node]
            gt_track_id = gt_track_ids[gt_node]
            tracklets_overlap[gt_track_id, pred_track_id] += 1

        LOG.info("tracklets_overlap.sum()={}", tracklets_overlap.sum().item())
        LOG.info("tracklets_overlap.shape={}", tracklets_overlap.shape)

        pred_tracklet_mask = np.zeros_like(tracklets_overlap, dtype=bool)
        gt_tracklet_mask = np.zeros_like(tracklets_overlap, dtype=bool)

        total_A_sigma = 0
        for i in range(len(gt_tracklets)):
            gt_tracklet_mask.fill(False)
            # fills mask with all tracklets belonging to this trajectory
            gt_tracklet_mask[gt_tracklet_assignments[i], :] = True
            gt_overlap_sum = tracklets_overlap[gt_tracklet_assignments[i], :].sum()
            gt_overlap_sum += tracklets_fn[gt_tracklet_assignments[i]].sum()

            for j in np.nonzero(tracklets_overlap[i, :])[0]:
                # fills mask with all tracklets belonging to this trajectory
                pred_tracklet_mask.fill(False)
                pred_tracklet_mask[:, pred_tracklet_assignments[j]] = True
                pred_overlap_sum = tracklets_overlap[:, pred_tracklet_assignments[j]].sum()
                pred_overlap_sum += tracklets_fp[pred_tracklet_assignments[j]].sum()

                # number of overlaps between the two trajectories
                tpa = tracklets_overlap[pred_tracklet_mask & gt_tracklet_mask].sum()
                # number of false positives
                fpa = pred_overlap_sum - tpa
                # number of false negatives
                fna = gt_overlap_sum - tpa

                LOG.info(
                    "tracklets_overlap[i, j]={}, pred_overlap_sum={} gt_overlap_sum={}",
                    tracklets_overlap[i, j].item(),
                    pred_overlap_sum.item(),
                    gt_overlap_sum.item(),
                )
                LOG.info(
                    "tpa={} fpa={} fna={} pred_tracklet_size={} gt_tracklet_size={}",
                    tpa.item(),
                    fpa.item(),
                    fna.item(),
                    len(pred_tracklet_assignments[j]),
                    len(gt_tracklet_assignments[i]),
                )

                # (tpa / (tpa + fpa + fna)) is the intersection over union
                A_sigma = tracklets_overlap[i, j] * tpa / (tpa + fpa + fna)
                total_A_sigma += A_sigma

        fp = tracklets_fp.sum()
        fn = tracklets_fn.sum()

        union = fp + fn + len(matched.mapping)

        LOG.info("fp={} fn={} len(matched.mapping)={}", fp, fn, len(matched.mapping))
        LOG.info("total_A_sigma={} union={}", total_A_sigma, union)

        return {
            "CHOTA": np.sqrt(total_A_sigma / union).item(),
        }
