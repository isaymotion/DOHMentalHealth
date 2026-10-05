# Release 17 · Pass 2 — Learning Evidence Portfolio

## Delivered
- Added a Learning Portfolio navigation destination.
- Aggregates existing local records for fictional case completion, objective assessment attempts, Study Guide marks, High-Yield Revision marks, oral/OSCE sessions, and flashcards marked mastered.
- Separates objective question results from self-ratings, drafts, and short-answer checklist activity.
- Adds locally saved learner goals/reflection and a downloadable JSON portfolio summary.
- Exported summary labels itself as descriptive, device-local learning activity and not a validated competency assessment.
- No backend, account, or cloud learner tracking introduced.

## Interpretation and privacy boundaries
- Completion indicates an action was recorded, not quality of performance.
- Objective assessment results apply only to the questions attempted; attempts may overlap.
- Oral ratings, drafts, and short-answer self-checks are self-assessment.
- Avoid entering identifiable patient or colleague information in reflections.
- Portfolio export may contain personal reflections and should be stored/shared carefully.
- The National Mental Health Strategic Plan is for 2019–2023; historical targets are not evidence of current achievement.

## QA
Automated source/route/cache and syntax checks should be run with `node tests/validate.js` and `node --check js/app.js`. Browser testing remains required for navigation, local save/export, responsive layout, and offline reload.
