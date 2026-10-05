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
for (const asset of ['css/styles.css','js/app.js','data/release2/cases.js','data/assessment-data.js','data/release14-question-bank.js','data/study-guide-data.js','js/mastery-model.js','js/spaced-review.js','js/study-plan.js','js/data-portability.js','assets/icon.svg','manifest.json']) assert.ok(fs.existsSync(path.join(root, asset)), `missing asset ${asset}`);
for (const ref of ['data/release2/cases.js','js/app.js']) assert.ok(html.includes(ref), `index missing script ${ref}`);
assert.ok(css.includes('@media(max-width:600px)'), 'mobile breakpoint missing');
assert.ok(app.includes('localStorage') && app.includes('mindplan-release2-state-v1'), 'local progress storage not implemented');
assert.ok(app.includes('Export case progress only'), 'progress export missing');
assert.ok(sw.includes('mindplan-v2.37.0'), 'service worker cache version not bumped');
assert.ok(app.indexOf('const FLASHCARDS=') < app.indexOf("document.getElementById('dueCount').textContent=flashcardsDueCount()"), 'flashcard count must initialize after FLASHCARDS to avoid startup ReferenceError');
assert.ok(app.includes('MindPlan could not finish loading'), 'startup errors should show a recovery message instead of a permanent loading screen');
assert.ok(sw.includes('./data/assessment-data.js'), 'assessment data missing from offline cache');
assert.ok(sw.includes('./data/study-guide-data.js'), 'Study Guide data missing from offline cache');
assert.ok(html.includes('data/study-guide-data.js'), 'Study Guide data script missing');
assert.ok(html.includes('data/release14-question-bank.js') && sw.includes('./data/release14-question-bank.js'), 'Release 14 bank script or offline asset missing');
const release14Script = read('data/release14-question-bank.js');
const release14 = Function(release14Script.replace('window.MINDPLAN_RELEASE14_BANK =', 'return').replace(/;\s*\/\/\s*$/, ';').replace(/;\s*$/, ''))();
assert.strictEqual(release14.length, 30, 'Release 14 bank must contain 30 items');
assert.strictEqual(release14.filter(q=>q.type==='single').length, 15, '15 single-best-answer items required');
assert.strictEqual(release14.filter(q=>q.type==='multi').length, 5, '5 select-all items required');
assert.strictEqual(release14.filter(q=>q.type==='short'&&q.kind!=='scenario').length, 5, '5 short-answer items required');
assert.strictEqual(release14.filter(q=>q.type==='short'&&q.kind==='scenario').length, 5, '5 scenario items required');
assert.strictEqual(new Set(release14.map(q=>q.id)).size, 30, 'Release 14 item IDs must be unique');
for (const q of release14) { assert.ok(q.id && q.topic && q.prompt && q.printed && q.pdf && q.excerpt && q.label, `${q.id}: missing source/status metadata`); if(q.type==='single') assert.ok(q.choices.length>=2 && Number.isInteger(q.correct) && q.explanations.length===q.choices.length, `${q.id}: invalid single-answer key`); if(q.type==='multi') assert.ok(q.choices.length>=2 && q.correctIndices.length>=1 && q.explanations.length===q.choices.length, `${q.id}: invalid multi-answer key`); if(q.type==='short') assert.ok(q.model && q.checklist.length>=3, `${q.id}: missing model/checklist`); }
assert.ok(app.includes('data-assess-start=\"release14\"') || app.includes('startAssessment(\'release14\')'), 'Dedicated Release 14 runner entry missing');
assert.ok(app.includes('data-multi-choice') && app.includes('correctIndices'), 'Select-all interaction and scoring missing');
assert.ok(html.includes('data-page="revision"') && app.includes('function highYieldRevisionPage'), 'High-Yield Revision page missing');
assert.ok(app.includes('mindplan-high-yield-revision-v1') && app.includes('data-revision-mark'), 'local revision tracking missing');
assert.ok(app.includes("'framework-pillars':'Four pillars'") && app.includes("'annex-act':'Rights and participation'"), 'revision topic links must match real assessment topics');
assert.ok(app.includes('Release 14 · Pass 7') && html.includes('v2.37.0'), 'Release 14 bank integration/version label missing');
assert.ok(html.includes('data-page="studyguide"'), 'Study Guide navigation missing');
assert.ok(html.includes('data-page="whatsnew"'), 'What’s New navigation missing');
assert.ok(app.includes('function whatsNewPage') && app.includes("page==='whatsnew'"), 'What’s New page/render route missing');
assert.ok(sw.includes('mindplan-v2.37.0'), 'service worker cache version not bumped for What’s New page');
assert.ok(app.includes('function studyGuidePage'), 'Study Guide page missing');
const studyScript = read('data/study-guide-data.js');
assert.ok((studyScript.match(/id:'(?:policy-context|situation-gaps|plan-development|outcomes-indicators|annex-act|annex-irr-me|annex-budget-scorecards)'/g)||[]).length === 7, 'Pass 6 should integrate seven additional Study Guide topics');
assert.ok(studyScript.includes('4,111,133,035') && studyScript.includes('51–79%'), 'Pass 6 verified budget and scorecard legend missing');
assert.ok(app.includes('else if(t.sections)'), 'Study Guide generic section renderer missing');
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
assert.ok(html.includes('data-page="oral"'), 'oral exam navigation missing');
assert.ok(html.includes('data-page="quickref"'), 'quick reference navigation missing');
assert.ok(app.includes('function quickReference') && app.includes('QUICKREF_ACRONYMS') && app.includes('QUICKREF_AGENCIES'), 'quick-reference glossary and agency directory missing');
assert.ok(app.includes('QUICKREF_INDICATORS') && app.includes('QUICKREF_TARGETS') && app.includes('HISTORICAL PLAN TARGETS'), 'indicator index and historical targets missing');
assert.ok(css.includes('.quickref-table') && css.includes('.quickref-tabs'), 'quick-reference table styling missing');
assert.ok(app.includes('function oralPage') && app.includes('function startOral') && app.includes('function renderOralStation'), 'oral exam flow missing');
assert.ok(app.includes('mindplan-oral-v1') && app.includes('localStorage.setItem(ORAL_KEY'), 'oral exam drafts and sessions must save locally');
assert.ok(app.includes('examiner follow-up questions') || app.includes('Examiner follow-up questions'), 'oral follow-up prompts missing');
assert.ok((app.match(/id:'oral-/g)||[]).length >= 6, 'six oral stations required');
assert.ok(css.includes('.oral-station'), 'oral exam styling missing');

assert.ok(css.includes(':focus-visible') && css.includes('prefers-reduced-motion') && css.includes('forced-colors'), 'accessibility focus/motion/contrast support missing');
assert.ok(css.includes('.skip-link:focus') && css.includes('min-height:44px'), 'skip-link or touch target enhancements missing');
assert.ok(html.includes('aria-label="MindPlan content"') && html.includes('aria-atomic="true"'), 'main landmark or status announcement accessibility missing');
assert.ok(app.includes("sourceDialog.addEventListener('close'") && app.includes("document.getElementById('closeSourceDialog').focus()"), 'citation dialog focus handling missing');
assert.ok(app.includes("searchResults.addEventListener('keydown'") && app.includes("items[i-1].focus()"), 'search keyboard arrow navigation missing');
assert.ok(app.includes("setAttribute('aria-current','page')") && app.includes("setAttribute('aria-busy','false')"), 'navigation state announcements missing');

console.log(`PASS: ${data.cases.length} unique cases validated`);
console.log('PASS: decision options, feedback, source citations, pillars, indicators, and debrief data validated');
console.log('PASS: app assets, mobile breakpoint, local progress/export, and service-worker version validated');
console.log('PASS: source-linked citation dialog, framework visual, and local spaced-review flashcards validated');
console.log('PASS: Release 14 30-item bank, 15/5/5/5 item distribution, source metadata, multi-select scoring, and offline registration validated');
console.log(`PASS: ${assessment.questions.length} assessment questions, three question types, rationales, citations, and topic mastery metadata validated`);
console.log('PASS: timed exam runner, local assessment history, export/reset, and offline asset registration validated');
console.log('PASS: six oral exam stations, follow-ups, model outlines, self-review, and local draft/session storage validated');
console.log('PASS: searchable quick-reference glossary, agency directory, indicator index, historical target table, and responsive styles validated');
console.log('PASS: keyboard focus, reduced motion, forced-colors, dialog focus return, and search keyboard accessibility enhancements validated');

// Release 15 Pass 2: pure topic-mastery model tests.
const mastery = require('../js/mastery-model.js');
const standardQs = assessment.questions;
const r14Qs = release14;
const q1 = standardQs.find(q => q.type === 'single');
const q2 = standardQs.find(q => q.type === 'truefalse');
const q3 = r14Qs.find(q => q.type === 'single');
assert.ok(q1 && q2 && q3, 'mastery fixtures require objective questions');
let derived = mastery.deriveTopicMastery([], standardQs, r14Qs);
assert.strictEqual(Object.keys(derived.topics).length, 0, 'no attempts should not fabricate topic results');
const attempt = (id, bank, q, selected, at, extra={}) => ({id,bank,at,items:[q.id],answers:{[q.id]:{selected,...extra}}});
const topic = q1.topic;
const fixtures = [
  attempt('a1','standard',q1,q1.correct,'2026-01-01T00:00:00Z'),
  attempt('a2','standard',q1,(q1.correct+1)%q1.choices.length,'2026-01-02T00:00:00Z'),
];
derived = mastery.deriveTopicMastery(fixtures,standardQs,r14Qs);
assert.strictEqual(derived.topics[topic].answered,1,'repeated item should count once');
assert.strictEqual(derived.topics[topic].correct,0,'latest answered response should be used');
assert.strictEqual(derived.topics[topic].label,'Limited data','small sample must not be labelled weak');
const sameTopicQs = [...standardQs,...r14Qs].filter(q=>q.topic===topic && mastery.isObjective(q)).slice(0,5);
if(sameTopicQs.length>=3){
 const mk=(qs,answers,bank='standard')=>({id:'fixture',bank,at:'2026-02-01T00:00:00Z',items:qs.map(q=>q.id),answers});
 const allCorrect=mastery.deriveTopicMastery([mk(sameTopicQs,sameTopicQs.reduce((a,q)=>{a[q.id]=q.type==='multi'?{submitted:true,selectedIndices:q.correctIndices.slice()}:{selected:q.correct};return a;},{}),sameTopicQs[0].id.startsWith('r14-')?'release14':'standard')],standardQs,r14Qs);
 assert.ok(Object.values(allCorrect.topics).some(t=>t.label==='Strong evidence'),'80%+ boundary should allow Strong evidence');
}
const multiQ=r14Qs.find(q=>q.type==='multi');
if(multiQ){assert.strictEqual(mastery.evaluateObjective(multiQ,{submitted:false,selectedIndices:multiQ.correctIndices}),null,'unsubmitted multi-select must not count');assert.strictEqual(mastery.evaluateObjective(multiQ,{submitted:true,selectedIndices:multiQ.correctIndices.slice()}),true,'exact multi-select set should score correct');assert.strictEqual(mastery.evaluateObjective(multiQ,{submitted:true,selectedIndices:[]}),false,'submitted empty multi-select should score incorrect');}
assert.ok(derived.rules && derived.rules.minimumDistinctItems===3,'mastery rules must be explicit');
assert.ok(derived.rules.note.includes('not a validated measure'),'model must disclaim validated competence');
assert.ok(fs.existsSync(path.join(root,'docs/release15-pass2-topic-mastery-model.md')),'Pass 2 model documentation missing');

console.log('NOTE: real-browser navigation is blocked in this execution environment; browser interaction/offline behavior remains a manual deployment check.');


// Release 15 Pass 3: deterministic spaced-review scheduler tests.
const spaced = require('../js/spaced-review.js');
const fixedNow = new Date('2026-10-04T12:00:00.000Z');
const firstMastered = spaced.scheduleReview(null,'mastered',fixedNow);
assert.strictEqual(firstMastered.intervalDays,3,'first Mastered interval should be 3 days');
assert.strictEqual(firstMastered.due,'2026-10-07T12:00:00.000Z','due date should be deterministic');
const secondMastered = spaced.scheduleReview(firstMastered,'mastered',fixedNow);
assert.strictEqual(secondMastered.intervalDays,7,'next Mastered interval should expand to 7 days');
assert.strictEqual(spaced.scheduleReview(secondMastered,'again',fixedNow).intervalDays,0,'Again should schedule same-day review');
assert.strictEqual(spaced.scheduleReview(secondMastered,'difficult',fixedNow).intervalDays,8,'Difficult should grow prior interval cautiously');
assert.strictEqual(spaced.scheduleReview({intervalDays:55},'mastered',fixedNow).intervalDays,60,'interval must cap at 60 days');
assert.strictEqual(spaced.isDue({due:'2026-10-04T11:59:00.000Z'},fixedNow),true,'past due cards should be due');
assert.strictEqual(spaced.isDue({due:'2026-10-05T12:00:00.000Z'},fixedNow),false,'future cards should not be due');
const historyState=spaced.reviewEvent({},'card-1','again',fixedNow);
assert.strictEqual(historyState['card-1'].reviewCount,1,'review count should increment');
assert.strictEqual(historyState['card-1'].history.length,1,'review history should be retained');
let capped={}; for(let i=0;i<25;i++) capped=spaced.reviewEvent(capped,'card-1','difficult',fixedNow);
assert.strictEqual(capped['card-1'].history.length,spaced.MAX_HISTORY,'history must be capped');
assert.ok(html.includes('js/spaced-review.js'),'scheduler script must be loaded');
assert.ok(sw.includes('mindplan-v2.37.0') && sw.includes('./js/spaced-review.js'),'new scheduler must be cached offline');
console.log('PASS: Release 15 spaced-review intervals, due logic, capped local history, and offline registration validated');

// Release 15 Pass 4: personalized plan prioritization tests.
const studyPlan = require('../js/study-plan.js');
assert.strictEqual(studyPlan.clampMinutes(1), 5, 'daily plan budget should enforce minimum');
assert.strictEqual(studyPlan.clampMinutes(121), 120, 'daily plan budget should enforce maximum');
assert.strictEqual(studyPlan.clampMinutes(23), 25, 'daily plan budget should round to five-minute steps');
const generatedPlan = studyPlan.buildPlan({dailyMinutes:15,dueCards:4,newCards:5,uncompletedCases:3,unreviewedTopics:2,topics:[{topic:'Governance',label:'Needs review',correct:1,answered:3,distinctItems:3},{topic:'Services',label:'Not assessed',distinctItems:0}]});
assert.strictEqual(generatedPlan.dailyMinutes,15,'plan should respect selected time budget');
assert.ok(generatedPlan.tasks.reduce((n,t)=>n+t.minutes,0)<=15,'scheduled task minutes must fit budget');
assert.ok(generatedPlan.tasks.some(t=>t.id==='due-cards'),'due flashcards should be prioritized');
assert.ok(generatedPlan.tasks.some(t=>t.id==='topic-Governance'),'Needs review topic should be recommended');
assert.ok(!generatedPlan.tasks.some(t=>t.id==='topic-Services'),'Not assessed topics must not be treated as weak');
assert.ok(generatedPlan.note.includes('not validated'),'plan should disclose heuristic limitations');
assert.ok(html.includes('data-page="studyplan"') && html.includes('js/study-plan.js'),'study plan navigation and module must be loaded');
assert.ok(sw.includes('./js/study-plan.js'),'study plan module must be cached offline');
console.log('PASS: Release 15 personalized study-plan priorities, time budget, unassessed-topic safeguards, and offline registration validated');

// Release 15 Pass 5: dashboard integration and distinct local progress signals.
assert.ok(app.includes('function home(){') && app.includes('Learning dashboard'), 'integrated learning dashboard missing');
for (const marker of ['Flashcards due','Topics with evidence','Study Guide topics','Revision topics','data-dashboard-plan','data-dashboard-open']) assert.ok(app.includes(marker), `dashboard signal/action missing: ${marker}`);
assert.ok(app.includes('latest answered response per distinct objective item') || app.includes('latest answered response per distinct'), 'dashboard should explain mastery evidence basis');
assert.ok(html.includes('v2.37.0') && sw.includes('mindplan-v2.37.0'), 'Pass 5 version/cache bump missing');
assert.ok(fs.existsSync(path.join(root,'docs/release15-pass5-dashboard-integration.md')), 'Pass 5 integration documentation missing');
console.log('PASS: Release 15 dashboard integration, local progress signals, navigation actions, and version/cache registration validated');

// Release 15 Pass 6: versioned local-data backup validation.
const portability = require('../js/data-portability.js');
const backupFixture = portability.makeBackup({'mindplan-release2-state-v1':{completed:{},saved:{}},'mindplan-assessment-v1':{attempts:[],topics:{},best:{}}},'2026-10-04T00:00:00.000Z');
assert.strictEqual(backupFixture.format,'mindplan-learning-backup','backup format must be explicit');
assert.strictEqual(backupFixture.schemaVersion,1,'backup schema version must be explicit');
assert.deepStrictEqual(Object.keys(portability.validateBackup(backupFixture).stores).length,2,'valid backup stores should be retained');
assert.throws(()=>portability.validateBackup({format:'other',schemaVersion:1,stores:{}}),/Unsupported backup/,'unknown format should be rejected');
assert.throws(()=>portability.validateBackup({format:'mindplan-learning-backup',schemaVersion:1,stores:{'unknown-key':{x:1}}}),/Unrecognized data category/,'unknown store should be rejected');
assert.throws(()=>portability.validateBackup({format:'mindplan-learning-backup',schemaVersion:1,stores:{'mindplan-release2-state-v1':{completed:[]}}}),/Invalid case progress/,'malformed case progress should be rejected');
assert.throws(()=>portability.validateBackup({format:'mindplan-learning-backup',schemaVersion:1,stores:{'mindplan-theme':'blue'}}),/Invalid theme/,'invalid theme should be rejected');
assert.ok(app.includes('Export all learning data') && app.includes('Import backup') && app.includes('Reset all learning data'),'backup/import/full reset controls missing');
assert.ok(app.includes('Theme preference will be preserved') && app.includes('Matching MindPlan records will be replaced'),'import/reset scope warnings missing');
assert.ok(html.includes('js/data-portability.js') && sw.includes('./js/data-portability.js'),'data portability module must be loaded and cached');
assert.ok(html.includes('v2.37.0') && sw.includes('mindplan-v2.37.0'),'Pass 6 version/cache bump missing');
assert.ok(fs.existsSync(path.join(root,'docs/release15-pass6-data-portability-privacy.md')),'Pass 6 documentation missing');
console.log('PASS: Release 15 versioned backup schema, validation/rejection cases, privacy warnings, import/export controls, reset scope, and offline registration validated');

// Release 15 Pass 7: integration, regression, and release QA.
const runtimeScripts = [
  'data/release2/cases.js',
  'data/assessment-data.js',
  'data/release14-question-bank.js',
  'data/study-guide-data.js',
  'js/mastery-model.js',
  'js/spaced-review.js',
  'js/study-plan.js',
  'js/data-portability.js',
  'js/app.js'
];
for (const f of runtimeScripts) {
  const source = read(f);
  assert.ok(source.length > 100, `${f}: unexpectedly empty runtime script`);
}
for (const f of runtimeScripts) {
  const result = require('child_process').spawnSync(process.execPath, ['--check', path.join(root, f)], {encoding:'utf8'});
  assert.strictEqual(result.status, 0, `${f}: JavaScript syntax check failed`);
}

// Every runtime script referenced by index must be present and every Release 15 module
// must be registered for offline use.
for (const f of runtimeScripts) assert.ok(html.includes(f), `index missing runtime script ${f}`);
for (const f of ['js/mastery-model.js','js/spaced-review.js','js/study-plan.js','js/data-portability.js']) {
  assert.ok(sw.includes(`./${f}`), `service worker missing Release 15 asset ${f}`);
}

// Version/cache consistency for the distributed app. Historical release notes may mention
// older versions, but the live HTML/service worker must agree on the current release.
assert.ok(html.includes('v2.37.0'), 'live HTML must identify v2.37.0');
assert.ok(sw.includes("const CACHE='mindplan-v2.37.0'"), 'live service worker must use v2.37.0 cache');
assert.ok(!/CACHE='mindplan-v2\.17\.0'/.test(sw), 'stale v2.17.0 service-worker cache must not remain');

// Core cross-module contracts.
assert.ok(app.includes('window.MINDPLAN_MASTERY_MODEL?.deriveTopicMastery'), 'app must consume the canonical mastery model');
assert.ok(app.includes('window.MINDPLAN_SPACED_REVIEW.reviewEvent'), 'app must consume the canonical spaced-review scheduler');
assert.ok(app.includes('window.MINDPLAN_STUDY_PLAN.buildPlan'), 'app must consume the canonical study-plan model');
assert.ok(app.includes('window.MINDPLAN_PORTABILITY.validateBackup'), 'app must consume the canonical backup validator');
assert.ok(app.includes("ASSESS_KEY='mindplan-assessment-v1'"), 'assessment history must remain local');
assert.ok(app.includes("FLASH_KEY='mindplan-flashcards-v1'"), 'flashcard schedule must remain local');

// Regression guards for the explicit privacy/source boundaries.
assert.ok(app.includes('No learner profile or results are sent to a server'), 'local-only privacy disclosure missing');
assert.ok(app.includes('Historical targets are not evidence of current achievement') || app.includes('Historical targets are not evidence of achievement'), 'historical-target boundary missing');
assert.ok(app.includes('Short-answer checklist self-checks do not determine objective mastery'), 'short-answer/objective separation missing');
assert.ok(app.includes('Not assessed is not treated as weak'), 'unassessed-topic safeguard missing');

// Release 15 documentation and deployment artifacts.
assert.ok(fs.existsSync(path.join(root,'docs/release15-pass7-integration-and-release-qa.md')), 'Pass 7 QA documentation missing');
assert.ok(fs.existsSync(path.join(root,'README.md')) && fs.statSync(path.join(root,'README.md')).size > 500, 'README/release handoff documentation missing');
console.log('PASS: Release 15 integration contracts, JavaScript syntax, version/cache consistency, privacy/source boundaries, and release artifacts validated');


// Release 16 Pass 1: richer local learning dashboard.
assert.ok(app.includes("const masteryCounts={'Needs review':needsReview"), 'dashboard mastery band summary missing');
assert.ok(app.includes('const attentionTopics=masteryTopics.filter'), 'targeted topic review list missing');
assert.ok(app.includes('const recentObjective=(assessSaved.attempts||[]).filter'), 'recent objective assessment panel missing');
assert.ok(app.includes('data-dashboard-topic'), 'topic-specific practice action missing');
assert.ok(app.includes("a.mode!=='short'"), 'short-answer self-checks must be excluded from objective activity');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Release 16 version/cache mismatch');
assert.ok(fs.existsSync(path.join(root,'docs/release16-pass1-learning-dashboard.md')), 'Release 16 Pass 1 documentation missing');
console.log('PASS: Release 16 Pass 1 dashboard evidence bands, targeted review, recent objective results, privacy boundaries, and version/cache registration validated');

// Release 16 Pass 2: unified local review queue.
const reviewQueue = require('../js/review-queue.js');
const sampleQueue = reviewQueue.buildReviewQueue({
 dueCards:[{id:'c1',q:'Due card'}],newCards:[{id:'c2'}],
 topics:[{topic:'Governance',label:'Needs review',correct:1,answered:3,distinctItems:3},{topic:'Services',label:'Not assessed',distinctItems:0}],
 missedTopics:[{topic:'Governance',missed:2},{topic:'Promotion',missed:1}],
 uncompletedCases:[{id:'case1'}],unreviewedGuide:[{id:'g1'}],unreviewedRevision:[{id:'r1'}]
});
assert.strictEqual(sampleQueue.items[0].kind,'flashcard','due flashcards should be first priority');
assert.ok(sampleQueue.items.some(x=>x.title==='Review: Governance'),'needs-review topic should enter queue');
assert.ok(sampleQueue.items.some(x=>x.title==='Revisit missed concept: Promotion'),'missed concept should enter queue');
assert.ok(!sampleQueue.items.some(x=>x.title.includes('Not assessed')),'unassessed topics must not be treated as weak');
assert.ok(sampleQueue.items.some(x=>x.kind==='case') && sampleQueue.items.some(x=>x.kind==='studyguide'),'unfinished learning should enter queue');
assert.ok(fs.readFileSync(path.join(root,'service-worker.js'),'utf8').includes('./js/review-queue.js'),'review queue module must be cached offline');
assert.ok(html.includes('data-page="reviewqueue"') && html.includes('v2.37.0'),'review queue navigation/version missing');
assert.ok(app.includes('function reviewQueuePage()') && app.includes('MINDPLAN_REVIEW_QUEUE.buildReviewQueue'),'review queue UI not integrated');
console.log('PASS: Release 16 Pass 2 review queue priority, missed-topic signals, unassessed-topic safeguard, navigation, and offline registration validated');

// Release 16 Pass 3: adaptive objective assessment.
const adaptive = require('../js/adaptive-assessment.js');
const adaptiveQuestions = assessment.questions.filter(q=>q.type!=='short');
const missQ = adaptiveQuestions[0];
const adaptiveHistory = [{at:new Date().toISOString(),items:[missQ.id],answers:{[missQ.id]:{selected:missQ.correct===0?1:0}}}];
const adaptiveSet = adaptive.selectAdaptiveQuestions(adaptiveQuestions, adaptiveHistory, 10);
assert.ok(adaptiveSet.items.length <= 10 && adaptiveSet.items.length > 0, 'adaptive practice should return up to ten objective items');
assert.ok(adaptiveSet.items.every(q=>q.type!=='short'), 'adaptive practice must exclude short-answer self-check items');
assert.ok(adaptiveSet.items.some(q=>q.id===missQ.id), 'recently missed objective item should be prioritized');
assert.ok(adaptiveSet.reasons.length===adaptiveSet.items.length, 'every selected question must have a transparent reason');
assert.ok(adaptiveSet.note.includes('not a validated adaptive test'), 'adaptive limits must be disclosed');
assert.ok(html.includes('js/adaptive-assessment.js') && sw.includes('./js/adaptive-assessment.js'), 'adaptive module must load and cache offline');
assert.ok(app.includes('data-assess-start="adaptive"') && app.includes('MINDPLAN_ADAPTIVE.selectAdaptiveQuestions'), 'adaptive assessment UI integration missing');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Release 16 Pass 3 version/cache mismatch');
assert.ok(fs.existsSync(path.join(root,'docs/release16-pass3-adaptive-assessment.md')), 'Pass 3 documentation missing');
console.log('PASS: Release 16 Pass 3 adaptive objective selection, missed-item prioritization, transparent reasons, short-answer separation, and offline version/cache registration validated');


// Release 16 Pass 4: guided progression through the existing case library.
const caseProgression = require('../js/case-progression.js');
const sampleCases = [{id:'a',title:'Foundation case',level:'foundation',estimatedMinutes:10,learningObjectives:['Map context'],tags:['access']},{id:'b',title:'Advanced case',level:'advanced',estimatedMinutes:15,learningObjectives:['Integrate pillars'],tags:['planning']},{id:'c',title:'Intermediate case',level:'intermediate',estimatedMinutes:12,learningObjectives:['Review systems'],tags:['governance']}];
const pathway = caseProgression.buildPathway(sampleCases,{a:{completedAt:'2026-10-04'}});
assert.deepStrictEqual(pathway.groups.map(g=>g.level),['foundation','intermediate','advanced'],'case levels should be sequenced from foundation to advanced');
assert.strictEqual(pathway.completed,1,'pathway should derive completion from existing case records');
assert.strictEqual(pathway.next.id,'c','next incomplete case should respect level sequence');
assert.strictEqual(pathway.stages.length,4,'case progression should expose four reasoning stages');
assert.ok(pathway.note.includes('not a validated measure'),'case completion must not be presented as competence');
assert.ok(html.includes('data-page="casepathway"') && html.includes('js/case-progression.js'),'case progression navigation/module missing');
assert.ok(sw.includes('./js/case-progression.js') && sw.includes("const CACHE='mindplan-v2.37.0'"),'case progression must be cached offline and versioned');
assert.ok(app.includes('function caseProgressionPage()') && app.includes('data-pathway-case'),'case progression UI/action integration missing');
assert.ok(fs.existsSync(path.join(root,'docs/release16-pass4-clinical-case-progression.md')),'Pass 4 documentation missing');
console.log('PASS: Release 16 Pass 4 case sequencing, completion derivation, reasoning stages, UI actions, source boundaries, and offline cache validated');


// Release 16 Pass 5: OSCE circuit and transparent self-review rubric.
assert.ok(app.includes("mode==='osce'") && app.includes("data-oral-start=\"osce\""), 'timed OSCE circuit entry missing');
assert.ok(app.includes('300000') && app.includes('osceTimer') && app.includes('Time elapsed'), 'five-minute station timer missing');
assert.ok(app.includes('OSCE_RUBRIC') && app.includes('Structured reasoning') && app.includes('Source fidelity and boundaries') && app.includes('Monitoring and limitations'), 'four-domain OSCE rubric missing');
assert.ok(app.includes('oralSaved.rubrics') && app.includes("mode:s.mode") && app.includes('rubrics:s.mode===\'osce\''), 'local OSCE rubric/session persistence missing');
assert.ok(app.includes('No pass/fail threshold is applied') && app.includes('not a validated examination'), 'OSCE competency boundary missing');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Release 16 Pass 5 version/cache mismatch');
console.log('PASS: Release 16 Pass 5 timed OSCE circuit, five-minute station timer, rubric, local session persistence, and interpretation safeguards validated');


// Release 16 Pass 6: educator session packs and print-friendly output.
assert.ok(html.includes('data-page="educator"') && html.includes('js/educator-mode.js'), 'Educator Mode navigation/module missing');
assert.ok(app.includes('function educatorPage()') && app.includes('educatorPrint') && app.includes('educatorPreview'), 'educator workspace and print/preview actions missing');
assert.ok(app.includes('Facilitator notes') && app.includes('Formative discussion / feedback') && app.includes('current local requirements'), 'facilitator guidance and source-boundary safeguards missing');
assert.ok(app.includes('window.open') && app.includes('window.print()') && app.includes('Choose a case or station first'), 'print output and empty-selection guard missing');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Release 16 Pass 6 version/cache mismatch');
assert.ok(fs.existsSync(path.join(root,'docs/release16-pass6-educator-mode.md')), 'Pass 6 documentation missing');
console.log('PASS: Release 16 Pass 6 educator planning, case/station pack assembly, preview/print, privacy safeguards, and offline version/cache registration validated');


// Release 16 Pass 7: static integration and deployment-readiness audit.
const pathMatches = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m=>m[1]).filter(v=>!/^https?:/i.test(v) && !v.startsWith('mailto:'));
for (const asset of pathMatches) {
  const localPath = asset.replace(/^\.\//,'').split('?')[0];
  if (localPath && !['#home'].includes(localPath)) assert.ok(fs.existsSync(path.join(root,localPath)), `index references missing local asset: ${asset}`);
}
const scriptPaths = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
for (const script of scriptPaths) {
  assert.ok(sw.includes(`./${script}`) || sw.includes(`'${script}'`) || sw.includes(`"${script}"`), `runtime script not explicitly precached for offline use: ${script}`);
}
const pageRoutes = [...html.matchAll(/data-page="([^"]+)"/g)].map(m=>m[1]);
for (const route of pageRoutes) assert.ok(app.includes(`page==='${route}'`) || route==='home' || app.includes(`page === '${route}'`), `navigation destination has no render route: ${route}`);
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'") && read('README.md').includes('v2.37.0 · October 2026 · Release 18 Pass 4'), 'current release metadata is inconsistent');
assert.ok(sw.includes('self.addEventListener(\'install\'') && sw.includes('self.addEventListener(\'activate\'') && sw.includes('self.addEventListener(\'fetch\''), 'service worker lifecycle handlers missing');
assert.ok(app.includes('Private by design') || html.includes('Private by design'), 'privacy disclosure missing');
assert.ok(read('docs/release16-pass7-integration-and-deployment-qa.md').includes('Manual deployment checklist'), 'manual browser QA boundary must be explicit');
console.log('PASS: Release 16 Pass 7 local asset links, script precache coverage, navigation route coverage, release metadata, service-worker lifecycle, privacy boundary, and deployment checklist validated');


// Release 17 Pass 2: curriculum crosswalk tests.
const curriculum = require('../js/curriculum-map.js');
const guideScript = read('data/study-guide-data.js');
const guide = Function(guideScript.replace('window.MINDPLAN_STUDY_GUIDE =', 'return').replace(/;\s*$/, ''))();
const caseScript = read('data/release2/cases.js');
const caseData = Function(caseScript.replace('window.MINDPLAN_CASE_DATA =', 'return').replace(/;\s*$/, ''))();
const bankScript = read('data/release14-question-bank.js');
const bank = Function(bankScript.replace('window.MINDPLAN_RELEASE14_BANK =', 'return').replace(/;\s*$/, ''))();
const oralBlock = app.match(/const ORAL_PROMPTS=([\s\S]*?)\n\];/);
assert.ok(oralBlock, 'oral prompt inventory should remain available for curriculum mapping');
const oral = Function('return '+oralBlock[1]+'\n]')();
const crosswalk = curriculum.buildMap({topics:guide.topics,cases:caseData.cases,assessment:assessment.questions,bank,oral});
assert.strictEqual(crosswalk.length,7,'curriculum crosswalk should include seven explicit learning themes');
assert.ok(crosswalk.every(t=>t.id&&t.title&&t.description&&t.source&&t.counts&&t.resources),'every theme must document its mapping and source boundary');
assert.ok(crosswalk.some(t=>t.resources.cases.some(c=>c.id==='school-campaign')),'promotion theme should link the school campaign case');
assert.ok(crosswalk.some(t=>t.resources.cases.some(c=>c.id==='rights-concern')),'rights theme should link rights concern case');
assert.ok(crosswalk.some(t=>t.resources.topics.some(x=>x.id==='plan-purpose')),'mandate theme should link Plan purpose topic');
assert.ok(crosswalk.every(t=>t.total===t.counts.topics+t.counts.cases+t.counts.questions+t.counts.stations),'resource totals should match category counts');
assert.ok(html.includes('data-page="curriculum"')&&html.includes('js/curriculum-map.js'),'curriculum map navigation and script must be registered');
assert.ok(app.includes("page==='curriculum')curriculumMapPage()")&&app.includes('function curriculumMapPage()'),'curriculum page route and renderer missing');
assert.ok(sw.includes('./js/curriculum-map.js')&&sw.includes("const CACHE='mindplan-v2.37.0'"),'curriculum map must be cached under current version');
assert.ok(read('docs/release17-pass1-curriculum-mapping.md').includes('keyword matching'),'mapping method and limits must be documented');
console.log('PASS: Release 17 Pass 2 curriculum crosswalk, resource links, theme coverage, source-boundary notes, navigation, and offline cache validated');

assert.ok(html.includes('data-page="portfolio"') && app.includes("page==='portfolio'"), 'Learning Portfolio route missing');
assert.ok(app.includes('mindplan-learning-portfolio-v1') && app.includes('mindplan-learning-portfolio.json'), 'portfolio persistence/export missing');
assert.ok((r=>r.includes('mindplan-learning-portfolio-v1'))(read('js/data-portability.js')), 'portfolio store missing from backup/reset key inventory');
assert.ok(app.includes('mindplan-learning-portfolio-summary') && app.includes('educatorPortfolioFile'), 'Release 17 Pass 5 portfolio import workflow missing');
assert.ok(app.includes('Formative learner portfolio review') && app.includes('educatorPrintReview'), 'Printable formative review sheet missing');
assert.ok(app.includes('file.size>2_000_000'), 'Portfolio import size guard missing');
assert.ok(app.includes('does not calculate a total') || app.includes('not a validated competency assessment') || app.includes('not a validated competency'), 'Portfolio review must state competency boundary');

// Release 17 Pass 5: longitudinal educator review cycle
assert.ok(app.includes('mindplan-educator-review-cycle-v1'), 'educator review-cycle local key missing');
assert.ok(app.includes('cycleFollowupDate') && app.includes('cycleAddReflection'), 'follow-up planning/reflection controls missing');
assert.ok(app.includes('mindplan-educator-review-cycle') && app.includes('cyclePrint'), 'review-cycle export/print workflow missing');
assert.ok(app.includes('cycleClear') && app.includes('Delete all locally saved educator review-cycle records'), 'review-cycle local deletion missing');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Release 17 Pass 5 version/cache mismatch');


// Release 17 Pass 6: educator follow-up dashboard
assert.ok(app.includes('id="cycleDashboard"') && app.includes('Upcoming follow-ups'), 'follow-up dashboard metrics missing');
assert.ok(app.includes('cycleFilterDue') && app.includes('cycleFilterFollowed') && app.includes('cycleFilterAll'), 'follow-up filters missing');
assert.ok(app.includes('overdue without reflection') || app.includes('Overdue · no reflection'), 'overdue-without-reflection status missing');
assert.ok(app.includes("const cycleStatus=x=>") && app.includes("st==='followed'"), 'review-cycle status derivation missing');
assert.ok(app.includes('does not establish that the goal was achieved') || read('docs/release17-pass6-educator-follow-up-dashboard.md').includes('does not establish that the goal was achieved'), 'dashboard interpretation limit missing');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'") && read('README.md').includes('Release 17 · Pass 6'), 'Release 17 Pass 6 version/cache/docs mismatch');
console.log('PASS: Release 17 Pass 6 educator follow-up dashboard, status rules, filters, privacy boundary, and cache metadata validated');


// Release 17 Pass 7: final integration and deployment QA
const versionMatch = html.match(/v(\d+\.\d+\.\d+) · October 2026/);
assert.ok(versionMatch, 'visible app version metadata missing');
const currentVersion = versionMatch[1];
assert.ok(sw.includes(`const CACHE='mindplan-v${currentVersion}'`), 'service worker cache must match visible app version');
assert.ok(read('README.md').includes(`v${currentVersion} · October 2026 · Release 18 Pass 4`), 'README current release metadata mismatch');
assert.ok(read('README.md').includes('Release 17 · Pass 7 — Final integration and deployment QA'), 'Pass 7 historical release note missing');
const scriptRefs = [...html.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>m[1]);
for (const ref of scriptRefs) assert.ok(fs.existsSync(path.join(root, ref)), `index.html script reference missing: ${ref}`);
const styleRefs = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css)["']/g)].map(m=>m[1]);
for (const ref of styleRefs) assert.ok(fs.existsSync(path.join(root, ref)), `index.html stylesheet reference missing: ${ref}`);
const precacheMatch = sw.match(/const FILES=\[(.*?)\];/);
assert.ok(precacheMatch, 'service worker precache inventory missing');
const precache = [...precacheMatch[1].matchAll(/["']([^"']+)["']/g)].map(m=>m[1]);
for (const asset of precache) { const local = asset.replace(/^\.\//,''); assert.ok(fs.existsSync(path.join(root, local)), `service worker precache asset missing: ${asset}`); }
const pageIds = [...html.matchAll(/data-page=["']([^"']+)["']/g)].map(m=>m[1]);
for (const id of new Set(pageIds)) assert.ok(app.includes(`page==='${id}'`) || app.includes(`page === '${id}'`) || id==='home', `navigation page has no obvious route handler: ${id}`);
assert.ok(read('docs/release17-pass7-integration-and-deployment-qa.md').includes('manual, not implied complete'), 'manual browser QA limitations must be explicit');
console.log(`PASS: Release 17 Pass 7 integration QA; ${scriptRefs.length} local scripts, ${styleRefs.length} stylesheets, ${precache.length} precache entries; version ${currentVersion}`);

// Release 17 Pass 8: local HTTP smoke test and deployment acceptance documentation.
assert.ok(fs.existsSync(path.join(root,'tests/deployment-smoke.js')), 'deployment HTTP smoke test missing');
assert.ok(fs.existsSync(path.join(root,'docs/release17-pass8-http-smoke-and-acceptance.md')), 'Pass 8 acceptance guide missing');
assert.ok(read('README.md').includes('Release 17 · Pass 8 — HTTP deployment smoke test'), 'Pass 8 README release note missing');
assert.ok(read('tests/deployment-smoke.js').includes('LIMIT: browser interaction'), 'smoke test must not overclaim browser QA');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Pass 8 version/cache mismatch');
console.log('PASS: Release 17 Pass 8 HTTP smoke harness, manual acceptance checklist, honest browser-testing boundary, and release metadata validated');

// Release 18 Pass 1: audit all browser-local stores against backup/reset inventory.
assert.ok(portability.DEFAULT_KEYS.includes('mindplan-educator-review-cycle-v1'), 'educator review-cycle store must participate in unified backup/import/reset');
assert.ok(read('docs/release18-pass1-integration-audit.md').includes('unified learning-backup export'), 'Pass 1 audit finding and fix must be documented');
assert.ok(read('README.md').includes('Release 18 · Pass 1 — Integration audit and local-data workflow'), 'Pass 1 README release note missing');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Release 18 Pass 1 version/cache mismatch');
console.log('PASS: Release 18 Pass 1 local-data inventory regression, integration audit documentation, and version/cache metadata validated');

// Release 18 Pass 2: strict backup validation, size limits, and rollback on storage failure.
const validEmptyCycleBackup = portability.makeBackup({'mindplan-educator-review-cycle-v1':[]}, '2026-10-04T00:00:00.000Z', '2.37.0');
assert.strictEqual(portability.makeBackup({x:{}}).appVersion,'2.37.0','backup metadata should use current app version by default');
assert.deepStrictEqual(portability.validateBackup(validEmptyCycleBackup).stores['mindplan-educator-review-cycle-v1'], [], 'empty educator cycle list should be valid');
assert.throws(()=>portability.validateBackup({format:'mindplan-learning-backup',schemaVersion:2,stores:{'mindplan-release2-state-v1':{completed:{},saved:{}}}}), /Unsupported backup/, 'unsupported schema version must be rejected');
assert.throws(()=>portability.validateBackup({format:'mindplan-learning-backup',schemaVersion:1,stores:{'mindplan-educator-review-cycle-v1':{cycles:[]}}}), /Invalid educator review-cycle/, 'wrong educator cycle structure must be rejected');
assert.throws(()=>portability.validateBackup({format:'mindplan-learning-backup',schemaVersion:1,stores:{'mindplan-study-plan-v1':{dailyMinutes:999}}}), /Invalid study-plan/, 'invalid study-plan preference must be rejected');
assert.throws(()=>portability.validateBackup({format:'mindplan-learning-backup',schemaVersion:1,stores:{'mindplan-learning-portfolio-v1':{reflection:'x'.repeat(2*1024*1024+1)}}}), /too large/, 'oversized data category must be rejected');
const fakeStorage = (()=>{const data=new Map([['a','old-a'],['b','old-b']]);let writes=0;return {getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>{writes++;if(k==='b'&&writes===2)throw Error('simulated quota failure');data.set(k,v)},removeItem:k=>data.delete(k),data}})();
assert.throws(()=>portability.applyBackup(fakeStorage,{a:{new:true},b:{new:true}}), /previous records were restored/, 'failed import should report rollback');
assert.strictEqual(fakeStorage.getItem('a'),'old-a','failed import should restore prior value for earlier writes');
assert.strictEqual(fakeStorage.getItem('b'),'old-b','failed import should preserve value for failed write');
assert.ok(app.includes('MINDPLAN_PORTABILITY.applyBackup(localStorage,validated.stores)'), 'app must use transactional backup application');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Release 18 Pass 2 version/cache mismatch');
console.log('PASS: Release 18 Pass 2 strict backup validation, data-size limits, transactional import rollback, and version/cache metadata validated');


// Release 18 Pass 3: exercise full learning-data backup/restore lifecycle across every recognized store.
const workflowKeys = portability.DEFAULT_KEYS;
assert.strictEqual(new Set(workflowKeys).size, workflowKeys.length, 'backup/reset key inventory must not contain duplicates');
const workflowFixture = {
  'mindplan-release2-state-v1': {completed:{'case-a':{completedAt:'2026-10-04'}},saved:{'case-a':'reflection'}},
  'mindplan-flashcards-v1': {known:{cardA:2},due:{cardA:'2026-10-05'}},
  'mindplan-assessment-v1': {attempts:[{id:'attempt-a',score:3}],topics:{'plan-purpose':{correct:2,total:3}}},
  'mindplan-study-guide-v1': {'plan-purpose':{read:true}},
  'mindplan-high-yield-revision-v1': {reviewed:{topicA:true},lastTopic:'topicA'},
  'mindplan-study-plan-v1': {dailyMinutes:30},
  'mindplan-oral-v1': {sessions:[{id:'oral-a',notes:'practice'}],ratings:{stationA:3}},
  'mindplan-learning-portfolio-v1': {goals:'Improve formulation',reflection:'Review access barriers'},
  'mindplan-educator-review-cycle-v1': [{id:'cycle-a',goal:'Follow up',reflection:'Discussed'}]
};
assert.deepStrictEqual(Object.keys(workflowFixture).sort(), workflowKeys.slice().sort(), 'every recognized data store must have a lifecycle fixture');
const workflowBackup = portability.makeBackup(workflowFixture, '2026-10-04T00:00:00.000Z');
const validatedWorkflow = portability.validateBackup(JSON.parse(JSON.stringify(workflowBackup)));
assert.deepStrictEqual(validatedWorkflow.stores, workflowFixture, 'all stores must survive JSON export/import validation unchanged');
const memoryStorage = (initial={}) => { const map=new Map(Object.entries(initial).map(([k,v])=>[k,JSON.stringify(v)])); return {getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k), keys:()=>[...map.keys()], parsed:k=>JSON.parse(map.get(k))}; };
const restoredStorage = memoryStorage({ 'mindplan-theme':'dark', 'unrelated-app-store':{keep:true} });
assert.strictEqual(portability.applyBackup(restoredStorage, validatedWorkflow.stores), workflowKeys.length, 'restore should report every imported store');
for (const k of workflowKeys) assert.deepStrictEqual(restoredStorage.parsed(k), workflowFixture[k], `round-trip mismatch for ${k}`);
assert.strictEqual(restoredStorage.parsed('mindplan-theme'), 'dark', 'theme must not be overwritten when absent from backup');
assert.deepStrictEqual(JSON.parse(restoredStorage.getItem('unrelated-app-store')), {keep:true}, 'unrelated app data must remain untouched');
// Partial restore must replace only named stores and leave all other learning data intact.
const partialStorage = memoryStorage({'mindplan-release2-state-v1':{completed:{old:true},saved:{}},'mindplan-flashcards-v1':{keep:{n:1}}});
portability.applyBackup(partialStorage, {'mindplan-release2-state-v1':workflowFixture['mindplan-release2-state-v1']});
assert.deepStrictEqual(partialStorage.parsed('mindplan-release2-state-v1'), workflowFixture['mindplan-release2-state-v1'], 'selected store should be restored');
assert.deepStrictEqual(partialStorage.parsed('mindplan-flashcards-v1'), {keep:{n:1}}, 'partial restore must preserve omitted store');
// Inventory used by full reset is the same exported inventory; theme is intentionally separate.
assert.ok(app.includes('const ALL_DATA_KEYS=window.MINDPLAN_PORTABILITY.DEFAULT_KEYS'), 'full reset must use the centralized store inventory');
assert.ok(app.includes('ALL_DATA_KEYS.forEach(k=>localStorage.removeItem(k))'), 'full reset must remove all recognized stores');
assert.ok(app.includes("localStorage.setItem(THEME"), 'theme preference must be managed separately from learning-data reset');
// A malformed locally stored JSON value should fail export cleanly through the UI's guarded workflow.
assert.ok(app.includes("try{downloadJson(buildBackup(),'mindplan-learning-backup.json')") && app.includes("toast('Export failed: browser storage may be unavailable.')"), 'export workflow must surface a safe error for unreadable local storage');
assert.ok(app.includes('if(!file)return'), 'cancelled file selection must not proceed with import');
assert.ok(app.includes('if(!confirm(`Import ${keys.length} data categories'), 'restore must require user confirmation');
assert.ok(read('docs/release18-pass3-full-workflow-tests.md').includes('do not simulate real user interactions'), 'Pass 3 must document limits of automated lifecycle tests');
assert.ok(read('README.md').includes('## Release 18 · Pass 3 — Full learning-data workflow tests') && read('docs/release18-pass3-full-workflow-tests.md').includes('lifecycle'), 'Pass 3 historical documentation must remain present');
console.log(`PASS: Release 18 Pass 3 full learning-data lifecycle fixtures; ${workflowKeys.length} stores exported, validated, restored and compared; partial restore, preservation boundaries, reset inventory and guarded UI workflow validated`);

// Release 18 Pass 4: acceptance evidence and limitations are documented.
assert.ok(fs.existsSync(path.join(root,'docs/release18-pass4-browser-acceptance.md')), 'Pass 4 browser acceptance guide missing');
assert.ok(read('README.md').includes('Release 18 · Pass 4 — Browser acceptance and deployment readiness'), 'Pass 4 README release note missing');
assert.ok(read('docs/release18-pass4-browser-acceptance.md').includes('not passed'), 'blocked real-browser checks must not be reported as passed');
assert.ok(html.includes('v2.37.0') && sw.includes("const CACHE='mindplan-v2.37.0'"), 'Pass 4 version/cache mismatch');
console.log('PASS: Release 18 Pass 4 acceptance guide, version/cache consistency, and honest browser-test limitations validated');
