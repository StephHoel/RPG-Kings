# Plano de Release v0.1.9

Objetivo: entrega incremental com correções e pequenas melhorias identificadas nos TODOs e estabilização do fluxo de saves/sheets.

## Epic

- `Epic: Release v0.1.9` — issue #6

## Features planejadas

1. Melhorias no model de Sheet

   - Descrição: revisar o formato de `reputation` (possível troca de string → enum/ID), garantir criação automática de sheet quando faltar e adicionar migração necessária.
   - Critérios de aceitação:
     - API/db aceita novo formato sem quebrar saves existentes (migração implementada)
     - Ao recuperar um save sem sheet, uma sheet padrão é criada
     - Tests de migração e recuperação cobrem casos principais
   - Estimativa: `size/m`
   - Sub-tasks:
     - implementar `createDefaultSheet(saveId)` utilitário
     - adicionar migração na `db/index.ts` (upgrade path)
     - ajustar `SheetSchema` e testes (`zod`)
     - adicionar teste de integração: criar save sem sheet e validar fallback

2. Deleção em cascata de Save → Sheet

   - Descrição: ao deletar um save, garantir que sheet(s) relacionadas também sejam removidas (consistência DB).
   - Critérios de aceitação:
     - `useDeleteSave` remove sheet(s) relacionadas em transação
     - Logs claros em caso de falha
     - Teste de integração cobrindo remoção
   - Estimativa: `size/s`
   - Sub-tasks:
     - implementar transação no hook `useDeleteSave` para remover sheets
     - adicionar teste que cria save+sheet e valida remoção
     - adicionar log/error handling

3. Completar/enriquecer enums de Classes (dados seed)

   - Descrição: substituir placeholders como `colocar cada esporte`/`colocar cada idioma` por listas concretas ou mover para `constants` configuráveis.
   - Critérios de aceitação:
     - enums atualizados ou externalizados em `constants/` com documentação
     - seeds atualizados, se aplicável
     - não quebrar referências existentes
   - Estimativa: `size/s`
   - Sub-tasks:
     - definir lista inicial de `Idiomas`, `Esportes (quadra/grama/aquáticos)`, `Instrumentos`, `Danças`, `Lutas`
     - mover listas longas para `src/constants` e exportar enums/records que usem as chaves
     - atualizar docs (se necessário)

4. Documentação e automações do repositório

   - Descrição: finalizar templates, adicionar guia de uso e automações (workflows já adicionados) e criar RELEASE notes.
   - Critérios de aceitação:
     - templates em `.github` revisados e commitados
     - workflows de Kanban testados em fluxo real
     - arquivo de release (`docs/RELEASE_v0.1.9_PLAN.md`) presente
   - Estimativa: `size/s`
   - Sub-tasks:
     - validar workflows (criar issue/test PR) e ajustar se necessário
     - preparar changelog parcial a partir das mudanças

5. Limpeza / Tuning

   - Descrição: pequenas correções surgidas dos TODOs (ex.: verificar `SettingsSchema` e remover/confirmar campos experimentais).
   - Estimativa: `size/xs`
   - Sub-tasks:
     - revisar `SettingsSchema` e decidir sobre `highContrast`
     - remover/transformar TODOs resolvidos em issues ou commits

## Observações de processo

- Priorize a correção de dados e migração (feature 1) antes de mudanças em enums e seeds para evitar incompatibilidades.
- Use branches `release/v0.1.9/feat-...` para as features.
- Vincule cada issue/feature criada à epic #6 (use `scripts/create-issues.sh` ou `gh issue create --milestone 1 --label type/feature --body "..."`).

## Próximos passos recomendados (imediatos)

- Criar issues de feature para cada item acima e atribuir ao milestone `v0.1.9` e epic #6.
- Implementar a subtask crítica: `createDefaultSheet(saveId)` e teste de migração.
