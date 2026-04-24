import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import { isInside, relativePath, toPosixPath } from "./paths.js";
import type { FileSnapshot, ReportError, SkippedFile } from "./types.js";

export const defaultScanPatterns = [
  ".mcp.json",
  "mcp.json",
  ".cursor/mcp.json",
  ".cursor/rules/**",
  ".claude/settings.json",
  ".claude/skills/**/SKILL.md",
  "AGENTS.md",
  "CLAUDE.md",
  "GEMINI.md",
  ".github/copilot-instructions.md",
  ".github/workflows/*.yml",
  ".github/workflows/*.yaml",
  "package.json",
  "pnpm-workspace.yaml",
  "docker-compose.yml",
  "Dockerfile",
  ".env.example",
  "docs/**/*agent*",
  "docs/**/*mcp*",
  "docs/**/*cursor*",
  "docs/**/*claude*"
];

const ignored = [
  "**/.git/**",
  "**/node_modules/**",
  "**/dist/**",
  "**/coverage/**",
  "**/.env",
  "**/.env.*"
];

export interface DiscoverOptions {
  root: string;
  maxFileSize: number;
  patterns?: string[];
}

export interface DiscoveryResult {
  files: FileSnapshot[];
  skippedFiles: SkippedFile[];
  errors: ReportError[];
}

export async function discoverCurrentFiles(options: DiscoverOptions): Promise<DiscoveryResult> {
  const root = path.resolve(options.root);
  const patterns = options.patterns ?? defaultScanPatterns;
  const entries = await fg(patterns, {
    cwd: root,
    onlyFiles: true,
    dot: true,
    followSymbolicLinks: false,
    ignore: ignored,
    unique: true
  });

  const files: FileSnapshot[] = [];
  const skippedFiles: SkippedFile[] = [];
  const errors: ReportError[] = [];
  const seenRealPaths = new Set<string>();

  for (const entry of entries.sort()) {
    const absolute = path.resolve(root, entry);
    const rel = toPosixPath(entry);

    try {
      const lstat = await fs.lstat(absolute);
      if (lstat.isSymbolicLink()) {
        const real = await fs.realpath(absolute);
        if (!isInside(root, real)) {
          skippedFiles.push({ file: rel, reason: "symlink points outside repository" });
          continue;
        }
        if (seenRealPaths.has(real)) {
          skippedFiles.push({ file: rel, reason: "duplicate symlink target" });
          continue;
        }
        seenRealPaths.add(real);
      }

      const stat = await fs.stat(absolute);
      if (stat.size > options.maxFileSize) {
        skippedFiles.push({ file: rel, reason: "file exceeds max size", sizeBytes: stat.size });
        continue;
      }

      const content = await fs.readFile(absolute, "utf8");
      files.push({ path: rel, before: null, after: content });
    } catch (error) {
      errors.push({
        file: rel,
        message: error instanceof Error ? error.message : String(error),
        recoverable: true
      });
    }
  }

  return { files, skippedFiles, errors };
}

export async function readFileSnapshot(
  root: string,
  relative: string,
  before: string | null
): Promise<FileSnapshot> {
  const absolute = path.resolve(root, relative);
  const rel = relativePath(root, absolute);

  try {
    const content = await fs.readFile(absolute, "utf8");
    return { path: rel, before, after: content };
  } catch {
    return { path: rel, before, after: null };
  }
}
