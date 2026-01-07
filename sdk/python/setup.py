"""
ATHLYNX Python SDK Setup
"""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="athlynx",
    version="1.0.0",
    author="ATHLYNX AI Corporation",
    author_email="support@athlynx.ai",
    description="Official Python SDK for the ATHLYNX AI Platform",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/cdozier14-create/AthlynxAI",
    project_urls={
        "Bug Tracker": "https://github.com/cdozier14-create/AthlynxAI/issues",
        "Documentation": "https://docs.athlynx.ai",
        "Source": "https://github.com/cdozier14-create/AthlynxAI",
    },
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    packages=find_packages(),
    python_requires=">=3.8",
    install_requires=[
        "requests>=2.25.0",
    ],
    extras_require={
        "dev": [
            "pytest>=6.0",
            "pytest-cov>=2.0",
            "black>=21.0",
            "mypy>=0.900",
        ],
    },
)
