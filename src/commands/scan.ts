import { scanWorkspace } from "../core/analyze.js";
import { writeReport, type BaseCommandOptions } from "./common.js";

export interface ScanCommandOptions extends BaseCommandOptions {
  root?: string;
  maxFileSize?: string;
}

export async function runScanCommand(options: ScanCommandOptions): Promise<string> {
  const report = await scanWorkspace({
    root: options.root ?? process.cwd(),
    maxFileSize: Number(options.maxFileSize ?? 1048576)
  });
  return writeReport(report, options);
}
