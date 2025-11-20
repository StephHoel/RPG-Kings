# Kanban

## v0.1.7 — 2025

- [ ] Montar `config.json` com custos e restaurações
- [ ] Criar seed de cenas reais básicas (cenário feliz único de 1 dia)
- [ ] Montar 1 semana jogável (Seg–Sáb)
- [ ] Ações de inventário (comprar/usar) com cálculo de `expiresAtWeek`.
- [ ] Adicionar feedback visual de ganho/perda de atributos
- [ ] Criar função `aplicarAcao()` na engine
- [ ] Criar função `avancarHora()` e loop do dia
- [ ] Implementar função `rolarEvento()` com chance configurável
- [ ] Implementar função `dormir()` com restauração parcial
- [ ] Implementar HUD (atributos e disciplinas)
- [ ] Criar sistema de XP e cálculo de nível (`lvlFromXp`)
- [ ] Montar card principal de cena e escolhas (interface final)
- [ ] Testar fluxos: estudar, treinar, socializar, explorar, descansar
- [ ] Implementar o PWA (next-pwa)
- [ ] Criar um FAQ das raças
- [ ] Criar um FAQ das habilidades
- [ ] Criar um FAQ dos poderes
- [ ] Pensar em um lugar para colocar o FAQ ou o link para o FAQ
- [ ] Criar primeira missão: **Prova de Alquimia N1**
- [ ] Escrever primeiros **eventos aleatórios** no `events.json`
- [ ] Criar `npcs.json` (5 NPCs com afinidades e traços únicos)
- [ ] Tradução multilíngue (PT/EN)
- [ ] Diálogos com árvore de respostas e sistema de afinidade
- [ ] Sistema de reputação global e eventos por popularidade
- [ ] Mapa de navegação com salas clicáveis (arena, pátio, biblioteca, dormitórios)
- [ ] Missões com múltiplos objetivos e falhas possíveis
- [ ] Login e sincronização de progresso online

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
- [X] Criar tela inicial (`Home.tsx`) com opções: *Novo Jogo*, *Carregar Jogo*
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
