# ScopeDiff

Un outil CLI pour revoir les changements de permissions et de surface d'outillage des AI agents avant merge.

> This PR gives your AI agent new powers. Review them before merge.

Le [README anglais](../../README.md) reste la source de vérité pour le comportement, les limites et l'état des releases. Cette page est un résumé en français.

![Vue d'ensemble visuelle de ScopeDiff](../demo/assets/feature-overview.png)

## Ce Que ScopeDiff Aide A Voir

ScopeDiff aide les mainteneurs à repérer des changements comme :

- Ajout ou modification de MCP servers.
- Instructions d'agents, Cursor rules, Claude skills ou Copilot instructions qui élargissent les capacités.
- Permissions GitHub Actions, triggers sensibles, usage de secrets et actions externes.
- Scripts de cycle de vie `package.json`, configuration Docker privilégiée et exécution de scripts distants.

ScopeDiff est une aide à la revue. Ce n'est pas un audit de sécurité complet, un scanner de vulnérabilités ni une protection runtime.

## Démarrage Rapide

![Commandes de démarrage rapide ScopeDiff](../demo/assets/quick-start.png)

```bash
npx scopediff@latest scan
```

Comparer la branche courante avec `main` :

```bash
npx scopediff@latest diff --base main
```

Générer un rapport Markdown :

```bash
npx scopediff@latest report --format markdown
```

Exécuter en CI et échouer sur les findings high :

```bash
npx scopediff@latest ci --fail-on high
```

## Exemple De Rapport

![Capture du rapport diff ScopeDiff](../demo/assets/scopediff-diff-report.png)

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

## Pour Qui

- Repositories utilisant des MCP servers.
- Projets avec `AGENTS.md`, Cursor rules, Claude skills ou Copilot instructions.
- Mainteneurs open source qui relisent des changements d'automatisation.
- Equipes qui ajoutent des AI coding agents à leurs workflows.

## Ce Que Ce N'est Pas

- ScopeDiff ne prouve pas qu'une pull request est sûre.
- Il ne remplace pas une revue sécurité, le secret scanning ou l'analyse malware.
- Il n'exécute pas les commandes détectées.
- Il ne commente pas les PR par défaut.

## Sécurité Et Confidentialité

ScopeDiff est local-first : pas de télémétrie, pas d'upload de code, pas de stockage de token, pas d'accès réseau par défaut et aucune exécution des commandes détectées.

Si ScopeDiff vous aide à revoir plus clairement les changements d'agents ou d'outillage, une star aide d'autres mainteneurs à le trouver.
