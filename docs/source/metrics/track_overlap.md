# Track Overlap Metrics

The track overlap metrics include Track Purity (TP) and Target Effectiveness (TE), as defined in Bise et al., 2011, Chen, 2021, and Fukai et al., 2022. Track overlap metrics compute metrics for tracks as a whole, and have a single hyperparameter that controls the definition of "track". If include_division_edges is True, metrics are computed on connected components. If include_division_edges is False, metrics are computed considering each region between divisions as its own track. 
The length of a track is the number of edges included in it, not the number of time frames it spans (this is different if considering connected components with divisions as tracks). 

TODO: What about tracks with one node and no edges?

## Track Purity
Track Purity (TP) for a single predicted track T^p_j is calculated by finding the ground truth track T^g_k that overlaps with T^p_j in the largest number of the frames and then dividing the overlap frame counts by the total frame counts for T^p_j. The TP for the total dataset is calculated as the mean of TPs for all predicted tracks, weighted by the length of the tracks.

## Target Effectiveness

Target effectiveness (TE) for a single ground truth track T^g_j is calculated by finding the predicted track T^p_k that overlaps with T^g_j in the largest number of the frames and then dividing the overlap frame counts by the total frame counts for T^g_j. The TE for the total dataset is calculated as the mean of TEs for all ground truth tracks, weighted by the length of the tracks.
