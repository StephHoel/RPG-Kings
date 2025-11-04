# tasks.md — Tarefas: Cenas Baseadas em Tempo

Este arquivo lista tarefas executáveis, organizadas por user story (PT-BR).

Marquei como concluídas as tarefas cujo código correspondente já existe no repositório.

Feature: Cenas Baseadas em Tempo
Tech stack: TypeScript, Next.js (App Router), TailwindCSS, Dixie (armazenamento local)

## Phase 1 — Setup (tarefas de infraestrutura e configuração)

- [x] T001 Configurar tipagens base e schemas Zod para Scene e Save em `src/data/schemas/SceneSchema.ts` e `src/data/schemas/SaveSchema.ts`
- [x] T002 Definir enums e utilitários compartilhados em `src/data/enums/*` (`Weekdays`, `TimeslotId`, `SceneTag`) — arquivos já presentes
- [x] T003 Adicionar utilitário `_schemas.ts` com helper `s` (tipos reutilizáveis) em `src/data/schemas/_schemas.ts`
- [ ] T004 [P] Criar `src/interfaces/scenes.ts` com as interfaces TypeScript exportadas (Scene, Choice, PlayerState)
- [ ] T005 Configurar `src/lib/storage.ts` — wrapper para Dixie + função `migrateSave(raw)` com versionamento do schema

## Phase 2 — Fundacionais (pré-requisitos para todas as US)

- [x] T006 Criar `src/components/SceneCard.tsx` (UI de preview de cena) — já existe em `src/components/SceneCard.tsx`
- [ ] T007 Implementar `src/lib/time.ts` com relógio do jogo (advanceHour, setHour, subscribe)
- [ ] T008 Criar `src/components/scenes/SceneRenderer.tsx` para renderizar `content` em `{ kind: 'md'|'json', body: ... }`
- [ ] T009 Criar `src/components/scenes/ChoiceButton.tsx` para decisões reutilizáveis

## Phase 3 — User Stories (ordenadas por prioridade)

### US1 — Agendamento e Disparo de Cenas (Priority: P1)

- [ ] T010 [US1] Implementar carga de cenas por save em `src/hooks/getSceneBySave.ts` (consulta ao storage/dixie)
- [ ] T011 [US1] Implementar verificação de gatilho por tempo em `src/lib/time.ts` → função `getScenesToTrigger(save: PlayerState, scenes: Scene[]) : Scene[]`
- [ ] T012 [US1] Integrar disparo de cenas no fluxo de jogo: `src/app/game/[saveId]/page.tsx` (ou equivalente) para mostrar `SceneRenderer` quando cena for acionada
- [ ] T013 [DISCONTINUED] [US1] Persistir estado após escolha (aplicar `Outcome`) via `src/lib/storage.ts::savePlayerState`
- [ ] T014 [US1] Criar aceitação manual em quickstart: passos para adicionar cena via console e avançar relógio (documentado em `specs/002-time-based-scenes/quickstart.md`) — já existe documentação

### US2 — Decisões e Efeitos (Priority: P2)

- [ ] T015 [DISCONTINUED] [US2] Implementar aplicação de `Outcome` no `PlayerState` em `src/lib/outcomes.ts` (resource_delta, flag_set, narrative_branch)
- [ ] T016 [US2] Criar componentes de UI que exibam escolhas e apliquem efeitos em `src/components/scenes/*.tsx`
- [ ] T017 [DISCONTINUED] [US2] Atualizar `src/data/schemas/SceneSchema.ts` para validar `outcome.payload` por `type` (Zod refinements)

### US3 — Interface de Gerenciamento e Visual (Priority: P3)

- [ ] T018 [US3] Criar `src/app/dev/seed/scenes.ts` ou UI de edição para inserir/editar cenas no storage
- [ ] T019 [US3] Criar `src/components/scenes/SceneCard.tsx` versão detalhada com tags, timeslots e prioridade (aprimorar o existente)
- [ ] T020 [US3] Aplicar estilos Tailwind conforme tokens da paleta (arquivo `src/styles/scenes.css` sugerido)

## Final Phase — Polish & Cross-cutting

- [ ] T021 Ajustar `storage.migrateSave` para mapear campos snake_case → camelCase e aumentar `schemaVersion` quando necessário (`src/lib/storage.ts`)
- [ ] T022 Adicionar documentação de API interna em `src/interfaces/scenes.ts` e `specs/002-time-based-scenes/data-model.md` (com exemplos JSON)
- [ ] T023 [P] Revisão geral de acessibilidade e contraste para os componentes de cena (documentar resultados em `specs/002-time-based-scenes/checklists/requirements.md`)

## Dependências (ordem de execução recomendada)

- US1 depende de: Phase1 (T001..T006), T007, T008
- US2 depende de: US1 (T010..T014) e T015
- US3 pode ser implementada em paralelo com US2 (marca [P] quando aplicável)

## Paralelismo sugerido

- Enquanto `src/lib/storage.ts` (T005) é implementado, a equipe pode trabalhar em `src/components/scenes/*` (T008/T009/T016) em paralelo [P]
- [DISCONTINUED] Implementação de `outcomes.ts` (T015) é paralelizável com UI de escolhas (T016) — concentrar integração ao final

## Implementação mínima recomendada (MVP)

- MVP: Implementar US1 apenas (T010..T014) + storage/migration (T005, T021) e time.ts (T007). Isso permite agendar e disparar cenas e aplicar escolhas básicas.

## Métricas e critérios independentes de aceitação (por história)

- US1 (T010..T014): cena dispara quando `currentDay/currentHour` coincide com `scheduledDay/scheduledHour` ou `weekdays`, e o `PlayerState` reflete a escolha feita. Teste manual: adicionar cena via console e usar controles do relógio.
- US2 (T015..T017): aplicar `resource_delta` altera `PlayerState.resources[resourceKey]` conforme o `delta`. Teste manual: escolha opção e verificar `localStorage` ou HUD.
- US3 (T018..T020): UI permite listar cenas existentes e mostrar metadados (timeslots, tags, prioridade). Teste manual: usar UI para criar cena e verificar aparecimento no fluxo do jogo.

## Contagem de tarefas

- Total: 23 tarefas
- Por user story: US1 — 5 tarefas; US2 — 3 tarefas; US3 — 3 tarefas; Setup/Foundational/Polish — 12 tarefas

## Validação de formato

Todos os itens acima seguem o formato de checklist exigido pelo template de tasks. Arquivos e caminhos estão especificados para cada tarefa.
