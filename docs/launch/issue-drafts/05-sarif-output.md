# Issue Draft: Support SARIF Output

Title:

```text
Support SARIF output
```

Labels:

```text
roadmap, help wanted, output-format
```

Body:

```md
ScopeDiff currently supports Markdown and JSON reports. SARIF output would make it easier to integrate findings with GitHub code scanning and other review tools.

This should be designed carefully so ScopeDiff remains a review aid and does not imply complete vulnerability scanning coverage.
```

Acceptance criteria:

- Propose a SARIF mapping for ScopeDiff findings.
- Add `--format sarif`.
- Add renderer tests.
- Include at least one fixture-based integration test.
- Document limitations.

Context:

SARIF is useful for CI review surfaces, but it is not part of v0.1.0.

How to test:

```bash
npm run check
```
