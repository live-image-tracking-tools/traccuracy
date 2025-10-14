from __future__ import annotations

import enum
import logging
from collections import defaultdict
from typing import TYPE_CHECKING, cast

import networkx as nx
import numpy as np

if TYPE_CHECKING:
    from collections.abc import Hashable

    from networkx.classes.reportviews import DiDegreeView, NodeView, OutEdgeView

logger = logging.getLogger(__name__)


@enum.unique
class NodeFlag(str, enum.Enum):
    """An enum containing standard flags that are used to annotate the nodes
    of a TrackingGraph. Note that the user specified frame and location
    attributes are also valid node attributes that will be stored on the graph
    and should not overlap with these values. Additionally, if a graph already
    has annotations using these strings before becoming a TrackingGraph,
    this will likely ruin metrics computation!
    """

    # True positive nodes as defined by CTC. Valid on gt and computed graphs.
    CTC_TRUE_POS = "ctc_tp"
    # False positive nodes as defined by CTC. Valid on computed graph.
    CTC_FALSE_POS = "ctc_fp"
    # False negative nodes as defined by CTC. Valid on gt graph.
    CTC_FALSE_NEG = "ctc_fn"
    # Non-split vertices as defined by CTC. Valid on computed graph
    # when many computed nodes can be matched to one gt node.
    NON_SPLIT = "ns"
    # True positive divisions. Valid on gt and computed graphs.
    TP_DIV = "tp_division"
    TP_DIV_SKIP = "tp_division_skip"
    # False positive divisions. Valid on computed graph.
    FP_DIV = "fp_division"
    # False negative divisions. Valid on gt graph.
    FN_DIV = "fn_division"
    # Wrong child division. Valid on gt and computed graph.
    WC_DIV = "wrong_child_division"

    TRUE_POS = "tp"
    FALSE_POS = "fp"
    FALSE_NEG = "fn"

    # Minimum buffer value that would correct a shifted division.
    MIN_BUFFER_CORRECT = "min_buffer_correct"
    # Minimum buffer value that would correct a shifted division
    # with skip edges allowed
    MIN_BUFFER_CORRECT_SKIP = "min_buffer_correct_skip"

    @classmethod
    def has_value(cls, value: str) -> bool:
        """Check if a value is one of the enum's values.
        This can be used to check if other graph annotation strings are
        colliding with our reserved strings.

        Args:
            value : Check if the enum contains this value.

        Returns:
            bool: True if the value is already in the enum's values,
                false otherwise
        """
        return value in cls.__members__.values()


def _check_valid_key_name(key: str, name: str) -> None:
    """Check if the provided key conflicts with the reserved NodeFlag values and raise
    a ValueError if so.

    Args:
        key (str): The key to check if it conflicts with the reserved values
        name (str): The name of key to use in the error message

    Raises:
        ValueError: if the provided key conflicts with the NodeFlag values
    """
    if NodeFlag.has_value(key):
        raise ValueError(
            f"Specified {name} key {key} is reserved for graph"
            f"annotation. Please change the {name} key."
        )


@enum.unique
class EdgeFlag(str, enum.Enum):
    """An enum containing standard flags that are used to
    annotate the edges of a TrackingGraph. If a graph already has
    annotations using these strings before becoming a TrackingGraph,
    this will likely ruin metrics computation!
    """

    # True positive edges. Valid on gt and computed graphs.
    TRUE_POS = "tp"
    # False positive edges as defined by CTC. Valid on computed graph.
    CTC_FALSE_POS = "ctc_fp"
    # False negative nodes as defined by CTC. Valid on gt graph.
    CTC_FALSE_NEG = "ctc_fn"
    # Edges between tracks as defined by CTC. Valid on gt and computed graphs.
    INTERTRACK_EDGE = "intertrack_edge"
    # Edges with wrong semantic as defined by CTC. Valid on computed graph.
    WRONG_SEMANTIC = "wrong_semantic"

    FALSE_POS = "fp"
    FALSE_NEG = "fn"

    SKIP_FALSE_POS = "skip_fp"
    SKIP_FALSE_NEG = "skip_fn"
    SKIP_TRUE_POS = "skip_tp"


class TrackingGraph:
    """A directed graph representing a tracking solution where edges go forward in time.

    Nodes represent cell detections and edges represent links between detections in the same track.
    Nodes in the graph must have an attribute that represents time frame (default to 't') and
    location (defaults to 'x' and 'y'). As in networkx, every cell must have a unique id, but these
    can be of any (hashable) type.

    Edges typically connect nodes across consecutive frames, but gap closing or frame
    skipping edges are valid, which connect nodes in frame t to nodes in frames beyond t+1.

    We provide common functions for accessing parts of the track graph, for example
    all nodes in a certain frame, or all previous or next edges for a given node.
    Additional functionality can be accessed by querying the stored networkx graph
    with native networkx functions.

    Currently it is assumed that the structure of the networkx graph as well as the
    time frame and location of each node is not mutated after construction,
    although non-spatiotemporal attributes of nodes and edges can be modified freely.

    Attributes:
        start_frame: int, the first frame with a node in the graph
        end_frame: int, the end of the span of frames containing nodes
            (one frame after the last frame that contains a node)
        nodes_by_frame: dict of int -> node_id
            Maps from frames to all node ids in that frame
        frame_key: str
            The name of the node attribute that corresponds to the frame of
            the node. Defaults to "t".
        location_keys: tuple of str | str | None
            Key(s) used to access the location of the cell in space.
    """

    def __init__(
        self,
        graph: nx.DiGraph[Hashable],
        segmentation: np.ndarray | None = None,
        frame_key: str = "t",
        label_key: str | None = "segmentation_id",
        location_keys: str | tuple[str, ...] | None = None,
        name: str | None = None,
        validate: bool = True,
    ):
        """A directed graph representing a tracking solution where edges go
        forward in time.

        If the provided graph already has annotations that are strings
        included in NodeFlags or EdgeFlags, this will likely ruin
        metric computation!

        Args:
            graph (networkx.DiGraph): A directed graph representing a tracking
                solution where edges go forward in time. If the graph already
                has annotations that are strings included in NodeFlags or
                EdgeFlags, this will likely ruin metrics computation!
                Node ids must be positive integers.
            segmentation (numpy-like array, optional): A numpy-like array of segmentations.
                The location of each node in tracking_graph is assumed to be inside the
                area of the corresponding segmentation. Defaults to None.
            frame_key (str, optional): The key on each node in graph that
                contains the time frameof the node. Every node must have a
                value stored at this key. Defaults to 't'.
            label_key (str, optional): The key on each node that denotes the
                pixel value of the node in the segmentation. Defaults to
                'segmentation_id'. Pass `None` if there is not a label
                attribute on the graph.
            location_keys (str | tuple, optional): The key or list of keys on each node
                in graph that contains the spatial location of the node, in the order
                needed to index the segmentation, if applicable. Every
                node must have a value stored at each of these provided keys.
                If a single string, it is assumed that the location is stored as a list
                or numpy array on each node. Defaults to ('x', 'y').
            name (str, optional): User specified name that will be included in result
                outputs associated with this object
            validate (bool, optional): Validate that nodes have required attributes: frame_key,
                location_key and label_key (if segmentation provided). Default = True.
        """
        if segmentation is not None and segmentation.dtype.kind not in ["i", "u"]:
            raise TypeError(f"Segmentation must have integer dtype, found {segmentation.dtype}")
        self.segmentation = segmentation

        if segmentation is not None and label_key is None:
            raise ValueError("`label_key` must be set if `segmentation` is provided")

        if NodeFlag.has_value(frame_key):
            raise ValueError(
                f"Specified frame key {frame_key} is reserved for graph "
                "annotation. Please change the frame key."
            )
        self.frame_key = frame_key

        if label_key is not None:
            _check_valid_key_name(label_key, "label")
        self.label_key = label_key

        if location_keys is not None:
            if isinstance(location_keys, str):
                _check_valid_key_name(location_keys, "location")
            else:
                for loc_key in location_keys:
                    _check_valid_key_name(loc_key, "location")
        self.location_keys = location_keys
        self.name = name

        self.graph = graph

        self._set_attrs(validate)

        # Store first and last frames for reference
        if len(self.nodes_by_frame) == 0:
            self.start_frame = None
            self.end_frame = None
        else:
            self.start_frame = min(self.nodes_by_frame.keys())
            self.end_frame = max(self.nodes_by_frame.keys()) + 1

    def _set_attrs(self, validate: bool) -> None:
        """Set TrackingGraph attributes that are dependent on the input graph or potentially
        changed during annotations

        Args:
            validate (bool): Validate that nodes have required attributes: frame_key,
                location_key and label_key (if segmentation provided).
        """

        # construct dictionaries from attributes to nodes/edges for easy lookup
        self.nodes_by_frame: defaultdict[int, set[Hashable]] = defaultdict(set)
        self.nodes_by_flag: dict[str, set[Hashable]] = {
            # We do not include MIN_BUFFER_CORRECT here, as it is not a boolean
            # "flag" but rather an integer. In future, if we decide to store
            # more "flags" that take on integer values, we may wish to make a
            # separate enum for them.
            flag.value: set()
            for flag in NodeFlag
            if flag != NodeFlag.MIN_BUFFER_CORRECT
        }
        self.edges_by_flag: dict[str, set[tuple[Hashable, Hashable]]] = {
            flag.value: set() for flag in EdgeFlag
        }

        for node, attrs in self.graph.nodes.items():
            node = cast("int", node)
            if validate:
                self._validate_node(node, attrs)

            # store node id in nodes_by_frame mapping
            frame = attrs[self.frame_key]
            if frame not in self.nodes_by_frame.keys():
                self.nodes_by_frame[frame] = {node}
            else:
                self.nodes_by_frame[frame].add(node)
            # store node id in nodes_by_flag mapping
            for node_flag in NodeFlag:
                if attrs.get(node_flag.value):
                    self.nodes_by_flag[node_flag.value].add(node)

        # store edge id in edges_by_flag
        for edge, attrs in self.graph.edges.items():
            for edge_flag in EdgeFlag:
                if attrs.get(edge_flag.value):
                    self.edges_by_flag[edge_flag.value].add(edge)

        # Record types of annotations that have been calculated
        self.division_annotations = False
        self.division_skip_gt_relaxed = False
        self.division_skip_pred_relaxed = False
        self.node_errors = False
        self.edge_errors = False
        self.skip_edges_gt_relaxed = False
        self.skip_edges_pred_relaxed = False

    def clear_annotations(self) -> None:
        """Resets a TrackingGraph by removing all traccuracy related annotations
        from the networkx graph

        Also resets any attributes on the TrackingGraph that are related to annotations
        """
        # Strip annotations from node
        for attrs in self.graph.nodes.values():
            for n_flag in NodeFlag:
                attrs.pop(n_flag.value, None)

        # Strip annotations from edges
        for attrs in self.graph.edges.values():
            for e_flag in EdgeFlag:
                attrs.pop(e_flag.value, None)

        # Reset attrs on graph
        self._set_attrs(
            validate=False,
        )

    def _validate_node(self, node: int, attrs: dict) -> None:
        """Check that every node has the time frame, location and seg_id (if needed) specified

        Args:
            node (int): Node id
            attrs (dict): Attributes extracted from the graph for the given node
        """
        assert self.frame_key in attrs.keys(), (
            f"Frame key {self.frame_key} not present for node {node}."
        )

        if self.location_keys is not None:
            if isinstance(self.location_keys, str):
                assert self.location_keys in attrs.keys(), (
                    f"Location key {self.location_keys} not present for node {node}."
                )
            else:
                for key in self.location_keys:
                    assert key in attrs.keys(), f"Location key {key} not present for node {node}."

        # seg id check
        if self.segmentation is not None:
            assert self.label_key in attrs.keys(), {
                f"Segmentation label key {self.label_key} not present for node {node}"
            }

        # Node ids must be positive integers
        assert np.issubdtype(type(node), np.integer), f"Node id of node {node} is not an integer"
        assert node >= 0, f"Node id of node {node} is not positive"

    @property
    def nodes(self) -> NodeView:
        """Get all the nodes in the graph, along with their attributes.

        Returns:
            NodeView: Provides set-like operations on the nodes as well as node attribute lookup.
        """
        return self.graph.nodes

    @property
    def edges(self) -> OutEdgeView:
        """Get all the edges in the graph, along with their attributes.

        Returns:
            OutEdgeView: Provides set-like operations on the edge-tuples as well as edge attribute
                lookup.
        """
        return self.graph.edges

    def get_location(self, node_id: Hashable) -> list[float] | tuple[float] | np.ndarray:
        """Get the spatial location of the node with node_id using self.location_keys.

        Args:
            node_id (hashable): The node_id to get the location of

        Returns:
            list of float: A list of location values in the same order as self.location_keys

        Raises:
            ValueError if location keys were not provided
        """
        if self.location_keys is None:
            raise ValueError("Must provide location key(s) to access node locations")
        if isinstance(self.location_keys, str):
            return self.graph.nodes[node_id][self.location_keys]
        else:
            return [self.graph.nodes[node_id][key] for key in self.location_keys]

    def get_nodes_with_flag(self, flag: NodeFlag) -> set[Hashable]:
        """Get all nodes with specified NodeFlag set to True.

        Args:
            flag (traccuracy.NodeFlag): the node flag to query for

        Returns:
            (List(hashable)): An iterable of node_ids which have the given flag
                and the value is True.
        """
        if not isinstance(flag, NodeFlag):
            raise ValueError(f"Function takes NodeFlag arguments, not {type(flag)}.")
        return self.nodes_by_flag[flag]

    def get_edges_with_flag(self, flag: EdgeFlag) -> set[tuple[Hashable, Hashable]]:
        """Get all edges with specified EdgeFlag set to True.

        Args:
            flag (traccuracy.EdgeFlag): the edge flag to query for

        Returns:
            (List(hashable)): An iterable of edge ids which have the given flag
                and the value is True.
        """
        if not isinstance(flag, EdgeFlag):
            raise ValueError(f"Function takes EdgeFlag arguments, not {type(flag)}.")
        return self.edges_by_flag[flag]

    def get_divisions(self) -> list[Hashable]:
        """Get all nodes that have at least two edges pointing to the next time frame

        Returns:
            list of hashable: a list of node ids for nodes that have more than one child
        """
        out_degree: DiDegreeView = self.graph.out_degree()  # type: ignore
        return [node for node, degree in out_degree if degree >= 2]

    def get_merges(self) -> list[Hashable]:
        """Get all nodes that have at least two incoming edges from the previous time frame

        Returns:
            list of hashable: a list of node ids for nodes that have more than one parent
        """
        in_degree: DiDegreeView = self.graph.in_degree()  # type: ignore
        return [node for node, degree in in_degree if degree >= 2]

    def set_flag_on_node(self, _id: Hashable, flag: NodeFlag, value: bool = True) -> None:
        """Set an attribute flag for a single node.
        If the id is not found in the graph, a KeyError will be raised.
        If the flag already exists, the existing value will be overwritten.

        Args:
            _id (Hashable): The node id on which to set the flag.
            flag (traccuracy.NodeFlag): The node flag to set. Must be
                of type NodeFlag - you may not not pass strings, even if they
                are included in the NodeFlag enum values.
            value (bool, optional): Flags can only be set to
                True or False. Defaults to True.

        Raises:
            KeyError if the provided id is not in the graph.
            ValueError if the provided flag is not a NodeFlag
        """
        if not isinstance(flag, NodeFlag):
            raise ValueError(
                f"Provided  flag {flag} is not of type NodeFlag. "
                "Please use the enum instead of passing string values."
            )
        self.graph.nodes[_id][flag.value] = value
        if value:
            self.nodes_by_flag[flag.value].add(_id)
        else:
            self.nodes_by_flag[flag.value].discard(_id)

    def remove_flag_from_node(self, _id: Hashable, flag: NodeFlag) -> None:
        """Removes a flag from a node

        Args:
            _id (Hashable): The node id for which to discard the flag.
            flag (NodeFlag): The node flag to discard. Must be
                of type NodeFlag - you may not not pass strings, even if they
                are included in the NodeFlag enum values.

        Raises:
            KeyError if the flag is not present on the node.
        """

        if flag.value not in self.graph.nodes[_id]:
            raise KeyError(f"Provided {flag} is not present on node {_id}.")

        del self.graph.nodes[_id][flag.value]
        self.nodes_by_flag[flag.value].discard(_id)

    def set_flag_on_all_nodes(self, flag: NodeFlag, value: bool = True) -> None:
        """Set an attribute flag for all nodes in the graph.
        If the flag already exists, the existing values will be overwritten.

        Args:
            flag (traccuracy.NodeFlag): The node flag to set. Must be
                of type NodeFlag - you may not not pass strings, even if they
                are included in the NodeFlag enum values.
            value (bool, optional): Flags can only be set to True or False.
                Defaults to True.

        Raises:
            ValueError if the provided flag is not a NodeFlag.
        """
        if not isinstance(flag, NodeFlag):
            raise ValueError(
                f"Provided  flag {flag} is not of type NodeFlag. "
                "Please use the enum instead of passing string values."
            )
        # Networkx typing seems to be incorrect for this function
        nx.set_node_attributes(self.graph, value, name=flag.value)  # type: ignore
        if value:
            self.nodes_by_flag[flag.value].update(self.graph.nodes)
        else:
            self.nodes_by_flag[flag.value] = set()

    def set_flag_on_edge(
        self, _id: tuple[Hashable, Hashable], flag: EdgeFlag, value: bool = True
    ) -> None:
        """Set an attribute flag for an edge.
        If the flag already exists, the existing value will be overwritten.

        Args:
            ids (tuple[Hashable]): The edge id or list of edge ids
                to set the attribute for. Edge ids are a 2-tuple of node ids.
            flag (traccuracy.EdgeFlag): The edge flag to set. Must be
                of type EdgeFlag - you may not pass strings, even if they are
                included in the EdgeFlag enum values.
            value (bool): Flags can only be set to True or False.
                Defaults to True.

        Raises:
            KeyError if edge with _id not in graph.
        """
        if not isinstance(flag, EdgeFlag):
            raise ValueError(
                f"Provided attribute {flag} is not of type EdgeFlag. "
                "Please use the enum instead of passing string values."
            )
        self.graph.edges[_id][flag.value] = value
        if value:
            self.edges_by_flag[flag.value].add(_id)
        else:
            self.edges_by_flag[flag.value].discard(_id)

    def remove_flag_from_edge(self, _id: tuple[Hashable, Hashable], flag: EdgeFlag) -> None:
        """Removes flag from a given edge

        Args:
            ids (tuple[Hashable]): The edge id or list of edge ids
                to discard the attribute for. Edge ids are a 2-tuple of node ids.
            flag (traccuracy.EdgeFlag): The edge flag to discard. Must be
                of type EdgeFlag - you may not pass strings, even if they are
                included in the EdgeFlag enum values.

        Raises:
            KeyError if edge with _id not in graph.
            KeyError if flag not present on edge
        """

        if flag not in self.graph.edges[_id]:
            raise KeyError(f"Flag {flag} not present on edge {_id}.")

        del self.graph.edges[_id][flag.value]
        self.edges_by_flag[flag.value].discard(_id)

    def set_flag_on_all_edges(self, flag: EdgeFlag, value: bool = True) -> None:
        """Set an attribute flag for all edges in the graph.
        If the flag already exists, the existing values will be overwritten.

        Args:
            flag (traccuracy.EdgeFlag): The edge flag to set. Must be
                of type EdgeFlag - you may not not pass strings, even if they
                are included in the EdgeFlag enum values.
            value (bool, optional): Flags can only be set to True or False.
                Defaults to True.

        Raises:
            ValueError if the provided flag is not an EdgeFlag.
        """
        if not isinstance(flag, EdgeFlag):
            raise ValueError(
                f"Provided  flag {flag} is not of type EdgeFlag. "
                "Please use the enum instead of passing string values, "
                "and add new attributes to the class to avoid key collision."
            )
        # Networkx typing seems to be incorrect for this function
        nx.set_edge_attributes(self.graph, value, name=flag.value)  # type: ignore
        if value:
            self.edges_by_flag[flag.value].update(self.graph.edges)
        else:
            self.edges_by_flag[flag.value] = set()

    def get_lineages(self) -> list[nx.DiGraph]:
        """Gets a list of new nx.DiGraph objects containing all lineages of the current graph.

        Lineage is defined as all connected components.
        """
        # Extract lineage and return as new nx graphs
        lineage_nodes = list(nx.weakly_connected_components(self.graph))
        # nx.DiGraph.subgraph is typed as a nx.Graph so we need to cast to nx.DiGraph
        return [cast("nx.DiGraph", self.graph.subgraph(g)) for g in lineage_nodes]

    def get_tracklets(self, include_division_edges: bool = False) -> list[nx.DiGraph]:
        """Gets a list of new nx.DiGraph objects containing all tracklets of the current graph.

        Tracklet is defined as all connected components between divisions (daughter to next
        parent). Tracklets can also start or end with a non-dividing cell.

        Args:
            include_division_edges (bool, optional): If True, include edges at division.

        """

        # Remove all intertrack edges from a copy of the original graph
        non_div_edges = []
        div_edges = []
        for edge in self.graph.edges:
            # New networkx typing issue that appeared in PR 305
            # TODO: maybe can remove the ignore in the future
            # When passing in a single node, output will be int
            out_degree = cast("int", self.graph.out_degree(edge[0]))  # type: ignore
            if not (out_degree > 1):
                non_div_edges.append(edge)
            else:
                div_edges.append(edge)

        no_div_subgraph = self.graph.edge_subgraph(non_div_edges)
        # Cast to a more specific type to satisfy weakly_connected_components
        no_div_subgraph = cast("nx.DiGraph", no_div_subgraph)

        # Extract subgraphs (aka tracklets) and return as new track graphs
        tracklets = list(nx.weakly_connected_components(no_div_subgraph))  # type: ignore

        # if a daughter had no successors, it would not be part of the
        # subgraph, so we need to add it back in as its own lonely tracklet
        for node in self.graph.nodes:
            if node not in no_div_subgraph.nodes:
                tracklets.append({node})

        if include_division_edges:
            # Add back intertrack edges
            for tracklet in tracklets:
                for parent, daughter in div_edges:
                    if daughter in tracklet:
                        tracklet.add(parent)

        # nx.DiGraph.subgraph is typed as a nx.Graph so we need to cast to nx.DiGraph
        return [cast("nx.DiGraph", self.graph.subgraph(g)) for g in tracklets]

    def get_skip_edges(self) -> set[tuple[Hashable, Hashable]]:
        """Get all edges that skip one or more frames.

        Returns:
            set of tuples: A set of edges that skip one or more frames.
                Each edge is represented as a tuple of (source_node, target_node).
        """
        return {edge for edge in self.graph.edges if self.is_skip_edge(edge)}

    def is_skip_edge(self, edge: tuple[Hashable, Hashable]) -> bool:
        source, target = edge
        return (
            self.graph.nodes[source][self.frame_key] + 1 != self.graph.nodes[target][self.frame_key]
        )
