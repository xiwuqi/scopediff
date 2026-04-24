import type { ScopeDiffReport } from "../core/types.js";

export function renderJson(report: ScopeDiffReport): string {
  return `${JSON.stringify(report, null, 2)}\n`;
}
