# RPG King's Academy

Aplicação Web RPG escolar para sobrenaturais, construída com React, React Router DOM, TailwindCSS e integração backend via REST.

---

## Tecnologias

- React + React Router DOM
- Vite (dev server)
- TailwindCSS
- SQL.js (leitura de tabelas locais)
- Integração REST (.NET backend)

---

## Como Executar (desenvolvimento)

1. Instale dependências:

    ```bash
    npm install
    ```

2. Rodar em modo desenvolvimento (Next):

    ```bash
    npm run dev
    ```

3. Acesse: [http://localhost:3000/](http://localhost:3000/)

---

## Dicas rápidas de desenvolvimento

- Instale as extensões do VSCode recomendadas nas configurações locais.
- Não esqueça dos padrões de cores pré-estabelecidos.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── auth/           # Contexto e serviços de autenticação JWT
├── components/     # Componentes reutilizáveis (Loader, Toasts, etc)
├── constants/      # Constantes globais (rotas, etc)
├── data/           # Dados fixos (personagens, eventos)
├── logic/          # Lógica de negócio (engine do jogo, sqljs)
├── pages/          # Páginas principais (Home, Game, NotFound)
├── router/         # Configuração de rotas e proteção
├── types/          # Tipos e interfaces centralizados
└── index.css       # Estilos globais
```

---

## Rotas

- `/`
- `/auth`
- `/saves`
- `/saves/new`
- `/game?saveId=`
- `/progress?saveId=`
- `/sheet?saveId=`
- `/settings`

### Rotas Dev

- `/dev/seed`
- `/debug`

---

## Contribuição

1. Fork do repositório
2. Branch para sua feature: `git checkout -b minha-feature`
3. Commit: `git commit -m "feat(...): Minha nova feature"`
4. Push: `git push origin minha-feature`
5. Pull Request

---

## Licença

MIT
