# Quickstart: passos de validação manual

Estes passos ajudam revisores e QA a validar os padrões de frontend implementados
para Cenas Baseadas em Tempo. Eles seguem o requisito da constituição do
projeto de incluir passos de aceitação manual.

1. Inicie o servidor de desenvolvimento (o projeto usa Next.js). Confirme que a aplicação compila e roda.
2. Abra uma página que use o container de página (`mx-auto max-w-4xl ...`) e verifique o padding responsivo em breakpoints small/medium/large.
3. Renderize um card de Cena usando as primitivas Panel/Card e verifique espaçamento, cantos arredondados e elevação (sombra).
4. Verifique as variantes de botão:
   - Primary: cor primária visível, estado hover, e anel de foco por teclado
   - Secondary: fundo mais discreto e estado hover
   - Ghost: aparência similar a link
   - Icon-only: possui `aria-label` e contorno de foco visível
5. Verifique a razão de contraste (use devtools do navegador ou extensão de acessibilidade) — texto corpo deve ser >= 4.5:1 em relação ao fundo.
6. Altere a preferência do SO `prefers-reduced-motion` (ou configure via devtools) e verifique que transições grandes estão desabilitadas.

Aceitação: Todos os itens acima devem ser verificados manualmente e listados na descrição do PR com notas de pass/fail para cada item.

## Pré-requisitos

- Node.js instalado (versão compatível com o projeto)
- Dependências do projeto instaladas (npm install / pnpm install)

## Executando o app em modo dev

1. Abrir terminal na raiz do repositório
2. Instalar dependências (exemplo):

    ```bash
    npm install
    ```

3. Rodar a aplicação (Next.js):

    ```bash
    npm run dev
    ```

4. Abrir o app em um navegador: `http://localhost:3000`

## Adicionar uma cena de teste

1. Abrir o console do navegador (DevTools) e executar um `localStorage` patch temporário ou usar a UI de edição (se existir).
2. Exemplo de objeto de cena (copiar/colar no console para testes rápidos):

```javascript
const scene = {
  id: 'scene-001',
  title: 'Encontro ao entardecer',
  scheduledDay: 1,
  scheduledHour: 18,
  content: { kind: 'md', body: 'Você encontra um estranho na praça...' },
  choices: [
    { id: 'c1', label: 'Cumprimentar' },
    { id: 'c2', label: 'Ignorar' }
  ]
};
localStorage.setItem('scenes:001', JSON.stringify([scene]));
```

## Passos de aceitação manual (por User Story)

- US1 (Agendamento): avançar o relógio do jogo para o `currentDay`/`currentHour` correspondente e confirmar que a cena aparece/é disparada. Use `scheduledDay`/`scheduledHour` na definição das cenas.

- US2 (Decisões): selecionar cada opção e confirmar que o `PlayerState` é atualizado conforme o outcome (checar `localStorage` ou o HUD do jogo).

- US3 (Visual): inspecionar contrastes e botões para conformidade com a paleta definida e verificar legibilidade.

## Observações

- Preferir usar a UI de edição de cenas (se disponível) para testes iterativos.
- Documentar qualquer diferença observada em `specs/002-time-based-scenes/research.md`.
