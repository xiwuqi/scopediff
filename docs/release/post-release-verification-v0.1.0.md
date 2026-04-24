# Post-Release Verification: v0.1.0

Date: 2026-04-24

## npm Package Verification

Verified from the official npm registry:

```json
{
  "name": "scopediff",
  "version": "0.1.0",
  "description": "AI agent permission and tooling surface diffs for pull request review.",
  "dist-tags.latest": "0.1.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/xiwuqi/scopediff.git"
  },
  "license": "MIT"
}
```

Result: `latest` points to `0.1.0`.

## npx Latest Verification

Verified:

```bash
npx --yes --registry https://registry.npmjs.org/ scopediff@latest --help
npx --yes --registry https://registry.npmjs.org/ scopediff@latest scan --format markdown
```

Result: both commands ran successfully.

The scan command produced a valid Markdown report. Current repository findings are non-blocking for launch:

- 2 medium findings for GitHub Actions not pinned to commit SHA.
- 3 low-confidence instruction-related findings in docs/draft files.

These are useful examples of ScopeDiff's conservative review-aid behavior and do not block v0.1.0 availability.

## GitHub Release Verification

Verified:

- Tag: `v0.1.0`
- Release title: `ScopeDiff v0.1.0`
- Draft: `false`
- Prerelease: `false`
- URL: https://github.com/xiwuqi/scopediff/releases/tag/v0.1.0

## CI Verification

Latest CI runs on `main` completed successfully after:

- v0.1.0 release packaging
- publication link recording
- international README and launch draft additions

## GitHub Metadata Verification

Verified repository metadata:

- Description: `Review AI agent, MCP, and workflow permission changes before merge.`
- Homepage: https://www.npmjs.com/package/scopediff
- Topics: `ai-agents`, `mcp`, `model-context-protocol`, `github-actions`, `code-review`, `security-tools`, `supply-chain-security`, `cli`, `typescript`, `devtools`

## README Quick Start Verification

README now prioritizes published package commands:

```bash
npx scopediff@latest scan
npx scopediff@latest diff --base main
```

It still documents from-source development separately.

## Known Non-Blocking Warnings

GitHub Actions reports a Node.js 20 runtime deprecation warning for:

- `actions/checkout@v4`
- `actions/setup-node@v4`

CI is passing. A future maintenance issue can track upgrading to action versions that support the next runtime.

## Next Recommended Action

Choose one GitHub-native growth step:

1. Create a small set of initial issues from the prepared issue drafts.
2. Enable GitHub Discussions and add a welcome discussion.
3. Start manual external launch review from the prepared draft files.

Do not publish external content or create public issues/discussions without explicit maintainer approval.
