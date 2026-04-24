# ScopeDiff

AI agent permission and tooling surface diffs for pull request review.

> This PR gives your AI agent new powers. Review them before merge.

ScopeDiff helps maintainers spot changes to MCP servers, agent instructions, GitHub Actions permissions, package lifecycle scripts, Docker settings, and other files that can change what AI agents or automation are able to do.

It is a review aid, not a complete security audit, vulnerability scanner, or runtime protection system.

## Why ScopeDiff

- See agent/tooling permission changes before merge.
- Run locally or in CI without uploading code.
- Get PR-ready Markdown and JSON reports with evidence and suggested review steps.

## Run From Source

Before the first npm release:

```bash
npm install
npm run build
node dist/cli.js scan
```

After npm publication:

```bash
npx scopediff scan
```

Install in a project after npm publication:

```bash
npm install -D scopediff
```

## 30-Second Quick Start

Scan the current repo:

```bash
node dist/cli.js scan
```

Compare your branch with `main`:

```bash
node dist/cli.js diff --base main
```

Generate Markdown:

```bash
node dist/cli.js report --format markdown
```

Run in CI and fail on high-risk findings:

```bash
node dist/cli.js ci --fail-on high
```

## Example Report

```md
## ScopeDiff Report

Risk: High

New agent capability detected:

- MCP server added: github
- Command: npx -y @modelcontextprotocol/server-github
- Env required: GITHUB_TOKEN
- Possible scope: repository read/write depending on token permissions

Review notes:

- Pin package version instead of using latest
- Prefer a read-only token for first setup
- Document why this server is needed
- Check whether this PR also changed workflow permissions
```

## What ScopeDiff Looks For

- MCP server additions and command/args/env changes.
- Credential-like env names such as `GITHUB_TOKEN` or `API_KEY`.
- Unpinned `npx`, `uvx`, `pipx`, and Docker `latest` usage.
- GitHub Actions permission expansion, sensitive triggers, secrets, and unpinned actions.
- `package.json` lifecycle scripts such as `postinstall` and `prepare`.
- Agent instructions that add read, write, shell, network, publish, deploy, push, or delete behavior.
- Docker privileged mode, host network, root user, or Docker socket access.
- Remote script execution patterns such as `curl | bash`.

## GitHub Actions

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
        run: npx scopediff ci --base origin/${{ github.base_ref }} --fail-on high
```

By default, ScopeDiff writes to the GitHub Step Summary and does not comment on pull requests.

## Good Fit

- Repositories using MCP servers.
- Projects with `AGENTS.md`, Cursor rules, Claude skills, or Copilot instructions.
- Open source maintainers reviewing automation changes.
- Teams adding AI coding agents to existing workflows.

## Not a Fit

- Full malware detection.
- Runtime blocking or sandbox enforcement.
- Secret scanning for real `.env` files.
- Vulnerability database checks.
- Automatic PR comments without explicit opt-in.

## Safety and Privacy

ScopeDiff is local-first:

- No telemetry.
- No code upload.
- No default network access.
- No reading `.env` by default.
- No token storage.
- No execution of discovered commands.

## Docs

- [Product spec](docs/product-spec.md)
- [Risk model](docs/risk-model.md)
- [Scanning scope](docs/scanning-scope.md)
- [CLI design](docs/cli-design.md)
- [Report schema](docs/report-schema.md)
- [Scoring](docs/scoring.md)
- [Architecture](docs/architecture.md)
- [MVP acceptance](docs/mvp-acceptance.md)
- [Test plan](docs/test-plan.md)

## Roadmap

- JSONC support for client-specific config files.
- Better line mapping for YAML and JSON findings.
- First-class GitHub Action wrapper.
- Optional, explicitly configured PR comments.
- Rule contribution guide and rule docs pages.

## Contributing

Issues and pull requests are welcome. False-positive reports are especially useful because ScopeDiff should stay conservative and explainable.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

If ScopeDiff helps you review agent/tooling changes more clearly, a star is welcome.
