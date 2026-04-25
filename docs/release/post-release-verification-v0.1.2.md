# ScopeDiff v0.1.2 Post-Release Verification

Date: 2026-04-25

Status: passed.

## Published Versions

- `scopediff@0.1.1`: published, then deprecated.
- `scopediff@0.1.2`: published.
- npm `latest`: `0.1.2`.

## Why v0.1.2 Was Published

`scopediff@0.1.1` was published successfully and its commands worked, but post-publish verification found that:

```bash
npx scopediff@0.1.1 --version
```

printed `0.1.0` because the CLI version was hardcoded.

v0.1.2 fixes that by reading the package version from `package.json`.

## Verification

Registry:

```bash
npm view scopediff name version dist-tags.latest versions --json --registry https://registry.npmjs.org/
```

Confirmed:

- package: `scopediff`
- current registry version: `0.1.2`
- latest dist-tag: `0.1.2`
- versions: `0.1.0`, `0.1.1`, `0.1.2`

Runtime:

```bash
npx --yes --registry https://registry.npmjs.org/ scopediff@0.1.2 --version
npx --yes --registry https://registry.npmjs.org/ scopediff@latest --version
npx --yes --registry https://registry.npmjs.org/ scopediff@0.1.2 scan --format markdown
```

Confirmed:

- `scopediff@0.1.2 --version` prints `0.1.2`.
- `scopediff@latest --version` prints `0.1.2`.
- `scopediff@0.1.2 scan --format markdown` runs successfully.

## Deprecation

`scopediff@0.1.1` was deprecated with this note:

```text
Version 0.1.1 works, but scopediff --version incorrectly reports 0.1.0. Please use scopediff@0.1.2 or later.
```

The deprecation note was verified through:

```bash
npm view scopediff@0.1.1 deprecated --registry https://registry.npmjs.org/
```

## Not Done

- No GitHub Release was created.
- No git tag was created.
- No social or community posts were published.
- No npm token was saved to the repository.

## Follow-Up

- Delete or rotate the temporary npm token used for publishing.
- If desired, create a GitHub Release for `v0.1.2` instead of `v0.1.1`.
