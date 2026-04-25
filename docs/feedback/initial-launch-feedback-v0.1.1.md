# Initial Launch Feedback Snapshot for v0.1.1

Date: 2026-04-24

Status: planning input. This file records early launch signals for ScopeDiff v0.1.0 and turns them into conservative product priorities for v0.1.1. It should not be used as marketing copy.

## Sources Checked

| Source | Current Signal | Interpretation |
| --- | --- | --- |
| X/Twitter launch thread | Published and recorded. `docs/metrics/social-metrics.csv` still has manual placeholder values. | No quantified product feedback yet. Do not post a follow-up just to bump the thread. |
| LinkedIn launch post | Published and recorded. `docs/metrics/social-metrics.csv` still has manual placeholder values. | No quantified product feedback yet. Continue observing for concrete comments or clicks. |
| Reddit r/opensource | Submitted after manual approval, then removed by AutoModerator because the account did not meet the subreddit's age requirement. | Treat as a channel/rules mismatch, not product feedback. Do not repost or crosspost to work around the rule. |
| GitHub repo | 1 star, 0 forks, 5 open maintainer-created issues at the time of planning. | Too early for adoption conclusions. Initial issues are still the best roadmap signal. |
| GitHub traffic | Views, clones, and referrers currently report 0 through the GitHub traffic API. | Traffic may lag; do not infer lack of interest yet. |
| npm downloads | Registry confirms the package exists, but the downloads API still returns no data for the new package. | New package metrics are not ready; do not quote downloads publicly. |

## Direct Feedback

There is no confirmed external product feedback yet from X/Twitter, LinkedIn, or Reddit.

Do not fabricate:

- user quotes
- benchmarks
- adoption numbers
- download counts
- security outcomes

## Useful Inferences

The launch still gives a few practical signals:

1. The project needs to convert cold visitors quickly.
   - X/Twitter and LinkedIn posts send users straight to GitHub/npm.
   - The README example report and first-run path should be more concrete than the launch copy.

2. False-positive handling should be visible early.
   - The launch copy invited feedback on false positives.
   - If a first user sees noisy findings, they need a calm doc explaining what is expected and how to report a sanitized case.

3. Reddit is not a good immediate follow-up channel for this account.
   - The r/opensource removal was rule-based.
   - v0.1.1 planning should focus on product clarity, not replacing the lost Reddit exposure with more posts.

4. The existing GitHub issues are good v0.1.1 inputs.
   - #1 Improve README example report.
   - #2 Add fixture for another MCP config shape.
   - #3 Add docs for common false positives.
   - #4 Add more GitHub Actions permission expansion cases.
   - #5 Support SARIF output.

## Recommended v0.1.1 Direction

Ship a small quality release that improves first-time trust:

- make the README demo/report easier to scan
- add common false-positive guidance
- add one or two representative fixtures/tests for real-world config shapes
- improve report wording only where it reduces confusion

Keep v0.1.1 boring and useful. The goal is not to add a large feature; it is to make the current MVP easier to try, understand, and trust.

## What Not To Do Based On This Snapshot

- Do not repost to Reddit or switch subreddits just because r/opensource removed the post.
- Do not publish new social follow-ups until there are real replies, clicks, or questions.
- Do not claim traction from placeholder metrics.
- Do not prioritize SARIF, PR comments, remote reputation checks, or broader security scanning for v0.1.1.
- Do not close the existing public issues until the actual implementation lands and is verified.
