# Issue Draft: Add More GitHub Actions Permission Expansion Cases

Title:

```text
Add more GitHub Actions permission expansion cases
```

Labels:

```text
help wanted, tests, github-actions
```

Body:

```md
ScopeDiff detects basic workflow permission expansion. More fixtures would help cover real GitHub Actions edge cases.

Useful cases may include:

- top-level permissions vs job-level permissions
- `read-all` to `write-all`
- adding `id-token: write`
- adding `packages: write`
- permissions expansion in a release workflow
```

Acceptance criteria:

- Add fixtures for at least two new permission cases.
- Add tests for expected severity and rule ids.
- Keep findings explainable and conservative.
- `npm run check` passes.

Context:

Workflow permissions are one of the highest-value review surfaces for ScopeDiff.

How to test:

```bash
npm test -- tests/rules.test.ts
```
