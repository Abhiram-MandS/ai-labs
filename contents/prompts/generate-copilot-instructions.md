---
name: Generate Copilot Instructions
description: Use this prompt with Copilot (in VS Code, GitHub.com, or chat) to generate a `.github/copilot-instructions.md` tailored to your repository.
tags:
  - copilot
  - documentation
  - onboarding
  - codebase-analysis
  - meta
---

Analyze this entire codebase to generate or update `.github/copilot-instructions.md`.

### Step 1 — Discover What Exists

Search for existing AI instruction files:
`**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,README.md}`

If any exist, use them as a starting point — preserve valuable content, update outdated sections, and merge intelligently.

### Step 2 — Understand the Architecture

Answer these questions by reading the code (not guessing):

1. **What is this service?** — One-sentence summary: framework, language version, what it does, whether it has a database, and how it's deployed.
2. **What's the layered flow?** — e.g., `Controller → Service → Repository`, or `Handler → Processor → DAO`. Trace it from the entry point (controller/route) to persistence or external calls.
3. **What are the major domain packages/modules?** — List each with its responsibility and API base path (if applicable).
4. **What external services does it call?** — List downstream dependencies, how they're called (REST, gRPC, Kafka, etc.), and any auth mechanisms.
5. **What does the project directory structure look like?** — Produce a tree showing where controllers, services, DTOs, tests, config, and CI files live.
6. **Is there a database?** — If so, what kind, what ORM/client, and any quirks (e.g., suppressed fields, custom repositories).
7. **Is there async/event-driven communication?** — If so, what system (Kafka, RabbitMQ, SQS), and describe the inbound/outbound flows.

### Step 3 — Identify the Patterns That Matter

Focus on things an AI agent would get **wrong** without explicit guidance:

1. **New code vs legacy code** — Are there two styles in the codebase? If so, create a table showing what to use for new code vs what's legacy. Cover: dependency injection, logging, DTOs, error handling, endpoint annotations.
2. **Critical gotchas** — Things that silently break (e.g., "RestClient returns null on error instead of throwing", "the `_class` field is suppressed in MongoDB", "Kafka delay is 13 minutes by default").
3. **Response wrapping styles** — If there are multiple (e.g., `ResponseDTO<T>` vs direct returns vs domain-specific wrappers), document which to use for new code.
4. **Authentication** — Separate inbound (how consumers auth to this service) from outbound (how this service auths to downstream).
5. **Exception handling** — Table of exception type → HTTP status → response body shape.
6. **DTO conventions** — Records vs Lombok vs POJOs. What validation annotations are expected.

### Step 4 — Document the Developer Workflows

1. **Build & test commands** — The exact commands, run from which directory.
2. **Code formatting** — Is there an enforcer (Spotless, Prettier, Black)? Does CI fail without it? What's the command?
3. **Test conventions** — Framework, naming pattern (with example), what to mock, what NOT to use (e.g., no `@SpringBootTest`), coverage focus areas.
4. **Environment profiles** — List them and note any per-profile quirks.
5. **CI/CD** — Pipeline tool, quality gates (Sonar, Snyk, etc.).

### Step 5 — Write the Instructions File

Structure the output as follows:

```
# Copilot Instructions — {Service Name}

> **TL;DR** — {one-paragraph summary}

## 1 · Architecture (with ASCII diagram if multi-service)
## 2 · Project Layout (directory tree)
## 3 · Adding a New Endpoint — Step by Step (numbered checklist)
## 4 · Code Style & Conventions (new vs legacy table, ✅/❌ markers)
## 5 · {Domain-Specific Section} (e.g., Pricing Engine, Payment Processing)
## 6 · External Service Calls
## 7 · {Async/Event Section if applicable} (e.g., Kafka, message queues)
## 8 · {Database Section if applicable}
## 9 · Testing (pattern with code example, naming, coverage)
## 10 · Exception Handling (table)
## 11 · Observability (tracing, logging, metrics)
## 12 · Code Formatting
## 13 · Build & Run (commands)
## 14 · Environment & CI/CD
## 15 · Key Dependencies (table with versions)
```

### Writing Rules

- **Be prescriptive, not just descriptive** — Use ✅ "Do this" / ❌ "Don't do this" markers.
- **Include anti-patterns** — What should Copilot AVOID generating? Call it out explicitly.
- **Use concrete code examples** from the actual codebase (not generic examples).
- **Keep it under 300 lines** — Copilot weights content earlier in the file more heavily.
- **Use ASCII diagrams** for architecture and data flows — they're more useful than prose.
- **Add ⚠️ warnings** for dangerous areas (large files, complex logic, silent failures).
- **Don't document aspirational practices** — only document what's actually in the code today.
- **Skip sections that don't apply** (e.g., no Kafka section if there's no event-driven communication).
- **Number all sections** — makes them scannable and referenceable.

After generating the file, list any sections where you had to make assumptions or where the codebase was ambiguous, so the team can review and refine.
