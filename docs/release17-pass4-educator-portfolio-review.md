# Release 17 · Pass 4 — Educator review workflow

## Delivered
- Added a voluntary learner-provided MindPlan portfolio JSON import to Educator Mode.
- Import is limited to the portfolio summary format (`mindplan-learning-portfolio-summary`, schema version 1), capped at 2 MB, parsed locally, and not written to localStorage or transmitted.
- Review display separates activity counts, objective attempts, and learner reflection.
- Added a four-domain formative discussion rubric: source fidelity/boundaries; reasoning/justification; feasibility/coordination; monitoring/limitations.
- Added print / Save as PDF review sheet with learner-provided goals/reflection, review selections, and feedback notes.
- The review does not calculate a total, pass/fail result, or competency score.

## Privacy and evidence boundaries
- The learner must voluntarily choose to share the export.
- The imported file may contain sensitive reflections. Use only with consent, avoid identifiable patient/colleague information, and close the page after review.
- Import is in-memory only; the app does not save the imported portfolio. A generated print sheet can of course be saved or shared by the user.
- Activity counts and self-reflection are not validated competency evidence. The source Plan covers 2019–2023; historical targets are not current achievements.

## Manual verification still required
Test on desktop and mobile: valid portfolio import; malformed/unsupported JSON; file over 2 MB; popup-blocked print action; print layout; no storage/network writes during import; keyboard and screen-reader navigation.
