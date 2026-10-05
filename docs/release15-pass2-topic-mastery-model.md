# MindPlan Release 15 — Pass 2: Topic Mastery Model

**Status:** Model and pure derivation helper implemented; dashboard integration is deferred to Pass 5.  
**Baseline:** v2.14.0, local/offline-first. This pass does not change the app version or persist new data.

## Purpose and guardrails

The model gives learners a transparent *study-priority signal*, not a clinical competence rating. It deliberately avoids one blended score. Objective item accuracy and short-answer checklist self-checks remain separate. A topic with no objective responses remains **Not assessed**; a topic with fewer than three distinct answered objective items is **Limited data**, regardless of its percentage.

## Objective evidence rules

1. Include single-best-answer, true/false, and select-all items only.
2. An item counts only when an answer was recorded; for select-all, it must have been submitted.
3. For each distinct question ID, use its latest answered response in the retained assessment history. Repeated attempts at the same item do not inflate the distinct-item sample size.
4. Accuracy = correct latest responses / distinct items with a recorded response. The dashboard should show both numerator and denominator.
5. Topic bands, after at least three distinct items:
   - **Needs review:** below 60%.
   - **Developing:** 60% to below 80%.
   - **Strong evidence:** 80% or above.
6. With one or two distinct answered items, show **Limited data**, not a low-mastery band. With zero, show **Not assessed**.

These thresholds are transparent product heuristics selected for formative study guidance; they are not psychometrically validated and must not be presented as clinical competence or source-derived thresholds.

## Short-answer self-check

Short-answer checklist marks are summarized separately as checked checklist elements / available checklist elements, with response count. This is self-reflection, not semantic answer grading and not part of objective accuracy. The helper reads the existing `shortChecks` records and does not retain or copy free-text response content.

## Data and history limitations

- Uses existing retained attempts; the current app caps history at 30 attempts. Results therefore describe the retained history, not lifetime performance.
- A distinct item’s latest answered response is selected across retained attempts. Unanswered later appearances do not erase a previous answered response.
- Topics without objective items can still show a separate short-answer self-check, but remain **Not assessed** for objective evidence.
- No event log, migration, localStorage write, scheduler, dashboard, or new claim about streaks is added in Pass 2.
- Question topic labels and answer keys come from the existing standard and Release 14 banks. The model does not alter source content.

## Implementation

`js/mastery-model.js` is a pure helper with no DOM, network, or persistence access. It exports `evaluateObjective` and `deriveTopicMastery` for browser and Node use. Pass 5 can consume the result for dashboard cards; Pass 6 should address backup/import and privacy flows, and Pass 7 should complete browser/offline QA.

## Pass 2 acceptance checks

- No response is not counted as incorrect evidence.
- Repeat attempts for the same item count once, using the latest answered response.
- Multi-select requires an exact set match.
- The minimum sample is based on distinct item IDs, not raw attempt count.
- Short-answer checklist data are never merged into objective accuracy.
- Threshold boundary cases (59%, 60%, 79%, 80%) are covered by tests.
- No persistence or network dependency is introduced.
