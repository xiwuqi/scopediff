# Demo Scenario

This demo is based on real ScopeDiff CLI output from the v0.1.0 tarball smoke test.

## Story

A pull request adds a GitHub MCP server and also changes GitHub Actions permissions:

- Adds `.mcp.json`
- Adds MCP server `github`
- Starts the server with `npx -y @modelcontextprotocol/server-github`
- Requires `GITHUB_TOKEN`
- Changes workflow trigger from `pull_request` to `pull_request_target`
- Expands workflow token permissions from `contents: read` to `contents: write`

ScopeDiff does not decide whether the PR is malicious. It gives the reviewer a short, evidence-based report.

## Before

```yaml
on: pull_request
permissions:
  contents: read
```

## After

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

```yaml
on: pull_request_target
permissions:
  contents: write
```

## Command

```bash
scopediff diff --base main --format markdown
```

## Output

- Markdown: `docs/demo/scopediff-report.md`
- JSON: `docs/demo/scopediff-report.json`
