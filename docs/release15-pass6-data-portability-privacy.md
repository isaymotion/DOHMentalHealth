# Release 15 — Pass 6: Data Portability and Privacy

## Scope

Pass 6 adds a versioned JSON backup/export, validated import, clearer reset scopes, and privacy explanations. Data remains in browser storage unless the learner explicitly exports and shares a file. The backup is **not encrypted**.

## Backup format

- `format`: `mindplan-learning-backup`
- `schemaVersion`: `1`
- `exportedAt`: ISO-8601 timestamp
- `appVersion`: MindPlan version string
- `stores`: recognized local learning stores only

Included stores when present: case progress and saved case notes, flashcard schedules/history, assessment history, Study Guide answers/completion, High-Yield Revision marks, study-plan preferences, and oral-exam drafts/ratings/sessions. Theme is intentionally excluded from export.

## Import behavior

- File limit: 5 MB.
- Each store is limited to 2 MB after JSON serialization.
- JSON syntax, format/schema version, recognized store names, basic object structure, case-progress structure, assessment-history structure, and theme values (if supplied) are validated before writes begin.
- Unknown keys and unsupported schema versions are rejected.
- User confirmation states that matching records will be replaced; existing data should be exported first if rollback may be needed.
- Import replaces only stores present in the backup; stores absent from the file are left as-is. Theme preference is preserved by normal exports.
- The app reloads after import to refresh in-memory state.

## Reset scopes

- **Reset case progress only**: clears completion status and saved notes in `mindplan-release2-state-v1`.
- **Reset all learning data**: clears the recognized MindPlan learning stores while preserving `mindplan-theme`.
- Clearing browser/site data remains a browser-level action and may remove all local app data.

## Privacy limitations

- Data is local to the browser/device profile, not an account-synced backup.
- Exported JSON is plain text and may contain free-text oral-exam drafts and assessment responses. Do not export to a shared device or send it to others unless appropriate.
- Browser storage can be cleared by the user, browser settings, or device policies. Export backups periodically if needed.
- This is not a security boundary against other people with access to the unlocked device/browser profile.
- No telemetry, remote storage, or learner tracking has been added.

## Acceptance criteria

- Valid backups are accepted and malformed/unknown formats rejected.
- Only recognized data keys can be imported.
- Import and full-reset operations require confirmation.
- Case-only reset does not erase other study data; full reset preserves theme.
- Backup and import functions work offline on a supported modern browser.
- Version and service-worker cache are bumped to `v2.18.0` / `mindplan-v2.18.0`.

## Remaining manual QA

Verify download and file picker flows on iOS Safari and desktop browsers, test a real backup round-trip with each store populated, inspect browser storage quota errors, and confirm offline reload after cache activation. The automated test suite does not simulate actual browser file picker or localStorage quota behavior.
