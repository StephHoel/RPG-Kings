# Feature Specification: Time-based Scenes

**Feature Branch**: `001-time-based-scenes`
**Created**: 2025-11-03
**Status**: Draft
**Input**: Estamos construindo um web RPG single-player com cenas baseadas por dia/hora e tomadas de decisões que podem gerar resultados positivos ou negativos. As cores base são roxo/lilás e cinza.

## User Scenarios & Acceptance *(mandatory)*

### User Story 1 - Play a day-cycle scene (Priority: P1)

As a single-player user, I want to experience scenes that are scheduled by in-game day/hour so that time progression in the world feels meaningful and events occur at the expected times.

**Why this priority**: Core loop — player must be able to experience time-based scenes for the game to feel alive.

**Independent Acceptance**: Can be validated by following manual steps that advance the in-game clock and observing that scheduled scenes trigger at the expected in-game day/hour.

**Acceptance Scenarios**:

1. **Given** the player is in the game at Day D Hour H, **When** the clock advances to Hour H+1, **Then** any scenes scheduled for Hour H+1 on Day D should become available or trigger.
2. **Given** a scheduled scene at a specific day/hour, **When** the player visits the location at that time, **Then** the scene content is shown and the player's UI reflects the scene transition.

---

### User Story 2 - Make choices with consequences (Priority: P1)

As a player, I want to make narrative choices during scenes that produce observable positive or negative outcomes so that decisions matter.

**Why this priority**: Decisions are central to the RPG experience and must alter state or player-facing feedback.

**Independent Acceptance**: Validate by performing the decision in a scene and confirming the specified outcome is applied to the player state or visible feedback (e.g., reputation change, resource gain/loss, alternate text shown).

**Acceptance Scenarios**:

1. **Given** a decision point with two options (A, B), **When** the player chooses A, **Then** the outcome tied to A is applied and recorded in the player's save/state.
2. **Given** a decision made earlier, **When** the same scene is revisited (or later scenes depend on it), **Then** the consequence is observable either immediately or at the dependent scene.

---

### User Story 3 - Visual identity and UX (Priority: P2)

As a player, I want the UI and scenes to use the established color palette (purple/lilac and gray) to ensure consistent visual identity.

**Why this priority**: Visual consistency improves user recognition and supports the project's brand.

**Independent Acceptance**: Manually inspect scene UIs and common screens to confirm primary UI elements (headers, buttons, panels) adhere to the purple/lilac/gray palette and accessible contrast standards.

**Acceptance Scenarios**:

1. **Given** a scene or menu, **When** a reviewer inspects the UI, **Then** primary accents and backgrounds use the defined color family and meet legibility/contrast checks.

---

### Edge Cases

- Scenes scheduled during overlap or daylight transitions: ensure deterministic ordering.
- Player disconnect/resume: ensure scene state persists across save/load.
- Conflicting scene triggers: define priority (e.g., explicit schedule > random encounters).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST support scheduling scenes by in-game day and hour.
- **FR-002**: The system MUST advance an in-game clock and expose controls for time progression during testing.
- **FR-003**: Scenes MUST be triggered or become available when the in-game time matches their scheduled day/hour.
- **FR-004**: Decision points inside scenes MUST present choices; each choice MUST map to defined outcomes that modify player-visible state (e.g., resources, flags, narrative branches).
- **FR-005**: The system MUST persist player state so decisions persist across sessions (save/load).
- **FR-006**: The UI for scenes and the main HUD MUST follow the purple/lilac/gray palette guidelines.
- **FR-007**: The system MUST provide a manual acceptance checklist and reproduction steps in each PR for reviewers.

*Clarification guidance & Assumptions*: Acceptance criteria above describe manual validation steps and observable outcomes. The specification intentionally avoids prescribing test code or frameworks in the canonical repository (per project constitution). See Assumptions section below for reasonable defaults.

### Key Entities *(include if feature involves data)*

- **Scene**: {id, title, scheduled_day, scheduled_hour, content, choices[]}
- **Choice**: {id, label, outcome_id}
- **Outcome**: {id, effect_type, payload} — effect types: resource_delta, flag_set, narrative_branch
- **PlayerState**: {player_id, resources, flags, current_day, current_hour, active_scene_id}

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of scheduled scenes trigger at their configured day/hour during manual test runs.
- **SC-002**: 100% of choices produce the documented outcome and update player state in manual verification.
- **SC-003**: Playtesters (N=5) report that scene timing and decision consequences are clear in at least 80% of sample playthroughs.
- **SC-004**: Visual checks confirm that primary screens use the purple/lilac/gray palette and meet minimum contrast recommendations for main text/buttons.

## Assumptions

- Time progression is deterministic for the player's session and can be advanced manually for testing.
- Persistence is available (save/load) via existing project save mechanisms; integration details are to be decided by implementers.
- Performance targets are reasonable for a single-player web RPG; no concurrent multi-user scaling required.

## Dependencies

- Save/load subsystem (existing)
- UI theming/styling system (to apply color palette)
- Scene content authoring pipeline (to author scenes and choices)

## Notes

- This spec focuses on user-visible behavior and acceptance criteria. Implementation details (frameworks, libraries, file formats) are intentionally omitted and belong to the implementation plan.
