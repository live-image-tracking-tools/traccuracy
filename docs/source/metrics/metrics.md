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

(sparse-annotations)=
## Dense vs. sparse ground truth

Most metrics assume **dense** ground truth: every real cell is annotated, so a predicted
node/edge with no ground truth match is a genuine false positive. On **sparse** ground
truth — where only a subset of cells are annotated — such a prediction may simply be a
correctly tracked cell the annotator skipped, so dense-only metrics over-penalize and
their results are unreliable.

Each metric declares whether it is valid on sparse ground truth via the
`supports_sparse_gt` attribute (also surfaced under the metric metadata in
{class}`~traccuracy.metrics.Results`). A sparse-capable metric never penalizes unmatched
predictions and can always be applied to dense ground truth as well; the reverse is not
true. The default is `False` (dense-only). Currently sparse-capable:
[Complete Tracklets and Lineages](complete-tracks),
[Complete Tracks by Length](complete-tracks-by-length-metric), and the
[Sparse Weighted Edge Jaccard (SWEJ)](swej-metric).

:::{warning}
Metrics with `supports_sparse_gt = False` are written assuming dense ground truth annotations. Their results on sparse annotations may be unpredictable and should be interpreted cautiously.
:::

| Metric category | Matching Type(s) | Sparse GT | Description |
------------------|------------------|-----------|-------------
| [Basic Metrics](basic-metrics): TP, FP, and FN nodes and edges | `one-to-one`  | No | Counts the number of **true positive** (matched) nodes and edges, **false positive** (unmatched in the prediction) nodes and edges, and **false negative** (unmatched in the ground truth) nodes and edges. |
| [Division metrics](division-metrics): TP, FP, and FN divisions and F1 score/Branching Correctness (BC) | `one-to-one` | No | Counts the number of **true positive** (matched) divisions, **false positive** (unmatched in the prediction) divisions, and **false negative** (unmatched in the ground truth) divisions. Then computes the division **F1-Score**, also called **Branching Correctness** by the CTC-Bio metrics. Has a `max_frame_buffer` parameter that allows counting divisions as correct within `max_frame_buffer` frames as long as the parent and children match within the buffer| 
| [CTC Metrics](ctc-metrics): DET, LNK, TRA | `one-to-one`, `many-to-one` | No | A set of three metrics between 0 and 1, with higher scores indicating better performance. DET measures node errors, LNK measures linking errors, and TRA combines detection and linking errors. |
| [Cell Cycle Accuracy (CCA)](cca)| `one-to-one`, `many-to-one`| No | One of the CTC-Bio metrics. Measures the ability of a method to identify a distribution of cell cycle lengths that matches the distribution present in the ground truth.|
| [Complete Tracklets and Lineages](complete-tracks) |  `one-to-one`, `many-to-one`| Yes | Extends the "Complete Tracks" from the CTC-Bio metrics. Measures the fraction of tracklets and lineages that are fully correct in the prediction.|
| [Track Overlap Metrics](track-overlap-metrics): Track Purity (TP), Target Effectiveness (TE), Track Fractions (TF) | `one-to-one`, `many-to-one` , `one-to-many`| No | A set of metrics that compute the maximum overlap for each track, where track is defined as the region between divisions. Target effectiveness (TE) measures how much of each ground truth track is covered by the most overlapping predicted track, weighted by track length. Track Purity (TP) is the inverse of TE, and Track Fractions (TF) is the unwighted average of TE. |
| [Complete Tracks by Length](complete-tracks-by-length-metric) | `one-to-one`, `many-to-one` | Yes | Generalizes [Complete Tracks](complete-tracks) to every track length: the accuracy (fraction fully correct) of tracklets or lineages that span N frames, for each length N. |
| [Cell-specific Higher Order Tracking Accuracy (CHOTA)](chota-metric) |`one-to-one`, `many-to-one`, `one-to-many`, `many-to-many` | No | A metric between 0 and 1 that unifies local correctness, global coherence, and lineage tracking. Higher scores are better.| 
| [Sparse Weighted Edge Jaccard (SWEJ)](swej-metric): edge & division Jaccard | `one-to-one` | Yes | Edge and division Jaccard for **sparsely annotated** ground truth (royerlab cell tracking competition score). Requires a `PointMatcher`. Unmatched predictions are ignored rather than penalized. Has `n_gt_nodes` (for the excess-node-penalized adjusted Jaccard), `division_weight`, and `node_ratio_weight` parameters. |