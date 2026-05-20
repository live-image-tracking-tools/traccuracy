(lineage-accuracy-metrics)=
# Tracklet and Lineage Accuracy Metrics

Tracklet and lineage accuracy over N frames measures what fraction of ground truth tracklet or lineage segments that span N frames are correctly reconstructed.

This is computed using sliding a window of N frames over the full extent of the dataset. 
For each window, we count the correct and total ground truth tracklet/lineage segments within each window. 
A tracklet/lineage segment is counted as correct if there are no errors anywhere in it. This includes checking:
- All edges are true positives (edge TP implies endpoint nodes are TP)
- There are no false positive divisions matched to this ground truth segment within the window

Then, we sum the correct and total segments over all sliding windows, and divide the totals to get the overall tracklet/lineage accuracy for that window size.

For window size 1, this is approximately the same as the fraction of correct edges (minus segments counted as incorrect due to false positive divisions).
When the window size equals the total extent of the data, this is the same as the CTC-BIO [Complete Tracks](complete-tracks).
This metric returns the tracklet or lineage accuracy for all window sizes from 1 to the maximum window size, allowing you to see how the percent of fully correct lineages degrades as the window size you consider increases. 

In lineage mode, if a division falls within the window, all branches are included in the same segment.
Tracklet mode counts each segment between divisions independently, discarding division edges completely.

Skip edges that span multiple frames count toward their actual frame difference. For example, a skip edge from t=0 to t=3 contributes a segment of size 3, not size 1. Isolated ground truth nodes (nodes with no outgoing edges) are not counted as segments. Ground truth tracks shorter than window size N do contribute 1 to the total for window N.


## Usage

```python
from traccuracy.metrics import TrackAccuracyOverTime
from traccuracy.matchers import IOUMatcher

# Match ground truth and predicted tracking graphs
matcher = IOUMatcher(iou_threshold=0.5)
matched = matcher.compute_mapping(gt_graph, pred_graph)

# Compute lineage accuracy over windows spanning 1-50 frames
metric = TrackAccuracyOverTime(max_window=50, lineages=True, error_type="basic")
result = metric.compute(matched)

# Results contain three lists (index 0 = window 1, index 1 = window 2, etc.):
#   "correct" - number of correctly reconstructed segments at each window size
#   "total"   - total number of GT segments at each window size
#   "accuracy"- correct/total (or NaN if total is 0)
print(f"Window 1: {result.results['accuracy'][0]:.2%}")
print(f"Window 10: {result.results['accuracy'][9]:.2%}")
print(f"Window 50: {result.results['accuracy'][49]:.2%}")

# For tracklet accuracy (segments between divisions):
tracklet_metric = TrackAccuracyOverTime(max_window=50, lineages=False)
tracklet_result = tracklet_metric.compute(matched)
```

## References

This metric is based on the track accuracy evaluation from linajea:

- **Paper:** Malin-Mayor, C., Hirsch, P., Guber, L. et al. Automated reconstruction of whole-embryo cell lineages by learning from sparse annotations. *Nat Biotechnol* 41, 44–49 (2023). [https://doi.org/10.1038/s41587-022-01427-7](https://www.nature.com/articles/s41587-022-01427-7)

- **Original implementation:** [`linajea.evaluation.evaluator.get_perfect_segments`](https://github.com/funkelab/linajea/blob/master/linajea/evaluation/evaluator.py#L409)
