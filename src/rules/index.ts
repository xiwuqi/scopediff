import type { FileSnapshot, FindingDraft, ReportError } from "../core/types.js";
import { analyzeConfig } from "./config.js";
import { analyzeDocker } from "./docker.js";
import { analyzeInstructions } from "./instructions.js";
import { analyzeMcp } from "./mcp.js";
import { analyzePackageJson } from "./package.js";
import { analyzeWorkflows } from "./workflow.js";

export interface RuleAnalysisResult {
  findings: FindingDraft[];
  errors: ReportError[];
}

export function analyzeRules(files: FileSnapshot[]): RuleAnalysisResult {
  const findings: FindingDraft[] = [];
  const errors: ReportError[] = [];

  const mcp = analyzeMcp(files);
  findings.push(...mcp.findings);
  errors.push(...mcp.errors);

  const workflows = analyzeWorkflows(files);
  findings.push(...workflows.findings);
  errors.push(...workflows.errors);

  const packages = analyzePackageJson(files);
  findings.push(...packages.findings);
  errors.push(...packages.errors);

  findings.push(...analyzeDocker(files));
  findings.push(...analyzeInstructions(files));
  findings.push(...analyzeConfig(files));

  return { findings, errors };
}
