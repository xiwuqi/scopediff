# ScopeDiff

Una CLI para revisar cambios en permisos y superficie de herramientas de AI agents antes de hacer merge.

> This PR gives your AI agent new powers. Review them before merge.

El [README en inglés](../../README.md) es la fuente de verdad para comportamiento, limitaciones y estado de release. Esta página es un resumen en español.

## Qué Ayuda A Revisar

ScopeDiff ayuda a mantenedores a detectar cambios como:

- MCP servers agregados o modificados.
- Instrucciones de agents, Cursor rules, Claude skills y Copilot instructions que amplían capacidades.
- Permisos de GitHub Actions, triggers sensibles, uso de secrets y actions externas.
- Scripts de ciclo de vida en `package.json`, configuración Docker privilegiada y ejecución de scripts remotos.

ScopeDiff es una ayuda para revisión. No es una auditoría de seguridad completa, un scanner de vulnerabilidades ni una protección en runtime.

## Inicio Rápido

```bash
npx scopediff scan
```

Comparar la rama actual con `main`:

```bash
npx scopediff diff --base main
```

Generar un reporte Markdown:

```bash
npx scopediff report --format markdown
```

Usarlo en CI y fallar con findings de alto riesgo:

```bash
npx scopediff ci --fail-on high
```

## Ejemplo De Reporte

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

## Cuándo Encaja Bien

- Repositorios que usan MCP servers.
- Proyectos con `AGENTS.md`, Cursor rules, Claude skills o Copilot instructions.
- Mantenedores open source revisando cambios de automatización.
- Equipos que incorporan AI coding agents en flujos existentes.

## Qué No Es

- No prueba que un PR sea seguro.
- No reemplaza auditorías de seguridad, secret scanning ni malware analysis.
- No ejecuta comandos encontrados.
- No comenta PRs por defecto.

## Seguridad Y Privacidad

ScopeDiff prioriza ejecución local: sin telemetría, sin subida de código, sin almacenamiento de tokens, sin acceso de red por defecto y sin ejecutar comandos descubiertos.

Si ScopeDiff te ayuda a revisar cambios de agents o tooling con más claridad, una star ayuda a que otras personas lo encuentren.
