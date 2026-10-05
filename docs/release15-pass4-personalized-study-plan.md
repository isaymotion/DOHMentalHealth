# Release 15 — Pass 4: Personalized Study Plan

## Scope

Added a device-local study-plan page that creates a transparent daily sequence from existing MindPlan records. No backend, account, cloud sync, or analytics telemetry is added.

## Inputs

- Due flashcards and new flashcards from `mindplan-flashcards-v1`.
- Topic signals derived by the Pass 2 mastery model from retained assessment attempts.
- Uncompleted fictional cases from the existing case-progress store.
- Study Guide topics not marked complete in the local Study Guide store.
- A configurable daily time budget saved in `mindplan-study-plan-v1`.

## Priority order

1. Due flashcards.
2. Topics labeled `Needs review` by the formative objective mastery model.
3. Topics with `Limited data`, encouraging additional evidence rather than implying weakness.
4. `Developing` topics.
5. New flashcards.
6. Uncompleted cases.
7. Unreviewed Study Guide topics.

Tasks are allocated in order until the selected time budget is reached. Each task includes a reason and a link to the relevant app section. The model does not recommend a topic labeled `Not assessed` as weak. Short-answer self-checks do not determine objective mastery.

## Limits and safeguards

- Daily budget options range from 5 to 120 minutes in 5-minute steps; default is 20 minutes.
- Estimated task durations and priorities are product heuristics, not validated estimates of learning time, retention, or clinical competence.
- Inputs reflect only records retained on the current device. Assessment history is capped by the existing app design, so the plan may not represent every historical activity.
- No learner text or new analytics event history is collected by this feature.
- Preferences stay in local storage and can be removed by clearing site data. Browser storage failure may prevent preference persistence.
- Plan is recalculated when opened and when the time budget changes; no background reminders or notifications are created.

## QA

Pure-function tests cover time-budget clamping, task-budget fit, due-card priority, needs-review topic recommendations, and protection against labeling an unassessed topic as weak. Integration tests verify the navigation item, script loading, and service-worker cache inclusion. Browser interaction and actual deployed offline behavior still require manual testing.
