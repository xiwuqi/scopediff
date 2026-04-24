# Security Policy

ScopeDiff is a review aid. It is not a complete security audit, vulnerability scanner, malware detector, or runtime protection system.

## Supported Versions

Security fixes target the latest released version.

## Reporting a Vulnerability

Please open a private security advisory on GitHub if available, or contact the maintainers through the repository's published security contact once configured.

Do not include live secrets or private repository contents in public issues.

## Security Boundaries

ScopeDiff should:

- Run locally by default.
- Avoid telemetry.
- Avoid uploading repository contents.
- Avoid reading `.env` by default.
- Avoid storing credentials.
- Avoid executing discovered commands.
- Avoid posting PR comments unless a future feature is explicitly configured.

## Out of Scope

- Findings that require ScopeDiff to execute untrusted code.
- Reports based on private credentials intentionally supplied to test fixtures.
- Claims that ScopeDiff missed a vulnerability class it does not claim to cover.
