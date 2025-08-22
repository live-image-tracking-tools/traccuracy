(ctc-metrics)=
# CTC/AOGM Metrics

These metrics are an implementation of the Cell Segmentation & Tracking Challenge TRA and DET metrics,
as described on the Challenge [website](http://celltrackingchallenge.net/evaluation-methodology/),
as well as the more general Acyclic Oriented Graph Measure (AOGM) metric, as described in [this
paper](https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0144959&type=printable).

:::{warning}
These metrics are written assuming that the ground truth annotations are dense. If that is not the case, interpret the numbers carefully. Consider eliminating metrics that use the number of false positives.
:::

These metrics can be computed as follows:
```python
from traccuracy.loaders import load_ctc_data
from traccuracy.matchers import CTCMatcher
from traccuracy.metrics import CTCMetrics


gt_data = load_ctc_data(
    "path/to/GT/TRA",
    "path/to/GT/TRA/man_track.txt",
    name="GT"
)
pred_data = load_ctc_data(
    "path/to/prediction",
    "path/to/prediction/track.txt",
    name="prediction"
)

ctc_results, ctc_matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=CTCMatcher(),
    metrics=[CTCMetrics()]
)
```

## DET

This metric assesses the solution's detection performance only, and therefore only measures
and annotates node errors.

Each type of node error is weighted based on how difficult it would be for a human to correct
the error by hand. The original Cell Tracking Challenge weights are used for all error types:

- [Non-Split nodes](ctc-node-ns) are weighted 5
- [False Negative nodes](ctc-node-fn) are weighted 10
- [False Positive nodes](ctc-node-fp) are weighted 1

To compute the DET score for a dataset, the weighted sum of all node errors in the solution ($AOGM-D$)
is normalized to a 0-1 value using a maximum potential error. The maximum potential error
($AOGM-D_{0}$) is defined as the cost of creating the ground truth nodes from scratch i.e. assume all
nodes in the ground truth are False Negative, and compute the weighed sum of errors
on this graph.

The final DET score is therefore:

$$
DET = 1 - min(AOGM-D, AOGM-D_{0}) / AOGM-D_{0}
$$

Using the metrics calculated above:

```python
det = ctc_results.results["DET"]
```

## LNK

This metric assesses the solution's linking performance only, and therefore only measures
and annotates edge errors.

Each type of edge error is weighted based on how difficult it would be for a human to correct
the error by hand. The original Cell Tracking Challenge weights are used for all error types:

- [Wrong-Semantic edges](ctc-edge-ws) are weighted 1
- [False Negative edges](ctc-edge-fn) are weighted 1.5
- [False Positive edges](ctc-edge-fp) are weighted 1

To compute the LNK score for a dataset, the weighted sum of all edge errors in the solution ($AOGM-A$)
is normalized to a 0-1 value using a maximum potential error. The maximum potential error
($AOGM-A_{0}$) is defined as the cost of creating the ground truth edges from scratch i.e. assume all
edges in the ground truth are False Negative, and compute the weighed sum of errors
on this graph.

The final LNK score is therefore:

$$
LNK = 1 - min(AOGM-A, AOGM-A_{0}) / AOGM-A_{0}
$$

Using the results calculated above:

```python
lnk = ctc_results.results["LNK"]
```

## TRA

The TRA measure assesses the solution's detection *and* tracking performance and therefore
includes both the node errors specified in DET (with identical weights) and the edge errors
computed by the general AOGM metric. Edge error weights are as follows:

- [Wrong-Semantic edges](ctc-edge-ws) are weighted 1
- [False Negative edges](ctc-edge-fn) are weighed 1.5
- [False Positive edges](ctc-edge-fp) are weighted 1

To compute the TRA score, the weighted sum of all node and edge errors in the solution ($AOGM$)
is normalized to a 0-1 value using a maximum potential error. The maximum potential error ($AOGM_{0}$) is again
defined based on the weighted error sum of an empty solution graph i.e. assume all nodes and edges in the ground truth
are False Negative, and computed the weighted sum of errors on this graph.

The final TRA score is therefore:

$$
TRA = 1 - min(AOGM, AOGM_{0}) / AOGM_{0}
$$

Using the results calculated above:

```python
tra = ctc_results.results["TRA"]
```

## AOGM

The AOGM metric is a generalized graph measure that allows users to define their own
error weights for each type of node and edge error. The AOGM is simply the
weighted sum of all errors. This means that unlike the TRA and DET metrics,
the AOGM is **not** normalized to 0-1. The AOGM ranges between 0 (when
the predicted solution and ground truth are identical) and infinity (because in theory
an infinitely large predicted graph could be matched against ground truth), where
larger numbers mean more errors.

Note that the same process used to normalize TRA and DET can be used to normalize the
generalized AOGM - once the weights are chosen, compute the error sum of an empty solution
and use this to normalize the error sum of the predicted solution.

Using the results calculated above:

```python
aogm = ctc_results.results["AOGM"]
```

## CTC Bio Metrics

The CTC has also introduced a set of metrics that captures biologically inspired metrics. 

(ctc-bc)=
### Branching Correctness (BC)

BC is defined as the F1 score for division detection within a given frame tolerance. Division metrics in `traccuracy` require a one-to-one matching, which the `CTCMatcher` can return, but is not guaranteed. Alternatively, other matchers are available as described in <project:../matchers/matchers.md>.

Continuing from the code sample above, BC can be calculated as follows:

```python
from traccuracy.metrics import DivisionMetrics

assert ctc_matched.matching_type == "one-to-one"

div_results = DivisionMetrics(max_frame_buffer=0).compute(gt_data, pred_data)
branching_correctness = div_results.results["Division F1"]
```

(cca)=
### Cell Cycle Accuracy (CCA)

The CCA metric captures the ability of a method to identify a distribution of cell
cycle lengths that matches the distribution present in the ground truth. The evaluation
is done on distributions and therefore does not require a matching of solution to the
ground truth. It ranges from [0,1] with higher values indicating better performance.

```python
from traccuracy.metrics import CellCycleAccuracy

cca_results = CellCycleAccuracy().compute(gt_data, pred_data)
cca = cca_results.results["CCA"]
```