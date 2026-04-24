# Test Plan

Tests should be fixture-driven and deterministic. Each fixture should include expected findings, severity, category, confidence range, and stable output snapshots where practical.

| Case                                        | Fixture idea                                       | Expected result                                     |
| ------------------------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| 1. Empty repository                         | Directory with no matching files                   | No findings, no errors, risk low                    |
| 2. Directory without git history            | Plain temp directory with `.mcp.json`              | `scan` works, `diff` returns clear git error        |
| 3. Added `.mcp.json`                        | Before missing, after with `mcpServers.github`     | R001 high finding                                   |
| 4. Modified MCP command                     | `command: npx` to `command: bash`                  | R002 high finding                                   |
| 5. Added `GITHUB_TOKEN` env                 | Add env key in MCP config                          | R004 medium and R005 high                           |
| 6. `npx` latest risk                        | `args: ["-y", "@scope/server"]`                    | R007 high                                           |
| 7. Docker privileged risk                   | Compose adds `privileged: true`                    | R009 high                                           |
| 8. Workflow permissions expansion           | `contents: read` to `contents: write`              | R012 high                                           |
| 9. `pull_request_target` added              | Workflow trigger changes                           | R013 high                                           |
| 10. `postinstall` added                     | package script added                               | R016 high                                           |
| 11. `AGENTS.md` high-permission instruction | Added "you may push and deploy"                    | R010 medium/high depending context                  |
| 12. Cursor shell instruction                | Rule adds shell execution guidance                 | R011 medium                                         |
| 13. Claude skill network/write instruction  | `SKILL.md` adds fetch/write behavior               | R011 medium                                         |
| 14. YAML parse failure                      | Broken workflow YAML                               | Recoverable error plus text fallback                |
| 15. JSON parse failure                      | Broken `.mcp.json`                                 | Recoverable error, no structured MCP findings       |
| 16. Large file skip                         | File over max size                                 | Record in `skippedFiles`                            |
| 17. Symlink handling                        | Symlink to outside root                            | Skip or record without following outside root       |
| 18. Windows path compatibility              | Fixture paths normalized with backslashes in tests | Report uses repo-relative POSIX style               |
| 19. Markdown renderer stability             | Known report JSON                                  | Snapshot stable Markdown                            |
| 20. JSON schema stability                   | Known fixture report                               | Zod validation passes and field order stable enough |

## Unit Tests

- Path normalization.
- File discovery ignore rules.
- YAML parse fallback.
- JSON parse fallback.
- MCP config normalization.
- Workflow permission comparison.
- Instruction keyword detection with simple negation.
- Package lifecycle script detection.
- Docker risk detection.
- Severity adjustment logic.

## Integration Tests

- `scan` on fixture directories.
- `diff` using temporary git repositories with before/after commits.
- `ci --fail-on high` exit code behavior.
- Step Summary write behavior using a temporary `GITHUB_STEP_SUMMARY`.

## Negative Tests

- No finding for `do not push`.
- No finding for `.env` because it is excluded.
- No high severity for docs-only plain URL.
- No duplicate findings when the same file is reachable through an internal symlink.

## Manual Verification Before Release

- Run quick start commands from README.
- Run CLI on this repository.
- Run CLI on a sample repo with a real `.github/workflows` directory.
- Confirm no network calls are made by default.
