# GitHub Issue Create Command Drafts

These commands are drafts only. Do not run them without explicit maintainer approval.

Labels may need to exist before these commands succeed. Do not create or modify labels without approval.

## 1. Improve README Example Report

```bash
gh issue create \
  --repo xiwuqi/scopediff \
  --title "Improve README example report" \
  --label "good first issue" \
  --label "docs" \
  --body-file docs/launch/issue-drafts/02-readme-example-report.md
```

## 2. Add Fixture for Another MCP Config Shape

```bash
gh issue create \
  --repo xiwuqi/scopediff \
  --title "Add fixture for another MCP config shape" \
  --label "good first issue" \
  --label "tests" \
  --label "mcp" \
  --body-file docs/launch/issue-drafts/01-mcp-config-shape.md
```

## 3. Add Docs for Common False Positives

```bash
gh issue create \
  --repo xiwuqi/scopediff \
  --title "Add docs for common false positives" \
  --label "help wanted" \
  --label "docs" \
  --label "false-positive" \
  --body-file docs/launch/issue-drafts/04-common-false-positives.md
```

## 4. Add More GitHub Actions Permission Expansion Cases

```bash
gh issue create \
  --repo xiwuqi/scopediff \
  --title "Add more GitHub Actions permission expansion cases" \
  --label "help wanted" \
  --label "tests" \
  --label "github-actions" \
  --body-file docs/launch/issue-drafts/03-actions-permission-cases.md
```

## 5. Support SARIF Output

```bash
gh issue create \
  --repo xiwuqi/scopediff \
  --title "Support SARIF output" \
  --label "roadmap" \
  --label "help wanted" \
  --label "output-format" \
  --body-file docs/launch/issue-drafts/05-sarif-output.md
```

## Before Running

Check labels first:

```bash
gh label list --repo xiwuqi/scopediff
```

If labels are missing, ask for explicit approval before creating them.
