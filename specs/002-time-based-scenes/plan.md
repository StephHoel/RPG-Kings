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
├── app/
│   └── game/
│       └── [saveId]/
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

```
