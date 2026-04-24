import type { ScopeDiffReport } from "../core/types.js";
import { renderJson } from "./json.js";
import { renderMarkdown } from "./markdown.js";

export type OutputFormat = "markdown" | "json";

export function renderReport(report: ScopeDiffReport, format: OutputFormat): string {
  return format === "json" ? renderJson(report) : renderMarkdown(report);
}

export function parseFormat(value: string | undefined): OutputFormat {
  if (!value || value === "markdown" || value === "md") {
    return "markdown";
  }
  if (value === "json") {
    return "json";
  }
  throw new Error(`Unsupported format '${value}'. Use markdown or json.`);
}
