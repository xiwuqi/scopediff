# Product Hunt Page Draft

## Name

ScopeDiff

## Tagline

Review AI agent permission changes before merge.

## Description

ScopeDiff is a local-first CLI that helps maintainers review PRs that change AI agent and tooling capability boundaries. It checks files such as MCP config, `AGENTS.md`, Cursor/Claude rules, GitHub Actions workflows, package scripts, and Docker setup, then produces Markdown/JSON reports with evidence and suggested review steps.

It is a review aid, not a complete security audit.

## First Comment Draft

Hi Product Hunt, I’m the author of ScopeDiff.

I built it because more AI agent capability is moving into repo files: MCP servers, agent instructions, workflow permissions, and package scripts. Those changes can be easy to miss in normal code review.

ScopeDiff runs locally and highlights changes like new MCP servers, credential-like env vars, unpinned `npx` packages, `pull_request_target`, or `contents: write`.

I’d love feedback from maintainers and AI-tool users, especially on false positives and missing config formats.

## Media Needed Before Launch

- README first screen screenshot.
- Terminal report screenshot.
- Short demo GIF or 60-second video.
