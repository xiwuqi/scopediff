# npm Name Check

Date: 2026-04-24

Command:

```bash
npm view scopediff name version description --json
```

Result:

```text
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/scopediff - Not found
npm ERR! 404 'scopediff@*' is not in this registry.
```

Interpretation:

- `scopediff` appears unclaimed on npm at the time of this check.
- This is not a reservation and can change before publish.
- Do not claim availability in public copy until publish succeeds.

Next manual checks before publish:

```bash
npm view scopediff name version description --json
npm whoami
npm publish --access public
```

If `scopediff` becomes unavailable before publish:

- Preferred fallback: `@xiwuqi/scopediff`
- Other fallback candidates: `agentpermdiff`, `agentscopediff`, `mcpdiff`

No `npm login` or `npm publish` was run during this phase.

## Registry Note

On 2026-04-24, `npm config get registry` returned:

```text
https://registry.npmmirror.com/
```

Official publish commands must use the npm registry explicitly:

```bash
npm login --registry https://registry.npmjs.org/
npm publish --access public --registry https://registry.npmjs.org/
npm view scopediff name version description --json --registry https://registry.npmjs.org/
```
