# Release 2 — Interactive Clinical Learning Blueprint

**Status:** Pass 4 complete — eight fictional cases, source page mappings checked against the supplied PDF, and browser QA completed where the environment permits  
**Project:** MindPlan — Mental Health Strategic Plan Study Guide  
**Primary source:** Philippine Council for Mental Health, *National Mental Health Strategic Plan 2019–2023* (source PDF supplied separately)

## Purpose and scope

Release 2 teaches psychiatry residents to apply the policy and health-system framework of the National Mental Health Strategic Plan to fictional Philippine scenarios. It is a policy-application learning tool, not a clinical practice guideline, legal opinion, or substitute for local protocols and supervision.

### Learning objectives

By the end of Release 2, a learner should be able to:

1. Distinguish statements explicitly made in the Strategic Plan from educational interpretation and information not specified by the source.
2. Identify social determinants, service barriers, and protective factors at individual/interpersonal, community, service-system, and policy/governance levels.
3. Relate a proposed intervention to one or more of the Plan's four pillars: Promotion and Prevention; Leadership and Governance; Services; Information and Research.
4. Propose a feasible, coordinated action plan that names relevant stakeholders, implementation considerations, and assumptions.
5. Select an indicator that is aligned with a stated objective, identify its data source or verification method, and recognize data limitations.
6. Explain why an answer is strong, incomplete, or unsupported using source citations.
7. Reflect on rights, participation, equity, and the role of people with lived experience where relevant to the scenario.

## Learning architecture

Each case follows this sequence:

1. **Briefing:** fictional context, learning objectives, and case-specific disclaimer.
2. **Decision point(s):** 2–4 choices with plausible trade-offs. Branches change feedback or the next prompt, not the underlying source facts.
3. **SDoMH mapping:** identify determinants/barriers and protective factors at multiple levels.
4. **Four-pillar planning:** map proposed actions to any relevant pillar(s); do not force a single-pillar answer.
5. **Monitoring:** choose an indicator, data source, reporting interval (only if supported or explicitly proposed), and a limitation.
6. **Debrief:** model reasoning, alternative defensible approaches, source notes, and a reflection prompt.

### Content labels

- **Source says:** directly supported by the Strategic Plan, with page citation.
- **Learning interpretation:** a teaching application or inference from the source; explicitly labeled as such.
- **Not specified by source:** details the Plan does not establish. The app must not fill these gaps with invented policy or claim current implementation status.

### Source citation convention

Display **Printed p. X · PDF p. Y** whenever both pagination systems can be verified. Cite the exact relevant page(s), not merely a broad section. Printed page numbers and their corresponding PDF page numbers were checked against the supplied PDF on 4 October 2026. The check verifies page mapping and section support, not achievement of any target. Historical plan targets (2019–2023) must be labeled as historical targets, not current outcomes. The source PDF is not redistributed with the repository.

## Case data contract

The eight cases in `../data/release2/cases.json` share the same data contract. Each case should contain:

- `id`, `title`, `level`, `estimatedMinutes`, `learningObjectives`
- `scenario` and `contextNotes` (fictional; avoid identifying real people or facilities)
- `sourceAnchors[]` with a short source-supported claim and citation object
- `decisionPoints[]` with `id`, `prompt`, `choices[]`, `feedback`, `nextStep`, and optional `branchNote`
- `determinantOptions[]` grouped by level and tagged as scenario cues or learner-generated possibilities
- `protectiveFactorOptions[]`
- `pillarOptions[]` with action examples and source/interpretation labels
- `monitoringTask` with objective, candidate indicators, data-source prompt, and limitations prompt
- `debrief` with key takeaways, common pitfalls, and reflection question
- `reviewChecklist[]` and `tags[]`

Choices are not a clinical decision engine. For pilot cases, score the learner's policy reasoning and systems thinking; do not score a fictional person's diagnosis or treatment selection. A case can accept multiple defensible responses when justified.

## Scoring rubric (per case, 100 points)

| Domain | Weight | Full-credit behavior |
|---|---:|---|
| Determinants and protective factors | 25 | Identifies relevant factors at multiple levels and separates scenario facts from assumptions. |
| Feasible, coordinated actions | 25 | Proposes actionable steps, appropriate stakeholders, and practical constraints. |
| Four-pillar integration | 20 | Connects actions to relevant pillars without treating them as mutually exclusive. |
| Monitoring and data reasoning | 20 | Selects an aligned indicator, identifies a plausible data source, and names a limitation. |
| Rationale and uncertainty | 10 | Explains the reasoning, acknowledges uncertainty, and uses source citations appropriately. |

### Feedback bands

- **Strong (80–100):** coherent multi-level reasoning, feasible actions, appropriate source use.
- **Developing (60–79):** useful elements present, but one or more levels, stakeholders, pillars, or measurement issues are underdeveloped.
- **Revisit (<60):** important gaps or unsupported assumptions need attention.

These bands are educational design choices, not validated assessment cutoffs. For free-text tasks, the initial release should use a self-assessment checklist and model response rather than automatic AI grading. Decision-choice feedback should explain trade-offs; avoid implying that every complex systems question has one universally correct answer.

## Case library (Pass 3)

1. **The Missed Follow-up** — service access and continuity.
2. **The School Campaign** — promotion, participation, and evaluation.
3. **The Local Governance Roundtable** — coordination and accountability.
4. **Data Without Denominators** — information quality and cautious interpretation.
5. **After the Typhoon** — disaster-related psychosocial support and local coordination.
6. **Rights at the Service Desk** — rights, participation, and careful avoidance of unsupported legal conclusions.
7. **The Workforce Capacity Gap** — service capacity and implementation feasibility.
8. **The Local Mental Health Action Plan** — cross-pillar planning, resources, and monitoring.

The six added cases are authored learning drafts. Their source page mappings were checked against the supplied PDF in Pass 4; case interpretations remain educational applications rather than quotations from the Plan.

Case-library acceptance criteria:

- Every source-based claim has a verifiable page citation.
- Every interpretation is labeled as interpretation.
- No historical target is represented as a current achievement.
- No clinical or legal rule is invented from the policy plan.
- All branches reach a debrief and completion state.
- The case can be completed with keyboard or touch input and is readable on mobile.
- A learner can review their selections and reset the case.

## Release 2 non-goals

- No accounts, cloud sync, analytics, or personally identifying learner data.
- No real patient case data.
- No automated diagnosis or treatment recommendations.
- No claim that the app is an official DOH/PCMH product.
- No assertion that the 2019–2023 plan's targets were achieved unless independently verified in a separately labeled future update.

## Attribution

This app was created by Isabella Navarro, MD. Latest version October 2026. isaymotion@gmail.com
