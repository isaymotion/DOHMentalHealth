# Release 16 · Pass 1 — Learning Dashboard

**Build:** v2.19.0 · October 2026

## Goal

Expand the Release 15 Overview from a compact progress summary into a useful landing dashboard while preserving the static, offline-first, device-local architecture.

## Delivered

- Retained the existing overview tiles for cases, due/new flashcards, topics with objective evidence, Study Guide, and revision topics.
- Added a five-band topic-evidence summary: Needs review, Developing, Strong evidence, Limited data, and Not assessed.
- Added a targeted-review panel showing up to four topics labeled Needs review, Limited data, or Developing, with a one-click path to topic practice.
- Added a recent objective-assessment activity panel with the latest three saved objective results. Short-answer self-checks are excluded from this panel.
- Added responsive styling for the topic evidence chips and topic cards.
- Bumped the app/service-worker cache to v2.19.0.

## Interpretation and privacy boundaries

Mastery labels remain formative heuristics, not validated competence measures. Limited data is not a failure label; Not assessed is not treated as weak. Repeated responses to the same objective item do not inflate the distinct-item sample. Short-answer self-checks are not shown as objective scores. All dashboard signals are read from existing local browser records; no backend, account, analytics endpoint, or cloud tracking was added.

The curriculum source remains the National Mental Health Strategic Plan 2019–2023. Historical targets are not evidence of current achievement.

## QA

Automated checks cover syntax, required dashboard sections, local mastery-model use, topic-practice navigation, separation of short-answer self-checks, and cache/version consistency. Browser interaction, mobile layout, and offline reload still require manual verification on the deployed HTTPS site.
