# Release 19 · Pass 1 — Comprehensive Study Guide

## Goal

Expand the existing 10-topic Study Guide so that it functions as a genuine study resource rather than a brief overview.

## Changes

- Added `data/study-guide-expansion.js` with learner-facing depth for all 10 topics.
- Added learning objectives to each topic.
- Added deeper source-grounded study notes.
- Added key conceptual distinctions useful for revision and examination.
- Added high-yield exam focus points.
- Added primary PDF/source locators.
- Updated the Study Guide renderer to display these sections consistently.
- Preserved the original source text and existing active-recall question for each topic.
- Added the expansion asset to the service-worker cache for offline use.

## Important source boundaries

The content is based on the supplied *National Mental Health Strategic Plan 2019–2023*. Historical estimates and targets remain dated historical material. Proposed budgets are not treated as actual expenditures. Legal material in the Act and IRR annexes is presented as a study/navigation aid unless exact statutory wording is shown.

The Plan itself contains an internal wording inconsistency: the Theory of Change says the four pillars are divided into five outcomes, while the later Outcomes section visibly enumerates four outcomes. The Study Guide flags this rather than inventing a fifth outcome.

## Verification status

Automated source/data checks should confirm that all 10 topics load, the expansion file is loaded after the base Study Guide data, the new renderer fields are supported, and the new asset is included in the offline cache. Real-browser and live GitHub Pages testing remain separate deployment checks.
