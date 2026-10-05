# Release 14 — Pass 6: Integration and QA

## Integrated behavior

- Reviewed the High-Yield Revision route, topic selection, local review marks, Study Guide deep links, and links to practice, timed exam mode, and flashcards.
- Corrected the topic-practice aliases to match the actual topic names in the existing assessment bank. Where a topic has no directly corresponding assessment category, the link intentionally opens general practice rather than an empty filtered set.
- Updated the learner-facing revision page to identify Pass 6 and bumped the app/service-worker version to v2.13.1 so deployed clients can refresh cached assets.
- Added regression assertions for revision-to-assessment topic mapping and the release version.

## Validation performed

- `node --check js/app.js` — syntax check.
- `node tests/validate.js` — repository regression suite.
- `unzip -t mental-health-strategic-plan-app.zip` — archive integrity check after repacking.
- Checked that the service worker cache version matches the app version and that the revision feature uses the existing offline-cached Study Guide and assessment data.

## Limits and source boundaries

- A real browser/device session was not available in this execution environment. Navigation, keyboard/touch interaction, service-worker update behavior, and offline startup still need a manual check after deployment on GitHub Pages.
- Release 14 Pass 4's 30-item formative bank remains a documentation artifact; this pass does not claim it has been integrated into the live assessment UI. The live assessment bank remains the existing 19-question bank.
- Local revision and assessment progress remain on the learner's device; there is no server-side progress tracking.
- The source is the Philippine National Mental Health Strategic Plan 2019–2023. Historical targets are not current achievements, proposed budget values are not actual expenditure, and previously flagged scanned legal/table details remain verification-gated.


## Follow-on: Release 14 Pass 7 — 30-item question bank integration

- Implemented the Pass 4 bank as `data/release14-question-bank.js` and wired it to Examination Mode and High-Yield Revision.
- The dedicated bank includes 15 single-best-answer, 5 select-all-that-apply, 5 short-answer/oral-recall, and 5 scenario-application items.
- Single-answer items provide immediate feedback. Multi-select items require an explicit check action and exact-set scoring. Short-answer and scenario items show model outlines and self-check lists; these are formative self-assessments, not automated semantic grading.
- Saved attempts retain their bank identity so result review and “try again” resolve to the correct bank.
- Service-worker cache updated to `mindplan-v2.14.0` and the new data file is precached for offline use.
- `node --check js/app.js`, `node --check data/release14-question-bank.js`, and `node tests/validate.js` pass. Real-browser navigation and offline-start testing remain manual deployment checks.
