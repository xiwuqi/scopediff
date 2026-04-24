# Name and Release Check

Checked on: 2026-04-24.

Network checks were performed from the local workspace using npm registry queries and GitHub public endpoints. These are availability signals, not a reservation or legal clearance.

## Results

| Name             | npm signal                                                                  | GitHub signal                                                                                                        | Notes                                                                                              |
| ---------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `scopediff`      | `npm view scopediff` returned 404                                           | GitHub repository search found `belamadrid/scopediff`; `https://github.com/scopediff` returned 404 for user/org page | npm package appears unclaimed at check time; repo name is not globally unique and depends on owner |
| `AgentScopeDiff` | Invalid npm package form because npm names cannot contain uppercase letters | `https://github.com/AgentScopeDiff` returned 404                                                                     | Use lowercase `agentscopediff` for npm                                                             |
| `AgentPermDiff`  | Invalid npm package form because npm names cannot contain uppercase letters | `https://github.com/AgentPermDiff` returned 404                                                                      | Use lowercase `agentpermdiff` for npm                                                              |
| `ToolScope`      | Invalid npm package form because npm names cannot contain uppercase letters | GitHub search found existing `dengmengjie/ToolScope`; `https://github.com/ToolScope` returned 404                    | Potential naming conflict/confusion                                                                |
| `MCPDiff`        | Invalid npm package form because npm names cannot contain uppercase letters | `https://github.com/MCPDiff` returned 404                                                                            | Use lowercase `mcpdiff` for npm                                                                    |
| `AgentDiffGuard` | Invalid npm package form because npm names cannot contain uppercase letters | `https://github.com/AgentDiffGuard` returned 404                                                                     | Use lowercase `agentdiffguard` for npm                                                             |
| `agentscopediff` | npm returned 404                                                            | `https://github.com/agentscopediff` returned 404                                                                     | Possible fallback                                                                                  |
| `agentpermdiff`  | npm returned 404                                                            | `https://github.com/agentpermdiff` returned 404                                                                      | Possible fallback                                                                                  |
| `toolscope`      | npm returned 404                                                            | `https://github.com/toolscope` returned 404, but GitHub has `ToolScope` repo under another owner                     | Avoid if possible                                                                                  |
| `mcpdiff`        | npm returned 404                                                            | `https://github.com/mcpdiff` returned 404                                                                            | Narrower than project scope                                                                        |
| `agentdiffguard` | npm returned 404                                                            | `https://github.com/agentdiffguard` returned 404                                                                     | More security-marketing tone                                                                       |

## Recommendation

Use:

- npm package: `scopediff`, if still available when publishing.
- GitHub repo: `<your-owner>/scopediff`, if available under your account or organization.

Avoid claiming that the GitHub name is globally available. GitHub repository names are scoped to an owner.

## Manual Checks Before Release

1. Visit `https://www.npmjs.com/package/scopediff`.
2. Run `npm view scopediff`.
3. Check your intended GitHub owner path, for example `https://github.com/<owner>/scopediff`.
4. Search GitHub repositories for exact and similar names.
5. Check for trademarks or confusingly similar security products.
6. Reserve npm package only when ready to publish a real package.
7. Do not squat names without intent to publish.
