# ScopeDiff v0.1.2 Release Notes

ScopeDiff v0.1.2 is a small hotfix release.

## What Changed

- Fixed `scopediff --version` so the CLI reads the installed package version from `package.json`.

## Why This Release Exists

`scopediff@0.1.1` was published successfully and its CLI commands work, but post-publish verification showed that `scopediff --version` still printed `0.1.0` because the value was hardcoded in the CLI entrypoint.

v0.1.2 fixes that version-reporting bug.

## What Did Not Change

This release does not add new detection rules, network behavior, telemetry, PR comments, or runtime enforcement.

## Install and Run

After npm publication:

```bash
npx scopediff@0.1.2 --version
npx scopediff@0.1.2 scan
npx scopediff@0.1.2 diff --base main
```

## Safety and Privacy

ScopeDiff remains local-first:

- No telemetry.
- No code upload.
- No hidden network service.
- No token storage.
- No execution of discovered commands.

## Upgrade Notes

No configuration changes are required.
