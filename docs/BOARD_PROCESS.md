# Processo do Quadro (Kanban)

Objetivo: padronizar o uso do Kanban do projeto (`Backlog`, `Ready`, `In Progress`, `Review`, `Done`) e definir como os desenvolvedores devem nomear branches e abrir Pull Requests para que as automações funcionem corretamente.

## Nomeação de branches

- Utilize `feat/<numero-da-issue>-descrição-curta` para branches de feature. Exemplo: `feat/10-implementar-createDefaultSheet` onde `10` é o número da issue (importante — as automações encontram a issue pelo prefixo `10-`).
- Utilize `fix/<numero-da-issue>-descrição-curta` para correções de bugs.

## Ciclo de vida da Issue / Tarefa

- `Backlog`: ideias não priorizadas.
- `Ready`: item priorizado e pronto para iniciar (descrição, critérios de aceite e subtarefas quando necessário).
- `In Progress`: uma tarefa está sendo implementada (branch criada com o padrão acima).
- `Review`: Pull Request aberto para a branch/issue.
- `Done`: PR mergeado e issue fechada.

## Regras para Epic / Feature / Task

- Task: item executável e fonte de verdade do progresso. Movimente a task entre as colunas conforme o andamento.
- Feature: conjunto de tasks; o status da feature acompanha o agregado das tasks (se ao menos uma task da feature estiver `In Progress`, considere a feature `In Progress`).
- Epic: agrupamento de features; marque `Done` no epic somente quando todas as features relacionadas estiverem concluídas.

## Pull Requests e Branches

- O nome da branch deve incluir o número da issue como prefixo (ex.: `feat/10-...`). O workflow usa esse número para localizar a issue relacionada.
- Ao empurrar a branch (push), o workflow pode marcar a issue relacionada como `status/in-progress`.
- Ao abrir um Pull Request para essa branch, o workflow marcará a issue como `status/review` e adicionará um comentário com o link do PR.
- Ao fundir (merge) o PR, o workflow marcará a issue como `status/done` e tentará fechá-la automaticamente se o PR referenciar a issue.

## Mapeamento de labels → Status

Nome da label -> valor do campo Status no projeto

- `status/backlog` → `Backlog`
- `status/ready` → `Ready`
- `status/in-progress` → `In progress`
- `status/review` → `In review`
- `status/done` → `Done`

## Secret necessário para automação completa

- Crie um Personal Access Token (PAT) com os escopos `repo` e `project`.
- Adicione esse token aos segredos do repositório com o nome `PROJECT_TOKEN`.
- Os workflows usam `GITHUB_TOKEN` como fallback para operações simples de issue/label, mas `PROJECT_TOKEN` é necessário para mutações no ProjectV2 (ex.: definir campos do projeto programaticamente).

## Checklist do desenvolvedor (rápido)

- Crie a issue e coloque-a em `Ready` antes de começar.
- Crie a branch usando o padrão de nomeação.
- Implemente, faça push e abra o PR referenciando a issue.
- Ao abrir o PR, aguarde o workflow mover a issue para `Review`.
- Após o merge, confirme que a issue foi movida para `Done` e fechada.
