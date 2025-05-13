import os
from pathlib import Path

from typer.testing import CliRunner

from traccuracy.cli import app

ROOT_DIR = Path(__file__).resolve().parents[1]


runner = CliRunner()


def test_run_ctc():
    data_path = os.path.join(ROOT_DIR, "examples/sample-data/Fluo-N2DL-HeLa/01_RES")
    track_path = os.path.join(data_path, "res_track.txt")
    log_path = "ctc_log.json"

    # Test without specifying track path
    result = runner.invoke(app, [data_path, data_path])
    assert result.exit_code == 0, result.stdout
    assert os.path.exists(log_path)
    os.remove(log_path)

    # Specify track paths
    result = runner.invoke(
        app, [data_path, data_path, "--gt-track-path", track_path, "--pred-track-path", track_path]
    )
    assert result.exit_code == 0, result.stdout
    assert os.path.exists(log_path)
    os.remove(log_path)

    # Change output name
    log_path = "other_output.json"
    result = runner.invoke(
        app,
        [
            data_path,
            data_path,
            "--gt-track-path",
            track_path,
            "--pred-track-path",
            track_path,
            "--out-path",
            log_path,
        ],
    )
    assert result.exit_code == 0, result.stderr
    assert os.path.exists(log_path)
    os.remove(log_path)
