# Post-Launch 24h Plan: v0.1.0

Status: prepared. Start after the first external launch post is manually published.

## After 1 Hour

- Check whether the post URL is public and recorded in `docs/launch/published-links.md`.
- Confirm images and links rendered correctly.
- Review replies for concrete questions, false positives, and missing config examples.
- Do not repost, quote-post, or ask people to boost it.

## After 6 Hours

- Check GitHub stars, issues, discussions, visitors, clones, and referrers.
- Check npm package downloads if npm has updated the count.
- Log meaningful replies, not just likes.
- If someone reports a false positive, ask for a minimal sanitized fixture and create a GitHub issue only if the reporter is comfortable with public tracking.

## After 24 Hours

- Compare signal quality across channels:
  - GitHub visitors
  - npm downloads
  - stars
  - issues
  - discussion comments
  - replies with concrete feedback
  - reposts from relevant developers
  - clone count
  - referrers
- Decide whether to continue the same channel, improve README/demo, or move to Hacker News / Reddit / Dev.to.

## X/Twitter Follow-Up Criteria

Continue with a thread only if at least one of these is true:

- The single post receives concrete technical replies.
- Someone asks what ScopeDiff detects or how it works.
- GitHub referrers show meaningful traffic from X.
- A maintainer asks for a feature or reports a false positive.

Do not post a thread just because the first post has low engagement.

## LinkedIn Follow-Up Criteria

Add a clarifying comment only if it helps the discussion:

- Explain the review-aid boundary.
- Link to false-positive reporting guidance.
- Share the demo report if someone asks for an example.

Do not add a comment just to bump the post.

## Handling Criticism

- Thank people for specific feedback.
- Acknowledge that v0.1.0 is conservative and imperfect.
- Ask for minimal sanitized examples.
- Do not argue that ScopeDiff is a complete security tool.
- Turn recurring feedback into issues with clear acceptance criteria.

## Next-Wave Criteria

Move to Hacker News, Reddit, or Dev.to only if:

- The README/demo is clear enough for strangers.
- At least one external post has produced useful feedback or questions.
- The next channel has a relevant audience and rules allow project sharing.
- The post can be adapted to the community instead of copied verbatim.

Avoid posting across multiple communities in quick succession. One useful conversation is worth more than several low-context posts.
