# ScopeDiff Report

Repo: repo
Base: main
Head: HEAD
Generated: 2026-04-24T05:02:47.453Z

## Summary

Risk: Critical

ScopeDiff found 7 review-worthy agent/tooling changes. Highest risk: critical.

Counts:

- Critical: 1
- High: 4
- Medium: 2
- Low: 0

## Findings

### F001 - Sensitive workflow trigger added: pull_request_target

Severity: Critical
Category: workflow
File: `.github/workflows/ci.yml:1`
Rule: R013
Confidence: 0.95

Evidence:

```text
on: pull_request_target
```

Current:

```json
"pull_request_target"
```

Why it matters:

Some triggers can run with elevated context or external input.

Suggested review:

Review fork behavior, token permissions, and secret exposure.

### F002 - Credential-like env var referenced: GITHUB_TOKEN

Severity: High
Category: credential
File: `.mcp.json:10`
Rule: R005
Confidence: 0.90

Evidence:

```text
env key GITHUB_TOKEN
```

Current:

```json
"GITHUB_TOKEN"
```

Why it matters:

Credential-like variables may grant access to external systems.

Suggested review:

Check token scope and avoid real values in the repository.

### F003 - MCP server added: github

Severity: High
Category: mcp
File: `.mcp.json:3`
Rule: R001
Confidence: 0.95

Evidence:

```text
mcpServers.github.command = npx
```

Current:

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "envKeys": ["GITHUB_TOKEN"]
}
```

Why it matters:

MCP servers expose tools that agents can call.

Suggested review:

Confirm the server is needed, trusted, and least-privileged.

### F004 - Unpinned remote package for MCP server: github

Severity: High
Category: package
File: `.mcp.json:7`
Rule: R007
Confidence: 0.85

Evidence:

```text
npx -y @modelcontextprotocol/server-github
```

Current:

```json
"npx -y @modelcontextprotocol/server-github"
```

Why it matters:

Unpinned remote packages can change between installs.

Suggested review:

Pin package versions or image digests where practical.

### F005 - Workflow permission expanded: contents write

Severity: High
Category: workflow
File: `.github/workflows/ci.yml:3`
Rule: R012
Confidence: 0.95

Evidence:

```text
contents: write
```

Previous:

```json
"read"
```

Current:

```json
"write"
```

Why it matters:

Workflow tokens may gain write access.

Suggested review:

Prefer job-level permissions and least privilege.

### F006 - Executable command in MCP server: github

Severity: Medium
Category: execution
File: `.mcp.json:4`
Rule: R006
Confidence: 0.85

Evidence:

```text
npx -y @modelcontextprotocol/server-github
```

Current:

```json
"npx -y @modelcontextprotocol/server-github"
```

Why it matters:

Agent configuration may launch local executables.

Suggested review:

Review command source and arguments.

### F007 - MCP env variable added: GITHUB_TOKEN

Severity: Medium
Category: mcp
File: `.mcp.json:10`
Rule: R004
Confidence: 0.90

Evidence:

```text
env key GITHUB_TOKEN
```

Current:

```json
"GITHUB_TOKEN"
```

Why it matters:

Environment variables can give tools access to services or credentials.

Suggested review:

Confirm each variable is needed and scoped.

## Next Review Actions

1. Check workflow triggers, token permissions, and secret usage before merge.
2. Review new MCP servers, commands, arguments, and token scopes.
3. Pin remote packages where practical and review lifecycle scripts.

## Limitations

ScopeDiff is an audit aid. It does not execute tools, verify package reputation, or prove whether a change is malicious.
