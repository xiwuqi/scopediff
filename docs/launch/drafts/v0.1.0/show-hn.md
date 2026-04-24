# Hacker News Show HN Draft

Title:

```text
Show HN: ScopeDiff - review AI agent permission changes before merge
```

Post:

```text
Hi HN, I built ScopeDiff, a local-first CLI that helps review pull requests that change AI agent and tooling capability boundaries.

It looks at files like .mcp.json, AGENTS.md, Cursor rules, Claude skills, package.json scripts, Docker config, and GitHub Actions workflows. The goal is to make changes such as "new MCP server", "GITHUB_TOKEN env", "npx package not pinned", "pull_request_target added", or "contents: write" visible in a short Markdown/JSON report.

It does not execute the tools, upload code, read .env by default, or claim to be a complete security audit. It is meant to be a review aid for maintainers adopting coding agents and MCP.

Repo: https://github.com/xiwuqi/scopediff

I would appreciate feedback on false positives, missing agent config formats, and whether the report is useful during real PR review.
```

## HN Rule Notes

- HN guidelines say not to use the site primarily for promotion.
- HN guidelines also say not to solicit upvotes, comments, or submissions.
- Because HN discourages generated or AI-edited comments, the author should personally review and rewrite the post text before submitting.
- Do not delete and repost if it does not get traction.
