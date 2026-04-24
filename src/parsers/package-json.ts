import { parseJson } from "./json.js";
import type { ReportError } from "../core/types.js";

export interface PackageJsonInfo {
  scripts: Record<string, string>;
  errors: ReportError[];
}

export function parsePackageJson(file: string, content: string | null): PackageJsonInfo {
  const parsed = parseJson<Record<string, unknown>>(file, content);
  const scripts =
    parsed.value?.scripts && typeof parsed.value.scripts === "object"
      ? Object.fromEntries(
          Object.entries(parsed.value.scripts as Record<string, unknown>).filter(
            (entry): entry is [string, string] => typeof entry[1] === "string"
          )
        )
      : {};

  return { scripts, errors: parsed.errors };
}
