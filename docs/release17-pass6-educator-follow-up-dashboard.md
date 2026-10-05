# Release 17 · Pass 6 — Educator follow-up dashboard

**Version:** v2.31.0 · October 2026

## Purpose

Provide a compact view of locally saved voluntary educator review cycles so an educator can see which follow-ups are upcoming, due today, overdue without a reflection, or have a reflection recorded.

## Included

- Six summary counts: total review cycles, upcoming follow-ups, due today, overdue without a reflection, cycles with a reflection, and recorded learning goals.
- Filter the timeline to all cycles, due/overdue cycles, or cycles with at least one reflection.
- A status label on each cycle based on its follow-up date and whether any reflection is recorded.
- Dashboard counts and timeline refresh when a review plan is saved, a reflection is appended, or records are deleted.
- No new learner data store, accounts, network transfer, or automatic educator notifications.

## Status rules and limits

The date comparison uses the browser's current date. Any reflection marks a cycle as having a reflection; it does not establish that the goal was achieved or that follow-up is complete. A cycle with no reflection after its follow-up date is labelled overdue, not unsuccessful. These are workflow reminders only and not competency ratings. The dashboard sees only the current browser's local records; it cannot summarize other devices or imported files.

## Privacy and source boundary

Review-cycle records remain in browser local storage unless explicitly exported. Use voluntary participation, non-identifying learner codes, and no patient-identifiable information. This workflow is an educational tool and is not specified by the National Mental Health Strategic Plan 2019–2023. Historical Plan targets are not current achievements.

## QA

Static assertions cover summary metrics, filters, status labels, event wiring, version/cache alignment, and privacy/interpretation text. Browser verification of date boundaries, filter behavior, local persistence, print output, and offline reload remains manual.
