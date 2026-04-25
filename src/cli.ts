import { createRequire } from "node:module";
import { Command } from "commander";
import { runCiCommand } from "./commands/ci.js";
import { runDiffCommand } from "./commands/diff.js";
import { runExplainCommand } from "./commands/explain.js";
import { runReportCommand } from "./commands/report.js";
import { runScanCommand } from "./commands/scan.js";

const require = createRequire(import.meta.url);
const packageJson = require("../package.json") as { version: string };
const program = new Command();

program
  .name("scopediff")
  .description("Review AI agent and tooling permission changes before merge.")
  .version(packageJson.version);

program
  .command("scan")
  .description("Scan the current workspace state.")
  .option("--root <path>", "workspace root", process.cwd())
  .option("--format <format>", "markdown or json", "markdown")
  .option("--output <path>", "write report to a file")
  .option("--max-file-size <bytes>", "skip files larger than this", "1048576")
  .option("--quiet", "suppress non-error logs")
  .action(async (options) => {
    await runCommand(async () => runScanCommand(options));
  });

program
  .command("diff")
  .description("Compare current branch/head with a base ref.")
  .requiredOption("--base <ref>", "base git ref")
  .option("--head <ref>", "head git ref", "HEAD")
  .option("--root <path>", "workspace root", process.cwd())
  .option("--format <format>", "markdown or json", "markdown")
  .option("--output <path>", "write report to a file")
  .action(async (options) => {
    await runCommand(async () => runDiffCommand(options));
  });

program
  .command("report")
  .description("Generate a report. Uses scan mode unless --base is provided.")
  .option("--base <ref>", "base git ref for diff mode")
  .option("--head <ref>", "head git ref", "HEAD")
  .option("--root <path>", "workspace root", process.cwd())
  .option("--format <format>", "markdown or json", "markdown")
  .option("--output <path>", "write report to a file")
  .option("--max-file-size <bytes>", "skip files larger than this", "1048576")
  .action(async (options) => {
    await runCommand(async () => runReportCommand(options));
  });

program
  .command("ci")
  .description("Run ScopeDiff in CI mode.")
  .option("--base <ref>", "base git ref")
  .option("--head <ref>", "head git ref", "HEAD")
  .option("--root <path>", "workspace root", process.cwd())
  .option("--format <format>", "markdown or json", "markdown")
  .option("--output <path>", "write report to a file")
  .option("--fail-on <severity>", "none, low, medium, high, or critical", "high")
  .action(async (options) => {
    try {
      const result = await runCiCommand(options);
      process.stdout.write(result.output);
      process.exitCode = result.exitCode;
    } catch (error) {
      process.stderr.write(`${formatError(error)}\n`);
      process.exitCode = 2;
    }
  });

program
  .command("explain")
  .description("Explain a ScopeDiff rule or finding id.")
  .argument("<finding-id>", "rule id, such as R012")
  .option("--format <format>", "markdown or json", "markdown")
  .action(async (id, options) => {
    await runCommand(async () => runExplainCommand(id, options));
  });

await program.parseAsync(process.argv);

async function runCommand(command: () => Promise<string>): Promise<void> {
  try {
    const output = await command();
    process.stdout.write(output);
  } catch (error) {
    process.stderr.write(`${formatError(error)}\n`);
    process.exitCode = 2;
  }
}

function formatError(error: unknown): string {
  return error instanceof Error
    ? `ScopeDiff error: ${error.message}`
    : `ScopeDiff error: ${String(error)}`;
}
