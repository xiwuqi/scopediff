# LinkedIn Launch With Images: v0.1.0

Status: prepared only. Do not publish without final human confirmation.

Recommended images, in order:

1. `docs/demo/assets/social-preview.png`
2. `docs/demo/assets/feature-overview.png`
3. `docs/demo/assets/scopediff-diff-report.png`

## Post Text

```text
AI agent configuration is becoming part of the code review surface.

A pull request can now change what an agent or workflow is allowed to do.

I released ScopeDiff v0.1.0, an open source, local-first CLI for reviewing AI agent, MCP, and workflow permission changes before merge.

Why I built it:

More repositories now contain MCP server config, AGENTS.md, Cursor rules, Claude skills, GitHub Actions permissions, package lifecycle scripts, and Docker setup. Those files can change which tools an agent can run, which tokens it expects, and whether automation can publish or deploy.

ScopeDiff helps reviewers spot changes such as:

- new or modified MCP servers
- token-like environment variables
- unpinned npx / remote package execution
- GitHub Actions permission expansion
- sensitive workflow triggers
- package lifecycle scripts
- agent instructions that add write, shell, network, deploy, push, or delete behavior

It is intentionally a review aid, not a complete security audit, vulnerability scanner, malware detector, or runtime protection layer.

Default safety posture:

- local-first
- read-only scanning
- no telemetry
- no code upload
- no command execution
- no .env reading by default

GitHub: https://github.com/xiwuqi/scopediff
npm: https://www.npmjs.com/package/scopediff

False-positive feedback and missing config examples are especially welcome.

If this is useful, feedback or a star helps more maintainers find it.

#OpenSource #AIagents #MCP
```

## Alt Text

1. ScopeDiff social preview showing the tagline: Review AI agent permissions before merge.
2. ScopeDiff feature overview showing MCP changes, workflow permissions, review evidence, and local-first defaults.
3. Terminal screenshot of ScopeDiff reporting new MCP and GitHub Actions permission findings.
