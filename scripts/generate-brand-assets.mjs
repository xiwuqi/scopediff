import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const brandDir = join(repoRoot, "docs", "brand");
const generatedDir = join(brandDir, "generated");
const sansFont = "DejaVu Sans, Arial, Helvetica, sans-serif";
const monoFont = "DejaVu Sans Mono, Menlo, Consolas, monospace";

mkdirSync(brandDir, { recursive: true });

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function imageData(filename) {
  const file = join(generatedDir, filename);
  return `data:image/png;base64,${readFileSync(file).toString("base64")}`;
}

function write(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, value);
}

function render(svgPath, pngPath, width, height) {
  try {
    execFileSync("rsvg-convert", [
      "-w",
      String(width),
      "-h",
      String(height),
      "-o",
      pngPath,
      svgPath
    ]);
    execFileSync("magick", [pngPath, "-strip", "-define", "png:compression-level=9", pngPath]);
  } catch {
    // Keep SVG output if local PNG rendering tools are unavailable.
  }
}

function chip(x, y, label, tone = "cyan") {
  const tones = {
    amber: ["#f59e0b", "#451a03", "#fde68a"],
    cyan: ["#22d3ee", "#083344", "#cffafe"],
    mint: ["#34d399", "#052e2b", "#d1fae5"],
    slate: ["#94a3b8", "#0f172a", "#e2e8f0"]
  };
  const [stroke, fill, text] = tones[tone];
  const width = 48 + label.length * 12.5;
  return `<rect x="${x}" y="${y}" width="${width}" height="40" rx="20" fill="${fill}" stroke="${stroke}" opacity="0.92"/>
  <text x="${x + 22}" y="${y + 26}" fill="${text}" font-family="${sansFont}" font-size="17" font-weight="700">${escapeXml(label)}</text>`;
}

function darkBackdrop(image, width, height, opacity = 0.9) {
  return `<image href="${image}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${width}" height="${height}" fill="#020617" opacity="${opacity}"/>
  <radialGradient id="spot" cx="76%" cy="42%" r="56%">
    <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.24"/>
    <stop offset="56%" stop-color="#0f766e" stop-opacity="0.1"/>
    <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
  </radialGradient>
  <rect width="${width}" height="${height}" fill="url(#spot)"/>`;
}

function logoMark(x, y, scale = 1) {
  const s = scale;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="0" width="62" height="62" rx="16" fill="#07111f" stroke="#22d3ee" stroke-width="2"/>
    <path d="M18 22h15c8 0 14 6 14 14s-6 14-14 14H18" fill="none" stroke="#d1fae5" stroke-width="5" stroke-linecap="round"/>
    <path d="M22 18l-8 13 8 13" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="43" cy="20" r="4" fill="#f59e0b"/>
  </g>`;
}

function readmeHero() {
  const image = imageData("gpt-scope-boundary-dark.png");
  const width = 1600;
  const height = 720;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="ScopeDiff visual overview">
  <defs>${darkBackdrop(image, width, height, 0.58)}</defs>
  <rect width="${width}" height="${height}" fill="#020617"/>
  ${darkBackdrop(image, width, height, 0.48)}
  <rect x="82" y="72" width="690" height="576" rx="34" fill="#020617" opacity="0.78" stroke="#1e293b"/>
  ${logoMark(128, 120, 1.05)}
  <text x="212" y="168" fill="#f8fafc" font-family="${sansFont}" font-size="72" font-weight="700">ScopeDiff</text>
  <text x="128" y="238" fill="#dbeafe" font-family="${sansFont}" font-size="34" font-weight="600">Review AI agent and workflow</text>
  <text x="128" y="281" fill="#dbeafe" font-family="${sansFont}" font-size="34" font-weight="600">permission changes before merge.</text>
  <g>
    ${chip(128, 326, "Local-first", "mint")}
    ${chip(340, 326, "No telemetry", "cyan")}
    ${chip(562, 326, "Review aid", "amber")}
  </g>
  <rect x="128" y="408" width="560" height="150" rx="22" fill="#07111f" stroke="#1e3a5f"/>
  <text x="166" y="458" fill="#7dd3fc" font-family="${monoFont}" font-size="25">$ npx scopediff@latest diff --base main</text>
  <text x="166" y="507" fill="#fca5a5" font-family="${monoFont}" font-size="24">Risk: High</text>
  <text x="166" y="548" fill="#d1fae5" font-family="${monoFont}" font-size="22">+ MCP server · + workflow permissions</text>
  <text x="128" y="608" fill="#94a3b8" font-family="${sansFont}" font-size="19">Open-source TypeScript CLI + GitHub Action</text>
</svg>
`;
}

function socialPreview() {
  const image = imageData("gpt-scope-boundary-dark.png");
  const width = 1200;
  const height = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="ScopeDiff social preview">
  <rect width="${width}" height="${height}" fill="#020617"/>
  ${darkBackdrop(image, width, height, 0.38)}
  <rect x="64" y="58" width="560" height="514" rx="32" fill="#020617" opacity="0.76" stroke="#1f3b5a"/>
  ${logoMark(104, 100, 0.92)}
  <text x="178" y="145" fill="#f8fafc" font-family="${sansFont}" font-size="58" font-weight="700">ScopeDiff</text>
  <text x="104" y="214" fill="#dbeafe" font-family="${sansFont}" font-size="31" font-weight="600">This PR gives your</text>
  <text x="104" y="253" fill="#dbeafe" font-family="${sansFont}" font-size="31" font-weight="600">AI agent new powers.</text>
  <text x="104" y="309" fill="#93c5fd" font-family="${sansFont}" font-size="28">Review them before merge.</text>
  <rect x="104" y="364" width="420" height="106" rx="18" fill="#07111f" stroke="#164e63"/>
  <text x="132" y="405" fill="#7dd3fc" font-family="${monoFont}" font-size="21">Risk: High</text>
  <text x="132" y="443" fill="#d1fae5" font-family="${monoFont}" font-size="19">+ MCP server · + GITHUB_TOKEN</text>
  <g>
    ${chip(104, 506, "Local-first", "mint")}
    ${chip(316, 506, "Markdown + JSON", "cyan")}
  </g>
</svg>
`;
}

function blogCover() {
  const image = imageData("gpt-product-mockup-dark.png");
  const width = 1600;
  const height = 900;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="ScopeDiff blog cover">
  <rect width="${width}" height="${height}" fill="#020617"/>
  <image href="${image}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${width}" height="${height}" fill="#020617" opacity="0.42"/>
  <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#020617" stop-opacity="0.94"/>
    <stop offset="62%" stop-color="#020617" stop-opacity="0.36"/>
    <stop offset="100%" stop-color="#020617" stop-opacity="0.08"/>
  </linearGradient>
  <rect width="${width}" height="${height}" fill="url(#fade)"/>
  ${logoMark(110, 112, 1.05)}
  <text x="194" y="160" fill="#f8fafc" font-family="${sansFont}" font-size="58" font-weight="700">ScopeDiff</text>
  <text x="110" y="282" fill="#f8fafc" font-family="${sansFont}" font-size="70" font-weight="700">Reviewing AI agent</text>
  <text x="110" y="365" fill="#f8fafc" font-family="${sansFont}" font-size="70" font-weight="700">permission changes</text>
  <text x="110" y="448" fill="#bfdbfe" font-family="${sansFont}" font-size="42" font-weight="700">before merge</text>
  <text x="112" y="536" fill="#dbeafe" font-family="${sansFont}" font-size="29">A local-first CLI and GitHub Action for PR review.</text>
  <g>
    ${chip(112, 594, "MCP", "cyan")}
    ${chip(222, 594, "GitHub Actions", "mint")}
    ${chip(472, 594, "Agent instructions", "amber")}
  </g>
</svg>
`;
}

function productHuntGallery() {
  const image = imageData("gpt-product-mockup-dark.png");
  const width = 1270;
  const height = 760;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="ScopeDiff Product Hunt gallery image">
  <rect width="${width}" height="${height}" fill="#020617"/>
  <image href="${image}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${width}" height="${height}" fill="#020617" opacity="0.52"/>
  <rect x="58" y="54" width="538" height="652" rx="34" fill="#020617" opacity="0.8" stroke="#164e63"/>
  ${logoMark(100, 98, 0.95)}
  <text x="176" y="144" fill="#f8fafc" font-family="${sansFont}" font-size="54" font-weight="700">ScopeDiff</text>
  <text x="100" y="234" fill="#f8fafc" font-family="${sansFont}" font-size="48" font-weight="700">AI agent</text>
  <text x="100" y="292" fill="#f8fafc" font-family="${sansFont}" font-size="48" font-weight="700">permission diffs</text>
  <text x="100" y="350" fill="#bfdbfe" font-family="${sansFont}" font-size="31" font-weight="600">for pull request review</text>
  <text x="100" y="428" fill="#dbeafe" font-family="${sansFont}" font-size="25">Spot MCP, workflow, instruction,</text>
  <text x="100" y="463" fill="#dbeafe" font-family="${sansFont}" font-size="25">package, and Docker capability changes.</text>
  <g>
    ${chip(100, 536, "Open source", "mint")}
    ${chip(305, 536, "TypeScript CLI", "cyan")}
    ${chip(100, 592, "No telemetry", "slate")}
  </g>
</svg>
`;
}

function docsPermissionMap() {
  const image = imageData("gpt-permission-map-light.png");
  const width = 1400;
  const height = 760;
  const labels = [
    ["MCP servers", 112, 196, "cyan"],
    ["Agent instructions", 112, 272, "mint"],
    ["Workflow permissions", 112, 348, "amber"],
    ["Package scripts", 112, 424, "slate"],
    ["Docker settings", 112, 500, "cyan"]
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="ScopeDiff permission surface map">
  <rect width="${width}" height="${height}" fill="#f8fafc"/>
  <image href="${image}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${width}" height="${height}" fill="#f8fafc" opacity="0.18"/>
  <rect x="54" y="48" width="505" height="664" rx="34" fill="#ffffff" opacity="0.88" stroke="#cbd5e1"/>
  <text x="96" y="116" fill="#0f172a" font-family="${sansFont}" font-size="45" font-weight="700">Permission surface</text>
  <text x="98" y="155" fill="#475569" font-family="${sansFont}" font-size="22">What can change inside a PR?</text>
  ${labels.map(([label, x, y, tone]) => `${chip(x, y, label, tone)}`).join("\n  ")}
  <text x="98" y="580" fill="#475569" font-family="${sansFont}" font-size="20">ScopeDiff turns capability changes</text>
  <text x="98" y="610" fill="#475569" font-family="${sansFont}" font-size="20">into reviewable findings.</text>
  <rect x="96" y="632" width="430" height="50" rx="25" fill="#020617" opacity="0.92"/>
  <text x="125" y="648" fill="#d1fae5" font-family="${sansFont}" font-size="20" font-weight="700">Default: local, read-only, no telemetry</text>
</svg>
`;
}

function internationalCard() {
  const image = imageData("gpt-permission-map-light.png");
  const width = 1200;
  const height = 630;
  const locales = [
    ["English", 98, 358, "cyan"],
    ["简体中文", 232, 358, "mint"],
    ["日本語", 382, 358, "amber"],
    ["Español", 504, 358, "slate"],
    ["Français", 98, 416, "cyan"],
    ["Português", 250, 416, "mint"],
    ["Deutsch", 428, 416, "amber"]
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="ScopeDiff international README card">
  <rect width="${width}" height="${height}" fill="#f8fafc"/>
  <image href="${image}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${width}" height="${height}" fill="#f8fafc" opacity="0.24"/>
  <linearGradient id="leftFade" x1="0" x2="1">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96"/>
    <stop offset="58%" stop-color="#ffffff" stop-opacity="0.88"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.18"/>
  </linearGradient>
  <rect width="${width}" height="${height}" fill="url(#leftFade)"/>
  ${logoMark(94, 92, 0.85)}
  <text x="164" y="133" fill="#0f172a" font-family="${sansFont}" font-size="48" font-weight="700">ScopeDiff</text>
  <text x="96" y="224" fill="#0f172a" font-family="${sansFont}" font-size="48" font-weight="700">International README</text>
  <text x="96" y="281" fill="#334155" font-family="${sansFont}" font-size="28" font-weight="600">Same conservative scope, clearer onboarding.</text>
  ${locales.map(([label, x, y, tone]) => chip(x, y, label, tone)).join("\n  ")}
  <text x="98" y="522" fill="#64748b" font-family="${sansFont}" font-size="20">English remains the source of truth for behavior and limits.</text>
</svg>
`;
}

const assets = [
  ["readme-hero", readmeHero(), 1600, 720],
  ["social-preview-v2", socialPreview(), 1200, 630],
  ["blog-cover-v0.1.2", blogCover(), 1600, 900],
  ["product-hunt-gallery-1", productHuntGallery(), 1270, 760],
  ["docs-permission-map", docsPermissionMap(), 1400, 760],
  ["international-readme-card", internationalCard(), 1200, 630]
];

for (const [name, svg, width, height] of assets) {
  const svgPath = join(brandDir, `${name}.svg`);
  const pngPath = join(brandDir, `${name}.png`);
  write(svgPath, svg);
  render(svgPath, pngPath, width, height);
}

write(
  join(brandDir, "manifest.json"),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      note: "Final assets combine generated, text-free background images with deterministic SVG text overlays.",
      sourceImages: [
        {
          path: "docs/brand/generated/gpt-scope-boundary-dark.png",
          role: "Dark AI agent permission boundary background"
        },
        {
          path: "docs/brand/generated/gpt-permission-map-light.png",
          role: "Light documentation permission-surface map background"
        },
        {
          path: "docs/brand/generated/gpt-product-mockup-dark.png",
          role: "Dark launch/blog product mockup background"
        }
      ],
      finalAssets: assets.flatMap(([name]) => [`docs/brand/${name}.svg`, `docs/brand/${name}.png`])
    },
    null,
    2
  )}\n`
);
