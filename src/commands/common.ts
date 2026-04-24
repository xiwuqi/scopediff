import fs from "node:fs/promises";
import type { ScopeDiffReport, Severity } from "../core/types.js";
import { severityRank } from "../core/types.js";
import { parseFormat, renderReport, type OutputFormat } from "../renderers/index.js";

export interface BaseCommandOptions {
  format?: string;
  output?: string;
  quiet?: boolean;
}

export async function writeReport(
  report: ScopeDiffReport,
  options: BaseCommandOptions,
  defaultFormat: OutputFormat = "markdown"
): Promise<string> {
  const format = options.format ? parseFormat(options.format) : defaultFormat;
  const rendered = renderReport(report, format);
  if (options.output) {
    await fs.writeFile(options.output, rendered, "utf8");
    return `Wrote ${options.output}\n`;
  }
  return rendered;
}

export function parseSeverityThreshold(value: string | undefined): Severity | "none" {
  if (!value || value === "high") {
    return "high";
  }

  if (
    value === "none" ||
    value === "low" ||
    value === "medium" ||
    value === "high" ||
    value === "critical"
  ) {
    return value;
  }

  throw new Error(
    `Unsupported fail-on threshold '${value}'. Use none, low, medium, high, or critical.`
  );
}

export function shouldFail(report: ScopeDiffReport, threshold: Severity | "none"): boolean {
  if (threshold === "none") {
    return false;
  }

  return report.findings.some(
    (finding) => severityRank[finding.severity] >= severityRank[threshold]
  );
}
