from __future__ import annotations

from typing import TYPE_CHECKING, Any

from traccuracy._tracking_graph import EdgeFlag, NodeFlag

if TYPE_CHECKING:
    from traccuracy.matchers import Matched

# Sentinel values for the DP grid
EMPTY = -1
CORRECT = 1
INCORRECT = 0


def compute_track_accuracy(
    matched: Matched,
    window: int,
    lineages: bool = True,
    error_type: str = "basic",
    relax_skips_gt: bool = False,
    relax_skips_pred: bool = False,
) -> dict[int, tuple[int, int]]:
    """Compute the fraction of GT track segments correctly reconstructed.

    For each component (lineage or tracklet), builds a 2D grid of
    per-frame-step correctness values (see ``_build_grid``). Then uses
    dynamic programming to combine adjacent frame steps into larger
    windows: w=k is built from w=1 (base) and w=k-1 (previous), with
    division links ensuring all daughter branches are AND'd together.
    Non-EMPTY cells in each window's grid are counted as segments.

    Window size is measured in frames (time difference), not edge count.
    Skip edges spanning multiple frames are interpolated to fill
    intermediate frame steps with the same correctness status.

    GT tracks shorter than a given window size still count once for that
    window size (correct iff the entire track is correct).

    Args:
        matched: Matched data object with annotated errors
        window: Maximum window size to evaluate (in frames)
        lineages: If True, evaluate on full lineages. If False, on tracklets.
        error_type: "basic" or "ctc" - which error classification was used
        relax_skips_gt: If True, SKIP_TRUE_POS edges in GT count as correct
        relax_skips_pred: If True, SKIP_TRUE_POS edges in pred count as correct

    Returns:
        Dictionary mapping window size (int) to tuple of (correct_count, total_count)
    """
    is_ctc = error_type == "ctc"

    # Get components (lineages or tracklets)
    if lineages:
        components = matched.gt_graph.get_lineages()
    else:
        components = matched.gt_graph.get_tracklets(include_division_edges=False)

    total_segments: dict[int, int] = {i: 0 for i in range(1, window + 1)}
    correct_segments: dict[int, int] = {i: 0 for i in range(1, window + 1)}

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

        if not grid:
            continue

        T = len(grid)

        # DP to build grids for increasing window sizes.
        # For window w, combine base_grid[t] (w=1) with prev_grid[t+1] (w-1).
        base_grid = grid
        prev_grid = grid

        for w in range(1, window + 1):
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
                        val_prev = _get_linked_value(
                            row, t + 1, prev_grid, divs
                        )
                        cur_grid[t][row] = _combine(val_base, val_prev)

                prev_grid = cur_grid

            _count_grid(cur_grid, total_segments, correct_segments, w)

    return {i: (correct_segments[i], total_segments[i]) for i in range(1, window + 1)}


def _combine(a: int, b: int) -> int:
    """Combine two grid values.

    -1 (EMPTY) is identity: the result is the other value.
    0 (INCORRECT) absorbs: if either is 0, result is 0.
    1 (CORRECT) requires both: 1 combined with 1 = 1.
    """
    if a == EMPTY:
        return b
    if b == EMPTY:
        return a
    if a == INCORRECT or b == INCORRECT:
        return INCORRECT
    return CORRECT


def _get_linked_value(
    row: int,
    next_t: int,
    prev_grid: list[list[int]],
    divisions: dict[int, list[int]] | None,
) -> int:
    """Get the value from prev_grid following the link from row.

    Default link: same row at next_t.
    Division link: AND across all daughter rows at next_t.
    Divisions is None when the caller knows no division link should fire.
    """
    if next_t >= len(prev_grid):
        return EMPTY

    if divisions is not None and row in divisions:
        # Division: combine all daughter values (all must be correct)
        result = EMPTY
        for daughter_row in divisions[row]:
            daughter_val = prev_grid[next_t][daughter_row]
            result = _combine(result, daughter_val)
        return result

    # Default: same row in next column
    return prev_grid[next_t][row]


def _count_grid(
    cur_grid: list[list[int]],
    total_segments: dict[int, int],
    correct_segments: dict[int, int],
    w: int,
) -> None:
    """Count total and correct entries in a grid for window size w."""
    for t_col in cur_grid:
        for val in t_col:
            if val != EMPTY:
                total_segments[w] += 1
                if val == CORRECT:
                    correct_segments[w] += 1


def _build_grid(
    gt_track: Any,
    matched: Matched,
    is_ctc: bool,
    relax_skips_gt: bool,
    relax_skips_pred: bool,
) -> tuple[list[list[int]], dict[int, list[int]], int]:
    """Build the w=1 grid for a single component (lineage or tracklet).

    The grid is a 2D structure indexed by [time_step][row]. Each cell
    holds CORRECT (1), INCORRECT (0), or EMPTY (-1). Time steps span
    the full GT graph time range: T = end_frame - start_frame - 1,
    where start_frame and end_frame come from the GT graph (end_frame
    is exclusive). Each row represents one branch of the track tree.

    A cell at grid[t][row] represents the correctness of the frame
    step from (start_frame + t) to (start_frame + t + 1) on that
    branch. EMPTY means no track occupies that row at that time step.

    At divisions, the parent row ends and each daughter gets a new row.
    A division link is stored at the last pre-division time step so
    that larger windows spanning the division AND across all daughters.

    Skip edges spanning multiple frames are interpolated: a skip from
    t=2 to t=5 fills grid[2], grid[3], grid[4] with the same value.

    Example — GT graph spans frames 0-4 (T=3 steps). A lineage with
    root A at t=0, edge A->B (t=0->1), then B divides into C (t=1->2)
    and D (t=1->2), all correct::

        time step:    0     1     2
        row 0 (A-B):  1     .     .     <- parent row, EMPTY after division
        row 1 (C):    .     1     .     <- daughter 1
        row 2 (D):    .     1     .     <- daughter 2

        divisions: {0: [1, 2]}  <- row 0 links to daughter rows 1, 2

    For window w=1, we count non-EMPTY cells (3 total, 3 correct).
    For w=2, we combine grid[t] with grid[t+1] following division
    links, so the cell at (0, 0) combines with daughters at (1, 1)
    and (1, 2).

    Returns:
        grid: list of columns, each column is a list of row values
        divisions: dict mapping parent row -> list of daughter row indices
        num_rows: total number of rows in the grid
    """
    gt_graph = matched.gt_graph
    frame_key = gt_graph.frame_key

    # Determine time range
    min_frame = gt_graph.start_frame
    max_frame = gt_graph.end_frame
    T = max_frame - min_frame - 1  # Number of frame steps
    if T <= 0:
        return [], {}, 0

    grid: list[list[int]] = [[] for _ in range(T)]
    divisions: dict[int, list[int]] = {}

    # Each component has exactly one root node
    root = next(n for n in gt_track.nodes() if gt_track.in_degree(n) == 0)

    num_rows = 0
    root_row = num_rows
    num_rows += 1
    stack = [(root, root_row)]

    while stack:
        node, cur_row = stack.pop()
        out_edges = list(gt_track.out_edges(node))

        if not out_edges:
            continue

        node_correct = _is_node_correct(
            node, matched, is_ctc, relax_skips_pred,
        )

        if len(out_edges) > 1:
            # Division: assign new rows for each daughter
            daughter_rows = []
            source_frame = gt_graph.nodes[node][frame_key]

            for edge in out_edges:
                daughter_row = num_rows
                num_rows += 1
                daughter_rows.append(daughter_row)

                target = edge[1]
                target_frame = gt_graph.nodes[target][frame_key]
                edge_span = target_frame - source_frame

                edge_correct = node_correct and _is_edge_correct(
                    edge, matched, is_ctc, relax_skips_gt, relax_skips_pred,
                )
                val = CORRECT if edge_correct else INCORRECT

                for dt in range(edge_span):
                    t_idx = source_frame - min_frame + dt
                    if 0 <= t_idx < T:
                        _grid_set(grid, t_idx, daughter_row, val)

                stack.append((target, daughter_row))

            # Record division link for this row.
            # If the division is at the root (no pre-division steps on
            # this row), no link is needed — daughters are independent.
            if source_frame > min_frame:
                divisions[cur_row] = daughter_rows

        else:
            # Single outgoing edge
            edge = out_edges[0]
            target = edge[1]
            target_frame = gt_graph.nodes[target][frame_key]
            source_frame = gt_graph.nodes[node][frame_key]
            edge_span = target_frame - source_frame

            edge_correct = node_correct and _is_edge_correct(
                edge, matched, is_ctc, relax_skips_gt, relax_skips_pred,
            )
            val = CORRECT if edge_correct else INCORRECT

            for dt in range(edge_span):
                t_idx = source_frame - min_frame + dt
                if 0 <= t_idx < T:
                    _grid_set(grid, t_idx, cur_row, val)

            stack.append((target, cur_row))

    # Pad all columns to the same number of rows
    for t in range(T):
        while len(grid[t]) < num_rows:
            grid[t].append(EMPTY)

    return grid, divisions, num_rows


def _grid_set(
    grid: list[list[int]], t: int, row: int, val: int
) -> None:
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
    """Check if a GT node is correctly matched.

    For basic errors:
    - GT node must have the TRUE_POS flag
    - GT node must not have FN_DIV flag
    - Matched pred nodes must also have TRUE_POS flag
    - Matched pred nodes must not have FP_DIV flag

    For CTC errors:
    - GT node must have the CTC_TRUE_POS flag
    - Division errors (FN_DIV/FP_DIV) are NOT checked - CTC handles divisions
      via WRONG_SEMANTIC edge flags instead

    If relax_skips_pred is True, nodes between SKIP_TRUE_POS edges are also correct.
    """
    gt_graph = matched.gt_graph
    pred_graph = matched.pred_graph
    node_tp = NodeFlag.CTC_TRUE_POS if is_ctc else NodeFlag.TRUE_POS

    gt_node_data = gt_graph.nodes[gt_node]

    if is_ctc:
        # CTC only checks GT node TP flag - division errors handled via WRONG_SEMANTIC
        if node_tp in gt_node_data:
            return True
    else:
        # Basic errors: check division errors and pred node TP flags
        # Check for division errors on GT node (FN_DIV means missed division)
        if NodeFlag.FN_DIV in gt_node_data:
            return False

        # Check if GT node is a TP
        if node_tp in gt_node_data:
            # Check matched pred nodes for FP_DIV (false positive division)
            pred_nodes = matched.get_gt_pred_matches(gt_node)
            for on in pred_nodes:
                if NodeFlag.FP_DIV in pred_graph.nodes[on]:
                    return False

            # Also check that all matched pred nodes are TP
            for on in pred_nodes:
                if node_tp not in pred_graph.nodes[on]:
                    return False
            return True

    # If not a TP, check if it's between skip edges (when relaxing)
    if relax_skips_pred:
        # Check if any incoming edge is a SKIP_TRUE_POS
        for prev_edge in gt_graph.graph.in_edges(gt_node):
            if EdgeFlag.SKIP_TRUE_POS in gt_graph.edges[prev_edge]:
                return True

    return False


def _is_edge_correct(
    gt_edge: tuple[Any, Any],
    matched: Matched,
    is_ctc: bool,
    relax_skips_gt: bool,
    relax_skips_pred: bool,
) -> bool:
    """Check if a GT edge is correctly matched.

    For basic errors: edge is correct if it has the TRUE_POS flag.
    For CTC errors: edge is correct if it does NOT have CTC_FALSE_NEG flag,
        and matched pred edges don't have WRONG_SEMANTIC.
    If skip relaxation is enabled, SKIP_TRUE_POS also counts as correct.
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

    # Check for skip TP if relaxation is enabled
    if (relax_skips_gt or relax_skips_pred) and EdgeFlag.SKIP_TRUE_POS in edge_data:
        return True

    return False
