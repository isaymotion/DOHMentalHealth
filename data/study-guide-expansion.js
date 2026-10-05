/* Release 19, Pass 1 — Comprehensive Study Guide expansion.
   Source basis: National Mental Health Strategic Plan 2019–2023, supplied PDF.
   This file adds learner-facing depth without replacing the source text. */
(function(){
  const topics = window.MINDPLAN_STUDY_GUIDE?.topics || [];
  const byId = Object.fromEntries(topics.map(t => [t.id, t]));
  const add = (id, extra) => { if (byId[id]) Object.assign(byId[id], extra); };

  add('plan-purpose', {
    time:'10 min',
    learningObjectives:[
      'Explain what the Strategic Plan is, who it is for, and the 2019–2023 period it covers.',
      'Distinguish a strategic implementation plan from a clinical guideline and from a retrospective evaluation.',
      'Identify the major elements that make the Plan operational: goals, outcomes, outputs, activities, targets, responsible agencies, indicators, and modes of verification.'
    ],
    studyNotes:[
      {heading:'Read the document as an implementation architecture',body:'The Executive Summary says the Plan describes the PCMH vision, mission, goals and outcome objectives, then details outputs, key activities and targets for the first five years of Mental Health Act implementation. It also identifies responsible agencies or sectors at national, regional and local levels and defines indicators and modes of verification for monitoring and evaluation.'},
      {heading:'The Plan has a defined time horizon',body:'The Plan covers 2019–2023. A target labelled 2020, 2021, 2022 or 2023 is therefore a planned value inside the historical planning period. It should not be silently converted into a current national statistic or a claim that implementation occurred.'},
      {heading:'The scorecard idea matters',body:'The Executive Summary says an electronic tool accompanying the Strategic Plan would be used as scorecards for the PCMH and specific agencies. This connects the strategy to monitoring rather than treating the Plan as a narrative policy statement alone.'}
    ],
    keyDistinctions:[
      ['Strategic plan','Sets direction, intended results, activities, targets, responsibilities and monitoring arrangements.'],
      ['Clinical guideline','Provides clinical recommendations for care; this Plan is not presented as one.'],
      ['Implementation result','Requires evidence that an activity, output or outcome actually occurred; a target alone is not that evidence.']
    ],
    examFocus:['Mandate → strategic plan → targets/indicators → monitoring.','Always attach 2019–2023 to historical targets unless a separate source establishes later performance.'],
    sourceMap:'Executive Summary, printed p. 1; Structure/Theory of Change, printed pp. 20–22; PDF pp. 15, 34–36.'
  });

  add('vision-mission-goals', {
    time:'10 min',
    learningObjectives:[
      'Recall the exact vision and mission at a high level.',
      'Differentiate the three goals by their action verbs and intended population-level direction.',
      'Recognize that goals are strategic aims, not statements that the aims were achieved.'
    ],
    studyNotes:[
      {heading:'Vision',body:'“Mental Health and wellbeing for all Filipinos” is the distant-future direction named by the Plan.'},
      {heading:'Mission',body:'The mission combines a rights commitment—valuing, promoting and protecting the basic right of all Filipinos to mental health and wellbeing—with provision of comprehensive, integrated, accessible and quality mental health programs and services.'},
      {heading:'Three goals as a sequence of emphasis',body:'Goal 1 emphasizes valuation, promotion and protection of mental health and wellbeing. Goal 2 emphasizes identification, treatment and prevention of mental health conditions. Goal 3 emphasizes the ability of persons affected by mental health conditions to exercise the full range of human rights.'},
      {heading:'Why the wording matters',body:'The goals span population promotion, care for mental health conditions, and rights. They therefore should not be reduced to a purely service-delivery agenda.'}
    ],
    keyDistinctions:[
      ['Vision','Distant future direction.'],['Mission','Continuing purpose and commitment.'],['Goals','Three broad results the Plan says will fulfil the mission.'],['Indicators','Measures selected to monitor progress toward goals; they do not automatically prove causation or achievement.']
    ],
    examFocus:['Remember the three goal clusters: valued/promoted/protected; identified/treated/prevented; human rights.'],
    sourceMap:'Strategic framework, printed p. 23; PDF p. 37.'
  });

  add('framework-pillars', {
    time:'15 min',
    learningObjectives:[
      'Reconstruct the Plan’s hierarchy from vision and mission through goals, pillars, outcomes, outputs and activities.',
      'Explain the five guiding approaches named in the framework chapter.',
      'Describe what each of the four pillars is intended to cover without treating the pillars as independent silos.'
    ],
    studyNotes:[
      {heading:'The results hierarchy',body:'The Theory of Change presents a vision, a continuing mission, three goals, and four pillars divided into outcomes. Outputs and activities sit beneath the outcomes. Indicators and targets are used to monitor progress. The diagram is an intended results map, not a causal proof.'},
      {heading:'Staging approach',body:'The Plan describes a range from asymptomatic experience through non-specific distress and subthreshold symptoms to a defined syndrome, recurrence/persistence and treatment resistance. It argues that intervention opportunities differ across stages and that population-level risk reduction requires whole-of-government and whole-of-society action.'},
      {heading:'Biopsychosocial model',body:'Mental health is framed as an outcome of interacting environmental, biological and developmental factors across the life course. The Plan uses this to support a non-reductionist approach drawing on diverse disciplines.'},
      {heading:'Balanced care model',body:'The Plan emphasizes balance among community, primary, secondary and tertiary platforms and highlights community and intersectoral interventions such as employment opportunities, child protection, community understanding, long-term social care and suicide prevention.'},
      {heading:'Rights-based and recovery approaches',body:'The rights-based approach treats the highest attainable standard of physical and mental health as a right and links this to the Mental Health Act. The recovery approach centers the person affected in defining problems and what a successful outcome might be.'},
      {heading:'Four pillars',body:'Promotion and Prevention focuses on practices in schools, workplaces and communities. Leadership and Governance focuses on effective governance. Services focuses on access at all levels of care. Information and Research focuses on availability, accessibility and utilization of evidence-based mental health data.'}
    ],
    keyDistinctions:[
      ['Pillar','A broad strategic domain.'],['Outcome','An intended result under the strategic framework.'],['Output','A more immediate deliverable or product of activities.'],['Activity','An action undertaken to produce outputs.'],['Indicator','A defined measure used to track progress.']
    ],
    examFocus:['The Plan’s narrative says four pillars are divided into five outcomes, while the visible Outcomes section later enumerates four outcomes. Treat this as a source inconsistency and do not invent a fifth outcome.'],
    sourceMap:'Structure/Theory of Change and Pillars, printed pp. 20–26; PDF pp. 34–40.'
  });

  add('policy-context', {
    time:'15 min',
    learningObjectives:[
      'Place the Strategic Plan within the legal and international policy context described by the document.',
      'Recall the six objectives listed in the Plan’s strategic-framework chapter.',
      'Explain how UHC, disability rights, global mental health policy and prior DOH policy documents appear in the Plan’s context.'
    ],
    studyNotes:[
      {heading:'Legal anchor',body:'The Plan cites RA No. 11036 and its IRR as the immediate mandate. It reports that the Mental Health Act was signed on 20 June 2018, took effect on 5 July 2018, and that the IRR was signed on 22 January 2019.'},
      {heading:'International policy context',body:'The Plan discusses the UN Convention on the Rights of Persons with Disabilities, the Universal Declaration of Human Rights and the Sustainable Development Goals. It also situates the Philippine response alongside the WHO Mental Health Action Plan 2013–2020 and the Western Pacific Regional Agenda.'},
      {heading:'Other Philippine policy instruments named',body:'The Plan discusses the Universal Health Care Act (RA 11223), disability legislation including RA 10754 and RA 7277, and DOH Administrative Orders 2016-0039 and 2007-0009. These are part of the policy landscape described by the Plan; the Study Guide does not treat them as interchangeable with RA 11036.'},
      {heading:'Six objectives in the strategic framework',body:'The Plan lists objectives to strengthen leadership/governance; develop a comprehensive integrated national mental health care system; protect rights and freedoms; strengthen information, evidence and research; integrate mental health into basic health services; and integrate mental-health promotion strategies in educational institutions, workplaces and communities.'}
    ],
    keyDistinctions:[
      ['RA 11036','The Mental Health Act and the immediate legal context for the Plan.'],['IRR','Implementing rules for the Act; not identical to the Act.'],['UHC Act','A broader health-system reform context cited by the Plan.'],['WHO/global instruments','Context and principles cited by the Plan; not Philippine statutes.']
    ],
    examFocus:['Know why the Plan is multi-sectoral: its own objectives and policy context extend beyond specialist psychiatric services.'],
    sourceMap:'Policies on Mental Health, printed pp. 9–11; Road to the Strategic Plan, printed pp. 17–20; PDF pp. 23–35.'
  });

  add('situation-gaps', {
    time:'18 min',
    learningObjectives:[
      'Interpret the situation section using the dates and sources attached to its statistics.',
      'Describe the major system gaps identified by the Plan.',
      'Connect each identified gap to the type of strategic response the Plan later proposes.'
    ],
    studyNotes:[
      {heading:'Mental health burden and historical context',body:'The Plan reports historical estimates on depression, anxiety, suicide, substance use, neurological conditions and disability-adjusted life years. It also presents facility, workforce and service-use information. These data describe the situation available during Plan development; they are not automatically current estimates.'},
      {heading:'Gap A — human-rights-based social environment',body:'The Plan describes stigma, limited help-seeking, socioeconomic stressors, disasters and other extreme life experiences, and the need to promote mental health among the majority of people who are not experiencing a defined disorder. It calls for awareness, health literacy, culturally sensitive approaches and community-based delivery.'},
      {heading:'Gap B — inadequate mental health information',body:'The Plan identifies fragmented information, limited epidemiological data and a need for stronger information systems, databases, community surveillance and regular national epidemiologic work. It links better information to planning, resource allocation, monitoring and evaluation.'},
      {heading:'Gap C — weak leadership and governance',body:'The Plan describes governance as policy-making, planning, resource allocation, implementation, monitoring and evaluation. It identifies gaps in local policy, intersectoral participation, lived-experience participation, workforce capacity, community-based services, primary-care integration and resource allocation.'},
      {heading:'Gap D — insufficient mental health services',body:'The Plan describes needs across promotion, prevention, treatment and aftercare. It discusses demand from people with mental health conditions and the broader population seeking maintenance of wellbeing, while highlighting suicide prevention, substance-use concerns, community care, referral systems, disaster response and workforce constraints.'},
      {heading:'How to study the statistics',body:'For every number, ask: What year? What population? What definition? What source? What denominator? Is it a baseline, estimate, target or observed result? This prevents historical situation data from being misused as current prevalence or performance.'}
    ],
    keyDistinctions:[
      ['Situation statistic','Describes a historical estimate or condition cited by the Plan.'],['Gap','A problem or deficiency the Plan says needs to be addressed.'],['Target','A planned value for a specified period.'],['Achievement','Requires actual evidence of performance.']
    ],
    examFocus:['The four gap headings are useful anchors: social environment; information; governance; services.'],
    sourceMap:'Overview of the Situation, printed pp. 2–8; Policies, pp. 9–11; Gaps, pp. 12–17; PDF pp. 16–31.'
  });

  add('plan-development', {
    time:'14 min',
    learningObjectives:[
      'Describe how the Strategic Plan was developed.',
      'Identify the stakeholder groups and consultation stages described by the Plan.',
      'Explain why the Plan uses a phased, multi-year Theory of Change.'
    ],
    studyNotes:[
      {heading:'Technical working group',body:'The DOH, in coordination with WHO, convened stakeholders to develop terms of reference and nominate members for a technical working group. The Plan says the TWG included government/duty-bearers, persons with lived experience/service users, service providers and academe.'},
      {heading:'Stakeholder breadth',body:'The Plan names agencies including DILG, CHR, DSWD, DOLE, CSC, DepEd, CHED, TESDA, NBI, PhilHealth and NCMH, alongside organizations representing lived experience, service providers and academic/professional groups.'},
      {heading:'Consultations and workshops',body:'Four consultations are described: DOH; other government agencies and duty bearers; persons with lived experience; and service providers/academics. The results and document review were relayed to the TWG, which developed the Plan through three three-day workshops before presenting it to the PCMH for approval.'},
      {heading:'Why a phased plan?',body:'The Theory of Change acknowledges that building systems and capacities from community through tertiary levels and coordinating an all-of-government/all-of-society response would take several years. The five-year Plan therefore balances the ambition of the Mental Health Act with available resources and uses a phased approach.'}
    ],
    keyDistinctions:[
      ['Consultation participant','A stakeholder involved in planning or consultation.'],['Responsible agency','An agency assigned to an output, activity or indicator in the Plan.'],['Theory of Change','The Plan’s intended logic for moving from strategy to results; not proof of causality.']
    ],
    examFocus:['Remember the four consultation groups and the three TWG workshops.'],
    sourceMap:'Road to the Strategic Plan, printed pp. 17–19; Structure/Theory of Change, pp. 20–22; PDF pp. 32–36.'
  });

  add('outcomes-indicators', {
    time:'22 min',
    learningObjectives:[
      'Recall the four named outcomes in the visible Outcomes section and understand the Plan’s internal five-outcome wording inconsistency.',
      'Read a target table without confusing baselines, targets, formulas, means of verification and achieved performance.',
      'Interpret selected indicators from the three goals and four strategic domains.'
    ],
    studyNotes:[
      {heading:'The outcomes actually enumerated in the Outcomes section',body:'The visible outcomes section lists: 1) improved practices on mental health and wellbeing in schools, workplaces and communities; 2) strengthened leadership and governance for mental health; 3) improved access to mental health services in all levels of care; and 4) increased availability, accessibility and utilization of evidence-based mental health data.'},
      {heading:'A source inconsistency to notice',body:'The Theory of Change text says the four pillars are divided into five outcomes, while the later Outcomes section visibly enumerates four outcomes. The supplied source does not provide a clearly labelled fifth outcome. MindPlan therefore preserves the inconsistency rather than inventing an additional outcome.'},
      {heading:'Goal indicators',body:'Goal 1 includes indicators concerning self-care, help-seeking and humane attitudes, as well as integration of mental health policies and programs in national and local plans. Goal 2 includes suicide mortality and service use among people with specified mental, neurological and substance-use conditions and epilepsy. Goal 3 includes facilities with functioning internal review boards and the proportion of complaint cases acted upon.'},
      {heading:'How to read an indicator row',body:'Start with the indicator definition. Then identify baseline year/value/source, target years, formula, source of data, means of verification, reporting frequency, responsible agency, budget and assumptions/risks when supplied. A numerator/denominator matters: a percentage is not interpretable without knowing what is being counted and what forms the denominator.'},
      {heading:'Historical target examples',body:'The Plan gives a suicide mortality target sequence of 3.20, 3.17, 3.14 and 3.10 per 100,000 for 2020–2023. It also gives service-use increases of 2%, 4%, 6% and 8%. These are planned targets in the historical Plan, not evidence of actual performance.'},
      {heading:'Monitoring status language',body:'A blank field, “TBD,” a proxy indicator, a planned survey and a target are different things. Preserve the source’s uncertainty rather than filling missing values from assumptions.'}
    ],
    keyDistinctions:[
      ['Baseline','Reference point used for comparison.'],['Target','Planned value to be reached in a specified period.'],['Formula','How the indicator is calculated.'],['Mode/means of verification','How evidence of the indicator is intended to be checked.'],['Actual performance','Observed evidence, which is not supplied merely by a target.']
    ],
    examFocus:['If a question gives a target, ask whether it also gives observed results. If not, do not call the target an achievement.'],
    sourceMap:'Goal indicators, printed pp. 23–26; Outcomes and outputs, pp. 26–38; M&E matrix, PDF pp. 93–112.'
  });

  add('annex-act', {
    time:'20 min',
    learningObjectives:[
      'Use Annex 1 as a structured review of the Mental Health Act rather than a substitute for the statute.',
      'Recognize the Act’s broad architecture: policy/objectives, rights, consent and safeguards, services, governance, research/information, prohibited acts and penalties, and final provisions.',
      'Distinguish exact statutory language from study-guide interpretation.'
    ],
    studyNotes:[
      {heading:'Start with the policy and objectives',body:'The appended Act begins with the national mental health policy and objectives concerning governance, an integrated national mental health care system, rights, information/evidence/research, integration into basic health services, and mental-health promotion in educational institutions, workplaces and communities.'},
      {heading:'Rights are central to the Act',body:'The rights chapter covers non-discrimination, access to evidence-based and affordable services, access at all levels of the national health system, coordinated treatment, least-restrictive care, humane treatment, aftercare and rehabilitation, participation, confidentiality, informed consent, participation in treatment planning, legal representation, communication, legal services, access to clinical records subject to the Act, notice of rights, and complaints.'},
      {heading:'Consent and decision-making',body:'The Act addresses informed consent, advance directives, legal representatives, supported decision making, internal review boards and exceptions to informed consent. These provisions should be studied from the exact statutory text and IRR when applying them to a clinical or legal scenario.'},
      {heading:'Why exact wording matters',body:'Legal provisions often depend on exceptions, conditions, definitions and procedural safeguards. The Study Guide therefore provides navigation and high-level structure, while the app’s Act/reference materials should be used for exact wording and section-level review.'}
    ],
    keyDistinctions:[
      ['Rights principle','A statutory right or protection.'],['Clinical reasoning','A clinical interpretation that must not be presented as statutory text.'],['Legal requirement','A claim that should be checked against the Act/IRR wording before use.']
    ],
    examFocus:['For legal questions, identify the exact Act section first; then identify facts, exceptions and procedural safeguards.'],
    sourceMap:'Annex 1, RA 11036, PDF pp. 39–73; strategic-framework objectives, PDF pp. 34–35.'
  });

  add('annex-irr-me', {
    time:'22 min',
    learningObjectives:[
      'Understand what Annex 2 and Annex 3 contribute to the Strategic Plan.',
      'Read the M&E matrix as a planning instrument rather than a retrospective results report.',
      'Recognize why scanned legal text requires exact page-level verification.'
    ],
    studyNotes:[
      {heading:'Annex 2 — IRR',body:'The IRR is a separate legal source that implements the Mental Health Act. Because substantial portions of the supplied annex are scanned legal text, MindPlan does not reconstruct uncertain rule numbers, deadlines or obligations from incomplete OCR. Exact legal claims should be checked against the source page.'},
      {heading:'Annex 3 — monitoring and evaluation',body:'The M&E Plan operationalizes the scorecard concept. Its tables contain indicators, baseline information, targets, formulas, sources of data, frequency of reporting, responsible agencies, budget requirements, and assumptions and risks.'},
      {heading:'Think like an evaluator',body:'For any indicator ask: What exactly is being measured? What is the numerator and denominator? What is the baseline? What is the target year? Who reports it? How often? What evidence verifies it? What assumptions or risks could affect interpretation?'},
      {heading:'Missing data are not negative results',body:'The scorecard framework distinguishes performance bands from situations where performance data are unavailable and from periods when an item is not applicable. A blank field should not be assigned a success or failure meaning without a source statement.'}
    ],
    keyDistinctions:[
      ['IRR','Implementing legal rules; verify exact provisions.'],['M&E matrix','Planning/monitoring framework for indicators and targets.'],['Scorecard status','A reported performance classification when data are available; not equivalent to a blank cell.']
    ],
    examFocus:['Never “fill in” legal or indicator details that the supplied source does not clearly establish.'],
    sourceMap:'Annex 2, PDF pp. 74–92; Annex 3, PDF pp. 93–112.'
  });

  add('annex-budget-scorecards', {
    time:'20 min',
    learningObjectives:[
      'Interpret the Plan’s historical budget table without calling proposed requirements actual expenditure.',
      'Recall the scorecard agencies and understand the performance-status legend.',
      'Use the references and annex pagination correctly when checking a source.'
    ],
    studyNotes:[
      {heading:'Budget is a planning figure',body:'Annex 4 presents proposed budget requirements for 2020–2023 across the four strategic pillars. The table is useful for understanding the scale and distribution of the Plan’s proposed resource requirements, but it does not establish actual appropriations, releases or expenditures.'},
      {heading:'Scorecards',body:'Annex 5 names 13 scorecards: overall/consolidated, PCMH, DOH, NCMH, PHIC, DOLE, DILG, DepEd, CHED, TESDA, DSWD, CSC and CHR. The intended process describes quarterly monitoring, updating and reporting.'},
      {heading:'Performance legend',body:'The annex describes red as 0–50% achieved, yellow as 51–79%, and green as 80–100%; qualitative descriptions accompany these bands. It separately identifies “No performance data available” and “Not applicable for the monitored period.”'},
      {heading:'References and page discipline',body:'The bibliography is in the final pages of the Plan. Annex pagination does not map cleanly onto the main-text printed numbering, so the Study Guide uses PDF page locators for annexes. When exact citation matters, open the original PDF page rather than relying on a page offset.'}
    ],
    keyDistinctions:[
      ['Proposed budget requirement','Historical planning estimate.'],['Actual expenditure','A financial result requiring separate evidence.'],['Green/yellow/red status','Performance classification under the scorecard framework when reported.'],['No data','Not the same as failure.']
    ],
    examFocus:['Budget ≠ expenditure; target ≠ achievement; blank ≠ failure.'],
    sourceMap:'Annex 4, PDF pp. 113–114; Annex 5, PDF pp. 115–124; References, PDF pp. 125–126.'
  });

  // Common learner-facing metadata used by the updated renderer.
  topics.forEach(t => {
    t.studyStatus = 'Source-grounded learning material';
    if (!t.sourceMap) t.sourceMap = 'See the source locator attached to each section.';
  });
})();
