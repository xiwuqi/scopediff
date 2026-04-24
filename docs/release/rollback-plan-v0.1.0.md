# Rollback Plan: v0.1.0

Use only if a release or publish problem is discovered.

## npm Package

If the package is broken but not malicious:

```bash
npm deprecate scopediff@0.1.0 "v0.1.0 has a release issue. Please wait for v0.1.1."
```

Then:

- Patch the issue.
- Release `0.1.1`.
- Update README and release notes.

Avoid unpublish unless absolutely necessary and allowed by npm policy.

## GitHub Release

Options:

- Edit the release notes to mark a known issue.
- Mark the release as pre-release.
- Delete the GitHub Release only if it is actively misleading.

Command drafts:

```bash
gh release edit v0.1.0 --repo xiwuqi/scopediff --prerelease
gh release delete v0.1.0 --repo xiwuqi/scopediff
```

Deleting or editing a public release requires explicit manual approval.

## Git Tag

Do not force-move a public tag unless the release was not announced and the user approves.

If needed:

```bash
git push origin :refs/tags/v0.1.0
git tag -d v0.1.0
```

## README and Docs

- Remove or correct broken install commands.
- Add a known issue note.
- Link users to the fixed version.

## Announcement Corrections

- Correct any published links in `docs/launch/published-links.md`.
- Add a correction entry in `docs/launch/growth-log.md`.
- Do not delete critical context from public updates; be transparent and concise.
