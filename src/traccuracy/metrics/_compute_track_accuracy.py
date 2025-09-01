from traccuracy.matchers import Matched
import networkx as nx
from traccuracy import NodeFlag, EdgeFlag


# errors already computed
def compute_track_accuracy(matched: Matched, window: int, lineages=True) -> dict[int, tuple[int, int]]:
    ''' Compute the percent of gt lineages or trackets that are correctly
    reconstructed using a sliding window of each size from 1 to t
    '''
    total_segments = {}
    correct_segments = {}
    # TODO: skip tps
    node_tp = NodeFlag.CTC_TRUE_POS if matched.matcher_info["name"] == "CTCMatcher" else NodeFlag.TRUE_POS
    edge_tp = EdgeFlag.TRUE_POS


    for i in range(1, window + 1):
        total_segments[i] = 0
        correct_segments[i] = 0

    if lineages:
        components = matched.gt_graph.get_lineages()
    else:
        # TODO: Check if I should include div edges or not
        components = matched.gt_graph.get_tracklets()
    for gt_track in components:
        for gt_start_node in gt_track.nodes():
            pred_start_nodes = matched.get_gt_pred_matches(gt_start_node)
            start_edges = gt_track.out_edges(gt_start_node)
            for start_edge in start_edges:
                frames = 1
                correct = True
                current_nodes = [gt_start_node]
                next_edges = [start_edge]
                while len(next_edges) > 0:
                    if correct:
                        # check current node and next edge
                        for gt_node in current_nodes:
                            gt_correct = node_tp in gt_track.nodes[gt_node]
                            pred_nodes = matched.get_gt_pred_matches(gt_node)
                            pred_correct = all(node_tp in matched.pred_graph.nodes[pn] for pn in pred_nodes)
                            correct = gt_correct and pred_correct
                        if not correct: continue
                        for gt_edge in next_edges:
                            gt_correct = edge_tp in gt_track.edges[gt_edge]
                            pred_edges = gt_track.out_edges(pred_nodes)
                            pred_correct = all(edge_tp in matched.pred_graph.edges[pe] for pe in pred_edges)
                            correct = gt_correct and pred_correct
                    # update segment counts
                    total_segments[frames] += 1
                    if correct:
                        correct_segments[frames] += 1
                    # update loop variables
                    frames += 1
                    current_nodes = [u for u, _ in next_edges]
                    next_edges = gt_track.out_edges(current_nodes)
                    if frames > window:
                        break

    result = {}
    for i in range(1, window + 1):
        result[str(i)] = (correct_segments[i], total_segments[i])
    return result