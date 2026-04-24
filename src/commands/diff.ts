import { diffWorkspace } from "../core/analyze.js";
import { writeReport, type BaseCommandOptions } from "./common.js";

export interface DiffCommandOptions extends BaseCommandOptions {
  base?: string;
  head?: string;
  root?: string;
}

export async function runDiffCommand(options: DiffCommandOptions): Promise<string> {
  if (!options.base) {
    throw new Error("Missing --base <ref>.");
  }

  const report = await diffWorkspace({
    root: options.root ?? process.cwd(),
    baseRef: options.base,
    headRef: options.head
  });

  return writeReport(report, options);
}
