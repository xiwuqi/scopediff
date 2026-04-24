import { parseMcpConfig } from "../parsers/mcp.js";
import type { FileSnapshot, FindingDraft, ReportError } from "../core/types.js";
import {
  createFinding,
  hasExecutableCommand,
  hasRemoteUrl,
  hasUnpinnedRemotePackage,
  isCredentialLike
} from "./helpers.js";

const mcpFiles = new Set([".mcp.json", "mcp.json", ".cursor/mcp.json"]);

export function analyzeMcp(files: FileSnapshot[]): {
  findings: FindingDraft[];
  errors: ReportError[];
} {
  const findings: FindingDraft[] = [];
  const errors: ReportError[] = [];

  for (const file of files.filter((candidate) => mcpFiles.has(candidate.path))) {
    const before = parseMcpConfig(file.path, file.before);
    const after = parseMcpConfig(file.path, file.after);
    errors.push(...before.errors, ...after.errors);

    for (const [name, server] of after.servers) {
      const previous = before.servers.get(name);
      const serverEvidence = `mcpServers.${name}.command = ${server.command ?? "<missing>"}`;

      if (!previous) {
        findings.push(
          createFinding({
            ruleId: "R001",
            title: `MCP server added: ${name}`,
            category: "mcp",
            file,
            evidence: serverEvidence,
            currentValue: {
              command: server.command ?? null,
              args: server.args,
              envKeys: Object.keys(server.env)
            },
            confidence: 0.95,
            isNewCapability: true,
            isPermissionExpansion: true,
            lineNeedle: name
          })
        );
      } else {
        if ((previous.command ?? null) !== (server.command ?? null)) {
          findings.push(
            createFinding({
              ruleId: "R002",
              title: `MCP command changed for ${name}`,
              category: "mcp",
              file,
              evidence: `mcpServers.${name}.command changed to ${server.command ?? "<missing>"}`,
              previousValue: previous.command ?? null,
              currentValue: server.command ?? null,
              confidence: 0.95,
              isPermissionExpansion: true,
              lineNeedle: server.command ?? name
            })
          );
        }

        if (JSON.stringify(previous.args) !== JSON.stringify(server.args)) {
          findings.push(
            createFinding({
              ruleId: "R003",
              title: `MCP args changed for ${name}`,
              category: "mcp",
              file,
              evidence: `mcpServers.${name}.args changed`,
              previousValue: previous.args,
              currentValue: server.args,
              confidence: 0.9,
              isPermissionExpansion: true,
              lineNeedle: server.args[0] ?? name
            })
          );
        }
      }

      const previousEnv = previous?.env ?? {};
      for (const envKey of Object.keys(server.env)) {
        if (!(envKey in previousEnv)) {
          findings.push(
            createFinding({
              ruleId: "R004",
              title: `MCP env variable added: ${envKey}`,
              category: "mcp",
              file,
              evidence: `env key ${envKey}`,
              currentValue: envKey,
              confidence: 0.9,
              isNewCapability: true,
              isPermissionExpansion: true,
              lineNeedle: envKey
            })
          );

          if (isCredentialLike(envKey)) {
            findings.push(
              createFinding({
                ruleId: "R005",
                title: `Credential-like env var referenced: ${envKey}`,
                category: "credential",
                file,
                evidence: `env key ${envKey}`,
                currentValue: envKey,
                confidence: 0.9,
                isNewCapability: true,
                isPermissionExpansion: true,
                lineNeedle: envKey
              })
            );
          }
        }
      }

      const commandAndArgs = [server.command, ...server.args].filter(Boolean).join(" ");
      if (
        hasExecutableCommand(commandAndArgs) &&
        (!previous ||
          commandAndArgs !== [previous.command, ...previous.args].filter(Boolean).join(" "))
      ) {
        findings.push(
          createFinding({
            ruleId: "R006",
            title: `Executable command in MCP server: ${name}`,
            category: "execution",
            file,
            evidence: commandAndArgs,
            currentValue: commandAndArgs,
            confidence: 0.85,
            isNewCapability: !previous,
            isPermissionExpansion: true,
            lineNeedle: server.command ?? server.args[0] ?? name
          })
        );
      }

      if (hasUnpinnedRemotePackage(server.command, server.args)) {
        findings.push(
          createFinding({
            ruleId: "R007",
            title: `Unpinned remote package for MCP server: ${name}`,
            category: "package",
            file,
            evidence: commandAndArgs,
            currentValue: commandAndArgs,
            confidence: 0.85,
            isNewCapability: !previous,
            isPermissionExpansion: true,
            lineNeedle: server.args.find((arg) => !arg.startsWith("-")) ?? name
          })
        );
      }

      if (hasRemoteUrl(commandAndArgs)) {
        findings.push(
          createFinding({
            ruleId: "R008",
            title: `Remote URL in MCP server: ${name}`,
            category: "network",
            file,
            evidence: commandAndArgs,
            currentValue: commandAndArgs,
            confidence: 0.75,
            isNewCapability: !previous,
            lineNeedle: server.args.find((arg) => hasRemoteUrl(arg)) ?? name
          })
        );
      }
    }
  }

  return { findings, errors };
}
