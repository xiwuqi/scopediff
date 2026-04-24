import { parsePackageJson } from "../parsers/package-json.js";
import type { FileSnapshot, FindingDraft, ReportError } from "../core/types.js";
import {
  createFinding,
  includesSensitiveOperation,
  includesTransparencyRisk,
  hasRemoteUrl
} from "./helpers.js";

const lifecycleScripts = new Set([
  "preinstall",
  "install",
  "postinstall",
  "prepare",
  "prepublish",
  "prepublishOnly"
]);

export function analyzePackageJson(files: FileSnapshot[]): {
  findings: FindingDraft[];
  errors: ReportError[];
} {
  const findings: FindingDraft[] = [];
  const errors: ReportError[] = [];

  for (const file of files.filter((candidate) => candidate.path === "package.json")) {
    const before = parsePackageJson(file.path, file.before);
    const after = parsePackageJson(file.path, file.after);
    errors.push(...before.errors, ...after.errors);

    for (const [name, script] of Object.entries(after.scripts)) {
      const previous = before.scripts[name];
      if (lifecycleScripts.has(name) && previous !== script) {
        findings.push(
          createFinding({
            ruleId: "R016",
            title: `Lifecycle script added or changed: ${name}`,
            category: "package",
            file,
            evidence: `"${name}": "${script}"`,
            previousValue: previous ?? null,
            currentValue: script,
            confidence: 0.95,
            isNewCapability: previous === undefined,
            isPermissionExpansion: true,
            lineNeedle: name
          })
        );
      }

      if (previous !== script && includesSensitiveOperation(script)) {
        findings.push(
          createFinding({
            ruleId: "R017",
            title: `Publish/deploy operation in npm script: ${name}`,
            category: "package",
            file,
            evidence: `"${name}": "${script}"`,
            previousValue: previous ?? null,
            currentValue: script,
            confidence: 0.85,
            isNewCapability: previous === undefined,
            isPermissionExpansion: true,
            lineNeedle: name
          })
        );
      }

      if (previous !== script && (includesTransparencyRisk(script) || hasRemoteUrl(script))) {
        findings.push(
          createFinding({
            ruleId: includesTransparencyRisk(script) ? "R020" : "R008",
            title: includesTransparencyRisk(script)
              ? `Remote script execution in npm script: ${name}`
              : `Remote URL in npm script: ${name}`,
            category: includesTransparencyRisk(script) ? "transparency" : "network",
            file,
            evidence: `"${name}": "${script}"`,
            previousValue: previous ?? null,
            currentValue: script,
            confidence: includesTransparencyRisk(script) ? 0.9 : 0.75,
            isNewCapability: previous === undefined,
            isPermissionExpansion: includesTransparencyRisk(script),
            lineNeedle: name
          })
        );
      }
    }
  }

  return { findings, errors };
}
