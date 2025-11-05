# Notas do modelo de dados para integração com o Frontend

Este arquivo lista as entidades relevantes para a feature Cenas Baseadas em Tempo e seus campos principais do ponto de vista do frontend (como a UI as consumirá).

## Scene (Cena)

- id: string
- title: string
- content: string (markdown/HTML payload)
- scheduled_day?: number | null
- weekdays?: string[] | null (ex.: ['Mon','Wed'])
- scheduled_hour?: number | null (0-23)
- choices: Choice[]
- priority?: number

Regras de validação no frontend:

- `title` obrigatório, tamanho <= 120
- `scheduled_hour` quando presente deve estar entre 0 e 23
- `choices` pode ser um array vazio para cenas passivas

## Choice (Escolha)

- id: string
- label: string

Preocupações do frontend:

- Botões que renderizam escolhas devem ser acessíveis e suportar estados desabilitados
- Labels longos devem quebrar linha e a UI deve suportar truncamento em telas pequenas

## Regras de migração

- `storage.migrateSave(raw)` deve inspecionar `schemaVersion` e aplicar transformações até o formato atual. Sempre registrar mudanças no `CHANGELOG`.

Observação de compatibilidade: históricos saves podem usar `snake_case` (ex.: `scheduled_day`, `scheduled_hour`, `current_day`).

Implementações devem documentar o mapeamento para o formato canônico camelCase. Recomenda-se que `migrateSave` realize essa transformação automaticamente no load.

## Considerações de performance

- Saves e loads devem ser atômicos e rápidos; usar operações de leitura/escrita do storage local em batch quando possível.

## Notas

- O `Scene` deve suportar tanto `scheduledDay` (número) quanto `weekdays` (array de `WeekdaysEnum`).
