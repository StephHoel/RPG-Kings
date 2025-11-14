# Lista de Atividades Planejadas

## v0.1.3 — 2025

- [ ] Criar seed de cenas reais básicas (cenário feliz único de 1 dia)
- [ ] Implementar o PWA (next-pwa)
- [ ] Ações de inventário (comprar/usar) com cálculo de `expiresAtWeek`.
- [ ] Definir `PlayerState` e tipos de dados (`atributos`, `disciplinas`, `afinidades`)
- [ ] Escrever primeiros **eventos aleatórios** no `events.json`
- [ ] Montar `config.json` com custos e restaurações
- [ ] Criar `disciplinas.json` e XP base de cada aula
- [ ] Criar `npcs.json` (5 NPCs com afinidades e traços únicos)
- [ ] Criar componente `Bar` (atributos visuais)
- [ ] Criar componente `Choice` (botões de decisão)
- [ ] Criar função `aplicarAcao()` na engine
- [ ] Criar função `avancarHora()` e loop do dia
- [ ] Implementar função `rolarEvento()` com chance configurável
- [ ] Implementar função `dormir()` com restauração parcial
- [ ] Montar 1 semana jogável (Seg–Sáb)
- [ ] Criar primeira missão: **Prova de Alquimia N1**
- [ ] Adicionar feedback visual de ganho/perda de atributos
- [ ] Implementar HUD lateral (atributos e disciplinas)
- [ ] Criar sistema de XP e cálculo de nível (`lvlFromXp`)
- [ ] Montar card principal de cena e escolhas (interface final)
- [ ] Integrar JSON de eventos com engine real
- [ ] Testar fluxos: estudar, treinar, socializar, explorar, descansar
- [ ] Testar salvamento automático ao dormir
- [ ] Ajustar rotação de dias e avanço da semana
- [ ] Diálogos com árvore de respostas e sistema de afinidade
- [ ] Missões com múltiplos objetivos e falhas possíveis
- [ ] Mapa de navegação com salas clicáveis (arena, pátio, biblioteca, dormitórios)
- [ ] Interface de inventário (itens com efeitos)
- [ ] Sistema de reputação global e eventos por popularidade
- [ ] Animações de transição entre cenas
- [ ] Tradução multilíngue (PT/EN)
- [ ] Versão mobile com interface adaptada
- [ ] Login e sincronização de progresso online

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
- [X] Criar tela inicial (`Home.tsx`) com opções: *Novo Jogo*, *Carregar Jogo*

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
