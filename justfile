# Run `just` to list available recipes. Requires https://docs.astral.sh/uv/

# Python version used for the dev environment
python := "3.11"

default:
    @just --list

# Download data used by the benchmarks
getdata:
    uv run --extra test python scripts/download_test_data.py

# Run the test suite (extra args are passed to pytest)
test *args:
    uv run --extra test pytest {{args}}

# Run benchmarks
benchmark: getdata
    uv run --extra test pytest tests/bench.py

# Report coverage of matchers/errors by the standard test cases
test-case-report:
    uv run --extra covreport python scripts/test_case_report.py test-case-report
    rm -f matchers*.json track_errors*.json metrics*.json

# Register the Jupyter kernel needed to build the docs
kernel-config:
    uv run --extra docs python -m ipykernel install --user --name="traccuracy-docs"

# Build the documentation
docs: kernel-config
    uv run --extra docs sphinx-build docs/source docs/_build -D nb_execution_mode=cache

# Install the pre-commit git hook
pre-commit-install:
    uv run --extra dev pre-commit install
