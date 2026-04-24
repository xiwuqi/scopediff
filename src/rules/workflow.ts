import { changedLines } from "../core/line.js";
import { parseWorkflow } from "../parsers/github-actions.js";
import type { FileSnapshot, FindingDraft, ReportError } from "../core/types.js";
import { createFinding, includesSensitiveOperation, includesTransparencyRisk } from "./helpers.js";

const sensitiveTriggers = new Set(["pull_request_target", "workflow_run", "repository_dispatch"]);
const permissionOrder: Record<string, number> = {
  none: 0,
  read: 1,
  write: 2
};

export function analyzeWorkflows(files: FileSnapshot[]): {
  findings: FindingDraft[];
  errors: ReportError[];
} {
  const findings: FindingDraft[] = [];
  const errors: ReportError[] = [];

  for (const file of files.filter((candidate) => isWorkflow(candidate.path))) {
    const before = parseWorkflow(file.path, file.before);
    const after = parseWorkflow(file.path, file.after);
    errors.push(...before.errors, ...after.errors);

    for (const [scope, currentPermission] of Object.entries(after.permissions)) {
      const previousPermission = before.permissions[scope] ?? "none";
      const currentRank = permissionRank(currentPermission);
      const previousRank = permissionRank(previousPermission);
      const isDiffExpansion = file.before !== null && currentRank > previousRank;
      const isHighAuthorityInScan = file.before === null && currentRank >= permissionOrder.write;

      if (isDiffExpansion || isHighAuthorityInScan) {
        findings.push(
          createFinding({
            ruleId: "R012",
            title: `Workflow permission expanded: ${scope} ${currentPermission}`,
            category: "workflow",
            file,
            evidence: `${scope}: ${currentPermission}`,
            previousValue: previousPermission,
            currentValue: currentPermission,
            confidence: 0.95,
            isPermissionExpansion: true,
            lineNeedle: scope
          })
        );
      }
    }

    for (const trigger of after.triggers) {
      if (!before.triggers.includes(trigger) && sensitiveTriggers.has(trigger)) {
        findings.push(
          createFinding({
            ruleId: "R013",
            title: `Sensitive workflow trigger added: ${trigger}`,
            category: "workflow",
            file,
            evidence: `on: ${trigger}`,
            currentValue: trigger,
            confidence: 0.95,
            isNewCapability: true,
            isPermissionExpansion: true,
            lineNeedle: trigger
          })
        );
      }
    }

    for (const line of changedLines(file.before, file.after)) {
      const trimmed = line.trim();
      if (/\$\{\{\s*secrets\.[A-Z0-9_]+\s*\}\}/i.test(trimmed)) {
        findings.push(
          createFinding({
            ruleId: "R014",
            title: "Workflow secret usage added",
            category: "workflow",
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

      const actionMatch = trimmed.match(/uses:\s*([^@\s]+)@([^\s#]+)/);
      if (
        actionMatch &&
        !actionMatch[1].startsWith("./") &&
        !/^[a-f0-9]{40}$/i.test(actionMatch[2])
      ) {
        findings.push(
          createFinding({
            ruleId: "R015",
            title: `External action not pinned to SHA: ${actionMatch[1]}@${actionMatch[2]}`,
            category: "workflow",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: 0.85,
            isNewCapability: true,
            lineNeedle: trimmed
          })
        );
      }

      if (includesSensitiveOperation(trimmed)) {
        findings.push(
          createFinding({
            ruleId: "R017",
            title: "Release or deployment operation added",
            category: "workflow",
            file,
            evidence: trimmed,
            currentValue: trimmed,
            confidence: 0.82,
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
            title: "Remote script execution added",
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

  return { findings, errors };
}

function isWorkflow(file: string): boolean {
  return /^\.github\/workflows\/.+\.ya?ml$/.test(file);
}

function permissionRank(permission: string): number {
  const normalized = permission.toLowerCase();
  if (normalized === "write-all") {
    return 2;
  }
  if (normalized === "read-all") {
    return 1;
  }
  return permissionOrder[normalized] ?? 0;
}
