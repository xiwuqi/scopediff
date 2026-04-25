# ScopeDiff v0.1.1 Release Notes

ScopeDiff is a local-first CLI for reviewing AI agent and tooling permission changes before merge.

v0.1.1 is a small follow-up release focused on first-run clarity, false-positive handling, and fixture-backed coverage. It does not change ScopeDiff's positioning: ScopeDiff is a review aid, not a complete security audit, vulnerability scanner, malware detector, or runtime protection system.

## What Changed

### Documentation

- Improved the README example report so new users can see how findings map to review questions.
- Added a "How To Review Findings" section to the README.
- Added `docs/common-false-positives.md` with common noisy cases, reporting guidance, and a sanitized issue template.
- Expanded the demo scenario docs to explain why one PR can produce overlapping findings.
- Synced the key finding-review guidance across localized README summaries.

### Tests and Fixtures

- Added a Cursor-style MCP config fixture for `.cursor/mcp.json`.
- Added coverage for pinned `uvx` MCP server packages so pinned packages are not reported as unpinned.
- Added GitHub Actions permission expansion fixtures for:
  - `read-all` to `write-all`
  - job-level `contents: read` to `contents: write`
  - job-level `id-token: write`
  - job-level `packages: write`

### Parser Behavior

- GitHub Actions parsing now includes job-level `jobs.<job>.permissions` entries in addition to top-level workflow permissions.

## What It Detects

v0.1.1 keeps the v0.1.0 rule set and improves coverage around:

- MCP config shapes under `.cursor/mcp.json`.
- GitHub Actions top-level permission expansion.
- GitHub Actions job-level permission expansion.
- Pinned versus unpinned `uvx` MCP package usage.

## What It Does Not Change

v0.1.1 does not add:

- SARIF output.
- Automatic PR comments.
- GitHub App or hosted service behavior.
- Remote package reputation checks.
- Runtime blocking or sandbox enforcement.
- Broader claims about preventing agent or MCP attacks.

## Install and Run

After npm publication:

```bash
npx scopediff@0.1.1 scan
npx scopediff@0.1.1 diff --base main
npx scopediff@0.1.1 ci --fail-on high
```

From source:

```bash
npm install
npm run build
node dist/cli.js scan
```

## GitHub Actions

After the v0.1.1 GitHub Release is created, pin the action tag:

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
        uses: xiwuqi/scopediff@v0.1.1
        with:
          base: origin/${{ github.base_ref }}
          fail-on: high
```

By default, ScopeDiff writes to the GitHub Step Summary and does not comment on pull requests.

## Safety and Privacy

ScopeDiff defaults remain unchanged:

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
- ScopeDiff does not understand project-specific trust policies.
- SARIF output is not included in v0.1.1.

## Reporting False Positives

False-positive reports are especially useful. Please open an issue with:

- The finding rule id.
- ScopeDiff version.
- A minimal sanitized fixture.
- Why the finding is too noisy or inaccurate.
- What review action would have been more helpful.

Do not include real secrets, private repository contents, customer data, private hostnames, or private security reports in public issues.

See `docs/common-false-positives.md` for examples.

## Upgrade Notes

No configuration migration is required from v0.1.0.

If you already run ScopeDiff in CI through npm, update the pinned version:

```bash
npx scopediff@0.1.1 ci --fail-on high
```

If you use the GitHub Action, update the action tag after the GitHub Release exists:

```yaml
uses: xiwuqi/scopediff@v0.1.1
```

## Feedback

Feedback on false positives, missing MCP config shapes, and GitHub Actions permission edge cases is welcome.
