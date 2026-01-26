(lineage-accuracy-metrics)
# Tracklet and Lineage Accuracy Metrics

Track accuracy over N frames measures what fraction of ground truth tracklet or lineage segments of that span N frames are correctly reconstructed.
For lineage segments, all branches are included - a segment is only correct if all branches are correct.
Skip edges that span multiple frames count toward their actual frame difference. For example, a skip edge from t=0 to t=3 contributes a segment of size 3, not size 1.

A segment is counted as correct if there are no errors anywhere in it. In our current implementation, this includes checking:
- The starting node is a true positive
- All edges are true positives (edge TP implies endpoint nodes are TP)

Important counting rules:
- Isolated nodes (nodes with no outgoing edges) are NOT counted as segments
- Ground truth tracks shorter than window size N do not contribute to the total for window N

In the extreme case where N equals the track length, this measures whether entire tracks are fully correctly reconstructed.

Tracklet accuracy over N frames is the same, but counts each tracklet (segment between divisions) independently rather than full lineages. Division edges are not included in this version of the metric.

Note: This metric differs from CTC-BIO "Complete Tracks" because tracks shorter than window size N do not contribute to the total for window N. See [Complete Tracks](complete-tracks) for the CTC-BIO metric.

## Usage

```python
from traccuracy.metrics import TrackAccuracyOverTime
from traccuracy.matchers import IOUMatcher

# Match ground truth and predicted tracking graphs
matcher = IOUMatcher(iou_threshold=0.5)
matched = matcher.compute_mapping(gt_graph, pred_graph)

# Compute lineage accuracy over windows 1-50 frames
metric = TrackAccuracyOverTime(max_window=50, lineages=True, error_type="basic")
result = metric.compute(matched)

# Access results for specific window sizes
print(f"Window 1: {result.results['window_1_accuracy']:.2%}")
print(f"Window 10: {result.results['window_10_accuracy']:.2%}")
print(f"Window 50: {result.results['window_50_accuracy']:.2%}")

# Each window size has three values:
# - window_N_correct: number of correct segments of size N
# - window_N_total: total number of segments of size N
# - window_N_accuracy: correct/total (or NaN if total is 0)

# For tracklet accuracy (segments between divisions):
tracklet_metric = TrackAccuracyOverTime(max_window=50, lineages=False)
tracklet_result = tracklet_metric.compute(matched)
```
