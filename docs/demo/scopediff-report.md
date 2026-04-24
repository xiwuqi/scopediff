# ScopeDiff Report

Repo: scopediff-demo-iLBqaN
Base: main
Head: HEAD
Generated: 2026-04-24T07:16:57.607Z

## Summary

Risk: Critical

ScopeDiff found 12 review-worthy agent/tooling changes. Highest risk: critical.

Counts:

- Critical: 2
- High: 7
- Medium: 3
- Low: 0

## Findings

### F001 - Workflow secret usage added

Severity: Critical
Category: workflow
File: `.github/workflows/ci.yml:14`
Rule: R014
Confidence: 0.90

Evidence:

```text
NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Current:

```json
"NPM_TOKEN: ${{ secrets.NPM_TOKEN }}"
```

Why it matters:

Secrets can publish, deploy, or access external systems.

Suggested review:

Confirm event triggers and environment protections.

### F002 - Sensitive workflow trigger added: pull_request_target

Severity: Critical
Category: workflow
File: `.github/workflows/ci.yml:3`
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

### F003 - Credential-like env var referenced: GITHUB_TOKEN

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

### F004 - MCP server added: github

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

### F005 - Unpinned remote package for MCP server: github

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

### F006 - Release or deployment operation added

Severity: High
Category: workflow
File: `.github/workflows/ci.yml:12`
Rule: R017
Confidence: 0.82

Evidence:

```text
- run: npm publish
```

Current:

```json
"- run: npm publish"
```

Why it matters:

Release operations can alter external systems.

Suggested review:

Check credentials, triggers, environments, and approvals.

### F007 - Workflow permission expanded: contents write

Severity: High
Category: workflow
File: `.github/workflows/ci.yml:5`
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

### F008 - Workflow permission expanded: pull-requests write

Severity: High
Category: workflow
File: `.github/workflows/ci.yml:6`
Rule: R012
Confidence: 0.95

Evidence:

```text
pull-requests: write
```

Previous:

```json
"none"
```

Current:

```json
"write"
```

Why it matters:

Workflow tokens may gain write access.

Suggested review:

Prefer job-level permissions and least privilege.

### F009 - Release or deployment operation added

Severity: High
Category: workflow
File: `.github/workflows/ci.yml:8`
Rule: R017
Confidence: 0.82

Evidence:

```text
release:
```

Current:

```json
"release:"
```

Why it matters:

Release operations can alter external systems.

Suggested review:

Check credentials, triggers, environments, and approvals.

### F010 - Executable command in MCP server: github

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

### F011 - High-privilege AGENTS.md instruction added

Severity: Medium
Category: instruction
File: `AGENTS.md:1`
Rule: R010
Confidence: 0.72

Evidence:

```text
Agent may read repository files, run shell commands, and push release changes after approval.
```

Current:

```json
"Agent may read repository files, run shell commands, and push release changes after approval."
```

Why it matters:

Agent instructions can influence reads, writes, shell use, and publishing.

Suggested review:

Confirm the instruction is intended and bounded.

### F012 - MCP env variable added: GITHUB_TOKEN

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
