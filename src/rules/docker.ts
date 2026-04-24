import { changedLines } from "../core/line.js";
import type { FileSnapshot, FindingDraft } from "../core/types.js";
import { createFinding, includesTransparencyRisk } from "./helpers.js";

export function analyzeDocker(files: FileSnapshot[]): FindingDraft[] {
  const findings: FindingDraft[] = [];

  for (const file of files.filter((candidate) => isDockerFile(candidate.path))) {
    for (const line of changedLines(file.before, file.after)) {
      const trimmed = line.trim();
      if (isDockerRisk(trimmed)) {
        findings.push(
          createFinding({
            ruleId: "R009",
            title: "High-risk Docker configuration added",
            category: "docker",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: 0.85,
            isNewCapability: true,
            isPermissionExpansion: true,
            lineNeedle: trimmed
          })
        );
      }

      if (includesTransparencyRisk(trimmed)) {
        findings.push(
          createFinding({
            ruleId: "R020",
            title: "Remote script execution in Docker file",
            category: "transparency",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: 0.9,
            isNewCapability: true,
            isPermissionExpansion: true,
            lineNeedle: trimmed
          })
        );
      }
    }
  }

  return findings;
}

function isDockerFile(file: string): boolean {
  return file === "Dockerfile" || file === "docker-compose.yml" || file.endsWith("/Dockerfile");
}

function isDockerRisk(value: string): boolean {
  return (
    /\bprivileged:\s*true\b/i.test(value) ||
    /\b--privileged\b/i.test(value) ||
    /\bnetwork_mode:\s*host\b/i.test(value) ||
    /\b--network[=\s]+host\b/i.test(value) ||
    /\/var\/run\/docker\.sock/i.test(value) ||
    /\buser:\s*root\b/i.test(value)
  );
}
