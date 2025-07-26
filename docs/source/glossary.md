# Glossary

```{glossary}
Tracklet
  A single non-dividing cell tracked over time. In graph terms, this is the connected component of a track between divisions (daughter to next parent). Tracklets can also start or end with a non-dividing cell at the beginning and end of the captured time or if the track leaves the field of view.

Lineage
  A single cell and all of its progeny. In graph terms, a connected component including divisions.

Node
  A cell in a single timpoint. For `traccuracy`, the node must have a position attribute which can either be explicitly defined as a point or derived from a segmentation mask.

Edge
  A connection between two nodes in different timepoints. An edge implies that the two connected nodes represent the same cell in different timepoints. 

Skip Edges
  Also known as *gap closing*, these are edges that connect non-consecutive frames to signify a cell being occluded or missing for some frames, before the track continues.

  `traccuracy` allows for {term}`skip edges <Skip Edges>` in both the ground truth and predicted graphs. For the purposes of standard error classification, an edge ``u -> v`` is **not** considered identical to a matching edge ``u -> w -> v``, and this will lead to errors annotated in this region. Several metrics offer options to `relax_skips_gt` and `relax_skips_pred`, allowing the previously described case to be considered correct. The exact handling of {term}`skip edges <Skip Edges>` depends on the specific track errors and metrics in question and is detailed in the other Track Error and Metrics sections.

Division
  Divisions occur when a cell divides into two daughter cells. The cell that divides is also known as the *parent cell* and has two outgoing edges to the two daughter cells.

Parent cell
  See {term}`division`.

Successor
  For a given node in the graph, the successor is the connected node in the next timepoint. If the nodes are connected by a skip edge, the successors may be more than one timepoint away from the given node. If the given node is a parent node, there may be two successors.

Predecessor
  For a given node in the graph, the predecessor is the connected node in the previous timepoint. If the nodes are connected by a skip edge, the predecessor may be more than one timepoint away from the given node.

True positive
  An object, such as a node, edge or division, that is correctly identified or matched in the ground truth and the prediction. Abbreviated TP.

False positive
  An object, such as a node, edge or division, that is present in the predicted graph, but does not match any such object in the ground truth. Abbreviated FP.

False negative
  An object, such as a node, edge or division, that is present in the ground truth graph, but does not match any such object in the prediction. Abbreviated FN. 

Recall
  $ \frac{\textrm{TP}}{\textrm{TP} + \textrm{FN}} $

Precision
  $ \frac{\textrm{TP}}{\textrm{TP} + \textrm{FP}} $

F1 Score
  $ \frac{2 * \textrm{Recall} * \textrm{Precision}}{\textrm{Recall} + \textrm{Precision}} $
```