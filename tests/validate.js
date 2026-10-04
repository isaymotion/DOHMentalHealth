'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const data = JSON.parse(read('data/release2/cases.json'));
const assessmentScript = read('data/assessment-data.js');
const assessment = Function(assessmentScript.replace('window.MINDPLAN_ASSESSMENT =', 'return').replace(/;\s*$/, ''))();
const html = read('index.html');
const app = read('js/app.js');
const css = read('css/styles.css');
const sw = read('service-worker.js');
assert.strictEqual(data.cases.length, 10, 'expected ten curriculum cases');
assert.strictEqual(new Set(data.cases.map(c => c.id)).size, 10, 'case IDs must be unique');
assert.strictEqual(data.citationVerification.status, 'verified', 'citation verification status must be explicit');
const expectedIds = ['missed-follow-up','barangay-referral-gap','school-campaign','person-behind-policy','rights-concern','fragmented-local-system','funding-proposal','disaster-affected-community','missing-data','local-mental-health-action-plan'];
assert.deepStrictEqual(data.cases.map(c => c.id), expectedIds, 'case library should match the requested ten-case curriculum in order');
for (const c of data.cases) {
  for (const key of ['id','title','scenario','learningObjectives','decisionPoints','sourceAnchors','determinantOptions','protectiveFactorOptions','pillarOptions','monitoringTask','debrief','reviewChecklist','tags']) assert.ok(c[key], `${c.id}: missing ${key}`);
  assert.ok(c.decisionPoints.length >= 1, `${c.id}: no decision points`);
  for (const d of c.decisionPoints) {
    assert.ok(d.id && d.prompt && Array.isArray(d.choices) && d.choices.length >= 2, `${c.id}/${d.id}: invalid choices`);
    for (const choice of d.choices) assert.ok(choice.id && choice.text && choice.feedback && choice.rating, `${c.id}/${d.id}: incomplete choice feedback`);
  }
  assert.ok(c.sourceAnchors.length, `${c.id}: no source anchors`);
  for (const a of c.sourceAnchors) {
    assert.strictEqual(a.label, 'source-says', `${c.id}: source claim must be labeled`);
    assert.ok(a.citation.printedPages && a.citation.pdfPages, `${c.id}: missing page citation`);
    assert.strictEqual(a.citation.verificationStatus, 'verified against supplied PDF', `${c.id}: unverified citation`);
  }
  for (const p of c.pillarOptions) assert.ok(p.id && p.label && p.exampleAction, `${c.id}: incomplete pillar option`);
  assert.ok(c.monitoringTask.candidateIndicators.length, `${c.id}: no indicators`);
}
for (const asset of ['css/styles.css','js/app.js','data/release2/cases.js','data/assessment-data.js','assets/icon.svg','manifest.json']) assert.ok(fs.existsSync(path.join(root, asset)), `missing asset ${asset}`);
for (const ref of ['data/release2/cases.js','js/app.js']) assert.ok(html.includes(ref), `index missing script ${ref}`);
assert.ok(css.includes('@media(max-width:600px)'), 'mobile breakpoint missing');
assert.ok(app.includes('localStorage') && app.includes('mindplan-release2-state-v1'), 'local progress storage not implemented');
assert.ok(app.includes('Export local progress JSON'), 'progress export missing');
assert.ok(sw.includes('mindplan-v2.6.1'), 'service worker cache version not bumped');
assert.ok(app.indexOf('const FLASHCARDS=') < app.indexOf("document.getElementById('dueCount').textContent=flashcardsDueCount()"), 'flashcard count must initialize after FLASHCARDS to avoid startup ReferenceError');
assert.ok(app.includes('MindPlan could not finish loading'), 'startup errors should show a recovery message instead of a permanent loading screen');
assert.ok(sw.includes('./data/assessment-data.js'), 'assessment data missing from offline cache');
assert.ok(html.includes('id="backButton"'), 'visible global back button missing');
assert.ok(html.includes('id="globalSearch"') && html.includes('id="searchResults"'), 'global search interface missing');
assert.ok(app.includes('function buildSearchIndex') && app.includes('function runSearch'), 'whole-app search index and runner missing');
assert.ok(app.includes('function goBack') && app.includes('ArrowDown'), 'back navigation or search keyboard support missing');
assert.ok(css.includes('.back-button') && css.includes('.search-results'), 'navigation/search styling missing');
assert.ok(html.includes('id="sourceDialog"') && html.includes('data-page="flashcards"'), 'source dialog or flashcards navigation missing');
assert.ok(app.includes('function openSource') && app.includes('data-source-ref'), 'clickable source reference dialog missing');
assert.ok(app.includes('function framework') && app.includes('FRAMEWORK_NODES'), 'interactive strategic framework missing');
assert.ok(app.includes('function flashcardsPage') && app.includes('FLASHCARDS') && app.includes('FLASH_KEY'), 'flashcards/spaced review/local persistence missing');
assert.ok(app.includes('data-rate="again"') && app.includes('data-rate="difficult"') && app.includes('data-rate="mastered"'), 'three flashcard review states missing');
assert.ok(app.includes('searchIndex.push'), 'flashcards are not included in global search index');
assert.ok(html.includes('data-page="assessment"') && html.includes('data/assessment-data.js'), 'assessment navigation/data script missing');
assert.ok(assessment.questions.length >= 15, 'assessment bank should include objective and short-answer questions');
assert.ok(assessment.questions.some(q=>q.type==='single') && assessment.questions.some(q=>q.type==='truefalse') && assessment.questions.some(q=>q.type==='short'), 'single-best-answer, true/false, and short-answer types required');
for (const q of assessment.questions) { assert.ok(q.id && q.topic && q.prompt && q.printed && q.pdf && q.excerpt, `assessment item missing metadata: ${q.id}`); if(q.type==='single'||q.type==='truefalse'){assert.ok(Array.isArray(q.choices) && q.choices.length>=2 && Number.isInteger(q.correct) && q.correct>=0 && q.correct<q.choices.length, `${q.id}: invalid answer key`);assert.strictEqual(q.explanations.length,q.choices.length,`${q.id}: explanation count mismatch`);} else {assert.ok(q.model && Array.isArray(q.checklist) && q.checklist.length>=3, `${q.id}: short answer needs model/checklist`);} }
assert.ok(app.includes('function startAssessment') && app.includes('function finishAssessment'), 'assessment runner or results missing');
assert.ok(app.includes('mindplan-assessment-v1') && app.includes('function saveAssessSaved'), 'local assessment history missing');
assert.ok(css.includes('.timer-chip') && css.includes('.assessment-question'), 'assessment styling missing');
console.log(`PASS: ${data.cases.length} unique cases validated`);
console.log('PASS: decision options, feedback, source citations, pillars, indicators, and debrief data validated');
console.log('PASS: app assets, mobile breakpoint, local progress/export, and service-worker version validated');
console.log('PASS: source-linked citation dialog, framework visual, and local spaced-review flashcards validated');
console.log(`PASS: ${assessment.questions.length} assessment questions, three question types, rationales, citations, and topic mastery metadata validated`);
console.log('PASS: timed exam runner, local assessment history, export/reset, and offline asset registration validated');
console.log('NOTE: real-browser navigation is blocked in this execution environment; browser interaction/offline behavior remains a manual deployment check.');
