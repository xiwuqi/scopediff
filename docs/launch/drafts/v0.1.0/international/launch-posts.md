# ScopeDiff v0.1.0 International Launch Drafts

These are draft-only posts. Do not publish without manual review for the target community, platform rules, and local tone.

## English

I released ScopeDiff v0.1.0, a small CLI for reviewing AI agent and tooling permission changes before merge.

It looks for review-worthy changes in MCP configs, agent instructions, GitHub Actions permissions, package lifecycle scripts, Docker settings, and remote script execution patterns.

It is a review aid, not a complete security scanner. It runs locally by default, does not upload code, and has no telemetry.

Try it:

```bash
npx scopediff scan
```

Feedback on false positives and real-world MCP/config shapes would be very welcome.

## 简体中文

我发布了 ScopeDiff v0.1.0，一个用于合并 PR 前审查 AI agent / tooling 权限变化的小型 CLI。

它会提示 MCP 配置、agent instructions、GitHub Actions permissions、package lifecycle scripts、Docker 配置、远程脚本执行等地方的可审查变化。

它不是完整安全扫描器，也不会证明 PR 一定安全。默认本地运行、不上传代码、无遥测。

试用：

```bash
npx scopediff scan
```

欢迎反馈误报和真实世界的 MCP / agent config 形态。

## 日本語

ScopeDiff v0.1.0 を公開しました。PR を merge する前に、AI agent や tooling の権限変更を確認しやすくする小さな CLI です。

MCP config、agent instructions、GitHub Actions permissions、package lifecycle scripts、Docker settings、remote script execution などのレビューすべき変更を見つけます。

これは review aid であり、完全な security scanner ではありません。デフォルトではローカル実行、コードのアップロードなし、telemetry なしです。

Try:

```bash
npx scopediff scan
```

False positive や実際の MCP/config パターンについてフィードバックを歓迎します。

## Español

Publiqué ScopeDiff v0.1.0, una CLI pequeña para revisar cambios de permisos en AI agents y tooling antes de hacer merge.

Revisa cambios en MCP configs, agent instructions, permisos de GitHub Actions, scripts de ciclo de vida, Docker settings y patrones de ejecución de scripts remotos.

Es una ayuda para revisión, no un scanner de seguridad completo. Corre localmente por defecto, no sube código y no tiene telemetría.

Prueba:

```bash
npx scopediff scan
```

Feedback sobre falsos positivos y configuraciones reales de MCP/agents sería muy útil.

## Français

J'ai publié ScopeDiff v0.1.0, un petit CLI pour revoir les changements de permissions des AI agents et du tooling avant merge.

Il signale des changements à relire dans les configs MCP, agent instructions, permissions GitHub Actions, scripts de cycle de vie, réglages Docker et patterns d'exécution de scripts distants.

C'est une aide à la revue, pas un scanner sécurité complet. Par défaut, il s'exécute localement, n'upload pas de code et n'a pas de télémétrie.

Essai rapide :

```bash
npx scopediff scan
```

Les retours sur les faux positifs et les vraies formes de configs MCP/agents sont bienvenus.

## Português (Brasil)

Publiquei o ScopeDiff v0.1.0, uma pequena CLI para revisar mudanças de permissões em AI agents e tooling antes do merge.

Ele aponta mudanças para revisão em MCP configs, agent instructions, permissões do GitHub Actions, lifecycle scripts, Docker settings e padrões de execução de scripts remotos.

É uma ajuda para revisão, não um scanner de segurança completo. Por padrão roda localmente, não faz upload de código e não tem telemetria.

Teste:

```bash
npx scopediff scan
```

Feedback sobre falsos positivos e formatos reais de MCP/agent configs seria muito bem-vindo.

## Deutsch

Ich habe ScopeDiff v0.1.0 veröffentlicht, ein kleines CLI zum Review von AI-agent- und Tooling-Berechtigungsänderungen vor dem Merge.

Es zeigt prüfenswerte Änderungen in MCP configs, agent instructions, GitHub Actions permissions, lifecycle scripts, Docker settings und Remote-Script-Ausführungsmustern.

Es ist eine Review-Hilfe, kein vollständiger Security Scanner. Standardmäßig läuft es lokal, lädt keinen Code hoch und hat keine Telemetrie.

Ausprobieren:

```bash
npx scopediff scan
```

Feedback zu False Positives und realen MCP/agent-config-Formen ist sehr willkommen.
