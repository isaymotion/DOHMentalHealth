/* MindPlan Release 15 Pass 4 — transparent study-plan prioritization. */
(function(root){'use strict';
 const DEFAULT_MINUTES=20, MIN_MINUTES=5, MAX_MINUTES=120;
 function clampMinutes(value){const n=Number(value);return Number.isFinite(n)?Math.min(MAX_MINUTES,Math.max(MIN_MINUTES,Math.round(n/5)*5)):DEFAULT_MINUTES;}
 function buildPlan(input={}){
  const budget=clampMinutes(input.dailyMinutes), tasks=[];
  const due=Math.max(0,Number(input.dueCards)||0), fresh=Math.max(0,Number(input.newCards)||0);
  if(due)tasks.push({id:'due-cards',title:'Review due flashcards',minutes:Math.min(due,Math.max(1,Math.floor(budget*.4)))*1,kind:'flashcards',reason:`${due} card${due===1?' is':'s are'} due based on your saved review dates.`,priority:1,available:due});
  const topics=Array.isArray(input.topics)?input.topics:[];
  topics.filter(t=>t.label==='Needs review').forEach(t=>tasks.push({id:'topic-'+t.topic,title:'Revisit: '+t.topic,minutes:5,kind:'assessment',reason:`Latest recorded responses suggest review may help (${t.correct}/${t.answered} correct across ${t.distinctItems} distinct items).`,priority:2}));
  topics.filter(t=>t.label==='Limited data').forEach(t=>tasks.push({id:'topic-'+t.topic,title:'Build evidence: '+t.topic,minutes:5,kind:'assessment',reason:`Only ${t.distinctItems} distinct objective item${t.distinctItems===1?'':'s'} recorded; this is insufficient for a performance band.`,priority:3}));
  topics.filter(t=>t.label==='Developing').forEach(t=>tasks.push({id:'topic-'+t.topic,title:'Strengthen: '+t.topic,minutes:5,kind:'assessment',reason:`Current sample is ${Math.round((t.accuracy||0)*100)}%; use another practice set to consolidate.`,priority:4}));
  if(fresh)tasks.push({id:'new-cards',title:'Learn new flashcards',minutes:Math.min(fresh,Math.max(1,Math.floor(budget*.25))),kind:'flashcards',reason:`${fresh} card${fresh===1?' is':'s are'} new and have no saved review schedule.`,priority:5,available:fresh});
  const cases=Math.max(0,Number(input.uncompletedCases)||0);if(cases)tasks.push({id:'case-practice',title:'Complete a case exercise',minutes:10,kind:'cases',reason:`${cases} fictional case${cases===1?' remains':'s remain'} uncompleted on this device.`,priority:6,available:cases});
  const unreviewed=Math.max(0,Number(input.unreviewedTopics)||0);if(unreviewed)tasks.push({id:'study-guide',title:'Review a Study Guide topic',minutes:5,kind:'studyguide',reason:`${unreviewed} Study Guide topic${unreviewed===1?' is':'s are'} not marked reviewed.`,priority:7,available:unreviewed});
  tasks.sort((a,b)=>a.priority-b.priority||a.title.localeCompare(b.title));let remaining=budget;const selected=[];
  for(const task of tasks){if(remaining<=0)break;const minutes=Math.min(task.minutes,remaining);if(minutes<=0)continue;selected.push({...task,minutes});remaining-=minutes;}
  return {dailyMinutes:budget,plannedMinutes:budget-remaining,remainingMinutes:remaining,tasks:selected,notScheduled:tasks.length-selected.length,note:'Recommendations are heuristic study suggestions, not validated predictions of learning or clinical competence.'};
 }
 const api={DEFAULT_MINUTES,MIN_MINUTES,MAX_MINUTES,clampMinutes,buildPlan};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MINDPLAN_STUDY_PLAN=api;
})(typeof window!=='undefined'?window:globalThis);
