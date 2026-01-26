import networkx as nx
import numpy as np
import pytest

import tests.examples.graphs as ex_graphs
from traccuracy._tracking_graph import TrackingGraph
from traccuracy.matchers._base import Matched
from traccuracy.metrics._cca import CellCycleAccuracy, _get_cumsum, _get_lengths


class TestCellCycleAccuracy:
    cca = CellCycleAccuracy()

    def get_multidiv_graph(self):
        """
                            6
                2 - 4 - 5 <
               /            7
        0 - 1 <
                3 - 8 - 9
        """

        node_attrs = {"x": 0, "y": 0, "z": 0}
        nodes, edges = [], []

        # Root nodes, doesn't count as a length
        nodes.extend([(0, {"t": 0, **node_attrs}), (1, {"t": 1, **node_attrs})])
        edges.append((0, 1))

        # First division
        nodes.extend([(2, {"t": 2, **node_attrs}), (3, {"t": 2, **node_attrs})])
        edges.extend([(1, 2), (1, 3)])

        # Extend one daughter by two nodes before dividing, length = 3
        nodes.extend(
            [
                (4, {"t": 3, **node_attrs}),
                (5, {"t": 4, **node_attrs}),
                (6, {"t": 5, **node_attrs}),
                (7, {"t": 5, **node_attrs}),
            ]
        )
        edges.extend([(2, 4), (4, 5), (5, 6), (5, 7)])

        # Extend other daughter by two w/o division
        nodes.extend(
            [
                (8, {"t": 3, **node_attrs}),
                (9, {"t": 4, **node_attrs}),
            ]
        )
        edges.extend([(3, 8), (8, 9)])

        G = nx.DiGraph()
        G.add_nodes_from(nodes)
        G.add_edges_from(edges)

        return TrackingGraph(G, location_keys=("x", "y", "z"))

    def get_multidiv_skip(self):
        track_graph = self.get_multidiv_graph()
        graph = track_graph.graph
        graph.remove_node(2)
        graph.add_edge(1, 4)
        return TrackingGraph(graph, location_keys=track_graph.location_keys)

    def get_singleton_node(self):
        G = nx.DiGraph()
        node_attrs = {"x": 0, "y": 0, "z": 0, "t": 0}
        G.add_nodes_from([(0, node_attrs)])
        return TrackingGraph(G, location_keys=["x", "y", "z"])

    def get_singleton_with_other_edge(self):
        G = nx.DiGraph()
        node_attrs = {"x": 0, "y": 0, "z": 0}
        G.add_nodes_from([(i, {**node_attrs, "t": i}) for i in range(3)])
        G.add_edge(1, 2)
        return TrackingGraph(G, location_keys=["x", "y", "z"])

    def test_get_subgraph_lengths(self):
        track_graph = self.get_multidiv_graph()
        lengths = _get_lengths(track_graph)
        exp_lengths = [3]
        assert exp_lengths == lengths

        # Test with a skip edge in the path
        track_graph = self.get_multidiv_skip()
        lengths = _get_lengths(track_graph)
        assert exp_lengths == lengths

        # Test graph without divisions
        track_graph = ex_graphs.basic_graph()
        lengths = _get_lengths(track_graph)
        # without two divisions no length
        assert len(lengths) == 0

        # Test graph with only one divisions
        track_graph = ex_graphs.basic_division_t0()
        lengths = _get_lengths(track_graph)
        # without two divisions no length
        assert len(lengths) == 0

        # Test singleton node with other unconnected edge
        track_graph = self.get_singleton_with_other_edge()
        lengths = _get_lengths(track_graph)
        # without two divisions no length
        assert len(lengths) == 0

        # Test singleton node
        track_graph = self.get_singleton_node()
        lengths = _get_lengths(track_graph)
        # without two divisions no length
        assert len(lengths) == 0

    def test_get_cumsum(self):
        lengths = [1, 3, 5, 5]
        cumsum = _get_cumsum(lengths, n_bins=6)
        # exp_hist = [0, 1, 0, 1, 2]
        exp_cumsum = np.array([0, 1, 1, 2, 2, 4]) / 4
        assert (cumsum == exp_cumsum).all()

    def test_compute(self):
        track_graph = self.get_multidiv_graph()
        straight_graph = ex_graphs.basic_graph()

        # Perfect match
        matched = Matched(track_graph, track_graph, mapping=[], matcher_info={})

        results = self.cca._compute(matched)
        assert results["CCA"] == 1

        # No match b/c no divs in gt
        matched = Matched(straight_graph, track_graph, mapping=[], matcher_info={})
        with pytest.raises(
            UserWarning, match="GT and pred data do not both contain complete cell cycles"
        ):
            results = self.cca._compute(matched)
            assert results["CCA"] == 0
