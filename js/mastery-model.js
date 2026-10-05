/* MindPlan Release 15 Pass 2 — transparent, formative topic mastery model.
   No persistence or DOM access: pure functions for testability and reuse. */
(function(root){
  'use strict';
  const MIN_DISTINCT_ITEMS = 3;
  const THRESHOLDS = Object.freeze({ needsReviewBelow: 0.60, developingBelow: 0.80 });
  function isObjective(q){ return !!q && (q.type === 'single' || q.type === 'truefalse' || q.type === 'multi'); }
  function evaluateObjective(q, answer){
    if(!isObjective(q) || !answer) return null;
    if(q.type === 'multi'){
      if(!answer.submitted) return null;
      const got = Array.isArray(answer.selectedIndices) ? [...new Set(answer.selectedIndices)].sort((a,b)=>a-b) : [];
      const expected = [...q.correctIndices].sort((a,b)=>a-b);
      return got.length === expected.length && got.every((v,i)=>v === expected[i]);
    }
    if(!Number.isInteger(answer.selected)) return null;
    return answer.selected === q.correct;
  }
  function deriveTopicMastery(attempts, standardQuestions, release14Questions){
    const standard = new Map((standardQuestions||[]).map(q=>[q.id,q]));
    const release14 = new Map((release14Questions||[]).map(q=>[q.id,q]));
    const latestByQuestion = new Map();
    const selfChecks = {};
    const ordered = (attempts||[]).filter(a=>a && Array.isArray(a.items)).slice().sort((a,b)=>String(a.at||'').localeCompare(String(b.at||'')));
    ordered.forEach(attempt=>{
      const bank = attempt.bank === 'release14' ? release14 : standard;
      (attempt.items||[]).forEach(id=>{
        const q = bank.get(id);
        if(!q || !q.topic) return;
        if(q.type === 'short'){
          const checks = attempt.shortChecks && attempt.shortChecks[id];
          if(Array.isArray(checks)){
            const key=q.topic; selfChecks[key] ||= {checkedElements:0,possibleElements:0,responses:0};
            selfChecks[key].checkedElements += new Set(checks).size;
            selfChecks[key].possibleElements += (q.checklist||[]).length;
            selfChecks[key].responses++;
          }
          return;
        }
        const result = evaluateObjective(q, attempt.answers && attempt.answers[id]);
        if(result === null) return;
        latestByQuestion.set(id,{topic:q.topic,correct:result,at:attempt.at||''});
      });
    });
    const topics = {};
    latestByQuestion.forEach((v,id)=>{
      topics[v.topic] ||= {topic:v.topic,correct:0,answered:0,distinctItems:0,itemIds:[],accuracy:null,label:'Not assessed',sample:'No objective responses recorded',selfCheck:null};
      const t=topics[v.topic]; t.answered++;t.distinctItems++;t.itemIds.push(id);if(v.correct)t.correct++;
    });
    Object.values(topics).forEach(t=>{
      t.accuracy=t.answered?t.correct/t.answered:null;
      if(t.distinctItems < MIN_DISTINCT_ITEMS){t.label='Limited data';t.sample=`${t.distinctItems} distinct objective item${t.distinctItems===1?'':'s'}; at least ${MIN_DISTINCT_ITEMS} needed for a band`}
      else if(t.accuracy < THRESHOLDS.needsReviewBelow){t.label='Needs review';t.sample=`${t.distinctItems} distinct objective items; latest recorded response per item`}
      else if(t.accuracy < THRESHOLDS.developingBelow){t.label='Developing';t.sample=`${t.distinctItems} distinct objective items; latest recorded response per item`}
      else {t.label='Strong evidence';t.sample=`${t.distinctItems} distinct objective items; latest recorded response per item`}
      delete t.itemIds;
    });
    Object.entries(selfChecks).forEach(([topic,s])=>{
      topics[topic] ||= {topic,correct:0,answered:0,distinctItems:0,accuracy:null,label:'Not assessed',sample:'No objective responses recorded'};
      topics[topic].selfCheck={checkedElements:s.checkedElements,possibleElements:s.possibleElements,responses:s.responses,proportion:s.possibleElements?s.checkedElements/s.possibleElements:null,label:'Self-check only — not objective accuracy'};
    });
    return {topics, rules:{minimumDistinctItems:MIN_DISTINCT_ITEMS,needsReviewBelow:THRESHOLDS.needsReviewBelow,developingBelow:THRESHOLDS.developingBelow,strongEvidenceAtOrAbove:THRESHOLDS.developingBelow,objectiveMethod:'latest answered response per distinct objective item across retained attempts',shortAnswerMethod:'separate checklist self-check; excluded from objective accuracy',note:'Formative study guidance only; not a validated measure of competence.'}};
  }
  const api={MIN_DISTINCT_ITEMS,THRESHOLDS,isObjective,evaluateObjective,deriveTopicMastery};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
  else root.MINDPLAN_MASTERY_MODEL=api;
})(typeof window!=='undefined'?window:globalThis);
