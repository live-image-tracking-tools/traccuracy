# Metrics Overview

After matching ground truth and predicted graphs, metrics can be computed on the matched graphs.
Matched graphs have one of the following matching types:

* `one-to-one`: every node can be matched to at most one node in the other graph
* `many-to-one`: many ground truth nodes may be matched to one predicted node
* `one-to-many`: one ground truth node may be matched to many predicted nodes
* `many-to-many`: anything goes! (no implemented metrics support many-to-many at this time)

Each metric supports one or more of these matching types.
Below is a table summarizing the implemented metrics, what types of matchings
they can accept, and a brief description of behavior and any hyperparameters.

Many metrics support relaxing skip edges for the ground truth and/or the prediction. Relaxing a skip edge means allowing one edge that spans multiple frames to match multiple edges in the other graph, thus potentially reducing the number of errors.

| Metric category | Matching Type(s) | Description |
|------------------|------------------|-------------|
| [Basic Metrics](basic-metrics): TP, FP, and FN nodes and edges | `one-to-one`  | Counts the number of **true positive** (matched) nodes and edges, **false positive** (unmatched in the prediction) nodes and edges, and **false negative** (unmatched in the ground truth) nodes and edges. |
| [Division metrics](division-metrics): TP, FP, and FN divisions and F1 score/Branching Correctness (BC) | `one-to-one` | Counts the number of **true positive** (matched) divisions, **false positive** (unmatched in the prediction) divisions, and **false negative** (unmatched in the ground truth) divisions. Then computes the division **F1-Score**, also called **Branching Correctness** by the CTC-Bio metrics. Has a `max_frame_buffer` parameter that allows counting divisions as correct within `max_frame_buffer` frames as long as the parent and children match within the buffer| 
| [CTC Metrics](ctc-metrics): DET, LNK, TRA | `one-to-one`, `many-to-one` | A set of three metrics between 0 and 1, with higher scores indicating better performance. DET measures node errors, LNK measures linking errors, and TRA combines detection and linking errors. |
| [Cell Cycle Accuracy (CCA)](cca)| `one-to-one`, `many-to-one`| One of the CTC-Bio metrics. Measures the ability of a method to identify a distribution of cell cycle lengths that matches the distribution present in the ground truth.|
| [Complete Tracklets and Lineages](complete-tracks) |  `one-to-one`, `many-to-one`| Extends the "Complete Tracks" from the CTC-Bio metrics. Measures the fraction of tracklets and lineages that are fully correct in the prediction.|
| [Track Overlap Metrics](track-overlap-metrics): Track Purity (TP), Target Effectiveness (TE), Track Fractions (TF) | `one-to-one`, `many-to-one` , `one-to-many`| A set of metrics that compute the maximum overlap for each track, where track is defined as the region between divisions. Target effectiveness (TE) measures how much of each ground truth track is covered by the most overlapping predicted track, weighted by track length. Track Purity (TP) is the inverse of TE, and Track Fractions (TF) is the unwighted average of TE. |
| [Complete Tracks by Length](complete-tracks-by-length-metric) | `one-to-one`, `many-to-one` | Generalizes [Complete Tracks](complete-tracks) to every track length: the accuracy (fraction fully correct) of tracklets or lineages that span N frames, for each length N. |
| [Cell-specific Higher Order Tracking Accuracy (CHOTA)](chota-metric) |`one-to-one`, `many-to-one`, `one-to-many`, `many-to-many` | A metric between 0 and 1 that unifies local correctness, global coherence, and lineage tracking. Higher scores are better.| 

(sparse-annotations)=
## Dense vs. sparse ground truth

Most metrics assume **dense** ground truth (every real cell is annotated), so a predicted node, edge, or division with no ground truth match is a false positive. On **sparse** ground truth, where only a subset of cells are annotated, that would over-penalize correct predictions of unannotated cells.

Each `Metric` classifies every key in the dictionary it returns, via `Metric._classify_sparse_safe(key)` (also surfaced as `sparse_safe_keys`/`agnostic_keys` on {class}`~traccuracy.metrics.Results`'s `metric` info). Many metrics mix categories: for example {class}`~traccuracy.metrics.DivisionMetrics` reports both a sparse-safe recall and a dense-only precision from the same call. The three categories are:

- **sparse-safe**: a quality/error assessment that does not assume predictions with no match are false positives so it remains valid when ground truth is sparse.
- **agnostic**: a raw count or other value that is not itself a quality judgment (e.g. `Total GT Nodes`). Accurate regardless of annotation density, so no claim is made either way.
- **dense-only** (the default for any key not listed above): counts or derives from unmatched predictions (false positives, precision, F1, ...) and will over-penalize correct predictions of unannotated ground truth.

Sparseness is a property of the annotations rather than a per-run choice, so it is declared on
the ground truth graph itself and is read-only after construction. Pass `is_sparse_gt=True` to
{class}`~traccuracy.TrackingGraph` or to any loader (`load_ctc_data`, `load_geff_data`,
`load_napari_data`, `load_point_data`), and every metric computed against that graph
restricts itself to sparse-safe and agnostic keys:

```python
gt = load_ctc_data("path/to/gt", is_sparse_gt=True)
```

:::{note}
Metrics computed on a graph that is marked as `is_sparse_gt=True` at creation will always use the `sparse_only=True` option. However sparse mode can always be enabled by manually setting the `sparse_only=True` flag when calling `Metric.compute`.
:::

A metric that declares no sparse-safe or agnostic keys at all (CCA, CHOTA) cannot report
anything under sparse ground truth. Those are skipped with a warning rather than computed and
discarded.

Sparse-safe and agnostic keys by metric (everything else that metric returns is dense-only):

| Metric | Sparse-safe keys | Agnostic keys |
|---|---|---|
| [Basic Metrics](basic-metrics) | `True/False Negative {Nodes,Edges}`, `{Node,Edge} Recall`, `Skip GT/Pred True Positive Edges`, `Skip False Negative Edges` | `Total GT/Pred {Nodes,Edges}` |
| [Division metrics](division-metrics) | `Division Recall`, `True/False Negative Divisions`, `Wrong Children Divisions`, `True Positive Skip Divisions` | `Total GT Divisions`, `Total Predicted Divisions` |
| [CTC Metrics](ctc-metrics) | `fn_nodes`, `fn_edges` | none |
| [Cell Cycle Accuracy (CCA)](cca) | none | none |
| [Complete Tracklets and Lineages](complete-tracks) | `correct_lineages`, `correct_tracklets`, `complete_lineages`, `complete_tracklets` | `total_lineages`, `total_tracklets` |
| [Track Overlap Metrics](track-overlap-metrics) | `target_effectiveness`, `track_fractions` | none |
| [Complete Tracks by Length](complete-tracks-by-length-metric) | `correct`, `accuracy` | `total` |
| [Cell-specific Higher Order Tracking Accuracy (CHOTA)](chota-metric) | none | none |
