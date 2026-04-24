# X/Twitter Thread Draft

## 1

AI agent config is becoming part of the code review surface.

A PR can now change:

- MCP servers
- `AGENTS.md`
- Cursor / Claude rules
- GitHub Actions permissions
- package lifecycle scripts

I built ScopeDiff to make those changes easier to review.

## 2

ScopeDiff does not block anything by default.

It reads local files, compares a branch to a base ref, and produces Markdown/JSON findings with evidence and suggested review steps.

No telemetry. No code upload. No `.env` reading by default.

## 3

Example finding:

`MCP server added: github`

Evidence:

`npx -y @modelcontextprotocol/server-github`

Review notes:

- pin the package version
- check token scope
- document why the server is needed

## 4

v0.1.0 checks MCP config, GitHub Actions permissions/triggers/secrets, package lifecycle scripts, Docker isolation flags, and agent instruction files.

It is intentionally conservative and imperfect. False positives are useful feedback.

## 5

Repo: https://github.com/xiwuqi/scopediff

If your repos are starting to include agent instructions or MCP config, I would love feedback on what ScopeDiff misses or over-reports.

If it helps, a star helps others find it.
