# MVP Acceptance Criteria

ScopeDiff MVP is accepted only when all criteria below are met.

## Runtime and Commands

- [ ] Can run through `npx scopediff scan` after package publication or through local npm script before publication.
- [ ] Can scan the current repository or directory.
- [ ] Can compare a base branch/ref and current branch/head.
- [ ] Can generate Markdown report.
- [ ] Can generate JSON report.
- [ ] Can run in GitHub Actions through `npx scopediff ci`.
- [ ] Can write report or summary to GitHub Step Summary.

## Rule Coverage

MVP must detect at least 10 high-value risk categories:

- [ ] MCP server added/removed/modified.
- [ ] MCP command changed.
- [ ] MCP args changed.
- [ ] Credential-like env variable added.
- [ ] Unpinned `npx`/remote package usage.
- [ ] Docker privileged or host access setting.
- [ ] GitHub Actions permissions expansion.
- [ ] Sensitive GitHub Actions trigger added.
- [ ] Workflow secret usage added.
- [ ] External action not pinned to SHA.
- [ ] `package.json` lifecycle script added.
- [ ] High-privilege agent instruction added.

## Safety and Privacy

- [ ] Defaults to no network access.
- [ ] Does not upload repository contents.
- [ ] Does not read `.env` by default.
- [ ] Does not store tokens.
- [ ] Does not include telemetry.
- [ ] Does not execute discovered commands.
- [ ] Does not comment on PRs by default.

## Quality

- [ ] All core rules have fixture tests.
- [ ] Markdown renderer output is stable.
- [ ] JSON output shape is stable and validated.
- [ ] README commands are real and verified.
- [ ] Errors are understandable to a normal developer.
- [ ] No hardcoded tokens, secrets, or credentials.
- [ ] Lint passes.
- [ ] Tests pass in CI.

## GitHub Quality

- [ ] README exists.
- [ ] License exists.
- [ ] CONTRIBUTING exists.
- [ ] SECURITY exists.
- [ ] CODE_OF_CONDUCT exists.
- [ ] Issue templates exist.
- [ ] PR template exists.
- [ ] CI workflow exists.
- [ ] Release notes draft exists.

## Non-Acceptance

MVP is not accepted if:

- It requires users to log in.
- It sends code or reports to a remote service by default.
- It claims to prevent all agent attacks.
- It fails on normal repos with no agent files.
- It reports every keyword match as high severity.
- It publishes comments, posts, or messages without explicit opt-in.
