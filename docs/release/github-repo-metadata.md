# GitHub Repository Metadata Suggestions

Do not execute these changes without explicit approval.

## Recommended Description

```text
AI agent permission and tooling surface diffs for pull request review.
```

## Recommended Topics

```text
ai-agent
mcp
model-context-protocol
github-actions
developer-tools
cli
security-tools
typescript
open-source
permissions
```

## Recommended Homepage

Leave empty for v0.1.0 unless a docs/demo page is published later.

## About Section Copy

```text
ScopeDiff helps maintainers review PRs that change AI agent, MCP, workflow, package, Docker, or instruction-file capability boundaries.
```

## Pinned README Tagline

```text
This PR gives your AI agent new powers. Review them before merge.
```

## Social Preview Image Prompt

```text
A clean developer-tool social preview for "ScopeDiff". Dark terminal window on the left with a concise report: "Risk: High", "MCP server added", "Workflow permission expanded". On the right, a simple diff icon and the tagline "Review agent permissions before merge." Professional, minimal, high contrast, no fear-based imagery, no locks or hacker cliches.
```

## Discussions

Recommendation: enable later, after at least one release and a few real user questions. Issues are enough for v0.1.0.

## Issues

Recommendation: keep Issues enabled. The repository already includes issue templates for bugs, features, and false positives.

## First Good Issues

Recommendation: create after v0.1.0 release, using the drafts in `docs/launch/issue-drafts/`.

## Command Drafts

Do not run without approval:

```bash
gh repo edit xiwuqi/scopediff \
  --description "AI agent permission and tooling surface diffs for pull request review."

gh repo edit xiwuqi/scopediff \
  --add-topic ai-agent \
  --add-topic mcp \
  --add-topic model-context-protocol \
  --add-topic github-actions \
  --add-topic developer-tools \
  --add-topic cli \
  --add-topic security-tools \
  --add-topic typescript \
  --add-topic permissions
```
