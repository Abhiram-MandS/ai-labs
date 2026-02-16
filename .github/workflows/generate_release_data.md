---
description: |
  This workflow generates a new GitHub release with an auto-generated
  description. It analyzes commits, merged PRs, and closed issues since
  the last release, determines the next semantic version, creates a new
  release tag, and then creates a well-structured release with categorized
  changelogs, highlights, and contributor acknowledgements.

on:
  workflow_run:
    workflows: ["Deploy Next.js site to Pages"]
    types: [completed]
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

network: defaults

tools:
  github:
    lockdown: false

safe-outputs:
  jobs:
    create-release:
      description: "Create a GitHub release with a tag and release notes"
      runs-on: ubuntu-latest
      output: "Release created successfully!"
      permissions:
        contents: write
      inputs:
        tag:
          description: "The version tag (e.g., v1.2.0)"
          required: true
          type: string
        title:
          description: "The release title"
          required: true
          type: string
        body:
          description: "The release notes in markdown format"
          required: true
          type: string
        draft:
          description: "Create as draft release"
          required: false
          type: boolean
          default: "true"
      steps:
        - name: Checkout
          uses: actions/checkout@v4
          with:
            fetch-depth: 0
        - name: Create release
          env:
            GH_TOKEN: ${{ github.token }}
          run: |
            if [ -f "$GH_AW_AGENT_OUTPUT" ]; then
              TAG=$(cat "$GH_AW_AGENT_OUTPUT" | jq -r '.items[] | select(.type == "create_release") | .tag')
              TITLE=$(cat "$GH_AW_AGENT_OUTPUT" | jq -r '.items[] | select(.type == "create_release") | .title')
              BODY=$(cat "$GH_AW_AGENT_OUTPUT" | jq -r '.items[] | select(.type == "create_release") | .body')
              DRAFT=$(cat "$GH_AW_AGENT_OUTPUT" | jq -r '.items[] | select(.type == "create_release") | .draft // "true"')
              
              echo "Creating release $TAG"
              
              DRAFT_FLAG=""
              if [ "$DRAFT" = "true" ]; then
                DRAFT_FLAG="--draft"
              fi
              
              # Create the tag and release
              echo "$BODY" > /tmp/release-notes.md
              gh release create "$TAG" $DRAFT_FLAG --title "$TITLE" --notes-file /tmp/release-notes.md
              
              echo "✅ Release $TAG created successfully"
            else
              echo "No agent output found"
              exit 1
            fi
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
