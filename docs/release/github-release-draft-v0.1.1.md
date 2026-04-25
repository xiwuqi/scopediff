# GitHub Release Draft: v0.1.1

Status: prepared. Do not create this release without final maintainer approval.

## Current Checks

- `origin/main` includes release-prep commit `0c370a2`.
- GitHub CI for `0c370a2` passed.
- Local tag `v0.1.1` does not exist yet.
- GitHub Release `v0.1.1` does not exist yet.
- npm package `scopediff@0.1.1` has not been published yet.

Known non-blocking warning:

- GitHub Actions reports a Node.js 20 action runtime deprecation warning for `actions/checkout@v4` and `actions/setup-node@v4`. CI still passes. Track this separately; do not block v0.1.1 on it.

## Release Metadata

- Tag: `v0.1.1`
- Target branch: `main`
- Title: `ScopeDiff v0.1.1`
- Release type: normal release, not prerelease
- Discussion: do not create a new discussion automatically
- Assets: no extra release asset required

## Release Body

Use `docs/release-notes-v0.1.1.md` as the release body.

Short summary:

```md
ScopeDiff v0.1.1 is a small follow-up release focused on first-run clarity, false-positive handling, and fixture-backed coverage.

Highlights:

- Clearer README review guidance.
- New common false-positive docs and sanitized reporting template.
- Cursor-style MCP config fixture coverage.
- GitHub Actions permission expansion fixtures.
- Job-level `jobs.<job>.permissions` parsing.

ScopeDiff remains a local-first review aid. It does not upload code, collect telemetry, execute discovered commands, or claim to be a complete security scanner.
```

## Command Draft

Do not run until explicitly approved:

```bash
gh release create v0.1.1 \
  --repo xiwuqi/scopediff \
  --target main \
  --title "ScopeDiff v0.1.1" \
  --notes-file docs/release-notes-v0.1.1.md
```

## Post-Create Verification

After creation, verify:

```bash
gh release view v0.1.1 --repo xiwuqi/scopediff
git fetch --tags
git tag -l v0.1.1
```

Record the public release link in:

- `docs/launch/published-links.md`
- `docs/launch/growth-log.md`
