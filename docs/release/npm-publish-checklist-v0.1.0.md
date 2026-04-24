# npm Publish Checklist: v0.1.0

Do not run these commands without explicit approval.

## Pre-Publish

```bash
npm ci
npm run check
npm pack --dry-run
npm pack
```

Confirm:

- Package name: `scopediff`
- Version: `0.1.0`
- License: `MIT`
- Bin: `scopediff -> dist/cli.js`
- Files: `dist`, `README.md`, `LICENSE`, `CHANGELOG.md`, `SECURITY.md`
- No lifecycle scripts such as `postinstall`, `preinstall`, or `prepare`.

## Account Check

Requires manual approval:

```bash
npm whoami
```

If not logged in, stop and ask the user to handle npm login and 2FA.

## Publish

Requires manual approval:

```bash
npm publish --access public
```

## Post-Publish Verification

```bash
npm view scopediff name version description --json
npx scopediff@latest --help
npx scopediff@latest scan --format markdown
```

## If Package Name Is Unavailable

Preferred fallback:

```json
{
  "name": "@xiwuqi/scopediff"
}
```

Then publish with:

```bash
npm publish --access public
```

Update README commands to:

```bash
npx @xiwuqi/scopediff@latest scan
```
