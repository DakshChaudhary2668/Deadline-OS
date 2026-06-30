export interface ModeLanguageConfig {
  [key: string]: any; // Allow dynamic additions for the audit
  title: string;
  subtitle: string;
  systemRole: string;
  tone: string;
  preferredVocabulary: {
    morningBriefing: string;
    aiBrief: string;
    recommendation: string;
    nextAction: string;
    risk: string;
    successProbability: string;
    recoveryHub: string;
    whatIfSimulator: string;
    timeline: string;
  };
  forbiddenVocabulary: string[];
  buttonLabels: {
    analyze: string;
    recalibrate: string;
    generateDayPlan: string;
    generateWeekPlan: string;
    recoveryButton: string;
  };
  summaryStyle: string;
  recommendationStyle: string;
  riskTerminology: {
    label: string;
    low: string;
    moderate: string;
    high: string;
    critical: string;
  };
  emptyStateMessages: {
    noTasks: string;
    adjustFilters: string;
  };
  promptInstructions: string;

  // New Unified UI labels
  sidebarLabels: {
    briefing: string;
    tasks: string;
    strategic: string;
    plans: string;
    recovery: string;
    simulator: string;
    chat: string;
  };
    simulatorLabels?: any;
  planningLabels?: any;
  confidenceDrivers?: string[];
    dailyBriefingLabels: {
    realTimeForecast?: string;
    realTimeSynthesis?: string;
    bySector?: string;
    morningBriefing: string;
    morningBriefingDesc: string;
    recalibrateButton: string;
    failureForecast: string;
    failureProbability: string;
    systemCalibrated: string;
    highestRiskObjective: string;
    criticalRiskReasoning: string;
    aiMitigationStrategy: string;
    strategicIntelTitle: string;
    strategicFocus: string;
    biggestRiskToday: string;
    mostImportantTask: string;
    criticalBottleneck: string;
    recommendedIntervention: string;
    successProbability: string;
    workloadStress: string;
    totalEstimatedEffort: string;
    totalEstimatedEffortDesc: string;
    threatMatrix: string;
    highRiskGoals: string;
    criticalBlockers: string;
    completedSecured: string;
    completedSecuredDesc: string;
    resolvedToday: string;
    recommendationsTitle: string;
    recommendationsSub: string;
    loadBalancerText: string;
    workloadForceMetrics: string;
    workloadForceMetricsDesc: string;
    focusHoursLoaded: string;
    peakHazardQuotient: string;
    momentumIntelTitle: string;
    momentumIntelDesc: string;
    perfAnalysisTitle: string;
    momentumStatus: string;
    keyObservation: string;
    riskAssessment: string;
    executiveRec: string;
    completedSecuredStat: string;
    createdOverallStat: string;
    completionRatioStat: string;
    weeklyChangeStat: string;
    chartVelocityTitle: string;
    chartCadenceTitle: string;
    chartVelocityLabel: string;
    chartCadenceLabel: string;
  };
  strategicLabels: {
    headerTitle: string;
    headerSubtitle: string;
    newTaskBtn: string;
    workspacePressure: string;
    workspaceHealth: string;
    tasksImproved: string;
    engineTag: string;
    statusLabel: string;
    aiBriefHeader: string;
    whyHeader: string;
    benefitsHeader: string;
    considerationsHeader: string;
    nextActionHeader: string;
  };
  recoveryLabels: {
    headerTitle: string;
    activeProtocol: string;
    description: string;
    queueTitle: string;
    queueDesc: string;
    deescalationTitle: string;
    deescalationDesc: string;
    deployButton: string;
    loadingDeploy: string;
    blueprintTitle: string;
    lockLabel: string;
    activeNominal: string;
    nominalDesc: string;
    extensionTitle: string;
    defenseTitle: string;
    resourceTitle: string;
    scopeTitle: string;
    priorityTitle: string;
    roadmapTitle: string;
    recalculateButton: string;
    safeguardInactive: string;
    safeguardActiveText: string;
    safekeepingConsoleIdle: string;
    safekeepingConsoleDesc: string;
  };
  taskListLabels: {
    searchPlaceholder: string;
    addTaskLabel: string;
    analyzeBtnLabel: string;
    analyzingBtnLabel: string;
    recoveryBadge: string;
    aiAssessmentHeader: string;
    analyzePromptText: string;
    priorityLabel: string;
    failRiskLabel: string;
    riskScoreLabel: string;
    aiRecommendationTitle: string;
    aiRiskAssessmentTitle: string;
  };
  taskFormLabels: {
    updateConstraints: string;
    registerBlocker: string;
    editMilestone: string;
    registerMilestone: string;
    milestoneTitle: string;
    milestonePlaceholder: string;
    deliverablesSummary: string;
    deliverablesPlaceholder: string;
    hardDeadline: string;
    effortHours: string;
    workspaceCategory: string;
    importanceLevel: string;
    deployButton: string;
    saveButton: string;
  };
  narrativeTemplates: {
    optimal: string;
    warning: string;
    overloaded: string;
    empty: string;
  };
}

export const MODE_LANGUAGES: Record<'student' | 'developer' | 'job_seeker' | 'professional', ModeLanguageConfig> = {
  student: {
    title: 'Student Mode',
    subtitle: "Today's Revision Plan",
    systemRole: 'Student Advisor',
    tone: 'supportive, structured, student-focused, and encouraging',
    preferredVocabulary: {
      morningBriefing: "Today's Revision Plan",
      aiBrief: 'Syllabus Brief',
      recommendation: 'Syllabus Recommendation',
      nextAction: 'Next Revision Step',
      risk: 'Syllabus Risk',
      successProbability: 'Exam Readiness',
      recoveryHub: 'Syllabus Recovery',
      whatIfSimulator: 'Syllabus Simulator',
      timeline: 'Syllabus Schedule'
    },
    forbiddenVocabulary: ['executive', 'stakeholder', 'portfolio', 'operational', 'delivery', 'sprint'],
    buttonLabels: {
      analyze: 'Analyze Revision Priority',
      recalibrate: 'Recalibrate Revision Plan',
      generateDayPlan: 'Generate Today\'s Schedule',
      generateWeekPlan: 'Generate Weekly Syllabus Plan',
      recoveryButton: 'Get Syllabus Recovery Steps'
    },
    summaryStyle: 'supportive, focused on curriculum progress, exam timeline alignment, and conceptual mastery',
    recommendationStyle: 'actionable study assignments, revision of weak concepts, and mock testing schedules',
    riskTerminology: {
      label: 'Syllabus Risk',
      low: 'Low Risk',
      moderate: 'Moderate Risk',
      high: 'High Risk',
      critical: 'Critical Risk'
    },
    emptyStateMessages: {
      noTasks: 'No assignments pending',
      adjustFilters: 'Adjust filters or add a new exam, homework, or revision goal.'
    },
    promptInstructions: 'You are an AI Student Advisor. Respond using supportive, structured, student-focused, and encouraging language. Focus on syllabus coverage, study pacing, revision plans, exam readiness, and student performance. Never use corporate, engineering, or executive jargon (like stakeholder, sprint, velocity, ROI, execution pipeline, deployment, etc.). Always replace generic terms like "task" or "productivity" with context-aware student vocabulary such as "Revision Topic", "Syllabus Milestone", "Study Block", or "Student Goal". Example style: "Complete Unit 4 revision today to stay on track for Friday\'s exam. Plan focused revision blocks to maximize your exam readiness."',
    
        dailySecondary: {
        chatWelcome: `Greetings. I am your Student Advisor AI. I have consolidated your current coursework metadata, active syllabus constraints, and historical study velocity.\n\nHow should we align your study capacity today? I can help you deconstruct monolithic assignments, calculate grade trade-offs, draft emergency revision timelines, or simulate study load options.`,
        flushTooltip: 'Flush conversational buffers',
        wsDesc: 'Higher values indicate a healthier and more achievable revision plan.',
        wsPoints: ["Remaining study capacity","Exam proximity pressure","Target grade probability","Syllabus conflicts","Overall study balance"],
        bandwidthLabel: 'Course Progress',
        unitPlural: 'Milestones',
        unitLower: 'assignments',
        chartAdded: 'Milestones Added',
        chartCompleted: 'Milestones Completed',
        taskSingularLower: 'milestone',
        hoursLabel: 'study hours',
        focusLabel: 'Study Hours',
        riskLabel: 'Failure Risk %',
    "statusAccelerating": "HIGH WORK ETHIC",
    "statusStable": "STABLE PROGRESS",
    "statusDeclining": "STUDENT FATIGUE",
    "statusOverloaded": "STUDENT CRUSH",
    "activeNarrativeSummary": "AI STUDY ADVISOR // NARRATIVE SUMMARY",
    "narrativeLoading": "Analyzing student syllabus metrics and formulating study insight...",
    "nominalRiskLabel": "SAFE",
    "thresholdTargetLabel": "EXAM GAP TARGET",
    "activeProbabilityMatrix": "ACTIVE SYLLABUS RISK ANALYSIS MODEL",
    "noThreatHeader": "No Urgent Study Milestone Threats Detected",
    "noThreatReasoning": "All revision intervals and assignment deadlines are safely structured relative to estimated study hours.",
    "noThreatMitigation": "Maintain current study pacing. Allocate secondary focus blocks prior to exam gates.",
    "awaitingScansText": "Awaiting study alignment scans. Please trigger recalibration.",
    "awaitingVisualsText": "Regenerating curriculum visual streams...",
    "awaitingHistoryText": "Awaiting curriculum study telemetry.",
    "noPendingTasksText": "No active pending study topics registered.",
    "resolvedUnitsLabel": "Milestones"
},
    taskListDynamic: {
    "catWork": "🏫 Curriculum",
    "catStudy": "📚 Study Blocks",
    "catCareer": "🎖️ Student Growth",
    "catPersonal": "👤 Personal Tasks",
    "tabAll": "All Milestones",
    "tabPending": "Active Study",
    "tabOverdue": "Overdue Gates",
    "tabCompleted": "Completed Topics",
    "allCategories": "All Syllabus Categories"
},
    planningDynamic: {
    "compilingTimeline": "COMPILING REVISION TIMELINE...",
    "compilingRoadmap": "COMPILING REVISION ROADMAP...",
    "scanningFocus": "Scanning study intervals...",
    "precisionSla": "Generating high precision syllabus slots",
    "plottingMilestones": "Plotting study milestones...",
    "timelineTitle": "24h Syllabus Timetable",
    "precisionBuffer": "Precision study buffers",
    "weeklyRoadmap": "WEEKLY SYLLABUS ROADMAP",
    "balancedAllocation": "Balanced Revision Allocation"
},
    recoveryDynamic: {
    "threatLabel": "Threat",

    "nominalStatus": "⚠️ Study Deficit",
    "nominalOverdue": "🛑 Lapsed Gate",
    "planLoaded": "Curriculum Plan Loaded",
    "laborEffort": "Study Hours",
    "turnaroundMission": "SYLLABUS GAP ALIGNMENT PLAN",
    "selectPending": "-- Select Study Milestone --"
},
    strategicDynamic: {
        taskPlural: 'Milestones',
        taskSingular: 'Milestone',
        slaLabel: 'DEADLINE',
        overdueLabel: 'OVERDUE DEADLINE',
        slaBreachedLabel: 'Deadline Missed',
    
    taskStatusLabels: {"urgent":"URGENT STUDY REQUIRED","high":"HIGH VALUE SUBJECT","stable":"ON TRACK","low":"LOW PRIORITY"},
    executiveScoreLabels: {"high":"High Priority Topic","moderate":"Moderate Confidence","low":"Exam Readiness"},
    "awaitingIntel": "Awaiting strategic alignment scans. Please trigger AI evaluation.",
    "noIntel": "No active strategic intelligence reports detected.",
    "decisionHeader": "STUDENT DECISION MATRIX",
    "categoryInsights": "Syllabus Insights",
    "priorityFocus": "Primary Revision Focus",
    "strategicMetrics": "Student Metrics"
},

    sidebarLabels: {
      briefing: "Study Brief",
      tasks: "Syllabus Matrix",
      strategic: "Syllabus Strategy",
      plans: "Study Planner",
      recovery: "Syllabus Recovery",
      simulator: "Grade Simulator",
      chat: "AI Student Coach"
    },
    
    simulatorLabels: {"predictorPanel":"Student Performance Predictor","title":"What-If Course Load Simulator","description":"Explore the GPA and timeline impact of skipping homeworks, delaying research milestones, or cramming extra study hours.","chooseTarget":"-- Choose Target Syllabus Goal --","originalCost":"Study Hours Required","constraintDeadline":"Submission Deadline","baselineUrgency":"Student Weight","step1":"Step 1: Select Syllabus Target","step2":"Step 2: Hypothesize Student Adjustments","executeButton":"RUN STUDENT PROJECTION","executingButton":"ANALYZING GRADE IMPACT...","outcomeHeader":"Projected Student Standing","workspaceSuccess":"Syllabus Mastery","objectiveSuccess":"Goal Grade Success","failureRisk":"Student Failure Risk","awaitingInput":"Awaiting Course Load Inputs","awaitingDesc":"Adjust study hours or deadlines on the left to project exam performance and grade impact.","outcomeMetricsLabel":"Outcome Model Metrics","simulatedStateLabel":"SIMULATED SYLLABUS STATE","aiConfidenceLabel":"AI CONFIDENCE:"},
    confidenceDrivers: ["Coursework consistency","Submission certainty","Exam load volatility","Hypothesis complexity","Syllabic signal indicators"],
dailyBriefingLabels: {
      realTimeForecast: "REAL-TIME FORECAST",
      realTimeSynthesis: "Real-Time Synthesis",
      bySector: "BY COURSE",
      
      morningBriefing: "Syllabus Assessment",
      morningBriefingDesc: "Real-time audit of grade threats, exam deadlines, and conceptual bottlenecks.",
      recalibrateButton: "RECALIBRATE STUDENT RUNWAY",
      failureForecast: "Student Risk Forecast",
      failureProbability: "Exam Failure Risk",
      systemCalibrated: "STUDY ENGINE CALIBRATED",
      highestRiskObjective: "HIGHEST RISK LESSON",
      criticalRiskReasoning: "CRITICAL SYLLABUS APPREHENSION",
      aiMitigationStrategy: "REVISED REVISION PATHWAY",
      strategicIntelTitle: "STUDENT STRATEGY HUB",
      strategicFocus: "Active Subject Focus",
      biggestRiskToday: "Core Exam Threat",
      mostImportantTask: "Primary Revision Priority",
      criticalBottleneck: "Conceptual Bottleneck",
      recommendedIntervention: "Next Action Pathway",
      successProbability: "Expected Grade Outcome",
      workloadStress: "Cognitive Overload Index",
      totalEstimatedEffort: "Total Study Effort Required",
      totalEstimatedEffortDesc: "Syllabus hours mapped against immediate test schedules.",
      threatMatrix: "CURRICULUM THREAT MATRIX",
      highRiskGoals: "High Risk Revision Goals",
      criticalBlockers: "Conceptual Blockers",
      completedSecured: "Syllabus Secured Today",
      completedSecuredDesc: "Milestones successfully revised and locked.",
      resolvedToday: "REVISED TODAY",
      recommendationsTitle: "STUDENT ADVISOR RECOMMENDATIONS",
      recommendationsSub: "Actionable study tactics customized to maximize subject mastery.",
      loadBalancerText: "Distributing study effort evenly to prevent exam-week burnout.",
      workloadForceMetrics: "COGNITIVE VELOCITY METRICS",
      workloadForceMetricsDesc: "Syllabus density compared with daily memory assimilation limits.",
      focusHoursLoaded: "Revision Hours Mapped",
      peakHazardQuotient: "Peak Mental Fatigue Rate",
      momentumIntelTitle: "CURRICULUM ASSIMILATION ANALYSIS",
      momentumIntelDesc: "Dynamic analysis of your revision rate, subject coverage, and retention metrics.",
      perfAnalysisTitle: "RETENTION & COVERAGE AUDIT",
      momentumStatus: "Mastery Progression Status",
      keyObservation: "Advisory Observation",
      riskAssessment: "Conceptual Knowledge Gap Assessment",
      executiveRec: "Next Strategic Study Milestone",
      completedSecuredStat: "Syllabus Secured",
      createdOverallStat: "Overall Revisions Registered",
      completionRatioStat: "Subject Mastery Ratio",
      weeklyChangeStat: "Weekly Study Variance",
      chartVelocityTitle: "REVISION VELOCITY",
      chartCadenceTitle: "STUDY BLOCK CADENCE",
      chartVelocityLabel: "Curriculum Milestones Revised",
      chartCadenceLabel: "Focus Hours Invested"
    },
    strategicLabels: {
      headerTitle: "Syllabus Strategy Board",
      headerSubtitle: "Deconstruct your student roadmap into active study priorities and master low-retention topics.",
      newTaskBtn: "REGISTER SYLLABUS GOAL",
      workspacePressure: "Syllabus Load pressure",
      workspaceHealth: "Curriculum Health",
      tasksImproved: "Subjects Secured",
      engineTag: "STUDENT INTELLIGENCE ENGINE ACTIVE",
      statusLabel: "REVISION PRIORITY",
      aiBriefHeader: "Student Diagnostic",
      whyHeader: "Why?",
      benefitsHeader: "Comprehension Boost",
      considerationsHeader: "Student Tradeoffs",
      nextActionHeader: "Next Revision Action"
    },
    recoveryLabels: {
      headerTitle: "Syllabus Emergency recovery console",
      activeProtocol: "CURRICULUM DESCALATION PROTOCOL ACTIVE",
      description: "Trigger turnaround study routines when critical subjects or exams are severely compromised.",
      queueTitle: "CRITICAL SYLLABUS QUEUE",
      queueDesc: "Syllabus topics currently tracking behind nominal retention goals.",
      deescalationTitle: "REVISION CORRECTION BLUEPRINT",
      deescalationDesc: "Dynamic student de-escalation framework to salvage compromised subjects.",
      deployButton: "DEPLOY STUDENT SAFETY BUFFER",
      loadingDeploy: "OPTIMIZING STUDY ROUTINE...",
      blueprintTitle: "COGNITIVE RECONSTRUCTION BLUEPRINT",
      lockLabel: "Syllabus Emergency Lockout Active",
      activeNominal: "Student Runway Active & Nominal",
      nominalDesc: "All exams and assignments are currently tracking within safe preparation margins.",
      extensionTitle: "Syllabus Extension Boundary",
      defenseTitle: "Pre-emptive Study Defense Routine",
      resourceTitle: "Subject & Concept Reallocation",
      scopeTitle: "Curriculum Trimming Recommendations",
      priorityTitle: "Temporary Sub-Topic Deferrals",
      roadmapTitle: "STUDENT ACTION ROADMAP",
      recalculateButton: "RE-CALCULATE SYLLABUS RECONSTRUCTION",
      safeguardInactive: "Student Safeguard Deactivated",
      safeguardActiveText: "Invoke 'DEPLOY STUDY SAFETY ROUTINE' on the active lesson to trigger turnaround simulations.",
      safekeepingConsoleIdle: "Advisor Console Idle",
      safekeepingConsoleDesc: "Select any overdue homework or pending revision from the left list to audit or deploy custom turnaround plans."
    },
    taskListLabels: {
      searchPlaceholder: "Search syllabus milestones, exams, or revisions...",
      addTaskLabel: "Add Revision / Syllabus Goal",
      analyzeBtnLabel: "Analyze Revision",
      analyzingBtnLabel: "ASSESSING EXAM READINESS",
      recoveryBadge: "🛡️ Syllabus Recovery active",
      aiAssessmentHeader: "Student Advisor Diagnostic:",
      analyzePromptText: "Run Diagnostic to assess exam readiness and syllabus priority.",
      priorityLabel: "Exam Readiness",
      failRiskLabel: "Syllabus Risk",
      riskScoreLabel: "Syllabus Risk Score",
      aiRecommendationTitle: "AI Student Advisor recommendation",
      aiRiskAssessmentTitle: "AI Syllabus Risk Assessment"
    },
    taskFormLabels: {
      updateConstraints: "Update Study Constraints",
      registerBlocker: "Register Concept Blocker",
      editMilestone: "Edit Syllabus Goal",
      registerMilestone: "Register Syllabus Milestone",
      milestoneTitle: "Milestone / Subject Topic",
      milestonePlaceholder: "e.g., Revise Distributed Replication Consensus Protocols",
      deliverablesSummary: "Deliverables / Knowledge Areas",
      deliverablesPlaceholder: "Define core concepts, theorems, or page ranges to master...",
      hardDeadline: "Exam / Assignment Deadline",
      effortHours: "Required Study Hours",
      workspaceCategory: "Student Subject Category",
      importanceLevel: "Grade Weighting",
      deployButton: "DEPLOY REVISION TARGET",
      saveButton: "SAVE STUDENT CHANGES"
    },
    narrativeTemplates: {
      optimal: "Your current Course Progress is accelerating nicely. With {totalEffort} hours of revision mapped against your exam runways, your mental capacity remains optimal. Focus on consolidating concepts to secure your syllabus milestones.",
      warning: "Urgent Course Progress warning: Your study runway is experiencing scheduling threats. {remainingCount} revision topics are currently at risk, with exam success probability tracking at {successProbability}%. Immediate conceptual de-escalation is required to prevent grade slippage.",
      overloaded: "Critical Syllabus Overload: Cognitive demand has exceeded available learning capacity. Your current revision load of {totalEffort} hours threatens to trigger retention degradation. We recommend postponing non-critical study blocks to safeguard core exam readiness.",
      empty: "Your revision runway is completely pristine. No active study goals or exam milestones are registered. Map a new syllabus topic to begin active recall tracking."
    }
  },
  developer: {
    title: 'Developer Mode',
    subtitle: 'Sprint Brief',
    systemRole: 'Senior Staff Engineer',
    tone: 'technical, concise, developer-focused, authoritative',
    preferredVocabulary: {
      morningBriefing: 'Sprint Brief',
      aiBrief: 'Tech Debt Analysis',
      recommendation: 'Implementation Strategy',
      nextAction: 'Next Sprint Ticket',
      risk: 'Delivery Risk',
      successProbability: 'Delivery Confidence',
      recoveryHub: 'Sprint Recovery Hub',
      whatIfSimulator: 'Sprint Simulator',
      timeline: 'Sprint Timeline'
    },
    forbiddenVocabulary: ['student', 'homework', 'exam', 'teacher', 'classmate', 'curriculum'],
    buttonLabels: {
      analyze: 'Run Priority Diagnostic',
      recalibrate: 'Recalibrate Sprint Plan',
      generateDayPlan: 'Generate Day Schedule',
      generateWeekPlan: 'Generate Sprint Roadmap',
      recoveryButton: 'Trigger Incident Recovery'
    },
    summaryStyle: 'concise, addressing system dependencies, technical debt, blockers, and testing coverage',
    recommendationStyle: 'clear refactoring, unit tests, pull requests, deployment sequences, and hotfixes',
    riskTerminology: {
      label: 'Delivery Risk',
      low: 'Low Risk',
      moderate: 'Moderate Risk',
      high: 'High Risk',
      critical: 'Critical Risk'
    },
    emptyStateMessages: {
      noTasks: 'No sprint deliverables found',
      adjustFilters: 'Adjust filters or register a new feature, bug, or sprint milestone.'
    },
    promptInstructions: 'You are a Senior Staff Engineer. Respond using highly technical, precise, concise, and professional software engineering terminology. Focus on implementation strategies, sprint velocity, tech debt reduction, code freeze dependencies, active blockers, testing pipelines, and shipping deliverables on schedule. Avoid academic or generic language. Always replace generic terms like "task" or "productivity" with developer vocabulary such as "Sprint Ticket", "Tech Debt Item", or "Shippable Feature". Example style: "Implement core API routing and complete integration tests to ship this feature before code freeze. Address pending tech debt in the next sprint cycle."',
    
        dailySecondary: {
        chatWelcome: `Greetings. I am your Senior Staff Assistant AI. I have consolidated your codebase metadata, active sprint constraints, and deployment velocity records.\n\nHow should we align your sprint bandwidth today? I can help you deconstruct epic tickets, calculate tech-debt trade-offs, draft incident recovery playbooks, or simulate scope-reduction options.`,
        flushTooltip: 'Flush conversational buffers',
        wsDesc: 'Higher values indicate a healthier and more achievable sprint execution.',
        wsPoints: ["Remaining developer bandwidth","Code freeze pressure","PR merge probability","Dependency conflicts","Overall sprint balance"],
        bandwidthLabel: 'Velocity',
        unitPlural: 'Tickets',
        unitLower: 'sprint deliverables',
        chartAdded: 'Tickets Created',
        chartCompleted: 'Tickets Closed',
        taskSingularLower: 'ticket',
        hoursLabel: 'cognitive hours',
        focusLabel: 'Sprint Hours',
        riskLabel: 'Slippage Risk %',
    "statusAccelerating": "ACCELERATING VELOCITY",
    "statusStable": "STEADY VELOCITY",
    "statusDeclining": "BURNOUT IMMINENT",
    "statusOverloaded": "SPRINT BOTTLENECK",
    "activeNarrativeSummary": "AI STAFF ASSISTANT // NARRATIVE SUMMARY",
    "narrativeLoading": "Analyzing developer tickets and formulating sprint insight...",
    "nominalRiskLabel": "NOMINAL",
    "thresholdTargetLabel": "SPRINT SLA TARGET",
    "activeProbabilityMatrix": "ACTIVE SPRINT INTEGRATION ANALYSIS",
    "noThreatHeader": "No Urgent Sprint Delivery Blockers Detected",
    "noThreatReasoning": "All sprint tickets and codebase releases are safely structured relative to available developer capacity.",
    "noThreatMitigation": "Maintain current developer sprint velocity. Allocate secondary buffers for technical debt.",
    "awaitingScansText": "Awaiting developer sprint scans. Please trigger recalibration.",
    "awaitingVisualsText": "Regenerating repository visual streams...",
    "awaitingHistoryText": "Awaiting sprint commit telemetry.",
    "noPendingTasksText": "No active pending sprint tickets registered.",
    "resolvedUnitsLabel": "Tickets"
},
    taskListDynamic: {
    "catWork": "💻 Sprint Tickets",
    "catStudy": "📚 Tech Debt / Refactoring",
    "catCareer": "🎖️ Professional Skillup",
    "catPersonal": "👤 Individual Tasks",
    "tabAll": "All Tickets",
    "tabPending": "Open Issues",
    "tabOverdue": "Missed Sprints",
    "tabCompleted": "Closed/Merged",
    "allCategories": "All Repository Scope"
},
    planningDynamic: {
    "compilingTimeline": "COMPILING SPRINT TIMELINE...",
    "compilingRoadmap": "COMPILING SPRINT ROADMAP...",
    "scanningFocus": "Scanning sprint focus blocks...",
    "precisionSla": "Generating high precision sprint slots",
    "plottingMilestones": "Plotting sprint tickets...",
    "timelineTitle": "24h Sprint Timetable",
    "precisionBuffer": "Precision incident buffers",
    "weeklyRoadmap": "WEEKLY SPRINT ROADMAP",
    "balancedAllocation": "Balanced Capacity Allocation"
},
    recoveryDynamic: {
    "threatLabel": "Threat",

    "nominalStatus": "⚠️ Velocity At Risk",
    "nominalOverdue": "🛑 Blocked Ticket",
    "planLoaded": "Sprint Blueprint Loaded",
    "laborEffort": "Developer Hours",
    "turnaroundMission": "SPRINT VELOCITY RECOVERY ROADMAP",
    "selectPending": "-- Select Sprint Ticket --"
},
    strategicDynamic: {
        taskPlural: 'Tickets',
        taskSingular: 'Ticket',
        slaLabel: 'SPRINT',
        overdueLabel: 'OVERDUE SPRINT',
        slaBreachedLabel: 'Sprint Breached',
    
    taskStatusLabels: {"urgent":"CRITICAL BUG/BLOCKER","high":"HIGH PRIORITY TICKET","stable":"STABLE SPRINT","low":"BACKLOG"},
    executiveScoreLabels: {"high":"High Priority Ticket","moderate":"Moderate Confidence","low":"Sprint Readiness"},
    "awaitingIntel": "Awaiting sprint alignment scans. Please trigger AI evaluation.",
    "noIntel": "No active sprint insights or technical reports detected.",
    "decisionHeader": "TECHNICAL DECISION MATRIX",
    "categoryInsights": "Repository Insights",
    "priorityFocus": "Primary Developer Focus",
    "strategicMetrics": "Velocity Metrics"
},

    sidebarLabels: {
      briefing: "Sprint Brief",
      tasks: "Sprint Backlog",
      strategic: "Sprint Decisions",
      plans: "Sprint Roadmap",
      recovery: "Incident Recovery",
      simulator: "Sprint Simulator",
      chat: "AI Developer Lead"
    },
    
    simulatorLabels: {"predictorPanel":"Sprint Performance Predictor","title":"What-If Sprint Simulator","description":"Project the sprint success, code velocity, and deployment risk of delaying tickets, scaling down scope, or working overtime.","chooseTarget":"-- Choose Target Sprint Ticket --","originalCost":"Dev Effort Required","constraintDeadline":"Sprint Deadline","baselineUrgency":"Ticket Priority","step1":"Step 1: Select Backlog Ticket","step2":"Step 2: Define Sprint Intervention","executeButton":"PROJECT SPRINT IMPACT","executingButton":"RUNNING OVERTIME SIMULATION...","outcomeHeader":"Projected Sprint Metrics","workspaceSuccess":"Sprint Completion","objectiveSuccess":"Build Stability","failureRisk":"SLA Breach Risk","awaitingInput":"Awaiting Sprint Parameters","awaitingDesc":"Configure sprint adjustments to simulate code-freeze bottlenecks and delivery velocity.","outcomeMetricsLabel":"Outcome Model Metrics","simulatedStateLabel":"SIMULATED SPRINT STATE","aiConfidenceLabel":"AI CONFIDENCE:"},
    confidenceDrivers: ["Commit history consistency","Code freeze certainty","PR/deploy volatility","Scenario complexity","Branch telemetry signals"],
dailyBriefingLabels: {
      realTimeForecast: "REAL-TIME FORECAST",
      realTimeSynthesis: "Real-Time Synthesis",
      bySector: "BY EPIC",
      
      morningBriefing: "Sprint Performance Audit",
      morningBriefingDesc: "Real-time analysis of build blockages, delivery timelines, and technical debt indicators.",
      recalibrateButton: "RECALIBRATE SPRINT RUNWAY",
      failureForecast: "SLA Failure Risk Forecast",
      failureProbability: "Delivery Slippage Probability",
      systemCalibrated: "SATELLITE COMPILER NOMINAL",
      highestRiskObjective: "CRITICAL PATH BLOCKER",
      criticalRiskReasoning: "UNRESOLVED SYSTEM DEPENDENCY",
      aiMitigationStrategy: "REALLOCATED DEPLOYMENT PATHWAY",
      strategicIntelTitle: "DEVELOPER INTEL TERMINAL",
      strategicFocus: "Active Codebase Epic",
      biggestRiskToday: "Critical Build Blocker",
      mostImportantTask: "High Priority Ticket",
      criticalBottleneck: "Technical Bottleneck",
      recommendedIntervention: "Remediation Strategy",
      successProbability: "Sprint Delivery Confidence",
      workloadStress: "Developer Load Factor",
      totalEstimatedEffort: "Total Dev Cycles Required",
      totalEstimatedEffortDesc: "Active sprint tickets mapped against total dev bandwidth hours.",
      threatMatrix: "DELIVERY THREAT MATRIX",
      highRiskGoals: "Vulnerable Code Epics",
      criticalBlockers: "Active System Blockers",
      completedSecured: "Pull Requests Merged Today",
      completedSecuredDesc: "Features safely deployed to production branch.",
      resolvedToday: "SHIPPED TODAY",
      recommendationsTitle: "SENIOR STAFF ENGINEER GUIDELINES",
      recommendationsSub: "Implementation strategies, technical hotfixes, and scope limits.",
      loadBalancerText: "Smoothing development velocity spikes to prevent developer burnout.",
      workloadForceMetrics: "VELOCITY COGNITION SPECTRUM",
      workloadForceMetricsDesc: "System code complexity mapped against available developer cycles.",
      focusHoursLoaded: "Coding Slots Loaded",
      peakHazardQuotient: "Peak Code Regression Risk",
      momentumIntelTitle: "DEVELOPMENT VELOCITY METRICS",
      momentumIntelDesc: "Real-time auditing of code churn, deployment intervals, and architectural regression factors.",
      perfAnalysisTitle: "VELOCITY & REFACTORING AUDIT",
      momentumStatus: "Codebase Progression Status",
      keyObservation: "Staff Engineer Observation",
      riskAssessment: "Technical Debt & Refactoring Assessment",
      executiveRec: "Next Implementation Objective",
      completedSecuredStat: "Code Shipped",
      createdOverallStat: "Sprint Tickets Registered",
      completionRatioStat: "Velocity Fulfillment Rate",
      weeklyChangeStat: "Weekly Ticket Churn",
      chartVelocityTitle: "TICKET CLEARANCE",
      chartCadenceTitle: "DEV FOCUS DISTRIBUTION",
      chartVelocityLabel: "Sprint Tickets Completed",
      chartCadenceLabel: "Coding Focus Hours"
    },
    strategicLabels: {
      headerTitle: "Sprint Architecture Console",
      headerSubtitle: "Prune technical debt, resolve blocking pull requests, and optimize features before code freeze.",
      newTaskBtn: "CREATE SPRINT TICKET",
      workspacePressure: "Sprint Backlog pressure",
      workspaceHealth: "Codebase Stability",
      tasksImproved: "Tickets Shipped",
      engineTag: "COMPILER COGNITIVE MODULE RUNNING",
      statusLabel: "SPRINT TICKET STATUS",
      aiBriefHeader: "Sprint Analysis",
      whyHeader: "Sprint Reasoning",
      benefitsHeader: "Velocity Gain",
      considerationsHeader: "Risk Tradeoffs",
      nextActionHeader: "Next Sprint Ticket Step"
    },
    recoveryLabels: {
      headerTitle: "Incident & Build recovery console",
      activeProtocol: "INCIDENT RESPONSE DRILL DEPLOYED",
      description: "Initiate emergency workarounds and reallocate focus when delivery deadlines are compromised.",
      queueTitle: "CRITICAL BACKLOG BLOCKS",
      queueDesc: "Active tickets whose delayed merge risks breaching delivery SLAs.",
      deescalationTitle: "SLA REPAIR MITIGATION SCRIPT",
      deescalationDesc: "Automated rollback, feature-flagging, or scope adjustments to repair velocity.",
      deployButton: "EXECUTE INCIDENT ROLLBACK",
      loadingDeploy: "GENERATING HOTFIX RUNBOOK...",
      blueprintTitle: "COGNITIVE RESTORATION SCHEMATIC",
      lockLabel: "Incident Overtime Interlock Active",
      activeNominal: "Sprint Track Active & Nominal",
      nominalDesc: "All sprint tickets are currently tracking safely inside scheduled release windows.",
      extensionTitle: "Sprint Extension Boundary",
      defenseTitle: "Pre-emptive Build Safeguard",
      resourceTitle: "Developer Bandwidth Reallocation",
      scopeTitle: "Backlog Trimming Recommendations",
      priorityTitle: "Temporary Feature Deferrals",
      roadmapTitle: "SPLAT HOTFIX ROADMAP",
      recalculateButton: "RE-RUN SPRINT MITIGATION ENGINE",
      safeguardInactive: "Incident Safeguard Deactivated",
      safeguardActiveText: "Invoke 'DEPLOY INCIDENT PROTOCOL' on the active queue item to run turnaround simulations.",
      safekeepingConsoleIdle: "Staff Console Idle",
      safekeepingConsoleDesc: "Select any overdue or pending developer ticket from the left panels to audit or fire dynamic recovery plans."
    },
    taskListLabels: {
      searchPlaceholder: "Search sprint backlog, tech debt, or ship releases...",
      addTaskLabel: "Add Sprint Ticket",
      analyzeBtnLabel: "Diagnose Ticket",
      analyzingBtnLabel: "DIAGNOSING SPRINT IMPACT",
      recoveryBadge: "🛡️ Sprint Recovery active",
      aiAssessmentHeader: "Senior Staff Engineer Diagnostic:",
      analyzePromptText: "Run diagnostic to analyze tech debt, blocker impact, and shipping risk.",
      priorityLabel: "Sprint Priority",
      failRiskLabel: "Delivery Risk",
      riskScoreLabel: "Build Slippage Risk",
      aiRecommendationTitle: "AI Senior Staff Engineer recommendation",
      aiRiskAssessmentTitle: "AI Delivery Risk Assessment"
    },
    taskFormLabels: {
      updateConstraints: "Update Ticket Constraints",
      registerBlocker: "Register System Blocker",
      editMilestone: "Edit Sprint Ticket",
      registerMilestone: "Register Backlog Ticket",
      milestoneTitle: "Ticket Title / Bug / Feature",
      milestonePlaceholder: "e.g., Deploy Raft Consensus State Middleware",
      deliverablesSummary: "Sprint Deliverables / Scope MVP",
      deliverablesPlaceholder: "Define clear API endpoints, unit tests, or schemas to ship...",
      hardDeadline: "Sprint Cutoff / Code Freeze",
      effortHours: "Estimated Story Points (Hours)",
      workspaceCategory: "Software Repository Domain",
      importanceLevel: "Release Severity Level",
      deployButton: "DEPLOY SPRINT TICKET",
      saveButton: "SAVE TICKET CHANGES"
    },
    narrativeTemplates: {
      optimal: "Development Velocity is tracking optimally at a nominal cadence. Your sprint backlog requires {totalEffort} hours of developer cycles, well within available operational bandwidth. Continue with active ticket resolution and keep regression risk low.",
      warning: "Sprint Velocity Warning: Unresolved code dependencies have introduced delivery risk. There are {remainingCount} tickets nearing critical milestones with delivery confidence down to {successProbability}%. We recommend a code freeze and focusing on blocking pull requests.",
      overloaded: "Critical Sprint Congestion: Backlog density of {totalEffort} developer hours has saturated available team capacity. Cognitive overload threatens system stability. Postpone non-essential refactoring to unblock core feature delivery.",
      empty: "Your active sprint backlog is empty. No features or tech debt items are currently tracking in the queue. Register a new sprint ticket to initialize velocity tracking."
    }
  },
  job_seeker: {
    title: 'Career Mode',
    subtitle: 'Career Brief',
    systemRole: 'Career Coach',
    tone: 'professional, motivating, career-focused',
    preferredVocabulary: {
      morningBriefing: 'Career Brief',
      aiBrief: 'Career Snapshot',
      recommendation: 'Growth Plan',
      nextAction: 'Career Action',
      risk: 'Opportunity Risk',
      successProbability: 'Career Readiness',
      recoveryHub: 'Career Recovery',
      whatIfSimulator: 'Career Impact Simulator',
      timeline: 'Career Roadmap'
    },
    forbiddenVocabulary: ['sprint', 'git', 'refactor', 'repository', 'compilation', 'database index'],
    buttonLabels: {
      analyze: 'Assess Career Priority',
      recalibrate: 'Recalibrate Career Plan',
      generateDayPlan: 'Generate Today\'s Agenda',
      generateWeekPlan: 'Generate Weekly Growth Roadmap',
      recoveryButton: 'Get Career Recovery Steps'
    },
    summaryStyle: 'motivating, professional, emphasizing networking outreach, interview prep, resumes, and portfolio building',
    recommendationStyle: 'clear actionable advice on professional networking, interview preparations, job applications, and skill acquisition',
    riskTerminology: {
      label: 'Opportunity Risk',
      low: 'Low Risk',
      moderate: 'Moderate Risk',
      high: 'High Risk',
      critical: 'Critical Risk'
    },
    emptyStateMessages: {
      noTasks: 'No active job leads in pipeline',
      adjustFilters: 'Adjust filters or log a new interview, job application, or networking goal.'
    },
    promptInstructions: 'You are an AI Career Coach. Respond using motivating, supportive, and professional language centered around career development. Focus on resume tailoring, portfolio creation, internship hunting, mock interviews, LinkedIn networking, and skill development. Avoid deep software engineering implementation slang or corporate strategic planning jargon. Always replace generic terms like "task" or "productivity" with career-specific vocabulary such as "Application Step", "Career Goal", or "Interview Prep Block". Example style: "Complete your project portfolio page today and send two tailored applications. Revise core interview answers before tomorrow\'s call."',
    
        dailySecondary: {
        chatWelcome: `Greetings. I am your Career Placement Coach AI. I have consolidated your pipeline metadata, active interview constraints, and historical prep velocity.\n\nHow should we align your placement strategy today? I can help you deconstruct monolithic prep tasks, calculate interview trade-offs, draft emergency pipeline recovery timelines, or simulate networking outreach options.`,
        flushTooltip: 'Flush conversational buffers',
        wsDesc: 'Higher values indicate a healthier and more achievable hiring placement.',
        wsPoints: ["Remaining prep capacity","Interview date pressure","Offer conversion probability","Scheduling conflicts","Overall pipeline balance"],
        bandwidthLabel: 'Career Readiness',
        unitPlural: 'Applications',
        unitLower: 'job leads',
        chartAdded: 'Applications Opened',
        chartCompleted: 'Applications Secured',
        taskSingularLower: 'application',
        hoursLabel: 'preparation hours',
        focusLabel: 'Prep Hours',
        riskLabel: 'Rejection Risk %',
    "statusAccelerating": "INTENSE OUTREACH",
    "statusStable": "CONSISTENT COHORT",
    "statusDeclining": "MOMENTUM COMPRESSION",
    "statusOverloaded": "COGNITIVE OVERLOAD",
    "activeNarrativeSummary": "AI CAREER COACH // NARRATIVE SUMMARY",
    "narrativeLoading": "Analyzing pipeline progress and formulating outreach insight...",
    "nominalRiskLabel": "PENDING",
    "thresholdTargetLabel": "APPLICATION DEADLINE TARGET",
    "activeProbabilityMatrix": "ACTIVE OPPORTUNITY PIPELINE ANALYSIS",
    "noThreatHeader": "No Urgent Pipeline Attrition Detected",
    "noThreatReasoning": "All interviews and application follow-ups are safely structured relative to preparation capacity.",
    "noThreatMitigation": "Maintain current application velocity. Allocate secondary buffers for interview prep.",
    "awaitingScansText": "Awaiting career alignment scans. Please trigger recalibration.",
    "awaitingVisualsText": "Regenerating pipeline visual streams...",
    "awaitingHistoryText": "Awaiting outreach metrics telemetry.",
    "noPendingTasksText": "No active pending career opportunities registered.",
    "resolvedUnitsLabel": "Offers/Leads"
},
    taskListDynamic: {
    "catWork": "💼 Job Applications",
    "catStudy": "📚 Interview Prep",
    "catCareer": "🎖️ Networking Outreaches",
    "catPersonal": "👤 Personal Routine",
    "tabAll": "All Pipeline",
    "tabPending": "Active Loops",
    "tabOverdue": "Missed Followups",
    "tabCompleted": "Offers Secured",
    "allCategories": "All Pipeline Goals"
},
    planningDynamic: {
    "compilingTimeline": "COMPILING CAREER AGENDA...",
    "compilingRoadmap": "COMPILING GROWTH ROADMAP...",
    "scanningFocus": "Scanning outreach intervals...",
    "precisionSla": "Generating high precision outreach slots",
    "plottingMilestones": "Plotting outreach goals...",
    "timelineTitle": "24h Career Timetable",
    "precisionBuffer": "Precision follow-up buffers",
    "weeklyRoadmap": "WEEKLY CAREER TILES",
    "balancedAllocation": "Balanced Growth Allocation"
},
    recoveryDynamic: {
    "threatLabel": "Threat",

    "nominalStatus": "⚠️ Pipeline Stall",
    "nominalOverdue": "🛑 Deadline Missed",
    "planLoaded": "Pipeline Rescue Plan Loaded",
    "laborEffort": "Prep Hours",
    "turnaroundMission": "OPPORTUNITY CONVERSION BLUEPRINT",
    "selectPending": "-- Select Application Goal --"
},
    strategicDynamic: {
        taskPlural: 'Applications',
        taskSingular: 'Application',
        slaLabel: 'DUE DATE',
        overdueLabel: 'OVERDUE ACTION',
        slaBreachedLabel: 'Due Date Past',
    
    taskStatusLabels: {"urgent":"URGENT ACTION REQUIRED","high":"HIGH IMPACT","stable":"STABLE PIPELINE","low":"LOW PRIORITY"},
    executiveScoreLabels: {"high":"High Priority Application","moderate":"Moderate Confidence","low":"Interview Readiness"},
    "awaitingIntel": "Awaiting career alignment scans. Please trigger AI evaluation.",
    "noIntel": "No active pipeline insights or conversion reports detected.",
    "decisionHeader": "CAREER DECISION MATRIX",
    "categoryInsights": "Pipeline Insights",
    "priorityFocus": "Primary Outreach Focus",
    "strategicMetrics": "Conversion Metrics"
},

    sidebarLabels: {
      briefing: "Career Brief",
      tasks: "Application Registry",
      strategic: "Career Strategy",
      plans: "Career Planner",
      recovery: "Milestone Recovery",
      simulator: "Placement Simulator",
      chat: "AI Career Agent"
    },
    
    simulatorLabels: {"predictorPanel":"Placement Pipeline Predictor","title":"What-If Placement Simulator","description":"Evaluate the conversion probability of shifting interview dates, modifying outreach strategies, or expanding job applications.","chooseTarget":"-- Choose Target Application --","originalCost":"Prep Hours Required","constraintDeadline":"Interview Date","baselineUrgency":"Role Priority","step1":"Step 1: Select Target Opportunity","step2":"Step 2: Adjust Placement Variables","executeButton":"SIMULATE PIPELINE IMPACT","executingButton":"CALCULATING CONVERSION RATIOS...","outcomeHeader":"Projected Hiring Funnel","workspaceSuccess":"Interview Pipeline Health","objectiveSuccess":"Offer Conversion Rate","failureRisk":"Rejection Risk","awaitingInput":"Awaiting Pipeline Adjustments","awaitingDesc":"Modify target variables to generate risk and conversion models for the selected role.","outcomeMetricsLabel":"Outcome Model Metrics","simulatedStateLabel":"SIMULATED PIPELINE STATE","aiConfidenceLabel":"AI CONFIDENCE:"},
    confidenceDrivers: ["Interview funnel consistency","Process/round certainty","Hiring wave volatility","Scenario complexity","Recruiter signal indicators"],
dailyBriefingLabels: {
      realTimeForecast: "REAL-TIME FORECAST",
      realTimeSynthesis: "Real-Time Synthesis",
      bySector: "BY STAGE",
      
      morningBriefing: "Hiring Pipeline Assessment",
      morningBriefingDesc: "Real-time tracking of active job applications, networking outreach, and interview loops.",
      recalibrateButton: "RECALIBRATE HIRING PIPELINE",
      failureForecast: "Opportunity Risk Forecast",
      failureProbability: "Rejection / Expiry Probability",
      systemCalibrated: "PLACEMENT STRATEGY ONLINE",
      highestRiskObjective: "CRITICAL RECRUITER LOOP",
      criticalRiskReasoning: "PENDING INTERVIEW FOLLOWUP",
      aiMitigationStrategy: "TAILORED RE-ENGAGEMENT ACTION",
      strategicIntelTitle: "CAREER PLACEMENT TERMINAL",
      strategicFocus: "Active Application Stage",
      biggestRiskToday: "Stalled Hiring Lead",
      mostImportantTask: "Key Career Milestone",
      criticalBottleneck: "Profile Gap Bottleneck",
      recommendedIntervention: "Coaching Direction",
      successProbability: "Hiring Probability Index",
      workloadStress: "Search Stress Factor",
      totalEstimatedEffort: "Total Preparation Hours",
      totalEstimatedEffortDesc: "Required portfolio and interview preparation mapped against application dates.",
      threatMatrix: "HIRING PIPELINE THREATS",
      highRiskGoals: "At-Risk Applications",
      criticalBlockers: "Missing Profile Portfolios",
      completedSecured: "Applications Submitted Today",
      completedSecuredDesc: "Tailored applications logged and outreach completed.",
      resolvedToday: "SUBMITTED TODAY",
      recommendationsTitle: "CAREER COACH GUIDELINES",
      recommendationsSub: "Actionable tactics to optimize resumes, network on LinkedIn, and ace technical interviews.",
      loadBalancerText: "Pacing application submissions to maintain recruiter correspondence quality.",
      workloadForceMetrics: "PLACEMENT INTENSITY METRICS",
      workloadForceMetricsDesc: "Application outreach intensity mapped against interview preparation limits.",
      focusHoursLoaded: "Outreach Blocks Mapped",
      peakHazardQuotient: "Peak Application Exhaustion",
      momentumIntelTitle: "APPLICATION PIPELINE MONITOR",
      momentumIntelDesc: "Dynamic analysis of callback ratios, recruiter engagement rates, and interview performance metrics.",
      perfAnalysisTitle: "CONVERSION & NETWORKING AUDIT",
      momentumStatus: "Hiring Pipeline Status",
      keyObservation: "Coaching Observation",
      riskAssessment: "Interview Skills & Resume Gap Assessment",
      executiveRec: "Next Application Target",
      completedSecuredStat: "Apps Submitted",
      createdOverallStat: "Active Opportunities Logged",
      completionRatioStat: "Interview Callback Ratio",
      weeklyChangeStat: "Weekly Outreach Churn",
      chartVelocityTitle: "CONVERSION VELOCITY",
      chartCadenceTitle: "GROWTH PREP CADENCE",
      chartVelocityLabel: "Applications Deployed",
      chartCadenceLabel: "Preparation Hours"
    },
    strategicLabels: {
      headerTitle: "Career Alignment Board",
      headerSubtitle: "Tailor your professional portfolios, address skills gaps, and optimize application pipelines.",
      newTaskBtn: "ADD PLACEMENT GOAL",
      workspacePressure: "Job Pipeline density",
      workspaceHealth: "Career Preparation Health",
      tasksImproved: "Applications Deployed",
      engineTag: "CAREER MATCHING SYSTEM ACTIVE",
      statusLabel: "APPLICATION PIPELINE STATUS",
      aiBriefHeader: "Career Snapshot",
      whyHeader: "Career Reasoning",
      benefitsHeader: "Placement Gain",
      considerationsHeader: "Opportunity Costs",
      nextActionHeader: "Next Career Outreach Step"
    },
    recoveryLabels: {
      headerTitle: "Hiring Pipeline recovery console",
      activeProtocol: "APPLICATION RE-ENGAGEMENT DRILL ACTIVE",
      description: "Trigger intensive preparation routines and re-engage dormant recruiters when hiring pipelines are dry.",
      queueTitle: "CRITICAL EXPIRED LEADS",
      queueDesc: "Job applications currently tracking behind expected feedback deadlines.",
      deescalationTitle: "PIPELINE REVIVAL SCRIPT",
      deescalationDesc: "Dynamic resume updates, cold-outreach templates, and application pivots to revive callbacks.",
      deployButton: "DEPLOY PIPELINE EMERGENCY PIVOT",
      loadingDeploy: "GENERATING OUTREACH TEMPLATE...",
      blueprintTitle: "PIPELINE RESTORATION CHECKLIST",
      lockLabel: "Outreach Recovery Interlock Active",
      activeNominal: "Career Search Active & Nominal",
      nominalDesc: "All career applications and interviews are currently tracking inside comfortable safety margins.",
      extensionTitle: "Interview Date Boundary",
      defenseTitle: "Pre-emptive Application Safeguard",
      resourceTitle: "LinkedIn Networking Reallocation",
      scopeTitle: "Application Trimming Recommendations",
      priorityTitle: "Temporary Search Deferrals",
      roadmapTitle: "CONVERSION ACCELERATOR ROADMAP",
      recalculateButton: "RE-RUN PIPELINE MITIGATION CODES",
      safeguardInactive: "Career Safeguard Deactivated",
      safeguardActiveText: "Invoke 'DEPLOY PLACEMENT DRILL' on the active vacancy to trigger hiring turnaround simulations.",
      safekeepingConsoleIdle: "Coaching Console Idle",
      safekeepingConsoleDesc: "Select any overdue application or pending interview from the left to audit or deploy customized career recovery plans."
    },
    taskListLabels: {
      searchPlaceholder: "Search job applications, interviews, or career goals...",
      addTaskLabel: "Add Career Application",
      analyzeBtnLabel: "Assess Fit",
      analyzingBtnLabel: "ASSESSING PLACEMENT FIT",
      recoveryBadge: "🛡️ Career Recovery active",
      aiAssessmentHeader: "Career Coach Assessment:",
      analyzePromptText: "Run assessment to analyze placement pipelines and interview goals.",
      priorityLabel: "Career Priority",
      failRiskLabel: "Opportunity Risk",
      riskScoreLabel: "Application Expiry Risk",
      aiRecommendationTitle: "AI Career Coach recommendation",
      aiRiskAssessmentTitle: "AI Opportunity Risk Assessment"
    },
    taskFormLabels: {
      updateConstraints: "Update Pipeline Constraints",
      registerBlocker: "Register Interview Block",
      editMilestone: "Edit Application Milestone",
      registerMilestone: "Register New Vacancy / Target",
      milestoneTitle: "Target Opportunity / Company",
      milestonePlaceholder: "e.g., Tailor Application for Staff Software Engineer at Acme Corp",
      deliverablesSummary: "Career Deliverables / Tailoring Requirements",
      deliverablesPlaceholder: "Define required resume customizations, cover letters, or portfolio samples to submit...",
      hardDeadline: "Application Expiry / Interview Date",
      effortHours: "Required Portfolio/Prep Time",
      workspaceCategory: "Application Channel Type",
      importanceLevel: "Opportunity Priority Tier",
      deployButton: "DEPLOY CAREER GOAL",
      saveButton: "SAVE PIPELINE CHANGES"
    },
    narrativeTemplates: {
      optimal: "Your Career Readiness is stable and building positive momentum. Your pipeline requires {totalEffort} hours of application follow-ups and portfolio polish. Keep up the high outreach frequency to maximize recruiter conversions.",
      warning: "Opportunity Conversion Warning: Sluggish outreach activity is introducing placement risk. {remainingCount} priority application steps are stagnant, with placement confidence sliding to {successProbability}%. Trigger targeted outreach immediately.",
      overloaded: "Critical Interview Congestion: Your job-hunt pipeline of {totalEffort} preparation hours has saturated your cognitive capacity. High interview density is driving burnout risk. Streamline non-essential networking to focus on top-tier offers.",
      empty: "No job applications or interview preparation blocks are currently active. Register a new career goal or application milestone to activate job-search intelligence."
    }
  },
  professional: {
    title: 'Professional Mode',
    subtitle: 'Executive Brief',
    systemRole: 'Executive Ops Manager',
    tone: 'executive, professional, confident, systems-oriented',
    preferredVocabulary: {
      morningBriefing: 'Executive Brief',
      aiBrief: 'Executive Summary',
      recommendation: 'Execution Plan',
      nextAction: 'Priority Action',
      risk: 'Business Risk',
      successProbability: 'Delivery Confidence',
      recoveryHub: 'Recovery Plan',
      whatIfSimulator: 'Decision Simulator',
      timeline: 'Execution Timeline'
    },
    forbiddenVocabulary: ['homework', 'exam', 'teacher', 'git commit', 'pull request', 'grades'],
    buttonLabels: {
      analyze: 'Review Strategic Priority',
      recalibrate: 'Recalibrate Executive Brief',
      generateDayPlan: 'Compile Action Plan',
      generateWeekPlan: 'Draft Execution Roadmap',
      recoveryButton: 'Deploy Recovery Plan'
    },
    summaryStyle: 'executive, structured, highlighting stakeholder alignment, business operations, and target KPIs',
    recommendationStyle: 'strategic alignment initiatives, dependency risk mitigations, executive communications, and resource optimization',
    riskTerminology: {
      label: 'Business Risk',
      low: 'Low Risk',
      moderate: 'Moderate Risk',
      high: 'High Risk',
      critical: 'Critical Risk'
    },
    emptyStateMessages: {
      noTasks: 'No professional objectives recorded',
      adjustFilters: 'Adjust filters or add a new strategic project, stakeholder presentation, or milestone.'
    },
    promptInstructions: 'You are an Executive Ops Manager. Respond using concise, highly polished, confident, and direct executive communication. Focus on stakeholder alignment, target execution delivery, key metrics (KPIs), resource coordination, operational dependencies, and risk management. Sound like an experienced development or product manager speaking to executives. Always replace generic terms like "task" or "productivity" with executive vocabulary such as "Operational Objective", "SLA Deliverable", "Strategic Milestone", or "Key Performance Target". Example style: "Align with key stakeholders to unblock the milestone delivery. Reschedule non-essential discussions to safeguard the core project schedule."',
    
        dailySecondary: {
        chatWelcome: `Greetings. I am your Gemini Chief of Staff. I have consolidated your current workspace metadata, active deadline constraints, and historical velocity records.\n\nHow should we align your strategic capacity today? I can help you deconstruct monolithic deliverables, calculate high-value trade-offs, draft emergency recovery timelines, or simulate scope-reduction options.`,
        flushTooltip: 'Flush conversational buffers',
        wsDesc: 'Higher values indicate a healthier and more achievable execution plan.',
        wsPoints: ["Remaining execution capacity","Deadline pressure","Task completion probability","Scheduling conflicts","Overall workload balance"],
        bandwidthLabel: 'Operational Bandwidth',
        unitPlural: 'Objectives',
        unitLower: 'milestones',
        chartAdded: 'Objectives Logged',
        chartCompleted: 'Objectives Delivered',
        taskSingularLower: 'objective',
        hoursLabel: 'cognitive hours',
        focusLabel: 'Focus Hours',
        riskLabel: 'SLA Risk %',
    "statusAccelerating": "ACCELERATING CADENCE",
    "statusStable": "STABLE OPERATIONS",
    "statusDeclining": "VELOCITY COMPRESSION",
    "statusOverloaded": "CRITICAL CONGESTION",
    "activeNarrativeSummary": "AI CHIEF OF STAFF // NARRATIVE SUMMARY",
    "narrativeLoading": "Analyzing system metrics and formulating narrative insight...",
    "nominalRiskLabel": "NOMINAL",
    "thresholdTargetLabel": "THRESHOLD TARGET",
    "activeProbabilityMatrix": "ACTIVE PROBABILITY ASSESSMENT MATRIX",
    "noThreatHeader": "No Urgent Scheduling Threat Detected",
    "noThreatReasoning": "All task deadlines are safely structured relative to estimated cognitive hours.",
    "noThreatMitigation": "Maintain current delivery rate. Allocate secondary buffers where available.",
    "awaitingScansText": "Awaiting executive alignment scans. Please trigger recalibration.",
    "awaitingVisualsText": "Regenerating dynamic visual streams...",
    "awaitingHistoryText": "Awaiting historic metrics telemetry.",
    "noPendingTasksText": "No active pending strategic milestones registered.",
    "resolvedUnitsLabel": "Units"
},
    taskListDynamic: {
    "catWork": "💼 Operations",
    "catStudy": "📚 Skill Acquisition",
    "catCareer": "🎖️ Strategic Career",
    "catPersonal": "👤 Personal Habits",
    "tabAll": "All Deliverables",
    "tabPending": "Pending Actions",
    "tabOverdue": "SLA Overdue",
    "tabCompleted": "Done/Archived",
    "allCategories": "All Operational Domains"
},
    planningDynamic: {
    "compilingTimeline": "COMPILING TIMELINE...",
    "compilingRoadmap": "COMPILING ROADMAP...",
    "scanningFocus": "Scanning focus blocks...",
    "precisionSla": "Generating high precision SLA timetable slots",
    "plottingMilestones": "Plotting weekly milestones...",
    "timelineTitle": "24h Task Timetable",
    "precisionBuffer": "Precision SLA buffers",
    "weeklyRoadmap": "WEEKLY MILESTONE TILES",
    "balancedAllocation": "Balanced Resource Allocation"
},
    recoveryDynamic: {
    "threatLabel": "Threat",

    "nominalStatus": "⚠️ SLA Breach Risk",
    "nominalOverdue": "🛑 Overdue SLA",
    "planLoaded": "Action Plan Loaded",
    "laborEffort": "Operational Hours",
    "turnaroundMission": "CRITICAL ESCALATION ALIGNMENT",
    "selectPending": "-- Select Escalated Objective --"
},
    strategicDynamic: {
        taskPlural: 'Objectives',
        taskSingular: 'Objective',
        slaLabel: 'SLA',
        overdueLabel: 'OVERDUE SLA',
        slaBreachedLabel: 'SLA Breached',
    
    taskStatusLabels: {"urgent":"URGENT ACTION REQUIRED","high":"HIGH VALUE","stable":"STABLE","low":"LOW PRIORITY"},
    executiveScoreLabels: {"high":"High Priority","moderate":"Moderate Confidence","low":"Executive Readiness"},
    "awaitingIntel": "Awaiting executive alignment scans. Please trigger AI evaluation.",
    "noIntel": "No active strategic intelligence reports detected.",
    "decisionHeader": "EXECUTIVE DECISION MATRIX",
    "categoryInsights": "Operational Insights",
    "priorityFocus": "Primary Strategic Focus",
    "strategicMetrics": "Performance Metrics"
},

    sidebarLabels: {
      briefing: "Executive Brief",
      tasks: "SLA Initiative Matrix",
      strategic: "Executive Decisions",
      plans: "Execution Roadmap",
      recovery: "SLA Recovery Hub",
      simulator: "Decision Simulator",
      chat: "AI Chief of Staff"
    },
    
    simulatorLabels: {"predictorPanel":"Strategic Operations Predictor","title":"What-If Executive Simulator","description":"Model the operational consequences of delaying milestones, reallocating budget, or forcing timeline accelerations.","chooseTarget":"-- Choose Target SLA Initiative --","originalCost":"Labor Hours Required","constraintDeadline":"SLA Deadline","baselineUrgency":"Strategic Priority","step1":"Step 1: Select Business Initiative","step2":"Step 2: Model Execution Adjustments","executeButton":"RUN SLA PROJECTION","executingButton":"GENERATING IMPACT MODEL...","outcomeHeader":"Projected Operational State","workspaceSuccess":"Professional Execution","objectiveSuccess":"Initiative Success","failureRisk":"SLA Breach Risk","awaitingInput":"Awaiting Simulation Inputs","awaitingDesc":"Adjust variables on the left to project execution outcomes, risk impacts, and resource tradeoffs.","outcomeMetricsLabel":"Outcome Model Metrics","simulatedStateLabel":"SIMULATED WORKSPACE STATE","aiConfidenceLabel":"AI CONFIDENCE:"},
    confidenceDrivers: ["Historical deliverable consistency","SLA breach certainty","Operational capacity volatility","Scenario complexity","Contextual telemetry signals"],
dailyBriefingLabels: {
      realTimeForecast: "REAL-TIME FORECAST",
      realTimeSynthesis: "Real-Time Synthesis",
      bySector: "BY SECTOR",
      
      morningBriefing: "Operational Review",
      morningBriefingDesc: "Comprehensive executive review of target timelines, SLA compliance states, and active dependencies.",
      recalibrateButton: "RECALIBRATE STRATEGIC RUNWAY",
      failureForecast: "Business Risk Forecast",
      failureProbability: "SLA Constraint Breach Risk",
      systemCalibrated: "COGNITIVE CONSOLE NOMINAL",
      highestRiskObjective: "CRITICAL SLA BOTTLENECK",
      criticalRiskReasoning: "STAKEHOLDER REALIGNMENT REQD",
      aiMitigationStrategy: "OPTIMIZED RECOVERY STRATEGY",
      strategicIntelTitle: "STRATEGIC OPERATIONS CONSOLE",
      strategicFocus: "Active Business Initiative",
      biggestRiskToday: "Critical SLA Blocker",
      mostImportantTask: "Core Strategic Objective",
      criticalBottleneck: "Dependency Bottleneck",
      recommendedIntervention: "Executive Recommendation",
      successProbability: "Workspace Execution Health",
      workloadStress: "Operational Load Index",
      totalEstimatedEffort: "Projected Labor Hours Required",
      totalEstimatedEffortDesc: "SLA deliverable hours calculated against stakeholder commitments.",
      threatMatrix: "OPERATIONAL RISK THREATS",
      highRiskGoals: "Vulnerable Business Goals",
      criticalBlockers: "Unresolved Dependencies",
      completedSecured: "SLA Deliverables Resolved",
      completedSecuredDesc: "Key objectives successfully completed and locked.",
      resolvedToday: "DELIVERED TODAY",
      recommendationsTitle: "EXECUTIVE OPS DIRECTIVES",
      recommendationsSub: "Strategic operational adjustments, resource balancing, and risk mitigation pathways.",
      loadBalancerText: "Smoothing stakeholder commitments to protect team resource sustainability.",
      workloadForceMetrics: "RESOURCE COMPLIANCE SPECTRUM",
      workloadForceMetricsDesc: "Operational project density compared with stakeholder allocation thresholds.",
      focusHoursLoaded: "Focus Blocks Scheduled",
      peakHazardQuotient: "Peak SLA Exposure Rate",
      momentumIntelTitle: "OPERATIONAL MOMENTUM ENGINE",
      momentumIntelDesc: "Dynamic tracking of business delivery velocity, resource utilization rates, and milestone accomplishments.",
      perfAnalysisTitle: "COMPLIANCE & DEPENDENCY AUDIT",
      momentumStatus: "Milestone Fulfillment Status",
      keyObservation: "Managerial Observation",
      riskAssessment: "Operational SLA Risk Assessment",
      executiveRec: "Next Operational Milestone",
      completedSecuredStat: "SLA Deliverables Secured",
      createdOverallStat: "SLA Initiatives Registered",
      completionRatioStat: "KPI Compliance Ratio",
      weeklyChangeStat: "Weekly Initiative Churn",
      chartVelocityTitle: "KPI CLEARANCE",
      chartCadenceTitle: "RESOURCE DISTRIBUTION",
      chartVelocityLabel: "Professional Objectives Resolved",
      chartCadenceLabel: "Operational Hours Mapped"
    },
    strategicLabels: {
      headerTitle: "Professional Initiative Matrix",
      headerSubtitle: "Prune operational overhead, align with key business stakeholders, and protect core delivery SLAs.",
      newTaskBtn: "ADD STRATEGIC OBJECTIVE",
      workspacePressure: "Professional Initiative pressure",
      workspaceHealth: "Milestone Fulfillment Score",
      tasksImproved: "Deliverables Resolved",
      engineTag: "EXECUTIVE INTEL MODULE RUNNING",
      statusLabel: "SLA COMPLIANCE STATUS",
      aiBriefHeader: "Executive Summary",
      whyHeader: "Operational Reasoning",
      benefitsHeader: "SLA Risk Mitigation",
      considerationsHeader: "Business Tradeoffs",
      nextActionHeader: "Next Operational Step"
    },
    recoveryLabels: {
      headerTitle: "SLA Compliance & Recovery console",
      activeProtocol: "OPERATIONAL WORKAROUND DEPLOYED",
      description: "Activate immediate business contingency strategies and realign resource channels to protect delivery metrics.",
      queueTitle: "CRITICAL OVERDUE INITIATIVES",
      queueDesc: "Strategic goals currently tracking behind nominal stakeholder commitments.",
      deescalationTitle: "KPI RECOVERY FRAMEWORK",
      deescalationDesc: "Dynamic stakeholder communication, deferrals, or resource leveling to repair business confidence.",
      deployButton: "DEPLOY PROFESSIONAL CONTINGENCY",
      loadingDeploy: "GENERATING CONTINGENCY MEMO...",
      blueprintTitle: "OPERATIONAL SECURITY SCHEMATIC",
      lockLabel: "SLA Recovery Interlock Active",
      activeNominal: "Business Pipeline Active & Nominal",
      nominalDesc: "All professional initiatives are currently tracking safely inside agreed stakeholder SLAs.",
      extensionTitle: "SLA Extension Boundary",
      defenseTitle: "Pre-emptive SLA Safeguard",
      resourceTitle: "Operational Resource Reallocation",
      scopeTitle: "Deliverable Trimming Recommendations",
      priorityTitle: "Temporary Initiative Deferrals",
      roadmapTitle: "SLA MITIGATION ROADMAP",
      recalculateButton: "RE-RUN COMPLIANCE PROTOCOLS",
      safeguardInactive: "Operational Safeguard Deactivated",
      safeguardActiveText: "Invoke 'DEPLOY SLA MITIGATION' on the active objective to run turnaround simulations.",
      safekeepingConsoleIdle: "Executive Console Idle",
      safekeepingConsoleDesc: "Select any overdue SLA milestone or pending initiative from the left to audit or trigger business turnaround actions."
    },
    taskListLabels: {
      searchPlaceholder: "Search professional initiatives, SLA deliverables, or KPIs...",
      addTaskLabel: "Add SLA Deliverable",
      analyzeBtnLabel: "Evaluate SLA",
      analyzingBtnLabel: "EVALUATING SLA RISK",
      recoveryBadge: "🛡️ Operational Recovery active",
      aiAssessmentHeader: "Executive Ops Manager Assessment:",
      analyzePromptText: "Evaluate SLA deliverable to generate operational recommendations.",
      priorityLabel: "KPI Priority",
      failRiskLabel: "Business Risk",
      riskScoreLabel: "SLA Breach Risk",
      aiRecommendationTitle: "AI Executive Ops Manager recommendation",
      aiRiskAssessmentTitle: "AI Business Risk Assessment"
    },
    taskFormLabels: {
      updateConstraints: "Update Deliverable Constraints",
      registerBlocker: "Register SLA Dependency",
      editMilestone: "Edit Professional Objective",
      registerMilestone: "Register SLA Milestone",
      milestoneTitle: "Initiative Title / KPI / Deliverable",
      milestonePlaceholder: "e.g., Deliver Board Presentation on Q2 Strategy",
      deliverablesSummary: "SLA Deliverables / Expected Outputs",
      deliverablesPlaceholder: "Define core operational metrics, milestones, or reports to align...",
      hardDeadline: "SLA Agreement / Milestone Deadline",
      effortHours: "Operational Hours Mapped",
      workspaceCategory: "Professional Workspace Epic",
      importanceLevel: "KPI Priority Tier",
      deployButton: "DEPLOY STRATEGIC OBJECTIVE",
      saveButton: "SAVE OBJECTIVE CHANGES"
    },
    narrativeTemplates: {
      optimal: "Operational Bandwidth is tracking within nominal executive tolerances. Your portfolio of active objectives requires {totalEffort} hours of focused execution, aligning perfectly with KPI delivery timelines. Maintain stable operational rhythms.",
      warning: "KPI Delivery Risk Alert: Operational roadblocks are threatening SLA timelines. {remainingCount} strategic milestones are tracking behind schedule, reducing overall delivery confidence to {successProbability}%. Align stakeholders to resolve active blockers.",
      overloaded: "Critical Operational Overload: Milestone density of {totalEffort} hours has saturated organization capacity, threatening SLA breach. Highly compressed timelines require immediate resource reallocation. Defer non-critical objectives.",
      empty: "No operational objectives or strategic milestones are registered. Populate the backlog to initialize executive intelligence telemetry."
    }
  }
};
