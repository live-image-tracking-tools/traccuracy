(sparse-metric)=
# Sparse Tracking Metrics

`SparseTrackingMetrics` implements the edge and division Jaccard score used by the
[royerlab cell tracking competition](https://github.com/royerlab/kaggle-cell-tracking-competition).
Unlike the other metrics in traccuracy, it is designed for **sparsely annotated ground
truth**: ground truth in which only a subset of the real cells are annotated, so a
correct prediction inevitably contains nodes and edges the ground truth does not cover.

:::{note}
This is the only metric in traccuracy that is valid on sparse ground truth
(`supports_sparse_gt = True`). Predicted nodes and edges that have no ground truth
counterpart are *ignored* rather than counted as false positives, so a method is not
penalized for correctly tracking cells the annotator skipped. See
[the metrics overview](sparse-annotations) for how the dense/sparse capability is
marked across metrics.
:::

Nodes are matched one-to-one by centroid distance, so this metric requires a
{class}`~traccuracy.matchers.PointMatcher` matching. The matcher's `threshold` (maximum
matching distance) and `scale_factor` (for anisotropic data) are reused internally for
the per-division local re-matching.

```python
from traccuracy import run_metrics
from traccuracy.matchers import PointMatcher
from traccuracy.metrics import SparseTrackingMetrics

# gt_data and pred_data are TrackingGraphs whose nodes carry a time and a location.
results, matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=PointMatcher(threshold=7.0),  # maximum matching distance
    metrics=[SparseTrackingMetrics(n_gt_nodes=estimated_total_true_nodes)],
)
```

## Edge Jaccard

A predicted edge $(u, v)$ is a **true positive** when both endpoints are matched to
ground truth nodes $g_u$ and $g_v$ that are connected by a ground truth edge. Every
ground truth edge without such a match is a **false negative**. A predicted edge that is
not a true positive is a **false positive** only when there is ground truth evidence
against it — either its source is matched to a ground truth node with an outgoing edge,
or its target is matched to a ground truth node with an incoming edge. Predicted edges
with no such evidence (both endpoints unmatched, or matched to a ground truth track start
or end) are ignored.

$$edge\ Jaccard = \frac{TP}{TP + FP + FN}$$

### Adjusted edge Jaccard

To penalize excess predicted nodes, the edge Jaccard is scaled by a penalty on the total
number of predicted nodes relative to a coarse estimate of the true node count
(`n_gt_nodes`, which includes the cells the ground truth does not annotate):

$$adjusted\ Jaccard = \max\left(0,\ Jaccard \cdot \left(1 - a \cdot \frac{N_{pred} - N_{true}}{N_{true}}\right)\right)$$

with $a = 0.1$ (`node_ratio_weight`) by default. When `n_gt_nodes` is not provided, the
adjusted Jaccard and the combined score are `NaN`; use `edge_jaccard` as the
estimate-free number.

## Division Jaccard

Divisions are scored with a tolerance of ±1 timepoint. For each ground truth dividing
node, the surrounding division subgraph (parent, divider, children, grandchildren) is
extracted and the prediction is re-matched against it locally. A ground truth division is
a **true positive** when a single connected component of the prediction has a matched node
at a pre-split timepoint, touches both daughter lineages (possibly at different
timepoints, which absorbs the ±1 tolerance), and contains a predicted dividing cell. A
maximum-cardinality bipartite matching ensures each predicted fork is credited to at most
one ground truth division. A predicted fork matched to an annotated ground truth node but
not paired to any ground truth division is a **false positive**; a ground truth division
that is not recovered is a **false negative**.

$$division\ Jaccard = \frac{TP}{TP + FP + FN}$$

## Combined score

$$score = adjusted\ edge\ Jaccard + w \cdot division\ Jaccard$$

with a small weight $w = 0.1$ (`division_weight`) on the division term, which is dropped
when there are no divisions. A single call computes metrics on one (prediction, ground
truth) pair; the competition's dataset-level score micro-averages the counts across all
videos, which you can reproduce by summing the per-pair `*_tp`/`*_fp`/`*_fn` outputs
before taking the Jaccard.
