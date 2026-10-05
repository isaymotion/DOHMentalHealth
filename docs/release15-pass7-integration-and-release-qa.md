# MindPlan Release 15 — Pass 7: Integration, Regression, and Release QA

## Purpose

Pass 7 is the final integration and release-hardening pass for Release 15. It does not add a new learner-facing data model. Instead, it verifies that the Passes 1–6 features work together while preserving MindPlan's device-local, offline-first design and the source boundaries established in earlier releases.

## Integrated Release 15 components

1. **Learning-data audit (Pass 1)** — documents the existing localStorage stores and their limitations.
2. **Topic mastery model (Pass 2)** — derives formative objective evidence from distinct answered items and keeps `Not assessed` separate from weakness.
3. **Spaced-review scheduler (Pass 3)** — updates the existing flashcard store with deterministic review intervals and bounded rating history.
4. **Personalized Study Plan (Pass 4)** — prioritizes due cards and transparent topic/task signals within a learner-selected local time budget.
5. **Learning dashboard (Pass 5)** — reads existing stores at render time rather than creating a second progress database.
6. **Backup, import, reset, and privacy (Pass 6)** — provides a versioned JSON backup with validation and explicit replacement/reset warnings.

## Automated QA completed

- All existing regression assertions pass: case count/order, source anchors, assessment metadata, Release 14 bank distribution, oral stations, search/navigation, accessibility markers, Study Guide integration, and flashcard behavior.
- All Release 15 unit/integration assertions pass:
  - mastery sample-size and latest-response rules;
  - multi-select objective scoring;
  - deterministic spaced-review intervals and 60-day cap;
  - due/future classification and bounded review history;
  - Study Plan budget limits, priority order, and unassessed-topic safeguard;
  - dashboard integration and local progress signals;
  - backup schema, recognized-store validation, malformed-data rejection, and reset/import controls;
  - runtime JavaScript syntax checks;
  - `index.html` script registration and service-worker asset coverage;
  - live version/cache consistency at `v2.18.0` / `mindplan-v2.18.0`;
  - privacy and source-boundary disclosures.

Run the automated suite with:

```bash
node tests/validate.js
```

## Release status

**Release 15 is code-complete for this pass at v2.18.0.** Pass 7 does not bump the version because it is an integration/QA pass rather than a new feature release.

The distributable ZIP should contain the complete static site, including the Release 15 modules, data files, tests, and documentation. The app remains suitable for GitHub Pages deployment and does not require a backend.

## Manual browser QA still required

The execution environment does not provide a real browser session, so these checks remain deployment checks rather than claims of automated verification:

### Desktop

- Open the deployed site and navigate through every primary page.
- Confirm Back navigation works from nested case steps and ordinary pages.
- Run the 30-item Release 14 bank, a timed exam, and short-answer practice.
- Review and rate flashcards; confirm due counts and next-review dates update.
- Open Study Plan, change the daily time budget, and confirm the sequence rebuilds.
- Verify the Overview dashboard changes after completing a case, answering questions, reviewing cards, and marking Study Guide/Revision topics.
- Export a full backup, modify local progress, import the backup, and confirm matching stores are restored.
- Test case-only reset and full learning-data reset; confirm theme survives full reset.

### Mobile / iOS Safari

- Check responsive navigation, touch targets, dialogs, search, and assessment controls.
- Test the JSON file download and file-picker import flow.
- Confirm localStorage survives normal navigation and reload.
- Test behavior when browser storage is unavailable or constrained.

### Offline / service worker

- Load the deployed site once while online so the current cache activates.
- Reload while offline.
- Navigate to Study Guide, High-Yield Revision, Exam Mode, Flashcards, Study Plan, and My Progress while offline.
- Confirm the current `v2.18.0` cache replaces an older MindPlan cache after activation.

## Known limitations retained intentionally

- Learning records are browser/device-local, not cloud-synced.
- Backup JSON is not encrypted and may contain free-text oral-exam drafts and assessment responses.
- Mastery and study-plan recommendations are formative heuristics, not validated measures of competence or retention.
- Short-answer checklist self-checks are not semantic grading.
- The source curriculum is the Philippine National Mental Health Strategic Plan 2019–2023. Historical targets are not presented as current achievements.
- Some source material remains explicitly flagged for page-level verification; integration does not silently convert those flags into verified claims.
- Browser storage clearing, quota errors, and device policies can remove or prevent persistence.

## Deployment checklist

- [x] `node tests/validate.js` passes.
- [x] Runtime JavaScript files pass `node --check`.
- [x] `index.html` references all runtime modules.
- [x] Service worker includes all runtime/data assets.
- [x] Live app and service worker identify v2.18.0.
- [x] Release 15 documentation is included.
- [x] Attribution remains present in the app.
- [ ] Manual desktop browser QA completed on deployed GitHub Pages site.
- [ ] Manual iOS Safari/file-picker QA completed.
- [ ] Real offline reload/cache activation verified after deployment.

## Attribution

This app was created by Isabella Navarro, MD. Latest version October 2026. isaymotion@gmail.com
