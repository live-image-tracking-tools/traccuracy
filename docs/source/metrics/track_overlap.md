(track-overlap-metrics)=
# Track Overlap Metrics

The track overlap metrics include Track Purity (TP) and Target Effectiveness (TE), as defined in Bise et al., 2011[^1], Chen, 2021[^2], and Fukai et al., 2023[^3]. Track overlap metrics are computed for tracks as a whole, but in the case of divisions, each region between divisions is considered its own track. There is a single hyperparameter, `include_division_edges`; if `True`, edges immediately following a division are included in the subsequent tracks, such that the parent node is duplicated. If `False`, the edges immediately following divisions are not included at all. 
The length of a track is the number of edges included in it, not the number of time frames it spans. Singleton nodes are ignored in these metrics.

:::{warning}
If you have sparse ground truth annotations, target effectiveness and track fractions will still accurately represent your ability to reconstruct the ground truth. Track purity should not be interpreted as any predicted tracks not present in the ground truth will be fully penalized.
:::

These metrics can be computed as follows:
```python
from traccuracy.matchers import PointMatcher
from traccuracy.metrics import TrackOverlapMetrics

# Data loaded using a function from traccuracy.loaders or constructed explicitly using a networkx graph and associated information
gt_data: TrackingGraph
pred_data: TrackingGraph

results, matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=PointMatcher(), # Choose a matcher that produces a one-to-one, many-to-one or one-to-many mapping
    metrics=[TrackOverlapMetrics()]
)
```

The `results` object contains a dictionary `results.results` that stores all values associated with the metric.

If **either** `relax_skips_gt` **or** `relax_skips_pred` is set to True, metric computation is relaxed
in both directions, so all metrics below may be affected. If the metric is computed in relaxed mode,
a skip edge whose source and target vertices have a valid match, and which has a valid equivalent path
in the other graph, is considered overlapping. Offset skip edges, where the source or target vertex
has no match in the other graph, are still considered incorrect.

## Track Purity
Track Purity (TP) for a single predicted track $T^p_j$ is calculated by finding the ground truth track $T^g_k$ that overlaps with $T^p_j$ in the largest number of the frames and then dividing the overlap frame counts by the total frame counts for $T^p_j$. The TP for the total dataset is calculated as the mean of TPs for all predicted tracks, weighted by the length of the tracks.

```python
track_purity = results.results["track_purity"]
```

## Target Effectiveness

Target effectiveness (TE) for a single ground truth track $T^g_j$ is calculated by finding the predicted track $T^p_k$ that overlaps with $T^g_j$ in the largest number of the frames and then dividing the overlap frame counts by the total frame counts for $T^g_j$. The TE for the total dataset is calculated as the mean of TEs for all ground truth tracks, weighted by the length of the tracks.

```python
target_effectiveness = results.results["target_effectiveness"]
```

## Track Fractions

Track fractions, for a single track, is identical to target effectiveness. However, unlike TE, the TF measure is averaged *per track* i.e. it is unweighted by the length of the tracks. This means errors in shorter tracks get penalized more heavily by this measure than errors in longer tracks e.g. consider a two track solution with one fully  correct track of length 10 and one track of length 2 with an error in it. The TE score for this solution is $\frac{11}{12}$, while the TF is $\frac{(10/10 + 1/2)}{2} = \frac{3}{4}$


```python
track_fractions = results.results["track_fractions"]
```

## Complete Tracks

[^1]: Bise, R., Yin, Z., and Kanade, T. Reliable cell tracking by global data association. In 2011 IEEE international symposium on biomedical imaging: From nano to macro, 2011.
[^2]: Chen, Y., Song, Y., Zhang, C., Zhang, F., O’Donnell, L., Chrzanowski, W., and Cai, W. CellTrack R-CNN: A novel end-to-end deep neural network for cell segmentation and tracking in microscopy images. In 2021 IEEE 18th International Symposium on Biomedical Imaging. IEEE (2021).
[^3]: Fukai, Y. T., & Kawaguchi, K. LapTrack: linear assignment particle tracking with tunable metrics. Bioinformatics, 39(1), 2023.