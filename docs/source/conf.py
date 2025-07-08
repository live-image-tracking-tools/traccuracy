# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import sys
from unittest import mock

sys.path.insert(0, os.path.abspath("../../src"))


# -- Project information -----------------------------------------------------

project = "Traccuracy"
copyright = "2025"  # noqa
author = "Morgan Schwartz, Draga Doncila Pop, and Caroline Malin-Mayor"


# -- RTD configuration ------------------------------------------------

# on_rtd is whether we are on readthedocs.org, this line of code grabbed from docs.readthedocs.org
on_rtd = os.environ.get("READTHEDOCS", None) == "True"

# This is used for linking and such so we link to the thing we're building
rtd_version = os.environ.get("READTHEDOCS_VERSION", "master")
if rtd_version not in ["stable", "latest", "master"]:
    rtd_version = "stable"


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "sphinx.ext.autodoc",  # autobuild api docs
    "sphinx.ext.doctest",
    "sphinx.ext.intersphinx",
    "sphinx.ext.githubpages",
    "sphinx.ext.napoleon",
    "sphinx.ext.viewcode",
    "IPython.sphinxext.ipython_console_highlighting",  # code highlighting in notebooks
    "autoapi.extension",  # autobuild api docs
    "nbsphinx",  # add notebooks to docs
    "nbsphinx_link",  # add notebooks to docs
    "sphinx_click",  # auto document cli
    "myst_nb",  # Execute and render myst md
]

napoleon_google_docstring = True

# Add any paths that contain templates here, relative to this directory.
templates_path = ["../_templates"]

default_role = "py:obj"

source_suffix = [".md", ".rst"]

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# Suppress error about unnpickable config value 'nbsphinx_custom_formats'
# https://github.com/sphinx-doc/sphinx/issues/12300
suppress_warnings = ["config.cache"]

# -- AutoAPI configuration ---------------------------------------------------
autoapi_dirs = ["../../src/traccuracy"]
autoapi_type = "python"

autoapi_options = [
    "members",
    "undoc-members",
    "show-module-summary",
    "imported-members",
]
autoapi_ignore = ["*/cli.py"]

# -- Myst NB -----------------------------------------------------------------
nb_execution_raise_on_error = True

myst_enable_extensions = [
    "dollarmath",
    "colon_fence",
]

# Import Matplotlib to avoid this message in notebooks:
# "Matplotlib is building the font cache; this may take a moment."
import matplotlib.pyplot  # noqa

# -- Nbsphinx extension ------------------------------------------------------

nbsphinx_execute = "auto"
exclude_patterns = ["_build", "**.ipynb_checkpoints"]

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "sphinx_rtd_theme"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]

html_css_files = [
    "css/tablefix.css",
]
# -- Extension configuration -------------------------------------------------
autodoc_mock_imports = [
    "scipy",
    "numpy",
    "skimage",
    "numba",
    "networkx",
    "pandas",
    "tifffile",
]

sys.modules["traccuracy.matchers.compute_overlap"] = mock.Mock()
