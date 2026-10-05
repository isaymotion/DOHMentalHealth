(function(root){
'use strict';
const DEFAULT_KEYS=['mindplan-release2-state-v1','mindplan-flashcards-v1','mindplan-assessment-v1','mindplan-study-guide-v1','mindplan-high-yield-revision-v1','mindplan-study-plan-v1','mindplan-oral-v1','mindplan-learning-portfolio-v1','mindplan-educator-review-cycle-v1'];
function makeBackup(stores,exportedAt=new Date().toISOString(),appVersion='2.37.0') { return {format:'mindplan-learning-backup',schemaVersion:1,exportedAt,appVersion,stores}; }
function validateBackup(data){
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Expected a JSON object.');
 if(data.format!=='mindplan-learning-backup'||data.schemaVersion!==1)throw Error('Unsupported backup format or version.');
 if(!data.stores||typeof data.stores!=='object'||Array.isArray(data.stores))throw Error('Backup has no valid data stores.');
 const allowed=new Set(DEFAULT_KEYS.concat(['mindplan-theme'])),stores={};
 let total=0;
 for(const [k,v] of Object.entries(data.stores)){
  if(!allowed.has(k))throw Error('Unrecognized data category: '+k);
  if(k==='mindplan-theme'){if(!['light','dark'].includes(v))throw Error('Invalid theme value.');stores[k]=v;continue;}
  if(k==='mindplan-educator-review-cycle-v1'){if(!Array.isArray(v))throw Error('Invalid educator review-cycle records.');}else if(v===null||typeof v!=='object'||Array.isArray(v))throw Error('Invalid data in '+k+'.');
  let serialized;try{serialized=JSON.stringify(v);if(typeof serialized!=='string')throw Error()}catch(_){throw Error('Data in '+k+' is not valid JSON data.')}
  total+=serialized.length;
  if(serialized.length>2*1024*1024)throw Error('Data category is too large: '+k);
  if(total>5*1024*1024)throw Error('Combined backup data exceeds 5 MB.');
  if(k==='mindplan-release2-state-v1'&&(!isRecord(v.completed)||!isRecord(v.saved)))throw Error('Invalid case progress structure.');
  if(k==='mindplan-assessment-v1'&&(!Array.isArray(v.attempts)||!isRecord(v.topics)))throw Error('Invalid assessment history structure.');
  if(k==='mindplan-flashcards-v1'&&!isRecord(v))throw Error('Invalid flashcard progress structure.');
  if(k==='mindplan-study-guide-v1'&&!isRecord(v))throw Error('Invalid Study Guide progress structure.');
  if(k==='mindplan-high-yield-revision-v1'&&(!isRecord(v.reviewed)||!(v.lastTopic===undefined||typeof v.lastTopic==='string')))throw Error('Invalid revision progress structure.');
  if(k==='mindplan-study-plan-v1'&&!(v.dailyMinutes===undefined||(Number.isFinite(v.dailyMinutes)&&v.dailyMinutes>=5&&v.dailyMinutes<=120)))throw Error('Invalid study-plan preferences.');
  if(k==='mindplan-oral-v1'&&((v.sessions!==undefined&&!Array.isArray(v.sessions))||(v.ratings!==undefined&&!isRecord(v.ratings))))throw Error('Invalid oral-exam records.');
  if(k==='mindplan-learning-portfolio-v1'&&((v.goals!==undefined&&typeof v.goals!=='string')||(v.reflection!==undefined&&typeof v.reflection!=='string')))throw Error('Invalid learning portfolio.');
  if(k==='mindplan-educator-review-cycle-v1'&&!v.every(x=>isRecord(x)))throw Error('Invalid educator review-cycle entry.');
  stores[k]=v;
 }
 if(!Object.keys(stores).length)throw Error('Backup contains no data.');
 return {stores};
}
function isRecord(v){return !!v&&typeof v==='object'&&!Array.isArray(v)}
function applyBackup(storage,stores){
 const before={};for(const k of Object.keys(stores))before[k]=storage.getItem(k);
 const written=[];
 try{for(const [k,v] of Object.entries(stores)){written.push(k);storage.setItem(k,JSON.stringify(v))}}
 catch(error){let rollbackErrors=0;for(const k of written.reverse()){try{if(before[k]===null)storage.removeItem(k);else storage.setItem(k,before[k])}catch(_){rollbackErrors++}}if(rollbackErrors)throw Error('Import failed and rollback was incomplete; check browser storage and restore from your backup.');throw Error('Import failed; previous records were restored where possible. '+(error.message||''))}
 return Object.keys(stores).length;
}
if(typeof module!=='undefined'&&module.exports)module.exports={DEFAULT_KEYS,makeBackup,validateBackup,applyBackup};
root.MINDPLAN_PORTABILITY={DEFAULT_KEYS,makeBackup,validateBackup,applyBackup};
})(typeof window!=='undefined'?window:globalThis);
