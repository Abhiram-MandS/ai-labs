---
name: Copilot Chat in VS Code
description: Interactive AI assistant with slash commands and chat participants
tags: [copilot, chat, vscode, ai, productivity]
url: https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide
---

## Copilot Chat Features

### Slash Commands

Quick actions in chat:

| Command | Description |
|---------|-------------|
| `/explain` | Explain selected code |
| `/fix` | Propose a fix for problems |
| `/tests` | Generate unit tests |
| `/doc` | Add documentation |
| `/new` | Scaffold a new project |
| `/newNotebook` | Create a Jupyter notebook |

### Chat Participants

Specialized AI assistants:

- `@workspace` - Context-aware answers about your codebase
- `@vscode` - VS Code features and settings help
- `@terminal` - Terminal command assistance
- `@github` - GitHub-specific operations (PRs, issues, repos)

### Context Variables

Add specific context with `#`:

- `#file` - Reference a specific file
- `#selection` - Current editor selection
- `#editor` - Visible code in editor
- `#terminalLastCommand` - Last terminal command output

### Tips

- Use `@workspace` for questions about your project structure
- Combine participants with slash commands: `@workspace /explain`
- Reference files directly: `Explain #file:package.json`
