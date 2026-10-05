# MindPlan Release 14 — Pass 1
## High-yield revision architecture and content map

**Status:** Pass 1 planning artifact; no learner-facing UI changes in this pass.

**Release goal:** Add an exam-oriented revision layer over the existing Study Guide, assessment bank, flashcards, quick reference, strategic framework and source-citation tools. The revision layer should help learners retrieve and compare source material quickly without implying that MindPlan knows the content of an official examination.

**Primary source:** Philippine Council for Mental Health, *National Mental Health Strategic Plan 2019–2023*, supplied 126-page PDF. The Plan is historical. Its targets and proposed budgets must not be presented as current status, actual expenditure or proof of achievement.

## 1. Audit of the current learner-facing baseline

The current Study Guide data has ten ordered topics:

1. What the Plan is and why it was developed (`plan-purpose`)
2. Vision, mission, and three goals (`vision-mission-goals`)
3. Strategic framework and four pillars (`framework-pillars`)
4. Policy context and the Mental Health Act mandate (`policy-context`)
5. Situation, policies, and system gaps (`situation-gaps`)
6. Plan development and implementation approach (`plan-development`)
7. Outcomes, indicators, and evaluation (`outcomes-indicators`)
8. Annex 1 — Mental Health Act (RA 11036) (`annex-act`)
9. Annex 2 and Annex 3 — IRR, monitoring, and evaluation (`annex-irr-me`)
10. Annexes 4–5 — budget, scorecards, and references (`annex-budget-scorecards`)

Existing revision-adjacent features include objective and short-answer assessment items, timed assessment sessions, oral-exam stations, flashcards with local review states, the searchable quick-reference center, the strategic framework view, and clickable source references. Release 14 should connect and curate these capabilities rather than duplicate them unnecessarily.

### Baseline limitations to preserve

- Current assessment items vary in topic coverage and source granularity; do not assume the existing bank exhaustively covers all ten topics.
- The Act overview is a navigation aid, not a verified section-by-section legal index.
- The IRR is scanned legal text and is not cleared for rule-by-rule testing.
- Detailed M&E target rows and agency scorecards are not all visually verified.
- Selected narrative tables/charts, the truncated CRPD passage, theory-of-change diagram relationships, and exhaustive bibliography checks remain open in Release 13 Pass 5.
- Existing historical targets and proposed budget figures are not actual achievements or expenditure.

## 2. Revision information architecture

Proposed learner-facing sections within a dedicated **High-Yield Revision** page:

1. **Rapid review** — concise cards covering the Plan's purpose, historical period, vision/mission/goals, framework, pillars, outcome structure, and core interpretation cautions.
2. **Topic review** — filterable summaries mapped to the ten Study Guide topics.
3. **Compare and distinguish** — side-by-side concepts that are easy to conflate (for example goals vs pillars vs outcomes; activity/output vs outcome; target vs result; Act vs IRR; budget proposal vs expenditure; scorecard performance bands vs no-data/not-applicable statuses).
4. **Active recall** — prompts first, then answer/explanation reveal; include source locator and a verification flag when relevant.
5. **Mixed review** — draw from approved items across topics, with optional topic and question-type filters.
6. **Review again** — locally track items marked “Again,” “Difficult,” or “Mastered,” and topics/questions answered incorrectly.

This is a proposed architecture, not a claim that these UI sections already exist.

## 3. Content inventory and priority

Priority definitions:
- **P1 — Core:** directly stated, foundational, and suitable for rapid recall once checked against current source notes.
- **P2 — Interpretive:** requires understanding or comparison; label any explanatory synthesis as a learning explanation.
- **P3 — Verification-gated:** do not author definitive answer keys until the named source issue is resolved.

| Study Guide topic | High-yield revision units | Proposed retrieval format | Priority / gate |
|---|---|---|---|
| 1. Plan purpose | Purpose and scope; 2019–2023 period; strategic plan vs clinical guideline vs post-period evaluation; outputs, activities, targets, agencies and monitoring | One-minute summary; classify-the-statement prompts | P1, while retaining historical caveat |
| 2. Vision, mission, goals | Exact vision and mission; three distinct goal statements | Exact-phrase recall; goal matching; fill-in prompts | P1; preserve source wording |
| 3. Framework and pillars | Staging, biopsychosocial, balanced care, rights-based and recovery approaches; four pillar names; goals/pillars/outcomes/outputs/activities distinctions | Framework reconstruction; matching; compare table | P1/P2; diagram spatial relationships remain verification-gated |
| 4. Policy context | RA 11036 and IRR context as described by the Plan; PCMH role as described in the Plan; implementation mandate | Statement classification; source locator cards | P1 for claims already supported by current notes; exact legal sections gated |
| 5. Situation, policies and gaps | Historical situation reported by the Plan; policy context; documented service/system gaps; careful interpretation of historical statistics | Theme summaries; “what can/can't be concluded?” prompts | P2; extracted statistics/charts and truncated CRPD passage gated where noted |
| 6. Plan development | Consultation/development process and the Plan's implementation approach | Sequence recall; concise summary; stakeholder/process matching | P2; use only content supported in Pass 2 notes |
| 7. Outcomes, indicators and evaluation | Five outcomes; indicator components; baseline vs target vs observed result; numerator/denominator; means of verification; TBD/proxy/missing fields | Concept distinctions; table-reading exercises | P1 for general concepts; target-row quizzes gated until visual verification |
| 8. Annex 1 — Act | Purpose of the annex; broad themes to locate in the Act; Act vs IRR | Navigation prompts; theme matching | P3 for section-specific legal recall until full index verified; not legal advice |
| 9. Annexes 2–3 — IRR and M&E | Why IRR page-image verification matters; M&E field anatomy; planned vs measured values | Error spotting; field-identification exercises | P3 for rule-specific items and detailed target rows; no invented legal text |
| 10. Annexes 4–5 — budget, scorecards, references | Verified proposed budget table; five scorecard statuses; 13 named scorecards; reference-use cautions | Table recall; status interpretation; calculation/check prompts | P1 for verified budget alignment and legend; P3 for unverified scorecard row values and exhaustive references |

## 4. Core comparison set

The revision layer should explicitly teach these distinctions because confusing them creates misleading answers:

- **Vision / mission / goals / pillars / outcomes / outputs / activities:** different levels of the strategic architecture; never collapse them into interchangeable labels.
- **Plan target / baseline / observed result:** a target is intended performance, not proof of achievement; a baseline is a reference point; observed result requires data.
- **Indicator / means of verification / data source:** related but not interchangeable fields; preserve the source's terminology.
- **Act / IRR / strategic plan:** separate legal and planning documents; do not infer rule text from a general Act summary.
- **Proposed budget / appropriation / actual expenditure:** only the first is represented by the verified budget summary in this app's current notes.
- **Red / yellow / green / no data / not applicable:** keep all five scorecard status meanings; a blank field alone proves neither success nor failure.
- **Source statement / learning explanation / unresolved source detail:** visibly label each type.

## 5. Question-authoring contract

Every new or reused revision item must carry:

- Stable question ID and topic ID.
- Question type and difficulty tag (difficulty is an editorial estimate, not psychometric calibration).
- Prompt, choices when applicable, correct key, and explanation for each choice.
- Source locator using the most reliable available page convention; annexes should use PDF page numbers as stable locators where internal pagination differs.
- A short source excerpt or paraphrase traceable to the Plan.
- Content status: `source-supported`, `learning-interpretation`, or `verification-gated`.
- For numeric or table-derived items, a recorded check against the page image before enabling the item in scored review.

Do not create questions whose key depends on unresolved target-year alignment, unverified legal section numbers, incomplete agency scorecard rows, OCR-uncertain statistics, or assumptions about what an official exam will ask. Distractors may be pedagogically plausible, but explanations must not attribute unsupported claims to the Plan.

## 6. Existing feature reuse map

| Existing feature | Release 14 use | Avoid |
|---|---|---|
| Study Guide | Canonical topic content and source locators | Duplicating full chapter text into a second unmaintainable copy |
| Assessment bank | Reuse items only after checking tags, keys, explanations and citations | Treating current bank as exhaustive or psychometrically validated |
| Flashcards | Reuse local Again/Difficult/Mastered review pattern where technically feasible | Claiming clinical spaced-repetition validation |
| Quick reference | Fast lookup for glossary, agencies, indicators and selected historical targets | Presenting selected tables as exhaustive |
| Strategic framework | Visual review and concept relationships | Reproducing uncertain diagram geometry as exact |
| Source & citations | Open source locator for each claim | Unverified section-level legal links |
| Local progress | Store review states in browser localStorage | Implying accounts, cross-device sync or server-side analytics |

## 7. Proposed data model for Release 14 content

Recommended normalized records, whether implemented in one or more JavaScript files:

- `revisionTopics`: `{ id, title, sourceTopicId, summary, priority, estimatedMinutes }`
- `revisionCards`: `{ id, topicId, kind, front, back, explanation, source, pageLocator, status, tags }`
- `revisionQuestions`: `{ id, topicId, type, difficulty, prompt, choices, correct, explanations, source, pageLocator, status, tags }`
- `comparisonSets`: `{ id, title, concepts, distinction, example, source, status }`
- `revisionState`: local-only per-item status, last-reviewed timestamp if available without a server, and incorrect/again flags.

This is a schema proposal, not a requirement to split files if the current app architecture supports a simpler implementation. The content should remain data-driven and searchable, with UI rendering separated from source content where practical.

## 8. Pass 1 acceptance checklist

- [x] Audited the ten current Study Guide topic IDs and titles.
- [x] Identified existing revision-adjacent features to reuse.
- [x] Mapped all ten topics to high-yield revision units and retrieval formats.
- [x] Defined P1/P2/P3 priority and verification gates.
- [x] Listed the high-risk conceptual distinctions to teach explicitly.
- [x] Defined minimum source traceability and answer-key requirements.
- [x] Documented source limitations that must carry forward from Release 13.
- [x] Proposed a data model and local-progress boundaries.
- [ ] Pass 2: write concise source-mapped summaries and rapid-review cards.
- [ ] Pass 3: produce and source-check comparison tables.
- [ ] Pass 4: author/curate active-recall questions with a verification ledger.
- [ ] Pass 5: implement the learner-facing High-Yield Revision page.
- [ ] Pass 6: test content coverage, app behavior, accessibility, offline cache, and release package.

## 9. Pass 1 decision log

1. Release 14 adds a revision layer rather than replacing the Study Guide.
2. The ten existing Study Guide topics are the canonical coverage spine for this release.
3. Existing questions/cards can be reused only after metadata and answer-quality checks.
4. The revision mode must visibly distinguish source-supported content, learning interpretation and verification-gated material.
5. No official exam blueprint, exam prediction, or validated difficulty calibration is claimed.
6. All learner review state remains local to the browser unless a later, explicitly designed architecture changes that constraint.
7. Source uncertainties documented in Release 13 remain open until verified against the source PDF; Release 14 must not conceal them.

**Pass 1 result:** Content architecture is defined. No app interface or learner data has been changed by this pass.
