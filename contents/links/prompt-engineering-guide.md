---
name: Prompt Engineering Guide
description: Techniques for writing effective prompts to get better AI responses
tags: [prompts, ai, techniques, best-practices]
url: https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot
---

## Effective Prompt Engineering

### Core Principles

1. **Be Specific** - Include context, constraints, and expected output format
2. **Provide Examples** - Show what you want with sample inputs/outputs
3. **Break Down Tasks** - Decompose complex requests into steps
4. **Iterate** - Refine prompts based on responses

### Prompt Structure

```
[Context] - What's the situation?
[Task] - What do you want done?
[Format] - How should the output look?
[Constraints] - Any limitations or requirements?
```

### Example Prompts

**Vague:**
> Write a function to process data

**Better:**
> Write a TypeScript function that:
> - Takes an array of user objects with name and email
> - Filters out users without valid emails
> - Returns sorted by name alphabetically
> - Include JSDoc comments

### Techniques

| Technique | Description | Example |
|-----------|-------------|---------|
| Few-shot | Provide examples | "Like this: input → output" |
| Chain of thought | Ask for reasoning | "Think step by step" |
| Role play | Set expertise | "As a security expert..." |
| Constraints | Set boundaries | "Max 50 lines, no dependencies" |

### Common Mistakes

- Too vague or ambiguous
- Missing context about tech stack
- Not specifying output format
- Asking multiple unrelated things at once
