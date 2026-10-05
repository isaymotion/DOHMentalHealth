# MindPlan Release 15 — Pass 1: Learning Analytics Audit

**Status:** Audit complete; no learner-facing behavior changed in this pass.  
**Baseline inspected:** MindPlan v2.14.0, static GitHub Pages app, October 2026.  
**Storage decision:** Device-only, offline-first. No account, backend, telemetry, or cloud sync is in scope.

## 1. Executive summary

MindPlan already has several independent browser-local progress stores and enough signals to build a useful first dashboard, but it does not yet have one canonical learning record. Release 15 should add a small, versioned local learning-data layer that reads the existing stores safely, derives transparent metrics, and gradually becomes the common write path without discarding older progress.

Current automated checks pass. Real-browser persistence, migration, mobile interaction, and service-worker/offline behavior have not been verified in this execution environment and remain deployment checks.

## 2. Existing local data inventory

| Store/key | Current shape / useful signals | Current limitations |
|---|---|---|
| `mindplan-release2-state-v1` | `{ completed: { [caseId]: { completedAt, ... } }, saved: { ... } }` | Case completion and saved notes are in a legacy case-specific store. The Progress page's export/reset actions operate on this store only. |
| `mindplan-assessment-v1` | `{ attempts: [], topics: {}, best: {} }`; attempts retain timestamp, mode, score, total, question IDs, answer data, bank identity, topic results, and short-answer checklist state. | Up to 30 attempts are retained. `topics` is cumulative and does not provide a time series by itself. Existing `best` is initialized but its usage must be verified before relying on it. Scores mix objective answers and self-check-based short answers unless the UI distinguishes them. |
| `mindplan-flashcards-v1` | Object keyed by flashcard ID; status and due date support new/due/mastered counts. | Review history is overwritten by the latest state; no durable review-event series or explicit rating timestamp is guaranteed. Current intervals are intentionally simple, not validated spaced repetition. |
| `mindplan-study-guide-v1` | Object keyed by Study Guide topic; includes answer/completion state. | Completion and quiz answer correctness are bundled in topic records; no timestamps or attempt history. |
| `mindplan-high-yield-revision-v1` | `{ reviewed: {}, lastTopic: 'all' }` in current initialization. | A reviewed mark is binary and does not record when reviewed or how confident the learner felt. |
| `mindplan-oral-v1` | `{ drafts: {}, ratings: {}, sessions: [] }` with local drafts, self-ratings, and session summaries. | Session schema and draft/checklist lifecycle need a deeper code-level review before normalization. Draft text is user-authored and should be treated as private local data. |
| `mindplan-theme` | `'light'` or `'dark'` | UI preference, not learning data; preserve separately from progress export unless user chooses a full settings backup. |

All identified application persistence uses `localStorage`; no network analytics or learner backend was found in the inspected app/service-worker code. Browser storage may be unavailable or cleared, so persistence must remain best-effort and exportable.

## 3. Current features relevant to Release 15

- A case-completion progress page with local export and reset controls.
- An assessment runner with practice, timed exam, short-answer self-check, and the integrated 30-item Release 14 bank.
- Cumulative topic correctness totals and per-attempt topic breakdowns.
- Flashcards with Again / Difficult / Mastered states and due dates.
- Study Guide completion marks and High-Yield Revision reviewed marks.
- Oral-exam drafts, self-ratings, and saved sessions.
- Service-worker precaching for the app shell and current data scripts.

These features should be reused rather than duplicated. The first dashboard should clearly state which activity types contribute to each metric.

## 4. Audit findings and risks

### P0 — Address before presenting a unified mastery score

1. **No canonical progress schema.** Six independent learning stores use different shapes and timestamps. Do not calculate one opaque “mastery” number by simply combining their raw counts.
2. **Not attempted must differ from weak.** Topics with no recorded assessment should show “Not assessed”; a low percentage from one or two attempts should show a small sample warning.
3. **Assessment score semantics vary by question type.** Short answers are self-assessed through a checklist; they must be labeled as self-check points and not silently equated with objective correctness.
4. **Legacy stores must remain recoverable.** Migration must be additive, idempotent, and non-destructive; malformed or quota-limited storage should not crash app startup.
5. **Export coverage is fragmented.** Case progress, assessment history, and other review data currently have separate or no export controls. Release 15 should introduce a versioned full learning-data backup while retaining existing exports during transition.

### P1 — Address during implementation

6. **Limited review history.** Flashcards store current scheduling state, not a durable sequence of review events; Release 15 should record review date/rating if useful for streaks and scheduling.
7. **Inconsistent timestamps.** Case completions and assessment attempts have timestamps, but Study Guide and High-Yield Revision completion marks do not. Add `reviewedAt` in the new layer rather than silently rewriting old shapes.
8. **Assessment history cap.** Only the latest 30 attempts are retained. Decide whether this remains a bounded history and make the limit visible; do not imply lifetime accuracy if old attempts have been discarded.
9. **Reset scope is easy to misunderstand.** Existing reset actions target individual stores. A future “reset all” must explicitly enumerate all learning stores, require confirmation, and never erase theme preferences by accident.
10. **Local storage access is not uniformly guarded.** Some initial theme reads/writes are unguarded; storage access should be wrapped so private-browsing/storage-denied cases degrade gracefully.

### P2 — Nice to have after core metrics are reliable

11. A study streak or “days studied” indicator is only valid once timestamped events exist; do not infer one from a current status object.
12. A daily plan should explain why each item is recommended and allow the learner to adjust their available time.
13. Backup import must validate shape, schema version, supported keys, size, and dates before applying anything; provide a preview and keep rollback safety.

## 5. Recommended canonical data model

Introduce a separate key such as `mindplan-learning-v1` rather than replacing existing keys immediately:

```json
{
  "schemaVersion": 1,
  "updatedAt": "ISO-8601 timestamp",
  "events": [],
  "preferences": {
    "dailyStudyMinutes": 20,
    "dailyTargetItems": 10
  },
  "migration": {
    "sourcesRead": [],
    "completedAt": null
  }
}
```

Recommended event types:

- `case_completed` — `caseId`, `occurredAt`.
- `assessment_completed` — `attemptId`, `bank`, `mode`, `score`, `total`, `objectiveCorrect`, `selfCheckPoints`, `topicResults`, `occurredAt`.
- `flashcard_reviewed` — `cardId`, `rating`, `dueAtNext`, `occurredAt`.
- `study_topic_reviewed` — `topicId`, optional quiz outcome, `occurredAt`.
- `revision_topic_reviewed` — `topicId`, `occurredAt`.
- `oral_self_review_saved` — `promptId`, rating/checklist summary, `occurredAt`; never duplicate free-text draft content into analytics events.

The event list needs a documented cap or compaction policy. Existing source stores remain the source of truth during initial migration; the new layer should be rebuildable from those stores and should not store duplicate private oral draft text.

## 6. Proposed metric definitions

- **Assessment accuracy:** correct objective items divided by answered objective items, with attempt count and bank/mode shown. Keep short-answer self-check points separate.
- **Topic mastery label:** `Not assessed`, `Needs review`, `Developing`, or `Strong evidence`, based on a documented minimum sample and threshold. These labels are study guidance, not clinical competence claims.
- **Due reviews:** count flashcards whose stored due date is at or before the current local time, plus unseen cards as a separate “New” count.
- **Study activity:** count timestamped study events by local calendar day only after event timestamps are recorded; do not infer historical activity from untimestamped binary completion marks.
- **Study plan:** prioritize due reviews, then low-confidence or missed assessed topics, then unattempted topics; provide reasons and user-adjustable duration. Never claim the algorithm is clinically or psychometrically validated.

Exact mastery thresholds should be selected in Pass 2 and kept configurable/testable. The dashboard should display denominator/sample size and source activity behind each value.

## 7. Offline/privacy design constraints

- Keep all progress on the device; no telemetry, accounts, remote sync, or external service calls.
- Continue working without network after the app has been cached, subject to normal browser storage/service-worker limits.
- Add the new data script/assets to the service-worker precache only when they exist and test cache-version consistency.
- Version exports and validate imports before writing. Do not merge arbitrary imported keys into `localStorage`.
- Keep theme preference separate from learning progress. Offer a separate opt-in if including settings in a backup.
- Make clear that clearing browser data can erase progress; encourage periodic export.

## 8. Baseline validation

Executed against v2.14.0:

- `node --check js/app.js` — passed.
- `node tests/validate.js` — passed existing case, source/citation, assessment, question-bank distribution, oral-exam, quick-reference, accessibility, and cache assertions.
- `unzip -t /mnt/data/mental-health-strategic-plan-app.zip` — passed archive integrity.
- Manual source inspection confirmed localStorage-backed progress stores and no learner analytics backend in the inspected static app.

**Not verified:** real-browser navigation, iOS/Android storage behavior, service-worker update lifecycle, first-load/offline restart, quota/private-mode failure handling, and actual import/export round trips. These require browser testing in later passes.

## 9. Pass 1 acceptance criteria

- [x] Inventory existing local stores and their uses.
- [x] Document metric limitations and distinguish objective scoring from self-assessment.
- [x] Define device-only/offline-first constraints.
- [x] Propose a versioned, additive data model and migration strategy.
- [x] Run baseline syntax, regression, and archive checks.
- [ ] Implement no learner-facing changes in this pass.

**Next:** Pass 2 — define and test the mastery model and metric rules before building the review scheduler or dashboard.
