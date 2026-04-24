# Visual Posting Checklist: v0.1.0

Status: prepared only. Use before any manual social post.

## X/Twitter Images

Recommended order:

1. `docs/demo/assets/social-preview.png`
   - Purpose: first-frame context and project identity.
   - Source: generated project social preview.
   - Real/mocked: visual summary, not a metric claim.
   - Alt text: ScopeDiff social preview showing the tagline: Review AI agent permissions before merge.
2. `docs/demo/assets/scopediff-diff-report.png`
   - Purpose: show real CLI output from a temporary demo repository.
   - Source: generated from real ScopeDiff CLI output.
   - Real/mocked: real CLI output; temporary demo repo.
   - Alt text: Terminal screenshot of ScopeDiff reporting new MCP and GitHub Actions permission findings.
3. `docs/demo/assets/github-step-summary-mock.png`
   - Purpose: show expected GitHub Step Summary layout.
   - Source: generated layout mock based on ScopeDiff Markdown output.
   - Real/mocked: mock; do not describe as a real CI screenshot.
   - Alt text: GitHub Step Summary layout mock showing a ScopeDiff report with a high-risk finding.
4. `docs/demo/assets/quick-start.png`
   - Purpose: show the install-free commands.
   - Source: generated visual from real supported commands.
   - Real/mocked: command visual, not terminal output.
   - Alt text: ScopeDiff quick start image showing npx commands for scan, diff, and CI mode.

## LinkedIn Images

Recommended order:

1. `docs/demo/assets/social-preview.png`
2. `docs/demo/assets/feature-overview.png`
3. `docs/demo/assets/scopediff-diff-report.png`

## Checks Before Posting

- Confirm every link is current:
  - GitHub: https://github.com/xiwuqi/scopediff
  - npm: https://www.npmjs.com/package/scopediff
- Confirm copy says ScopeDiff is a review aid, not a full security audit.
- Confirm there is no claim that ScopeDiff prevents all agent or MCP attacks.
- Confirm the GitHub Summary image is labeled as a mock if used.
- Confirm no unrelated accounts are tagged.
- Confirm no star incentive, giveaway, or exchange is included.
- Confirm all images have useful alt text where the platform supports it.
- Stop before clicking Post / Publish / Submit.
