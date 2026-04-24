import { diffWorkspace, scanWorkspace } from "../core/analyze.js";
import { writeReport, type BaseCommandOptions } from "./common.js";

export interface ReportCommandOptions extends BaseCommandOptions {
  base?: string;
  head?: string;
  root?: string;
  maxFileSize?: string;
}

export async function runReportCommand(options: ReportCommandOptions): Promise<string> {
  const report = options.base
    ? await diffWorkspace({
        root: options.root ?? process.cwd(),
        baseRef: options.base,
        headRef: options.head
      })
    : await scanWorkspace({
        root: options.root ?? process.cwd(),
        maxFileSize: Number(options.maxFileSize ?? 1048576)
      });

  return writeReport(report, options);
}
