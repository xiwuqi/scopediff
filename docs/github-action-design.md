# GitHub Action Design

## MVP Shape

MVP can run directly through `npx scopediff ci`. A first-class marketplace action can be added later as a thin wrapper.

## Defaults

- Writes GitHub Step Summary.
- Does not comment on PRs.
- Does not fetch remote refs unless the workflow checkout step does so.
- Does not request broad permissions.
- Fails only according to configured `fail-on`.

## Inputs

Future action inputs:

- `base`: base ref, default `${{ github.base_ref || github.event.repository.default_branch }}`
- `fail-on`: `none`, `medium`, `high`, `critical`; default `high`
- `format`: `markdown` or `json`; default `markdown`
- `output`: optional path for artifact/report
- `comment-pr`: boolean, default `false`

## `comment-pr` Policy

`comment-pr` is not part of MVP default behavior. If implemented later:

- Must default to `false`.
- Must document required permissions.
- Must avoid duplicate spam comments.
- Must support update-in-place.
- Must never comment without explicit workflow config.

## Minimal Workflow Example

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
        run: npx scopediff ci --base origin/${{ github.base_ref }} --fail-on high
```

## Recommended Permissions

For MVP:

```yaml
permissions:
  contents: read
```

If future PR comments are enabled:

```yaml
permissions:
  contents: read
  pull-requests: write
```

Only request `pull-requests: write` when `comment-pr: true`.

## Security Notes

- Prefer `pull_request` over `pull_request_target` for ScopeDiff itself unless a carefully reviewed reason exists.
- Do not pass secrets to ScopeDiff.
- Use `fetch-depth: 0` or a checkout strategy that makes the base ref available locally.
- ScopeDiff should not execute repository scripts.
- ScopeDiff should not evaluate workflow expressions.
- If running on untrusted forks, keep token permissions read-only.

## Future Published Action

Possible `action.yml`:

```yaml
name: ScopeDiff
description: Review AI agent and tooling permission changes before merge.
inputs:
  base:
    required: false
  fail-on:
    required: false
    default: high
  comment-pr:
    required: false
    default: "false"
runs:
  using: node20
  main: dist/action/index.js
```

The action wrapper should call the same core modules as the CLI.
