import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = join(repoRoot, "dist", "cli.js");
const assetsDir = join(repoRoot, "docs", "demo", "assets");
const demoReportPath = join(repoRoot, "docs", "demo", "scopediff-report.md");
const demoReportJsonPath = join(repoRoot, "docs", "demo", "scopediff-report.json");
const sansFont = "DejaVu Sans, Arial, Helvetica, sans-serif";
const monoFont = "DejaVu Sans Mono, Menlo, Consolas, monospace";

mkdirSync(assetsDir, { recursive: true });

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options
  });
}

function write(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, value);
}

function optionalRun(command, args) {
  try {
    execFileSync(command, args, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapLine(line, width) {
  if (line.length <= width) return [line];
  const chunks = [];
  let remaining = line;
  while (remaining.length > width) {
    let cut = remaining.lastIndexOf(" ", width);
    if (cut < width * 0.55) cut = width;
    chunks.push(remaining.slice(0, cut));
    remaining = remaining.slice(cut).trimStart();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

function terminalSvg({ title, command, output, width = 1280, maxLines = 38 }) {
  const lineHeight = 24;
  const headerHeight = 58;
  const paddingX = 34;
  const paddingY = 30;
  const wrapped = [
    `$ ${command}`,
    "",
    ...output
      .trim()
      .split("\n")
      .flatMap((line) => wrapLine(line, 112))
  ].slice(0, maxLines);
  const height = headerHeight + paddingY * 2 + wrapped.length * lineHeight;
  const text = wrapped
    .map((line, index) => {
      const y = headerHeight + paddingY + index * lineHeight;
      const color = line.startsWith("$")
        ? "#9ae6b4"
        : line.startsWith("#") || line.startsWith("##") || line.startsWith("###")
          ? "#93c5fd"
          : line.includes("Risk: High") || line.includes("Critical")
            ? "#fca5a5"
            : line.includes("Severity: Medium")
              ? "#fbbf24"
              : "#dbeafe";
      return `<text x="${paddingX}" y="${y}" fill="${color}">${escapeXml(line)}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#101827"/>
      <stop offset="100%" stop-color="#182235"/>
    </linearGradient>
    <filter id="shadow" x="-8%" y="-12%" width="116%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#020617" flood-opacity="0.32"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" rx="24" fill="#e2e8f0"/>
  <rect x="26" y="24" width="${width - 52}" height="${height - 48}" rx="18" fill="url(#bg)" filter="url(#shadow)"/>
  <rect x="26" y="24" width="${width - 52}" height="${headerHeight}" rx="18" fill="#0f172a"/>
  <circle cx="60" cy="53" r="8" fill="#fb7185"/>
  <circle cx="88" cy="53" r="8" fill="#fbbf24"/>
  <circle cx="116" cy="53" r="8" fill="#34d399"/>
  <text x="640" y="58" text-anchor="middle" fill="#94a3b8" font-family="${monoFont}" font-size="15">${escapeXml(title)}</text>
  <g font-family="${monoFont}" font-size="18">
${text}
  </g>
</svg>
`;
}

function socialPreviewSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="ScopeDiff social preview">
  <defs>
    <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="55%" stop-color="#172554"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#hero)"/>
  <rect x="72" y="70" width="1056" height="490" rx="28" fill="#020617" opacity="0.78"/>
  <text x="110" y="160" fill="#f8fafc" font-family="${sansFont}" font-size="74" font-weight="800">ScopeDiff</text>
  <text x="112" y="218" fill="#bfdbfe" font-family="${sansFont}" font-size="30">Review AI agent permissions before merge</text>
  <rect x="112" y="270" width="510" height="206" rx="16" fill="#0f172a" stroke="#334155"/>
  <text x="144" y="320" fill="#93c5fd" font-family="${monoFont}" font-size="25">ScopeDiff Report</text>
  <text x="144" y="366" fill="#fca5a5" font-family="${monoFont}" font-size="23">Risk: High</text>
  <text x="144" y="410" fill="#dbeafe" font-family="${monoFont}" font-size="22">+ MCP server: github</text>
  <text x="144" y="448" fill="#dbeafe" font-family="${monoFont}" font-size="22">+ Env: GITHUB_TOKEN</text>
  <text x="680" y="320" fill="#f8fafc" font-family="${sansFont}" font-size="34" font-weight="700">Local-first CLI</text>
  <text x="680" y="372" fill="#dbeafe" font-family="${sansFont}" font-size="27">No telemetry · No code upload</text>
  <text x="680" y="424" fill="#dbeafe" font-family="${sansFont}" font-size="27">Markdown + JSON reports</text>
  <text x="680" y="476" fill="#dbeafe" font-family="${sansFont}" font-size="27">GitHub Actions ready</text>
</svg>
`;
}

function featureCardsSvg() {
  const cards = [
    ["MCP changes", "New servers, commands, args, and env keys."],
    ["Workflow permissions", "Expanded permissions and sensitive triggers."],
    ["Review evidence", "File, line, severity, confidence, and suggestions."],
    ["Local-first", "No telemetry, upload, or command execution."]
  ];
  const cardMarkup = cards
    .map((card, index) => {
      const x = index % 2 === 0 ? 90 : 625;
      const y = index < 2 ? 220 : 390;
      return `<rect x="${x}" y="${y}" width="485" height="124" rx="18" fill="#0f172a" stroke="#334155"/>
  <text x="${x + 30}" y="${y + 48}" fill="#bfdbfe" font-family="${sansFont}" font-size="27" font-weight="700">${escapeXml(card[0])}</text>
  <text x="${x + 30}" y="${y + 86}" fill="#e2e8f0" font-family="${sansFont}" font-size="19">${escapeXml(card[1])}</text>`;
    })
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="ScopeDiff feature overview">
  <rect width="1200" height="630" fill="#e2e8f0"/>
  <rect x="54" y="54" width="1092" height="522" rx="30" fill="#020617"/>
  <text x="90" y="135" fill="#f8fafc" font-family="${sansFont}" font-size="56" font-weight="800">What ScopeDiff checks</text>
  <text x="92" y="181" fill="#bfdbfe" font-family="${sansFont}" font-size="25">Review agent/tooling capability changes before merge</text>
  ${cardMarkup}
</svg>
`;
}

function quickStartSvg() {
  const commands = [
    ["Install-free scan", "npx scopediff@latest scan"],
    ["Compare a branch", "npx scopediff@latest diff --base main"],
    ["CI threshold", "npx scopediff@latest ci --fail-on high"]
  ];
  const rows = commands
    .map((row, index) => {
      const y = 250 + index * 88;
      return `<text x="120" y="${y}" fill="#2563eb" font-family="${sansFont}" font-size="24" font-weight="700">${escapeXml(row[0])}</text>
  <rect x="390" y="${y - 38}" width="660" height="54" rx="12" fill="#0f172a" stroke="#334155"/>
  <text x="420" y="${y - 4}" fill="#9ae6b4" font-family="${monoFont}" font-size="22">${escapeXml(row[1])}</text>`;
    })
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="ScopeDiff quick start commands">
  <rect width="1200" height="630" fill="#0f172a"/>
  <rect x="64" y="64" width="1072" height="502" rx="28" fill="#f8fafc"/>
  <text x="120" y="145" fill="#0f172a" font-family="${sansFont}" font-size="58" font-weight="800">30-second quick start</text>
  <text x="122" y="190" fill="#475569" font-family="${sansFont}" font-size="25">No setup service. No code upload. Run it where you review.</text>
  ${rows}
</svg>
`;
}

function githubSummaryMockSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="ScopeDiff GitHub Step Summary layout mock">
  <rect width="1200" height="630" fill="#f6f8fa"/>
  <rect x="76" y="60" width="1048" height="510" rx="18" fill="#ffffff" stroke="#d0d7de"/>
  <text x="112" y="120" fill="#24292f" font-family="${sansFont}" font-size="42" font-weight="800">GitHub Step Summary</text>
  <text x="112" y="160" fill="#57606a" font-family="${sansFont}" font-size="20">Layout mock based on ScopeDiff Markdown output</text>
  <line x1="112" y1="190" x2="1088" y2="190" stroke="#d8dee4"/>
  <text x="112" y="240" fill="#0969da" font-family="${sansFont}" font-size="32" font-weight="700">ScopeDiff Report</text>
  <rect x="112" y="272" width="170" height="42" rx="21" fill="#ffebe9" stroke="#ff8182"/>
  <text x="145" y="301" fill="#cf222e" font-family="${sansFont}" font-size="20" font-weight="700">Risk: High</text>
  <text x="112" y="356" fill="#24292f" font-family="${sansFont}" font-size="24">New agent capability detected</text>
  <text x="140" y="406" fill="#57606a" font-family="${monoFont}" font-size="20">• MCP server added: github</text>
  <text x="140" y="446" fill="#57606a" font-family="${monoFont}" font-size="20">• Env required: GITHUB_TOKEN</text>
  <text x="140" y="486" fill="#57606a" font-family="${monoFont}" font-size="20">• Workflow permissions expanded</text>
  <text x="112" y="540" fill="#57606a" font-family="${sansFont}" font-size="18">Default behavior: write summary only. No PR comment unless explicitly enabled in a future version.</text>
</svg>
`;
}

const demoDir = mkdtempSync(join(tmpdir(), "scopediff-demo-"));

try {
  run("git", ["init", "-q", "-b", "main"], { cwd: demoDir });
  run("git", ["config", "user.email", "demo@example.com"], { cwd: demoDir });
  run("git", ["config", "user.name", "ScopeDiff Demo"], { cwd: demoDir });
  mkdirSync(join(demoDir, ".github", "workflows"), { recursive: true });
  write(
    join(demoDir, ".github", "workflows", "ci.yml"),
    `name: CI
on:
  pull_request:
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
`
  );
  write(join(demoDir, "AGENTS.md"), "Keep agent changes reviewable.\n");
  run("git", ["add", "."], { cwd: demoDir });
  run("git", ["commit", "-q", "-m", "baseline"], { cwd: demoDir });

  write(
    join(demoDir, ".mcp.json"),
    JSON.stringify(
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
    ) + "\n"
  );
  write(
    join(demoDir, ".github", "workflows", "ci.yml"),
    `name: CI
on:
  pull_request_target:
permissions:
  contents: write
  pull-requests: write
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm publish
        env:
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
`
  );
  write(
    join(demoDir, "AGENTS.md"),
    "Agent may read repository files, run shell commands, and push release changes after approval.\n"
  );
  run("git", ["checkout", "-q", "-b", "feature/agent-tooling"], { cwd: demoDir });
  run("git", ["add", "."], { cwd: demoDir });
  run("git", ["commit", "-q", "-m", "expand agent tooling"], { cwd: demoDir });

  const diffReport = run("node", [cliPath, "diff", "--base", "main", "--format", "markdown"], {
    cwd: demoDir
  });
  const diffJson = run("node", [cliPath, "diff", "--base", "main", "--format", "json"], {
    cwd: demoDir
  });
  const explain = run("node", [cliPath, "explain", "R012"], { cwd: demoDir });

  write(demoReportPath, diffReport);
  write(demoReportJsonPath, diffJson);
  const diffSvg = join(assetsDir, "scopediff-diff-report.svg");
  const explainSvg = join(assetsDir, "scopediff-explain.svg");
  const socialSvg = join(assetsDir, "social-preview.svg");
  const featureSvg = join(assetsDir, "feature-overview.svg");
  const quickStartSvgPath = join(assetsDir, "quick-start.svg");
  const githubSummarySvg = join(assetsDir, "github-step-summary-mock.svg");

  write(
    diffSvg,
    terminalSvg({
      title: "ScopeDiff diff report",
      command: "npx scopediff@latest diff --base main",
      output: diffReport,
      maxLines: 35
    })
  );
  write(
    explainSvg,
    terminalSvg({
      title: "ScopeDiff explain",
      command: "npx scopediff@latest explain R012",
      output: explain,
      maxLines: 24
    })
  );
  write(socialSvg, socialPreviewSvg());
  write(featureSvg, featureCardsSvg());
  write(quickStartSvgPath, quickStartSvg());
  write(githubSummarySvg, githubSummaryMockSvg());

  optionalRun("rsvg-convert", [
    "-w",
    "1280",
    "-o",
    join(assetsDir, "scopediff-diff-report.png"),
    diffSvg
  ]);
  optionalRun("rsvg-convert", [
    "-w",
    "1280",
    "-o",
    join(assetsDir, "scopediff-explain.png"),
    explainSvg
  ]);
  optionalRun("rsvg-convert", [
    "-w",
    "1200",
    "-h",
    "630",
    "-o",
    join(assetsDir, "social-preview.png"),
    socialSvg
  ]);
  optionalRun("rsvg-convert", [
    "-w",
    "1200",
    "-h",
    "630",
    "-o",
    join(assetsDir, "feature-overview.png"),
    featureSvg
  ]);
  optionalRun("rsvg-convert", [
    "-w",
    "1200",
    "-h",
    "630",
    "-o",
    join(assetsDir, "quick-start.png"),
    quickStartSvgPath
  ]);
  optionalRun("rsvg-convert", [
    "-w",
    "1200",
    "-h",
    "630",
    "-o",
    join(assetsDir, "github-step-summary-mock.png"),
    githubSummarySvg
  ]);

  const manifest = {
    generatedAt: new Date().toISOString(),
    scenario:
      "PR adds GitHub MCP server, token env, unpinned npx package, and workflow permission expansion.",
    assets: [
      "docs/demo/assets/scopediff-diff-report.svg",
      "docs/demo/assets/scopediff-diff-report.png",
      "docs/demo/assets/scopediff-explain.svg",
      "docs/demo/assets/scopediff-explain.png",
      "docs/demo/assets/social-preview.svg",
      "docs/demo/assets/social-preview.png",
      "docs/demo/assets/feature-overview.svg",
      "docs/demo/assets/feature-overview.png",
      "docs/demo/assets/quick-start.svg",
      "docs/demo/assets/quick-start.png",
      "docs/demo/assets/github-step-summary-mock.svg",
      "docs/demo/assets/github-step-summary-mock.png",
      "docs/demo/scopediff-report.md",
      "docs/demo/scopediff-report.json"
    ],
    source: "Generated from real ScopeDiff CLI output against a temporary git repository."
  };
  write(join(assetsDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
} finally {
  rmSync(demoDir, { recursive: true, force: true });
}
