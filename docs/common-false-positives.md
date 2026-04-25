# Common False Positives

ScopeDiff is intentionally conservative. A finding means "review this capability change before merge", not "this pull request is malicious."

This page explains common false positives and how to report useful examples.

## What Counts As A False Positive

A false positive is a finding that is technically matched by a rule but not useful for review in its context.

Examples:

- A documentation file mentions `GITHUB_TOKEN` only as an example.
- A demo fixture intentionally contains `curl | bash`.
- A trusted internal workflow uses `contents: write` only on a protected release job.
- An `AGENTS.md` file says "run tests" but the repository already expects agents to run local test commands.
- A package lifecycle script is harmless and already documented.

Do not treat every expected finding as a false positive. Some findings are useful even when the change is legitimate.

## Common Cases

| Case                                 | Why It Happens                                                                           | How To Review                                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Example token names in docs          | ScopeDiff flags credential-like names such as `GITHUB_TOKEN`, `API_KEY`, or `NPM_TOKEN`. | Confirm the value is only a placeholder and no real secret is committed.                                     |
| Demo or fixture files                | Demo repositories often contain intentionally risky examples.                            | Check whether the file is clearly under `docs/`, `examples/`, or `tests/fixtures/`.                          |
| Launch drafts and issue templates    | Project docs can include phrases like "run tests", "upload code", or "security scanner". | Confirm the file is guidance text, not an active agent instruction file or enabled skill.                    |
| Legitimate MCP server setup          | Adding an MCP server really does expand what an agent can call.                          | Confirm the server is needed, trusted, version-pinned where practical, and uses least-privilege credentials. |
| GitHub Actions write permissions     | Some release workflows need write access.                                                | Confirm the trigger, environment protections, branch restrictions, and token scope.                          |
| Unpinned GitHub Actions              | Some teams pin to tags such as `v4` for maintainability.                                 | Decide whether your project requires commit SHA pinning for that workflow.                                   |
| Natural-language instruction matches | Words like "run", "write", "deploy", or "push" can appear in harmless guidance.          | Treat these as lower-confidence prompts and read the surrounding context.                                    |
| Package lifecycle scripts            | `prepare`, `preinstall`, and `postinstall` can be legitimate.                            | Confirm the script is visible, expected, and does not download or execute unexpected remote code.            |

## Reporting A False Positive

Open an issue with a small sanitized example:

````md
### Rule or finding

R010 / High-privilege instruction added

### Why it seems noisy

This is a docs-only example and does not change the agent's actual config.

### Minimal sanitized input

```md
The agent may run tests with npm test.
```

### Expected behavior

Lower severity, lower confidence, or clearer wording.
````

Please include:

- ScopeDiff version.
- Command you ran.
- Minimal file content that reproduces the finding.
- Whether the file is production config, docs, examples, or tests.
- Why the finding is not useful in your repository.

Do not include:

- real secrets or tokens
- private repository code
- customer data
- internal URLs or hostnames unless they are already public
- private security reports

## Maintainer Triage Guide

When triaging a false-positive report:

1. Confirm the report is sanitized.
2. Reproduce the finding with a fixture.
3. Decide whether the rule should change severity, confidence, wording, or scope.
4. Prefer narrow rule changes over suppressing a whole category.
5. Add a regression fixture before closing the issue.

## Example: Running ScopeDiff On ScopeDiff

ScopeDiff may flag some of its own launch or issue-draft documents because they contain words such as `run`, `execute`, `upload`, or `security scanner`. That is expected for v0.1.0 natural-language rules.

When you see this pattern:

1. Check whether the file is active configuration or documentation.
2. Keep the finding if the text can influence an agent, workflow, skill, or automation path.
3. Treat it as a likely false positive if it is only release copy, launch copy, or an issue draft.
4. Prefer better rule wording or fixture coverage over hiding the category completely.

## Current v0.1.0 Limitations

- Natural-language instruction detection is keyword-based and conservative.
- Line mapping can be approximate for complex YAML and JSON.
- ScopeDiff does not understand project-specific trust policies.
- ScopeDiff does not fetch package reputation or remote metadata.
- ScopeDiff does not execute discovered commands.

These limitations are intentional for the first release. The tool should stay local, explainable, and easy to review.
