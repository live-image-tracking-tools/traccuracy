"""Subpackage for loading tracking data into memory

This subpackage contains functions for loading ground
truth or tracking method outputs into memory as TrackingGraph objects.
Each loading function must return one TrackingGraph object which has a
track graph and optionally contains a corresponding segmentation.
"""

from ._ctc import load_ctc_data, load_tiffs
from ._geff import load_geff_data
from ._point import load_point_data

__all__ = ["load_ctc_data", "load_geff_data", "load_point_data", "load_tiffs"]
