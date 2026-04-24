import fs from "node:fs/promises";
import { diffWorkspace, scanWorkspace } from "../core/analyze.js";
import { renderMarkdown } from "../renderers/markdown.js";
import {
  parseSeverityThreshold,
  shouldFail,
  writeReport,
  type BaseCommandOptions
} from "./common.js";

export interface CiCommandOptions extends BaseCommandOptions {
  base?: string;
  head?: string;
  root?: string;
  failOn?: string;
  summary?: boolean;
}

export async function runCiCommand(
  options: CiCommandOptions
): Promise<{ output: string; exitCode: number }> {
  const threshold = parseSeverityThreshold(options.failOn);
  const base = options.base ?? process.env.GITHUB_BASE_REF;
  const root = options.root ?? process.cwd();
  const report = base
    ? await diffWorkspace({ root, baseRef: base, headRef: options.head })
    : await scanWorkspace({ root, maxFileSize: 1048576 });

  if (process.env.GITHUB_STEP_SUMMARY && options.summary !== false) {
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, renderMarkdown(report), "utf8");
  }

  const output = await writeReport(report, options);
  const failed = shouldFail(report, threshold);
  const thresholdText = threshold === "none" ? "none" : threshold;
  const status = failed
    ? `ScopeDiff found findings at or above '${thresholdText}'.\n`
    : `ScopeDiff completed without findings at or above '${thresholdText}'.\n`;
  const shouldAppendStatus = options.format !== "json" && !options.output;

  return { output: shouldAppendStatus ? `${output}${status}` : output, exitCode: failed ? 3 : 0 };
}
