# Release 17 · Pass 5 — Longitudinal educator review cycle

**Version:** v2.30.0 · October 2026

## Purpose

Support continuity between voluntary formative educator conversations without introducing accounts, a backend, or automatic learner tracking.

## Included

- Optional non-identifying learner code.
- Initial review date and follow-up date, with date-order validation.
- Agreed learning goal, planned practice/support, and review agreement/boundaries.
- Dated follow-up reflections appended to the latest saved review plan.
- Device-local storage, explicit JSON export, printable progress summary, and a delete action.

## Privacy and limitations

The review cycle is stored in the current browser's local storage. Exporting creates a file that the user controls and may share; printing can create a persistent document. Avoid names, patient details, and other sensitive identifiers. Review plans are not synced across devices and are not transmitted by the app. A learner code should be non-identifying. The tool supports formative discussion only and does not produce competency scores, pass/fail outcomes, or validated assessments.

## Source boundary

The app's curriculum basis remains the Philippine National Mental Health Strategic Plan 2019–2023. The review-cycle workflow is an educational tool, not a feature or requirement specified by the Plan. Historical Plan targets must not be represented as current achievements.

## QA

Static checks cover expected UI controls, local storage key, export/print actions, deletion action, and service-worker version alignment. Browser testing of date controls, local persistence, printing, and offline behavior remains a manual deployment check.
