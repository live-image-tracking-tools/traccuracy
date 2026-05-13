from __future__ import annotations

from typing import TYPE_CHECKING, Any

from traccuracy._tracking_graph import EdgeFlag, NodeFlag

if TYPE_CHECKING:
    from typing import Literal

    from traccuracy.matchers import Matched

# Sentinel values for the DP grid
EMPTY = -1
CORRECT = 1
INCORRECT = 0


def compute_track_accuracy(
    matched: Matched,
    max_window: int,
    lineages: bool = True,
    error_type: Literal["basic", "ctc"] = "basic",
    relax_skips_gt: bool = False,
    relax_skips_pred: bool = False,
) -> dict[int, tuple[int, int]]:
    r"""Compute the fraction of GT track segments correctly reconstructed.

    For each component (lineage or tracklet), builds a 2D grid of
    per-frame-step correctness values (see ``_build_grid``), then uses
    dynamic programming to combine adjacent frame steps into larger
    windows.

    Window size is measured in frames (time difference), not edge count.
    Skip edges spanning multiple frames are interpolated to fill
    intermediate frame steps with the same correctness status.
    This means that if a skip edge exceeds the window, the part of it
    inside the window still counts towards the correctness of the segment.

    Example — A->A' then A' divides into B and C, with an error on
    the C->C' edge (1 = correct, 0 = incorrect, empty = no track)::

        GT graph (6 nodes, 5 edges):
        t=0    t=1    t=2    t=3
                    /  B ---- B'
         A ---- A'<
                    \  C -x-- C'  (error on C->C')

        base grid (window=1): one entry per edge
        Each column is frame span ((0-1) covers frames 0->1, etc.)
                   (0-1)(1-2)(2-3)
        ┌─────────┬────┬────┬────┐
        │track. A │  1 │    │    │  edge A->A'
        ├─────────┼────┼────┼────┤
        │track. B │    │  1 │  1 │  edges A'->B, B->B'
        ├─────────┼────┼────┼────┤
        │track. C │    │  1 │  0 │  edges A'->C, C->C' (error)
        └─────────┴────┴────┴────┘

        w=2 grid (combine base[t] with base[t+1] via division links):
                   (0-2)(1-3)
        ┌─────────┬────┬────┐
        │track. A │  1 │    │  AND(A->A'=1, A'->B=1, A'->C=1) = 1
        ├─────────┼────┼────┤
        │track. B │    │  1 │  AND(A'->B=1, B->B'=1) = 1
        ├─────────┼────┼────┤
        │track. C │    │  0 │  AND(A'->C=1, C->C'=0) = 0
        └─────────┴────┴────┘

        w=3 grid:
                   (0-3)
        ┌─────────┬────┐
        │track. A │  0 │  AND(A->A'=1, w2_B=1, w2_C=0) = 0
        ├─────────┼────┤
        │track. B │    │
        ├─────────┼────┤
        │track. C │    │
        └─────────┴────┘

    At each window size, non-empty entries are counted as segments.
    w=1: 5 (4 correct). w=2: 3 (2 correct). w=3: 1 (0 correct).


    GT tracks shorter than a given window size still count once for that
    window size (correct iff the entire track is correct).

    Args:
        matched: Matched data object with annotated errors
        max_window: Maximum window size to evaluate (in frames)
        lineages: If True, evaluate on full lineages. If False, on tracklets.
        error_type: "basic" or "ctc" - which error classification was used
        relax_skips_gt: If True, SKIP_TRUE_POS edges in GT count as correct
        relax_skips_pred: If True, SKIP_TRUE_POS edges in pred count as correct

    Returns:
        Dictionary mapping window size (int) to tuple of (correct_count, total_count)
        for each window size from 1 to max_window
    """
    is_ctc = error_type == "ctc"

    # Get components (lineages or tracklets)
    if lineages:
        components = matched.gt_graph.get_lineages()
    else:
        components = matched.gt_graph.get_tracklets(include_division_edges=False)

    results: dict[int, tuple[int, int]] = {}

    for gt_track in components:
        # Build the w=1 grid and division links for this component.
        # grid[t][row] = EMPTY, CORRECT, or INCORRECT for step t -> t+1.
        # divisions: row -> list of daughter row indices.
        grid, divisions, num_rows = _build_grid(
            gt_track,
            matched,
            is_ctc,
            relax_skips_gt,
            relax_skips_pred,
        )

        T = len(grid)

        # DP to build grids for increasing window sizes.
        # For window w, combine base_grid[t] (w=1) with prev_grid[t+1] (w-1).
        base_grid = grid
        prev_grid = grid

        for w in range(1, max_window + 1):
            if w == 1:
                cur_grid = base_grid
            else:
                cur_len = T - w + 1
                if cur_len <= 0:
                    break

                cur_grid = [[] for _ in range(cur_len)]
                for t in range(cur_len):
                    cur_grid[t] = [EMPTY] * num_rows
                    for row in range(num_rows):
                        val_base = base_grid[t][row]
                        # Only follow division links when the parent row
                        # is occupied at this time step (val_base != EMPTY).
                        divs = divisions if val_base != EMPTY else None
                        val_prev = _get_continuation_value(row, t, prev_grid, divs)
                        cur_grid[t][row] = _combine(val_base, val_prev)

                prev_grid = cur_grid

            correct, total = _count_grid(cur_grid)
            # aggregate results across different lineages by updating results dict
            sum_correct, sum_total = results.get(w, (0, 0))
            results[w] = (sum_correct + correct, sum_total + total)

    return results


def _combine(a: int, b: int) -> int:
    """AND two correctness values: a segment is correct only if all parts are correct.

    EMPTY means "no data" and is ignored (identity element).
    """
    if a == EMPTY:
        return b
    if b == EMPTY:
        return a
    if a == INCORRECT or b == INCORRECT:
        return INCORRECT
    return CORRECT


def _get_continuation_value(
    row: int,
    t: int,
    prev_grid: list[list[int]],
    divisions: dict[int, list[int]] | None,
) -> int:
    """Look up the correctness of the continuation track(s) from the edge at (t, row).

    For a non-dividing tracklet, the continuation is the same row at t+1.
    At a division, the continuation includes all daughter rows at t+1,
    AND'd together (a segment spanning a division is only correct if
    all branches are correct).

    Returns EMPTY if there is no continuation (t+1 past the grid, or
    divisions=None and the row has no data — EMPTY acts as identity
    in _combine so the current cell's value is unchanged).
    """
    next_t = t + 1
    if next_t >= len(prev_grid):
        return EMPTY

    if divisions is not None and row in divisions:
        result = EMPTY
        for daughter_row in divisions[row]:
            daughter_val = prev_grid[next_t][daughter_row]
            result = _combine(result, daughter_val)
        return result

    return prev_grid[next_t][row]


def _count_grid(cur_grid: list[list[int]]) -> tuple[int, int]:
    """Count how many segments exist in the grid and how many are correct."""
    total = 0
    correct = 0
    for t_col in cur_grid:
        for val in t_col:
            if val != EMPTY:
                total += 1
                if val == CORRECT:
                    correct += 1
    return correct, total


def _build_grid(
    gt_track: Any,
    matched: Matched,
    is_ctc: bool,
    relax_skips_gt: bool,
    relax_skips_pred: bool,
) -> tuple[list[list[int]], dict[int, list[int]], int]:
    """Build the base (window=1) correctness grid for a single GT component.

    Maps a lineage or tracklet tree onto a 2D grid where each column is
    a frame step and each row is one branch of the tree. Each entry
    records whether the corresponding edge was correctly reconstructed.
    At divisions, the parent row ends and daughters get new rows.

    Also returns division links so that larger windows can AND across
    all daughter branches when a segment spans a division.

    Skip edges spanning multiple frames are interpolated: each
    intermediate frame step gets the same correctness value.

    Returns:
        grid: grid[t][row] = CORRECT, INCORRECT, or EMPTY
        divisions: parent row -> list of daughter row indices
        num_rows: total number of rows
    """
    gt_graph = matched.gt_graph
    frame_key = gt_graph.frame_key

    # Determine time range
    min_frame = gt_graph.start_frame
    max_frame = gt_graph.end_frame
    if min_frame is None or max_frame is None:
        return [], {}, 0
    T = max_frame - min_frame - 1  # Number of frame steps
    if T <= 0:
        return [], {}, 0

    grid: list[list[int]] = [[] for _ in range(T)]
    divisions: dict[int, list[int]] = {}

    # Each component has exactly one root node
    root = next(n for n in gt_track.nodes() if gt_track.in_degree(n) == 0)

    num_rows = 1
    # DFS through the track tree: each entry is (node, grid row for that node)
    nodes_to_process = [(root, 0)]

    while nodes_to_process:
        node, cur_row = nodes_to_process.pop()
        out_edges = list(gt_track.out_edges(node))

        if not out_edges:
            continue

        node_correct = _is_node_correct(
            node,
            matched,
            is_ctc,
            relax_skips_pred,
        )

        is_division = len(out_edges) > 1
        source_frame = gt_graph.nodes[node][frame_key]
        daughter_rows = []

        for edge in out_edges:
            # Divisions get new rows; single edges continue on cur_row
            if is_division:
                edge_row = num_rows
                num_rows += 1
                daughter_rows.append(edge_row)
            else:
                edge_row = cur_row

            target = edge[1]
            target_frame = gt_graph.nodes[target][frame_key]
            edge_span = target_frame - source_frame

            target_correct = _is_node_correct(
                target,
                matched,
                is_ctc,
                relax_skips_pred,
            )
            edge_correct = (
                node_correct
                and not _has_fp_division(node, matched, is_ctc)
                and _is_edge_correct(
                    edge,
                    matched,
                    is_ctc,
                    relax_skips_gt,
                    relax_skips_pred,
                )
                and target_correct
            )
            val = CORRECT if edge_correct else INCORRECT

            for dt in range(edge_span):
                t_idx = source_frame - min_frame + dt
                if 0 <= t_idx < T:
                    _grid_set(grid, t_idx, edge_row, val)

            nodes_to_process.append((target, edge_row))

        # Record division link for this row.
        # If the division is at the root (no pre-division steps on
        # this row), no link is needed — daughters are independent.
        if is_division and source_frame > min_frame:
            divisions[cur_row] = daughter_rows

    # Pad all columns to the same number of rows
    for t in range(T):
        while len(grid[t]) < num_rows:
            grid[t].append(EMPTY)

    return grid, divisions, num_rows


def _grid_set(grid: list[list[int]], t: int, row: int, val: int) -> None:
    """Set grid[t][row] = val, extending the row list if needed."""
    while len(grid[t]) <= row:
        grid[t].append(EMPTY)
    grid[t][row] = val


def _is_node_correct(
    gt_node: Any,
    matched: Matched,
    is_ctc: bool,
    relax_skips_pred: bool,
) -> bool:
    """Is this GT node correctly detected in the prediction?

    A node is correct if it is a true positive. Division errors are
    checked separately (FP_DIV via ``_has_fp_division``, FN_DIV via
    edge error flags). With skip relaxation, nodes between matched
    skip edges also count as correct.
    """
    gt_graph = matched.gt_graph
    pred_graph = matched.pred_graph
    node_tp = NodeFlag.CTC_TRUE_POS if is_ctc else NodeFlag.TRUE_POS

    gt_node_data = gt_graph.nodes[gt_node]

    if is_ctc:
        if node_tp in gt_node_data:
            return True
    else:
        if node_tp in gt_node_data:
            # Check that all matched pred nodes are TP
            pred_nodes = matched.get_gt_pred_matches(gt_node)
            for on in pred_nodes:
                if node_tp not in pred_graph.nodes[on]:
                    return False
            return True

    # If not a TP, check if it's between skip edges (when relaxing)
    if relax_skips_pred:
        for prev_edge in gt_graph.graph.in_edges(gt_node):
            if EdgeFlag.SKIP_TRUE_POS in gt_graph.edges[prev_edge]:
                return True

    return False


def _has_fp_division(
    gt_node: Any,
    matched: Matched,
    is_ctc: bool,
) -> bool:
    """Does this GT node have a false positive division in the prediction?

    A spurious division means the prediction splits the track where the
    GT doesn't. This invalidates windows starting from this node, since
    the outgoing pred edges include a division that shouldn't exist.

    Only applies to basic errors — CTC handles division errors via
    WRONG_SEMANTIC edge flags instead.
    """
    if is_ctc:
        return False

    pred_graph = matched.pred_graph
    for pred_node in matched.get_gt_pred_matches(gt_node):
        if NodeFlag.FP_DIV in pred_graph.nodes[pred_node]:
            return True
    return False


def _is_edge_correct(
    gt_edge: tuple[Any, Any],
    matched: Matched,
    is_ctc: bool,
    relax_skips_gt: bool,
    relax_skips_pred: bool,
) -> bool:
    """Is this GT edge correctly reconstructed in the prediction?

    An edge is correct if the prediction has a matching true positive
    link with no semantic errors. With skip relaxation, matched skip
    edges also count as correct.
    """
    gt_graph = matched.gt_graph
    pred_graph = matched.pred_graph
    edge_data = gt_graph.edges[gt_edge]

    if is_ctc:
        # CTC errors don't annotate edge TPs, so check for absence of error flags
        if EdgeFlag.CTC_FALSE_NEG in edge_data:
            return False

        # Also check matched pred edges for CTC error flags
        # Note: INTERTRACK_EDGE just marks division edges, not errors
        matched_sources = matched.get_gt_pred_matches(gt_edge[0])
        matched_targets = matched.get_gt_pred_matches(gt_edge[1])
        for src in matched_sources:
            for tgt in matched_targets:
                if pred_graph.graph.has_edge(src, tgt):
                    pred_edge_data = pred_graph.edges[(src, tgt)]
                    if EdgeFlag.WRONG_SEMANTIC in pred_edge_data:
                        return False
        return True
    else:
        # Check for regular TP
        if EdgeFlag.TRUE_POS in edge_data:
            return True

    # Check for skip TP if the matching relaxation flag is enabled:
    # - GT skip edge (spans multiple frames in GT) needs relax_skips_gt
    # - Non-skip edge with SKIP_TRUE_POS (pred has the skip) needs relax_skips_pred
    if EdgeFlag.SKIP_TRUE_POS in edge_data:
        is_skip_edge = gt_graph.is_skip_edge(gt_edge)
        if is_skip_edge and relax_skips_gt:
            return True
        if not is_skip_edge and relax_skips_pred:
            return True

    return False
