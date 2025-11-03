# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## Clarifications

### Session 2025-11-03

- Q: Agendamento das cenas — usar dia numérico (ex.: day=3), dias da semana (ex.: weekdays=['Mon']), ou ambos? → A: C (Suportar ambos: `scheduled_day` opcional e `weekdays` opcional; `scheduled_hour` comum).  
  Rationale: compatibilidade com os schemas existentes e cobertura para cenas pontuais e recorrentes.

## User Scenarios & Acceptance *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Acceptance**: [Describe how this can be validated independently - e.g., "Can be verified by performing [specific actions] and observing [specific outcomes]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Acceptance**: [Describe how this can be validated independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Acceptance**: [Describe how this can be validated independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]  
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

*Clarification guidance: Acceptance criteria MUST describe manual validation
steps or observable outcomes. The project's constitution prefers manual
acceptance and observable outcomes over mandating automated test code in the
canonical repository. If automated tests are desired, document them as
optional and follow the amendment procedure to include them in governance.*

### Key Entities *(include if feature involves data)*

- **Scene**: representa um conteúdo narrativo agendável. Campos principais (sugestão):
  - `id: string` — identificador único
  - `title: string`
  - `content: string` — texto/markdown ou payload serializado
  - `scheduled_day?: number | null` — dia numérico (opcional, para cenas pontuais)
  - `weekdays?: WeekdaysEnum[] | null` — dias da semana (opcional, para recorrência)
  - `scheduled_hour?: number | null` — 0-23
  - `choices: Choice[]`
  - `priority?: number` — ordem de resolução em conflitos

- **Choice**: { id, label, outcome } — opção apresentada ao jogador dentro de uma cena

- **Outcome**: { type, payload } — efeitos aplicáveis ao `PlayerState` (resource_delta, flag_set, narrative_branch)

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]
