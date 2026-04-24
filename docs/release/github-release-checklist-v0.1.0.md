# GitHub Release Checklist: v0.1.0

Do not create the release without explicit approval.

## Pre-Release

- [ ] Confirm `main` is clean.
- [ ] Confirm `origin/main` contains release-prep commit.
- [ ] Confirm CI is green.
- [ ] Confirm npm package has been published, or mark GitHub Release notes clearly if npm is not published.
- [ ] Confirm release notes are final.

## Tag

```bash
git tag v0.1.0
git push origin v0.1.0
```

## Release

Suggested command draft:

```bash
gh release create v0.1.0 \
  --repo xiwuqi/scopediff \
  --title "ScopeDiff v0.1.0" \
  --notes-file docs/release-notes-v0.1.0.md
```

Optional asset:

```bash
gh release upload v0.1.0 scopediff-0.1.0.tgz --repo xiwuqi/scopediff
```

## Post-Release

- [ ] Verify release page.
- [ ] Verify action tag documentation.
- [ ] Record release link in `docs/launch/published-links.md`.
- [ ] Do not post externally until launch content is separately approved.
