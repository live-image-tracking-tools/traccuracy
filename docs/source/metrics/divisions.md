(division-metrics)=
# Division Metrics

Division metrics are computed using the annotations described in {doc}`../track_errors/divisions`.

:::{warning}
These metrics are written assuming that the ground truth annotations are dense. If that is not the case, interpret the numbers carefully. Consider eliminating metrics that use the number of false positives (including Precision and F1 Score).
:::

Division metrics can be calculated as follows:

```python
from traccuracy.matchers import PointMatcher
from traccuracy.metrics import DivisionMetrics

# Load data using a function of your choice from traccuracy.loaders
# Or initialize a TrackingGraph with a nx.DiGraph and optional segmentation arrays
gt_data: TrackingGraph
pred_data: TrackingGraph

# frame_buffer determines the size of a window in which a division can occur but not
# be in the same frame while still being counted as correct
frame_buffer = 2

results, matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=PointMatcher(), # Select any matcher that returns a one-to-one mapping
    metrics=[DivisionMetrics(max_frame_buffer=frame_buffer)]
)
```

The `results` object contains a dictionary `results.results` that stores all values associated with the metric.

The following counts are returned for each size of frame buffer ranging from 0 to `max_frame_buffer`:

- Total GT Divisions
- Total Predicted Divisions
- [True Positive Divisions](div-tp)
- [False Negative Divisions](div-fn)
- [False Positive Divisions](div-fp)

If `relax_skips_gt` or `relax_skips_pred` are set to True, the following additional counts are returned and included in the calculation of summary statistics listed below. For a complete description of how skip edges are handled, see [here](div-skip-edge).

- Skip True Positive Divisions

Several standard summary statistics are computed using the counts above:

- {term}`Recall`
- {term}`Precision`
- {term}`F1 Score`, also known as [Branching Correctness](ctc-bc)
- [Mitotic Branching Score](mbc)

(mbc)=
## Mitotic Branching Score

Mitotic Branching Score (MBC) is defined by Ulcina et al.[^1] as $ \frac{\textrm{TP}}{\textrm{TP} + \textrm{FP} + \textrm{FN}} $.


[^1]: Ulicna, K., Vallardi, G., Charras, G. & Lowe, A. R. Automated deep lineage tree analysis using a Bayesian single cell tracking approach. Frontiers in Computer Science 3, 734559 (2021).
