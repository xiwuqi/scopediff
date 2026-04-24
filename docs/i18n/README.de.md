# ScopeDiff

Ein CLI-Werkzeug, um Änderungen an Berechtigungen und Tooling-Oberflächen von AI agents vor dem Merge zu prüfen.

> This PR gives your AI agent new powers. Review them before merge.

Das [englische README](../../README.md) ist die maßgebliche Quelle für Verhalten, Grenzen und Release-Status. Diese Seite ist eine deutsche Zusammenfassung.

## Was ScopeDiff Sichtbar Macht

ScopeDiff hilft Maintainerinnen und Maintainern, Änderungen wie diese zu erkennen:

- Hinzugefügte oder geänderte MCP servers.
- Agent instructions, Cursor rules, Claude skills oder Copilot instructions, die Fähigkeiten erweitern.
- GitHub Actions permissions, sensitive trigger, secrets und externe actions.
- `package.json` lifecycle scripts, privilegierte Docker-Konfiguration und Remote-Script-Ausführung.

ScopeDiff ist eine Review-Hilfe. Es ist kein vollständiges Security Audit, kein Vulnerability Scanner und kein Runtime-Schutzsystem.

## Quick Start

```bash
npx scopediff scan
```

Aktuellen Branch mit `main` vergleichen:

```bash
npx scopediff diff --base main
```

Markdown-Report erzeugen:

```bash
npx scopediff report --format markdown
```

Im CI bei High-Risk-Findings fehlschlagen:

```bash
npx scopediff ci --fail-on high
```

## Beispielreport

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

## Passt Gut Für

- Repositories mit MCP servers.
- Projekte mit `AGENTS.md`, Cursor rules, Claude skills oder Copilot instructions.
- Open-source Maintainer, die Automatisierungsänderungen prüfen.
- Teams, die AI coding agents in bestehende Workflows aufnehmen.

## Was Es Nicht Ist

- Es beweist nicht, dass ein PR sicher ist.
- Es ersetzt kein Security Review, Secret Scanning oder Malware Analysis.
- Es führt erkannte Befehle nicht aus.
- Es kommentiert PRs standardmäßig nicht.

## Sicherheit Und Datenschutz

ScopeDiff ist local-first: keine Telemetrie, kein Code-Upload, keine Token-Speicherung, kein Netzwerkzugriff standardmäßig und keine Ausführung erkannter Befehle.

Wenn ScopeDiff dir hilft, Agent- oder Tooling-Änderungen klarer zu prüfen, hilft ein Star anderen dabei, das Projekt zu finden.
