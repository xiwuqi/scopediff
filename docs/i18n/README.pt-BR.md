# ScopeDiff

Uma CLI para revisar mudanças de permissões e superfície de ferramentas de AI agents antes do merge.

> This PR gives your AI agent new powers. Review them before merge.

O [README em inglês](../../README.md) é a fonte de verdade para comportamento, limitações e status de release. Esta página é um resumo em português do Brasil.

![Visão geral visual do ScopeDiff](../demo/assets/feature-overview.png)

## O Que Ele Ajuda A Revisar

ScopeDiff ajuda mantenedores a perceber mudanças como:

- MCP servers adicionados ou modificados.
- Instruções de agents, Cursor rules, Claude skills e Copilot instructions que ampliam capacidades.
- Permissões do GitHub Actions, triggers sensíveis, uso de secrets e actions externas.
- Scripts de ciclo de vida em `package.json`, configurações Docker privilegiadas e execução de scripts remotos.

ScopeDiff é uma ajuda para revisão. Ele não é uma auditoria de segurança completa, scanner de vulnerabilidades ou proteção em runtime.

## Início Rápido

![Comandos de início rápido do ScopeDiff](../demo/assets/quick-start.png)

```bash
npx scopediff@latest scan
```

Comparar a branch atual com `main`:

```bash
npx scopediff@latest diff --base main
```

Gerar um relatório Markdown:

```bash
npx scopediff@latest report --format markdown
```

Rodar no CI e falhar em findings de alto risco:

```bash
npx scopediff@latest ci --fail-on high
```

## Exemplo De Relatório

![Captura do relatório diff do ScopeDiff](../demo/assets/scopediff-diff-report.png)

Este exemplo vem de saída real da CLI. O PR demo adiciona um MCP server do GitHub, usa `GITHUB_TOKEN`, executa um pacote `npx` sem versão fixa e amplia permissões do GitHub Actions. ScopeDiff não decide se o PR é malicioso; ele mostra evidências e perguntas de revisão.

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

## Como Lidar Com Findings

- Primeiro revise evidence, file e line.
- No modo `diff`, compare previous/current.
- Decida se a mudança de capacidade é intencional e documentada.
- Prefira tokens de mínimo privilégio, versões fixadas e permissões de workflow limitadas.
- Findings de instruções em linguagem natural podem ser conservadores; leia o contexto ao redor.
- Veja [Common false positives](../common-false-positives.md) para casos ruidosos e orientação de reporte.

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
