# Release 16 Pass 6 — Educator Mode

## Implemented
- Added an Educator Mode navigation destination.
- Select one fictional case, one OSCE/viva station, or both for a printable teaching pack.
- Configure a session duration and learner-group context.
- Add optional facilitator notes, preview the pack outline, and open a print-friendly document that can be printed or saved as PDF.
- Include learning objectives, case scenario, station prompt, follow-up questions, and source-boundary/indicator discussion prompts when relevant.
- Preserve local-only behavior; no learner tracking, remote transmission, or new persistent data store is introduced.

## Safeguards
- Case material is fictional and educational, not a clinical protocol.
- The strategic plan is historical (2019–2023); current local requirements and outcomes need separate verification.
- Rubrics and prompts are formative and are not validated competence measures.
- Facilitators should avoid including identifiable learner or patient information in notes.

## QA
Automated tests validate navigation, content assembly, print action, privacy/source-boundary language, and service-worker version/cache registration. Browser print behavior and mobile layout still require manual testing on the deployed HTTPS site.
