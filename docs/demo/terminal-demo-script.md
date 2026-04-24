# 60-Second Terminal Demo Script

## Goal

Show that ScopeDiff turns agent/tooling permission changes into a reviewable report.

## Script

0-10s:

```bash
git checkout -b add-github-mcp
```

Narration:

> Here is a small PR that adds a GitHub MCP server and changes a workflow permission.

10-25s:

Show `.mcp.json` and `.github/workflows/ci.yml`:

```bash
git diff -- .mcp.json .github/workflows/ci.yml
```

Narration:

> The diff is not huge, but it changes what an agent can start, which token it expects, and how CI runs.

25-45s:

```bash
scopediff diff --base main --format markdown
```

Narration:

> ScopeDiff highlights the review-worthy boundary changes: a new MCP server, an unpinned npx package, a credential-like env var, pull_request_target, and contents write.

45-60s:

```bash
scopediff explain R012
```

Narration:

> Each finding is explainable. It tells you why it matters and what to review. It is not a blocker by itself; it is a review aid.

## Closing Line

> If your repo is starting to carry agent instructions, MCP config, or workflow automation, ScopeDiff helps make those changes visible before merge.
