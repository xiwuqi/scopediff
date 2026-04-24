# Dev.to Technical Blog Draft

Title:

```text
Reviewing AI Agent Permission Changes Before Merge
```

## Draft

AI coding agents are changing what belongs in code review.

A pull request may no longer be only application code. It might also add an MCP server, modify `AGENTS.md`, change Cursor or Claude rules, expand GitHub Actions permissions, or add package lifecycle scripts.

Those changes deserve review because they can alter what tools an agent can run, which tokens it expects, or what automation can publish or deploy.

I built ScopeDiff as a small local CLI to make those changes visible.

## What ScopeDiff Does

ScopeDiff scans or diffs repository files such as:

- `.mcp.json`
- `AGENTS.md`
- `.cursor/rules/**`
- `.claude/skills/**/SKILL.md`
- `.github/workflows/*.yml`
- `package.json`
- `Dockerfile`
- `docker-compose.yml`

It produces Markdown and JSON reports with evidence, severity, confidence, and suggested review steps.

## Example

A PR adds:

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

ScopeDiff reports:

- MCP server added
- credential-like env var referenced
- unpinned remote package
- executable command

If the same PR changes a workflow from `pull_request` to `pull_request_target` and expands `contents` to `write`, ScopeDiff reports those too.

## What It Is Not

ScopeDiff is not a complete security audit. It does not execute tools, verify package reputation, or prevent all agent-related problems.

The goal is to help reviewers ask better questions before merge.

Repo: https://github.com/xiwuqi/scopediff

False-positive feedback is welcome.
