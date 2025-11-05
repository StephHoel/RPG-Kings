# Pesquisa: decisões de design de frontend para a feature de Cenas Baseadas em Tempo

Este documento registra decisões e o racional para o sistema de design de
frontend utilizado pela feature de Cenas Baseadas em Tempo. Resolve
esclarecimentos pendentes do plano de implementação e define os padrões de
componentes e tokens que serão armazenados em `docs/frontend-patterns.md`.

As decisões concentram-se em: botões, telas/layouts, tokens de cor, tipografia, variantes de componentes, acessibilidade e notas de implementação para a base existente Next.js + Tailwind.

## Decisão: tecnologia base e integração

- Decisão: Manter Next.js e TailwindCSS (o projeto já usa Tailwind)
  - Racional: o repositório contém `tailwind.config.js` e `next.config.js` e componentes em `src/` que já usam classes Tailwind.
  - Alternativas: CSS-in-JS (emotion/styled-components) — rejeitado por gerar overhead e não combinar com a base atual.

## Decisão: estratégia de design tokens

- Decisão: Usar os tokens do tema do Tailwind e fornecer um arquivo leve de extensão de tokens (`docs/frontend-patterns.md` conterá os tokens), mantendo os tokens canônicos em `tailwind.config.js` quando necessário.
  - Racional: atrito mínimo e fonte única da verdade para cores/eixos de espaçamento.
  - Alternativas: tokens em JSON + mapeamento em tempo de execução — rejeitado por complexidade.

## Decisão: paleta de cores

- Decisão: Fornecer tokens semânticos (primary, secondary, accent, background, surface, error, success) e duas escalas neutras para texto e superfícies de UI.
  - Racional: tokens semânticos melhoram a legibilidade das classes de componente e permitem troca de tema no futuro.
  - Observação de acessibilidade: buscar contraste AA (4.5:1 para texto corpo, 3:1 para texto/ícones grandes de UI).

## Decisão: primitivas de botão

- Decisão: Definir três variantes de botão — primary, secondary, ghost — além de variantes disabled e icon-only. Cada variante terá tamanhos: sm, md, lg.
  - Racional: cobre a maioria das interações (afirmativa, neutra, menos proeminente).
  - Comportamento: os botões devem suportar foco por teclado, `aria-label` para icon-only e respeitar preferência de redução de movimento para desabilitar animações maiores.

## Decisão: telas & layout

- Decisão: Usar um pequeno conjunto de primitivas responsivas de layout:
  - Container de página (largura máxima e padding responsivo)
  - Painel / Card para agrupar superfícies
  - Sidebar (colapsável) para progresso/marcos
  - Modal em overlay para apresentação de cena quando o jogador acionar
  - Visualização full-bleed para momentos imersivos

## Decisão: acessibilidade

- Decisão: Seguir WCAG AA para cores e navegação por teclado. Incluir os seguintes requisitos:
  - Todos os controles interativos alcançáveis por teclado e com estados de foco visíveis.
  - Controles apenas com ícones devem ter nomes acessíveis (`aria-label`).
  - Respeitar a preferência `prefers-reduced-motion` para transições.

## Notas de implementação

- Adicionar um novo arquivo de docs `docs/frontend-patterns.md` com tokens prontos para uso, recomendações em Tailwind e exemplos de componentes. Manter exemplos curtos e fáceis de copiar para a estrutura `src/components`.
- Não serão adicionados testes visuais automatizados ou snapshots ao repositório canônico (constituição); passos de aceitação manual serão listados em `specs/002-time-based-scenes/quickstart.md`.

## Perguntas abertas (NEEDS CLARIFICATION)

- Troca de tema: manter como trabalho futuro (NEEDS CLARIFICATION se for necessário agora).
- Empacotamento da biblioteca de componentes: os componentes padrões devem ser adicionados em `src/components`? (Pressuposto: sim — iremos adicionar componentes pequenos e exemplos em vez de uma biblioteca completa.)

## Resultados esperados

- `docs/frontend-patterns.md` será criado na raiz do repositório com os padrões canônicos, tokens, exemplos e notas de uso rápido.

## Contexto

Objetivo: resolver incógnitas para implementação de cenas agendadas por dia/hora
em um jogo single-player que persiste dados no navegador usando Dixie.

### Incógnitas identificadas

- Formato do conteúdo das cenas
- Modelo de tempo (ticks / mapeamento real->in-game)
- Migração de schema de saves
- Ordenação e resolução de conflitos entre triggers

---

## R1 — Formato do conteúdo da cena

Decision: usar JSON serializável com a seguinte forma mínima:

```json
{
  "id": "string",
  "title": "string",
  "scheduledDay": 1,
  "scheduledHour": 14,
  "content": { "kind": "md", "body": "string" },
  "choices": [ { "id": "c1", "label": "..." } ]
}
```

Rationale: formato simples, fácil de serializar/migrar e de editar por ferramentas
simples; compatível com armazenamento local.

---

## R2 — Modelo de tempo

Decision: usar horas discretas (inteiros) como unidade do jogo, com um
relógio configurável que pode mapear N segundos reais para 1 hora do jogo.
Expor controles manuais (advanceHour, setHour) para QA.

Rationale: determinístico, facilita teste manual e facilita reprodução de
cenários em sessões de QA.

---

## R3 — Migração de schema de saves

Decision: incluir `schemaVersion` no objeto de save; `storage.ts` expõe
helpers de migração `migrateSave(raw)` para elevar saves antigos ao formato
atual.

Rationale: mantém compatibilidade com saves antigos e fornece ponto único de
atualização.

---

## R4 — Resolução de conflitos / ordenação de triggers

Decision: definir `priority` opcional nas cenas; ao mesmo horário, a cena com
maior `priority` é aplicada. Em empate, ordenar por `id` (cronológico).

Rationale: determinístico e fácil de implementar.

---

## Próximo passo (Phase 1)

Gerar `data-model.md`, contratos TypeScript e quickstart com passos de
aceitação manual.
