# Instruções do Agente Ajudante

Este documento contém as instruções e convenções que orientam o comportamento do agente ajudante para o repositório RPG-Kings.

## Quando usar

- Para criar ou editar issues (features, tasks, bugs) seguindo templates como `feature.md` e `task.md`, usando `create-issues.sh`.
- Implementar subtasks de features, como criar utilitários, schemas, hooks e migrações.
- Gerenciar branches, commits convencionais e PRs.
- Validar código com builds, testes e linting.

## Limites

- Não executa ações prejudiciais, como deletar código sem confirmação ou expor secrets.
- Segue políticas de segurança e copyrights.
- Não inventa APIs ou comandos; verifica com ferramentas.
- Para tarefas complexas, divide em passos e confirma progresso.

## Entradas ideais

- Descrições de features/tasks (ex.: "Implementar createDefaultSheet").
- Números de issues (ex.: #7 para feature).
- Planos de release ou TODOs.
- Solicitações de código (ex.: schema de DB, hooks React).

## Saídas esperadas

- Issues criadas/editadas no GitHub.
- Arquivos de código editados ou criados.
- Relatórios de progresso (ex.: "Issue #10 atualizada").
- Sugestões de branches (ex.: `feat/10-implementar-createDefaultSheet`).
- Links para issues/PRs criados.

## Ferramentas usadas

- `github-pull-request_issue_fetch`: Buscar detalhes de issues.
- `run_in_terminal`: Executar comandos (gh issue create, builds).
- `replace_string_in_file`: Editar arquivos.
- `semantic_search`: Buscar código relevante.
- `github-pull-request_copilot-coding-agent`: Para implementações complexas.

## Relato de progresso

- Atualiza status de issues (ex.: move para in-progress).
- Comita mudanças com mensagens convencionais (ex.: `feat: implementar createDefaultSheet`).
- Pergunta ao usuário se algo estiver incerto (ex.: "Confirmar schema?").

## Como pedir ajuda

Se a tarefa for ambígua, o agente pergunta por esclarecimentos (ex.: "Qual é o schema exato?").

## Regra de fluxo obrigatório

- **Fluxo estrito:** Todas as implementações e alterações devem seguir a sequência: `ui > hook > service > repo > db`.
- **Proibições:** Componentes de `ui` não devem acessar `service`, `repo` ou `db` diretamente. Hooks não devem acessar `db` diretamente. Services podem usar `repo`, e `repo` é o único responsável por acessar o `db`.

### Responsabilidades

- `ui`: componentes React/Next.js — apenas interação e apresentação.
- `hook`: hooks customizados que orquestram lógica de UI e delegam para `service`.
- `service`: lógica de aplicação, validações e composição de chamadas a `repo`.
- `repo`: camada de acesso a dados (Dexie, fetch, storage), única que fala com `db`.
- `db`: implementação de persistência (Dexie DB, localStorage, API externa).

## Convenções e exemplos rápidos

- Exemplo mínimo de fluxo:
  - `components/CharacterForm.tsx` chama `useCharacterForm` (hook).
  - `useCharacterForm` chama `characterService.createCharacter()`.
  - `characterService.createCharacter()` valida e chama `characterRepo.add()`.
  - `characterRepo.add()` executa `db.characters.add()`.

- Nomes e locais recomendados:
  - Hooks: `src/ui/hooks/*`.
  - Services: `src/services/*` (ex.: `src/services/character.ts`).
  - Repos: `src/infra/repositories/*`.

## Exports

- **Regra de exports:** Não use `export default`. Prefira sempre *named exports* (por exemplo `export function foo()` ou `export const foo = ...`).
- **Exportar na declaração:** Faça a exportação diretamente na declaração (ex.: `export function foo() {}`), e evite re-exportar no final do arquivo (`export { foo }`).

## Checklist para PRs (verificação de fluxo)

- Arquitetura: confirme que as mudanças obedecem `ui > hook > service > repo > db`.
- Importações: nenhum arquivo em `ui` deve importar `service`, `repo` ou `db` diretamente.
- Encapsulamento: hooks não importam `db` diretamente — use `service`.
- Testes: adicione testes unitários para `service` e `repo` quando a lógica estiver neles.
- Commit: mensagens convencionais (`feat:`, `fix:`, `refactor:`).

## Como aplicar a regra em tarefas existentes

- Se encontrar código que quebra o fluxo, abra uma issue/task descrevendo o refactor necessário e proponha a implementação com:
  - Extração de lógica para `service`/`repo`.
  - Criação de hooks para invocação a `service`.
  - Migração de chamadas diretas ao `db` para métodos em `repo`.

## Exemplos de anti-padrões (o que evitar)

- Componentes que importam `db` ou `repo` diretamente.
- Hooks que executam queries no `db` sem passar pelo `service`.
- Services que manipulam diretamente UI (renderização, navegação).

## Proibição de imports dinâmicos

- **Regra:** Não use imports dinâmicos (`import(...)` ou `require` com caminho dinâmico) em código dentro de `src/` nem em arquivos de teste. Imports dinâmicos também não devem ser introduzidos por geradores de código ou templates automáticos que afetem o código fonte do projeto.
- **Por quê:** Imports dinâmicos quebram análise estática (types, bundlers, tree-shaking), tornam o comportamento dos testes não determinístico, complicam a composição de dependências e dificultam revisões e refactors.
- **Exceções:** Scripts de build/infra fora de `src/` (por exemplo, ferramentas de migração ou scripts de CI em `scripts/`) podem usar imports dinâmicos se houver justificativa e aprovação da equipe. Qualquer exceção deve ser documentada na PR.
- **Alternativas:**
  - Prefira `import` estático e named exports.
  - Use injeção de dependência ou patterns de fábrica para trocar implementações em testes.
  - Nos testes, use `jest.mock()` / helpers de mocking em vez de carregar módulos dinamicamente.
  - Se precisar de code-splitting em runtime, utilize APIs do framework que aceitem imports estáticos explícitos e documente a razão.

## Observações finais

- Esta regra existe para manter separação de responsabilidades, testabilidade e previsibilidade do código. Ao revisar PRs, priorize clareza do fluxo e pequenas mudanças que respeitem a regra.

## Testes

- **Comando unitários:** Execute os testes unitários com `npm run test:unit`.
- **Comando e2e:** Execute os testes end-to-end com `npm run test:e2e`.

As pipelines e revisores devem seguir estes comandos para consistência. Se o projeto adicionar outra task de teste, atualize este documento.

## Política de Deleção em Cascata

- **Responsabilidade:** A deleção em cascata deve ser implementada apenas na camada `repo` (repositório), que é a única responsável por acessar o DB.
- **Atomicidade:** Quando uma entidade principal (ex.: `save`) tiver dependentes (ex.: `sheets`, `stats`, `inventories`, `xp_records`), a remoção completa deve ocorrer dentro de uma transação do DB (por exemplo, `db.transaction('rw', [...stores], async () => { ... })`) para garantir atomicidade.
- **Services/Hooks/UI:** Services chamam métodos de `repo` que encapsulam a lógica de deleção — hooks/UI não devem chamar múltiplos repositórios para tentar replicar cascata em nível superior.
- **Exceptions:** Para deleções parciais ou operações específicas (por exemplo, remoção de apenas um `item` de `inventory`), use os métodos individuais dos repositórios correspondentes. Somente empregue cascata quando for necessário remover uma entidade raiz e todos seus dependentes.
- **Documentação/Testes:** Toda mudança que introduza deleção em cascata deve ser acompanhada por testes unitários que verifiquem que os registros dependentes são removidos e por uma nota curta na documentação (ou na mensagem do PR) explicando quais stores são afetados.

## Templates

- **PR:** `.github/PULL_REQUEST_TEMPLATE.md`
- **Task:** `.github/ISSUE_TEMPLATE/task.md`
- **Bug:** `.github/ISSUE_TEMPLATE/bug.md`
- **Docs:** `.github/ISSUE_TEMPLATE/docs.md`
- **Epic:** `.github/ISSUE_TEMPLATE/epic.md`
- **Feature:** `.github/ISSUE_TEMPLATE/feature.md`

Use estes templates sempre que for pedido criar uma Pull Request ou uma Issue correspondente ao tipo. Eles garantem consistência nas descrições, critérios de aceitação e checklists que os revisores esperam encontrar.
