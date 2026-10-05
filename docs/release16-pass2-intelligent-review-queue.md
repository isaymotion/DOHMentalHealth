# Release 16 · Pass 2 — Intelligent Review Queue

**Version:** v2.20.0 · October 2026

## Delivered

- Added a dedicated **Review queue** navigation destination and “What should I study today?” page.
- Combines due flashcards, topics labelled Needs review, missed concepts summarized from saved objective assessment attempts, limited-evidence topics, developing topics, new flashcards, unfinished fictional cases, unreviewed Study Guide topics, and unreviewed High-Yield Revision topics.
- Priorities are deterministic and visible: due cards → Needs review → missed concepts → limited evidence → Developing → new cards → cases → Study Guide → High-Yield Revision.
- Each task opens the relevant app section; topic tasks launch topic-filtered practice.
- Uses existing browser-local records; no new learner tracking or network service.

## Evidence boundaries

- “Not assessed” is never classified as weak.
- Missed-concept signals summarize topic-level misses saved in objective attempts; the queue does not claim semantic diagnosis of a learner's misunderstanding.
- Short-answer self-checks are excluded from missed objective concept signals.
- Queue ordering is a transparent study heuristic, not a validated learning or clinical-competence measure.
- The app remains grounded in the National Mental Health Strategic Plan 2019–2023; historical targets are not presented as current achievements.

## QA

Automated tests cover queue priority, topic signals, unassessed safeguards, navigation, and service-worker asset registration. Real-browser interaction, iOS behavior, and offline reload still require deployment testing.
