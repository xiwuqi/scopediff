# Issue Draft: Add Fixture for Another MCP Config Shape

Title:

```text
Add fixture for another MCP config shape
```

Labels:

```text
good first issue, tests, mcp
```

Body:

```md
ScopeDiff currently tests a simple `.mcp.json` shape with `mcpServers`.

It would be useful to add a fixture for another real-world MCP config shape used by a client or documented setup.

Please keep the fixture small and sanitized. Do not include real tokens.
```

Acceptance criteria:

- Add a before/after fixture under `tests/fixtures/`.
- Add or update a test that verifies expected MCP findings.
- Include at least one negative or low-noise case if practical.
- `npm run check` passes.

Context:

More MCP config shapes will help reduce parser assumptions.

How to test:

```bash
npm run check
```
