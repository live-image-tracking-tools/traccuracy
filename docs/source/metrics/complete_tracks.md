(complete-tracks)=
# Complete Tracklets and Lineages

Complete tracklets and lineages report the fraction of {term}`tracklets <tracklet>` and {term}`lineages <lineage>` that are completely correctly reconstructed. 

This metric is an extension of the CTC-BIO metric "Complete Tracks" as defined in *Maška, M., Ulman, V., Delgado-Rodriguez, P. et al. The Cell Tracking Challenge: 10 years of objective benchmarking. Nat Methods 20, 1010–1020 (2023). https://doi.org/10.1038/s41592-023-01879-y*:
> Complete tracks (CT) measures the fraction of reference cell tracks that a given method
can reconstruct entirely from the frame in which they appear to the frame in which they disappear. CT is especially relevant when a perfect
reconstruction of the cell lineages is required.

While cell lineages are mentioned in this definition, the reference implementation in [`py-ctcmetrics`](https://github.com/CellTrackingChallenge/py-ctcmetrics) appears to only consider tracklets. We provide both numbers. 

If the predicted lineage continues beyond the start or end of a ground truth lineage, this is *not*
counted as incorrect, nor are false positive tracks penalized, making this metric suitable
for evaluating with sparse ground truth annotations. If a False Positive Division occurs within the ground truth track (or, for the CTC
errors, a wrong semantic edge), this *is* counted as incorrect.

Complete tracklets and lineages can be computed with either the [basic](basic-errors) and 
[division errors](division-errors) or the [CTC errors](ctc-errors) as follows:

```python
from traccuracy.matchers import PointMatcher, CTCMatcher
from traccuracy.metrics import CompleteTracks

# Data loaded using a function from traccuracy.loaders or constructed explicitly using a networkx graph and associated information
gt_data: TrackingGraph
pred_data: TrackingGraph

# using the basic errors
results, matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=PointMatcher(), # Choose a matcher that produces a one-to-one mapping
    metrics=[CompleteTracks(error_type="basic")]
)

# or using the ctc errors
results, matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=CTCMatcher(),
    metrics=[CompleteTracks(error_type="ctc")]
)
```
The `results` object contains a dictionary `results.results` that stores all values associated with the metric:

- `total_lineages` - the number of connected components in the ground truth graph
- `correct_lineages` - the number of fully correct connected components
- `complete_lineages` - `correct_lineages` / `total_lineages`, or `np.nan` if
    `total_lineages` is 0
- `total_tracklets` - the number of tracklets in the ground truth graph, defined
    as the connected components of the graph after division edges are removed.
    Division edges are not included in the tracklets, or counted at all
    in the tracklet metrics.
- `correct_tracklets` - the number of fully correct tracklets
- `complete_tracklets` - `correct_tracklets` / `total_tracklets`, or `np.nan` if
    `total_tracklets` is 0

When using basic error annotations, complete tracklets and lineages also supports 
relaxing {term}`skip edges` on the ground truth and/or the prediction graph. 
If skip edges are relaxed in one graph, then skip true positive edges in the other graph are
counted as correct, along with nodes between the skip true positive edges in that graph.

Correct tracks can easily be extended to other types of error annotations in the future 
by providing a definition of what is "correct" and "incorrect" on the graph. 