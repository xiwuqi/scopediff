import YAML from "yaml";
import type { ReportError } from "../core/types.js";

export interface ParseResult<T> {
  value: T | null;
  errors: ReportError[];
}

export function parseYaml<T = unknown>(file: string, content: string | null): ParseResult<T> {
  if (!content) {
    return { value: null, errors: [] };
  }

  try {
    return { value: YAML.parse(content) as T, errors: [] };
  } catch (error) {
    return {
      value: null,
      errors: [
        {
          file,
          message: `YAML parse failed; used text fallback: ${
            error instanceof Error ? error.message : String(error)
          }`,
          recoverable: true
        }
      ]
    };
  }
}
