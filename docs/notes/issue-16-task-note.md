---
type: Task / Filho
about: Centralização e padronização do logger (Issue #16)
labels: type/task, status/backlog, priority/p2, size/s

---

# Task: Centralização e padronização do logger

## Descrição

Há uso disperso de chamadas de log em vários serviços e hooks sem uma padronização centralizada de mensagens e níveis. Isso resulta em mensagens inconsistentes, duplicação de texto e dificuldade para agregação/monitoramento de eventos e erros.

Objetivo: centralizar o logger e padronizar mensagens e níveis (info, warn, error). Facilitar rastreabilidade e instrumentação (exportação de logs, NDJSON, integração futura com monitoramento externo).

## Critérios de aceitação

- [ ] `src/domain/constants/logMessages.ts` existe e contém chaves/strings reutilizáveis para mensagens comuns (ex.: `save.deleted`, `save.delete.error`, `sheet.load.error`, `stats.load.error`).
- [ ] Principais serviços/hooks atualizados para utilizar as mensagens padronizadas (ex.: `src/services/save/deleteSave.service.ts`, `src/ui/hooks/save/useDeleteSave.ts`).
- [ ] Testes unitários que verificam comportamento do `deleteSaveService` e hooks continuam passando.
- [ ] Documentação adicionada em `.github/instructions/rpg.instructions.md` descrevendo a etapa obrigatória de ajuste de formatação antes de aplicar patches (prettier/markdownlint).

## Checklist / Passos

- [ ] Criar `src/domain/constants/logMessages.ts` com um objeto exportado contendo as chaves e templates de mensagem.
- [ ] Atualizar serviços/hook que já usam `log` para consumir as mensagens do novo módulo.
- [ ] Atualizar/Adicionar testes que dependam das mensagens (usar mocks para `log`).
- [ ] Atualizar `.github/instructions/rpg.instructions.md` para incluir a etapa obrigatória de formatação.
- [ ] Rodar `npm run test:unit` e corrigir falhas.

## Prioridade

`priority/p2`

## Estimativa

`size/s`

## Referências

Parent Feature: #8
Related Epic: #6
Branch: feat/16-padronizacao-logger

## Notas de implementação

- Use `LogSchema`/`LogModel` ao gravar logs para garantir a integridade dos dados.
- Ao padronizar mensagens, prefira templates com placeholders (ex.: `save.deleted = 'Save {id} deletado'`) e usar substituição programática ao chamar `log`.
