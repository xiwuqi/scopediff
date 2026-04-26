# ScopeDiff

Ein CLI-Werkzeug, um Änderungen an Berechtigungen und Tooling-Oberflächen von AI agents vor dem Merge zu prüfen.

> This PR gives your AI agent new powers. Review them before merge.

Das [englische README](../../README.md) ist die maßgebliche Quelle für Verhalten, Grenzen und Release-Status. Diese Seite ist eine deutsche Zusammenfassung.

![Visuelle Übersicht von ScopeDiff als lokales CLI zur Prüfung von Agent- und Tooling-Berechtigungsänderungen](../brand/readme-hero.png)

## Was ScopeDiff Sichtbar Macht

ScopeDiff hilft Maintainerinnen und Maintainern, Änderungen wie diese zu erkennen:

![ScopeDiff Permission-Surface-Map für MCP, Agent instructions, Workflow permissions, Package scripts und Docker settings](../brand/docs-permission-map.png)

- Hinzugefügte oder geänderte MCP servers.
- Agent instructions, Cursor rules, Claude skills oder Copilot instructions, die Fähigkeiten erweitern.
- GitHub Actions permissions, sensitive trigger, secrets und externe actions.
- `package.json` lifecycle scripts, privilegierte Docker-Konfiguration und Remote-Script-Ausführung.

ScopeDiff ist eine Review-Hilfe. Es ist kein vollständiges Security Audit, kein Vulnerability Scanner und kein Runtime-Schutzsystem.

## Quick Start

![ScopeDiff Quick-Start-Befehle](../demo/assets/quick-start.png)

```bash
npx scopediff@latest scan
```

Aktuellen Branch mit `main` vergleichen:

```bash
npx scopediff@latest diff --base main
```

Markdown-Report erzeugen:

```bash
npx scopediff@latest report --format markdown
```

Im CI bei High-Risk-Findings fehlschlagen:

```bash
npx scopediff@latest ci --fail-on high
```

## Beispielreport

![Screenshot des ScopeDiff-Diff-Reports](../demo/assets/scopediff-diff-report.png)

Dieses Beispiel stammt aus echter CLI-Ausgabe. Der Demo-PR fuegt einen GitHub MCP server hinzu, nutzt `GITHUB_TOKEN`, startet ein nicht gepinntes `npx`-Paket und erweitert GitHub Actions permissions. ScopeDiff entscheidet nicht, ob der PR boesartig ist; es zeigt Evidenz und Review-Fragen.

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

## Umgang Mit Findings

- Pruefe zuerst evidence, file und line.
- Vergleiche im `diff`-Modus previous/current.
- Entscheide, ob die Capability-Aenderung beabsichtigt und dokumentiert ist.
- Bevorzuge Least-Privilege-Tokens, gepinnte Versionen und begrenzte Workflow-Permissions.
- Natural-language instruction findings koennen konservativ sein; lies den umgebenden Kontext.
- Siehe [Common false positives](../common-false-positives.md) fuer rauschanfaellige Faelle und Reporting-Hinweise.

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
