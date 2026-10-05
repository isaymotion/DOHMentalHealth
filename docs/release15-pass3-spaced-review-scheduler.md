# Release 15 — Pass 3: Spaced-review scheduler

## Scope
Implement a small deterministic, testable scheduling policy for existing flashcards. Scheduling remains local to the browser; there is no telemetry, account, server, or cloud sync. The source curriculum is unchanged.

## Rating rules
- **Again:** interval 0 days; card remains due today.
- **Difficult:** if there is no prior interval, schedule in 1 day; otherwise schedule at least 1 day and increase the prior interval by approximately 20%, rounded to a whole day.
- **Mastered:** if there is no prior interval, schedule in 3 days; if the prior interval is under 3 days, schedule in 7 days; otherwise approximately double the interval.
- **Maximum interval:** 60 days.
- Every review updates `reviewedAt`, `due`, `intervalDays`, and `reviewCount`.
- Each card retains its most recent 20 rating events, not unlimited history.

## Compatibility and limitations
- Uses the existing `mindplan-flashcards-v1` localStorage key and existing `due`, `status`, `reviewedAt`, and `intervalDays` fields; no destructive migration is required.
- Existing saved intervals are used as the starting point where present. Older records without intervals start from the initial interval rules.
- Invalid or missing due dates are treated as due, avoiding cards becoming permanently hidden because of malformed local data.
- This is a transparent heuristic, not a validated spaced-repetition algorithm. The ratings are learner self-report and do not prove retention or competence.
- Storage remains device/browser-local. Clearing browser site data may remove progress. Browser-level tests and deployed offline checks remain necessary.

## Pass 3 acceptance checks
- Deterministic first and subsequent intervals.
- Again and Difficult behavior.
- 60-day cap.
- Due/future classification.
- Review count and bounded history.
- Script included in page and service-worker cache.
