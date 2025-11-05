# Plano de Implementação: [FEATURE]

**Branch**: `[###-feature-name]` | **Data**: [DATE] | **Spec**: [link]
**Input**: Especificação da feature em `/specs/[###-feature-name]/spec.md`

**Nota**: Este template é preenchido pelo comando `/speckit.plan`. Veja `.specify/templates/commands/plan.md` para o fluxo de execução.

## Resumo

[Extrair da spec: requisito primário + abordagem técnica a partir da pesquisa]

## Contexto Técnico

<!--
  AÇÃO: Substitua o conteúdo desta seção pelos detalhes técnicos do projeto.
  A estrutura é orientativa para guiar a iteração.
-->

**Linguagem/Versão**: [ex.: TypeScript 4.x, Python 3.11 ou NECESSITA_CLARIFICAÇÃO]
**Dependências Principais**: [ex.: Next.js, TailwindCSS ou NECESSITA_CLARIFICAÇÃO]
**Storage**: [ex.: Dixie, localStorage, PostgreSQL ou N/A]
**Testes**: [ex.: manual/checagens estáticas - documentar se houver testes automatizados]
**Plataforma alvo**: [ex.: Web (navegadores modernos) ou NECESSITA_CLARIFICAÇÃO]
**Tipo de projeto**: [single/web/mobile - determina estrutura de fontes]
**Objetivos de Performance**: [domínio-específico, ex.: <100ms para saves locais ou NECESSITA_CLARIFICAÇÃO]
**Restrições**: [ex.: offline-capable, sem chamadas HTTP, limites de memória]
**Escopo/Escala**: [ex.: 10k usuários, 50 telas ou NECESSITA_CLARIFICAÇÃO]

## Verificação da Constituição

*PORTÃO: Deve passar antes da Fase 0 (pesquisa). Revalidar após o design da Fase 1.*

Com base na constituição, o plano deve incluir uma breve Checklist de Conformidade demonstrando como o trabalho seguirá os Princípios Centrais. Itens típicos:

- Linters e formatadores configurados e documentados
- Verificação de tipos / análise estática habilitada e passando localmente
- Interfaces públicas mínimas e superfície de API documentadas
- Critérios de aceitação manual / passos de reprodução fornecidos para revisores

Observação: A constituição proíbe exigir suites de testes automatizados no repositório canônico; se houver proposta para incluí-los, o plano deve documentar a justificativa e seguir o procedimento de emenda.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
