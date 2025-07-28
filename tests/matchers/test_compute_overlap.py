import pytest

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

    ious = get_labels_with_overlap(image1, image1, overlap)
    gt, res, iou = tuple(zip(*ious, strict=False))
    assert gt == tuple(range(1, n_labels + 1))
    assert res == tuple(range(1, n_labels + 1))
    assert iou == (1.0,) * n_labels

    get_labels_with_overlap(image1, image2, overlap)

    # Test empty labels array
    ious = get_labels_with_overlap(image1, empty_image, overlap)
    assert ious == []


def test_get_labels_with_overlap_invalid():
    n_labels = 3
    image1 = get_annotated_image(img_size=256, num_labels=n_labels, sequential=True, seed=1)
    with pytest.raises(ValueError, match="Unknown overlap type: test"):
        get_labels_with_overlap(image1, image1, "test")
