# Release 17 Pass 7 — Integration and deployment QA

Version: v2.32.0 · October 2026

## Automated checks

- Every local script and stylesheet referenced by `index.html` exists in the project.
- Every service-worker precache entry resolves to an existing local file or directory.
- Navigation page identifiers used by the HTML have route handling in the app.
- The displayed version, README release metadata, and service-worker cache name agree.
- Existing checks for the source-boundary notices, local persistence, portfolio import/export, educator review cycle, dashboard filters, and competency disclaimers continue to run.

## Deployment checklist — manual, not implied complete

1. Deploy to the intended HTTPS GitHub Pages URL and confirm the app loads without console errors.
2. Visit every sidebar destination; test browser Back and the in-app Back control, search results, source dialogs, and theme toggle.
3. Complete one case, one objective assessment, one flashcard review, one oral-exam station, and one educator review cycle.
4. Export local progress and a portfolio summary; verify that importing a portfolio summary for educator review does not persist the imported file.
5. Print/save an OSCE station, facilitator pack, portfolio review, and longitudinal progress summary.
6. After the first online load, wait for service-worker installation to complete; turn off network access and reload. Confirm that all core screens and data still work offline.
7. Deploy an updated cache version and confirm that a reload activates the new version without leaving stale assets.
8. Check mobile Safari layout, keyboard focus, dialogs, date controls, print behavior, and recovery after malformed/oversized imports.

## Interpretation and privacy boundaries

- The Plan is the 2019–2023 National Mental Health Strategic Plan. Historical targets are not current achievement data.
- Local browser storage is not a backup and may be cleared by the browser or device. Exported files are user-controlled and may contain sensitive learning information; use non-identifying details.
- Educator summaries are formative workflow aids. They do not validate competence, establish goal achievement, or provide cloud-based learner tracking.
- Automated source checks and static tests do not substitute for checking the underlying Plan or for real-browser/manual testing.
