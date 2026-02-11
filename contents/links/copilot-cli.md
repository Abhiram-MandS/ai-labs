---
name: Copilot CLI (gh copilot)
description: AI-powered command-line assistant for terminal and git operations
tags: [copilot, cli, terminal, git, ai]
url: https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line
---

## GitHub Copilot in the CLI

Copilot CLI brings AI assistance directly to your terminal. Use it to:

- **Explain commands**: `gh copilot explain "git rebase -i HEAD~3"`
- **Suggest commands**: `gh copilot suggest "find all TypeScript files modified in the last week"`

### Installation

```bash
gh extension install github/gh-copilot
```

### Key Commands

| Command | Description |
|---------|-------------|
| `gh copilot explain` | Explain a command in plain English |
| `gh copilot suggest` | Get command suggestions for a task |

### Tips

- Use natural language to describe what you want to do
- Copilot CLI works with shell commands, git, and GitHub CLI
- Responses include explanations and safety warnings for destructive operations
