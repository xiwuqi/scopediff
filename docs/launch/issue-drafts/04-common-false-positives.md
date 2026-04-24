# Issue Draft: Add Docs for Common False Positives

Title:

```text
Add docs for common false positives
```

Labels:

```text
help wanted, docs, false-positive
```

Body:

```md
ScopeDiff should be conservative and explainable. A short false-positive guide would help users understand when a finding is informational rather than urgent.

Examples:

- docs-only URLs
- negative instructions like "do not push"
- official actions pinned by version tag instead of SHA
- dev-only Docker compose files
```

Acceptance criteria:

- Add a docs page for common false positives.
- Include practical review guidance.
- Avoid dismissing user concerns.
- Link the page from README or relevant docs.

Context:

False positives are expected in v0.1.0. The project should make them easy to report and reason about.

How to test:

```bash
npm run format:check
```
