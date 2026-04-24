# Risk Scoring

ScopeDiff scoring must be deterministic, simple, and explainable. The same input should produce the same severity unless rule definitions change.

## Severity Boundaries

- `critical`: A change appears to combine privileged execution with secret access, publish/deploy/write authority, or fork-triggered elevated CI. Critical means "review before merge; likely block by default in strict CI."
- `high`: A change appears to add or expand agent, MCP, workflow, release, credential, shell, or guardrail capability. High means "human review should happen before merge."
- `medium`: A change may affect capability boundaries but is ambiguous, docs-only, or common enough to need context.
- `low`: Informational capability context or weak signal that helps reviewers but should not block by default.

## Base Rule Severity

Each rule has a default severity from `docs/risk-model.md`. The default is the starting point.

## Adjustment Factors

Increase severity by one level, capped at `critical`, when:

- The finding is a new capability and includes credential-like env variables.
- The finding combines shell execution with network access.
- The finding affects GitHub Actions release, deployment, publish, upload, or push behavior.
- The finding is reachable from `pull_request_target`, `workflow_run`, or `repository_dispatch`.
- The finding broadens allowlist, sandbox, permission, or scope settings.

Decrease severity by one level, floored at `low`, when:

- Evidence is docs-only and not in an executable code block.
- Evidence is a negative instruction such as "do not execute" or "never publish".
- Evidence is a test fixture path.
- Evidence is only a variable-name match without surrounding capability change.

Do not decrease severity for workflow permission expansion, lifecycle scripts, or direct remote-script execution.

## Confidence

Confidence is independent of severity:

- `0.90` to `1.00`: Structured parser evidence, such as JSON/YAML fields or package scripts.
- `0.70` to `0.89`: Text evidence in code blocks or well-known instruction files.
- `0.40` to `0.69`: Natural-language prose or docs-only evidence.
- Below `0.40`: Should normally not become a finding in MVP.

Rules that rely on natural language should usually be medium severity with confidence below `0.80` unless paired with structured evidence.

## Score Calculation

MVP can implement severity as ordered numeric levels:

```text
low = 1
medium = 2
high = 3
critical = 4
```

Algorithm:

1. Start with rule default severity.
2. Apply deterministic increase factors.
3. Apply deterministic decrease factors.
4. Clamp to `low` through `critical`.
5. Compute confidence from evidence type and rule-specific confidence.
6. The report `riskLevel` is the maximum severity among findings.

## Examples

### MCP server using unpinned npx and token

- Base R001: high.
- New capability: yes.
- Credential-like env: yes.
- Unpinned package: yes.
- Final: critical or high depending on whether token appears to be write-capable. MVP default: high, with separate high finding for credential and unpinned package. CI can fail on high.

### Documentation adds a remote URL

- Base R008: medium.
- Docs-only: decrease to low.
- No execution evidence.
- Final: low, confidence `0.55`.

### `pull_request_target` plus `secrets.NPM_TOKEN`

- Base R013: high.
- Sensitive trigger plus secret: increase to critical.
- Final: critical, confidence `0.95`.

### Cursor rule says "do not push changes"

- Base R011 keyword match may see "push".
- Negative instruction: decrease and confidence low.
- MVP should avoid finding if simple negation is detected.
