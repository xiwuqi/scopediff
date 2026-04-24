# Reddit MCP-Related Community Draft

Community fit is uncertain. Before posting, manually check whether `r/mcp`, `r/ModelContextProtocol`, or another MCP-related subreddit exists, is active, and allows project sharing.

Do not post if the community is not clearly about Model Context Protocol or if self-promotion rules are unclear.

Title:

```text
Local review tool for MCP config changes in pull requests
```

Body:

```text
I’m the author of ScopeDiff, a small local CLI that reports review-worthy changes to MCP and agent-related repo files.

For MCP config, it can flag things like:

- new MCP servers
- command/args changes
- credential-like env vars such as GITHUB_TOKEN
- unpinned npx/uvx/pipx package usage
- remote URLs or script execution patterns

It also checks GitHub Actions and agent instruction files because those often change in the same PR.

This is not a complete MCP security scanner or firewall. It does not execute servers or upload code. I’m mainly looking for feedback on real-world MCP config shapes and false positives.

Repo: https://github.com/xiwuqi/scopediff
```
