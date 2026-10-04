# MindPlan — Mental Health Strategic Plan Study Guide

A responsive, static web app for psychiatry residents studying the **Philippine Council for Mental Health, *National Mental Health Strategic Plan 2019–2023***. It is designed for GitHub Pages and runs without a backend, build step, analytics, external libraries, or AI service.

## Features
- Ten fictional interactive learning cases with branching decisions, SDoMH mapping, action planning, monitoring, and debriefs
- Whole-app search with destination labels and keyboard support
- Clickable source citations that open a reference dialog with claim/summary, printed page, PDF page, and a link to the DOH-hosted PDF at the relevant PDF page
- Interactive strategic framework: vision → mission → goals → pillars → outcomes → outputs and activities
- Sixteen source-linked flashcards with local Again / Difficult / Mastered review scheduling
- Browser-local case completion and flashcard review state; no account, backend, analytics, or cloud learner tracking
- Responsive dark theme with light-mode toggle
- Service-worker caching for repeat visits/offline use after the first successful load
- Clear distinction between source statements, learning interpretations, and proposed measures; 2019–2023 targets are historical

## Deploy to GitHub Pages
1. Create a GitHub repository and upload the contents of this folder to its root.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. Wait for GitHub Pages to publish the site. Open the provided Pages URL.

No Node.js, package installation, or build command is required.

## Content and citations
This study guide summarizes only the source document listed below. Page references are given as **printed page · PDF page**. For the main body, PDF pages are generally 14 pages after the printed page (for example, printed p. 23 is PDF p. 37). Front matter uses Roman numerals and does not follow that offset. Annex page references use the printed pagination shown in the document's table of contents.

**Primary source:** Philippine Council for Mental Health. *National Mental Health Strategic Plan 2019–2023*. Department of Health / Philippine Council for Mental Health. Source PDF: `Mental-Health-Strategic-Plan.pdf` (provided separately; not redistributed in this repository).

The plan describes intended activities and targets for 2019–2023. Those targets are historical planning targets, not evidence of present-day implementation or achievement. This app does not independently verify current status and should not replace the source document for formal citation or policy interpretation.

## Local data
Study progress, quiz scores, theme choice, and bookmarks are stored in this browser's `localStorage`. They are not sent to a server. Clearing browser site data will remove local progress.

## Release 2 — Interactive Clinical Learning (Pass 3)

The Pass 1 blueprint and the expanded eight-case fictional library are connected to a static, browser-based interactive case engine. Open `index.html` locally or deploy the folder to GitHub Pages; no build step or backend is required.

### Interactive case flow
- Eight cases spanning service access, school promotion, local governance, data quality, disaster-related psychosocial support, rights and participation, workforce capacity, and integrated local planning
- Branching decision points with immediate authored feedback and a transparent rating
- SDoMH mapper for scenario cues, protective factors, and information gaps
- Four-pillar intervention planner with example actions explicitly labeled as learning interpretations
- Monitoring and evaluation fields for indicator, numerator/denominator, data source, limitations, and rationale
- Review checklist, formative completeness score, debrief, reflection prompt, and source anchors
- Browser-local completion status, exportable progress JSON, dark/light theme, responsive layout, and optional offline caching

### Pass 3 limitations
- The eight-case library is an expanded learning draft; additional cases and user testing may still be useful.
- Citation page mappings were checked against the supplied source PDF in Pass 4; this verifies page mapping and section support, not achievement of historical targets.
- The formative score is an educational checklist, not a validated competency measure or pass mark. Free-text responses are not automatically graded.
- The app is a learning companion, not a clinical practice guideline. Verify current local services and protocols separately.
- The Plan's 2019–2023 targets are historical planning targets, not evidence of present-day implementation or achievement.

The detailed architecture and content contract remain in `docs/release2-blueprint.md`, `data/release2/cases.json`, and `data/release2/case-schema.json`.

## Attribution
This app was created by Isabella Navarro, MD. Latest version October 2026. isaymotion@gmail.com

## Versioning
- **v2.3.0 — October 2026:** Pass 4 citation audit and QA updates for the eight-case interactive learning library.
- **v1.0.0 — October 2026:** Initial study-guide design milestone.

## License / source rights
The app code is provided for reuse and adaptation. The source strategic plan remains the property of its respective rights holders; consult the original publication for its terms and acknowledgements. The source PDF is intentionally not bundled.


## Pass 4 — Citation verification and QA

- Checked the case-library printed-page/PDF-page mappings against the supplied *National Mental Health Strategic Plan 2019–2023* PDF.
- Corrected the LGU service-coverage indicator citation to printed p. 34 / PDF p. 48.
- Citation checks establish page mapping and section support only; 2019–2023 targets remain historical and are not claims of current achievement.
- Added a repeatable static validation suite (`node tests/validate.js`) for case structure, choices, citations, assets, mobile breakpoints, local progress/export, and cache version. Browser-based navigation was attempted, but the execution environment blocked both local HTTP and file URLs; real-browser interaction and offline behavior still require manual deployment checks.
- Updated the app and service-worker cache version to 2.2.0.


## Release 2 — Pass 5

The interactive case library now follows the requested ten-case curriculum. Three distinct cases were added: The Barangay Referral Gap, The Person Behind the Policy, and The Funding Proposal. Four existing cases were retitled to match the proposed curriculum, and the unrelated Workforce Capacity Gap bonus case was removed to keep the library at ten. See `docs/pass5-case-coverage.md`.


## Global navigation update (v2.4.0)
- Added a prominent, always-visible **Back** button. Inside a case it returns to the previous learning step; from a case introduction it returns to the case library; elsewhere it returns to the previous app section or Overview.
- Added a whole-app search field in the header. It searches case titles, scenarios, learning objectives, decisions and choice feedback, determinant/protective-factor options, pillars, monitoring tasks, debriefs, source anchors, and the main app sections.
- Search results label the destination (for example, **Case: The School Campaign → Decision** or **Four pillars**) and open the relevant case step or section.
- Keyboard support: **Ctrl/⌘ + K** focuses search, **Enter** opens the first result, **Arrow Down** focuses the first result, and **Escape** closes results.
- Updated the service-worker cache version so deployed clients fetch the new navigation assets.


## Pass 6 — Evidence-linked learning (v2.5.0)

- Added clickable source citation buttons. Selecting one opens an accessible reference dialog with the claim/summary, printed and PDF page references, a source-linked excerpt/note, and a link to the DOH-hosted source PDF.
- Added an interactive strategic framework visual for vision → mission → goals → pillars → outcomes → outputs and activities. Each node has a source-linked explanation. The diagram communicates the Plan's stated structure, not a guarantee of causal impact.
- Added 16 source-linked flashcards for vision, mission, goals, pillars, outcome areas, framework relationships, agency responsibility tables, indicators, and interpretation of historical targets.
- Added local flashcard review states: Again (due now), Difficult (due in one day), and Mastered (due in seven days). These are deliberately simple review intervals, not a validated spaced-repetition algorithm.
- Flashcard progress is stored in browser localStorage and is not uploaded. Case completion data remains in its existing local storage key.
- The source is the National Mental Health Strategic Plan 2019–2023. Historical targets are not presented as current performance or evidence of achievement.

### Pass 6 validation

Run `node tests/validate.js` and `node --check js/app.js`. Real-browser testing is still recommended for modal behavior, mobile layout, offline caching, and localStorage persistence.
