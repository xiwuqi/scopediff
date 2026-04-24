# Screenshot Checklist

Use real CLI output and avoid synthetic counts.

1. README first screen
   - Show title, one-line description, three value bullets, and review-aid limitation.
2. CLI scan output
   - Use a clean temporary project showing `Risk: Low`.
3. Diff report
   - Use `docs/demo/scopediff-report.md`, focused on the summary and first three findings.
4. GitHub Actions summary
   - After release, run `scopediff ci` in a test PR and capture the Step Summary.
   - Do not fake this screenshot before the Action is used in CI.
5. Finding explain output
   - Run `scopediff explain R012`.
   - Show the default severity, why it matters, and suggested review.

Recommended dimensions:

- Terminal screenshots: 1600x1000 or 1200x800.
- README screenshot: desktop browser, first viewport.
- Avoid cropping away the limitation text.
