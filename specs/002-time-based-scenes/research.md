# research.md — Pesquisas e decisões (unificado)

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
  "choices": [ { "id": "c1", "label": "...", "outcome": {...} } ]
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
