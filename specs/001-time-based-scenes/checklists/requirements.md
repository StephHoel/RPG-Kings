# Checklist de Requisitos — Time-based Scenes

Path: `specs/001-time-based-scenes/`

## Objetivo

Verificar que a feature de cenas agendadas por dia/hora funciona conforme a
especificação e as clarificações (suporta cenas pontuais e recorrentes).

## Itens (passos de verificação manual)

1. Ambiente preparado
   - Instrução: iniciar a aplicação em modo dev (`npm run dev`) e abrir o save de teste.

2. Validação de modelo de dados
   - Verificar que cenas testadas incluem `scheduledDay`, `weekdays` e `scheduledHour` quando aplicável.

3. US1 — Agendamento pontual (scheduled_day)
   - Passos:
      1. Criar uma cena com `scheduledDay = 2` e `scheduledHour = 14`.
      2. Ajustar `PlayerState` para `currentDay = 2` e `currentHour = 13`.
      3. Avançar o relógio para `currentHour = 14`.
      4. Resultado esperado: a cena é disparada/ficou disponível no HUD.

4. US1 — Agendamento recorrente (weekdays)
   - Passos:
      1. Criar uma cena com `weekdays = ['Mon','Wed']` e `scheduledHour = 18`.
      2. Ajustar `PlayerState` para um `currentDay` correspondente a Monday e `currentHour = 17`.
      3. Avançar o relógio para `currentHour = 18`.
      4. Resultado esperado: a cena é disparada nos dias configurados.

5. US2 — Decisões e consequências
     - Passos:
        1. Durante uma cena, selecionar cada `Choice` disponível.
        2. Verificar que o `PlayerState` é atualizado conforme o `Outcome` (resource_delta, flag_set ou narrative_branch).

6. Persistência
     - Passos:
        1. Realizar escolhas e salvar o jogo.
        2. Recarregar o save e verificar que decisões e estado persistiram (usar `storage.migrateSave` para compatibilidade de campos legados).

7. Conflito / prioridade
     - Passos:
        1. Criar duas cenas programadas para o mesmo `scheduledDay`/`scheduledHour` com diferentes `priority`.
        2. Verificar que cena com maior `priority` é a aplicada.

8. Visual / acessibilidade
   - Passos:
     1. Inspecionar botões e textos para conformidade com paleta roxo/lilás/cinza.
     2. Rodar checagem manual de contraste (ex.: ferramenta de devtools ou axe).

## Observações

- Se qualquer passo falhar, documentar repro steps e abrir issue referenciando a spec.
- Testes automatizados não são exigidos por governança; porém, registrar qualquer
  comportamento não determinístico que prejudique QA manual.
