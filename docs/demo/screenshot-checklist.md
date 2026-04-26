# Screenshot Checklist

Use real CLI output and avoid synthetic counts.

Generated assets:

- `docs/brand/readme-hero.svg`
- `docs/brand/readme-hero.png`
- `docs/brand/social-preview-v2.svg`
- `docs/brand/social-preview-v2.png`
- `docs/brand/blog-cover-v0.1.2.svg`
- `docs/brand/blog-cover-v0.1.2.png`
- `docs/brand/product-hunt-gallery-1.svg`
- `docs/brand/product-hunt-gallery-1.png`
- `docs/brand/docs-permission-map.svg`
- `docs/brand/docs-permission-map.png`
- `docs/brand/international-readme-card.svg`
- `docs/brand/international-readme-card.png`
- `docs/demo/assets/scopediff-diff-report.svg`
- `docs/demo/assets/scopediff-diff-report.png`
- `docs/demo/assets/scopediff-explain.svg`
- `docs/demo/assets/scopediff-explain.png`
- `docs/demo/assets/social-preview.svg`
- `docs/demo/assets/social-preview.png`
- `docs/demo/assets/feature-overview.svg`
- `docs/demo/assets/feature-overview.png`
- `docs/demo/assets/quick-start.svg`
- `docs/demo/assets/quick-start.png`
- `docs/demo/assets/github-step-summary-mock.svg`
- `docs/demo/assets/github-step-summary-mock.png`
- `docs/demo/assets/manifest.json`

Regenerate with:

```bash
npm run build
node scripts/generate-demo-assets.mjs
node scripts/generate-brand-assets.mjs
```

1. README first screen
   - Show title, one-line description, three value bullets, and review-aid limitation.
   - Current README includes `docs/brand/readme-hero.png` near the first screen.
2. CLI scan output
   - Use `docs/demo/assets/quick-start.png` for quick-start command visuals.
   - If capturing a real terminal, use a clean temporary project showing `Risk: Low`.
3. Diff report
   - Use `docs/demo/scopediff-report.md` and `docs/demo/assets/scopediff-diff-report.svg`, focused on the summary and first findings.
   - Use `docs/demo/assets/scopediff-diff-report.png` for platforms that need bitmap uploads.
4. GitHub Actions summary
   - After release, run `scopediff ci` in a test PR and capture the Step Summary.
   - Use `docs/demo/assets/github-step-summary-mock.png` only as a clearly labeled layout mock, not as proof of a real CI run.
5. Finding explain output
   - Run `scopediff explain R012`.
   - Show the default severity, why it matters, and suggested review.
   - Current assets: `docs/demo/assets/scopediff-explain.svg` and `docs/demo/assets/scopediff-explain.png`.
6. Social preview
   - Use `docs/brand/social-preview-v2.svg` as the current starter visual.
   - Use `docs/brand/social-preview-v2.png` for social uploads.
   - Review platform size/cropping before upload.

Recommended dimensions:

- Terminal screenshots: 1600x1000 or 1200x800.
- README screenshot: desktop browser, first viewport.
- Avoid cropping away the limitation text.
