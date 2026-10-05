# Release 16 Pass 7 — Integration and Deployment QA

## Scope

This pass audits the integrated static app after the dashboard, review queue, adaptive assessment, case progression, timed OSCE, and Educator Mode releases. It does not add a backend, telemetry, account system, or new learner-data store.

## Automated checks

- Verify local script, stylesheet, icon, manifest, and other referenced assets exist.
- Verify runtime scripts referenced by the page are represented in the service-worker precache list.
- Verify navigation destinations have corresponding render routes.
- Verify the HTML, README current-release line, and service-worker cache name agree on v2.25.0.
- Verify service-worker install/activate/fetch handlers exist.
- Run JavaScript syntax checks and the full regression suite.
- Preserve historical-source cautions, local-only privacy boundaries, and formative/non-validated interpretation statements.

## Manual deployment checklist (not claimed complete by automated tests)

1. Deploy to a GitHub Pages HTTPS origin and open the site in a current desktop browser.
2. Confirm the service worker installs and the v2.25.0 cache appears after reload.
3. Disable the network, reload, and visit the Study Guide, case library, progression, exam, oral exam, review queue, Study Plan, and Educator Mode.
4. On an iPhone/iPad-sized viewport, test sidebar navigation, global search, back button, dialogs, and long-content scrolling.
5. Complete one objective practice item and one case; verify progress remains local after reload.
6. Export a backup, validate that it is readable JSON, then test import using a disposable test profile. Confirm import warnings and reset scope are understandable.
7. Run all three OSCE stations; verify the timer starts/stops cleanly, station changes work, and no timer continues after leaving the session.
8. In Educator Mode, preview a pack, open print view, inspect page breaks and text wrapping, and test browser Print / Save as PDF.
9. Update from an older cached version and confirm the old service-worker cache is removed after activation.
10. Check browser console for errors and confirm no remote analytics or learner-data transmission is introduced.

## Interpretation and privacy boundaries

- Historical 2019–2023 targets are not evidence of current achievement.
- Adaptive selection, mastery bands, case completion, OSCE rubrics, and educator prompts are learning supports, not validated competency measures.
- Learning records and notes remain device-local unless the user explicitly exports a backup; exported JSON is not encrypted.
- Current local requirements, legal text, and policy status should be independently verified where relevant.

## Result status

Automated static checks and regression tests are intended to run with `node tests/validate.js`. Real-browser, offline-network, mobile, and print checks require a human to perform them against the deployed HTTPS site; this document does not represent those manual checks as completed.
