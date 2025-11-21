# RPG Online — Blueprints (mobile‑first)

> Objetivo: definir **estrutura, fluxos e contratos** antes do código. Pensado para **React + TS + Tailwind + React Router + TanStack Query + Dexie + MSW**.

---

## 1) Princípios de design

- **Mobile‑first**: telas otimizadas para 360–428 px; enhancements progressivos ≥ `md` (768 px) e ≥ `lg` (1024 px).
- **Acessibilidade**: foco visível, navegação por teclado, contraste AA, preferências salvas.
- **Performático**: App‑shell + cache, code‑split por rota, imagens responsivas.
- **Offline‑friendly**: dados críticos em IndexedDB (Dexie); SW para cache de assets.

---

## 2) Navegação & rotas

```plain
/
/auth
/saves
/saves/new
/game/:saveId
/progress/:saveId
/sheet/:saveId
/settings
/* → 404
```

### Regras/guards

- Guard global: se **não** houver nenhum save → redirect para `/saves` (exceto `/` e `/auth`).
- Validação de `:saveId` (existe em Dexie?) antes de render das rotas com parâmetro.

---

## 3) Layouts (mobile‑first)

- **RootLayout**: header (marca/voltar), footer (nav principal), toasts, theme provider.
- **AppLayout**:
  - **Mobile (base)**: fluxo vertical — `StatusPanel` (compacto) → `SceneCard` → `ChoiceList` sticky ao final.
  - **≥ md**: grid `md:grid-cols-[minmax(220px,280px)_1fr]` → esquerda `StatusSidebar`, direita `SceneArea`.
  - **≥ lg**: espaçamentos maiores e `StatusSidebar` com cards extras (buffs, inventário rápido).

### Componentização chave

- **Header**: título fixo **“King’s Academy”**, botão voltar e menu overflow.
- **FooterNav**: (mobile) ícones para _Jogo_, _Ficha_, _Progresso_, _Saves_, _Config_.
- **StatusSidebar/Panel**: HP/MP, atributos, condições, reputações, moedas.
- **SceneCard**: bloco de narrativa com scroll suave; controla tipografia e ritmo.
- **ChoiceList**: lista de escolhas com estados: possível, bloqueada (tooltip), consumida.
- **SaveList**: grid/cards de saves com ações: ativar, duplicar, renomear, apagar.
- **SheetTabs**: tabs para atributos/perícias/inventário/flags.
- **ProgressMap**: visualização de milestones (alcançáveis variados) e % de exploração semanal.

---

## 4) Estados & dados (contratos Zod)

```ts
// ids
type SaveId = string; // uuid curto (ex: nanoid)
type SceneId = string;

// Save meta (sem difficulty e sem lastSceneId)
interface Save {
  id: SaveId;
  name: string;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  // relógio in‑game
  currentWeek: number;     // começa em 1
  currentDay: 0|1|2|3|4|5|6; // 0=Dom ... 6=Sáb
  currentHour: number;     // 0–23 (slot/hora atual)
}

// Ficha
interface Sheet {
  attrs: Record<string, number>;   // ex: for, agi, int…
  skills: Record<string, number>;  // perícias
  reputation?: Record<string, number>; // ver FAQ — opcional; pode começar vazio
  coins: number;
  tags: string[];                  // flags/buffs/condições
}

// Catálogo de cenas (não linear)
interface Scene {
  id: SceneId;
  title?: string;
  content: string;               // markdown/BBCode simples
  tags?: string[];               // p/ filtros (ex: aula, treino, social)
  requires?: string[]          // flags/cheks
}

A seleção de cena é **dirigida pelo relógio** (sem história fixa).
Dado `currentDay` + `currentHour`, buscamos a `TimeslotRule` aplicável e sorteamos uma cena da `scenePool` (com pesos).

// Tabela de agendamento de cenas por horário/semana
interface TimeslotRule {
  id: string;
  // quando vale
  weekdays?: Array<0|1|2|3|4|5|6>; // se omitido, vale para todos
  hours?: number[];                 // 0–23; se omitido, vale para todos
  weeks?: number[];                 // opcional, para eventos específicos
  // pool de cenas possíveis nesse timeslot
  scenePool: Array<{ sceneId: SceneId; weight?: number }>; // engine escolhe uma
  requiresTags?: string[];          // opcional: filtra via tags do Save/Sheet
}

// Milestones (alcançáveis variados)
interface Milestone {
  id: string;
  saveId: SaveId;
  type: 'daily'|'weekly'|'collection'|'event'|'skill'|'social';
  key: string;           // ex: 'assistir_5_aulas', 'colecionar_10_itens'
  current: number;       // progresso atual
  target: number;        // meta
  achievedAtWeek?: number; // semana em que concluiu (opcional)
}

// Inventário (crítico no MVP)
interface InventoryItem {
  id: string;
  saveId: SaveId;
  name: string;
  quantity: number;
  acquiredWeek: number;   // "quando comprou" (semana in‑game)
  durationWeeks: number;  // 0 = ilimitado; >0 = tempo máximo de uso
  expiresAtWeek: number | null; // null = em uso / preenchido = expirado
  tags?: string[];        // ex: consumível, equipamento, buff
}

// Configurações (sem textSpeed e sem autoScroll)
interface Settings {
  fontScale: number; // 0.9–1.2
  theme: 'system'|'light'|'dark';
  highContrast?: boolean;
}
```

> **Observação:** schemas Zod derivam desses contratos; toda leitura de Dexie passa por `schema.parse` para robustez.

---

## 5) Query keys (TanStack Query)

- `['saves']`
- `['save', saveId]`
- `['sheet', saveId]`
- `['inventory', saveId]`
- `['milestones', saveId]`
- `['timeslots']` // regras globais do calendário (ou por jogo)
- `['settings']`

### Estratégias

- **Prefetch** opcional de próximos horários (ex.: próxima hora ou próximo bloco do dia) para UX fluida.
- **Invalidate** em: avanço de relógio (dia/hora/semana), compra/uso de item, progresso de milestone, troca de save ativo.

---

## 6) Armazenamento (Dexie)

**Banco**: `rpg_db@1`

- `saves`: `id (pk)`, `name`, `createdAt`, `updatedAt`, `isActive`, `currentWeek`, `currentDay`, `currentHour`
- `sheets`: `id (pk)`, `saveId (idx)`, `payload`
- `scenes`: `id (pk)`, `payload` // catálogo estático/dinâmico
- `timeslots`: `id (pk)`, `payload` // regras de dia/horário → pool de cenas
- `milestones`: `id (pk)`, `saveId (idx)`, `type (idx)`, `key (idx)`, `current`, `target`, `achievedAtWeek`
- `inventory`: `id (pk)`, `saveId (idx)`, `name`, `quantity`, `acquiredWeek`, `durationWeeks`, `expiresAtWeek`, `tags`
- `settings`: `id (pk='singleton')`, `payload`

> **Notas**
>
> - `expiresAtWeek` = `durationWeeks === 0 ? null : acquiredWeek + durationWeeks - 1`.
> - Criar _view helpers_ para `isExpired(item, currentWeek)` e `remainingWeeks(item, currentWeek)`.

---

## 7) Fluxo de telas (happy‑path)

1. **/** → se existe `activeSave` → `push(/game/:saveId)`; senão CTA → `/saves`.
2. **/saves** → cria/ativa save → `push(/game/:saveId)`.
3. **/game/:saveId** → usa `currentDay/currentHour` do Save → resolve `TimeslotRule` → sorteia/mostra `SceneCard` e `ChoiceList` (quando aplicável).
4. Ações do usuário podem: avançar relógio, consumir/adquirir itens, atualizar milestones.
5. **/sheet/:saveId**: atributos, perícias, reputações (opcional), inventário.
6. **/progress/:saveId**: milestones (diários/semanais/coleção/evento/skill/social) e status semanal.
7. **/settings**: tema, fonte, contraste alto.

---

## 8) Mobile‑first: comportamento responsivo

- **Tipografia**: base `text-base` no mobile; escala +8–12% ≥ `md`.
- **Espaçamentos**: `p-3` mobile; `p-6` ≥ `md`.
- **SceneCard**: `prose max-w-none` (ou util classes próprias) com `leading-relaxed`.
- **ChoiceList** (mobile): barra fixa bottom com `safe-area-inset-bottom`, botões altos `min-h-12`.
- **StatusPanel** (mobile): card colapsável no topo; ≥ `md` vira `StatusSidebar`.
- **Header**: sempre "King’s Academy" (sem título dinâmico).

---

## 9) Estados de UX necessários

- **Loading**: skeletons para SceneCard, Status, ChoiceList.
- **Empty**: sem saves → ilustração + CTA.
- **Erro**: toasts + página leve com retry; logs dev via MSW quando aplicável.
- **Bloqueio**: escolhas desabilitadas com motivo (tooltip / label secundária).

---

## 10) PWA & Service Worker (estratégia)

- **App‑shell**: cache estático de `index.html`, chunks, fontes e ícones.
- **Estratégias**:
  - Assets estáticos: _cache‑first_.
  - Dados de catálogo (scenes/timeslots): _stale‑while‑revalidate_.
  - Fallback offline: rota `/offline`.
- **Atualização**: SW com `autoUpdate`; banner “Nova versão disponível” → `skipWaiting()`.
- **Instalação**: `beforeinstallprompt` → CTA discreto em `/settings`.

---

## 11) Testes (DX)

- **MSW**: handlers para `/timeslots`, `/scenes`, `/saves`, `/inventory` e `/auth`.
- **Vitest + Testing Library**: testes de rotas/guards e mutações (inventário, avanço de relógio, milestones).

---

## 12) Acessibilidade (checklist)

- Foco cíclico entre Header → Scene → Choices → Footer.
- `aria-live="polite"` para mudanças de cena.
- Tamanho mínimo de alvos: 44×44px (botões de escolha e navegação).
- Preferências salvas: contraste alto, tamanho de fonte, redução de animação.

---

## 13) Tokens de UI (Tailwind)

- **Cores**: `--bg`, `--fg`, `--muted`, `--accent`, `--danger`.
- **Ritmo**: `--radius: 1rem; --shadow: 0 10px 25px rgba(0,0,0,.25)`.
- **Transições**: `duration-150` (mobile), `duration-200` (≥ md), `ease-out`.

---

## 14) Roadmap MVP → +1

- MVP: rotas, saves locais, **timetable** (dia/hora), escolha de cena por pool, sheet básica, **inventory completo**, milestones variados, setting.
