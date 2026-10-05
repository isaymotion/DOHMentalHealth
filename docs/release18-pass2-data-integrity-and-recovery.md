# Release 18 · Pass 2 — Learning-data integrity and recovery

**Version:** v2.35.0 · October 2026

## Changes

- Backup validation rejects unsupported formats/schema versions, unknown stores, invalid known-store structures, oversized categories, and combined payloads over 5 MB before any writes are attempted.
- Import applies the validated stores through a transaction-like helper: it snapshots existing values and attempts to restore earlier values if a write fails. Browser storage cannot guarantee perfect rollback if the storage engine continues failing; the user is warned if rollback is incomplete.
- Educator review-cycle data is an array of record objects in the existing app, and the validator now checks that actual shape rather than assuming an object with a `cycles` property.
- Regression tests cover malformed structures, invalid study-plan settings, category size limits, and a simulated write failure.

## Safety boundaries

- Import is user-initiated and remains local to the browser. No backup is uploaded.
- A backup is not encrypted. Exported files can contain personal learning reflections and should be stored carefully.
- The validator provides structural checks, not semantic verification of every nested learner record. Older schema versions are rejected rather than silently migrated.
- Transaction-like rollback is best effort: browser storage quota or device failures may also affect rollback. Keep a separate backup before importing important data.
- Learning summaries, educator reflections, and formative rubrics are not validated measures of clinical competence.

## Automated checks

Run from the project root:

```sh
node --check js/data-portability.js
node --check js/app.js
node --check service-worker.js
node tests/validate.js
node tests/deployment-smoke.js
```

These checks do not substitute for real-browser testing.

## Manual acceptance still required

1. Make a backup containing several different data categories, including educator review cycles.
2. Import a valid backup and verify each selected category is restored after reload.
3. Try malformed JSON, an unsupported schema version, an unknown key, an invalid review-cycle store, and a file over 5 MB; confirm rejection without changes to existing data.
4. Confirm import cancellation makes no changes.
5. Test low-storage/quota failure if feasible, and verify the warning accurately reports any rollback issue.
6. Test backup/import/reset in deployed HTTPS on iOS Safari and desktop browsers.
