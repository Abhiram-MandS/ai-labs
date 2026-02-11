---
name: Copilot Extensions & Agents
description: Build custom Copilot extensions and AI agents for specialized workflows
tags: [copilot, extensions, agents, api, customization]
url: https://docs.github.com/en/copilot/building-copilot-extensions
---

## Building Copilot Extensions

### What Are Extensions?

Copilot Extensions let you create custom chat participants that integrate with external services or provide specialized functionality.

### Extension Types

1. **Skillsets** - Add capabilities to Copilot (simpler)
2. **Agents** - Full custom chat participants (more powerful)

### Creating an Agent

Agents respond to `@your-agent` mentions in Copilot Chat:

```typescript
// Example agent handler
export async function handleCopilotRequest(request: CopilotRequest) {
  const { messages, context } = request;
  
  // Process the request
  const response = await processWithYourLogic(messages);
  
  return {
    type: 'message',
    content: response
  };
}
```

### Use Cases

- **@jira** - Fetch and update Jira tickets
- **@docs** - Search internal documentation
- **@deploy** - Trigger deployments
- **@review** - Custom code review rules

### Resources

- [Copilot Extensions SDK](https://github.com/copilot-extensions)
- [Extension Quickstart](https://docs.github.com/en/copilot/building-copilot-extensions/building-a-copilot-agent-for-your-copilot-extension/quickstart-for-copilot-agents)
- [Sample Extensions](https://github.com/copilot-extensions/sample-extension)
