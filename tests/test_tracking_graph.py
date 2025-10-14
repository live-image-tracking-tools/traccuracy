import re
from collections import Counter

import networkx as nx
import numpy as np
import pytest

import tests.examples.graphs as ex_graphs
from traccuracy import EdgeFlag, NodeFlag, TrackingGraph


@pytest.fixture
def nx_comp1():
    """Component 1: Y=1
    x
    3|
    2|         3 - 4
    1| 1 - 2 <
    0|         5
    ---------------------- t
       0   1   2   3
    """
    cells = [
        {"id": 1, "t": 0, "y": 1, "x": 1},
        {"id": 2, "t": 1, "y": 1, "x": 1, "tp_division": True},
        {"id": 5, "t": 2, "y": 1, "x": 0},
        {"id": 3, "t": 2, "y": 1, "x": 2},
        {"id": 4, "t": 3, "y": 1, "x": 2},
    ]

    edges = [
        {"source": 1, "target": 2, "tp": True},
        {"source": 2, "target": 5, "tp": False},
        {"source": 2, "target": 3},
        {"source": 3, "target": 4},
    ]
    graph = nx.DiGraph()
    graph.add_nodes_from([(cell["id"], cell) for cell in cells])
    graph.add_edges_from([(edge["source"], edge["target"], edge) for edge in edges])
    return graph


@pytest.fixture
def nx_comp1_seg():
    """Component 1: Y=1
    x
    3|
    2|         3 - 4
    1| 1 - 2 <
    0|         5
    ---------------------- t
       0   1   2   3
    """
    cells = [
        {"id": 1, "t": 0, "y": 1, "x": 1, "segmentation_id": 1},
        {"id": 2, "t": 1, "y": 1, "x": 1, "tp_division": True, "segmentation_id": 2},
        {"id": 5, "t": 2, "y": 1, "x": 0, "segmentation_id": 3},
        {"id": 3, "t": 2, "y": 1, "x": 2, "segmentation_id": 4},
        {"id": 4, "t": 3, "y": 1, "x": 2, "segmentation_id": 5},
    ]

    edges = [
        {"source": 1, "target": 2, "tp": True},
        {"source": 2, "target": 5, "tp": False},
        {"source": 2, "target": 3},
        {"source": 3, "target": 4},
    ]
    graph = nx.DiGraph()
    graph.add_nodes_from([(cell["id"], cell) for cell in cells])
    graph.add_edges_from([(edge["source"], edge["target"], edge) for edge in edges])
    return graph


@pytest.fixture
def nx_comp1_pos_list():
    """Component 1: Y=1
    x
    3|
    2|         3 - 4
    1| 1 - 2 <
    0|         5
    ---------------------- t
       0   1   2   3
    """
    cells = [
        {"id": 1, "t": 0, "pos": [1, 1]},
        {"id": 2, "t": 1, "pos": [1, 1], "tp_division": True},
        {"id": 5, "t": 2, "pos": [1, 0]},
        {"id": 3, "t": 2, "pos": [1, 2]},
        {"id": 4, "t": 3, "pos": [1, 2]},
    ]

    edges = [
        {"source": 1, "target": 3, "tp": True},
        {"source": 3, "target": 5, "tp": False},
        {"source": 3, "target": 3},
        {"source": 3, "target": 4},
    ]
    graph = nx.DiGraph()
    graph.add_nodes_from([(cell["id"], cell) for cell in cells])
    graph.add_edges_from([(edge["source"], edge["target"], edge) for edge in edges])
    return graph


@pytest.fixture
def nx_comp2():
    """Component 2: X=1
    id starts at 6
    y
    3|              9
    2|  6 - 7 - 8 <
    1|              10
    0|
    ---------------------- t
        0   1   2   3
    """
    cells = [
        {"id": 6, "t": 0, "y": 2, "x": 1},
        {"id": 7, "t": 1, "y": 2, "x": 1},
        {"id": 8, "t": 2, "y": 2, "x": 1, "tp_division": True},
        {"id": 10, "t": 3, "y": 1, "x": 1},
        {"id": 9, "t": 3, "y": 3, "x": 1},
    ]

    edges = [
        {"source": 6, "target": 7},
        {"source": 7, "target": 8},
        {"source": 8, "target": 10},
        {"source": 8, "target": 9},
    ]
    graph = nx.DiGraph()
    graph.add_nodes_from([(cell["id"], cell) for cell in cells])
    graph.add_edges_from([(edge["source"], edge["target"]) for edge in edges])
    return graph


@pytest.fixture
def nx_merge():
    """
    Start at 11
    11 - 12
            > 15 - 16
    13 - 14
    """
    cells = [
        {"id": 11, "t": 0, "x": 0, "y": 0},
        {"id": 12, "t": 1, "x": 0, "y": 0},
        {"id": 15, "t": 2, "x": 0, "y": 0},
        {"id": 16, "t": 3, "x": 0, "y": 0},
        {"id": 13, "t": 0, "x": 0, "y": 0},
        {"id": 14, "t": 1, "x": 0, "y": 0},
    ]

    edges = [
        {"source": 11, "target": 12},
        {"source": 12, "target": 15},
        {"source": 15, "target": 16},
        {"source": 13, "target": 14},
        {"source": 14, "target": 15},
    ]
    graph = nx.DiGraph()
    graph.add_nodes_from([(cell["id"], cell) for cell in cells])
    graph.add_edges_from([(edge["source"], edge["target"]) for edge in edges])
    return graph


@pytest.fixture
def merge_graph(nx_merge):
    return TrackingGraph(nx_merge, location_keys=("y", "x"))


@pytest.fixture
def simple_graph(nx_comp1):
    return TrackingGraph(nx_comp1, location_keys=("y", "x"))


@pytest.fixture
def complex_graph(nx_comp1, nx_comp2):
    return TrackingGraph(nx.compose(nx_comp1, nx_comp2), location_keys=("y", "x"))


@pytest.mark.parametrize(
    ("graph_name", "location_key"), [("nx_comp1", ("y", "x")), ("nx_comp1_pos_list", "pos")]
)
def test_constructor_and_get_location(graph_name, location_key, request):
    nx_graph = request.getfixturevalue(graph_name)
    tracking_graph = TrackingGraph(nx_graph, location_keys=location_key)
    assert tracking_graph.start_frame == 0
    assert tracking_graph.end_frame == 4
    assert tracking_graph.nodes_by_frame == {
        0: {1},
        1: {2},
        2: {5, 3},
        3: {4},
    }
    assert tracking_graph.get_location(3) == [1, 2]


def test_no_location(nx_comp1):
    tracking_graph = TrackingGraph(nx_comp1)
    assert tracking_graph.start_frame == 0
    assert tracking_graph.end_frame == 4
    assert tracking_graph.nodes_by_frame == {
        0: {1},
        1: {2},
        2: {5, 3},
        3: {4},
    }
    with pytest.raises(
        ValueError, match=re.escape("Must provide location key(s) to access node locations")
    ):
        tracking_graph.get_location("3")


def test_invalid_constructor(nx_comp1):
    # raise AssertionError if frame key not present or ValueError if overlaps
    # with reserved values
    with pytest.raises(AssertionError, match=r"Frame key .* not present for node .*."):
        TrackingGraph(nx_comp1, frame_key="f")
    with pytest.raises(ValueError):
        TrackingGraph(nx_comp1, frame_key=NodeFlag.CTC_FALSE_NEG)
    with pytest.raises(ValueError):
        TrackingGraph(nx_comp1, location_keys=NodeFlag.CTC_FALSE_NEG.value)
    with pytest.raises(AssertionError):
        TrackingGraph(nx_comp1, location_keys=["x", "y", "z"])
    with pytest.raises(ValueError):
        TrackingGraph(nx_comp1, location_keys=["x", NodeFlag.CTC_FALSE_NEG])
    with pytest.raises(AssertionError, match=r"Location key .* not present for node .*."):
        TrackingGraph(nx_comp1, location_keys="pos")


def test_constructor_seg(nx_comp1_seg):
    # empty segmentation for now, until we get paired seg and graph examples
    segmentation = np.zeros(shape=(5, 5, 5), dtype=np.uint16)
    tracking_graph = TrackingGraph(nx_comp1_seg, segmentation=segmentation)
    assert tracking_graph.start_frame == 0
    assert tracking_graph.end_frame == 4
    assert tracking_graph.nodes_by_frame == {
        0: {1},
        1: {2},
        2: {5, 3},
        3: {4},
    }

    # fails is label_key not specified
    with pytest.raises(ValueError, match="`label_key` must be set if `segmentation` is provided"):
        TrackingGraph(nx_comp1, segmentation=segmentation, label_key=None)

    # check that it fails on non-int values
    segmentation = segmentation.astype(np.float32)
    with pytest.raises(TypeError, match="Segmentation must have integer dtype, found float32"):
        TrackingGraph(nx_comp1, segmentation=segmentation)


def test_constructor_validate_false(nx_comp1):
    # Strip attributes except for id from nodes
    for node, attrs in nx_comp1.nodes.items():
        for key in list(attrs.keys()):
            del nx_comp1.nodes[node][key]

    # Validation error if defaults are kept
    with pytest.raises(AssertionError, match=r"Frame key .* not present for node .*"):
        TrackingGraph(nx_comp1)

    # If validation off, then it should raise another rando error
    with pytest.raises(Exception):  # noqa: B017
        TrackingGraph(nx_comp1, validate=False)


def test_validate_node():
    tg = TrackingGraph(nx.DiGraph(), location_keys=("y", "x"))
    node = 1

    # No frame
    attrs = {}
    with pytest.raises(AssertionError, match=r"Frame key .* not present for node .*"):
        tg._validate_node(node, attrs)

    # No location
    attrs = {tg.frame_key: 1}
    with pytest.raises(AssertionError, match=r"Location key .* not present for node .*."):
        tg._validate_node(node, attrs)

    # Not an int
    attrs = {**attrs, "x": 0, "y": 0}
    with pytest.raises(AssertionError, match=r"Node id of node .* is not an integer"):
        tg._validate_node(1.0, attrs)

    # Not positive
    with pytest.raises(AssertionError, match=r"Node id of node .* is not positive"):
        tg._validate_node(-1, attrs)

    # No label_key with segmentation
    tg = TrackingGraph(nx.DiGraph(), segmentation=np.zeros((5, 5), dtype="int"))
    with pytest.raises(AssertionError, match=r"Segmentation label key .* not present for node .*"):
        tg._validate_node(node, attrs)


def test_get_cells_by_frame(simple_graph):
    assert Counter(simple_graph.nodes_by_frame[0]) == Counter({1})
    assert Counter(simple_graph.nodes_by_frame[2]) == Counter([5, 3])
    # Test non-existent frame
    assert Counter(simple_graph.nodes_by_frame[5]) == Counter([])


def test_get_nodes_with_flag(simple_graph):
    assert Counter(simple_graph.get_nodes_with_flag(NodeFlag.TP_DIV)) == Counter([2])
    assert Counter(simple_graph.get_nodes_with_flag(NodeFlag.FP_DIV)) == Counter([])
    with pytest.raises(ValueError):
        assert simple_graph.get_nodes_with_flag("tp_division")


def test_get_edges_with_flag(simple_graph):
    assert Counter(simple_graph.get_edges_with_flag(EdgeFlag.TRUE_POS)) == Counter([(1, 2)])
    assert Counter(simple_graph.get_edges_with_flag(EdgeFlag.CTC_FALSE_NEG)) == Counter([])
    with pytest.raises(ValueError):
        assert simple_graph.get_nodes_with_flag("tp")


def test_get_divisions(complex_graph):
    assert complex_graph.get_divisions() == [2, 8]


def test_get_merges(merge_graph):
    assert merge_graph.get_merges() == [15]


def test_set_flag_on_node(simple_graph):
    assert simple_graph.nodes()[1] == {"id": 1, "t": 0, "y": 1, "x": 1}
    assert simple_graph.nodes()[2] == {
        "id": 2,
        "t": 1,
        "y": 1,
        "x": 1,
        "tp_division": True,
    }

    simple_graph.set_flag_on_node(1, NodeFlag.CTC_FALSE_POS, value=True)
    assert simple_graph.nodes()[1] == {
        "id": 1,
        "t": 0,
        "y": 1,
        "x": 1,
        NodeFlag.CTC_FALSE_POS: True,
    }
    assert 1 in simple_graph.nodes_by_flag[NodeFlag.CTC_FALSE_POS]

    simple_graph.set_flag_on_node(1, NodeFlag.CTC_FALSE_POS, value=False)
    assert simple_graph.nodes()[1] == {
        "id": 1,
        "t": 0,
        "y": 1,
        "x": 1,
        NodeFlag.CTC_FALSE_POS: False,
    }
    assert 1 not in simple_graph.nodes_by_flag[NodeFlag.CTC_FALSE_POS]

    simple_graph.set_flag_on_all_nodes(NodeFlag.CTC_FALSE_POS, value=True)
    for node in simple_graph.nodes:
        assert simple_graph.nodes[node][NodeFlag.CTC_FALSE_POS] is True
    assert Counter(simple_graph.nodes_by_flag[NodeFlag.CTC_FALSE_POS]) == Counter(
        list(simple_graph.nodes())
    )

    simple_graph.set_flag_on_all_nodes(NodeFlag.CTC_FALSE_POS, value=False)
    for node in simple_graph.nodes:
        assert simple_graph.nodes[node][NodeFlag.CTC_FALSE_POS] is False
    assert not simple_graph.nodes_by_flag[NodeFlag.CTC_FALSE_POS]

    with pytest.raises(ValueError):
        simple_graph.set_flag_on_node(1, "x", 2)


def test_remove_flag_from_node(simple_graph):
    flag = NodeFlag.CTC_FALSE_POS
    simple_graph.set_flag_on_all_nodes(flag)

    simple_graph.remove_flag_from_node(3, flag)
    assert flag not in simple_graph.graph.nodes[3]
    assert flag not in simple_graph.nodes_by_flag[flag]

    # Check that other nodes were unaffected
    for node in [1, 2, 5, 4]:
        assert flag in simple_graph.graph.nodes[node]
        assert node in simple_graph.nodes_by_flag[flag]

    # Error if flag not present
    with pytest.raises(KeyError, match=r".* not present on node .*"):
        simple_graph.remove_flag_from_node(3, NodeFlag.CTC_TRUE_POS)


def test_set_flag_on_edge(simple_graph):
    edge_id = (2, 3)
    assert EdgeFlag.TRUE_POS not in simple_graph.edges()[edge_id]

    simple_graph.set_flag_on_edge(edge_id, EdgeFlag.TRUE_POS, value=True)
    assert simple_graph.edges()[edge_id][EdgeFlag.TRUE_POS] is True
    assert edge_id in simple_graph.edges_by_flag[EdgeFlag.TRUE_POS]

    simple_graph.set_flag_on_edge(edge_id, EdgeFlag.TRUE_POS, value=False)
    assert simple_graph.edges()[edge_id][EdgeFlag.TRUE_POS] is False
    assert edge_id not in simple_graph.edges_by_flag[EdgeFlag.TRUE_POS]

    simple_graph.set_flag_on_all_edges(EdgeFlag.CTC_FALSE_POS, value=True)
    for edge in simple_graph.edges:
        assert simple_graph.edges[edge][EdgeFlag.CTC_FALSE_POS] is True
    assert Counter(simple_graph.edges_by_flag[EdgeFlag.CTC_FALSE_POS]) == Counter(
        list(simple_graph.edges)
    )

    simple_graph.set_flag_on_all_edges(EdgeFlag.CTC_FALSE_POS, value=False)
    for edge in simple_graph.edges:
        assert simple_graph.edges[edge][EdgeFlag.CTC_FALSE_POS] is False
    assert not simple_graph.edges_by_flag[EdgeFlag.CTC_FALSE_POS]

    with pytest.raises(ValueError):
        simple_graph.set_flag_on_edge((2, 3), "x", 2)


def test_remove_flag_from_edge(simple_graph):
    flag = EdgeFlag.CTC_FALSE_POS
    simple_graph.set_flag_on_all_edges(flag)

    # Check basic removal
    edge = (2, 3)
    simple_graph.remove_flag_from_edge(edge, flag)
    assert flag not in simple_graph.graph.edges[edge]
    assert edge not in simple_graph.edges_by_flag[flag]

    # Check other edges uneffected
    for edge in [(1, 2), (2, 5), (3, 4)]:
        assert flag in simple_graph.graph.edges[edge]
        assert edge in simple_graph.edges_by_flag[flag]

    # Error if flag not present
    with pytest.raises(KeyError, match=r".* not present on edge .*"):
        simple_graph.remove_flag_from_edge((1, 2), EdgeFlag.INTERTRACK_EDGE)


def test_get_tracklets(simple_graph):
    tracklets = simple_graph.get_tracklets()
    for tracklet in tracklets:
        start_nodes = [n for n, d in tracklet.in_degree() if d == 0]
        assert len(start_nodes) == 1
        end_nodes = [n for n, d in tracklet.out_degree() if d == 0]
        assert len(end_nodes)

        if start_nodes[0] == 1:
            assert end_nodes[0] == 2
        elif start_nodes[0] == 5:
            assert end_nodes[0] == 5
        elif start_nodes[0] == 3:
            assert end_nodes[0] == 4


def test_get_skip_edges(complex_graph):
    # no skip edges returns empty set
    assert len(complex_graph.get_skip_edges()) == 0

    # skip edge on simple path
    complex_graph.graph.remove_edges_from([(6, 7), (7, 8)])
    complex_graph.graph.add_edge(6, 8)
    skip_edges = complex_graph.get_skip_edges()
    assert len(skip_edges) == 1
    assert (6, 8) in skip_edges

    # skip edge on division
    complex_graph.graph.remove_edges_from([(2, 3), (3, 4)])
    complex_graph.graph.add_edge(2, 4)
    skip_edges = complex_graph.get_skip_edges()
    assert len(skip_edges) == 2
    assert (2, 4) in skip_edges


def test_clear_annotations():
    # Set up an annotated tracking graph
    tg = ex_graphs.basic_graph()
    tg.set_flag_on_all_nodes(NodeFlag.TRUE_POS)
    tg.set_flag_on_all_edges(EdgeFlag.TRUE_POS)
    tg.node_errors = True
    tg.edge_errors = True

    tg.clear_annotations()
    # Check node and edge attributes
    for attrs in tg.graph.nodes.values():
        assert set(attrs.keys()) == {"t", "y"}
    for attrs in tg.graph.edges.values():
        assert set(attrs.keys()) == set()

    # Check that annotation flags have been reset
    assert tg.node_errors is False
    assert tg.edge_errors is False

    # Check that the flag dictionaries are reset
    assert len(tg.nodes_by_flag[NodeFlag.TRUE_POS]) == 0
    assert len(tg.edges_by_flag[EdgeFlag.TRUE_POS]) == 0
