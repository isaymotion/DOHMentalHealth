# Release 18 · Pass 4 — Browser acceptance and deployment readiness

**App version:** v2.37.0  
**Date:** October 2026  
**Status:** Automated static/local-HTTP checks can be run here; real-browser/live-host acceptance is **not passed** in this environment.

## Checks run for this release

- JavaScript syntax checks for the main app, portability module, and service worker.
- Existing application and learning-data regression suite.
- Local HTTP smoke test across all HTML-declared local assets and service-worker precache assets.
- ZIP archive integrity check after packaging.
- Current visible version, backup version, and service-worker cache version alignment.

## Browser limitation

A real Chromium acceptance attempt was blocked by the execution environment's browser policy. It displayed an organization restriction for both `http://127.0.0.1` and `file://` origins before the app could run. This is an environment limitation, not evidence that the app itself failed. As a result, the following are **not passed / not verified**: interactive browser rendering, live GitHub Pages HTTPS, service-worker install/activation, offline reload, mobile Safari, printing, and end-to-end save/export/import through the visible UI.

## Manual acceptance checklist after publishing

Perform this on the deployed HTTPS URL, ideally in iOS Safari and a desktop browser. Use fictional/test data only.

- [ ] Confirm the deployed page shows **v2.37.0** and loads without a permanent loading screen.
- [ ] Open Overview, Case library, Case progression, Study Guide, Exam mode, Flashcards, Study plan, and My progress.
- [ ] Complete one fictional case step and save a reflection; navigate away and back.
- [ ] Record a practice assessment attempt and mark a Study Guide topic reviewed.
- [ ] Reload and confirm the case, assessment, and Study Guide progress persist in that browser.
- [ ] Export a full learning backup. Keep the file outside the browser before testing restore.
- [ ] Import the backup and verify the records remain present; also test a partial backup in a disposable browser profile.
- [ ] Test canceling the file picker and canceling the restore confirmation; neither should change stored progress.
- [ ] Verify theme preference is preserved when importing a backup that omits theme data.
- [ ] In a clean browser profile, load the app online and wait for the service worker to become active.
- [ ] Disable the network and reload. Confirm the app shell and cached study modules still open.
- [ ] Re-enable the network and confirm recovery; test print/save-to-PDF if used by educators.
- [ ] Repeat key navigation and offline steps on iPhone/iPad Safari.

## Acceptance record template

Record date, deployed URL, browser/device, version shown, each checklist result, and any console errors. Do not record learner names or patient-identifiable information. A local smoke test is not a substitute for these results.
