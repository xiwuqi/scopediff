import type { ReportError } from "../core/types.js";

export interface ParseResult<T> {
  value: T | null;
  errors: ReportError[];
}

export function parseJson<T = unknown>(file: string, content: string | null): ParseResult<T> {
  if (!content) {
    return { value: null, errors: [] };
  }

  try {
    return { value: JSON.parse(content) as T, errors: [] };
  } catch (error) {
    return {
      value: null,
      errors: [
        {
          file,
          message: `JSON parse failed: ${error instanceof Error ? error.message : String(error)}`,
          recoverable: true
        }
      ]
    };
  }
}
