(function(root){'use strict';
function selectAdaptiveQuestions(questions, attempts, count=10){
 const pool=(Array.isArray(questions)?questions:[]).filter(q=>q&&q.type!=='short');
 const history=Array.isArray(attempts)?attempts.slice(0,10):[];
 const stats=new Map();
 for(const attempt of history){
  const ids=Array.isArray(attempt.items)?attempt.items:[];
  for(const id of ids){const q=pool.find(x=>x.id===id);if(!q)continue;const a=(attempt.answers||{})[id]||{};let answered=false,correct=false;
   if(q.type==='multi'){answered=!!a.submitted;const got=(a.selectedIndices||[]).slice().sort((x,y)=>x-y),want=(q.correctIndices||[]).slice().sort((x,y)=>x-y);correct=answered&&got.length===want.length&&got.every((v,i)=>v===want[i]);}
   else {answered=a.selected!==undefined;correct=answered&&a.selected===q.correct;}
   const s=stats.get(id)||{seen:0,missed:0,lastAt:0};if(answered){s.seen++;if(!correct)s.missed++;s.lastAt=Math.max(s.lastAt,Date.parse(attempt.at)||0);stats.set(id,s);}
  }
 }
 const topicRates={};for(const q of pool){const s=stats.get(q.id);if(!s)continue;(topicRates[q.topic]??={seen:0,missed:0});topicRates[q.topic].seen+=s.seen;topicRates[q.topic].missed+=s.missed;}
 const scored=pool.map((q,index)=>{const s=stats.get(q.id)||{seen:0,missed:0,lastAt:0};const tr=topicRates[q.topic]||{seen:0,missed:0};let priority=0,reason='Not seen in recent saved objective attempts';
  if(s.seen&&s.missed){priority=100+(s.missed/s.seen)*20;reason='Previously missed objective item';}
  else if(tr.seen&&tr.missed/tr.seen>=.4){priority=75;reason='Topic has repeated errors in recent objective attempts';}
  else if(!s.seen){priority=50;reason='New objective item for broader coverage';}
  else {priority=20;reason='Reinforcement and retrieval practice';}
  return {q,index,priority,reason,lastAt:s.lastAt,seen:s.seen};
 });
 scored.sort((a,b)=>b.priority-a.priority||a.lastAt-b.lastAt||a.index-b.index);
 const limit=Math.max(1,Math.min(Number.isFinite(count)?Math.floor(count):10,pool.length));
 return {items:scored.slice(0,limit).map(x=>x.q),reasons:scored.slice(0,limit).map(x=>({id:x.q.id,topic:x.q.topic,reason:x.reason,priority:x.priority})),note:'Adaptive selection is a transparent practice heuristic based on recent saved objective responses. It is not a validated adaptive test and does not estimate clinical competence.'};
}
const api={selectAdaptiveQuestions};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MINDPLAN_ADAPTIVE=api;
})(typeof window!=='undefined'?window:globalThis);
