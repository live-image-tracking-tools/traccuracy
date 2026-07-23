from __future__ import annotations

from collections import defaultdict
from itertools import pairwise
from typing import TYPE_CHECKING

import networkx as nx
import numpy as np
from scipy.optimize import linear_sum_assignment
from tqdm import tqdm

from traccuracy._tracking_graph import TrackingGraph

if TYPE_CHECKING:
    from collections.abc import Mapping, Sequence


def _labels_from_positions(data: np.ndarray, segmentation: np.ndarray, ndim: int) -> np.ndarray:
    """Read the segmentation label under each detection's ``(t, (z), y, x)``.

    Implicit matching: assumes each detection sits inside its own mask, so the
    pixel at the detection's position is that object's label. Positions are
    rounded to the nearest voxel; times are already validated integer-valued.

    Returns an ``(N,)`` int array of label ids, one per row of ``data``.
    """
    if segmentation.ndim != ndim + 1:
        raise ValueError(
            f"segmentation has {segmentation.ndim} dims but data implies a "
            f"{ndim}D image plus time ({ndim + 1} dims); cannot match labels "
            "from positions. Pass precomputed labels via seg_id_key instead."
        )

    if len(data) == 0:
        return np.empty(0, dtype=int)

    t_idx = data[:, 1].astype(np.intp)
    pos_idx = np.rint(data[:, 2:]).astype(np.intp)  # (N, ndim)
    index = (t_idx, *(pos_idx[:, d] for d in range(ndim)))

    # Bounds-check before indexing so out-of-range positions give a clear error.
    for axis, ix in enumerate(index):
        if ix.min() < 0 or ix.max() >= segmentation.shape[axis]:
            raise ValueError(
                f"a detection position falls outside the segmentation on axis "
                f"{axis} (index range [{ix.min()}, {ix.max()}], axis size "
                f"{segmentation.shape[axis]}). Pass precomputed labels via "
                "seg_id_key if positions don't sit inside their masks."
            )

    seg_ids = segmentation[index].astype(int)
    if np.any(seg_ids == 0):
        n_bg = int(np.sum(seg_ids == 0))
        raise ValueError(
            f"{n_bg} of {len(data)} detections land on background (label 0) in "
            "the segmentation, so no unique mask can be matched. Pass "
            "precomputed labels via seg_id_key if positions don't sit inside "
            "their masks."
        )
    return seg_ids


def _mask_centroids(frame: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Per-label centroids of one segmentation frame, vectorized.

    Returns ``(labels, centroids)`` where ``labels`` is the sorted non-zero
    label ids and ``centroids[i]`` is label ``labels[i]``'s mean coordinate (in
    the frame's ``(z,)y,x`` axis order). One pass over the non-zero voxels via
    ``np.bincount`` -- much faster than ``scipy.ndimage.center_of_mass`` called
    per label, which matters on large 3D+t volumes (this is the compute hot
    spot of implicit matching).
    """
    coords = np.nonzero(frame)  # tuple of ndim index arrays over non-zero voxels
    ids = frame[coords].astype(np.intp)
    if len(ids) == 0:
        return np.empty(0, dtype=int), np.empty((0, frame.ndim))
    # Bin over DISTINCT labels (via unique+inverse) rather than raw label ids, so
    # memory is O(#masks) not O(max_label): tracking segmentations often carry
    # large sparse global ids that would otherwise make bincount allocate a huge
    # array per frame regardless of how few masks it has.
    labels, inv = np.unique(ids, return_inverse=True)  # labels sorted, non-zero
    counts = np.bincount(inv)
    centroids = np.empty((len(labels), frame.ndim))
    for d, coord in enumerate(coords):
        centroids[:, d] = np.bincount(inv, weights=coord.astype(float))
    centroids /= counts[:, None]
    return labels.astype(int), centroids


def _labels_by_matching(
    data: np.ndarray,
    segmentation: np.ndarray,
    ndim: int,
    progbar_class=tqdm,
) -> np.ndarray:
    """Assign each detection a segmentation label by per-frame optimal matching.

    Per frame, solve a bipartite assignment between the detection positions and
    the segmentation masks' centers of mass, minimizing total Euclidean
    distance (``scipy.optimize.linear_sum_assignment``). Each detection takes
    the label of the mask it is matched to. This is robust to points that don't
    sit inside their own mask (off-centroid markers, sub-pixel positions), which
    the pixel lookup in :func:`_labels_from_positions` rejects.

    Every detection must receive a mask: if a frame has fewer masks than
    detections, the surplus detections cannot be matched and a ``ValueError`` is
    raised naming the frame. Surplus masks (more masks than detections) are
    simply left unassigned.

    ``progbar_class`` is the tqdm-compatible class wrapping the per-frame loop;
    pass e.g. ``napari.utils.progress`` to show it in napari's activity dock
    (the default plain ``tqdm`` prints to the terminal).

    Returns an ``(N,)`` int array of label ids, one per row of ``data``.
    """
    if segmentation.ndim != ndim + 1:
        raise ValueError(
            f"segmentation has {segmentation.ndim} dims but data implies a "
            f"{ndim}D image plus time ({ndim + 1} dims); cannot match labels to "
            "masks. Pass precomputed labels via seg_id_key instead."
        )
    if len(data) == 0:
        return np.empty(0, dtype=int)

    seg_ids = np.zeros(len(data), dtype=int)
    times = data[:, 1].astype(np.intp)
    unique_times = np.unique(times)
    for t in progbar_class(
        unique_times,
        total=len(unique_times),
        desc="Matching detections to masks",
        leave=False,
    ):
        rows = np.nonzero(times == t)[0]
        frame = segmentation[int(t)]
        # Mask labels and centers of mass, in the same (z,)y,x coordinate order
        # as data[:, 2:].
        labels, coms = _mask_centroids(frame)  # labels (M,), coms (M, ndim)
        if len(labels) == 0:
            raise ValueError(
                f"frame {int(t)} has {len(rows)} detection(s) but no "
                "segmentation masks to match them to."
            )
        points = data[rows, 2:].astype(float)  # (K, ndim)
        # Cost = pairwise Euclidean distance (K detections x M masks).
        cost = np.linalg.norm(points[:, None, :] - coms[None, :, :], axis=2)
        det_idx, mask_idx = linear_sum_assignment(cost)
        if len(det_idx) < len(rows):
            n_unmatched = len(rows) - len(det_idx)
            raise ValueError(
                f"frame {int(t)} has {len(rows)} detection(s) but only "
                f"{len(labels)} mask(s); {n_unmatched} detection(s) cannot be "
                "matched to a unique mask."
            )
        seg_ids[rows[det_idx]] = labels[mask_idx].astype(int)
    return seg_ids


def _check_unique_labels_per_frame(data: np.ndarray, seg_ids: np.ndarray) -> None:
    """Enforce that each label id is unique within a frame.

    Segmentation-based matchers require this (the IoU matcher asserts it, the
    CTC matcher silently collapses collisions), so we fail loudly at load time.
    """
    t = data[:, 1].astype(np.intp)
    order = np.lexsort((seg_ids, t))
    t_sorted, s_sorted = t[order], seg_ids[order]
    dup = (t_sorted[1:] == t_sorted[:-1]) & (s_sorted[1:] == s_sorted[:-1])
    if np.any(dup):
        i = int(np.argmax(dup))
        raise ValueError(
            f"two detections resolve to the same segmentation label "
            f"{int(s_sorted[i])} in frame {int(t_sorted[i])}; each detection "
            "must match a unique segmentation. Pass precomputed labels via "
            "seg_id_key for explicit control."
        )


def load_napari_data(
    data: np.ndarray,
    graph: Mapping[int, Sequence[int]] | None = None,
    properties: Mapping[str, Sequence] | None = None,
    segmentation: np.ndarray | None = None,
    seg_id_key: str | None = None,
    name: str | None = None,
    progbar_class=tqdm,
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

    To match tracks to a ``segmentation`` there are two modes:

    - **Implicit (default):** per frame, detections are matched to segmentation
      masks by optimal bipartite assignment between detection positions and mask
      centers of mass (minimizing total Euclidean distance), and each detection
      takes its matched mask's label. This does not require points to sit inside
      their own mask. Just pass ``segmentation``. A frame with fewer masks than
      detections raises an error (some detection cannot be matched).
    - **Explicit:** the label for each detection is taken from a precomputed
      ``properties`` column. Pass ``segmentation`` together with ``seg_id_key``
      naming that column. Use this when you already know the labels.

    Example:
        A napari ``Tracks`` layer exposes its contents as three plain
        attributes; pass those straight in (no napari import needed on the
        traccuracy side)::

            # `tracks_layer` is a napari Tracks layer (viewer.add_tracks(...))
            tg = load_napari_data(
                data=tracks_layer.data,        # (N, 2+D) [track_id, t, (z), y, x]
                graph=tracks_layer.graph,      # {child_track_id: [parent_track_id]}
                properties=tracks_layer.properties,
            )

        If you have the raw arrays instead of a layer, build them by hand. Here
        track 1 spans frames 0-1 and divides into tracks 2 and 3 at frame 2::

            import numpy as np

            data = np.array(
                [
                    [1, 0, 10, 20],  # track 1, t=0
                    [1, 1, 11, 21],  # track 1, t=1
                    [2, 2, 12, 22],  # track 2, t=2 (child of 1)
                    [3, 2, 8, 18],   # track 3, t=2 (child of 1)
                ]
            )
            graph = {2: [1], 3: [1]}
            tg = load_napari_data(data, graph=graph)

        To enable segmentation-based matching, pass a
        ``segmentation`` array. By default each detection's label is read
        implicitly from the pixel under its ``(t, (z), y, x)`` position, so no
        extra bookkeeping is needed::

            tg = load_napari_data(
                data,
                graph=graph,
                segmentation=segmentation,  # (T, (Z), Y, X)
            )

        If you already have the label ids precomputed (e.g. positions don't sit
        cleanly inside their masks), match explicitly instead by passing the
        ``properties`` key that holds them::

            tg = load_napari_data(
                data,
                graph=graph,
                properties={"label": [11, 12, 13, 14]},
                segmentation=segmentation,  # (T, (Z), Y, X), label ids match above
                seg_id_key="label",
            )

    Args:
        data (np.ndarray): The napari Tracks layer ``data``, shape ``(N, 2 + D)``
            with columns ``[track_id, t, (z), y, x]``. ``D`` is 2 or 3.
        graph (Mapping[int, Sequence[int]] | None, optional): The napari Tracks
            ``graph``, mapping each child track id to its parent track id(s).
            The parent may be a bare int or a list. Defaults to None (no
            divisions).
        properties (Mapping[str, Sequence] | None, optional): Per-detection
            properties (same length/order as ``data`` rows), e.g. the napari
            Tracks layer ``properties``. Only read when ``seg_id_key`` is given,
            to look up precomputed segmentation label ids. Defaults to None.
        segmentation (np.ndarray | None, optional): Segmentation array of shape
            ``(T, (Z), Y, X)``. When given, each node carries a
            ``segmentation_id`` for segmentation-based matching. Unless ``seg_id_key`` is
            also given, each label is read implicitly from the pixel under the
            detection's position. Defaults to None.
        seg_id_key (str | None, optional): Key in ``properties`` holding each
            detection's precomputed segmentation label id. Pass this to match
            explicitly instead of reading labels from positions. Requires
            ``segmentation``. Defaults to None.
        name (str | None, optional): Optional name for the dataset. Defaults to
            None.
        progbar_class (optional): tqdm-compatible class wrapping the per-frame
            implicit-matching loop. Pass e.g. ``napari.utils.progress`` to show
            the bar in napari's activity dock; defaults to plain ``tqdm``
            (terminal).

    Raises:
        ValueError: data does not have shape (N, 2 + D) with D in {2, 3}.
        ValueError: track ids (column 0) or times (column 1) are not
            integer-valued.
        ValueError: duplicate (track_id, t) rows (ambiguous within-track edges).
        ValueError: seg_id_key given without segmentation.
        ValueError: seg_id_key not present in properties, its length does not
            match the number of detections, or its values are not integer-valued.
        ValueError: (implicit matching) segmentation dims don't match the data,
            a detection falls outside the segmentation or on background, or two
            detections in a frame resolve to the same label.

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

    # Track ids and times are cast to int below; reject non-integer values so
    # distinct ids/times (e.g. 1.4, 1.6) can't silently collapse into one.
    for col, label in ((0, "track ids"), (1, "times")):
        values = data[:, col]
        if not np.all(values == np.floor(values)):
            raise ValueError(
                f"napari tracks {label} (column {col}) must be integer-valued; "
                "got non-integer values."
            )

    if seg_id_key is not None and segmentation is None:
        raise ValueError(
            "seg_id_key was given without segmentation; pass a segmentation to "
            "enable label matching, or drop seg_id_key."
        )

    # Resolve each detection's segmentation label id (or None if no matching).
    # Two modes when a segmentation is given: explicit (read from a properties
    # column) or, by default, implicit (read the pixel under each position).
    seg_ids = None
    if segmentation is not None:
        if seg_id_key is not None:
            if properties is None or seg_id_key not in properties:
                raise ValueError(f"seg_id_key {seg_id_key!r} not present in properties.")
            seg_ids = np.asarray(properties[seg_id_key])
            if len(seg_ids) != len(data):
                raise ValueError(
                    f"properties[{seg_id_key!r}] has {len(seg_ids)} entries but "
                    f"data has {len(data)} detections; they must align."
                )
            if not np.all(seg_ids == np.floor(seg_ids)):
                raise ValueError(
                    f"properties[{seg_id_key!r}] must be integer label ids; got non-integer values."
                )
            seg_ids = seg_ids.astype(int)
        else:
            # Implicit matching: assign each detection a mask per frame by optimal
            # bipartite matching (detection positions <-> mask centers of mass,
            # Euclidean cost). Robust to points that don't sit inside their mask.
            seg_ids = _labels_by_matching(
                data, np.asarray(segmentation), ndim, progbar_class=progbar_class
            )
        _check_unique_labels_per_frame(data, seg_ids)

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
    # child track's first detection. napari graph is {child: [parents]}. A
    # child with multiple parents produces a merge node (in-degree >= 2).
    if graph:
        for child_track, parent_tracks in graph.items():
            # napari allows a bare int or a list of parent track ids;
            # atleast_1d also normalizes numpy scalars/0-d arrays to a sequence.
            parents = np.atleast_1d(parent_tracks)
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
