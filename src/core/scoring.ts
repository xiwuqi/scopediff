import type { Finding, FindingDraft, ScopeDiffReport, Severity } from "./types.js";
import { severityLevels, severityRank } from "./types.js";

const rankSeverity = Object.fromEntries(
  Object.entries(severityRank).map(([severity, rank]) => [rank, severity])
) as Record<number, Severity>;

export function finalizeFindings(drafts: FindingDraft[]): Finding[] {
  const sorted = drafts
    .map((draft) => ({ ...draft, severity: adjustSeverity(draft) }))
    .filter((draft) => draft.confidence >= 0.4)
    .sort((a, b) => {
      const severityDelta = severityRank[b.severity] - severityRank[a.severity];
      if (severityDelta !== 0) {
        return severityDelta;
      }
      return `${a.category}:${a.file}:${a.lineStart ?? 0}:${a.ruleId}`.localeCompare(
        `${b.category}:${b.file}:${b.lineStart ?? 0}:${b.ruleId}`
      );
    });

  return sorted.map((draft, index) => {
    const { docsOnly: _docsOnly, negativeInstruction: _negativeInstruction, ...finding } = draft;
    return {
      ...finding,
      id: `F${String(index + 1).padStart(3, "0")}`
    };
  });
}

export function computeReportFields(
  report: Omit<
    ScopeDiffReport,
    "summary" | "riskLevel" | "countsBySeverity" | "countsByCategory" | "nextReviewActions"
  >
): ScopeDiffReport {
  const countsBySeverity = severityLevels.reduce(
    (counts, severity) => ({ ...counts, [severity]: 0 }),
    {} as Record<Severity, number>
  );
  const countsByCategory: Record<string, number> = {};

  let riskLevel: Severity = "low";
  for (const finding of report.findings) {
    countsBySeverity[finding.severity] += 1;
    countsByCategory[finding.category] = (countsByCategory[finding.category] ?? 0) + 1;
    if (severityRank[finding.severity] > severityRank[riskLevel]) {
      riskLevel = finding.severity;
    }
  }

  const summary =
    report.findings.length === 0
      ? "ScopeDiff found no review-worthy agent/tooling changes."
      : `ScopeDiff found ${report.findings.length} review-worthy agent/tooling change${
          report.findings.length === 1 ? "" : "s"
        }. Highest risk: ${riskLevel}.`;

  return {
    ...report,
    summary,
    riskLevel,
    countsBySeverity,
    countsByCategory,
    nextReviewActions: buildNextActions(report.findings)
  };
}

function adjustSeverity(draft: FindingDraft): Severity {
  let rank = severityRank[draft.severity];

  if (
    draft.isNewCapability &&
    draft.isPermissionExpansion &&
    (draft.category === "credential" || draft.category === "workflow")
  ) {
    rank += draft.ruleId === "R013" || draft.ruleId === "R014" ? 1 : 0;
  }

  if (draft.ruleId === "R020" || draft.ruleId === "R017") {
    rank = Math.max(rank, severityRank.high);
  }

  if (draft.docsOnly && draft.ruleId !== "R020") {
    rank -= 1;
  }

  if (draft.negativeInstruction) {
    rank -= 1;
  }

  rank = Math.max(severityRank.low, Math.min(severityRank.critical, rank));
  return rankSeverity[rank];
}

function buildNextActions(findings: Finding[]): string[] {
  const actions = new Set<string>();

  for (const finding of findings.slice(0, 8)) {
    if (finding.ruleId.startsWith("R00") || finding.category === "mcp") {
      actions.add("Review new MCP servers, commands, arguments, and token scopes.");
    }
    if (finding.category === "workflow") {
      actions.add("Check workflow triggers, token permissions, and secret usage before merge.");
    }
    if (finding.category === "package") {
      actions.add("Pin remote packages where practical and review lifecycle scripts.");
    }
    if (finding.category === "instruction") {
      actions.add("Confirm agent instructions are intended and bounded.");
    }
    if (finding.category === "docker") {
      actions.add("Review Docker isolation settings and host access.");
    }
    if (finding.category === "transparency") {
      actions.add("Prefer checked-in, readable scripts over downloaded script execution.");
    }
  }

  return [...actions];
}
