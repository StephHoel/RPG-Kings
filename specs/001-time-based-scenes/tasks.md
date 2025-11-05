# tasks.md — Tarefas detalhadas para Time-based Scenes

## Overview

Este arquivo lista tarefas de implementação, organizadas por fases e prontas
para atribuição. A convenção de branch é `001-time-based-scenes`.

## Setup (T1)

- T1.1: Configurar `src/lib/storage.ts` para usar Dixie quando disponível e
  fallback para `localStorage`.
- T1.2: Atualizar `tsconfig`/ESLint se necessário para aceitar novos arquivos
  e regras de import.
- T1.3: Documentar a API de armazenamento em `src/lib/types/scenes.ts`.

## Foundation (T2)

- T2.1: Implementar o `GameClock` e exportar hooks `useGameClock()` (wrapper).
- T2.2: Implementar `lib/storage` migrate/load/save completos com testes manuais.
- T2.3: Criar `specs/001-time-based-scenes/data-model.md` final (já esboçado).

## UI Base (T3)

- T3.1: Criar `SceneRenderer.tsx` (render + choices) — acessível e responsivo.
- T3.2: Criar `SceneCard.tsx` e páginas de preview/editação dev-only.
- T3.3: Adicionar tokens Tailwind para paleta roxo/lilás/cinza e utilitários.

## User Stories (T4)

- T4.1 (US1): Agendamento e ativação de cenas — disparo baseado em `currentDay/currentHour`.
- T4.2 (US2): Implementar aplicação de `Outcome` (resource_delta, flag_set, narrative_branch).
- T4.3 (US3): Checagens visuais e ajustes de acessibilidade.

## QA / Acceptance (T5)

- T5.1: Incluir checklist manual em PRs (referenciar `specs/001-time-based-scenes/checklists/requirements.md`).
- T5.2: Validar migrações de saves com um conjunto de saves de exemplo.

## Notes

- Não é obrigatório adicionar testes automatizados conforme Constituição do
  projeto; porém, documentar como adicionar testes no futuro como anexo.
