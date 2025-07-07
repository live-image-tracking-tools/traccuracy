---
file_format: mystnb
mystnb:
    remove_code_source: True
---
# Skip Edges

Skip edges are those which connect a node in frame ``t`` to a node in frame ``t+2`` onwards. They are also called gap closing edges.

Traccuracy allows for skip edges in both the ground truth and predicted graphs. For the purposes of standard error classification,
an edge ``u -> v`` is **not** considered identical to a matching edge ``u -> w -> v``, and this will lead to errors annotated in this region. Several metrics offer options to `relax_skips_gt` and `relax_skips_pred` which allows the previously described case to be considered correct. The exact handling of skip edges depends on the specific track errors and metrics in questions and is detailed in the other Track Error and Metrics sections.