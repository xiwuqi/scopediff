import type { FileSnapshot, FindingDraft } from "../core/types.js";
import {
  addedTextLines,
  createFinding,
  hasRemoteUrl,
  includesHighPrivilegeInstruction,
  includesPermissionBoundaryKeyword,
  includesTransparencyRisk,
  isLikelyNegativeInstruction
} from "./helpers.js";

export function analyzeInstructions(files: FileSnapshot[]): FindingDraft[] {
  const findings: FindingDraft[] = [];

  for (const file of files.filter((candidate) => isInstructionFile(candidate.path))) {
    const docsOnly = file.path.startsWith("docs/");

    for (const line of addedTextLines(file)) {
      const trimmed = line.trim();
      if (trimmed.length < 3) {
        continue;
      }

      const negativeInstruction = isLikelyNegativeInstruction(trimmed);
      if (includesHighPrivilegeInstruction(trimmed) && !negativeInstruction) {
        const isAgents = file.path === "AGENTS.md";
        findings.push(
          createFinding({
            ruleId: isAgents ? "R010" : "R011",
            title: isAgents
              ? "High-privilege AGENTS.md instruction added"
              : "High-privilege agent instruction added",
            category: "instruction",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: docsOnly ? 0.55 : 0.72,
            isNewCapability: true,
            isPermissionExpansion: true,
            lineNeedle: trimmed,
            docsOnly,
            negativeInstruction
          })
        );
      }

      if (includesPermissionBoundaryKeyword(trimmed)) {
        findings.push(
          createFinding({
            ruleId: "R019",
            title: "Permission boundary wording changed",
            category: "config",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: docsOnly ? 0.55 : 0.7,
            isPermissionExpansion: !negativeInstruction,
            lineNeedle: trimmed,
            docsOnly,
            negativeInstruction
          })
        );
      }

      if (includesTransparencyRisk(trimmed)) {
        findings.push(
          createFinding({
            ruleId: "R020",
            title: "Remote script execution instruction added",
            category: "transparency",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: 0.9,
            isNewCapability: true,
            isPermissionExpansion: true,
            lineNeedle: trimmed,
            docsOnly
          })
        );
      } else if (
        hasRemoteUrl(trimmed) &&
        /```|`|\bcurl\b|\bwget\b|\bgit\s+clone\b/i.test(trimmed)
      ) {
        findings.push(
          createFinding({
            ruleId: "R008",
            title: "Remote URL added in agent setup text",
            category: "network",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: docsOnly ? 0.55 : 0.7,
            isNewCapability: !docsOnly,
            lineNeedle: trimmed,
            docsOnly
          })
        );
      }
    }
  }

  return findings;
}

function isInstructionFile(file: string): boolean {
  return (
    file === "AGENTS.md" ||
    file === "CLAUDE.md" ||
    file === "GEMINI.md" ||
    file === ".github/copilot-instructions.md" ||
    file.startsWith(".cursor/rules/") ||
    file.startsWith(".claude/skills/") ||
    (file.startsWith("docs/") && /(?:agent|mcp|cursor|claude)/i.test(file))
  );
}
