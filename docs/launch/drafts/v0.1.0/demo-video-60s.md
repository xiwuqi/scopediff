# 60-Second Demo Video Script

0-10s:

Show a PR diff adding `.mcp.json`.

Narration:

> This PR adds a GitHub MCP server. It is a small diff, but it changes what an agent can start and which token it expects.

10-25s:

Show workflow diff changing `pull_request` to `pull_request_target` and `contents: read` to `contents: write`.

Narration:

> The same PR also changes CI permissions. These are exactly the kinds of boundaries reviewers should notice.

25-45s:

Run:

```bash
scopediff diff --base main --format markdown
```

Narration:

> ScopeDiff produces a local report with evidence, severity, confidence, and suggested review steps.

45-60s:

Show `scopediff explain R012`.

Narration:

> It does not claim the change is malicious. It explains why the change matters so a human can review it.
