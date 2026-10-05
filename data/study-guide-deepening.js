/* Release 19, Pass 2 — deeper Study Guide layer.
   Source basis: supplied DOH/PCMH National Mental Health Strategic Plan 2019–2023 PDF only.
   No outside sources are used in this file. */
(function(){
  const topics = window.MINDPLAN_STUDY_GUIDE?.topics || [];
  const byId = Object.fromEntries(topics.map(t => [t.id, t]));
  const add = (id, extra) => { if (byId[id]) Object.assign(byId[id], extra); };

  add('plan-purpose', {
    mustKnow:[
      'The Plan covers 2019–2023 and is described as the overall direction for implementation of the Mental Health Act.',
      'It is intended to guide national government and sub-national/local counterparts on key strategies and interventions to be scaled up for population access to mental health services.',
      'The Plan contains a vision, mission, three goals, indicators, four pillars, outcomes, outputs, activities, targets, responsible agencies, and monitoring arrangements.',
      'The Plan is an implementation and planning document; the supplied PDF does not turn its historical targets into evidence of later achievement.',
      'The accompanying scorecard concept links strategic planning to monitoring and accountability.'
    ],
    reviewPrompts:[
      'What period does the Strategic Plan cover, and what does it say the plan provides?',
      'What is the difference between a strategic target in the Plan and an observed implementation result?',
      'Which elements connect the Plan’s strategy to monitoring and evaluation?',
      'Who is the intended governmental audience beyond the national level?'
    ]
  });

  add('vision-mission-goals', {
    mustKnow:[
      'Vision: Mental Health and wellbeing for all Filipinos.',
      'Mission: value, promote and protect the basic right of all Filipinos to Mental Health and wellbeing and provide comprehensive, integrated, accessible and quality Mental Health programs and services.',
      'Goal 1 centers on mental health and wellbeing being valued, promoted, and protected.',
      'Goal 2 centers on mental health conditions being identified, treated, and prevented.',
      'Goal 3 centers on persons affected by mental health conditions being able to exercise the full range of human rights.',
      'The Plan attaches indicators and 2020–2023 targets to the goals; these are planning measures, not retrospective proof of achievement.'
    ],
    reviewPrompts:[
      'State the vision without looking at the page.',
      'How does the mission combine rights and service provision?',
      'Which goal concerns identification, treatment and prevention?',
      'Which goal is explicitly about the full range of human rights?',
      'Why should a goal statement not be read as an achievement statement?'
    ]
  });

  add('framework-pillars', {
    mustKnow:[
      'The Theory of Change describes a hierarchy from vision and mission to three goals, four pillars, outcomes, outputs and activities.',
      'The four pillars are Promotion and Prevention; Leadership and Governance; Services; and Information and Research.',
      'The pillars overlap and are linked to deliver integrated mental health services.',
      'The five approaches described in the framework are staging, biopsychosocial, balanced care, rights-based, and recovery.',
      'The staging approach ranges from asymptomatic experience through distress/subthreshold states, defined syndrome, recurrence/persistence and treatment resistance.',
      'The balanced care model explicitly spans community, primary, secondary and tertiary platforms and recognizes community/intersectoral interventions.',
      'The recovery approach places the person affected at the center of defining problems and what a successful outcome might be.'
    ],
    reviewPrompts:[
      'Draw the Plan’s results hierarchy from vision to activities.',
      'Name all four pillars in order or from memory.',
      'How does the staging approach differ from a purely illness-focused model?',
      'What does the balanced care model say about service platforms?',
      'What does the recovery approach place at the center?'
    ]
  });

  add('policy-context', {
    mustKnow:[
      'The Plan describes RA 11036 as the immediate legal context and reports the Act’s signing on 20 June 2018 and effectivity on 5 July 2018.',
      'The IRR is reported as signed on 22 January 2019.',
      'The Plan lists six strategic-framework objectives: leadership/governance; an integrated national mental health care system; rights; information/evidence/research; integration into basic health services; and promotion in educational institutions, workplaces and communities.',
      'The policy context also discusses UHC legislation, disability legislation, prior DOH mental-health administrative orders, the SDGs, human-rights instruments and WHO mental-health policy documents.',
      'The Plan explicitly connects mental health to an all-of-society and whole-of-government response.'
    ],
    reviewPrompts:[
      'What six objectives does the Plan use to frame the PCMH strategy?',
      'What dates does the Plan give for RA 11036 and its IRR?',
      'Which policy instruments are described as part of the Philippine context rather than as substitutes for RA 11036?',
      'Why does the Plan require a multi-sector rather than specialist-only perspective?'
    ]
  });

  add('situation-gaps', {
    mustKnow:[
      'The situation section presents historical burden, workforce, facility, service-use and other system information available during Plan development.',
      'The Plan identifies a need for a human-rights-based social environment for mental health promotion.',
      'It identifies inadequate mental health information as a major gap for planning, implementation, service delivery, resource allocation, monitoring and evaluation.',
      'It identifies weak leadership and governance, including gaps in policy, intersectoral participation, implementation, monitoring and evaluation.',
      'It identifies insufficient mental health services and discusses promotion, prevention, treatment, aftercare, referral systems, suicide prevention, substance-use concerns, disaster response and workforce constraints.',
      'The Plan discusses both claim holders and duty bearers when describing service gaps and needs.',
      'The document repeatedly connects service accessibility with information about who provides what services, how services are reached, and referral pathways.'
    ],
    reviewPrompts:[
      'What four broad gap areas should you be able to explain?',
      'Why does the Plan say mental health promotion must include people without a diagnosed condition?',
      'How can weak information systems affect planning and resource allocation?',
      'What demand-side and supply-side concerns does the Plan identify?',
      'How should you label a statistic from the situation section when answering an exam question?'
    ]
  });

  add('plan-development', {
    mustKnow:[
      'DOH, in coordination with WHO, convened stakeholders for development of the PCMH Strategic Plan.',
      'A technical working group included government/duty-bearers, persons with lived experience/service users, service providers and academe.',
      'The Plan names numerous national agencies and organizations as participants, illustrating the intended multi-sector structure.',
      'Four consultations were held with DOH; other government agencies/duty bearers; persons with lived experience; and service providers/academics.',
      'The consultation results and document review were relayed to the TWG, which developed the plan through three three-day workshops.',
      'The resulting Strategic Plan 2019–2023 was presented to the PCMH for approval.',
      'The Theory of Change says the phased approach balances the ambition of the Mental Health Act with currently available resources.'
    ],
    reviewPrompts:[
      'Who was represented in the technical working group?',
      'What were the four consultation groups?',
      'How many workshops did the TWG use to build the plan?',
      'Why does the Plan describe a phased approach?',
      'What does the development process tell you about the intended governance model?'
    ]
  });

  add('outcomes-indicators', {
    mustKnow:[
      'The main Outcomes section visibly enumerates four strategic outcomes: improved practices; strengthened leadership and governance; improved access to services; and increased availability/accessibility/utilization of evidence-based mental health data.',
      'The Theory of Change text separately says the four pillars are divided into five outcomes.',
      'Annex 5 later uses a seven-part outcome framework, including sustainable governance/accountability, access to comprehensive integrated services, and strengthened research/evidence/information systems.',
      'Goal indicators include measures related to self-care/help-seeking/humane attitudes, suicide mortality and service use, internal review boards and complaint action.',
      'The monitoring matrix distinguishes baseline, target, formula, means of verification, responsible agency and assumptions/risks.',
      'The Plan gives historical target examples including a suicide mortality sequence of 3.20, 3.17, 3.14 and 3.10 per 100,000 for 2020–2023 and service-use increases of 2%, 4%, 6% and 8%.',
      'A target, a baseline, a proxy indicator and an actual reported result are not interchangeable.'
    ],
    reviewPrompts:[
      'What four outcomes are visibly enumerated in the main Outcomes section?',
      'Why should you not automatically treat the “five outcomes” wording in the Theory of Change as identical to the seven outcome headings in Annex 5?',
      'What fields should you inspect when reading an indicator row?',
      'What does a target of 3.10 per 100,000 in 2023 tell you—and what does it not tell you?',
      'Why does the numerator/denominator matter when interpreting a percentage?'
    ]
  });

  add('annex-act', {
    mustKnow:[
      'Annex 1 reproduces RA 11036, the Mental Health Act, beginning with general provisions and continuing through rights, treatment and consent, services, education/workplace, capacity building/research, government responsibilities, the PCMH, drug dependence, and miscellaneous provisions.',
      'Chapter I covers general provisions, including policy, objectives and definitions.',
      'Chapter II covers rights of service users, family members/carers/legal representatives and mental health professionals.',
      'Chapter III covers treatment and consent, including informed consent, advance directives and legal representatives.',
      'Chapter IV covers mental health services, including community-level services, facilities, reporting, regional/provincial/tertiary services, drug screening, suicide prevention and public awareness.',
      'Chapters V–VIII address educational/workplace settings, capacity building/research/NCMH, government agency responsibilities, and the PCMH.',
      'Chapters IX–X address mental health for drug dependents and miscellaneous provisions including penalties and appropriations.'
    ],
    reviewPrompts:[
      'What subjects are covered by Chapters I–III of the Act reproduced in the PDF?',
      'Where in the Act annex would you look for community-level mental health services?',
      'Where would you look for duties and responsibilities of government agencies?',
      'Which chapter addresses the Philippine Council for Mental Health?',
      'Why should exact statutory wording be checked rather than reconstructed from memory?'
    ]
  });

  add('annex-irr-me', {
    mustKnow:[
      'Annex 2 is the Implementing Rules and Regulations of RA 11036.',
      'Annex 3 is the Monitoring and Evaluation Plan.',
      'The M&E material operationalizes the Plan’s scorecard concept through indicators, baselines, targets, formulas, verification sources, reporting frequency, agencies, budgets and assumptions/risks.',
      'The scorecard legend uses 0–50%, 51–79% and 80–100% bands with qualitative descriptions.',
      'The M&E tables also distinguish “No performance data available” and “Not applicable for the monitored period.”',
      'The PDF contains scanned/legal material in the annexes, so uncertain wording should not be silently reconstructed.'
    ],
    reviewPrompts:[
      'What is the role of Annex 2 versus Annex 3?',
      'What are the main components of an M&E indicator row?',
      'What do the three scorecard performance bands mean in the Plan?',
      'Why is “no performance data available” different from 0% performance?',
      'What should you do when OCR or a scanned table does not clearly establish a legal or numerical detail?'
    ]
  });

  add('annex-budget-scorecards', {
    mustKnow:[
      'Annex 4 presents proposed budget requirements for 2020–2023 across the four strategic pillars.',
      'A proposed budget requirement is a planning figure and is not evidence of actual appropriation, release or expenditure.',
      'Annex 5 contains an overall/consolidated scorecard and scorecards for PCMH, DOH, NCMH, PHIC, DOLE, DILG, DepEd, CHED, TESDA, DSWD, CSC and CHR.',
      'The Plan describes quarterly monitoring, updating and reporting for the scorecards.',
      'The performance legend uses red for 0–50%, yellow for 51–79% and green for 80–100%, alongside qualitative descriptions.',
      'The annexes provide a historical planning and monitoring framework; they should not be used by themselves to claim present-day performance.'
    ],
    reviewPrompts:[
      'What is the difference between a proposed budget requirement and actual expenditure?',
      'How many named agency scorecards are listed in Annex 5 in addition to the overall/consolidated scorecard?',
      'What are the three percentage bands in the scorecard legend?',
      'What does “Not applicable for the monitored period” mean for interpretation?',
      'Why is the annex pagination useful when studying the source?'
    ]
  });

  topics.forEach(t => {
    t.studyDepth = 'Detailed source-based review';
    if (!t.mustKnow) t.mustKnow = [];
    if (!t.reviewPrompts) t.reviewPrompts = [];
  });
})();
