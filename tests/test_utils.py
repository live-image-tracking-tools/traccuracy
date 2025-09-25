import json
import os
import urllib.request
import zipfile

import networkx as nx
import numpy as np
import pytest
import skimage as sk
from geff import GeffReader

from tests.examples.larger_examples import larger_example_1
from tests.examples.segs import nodes_from_segmentation
from traccuracy._tracking_graph import NodeFlag, TrackingGraph
from traccuracy.loaders import load_ctc_data
from traccuracy.metrics._basic import BasicMetrics
from traccuracy.metrics._divisions import DivisionMetrics
from traccuracy.utils import export_graphs_to_geff, save_results_json


def download_gt_data(url, root_dir):
    # Download GT data -- look into caching this in github actions
    data_dir = os.path.join(root_dir, "downloads")

    if not os.path.exists(data_dir):
        os.mkdir(data_dir)

    filename = url.split("/")[-1]
    file_path = os.path.join(data_dir, filename)

    if not os.path.exists(file_path):
        urllib.request.urlretrieve(url, file_path)

        # Unzip the data
        with zipfile.ZipFile(file_path, "r") as zip_ref:
            zip_ref.extractall(data_dir)


def gt_data(url, root_dir, path):
    download_gt_data(url, root_dir)
    return load_ctc_data(
        os.path.join(root_dir, path),
        os.path.join(root_dir, path, "man_track.txt"),
    )


def get_annotated_image(img_size=256, num_labels=3, sequential=True, seed=1):
    np.random.seed(seed)
    if num_labels == 0:
        im = np.zeros((img_size, img_size))
        return im.astype("int32")

    num_labels_act = False
    trial = 0
    while num_labels != num_labels_act:
        if trial > 10:
            raise Exception(
                "Labels have merged despite 10 different random seeds."
                " Increase image size or reduce the number of labels"
            )
        im = np.zeros((img_size, img_size))
        points = img_size * np.random.random((2, num_labels))
        im[(points[0]).astype(int), (points[1]).astype(int)] = 1
        im = sk.filters.gaussian(im, sigma=5)
        blobs = im > 0.7 * im.mean()
        all_labels, num_labels_act = sk.measure.label(blobs, return_num=True)
        if num_labels != num_labels_act:
            seed += 1
            np.random.seed(seed)
            trial += 1

    if not sequential:
        labels_in_frame = np.unique(all_labels)
        for label in range(num_labels):
            curr_label = label + 1
            new_label = np.random.randint(1, num_labels * 100)
            while new_label in labels_in_frame:
                new_label = np.random.randint(1, num_labels * 100)
            labels_in_frame = np.append(labels_in_frame, new_label)
            label_loc = np.where(all_labels == curr_label)
            all_labels[:, :][label_loc] = new_label

    return all_labels.astype("int32")


def get_annotated_movie(img_size=256, labels_per_frame=3, frames=3, mov_type="sequential", seed=1):
    if mov_type in ("sequential", "repeated"):
        sequential = True
    elif mov_type == "random":
        sequential = False
    else:
        raise ValueError('mov_type must be one of "sequential", "repeated" or "random"')

    y = []
    while len(y) < frames:
        _y = get_annotated_image(
            img_size=img_size,
            num_labels=labels_per_frame,
            sequential=sequential,
            seed=seed,
        )
        y.append(_y)
        seed += 1

    y = np.stack(y, axis=0)  # expand to 3D

    if mov_type == "sequential":
        for frame in range(frames):
            if frame == 0:
                new_label = labels_per_frame
                continue
            for label in range(labels_per_frame):
                curr_label = label + 1
                new_label += 1
                label_loc = np.where(y[frame, :, :] == curr_label)
                y[frame, :, :][label_loc] = new_label

    return y.astype("int32")


def get_movie_with_graph(ndims=3, n_frames=3, n_labels=3):
    movie = get_annotated_movie(labels_per_frame=n_labels, frames=n_frames, mov_type="repeated")

    # Extend to 3d if needed
    if ndims == 4:
        movie = np.stack([movie, movie, movie], axis=-1)
        pos_keys = ("x", "y", "z")
    else:
        pos_keys = ("x", "y")

    # We can assume each object is present and connected across each frame
    G = nx.DiGraph()
    for t in range(n_frames):
        nodes = nodes_from_segmentation(movie[t], frame=t, _id="label_time", pos_keys=pos_keys)
        G.add_nodes_from([(_id, data) for _id, data in nodes.items()])
        if t > 0:
            for i in range(1, n_labels + 1):
                G.add_edge(f"{i}_{t - 1}", f"{i}_{t}")

    # Relabel nodes to get rid of string ids
    # Preserve the option for string ids because it makes a few tests impossible otherwise
    G = nx.convert_node_labels_to_integers(G, first_label=1, label_attribute="string_id")

    return TrackingGraph(G, segmentation=movie, location_keys=pos_keys)


def get_division_graphs():
    """
    G1
                        5
    1 -- 2 -- 3 -- 4 -<
                        6
    G2
              9 -- 10 -- 11
    7 -- 8 -<
              12 -- 13 -- 14
    """

    G1 = nx.DiGraph()
    edges = [(1, 2), (2, 3), (3, 4), (4, 5), (4, 6)]
    nodes = [
        (1, {"t": 0, "x": 0, "y": 0}),
        (2, {"t": 1, "x": 0, "y": 0}),
        (3, {"t": 2, "x": 0, "y": 0}),
        (4, {"t": 3, "x": 0, "y": 0}),
        (5, {"t": 4, "x": 0, "y": 0}),
        (6, {"t": 4, "x": 0, "y": 0}),
    ]
    G1.add_nodes_from(nodes)
    G1.add_edges_from(edges)

    G2 = nx.DiGraph()
    edges = [(7, 8), (8, 9), (9, 10), (10, 11), (8, 12), (12, 13), (13, 14)]
    nodes = [
        (7, {"t": 0, "x": 0, "y": 0}),
        (8, {"t": 1, "x": 0, "y": 0}),
        (9, {"t": 2, "x": 0, "y": 0}),
        (10, {"t": 3, "x": 0, "y": 0}),
        (11, {"t": 4, "x": 0, "y": 0}),
        (12, {"t": 2, "x": 0, "y": 0}),
        (13, {"t": 3, "x": 0, "y": 0}),
        (14, {"t": 4, "x": 0, "y": 0}),
    ]
    G2.add_nodes_from(nodes)
    G2.add_edges_from(edges)

    mapped_g1 = [1, 2, 5, 6]
    mapped_g2 = [7, 8, 11, 14]

    return G1, G2, mapped_g1, mapped_g2


class Test_export_graphs_to_geff:
    def check_valid_flag(self, flag, props):
        """strenum in python 3.10 ends up annotating the graph with is_tp_div.
        Later python annotates with NodeFlag.TP_DIV. For now we want to accept either
        """

        return str(flag) in props or flag.value in props

    def test_basic_metrics(self, tmp_path):
        matched = larger_example_1()
        # Test dictionary case
        results = [BasicMetrics().compute(matched).to_dict()]
        out_zarr = tmp_path / "test.zarr"
        export_graphs_to_geff(out_zarr, matched, results)

        # Check that correct properties are present
        gt_props = GeffReader(out_zarr / "gt.geff").node_prop_names
        assert self.check_valid_flag(NodeFlag.TRUE_POS, gt_props)
        assert self.check_valid_flag(NodeFlag.FALSE_NEG, gt_props)
        pred_props = GeffReader(out_zarr / "pred.geff").node_prop_names
        assert self.check_valid_flag(NodeFlag.TRUE_POS, pred_props)
        assert self.check_valid_flag(NodeFlag.FALSE_POS, pred_props)

        # Check results json dump
        with open(out_zarr / "traccuracy-results.json") as f:
            res_dict = json.load(f)
        assert "traccuracy" in res_dict
        assert len(res_dict["traccuracy"]) == 1

    def test_division_metrics(self, tmp_path):
        # Test with valid frame buffer
        matched = larger_example_1()
        # Check results case
        results = [DivisionMetrics(max_frame_buffer=2).compute(matched)]
        out_zarr = tmp_path / "test.zarr"
        export_graphs_to_geff(out_zarr, matched, results, target_frame_buffer=2)

        gt_reader = GeffReader(out_zarr / "gt.geff")
        pred_reader = GeffReader(out_zarr / "pred.geff")

        # Check that correct properties are present
        gt_props = gt_reader.node_prop_names
        assert self.check_valid_flag(NodeFlag.TP_DIV, gt_props)
        assert self.check_valid_flag(NodeFlag.FN_DIV, gt_props)
        pred_props = pred_reader.node_prop_names
        assert self.check_valid_flag(NodeFlag.TP_DIV, pred_props)
        assert self.check_valid_flag(NodeFlag.FP_DIV, pred_props)

        # Check that frame buffer metadata is recorded
        for reader in [gt_reader, pred_reader]:
            for prop in reader.metadata.node_props_metadata.values():
                if "div" in prop.identifier:
                    assert prop.description == "Target frame buffer 2"

        # Test with bad frame buffer
        with pytest.raises(
            ValueError, match="Requested target frame buffer 4 exceeds computed frame buffer 2"
        ):
            export_graphs_to_geff(tmp_path / "test2.zarr", matched, results, target_frame_buffer=4)

    def test_multiple_metrics(self, tmp_path):
        matched = larger_example_1()
        # Test results object and the dictionary
        with pytest.warns(UserWarning, match="already calculated"):
            results = [
                DivisionMetrics(max_frame_buffer=2).compute(matched),
                BasicMetrics().compute(matched),
            ]
        out_zarr = tmp_path / "test.zarr"
        export_graphs_to_geff(out_zarr, matched, results, target_frame_buffer=2)

        # Check results json dump
        with open(out_zarr / "traccuracy-results.json") as f:
            res_dict = json.load(f)
        assert "traccuracy" in res_dict
        assert len(res_dict["traccuracy"]) == len(results)

    def test_bad_inputs(self, tmp_path):
        with pytest.raises(ValueError, match="matched argument must be an instance of `Matched`"):
            export_graphs_to_geff("path", "bad matched", [])

        matched = larger_example_1()
        results = BasicMetrics().compute(matched)

        # not a list
        with pytest.raises(ValueError, match="results argument must be a list"):
            export_graphs_to_geff("path", matched, results)

        # not a list of results
        with pytest.raises(
            ValueError, match="results argument must be a list of Results objects or dictionaries"
        ):
            export_graphs_to_geff("path", matched, ["not a result"])

        # zarr already exists
        zarr_path = tmp_path / "out.zarr"
        os.mkdir(zarr_path)
        with pytest.raises(ValueError, match="Zarr already exists"):
            export_graphs_to_geff(zarr_path, matched, [results])


class Test_save_results_json:
    def test_valid_save(self, tmp_path):
        matched = larger_example_1()
        results = BasicMetrics().compute(matched)
        out_path = tmp_path / "traccuracy-results.json"
        save_results_json([results], out_path)

        # Check results json dump
        with open(out_path) as f:
            res_dict = json.load(f)
        assert "traccuracy" in res_dict
        assert len(res_dict["traccuracy"]) == 1

    def test_bad_inputs(self, tmp_path):
        matched = larger_example_1()
        results = BasicMetrics().compute(matched)
        out_path = tmp_path / "test.json"

        # results must be list
        with pytest.raises(ValueError, match="results argument must be a list"):
            save_results_json(results, out_path)

        # must be list of results or dict
        with pytest.raises(
            ValueError, match="results argument must be a list of Results objects or dictionaries"
        ):
            save_results_json(["bad results"], out_path)

        # path already exists
        out_path.touch()
        with pytest.raises(ValueError, match=r"out_path .* already exists"):
            save_results_json([results], out_path)
