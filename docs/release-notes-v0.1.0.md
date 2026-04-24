# ScopeDiff v0.1.0 Release Notes Draft

ScopeDiff v0.1.0 is the first MVP release of a local-first CLI for reviewing AI agent and tooling permission changes before merge.

Highlights:

- Scan current repositories for MCP, agent instruction, workflow, package, Docker, and config risk signals.
- Compare a branch against a base ref with `scopediff diff --base main`.
- Generate Markdown and JSON reports.
- Run in CI with `scopediff ci --fail-on high`.
- Write GitHub Step Summary by default in GitHub Actions.

Limitations:

- ScopeDiff is an audit aid, not a complete security audit.
- It does not execute tools, verify package reputation, or block runtime behavior.
- PR comments are not enabled by default.
