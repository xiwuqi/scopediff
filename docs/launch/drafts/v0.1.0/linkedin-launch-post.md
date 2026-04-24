# LinkedIn Launch Post Draft

I just released the first MVP of ScopeDiff, a local-first CLI for reviewing AI agent and tooling permission changes in pull requests.

As teams adopt coding agents, more capability boundaries are moving into repository files:

- MCP server configuration
- agent instruction files
- Cursor and Claude rules
- GitHub Actions permissions
- package lifecycle scripts
- Docker setup

ScopeDiff compares those files and produces a review report with evidence, severity, confidence, and suggested review steps.

It is not a complete security audit or runtime protection layer. The goal is simpler: help reviewers notice when a PR changes what an agent or automation can do.

Repo: https://github.com/xiwuqi/scopediff

I would especially appreciate feedback on false positives and missing config formats.
