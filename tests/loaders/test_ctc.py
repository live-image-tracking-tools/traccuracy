import glob
import os
from pathlib import Path

import networkx as nx
import numpy as np
import pandas as pd
import pytest
import tifffile
from numpy.testing import assert_array_equal

from tests.examples.segs import multicell_3d
from traccuracy._tracking_graph import TrackingGraph
from traccuracy.loaders import _ctc, load_tiffs


def make_detections(data):
    detections = {"segmentation_id": [], "x": [], "y": [], "z": [], "t": []}
    for row in data:
        n_t = row["End"] - row["Start"] + 1
        detections["segmentation_id"].extend([row["Cell_ID"]] * n_t)
        detections["x"].extend([row["Cell_ID"]] * n_t)
        detections["y"].extend([row["Cell_ID"]] * n_t)
        detections["z"].extend([row["Cell_ID"]] * n_t)
        detections["t"].extend(list(range(row["Start"], row["End"] + 1)))

    return detections


def test_ctc_to_graph():
    """
    1 - 1 - 1 - 1
                3
    2 - 2 - 2 <
                4
    """
    # cell_id, start, end, parent_id
    data = [
        {"Cell_ID": 1, "Start": 0, "End": 3, "Parent_ID": 0},
        {"Cell_ID": 2, "Start": 0, "End": 2, "Parent_ID": 0},
        {"Cell_ID": 3, "Start": 3, "End": 3, "Parent_ID": 2},
        {"Cell_ID": 4, "Start": 3, "End": 3, "Parent_ID": 2},
    ]
    detections = make_detections(data)
    G = _ctc.ctc_to_graph(pd.DataFrame(data), pd.DataFrame(detections))

    # Check number of edges and nodes
    assert len(G.nodes) == 9
    assert len(G.edges) == 7

    # Check the division node
    for node, attrs in G.nodes.items():
        if G.out_degree(node) == 2:
            assert attrs["t"] == 2
            assert attrs["segmentation_id"] == 2

    # Check for two subgraphs
    subgraphs = nx.weakly_connected_components(G)
    assert len(list(subgraphs)) == 2


def test_ctc_single_nodes():
    data = [
        {"Cell_ID": 1, "Start": 0, "End": 3, "Parent_ID": 0},
        {"Cell_ID": 2, "Start": 0, "End": 2, "Parent_ID": 0},
        {"Cell_ID": 3, "Start": 3, "End": 3, "Parent_ID": 2},
        {"Cell_ID": 4, "Start": 3, "End": 3, "Parent_ID": 2},
        {"Cell_ID": 5, "Start": 3, "End": 3, "Parent_ID": 4},
    ]

    detections = [
        {"segmentation_id": 1, "x": 1, "y": 2, "z": 1, "t": 0},
        {"segmentation_id": 1, "x": 1, "y": 2, "z": 1, "t": 1},
        {"segmentation_id": 1, "x": 1, "y": 2, "z": 1, "t": 2},
        {"segmentation_id": 1, "x": 1, "y": 2, "z": 1, "t": 3},
        {"segmentation_id": 2, "x": 2, "y": 1, "z": 1, "t": 0},
        {"segmentation_id": 2, "x": 2, "y": 1, "z": 1, "t": 1},
        {"segmentation_id": 2, "x": 2, "y": 1, "z": 1, "t": 2},
        {"segmentation_id": 3, "x": 1, "y": 1, "z": 1, "t": 3},
        {"segmentation_id": 4, "x": 1, "y": 2, "z": 2, "t": 3},
        {"segmentation_id": 5, "x": 1, "y": 1, "z": 2, "t": 3},
    ]
    df = pd.DataFrame(data)
    G = _ctc.ctc_to_graph(df, pd.DataFrame.from_records(detections))
    # This should raise an error if there are no times for single nodes
    TrackingGraph(G)


def test_ctc_with_gap_closing():
    """
    t 0   1   2   3   4   5   6   7   8
      1 - 1 - - - 3 - 3 - 3
      2 - 2 - - - - - - - - - 4 - 4 - 4
    """
    data = [
        {"Cell_ID": 1, "Start": 0, "End": 1, "Parent_ID": 0},
        {"Cell_ID": 2, "Start": 0, "End": 1, "Parent_ID": 0},
        # Connecting frame 1 to frame 3
        {"Cell_ID": 3, "Start": 3, "End": 5, "Parent_ID": 1},
        # Connecting frame 1 to frame 6
        {"Cell_ID": 4, "Start": 6, "End": 8, "Parent_ID": 2},
    ]
    detections = make_detections(data)
    G = _ctc.ctc_to_graph(pd.DataFrame(data), pd.DataFrame(detections))
    assert len(G.edges) == 8


def test_load_data():
    test_dir = os.path.abspath(__file__)
    data_dir = os.path.abspath(
        os.path.join(test_dir, "../../../examples/sample-data/Fluo-N2DL-HeLa/01_RES/")
    )
    track_path = os.path.join(data_dir, "res_track.txt")
    track_data = _ctc.load_ctc_data(data_dir, track_path)
    assert isinstance(track_data, TrackingGraph)
    assert len(track_data.segmentation) == 92


def test_load_data_no_track_path():
    test_dir = os.path.abspath(__file__)
    data_dir = os.path.abspath(
        os.path.join(test_dir, "../../../examples/sample-data/Fluo-N2DL-HeLa/01_RES/")
    )
    track_data = _ctc.load_ctc_data(data_dir)
    assert isinstance(track_data, TrackingGraph)
    assert len(track_data.segmentation) == 92


def test_load_tiffs_float_data(tmp_path):
    test_dir = os.path.abspath(__file__)
    data_dir = os.path.abspath(
        os.path.join(test_dir, "../../../examples/sample-data/Fluo-N2DL-HeLa/01_RES/")
    )

    files = glob.glob(f"{data_dir}/*.tif*")
    for file in files:
        arr = tifffile.imread(file).astype(np.float64)
        tifffile.imwrite(tmp_path / Path(file).name, arr)
    with pytest.warns(UserWarning, match="Segmentation has float64: casting to uint64"):
        casted_seg = load_tiffs(tmp_path)
    orig_seg = load_tiffs(data_dir)
    assert casted_seg.dtype == np.uint64
    assert_array_equal(casted_seg.astype(orig_seg.dtype), orig_seg)


def test_3d_data(tmpdir):
    nframes = 3
    gt, _ = multicell_3d()
    seg_array = np.repeat(gt.segmentation[np.newaxis], repeats=nframes, axis=0)
    for frame in range(nframes):
        tifffile.imwrite(tmpdir / f"mask00{frame}.tif", seg_array[frame])

    # Save tracking data
    df = pd.DataFrame({"Cell_ID": [1, 2], "Start": [0, 0], "End": [2, 2], "Parent_ID": [0, 0]})
    df.to_csv(os.path.join(tmpdir, "res_track.txt"), header=None, sep=" ", index=False)

    track_graph = _ctc.load_ctc_data(tmpdir)

    # Check that when we get the location we get all 3 dims
    assert len(track_graph.get_location(1)) == 3
