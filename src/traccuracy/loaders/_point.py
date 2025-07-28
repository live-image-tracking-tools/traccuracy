from typing import Optional, cast

import networkx as nx
import numpy as np
import pandas as pd

from traccuracy._tracking_graph import TrackingGraph


def load_point_data(
    path: str | None = None,
    df: Optional[pd.DataFrame] = None,  # noqa: UP007, bar syntax breaks docs build
    parent_column: str = "parent",
    id_column: str = "node_id",
    pos_columns: tuple[str, ...] = ("z", "y", "x"),
    time_column: str = "t",
    seg_id_column: str | None = None,
    name: str | None = None,
    sep: str | None = None,
) -> TrackingGraph:
    """Load point-based tracking data into a TrackingGraph from a csv-like file

    Assumes each row contains:

    - time
    - position, e.g. three columns 'z', 'y', 'x'
    - parent, a reference to the node in the previous time frame.
      A node without a parent can be indicated by either -1 or NaN

    Args:
        path (str | None, optional): Path to the csv-like file to load. Defaults to None.
        df (pd.DataFrame | None, optional): A dataframe that has already been loaded.
            Defaults to None.
        parent_column (str | None, optional): A reference to the parent node in the previous
            time frame. Defaults to "parent".
        id_column (str, optional): Optional column used to specify node ids.
            Defaults to "node_id"
        pos_columns (tuple[str], optional): A tuple of columns to use for position.
            Defaults to ("z", "y", "x").
        time_column (str, optional): The column to use for time. Defaults to "t".
        seg_id_column (str | None, optional): Name of an optional column containing a segmentation
            label id. Defaults to None.
        name (str | None, optional): Optional string to name/describe the dataset. Defaults to None.
        sep (str | None, optional): Passed to pd.read_csv to set the sep kwarg. Defaults to None.

    Raises:
        ValueError: Must provide either a path or a dataframe
        ValueError: parent_column not present in data
        ValueError: id_column not present in data
        ValueError: pos_columns not present in data
        ValueError: time_column not present in data
        ValueError: seg_id_column not present in data

    Returns:
        TrackingGraph
    """
    if path is None and df is None:
        raise ValueError("Must provide either a path or a dataframe")

    if path:
        if sep is None:
            df = pd.read_csv(path)
        else:
            df = pd.read_csv(path, sep=sep)

    # At this point, df is guaranteed to be dataframe not None
    df = cast("pd.DataFrame", df)

    if parent_column not in df.columns:
        raise ValueError(f"Specified parent_column {parent_column} not present")

    if id_column not in df.columns:
        raise ValueError(f"Specified id_column {id_column} not present")

    if not all(c in df.columns for c in pos_columns):
        raise ValueError(f"Specified pos_columns {pos_columns} not present")

    if time_column not in df.columns:
        raise ValueError(f"Specified time_column {time_column} not present")

    if seg_id_column and seg_id_column not in df.columns:
        raise ValueError(f"Specified seg_id_column {seg_id_column} not present")

    node_attr_cols = [time_column, *pos_columns]
    if seg_id_column:
        node_attr_cols.append(seg_id_column)

    nodes, edges = [], []
    for _, row in df.iterrows():
        node_id = row[id_column]
        nodes.append((node_id, row[node_attr_cols].to_dict()))

        if row[parent_column] != -1 and not np.isnan(row[parent_column]):
            edges.append((row[parent_column], node_id))

    G: nx.DiGraph = nx.DiGraph()
    G.add_nodes_from(nodes)
    G.add_edges_from(edges)

    if seg_id_column:
        return TrackingGraph(
            G, frame_key=time_column, location_keys=pos_columns, label_key=seg_id_column, name=name
        )
    return TrackingGraph(G, frame_key=time_column, location_keys=pos_columns, name=name)
