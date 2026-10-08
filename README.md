# MindPlan Interactive Learning

MindPlan is a static, offline-first study app for psychiatry residents using the **Philippine National Mental Health Strategic Plan 2019–2023** as its curriculum source.

## Current release

**v2.40.0 · October 2026 · Release 20 Pass 1**

Release 15 integrates device-local learning support without adding a backend, account, telemetry, or cloud learner tracking:

- learning-data audit and explicit storage boundaries;
- formative topic mastery from distinct objective assessment evidence;
- transparent spaced-review scheduling for flashcards;
- configurable personalized Study Plan;
- compact learning dashboard on Overview;
- validated JSON backup/import and scoped reset controls;
- privacy and source-boundary disclosures;
- integration, regression, and release QA;
- expanded dashboard with topic evidence bands, targeted review, and recent objective assessment activity;
- unified, prioritized review queue combining due cards, missed concepts, topic evidence, unfinished cases, and unreviewed topics.

Release 14's 30-item revision bank and Release 13's Study Guide remain available.

## Release 19 · Pass 2 — Deep Study Guide layer

**v2.40.0** adds a dedicated Mental Health Act IRR study section. The Study Guide now has 11 topics, including a chapter-by-chapter map of IRR Sections 1–49, high-yield consent/capacity, safeguards, internal review board, community services, agency responsibilities, PCMH, penalties and effectivity material. Because Annex 2 of the supplied Strategic Plan is scanned, this new section explicitly discloses its external rule-level source trail and does not present a third-party copy as the official legal publication.

## Run locally

This is a static site. Serve the project directory with any local HTTP server or deploy it to GitHub Pages. The service worker is registered when the site is served over HTTP(S).

For automated validation:

```bash
node tests/validate.js
```

The test suite validates curriculum structure, source metadata, Release 14 assessment distribution, accessibility markers, Release 15 modules, local-data contracts, syntax, and offline asset registration.

## Privacy and storage

Learning data is stored in the browser's localStorage. There is no learner account, backend database, cloud sync, or telemetry in this release.

The full backup is a plain-text JSON file and is **not encrypted**. It may contain assessment responses, saved case notes, and oral-exam drafts. Export or share it only when appropriate.

Clearing browser/site data can remove local progress. The app therefore provides an explicit full-data export and validated import flow. Theme preference is intentionally preserved outside the learning backup.

## Interpretation boundaries

Mastery labels and Study Plan priorities are transparent learning heuristics, not validated measures of clinical competence, retention, or board-examination performance. `Not assessed` is not treated as weakness, and short-answer self-checks do not determine objective mastery.

The curriculum source is the **National Mental Health Strategic Plan 2019–2023**. Its historical targets are not presented as evidence of current achievement. Where source verification remains incomplete, MindPlan retains an explicit verification warning rather than silently filling the gap.

## Release 15 QA

See [`docs/release15-pass7-integration-and-release-qa.md`](docs/release15-pass7-integration-and-release-qa.md) for the integrated feature inventory, automated QA results, manual browser checks, known limitations, and deployment checklist.

## Attribution

This app was created by Isabella Navarro, MD. Latest version October 2026. isaymotion@gmail.com

## Release 16 · Pass 1

See [`docs/release16-pass1-learning-dashboard.md`](docs/release16-pass1-learning-dashboard.md) for the dashboard changes and QA boundaries.


## Release 16 · Pass 2

See [`docs/release16-pass2-intelligent-review-queue.md`](docs/release16-pass2-intelligent-review-queue.md) for the queue priorities, evidence boundaries, integration, and QA notes.

## Release 16 · Pass 3

**v2.21.0 · Adaptive Assessment** adds an objective-question practice set selected from recent saved performance. Recently missed items and topics with repeated errors are prioritized, followed by unseen items and reinforcement. The selection reasons are shown to learners. Short-answer self-checks are excluded from adaptive objective scoring. This is a transparent practice heuristic, not a validated adaptive test or measure of clinical competence. See [`docs/release16-pass3-adaptive-assessment.md`](docs/release16-pass3-adaptive-assessment.md).


## Release 16 · Pass 4

**v2.22.0 · Clinical Case Progression** adds a guided pathway through the existing fictional case library. Cases are grouped from foundation to integration to systems application using their existing curriculum levels and objectives. Each case is approached through a four-step scaffold: notice context and determinants, formulate the system/service problem, choose coordinated actions, and select indicators/reflect on limits. Progress is derived from existing local case-completion records; no additional learner tracking is introduced. The sequence is an educational interpretation, not a sequence specified by the source Plan, and completion is not a validated competency score. See [`docs/release16-pass4-clinical-case-progression.md`](docs/release16-pass4-clinical-case-progression.md).


## Release 16 · Pass 5

**v2.23.0 · OSCE and Oral Examination Integration** adds a three-station OSCE circuit with a five-minute timer per station, examiner follow-up questions, model answer outlines, source-linked learning notes, and a four-domain self-review rubric (structured reasoning, source fidelity, feasibility/coordination, and monitoring/limitations). Ratings are descriptive self-reflection only; there is no automatic pass/fail threshold or validated competency score. Drafts, rubric ratings, and session summaries stay in localStorage. See [`docs/release16-pass5-osce-integration.md`](docs/release16-pass5-osce-integration.md).


## Release 16 Pass 6 — Educator Mode

Adds a facilitator workspace to assemble printable session packs from the existing fictional case library and OSCE/viva prompts. Facilitators can select a case and/or station, set session duration and group type, add optional local notes, preview the outline, and print or save the pack as PDF. The output includes source-boundary prompts and formative feedback guidance. Generation happens in the browser; no learner records are uploaded. Materials are not validated assessment instruments, and the historical 2019–2023 Plan does not establish current local requirements or outcomes.


## Release 16 · Pass 7 — Integration and Deployment QA

**v2.25.0** completes a final static integration audit across navigation destinations, referenced runtime assets, service-worker precache entries, release metadata, and privacy/source-boundary disclosures. It adds a deployment checklist for HTTPS, service-worker installation, offline reload, mobile navigation, local-data export/import, OSCE timing, educator print output, and recovery from stale caches. Automated checks cannot replace real browser testing; the checklist records those steps as manual until actually performed. See [`docs/release16-pass7-integration-and-deployment-qa.md`](docs/release16-pass7-integration-and-deployment-qa.md).


## Release 17 · Pass 1 — Curriculum Mapping

**v2.27.0** adds a curriculum crosswalk linking existing Study Guide topics, fictional cases, objective/question-bank items, and oral-exam stations under seven learning themes: Plan mandate/context/goals; promotion and prevention; leadership/governance/coordination; services/access/integration; rights/participation; information/indicators/evaluation; and source fidelity/responsible interpretation. The crosswalk uses transparent keyword matching and may list a resource under multiple themes. It is an educational navigation aid, not an official curriculum, validated competency framework, or evidence of learner mastery. The source Plan covers 2019–2023; its historical targets are not evidence of current achievement. See [`docs/release17-pass1-curriculum-mapping.md`](docs/release17-pass1-curriculum-mapping.md).

## Release 17 · Pass 4 — Educator Portfolio Review

**v2.31.0** adds a voluntary portfolio review workflow to Educator Mode. Learners may choose to provide a MindPlan portfolio-summary JSON export; the app validates the format, reads it locally in memory, and displays activity counts and learner reflections separately. Educators can use a four-domain formative discussion rubric and print/save a review sheet with feedback and next steps. The imported file is not persisted or transmitted by MindPlan. Use only with informed learner permission and avoid identifiable patient/colleague information. This is not a validated competency assessment. See [`docs/release17-pass4-educator-portfolio-review.md`](docs/release17-pass4-educator-portfolio-review.md).


## Release 17 · Pass 5 — Longitudinal educator review cycle

**v2.31.0** adds a device-local workflow for voluntary review agreements, non-identifying learner codes, initial and follow-up dates, agreed learning goals, planned practice/support, and dated follow-up reflections. Educators can export the review cycle as JSON or print/save a progress summary. Records remain in the current browser unless the educator explicitly exports them; a delete action removes the local review-cycle records. Avoid sensitive or identifiable information. This supports continuity of formative feedback and does not rate, certify, or validate clinical competence. See [`docs/release17-pass5-longitudinal-educator-review-cycle.md`](docs/release17-pass5-longitudinal-educator-review-cycle.md).


## Release 17 · Pass 6 — Educator follow-up dashboard

**v2.31.0** adds a dashboard over the existing local educator review cycles: total cycles, upcoming/due/overdue follow-ups, cycles with reflections, and recorded goals. Educators can filter the timeline to all cycles, due/overdue cycles, or cycles with reflections. Status is a workflow reminder only: a reflection does not prove a goal was achieved, and an overdue item is not a negative competency judgment. The dashboard reads only records in the current browser and introduces no cloud tracking or notifications. See [`docs/release17-pass6-educator-follow-up-dashboard.md`](docs/release17-pass6-educator-follow-up-dashboard.md).


## Release 17 · Pass 7 — Final integration and deployment QA

**v2.32.0** performs a final static integration audit across navigation routes, script and stylesheet references, service-worker precache entries, cache/version metadata, offline-first data assets, local-data privacy boundaries, and documented manual browser checks. The automated validator checks that local HTML script references and service-worker precache assets exist, that release metadata is consistent, and that expected routes and privacy safeguards remain present. Static checks cannot prove successful real-device navigation, printing, or offline reload; these remain explicit manual deployment checks. MindPlan is a static client-side learning aid, not a validated competency assessment or a source of current performance data for the historical 2019–2023 Plan. See [`docs/release17-pass7-integration-and-deployment-qa.md`](docs/release17-pass7-integration-and-deployment-qa.md).


## Release 17 · Pass 8 — HTTP deployment smoke test

**v2.33.0** adds a reproducible local HTTP smoke test that serves the static project over HTTP and requests the app entry point, every local script and stylesheet referenced by `index.html`, and every service-worker precache entry. It checks HTTP success, expected content availability, and release/cache metadata. Run `node tests/deployment-smoke.js` after `node tests/validate.js`. This verifies that the project can be served and its declared assets are reachable in a local HTTP environment; it does **not** establish successful live GitHub Pages deployment, iOS Safari behavior, browser interaction, printing, or offline reload. Those require the manual checklist in [`docs/release17-pass8-http-smoke-and-acceptance.md`](docs/release17-pass8-http-smoke-and-acceptance.md). The Plan remains a 2019–2023 historical source, and learning/educator records remain browser-local unless a user exports them.


## Release 18 · Pass 1 — Integration audit and local-data workflow

**v2.35.0** begins Release 18 with an integration audit of navigation, local assets, service-worker cache coverage, release metadata, and learning-data portability. The audit identified that the longitudinal educator review-cycle store was locally saved and separately exportable, but was missing from the unified learning-backup and reset inventory. Pass 1 adds that store to the recognized backup/import/reset categories and adds regression checks. Import/export remains user-controlled and browser-local until a file is deliberately shared. The review-cycle data is a formative workflow record, not evidence of competency.

Automated checks cover static integration contracts and a local HTTP smoke test. Live GitHub Pages, interactive browser, print, and offline reload behavior still require manual acceptance testing; this release does not claim those browser checks have passed.


## Release 18 · Pass 2 — Learning-data integrity and recovery

Version v2.35.0 adds stricter backup validation, payload-size limits, validation of the educator review-cycle array format, and transaction-like rollback if an import write fails. See `docs/release18-pass2-data-integrity-and-recovery.md`. Rollback is best-effort because browser storage may continue failing; keep a separate backup before importing important records. Automated checks do not replace live-browser acceptance testing.



## Release 19 · Pass 1 — Comprehensive Study Guide

**v2.38.0** expands the Study Guide from a concise overview into a structured learning resource across all 10 existing topics. Each topic now includes learning objectives, deeper source-grounded study notes, key distinctions, high-yield exam focus points, and primary source locators. The expansion preserves the supplied Plan’s historical scope and explicitly flags source inconsistencies or unresolved extraction issues rather than filling gaps by inference.

The Study Guide remains based on the supplied *National Mental Health Strategic Plan 2019–2023*. Historical statistics, targets and proposed budgets are not presented as current achievements. Legal provisions remain subject to exact Act/IRR verification when used for legal or clinical decision-making.

## Release 18 · Pass 4 — Browser acceptance and deployment readiness

**v2.37.0** consolidates the release acceptance checklist and re-runs the automated integration and local HTTP deployment checks. The local HTTP smoke test verifies that every declared local route/asset returns a non-empty HTTP 200 response and that the service-worker cache version matches the visible app version. An attempted Chromium acceptance run was blocked by this execution environment's browser policy, which prevents opening both localhost and `file://` pages. Therefore no successful real-browser interaction, service-worker installation, offline reload, live GitHub Pages, or iOS Safari result is claimed. Complete the manual checklist in `docs/release18-pass4-browser-acceptance.md` after deployment.


## Release 18 · Pass 3 — Full learning-data workflow tests

**v2.36.0** adds regression coverage for the lifecycle of every recognized browser-local learning-data category: representative records are serialized as a backup, validated, restored into isolated storage, and compared after round-trip. Tests also cover partial restore boundaries, preservation of theme and unrelated application data, alignment between the centralized store inventory and full-reset behavior, guarded export errors, cancelled file selection, and confirmation before restore. The fixtures verify data-portability contracts; they do not run a real browser or prove that every interactive screen saves correctly on iOS. Live HTTPS, mobile Safari, service-worker installation, offline reload, and hands-on create/save/reload testing remain manual acceptance checks.
