# npm Publish Authorization: scopediff@0.1.1

Status: blocked on npm authentication. Do not publish without final maintainer approval.

## Current Checks

- Package name: `scopediff`
- Local version: `0.1.1`
- npm registry: `https://registry.npmjs.org/`
- `scopediff@0.1.1`: not found in npm registry, so the version appears available.
- `npm whoami`: failed with `E401 Unauthorized`.
- No npm token, password, cookie, or 2FA code was read, printed, or stored.

## Last Local Package Verification

Completed in `docs/release/preflight-v0.1.1.md`:

- `npm ci`: passed
- `npm run check`: passed
- `npm pack --dry-run`: passed
- `npm pack`: passed
- tarball smoke test: passed

Packed tarball used for smoke test:

```text
/tmp/scopediff-v0.1.1-pack/scopediff-0.1.1.tgz
```

## Publish Command Draft

Do not run until explicitly approved and npm authentication is available:

```bash
npm publish --access public --registry https://registry.npmjs.org/
```

## Required Human Approval Points

Ask before:

- npm login
- creating an npm token
- entering an npm token into the shell
- running real `npm publish`
- creating GitHub Release `v0.1.1`

## Expected Publish Flow

1. Maintainer logs in to npm or provides a short-lived publish token.
2. Confirm:
   ```bash
   npm whoami --registry https://registry.npmjs.org/
   ```
3. Run final dry-run if desired:
   ```bash
   npm publish --dry-run --access public --registry https://registry.npmjs.org/
   ```
4. Stop and ask for final approval.
5. After approval only:
   ```bash
   npm publish --access public --registry https://registry.npmjs.org/
   ```

## Post-Publish Verification

After publish:

```bash
npm view scopediff@0.1.1 name version dist-tags --json --registry https://registry.npmjs.org/
npx --yes --registry https://registry.npmjs.org/ scopediff@0.1.1 --help
npx --yes --registry https://registry.npmjs.org/ scopediff@0.1.1 scan --format markdown
```

Record the npm publish link/status in:

- `docs/launch/published-links.md`
- `docs/launch/growth-log.md`
