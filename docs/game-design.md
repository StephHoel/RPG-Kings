# Game Design Document — RPG Kings

Versão: 0.1

Última atualização: 2025-11-14

## Resumo executivo

RPG Kings é um jogo narrativo baseado em escolhas com elementos de RPG e gerenciamento de personagem. O foco está em experiências episódicas e cenas baseadas em tempo (time-based scenes), misturando narrativa ramificada, progresso por marcos (milestones) e decisões com impacto permanente. O jogo será multiplataforma web (desktop e mobile responsivo) e prioriza acessibilidade, clareza de UI e iteração ágil.

## Visão e objetivos

- Objetivo principal: Criar uma experiência narrativa densa e rejogável em que escolhas moldam a história e o desenvolvimento do personagem.
- Público-alvo: Jogadores de 16+ que apreciam RPGs narrativos, fãs de visual novels e jogos de escolha, educadores que usam jogos em contextos pedagógicos.
- Pilares de design:

  - Narrativa centrada em personagens e consequências.
  - Mecânicas simples com profundidade emergente.
  - Iteração rápida e modularidade para adicionar cenas e eventos.

  ## Escopo e Arquitetura de Conteúdo

- Estrutura de cena: Cada cena ou evento é uma unidade atômica com texto, escolhas e possíveis condicionais (atributos, flags, tempo).
- Milestones: Marcos de progresso que desbloqueiam conteúdos e servem como checkpoints para salvamento.
- Sistema de saves: Salvamento baseado em checkpoints e manual, com possibilidade de múltiplos perfis.
- Assets textuais: Todas cenas e eventos versionados como JSON/Markdown para facilitar edição e internacionalização.

## Mecânicas de Jogo

1. Atributos e Estatísticas

- Atributos principais (exemplos): Força, Percepção, Carisma, Conhecimento, Fortuna.
- Valores: Escala 0–100 ou níveis discretos; usados para condições e checks nas escolhas.

## Sistema de Escolhas

- Cada escolha pode:

  - Alterar atributos
  - Definir flags (verdadeiro/falso)
  - Desbloquear cenas e milestones
  - Ter checks baseados em atributos/itens

- Resultado de escolha pode ser imediato ou atrasado (efeitos persistentes para cenas futuras).

## Eventos Baseados em Tempo

- Suporte para cenas que expiram ou evoluem com o tempo do jogo (dias/horas de mundo).
- Eventos agendáveis que podem ocorrer enquanto o jogador realiza outras ações.

## Progressão e Balanceamento

- Curva de aquisição de atributos e recompensas por milestones.
- Economia de recursos (se aplicável) balanceada para evitar desbloqueios prematuros.

## Personagens e Narrativa

- Protagonista: Blank avatar com customização mínima (nome, traços iniciais) para aumentar imersão.
- Personagens secundários: NPCs com arcos e relacionamentos afetados por decisões.
- Tom e estilo: Narrativa adulta jovem, ênfase em escolhas morais e consequências.

## UI/UX

- Layout responsivo em `src/app` — priorizar legibilidade em telas pequenas.
- Componentes principais:

  - Painel de cena: texto e escolhas.
  - Barra de status: atributos essenciais e indicadores (tempo, recursos, milestone progress).
  - Histórico/Journal: registros de decisões e textos importantes.
  - Menu de saves e configurações.

- Acessibilidade:
  - Contraste alto por padrão, fonte redimensionável, suportar navegação por teclado.

## Arte e Áudio

- Estilo visual: Arte 2D estilizada, paleta coesa, ilustrações para personagens-chave.
- Efeitos sonoros sutis e trilha sonora ambiente.
- Arquivos de assets organizados por pasta (`public/assets/images`, `public/assets/audio`).

## Requisitos Técnicos

- Plataforma alvo: Web (Next.js) com renderização híbrida (SSR/SSG) conforme necessário.
- Banco de dados/local persistence: IndexedDB/localStorage para saves locais; backend (opcional) com PostgreSQL para saves na nuvem.
- Formato de dados: JSON para cenas e eventos; esquema versionado em `specs/`.
- Internacionalização: Preparar chaves de texto e pipeline de tradução.

## Arquitetura e Componentes

- Motor de jogo: `logic/gameEngine.ts` e `logic/sqljs.ts` (existente) serão pontos de integração.
- Organização do código:
  - `src/components` — UI reutilizáveis (ChoiceList, SceneCard, StatusPanel).
  - `src/hooks` — hooks para estado global e saves.
  - `src/schemas` — validação de cenas/milestones.

## Integrações e Ferramentas

- Controle de versão: Git com ramificação por feature.
- Ferramentas de build: Next.js, TypeScript, TailwindCSS.
- Testes: Unitários para `gameEngine` e integração para fluxo de cenas.

## Roadmap e Milestones

- M1 (Protótipo Alpha) — 4 semanas

  - Implementar motor de cenas básico
  - 10 cenas jogáveis, sistema de saves

- M2 (Conteúdo e UI) — 6 semanas

  - UI refinada, 50+ cenas, 5 NPCs com arcos

- M3 (Beta) — 8 semanas

  - Internacionalização, testes de usabilidade, backend de saves (opcional)

- M4 (Lançamento) — 6 semanas
  - Polimento, performance, deploy e marketing básico

## Roadmap técnico (milestones menores)

- Definir schema de cena e validar com exemplos em `specs/002-time-based-scenes`.
- Criar sistema de importação de cenas em runtime.
- Implementar salvamento automático e manual.

## Riscos e Mitigações

- Risco: Conteúdo narrativo consome tempo.

  - Mitigação: Desenvolver ferramentas de edição e pipeline de importação para agilizar iteração.

- Risco: Complexidade de eventos baseados em tempo.
- Mitigação: Implementar uma camada de simulação de tempo simples e testes de regressão.

## Métricas de Sucesso

- Retenção de jogadores por capítulo/semana.
- Número de ramas narrativas alcançadas por jogador médio.
- Tempo médio de sessão e decisões por sessão.

## Próximos passos

1. Revisar este GDD com a equipe e priorizar M1.
2. Mapear schema de cena detalhado e começar a implementação do motor.
3. Criar roteiro de 10 cenas para o protótipo.

## Anexos e Referências

- `specs/002-time-based-scenes` — especificações relacionadas a cenas baseadas em tempo.
- `docs/atividades.md` — atividades e planejamento relacionados ao projeto.
