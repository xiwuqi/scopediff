import { changedLines, lineForChangedText, lineOfNeedle } from "../core/line.js";
import { ruleInfo } from "../core/rules-info.js";
import type { Category, FileSnapshot, FindingDraft, Severity } from "../core/types.js";

export function isCredentialLike(value: string): boolean {
  return /(?:token|secret|api[_-]?key|credential|password|passwd|cookie|session|private[_-]?key)/i.test(
    value
  );
}

export function hasExecutableCommand(value: string): boolean {
  return /\b(?:npx|uvx|pipx|pip|docker|curl|bash|sh|python|python3|node|bun|deno)\b/i.test(value);
}

export function hasRemoteUrl(value: string): boolean {
  return /\b(?:https?:\/\/|git\+ssh:\/\/|ssh:\/\/|git@[\w.-]+:)/i.test(value);
}

export function hasUnpinnedRemotePackage(command: string | undefined, args: string[]): boolean {
  const joined = [command, ...args].filter(Boolean).join(" ");
  if (/\bdocker\b/i.test(joined) && /:latest\b/i.test(joined)) {
    return true;
  }

  if (/\bnpx\b/i.test(joined)) {
    const packageName = args.find((arg) => !arg.startsWith("-") && !arg.includes("="));
    return Boolean(packageName && !hasVersionPin(packageName));
  }

  if (/\b(?:uvx|pipx)\b/i.test(joined)) {
    const packageName = args.find((arg) => !arg.startsWith("-") && !arg.includes("="));
    return Boolean(packageName && !hasVersionPin(packageName));
  }

  if (/\bpip\s+install\b/i.test(joined)) {
    return !/[=@~<>]/.test(joined);
  }

  return false;
}

function hasVersionPin(packageName: string): boolean {
  if (packageName.startsWith("@")) {
    const secondAt = packageName.indexOf("@", 1);
    return secondAt > 1;
  }

  return packageName.includes("@") || /[=~<>]/.test(packageName);
}

export function includesSensitiveOperation(value: string): boolean {
  return /\b(?:npm\s+publish|pnpm\s+publish|yarn\s+npm\s+publish|docker\s+push|git\s+push|gh\s+release|deploy|release|upload|publish)\b/i.test(
    value
  );
}

export function includesTransparencyRisk(value: string): boolean {
  return (
    /\bcurl\b.+\|\s*(?:bash|sh|python|node)\b/i.test(value) ||
    /\bwget\b.+\|\s*(?:bash|sh|python|node)\b/i.test(value) ||
    /\beval\s*\(/i.test(value) ||
    /\bbase64\s+-d\b.+\|\s*(?:bash|sh)\b/i.test(value)
  );
}

export function includesPermissionBoundaryKeyword(value: string): boolean {
  return /\b(?:allowlist|denylist|sandbox|permission|permissions|scope|scopes|allow|deny|read_write|write_all|admin)\b/i.test(
    value
  );
}

export function includesHighPrivilegeInstruction(value: string): boolean {
  return /\b(?:read|write|execute|run|shell|network|fetch|download|upload|publish|delete|remove|commit|push|deploy|release|send|post)\b/i.test(
    value
  );
}

export function isLikelyNegativeInstruction(value: string): boolean {
  return /\b(?:do not|don't|never|must not|cannot|should not|without approval|ask before|禁止|不要|不得)\b/i.test(
    value
  );
}

export function addedTextLines(file: FileSnapshot): string[] {
  return changedLines(file.before, file.after);
}

export function createFinding(input: {
  ruleId: string;
  title?: string;
  category: Category;
  file: FileSnapshot;
  evidence: string;
  previousValue?: unknown;
  currentValue?: unknown;
  severity?: Severity;
  confidence: number;
  isNewCapability?: boolean;
  isPermissionExpansion?: boolean;
  relatedFiles?: string[];
  lineNeedle?: string;
  docsOnly?: boolean;
  negativeInstruction?: boolean;
}): FindingDraft {
  const info = ruleInfo[input.ruleId];
  const line =
    lineOfNeedle(input.file.after, input.lineNeedle ?? input.evidence) ??
    lineForChangedText(input.file.after, input.evidence);

  return {
    title: input.title ?? info.title,
    severity: input.severity ?? info.severity,
    category: input.category,
    file: input.file.path,
    lineStart: line,
    lineEnd: line,
    evidence: sanitizeEvidence(input.evidence),
    previousValue: input.previousValue ?? null,
    currentValue: input.currentValue ?? null,
    whyItMatters: info.whyItMatters,
    suggestedReview: info.suggestedReview,
    confidence: input.confidence,
    isNewCapability: input.isNewCapability ?? false,
    isPermissionExpansion: input.isPermissionExpansion ?? false,
    relatedFiles: input.relatedFiles ?? [],
    docsUrl: `https://github.com/xiwuqi/scopediff/blob/main/docs/risk-model.md#${input.ruleId.toLowerCase()}`,
    ruleId: input.ruleId,
    docsOnly: input.docsOnly,
    negativeInstruction: input.negativeInstruction
  };
}

function sanitizeEvidence(value: string): string {
  return value.replace(
    /(["']?)([A-Z0-9_]*(?:TOKEN|SECRET|PASSWORD|COOKIE|SESSION|KEY)[A-Z0-9_]*)(["']?)\s*[:=]\s*["'][^"']+["']/gi,
    "$1$2$3=<redacted>"
  );
}
