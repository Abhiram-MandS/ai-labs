# Copilot Instructions — AI Labs

> **TL;DR** — Next.js 16 (App Router, Turbopack) + TypeScript 5 + Tailwind CSS v4 knowledge-base app. Content is authored as Markdown files with YAML frontmatter in `contents/`, compiled at build time into `lib/content-data.ts` by a `tsx` script. No database, no API routes, no backend — purely static client-side rendering. Deployed via standard Next.js build.

## 1 · Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Build Pipeline                           │
│                                                              │
│  contents/**/*.md ──→ scripts/build-content.ts ──→ lib/content-data.ts
│                           (gray-matter)             (auto-generated)
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    Runtime (Client-Side)                      │
│                                                              │
│  app/page.tsx ('use client')                                 │
│    ├── Sidebar        (category nav, theme toggle)           │
│    ├── SearchBar      (full-text filter)                     │
│    ├── ContentCard[]  (grid of items)                        │
│    ├── ContentModal   (markdown detail view)                 │
│    └── QuickNotes     (localStorage scratchpad)              │
│                                                              │
│  Data flow: INITIAL_CONTENT (static import)                  │
│    → useState filter → filteredContent → render              │
└──────────────────────────────────────────────────────────────┘
```

## 2 · Project Layout

```
ai-labs-app/
├── app/
│   ├── layout.tsx              # Root layout (metadata, html shell)
│   ├── page.tsx                # Main page — 'use client', all state lives here
│   └── globals.css             # Tailwind v4 imports + base styles
├── components/
│   ├── Sidebar.tsx             # Category nav + dark mode toggle
│   ├── SearchBar.tsx           # Search input with / shortcut
│   ├── ContentCard.tsx         # Card with copy & external link
│   ├── ContentModal.tsx        # Full-content modal with react-markdown
│   └── QuickNotes.tsx          # Floating scratchpad (localStorage)
├── contents/                   # ✏️ ALL CONTENT GOES HERE
│   ├── prompts/                # Prompt templates
│   ├── skills/                 # Skill guides
│   ├── tips/                   # Quick tips
│   ├── docs/                   # Documentation references
│   ├── links/                  # External resources
│   └── agents/                 # Agent definitions (.agent.md)
├── lib/
│   ├── types.ts                # ContentItem, Category interfaces
│   ├── data.ts                 # Re-export layer for INITIAL_CONTENT
│   └── content-data.ts         # ⚠️ AUTO-GENERATED — never edit
├── scripts/
│   └── build-content.ts        # Compiles .md → content-data.ts
├── public/                     # Static assets
├── eslint.config.mjs           # ESLint flat config (next/core-web-vitals + typescript)
├── postcss.config.mjs          # PostCSS with @tailwindcss/postcss
├── next.config.ts              # Next.js config (minimal)
├── tsconfig.json               # Strict TS, @/* path alias
└── package.json                # pnpm, scripts, dependencies
```

## 3 · Adding New Content — Step by Step

1. Create a `.md` file in the correct `contents/` subfolder (category is derived from the folder name).
2. Add YAML frontmatter with `name`, `description`, `tags` (required) and `url` (optional).
3. Write content below the frontmatter in standard GFM Markdown.
4. Run `pnpm run build-content` (or restart `pnpm dev` — it runs automatically via `predev`).
5. Verify the new item appears in the app.

```markdown
---
name: My New Prompt
description: A concise one-line description
tags:
  - javascript
  - refactoring
url: https://optional-link.com
---

Your full markdown content goes here.
```

## 4 · Adding a New Component — Step by Step

1. Create a `.tsx` file in `components/` using PascalCase naming.
2. Add `'use client';` at the top (all current components are client components).
3. Define a typed props interface inline in the same file.
4. Export a single default function component.
5. Use Tailwind utility classes for all styling — no CSS modules, no styled-components.
6. Import into `app/page.tsx` using the `@/components/` path alias.

## 5 · Code Style & Conventions

| Area | ✅ Do This | ❌ Don't Do This |
|------|-----------|------------------|
| Components | Functional + hooks, default export | Class components, named exports for pages |
| Directive | `'use client'` on all interactive components | Server Components with client-side state |
| Styling | Tailwind utility classes, `dark:` variant | CSS modules, inline `style={}`, styled-components |
| Dark mode | Class-based `.dark` ancestor + `dark:` prefix | `prefers-color-scheme` media query |
| Imports | `@/components/Foo`, `@/lib/types` | Relative paths like `../../lib/types` |
| Types | Explicit interfaces in `lib/types.ts` | Inline `any`, untyped props |
| Naming | PascalCase components, camelCase vars, kebab-case files | Snake_case, SCREAMING_CASE for non-constants |
| Icons | `lucide-react` | Other icon libraries |
| Markdown rendering | `react-markdown` + `remark-gfm` | `dangerouslySetInnerHTML`, custom parsers |
| State management | React `useState`/`useEffect` in `page.tsx` | Redux, Zustand, Context API (not needed yet) |
| Persistence | `localStorage` for client preferences | Cookies, sessionStorage |
| Content data | Import from `@/lib/data` | Direct import from `content-data.ts` |
| Commit messages | Conventional Commits (`feat:`, `fix:`, `docs:`) | Free-form messages |

## 6 · Critical Gotchas

⚠️ **`lib/content-data.ts` is auto-generated** — Never edit it manually. It is overwritten every time `build-content` runs. Change content by editing `.md` files in `contents/`.

⚠️ **Dark mode is class-based, not media-query** — The app uses a `.dark` class on the root `<div>`, toggled via `useState`. The `globals.css` uses `@custom-variant dark (&:is(.dark *))`. Always include `dark:` variants when styling.

⚠️ **No API routes exist** — This is a fully static client-side app. All data is compiled at build time. Don't create `app/api/` routes.

⚠️ **Frontmatter parsing uses `gray-matter`** — But it runs at build time in Node.js via `tsx`, not at runtime. The `gray-matter` package is a devDependency.

⚠️ **Template literal escaping** — When `build-content.ts` generates `content-data.ts`, it escapes backticks `` ` ``, dollar signs `$`, and backslashes `\` for template literals. If content contains these characters, they work fine — the script handles it.

⚠️ **Port 4200** — Dev server runs on port 4200 (not the default 3000). See `pnpm dev` script.

## 7 · Content Categories & Colors

| Category | Folder | Color Token |
|----------|--------|-------------|
| `agents` | `contents/agents/` | `bg-rose-500/10 text-rose-600` |
| `docs` | `contents/docs/` | `bg-indigo-500/10 text-indigo-600` |
| `links` | `contents/links/` | `bg-purple-500/10 text-purple-600` |
| `prompts` | `contents/prompts/` | `bg-emerald-500/10 text-emerald-600` |
| `skills` | `contents/skills/` | `bg-blue-500/10 text-blue-600` |
| `tips` | `contents/tips/` | `bg-amber-500/10 text-amber-600` |

To add a new category: update `CATEGORY_COLORS` in `scripts/build-content.ts`, add to `ContentItem['category']` union in `lib/types.ts`, and add to `CATEGORIES` array in `components/Sidebar.tsx`.

## 8 · Testing

There are **no tests currently** in this codebase. When adding tests:

- ✅ Use Vitest or Jest with React Testing Library
- ✅ Name test files `*.test.tsx` / `*.test.ts` alongside the source
- ✅ Test component rendering, user interactions (search, category filter, copy)
- ✅ Test `build-content.ts` output for edge cases (missing frontmatter, special chars)
- ❌ Don't use Enzyme or snapshot tests

## 9 · Exception Handling

No formal exception handling layer exists. Key patterns in the code:

| Area | Behavior |
|------|----------|
| Clipboard (`ContentCard`, `ContentModal`) | Uses `navigator.clipboard.writeText` — no error handling. |
| `localStorage` (`QuickNotes`, theme) | Direct read/write — no try/catch for quota or disabled storage. |

## 10 · Observability

No tracing, logging, or metrics infrastructure is configured. The app is a static client-side SPA. Build scripts log to stdout with emoji-prefixed messages.

## 11 · Code Formatting

- **ESLint** — Flat config with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- **No Prettier** — Not configured. Follow the existing code style (single quotes in TS, double quotes in JSX attributes via ESLint defaults).
- **Lint command**: `pnpm run lint`
- ❌ No pre-commit hooks or format-on-save enforcement currently.

## 12 · Build & Run

| Command | What It Does |
|---------|--------------|
| `pnpm install` | Install all dependencies |
| `pnpm run dev` | Start dev server on port 4200 (auto-runs `build-content`) |
| `pnpm run build` | Production build (runs `build-content` first) |
| `pnpm start` | Serve production build |
| `pnpm run build-content` | Regenerate `lib/content-data.ts` from `contents/**/*.md` |
| `pnpm run lint` | Run ESLint |

## 13 · Environment & CI/CD

No environment variables are required.

- **`predev`** hook runs `build-content` automatically.
- **`prebuild`** hook runs `build-content`.

## 14 · Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | App framework (App Router, Turbopack) |
| `react` / `react-dom` | 19.2.3 | UI library |
| `react-markdown` | ^10.1.0 | Markdown rendering in modals |
| `remark-gfm` | ^4.0.1 | GitHub Flavored Markdown support |
| `lucide-react` | ^0.563.0 | Icon library |
| `tailwindcss` | ^4 | Utility-first CSS (v4 syntax) |
| `@tailwindcss/typography` | ^0.5.19 | Prose styling for markdown |
| `gray-matter` | ^4.0.3 | YAML frontmatter parser (build-time) |
| `tsx` | ^4.21.0 | Run TypeScript scripts directly |
| `typescript` | ^5 | Type system |

## 15 · Anti-Patterns — What NOT to Generate

- ❌ Don't create API routes (`app/api/`) — this app has no backend
- ❌ Don't use Server Components with interactivity — all components are `'use client'`
- ❌ Don't edit `lib/content-data.ts` — it's auto-generated
- ❌ Don't use CSS-in-JS, CSS modules, or `<style>` tags — use Tailwind only
- ❌ Don't add state management libraries — React state in `page.tsx` is sufficient
- ❌ Don't use relative imports — use `@/` path alias
- ❌ Don't use icon libraries other than `lucide-react`
- ❌ Don't import from `lib/content-data.ts` directly — use `lib/data.ts`
- ❌ Don't use `prefers-color-scheme` — dark mode is class-based via `.dark` ancestor
