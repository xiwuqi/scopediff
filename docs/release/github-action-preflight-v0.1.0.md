# GitHub Action Preflight: v0.1.0

Date: 2026-04-24

## Result

Status: conditionally ready after npm publish.

The repository includes `action.yml`, but the action runs the npm package through `npx --yes scopediff@0.1.0`. This means the GitHub Action should not be advertised as usable until the npm package is published.

## Checks

- Default behavior writes GitHub Step Summary through the CLI when `GITHUB_STEP_SUMMARY` exists.
- `comment-pr` defaults to `false`.
- If `comment-pr` is set to anything other than `false`, the composite action exits with an explanatory error.
- `fail-on` is configurable.
- The README workflow uses minimal permissions:

```yaml
permissions:
  contents: read
```

- The README example does not request `pull-requests: write`.
- The README recommends pinning the repository action tag, for example `xiwuqi/scopediff@v0.1.0`.
- The README uses `npx scopediff@0.1.0` in the CI example after npm publication.

## Known Caveat

The current action is a composite wrapper around the npm CLI. Release order should be:

1. Publish npm package `scopediff@0.1.0`.
2. Create GitHub tag `v0.1.0`.
3. Create GitHub Release.
4. Advertise `xiwuqi/scopediff@v0.1.0` as the action reference.

If the GitHub Release is created before npm publish, the action will fail because `npx scopediff@0.1.0` will not exist yet.

## Recommended User Workflow

```yaml
name: ScopeDiff

on:
  pull_request:

permissions:
  contents: read

jobs:
  scopediff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run ScopeDiff
        run: npx scopediff@0.1.0 ci --base origin/${{ github.base_ref }} --fail-on high
```

## Not Done

- No PR commenting.
- No GitHub API calls from the action.
- No extra permissions requested.
- No repository settings changed.
