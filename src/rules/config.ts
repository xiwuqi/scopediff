import { changedLines } from "../core/line.js";
import type { FileSnapshot, FindingDraft } from "../core/types.js";
import {
  createFinding,
  hasRemoteUrl,
  includesPermissionBoundaryKeyword,
  isCredentialLike
} from "./helpers.js";

export function analyzeConfig(files: FileSnapshot[]): FindingDraft[] {
  const findings: FindingDraft[] = [];

  for (const file of files.filter((candidate) => isConfigFile(candidate.path))) {
    for (const line of changedLines(file.before, file.after)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const key = trimmed.split(/[=:]/)[0]?.trim() ?? trimmed;
      if (isCredentialLike(key)) {
        findings.push(
          createFinding({
            ruleId: "R005",
            title: `Credential-like config variable referenced: ${key}`,
            category: "credential",
            file,
            evidence: trimmed,
            currentValue: key,
            confidence: 0.78,
            isNewCapability: true,
            isPermissionExpansion: true,
            lineNeedle: key
          })
        );
      }

      if (includesPermissionBoundaryKeyword(trimmed)) {
        findings.push(
          createFinding({
            ruleId: "R018",
            title: "Permission-related config changed",
            category: "config",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: 0.65,
            isPermissionExpansion: true,
            lineNeedle: trimmed
          })
        );
      }

      if (hasRemoteUrl(trimmed)) {
        findings.push(
          createFinding({
            ruleId: "R008",
            title: "Remote URL added in config",
            category: "network",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: 0.65,
            isNewCapability: true,
            lineNeedle: trimmed
          })
        );
      }
    }
  }

  return findings;
}

function isConfigFile(file: string): boolean {
  return (
    file === ".env.example" ||
    file === ".claude/settings.json" ||
    file === "pnpm-workspace.yaml" ||
    file.endsWith("/settings.json")
  );
}
