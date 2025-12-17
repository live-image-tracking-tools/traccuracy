import numpy as np
import pytest
import zarr
from geff import read, write
from geff.testing.data import (
    create_mock_geff,
    create_simple_2d_geff,
    create_simple_temporal_geff,
)

from traccuracy.loaders._geff import load_geff_data


class Test_load_geff_data:
    def geff_to_disk(self, store, path):
        graph, meta = read(store, backend="networkx")
        write(graph, path, meta)

    def test_simple_2d(self, tmp_path):
        zarr_path = tmp_path / "test.zarr"
        store, _ = create_simple_2d_geff(directed=True)
        self.geff_to_disk(store, zarr_path)
        tg = load_geff_data(zarr_path)
        assert len(tg.get_location(0)) == 2

        # Check for no edge attributes
        assert tg.graph.edges[(0, 1)] == {}

        # test with loading other attributes
        tg = load_geff_data(zarr_path, load_all_props=True)
        assert "score" in tg.graph.edges[(0, 1)]

    def test_undirected(self, tmp_path):
        zarr_path = tmp_path / "test.zarr"
        store, _ = create_simple_2d_geff(directed=False)
        self.geff_to_disk(store, zarr_path)
        with pytest.raises(
            ValueError, match=r"traccuracy only supports directed graphs. Found undirected graph at"
        ):
            load_geff_data(zarr_path)

    def test_no_time(self, tmp_path):
        zarr_path = tmp_path / "test.zarr"
        store, _ = create_mock_geff(
            node_id_dtype="uint",
            node_axis_dtypes={"position": "float64", "time": "float64"},
            include_t=False,
            directed=True,
        )
        self.geff_to_disk(store, zarr_path)
        with pytest.raises(
            ValueError, match="A required time property was not found in the axes of the input geff"
        ):
            load_geff_data(zarr_path)

    def test_no_spatial(self, tmp_path):
        zarr_path = tmp_path / "test.zarr"
        store, _ = create_simple_temporal_geff(directed=True)
        self.geff_to_disk(store, zarr_path)
        with pytest.raises(
            ValueError, match="Required spatial axes were not found in the axes of the input geff"
        ):
            load_geff_data(zarr_path)

    def test_good_seg(self, tmp_path):
        zarr_path = tmp_path / "test.zarr"
        geff_path = zarr_path / "tracks"
        seg_group = "seg"
        seg_prop = "seg_id"  # not the default value segmentation_id

        geff_store, attrs = create_mock_geff(
            node_id_dtype="uint",
            node_axis_dtypes={"position": "float64", "time": "float64"},
            directed=True,
            extra_node_props={seg_prop: "int"},
        )
        self.geff_to_disk(geff_store, geff_path)
        t_len = int(max(attrs["node_props"]["t"]["values"]))

        store = zarr.open(zarr_path)
        store[seg_group] = np.zeros((t_len, 20, 20, 10), dtype="int")

        tg = load_geff_data(geff_path, seg_path=zarr_path / seg_group, seg_property=seg_prop)
        assert tg.segmentation is not None

    def test_missing_seg_prop(self):
        with pytest.raises(
            ValueError,
            match="If seg_path is specified, a corresponding seg_property must be specified to link"
            " segmentations to a segmentation label property on the graph",
        ):
            load_geff_data("geff_path.zarr", seg_path="seg_path.zarr")

    def test_bad_dim_seg(self, tmp_path):
        geff_path = tmp_path / "test.zarr" / "tracks"
        seg_path = tmp_path / "seg.zarr"
        seg_group = "seg"
        seg_prop = "segmentation_id"

        geff_store, attrs = create_mock_geff(
            node_id_dtype="uint",
            node_axis_dtypes={"position": "float64", "time": "float64"},
            directed=True,
            extra_node_props={seg_prop: "int"},
        )
        self.geff_to_disk(geff_store, geff_path)
        t_len = int(max(attrs["node_props"]["t"]["values"]))

        store = zarr.open(seg_path)
        store[seg_group] = np.zeros((t_len, 20, 20), dtype="int")

        with pytest.raises(ValueError, match="Expected dimensionality of segmentation data"):
            load_geff_data(geff_path, seg_path=seg_path / seg_group, seg_property=seg_prop)

    def test_load_rel_obj(self, tmp_path):
        zarr_path = tmp_path / "test.zarr"
        geff_path = zarr_path / "tracks"
        seg_group = "seg"
        seg_prop = "segmentation_id"

        geff_store, attrs = create_mock_geff(
            node_id_dtype="uint",
            node_axis_dtypes={"position": "float64", "time": "float64"},
            directed=True,
            extra_node_props={seg_prop: "int"},
        )
        graph, meta = read(geff_store, backend="networkx")
        meta.related_objects = [
            {"type": "labels", "path": f"../{seg_group}", "label_prop": seg_prop}
        ]
        write(graph=graph, metadata=meta, store=geff_path)

        t_len = int(max(attrs["node_props"]["t"]["values"]))
        store = zarr.open(zarr_path)
        store[seg_group] = np.zeros((t_len, 20, 20, 10), dtype="int")

        tg = load_geff_data(geff_path, load_geff_seg=True)
        assert tg.segmentation is not None

    def test_no_double_seg_args(self):
        with pytest.raises(
            ValueError,
            match=r'Please specify either load_geff_seg=True or seg_path="path/to/seg.zarr"',
        ):
            load_geff_data("geff_path.zarr", seg_path="seg_path.zarr", load_geff_seg=True)
