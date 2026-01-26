(lineage-accuracy-metrics)
# Tracklet and Lineage Accuracy Metrics

Track accuracy over N frames measures what fraction of ground truth track segments of length N are correctly reconstructed. A segment of size N consists of a starting node and N-1 edges following all outgoing paths. For example:
- A segment of size 1 is a node with one outgoing edge
- A segment of size 2 is a node followed by two edges (including both branches if there is a division)

At division points, all branches are included in the same segment - a segment is only correct if all branches are correct.

A segment is counted as correct if:
- The starting node is a true positive
- All N-1 edges are true positives (edge TP implies endpoint nodes are TP)

Important counting rules:
- Isolated nodes (nodes with no outgoing edges) are NOT counted as segments
- A track with M edges contributes segments of sizes 1 through M only
- Tracks shorter than window size N do not contribute to the total for window N

In the extreme case where N equals the track length, this measures whether entire tracks are fully correctly reconstructed.

Tracklet accuracy over N frames is the same, but counts each tracklet (segment between divisions) independently rather than full lineages.

Note: This metric differs from CTC-BIO "Complete Tracks" because tracks shorter than window size N do not contribute to the total for window N. See [Complete Tracks](complete-tracks) for the CTC-BIO metric.

