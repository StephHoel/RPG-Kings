# Guia de Issues e Convenções (PT-BR)

Este documento resume as labels, uso de milestones/releases, convenção de commits e como usar `Closes` para automatizar o fechamento de issues.

## Labels sugeridas

- `type/bug` — bug
- `type/feature` — nova funcionalidade
- `type/chore` — manutenção, documentação, etc.
- `type/task` — tarefa menor
- `status/ready` — pronto para iniciar (após triagem)
- `status/backlog` — backlog
- `status/in-progress` — em desenvolvimento
- `status/in-review` — em revisão
- `status/done` — concluído
- `priority/p0` `priority/p1` `priority/p2` `priority/p3` — prioridade
- `area/db` `area/ui` `area/api` `area/docs` — áreas do código

## Milestones / Releases

- Use milestones para agrupar issues por release (ex.: `v0.2.0`).
- Cada milestone representa uma entrega planejada; associe issues e features ao milestone correspondente.
- Acompanhe progresso via % concluído no GitHub.

## Conventional Commits + Closes

- Mensagem de commit no estilo Conventional Commits, por exemplo:

```plain
feat(player): adicionar sistema de XP

Closes #42
```

- Se o PR/merge contiver `Closes #<issue>`, o GitHub fechará a issue automaticamente.
- Use tipos: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.

## Fluxo recomendado (1 dev)

- Triagem rápido: rotacione triagem semanalmente ou ao início do sprint.
- Marcar DoR (Definition of Ready): descrição, critérios de aceitação e estimativa.
- Para começar uma issue, mova para `status/in-progress` e crie uma branch `feat/<issue-number>-<short-name>` ou `fix/<issue-number>-<short-name>`.

## Automação sugerida

- Ao abrir PR referenciando issue, adicionar automação para mover issue para `status/in-review` quando PR estiver pronto para revisão.
- Quando PR for mergeado, mover para `status/done`.
- Auto-label por path (ex.: mudanças em `docs/` aplicam `area/docs`).

## Boas práticas

- Sempre vincule PR à issue correspondente.
- Pequenas tarefas podem ser criadas como `task` e fechadas pelo merge.
