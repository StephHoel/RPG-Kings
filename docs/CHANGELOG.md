# CHANGELOG

Critério de versionamento aplicado [melhorar]:

- Commits com prefixo `feat` → incremento MINOR
- Commits com prefixo `fix`, `chore`, `ci`, `refactor` (sem breaking) → incremento PATCH

Base de links: <https://github.com/StephHoel/RPG-Kings>

---

## v0.1.11 — 2025-12-01

- Padronização do sistema de logging: refatoração do `logger.service` para delegar persistência ao repositório (`logs.repo`), padronização de formatos e locais de logs e ajustes nas assinaturas de criação/limpeza de logs.
- Reforço da arquitetura `ui > hook > service > repo > db` em pontos identificados e atualização de imports para as novas convenções (`@/ui/*`, `@/services/*`, `@/infra/repositories/*`).
- Atualização de testes unitários para compatibilidade com a nova API do logger e com `fake-indexeddb` no ambiente de testes.
- Ajustes menores em migrations/schemas quando necessário para suportar novos campos/formatos de logs; pequenas melhorias em workflows/CI relacionadas a geração e limpeza de logs.

> Justificativa da versão: alteração localizada (logger/migration/tests) sem quebra de API externa significativa → PATCH.

## v0.1.9 — 2025-11-27

- Refatoração estrutural e padronização do fluxo `ui` → `hook` → `service` → `repo` → `db`, reorganizando responsabilidades e melhorando testabilidade.
- Centralização de schemas e validações em `src/infra/schemas` e extração de serviços/repos para seguir o novo fluxo arquitetural.
- Atualizações na camada de persistência (Dexie): registro de versões e migração (v3 → v4) para normalizar o formato de stats e recursos.
- Ajustes em testes unitários e de integração para refletir a nova separação de responsabilidades; atualizações leves nas CI e templates de PR.

> Justificativa da versão: reorganização e refatoração de arquitetura sem breaking API externo → PATCH.

## v0.1.0 — 2025-11-10

- Atualização do layout global e da navegação, melhor compatibilidade mobile/desktop e ajuste de organização das áreas principais da aplicação. (commit: [718829e](https://github.com/StephHoel/RPG-Kings/commit/718829e))
- Ajustes visuais e de tokens de cor; melhorias de acessibilidade e pequenos ajustes de configuração do TypeScript para maior consistência (commit: [68c4cf9](https://github.com/StephHoel/RPG-Kings/commit/68c4cf9)).

> Justificativa da versão: várias features (UX/layout e tokens) que representam alteração funcional/visual relevante → MINOR (0.1.0).

## v0.0.6 — 2025-11-09

- Atualizações e refatorações em diversos componentes e hooks para melhorar responsividade e estabilidade (commit: [892f8c2](https://github.com/StephHoel/RPG-Kings/commit/892f8c2)).
- Correção e padronização da comparação de rotas (remoção de barras e query string) para evitar falsos positivos na detecção de rota ativa (commit: [49ba90c](https://github.com/StephHoel/RPG-Kings/commit/49ba90c)).
- Ajustes na configuração do ESLint e variáveis de estilo (globals.css) para consistência visual (commit: [351834d](https://github.com/StephHoel/RPG-Kings/commit/351834d)).
- Inclusão do componente de toasts responsivo e integração no layout (commit: [424bf2b](https://github.com/StephHoel/RPG-Kings/commit/424bf2b)).
- Panel atualizado para ocupar largura total quando aplicável (commit: [b4b9459](https://github.com/StephHoel/RPG-Kings/commit/b4b9459)).
- Implementação da sidebar e do menu responsivo; refatoração do layout para suportar esses componentes (commit: [3094f35](https://github.com/StephHoel/RPG-Kings/commit/3094f35)).
- Refatoração da lógica de cenas e melhorias na recuperação de saves; introdução de hooks (useGetSave / useGetScene) (commit: [677fd08](https://github.com/StephHoel/RPG-Kings/commit/677fd08)).
- Suporte para favicon em GitHub Pages (commit: [2e870bf](https://github.com/StephHoel/RPG-Kings/commit/2e870bf)).
- Refatoração da lógica de seed e adição de notificações via toast (commit: [f0f1f83](https://github.com/StephHoel/RPG-Kings/commit/f0f1f83)).
- Ajustes de UI no Panel e H1 para padronização (commit: [477aeeb](https://github.com/StephHoel/RPG-Kings/commit/477aeeb)).
- Merge de PR relacionado a prereqs/integrações: run-prereqs (PR #4) ([PR#4](https://github.com/StephHoel/RPG-Kings/pull/4)).

> Justificativa da versão: vários recursos novos e reorganizações de hooks/componentes → MINOR em conjunto com 2025-11-10 (ainda assim listados como v0.0.6 por agrupamento temporal).

## v0.0.5 — 2025-11-08

- Atualização da lista de atividades e ajuste de regras do ESLint (commit: [2c27bb3](https://github.com/StephHoel/RPG-Kings/commit/2c27bb3)).
- Atualização do .gitignore e correção de import path em `next-env.d.ts` (commit: [8aea250](https://github.com/StephHoel/RPG-Kings/commit/8aea250)).
- Formatação do `GameClient` e normalização de código (commit: [ed49fb0](https://github.com/StephHoel/RPG-Kings/commit/ed49fb0)).
- Adição de favicon e referência no layout (commit: [51e61e4](https://github.com/StephHoel/RPG-Kings/commit/51e61e4)).
- Redução de warnings de lint para variáveis não usadas (commit: [b2d55c2](https://github.com/StephHoel/RPG-Kings/commit/b2d55c2)).
- Ajustes de ESLint e aplicação de correções automáticas (commit: [8d31537](https://github.com/StephHoel/RPG-Kings/commit/8d31537)).
- Ajuste de `SettingClient` para usar `Panel` e `H1` (commit: [801db87](https://github.com/StephHoel/RPG-Kings/commit/801db87)).
- Unificação de tokens de cor e atualização de componentes (commit: [4c80467](https://github.com/StephHoel/RPG-Kings/commit/4c80467)).
- Várias refatorações: consolidar imports de config, centralizar `activeSave` em provider, corrigir imports de tipos e refatorar hooks e libs (commits: [97f578d](https://github.com/StephHoel/RPG-Kings/commit/97f578d), [aff7888](https://github.com/StephHoel/RPG-Kings/commit/aff7888), [3b4d446](https://github.com/StephHoel/RPG-Kings/commit/3b4d446), [9fd141a](https://github.com/StephHoel/RPG-Kings/commit/9fd141a), [331ea72](https://github.com/StephHoel/RPG-Kings/commit/331ea72), [ee0d2c0](https://github.com/StephHoel/RPG-Kings/commit/ee0d2c0)).
- Adequações e limpeza de código: mover utils, refatorar classes, remover arquivos inúteis e migrar tipos → interfaces (commits: [70fb8a6](https://github.com/StephHoel/RPG-Kings/commit/70fb8a6), [ede0cc6](https://github.com/StephHoel/RPG-Kings/commit/ede0cc6), [feeb66f](https://github.com/StephHoel/RPG-Kings/commit/feeb66f)).
- Atualizações específicas de telas: new saves, home e ajuste geral de layout (commits: [ab93ea8](https://github.com/StephHoel/RPG-Kings/commit/ab93ea8), [d5e9292](https://github.com/StephHoel/RPG-Kings/commit/d5e9292), [3b49420](https://github.com/StephHoel/RPG-Kings/commit/3b49420)).

## v0.0.4 — 2025-11-06

- Atualização de workflows de CI/CD e ajustes no script de exportação (commits: [683af71](https://github.com/StephHoel/RPG-Kings/commit/683af71), [43f4fdc](https://github.com/StephHoel/RPG-Kings/commit/43f4fdc)).
- Conversão de páginas dinâmicas para estáticas quando apropriado (commit: [2e09683](https://github.com/StephHoel/RPG-Kings/commit/2e09683)).

## v0.0.3 — 2025-11-05

- Correção de import de rotas e atualização da lógica de exclusão de saves (commit: [3990e9a](https://github.com/StephHoel/RPG-Kings/commit/3990e9a)).
- Atualizações relacionadas ao processo de deploy (commit: [328bba3](https://github.com/StephHoel/RPG-Kings/commit/328bba3)).
