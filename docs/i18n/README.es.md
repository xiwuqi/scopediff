# ScopeDiff

Una CLI para revisar cambios en permisos y superficie de herramientas de AI agents antes de hacer merge.

> This PR gives your AI agent new powers. Review them before merge.

El [README en inglés](../../README.md) es la fuente de verdad para comportamiento, limitaciones y estado de release. Esta página es un resumen en español.

![Resumen visual de ScopeDiff](../demo/assets/feature-overview.png)

## Qué Ayuda A Revisar

ScopeDiff ayuda a mantenedores a detectar cambios como:

- MCP servers agregados o modificados.
- Instrucciones de agents, Cursor rules, Claude skills y Copilot instructions que amplían capacidades.
- Permisos de GitHub Actions, triggers sensibles, uso de secrets y actions externas.
- Scripts de ciclo de vida en `package.json`, configuración Docker privilegiada y ejecución de scripts remotos.

ScopeDiff es una ayuda para revisión. No es una auditoría de seguridad completa, un scanner de vulnerabilidades ni una protección en runtime.

## Inicio Rápido

![Comandos de inicio rápido de ScopeDiff](../demo/assets/quick-start.png)

```bash
npx scopediff@latest scan
```

Comparar la rama actual con `main`:

```bash
npx scopediff@latest diff --base main
```

Generar un reporte Markdown:

```bash
npx scopediff@latest report --format markdown
```

Usarlo en CI y fallar con findings de alto riesgo:

```bash
npx scopediff@latest ci --fail-on high
```

## Ejemplo De Reporte

![Captura del reporte diff de ScopeDiff](../demo/assets/scopediff-diff-report.png)

Este ejemplo viene de salida real de la CLI. El PR demo agrega un MCP server de GitHub, usa `GITHUB_TOKEN`, ejecuta un paquete `npx` sin pin y amplía permisos de GitHub Actions. ScopeDiff no decide si el PR es malicioso; muestra evidencia y preguntas de revisión.

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

## Cómo Manejar Findings

- Primero revisa evidence, file y line.
- En modo `diff`, compara previous/current.
- Decide si el cambio de capacidad es intencional y está documentado.
- Prefiere tokens de mínimo privilegio, versiones fijadas y permisos de workflow limitados.
- Los findings de instrucciones en lenguaje natural pueden ser conservadores; lee el contexto cercano.
- Consulta [Common false positives](../common-false-positives.md) para casos ruidosos y cómo reportarlos.

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
