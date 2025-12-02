<!-- Auto-generated guidance for AI coding agents working on RPG-Kings -->
# AI Assistant Instructions — RPG-Kings

Keep guidance short, actionable and repo-specific. Prefer code edits under `src/` and test updates under `tests/unit`.

- Project type: Next.js + React + TypeScript app using Dexie (IndexedDB) for local persistence. Main DB class: `src/infra/dexie/database.ts`.
- Data flow convention: UI hooks -> services (`src/services/*`) -> repositories (`src/infra/repositories/*`) -> Dexie DB (`src/infra/dexie/*`). Keep this layering.

- Important patterns and examples:
  - Transactions: use `db.transaction('rw', [db.saves, db.sheets, db.stats, db.inventories, db.xp_records], async () => { ... })` as implemented in `src/infra/repositories/saves.repo.ts` (`deleteSaveCascade`).
  - Repositories export via `src/infra/repositories/index.ts`; import from `@/infra/repositories` when used in services.
  - Logging: use `log.info|warn|error` from `src/services/log/logger.service.ts` to persist structured logs via `createLog` repository.
  - Query invalidation: use keys from `src/domain/queryKeys.ts` and invalidate with `react-query` (see `src/ui/hooks/save/useDeleteSave.ts`).

- Tests and test setup:
  - Unit tests live under `tests/unit`. E2E under `tests/e2e`.
  - Tests use `fake-indexeddb` (see `tests/setup/fake-indexeddb.ts`) and Jest configured in `jest.config.mjs`.
  - Run unit tests: `npm run test:unit`. E2E: `npm run test:e2e` (requires app on :3000). CI e2e helper: `npm run test:e2e:ci`.

- Build / dev commands (from `package.json`):
  - `npm run dev` — start Next dev server
  - `npm run build` — clean + build
  - `npm run start` — serve static `out/` (after `npm run build`)
  - `npm run lint` / `npm run lint:fix`
  - `npm run tsc` — typecheck

- Repo-specific conventions:
  - Single source of truth for DB schemas and migrations: `src/infra/dexie/versioning/*` and `src/infra/dexie/migrations/*`. Prefer adding migrations there and registering via `registerV*` functions.
  - Repositories operate directly on Dexie `db` instance; avoid bypassing `src/infra/repositories/*` when modifying persisted data.
  - Use `createOrUpdateX` and `getXBy...` repository naming patterns (see `saves.repo.ts`, `sheets.repo.ts`).
  - Persisted model validation uses Zod schemas in `src/infra/schemas` (used by logging and services). Validate before writing.

- When editing code:
  - Keep changes minimal and within same layer unless explicitly refactoring across layers.
  - Update or add unit tests under `tests/unit/*` for any repository or service change. Use `fake-indexeddb` when tests touch Dexie.
  - If adding DB schema changes, add a migration under `src/infra/dexie/migrations` and register a new version in `src/infra/dexie/versioning`.

- Common pitfalls to avoid:
  - Do not assume a network backend; most persistence is local-only (Dexie). See `src/pages/debug.tsx` note: "Local-only (Dexie). Nenhum dado é enviado para servidor.".
  - Avoid non-transactional multi-step deletes — prefer `db.transaction` when touching multiple stores.
  - Tests must mock or initialize the DB appropriately (see `tests/setup/*` and `tests/unit/repos/test-utils.ts`).

- Files to reference for examples:
  - `src/infra/dexie/database.ts` — DB class, registration and lifecycle
  - `src/infra/repositories/saves.repo.ts` — transaction example (`deleteSaveCascade`)
  - `src/ui/hooks/save/useDeleteSave.ts` — react-query invalidation pattern
  - `src/services/log/logger.service.ts` — how to write structured logs
  - `src/domain/queryKeys.ts` — canonical query keys
  - `tests/setup/fake-indexeddb.ts` and `jest.config.mjs` — test environment

If anything in this file seems unclear or you want me to expand sections (CI, deployment, infra), tell me which area and I will iterate.
