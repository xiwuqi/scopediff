# 90-Second Launch Video Script

0-15s:

> AI agents are adding new review surfaces to repositories: MCP servers, instruction files, package scripts, and workflow permissions.

15-30s:

Show a simple PR diff.

> This PR adds a GitHub MCP server, uses `GITHUB_TOKEN`, runs an unpinned `npx` package, and expands GitHub Actions permissions.

30-55s:

Run ScopeDiff.

```bash
scopediff diff --base main
```

> ScopeDiff turns those changes into a report. It shows the evidence, why it matters, and what to review.

55-70s:

Show safety/privacy section.

> It runs locally by default. No telemetry, no code upload, no `.env` reading, and no PR comments by default.

70-90s:

> ScopeDiff v0.1.0 is an MVP. I’m looking for feedback on false positives and missing agent config formats.

End card:

```text
github.com/xiwuqi/scopediff
```
