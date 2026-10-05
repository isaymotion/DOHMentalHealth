/* Release 16 Pass 4: structured progression through the existing fictional case library. */
(function(root){
'use strict';
const ORDER={foundation:0,intermediate:1,advanced:2};
const LABEL={foundation:'Foundation',intermediate:'Integration',advanced:'Systems application'};
function buildPathway(cases,completed={}){
 const ordered=[...(cases||[])].sort((a,b)=>(ORDER[a.level]??9)-(ORDER[b.level]??9)||String(a.title).localeCompare(String(b.title)));
 const stages=['Notice context and social determinants','Formulate the system or service problem','Choose proportionate, coordinated actions','Select indicators and reflect on limits'];
 const groups=['foundation','intermediate','advanced'].map(level=>{
  const items=ordered.filter(c=>c.level===level).map(c=>({id:c.id,title:c.title,level:c.level,minutes:c.estimatedMinutes||10,objective:(c.learningObjectives||[])[0]||'Apply the strategic framework to the scenario.',tags:c.tags||[],done:!!completed[c.id]}));
  return {level,label:LABEL[level],items,done:items.filter(x=>x.done).length,total:items.length};
 }).filter(g=>g.total);
 return {groups,stages,total:ordered.length,completed:ordered.filter(c=>completed[c.id]).length,next:ordered.find(c=>!completed[c.id])||null,note:'Sequence is an educational interpretation of the case levels and learning objectives. Case completion is not a validated measure of clinical competence.'};
}
const api={buildPathway};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.MINDPLAN_CASE_PROGRESSION=api;
})(typeof window!=='undefined'?window:globalThis);
