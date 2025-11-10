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

2. Rodar em modo desenvolvimento (Vite):

    ```bash
    npm run dev
    ```

3. Build para produção:

    ```bash
    npm run build
    npm run preview
    ```

4. Acesse: [http://localhost:5173/](http://localhost:5173/) (verifique base path se estiver hospedando em subpasta)

---

## Variáveis de ambiente (exemplo)

- `VITE_API_BASE=https://api.exemplo.com`
- `VITE_APP_NAME="King's Academy"`

Defina em um arquivo `.env` na raiz para desenvolvimento.

---

## Dicas rápidas de desenvolvimento

- Habilite a fonte Inter via index.html ou import no CSS.
- Para Tailwind: verifique tailwind.config.js content paths ao adicionar novos diretórios.
- Use o plugin `@tailwindcss/forms` para inputs e `@tailwindcss/typography` para conteúdo rico (já configurados).

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

## Contribuição

1. Fork do repositório
2. Branch para sua feature: `git checkout -b minha-feature`
3. Commit: `git commit -m "Minha nova feature"`
4. Push: `git push origin minha-feature`
5. Pull Request

---

## Licença

MIT

---

Stack: **Next.js (App Router) + React + TS + Tailwind + TanStack Query + Dexie + Zod**.

## Scripts

- `npm run dev` — inicia o app.
- `npm run build` — build de produção.
- `npm run start` — roda o build.
- Seed: abra `/dev/seed` no navegador e clique no botão.

## Deploy no GitHub Pages

Este repositório está configurado para ser hospedado em GitHub Pages sob o caminho `/rpg-kings`.

O Next.js está configurado com `basePath: '/rpg-kings'` e `assetPrefix: '/rpg-kings/'` em `next.config.js`.

Workflow automático (já incluído): existe uma GitHub Action (`.github/workflows/deploy-gh-pages.yml`) que faz:

- checkout
- npm ci
- npm run build
- npm run export
- publica o diretório `out/rpg-kings` para a branch `gh-pages`

Como publicar manualmente (local):

1. Build e export

    ```bash
    npm ci
    npm run build
    npm run export
    ```

2. O conteúdo gerado estará em `out/rpg-kings`. Faça deploy desse diretório para a branch `gh-pages` (ou envie para um servidor estático).

3. No GitHub: configure GitHub Pages para servir a partir da branch `gh-pages` (root).

Notas:

- Use `ROUTES.BASE` (em `src/config/routes.ts`) nas construções de URL se gerar caminhos manualmente.
- Teste localmente servindo `out/` por um servidor estático (por exemplo `npx serve out`) e acessando `http://localhost:3000/rpg-kings`.

## Rotas

- `/`, `/auth`
- `/saves`, `/saves/new`
- `/game/[saveId]`, `/progress/[saveId]`, `/sheet/[saveId]`
- `/settings`

## Dados

- IndexedDB via Dexie (`src/data/db.ts`).
- Schemas Zod (`src/data/schemas.ts`).
- Timeslots → util `src/utils/timeslot.ts`.

## Próximos passos

- PWA (next-pwa) e tema.
- Ações de inventário (comprar/usar) com cálculo de `expiresAtWeek`.
- Testes com Vitest/Jest + MSW (opcional).
