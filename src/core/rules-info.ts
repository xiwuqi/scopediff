import type { Severity } from "./types.js";

export interface RuleInfo {
  id: string;
  title: string;
  severity: Severity;
  whyItMatters: string;
  suggestedReview: string;
}

export const ruleInfo: Record<string, RuleInfo> = {
  R001: {
    id: "R001",
    title: "MCP server added, removed, or modified",
    severity: "high",
    whyItMatters: "MCP servers expose tools that agents can call.",
    suggestedReview: "Confirm the server is needed, trusted, and least-privileged."
  },
  R002: {
    id: "R002",
    title: "MCP command changed",
    severity: "high",
    whyItMatters: "The command controls what local process starts the MCP server.",
    suggestedReview: "Review the executable, source, and version pinning."
  },
  R003: {
    id: "R003",
    title: "MCP args changed",
    severity: "medium",
    whyItMatters: "Arguments can expand paths, modes, or remote package behavior.",
    suggestedReview: "Review new flags and paths for expanded access."
  },
  R004: {
    id: "R004",
    title: "MCP env variable added",
    severity: "medium",
    whyItMatters: "Environment variables can give tools access to services or credentials.",
    suggestedReview: "Confirm each variable is needed and scoped."
  },
  R005: {
    id: "R005",
    title: "Credential-like variable name",
    severity: "high",
    whyItMatters: "Credential-like variables may grant access to external systems.",
    suggestedReview: "Check token scope and avoid real values in the repository."
  },
  R006: {
    id: "R006",
    title: "Executable command used",
    severity: "medium",
    whyItMatters: "Agent configuration may launch local executables.",
    suggestedReview: "Review command source and arguments."
  },
  R007: {
    id: "R007",
    title: "Unpinned remote package",
    severity: "high",
    whyItMatters: "Unpinned remote packages can change between installs.",
    suggestedReview: "Pin package versions or image digests where practical."
  },
  R008: {
    id: "R008",
    title: "Remote URL added",
    severity: "medium",
    whyItMatters: "Remote URLs can introduce network dependencies or downloaded code.",
    suggestedReview: "Check whether the URL is executed or only documented."
  },
  R009: {
    id: "R009",
    title: "High-risk Docker configuration",
    severity: "high",
    whyItMatters: "Privileged containers and host mounts can break isolation.",
    suggestedReview: "Avoid privileged mode and host-sensitive mounts unless justified."
  },
  R010: {
    id: "R010",
    title: "High-privilege AGENTS.md instruction",
    severity: "medium",
    whyItMatters: "Agent instructions can influence reads, writes, shell use, and publishing.",
    suggestedReview: "Confirm the instruction is intended and bounded."
  },
  R011: {
    id: "R011",
    title: "High-privilege agent instruction",
    severity: "medium",
    whyItMatters: "Tool-specific rules and skills can widen agent behavior.",
    suggestedReview: "Review the instruction and add explicit limits if needed."
  },
  R012: {
    id: "R012",
    title: "GitHub Actions permissions expanded",
    severity: "high",
    whyItMatters: "Workflow tokens may gain write access.",
    suggestedReview: "Prefer job-level permissions and least privilege."
  },
  R013: {
    id: "R013",
    title: "Sensitive workflow trigger added",
    severity: "high",
    whyItMatters: "Some triggers can run with elevated context or external input.",
    suggestedReview: "Review fork behavior, token permissions, and secret exposure."
  },
  R014: {
    id: "R014",
    title: "Workflow secret usage added",
    severity: "high",
    whyItMatters: "Secrets can publish, deploy, or access external systems.",
    suggestedReview: "Confirm event triggers and environment protections."
  },
  R015: {
    id: "R015",
    title: "External action not pinned to SHA",
    severity: "medium",
    whyItMatters: "Action tags can move or be compromised.",
    suggestedReview: "Consider pinning sensitive actions to a commit SHA."
  },
  R016: {
    id: "R016",
    title: "Lifecycle script added",
    severity: "high",
    whyItMatters: "Lifecycle scripts can run during install.",
    suggestedReview: "Review the script body and document why it is needed."
  },
  R017: {
    id: "R017",
    title: "Publish, deploy, upload, or push operation added",
    severity: "high",
    whyItMatters: "Release operations can alter external systems.",
    suggestedReview: "Check credentials, triggers, environments, and approvals."
  },
  R018: {
    id: "R018",
    title: "Permission-related config changed",
    severity: "medium",
    whyItMatters: "Config changes can alter trust boundaries.",
    suggestedReview: "Review default scopes and permission names."
  },
  R019: {
    id: "R019",
    title: "Allowlist, denylist, sandbox, permission, or scope changed",
    severity: "high",
    whyItMatters: "Guardrail changes can broaden agent authority.",
    suggestedReview: "Compare before and after boundaries carefully."
  },
  R020: {
    id: "R020",
    title: "Reduced review transparency",
    severity: "high",
    whyItMatters: "Downloaded or obfuscated execution is harder to review.",
    suggestedReview: "Prefer checked-in, pinned, readable scripts."
  }
};
