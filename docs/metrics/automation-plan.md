# Metrics Automation Plan

This stage prepares manual templates only. It does not create scheduled GitHub Actions, external automations, social API integrations, or tracking scripts.

## Daily Manual Check

Look at:

- GitHub stars, forks, watchers, and issues.
- npm package page availability and recent download trend.
- GitHub Release page availability.
- CI status on `main`.
- New false-positive reports.
- New questions from users.
- Social/community post metrics only after a post is manually approved and published.

## Manual Social Data

Fill `docs/metrics/social-metrics.csv` by hand with:

- date
- channel
- post URL
- title
- impressions
- clicks
- likes
- replies
- reposts
- bookmarks
- follows
- notes

Do not scrape private data, DMs, follower lists, emails, or user profiles.

## README / npm / Release Effectiveness

Review:

- Whether README first-screen copy explains the project in 5 seconds.
- Whether install commands still work.
- Whether npm package metadata matches the GitHub repo.
- Whether release notes are accurate and conservative.
- Whether the GitHub Action example remains valid.

## Launch Channel Effectiveness

Prefer feedback quality over volume:

- Did the post reach people who maintain repos with MCP, agents, workflows, or automation?
- Did anyone report a false positive or real config shape?
- Did anyone try `npx scopediff@latest scan`?
- Did the channel rules permit project sharing?
- Was the post transparently from the project author?

## Compliance Rules

- All external posts require explicit human approval.
- No automated likes, follows, reposts, comments, DMs, or stars.
- No paid, traded, incentivized, or fake stars.
- No scraping private contact data.
- No posting in irrelevant communities.
- No fear-based or exaggerated security claims.

## Future Automation Ideas

Only after approval:

- A local script that reads public GitHub repo metadata.
- A manually triggered report generator for public npm/GitHub stats.
- A GitHub Action that validates docs links.

Do not add scheduled automation until there is a clear maintenance need.
