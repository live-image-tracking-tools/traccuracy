(lineage-accuracy-metrics)
# Tracklet and Lineage Accuracy Metrics

Lineage accuracy over N frames (or track accuracy over N frames) is a metric that computes the fraction of lineages that are fully correct (all true positive nodes and edges, no connected false positives) over a sliding window of N frames. In the extreme case where N is the length of the whole sequence, it is simply the fraction of lineages that are fully correctly reconstructed. The other extreme of N=1 is simply the fraction of correct edges.

Tracklet accuracy over N frames is the same, but counts each tracklet independently. The CTC-BIO "Complete Tracks" is the tracklet accuracy over the full length of the sequence.

