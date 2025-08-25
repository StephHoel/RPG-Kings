# Scaffold React com React Router DOM e TailwindCSS

Este projeto é um scaffold básico para iniciar o desenvolvimento de aplicações React utilizando **React Router DOM** para roteamento e **TailwindCSS** para estilização. Ele serve como ponto de partida para criar aplicações modernas e escaláveis com as ferramentas mencionadas.

---

## 🛠 Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **React Router DOM**: Biblioteca para gerenciar o roteamento da aplicação.
- **TailwindCSS**: Framework CSS utilitário para estilização rápida e responsiva.

---

## ⚡️ Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- GitHub CLI (gh)
- Estar autenticado com `gh auth login`

### Passo a passo

1. Crie um novo repositório com este template (lembre de trocar os valores das variáveis para os valores certos):

   ```bash
   PROJECT_NAME=nome-do-novo-repo
   USER_NAME=seu-nome-de-usuario
   gh repo create $PROJECT_NAME --template stephhoel/scaffold-vite-react-tailwind-and-routes --public
   git clone https://github.com/$USER_NAME/$PROJECT_NAME.git
   cd $PROJECT_NAME
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn run dev
   ```

4. Abra o navegador e acesse: `http://localhost:5173/`

5. Faça uma busca geral no código (CTRL + SHIFT + F) pela palavra `scaffold`, você precisa alterar para o nome do seu projeto onde ela aparecer.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── components/         # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── router/             # Configuração de rotas
├── index.css           # Estilos globais (inclui TailwindCSS)
├── main.jsx            # Ponto de entrada da aplicação
└── tailwind.config.js  # Configuração do TailwindCSS
```

---

## 📜 Configuração do Roteamento

O arquivo de configuração das rotas está localizado em `src/router/index.tsx`. O exemplo abaixo mostra como configurar uma rota simples:

```jsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { URL_BASE, url } from '@/constants/routes'
import { Home } from '@/pages/Home'

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: url.index.replace(URL_BASE, ''),
          element: <Home />,
        },
        {
          path: url.notFound.replace(URL_BASE, ''),
          element: <Navigate to={'/'} replace={true} />,
        },
      ],
    },
  ],
  {
    basename: URL_BASE,
  },
)
```

---

## 🎨 Como Utilizar o TailwindCSS

TailwindCSS já está configurado e pronto para uso. Basta adicionar as classes diretamente nos elementos.

Exemplo:

```jsx
<div className="flex items-center justify-center h-screen bg-gray-100">
  <h1 className="text-3xl font-bold text-blue-500">Bem-vindo ao Scaffold!</h1>
</div>
```

---

## 🚀 Personalização

1. **Configuração do TailwindCSS**:
   O arquivo `tailwind.config.js` pode ser ajustado para atender às suas necessidades. Por exemplo, você pode adicionar novas cores ou configurações.

2. **Estrutura das Rotas**:
   Modifique ou adicione novas rotas no arquivo `src/router/index.tsx`.

3. **Componentes e Páginas**:
   Adicione novos componentes em `src/components/` e páginas em `src/pages/`.

4. **[SUGESTÃO] Usar Shadcn para componentes como button, card e afins**:
   O projeto já está configurado para usar o Shadcn.
   Para iniciar use o comando `npx shadcn@latest init` e escolha qual cor base do seu projeto.
   Para adicionar componentes use o comando `npx shadcn@latest add button` onde button é o componente a ser adicionado.
   Para mais informações, veja na documentação: `https://ui.shadcn.com/docs/installation/vite`

---

## 📝 Contribuição

Se você deseja contribuir com este scaffold:

1. Faça um fork deste repositório.
2. Crie uma branch para sua funcionalidade: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m "Minha nova feature"`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
