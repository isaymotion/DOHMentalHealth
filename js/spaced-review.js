/* MindPlan Release 15 Pass 3 — transparent local spaced-review scheduler. */
(function(root){
  'use strict';
  const MAX_INTERVAL_DAYS=60, MAX_HISTORY=20;
  const VALID_RATINGS=['again','difficult','mastered'];
  function addDays(iso,days){const d=new Date(iso);d.setDate(d.getDate()+days);return d.toISOString();}
  function scheduleReview(previous,rating,now){
    if(!VALID_RATINGS.includes(rating)) throw new Error('Unknown review rating');
    const prior=Math.max(0,Number(previous&&previous.intervalDays)||0);
    let days;
    if(rating==='again') days=0;
    else if(rating==='difficult') days=prior<1?1:Math.max(1,Math.round(prior*1.2));
    else days=prior<1?3:prior<=3?7:Math.min(MAX_INTERVAL_DAYS,Math.max(1,Math.round(prior*2)));
    days=Math.min(MAX_INTERVAL_DAYS,days);
    const reviewedAt=(now instanceof Date?now:new Date(now||Date.now())).toISOString();
    return {status:rating==='mastered'?'mastered':rating,intervalDays:days,reviewedAt,due:addDays(reviewedAt,days),reviewCount:Math.max(0,Number(previous&&previous.reviewCount)||0)+1};
  }
  function isDue(state,now){if(!state||!state.due)return true;const t=Date.parse(state.due);return !Number.isFinite(t)||t<=(now instanceof Date?now.getTime():now==null?Date.now():new Date(now).getTime());}
  function reviewEvent(state,cardId,rating,now){
    const next=scheduleReview(state&&state[cardId],rating,now);
    const out=Object.assign({},state||{});const old=out[cardId]||{};
    const history=Array.isArray(old.history)?old.history.slice():[];
    history.push({rating,reviewedAt:next.reviewedAt,intervalDays:next.intervalDays,due:next.due});
    next.history=history.slice(-MAX_HISTORY);out[cardId]=next;return out;
  }
  const api={MAX_INTERVAL_DAYS,MAX_HISTORY,VALID_RATINGS,scheduleReview,isDue,reviewEvent};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MINDPLAN_SPACED_REVIEW=api;
})(typeof window!=='undefined'?window:globalThis);
