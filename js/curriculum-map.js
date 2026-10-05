/* Release 17 Pass 1 — curriculum crosswalk. This is an explicit educational mapping,
   not an official curriculum or competency framework published by the source Plan. */
(function(root){
  const THEMES = [
    {id:'mandate',title:'Plan mandate, context, and goals',description:'Understand the document’s purpose, policy context, vision, mission, and three goals.',keywords:['purpose','mandate','policy context','vision','mission','goals','framework','mental health act','ra 11036'],pillars:[],source:'Source-derived Study Guide content; cross-resource alignment is an educational interpretation.'},
    {id:'promotion',title:'Promotion and prevention',description:'Connect promotion/prevention concepts to learning material and fictional community/school scenarios.',keywords:['promotion','prevention','school','literacy','awareness','wellbeing','community campaign'],pillars:['Promotion and Prevention'],source:'The pillar name is source-derived; links between individual activities and resources are educational interpretations.'},
    {id:'governance',title:'Leadership, governance, and coordination',description:'Explore responsibilities, intersectoral coordination, local planning, and implementation constraints.',keywords:['governance','coordination','leadership','planning','responsibility','accountability','financing','funding','implementation'],pillars:['Leadership and Governance'],source:'The pillar name is source-derived; resource mapping is an educational interpretation.'},
    {id:'services',title:'Services, access, and integration',description:'Review access, community-based care, referral systems, continuity, and service integration.',keywords:['services','access','referral','continuity','care','barangay','community-based','service delivery','integration'],pillars:['Services'],source:'The pillar name and broad access focus are source-derived; scenario-level links are educational interpretations.'},
    {id:'rights',title:'Rights, participation, and person-centred policy',description:'Consider human rights, lived experience, participation, and the limits of unsupported assumptions.',keywords:['rights','participation','lived experience','person','human rights','co-design','recovery'],pillars:[],source:'The Plan includes a human-rights goal and rights-based framing; case links are educational interpretations.'},
    {id:'evidence',title:'Information, indicators, and evaluation',description:'Distinguish activities, outputs, outcomes, indicators, targets, data quality, and evidence limitations.',keywords:['indicator','evaluation','monitoring','data','research','scorecard','target','outcome','output','verification','budget'],pillars:['Information and Research'],source:'Monitoring concepts and the pillar are source-derived; proposed application questions are educational interpretations.'},
    {id:'source-literacy',title:'Source fidelity and responsible interpretation',description:'Separate source statements from interpretation, and historical targets from evidence of achievement.',keywords:['source interpretation','historical','target','citation','evidence','verification','limitations','what the plan','plan development'],pillars:[],source:'A learning safeguard applied throughout MindPlan; this grouping is an educational interpretation.'}
  ];
  const text = x => {try{return JSON.stringify(x||'').toLowerCase()}catch(_){return String(x||'').toLowerCase()}};
  function matches(item, keywords){const hay=text(item);return keywords.some(k=>hay.includes(k));}
  function buildMap(input={}){
    const topics=input.topics||[], cases=input.cases||[], assessment=input.assessment||[], bank=input.bank||[], oral=input.oral||[];
    return THEMES.map(theme=>{
      const studyTopics=topics.filter(x=>matches({id:x.id,title:x.title,summary:x.summary,sourceClaim:x.sourceClaim},theme.keywords));
      const relatedCases=cases.filter(x=>matches({title:x.title,tags:x.tags,learningObjectives:x.learningObjectives,scenario:x.scenario},theme.keywords));
      const questions=[...assessment,...bank].filter(x=>matches({topic:x.topic,prompt:x.prompt,model:x.model,excerpt:x.excerpt,checklist:x.checklist},theme.keywords));
      const stations=oral.filter(x=>matches({topic:x.topic,title:x.title,prompt:x.prompt,model:x.model,checklist:x.checklist},theme.keywords));
      return {...theme,resources:{topics:studyTopics,cases:relatedCases,questions,stations},counts:{topics:studyTopics.length,cases:relatedCases.length,questions:questions.length,stations:stations.length},total:studyTopics.length+relatedCases.length+questions.length+stations.length};
    });
  }
  root.MINDPLAN_CURRICULUM_MAP={themes:THEMES,buildMap};
  if(typeof module!=='undefined'&&module.exports)module.exports={themes:THEMES,buildMap};
})(typeof window!=='undefined'?window:globalThis);
