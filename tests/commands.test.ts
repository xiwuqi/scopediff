import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execa } from "execa";
import { describe, expect, it } from "vitest";
import { runCiCommand } from "../src/commands/ci.js";
import { runScanCommand } from "../src/commands/scan.js";

describe("commands", () => {
  it("scan works outside git", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "scopediff-scan-"));
    await fs.writeFile(
      path.join(root, ".mcp.json"),
      JSON.stringify({
        mcpServers: {
          github: {
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-github"],
            env: { GITHUB_TOKEN: "${GITHUB_TOKEN}" }
          }
        }
      })
    );

    const output = await runScanCommand({ root, format: "json" });
    const report = JSON.parse(output);
    expect(report.findings.length).toBeGreaterThan(0);
  });

  it("ci returns exit code 3 when threshold is met", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "scopediff-ci-"));
    await git(root, ["init"]);
    await git(root, ["config", "user.email", "test@example.com"]);
    await git(root, ["config", "user.name", "ScopeDiff Test"]);
    await fs.writeFile(path.join(root, "README.md"), "# fixture\n");
    await git(root, ["add", "."]);
    await git(root, ["commit", "-m", "initial"]);
    await git(root, ["branch", "-M", "main"]);
    await fs.writeFile(
      path.join(root, ".mcp.json"),
      JSON.stringify({
        mcpServers: {
          github: {
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-github"],
            env: { GITHUB_TOKEN: "${GITHUB_TOKEN}" }
          }
        }
      })
    );
    await git(root, ["add", ".mcp.json"]);
    await git(root, ["commit", "-m", "add mcp"]);

    const result = await runCiCommand({ root, base: "main~1", failOn: "high", format: "json" });
    expect(result.exitCode).toBe(3);
    expect(JSON.parse(result.output).riskLevel).toBe("high");
  });
});

async function git(cwd: string, args: string[]) {
  await execa("git", args, { cwd });
}
