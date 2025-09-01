import numpy as np
import pytest
from skimage.measure import regionprops

from tests.test_utils import get_annotated_image
from traccuracy.matchers._compute_overlap import (
    get_labels_with_overlap,
)


@pytest.mark.parametrize("overlap", ["iou", "iogt"])
def test_get_labels_with_overlap(overlap):
    n_labels = 3
    image1 = get_annotated_image(img_size=256, num_labels=n_labels, sequential=True, seed=1)
    image2 = get_annotated_image(img_size=256, num_labels=n_labels + 1, sequential=True, seed=2)
    empty_image = get_annotated_image(img_size=256, num_labels=0, sequential=True, seed=1)

    # Get properties for image1
    props1 = regionprops(image1)
    gt_boxes = np.array([prop.bbox for prop in props1])
    gt_labels = np.array([prop.label for prop in props1])

    ious = get_labels_with_overlap(
        image1, image1, gt_boxes, gt_boxes, gt_labels, gt_labels, overlap
    )
    gt, res, iou = tuple(zip(*ious, strict=False))
    assert gt == tuple(range(1, n_labels + 1))
    assert res == tuple(range(1, n_labels + 1))
    assert iou == (1.0,) * n_labels

    # testing without providing bounding boxes and labels
    with pytest.warns(UserWarning, match="using 'regionprops' to get them"):
        other_ious = get_labels_with_overlap(image1, image1)
        other_gt, other_res, other_iou = tuple(zip(*other_ious, strict=False))
        assert other_gt == gt
        assert other_res == res
        assert other_iou == iou

    # Get properties for image2
    props2 = regionprops(image2)
    res_boxes = np.array([prop.bbox for prop in props2])
    res_labels = np.array([prop.label for prop in props2])

    get_labels_with_overlap(image1, image2, gt_boxes, res_boxes, gt_labels, res_labels, overlap)

    # Test empty labels array
    empty_props = regionprops(empty_image)
    empty_boxes = np.array([prop.bbox for prop in empty_props])
    empty_labels = np.array([prop.label for prop in empty_props])
    ious = get_labels_with_overlap(
        image1, empty_image, gt_boxes, empty_boxes, gt_labels, empty_labels, overlap
    )
    assert ious == []


def test_get_labels_with_overlap_invalid():
    n_labels = 3
    image1 = get_annotated_image(img_size=256, num_labels=n_labels, sequential=True, seed=1)

    # Get properties for image1
    props1 = regionprops(image1)
    gt_boxes = np.array([prop.bbox for prop in props1])
    gt_labels = np.array([prop.label for prop in props1])

    with pytest.raises(ValueError, match="Unknown overlap type: test"):
        get_labels_with_overlap(image1, image1, gt_boxes, gt_boxes, gt_labels, gt_labels, "test")
