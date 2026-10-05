# Release 16 · Pass 4 — Clinical Case Progression

**Version:** v2.22.0 · October 2026

## Purpose

Provide a structured route through the existing fictional case library, connecting case completion and the existing learning objectives to a repeatable reasoning scaffold. This pass does not create new clinical content or claim that the source Strategic Plan prescribes this learning sequence.

## Learner experience

- New **Case progression** navigation entry and dashboard shortcut.
- Cases grouped by their existing levels: Foundation, Integration (existing `intermediate` level), and Systems application (existing `advanced` level).
- Progress counts and the next suggested case are derived from the existing `mindplan-release2-state-v1` case-completion records.
- Four-step scaffold: notice context and social determinants; formulate the system/service problem; choose proportionate, coordinated actions; select indicators and reflect on limitations.
- Direct actions open the existing case engine. Completion continues to use the existing case completion flow.

## Source and interpretation boundaries

The case library contains fictional educational scenarios applying the *National Mental Health Strategic Plan 2019–2023*. The sequence is a learning interpretation of existing case levels and objectives, not a sequence specified in the Plan. Historical targets are not evidence of achievement. Case completion and the case engine's formative completeness score are not validated measures of clinical competence.

## Privacy and offline

No new progress store, account, backend, telemetry, or cloud tracking is added. Existing local completion data drives the pathway. `js/case-progression.js` is registered in the service-worker cache under `mindplan-v2.22.0`.

## QA

Automated tests cover level ordering, derivation of completion from existing records, next-case selection, the four reasoning stages, competence disclaimers, UI wiring, and offline registration. Real-browser GitHub Pages, mobile, and offline-reload checks remain manual.
