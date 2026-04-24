# Report Format and JSON Schema

ScopeDiff reports must support Markdown and JSON. JSON is the source of truth for CI and tooling. Markdown is for human review.

## Finding Fields

- `id`: stable finding id for this report, such as `F001`.
- `title`: short human-readable title.
- `severity`: `low`, `medium`, `high`, or `critical`.
- `category`: rule category, such as `mcp`, `workflow`, `instruction`, `package`, `docker`, `transparency`.
- `file`: repository-relative file path.
- `lineStart`: first line for evidence, or `null`.
- `lineEnd`: last line for evidence, or `null`.
- `evidence`: short extracted evidence. Must not include secret values.
- `previousValue`: previous normalized value when diff mode has it.
- `currentValue`: current normalized value when available.
- `whyItMatters`: concise explanation.
- `suggestedReview`: specific human review step.
- `confidence`: number from `0` to `1`.
- `isNewCapability`: boolean.
- `isPermissionExpansion`: boolean.
- `relatedFiles`: array of repository-relative paths.
- `docsUrl`: optional docs URL.
- `ruleId`: stable rule id, such as `R012`.

## Report Fields

- `repo`: repo name or local path.
- `baseRef`: base ref or `null`.
- `headRef`: head ref or `null`.
- `generatedAt`: ISO timestamp.
- `summary`: human summary.
- `riskLevel`: `low`, `medium`, `high`, or `critical`.
- `findings`: array of findings.
- `countsBySeverity`: severity counts.
- `countsByCategory`: category counts.
- `skippedFiles`: skipped file records.
- `errors`: non-fatal errors.
- `nextReviewActions`: ordered review checklist.

## JSON Example

```json
{
  "repo": "example/scope-demo",
  "baseRef": "main",
  "headRef": "feature/add-github-mcp",
  "generatedAt": "2026-04-24T03:45:00.000Z",
  "summary": "ScopeDiff found 3 review-worthy agent/tooling changes. Highest risk: high.",
  "riskLevel": "high",
  "findings": [
    {
      "id": "F001",
      "title": "MCP server added: github",
      "severity": "high",
      "category": "mcp",
      "file": ".mcp.json",
      "lineStart": 3,
      "lineEnd": 10,
      "evidence": "mcpServers.github.command = npx",
      "previousValue": null,
      "currentValue": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "envKeys": ["GITHUB_TOKEN"]
      },
      "whyItMatters": "A new MCP server can give an AI agent access to new tools and external systems.",
      "suggestedReview": "Confirm the server is needed, pin the package version, and use the least-privileged token possible.",
      "confidence": 0.95,
      "isNewCapability": true,
      "isPermissionExpansion": true,
      "relatedFiles": [".github/workflows/scopediff.yml"],
      "docsUrl": "https://github.com/your-org/scopediff/docs/rules/R001",
      "ruleId": "R001"
    },
    {
      "id": "F002",
      "title": "Credential-like env var referenced: GITHUB_TOKEN",
      "severity": "high",
      "category": "credential",
      "file": ".mcp.json",
      "lineStart": 8,
      "lineEnd": 8,
      "evidence": "env key GITHUB_TOKEN",
      "previousValue": null,
      "currentValue": "GITHUB_TOKEN",
      "whyItMatters": "Credential-like variables may grant access to external services or repositories.",
      "suggestedReview": "Check the token scope and prefer read-only access for first setup.",
      "confidence": 0.9,
      "isNewCapability": true,
      "isPermissionExpansion": true,
      "relatedFiles": [],
      "docsUrl": "https://github.com/your-org/scopediff/docs/rules/R005",
      "ruleId": "R005"
    }
  ],
  "countsBySeverity": {
    "critical": 0,
    "high": 2,
    "medium": 1,
    "low": 0
  },
  "countsByCategory": {
    "mcp": 1,
    "credential": 1,
    "package": 1
  },
  "skippedFiles": [
    {
      "file": "docs/large-agent-log.md",
      "reason": "file exceeds max size",
      "sizeBytes": 2400000
    }
  ],
  "errors": [
    {
      "file": ".github/workflows/broken.yml",
      "message": "YAML parse failed; used text fallback",
      "recoverable": true
    }
  ],
  "nextReviewActions": [
    "Review the new github MCP server and token scope.",
    "Pin remote packages or actions where practical.",
    "Check whether workflow permissions changed in the same PR."
  ]
}
```

## Markdown Example

````md
# ScopeDiff Report

Repo: example/scope-demo
Base: main
Head: feature/add-github-mcp
Generated: 2026-04-24T03:45:00.000Z

## Summary

Risk: High

ScopeDiff found 3 review-worthy agent/tooling changes.

Counts:

- Critical: 0
- High: 2
- Medium: 1
- Low: 0

## Findings

### F001 - MCP server added: github

Severity: High
Category: mcp
File: `.mcp.json:3`
Rule: R001
Confidence: 0.95

Evidence:

```text
mcpServers.github.command = npx
```
````

Why it matters:

A new MCP server can give an AI agent access to new tools and external systems.

Suggested review:

Confirm the server is needed, pin the package version, and use the least-privileged token possible.

### F002 - Credential-like env var referenced: GITHUB_TOKEN

Severity: High
Category: credential
File: `.mcp.json:8`
Rule: R005
Confidence: 0.90

Evidence:

```text
env key GITHUB_TOKEN
```

Suggested review:

Check the token scope and prefer read-only access for first setup.

## Next Review Actions

1. Review the new github MCP server and token scope.
2. Pin remote packages or actions where practical.
3. Check whether workflow permissions changed in the same PR.

## Limitations

ScopeDiff is an audit aid. It does not execute tools, verify package reputation, or prove whether a change is malicious.

```

## JSON Schema Shape

The implementation should define this with Zod and export a generated JSON Schema later if useful. MVP only needs runtime validation in tests and renderer boundaries.

```
