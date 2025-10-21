# RPG Kings

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
