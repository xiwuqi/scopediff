# X/Twitter Thread With Images: v0.1.0

Status: prepared only. Do not publish without final human confirmation.

Thread structure: problem -> demo -> safety boundary -> links.

## Tweet 1

Recommended image: `docs/demo/assets/social-preview.png`

```text
AI agent config is becoming part of the code review surface.

A PR can now change MCP servers, agent instructions, package lifecycle scripts, and GitHub Actions permissions.

I built ScopeDiff to make those changes easier to review before merge.
```

Alt text:

```text
ScopeDiff social preview showing the tagline: Review AI agent permissions before merge.
```

## Tweet 2

Recommended image: `docs/demo/assets/scopediff-diff-report.png`

```text
ScopeDiff is a local-first CLI that compares your branch to a base ref and reports review-worthy agent/tooling changes.

It can flag MCP server additions, token-like env vars, unpinned npx usage, and workflow permission expansion.
```

Alt text:

```text
Terminal screenshot of ScopeDiff reporting new MCP and GitHub Actions permission findings.
```

## Tweet 3

Recommended image: `docs/demo/assets/quick-start.png`

```text
The fast path is one command:

npx scopediff@latest diff --base main

It outputs Markdown or JSON, and the CI mode writes to GitHub Step Summary by default.
```

Alt text:

```text
ScopeDiff quick start image showing npx commands for scan, diff, and CI mode.
```

## Tweet 4

Recommended image: `docs/demo/assets/github-step-summary-mock.png`

```text
ScopeDiff is a review aid, not a full security audit, vulnerability scanner, or runtime protection layer.

It does not execute discovered commands, upload code, read .env by default, or collect telemetry.
```

Alt text:

```text
GitHub Step Summary layout mock showing a ScopeDiff report with a high-risk finding.
```

## Tweet 5

Recommended image: none, or `docs/demo/assets/feature-overview.png`

```text
Repo: https://github.com/xiwuqi/scopediff
npm: https://www.npmjs.com/package/scopediff

False-positive feedback is very welcome.

If this helps you review agent/tooling changes, a star helps others find it.

#MCP #AIagents
```

Alt text if using image:

```text
ScopeDiff feature overview showing MCP changes, workflow permissions, review evidence, and local-first defaults.
```
