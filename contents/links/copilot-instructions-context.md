---
name: Custom Instructions & Context
description: Configure Copilot with project-specific instructions and context files
tags: [copilot, instructions, context, configuration, ai]
url: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot
---

## Customizing Copilot with Instructions

### Repository Instructions

Create `.github/copilot-instructions.md` to provide project-wide context:

```markdown
# Copilot Instructions

## Tech Stack
- Next.js 14 with App Router
- TypeScript strict mode
- Tailwind CSS for styling

## Conventions
- Use functional components with hooks
- Prefer named exports for utilities
- All API routes should validate input with Zod
```

### VS Code Prompt Files

Create `.github/prompts/*.prompt.md` for reusable prompts:

```markdown
---
mode: agent
tools: ['githubRepo', 'codebase']
---

Review this PR for security issues and suggest improvements.
```

### Context Hierarchy

1. **Repository instructions** - `.github/copilot-instructions.md`
2. **Prompt files** - `.github/prompts/*.prompt.md`
3. **User settings** - VS Code settings for global preferences

### Tips

- Keep instructions concise and actionable
- Include coding standards and naming conventions
- Reference key files and architectural decisions
- Update instructions as your project evolves
