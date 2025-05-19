"""package description."""

from importlib.metadata import PackageNotFoundError, version

try:
    __version__ = version("traccuracy")
except PackageNotFoundError:  # pragma: no cover
    __version__ = "uninstalled"

from ._run_metrics import run_metrics
from ._tracking_graph import EdgeFlag, NodeFlag, TrackingGraph

__all__ = ["EdgeFlag", "NodeFlag", "TrackingGraph", "run_metrics"]
