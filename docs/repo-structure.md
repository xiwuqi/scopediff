# Repository Structure

Target MVP structure:

```text
README.md
LICENSE
CHANGELOG.md
CONTRIBUTING.md
SECURITY.md
CODE_OF_CONDUCT.md
package.json
pnpm-lock.yaml
tsconfig.json
tsup.config.ts
eslint.config.js
prettier.config.js
src/
  cli.ts
  commands/
    scan.ts
    diff.ts
    report.ts
    ci.ts
    explain.ts
  core/
    file-discovery.ts
    model.ts
    scoring.ts
    severity.ts
    paths.ts
    errors.ts
  parsers/
    json.ts
    yaml.ts
    markdown.ts
    text.ts
    package-json.ts
    github-actions.ts
    mcp.ts
    docker.ts
  rules/
    index.ts
    mcp.ts
    workflow.ts
    instructions.ts
    package.ts
    docker.ts
    transparency.ts
  renderers/
    json.ts
    markdown.ts
  git/
    diff.ts
    refs.ts
  action/
    github-summary.ts
tests/
  unit/
  integration/
  fixtures/
docs/
  product-spec.md
  risk-model.md
  scanning-scope.md
  cli-design.md
  report-schema.md
  scoring.md
  architecture.md
  repo-structure.md
  mvp-acceptance.md
  test-plan.md
  github-action-design.md
  readme-first-screen-draft.md
  name-check.md
.github/
  workflows/
    ci.yml
    scopediff.yml
  ISSUE_TEMPLATE/
    bug_report.yml
    feature_request.yml
    false_positive.yml
  pull_request_template.md
```

## Root Files

- `README.md`: Primary user-facing documentation, quick start, demo, privacy boundary, limitations.
- `LICENSE`: Recommended MIT for broad CLI adoption.
- `CHANGELOG.md`: Release notes and user-visible changes.
- `CONTRIBUTING.md`: Local setup, test commands, rule contribution guide.
- `SECURITY.md`: Vulnerability reporting and security limitations.
- `CODE_OF_CONDUCT.md`: Community expectations.
- `package.json`: npm package metadata, bin entry, scripts.
- `pnpm-lock.yaml`: Deterministic dependency lockfile.
- `tsconfig.json`: TypeScript compiler settings.
- `tsup.config.ts`: CLI build configuration.
- `eslint.config.js`: Lint rules.
- `prettier.config.js`: Formatting rules.

## `src/`

Application source. Keep it modular and rule-oriented.

## `src/commands/`

Command handlers. Should stay thin and call core modules.

## `src/core/`

Shared model, scoring, path handling, severity helpers, and error types.

## `src/parsers/`

File-type parsers. Parsers should not create findings directly unless they emit parse diagnostics. Rule modules consume normalized parser output.

## `src/rules/`

Deterministic detectors. Each rule should be easy to test with fixtures and should map to a documented rule id.

## `src/renderers/`

JSON and Markdown output. Renderers should not change severity or finding content.

## `src/git/`

Local git integration. No network fetches in MVP.

## `src/action/`

GitHub Actions helpers, initially limited to Step Summary writing.

## `tests/`

- `unit`: parser, rule, scoring, renderer tests.
- `integration`: command-level tests with temporary fixture repos.
- `fixtures`: before/after examples and expected outputs.

## `docs/`

Product and engineering specs. These docs are part of the project contract and should stay updated as rules change.

## `.github/`

Project automation, issue templates, and PR template.

The project should eventually run ScopeDiff on itself, but not until after the MVP implementation exists.
