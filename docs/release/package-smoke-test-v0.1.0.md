# Package Smoke Test: v0.1.0

Date: 2026-04-24

## Summary

Result: pass.

The package was built, packed, installed into a temporary project, and exercised through the installed `npx scopediff` binary. A separate temporary git repository was created to verify `diff --base main` against a real commit history.

## Repository Preflight

- Branch: `main`
- Remote: `https://github.com/xiwuqi/scopediff.git`
- Repository: public
- Latest CI before release prep: `completed success`
- Workspace before release prep: clean

## Commands Run

```bash
npm ci
npm run check
npm pack --dry-run
npm pack
```

Package output:

- Tarball: `scopediff-0.1.0.tgz`
- Package size: 37.6 kB
- Unpacked size: 172.4 kB
- Total files: 8

Packed files:

- `CHANGELOG.md`
- `LICENSE`
- `README.md`
- `SECURITY.md`
- `dist/cli.d.ts`
- `dist/cli.js`
- `dist/cli.js.map`
- `package.json`

No tests, fixtures, source files, docs, node_modules, or unrelated large files were included in the npm tarball.

## Installed Tarball Smoke Test

Temporary project pattern:

```text
/tmp/scopediff-publish-smoke.*
```

Commands:

```bash
npm init -y
npm install /Volumes/Q7nl1s/new\ boy/scopediff-0.1.0.tgz
npx scopediff --help
npx scopediff scan --format markdown
npx scopediff scan --format json
npx scopediff report --format markdown
npx scopediff ci --fail-on critical
```

Results:

- `npx scopediff --help`: pass
- `npx scopediff scan --format markdown`: pass
- `npx scopediff scan --format json`: pass
- `npx scopediff report --format markdown`: pass
- `npx scopediff ci --fail-on critical`: pass

Empty temporary project output:

```text
Risk: Low
ScopeDiff found no review-worthy agent/tooling changes.
ScopeDiff completed without findings at or above 'critical'.
```

## Diff Mode Smoke Test

Fixture behavior:

1. Created a git repository.
2. Committed safe `main` branch with:
   - `README.md`
   - `.github/workflows/ci.yml` using `pull_request` and `contents: read`
3. Created branch `add-agent-surface`.
4. Added `.mcp.json` with:
   - GitHub MCP server
   - `npx -y @modelcontextprotocol/server-github`
   - `GITHUB_TOKEN`
5. Changed workflow to:
   - `pull_request_target`
   - `contents: write`
6. Ran:

```bash
../node_modules/.bin/scopediff diff --base main --format markdown
../node_modules/.bin/scopediff diff --base main --format json
```

Result:

```json
{
  "scanRisk": "low",
  "scanFindings": 0,
  "diffRisk": "critical",
  "diffFindings": 7,
  "diffRules": ["R013", "R005", "R001", "R007", "R012", "R006", "R004"]
}
```

Demo outputs saved to:

- `docs/demo/scopediff-report.md`
- `docs/demo/scopediff-report.json`

## Package Metadata Notes

- `name`: `scopediff`
- `version`: `0.1.0`
- `license`: `MIT`
- `bin`: `dist/cli.js`
- `engines`: `>=20`
- No `postinstall`, `prepare`, `preinstall`, or other lifecycle scripts.
- No telemetry.
- No hidden network request in the CLI runtime.
