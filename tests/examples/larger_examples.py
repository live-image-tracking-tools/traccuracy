import networkx as nx

from traccuracy import TrackingGraph
from traccuracy.matchers import Matched


def full_graph(frame_key="t", location_keys=("y"), remove_nodes=None, remove_edges=None, stagger=0):
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
    if remove_nodes is not None:
        graph.remove_nodes_from(remove_nodes)
    if remove_edges is not None:
        graph.remove_edges_from(remove_edges)

    return TrackingGraph(graph, frame_key=frame_key, location_keys=location_keys)


def larger_example_1() -> Matched:
    gt_missing_nodes = [5, 15, 28, 29, 30]
    # only need to add missing edges here if the nodes are there, otherwise removing
    # the nodes will remove the edges
    gt_missing_edges = [(18, 20)]
    pred_missing_nodes = [10, 11, 17, 26, 27]
    pred_missing_edges = [(18, 23), (12, 13)]
    gt = full_graph(remove_nodes=gt_missing_nodes, remove_edges=gt_missing_edges)
    pred = full_graph(remove_nodes=pred_missing_nodes, remove_edges=pred_missing_edges, stagger=0.4)
    mapping = []
    for i in range(1, 28):
        if i in gt.nodes and i in pred.nodes:
            mapping.append((i, i))
    return Matched(gt, pred, mapping, {})
