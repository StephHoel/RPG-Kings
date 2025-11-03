# quickstart.md — Como testar esta feature localmente

## Pré-requisitos

- Node.js instalado (versão compatível com o projeto)
- Dependências do projeto instaladas (npm install / pnpm install)

## Executando o app em modo dev

1. Abrir terminal na raiz do repositório
2. Instalar dependências (exemplo):

```bash
npm install
```

1. Rodar a aplicação (Next.js):

```bash
npm run dev
```

1. Abrir o app em um navegador: `http://localhost:3000`

## Adicionar uma cena de teste

1. Abrir o console do navegador (DevTools) e executar um `localStorage` patch
   temporário ou usar a UI de edição (se existir).
2. Exemplo de objeto de cena (copiar/colar no console para testes rápidos):

```javascript
const scene = {
  id: 'scene-001',
  title: 'Encontro ao entardecer',
  scheduledDay: 1,
  scheduledHour: 18,
  content: { kind: 'md', body: 'Você encontra um estranho na praça...' },
  choices: [
    { id: 'c1', label: 'Cumprimentar', outcome: { type: 'resource_delta', payload: { resourceKey: 'reputation', delta: 1 } } },
    { id: 'c2', label: 'Ignorar', outcome: { type: 'resource_delta', payload: { resourceKey: 'reputation', delta: -1 } } }
  ]
};
localStorage.setItem('scenes:001', JSON.stringify([scene]));
```

## Passos de aceitação manual (por User Story)

- US1 (Agendamento): avançar o relógio do jogo para o `currentDay`/`currentHour`
  correspondente e confirmar que a cena aparece/é disparada. Use `scheduledDay`/`scheduledHour` na definição das cenas.

- US2 (Decisões): selecionar cada opção e confirmar que o `PlayerState` é
  atualizado conforme o outcome (checar `localStorage` ou o HUD do jogo).

- US3 (Visual): inspecionar contrastes e botões para conformidade com a paleta
  roxo/lilás/cinza e verificar legibilidade.

## Observações

- Preferir usar a UI de edição de cenas (se disponível) para testes iterativos.
- Documentar qualquer diferença observada em `specs/001-time-based-scenes/research.md`.
