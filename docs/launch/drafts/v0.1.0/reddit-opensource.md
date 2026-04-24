# Reddit r/opensource Draft

Rule check required before posting. Do not post if self-promotion is not allowed or if the project does not fit the community.

Title:

```text
I built ScopeDiff, a local CLI for reviewing AI agent/tooling permission changes in PRs
```

Body:

```text
Hi r/opensource, I’m the author of ScopeDiff.

It’s a small TypeScript CLI for maintainers who are starting to see agent-related files in repos: MCP config, AGENTS.md, Cursor/Claude rules, GitHub Actions permissions, package lifecycle scripts, Docker setup, etc.

ScopeDiff compares a branch with a base ref and reports review-worthy changes like:

- new MCP servers
- credential-like env vars
- unpinned npx packages
- GitHub Actions permissions expanding to write
- pull_request_target being added

It’s local-first: no telemetry, no code upload, no .env reading by default, and no PR comments by default.

It is not a complete security audit. I’m looking for feedback on false positives and missing config shapes.

Repo: https://github.com/xiwuqi/scopediff
```
