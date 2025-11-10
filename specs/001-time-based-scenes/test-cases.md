# Test cases — Manual test set for SC-001

Este arquivo descreve um conjunto mínimo de casos de teste manuais para validar
SC-001 (disparo de cenas agendadas).

Recomenda-se pelo menos 10 cenas de teste que cubram:

- 4 cenas pontuais (scheduledDay + scheduledHour) em dias distintos
- 4 cenas recorrentes (weekdays + scheduledHour) cobrindo diferentes dias da semana
- 2 cenas conflitantes (mesmo scheduledDay/scheduledHour) com prioridades distintas

Formato sugerido (exemplo):

```json
{
  "id": "scene-001",
  "title": "Punctual scene",
  "scheduledDay": 2,
  "scheduledHour": 14,
  "content": { "kind": "md", "body": "Teste pontual" },
  "choices": []
}
```

Passos de execução (exemplo):

1. Carregar saves de teste via `localStorage`/Dixie ou UI dev
2. Ajustar `PlayerState.currentDay`/`currentHour` para o ponto antes do evento
3. Chamar `GameClock.advanceHour()` até o horário alvo
4. Verificar que a cena foi disparada e registrada no HUD ou `PlayerState.activeSceneId`

Registro: documentar resultados e quaisquer diferenças em `research.md`.
