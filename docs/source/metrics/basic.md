(basic-metrics)=
# Basic Performance Metrics

Basic performance metrics are computed based on the error classifications described in {doc}`../track_errors/basic`.

:::{warning}
These metrics are written assuming that the ground truth annotations are dense. If that is not the case, interpret the numbers carefully. Consider eliminating metrics that use the number of false positives (including Precision and F1 Score).
:::

These metrics can be computed as follows:
```python
from traccuracy.matchers import PointMatcher
from traccuracy.metrics import BasicMetrics

# Data loaded using a function from traccuracy.loaders or constructed explicitly using a networkx graph and associated information
gt_data: TrackingGraph
pred_data: TrackingGraph

results, matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=PointMatcher(), # Choose a matcher that produces a one-to-one mapping
    metrics=[BasicMetrics()]
)
```

The `results` object contains a dictionary `results.results` that stores all values associated with the metric.

The following counts are returned:

- Total ground truth
- Total predicted
- [True positives nodes](basic-node-tp)
- [False positive nodes](basic-node-fp)
- [False negative nodes](basic-node-fn)
- [True positives edges](basic-edge-tp)
- [False positive edges](basic-edge-fp)
- [False negative edges](basic-edge-fn)

If `relax_skips_gt` or `relax_skips_pred` are set to True, the following additional counts are returned and included in the calculation of summary statistics listed below. For a complete description of how skip edges are handled, see [here](basic-skip-edge).

- Skip true positives
- Skip false positives
- Skip false negatives

Using these counts, the following summary stastics are computed for both nodes and edges:

- {term}`Recall`
- {term}`Precision`
- {term}`F1 Score`
