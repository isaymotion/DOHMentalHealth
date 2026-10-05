# Release 17 · Pass 1 — Curriculum Mapping

**Version:** v2.26.0  
**Status:** Implemented; automated validation added.

## Purpose

The Curriculum Map creates a navigable crosswalk between existing MindPlan resources: Study Guide topics, fictional cases, assessment items from both question banks, and oral/OSCE stations. It does not create new source claims or claim to be an official residency curriculum.

## Seven learning themes

1. Plan mandate, context, and goals.
2. Promotion and prevention.
3. Leadership, governance, and coordination.
4. Services, access, and integration.
5. Rights, participation, and person-centred policy.
6. Information, indicators, and evaluation.
7. Source fidelity and responsible interpretation.

The theme labels are a teaching/navigation structure. Plan terminology and topic summaries remain source-derived where marked in the existing content; the grouping of resources is an educational interpretation.

## Mapping method

The module `js/curriculum-map.js` uses a visible list of keywords to match resource titles, descriptions, tags, objectives, prompts, and source notes. An item can appear in multiple themes. The UI shows category counts and expandable resource lists, with links to open each resource in its existing module. The mapping is intentionally heuristic and should be reviewed before formal curriculum decisions.

## Interpretation limits

- Coverage counts are counts of links, not unique items, competence, completeness, quality, or mastery.
- A missing match does not prove that a topic is absent from a resource; keyword matching can miss semantic relationships.
- The crosswalk is not an official curriculum or validated competency framework.
- The National Mental Health Strategic Plan covers 2019–2023. Historical targets are not evidence of current achievement or current policy.
- No new learner tracking or backend is introduced.

## QA

Automated tests validate theme inventory, selected expected links, count consistency, navigation registration, script inclusion, and service-worker caching. Real-browser checks remain manual: open every link category on mobile, confirm keyboard accessibility, inspect narrow-screen wrapping, and repeat offline after the new service worker installs.
