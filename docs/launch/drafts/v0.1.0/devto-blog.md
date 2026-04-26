---
title: "Reviewing AI Agent Permission Changes Before Merge"
published: true
description: "How ScopeDiff makes MCP, agent instruction, and GitHub Actions permission changes easier to review before merging a PR."
tags: githubactions, ai, opensource
cover_image: https://raw.githubusercontent.com/xiwuqi/scopediff/main/docs/brand/blog-cover-v0.1.2.png
canonical_url: https://github.com/xiwuqi/scopediff
---

AI coding agents are changing what belongs in code review.

A pull request may no longer be only application code. It might also add an MCP server, modify `AGENTS.md`, change Cursor or Claude rules, expand GitHub Actions permissions, or add package lifecycle scripts.

Those changes are worth reviewing because they can alter what tools an agent can run, which tokens it expects, or what CI automation can publish or deploy.

I built [ScopeDiff](https://github.com/xiwuqi/scopediff) as a small local CLI to make those changes visible before merge.

ScopeDiff is a review aid, not a complete security audit. It does not claim to prevent every AI agent or MCP risk. The goal is simpler: make permission and tooling changes easier to notice during ordinary PR review.

![ScopeDiff overview showing a local-first CLI for reviewing AI agent and workflow permission changes.](https://raw.githubusercontent.com/xiwuqi/scopediff/main/docs/brand/readme-hero.png)

## The problem

Agent-related configuration is starting to live next to source code:

- MCP server definitions
- `AGENTS.md` and other repo-level instructions
- Cursor rules
- Claude skills
- GitHub Actions workflows
- package lifecycle scripts
- Docker and compose files

Some of those files are harmless documentation. Some of them can change capability boundaries.

For example, a PR might add an MCP server that expects `GITHUB_TOKEN`, switch a workflow to `pull_request_target`, expand `contents` from `read` to `write`, or add an unpinned `npx` command.

None of those automatically means "bad". But they are review-worthy.

## What ScopeDiff checks

ScopeDiff scans or diffs repository files such as:

- `.mcp.json`
- `mcp.json`
- `.cursor/mcp.json`
- `.cursor/rules/**`
- `.claude/settings.json`
- `.claude/skills/**/SKILL.md`
- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `.github/copilot-instructions.md`
- `.github/workflows/*.yml`
- `package.json`
- `Dockerfile`
- `docker-compose.yml`
- `.env.example`

It produces Markdown and JSON reports with:

- finding title
- severity
- file and line evidence
- confidence
- whether the finding appears to add a new capability
- whether it appears to expand permissions
- suggested review steps

![ScopeDiff diff report showing review findings for MCP and GitHub Actions changes.](https://raw.githubusercontent.com/xiwuqi/scopediff/main/docs/demo/assets/scopediff-diff-report.png)

## A small example

Suppose a PR adds this MCP config:

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

ScopeDiff can report things like:

- MCP server added
- credential-like env var referenced
- unpinned remote package
- executable command introduced

If the same PR also changes a workflow from `pull_request` to `pull_request_target` and expands `contents` to `write`, ScopeDiff reports those changes too.

The point is not to block the PR automatically. The point is to give the reviewer a concise checklist:

- Is this server needed?
- Should the package version be pinned?
- Does this token need write access?
- Is this safe for PRs from forks?
- Should this run in CI, or only in a trusted workflow?

## Quick start

You can try the published package with:

```bash
npx scopediff@latest scan
npx scopediff@latest diff --base main
npx scopediff@latest report --format markdown
```

In CI:

```yaml
name: ScopeDiff

on:
  pull_request:

permissions:
  contents: read

jobs:
  scopediff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - run: npx scopediff@0.1.0 ci --fail-on high
```

By default, the CI mode writes to the GitHub Step Summary. It does not comment on PRs.

![GitHub Actions summary screenshot showing a ScopeDiff CI report.](https://raw.githubusercontent.com/xiwuqi/scopediff/main/docs/demo/assets/github-step-summary-mock.png)

## Safety and privacy choices

For v0.1.0, ScopeDiff is intentionally conservative:

- local-first
- read-only scanning
- no telemetry
- no code upload
- no hidden network requests
- no `.env` reading by default
- no PR comments by default
- no package reputation lookup
- no attempt to execute detected commands

The report should help a maintainer decide what to review, not replace human judgment.

## What it does not do

ScopeDiff is not:

- a complete security audit
- a vulnerability scanner
- an MCP firewall
- a package reputation service
- a sandbox
- a guarantee that a PR is safe

It can miss things. It can also produce false positives. That is why the report includes evidence and suggested review actions instead of pretending every finding is an exploit.

## Where feedback would help

The most useful feedback right now is practical:

- MCP config shapes ScopeDiff misses
- Cursor/Claude/Codex instruction patterns worth detecting
- GitHub Actions permission expansion cases that should be covered
- noisy findings that should be lower severity
- report wording that would help maintainers review faster

Repo: [https://github.com/xiwuqi/scopediff](https://github.com/xiwuqi/scopediff)

npm: [https://www.npmjs.com/package/scopediff](https://www.npmjs.com/package/scopediff)

If ScopeDiff helps you review agent/tooling changes, feedback is welcome. If it is useful, a star helps other maintainers find it.

Disclosure: I used an AI coding assistant to help draft and edit this post, then reviewed and approved the content before publishing.
