# RPG Kings

Aplicação Web RPG escolar para sobrenaturais, construída com React, React Router DOM, TailwindCSS e integração backend via REST.

---

## Tecnologias

- React + React Router DOM
- TailwindCSS
- SQL.js (leitura de tabelas locais)
- Integração REST (.NET backend)
- Clean Code: tipos centralizados, componentes reutilizáveis, feedback visual (toasts/loaders), rotas protegidas

---

## Como Executar

1. Instale dependências:

    ```bash
    npm install
    ```

2. Inicie o servidor:

    ```bash
    npm run dev
    ```

3. Acesse: [http://localhost:5173/RPG-Kings/](http://localhost:5173/RPG-Kings/)

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

## Autenticação & Rotas Protegidas

- Login/registro com JWT
- Rotas protegidas para páginas sensíveis
- Contexto global de autenticação

---

## 🎨 UI & Feedback Visual

- Dark mode sempre ativo
- Toasts globais para feedback
- Loader componentizado para estados de carregamento
- Componentes e páginas responsivas

---

## 📝 Contribuição

1. Fork do repositório
2. Branch para sua feature: `git checkout -b minha-feature`
3. Commit: `git commit -m "Minha nova feature"`
4. Push: `git push origin minha-feature`
5. Pull Request

---

## 📄 Licença

MIT
