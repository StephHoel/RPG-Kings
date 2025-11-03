# data-model.md — Modelos de dados e regras de validação

## Entidades

### Scene

- id: string (UUID ou slug) — obrigatório, único
- title: string — obrigatório
- scheduled_day: number | null — dia agendado (nullable para cenas não agendadas)
- scheduled_hour: number | null — hora agendada (0-23) (nullable)
- content: string — texto ou payload serializado (pode ser markdown ou JSON)
- choices: Choice[] — array (pode ser vazio)
- priority?: number — inteiro, default 0

Validações:

- `id` único
- `scheduled_hour` entre 0 e 23 se não-nulo

### Choice

- id: string — obrigatório
- label: string — obrigatório
- outcome: Outcome — obrigatório

### Outcome

- id?: string
- type: 'resource_delta' | 'flag_set' | 'narrative_branch' — obrigatório
- payload: any — estrutura dependente do `type`

Exemplos de payload por tipo:

- resource_delta: { resourceKey: string, delta: number }
- flag_set: { flag: string, value: boolean }
- narrative_branch: { nextSceneId: string }

### PlayerState

- playerId: string
- resources: Record<string, number>
- flags: Record<string, boolean>
- currentDay: number
- currentHour: number
- activeSceneId?: string
- schemaVersion: number

Validações:

- `schemaVersion` presente e suportado pela `storage.migrateSave`

## Regras de migração

- `storage.migrateSave(raw)` deve inspecionar `schemaVersion` e aplicar
  transformações até o formato atual. Sempre registrar mudanças no `CHANGELOG`.

## Considerações de performance

- Saves e loads devem ser atômicos e rápidos; usar operações síncronas de
  leitura/escrita do storage local em batch quando possível para reduzir
  I/O.

## Notas de alinhamento com spec

- O `Scene` deve suportar tanto `scheduled_day` (número) quanto `weekdays` (array de `WeekdaysEnum`) conforme decisão de clarificação registrada em `specs/002-time-based-scenes/spec.md`.
