# ScopeDiff

AI agent 权限与工具面变更审查辅助工具。

> 这个 PR 给你的 AI agent 增加了新的能力。合并前先看清楚。

[English README](../../README.md) 是行为、限制和发布状态的准确信息来源。本页是面向中文开发者的摘要版。

## 它解决什么问题

ScopeDiff 帮助维护者在合并 PR 前看到这些变化：

- MCP server 新增或修改。
- Agent instruction、Cursor rules、Claude skills、Copilot instructions 的能力边界变化。
- GitHub Actions 权限、触发器、secret 使用和外部 action 变化。
- `package.json` 生命周期脚本、Docker 高权限配置、远程脚本执行等自动化风险。

它是 review aid，不是完整安全审计器、漏洞扫描器或运行时防护系统。

## 快速开始

```bash
npx scopediff scan
```

对比当前分支和 `main`：

```bash
npx scopediff diff --base main
```

生成 Markdown 报告：

```bash
npx scopediff report --format markdown
```

CI 中按高风险失败：

```bash
npx scopediff ci --fail-on high
```

## 示例报告

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
