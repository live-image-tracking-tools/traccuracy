(chota-metric)=
# CHOTA Metric

CHOTA (Cell-specific Higher Order Tracking Accuracy) is a metric for cell tracking that unifies local correctness, global coherence, and lineage tracking aspects. It extends the HOTA metric[^2] from general multiple object tracking to address cell division and lineage relationships[^1].

:::{warning}
CHOTA is designed for cell tracking scenarios that include cell division and lineage information. For general object tracking without biological relationships, consider using the standard HOTA metric.
:::

CHOTA redefines trajectories to include entire cell lineages rather than just objects with the same ID. Two cells belong to the same trajectory if they have the same ID or if one is an ancestor of the other, capturing biologically relevant relationships.
Therefore, in a branched lineage, all parent-child relationships are included in the trajectory, but not sibling-sibling relationships.

These metrics can be computed as follows:

```python
from traccuracy.loaders import load_ctc_data
from traccuracy.matchers import CTCMatcher
from traccuracy.metrics import CHOTAMetrics

# Load data using a function of your choice from traccuracy.loaders
# Or initialize a TrackingGraph with a nx.DiGraph and optional segmentation arrays
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

results, matched = run_metrics(
    gt_data=gt_data,
    pred_data=pred_data,
    matcher=CTCMatcher(),
    metrics=[CHOTAMetrics()]
)
```

## CHOTA Score

CHOTA is calculated as:

$$CHOTA = \sqrt{\frac{\sum_{c \in TP} A^\sigma(c)}{|TP| + |FN| + |FP|}}$$

Where $A^\sigma(c)$ is a lineage-oriented association score that evaluates the overlap between predicted and ground truth trajectories, including all cells related through lineage. Unlike HOTA, CHOTA accounts for cell divisions and parent-daughter relationships when computing trajectory associations.

CHOTA provides continuous values between 0 and 1, with higher scores indicating better tracking performance across detection accuracy, association correctness, and lineage reconstruction.

[^1]: Kaiser, Timo, Vladimír Ulman, and Bodo Rosenhahn. "Chota: A higher order accuracy metric for cell tracking." European Conference on Computer Vision. Cham: Springer Nature Switzerland, 2024.

[^2]: Luiten, Jonathon, et al. "Hota: A higher order metric for evaluating multi-object tracking." International journal of computer vision 129.2 (2021): 548-578.