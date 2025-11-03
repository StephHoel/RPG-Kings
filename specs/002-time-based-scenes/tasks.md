# tasks.md — Tarefas geradas para 001-time-based-scenes (gerado por /speckit.tasks)

## Sumário

Total estimado de tarefas: 24

- Tarefas por user story: US1=6, US2=6, US3=3, Setup/Foundation/Polish=9

## Phase 1 — Setup

- [ ] T001 Configurar keys e wrappers de storage (src/lib/storage.ts) — documentar uso de Dixie e fallback para localStorage (arquivo: src/lib/storage.ts)
- [ ] T002 [P] Ajustar configuração TypeScript/ESLint/Prettier para nova feature (arquivos: tsconfig.json, .eslintrc, package.json)
- [ ] T003 [P] Adicionar tokens Tailwind para paleta roxo/lilás/cinza (arquivo: src/styles/tokens.css ou tailwind.config.js)

## Phase 2 — Foundation (bloqueantes comuns)

- [ ] T004 Implementar GameClock e hook de consumo `useGameClock()` (arquivo: src/lib/time.ts)
- [ ] T005 Implementar storage migrate/load/save completos com `schemaVersion` (arquivo: src/lib/storage.ts)
- [ ] T006 Criar tipagens compartilhadas e contratos TypeScript (arquivo: src/lib/types/scenes.ts)

## Phase 3 — User Story 1 (US1) — Agendamento e ativação de cenas (P1)

Objetivo: cenas programadas por `scheduled_day`/`weekdays` e `scheduled_hour` são ativadas no relógio do jogo.

- [ ] T007 [US1] Criar modelo de Scene e validação (arquivo: src/lib/types/scenes.ts e specs/001-time-based-scenes/data-model.md)
- [ ] T008 [US1] Implementar loader de cenas de `localStorage`/Dixie (arquivo: src/lib/storage.ts)
- [ ] T009 [US1] Implementar lógica de trigger: verificar cenas ativas no avanço de hora (arquivo: src/lib/time.ts e src/lib/sceneScheduler.ts)
- [ ] T010 [US1] Criar componente `SceneCard` e ponto de entrada UI para exibir cena quando ativada (arquivo: src/components/scenes/SceneCard.tsx)
- [ ] T011 [US1] Integração com HUD: exibir notificação/entrada de cena no fluxo do jogador (arquivo: src/app/game/[saveId]/page.tsx ou src/components/StatusPanel.tsx)
- [ ] T012 [US1] Teste manual de aceitação: executar checklist US1 (documentar resultados em specs/001-time-based-scenes/checklists/requirements.md)

## Phase 4 — User Story 2 (US2) — Decisões com consequências (P1)

Objetivo: escolhas em cenas aplicam outcomes ao PlayerState e persistem.

- [ ] T013 [US2] Implementar aplicação de `Outcome` (resource_delta, flag_set, narrative_branch) no PlayerState (arquivo: src/lib/outcomes.ts)
- [ ] T014 [US2] Implementar UI de escolha e ligação com handlers (arquivo: src/components/scenes/SceneRenderer.tsx)
- [ ] T015 [US2] Atualizar storage para persistir mudanças no PlayerState após escolha (arquivo: src/lib/storage.ts)
- [ ] T016 [US2] Criar migração/compatibilidade de saves para incluir flags/resources (arquivo: src/lib/storage.ts)
- [ ] T017 [US2] Adicionar páginas/fluxos que dependem de flags (arquivo: `src/app/*` conforme App Router)
- [ ] T018 [US2] Teste manual de aceitação: executar checklist US2 (documentar em specs/001-time-based-scenes/checklists/requirements.md)

## Phase 5 — User Story 3 (US3) — Visual identity & acessibilidade (P2)

Objetivo: UI e cenas seguem paleta e regras de contraste.

- [ ] T019 [US3] Aplicar tokens Tailwind e classes utilitárias nos componentes de cena (arquivo: src/components/scenes/*.tsx)
- [ ] T020 [US3] Verificar contraste e legibilidade (documentar passos em specs/001-time-based-scenes/checklists/requirements.md)
- [ ] T021 [US3] Ajustes finais de UX (botões, foco, navegação) (arquivo: src/components/scenes/*.tsx)

## Phase 6 — Polish & Cross-cutting

- [ ] T022 Polir mensagens de erro e logs observáveis (arquivos: src/lib/*, src/components/*)
- [ ] T023 Atualizar `quickstart.md` e adicionar instruções de PR/aceitação (arquivo: specs/001-time-based-scenes/quickstart.md)
- [ ] T024 Criar PR com Compliance Checklist e passos de aceitação (PR body/description)

## Dependências e ordem de execução

Recomendação de ordem (bloqueios): T001,T002,T003 → T004,T005,T006 → T007..T012 (US1) → T013..T018 (US2) → T019..T021 (US3) → T022..T024 (Polish)

## Paralelização (exemplos)

- T002 e T003 podem rodar em paralelo (configuração).  
- T007 (model) e T006 (tipagens) são paralelizáveis com coordenação mínima (T006 deve pelo menos expor interfaces).  
- T014 (UI de escolhas) e T015 (persistência pós-escolha) podem ser desenvolvidas em paralelo por desenvolvedores diferentes.

## MVP sugerido

- Implementar apenas US1 (T007..T012) para entrega rápida e válida; isso garante o core loop de cenas agendadas.
