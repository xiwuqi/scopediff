# X/Twitter Launch Post Draft

I built ScopeDiff, a local-first CLI for reviewing AI agent/tooling permission changes before merge.

It flags PR changes like:

- new MCP servers
- `GITHUB_TOKEN` env usage
- unpinned `npx` packages
- GitHub Actions permission expansion
- high-power agent instructions

It is a review aid, not a security silver bullet.

Repo: https://github.com/xiwuqi/scopediff

False-positive feedback is very welcome.

If this helps you review agent/tooling changes, a star helps others find it.
