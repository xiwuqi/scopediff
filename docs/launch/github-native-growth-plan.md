# GitHub-Native Growth Plan

ScopeDiff should grow through useful project surfaces: clear README, small good-first issues, transparent false-positive handling, and calm maintainer communication.

No issue, discussion, PR, label, or external post should be created without explicit maintainer approval.

## Initial Issues Recommendation

Recommendation: create the 5 prepared initial issues after the maintainer approves.

They are useful because they invite concrete improvements without pretending the project is larger than it is. They should be created slowly and honestly, not as artificial activity.

## Recommended Issues

| Order | Draft                                                     | Purpose                                                | Recommended labels                        | Good first issue | Help wanted |
| ----- | --------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------- | ---------------- | ----------- |
| 1     | `docs/launch/issue-drafts/02-readme-example-report.md`    | Improve first-time user clarity.                       | `good first issue`, `docs`                | Yes              | No          |
| 2     | `docs/launch/issue-drafts/01-mcp-config-shape.md`         | Add another sanitized MCP fixture shape.               | `good first issue`, `tests`, `mcp`        | Yes              | No          |
| 3     | `docs/launch/issue-drafts/04-common-false-positives.md`   | Document expected false positives and review guidance. | `help wanted`, `docs`, `false-positive`   | Maybe            | Yes         |
| 4     | `docs/launch/issue-drafts/03-actions-permission-cases.md` | Expand workflow permission expansion test coverage.    | `help wanted`, `tests`, `github-actions`  | No               | Yes         |
| 5     | `docs/launch/issue-drafts/05-sarif-output.md`             | Track a non-MVP output format for future planning.     | `roadmap`, `help wanted`, `output-format` | No               | Yes         |

## Creation Order

1. Start with docs and README clarity.
2. Add one small fixture-oriented issue.
3. Add false-positive docs.
4. Add one deeper test-coverage issue.
5. Add the roadmap issue last.

This order gives new contributors low-risk entry points before deeper implementation work.

## Contributor Friendliness

Each issue should include:

- What problem it solves.
- Clear acceptance criteria.
- How to test locally.
- A reminder not to include real secrets, private repo data, or customer data.
- Scope limits so a contributor does not accidentally design a large feature.

## Avoiding "Issue Seeding" Spam

- Create only issues that the maintainer genuinely wants.
- Do not create many vague roadmap issues.
- Do not create duplicate labels or fake milestones.
- Do not assign issues to people who have not volunteered.
- Do not ask for stars in issues.
- Close or update issues if the roadmap changes.

## GitHub Discussions Recommendation

Recommendation: enable GitHub Discussions after the first external launch post or after the first real user question.

Reason: for v0.1.0, Issues are enough for bugs, false positives, and concrete contributions. Discussions become more useful once there are recurring questions or design tradeoffs.

If Discussions are enabled, the first welcome discussion should be based on:

`docs/launch/drafts/v0.1.0/github-discussions-welcome.md`

It should invite:

- False-positive examples.
- Real MCP/client config shapes.
- Questions about review boundaries.
- Suggestions for conservative rules.

It should not ask users to star the project as a condition for anything.

## Next Public Actions Requiring Approval

- Create initial GitHub issues.
- Create or modify labels.
- Enable GitHub Discussions.
- Create a welcome discussion.
- Publish any external launch post.
- Submit to Show HN, Reddit, Dev.to, Product Hunt, newsletters, or directories.
