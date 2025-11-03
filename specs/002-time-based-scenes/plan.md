# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Gates determined based on the constitution. At minimum the plan MUST include a
short Compliance Checklist demonstrating how the planned work will adhere to
the Core Principles. Typical checks include:

- Linters and formatters configured and documented
- Type checking or static analysis enabled and passing locally
- Minimal public interfaces and API surface documented
- Manual acceptance criteria / reproduction steps provided for reviewers

Note: The constitution disallows requiring automated test suites in the
canonical repository. If the team proposes adding automated tests, the plan
MUST document the rationale and follow the amendment procedure in the
Constitution; automated tests remain optional unless amended into governance.

```markdown
# Plano de Implementação: Cenas baseadas em tempo (dia/hora)

**Branch**: `001-time-based-scenes` | **Data**: 2025-11-03 | **Spec**: ../001-time-based-scenes/spec.md
**Input**: Especificação de recurso em `/specs/001-time-based-scenes/spec.md`

## Resumo

Adicionar cenas narrativas agendadas por dia/hora do jogo e pontos de decisão
que produzem resultados observáveis (positivos/negativos) armazenados no
save local do jogador. Implementação 100% cliente (sem chamadas HTTP) usando
TypeScript + React (Next.js App Router), TailwindCSS para estilos e Dixie para
persistência local. Testes automatizados não são exigidos por governança —
validação por revisão, checagens estáticas e aceitação manual.

## Contexto Técnico

**Linguagem/Versão**: TypeScript (>=4.8)
**Framework**: React com Next.js (App Router)
**Estilização**: TailwindCSS (tokens/paleta roxo/lilás/cinza)
**Persistência**: Dixie (armazenamento local no navegador)
**Testes**: Validação manual e checklist em PRs (conforme constituição). Não
implementar suites automatizadas neste ciclo.
**Plataforma alvo**: Web (navegador moderno, Next.js App Router)
**Tipo de projeto**: Aplicação single-player, cliente-first
**Objetivos de performance**: Operações de save/recuperação com latência
perceptível baixa (alvo < 100ms em saves locais em dispositivos razoáveis)
**Restrições**: Offline-capable para sessão atual; sem chamadas HTTP nesta
versão; saves persistidos via storage local do navegador.

## Verificação da Constituição (Constitution Check)

Este plano obedece aos princípios da constituição do projeto. Antes de iniciar
Fase 0, o plano deve demonstrar os seguintes pontos de compliance na PR:

- Linters e formatadores configurados e documentados (ESLint + Prettier)
- Type checking ativado e passing localmente (tsconfig com strict recomendado)
- Interfaces públicas mínimas documentadas para agendamento de cenas e API de
  armazenamento (tipos TypeScript em `src/lib/types/scenes.ts`)
- Critérios de aceitação manual e passos de reprodução incluídos na spec e na
  PR

Observação: A constituição proíbe exigir testes automatizados como parte do
fluxo de governança; se houver proposta para adicioná-los, seguir o processo
de emenda documentado na constituição.

## Estrutura do Projeto (selecionada)

Organização proposta (arquivos específicos para esta feature):

``text
src/
├── components/
│   └── scenes/
│       ├── SceneRenderer.tsx      # Renderiza cenas a partir do modelo serializado
│       ├── SceneCard.tsx          # UI de listagem/preview de cenas
│       └── ChoiceButton.tsx       # Botões de decisão reutilizáveis
├── lib/
│   ├── time.ts                    # Relógio do jogo, avanço de horas/dias
│   ├── storage.ts                 # Wrapper para operações com Dixie + migrações
│   └── types/
│       └── scenes.ts              # Tipagens: Scene, Choice, Outcome, PlayerState
└── styles/
    └── scenes.css                 # Tokens e utilitários Tailwind para a paleta

specs/001-time-based-scenes/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── checklists/
    └── requirements.md
```markdown

**Decisão de estrutura**: Manter UI e lógica próxima (`components/scenes` e
`lib`) para facilitar refatorações e testes manuais. Scenes serão objetos
serializáveis armazenados via Dixie; o renderer interpreta os objetos em tempo
de execução e aplica efeitos ao `PlayerState`.

## Fase 0: Pesquisa & Incógnitas

Objetivo: Resolver decisões abertas e documentar em `research.md`.

Incógnitas extraídas do contexto técnico e decisões recomendadas:

1. Formato do conteúdo da cena — decisão: JSON serializável com campos {
   id, title, scheduled_day, scheduled_hour, content, choices[] }.
   Racional: simples de editar, versionar e migrar.

2. Modelo de tempo — decisão: horas discretas (inteiro) com mapeamento
   configurável para tempo real e controles manuais no UI para QA.
   Racional: determinístico e facilita testes manuais.

3. Migração de schema de saves — decisão: incluir `schemaVersion` no objeto de
   save e helpers de migração em `storage.ts`.
   Racional: permitirá evolução sem corromper saves antigos.

4. Estratégia de conflitos/ordenação de triggers — decisão: usar prioridade
   determinística (e.g., cena com `priority` maior vence; se empate, ordenar
   por ID cronológico).

Tarefas de pesquisa (serão registradas em `research.md`):

- R1: Documentar esquema JSON de Scene com exemplos
- R2: Definir modelo de clock (ticks, mapeamento real->in-game, controles)
- R3: Projetar formato de PlayerState e estratégia de migração (schemaVersion)
- R4: Confirmar acessibilidade e contraste para a paleta roxo/lilás/cinza

## Fase 1: Design & Contratos

Pré-requisito: `research.md` concluído

Entregáveis:

1) `data-model.md` — entidades e regras de validação

- Scene: id:string, title:string, scheduled_day:number|null, scheduled_hour:number|null,
  content:string (markdown ou JSON-rich), choices: Choice[]
- Choice: id:string, label:string, outcome: Outcome
- Outcome: type: 'resource_delta'|'flag_set'|'narrative_branch', payload:any
- PlayerState: playerId:string, resources:Record<string,number>, flags:Record<string,boolean>,
  currentDay:number, currentHour:number, activeSceneId?:string, schemaVersion:number

Validações: limites de campos, presença de IDs únicos, schemaVersion requerido

1) `contracts/` — contratos TypeScript (não endpoints HTTP) em `src/lib/types`:

- `types/scenes.ts` contendo as interfaces `Scene`, `Choice`, `Outcome`, `PlayerState`
- `lib/storage.ts` — API: `loadSave(saveId): Promise<PlayerState>`, `saveState(save): Promise<void>`, `migrateSave(raw): PlayerState`

3) `quickstart.md` — instruções para executar localmente, adicionar uma cena e
  validar manualmente (passos de aceitação para cada User Story).

Atualização do contexto do agente:

Tentar rodar: `.specify/scripts/bash/update-agent-context.sh copilot`
Se o script falhar (permissões/ambiente), instruir o responsável a adicionar as
novas tipagens em `.specify/memory/agent-context-copilot.json` entre os markers
existentes. O script deve ser executado após `data-model.md` ser finalizado.

## Fase 2: Tarefas de Alto Nível (saída do tasks.md)

Essas tarefas serão detalhadas em `tasks.md` pelo comando `/speckit.tasks` mas
forneço aqui a versão de alto nível para planejamento:

- Setup (T1): Configurar `src/lib/storage.ts` com wrapper Dixie e helpers de
  migração; adicionar `schemaVersion` ao save; documentar API em `types/scenes.ts`
- Foundation (T2): Implementar `lib/time.ts` (relógio do jogo e controles) e
  integrar com a UI (expor hooks `useGameClock()`)
- UI Base (T3): Criar `SceneRenderer.tsx`, `SceneCard.tsx` e `ChoiceButton.tsx`
- Stories (T4): Implementar US1 (agendamento e ativação de cenas), US2
  (decisões e aplicação de outcomes), US3 (paleta e checagens de acessibilidade)
- QA/ACE (T5): Incluir checklist de aceitação manual em cada PR; documentar
  passos em `quickstart.md` e `checklists/requirements.md`

## Checkpoints e Critérios de Aceitação da Implementação

- PR deve incluir: descrição, lista de arquivos, `Compliance Checklist` (linters,
  tipos, interfaces mínimas, passos de aceitação manual)
- Pre-merge: ESLint + Prettier + tsc (type-check) passing localmente
- Acceptance: executar passos manuais para cada User Story e confirmar SC-001 a
  SC-004 da spec

## Riscos & Mitigações

- Risco: Saves antigos incompatíveis → Mitigação: `schemaVersion` + migração
- Risco: UI não conforme paleta/contraste → Mitigação: incluir checagens de
  acessibilidade no QA checklist (Ferramentas: axe-core manual or lighthouse)

## Próximos Passos Imediatos

1. Executar Phase 0: preencher `research.md` com as decisões R1..R4
2. Implementar `data-model.md` e as tipagens em `src/lib/types/scenes.ts`
3. Rodar `.specify/scripts/bash/update-agent-context.sh copilot` (ou instruir
   atualização manual)
4. Criar branch `001-time-based-scenes` e abrir PR com o plano e artefatos

***

Arquivo gerado pelo fluxo `/speckit.plan` — revise e ajuste se necessário.

*** End Plan

```
