(function(root){'use strict';
function buildReviewQueue(input={}){
 const out=[];const add=(id,kind,title,reason,priority,action,meta={})=>out.push({id,kind,title,reason,priority,action,...meta});
 (input.dueCards||[]).forEach(c=>add('card-'+c.id,'flashcard',c.q||'Review a due flashcard', 'Scheduled review is due now.',1,{page:'flashcards',cardId:c.id},{cardId:c.id}));
 const topics=Array.isArray(input.topics)?input.topics:[];
 topics.filter(t=>t.label==='Needs review').forEach(t=>add('topic-review-'+t.topic,'topic','Review: '+t.topic,`${t.correct}/${t.answered} correct across ${t.distinctItems} distinct objective items.`,2,{page:'assessment',topic:t.topic},{topic:t.topic}));
 const missed=Array.isArray(input.missedTopics)?input.missedTopics:[];
 missed.filter(t=>!topics.some(m=>m.topic===t.topic&&m.label==='Needs review')).forEach(t=>add('missed-'+t.topic,'missed','Revisit missed concept: '+t.topic,`${t.missed} missed response${t.missed===1?'':'s'} recorded for this topic in recent objective attempts.`,3,{page:'assessment',topic:t.topic},{topic:t.topic}));
 topics.filter(t=>t.label==='Limited data').forEach(t=>add('topic-data-'+t.topic,'evidence','Build evidence: '+t.topic,`Only ${t.distinctItems} distinct objective item${t.distinctItems===1?'':'s'} recorded; this is limited evidence, not a low-performance rating.`,4,{page:'assessment',topic:t.topic},{topic:t.topic}));
 topics.filter(t=>t.label==='Developing').forEach(t=>add('topic-developing-'+t.topic,'topic','Strengthen: '+t.topic,`${Math.round((t.accuracy||0)*100)}% across ${t.distinctItems} distinct objective items; further practice may help.`,5,{page:'assessment',topic:t.topic},{topic:t.topic}));
 if(input.newCards?.length)add('new-cards','flashcard','Learn new flashcards',`${input.newCards.length} card${input.newCards.length===1?' has':'s have'} not been reviewed yet.`,6,{page:'flashcards',filter:'new'});
 if(input.uncompletedCases?.length)add('cases','case','Complete a case exercise',`${input.uncompletedCases.length} fictional case${input.uncompletedCases.length===1?' is':'s are'} unfinished.`,7,{page:'cases'});
 if(input.unreviewedGuide?.length)add('guide','studyguide','Review a Study Guide topic',`${input.unreviewedGuide.length} topic${input.unreviewedGuide.length===1?' is':'s are'} not marked reviewed.`,8,{page:'studyguide'});
 if(input.unreviewedRevision?.length)add('revision','revision','Continue High-Yield Revision',`${input.unreviewedRevision.length} topic${input.unreviewedRevision.length===1?' is':'s are'} not marked reviewed.`,9,{page:'revision'});
 out.sort((a,b)=>a.priority-b.priority||a.title.localeCompare(b.title));
 return {items:out,counts:{dueCards:(input.dueCards||[]).length,needsReview:topics.filter(t=>t.label==='Needs review').length,missedConcepts:missed.length,newCards:(input.newCards||[]).length,unfinishedCases:(input.uncompletedCases||[]).length,unreviewedGuide:(input.unreviewedGuide||[]).length},note:'Priority order is a transparent study heuristic, not a validated measure of learning or clinical competence.'};
}
const api={buildReviewQueue};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MINDPLAN_REVIEW_QUEUE=api;
})(typeof window!=='undefined'?window:globalThis);
