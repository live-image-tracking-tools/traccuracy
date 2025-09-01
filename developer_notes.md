# Traccuracy Developer Notes

We recommend using `pixi` for environment management while developing `traccuracy`. See the [pixi docs](https://pixi.sh/dev/) for installation instructions. The following instructions will be focused on pixi-based development, but all of the same tasks can be completed with pip and another environment manager.

## Development
For local development, clone the repo and install in editable mode.
```
git clone https://github.com/live-image-tracking-tools/traccuracy.git
pixi install
```

### Testing
To run basic tests
```
pixi run test
```

We run benchmarking on every commit into main to keep track of any potential performance regression. To run benchmarking locally:
```
pixi run benchmark
```
This command should download the data (alternatively run `pixi run getdata`) and then run benchmarking.

`traccuracy` tests are built around a set of standard test cases available in `tests.examples`. To check coverage of matcher and error modules against standard tests cases, run
```
pixi run test-case-report
```

### Style
We utilize `pre-commit` with black (formatting) and ruff (linting). If you would like to run `pre-commit` locally:
```
pixi run -e dev pre-commit install
```
Alternatively [pre-commit.ci](https://pre-commit.ci/), will run and commit changes on any open PRs.

### Releases
In order to deploy a new version, tag the commit with a version number and push it to github. This will trigger a github action that will build and deploy to PyPI. (see the "deploy" step in workflows/ci.yml). The version number is determined automatically based on the tag.
```
git tag -a v0.1.0 -m v0.1.0
git push --follow-tags
```

### Documentation
Documentation is built with Sphinx using `sphinx-autoapi` to automatically generate API documentation at build time. Docs are hosted on ReadTheDocs and build automatically after each push to main. Documentation can be built locally by running the following:
```
pixi run docs
```

Note that running documentation locally requires Pandoc to be installed as well - https://pandoc.org/installing.html.

You can view the documentation by opening `docs/_build/index.html` in your browser.