# Demo Scenario

This demo is based on real ScopeDiff CLI output generated from a temporary git repository.

Regenerate:

```bash
npm run build
node scripts/generate-demo-assets.mjs
```

## Story

A pull request adds a GitHub MCP server and also changes GitHub Actions permissions:

- Adds `.mcp.json`
- Adds MCP server `github`
- Starts the server with `npx -y @modelcontextprotocol/server-github`
- Requires `GITHUB_TOKEN`
- Changes workflow trigger from `pull_request` to `pull_request_target`
- Expands workflow token permissions from `contents: read` to `contents: write`

ScopeDiff does not decide whether the PR is malicious. It gives the reviewer a short, evidence-based report.

## How To Read The Demo

The demo intentionally contains overlapping findings. For example, the new GitHub MCP server creates one finding for the added server, another for the executable command, and another for the `GITHUB_TOKEN` environment variable.

That overlap is useful during review because each finding asks a different question:

- Is the new MCP server needed?
- Is the command trusted and pinned?
- Is the token scoped safely?
- Did the workflow also gain write permissions?

If a finding is expected in your repository, document why it is expected instead of treating ScopeDiff as a blocking verdict. For noisy cases, see [Common false positives](../common-false-positives.md).

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
- Feature overview image: `docs/demo/assets/feature-overview.svg`
- Feature overview PNG: `docs/demo/assets/feature-overview.png`
- Quick start image: `docs/demo/assets/quick-start.svg`
- Quick start PNG: `docs/demo/assets/quick-start.png`
- Terminal diff screenshot: `docs/demo/assets/scopediff-diff-report.svg`
- Terminal diff screenshot PNG: `docs/demo/assets/scopediff-diff-report.png`
- Finding explain screenshot: `docs/demo/assets/scopediff-explain.svg`
- Finding explain screenshot PNG: `docs/demo/assets/scopediff-explain.png`
- GitHub Step Summary layout mock: `docs/demo/assets/github-step-summary-mock.svg`
- GitHub Step Summary layout mock PNG: `docs/demo/assets/github-step-summary-mock.png`
- Social preview image: `docs/demo/assets/social-preview.svg`
- Social preview image PNG: `docs/demo/assets/social-preview.png`
