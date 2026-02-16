---
description: |
  This workflow generates a new GitHub release with an auto-generated
  description. It analyzes commits, merged PRs, and closed issues since
  the last release, determines the next semantic version, creates a new
  release tag, and then creates a well-structured release with categorized
  changelogs, highlights, and contributor acknowledgements.

on:
  workflow_dispatch:

permissions:
  contents: write
  issues: read
  pull-requests: read

network: defaults

tools:
  github:
    lockdown: false

safe-outputs:
  create-tag:
    tag-pattern: "v*"
    ref: HEAD
  create-release:
    tag-pattern: "v*"
    draft: true
    prerelease: false
---

# Release Description Generator

Generate a new GitHub release with a rich, well-structured description based on
repository activity since the last release.

## First Release Handling

If no previous release tag exists:
- Use the initial commit as the starting point
- Default to version `v1.0.0` for the first release
- Include all commits from repository inception

## What to include

- **Breaking Changes** — any backwards-incompatible changes (highlight prominently)
- **New Features** — new capabilities and enhancements
- **Bug Fixes** — resolved issues and patches
- **Improvements** — performance, refactoring, DX improvements
- **Dependencies** — notable dependency updates
- **Contributors** — acknowledge all contributors in this release

## Style

- Use clear, professional language
- Categorize changes with section headers and emojis (🚀 ✨ 🐛 ⚡ 📦 👥)
- Link each change to its PR or commit
- Keep descriptions concise — one line per change
- Call out breaking changes at the top with a ⚠️ warning

## Version Bumping

Follow semantic versioning (SemVer) to determine the next version:
- **MAJOR** (x.0.0) — breaking changes present
- **MINOR** (0.x.0) — new features added, no breaking changes
- **PATCH** (0.0.x) — bug fixes and minor improvements only

## Process

1. Identify the previous release tag (or initial commit if first release)
2. Gather all commits, merged PRs, and closed issues since that tag
3. Categorize changes by type (feature, fix, improvement, breaking, deps)
4. Determine the next semantic version based on change types
5. Create a new version tag (e.g., `v1.2.0`) on the current HEAD
6. Identify all contributors from the gathered commits and PRs
7. Generate the release description in markdown format
8. Create a new **draft** GitHub release with the new tag and description
