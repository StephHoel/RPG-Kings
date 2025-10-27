import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { URL_BASE, url } from '@/constants/routes'
import { Game } from '@/pages/Game'
import { Home } from '@/pages/Home'
import { ProtectedRoute } from './ProtectedRoute'
import { RedirectLogged } from './RedirectLogged'
import { GameTest } from '@/pages/GameTest'

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: url.index.replace(URL_BASE, ''),
          element: (
            <RedirectLogged>
              <Home />
            </RedirectLogged>
          ),
        },
        {
          path: url.game.replace(URL_BASE, ''),
          element: (
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          ),
        },
        {
          path: url.guest.replace(URL_BASE, ''),
          element: <GameTest />,
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

/*
5) Rotas recomendadas

/ → **Landing / Continue** → Detecta “último save ativo”: se houver, redireciona para `/game/:saveId`; senão, CTA para criar/selecionar em `/saves`
/auth → **Login offline (e futuro online)** → Mantém simples no MVP (nickname/local only). Deixa ganchos para `/auth/callback` no futuro sem implementá-lo agora
/saves → **Lista de saves/”perfis”** → Mostra slots locais; ações: criar, duplicar, apagar, renomear, definir “ativo”
/saves/new → **Criar save** → Assistente curto de criação (nome do personagem, classe/arquétipo, dificuldade)
/game/:saveId → **Cena atual e escolhas** → Rota **central**. Layout com card grande da cena à direita e coluna de status/atributos à esquerda (como você pediu). Guarda de rota: exige save válido
/game/:saveId/history → **Log / histórico → Opcional mas leve: lista de cenas/passagens lidas e escolhas tomadas (somente leitura)
/progress/:saveId → **Mapa de progresso** → “Milestones”, capítulos, rotas vistas/% de exploração
/sheet/:saveId → **Ficha completa** → Atributos, perícias, inventário, reputações, flags narrativas
/settings → **Opções do app** → Tabs: *Gameplay* (velocidade de texto, auto-scroll), *Acessibilidade* (fonte, contraste), *Áudio*, *Dados* (exportar/importar saves)
/* → **404** → Página simples com botão “Voltar para /”

---

## Hierarquia & layouts

* **`RootLayout`** → header/footer fixos (sem alterações), toasts, theme.
  * **Público**: `/`, `/auth`
  * **App (protegido por um guard que exige ter pelo menos 1 save):**
    * `AppLayout` (sidebar de status/atributos + área principal de cena)
      * `/saves`, `/saves/new`
      * `/game/:saveId` e `/game/:saveId/history`
      * `/progress/:saveId`
      * `/sheet/:saveId`
      * `/settings`

> O guard não precisa de “login”: basta verificar se existe **save local**. Se não existir, redireciona para `/saves`.

---

## Decisões que evitam retrabalho depois

1. **IDs estáveis nos saves**
  Use `saveId` (uuid curto) na URL. Mesmo renomeando o personagem, o link não quebra.

2. **Deep-link de cena** (opcional agora, fácil depois)
  Se quiser linkar a uma cena específica no futuro, você pode estender para `/game/:saveId/:sceneId` ou usar `?scene=...`. Para o MVP, só `:saveId` já basta.
  ** Provavelmente não vai ser feito
  
3. **Exportar/Importar**
  Coloque em /settings (aba *Dados*) — assim não criamos rotas extras agora.
  
  4. **Histórico**
  Colocar em `/game/:saveId/history` mantém a rota de jogo limpa e dá um local óbvio para revisitar escolhas.
  ** Provavelmente não vai ser feito

5. **Acessibilidade**
  Manter as preferências em `/settings` com persistência por browser (localStorage). Sem rota de acessibilidade separada no MVP.

---

## O que **não** entra no MVP (mas fica fácil adicionar)

`/profile` (dados de conta online)
`/auth/callback` (OAuth)
`/admin` (debug/seed) [não sei para que seria útil, mas seria]
`/codex` (lore/diário do mundo) [interessante para regras do universo/detalhes]
`/achievements` [não seria igual a /progress?]

---

## Fluxos previstos

**Primeiro acesso** → `/` → sem saves → redirect para `/saves` → **Criar** → redirect para `/game/:saveId`.
**Retorno** → `/` → detecta último `saveId` → redirect para `/game/:saveId`.
**Trocar de personagem** → `/saves` → selecionar outro → redirect para `/game/:saveId`.

*/