import { ruleInfo } from "../core/rules-info.js";
import { parseFormat } from "../renderers/index.js";

export interface ExplainCommandOptions {
  format?: string;
}

export async function runExplainCommand(
  id: string,
  options: ExplainCommandOptions
): Promise<string> {
  const info = ruleInfo[id.toUpperCase()];
  if (!info) {
    throw new Error(
      `Unknown finding or rule id '${id}'. MVP supports explaining rule ids such as R012.`
    );
  }

  const format = parseFormat(options.format);
  if (format === "json") {
    return `${JSON.stringify(info, null, 2)}\n`;
  }

  return [
    `# ${info.id}: ${info.title}`,
    "",
    `Default severity: ${info.severity}`,
    "",
    "Why it matters:",
    "",
    info.whyItMatters,
    "",
    "Suggested review:",
    "",
    info.suggestedReview,
    ""
  ].join("\n");
}
