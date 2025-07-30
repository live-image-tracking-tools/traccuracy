from pathlib import Path

import numpy as np
import pytest

from traccuracy import run_metrics
from traccuracy.loaders import load_ctc_data
from traccuracy.matchers import CTCMatcher
from traccuracy.metrics import CHOTAMetric


def test_replicating_ctc_metrics_test() -> None:
    project_root = Path(__file__).parent.parent.parent

    gt_path = project_root / "downloads/Fluo-N2DL-HeLa/01_GT/TRA"
    if not gt_path.exists():
        pytest.skip(f"GT path not found at {gt_path}")

    res_path = project_root / "examples/sample-data/Fluo-N2DL-HeLa/01_RES"
    if not res_path.exists():
        pytest.skip(f"RES path not found at {res_path}")

    input_graph = load_ctc_data(str(res_path), run_checks=False)
    gt_graph = load_ctc_data(str(gt_path), run_checks=False)

    matcher = CTCMatcher()
    metrics_func = [CHOTAMetric()]

    metrics_dict, _ = run_metrics(
        gt_graph,
        input_graph,
        matcher,
        metrics_func,
    )

    # uncomment to evaluate other metrics
    # metrics = {k: metrics_dict[0]["results"][k] for k in ["DET", "TRA"]}
    # metrics["CHOTA"] = metrics_dict[1]["results"]["CHOTA"]

    metrics = {}
    metrics["CHOTA"] = metrics_dict[0]["results"]["CHOTA"]

    # hard-coded values from running py-ctcmetrics command
    # $ ctc_evaluate \
    # --res <YOUR_TRACCURACY_ROOT>/examples/sample-data/Fluo-N2DL-HeLa/01_RES \
    # --gt <YOUR_TRACCURACY_ROOT>/downloads/Fluo-N2DL-HeLa/01_GT
    expected_values = {
        # "DET": 0.9954855886097927,
        # "TRA": 0.9936361895740329,
        "CHOTA": 0.9224725394515368,
    }

    atol = 1e-10  # CHOTA works with 1e-10 precision, TRA needs larger tolerance

    for key, expected_value in expected_values.items():
        assert np.isclose(metrics[key], expected_value, atol=atol), (
            f"{key=} {metrics[key]=} {expected_value=}"
        )
