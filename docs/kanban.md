# Kanban

## v.3.0 - 2026 (Longo Prazo: Refinamentos e Ideias)

- [ ] Implementar FAQ

  - [ ] Pensar onde e como colocar o FAQ (modal ou página a parte?)
  - [ ] Implementar a opção escolhida

- [ ] FAQ das raças

  - [ ] Esboçar conteúdo básico para cada raça (3–5 tópicos)
  - [ ] Colocar em `docs/` e criar rota/CTA no app

- [ ] FAQ das habilidades

  - [ ] Listar habilidades atuais e rápida descrição
  - [ ] Integrar busca simples no FAQ

- [ ] FAQ dos poderes

  - [ ] Documentar efeitos, pré-requisitos e custos
  - [ ] Vincular exemplos de uso no jogo

- [ ] Implementar o PWA (next-pwa)

  - [ ] Adicionar `next-pwa` e configurar `manifest.json`
  - [ ] Registrar service worker e garantir cache mínimo útil
  - [ ] Testar comportamento offline básico e atualização de cache

- [ ] [IDEIA]Mapa de navegação com salas clicáveis (arena, pátio, biblioteca, dormitórios)

  - [ ] Fazer mockup do mapa com áreas clicáveis
  - [ ] Implementar componente SVG/Canvas com hotspots
  - [ ] Integrar navegação para cenas por hotspot

- [ ] [IDEIA]Login e sincronização de progresso online
  - [ ] Escolher backend (Firebase/Auth0/Custom) e esquema de save
  - [ ] Implementar login básico (email/password) + UI
  - [ ] Implementar upload/download de saves e resolução simples de conflitos

---

## v0.2.0 — 2025 (Médio Prazo: Conteúdo e Sistemas)

Objetivo: Implementar sistemas principais e conteúdo para uma experiência mais rica (missões, NPCs, eventos, FAQ).

Checklist (prioridade média):

- [ ] Montar 1 semana jogável (Seg–Sáb)

  - [ ] Criar calendário de 6 dias com cenas por dia
  - [ ] Garantir transições entre dias (salvar/continuar)
  - [ ] Testar playthrough de uma semana completa

- [ ] Implementar HUD (atributos e disciplinas)

  - [ ] Esboçar layout do HUD (mobile e desktop)
  - [ ] Implementar componentes visuais e conectá-los ao state
  - [ ] Otimizar para atualização parcial (memo/observables)

- [ ] Montar card principal de cena e escolhas (interface final)

  - [ ] Fazer mockup do card com estados (normal, com escolhas, sem escolhas)
  - [ ] Implementar componente acessível (keyboard, focus)

- [ ] Criar primeira missão: **Prova de Alquimia N1**

  - [ ] Definir objetivo, passos e critérios de sucesso/falha
  - [ ] Criar cenas e recompensas relacionadas
  - [ ] Testar a missão em um save de exemplo

- [ ] Escrever primeiros **eventos aleatórios** no `events.json`

  - [ ] Escrever 10 eventos simples com triggers e efeitos
  - [ ] Validar integração com `rolarEvento()` e balanceamento

- [ ] Criar `npcs.json` (5 NPCs com afinidades e traços únicos)

  - [ ] Definir schema de NPC (nome, traços, afinidade, rotina)
  - [ ] Criar 5 entradas com personalidade distinta
  - [ ] Integrar NPCs em eventos e diálogos básicos

- [ ] Diálogos com árvore de respostas e sistema de afinidade

  - [ ] Definir formato de árvore de diálogo (nodes, opções, efeitos)
  - [ ] Implementar parser que aplica mudanças de afinidade
  - [ ] Criar um diálogo de exemplo e testar interações

- [ ] Sistema de reputação global e eventos por popularidade

  - [ ] Definir métricas de reputação e inflação/decay
  - [ ] Ligar eventos e NPCs para impactar reputação
  - [ ] Expor reputação no HUD e em eventos relevantes

- [ ] Missões com múltiplos objetivos e falhas possíveis
  - [ ] Definir estrutura de missão (objectives[], failConditions[])
  - [ ] Implementar tracker de objetivos e estados de missão
  - [ ] Adicionar UI para ver progresso da missão

---

## v0.1.9 — 2025 (Curto Prazo: Estabilização)

Objetivo: Concluir itens de infraestrutura e pequenas features que desbloqueiam testes e playthroughs rápidos.

Checklist (prioridade alta):

- [ ] Resolver TODOs críticos

  - [ ] Fazer varredura no repositório por `TODO` / `FIXME`
  - [ ] Agrupar e priorizar TODOs em issues
  - [ ] Implementar/atribuir os 3 TODOs de maior impacto

- [ ] Conteúdo mínimo para testes de fluxo

  - [ ] Definir o schema de cena (title, content, choices, efeitos)
  - [ ] Escrever 1 dia completo (cenário feliz)
  - [ ] Transformar em seed e adicionar no update ao criar o DB, se vazio
  - [ ] Testar a cena no fluxo do jogo

- [ ] Implementar `aplicarAcao()` na engine

  - [ ] Definir contrato da função (ação, actor, target, context)
  - [ ] Implementar aplicação de modificadores (atributos, XP, itens)
  - [ ] Garantir persistência do estado após aplicação

- [ ] Implementar função `rolarEvento()` com chance configurável

  - [ ] Definir pool de eventos e peso/probabilidade configurável
  - [ ] Implementar função que retorna evento ou `null`
  - [ ] Integrar com `avancarHora()` para potencial disparo de eventos
  - [ ] Adicionar testes probabilísticos básicos (semente fixa)

- [ ] Implementar função `dormir()` com restauração parcial

  - [ ] Definir efeitos de dormir (restauração por atributo, custo de tempo)
  - [ ] Implementar animação/estado de descanso na UI
  - [ ] Garantir interação correta com `avancarHora()` e limites

- [ ] Implementar `buyItem`/`useItem` e persistência de `expiresAtWeek`

  - [ ] Definir payloads de compra/uso e schema de item (durationWeeks)
  - [ ] Implementar `buyItem(saveId, itemId)` e `useItem(saveId, itemId)` na engine
  - [ ] Calcular e persistir `expiresAtWeek` ao comprar
  - [ ] Adicionar testes unitários para cálculo de expirations

- [ ] Implementar testes unitários
  - [ ] Aprender sobre testes unitários no react/next
  - [ ] Escrever testes unitários cobrindo casos comuns/limites

---

## v0.1.8 — 2025

- [ ] Adicionar lint e teste e2e na pipeline
  - [x] Definir linter (ESLint + regras) e formatador (Prettier)
  - [x] Configurar script `npm run lint`
  - [x] Configurar script `npm run format`
  - [x] Escolher e2e (Playwright ou Cypress) e adicionar dependência
  - [x] Escrever primeiro teste e2e (rota /saves flow)
  - [ ] Adicionar job na CI (lint + e2e)
- [x] Criar sistema de XP e cálculo de nível (`lvlFromXp`)
  - [x] Definir curva de XP/nível e regras de overflow
  - [x] Implementar `lvlFromXp(xp)` pure function

---

## v0.1.7 — 2025-11-20

- [x] Consertar tipos
- [x] Criar testes e2e das rotas
- [x] Refatorar páginas para estarem em src/pages
- [x] Refatorar páginas para retornar title no componente HEAD do next

## v0.1.6 — 2025-11-18

- [x] Criar um helper para pegar stats por raça (procurar TODO para alterar depois)
- [x] Criar um helper para retornar o nível baseado no XP total
- [x] Criar um helper para pegar developSkills por raça (procurar TODO para alterar depois)
- [x] Criar um helper para pegar fixedSkills por raça (procurar TODO para alterar depois)
- [x] Criar um helper para selecionar randomicamente o animal caso a raça escolhida seja Transmorfo (procurar TODO para alterar depois)

## v0.1.5 — 2025-11-16

- [x] Refinar hooks
- [x] Criar um enum das raças
- [x] Refinar demais enums

## v0.1.4 — 2025-11-15

- [x] FIX: espaçamento entre itens no menu lateral
- [x] FIX: limitar width máximo em telas grandes
- [x] Criar useMutation para adicionar o XP de cada aula

## v0.1.3 — 2025-11-14

- [x] Definir `PlayerState` e tipos de dados (`atributos`, `disciplinas`)

## v0.1.2 — 2025-11-13

- [x] Criar seed de Itens (Inventory)
- [x] Design de layout principal (header, sidebar, card de escolhas)
- [x] Definição do loop diário (07h–22h, 4 ações livres)
- [x] Estrutura de atributos e disciplinas principais
- [x] Definição dos arquivos de dados base (config, disciplinas, eventos, npcs)
- [x] Criação do organograma e mapa mental do sistema
- [x] Adaptação do front-end com colunas balanceadas
- [x] Criar estrutura inicial do projeto (Next.js + Tailwind)
- [x] Criar `Layout` (header, main, footer fixos)
- [x] Criar sistema de salvamento no `localStorage`
- [x] Criar tela inicial (`Home.tsx`) com opções: _Novo Jogo_, _Carregar Jogo_
- [x] Versão mobile com interface adaptada

## v0.1.1 — 2025-11-12

- [x] Planejar lógica de cenas
- [x] Implementar schema de cenas
- [x] Adaptar seed de cenas

## v0.1.0 — 2025-11-10

- [x] Definir templates e cores
- [x] Adequação do template da tela: Home
- [x] Adequação do template da tela: New Saves
- [x] Adequação do template da tela: Debug
- [x] Adequação do template da tela: Dev Seed
- [x] Adequação do template da tela: Not Found
- [x] Adequação do template da tela: Setting
- [x] Adequação do template da tela: Auth
- [x] Adequação do template da tela: Saves
- [x] Adequação do template da tela: Progress
- [x] Adequação do template da tela: Sheet
- [x] Entender porque seed não funciona no gh pages
- [x] Adequação do template da tela: Game
- [x] Adicionar menu em telas grandes
- [x] Adequar páginas para ocupar full size
- [x] Configurar toast
- [x] Garantir que todas as telas estão em mobile-first
- [x] Atualizar tokens de cor para padrão da King's
- [x] Remover menus da visibilidade se não estiver logado
- [x] Adicionar botão na página de saves para excluir o save (texto: Excluir save)
- [x] Alterar UI da listagem de saves na página de saves (li com borda padrão e p-4, nome do save, botão com texto "Jogar", botão com texto "Excluir")
- [x] Alterar UI do menu do rodapé para o efeito "ativo" não ser arredondado
