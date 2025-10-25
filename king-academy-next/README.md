# King's Academy — Next.js Frontend

Stack: **Next.js (App Router) + React + TS + Tailwind + TanStack Query + Dexie + Zod**.

## Scripts

- `npm run dev` — inicia o app.
- `npm run build` — build de produção.
- `npm run start` — roda o build.
- Seed: abra `/dev/seed` no navegador e clique no botão.

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
