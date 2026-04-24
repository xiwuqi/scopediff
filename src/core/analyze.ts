import path from "node:path";
import { discoverCurrentFiles } from "./file-discovery.js";
import { computeReportFields, finalizeFindings } from "./scoring.js";
import type { AnalysisInput, ScopeDiffReport } from "./types.js";
import { reportSchema } from "./types.js";
import { createGitDiffInput, getCurrentBranch, getRepoName, getRepoRoot } from "../git/diff.js";
import { analyzeRules } from "../rules/index.js";

export interface ScanOptions {
  root: string;
  maxFileSize: number;
}

export interface DiffOptions {
  root: string;
  baseRef: string;
  headRef?: string;
}

export async function scanWorkspace(options: ScanOptions): Promise<ScopeDiffReport> {
  const root = path.resolve(options.root);
  const discovery = await discoverCurrentFiles({ root, maxFileSize: options.maxFileSize });
  let repo = path.basename(root);
  let headRef: string | null = null;

  try {
    const repoRoot = await getRepoRoot(root);
    repo = await getRepoName(repoRoot);
    headRef = await getCurrentBranch(repoRoot);
  } catch {
    // scan works outside git.
  }

  return analyzeInput({
    repo,
    baseRef: null,
    headRef,
    files: discovery.files,
    skippedFiles: discovery.skippedFiles,
    errors: discovery.errors
  });
}

export async function diffWorkspace(options: DiffOptions): Promise<ScopeDiffReport> {
  const diff = await createGitDiffInput(options.root, options.baseRef, options.headRef ?? "HEAD");
  return analyzeInput({
    repo: diff.repoName,
    baseRef: diff.baseRef,
    headRef: diff.headRef,
    files: diff.files,
    skippedFiles: [],
    errors: diff.errors
  });
}

export function analyzeInput(input: AnalysisInput): ScopeDiffReport {
  const ruleResult = analyzeRules(input.files);
  const findings = finalizeFindings(ruleResult.findings);
  const report = computeReportFields({
    repo: input.repo,
    baseRef: input.baseRef,
    headRef: input.headRef,
    generatedAt: new Date().toISOString(),
    findings,
    skippedFiles: input.skippedFiles,
    errors: [...input.errors, ...ruleResult.errors]
  });

  reportSchema.parse(report);
  return report;
}
