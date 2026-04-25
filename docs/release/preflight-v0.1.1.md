# ScopeDiff v0.1.1 Preflight

Status: passed locally.

This document tracks v0.1.1 release readiness. It is not a release announcement.

## Scope

v0.1.1 includes:

- first-run README and false-positive documentation improvements
- localized README sync for finding-review guidance
- Cursor-style MCP config fixture coverage
- GitHub Actions permission expansion fixture coverage
- job-level workflow permission parsing

v0.1.1 does not include:

- SARIF output
- automatic PR comments
- npm publish
- GitHub Release creation
- new social launch posts

## Version

- `package.json`: `0.1.1`
- `package-lock.json`: `0.1.1`

## Required Checks

- [x] `npm ci`
- [x] `npm run check`
- [x] `npm pack --dry-run`
- [x] `npm pack`
- [x] tarball install smoke test
- [x] `npx scopediff --help` from packed tarball
- [x] `npx scopediff scan --format markdown` from packed tarball
- [x] `npx scopediff scan --format json` from packed tarball
- [x] `npx scopediff report --format markdown` from packed tarball
- [x] `npx scopediff ci --fail-on critical --format markdown` from packed tarball
- [x] `npx scopediff diff --base main --format markdown` from packed tarball fixture repo
- [x] `git diff --check`

## Local Verification Results

Date: 2026-04-25

- `npm ci`: passed.
- `npm run check`: passed.
  - TypeScript typecheck passed.
  - ESLint passed.
  - Vitest passed: 3 test files, 14 tests.
  - `tsup` build passed.
- `npm pack --dry-run`: passed.
- `npm pack --pack-destination /tmp/scopediff-v0.1.1-pack`: passed.
  - Tarball: `scopediff-0.1.1.tgz`
  - Package size: 39.3 kB
  - Unpacked size: 177.9 kB
  - Total files: 8
- Tarball smoke test: passed.
  - Installed packed tarball into a temporary npm project.
  - `npx scopediff --help` worked.
  - `npx scopediff scan --format markdown` worked.
  - `npx scopediff scan --format json` worked.
  - `npx scopediff report --format markdown` worked.
  - `npx scopediff ci --fail-on critical --format markdown` worked.
- Diff smoke test: passed.
  - Created a temporary git repo with `main` and `feature`.
  - `feature` added a GitHub MCP server, `GITHUB_TOKEN`, unpinned `npx`, `pull_request_target`, and `contents: write`.
  - `npx scopediff diff --base main --format markdown` reported 7 findings.
  - Highest risk: critical.

## Notes

- The packed npm package intentionally includes only `dist`, `README.md`, `LICENSE`, `CHANGELOG.md`, `SECURITY.md`, and `package.json`.
- Release notes and docs are kept in the repository but are not included in the npm package.
- No npm publish, GitHub tag, or GitHub Release was created during this preflight.

## Manual Approval Required Before Public Release

Ask before:

- pushing release-prep commit
- creating tag `v0.1.1`
- creating GitHub Release `v0.1.1`
- running `npm publish`
- posting any public announcement
