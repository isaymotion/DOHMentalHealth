# Release 18 · Pass 3 — Full learning-data workflow tests

## Scope

Pass 3 adds automated lifecycle coverage for all nine recognized browser-local learning-data stores. Representative records are serialized into the versioned backup envelope, parsed and validated, restored into isolated storage, then compared against their source values. A separate partial restore test verifies that omitted categories remain unchanged.

## Coverage

- Every recognized store has a representative fixture and participates in a round-trip test.
- Backup validation output matches the original fixture values after JSON serialization.
- Restore writes all included stores and reports the count.
- Theme preference and unrelated application data are preserved when absent from the backup.
- Partial restore changes only the selected store.
- Full-reset UI references the centralized recognized-store inventory; theme handling remains separate.
- Export errors are caught by the UI workflow; cancelled file selection returns without importing; restore requires confirmation.
- Current visible version, backup default version, and service-worker cache are aligned at v2.36.0.

## Limits and manual checks

These tests exercise data-portability functions with isolated in-memory storage and static checks of UI wiring. They do not simulate real user interactions across every feature screen, reload a real browser, or prove that a given feature writes the expected record on iOS Safari. Before publishing, manually test create/save/reload/export/import/reset in a browser, verify HTTPS hosting, service-worker installation, offline reload, and mobile layout. Keep an independent backup before importing important learner records. Browser storage can fail, and rollback remains best-effort.
