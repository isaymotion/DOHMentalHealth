# Release 17 Pass 8 — HTTP smoke test and acceptance plan

**Version:** v2.33.0 · October 2026

## Automated local HTTP smoke test

Run from the project root:

```sh
node tests/validate.js
node tests/deployment-smoke.js
```

The deployment smoke test starts a temporary local HTTP server and requests the root page, local `src`/`href` resources in `index.html`, and every URL declared in the service-worker precache list. It checks that the responses are non-empty HTTP 200 responses and that the visible version and service-worker cache marker agree. It does not execute the app's UI or prove that the deployed site works on every hosting provider.

## Acceptance checklist for the actual deployed HTTPS site

Complete these checks after uploading the ZIP contents to the intended GitHub repository and enabling GitHub Pages. Record pass/fail and device/browser; do not mark an unchecked item as passed.

- [ ] Open the exact HTTPS GitHub Pages URL; verify no missing assets or JavaScript errors in the browser console.
- [ ] Open every sidebar destination, use the in-app Back button and browser Back, and test global search, theme switching, and source/citation views.
- [ ] On iPhone/iPad Safari, check portrait and landscape layouts, keyboard focus, dialog overflow, and date inputs.
- [ ] Complete a case, objective assessment, flashcard review, OSCE station, portfolio entry, and educator review-cycle action.
- [ ] Reload and verify expected local progress persists. Export a backup and inspect that it is valid JSON; do not share identifiable learner or patient details.
- [ ] Import a valid backup and a malformed/oversized file; verify invalid input is rejected with a clear message and existing data is not silently overwritten.
- [ ] Open portfolio-summary import in Educator Mode; verify it is read for the current review only and is not added to localStorage.
- [ ] Print/save a case or OSCE station, facilitator pack, portfolio review sheet, and longitudinal review summary.
- [ ] Wait for the service worker to install and finish caching. Disable network access, reload, and test core navigation and data. Restore network access afterwards.
- [ ] Deploy a subsequent cache version in a test branch, reload, and verify the new cache activates and the app does not show stale assets.

## Boundaries

- Local HTTP smoke tests establish reachability only, not user-interface correctness.
- Offline behavior depends on a successful first online load and service-worker installation; it must be tested in a real browser.
- Local storage can be cleared by the browser/device. Exported JSON is unencrypted and may contain sensitive learning reflections.
- The National Mental Health Strategic Plan 2019–2023 is a historical source. Its targets are not evidence of current achievement.
- Mastery labels, educator reviews, and follow-up dashboard statuses are formative workflow aids, not validated measures of clinical competence or proof that a goal was achieved.
