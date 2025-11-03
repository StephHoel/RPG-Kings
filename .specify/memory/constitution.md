# RPG-Kings Constitution

<!-- Sync Impact Report
Version: 1.0.0
Summary: Adopted a clean-code-focused constitution. Added Development Constraints and
Development Workflow sections; updated templates to reflect manual acceptance
requirements and the prohibition on canonical automated tests. Maintainers must
fill ratification metadata and review CI enforcement for linters/type checks.
Templates reviewed:
  - .specify/templates/plan-template.md -> ⚠ review wording for 'Constitution Check'
  - .specify/templates/spec-template.md -> ✅ updated
  - .specify/templates/tasks-template.md -> ✅ updated
Follow-ups:
  - TODO(RATIFICATION_DATE): fill ratification metadata
  - Verify `.specify/templates/commands/*.md` if added later
-->

## Core Principles

### I. Clean Code (NON-NEGOTIABLE)

Code must be written for humans first. Source should be easy to read, follow a
consistent style, and express intent clearly. Conventions include meaningful
names, small functions with a single responsibility, clear types or interfaces,
and comments that explain "why" rather than "what". Refactor continuously to
reduce complexity and improve readability.

Rationale: Readable code reduces onboarding friction, lowers the cost of
change, and improves long-term maintainability.

### II. Explicit, Minimal Interfaces

Public interfaces and APIs should be deliberately minimal and well-documented.
Each module or component should present a small, intent-revealing surface
area. Breaking changes to public interfaces must follow the versioning rules in
Governance.

Rationale: Minimal surfaces limit accidental coupling and make the system easier
to reason about and evolve.

### III. Review-Driven Delivery (NON-NEGOTIABLE)

All changes must go through peer review. Code reviews are the primary quality
gate: reviewers should check for clarity, correctness, and adherence to the
Clean Code principle. Automated unit/integration/end-to-end tests are not part
of this project's governance; validation is performed via code review, static
analysis, type checking, and manual acceptance testing (see Development
Workflow).

Rationale: Human review emphasizes readability and design intent over test-only
verification and aligns with the project's focus on long-term maintainability.

### IV. Simplicity & YAGNI

Design for the current needs. Solutions should be the simplest that satisfy the
requirements. Add complexity only when a clear, demonstrated need exists.
Prefer composability and reuse over clever optimizations.

Rationale: Simpler code is easier to read, test manually, and maintain.

### V. Observability & Maintainability

Code should include structured logging, clear error handling, and concise
documentation for non-obvious decisions. Maintainability artifacts (CHANGELOG,
high-level design notes) should accompany significant changes so future
maintainers can understand rationale and trade-offs.

Rationale: Observability speeds debugging and reduces time-to-resolution for
issues discovered during manual acceptance.

## Development Constraints

The following constraints are mandated by this constitution:

- Automated unit, integration, or end-to-end tests are NOT to be added to the
  canonical repository as part of normal development. Validation and quality
  assurance are performed via peer review, static analysis (linters, type
  checkers), and manual acceptance testing.
- CI pipelines may run linters, formatters, and type checks. CI must NOT
  introduce automated test suites as a governance requirement.
- Tooling that enforces style and catches errors early (formatters, linters,
  type-checkers) is required. Developers must configure and run these locally
  before creating change proposals.

Rationale: This project values human-reviewable quality and maintainability over
an automated-test-centric workflow. The constraint simplifies CI expectations
and focuses contributors on readable, well-typed code.

## Development Workflow

- All work must be proposed via a short plan and implemented behind a pull
  request (PR) or equivalent change review workflow.
- PRs must include a brief description of intent, list of files changed, and a
  short "Compliance Checklist" showing how the change meets the Core Principles.
- PR size should be small (recommendation: < 300 lines) to support effective
  review. Large changes must be split or accompanied by a high-level design
  document.
- Pre-merge checks must include linters, formatters, and type checks. Any
  failing static-analysis or type errors must be resolved before approval.
- Acceptance testing is manual: the author must include manual reproduction
  steps or a short acceptance checklist in the PR for reviewers and QA to
  follow.

Note: The project explicitly disallows introducing automated test suites as a
governance requirement. Teams may maintain private or experimental test
artifacts outside the canonical repository, but such artifacts do not satisfy
compliance and must not be used to bypass review requirements.

## Governance

The constitution is the source of truth for development governance. It overrides
informal practices and local conventions unless an amendment is recorded.

Amendments:

- PATCH: Minor clarifications or wording fixes that do not change intent —
  increment PATCH (x.y.z → x.y.z+1)
- MINOR: New principle or materially expanded guidance — increment MINOR
  (x.y.z → x.y+1.0)
- MAJOR: Removal or redefinition of existing principles (backwards
  incompatible) — increment MAJOR (x.y.z → x+1.0.0)

Amendment procedure:

1. Draft amendment text and rationale in a spec or PR. Include migration steps if
   the change affects templates or required tooling.
2. Notify maintainers and allow a 7-day review period for feedback.
3. Approval requires a simple majority of repository maintainers or a designated
   governance group as recorded in project documentation.
4. On approval, update the constitution file, increment the version according to
   the rules above, and include a Sync Impact Report at the top of the file.

Compliance reviews:

- Periodic reviews (quarterly recommended) should verify that active plans and
  templates reflect the constitution.
- Non-compliance (introducing forbidden automated tests in the canonical repo,
  ignoring review gates) must be flagged and reverted unless a formal amendment
  permits otherwise.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-11-03
