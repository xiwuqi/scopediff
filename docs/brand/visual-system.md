# ScopeDiff Visual System

ScopeDiff visuals should feel professional, calm, and useful for maintainers. The goal is to make agent/tooling permission changes easier to understand, not to create fear-based security marketing.

## Principles

- Pair generated launch visuals with real CLI/report screenshots.
- Keep all visible text deterministic in SVG overlays, not generated inside raster backgrounds.
- Do not show fake stars, user counts, benchmarks, customer logos, or endorsements.
- Label mocks as mocks, especially GitHub Step Summary layouts.
- Keep the safety boundary visible: local-first, read-only by default, no telemetry, no code upload.

## Asset Inventory

| Asset                                           | Use                                        | Notes                                                                |
| ----------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| `docs/brand/readme-hero.png`                    | README first viewport                      | Generated background plus exact SVG text overlay.                    |
| `docs/brand/social-preview-v2.png`              | GitHub social preview, X/Twitter, LinkedIn | Best first image for future launch posts.                            |
| `docs/brand/blog-cover-v0.1.2.png`              | Dev.to/Medium/blog cover                   | Launch cover with a calm developer-tool product scene.               |
| `docs/brand/product-hunt-gallery-1.png`         | Product Hunt gallery                       | Use as the first gallery image if/when Product Hunt is approved.     |
| `docs/brand/docs-permission-map.png`            | README/docs explainer                      | Shows the permission surface categories ScopeDiff reviews.           |
| `docs/brand/international-readme-card.png`      | International launch posts                 | Shows localized README availability without changing feature claims. |
| `docs/demo/assets/scopediff-diff-report.png`    | CLI evidence screenshot                    | Generated from real ScopeDiff CLI output against a demo repository.  |
| `docs/demo/assets/scopediff-explain.png`        | Finding explanation screenshot             | Generated from real CLI output.                                      |
| `docs/demo/assets/github-step-summary-mock.png` | CI summary layout                          | Mock based on ScopeDiff Markdown output; do not call it a real run.  |

## Source Backgrounds

These text-free generated images are saved so final assets can be regenerated:

- `docs/brand/generated/gpt-scope-boundary-dark.png`
- `docs/brand/generated/gpt-permission-map-light.png`
- `docs/brand/generated/gpt-product-mockup-dark.png`

The final `.svg` files embed those backgrounds and add exact text, badges, and layout with code. Regenerate the final PNGs with:

```bash
node scripts/generate-brand-assets.mjs
```

## Usage Matrix

| Channel               | Recommended Images                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| GitHub README         | `readme-hero.png`, `docs-permission-map.png`, real CLI screenshots                                      |
| GitHub social preview | `social-preview-v2.png`                                                                                 |
| X/Twitter             | `social-preview-v2.png`, `scopediff-diff-report.png`, `github-step-summary-mock.png`, `quick-start.png` |
| LinkedIn              | `social-preview-v2.png`, `docs-permission-map.png`, `scopediff-diff-report.png`                         |
| Dev.to / Medium       | `blog-cover-v0.1.2.png`, `docs-permission-map.png`, `scopediff-diff-report.png`                         |
| Product Hunt          | `product-hunt-gallery-1.png`, `social-preview-v2.png`, `scopediff-diff-report.png`                      |
| International posts   | `international-readme-card.png`                                                                         |

## Design Tokens

- Background: `#020617`, `#07111f`, `#0f172a`
- Primary text: `#f8fafc`
- Secondary text: `#dbeafe`, `#94a3b8`
- Cyan: `#22d3ee`
- Mint: `#34d399`
- Amber warning accent: `#f59e0b`
- Error/risk accent, used sparingly: `#fca5a5`

## Alt Text Guidance

- README hero: "ScopeDiff visual overview showing a local-first CLI for reviewing AI agent and workflow permission changes."
- Social preview: "ScopeDiff social preview with the text: This PR gives your AI agent new powers. Review them before merge."
- Permission map: "Diagram showing ScopeDiff review surfaces: MCP servers, agent instructions, workflow permissions, package scripts, and Docker settings."
- Blog cover: "ScopeDiff blog cover showing abstract developer-tool panels for reviewing AI agent permission changes."
- Product Hunt gallery: "ScopeDiff launch image describing AI agent permission diffs for pull request review."
- International card: "ScopeDiff international README card listing English, Chinese, Japanese, Spanish, French, Portuguese, and German."

## Compliance Notes

Generated visuals are illustrative. ScopeDiff should still show real output when demonstrating findings, reports, and CLI behavior. Avoid any wording or image treatment that implies ScopeDiff is a complete security audit, malware detector, or automatic protection system.
