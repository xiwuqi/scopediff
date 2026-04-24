import path from "node:path";
import { execa } from "execa";
import { readFileSnapshot } from "../core/file-discovery.js";
import { toPosixPath } from "../core/paths.js";
import type { FileSnapshot, ReportError } from "../core/types.js";

export interface GitDiffResult {
  repoRoot: string;
  repoName: string;
  baseRef: string;
  headRef: string;
  files: FileSnapshot[];
  errors: ReportError[];
}

export async function getRepoRoot(cwd: string): Promise<string> {
  const result = await execa("git", ["rev-parse", "--show-toplevel"], { cwd });
  return result.stdout.trim();
}

export async function getRepoName(cwd: string): Promise<string> {
  try {
    const result = await execa("git", ["config", "--get", "remote.origin.url"], { cwd });
    const remote = result.stdout.trim();
    const match = remote.match(/[:/]([^/]+\/[^/.]+)(?:\.git)?$/);
    if (match) {
      return match[1];
    }
  } catch {
    // Fall back to folder name below.
  }

  const root = await getRepoRoot(cwd);
  return path.basename(root);
}

export async function getCurrentBranch(cwd: string): Promise<string> {
  try {
    const result = await execa("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd });
    return result.stdout.trim();
  } catch {
    return "HEAD";
  }
}

export async function readGitFile(cwd: string, ref: string, file: string): Promise<string | null> {
  try {
    const result = await execa("git", ["show", `${ref}:${file}`], {
      cwd,
      reject: false,
      maxBuffer: 20 * 1024 * 1024
    });
    if (result.exitCode !== 0) {
      return null;
    }
    return result.stdout;
  } catch {
    return null;
  }
}

export async function getChangedFiles(
  cwd: string,
  baseRef: string,
  headRef = "HEAD"
): Promise<string[]> {
  const ranges = [`${baseRef}...${headRef}`, `${baseRef}..${headRef}`];
  for (const range of ranges) {
    const result = await execa("git", ["diff", "--name-only", range], { cwd, reject: false });
    if (result.exitCode === 0) {
      return result.stdout
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map(toPosixPath);
    }
  }

  throw new Error(`Unable to diff against base ref '${baseRef}'. Make sure it exists locally.`);
}

export async function createGitDiffInput(
  cwd: string,
  baseRef: string,
  headRef = "HEAD"
): Promise<GitDiffResult> {
  const repoRoot = await getRepoRoot(cwd);
  const repoName = await getRepoName(repoRoot);
  const changedFiles = await getChangedFiles(repoRoot, baseRef, headRef);
  const errors: ReportError[] = [];
  const files: FileSnapshot[] = [];

  for (const file of changedFiles) {
    const before = await readGitFile(repoRoot, baseRef, file);
    files.push(await readFileSnapshot(repoRoot, file, before));
  }

  return {
    repoRoot,
    repoName,
    baseRef,
    headRef,
    files,
    errors
  };
}
