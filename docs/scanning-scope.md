# Scanning Scope

ScopeDiff scans a narrow set of files that commonly define AI agent tools, instructions, CI permissions, package lifecycle hooks, and local execution boundaries.

| Path pattern                      | Why scan                                                                | MVP parsing                        | Not supported in MVP                         | False-positive control                                 | Future enhancements                         |
| --------------------------------- | ----------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------- | ------------------------------------------------------ | ------------------------------------------- |
| `.mcp.json`                       | Project-level MCP servers can add agent tools                           | JSON parse, inspect `mcpServers`   | Nonstandard comments, dynamic includes       | Only inspect known MCP-shaped keys                     | Support JSONC and client-specific variants  |
| `mcp.json`                        | Some clients use root MCP config                                        | JSON parse                         | Custom schemas                               | Require object-shaped server entries                   | Schema adapters                             |
| `.cursor/mcp.json`                | Cursor MCP setup may differ from root config                            | JSON parse                         | Workspace inheritance                        | Report file path and server key                        | Cursor-specific schema docs                 |
| `.cursor/rules/**`                | Cursor rules can instruct read/write/execute/network behavior           | Text scan and diff added lines     | Full semantic interpretation                 | Low/medium confidence for prose                        | Rule frontmatter parsing                    |
| `.claude/settings.json`           | Claude settings may include permissions and tool config                 | JSON parse                         | Global settings outside repo                 | Only scan repo-local file                              | Optional user-level scan with explicit flag |
| `.claude/skills/**/SKILL.md`      | Skills can teach agents new behaviors                                   | Markdown/text scan                 | Skill package validation                     | Focus on added high-impact verbs and commands          | Skill manifest parsing                      |
| `AGENTS.md`                       | Cross-tool project instructions for agents                              | Markdown/text scan                 | Nested precedence rules                      | Line-level evidence and confidence                     | Spec-aware parser                           |
| `CLAUDE.md`                       | Claude-specific project instructions                                    | Markdown/text scan                 | Imported docs                                | Same as instruction files                              | Client adapters                             |
| `GEMINI.md`                       | Gemini-specific project instructions                                    | Markdown/text scan                 | Imported docs                                | Same as instruction files                              | Client adapters                             |
| `.github/copilot-instructions.md` | Copilot repo instructions can influence coding agent behavior           | Markdown/text scan                 | Organization-level instructions              | Same as instruction files                              | GitHub-specific guidance                    |
| `.github/workflows/*.yml`         | CI can expand permissions, triggers, secrets, publish/deploy operations | YAML parse with fallback text scan | Reusable workflow expansion                  | Report only direct file evidence                       | Resolve local reusable workflows            |
| `.github/workflows/*.yaml`        | Same as above                                                           | YAML parse with fallback text scan | Same as above                                | Same as above                                          | Same as above                               |
| `package.json`                    | Lifecycle scripts can run during install and agent setup                | JSON parse scripts                 | Workspace-level inherited scripts            | Only high-risk lifecycle names and suspicious commands | Dependency script analysis                  |
| `pnpm-workspace.yaml`             | Workspace config can change package discovery                           | YAML parse                         | Full pnpm resolution                         | Low severity unless paired with script changes         | Workspace graph                             |
| `docker-compose.yml`              | Compose may grant host access or privileged containers                  | YAML parse and text fallback       | Compose profiles and includes                | Only flag known high-risk keys                         | Compose normalization                       |
| `Dockerfile`                      | Docker images can run root, curl scripts, or expose network behavior    | Text scan                          | Multi-stage semantic analysis                | Evidence by line                                       | Dockerfile AST parser                       |
| `.env.example`                    | Example env can reveal expected tokens and permissions                  | Text scan for variable names       | Real `.env` files are not scanned by default | Only scan example files, never `.env` by default       | Explicit secret hygiene mode                |
| `docs/**/*agent*`                 | Setup docs can introduce agent install commands                         | Text scan                          | All docs semantics                           | Lower confidence for docs-only findings                | Link findings to setup sections             |
| `docs/**/*mcp*`                   | MCP setup docs may show commands and env requirements                   | Text scan                          | Same                                         | Lower confidence unless executable command present     | Docs command block parser                   |
| `docs/**/*cursor*`                | Cursor setup docs may define rules/tools                                | Text scan                          | Same                                         | Same                                                   | Same                                        |
| `docs/**/*claude*`                | Claude setup docs may define skills/tools                               | Text scan                          | Same                                         | Same                                                   | Same                                        |

## Files Deliberately Excluded by Default

- `.env`, `.env.local`, `.env.*.local`: may contain private secrets.
- `node_modules/**`, `.git/**`, build outputs, lockfile internals in MVP.
- Binary files and files above the configured size limit.
- User home directory configs unless the user explicitly passes a future `--include-user-config` flag.

## Large Files and Symlinks

- MVP skips files over 1 MB by default and records them in `skippedFiles`.
- MVP should not follow symlinks outside the repository root.
- If a symlink points inside the repository, treat it as a file only once after resolving the real path.

## Diff Scope

`scopediff diff --base main` should inspect only files changed between base and head, plus related files needed for context when cheap and local.
