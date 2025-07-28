import os
import urllib.request
import zipfile
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
DATASETS = [
    "http://data.celltrackingchallenge.net/training-datasets/Fluo-N2DL-HeLa.zip",
    "http://data.celltrackingchallenge.net/training-datasets/PhC-C2DL-PSC.zip",
    "http://data.celltrackingchallenge.net/training-datasets/Fluo-N3DH-CE.zip",
]


def _download_gt_data(url, root_dir):
    data_dir = os.path.join(root_dir, "downloads")

    if not os.path.exists(data_dir):
        os.mkdir(data_dir)

    filename = url.split("/")[-1]
    file_path = os.path.join(data_dir, filename)

    if not os.path.exists(file_path):
        urllib.request.urlretrieve(url, file_path)

        # Unzip the data
        with zipfile.ZipFile(file_path, "r") as zip_ref:
            zip_ref.extractall(data_dir)


def main():  # noqa: D103
    for url in DATASETS:
        _download_gt_data(url, ROOT_DIR)


if __name__ == "__main__":
    main()
