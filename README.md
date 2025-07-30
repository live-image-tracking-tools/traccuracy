# traccuracy: Evaluate Cell Tracking Solutions

[![License](https://img.shields.io/pypi/l/traccuracy.svg?color=green)](https://github.com/live-image-tracking-tools/traccuracy/raw/main/LICENSE)
[![PyPI](https://img.shields.io/pypi/v/traccuracy.svg?color=green)](https://pypi.org/project/traccuracy)
[![Python Version](https://img.shields.io/pypi/pyversions/traccuracy.svg?color=green)](https://python.org)
[![CI](https://github.com/live-image-tracking-tools/traccuracy/actions/workflows/ci.yml/badge.svg)](https://github.com/live-image-tracking-tools/traccuracy/actions/workflows/ci.yml)
[![Benchmarking](https://github.com/live-image-tracking-tools/traccuracy/actions/workflows/benchmark-report.yml/badge.svg)](https://live-image-tracking-tools.github.io/traccuracy/dev/bench/)
[![Documentation Status](https://readthedocs.org/projects/traccuracy/badge/?version=latest)](https://traccuracy.readthedocs.io/en/latest/?badge=latest)
[![codecov](https://codecov.io/gh/live-image-tracking-tools/traccuracy/branch/main/graph/badge.svg)](https://codecov.io/gh/live-image-tracking-tools/traccuracy)


`traccuracy` provides a suite of benchmarking functions that can be used to evaluate cell tracking solutions against ground truth annotations. The goal of this library is to provide a convenient way to run rigorous evaluation and to document and consolidate the wide variety of metrics used in the field.

`traccuracy` can compute a comprehensive set of metrics for evaluating cell linking and division performance, and can compute biologically meaningful metrics such as the number of correctly reconstructed lineages over N frames and cell cycle length accuracy. As matching ground truth and predicted lineages is a crucial step for performing evaluation, `traccuracy` includes a number of algorithms for matching ground truth and predicted lineages, both with and without segmentation masks.

Learn more in the [documentation](https://traccuracy.readthedocs.io/en/latest/) or check out the [source code](https://github.com/live-image-tracking-tools/traccuracy).

## Installation
`pip install traccuracy`

## How It Works
The `traccuracy` library has three main components: loaders, matchers, and metrics.

Loaders load tracking graphs from other formats, such as the CTC format, into a [TrackingGraph](https://traccuracy.readthedocs.io/en/latest/autoapi/traccuracy/index.html#traccuracy.TrackingGraph) object.
A `TrackingGraph` is a spatiotemporal graph backed by a `networkx.DiGraph`
Nodes represent a single cell in a given time point, and are annotated with a time and a location.
Edges point forward in time from a node representing a cell in time point `t` to the same cell or its daughter in frame `t+1` (or beyond, to represent skip edges). Additional terminology is documented in the [glossary](https://traccuracy.readthedocs.io/en/latest/glossary.html)
To load `TrackingGraph`s from a custom format, you will likely need to implement a loader: see
documentation [here](https://traccuracy.readthedocs.io/en/latest/autoapi/traccuracy/loaders/index.html#module-traccuracy.loaders) for more information. Alternatively you can initialize a `TrackingGraph` with a `networkx.DiGraph` and `ArrayLike` objects of segmentation masks if needed. 

Matchers take a ground truth and a predicted `TrackingGraph` with optional segmentation masks and match the nodes and edges to allow evaluation to occur. A list of matchers is available [here](https://traccuracy.readthedocs.io/en/latest/matchers/matchers.html).

In order to compute metrics, `traccuracy` begins by annotating the matched graphs with error flags such as False Positive and False Negative. The annotated graph can be exported and used for visualization in other tools. Finally, metrics inspect the error annotations to report both error counts and summary statistics. 

The `traccuracy` library has a flexible Python API, shown in [this](https://traccuracy.readthedocs.io/en/latest/examples/ctc.html) example notebook. Additionally there is a command line interface for running standard CTC metrics, [documented here](https://traccuracy.readthedocs.io/en/latest/cli.html).

```python
from traccuracy.loaders import load_ctc_data
from traccuracy.matchers import PointMatcher
from traccuracy.metrics import DivisionMetrics, BasicMetrics

# Load data in TrackingGraph objects
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
    matcher=PointMatcher(),
    metrics=[DivisionMetrics(), BasicMetrics()]
)
```


## Implemented Metrics

- [Cell Tracking Challenge Evaluation Methodology](http://celltrackingchallenge.net/evaluation-methodology/)
    - [CTC-DET](https://traccuracy.readthedocs.io/en/latest/metrics/ctc.html#det)
    - [CTC-LNK](https://traccuracy.readthedocs.io/en/latest/metrics/ctc.html#lnk)
    - [CTC-TRA](https://traccuracy.readthedocs.io/en/latest/metrics/ctc.html#tra)
    - [Branching Correctness](https://traccuracy.readthedocs.io/en/latest/metrics/ctc.html#branching-correctness-bc) (BC)
- [Acyclic Oriented Graph Metric](https://traccuracy.readthedocs.io/en/latest/metrics/ctc.html#aogm) (AOGM) from [Matula et al. 2015](https://doi.org/10.1371/journal.pone.0144959). A generalized form the CTC metrics where you can supply different weights for each component of the overall metric.
- [Division Performance Metrics](https://traccuracy.readthedocs.io/en/latest/metrics/division.html#) Optionally allows detection within N frames of ground truth division.
    - Division Precision
    - Division Recall
    - Division F1 score
    - [Mitotic Branching Correctness](https://traccuracy.readthedocs.io/en/latest/metrics/division.html#mitotic-branching-score) from [Ulicna et al. 2021](https://doi.org/10.3389/fcomp.2021.734559).
- [Basic Connectivity Metrics](https://traccuracy.readthedocs.io/en/latest/metrics/basic.html) highlighting performance on both nodes and edges.
    - Node/Edge Precision
    - Node/Edge Recall
    - Node/Edge F1 Score
- [Track Overlap Metrics](https://traccuracy.readthedocs.io/en/latest/metrics/track_overlap.html) defined by [Bise et al. 2011](https://doi.org/10.1109/ISBI.2011.5872571), [Chen 2021](https://doi.org/10.48550/arXiv.2102.10377), and [Fukai et al. 2022](https://doi.org/10.1093/bioinformatics/btac799). 
    - [Track Purity](https://traccuracy.readthedocs.io/en/latest/metrics/track_overlap.html#track-purity)
    - [Track Effectiveness](https://traccuracy.readthedocs.io/en/latest/metrics/track_overlap.html#target-effectiveness)
    - [Track Fractions](https://traccuracy.readthedocs.io/en/latest/metrics/track_overlap.html#track-fractions)
    - [Complete Tracks](https://traccuracy.readthedocs.io/en/latest/metrics/track_overlap.html#complete-tracks)
- [CHOTA](https://traccuracy.readthedocs.io/en/latest/metrics/chota.html#chota) from [Kaiser et al. 2024](https://doi.org/10.1007/978-3-031-91721-9_8).

## Featured Works

If you use `traccuracy` in your own work, please let us know so that we can feature it here!

- [Archit, A. et al. (2025). Segment anything for microscopy. Nature Methods.](https://doi.org/10.1038/s41592-024-02580-4)
- [Evans et al. (2025). Icebergs, jigsaw puzzles and genealogy: Automated multi-generational iceberg tracking and lineage reconstruction. Preprint in EGUsphere.](https://doi.org/10.5194/egusphere-2025-2886)
- [Seiffarth, J., & Nöh, K. (2025). PyUAT: Open-source Python framework for efficient and scalable cell tracking. arXiv preprint.](https://arxiv.org/pdf/2503.21914)
- [Bragantini, J. et al. (2024). Ultrack: pushing the limits of cell tracking across biological scales. bioRxiv.](https://doi.org/10.1101/2024.09.02.610652)
- [Gallusser, B., & Weigert, M. (2024). Trackastra: Transformer-based cell tracking for live-cell microscopy. In European Conference on Computer Vision.](https://doi.org/10.1007/978-3-031-73116-7_27)
- [Toma, T. T., Wang, Y., Gahlmann, A., & Acton, S. T. (2024). Deep Temporal Sequence Classification and Mathematical Modeling for Cell Tracking in Dense 3D Microscopy Videos of Bacterial Biofilms. arXiv preprint.](https://doi.org/10.48550/arXiv.2406.19574)

