import networkx as nx

from traccuracy import TrackingGraph
from traccuracy.matchers import Matched


def full_graph(frame_key="t", location_keys=("y"), stagger=0):
    loc_key = location_keys[0]
    nodes = [
        # lineage 1
        (1, {frame_key: 0, loc_key: 0}),
        (2, {frame_key: 1, loc_key: 0}),
        (3, {frame_key: 2, loc_key: -1}),
        (4, {frame_key: 3, loc_key: -1}),
        (5, {frame_key: 4, loc_key: -1}),
        (6, {frame_key: 2, loc_key: 0}),
        (7, {frame_key: 3, loc_key: 0}),
        (8, {frame_key: 4, loc_key: 0}),
        # lineage 2
        (9, {frame_key: 0, loc_key: 1}),
        (10, {frame_key: 1, loc_key: 1}),
        (11, {frame_key: 2, loc_key: 1}),
        (12, {frame_key: 1, loc_key: 2}),
        (13, {frame_key: 2, loc_key: 2}),
        (14, {frame_key: 3, loc_key: 2}),
        (15, {frame_key: 4, loc_key: 1}),
        (16, {frame_key: 4, loc_key: 2}),
        # lineage 3/4
        (17, {frame_key: 0, loc_key: 4}),
        (18, {frame_key: 1, loc_key: 4}),
        (20, {frame_key: 2, loc_key: 3}),
        (21, {frame_key: 3, loc_key: 3}),
        (22, {frame_key: 4, loc_key: 3}),
        (23, {frame_key: 2, loc_key: 4}),
        (24, {frame_key: 3, loc_key: 4}),
        (25, {frame_key: 4, loc_key: 4}),
        (26, {frame_key: 3, loc_key: 5}),
        (27, {frame_key: 4, loc_key: 5}),
        # lineage 5
        (28, {frame_key: 0, loc_key: 6}),
        (29, {frame_key: 1, loc_key: 6}),
        (30, {frame_key: 2, loc_key: 6}),
    ]
    if stagger != 0:
        for _, attrs in nodes:
            attrs[loc_key] = attrs[loc_key] + stagger
    edges = [
        # lineage 1
        (1, 2),
        (2, 3),
        (3, 4),
        (4, 5),
        (2, 6),
        (6, 7),
        (7, 8),
        # lineage 2
        (9, 10),
        (10, 11),
        (9, 12),
        (12, 13),
        (13, 14),
        (14, 15),
        (14, 16),
        # lineage 3/4
        (17, 18),
        (18, 20),
        (20, 21),
        (21, 22),
        (18, 23),
        (23, 24),
        (24, 25),
        (23, 26),
        (26, 27),
        # lineage 5
        (28, 29),
        (29, 30),
    ]

    graph = nx.DiGraph()
    graph.add_nodes_from(nodes)
    graph.add_edges_from(edges)
    return graph


def larger_example_1(frame_key="t", location_keys=("y")) -> Matched:
    gt_missing_nodes = [5, 15, 28, 29, 30]
    # only need to add missing edges here if the nodes are there, otherwise removing
    # the nodes will remove the edges
    gt_missing_edges = [(18, 20)]
    gt = full_graph(frame_key=frame_key, location_keys=location_keys)
    gt.remove_nodes_from(gt_missing_nodes)
    gt.remove_edges_from(gt_missing_edges)

    # Pred nodes are relabeled to start at 30
    pred_missing_nodes = [40, 41, 47, 56, 57]
    pred_missing_edges = [(48, 53), (42, 43)]
    pred = full_graph(frame_key=frame_key, location_keys=location_keys, stagger=0.4)
    pred = nx.relabel_nodes(pred, {i: i + 30 for i in range(0, 31)})
    pred.remove_nodes_from(pred_missing_nodes)
    pred.remove_edges_from(pred_missing_edges)

    mapping = []
    for g_id in range(1, 28):
        p_id = g_id + 30
        if g_id in gt.nodes and p_id in pred.nodes:
            mapping.append((g_id, p_id))

    return Matched(
        TrackingGraph(gt, frame_key=frame_key, location_keys=location_keys),
        TrackingGraph(pred, frame_key=frame_key, location_keys=location_keys),
        mapping,
        {},
    )
