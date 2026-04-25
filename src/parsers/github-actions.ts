import { parseYaml } from "./yaml.js";
import type { ReportError } from "../core/types.js";

export interface WorkflowInfo {
  data: Record<string, unknown> | null;
  permissions: Record<string, string>;
  triggers: string[];
  errors: ReportError[];
}

export function parseWorkflow(file: string, content: string | null): WorkflowInfo {
  const parsed = parseYaml<Record<string, unknown>>(file, content);
  if (!parsed.value || typeof parsed.value !== "object") {
    return { data: null, permissions: {}, triggers: [], errors: parsed.errors };
  }

  return {
    data: parsed.value,
    permissions: {
      ...normalizePermissions(parsed.value.permissions),
      ...normalizeJobPermissions(parsed.value.jobs)
    },
    triggers: normalizeTriggers(parsed.value.on),
    errors: parsed.errors
  };
}

export function normalizePermissions(value: unknown): Record<string, string> {
  if (!value) {
    return {};
  }

  if (typeof value === "string") {
    return { "*": value };
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, permission]) => [
      key,
      String(permission)
    ])
  );
}

function normalizeJobPermissions(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const permissions: Record<string, string> = {};
  for (const [jobId, rawJob] of Object.entries(value as Record<string, unknown>)) {
    if (!rawJob || typeof rawJob !== "object" || Array.isArray(rawJob)) {
      continue;
    }

    const jobPermissions = normalizePermissions((rawJob as Record<string, unknown>).permissions);
    for (const [scope, permission] of Object.entries(jobPermissions)) {
      permissions[`jobs.${jobId}.${scope}`] = permission;
    }
  }

  return permissions;
}

export function normalizeTriggers(value: unknown): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>);
  }

  return [];
}
