# Release 16 · Pass 3 — Adaptive Assessment

## Implemented

- Added `js/adaptive-assessment.js`, a pure selector over the existing objective assessment items and the most recent ten saved assessment attempts.
- Added an **Adaptive practice** option to Examination Mode. It builds a set of up to ten objective items.
- Priority order: recently missed objective items; topics with repeated errors in recent objective attempts; unseen objective items; then reinforcement items.
- Displays a brief reason for each selected item before the learner starts.
- Excludes short-answer self-checks and does not treat them as objectively graded evidence.
- Preserves the existing assessment history format and local-only storage.
- Registers the module in the service worker and bumps the app/cache version to v2.21.0.

## Interpretation and privacy boundaries

Selection is deterministic and explainable, not a validated computerized adaptive test. The selector only uses saved objective responses from the latest ten attempts. It does not estimate clinical competence, predict examination results, grade free text, or send data to a server. Existing question keys, rationales, and source labels remain unchanged.

## QA

Automated tests cover the selection limit, recent missed-item priority, objective-only item selection, reason metadata, limitation disclosure, UI integration, and offline asset registration. Run `node tests/validate.js` and JavaScript syntax checks. Manual browser verification is still required for the live GitHub Pages site, iOS interaction, and offline reload.
