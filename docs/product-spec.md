# ScopeDiff Product Spec

## 1. Positioning

ScopeDiff is a local-first TypeScript CLI and GitHub Action that helps maintainers review changes to AI agent permissions, MCP tooling, workflow permissions, agent instructions, and related configuration before a pull request is merged.

Core positioning:

> This PR gives your AI agent new powers. Review them before merge.

ScopeDiff is an audit aid, not a complete security audit, vulnerability scanner, malware detector, or prevention layer. It turns capability boundary changes into clear review notes.

## 2. Target Users

- Open source maintainers who review pull requests that modify agent, MCP, CI, release, or automation configuration.
- Developers using AI coding tools such as Codex, Claude Code, Cursor, GitHub Copilot, Gemini, and similar tools.
- Small teams adopting MCP servers, AGENTS.md, Cursor rules, Claude skills, or GitHub Actions automation.
- Security-minded contributors who want a readable explanation of agent/tooling permission changes without running a full AppSec pipeline.

## 3. Non-Target Users

- Teams seeking complete malware detection, exploit validation, sandboxing, or runtime enforcement.
- Enterprises needing centralized policy management, SIEM ingestion, SSO, RBAC, or managed compliance dashboards.
- Users who expect ScopeDiff to verify whether an MCP server or package is safe in absolute terms.
- Users who want automated social posting, PR commenting, or bot-driven outreach by default.

## 4. Core User Stories

- As a maintainer, I want to know when a PR adds an MCP server so that I can review what tools the agent can call.
- As a reviewer, I want to see whether a workflow permission changed from read-only to write so that I can decide whether the PR needs extra scrutiny.
- As a developer, I want to know when an agent instruction file adds write, execute, network, publish, deploy, or delete guidance so that I can review intent.
- As a project owner, I want CI to fail when high-risk agent capability expansion is introduced so that accidental permission growth is noticed before merge.
- As a contributor, I want findings to explain evidence, severity, confidence, and suggested review steps so that I can fix or document the change.

## 5. MVP Functional Scope

- Scan the current workspace for known agent, MCP, workflow, package, Docker, and environment example files.
- Compare current branch to a base ref using local git data.
- Detect at least 10 high-value rules across MCP config, GitHub Actions, package scripts, Docker risk signals, and instruction files.
- Render Markdown and JSON reports.
- Provide a CI command with configurable failure threshold.
- Write GitHub Step Summary in CI when `GITHUB_STEP_SUMMARY` is present.
- Explain a finding by rule id or finding id.
- Run locally without telemetry, external API calls, code upload, or credential storage.

## 6. Explicit Non-Goals

- No runtime blocking or firewall behavior in MVP.
- No automatic PR comments by default.
- No remote package reputation checks in MVP.
- No vulnerability database lookups in MVP.
- No secret value scanning beyond conservative variable-name and configuration evidence.
- No attempt to execute MCP servers, workflows, package scripts, Docker builds, or downloaded scripts.
- No hidden telemetry, analytics, or remote logging.
- No claim that ScopeDiff prevents all agent attacks.

## 7. Success Metrics

MVP quality metrics:

- `npx scopediff scan` completes on a normal repository in under 5 seconds for typical small/medium repos.
- At least 10 core rules have fixture-based tests.
- Markdown and JSON output are stable across repeated runs with the same input.
- CI can fail on `high` or `critical` findings.
- README quick start can be completed in under 5 minutes.

Adoption and feedback metrics:

- Users open issues with real false positives and missing config formats.
- Maintainers use reports in PR review without asking for account permissions.
- Contributors add new rule fixtures or parser cases.
- Stars are earned through usefulness, not incentives or automation.

## 8. Five-Minute Experience Path

1. Install or run:

   ```bash
   npx scopediff scan
   ```

2. In a feature branch:

   ```bash
   npx scopediff diff --base main
   ```

3. Generate a review report:

   ```bash
   npx scopediff report --format markdown
   ```

4. Try CI behavior locally:

   ```bash
   npx scopediff ci --fail-on high
   ```

The first useful output should be a short list of findings, not a long generic security lecture.

## 9. README First-Screen Demo

The first screen should show:

- Project title and one-line description.
- Three bullets: agent permission diff, local-only scanning, PR-ready reports.
- Install command.
- 30-second quick start.
- A compact report snippet:

  ```md
  ## ScopeDiff Report

  Risk: High

  New agent capability detected:

  - MCP server added: github
  - Command: npx -y @modelcontextprotocol/server-github
  - Env required: GITHUB_TOKEN
  - Possible scope: repository read/write depending on token permissions

  Review notes:

  - Pin package version instead of using latest
  - Prefer a read-only token for first setup
  - Document why this server is needed
  - Check whether this PR also changed workflow permissions
  ```

## 10. Why It Has Propagation Potential

- It names a new review category: agent/tooling permission drift.
- It fits a real PR review moment where maintainers already need help.
- The report is screenshot-friendly and easy to understand.
- It works across agent ecosystems instead of betting on one vendor.
- It is local-first and conservative, which is credible in a security-adjacent space.
- It creates a useful GitHub Action without needing account access or external services.

## 11. Why This Is Not Fear-Based Security Marketing

ScopeDiff should avoid exaggerated claims. It does not say "your repo is safe" or "all attacks are blocked." It says:

- These files changed.
- These changes appear to expand agent or automation capability.
- Here is the evidence.
- Here is why a human reviewer may care.
- Here are practical review steps.

The tone should be calm, specific, and review-oriented. Findings should include confidence and false-positive awareness.

## 12. Compliance and Ethics Boundaries

- Do not automate stars, comments, DMs, likes, follows, or promotional posting.
- Do not collect private data, credentials, cookies, tokens, or contact lists.
- Do not upload repository contents to remote services by default.
- Do not bypass platform limits, permissions, 2FA, or API restrictions.
- Do not claim endorsements, user counts, benchmarks, or security guarantees that are not true.
- Any future PR comment feature must be opt-in, documented, and permission-minimal.
- Reports must disclose limitations and avoid implying complete security coverage.
