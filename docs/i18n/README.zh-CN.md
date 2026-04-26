# ScopeDiff

AI agent 权限与工具面变更审查辅助工具。

> 这个 PR 给你的 AI agent 增加了新的能力。合并前先看清楚。

[English README](../../README.md) 是行为、限制和发布状态的准确信息来源。本页是面向中文开发者的摘要版。

![ScopeDiff 视觉概览：本地优先的 agent/tooling 权限变更审查 CLI](../brand/readme-hero.png)

## 它解决什么问题

ScopeDiff 帮助维护者在合并 PR 前看到这些变化：

![ScopeDiff 权限面地图：MCP、agent instructions、workflow permissions、package scripts 和 Docker 设置](../brand/docs-permission-map.png)

- MCP server 新增或修改。
- Agent instruction、Cursor rules、Claude skills、Copilot instructions 的能力边界变化。
- GitHub Actions 权限、触发器、secret 使用和外部 action 变化。
- `package.json` 生命周期脚本、Docker 高权限配置、远程脚本执行等自动化风险。

它是 review aid，不是完整安全审计器、漏洞扫描器或运行时防护系统。

## 快速开始

![ScopeDiff 快速开始命令](../demo/assets/quick-start.png)

```bash
npx scopediff@latest scan
```

对比当前分支和 `main`：

```bash
npx scopediff@latest diff --base main
```

生成 Markdown 报告：

```bash
npx scopediff@latest report --format markdown
```

CI 中按高风险失败：

```bash
npx scopediff@latest ci --fail-on high
```

## 示例报告

![ScopeDiff diff 报告截图](../demo/assets/scopediff-diff-report.png)

这个示例来自真实 CLI 输出。示例 PR 新增 GitHub MCP server、使用 `GITHUB_TOKEN`、未 pin `npx` 包，并扩大 GitHub Actions 权限。ScopeDiff 不判断 PR 是否恶意，只把证据和审查问题摆出来。

```md
## ScopeDiff Report

Risk: High

New agent capability detected:

- MCP server added: github
- Command: npx -y @modelcontextprotocol/server-github
- Env required: GITHUB_TOKEN
- Possible scope: repository read/write depending on token permissions

Review notes:

- Pin package version instead of using latest
- Prefer a read-only token for first setup
- Document why this server is needed
- Check whether this PR also changed workflow permissions
```

## 如何处理 findings

- 先看 evidence、file 和 line。
- 在 `diff` 模式下对比 previous/current。
- 判断这个能力变化是否是预期、是否有文档说明。
- 优先使用最小权限 token、固定版本、受限 workflow permissions。
- 自然语言 instruction finding 可能偏保守；请结合上下文判断。
- 常见误报和上报方式见 [Common false positives](../common-false-positives.md)。

## 适合谁

- 使用 MCP server 的开源项目。
- 使用 `AGENTS.md`、Cursor rules、Claude skills 或 Copilot instructions 的团队。
- 正在把 AI coding agent 引入开发流程的维护者。
- 想让 PR 中的自动化权限变化更容易审查的人。

## 不适合什么

- 不能证明某个 PR 一定安全。
- 不能替代安全审计、secret scanning 或 malware analysis。
- 默认不执行发现的命令，也不阻止运行时行为。
- 默认不会评论 PR。

## 安全与隐私

ScopeDiff 默认本地运行、只读扫描、无遥测、不上传代码、不保存 token、不执行发现的命令。

如果 ScopeDiff 帮你更清楚地审查 agent/tooling 变化，欢迎 star 支持，让更多维护者看到它。
