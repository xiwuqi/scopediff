# ScopeDiff

AI agent permission and tooling surface diffs for pull request review.

> This PR gives your AI agent new powers. Review them before merge.

ScopeDiff helps maintainers spot changes to MCP servers, agent instructions, GitHub Actions permissions, package lifecycle scripts, Docker settings, and other files that can change what AI agents or automation are able to do.

It is a review aid, not a complete security audit or runtime protection system.

## Why ScopeDiff

- See agent/tooling permission changes before merge.
- Run locally or in CI without uploading code.
- Get PR-ready Markdown and JSON reports with evidence and suggested review steps.

## Install

```bash
npx scopediff scan
```

After package publication:

```bash
npm install -D scopediff
```

## 30-Second Quick Start

Scan the current repo:

```bash
npx scopediff scan
```

Compare your branch with `main`:

```bash
npx scopediff diff --base main
```

Run in CI and fail on high-risk findings:

```bash
npx scopediff ci --fail-on high
```

## Example Report

```md
## ScopeDiff Report

Risk: High

New agent capability detected:

- MCP server added: github
- Command: npx -y @modelcontextprotocol/server-github
- Env required: GITHUB_TOKEN
- Possible scope: repository read/write depending on token permissions

Review notes:

- Pin package version instead of using latest
- Prefer a read-only token for first setup
- Document why this server is needed
- Check whether this PR also changed workflow permissions
```

## Good Fit

- Repositories using MCP servers.
- Projects with `AGENTS.md`, Cursor rules, Claude skills, or Copilot instructions.
- Open source maintainers reviewing automation changes.
- Teams adding AI coding agents to existing workflows.

## Not a Fit

- Full malware detection.
- Runtime blocking or sandbox enforcement.
- Secret scanning for real `.env` files.
- Vulnerability database checks.
- Automatic PR comments without explicit opt-in.

## Safety and Privacy

ScopeDiff is local-first:

- No telemetry.
- No code upload.
- No default network access.
- No reading `.env` by default.
- No token storage.
- No execution of discovered commands.

If ScopeDiff helps you review agent/tooling changes more clearly, a star is welcome.
