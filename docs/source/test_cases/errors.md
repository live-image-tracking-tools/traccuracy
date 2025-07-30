---
file_format: mystnb
---
# Graph Error Test Cases (Non-Dividing)

To facilitate testing, we have provided a suite of canonical
examples that cover the basic, simple scenarios that can occur in segmentation
and tracking. Here we describe them and show visualizations of each case.

Metrics should test all the graph and division error cases that are possible with
the matchers that the metric supports. For example, if the metric requires a
one-to-one matching, it is not necessary to test the two-to-one or one-to-two
cases.


```{code-cell} ipython3
---
tags: [remove-input]
---
import sys

sys.path.append("../../../tests")

import matplotlib.pyplot as plt
from matplotlib.patches import Patch

import examples.graphs as ex_graphs
from traccuracy import TrackingGraph
```

```{code-cell} ipython3
---
tags: [remove-input]
---
def get_loc(graph, node):
    return graph.graph.nodes[node]["t"], graph.graph.nodes[node]["y"]


def plot_graph(ax, graph: TrackingGraph, color="black"):
    if graph.graph.number_of_nodes() == 0:
        return [0, 0], [0, 0]
    ids = list(graph.graph.nodes)
    x = [graph.graph.nodes[node]["t"] for node in ids]
    y = [graph.graph.nodes[node]["y"] for node in ids]
    ax.scatter(x, y, color=color)
    for _x, _y, _id in zip(x, y, ids):
        ax.text(_x + 0.05, _y + 0.05, str(_id))

    for u, v in graph.graph.edges():
        xs = [graph.graph.nodes[u]["t"], graph.graph.nodes[v]["t"]]
        ys = [graph.graph.nodes[u]["y"], graph.graph.nodes[v]["y"]]
        ax.plot(xs, ys, color=color)

    return [max(x), min(x)], [max(y), min(y)]


def plot_matching(ax, matched, color="grey"):
    for u, v in matched.mapping:
        xs = [
            matched.gt_graph.graph.nodes[u]["t"],
            matched.pred_graph.graph.nodes[v]["t"],
        ]
        ys = [
            matched.gt_graph.graph.nodes[u]["y"],
            matched.pred_graph.graph.nodes[v]["y"],
        ]
        ax.plot(xs, ys, color=color, linestyle="dashed")


def plot_matched(examples, title, figsize=None):
    gt_color = "black"
    pred_color = "blue"
    mapping_color = "grey"
    if figsize is None:
        figsize = (3 * len(examples) + 1, 2)
    fig, ax = plt.subplots(1, len(examples) + 1, figsize=figsize)
    for i, matched in enumerate(examples):
        axis = ax[i]
        xbounds, ybounds = plot_graph(axis, matched.gt_graph, color=gt_color)
        bounds = plot_graph(axis, matched.pred_graph, color=pred_color)
        xbounds.extend(bounds[0])
        ybounds.extend(bounds[1])
        plot_matching(axis, matched, color=mapping_color)
        axis.set_ybound(min(ybounds) - 0.5, max(ybounds) + 0.5)
        axis.set_xbound(min(xbounds) - 0.5, max(xbounds) + 0.5)
        axis.set_ylabel("Y Value")
        axis.set_xlabel("Time")

    handles = [
        Patch(color=gt_color),
        Patch(color=pred_color),
        Patch(color=mapping_color),
    ]
    labels = ["Ground Truth", "Prediction", "Mapping"]
    ax[-1].legend(handles=handles, labels=labels, loc="center")
    ax[-1].set_axis_off()
    plt.tight_layout()
    fig.suptitle(title, y=1.05)
```

```{code-cell} ipython3
plot_matched([ex_graphs.empty_gt()], "Empty Ground Truth")
```

```{code-cell} ipython3
plot_matched([ex_graphs.empty_pred()], "Empty Prediction")
```

```{code-cell} ipython3
plot_matched([ex_graphs.good_matched()], "Good Matching")
```

```{code-cell} ipython3
plot_matched([ex_graphs.fn_node_matched(t) for t in [0, 1, 2]], "False Negative Node")
```

```{code-cell} ipython3
plot_matched([ex_graphs.fn_edge_matched(t) for t in [0, 1]], "False Negative Edge")
```

```{code-cell} ipython3
plot_matched([ex_graphs.fp_node_matched(t) for t in [0, 1, 2]], "False Positive Node")
```

```{code-cell} ipython3
plot_matched([ex_graphs.fp_edge_matched(t) for t in [0, 1]], "False Positive Edge")
```

```{code-cell} ipython3
plot_matched([ex_graphs.crossover_edge()], "Crossover False Positive")
```

```{code-cell} ipython3
plot_matched(
    [ex_graphs.node_two_to_one(t) for t in [0, 1, 2]],
    "Two GT nodes to one pred node",
)
```

```{code-cell} ipython3
plot_matched(
    [ex_graphs.edge_two_to_one(t) for t in [0, 1]], "Two GT edges to one pred edge"
)
```

```{code-cell} ipython3
plot_matched(
    [ex_graphs.node_one_to_two(t) for t in [0, 1, 2]],
    "One GT node to two pred nodes",
)
```

```{code-cell} ipython3
plot_matched(
    [ex_graphs.edge_one_to_two(t) for t in [0, 1]], "One GT edge to 2 pred edges"
)
```

```{code-cell} ipython3
plot_matched(
    [ex_graphs.gap_close_two_to_one()], "Two GT edges to one pred skip edge"
)
```

```{code-cell} ipython3
plot_matched(
    [
        ex_graphs.gap_close_gt_gap(),
        ex_graphs.gap_close_pred_gap(),
        ex_graphs.gap_close_matched_gap(),
        ex_graphs.gap_close_offset(),
    ],
    "Skip edge cases",
)
```

```{code-cell} ipython3
plot_matched(
    [ex_graphs.all_basic_errors()],
    "All basic errors",
    figsize=(6, 2)
)
```