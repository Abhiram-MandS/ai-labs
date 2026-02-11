# AI Labs

A modern knowledge base for AI prompts, skills, tips, documentation, agents, and resources. Content is authored as Markdown files and compiled at build time.
<img width="1727" height="959" alt="image" src="https://github.com/user-attachments/assets/ffa21320-02be-47ad-821a-379e45acb4d8" />

## Features

- 📁 **6 Content Categories** — Prompts, Skills, Tips, Docs, Links, and Agents
- 🔍 **Smart Search** — Filter by name, description, tags, or content
- 🏷️ **Tag System** — Organise and filter items with multiple tags
- 🌓 **Dark / Light Mode** — Toggle themes with persistent preference
- 📝 **Scratchpad** — Built-in notepad with auto-save to localStorage
- 📱 **Responsive** — Optimised for mobile, tablet, and desktop
- 📋 **Copy to Clipboard** — Quick copy on cards and modal views
- ⌨️ **Keyboard Shortcuts** — Press `/` to focus search
- 📄 **Markdown Rendering** — Full GFM support with syntax highlighting
- 🔄 **CI/CD Content Sync** — Fetches prompts and agents from a private GitHub repo at build time

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + Typography plugin |
| Icons | Lucide React |
| Markdown | react-markdown + remark-gfm |
| Build Scripts | tsx, gray-matter |
| GitHub API | @octokit/rest (dev) |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server (runs build-content automatically)
pnpm run dev
```

The app runs at [http://localhost:4200](http://localhost:4200).

### Build for Production

```bash
pnpm run build
pnpm start
```

## Project Structure

```
ai-labs-app/
├── app/
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Main page component
│   └── globals.css           # Global styles
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── SearchBar.tsx         # Search input
│   ├── ContentCard.tsx       # Content item card
│   ├── ContentModal.tsx      # Detail view modal (markdown)
│   └── QuickNotes.tsx        # Scratchpad component
├── contents/                 # ✏️ Markdown content (edit here)
│   ├── prompts/              # Prompt templates
│   ├── skills/               # Skill guides
│   ├── tips/                 # Quick tips
│   ├── docs/                 # Documentation references
│   ├── links/                # Useful links
│   └── agents/               # Agent definitions
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── data.ts               # Data re-export layer
│   └── content-data.ts       # ⚙️ Auto-generated (do not edit)
├── scripts/
│   └── build-content.ts      # Compiles .md → content-data.ts
└── public/                   # Static assets
```

## Build Pipeline

```
build-content  →  next build
        ↓
  Reads all .md from
  contents/ folders
  and generates
  lib/content-data.ts
```

- **`predev`** runs `build-content` automatically before `dev`.
- **`prebuild`** runs `build-content` before `build`.

## Adding Content

Create a `.md` file in the appropriate `contents/` subfolder with YAML frontmatter:

```markdown
---
name: My New Prompt
description: A short description of the prompt
tags:
  - javascript
  - refactoring
url: https://optional-link.com  # optional
---

Your full markdown content goes here.
```

The **category** is determined by the folder (`prompts/`, `skills/`, `tips/`, `docs/`, `links/`, `agents/`). Run `pnpm run build-content` to regenerate, or simply restart the dev server.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

MIT
