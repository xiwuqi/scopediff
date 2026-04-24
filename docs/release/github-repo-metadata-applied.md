# GitHub Repository Metadata Applied

Date: 2026-04-24

Repository: `xiwuqi/scopediff`

## Allowed Changes

Only the following repository metadata fields were modified:

- description
- homepage
- topics

No visibility, branch protection, collaborator, secret, deploy key, default branch, release, tag, package permission, or GitHub Actions secret settings were changed.

## Before

```json
{
  "description": "AI agent permission and tooling surface diffs for pull request review.",
  "homepageUrl": "",
  "repositoryTopics": null
}
```

## After

```json
{
  "description": "Review AI agent, MCP, and workflow permission changes before merge.",
  "homepageUrl": "https://www.npmjs.com/package/scopediff",
  "repositoryTopics": [
    "ai-agents",
    "cli",
    "code-review",
    "devtools",
    "github-actions",
    "mcp",
    "model-context-protocol",
    "security-tools",
    "supply-chain-security",
    "typescript"
  ]
}
```

## Commands Used

```bash
gh repo edit xiwuqi/scopediff \
  --description "Review AI agent, MCP, and workflow permission changes before merge." \
  --homepage "https://www.npmjs.com/package/scopediff" \
  --add-topic ai-agents \
  --add-topic mcp \
  --add-topic model-context-protocol \
  --add-topic github-actions \
  --add-topic code-review \
  --add-topic security-tools \
  --add-topic supply-chain-security \
  --add-topic cli \
  --add-topic typescript \
  --add-topic devtools
```

## Verification

Verified with:

```bash
gh repo view xiwuqi/scopediff --json description,homepageUrl,repositoryTopics
```
