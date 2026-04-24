import type { ScopeDiffReport } from "../core/types.js";

export function renderMarkdown(report: ScopeDiffReport): string {
  const lines: string[] = [];

  lines.push("# ScopeDiff Report", "");
  lines.push(`Repo: ${report.repo}`);
  if (report.baseRef) {
    lines.push(`Base: ${report.baseRef}`);
  }
  if (report.headRef) {
    lines.push(`Head: ${report.headRef}`);
  }
  lines.push(`Generated: ${report.generatedAt}`, "");
  lines.push("## Summary", "");
  lines.push(`Risk: ${capitalize(report.riskLevel)}`, "");
  lines.push(report.summary, "");
  lines.push("Counts:");
  lines.push(`- Critical: ${report.countsBySeverity.critical}`);
  lines.push(`- High: ${report.countsBySeverity.high}`);
  lines.push(`- Medium: ${report.countsBySeverity.medium}`);
  lines.push(`- Low: ${report.countsBySeverity.low}`, "");

  if (report.findings.length > 0) {
    lines.push("## Findings", "");
    for (const finding of report.findings) {
      lines.push(`### ${finding.id} - ${finding.title}`, "");
      lines.push(`Severity: ${capitalize(finding.severity)}`);
      lines.push(`Category: ${finding.category}`);
      lines.push(`File: \`${formatLocation(finding.file, finding.lineStart)}\``);
      lines.push(`Rule: ${finding.ruleId}`);
      lines.push(`Confidence: ${finding.confidence.toFixed(2)}`, "");
      lines.push("Evidence:", "");
      lines.push("```text");
      lines.push(finding.evidence);
      lines.push("```", "");
      if (finding.previousValue !== null) {
        lines.push("Previous:", "");
        lines.push("```json");
        lines.push(JSON.stringify(finding.previousValue, null, 2));
        lines.push("```", "");
      }
      if (finding.currentValue !== null) {
        lines.push("Current:", "");
        lines.push("```json");
        lines.push(JSON.stringify(finding.currentValue, null, 2));
        lines.push("```", "");
      }
      lines.push("Why it matters:", "");
      lines.push(finding.whyItMatters, "");
      lines.push("Suggested review:", "");
      lines.push(finding.suggestedReview, "");
    }
  } else {
    lines.push("## Findings", "", "No findings.", "");
  }

  if (report.skippedFiles.length > 0) {
    lines.push("## Skipped Files", "");
    for (const skipped of report.skippedFiles) {
      lines.push(
        `- \`${skipped.file}\`: ${skipped.reason}${
          skipped.sizeBytes ? ` (${skipped.sizeBytes} bytes)` : ""
        }`
      );
    }
    lines.push("");
  }

  if (report.errors.length > 0) {
    lines.push("## Recoverable Errors", "");
    for (const error of report.errors) {
      lines.push(`- ${error.file ? `\`${error.file}\`: ` : ""}${error.message}`);
    }
    lines.push("");
  }

  if (report.nextReviewActions.length > 0) {
    lines.push("## Next Review Actions", "");
    report.nextReviewActions.forEach((action, index) => {
      lines.push(`${index + 1}. ${action}`);
    });
    lines.push("");
  }

  lines.push("## Limitations", "");
  lines.push(
    "ScopeDiff is an audit aid. It does not execute tools, verify package reputation, or prove whether a change is malicious."
  );

  return `${lines.join("\n")}\n`;
}

function capitalize(value: string): string {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

function formatLocation(file: string, line: number | null): string {
  return line ? `${file}:${line}` : file;
}
