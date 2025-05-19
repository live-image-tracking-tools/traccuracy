import glob
import logging
import os
from warnings import warn

import networkx as nx
import numpy as np
import pandas as pd
from skimage.measure import label, regionprops_table
from tifffile import imread
from tqdm import tqdm

from traccuracy._tracking_graph import TrackingGraph

logger = logging.getLogger(__name__)


def _load_tiffs(data_dir: str) -> np.ndarray:
    """Load a directory of individual frames into a stack.

    Args:
        data_dir (str): Path to directory of tiff files

    Raises:
        FileNotFoundError: No tif files found in data_dir

    Returns:
        np.array: 4D array with dims TYXC
    """
    files = np.sort(glob.glob(f"{data_dir}/*.tif*"))
    if len(files) == 0:
        raise FileNotFoundError(f"No tif files were found in {data_dir}")

    first_im = imread(files[0])
    shape = (len(files), *first_im.shape)
    dtype = first_im.dtype

    if dtype.kind not in ["i", "u"]:
        warn(f"Segmentation has {dtype}: casting to uint64", stacklevel=2)
        dtype = np.dtype(np.uint64)
    stack = np.zeros(shape=shape, dtype=dtype)
    stack[0] = first_im.astype(dtype, copy=False)

    for i, f in enumerate(tqdm(files[1:], "Loading TIFFs")):
        stack[i + 1] = imread(f).astype(dtype, copy=False)

    return stack


def _detections_from_image(stack: np.ndarray, idx: int) -> pd.DataFrame:
    """Return the unique track label, centroid and time for each track vertex.

    Args:
        stack (np.ndarray): Stack of masks
        idx (int): Index of the image to calculate the centroids and track labels

    Returns:
        pd.DataFrame: The dataframe of track data for one time step (specified by idx)
    """
    props = regionprops_table(np.asarray(stack[idx, ...]), properties=("label", "centroid"))
    props["t"] = np.full(props["label"].shape, idx)
    return pd.DataFrame(props)


def _get_node_attributes(masks: np.ndarray) -> pd.DataFrame:
    """Calculates x,y,z,t,label for each detection in a movie.

    Args:
        masks (np.ndarray): Set of masks with time in the first axis

    Returns:
        pd.DataFrame: Dataframe with one detection per row. Columns
            segmentation_id, x, y, z, t
    """
    if len(masks.shape) == 4:
        columns = {
            "label": "segmentation_id",
            "centroid-2": "x",
            "centroid-1": "y",
            "centroid-0": "z",
        }
    else:
        columns = {
            "label": "segmentation_id",
            "centroid-1": "x",
            "centroid-0": "y",
        }

    data_df = pd.concat(
        [
            _detections_from_image(masks, idx)
            for idx in tqdm(range(masks.shape[0]), desc="Computing node attributes")
        ],
    ).reset_index(drop=True)
    data_df = data_df.rename(columns=columns)
    data_df["segmentation_id"] = data_df["segmentation_id"].astype(int)
    data_df["t"] = data_df["t"].astype(int)
    return data_df


def ctc_to_graph(df: pd.DataFrame, detections: pd.DataFrame) -> nx.DiGraph:
    """Create a Graph from DataFrame of CTC info with node attributes.

    Args:
        data (pd.DataFrame): DataFrame of CTC-style info
        detections (pd.DataFrame): Dataframe from _get_node_attributes with position
            and segmentation label for each cell detection

    Returns:
        networkx.DiGraph: Graph representation of the CTC data.
    """
    edges = []

    all_ids = set()
    single_nodes = set()

    # Add each continuous cell lineage as a set of edges to df
    for _, row in df.iterrows():
        tpoints = np.arange(row["Start"], row["End"] + 1)

        cellids = ["{}_{}".format(row["Cell_ID"], t) for t in tpoints]

        if len(cellids) == 1:
            single_nodes.add(cellids[0])

        all_ids.update(cellids)

        edges.append(
            pd.DataFrame(
                {
                    "source": cellids[0:-1],
                    "target": cellids[1:],
                }
            )
        )

    # Add parent-daughter connections
    for _, row in df[df["Parent_ID"] != 0].iterrows():
        # Get the parent's details
        parent_row = df[df["Cell_ID"] == row["Parent_ID"]].iloc[0]
        source = "{}_{}".format(parent_row["Cell_ID"], parent_row["End"])

        target = "{}_{}".format(row["Cell_ID"], row["Start"])

        edges.append(pd.DataFrame({"source": [source], "target": [target]}))

    # Store position attributes on nodes
    detections["node_id"] = (
        detections["segmentation_id"].astype("str") + "_" + detections["t"].astype("str")
    )
    detections = detections.set_index("node_id")

    attributes = {}
    for row_tp in detections.itertuples():
        # Pandas thinks the itertuple return type can be essentially anything
        row_dict = row_tp._asdict()  # type: ignore
        i = row_dict["Index"]
        del row_dict["Index"]
        attributes[i] = row_dict

    # Create graph
    edge_df = pd.concat(edges)
    G = nx.from_pandas_edgelist(edge_df, source="source", target="target", create_using=nx.DiGraph)

    # Add all isolates to graph
    for cell_id in single_nodes:
        G.add_node(cell_id)

    nx.set_node_attributes(G, attributes)

    return G


def _check_ctc(tracks: pd.DataFrame, detections: pd.DataFrame, masks: np.ndarray) -> None:
    """Sanity checks for valid CTC format.

    Hard checks (throws exception):
    - Tracklet IDs in tracks file must be unique and positive
    - Parent tracklet IDs must exist in the tracks file
    - Intertracklet edges must be directed forward in time.
    - In each time point, the set of segmentation IDs present in the detections must equal the set
    of tracklet IDs in the tracks file that overlap this time point.

    Soft checks (prints warning):
    - No duplicate tracklet IDs (non-connected pixels with same ID) in a single timepoint.

    Args:
        tracks (pd.DataFrame): Tracks in CTC format with columns Cell_ID, Start, End, Parent_ID.
        detections (pd.DataFrame): Detections extracted from masks, containing columns
            segmentation_id, t.
        masks (np.ndarray): Set of masks with time in the first axis.
    Raises:
        ValueError: If any of the hard checks fail.
    """
    logger.info("Running CTC format checks")
    if tracks["Cell_ID"].min() < 1:
        raise ValueError("Cell_IDs in tracks file must be positive integers.")
    if len(tracks["Cell_ID"]) < len(tracks["Cell_ID"].unique()):
        raise ValueError("Cell_IDs in tracks file must be unique integers.")

    for _, row in tracks.iterrows():
        if row["Parent_ID"] != 0:
            if row["Parent_ID"] not in tracks["Cell_ID"].values:
                raise ValueError(f"Parent_ID {row['Parent_ID']} is not present in tracks.")
            parent_end = tracks[tracks["Cell_ID"] == row["Parent_ID"]]["End"].iloc[0]
            if parent_end >= row["Start"]:
                raise ValueError(
                    "Invalid tracklet connection: Daughter tracklet with ID"
                    f" {row['Cell_ID']} starts at t={row['Start']}, but parent tracklet"
                    f" with ID {row['Parent_ID']} only ends at t={parent_end}."
                )

    for t in range(tracks["Start"].min(), tracks["End"].max()):
        track_ids = set(tracks[(tracks["Start"] <= t) & (tracks["End"] >= t)]["Cell_ID"])
        det_ids = set(detections[(detections["t"] == t)]["segmentation_id"])
        if not track_ids.issubset(det_ids):
            raise ValueError(f"Missing IDs in masks at t={t}: {track_ids - det_ids}")
        if not det_ids.issubset(track_ids):
            raise ValueError(f"IDs {det_ids - track_ids} at t={t} not represented in tracks file.")

    for t, frame in enumerate(masks):
        _, n_components = label(frame, return_num=True)
        n_labels = len(detections[detections["t"] == t])
        if n_labels < n_components:
            logger.warning(f"{n_components - n_labels} non-connected masks at t={t}.")


def load_ctc_data(
    data_dir: str, track_path: str | None = None, name: str | None = None, run_checks: bool = True
) -> TrackingGraph:
    """Read the CTC segmentations and track file and create TrackingData.

    Args:
        data_dir (str): Path to directory containing CTC tiffs.
        track_path (optional, str): Path to CTC track file. If not passed,
            finds `*_track.txt` in data_dir.
        name (optional, str): Name of data to store in TrackingGraph
        run_checks (optional, bool): If set to `True` (default), runs checks on the data to ensure
            valid CTC format.

    Returns:
        traccuracy.TrackingGraph: Object containing segmentations and graph.

    Raises:
        ValueError:
            If `run_checks` is True, whenever any of the CTC format checks are violated.
            If `run_checks` is False, whenever any other Exception occurs while creating the graph.
    """
    names = ["Cell_ID", "Start", "End", "Parent_ID"]
    if not track_path:
        track_paths = list(glob.glob(os.path.join(data_dir, "*_track.txt")))
        if not track_paths:
            raise ValueError(
                f"No track_path passed and a *_track.txt file could not be found in {data_dir}"
            )
        if len(track_paths) > 1:
            raise ValueError(
                "No track_path passed and multiple *_track.txt files found:"
                f" {track_paths}." + " Please pick one and pass it explicitly."
            )
        track_path = track_paths[0]

    tracks = pd.read_csv(track_path, header=None, sep=" ", names=names)

    masks = _load_tiffs(data_dir)
    detections = _get_node_attributes(masks)
    if run_checks:
        _check_ctc(tracks, detections, masks)

    try:
        G = ctc_to_graph(tracks, detections)
    except BaseException as e:
        logger.error(e)
        raise ValueError(
            "Error in converting CTC to graph. "
            "Consider setting `run_checks=True` for detailed error message."
        ) from e

    # Check dimensionality of segmentation data to set the location keys
    loc_keys: tuple[str, ...]
    if len(masks.shape) == 4:
        loc_keys = ("z", "y", "x")
    else:
        loc_keys = ("y", "x")

    return TrackingGraph(G, segmentation=masks, name=name, location_keys=loc_keys)
