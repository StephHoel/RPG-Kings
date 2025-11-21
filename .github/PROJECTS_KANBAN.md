# Kanban (GitHub Projects) — configuração recomendada

Para um desenvolvedor solo, mantenha o board simples e automatizado:

Colunas sugeridas:

- Backlog: issues não avaliadas
- Ready: issues com DoR completas
- In Progress: em desenvolvimento
- Review: PRs aguardando revisão
- Done: concluído

Automações úteis:

- Mover issue para `In Progress` quando uma branch/PR for aberta vinculada à issue.
- Mover para `Review` quando PR estiver aberto e marcar reviewers.
- Mover para `Done` quando PR for mergeado.

Como criar o Project (via GitHub UI ou gh cli):

```bash
gh project create "RPG-Kings Kanban" --repo StephHoel/RPG-Kings --private
```

Depois crie colunas manualmente ou via API e ligue as automações.
