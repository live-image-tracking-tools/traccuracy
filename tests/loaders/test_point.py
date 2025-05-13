import os

import pandas as pd
import pytest

from traccuracy.loaders._point import load_point_data


class Test_load_point_data:
    def get_valid_df(self, nrows):
        df = pd.DataFrame(
            {
                "parent": range(-1, nrows - 1),
                "t": range(nrows),
                "x": range(nrows),
                "y": range(nrows),
                "z": range(nrows),
                "node_id": range(nrows),
            }
        )
        return df

    def test_exceptions(self):
        nrows = 5

        # No data source
        with pytest.raises(ValueError, match="Must provide either a path or a dataframe"):
            load_point_data()

        # Bad parent column
        data = {}
        with pytest.raises(ValueError, match="Specified parent_column *"):
            load_point_data(df=pd.DataFrame(data))

        # Bad id column
        data = {"parent": range(nrows)}
        with pytest.raises(ValueError, match="Specified id_column *"):
            load_point_data(df=pd.DataFrame(data))

        # All pos columns missing
        data = {**data, "node_id": range(nrows)}
        with pytest.raises(ValueError, match="Specified pos_columns *"):
            load_point_data(df=pd.DataFrame(data))

        # One pos column missing
        data = {**data, "x": range(nrows), "y": range(nrows)}
        with pytest.raises(ValueError, match="Specified pos_columns *"):
            load_point_data(df=pd.DataFrame(data))

        # Time missing
        data = {**data, "z": range(nrows)}
        with pytest.raises(ValueError, match="Specified time_column *"):
            load_point_data(df=pd.DataFrame(data))

        data = {**data, "t": range(nrows)}
        with pytest.raises(ValueError, match="Specified seg_id_column *"):
            load_point_data(df=pd.DataFrame(data), seg_id_column="seg_label")

    def test_load_from_dataframe(self):
        # Make a valid dataframe using defaults
        nrows = 5
        df = self.get_valid_df(nrows)

        track_graph = load_point_data(df=df, name="test")
        assert len(track_graph.graph.nodes) == nrows
        assert len(track_graph.graph.edges) == nrows - 1
        assert track_graph.get_location(0) == [0, 0, 0]
        assert track_graph.name == "test"

        # Change parent default
        df_mod = df.rename(columns={"parent": "pid"})
        track_graph = load_point_data(df=df_mod, parent_column="pid")
        assert len(track_graph.graph.edges) == nrows - 1

        # Change parent value to be None
        df_mod = df.copy()
        df_mod.loc[0, "parent"] = None
        track_graph = load_point_data(df=df_mod)
        assert len(track_graph.graph.edges) == nrows - 1

        # Change pos default
        df_mod = df.drop(columns=["z"])
        track_graph = load_point_data(df=df_mod, pos_columns=("y", "x"))
        assert track_graph.get_location(0) == [0, 0]

        # Change time default
        df_mod = df.rename(columns={"t": "time"})
        track_graph = load_point_data(df=df_mod, time_column="time")
        assert track_graph.frame_key == "time"
        assert "time" in track_graph.graph.nodes[0]

        # Check seg_label
        seg_id_col = "seg_id"
        df[seg_id_col] = range(nrows)
        track_graph = load_point_data(df=df, seg_id_column=seg_id_col)
        assert track_graph.label_key == seg_id_col
        assert seg_id_col in track_graph.graph.nodes[0]

        # Change id default
        df["node_id"] = range(10, 10 + nrows)
        df["parent"] = [-1, *list(range(10, 10 + nrows - 1))]
        track_graph = load_point_data(df=df, id_column="node_id")
        assert set(track_graph.nodes.keys()) == set(df["node_id"])

    def test_csv_kwargs(self, tmpdir):
        df = self.get_valid_df(5)
        filepath = os.path.join(tmpdir, "test.csv")

        df.to_csv(filepath)
        load_point_data(filepath)

        # Test different separator
        sep = "\t"
        df.to_csv(filepath, sep=sep)
        load_point_data(filepath, sep=sep)
