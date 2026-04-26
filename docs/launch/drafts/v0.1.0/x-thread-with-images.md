# X/Twitter Thread With Images: v0.1.0

Status: published on 2026-04-24 after final human confirmation.

Published thread:

- https://x.com/HCongqi/status/2047615200237334662
- https://x.com/HCongqi/status/2047615202074448320
- https://x.com/HCongqi/status/2047615203513090145
- https://x.com/HCongqi/status/2047615204809179440

Thread structure: problem -> review surface -> safety boundary -> links.

## Tweet 1

Recommended images:

- `docs/demo/assets/social-preview.png`
- `docs/demo/assets/scopediff-diff-report.png`
- `docs/demo/assets/github-step-summary-mock.png`
- `docs/demo/assets/quick-start.png`

Future visual refresh:

- `docs/brand/social-preview-v2.png`
- `docs/brand/docs-permission-map.png`

```text
Built ScopeDiff because AI PRs now change more than code.

They can add MCP servers, token env vars, unpinned commands, or wider GitHub Actions permissions.

ScopeDiff turns those capability changes into a review report before merge.
```

Alt text:

```text
ScopeDiff social preview showing the tagline: Review AI agent permissions before merge.

Terminal screenshot of ScopeDiff reporting new MCP and GitHub Actions permission findings.

GitHub Step Summary layout mock showing a ScopeDiff report with a high-risk finding.

ScopeDiff quick start image showing npx commands for scan, diff, and CI mode.
```

## Tweet 2

Recommended image: none

```text
It looks for changes reviewers often need to notice fast:

- new/changed MCP servers
- token-like env vars
- npx/docker/curl/bash risks
- GitHub Actions permission expansion
- sensitive triggers like pull_request_target
- lifecycle scripts like postinstall
```

## Tweet 3

Recommended image: none

```text
ScopeDiff is intentionally conservative:

- local-first
- read-only by default
- no telemetry
- no code upload
- no token storage

It is a review aid, not a complete security audit or vulnerability scanner.
```

## Tweet 4

Recommended image: none

```text
Try it:

npx scopediff@latest scan
npx scopediff@latest diff --base main

GitHub: https://github.com/xiwuqi/scopediff
npm: https://www.npmjs.com/package/scopediff

False-positive feedback is very welcome.
```
