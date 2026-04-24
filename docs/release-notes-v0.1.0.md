# ScopeDiff v0.1.0 Release Notes

ScopeDiff is a local-first CLI for reviewing AI agent and tooling permission changes before merge.

It is designed for repositories that are starting to carry MCP server config, `AGENTS.md`, Cursor rules, Claude skills, GitHub Actions permissions, package lifecycle scripts, Docker setup, and other files that can change what agents or automation are able to do.

ScopeDiff is a review aid. It is not a complete security audit, vulnerability scanner, malware detector, or runtime protection system.

## What Is Included

v0.1.0 includes:

- `scopediff scan`
- `scopediff diff --base main`
- `scopediff report --format markdown`
- `scopediff report --format json`
- `scopediff ci --fail-on high`
- `scopediff explain <rule-id>`
- Markdown reports
- JSON reports
- GitHub Step Summary support in CI
- Fixture-backed tests for core MVP rules

## What It Detects

v0.1.0 can report review-worthy changes such as:

- MCP server additions and command/args/env changes.
- Credential-like env names such as `GITHUB_TOKEN`.
- Unpinned remote package execution such as `npx -y package`.
- GitHub Actions permission expansion.
- Sensitive workflow triggers such as `pull_request_target`.
- Workflow secret usage.
- External actions not pinned to commit SHA.
- `package.json` lifecycle scripts such as `postinstall`.
- Docker privileged, host network, root user, and Docker socket patterns.
- Agent instructions that add write, shell, network, publish, deploy, push, or delete behavior.
- Remote script execution patterns such as `curl | bash`.

## What It Does Not Detect

ScopeDiff does not:

- Execute MCP servers, package scripts, workflows, or Docker builds.
- Verify package reputation.
- Query vulnerability databases.
- Read real `.env` files by default.
- Prove whether a change is malicious.
- Prevent all agent or MCP security issues.
- Comment on pull requests by default.

## Install and Run

Before npm publication, run from source:

```bash
npm install
npm run build
node dist/cli.js scan
```

After npm publication:

```bash
npx scopediff@0.1.0 scan
npx scopediff@0.1.0 diff --base main
npx scopediff@0.1.0 ci --fail-on high
```

## GitHub Actions

After npm publication:

```yaml
name: ScopeDiff

on:
  pull_request:

permissions:
  contents: read

jobs:
  scopediff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run ScopeDiff
        run: npx scopediff@0.1.0 ci --base origin/${{ github.base_ref }} --fail-on high
```

## Safety and Privacy

ScopeDiff defaults:

- No telemetry.
- No code upload.
- No hidden network service.
- No reading `.env` by default.
- No token storage.
- No execution of discovered commands.
- No default PR comments.

## Known Limitations

- JSONC configs are not parsed yet.
- Line mapping is useful but not perfect for all YAML/JSON structures.
- Natural-language instruction findings are conservative and may produce false positives.
- The GitHub Action wrapper depends on the npm package being published.
- SARIF output is not included in v0.1.0.

## Reporting False Positives

False-positive reports are especially useful. Please open an issue with:

- The finding rule id.
- A minimal sanitized fixture.
- Why the finding is too noisy or inaccurate.
- What review action would have been more helpful.

Do not include real secrets, private repository contents, or private customer data in public issues.

## Roadmap

- JSONC support.
- More MCP client config shapes.
- More GitHub Actions permission edge cases.
- Common false-positive documentation.
- SARIF output.
- Optional PR comments with explicit opt-in and minimal permissions.

## Feedback

If ScopeDiff helps you review agent/tooling changes more clearly, feedback and false-positive reports are welcome.
