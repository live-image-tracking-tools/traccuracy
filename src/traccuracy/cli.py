from __future__ import annotations

import json
import logging
from typing import TYPE_CHECKING, Annotated

import typer

from traccuracy import run_metrics
from traccuracy.loaders import load_ctc_data

if TYPE_CHECKING:
    from traccuracy import TrackingGraph

logger = logging.getLogger(__name__)

app = typer.Typer()


def load_all_ctc(
    gt_dir: str,
    pred_dir: str,
    gt_track_path: str | None = None,
    pred_track_path: str | None = None,
) -> tuple[TrackingGraph, TrackingGraph]:
    gt_data = load_ctc_data(gt_dir, gt_track_path)
    pred_data = load_ctc_data(pred_dir, pred_track_path)
    return gt_data, pred_data


@app.command()
def run_ctc(
    gt_dir: Annotated[str, typer.Argument(help="Path to GT tiffs", show_default=False)],
    pred_dir: Annotated[
        str, typer.Argument(help="Path to prediction/RES tiffs", show_default=False)
    ],
    gt_track_path: Annotated[
        str | None, typer.Option(help="Path to ctc gt track file", show_default=False)
    ] = None,
    pred_track_path: Annotated[
        str | None, typer.Option(help="Path to predicted track file", show_default=False)
    ] = None,
    out_path: Annotated[str, typer.Option(help="Path to save results")] = "ctc_log.json",
) -> None:
    """
    Load data from CTC format and run TRA and DET metric on gt and pred data using CTC matching.

    If --gt_track_path and --pred_track_path are not passed, we find ``*_track.txt``
    files in the data directories. If more than one such file is present, or
    no such files are present, an error is raised.

    Results will be dumped to --out_path in JSON format.
    """
    from traccuracy.matchers import CTCMatcher
    from traccuracy.metrics import CTCMetrics

    gt_data, pred_data = load_all_ctc(gt_dir, pred_dir, gt_track_path, pred_track_path)
    result, matched = run_metrics(gt_data, pred_data, CTCMatcher(), [CTCMetrics()])
    with open(out_path, "w") as fp:
        json.dump(result, fp)
    logger.info(f"TRA: {result[0]['results']['TRA']}")
    logger.info(f"DET: {result[0]['results']['DET']}")


typer_click_object = typer.main.get_command(app)


def main() -> None:
    app()
