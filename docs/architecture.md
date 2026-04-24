# Technical Architecture

## 1. Runtime

- Node.js 20+
- TypeScript
- ESM package output
- CLI distributed through npm
- GitHub Action can initially run `npx scopediff ci`

## 2. Package Manager

Recommendation: `pnpm`.

Why:

- Fast local installs.
- Good workspace support if the project later splits CLI/action packages.
- Deterministic lockfile.

MVP can still support npm users through `npx scopediff`.

## 3. CLI Framework

Recommendation: `commander`.

Why:

- Stable and familiar.
- Minimal learning curve.
- Good help output.

Alternative: `cac` is smaller, but `commander` is more recognizable for contributors.

## 4. File Discovery Module

Module: `src/core/file-discovery.ts`

Responsibilities:

- Resolve repository root or supplied `--root`.
- Match known scan paths.
- Respect ignored directories: `.git`, `node_modules`, dist/build outputs.
- Enforce max file size.
- Avoid following symlinks outside root.
- Return discovered files, skipped files, and read errors.

Dependency:

- `fast-glob`: recommended. It avoids hand-written glob walking and handles cross-platform paths well.

## 5. Git Diff Module

Module: `src/git/diff.ts`

Responsibilities:

- Detect whether the current directory is a git repository.
- Resolve base and head refs.
- Get changed files.
- Read file content at base and head.
- Normalize deleted, added, and modified file states.

Dependency:

- `execa`: recommended for safe `git` command invocation without shell string interpolation.

No network:

- Do not run `git fetch` in MVP.

## 6. Parser Module

Modules:

- `src/parsers/json.ts`
- `src/parsers/yaml.ts`
- `src/parsers/markdown.ts`
- `src/parsers/text.ts`
- `src/parsers/package-json.ts`
- `src/parsers/github-actions.ts`
- `src/parsers/mcp.ts`

Responsibilities:

- Parse structured files.
- Preserve enough line mapping for findings.
- Fall back to text findings when YAML or JSON parse fails.
- Never execute code.

Dependencies:

- `yaml`: recommended for GitHub Actions, pnpm workspace, and docker-compose.
- Native `JSON.parse` is enough for JSON in MVP.

Avoid:

- Full JavaScript parsers for MVP. `package.json` script strings can be checked as text.

## 7. Detector and Rules Module

Modules:

- `src/rules/index.ts`
- `src/rules/mcp.ts`
- `src/rules/workflow.ts`
- `src/rules/instructions.ts`
- `src/rules/package.ts`
- `src/rules/docker.ts`
- `src/rules/transparency.ts`

Responsibilities:

- Receive normalized file snapshots.
- Emit rule findings with evidence, base severity, confidence, and metadata.
- Keep rules deterministic.

Rule contract:

```ts
interface Rule {
  id: string;
  category: string;
  defaultSeverity: Severity;
  run(context: RuleContext): FindingDraft[];
}
```

## 8. Scoring Module

Module: `src/core/scoring.ts`

Responsibilities:

- Apply severity adjustments from `docs/scoring.md`.
- Compute report risk level.
- Count by severity and category.
- Keep severity logic transparent and covered by tests.

## 9. Report Renderer Module

Modules:

- `src/renderers/json.ts`
- `src/renderers/markdown.ts`

Responsibilities:

- Convert report model to JSON or Markdown.
- Redact or avoid secret values.
- Produce stable ordering:
  1. Severity descending
  2. Category
  3. File path
  4. Line number
  5. Rule id

## 10. GitHub Action Integration Module

Module: `src/action/github-summary.ts`

Responsibilities:

- Detect `GITHUB_STEP_SUMMARY`.
- Append Markdown report or summary section.
- Avoid PR comments in MVP.
- Avoid GitHub API calls in MVP.

## 11. Test Structure

- Unit tests for parsers.
- Unit tests for each rule.
- Unit tests for scoring.
- Snapshot-style tests for Markdown output.
- JSON schema shape tests.
- Integration tests using fixtures for scan and diff modes.

Framework:

- `vitest`: recommended because it is fast, TypeScript-friendly, and simple for fixtures.

## 12. Fixtures Structure

```text
tests/fixtures/
  mcp-added/
    before/.mcp.json
    after/.mcp.json
  workflow-permissions-expanded/
    before/.github/workflows/ci.yml
    after/.github/workflows/ci.yml
  package-postinstall/
    before/package.json
    after/package.json
  instruction-shell-added/
    before/AGENTS.md
    after/AGENTS.md
```

Each fixture should include expected finding ids and severities.

## 13. Error Handling Strategy

- Parser errors are recoverable and stored in report `errors` when a text fallback is possible.
- Git errors are fatal for `diff` but not for `scan`.
- Missing optional files are ignored.
- Invalid CLI arguments return exit code `1`.
- Fatal environment problems return exit code `2`.
- Threshold failures in CI return exit code `3`.

Error messages should explain what the user can do next.

## 14. Logging Strategy

- Default output should be report content, not noisy logs.
- Warnings go to stderr.
- `--quiet` suppresses non-fatal warnings.
- `--verbose` can be added later.

No logs should include secret values.

## 15. Security Boundaries

- No command execution except local `git` through `execa`.
- No shell invocation for detected commands.
- No network access in MVP.
- No telemetry.
- No reading `.env` by default.
- No credential persistence.
- No automatic comments, posts, or external writes.

## Dependency Recommendations

| Dependency         | Recommendation              | Reason                                                        |
| ------------------ | --------------------------- | ------------------------------------------------------------- |
| `commander`        | Use                         | Stable CLI parsing and help output                            |
| `cac`              | Do not use initially        | Smaller, but less familiar than commander                     |
| `fast-glob`        | Use                         | Reliable cross-platform file discovery                        |
| `yaml`             | Use                         | Needed for workflows, compose, pnpm workspace                 |
| `zod`              | Use                         | Validate report model and config boundaries                   |
| `execa`            | Use                         | Safer git command execution than shell strings                |
| `kleur` or `chalk` | Avoid in MVP or use `kleur` | Color is nice, but plain output is enough; `kleur` is lighter |
| `vitest`           | Use                         | Fast TypeScript test runner                                   |
| `tsup`             | Use                         | Simple CLI bundling for npm                                   |
| `eslint`           | Use                         | Maintainable TypeScript quality                               |
| `prettier`         | Use                         | Stable formatting                                             |

Optional future dependencies:

- `jsonc-parser` for JSONC configs.
- `minimatch` only if `fast-glob` matching is not enough.
- `@actions/core` only if publishing a native JavaScript action wrapper.
