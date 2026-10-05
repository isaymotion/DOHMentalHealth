# Release 15 — Pass 5: Dashboard Integration

## Scope

The Overview page now serves as a compact learning dashboard. It combines existing device-local signals without introducing a second progress store or duplicating assessment records.

## Dashboard signals

- **Case completion:** completed cases / total fictional cases, from `mindplan-release2-state-v1`.
- **Flashcards due and new:** computed from the existing flashcard records and the spaced-review scheduler.
- **Topics with objective evidence:** derived at render time by the Pass 2 mastery model from retained assessment attempts; also shows the count labeled `Needs review`.
- **Study Guide completion:** topics marked complete in `mindplan-study-guide-v1`.
- **High-Yield Revision completion:** topics marked reviewed in `mindplan-high-yield-revision-v1`.

Each signal links to its existing workspace. The dashboard provides direct links to the personalized Study Plan, flashcards, case library, Exam Mode, Study Guide, and High-Yield Revision. The home page now displays three case cards instead of the entire case library; the full library remains available through navigation.

## Interpretation and privacy safeguards

- Progress is read from existing local storage; no backend, telemetry, account, or cloud sync is added.
- Mastery is derived from the latest answered response per distinct objective item. Short-answer checklist self-checks are not included in objective accuracy.
- `Not assessed` is not presented as weakness. Counts are formative learning signals, not validated measures of competence.
- Historical targets in the National Mental Health Strategic Plan 2019–2023 remain historical and are not presented as current outcomes.
- The dashboard is a snapshot when the Overview page renders. It does not create a time-series, streak, or background notification system.

## Release and QA

- Version/cache bumped to `v2.17.0` / `mindplan-v2.17.0`.
- Added dashboard integration assertions to `tests/validate.js`.
- Node syntax checks, regression tests, and ZIP integrity should be run before distribution.
- Real-browser navigation, mobile layout, storage-failure behavior, and deployed offline caching still require manual testing.
