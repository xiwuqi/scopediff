import { parseJson } from "./json.js";
import type { ReportError } from "../core/types.js";

export interface McpServer {
  name: string;
  command?: string;
  args: string[];
  env: Record<string, string>;
  raw: unknown;
}

export interface McpConfig {
  servers: Map<string, McpServer>;
  errors: ReportError[];
}

export function parseMcpConfig(file: string, content: string | null): McpConfig {
  const parsed = parseJson<Record<string, unknown>>(file, content);
  const servers = new Map<string, McpServer>();

  if (!parsed.value || typeof parsed.value !== "object") {
    return { servers, errors: parsed.errors };
  }

  const root = parsed.value;
  const mcpServers = root.mcpServers;
  if (!mcpServers || typeof mcpServers !== "object" || Array.isArray(mcpServers)) {
    return { servers, errors: parsed.errors };
  }

  for (const [name, rawServer] of Object.entries(mcpServers as Record<string, unknown>)) {
    if (!rawServer || typeof rawServer !== "object" || Array.isArray(rawServer)) {
      continue;
    }

    const server = rawServer as Record<string, unknown>;
    const rawArgs = Array.isArray(server.args) ? server.args : [];
    const rawEnv = server.env && typeof server.env === "object" ? server.env : {};

    servers.set(name, {
      name,
      command: typeof server.command === "string" ? server.command : undefined,
      args: rawArgs.filter((arg): arg is string => typeof arg === "string"),
      env: Object.fromEntries(
        Object.entries(rawEnv as Record<string, unknown>)
          .filter((entry): entry is [string, string] => typeof entry[1] === "string")
          .map(([key, value]) => [key, value])
      ),
      raw: rawServer
    });
  }

  return { servers, errors: parsed.errors };
}
