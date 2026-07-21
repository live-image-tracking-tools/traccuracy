from __future__ import annotations

from collections import defaultdict
from itertools import pairwise
from typing import TYPE_CHECKING

import networkx as nx
import numpy as np

from traccuracy._tracking_graph import TrackingGraph

if TYPE_CHECKING:
    from collections.abc import Mapping, Sequence


def load_napari_data(
    data: np.ndarray,
    graph: Mapping[int, Sequence[int]] | None = None,
    properties: Mapping[str, Sequence] | None = None,
    segmentation: np.ndarray | None = None,
    seg_id_key: str | None = None,
    name: str | None = None,
) -> TrackingGraph:
    """Load a napari Tracks layer into a TrackingGraph.

    A napari Tracks layer stores one row per detection in ``data`` with columns
    ``[track_id, t, (z), y, x]``, and encodes track lineage in ``graph`` as
    ``{child_track_id: [parent_track_id, ...]}``. This loader turns that into a
    :class:`~traccuracy.TrackingGraph` so it can be matched/evaluated, mirroring
    :func:`load_point_data` but for the in-memory napari format.

    Edges are built two ways: consecutive detections of the same ``track_id``
    (ordered by time) are connected, and each parent track's last detection is
    connected to each child track's first detection from ``graph``.

    This function takes plain arrays/dicts (the ``.data`` / ``.graph`` /
    ``.properties`` of a napari Tracks layer) rather than a layer object, so
    traccuracy does not depend on napari.

    Args:
        data (np.ndarray): The napari Tracks layer ``data``, shape ``(N, 2 + D)``
            with columns ``[track_id, t, (z), y, x]``. ``D`` is 2 or 3.
        graph (Mapping[int, Sequence[int]] | None, optional): The napari Tracks
            ``graph``, mapping each child track id to its parent track id(s).
            The parent may be a bare int or a list. Defaults to None (no
            divisions).
        properties (Mapping[str, Sequence] | None, optional): Per-detection
            properties (same length/order as ``data`` rows), e.g. the napari
            Tracks layer ``properties``. Used to read segmentation label ids.
            Defaults to None.
        segmentation (np.ndarray | None, optional): Segmentation array whose
            label ids match ``properties[seg_id_key]``. Required for CTC
            matching. Defaults to None.
        seg_id_key (str | None, optional): Key in ``properties`` holding each
            detection's segmentation label id. Required when ``segmentation`` is
            given so nodes carry a ``segmentation_id`` attribute. Defaults to
            None.
        name (str | None, optional): Optional name for the dataset. Defaults to
            None.

    Raises:
        ValueError: data does not have shape (N, 2 + D) with D in {2, 3}.
        ValueError: times (column 1) are not integer-valued.
        ValueError: duplicate (track_id, t) rows (ambiguous within-track edges).
        ValueError: a child track has more than one parent (merges are not
            supported by CTC-style evaluation).
        ValueError: segmentation given without seg_id_key (or vice versa).
        ValueError: seg_id_key not present in properties, or its length does not
            match the number of detections.

    Returns:
        TrackingGraph
    """
    data = np.asarray(data)
    if data.ndim != 2 or data.shape[1] not in (4, 5):
        raise ValueError(
            "napari tracks data must have shape (N, 2 + D) with columns "
            "[track_id, t, (z), y, x] and D in {2, 3}; got shape "
            f"{data.shape}."
        )

    ndim = data.shape[1] - 2
    location_keys = ("y", "x") if ndim == 2 else ("z", "y", "x")
    frame_key = "t"

    # Times are cast to int frame indices below; reject non-integer values so
    # distinct times (e.g. 1.4, 1.6) can't silently truncate to the same frame.
    times_col = data[:, 1]
    if not np.all(times_col == np.floor(times_col)):
        raise ValueError(
            "napari tracks times (column 1) must be integer-valued; got non-integer values."
        )

    if (segmentation is None) != (seg_id_key is None):
        raise ValueError(
            "segmentation and seg_id_key must be provided together: pass both "
            "to enable segmentation-based matching, or neither."
        )

    seg_ids = None
    if seg_id_key is not None:
        if properties is None or seg_id_key not in properties:
            raise ValueError(f"seg_id_key {seg_id_key!r} not present in properties.")
        seg_ids = np.asarray(properties[seg_id_key])
        if len(seg_ids) != len(data):
            raise ValueError(
                f"properties[{seg_id_key!r}] has {len(seg_ids)} entries but "
                f"data has {len(data)} detections; they must align."
            )

    # Node id per detection: row index + 1 (node ids must be positive integers).
    G: nx.DiGraph = nx.DiGraph()
    rows_by_track: dict[int, list[int]] = defaultdict(list)
    for row_idx in range(len(data)):
        node_id = row_idx + 1
        track_id = int(data[row_idx, 0])
        # Frame index must be an int (matchers index frames with range()); the
        # napari data array is float, so cast here.
        t = int(data[row_idx, 1])
        attrs = {frame_key: t}
        for key, value in zip(location_keys, data[row_idx, 2:], strict=False):
            attrs[key] = value
        if seg_ids is not None:
            attrs["segmentation_id"] = int(seg_ids[row_idx])
        G.add_node(node_id, **attrs)
        rows_by_track[track_id].append(row_idx)

    # Within-track edges: order each track's detections by time and connect
    # consecutive ones. Reject duplicate (track_id, t) as ambiguous.
    first_node: dict[int, int] = {}
    last_node: dict[int, int] = {}
    for track_id, row_indices in rows_by_track.items():
        ordered = sorted(row_indices, key=lambda r: data[r, 1])
        times = [data[r, 1] for r in ordered]
        if len(set(times)) != len(times):
            raise ValueError(
                f"track {track_id} has multiple detections at the same time; "
                "each (track_id, t) must be unique."
            )
        for prev, nxt in pairwise(ordered):
            G.add_edge(prev + 1, nxt + 1)
        first_node[track_id] = ordered[0] + 1
        last_node[track_id] = ordered[-1] + 1

    # Cross-track edges: connect each parent track's last detection to each
    # child track's first detection. napari graph is {child: [parents]}.
    if graph:
        for child_track, parent_tracks in graph.items():
            # napari allows a bare int or a list of parent track ids;
            # atleast_1d also normalizes numpy scalars/0-d arrays to a sequence.
            parents = np.atleast_1d(parent_tracks)
            if len(parents) > 1:
                raise ValueError(
                    f"track {child_track} has multiple parents "
                    f"{list(parents)}; merges are not supported."
                )
            child_track = int(child_track)
            if child_track not in first_node:
                continue
            for parent_track in parents:
                parent_track = int(parent_track)
                if parent_track in last_node:
                    G.add_edge(last_node[parent_track], first_node[child_track])

    if seg_ids is not None:
        return TrackingGraph(
            G,
            segmentation=segmentation,
            frame_key=frame_key,
            location_keys=location_keys,
            label_key="segmentation_id",
            name=name,
        )
    return TrackingGraph(G, frame_key=frame_key, location_keys=location_keys, name=name)
