# Release 17 · Pass 3 — Longitudinal Learning Plan

## Implemented
- Added a Longitudinal Learning Plan page to the main navigation and global search.
- Learners can set a start date and planning horizon (2, 4, 6, 8, or 12 weeks).
- Learners can add dated tasks with a title, resource type, estimated minutes, optional Study Guide topic, and a success-criterion note.
- Tasks can be marked complete or removed; schedule summary shows completed task count and total planned minutes.
- Weekly reflection is saved locally; a JSON export supports personal review or voluntary sharing.
- Added `mindplan-longitudinal-plan-v1` to backup/reset inventory.
- Updated app/service-worker cache version to `mindplan-v2.28.0`.

## Interpretation and privacy boundaries
This is a self-directed schedule, not a curriculum mandate. Dates and milestones are user-selected and must not be confused with official deadlines or historical targets in the National Mental Health Strategic Plan 2019–2023. Task completion indicates recorded activity, not mastery or clinical competence. Data remains in browser local storage unless the learner exports and shares it. Avoid identifiable patient/colleague data. JSON exports are not encrypted.

## Automated checks
`tests/validate.js` checks navigation, render route, local storage key, export naming, backup/reset registration, and service-worker version. JavaScript syntax is checked separately. These static tests do not simulate real user interaction.

## Manual browser checks still required
1. Open deployed HTTPS app and confirm Longitudinal plan appears in sidebar and global search.
2. Add a task with date, resource type, time and note; mark it complete, reload, and confirm it persists.
3. Change start date/horizon and verify settings persist after leaving/reopening the page.
4. Save a weekly reflection, reload, and verify it persists.
5. Export JSON and confirm it is valid and contains the intended plan only.
6. Export a full MindPlan backup, reset only through the intended UI if testing, and confirm the new store participates in backup/restore/reset.
7. Test narrow mobile viewport and offline reload after the service worker has cached the app.
