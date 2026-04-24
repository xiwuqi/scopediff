# Reddit r/github Draft

Rule check required before posting.

Title:

```text
Tool for reviewing GitHub Actions + AI agent permission changes before merge
```

Body:

```text
I’m working on ScopeDiff, a local CLI that generates a review report when a PR changes AI agent/tooling surfaces in a repo.

The GitHub-specific parts it checks include:

- workflow permission expansion, for example contents: read -> contents: write
- sensitive triggers like pull_request_target
- new secrets usage
- external actions not pinned to a commit SHA

It also checks MCP config and agent instruction files, but the core workflow is PR review.

It does not comment on PRs by default and only writes a GitHub Step Summary in CI.

Repo: https://github.com/xiwuqi/scopediff

I’d appreciate feedback from maintainers on whether this report shape would be useful or too noisy.
```
