import numpy as np
import pytest

from traccuracy import run_metrics
from traccuracy.loaders import load_ctc_data
from traccuracy.matchers import CTCMatcher
from traccuracy.metrics import CHOTAMetric, CTCMetrics


def test_replicating_ctc_metrics_test(pytestconfig: pytest.Config) -> None:
    ctc_data_dir = pytestconfig.cache._cachedir / "test_dataset_ctc/train/BF-C2DL-HSC"
    if not ctc_data_dir.exists():
        pytest.skip(
            f"CTC data not found at {ctc_data_dir}.\n"
            "Download from 'https://www.tnt.uni-hannover.de/de/project/MPT/data/CTC/test_dataset_ctc.zip'"
            "and extract it to the pytest cache directory (.pytest_cache)."
        )

    input_graph = load_ctc_data(str(ctc_data_dir / "01_RES"), run_checks=False)
    gt_graph = load_ctc_data(str(ctc_data_dir / "01_GT/TRA"), run_checks=False)

    matcher = CTCMatcher()
    metrics_func = [CTCMetrics(), CHOTAMetric()]

    metrics_dict, _ = run_metrics(
        gt_graph,
        input_graph,
        matcher,
        metrics_func,
    )

    metrics = {k: metrics_dict[0]["results"][k] for k in ["DET", "TRA"]}
    metrics["CHOTA"] = metrics_dict[1]["results"]["CHOTA"]

    # # from: https://github.com/CellTrackingChallenge/py-ctcmetrics/blob/main/test/utils.py
    expected_values = {
        "DET": 0.95377521,
        # "SEG": 0.903990207454052,
        "TRA": 0.9588616,
        "CHOTA": 0.6100031649165364,
        # "CCA": 0.060606060606061,
        # "CT": 0.0190476,
        # "TF": 0.72417699,
        # "BC(0)": 0.434782,
        # "BC(1)": 0.47826086,
        # "BC(2)": 0.47826086,
        # "BC(3)": 0.47826086,
    }

    for key, expected_value in expected_values.items():
        assert np.isclose(metrics[key], expected_value, atol=1e-6), (
            f"{key=} {metrics[key]=} {expected_value=}"
        )
