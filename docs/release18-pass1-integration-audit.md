# Release 18 · Pass 1 — Integration audit and local-data workflow

**Version:** v2.34.0 · October 2026

## Scope

This pass starts Release 18 with a static integration review of navigation route declarations, local script/style references, service-worker precache coverage, release/cache metadata, and browser-local data portability.

## Finding fixed

The longitudinal educator review-cycle records use `mindplan-educator-review-cycle-v1`. They were locally saved and had their own JSON export/delete controls, but the key was missing from `MINDPLAN_PORTABILITY.DEFAULT_KEYS`. As a result, unified learning-backup export, recognized backup import, and the app's “Reset all learning data” inventory did not include those records. Pass 1 adds the key to the recognized inventory. Existing backup validation accepts the stored array as an object-valued data category; import remains user-initiated and schema validation still runs before writes.

## Boundaries

- The review-cycle store remains local to the current browser unless the user explicitly exports and shares a file.
- Backups are not encrypted; exported files may contain sensitive educational reflections and should be handled carefully.
- Adding a data store to backup/reset scope does not imply that review-cycle entries measure competency or verify that a learning goal was achieved.
- The National Mental Health Strategic Plan 2019–2023 remains a historical source. Its targets are not represented as current achievements.

## Automated checks

Run from the project root:

```sh
node --check js/app.js
node --check js/data-portability.js
node --check service-worker.js
node tests/validate.js
node tests/deployment-smoke.js
```

The tests inspect static integration contracts and serve declared local assets over a temporary local HTTP server. They are not a substitute for a real browser.

## Manual checks still required

1. On deployed HTTPS GitHub Pages, create a review-cycle record and export a full learning backup.
2. Confirm the backup JSON includes `mindplan-educator-review-cycle-v1` and that importing it restores the record.
3. Confirm “Reset all learning data” removes the review-cycle store after a confirmation and that theme preference is preserved.
4. Test import rejection with malformed JSON and an unsupported data key.
5. Repeat navigation, print, mobile Safari, service-worker update, and offline reload acceptance tests.
