# ScopeDiff v0.1.2 Preflight

Status: passed locally.

This is a hotfix preflight for the `scopediff --version` bug found after publishing v0.1.1.

## Scope

v0.1.2 only fixes CLI version reporting.

## Required Checks

- [x] `npm run check`
- [x] `npm pack --dry-run`
- [x] `npm pack`
- [x] tarball install smoke test
- [x] packed `scopediff --version` prints `0.1.2`
- [x] packed `scopediff --help` works
- [x] packed `scopediff scan --format markdown` works
- [x] `git diff --check`

## Local Verification Results

Date: 2026-04-25

- `npm run check`: passed.
  - TypeScript typecheck passed.
  - ESLint passed.
  - Vitest passed: 3 test files, 14 tests.
  - `tsup` build passed.
- `npm pack --dry-run`: passed.
- `npm pack --pack-destination /tmp/scopediff-v0.1.2-pack`: passed.
  - Tarball: `scopediff-0.1.2.tgz`
  - Package size: 39.5 kB
  - Unpacked size: 178.4 kB
  - Total files: 8
- Tarball smoke test: passed.
  - Installed packed tarball into a temporary npm project.
  - `node_modules/.bin/scopediff --version` printed `0.1.2`.
  - `node_modules/.bin/scopediff --help` worked.
  - `node_modules/.bin/scopediff scan --format markdown` worked.

## Manual Approval Required Before Public Release

Ask before:

- pushing the hotfix commit
- creating tag `v0.1.2`
- creating GitHub Release `v0.1.2`
- running `npm publish`
- deprecating `scopediff@0.1.1`
