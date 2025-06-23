# Basic Performance Metrics

Basic performance metrics are computed based on the error classifications described in {doc}`../track_errors/basic`.

:::{warning}
These metrics are written assuming that the ground truth annotations are dense. If that is not the case, interpret the numbers carefully. Consider eliminating metrics that use the number of false positives.
:::

For both nodes and edges, the following counts are returned:

- Total ground truth
- Total predicted
- True positives
- False positives
- False negatives

Using these counts, the following summary stastics are computed for both nodes and edges:

- Recall
- Precision
- F1 Score
