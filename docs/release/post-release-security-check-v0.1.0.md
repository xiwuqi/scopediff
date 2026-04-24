# Post-Release Security Check: v0.1.0

Date: 2026-04-24

## Scope

This check only covered the ScopeDiff repository working tree and git tracked files.

It did not read:

- `~/.npmrc`
- `~/.config/gh/hosts.yml`
- browser cookies
- npm tokens
- GitHub tokens
- password or 2FA material

## Checks

- Confirmed whether `.npmrc` exists in the repository root.
- Scanned git tracked files for token-shaped npm values.
- Scanned git tracked files for npm auth-token assignments with non-placeholder values.
- Scanned git tracked files for the standard npm auth environment variable name.
- Scanned git tracked files for GitHub token-shaped values outside the ordinary `GITHUB_TOKEN` placeholder.
- Scanned git tracked files for private-key markers.

## Result

No suspected npm token or auth token was found in tracked repository files.

No blocking issue was found.

## Notes

The temporary npm publish token used during release was reported as deleted by the maintainer after publication. It is not required for future local development.

Do not include real secrets, npm tokens, GitHub tokens, private customer data, or private repository content in future public issues, discussions, docs, or launch posts.
