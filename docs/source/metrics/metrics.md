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

:::{warning}
Unless otherwise noted, metrics are written assuming that you have dense ground truth annotations. The results on sparse annotations may be unpredictable and should be interpreted cautiously.
:::

| Metric category | Matching Type(s) | Description |
------------------|------------------|-------------
| [Basic Metrics](basic-metrics): TP, FP, and FN nodes and edges | `one-to-one`  | Counts the number of **true positive** (matched) nodes and edges, **false positive** (unmatched in the prediction) nodes and edges, and **false negative** (unmatched in the ground truth) nodes and edges. |
| [Division metrics](division-metrics): TP, FP, and FN divisions and F1 score/Branching Correctness (BC) | `one-to-one` | Counts the number of **true positive** (matched) divisions, **false positive** (unmatched in the prediction) divisions, and **false negative** (unmatched in the ground truth) divisions. Then computes the division **F1-Score**, also called **Branching Correctness** by the CTC-Bio metrics. Has a `max_frame_buffer` parameter that allows counting divisions as correct within `max_frame_buffer` frames as long as the parent and children match within the buffer| 
| [CTC Metrics](ctc-metrics): DET, LNK, TRA | `one-to-one`, `many-to-one` | A set of three metrics between 0 and 1, with higher scores indicating better performance. DET measures node errors, LNK measures linking errors, and TRA combines detection and linking errors. |
| [Cell Cycle Accuracy (CCA)](cca)| `one-to-one`, `many-to-one`| One of the CTC-Bio metrics. Measures the ability of a method to identify a distribution of cell cycle lengths that matches the distribution present in the ground truth.|
| [Complete Tracklets and Lineages](complete-tracks) |  `one-to-one`, `many-to-one`| Extends the "Complete Tracks" from the CTC-Bio metrics. Measures the fraction of tracklets and lineages that are fully correct in the prediction.|
| [Track Overlap Metrics](track-overlap-metrics): Track Purity (TP), Target Effectiveness (TE), Track Fractions (TF) | `one-to-one`, `many-to-one` , `one-to-many`| A set of metrics that compute the maximum overlap for each track, where track is defined as the region between divisions. Target effectiveness (TE) measures how much of each ground truth track is covered by the most overlapping predicted track, weighted by track length. Track Purity (TP) is the inverse of TE, and Track Fractions (TF) is the unwighted average of TE. |
| [Cell-specific Higher Order Tracking Accuracy (CHOTA)](chota-metric) |`one-to-one`, `many-to-one`, `one-to-many`, `many-to-many` | A metric between 0 and 1 that unifies local correctness, global coherence, and lineage tracking. Higher scores are better.| 