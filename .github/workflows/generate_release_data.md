---
description: |
  This workflow updates an existing GitHub release with an auto-generated
  description. It analyzes commits, merged PRs, and closed issues since
  the previous release and creates a well-structured release description with
  categorized changelogs, highlights, and contributor acknowledgements.

on:
  workflow_run:
    workflows: ["Deploy Next.js site to Pages"]
    types: [completed]
    branches: [main]
  workflow_dispatch:
  release:
    types: [created]

permissions:
  contents: read
  issues: read
  pull-requests: read

network: defaults

tools:
  github:
    lockdown: false

safe-outputs:
  update-release:
    max: 1
---

# Release Description Generator

Update a GitHub release with a rich, well-structured description based on
repository activity since the previous release.

## Trigger Context

This workflow runs when:
- A new release is created (generates description for that release)
- After deployment workflow completes (updates the latest release)
- Manually triggered (updates the latest release)

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

## Process

1. Identify the release to update (from trigger context or latest release)
2. Find the previous release tag to determine the commit range
3. Gather all commits, merged PRs, and closed issues in that range
4. Categorize changes by type (feature, fix, improvement, breaking, deps)
5. Identify all contributors from the gathered commits and PRs
6. Generate the release description in markdown format
7. Output `update_release` with operation `replace` to update the release body

## Output Format

```json
{"type": "update_release", "tag": "v1.2.0", "operation": "replace", "body": "..."}
```

- `tag` — optional for release events (inferred from context)
- `operation` — `replace` (full replacement), `append`, or `prepend`
- `body` — the release notes in markdown format
