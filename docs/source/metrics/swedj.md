(swedj-metric)=
# Sparse Weighted Edge and Division Jaccard (SWEDJ)

`SparseWeightedEdgeDivisionJaccard` (SWEDJ) implements the edge and division Jaccard score used by the
[royerlab cell tracking competition](https://github.com/royerlab/kaggle-cell-tracking-competition).
It is one of traccuracy's [sparse-ground-truth-capable metrics](sparse-annotations)
(`supports_sparse_gt = True`), built for ground truth in which only a subset of the real
cells are annotated, so a correct prediction inevitably contains nodes and edges the
ground truth does not cover.

:::{note}
This metric is valid on sparse ground truth (`supports_sparse_gt = True`), as are
[Complete Tracklets and Lineages](complete-tracks) and
[Complete Tracks by Length](complete-tracks-by-length-metric). A predicted node or edge
is not counted as a false positive *solely* because it has no ground truth counterpart,
so a method is not penalized for correctly tracking cells the annotator skipped.
(Predictions the annotation *can* judge are still scored — see the false-positive rules
below.) See [the metrics overview](sparse-annotations) for how the dense/sparse
capability is marked across metrics.
:::

Nodes are matched one-to-one by centroid distance, so this metric requires a
{class}`~traccuracy.matchers.PointMatcher` matching. The matcher's `threshold` (maximum
matching distance) and `scale_factor` (for anisotropic data) are reused internally for
the per-division local re-matching.

```python
from traccuracy import run_metrics
from traccuracy.matchers import PointMatcher
from traccuracy.metrics import SparseWeightedEdgeDivisionJaccard

# gt_data and pred_data are TrackingGraphs whose nodes carry a time and a location.
results, matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=PointMatcher(threshold=7.0),  # maximum matching distance
    metrics=[SparseWeightedEdgeDivisionJaccard(n_gt_nodes=estimated_total_true_nodes)],
)
```

## Edge Jaccard

Predicted edges are first hardened against implausible topology: only edges spanning a
single forward timepoint ($t_{target} = t_{source} + 1$) are scored — backward,
same-frame and gap-closing edges are dropped — and each source keeps at most two
outgoing edges (a division has at most two children), so surplus children are dropped
too. A surviving predicted edge $(u, v)$ is a **true positive** when both endpoints are
matched to ground truth nodes $g_u$ and $g_v$ that are connected by a ground truth edge.
Every ground truth edge without such a match is a **false negative**. A surviving edge
that is not a true positive is a **false positive** only when there is ground truth
evidence against it — either its source is matched to a ground truth node with an
outgoing edge, or its target is matched to a ground truth node with an incoming edge.
Edges with no such evidence (both endpoints unmatched, or matched to a ground truth track
start or end) are ignored.

$$edge\ Jaccard = \frac{TP}{TP + FP + FN}$$

```{figure} figures/edge_jaccard.svg
:alt: Predicted edges labelled TP, FP and FN against sparse ground truth

How predicted edges are labelled true positive, false positive and false negative
against sparse ground truth on the `simple` example.
```

### Adjusted edge Jaccard

To penalize excess predicted nodes, the edge Jaccard is scaled by a penalty on the total
number of predicted nodes relative to a coarse estimate of the true node count
(`n_gt_nodes`, which includes the cells the ground truth does not annotate):

$$adjusted\ Jaccard = \max\left(0,\ Jaccard \cdot \left(1 - a \cdot \frac{N_{pred} - N_{true}}{N_{true}}\right)\right)$$

with $a = 0.1$ (`node_ratio_weight`) by default. When `n_gt_nodes` is not provided, the
adjusted Jaccard and `total_node_ratio` are `NaN` (the excess-node penalty is skipped)
and the combined `score` falls back to the raw `edge_jaccard` term.

## Division Jaccard

Divisions are scored with a tolerance of ±1 timepoint using a local window. For each
ground truth dividing node, the surrounding division subgraph (parent, divider, children,
grandchildren) is extracted and the prediction is re-matched against it locally. A
predicted fork recovers a ground truth division (**true positive**) only under *directed
local topology*: the fork or its immediate predecessor matches a ground truth
parent-side node, and a bipartite matching associates the two ground truth daughter
lineages with two *distinct* child branches of that same fork (the two supporting matches
may fall at different timepoints, which absorbs the ±1 tolerance). Sharing a weakly
connected component is not enough — this closes an exploit where a fork placed anywhere
in the neighborhood could claim a division. Forks whose two child branches have nearest
matched evidence in different ground truth connected components, or whose local branches
merge, are rejected. A maximum-cardinality bipartite matching then pairs each predicted
fork with at most one ground truth division; unpaired ground truth divisions are
**false negatives**. A predicted fork is a **false positive** if it was considered for a
division, matches an annotated ground truth node, or is cross-component/merged, and is
not itself a true positive.

$$division\ Jaccard = \frac{TP}{TP + FP + FN}$$

```{figure} figures/division_jaccard.svg
:alt: A recovered division on the simple example

A recovered division on the `simple` example.
```

```{figure} figures/late_division.svg
:alt: A predicted fork one timepoint after the ground truth split

A predicted fork one timepoint after the ground truth split is still counted as a true
positive under the ±1-timepoint tolerance.
```

## Combined score

$$score = adjusted\ edge\ Jaccard + w \cdot division\ Jaccard$$

with a small weight $w = 0.1$ (`division_weight`) on the division term, which is dropped
when there are no divisions. A single call computes metrics on one (prediction, ground
truth) pair; the competition's dataset-level score micro-averages the counts across all
videos, which you can reproduce by summing the per-pair `*_tp`/`*_fp`/`*_fn` outputs
before taking the Jaccard.

:::{note}
The three figures on this page are by Thibaut Goldsborough, reused from the
[royerlab cell-tracking-competition](https://github.com/royerlab/kaggle-cell-tracking-competition)
under the BSD 3-Clause License. The upstream license and copyright notice are retained in
`docs/source/metrics/figures/LICENSE-kaggle-cell-tracking-competition.txt`.
:::
