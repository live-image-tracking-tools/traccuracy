import os

import zarr
from geff import GeffMetadata, read_nx

from traccuracy._tracking_graph import TrackingGraph


def load_geff_data(
    geff_path: str,
    load_geff_seg: bool = False,
    seg_path: str | None = None,
    seg_property: str | None = None,
    name: str | None = None,
    load_all_props: bool = False,
) -> TrackingGraph:
    """Load a graph into memory from a geff file

    Segmentations can be optionally loaded either from a related object specified in
    the geff (`load_geff_seg=True`) or with a path to a zarr array `seg_path` and `seg_property`

    Args:
        geff_path (str): Path to a geff group inside of a zarr,
        load_geff_seg (bool, optional): Load segmentation based on a geff metadata of
            related segmentation. Defaults to False.
        seg_path (str | None, optional): Path to a zarr array containing segmentation data.
            We assume that the axes order in your segmentation array matches the axes in your geff.
            If this is not true please load the segmentation yourself and add it to
            TrackingGraph.segmentation. Defaults to None.
        seg_property (str | None, optional): If seg_path provided, this is the corresponding
            property on the geff graph that contains the segmentation key. Defaults to None.
        name (str | None, optional): Optional name to store on TrackingGraph for identification.
            Defaults to None.
        load_all_props (bool, optional): If True, load all node and edge properties on the graph.
            Defaults to False and only spatiotemporal and segmentation node properties are loaded.
    """
    if load_geff_seg and seg_path is not None:
        raise ValueError('Please specify either load_geff_seg=True or seg_path="path/to/seg.zarr"')
    if seg_path is not None and seg_property is None:
        raise ValueError(
            "If seg_path is specified, a corresponding seg_property must be specified to link "
            "segmentations to a segmentation label property on the graph"
        )

    # Collect names of axes so that we only load spatial properties
    meta = GeffMetadata.read(geff_path)
    spatial_props = []
    temporal_prop = None
    if meta.axes is None:
        raise ValueError("No spatial or temporal axes were found in the input geff")
    for ax in meta.axes:
        if ax.type == "time":
            temporal_prop = ax.name
        elif ax.type == "space":
            spatial_props.append(ax.name)

    if temporal_prop is None:
        raise ValueError("A required time property was not found in the axes of the input geff")
    if len(spatial_props) == 0:
        raise ValueError("Required spatial axes were not found in the axes of the input geff")

    load_props = [*spatial_props, temporal_prop]

    segmentation = None
    # Load segmentation from related objects
    if load_geff_seg:
        # Look for labels in related objects
        rel_obj_path = None
        for rel_obj in meta.related_objects:
            if rel_obj.type == "labels":
                rel_obj_path = os.path.join(geff_path, rel_obj.path)
                label_key = rel_obj.label_prop

        if rel_obj_path is None:
            raise ValueError('Did not find related_object of type "labels" in geff related objects')
        else:
            load_props.append(label_key)
            segmentation = zarr.open_array(rel_obj_path)

    # Load segmentation from stand alone zarr
    if seg_path is not None:
        segmentation = zarr.open_array(seg_path)[:]
        load_props.append(seg_property)

    # Check dimensionality of segmentation if loaded
    if segmentation is not None and len(segmentation.shape) != 1 + len(spatial_props):
        raise ValueError(
            f"Expected dimensionality of segmentation data {1 + len(spatial_props)}D "
            f"does not match shape {segmentation.shape}"
        )

    if load_all_props:
        G, _ = read_nx(geff_path)
    else:
        G, _ = read_nx(geff_path, node_props=load_props, edge_props=[])

    return TrackingGraph(
        graph=G,
        segmentation=segmentation,
        frame_key=temporal_prop,
        location_keys=tuple(spatial_props),
        name=name,
    )
