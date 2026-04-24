# v0.1.0 Release Checklist

## Code Quality

- [x] `npm ci` passes.
- [x] `npm run check` passes.
- [x] `npm pack --dry-run` passes.
- [x] Tarball install smoke test passes.
- [x] CLI help works after tarball install.
- [x] `scan` works after tarball install.
- [x] `diff` works against a real git base branch.
- [x] `ci` works with `--fail-on critical`.
- [x] JSON renderer works.
- [x] Markdown renderer works.
- [x] No hardcoded real tokens found.
- [x] No telemetry.
- [x] No hidden network request in CLI runtime.

## GitHub Release

- [ ] Tag name: `v0.1.0`
- [ ] Release title: `ScopeDiff v0.1.0`
- [ ] Release notes: `docs/release-notes-v0.1.0.md`
- [ ] Decide whether to upload `scopediff-0.1.0.tgz` as a release asset.
- [ ] Confirm npm package is published before advertising the Action wrapper.
- [ ] Consider README badge after first release.
- [ ] Consider repo topics after manual approval.
- [ ] Consider repo description changes after manual approval.

## npm Release

- [x] Package name appears available as of this check.
- [ ] Run `npm whoami`.
- [ ] Run final `npm view scopediff name version description --json`.
- [ ] Run `npm publish --access public`.
- [ ] Verify `npm view scopediff`.
- [ ] Verify `npx scopediff@latest --help`.
- [ ] Verify `npx scopediff@latest scan`.

## Communication

- [x] Launch drafts prepared locally.
- [x] Published links log created.
- [x] Growth log created.
- [ ] Do not publish anything until manually approved.
