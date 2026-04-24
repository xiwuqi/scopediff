# ScopeDiff

Uma CLI para revisar mudanças de permissões e superfície de ferramentas de AI agents antes do merge.

> This PR gives your AI agent new powers. Review them before merge.

O [README em inglês](../../README.md) é a fonte de verdade para comportamento, limitações e status de release. Esta página é um resumo em português do Brasil.

## O Que Ele Ajuda A Revisar

ScopeDiff ajuda mantenedores a perceber mudanças como:

- MCP servers adicionados ou modificados.
- Instruções de agents, Cursor rules, Claude skills e Copilot instructions que ampliam capacidades.
- Permissões do GitHub Actions, triggers sensíveis, uso de secrets e actions externas.
- Scripts de ciclo de vida em `package.json`, configurações Docker privilegiadas e execução de scripts remotos.

ScopeDiff é uma ajuda para revisão. Ele não é uma auditoria de segurança completa, scanner de vulnerabilidades ou proteção em runtime.

## Início Rápido

```bash
npx scopediff scan
```

Comparar a branch atual com `main`:

```bash
npx scopediff diff --base main
```

Gerar um relatório Markdown:

```bash
npx scopediff report --format markdown
```

Rodar no CI e falhar em findings de alto risco:

```bash
npx scopediff ci --fail-on high
```

## Exemplo De Relatório

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

## Quando Faz Sentido

- Repositórios que usam MCP servers.
- Projetos com `AGENTS.md`, Cursor rules, Claude skills ou Copilot instructions.
- Mantenedores open source revisando mudanças de automação.
- Times adotando AI coding agents em workflows existentes.

## O Que Ele Não É

- Não prova que um PR é seguro.
- Não substitui auditoria de segurança, secret scanning ou análise de malware.
- Não executa comandos encontrados.
- Não comenta PRs por padrão.

## Segurança E Privacidade

ScopeDiff é local-first: sem telemetria, sem upload de código, sem armazenamento de tokens, sem acesso de rede por padrão e sem execução de comandos descobertos.

Se ScopeDiff ajuda você a revisar mudanças de agents ou tooling com mais clareza, uma star ajuda outras pessoas a encontrarem o projeto.
