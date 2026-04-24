# CLI Design

Global defaults:

- Read-only unless the user explicitly provides an output path.
- No network access in MVP.
- No telemetry.
- No token storage.
- Human-readable errors by default.
- JSON output must be stable and machine-readable.

## `scopediff scan`

Purpose: Scan the current workspace state and report current agent/tooling risk signals.

Parameters:

- `--format <markdown|json>` default `markdown`
- `--output <path>` optional
- `--root <path>` default current working directory
- `--max-file-size <bytes>` default `1048576`
- `--quiet` suppress non-error logs

Default behavior:

- Discovers known files under the current repository or directory.
- Parses files and emits findings for current state.
- Does not require git history.

Output example:

```bash
$ scopediff scan
ScopeDiff Report
Risk: High
Findings: 3 high, 2 medium
- [high] MCP server added: github (.mcp.json:3)
- [medium] Credential-like env var referenced: GITHUB_TOKEN (.mcp.json:8)
```

Exit code:

- `0` when scan completes, even if findings exist.
- `1` for invalid CLI usage.
- `2` for unreadable root or fatal parser setup error.

Error handling:

- Parse errors become report `errors` unless the whole command cannot proceed.
- Missing files are not errors.

Network: no.

Writes files: only with `--output`.

Security notes:

- Does not execute discovered commands.
- Does not read `.env` by default.

## `scopediff diff --base main`

Purpose: Compare current working tree or HEAD against a base ref and report capability changes.

Parameters:

- `--base <ref>` required unless default branch can be inferred
- `--head <ref>` optional, default working tree/HEAD
- `--format <markdown|json>` default `markdown`
- `--output <path>` optional
- `--staged` compare staged changes

Default behavior:

- Uses local git commands only.
- Falls back with a clear error when not in a git repository.

Output example:

```bash
$ scopediff diff --base main
ScopeDiff Diff Report
Base: main
Risk: High
- [high] Workflow permission expanded: contents write (.github/workflows/release.yml:6)
```

Exit code:

- `0` if diff completes.
- `1` invalid CLI usage.
- `2` git unavailable, base ref missing, or repository not found.

Network: no.

Writes files: only with `--output`.

Security notes:

- Does not fetch remote refs automatically in MVP.

## `scopediff report --format markdown`

Purpose: Render a report from the current scan/diff result. In MVP this can run a scan by default; later it may accept an input JSON file.

Parameters:

- `--format <markdown|json>` default `markdown`
- `--input <path>` optional future support
- `--output <path>` optional
- `--base <ref>` optional, if present report uses diff mode

Default behavior:

- If `--input` is omitted and `--base` is present, run diff mode.
- If `--input` and `--base` are omitted, run scan mode.

Output example:

```bash
$ scopediff report --format markdown --output scopediff-report.md
Wrote scopediff-report.md
```

Exit code:

- `0` success.
- `1` invalid args.
- `2` scan/diff/render failure.

Network: no.

Writes files: only with `--output`.

Security notes:

- Output may contain variable names and paths, not secret values.

## `scopediff ci --fail-on high`

Purpose: CI-friendly scan/diff with optional failure threshold.

Parameters:

- `--base <ref>` optional, default CI base ref when available
- `--fail-on <none|low|medium|high|critical>` default `high`
- `--format <markdown|json>` default `markdown`
- `--output <path>` optional
- `--summary` default true when `GITHUB_STEP_SUMMARY` exists

Default behavior:

- Runs diff mode when base ref is available.
- Runs scan mode otherwise and records that base comparison was unavailable.
- Writes GitHub Step Summary when possible.
- Does not comment on PRs.

Output example:

```bash
$ scopediff ci --fail-on high
ScopeDiff found 1 high finding. Failing because threshold is high.
```

Exit code:

- `0` no findings at or above threshold, or `--fail-on none`.
- `3` findings meet or exceed threshold.
- `1` invalid args.
- `2` fatal execution error.

Network: no in MVP.

Writes files:

- GitHub Step Summary if `GITHUB_STEP_SUMMARY` is set.
- Optional `--output` path.

Security notes:

- PR comments are future opt-in only.
- Do not request broad GitHub token permissions.

## `scopediff explain <finding-id>`

Purpose: Explain a finding, rule, evidence, confidence, and suggested review action.

Parameters:

- `<finding-id>` required
- `--input <path>` optional JSON report
- `--format <markdown|json>` default `markdown`

Default behavior:

- If `--input` is provided, look up the exact finding.
- If no input is provided and the id matches a rule id, explain the rule.

Output example:

```bash
$ scopediff explain R012
R012: GitHub Actions permissions expanded
Severity: high
Why it matters: workflow tokens may gain write access.
Review: prefer job-level permissions and least privilege.
```

Exit code:

- `0` explanation found.
- `1` invalid args or unknown id.
- `2` input read/parse failure.

Network: no.

Writes files: no.

Security notes:

- Explanation text must not imply proof of malicious intent.
