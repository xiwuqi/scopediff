# Issue Draft: Improve README Example Report

Title:

```text
Improve README example report
```

Labels:

```text
good first issue, docs
```

Body:

```md
The README includes a short example report. It should stay accurate, readable, and not overstate ScopeDiff's capabilities.

Please improve the example if you see a way to make it clearer for first-time users.
```

Acceptance criteria:

- The example remains consistent with real CLI output.
- The limitation that ScopeDiff is a review aid remains visible.
- No claim is added that ScopeDiff prevents all attacks or performs a complete security audit.
- `npm run check` passes if code is touched.

Context:

README clarity matters because most users will decide in the first screen whether the tool is useful.

How to test:

```bash
node dist/cli.js scan
```
