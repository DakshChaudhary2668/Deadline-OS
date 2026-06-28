export interface ModeLanguageConfig {
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
  };
  dailyBriefingLabels: {
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
    title: 'Academic Mode',
    subtitle: "Today's Revision Plan",
    systemRole: 'Academic Advisor',
    tone: 'supportive, structured, academic, and encouraging',
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
    promptInstructions: 'You are an AI Academic Advisor. Respond using supportive, structured, academic, and encouraging language. Focus on syllabus coverage, study pacing, revision plans, exam readiness, and academic performance. Never use corporate, engineering, or executive jargon (like stakeholder, sprint, velocity, ROI, execution pipeline, deployment, etc.). Always replace generic terms like "task" or "productivity" with context-aware academic vocabulary such as "Revision Topic", "Syllabus Milestone", "Study Block", or "Academic Goal". Example style: "Complete Unit 4 revision today to stay on track for Friday\'s exam. Plan focused revision blocks to maximize your exam readiness."',
    
    sidebarLabels: {
      briefing: "Study Brief",
      tasks: "Syllabus Matrix",
      strategic: "Syllabus Strategy",
      plans: "Study Planner",
      recovery: "Syllabus Recovery",
      simulator: "Grade Simulator"
    },
    dailyBriefingLabels: {
      morningBriefing: "Syllabus Assessment",
      morningBriefingDesc: "Real-time audit of grade threats, exam deadlines, and conceptual bottlenecks.",
      recalibrateButton: "RECALIBRATE ACADEMIC RUNWAY",
      failureForecast: "Academic Risk Forecast",
      failureProbability: "Exam Failure Risk",
      systemCalibrated: "STUDY ENGINE CALIBRATED",
      highestRiskObjective: "HIGHEST RISK LESSON",
      criticalRiskReasoning: "CRITICAL SYLLABUS APPREHENSION",
      aiMitigationStrategy: "REVISED REVISION PATHWAY",
      strategicIntelTitle: "ACADEMIC STRATEGY HUB",
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
      recommendationsTitle: "ACADEMIC ADVISOR RECOMMENDATIONS",
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
      headerSubtitle: "Deconstruct your academic roadmap into active study priorities and master low-retention topics.",
      newTaskBtn: "REGISTER SYLLABUS GOAL",
      workspacePressure: "Syllabus Load pressure",
      workspaceHealth: "Curriculum Health",
      tasksImproved: "Subjects Secured",
      engineTag: "ACADEMIC INTELLIGENCE ENGINE ACTIVE",
      statusLabel: "REVISION PRIORITY",
      aiBriefHeader: "Academic Diagnostic",
      whyHeader: "Why?",
      benefitsHeader: "Comprehension Boost",
      considerationsHeader: "Academic Tradeoffs",
      nextActionHeader: "Next Revision Action"
    },
    recoveryLabels: {
      headerTitle: "Syllabus Emergency recovery console",
      activeProtocol: "CURRICULUM DESCALATION PROTOCOL ACTIVE",
      description: "Trigger turnaround study routines when critical subjects or exams are severely compromised.",
      queueTitle: "CRITICAL SYLLABUS QUEUE",
      queueDesc: "Syllabus topics currently tracking behind nominal retention goals.",
      deescalationTitle: "REVISION CORRECTION BLUEPRINT",
      deescalationDesc: "Dynamic academic de-escalation framework to salvage compromised subjects.",
      deployButton: "DEPLOY ACADEMIC SAFETY BUFFER",
      loadingDeploy: "OPTIMIZING STUDY ROUTINE...",
      blueprintTitle: "COGNITIVE RECONSTRUCTION BLUEPRINT",
      lockLabel: "Syllabus Emergency Lockout Active",
      activeNominal: "Academic Runway Active & Nominal",
      nominalDesc: "All exams and assignments are currently tracking within safe preparation margins.",
      extensionTitle: "Syllabus Extension Boundary",
      defenseTitle: "Pre-emptive Study Defense Routine",
      resourceTitle: "Subject & Concept Reallocation",
      scopeTitle: "Curriculum Trimming Recommendations",
      priorityTitle: "Temporary Sub-Topic Deferrals",
      roadmapTitle: "ACADEMIC ACTION ROADMAP",
      recalculateButton: "RE-CALCULATE SYLLABUS RECONSTRUCTION",
      safeguardInactive: "Academic Safeguard Deactivated",
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
      aiAssessmentHeader: "Academic Advisor Diagnostic:",
      analyzePromptText: "Run Diagnostic to assess exam readiness and syllabus priority.",
      priorityLabel: "Exam Readiness",
      failRiskLabel: "Syllabus Risk",
      riskScoreLabel: "Syllabus Risk Score",
      aiRecommendationTitle: "AI Academic Advisor recommendation",
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
      workspaceCategory: "Academic Subject Category",
      importanceLevel: "Grade Weighting",
      deployButton: "DEPLOY REVISION TARGET",
      saveButton: "SAVE ACADEMIC CHANGES"
    },
    narrativeTemplates: {
      optimal: "Your current Course Progress is accelerating nicely. With {totalEffort} hours of revision mapped against your exam runways, your mental capacity remains optimal. Focus on consolidating concepts to secure your syllabus milestones.",
      warning: "Urgent Course Progress warning: Your study runway is experiencing scheduling threats. {remainingCount} revision topics are currently at risk, with exam success probability tracking at {successProbability}%. Immediate conceptual de-escalation is required to prevent grade slippage.",
      overloaded: "Critical Syllabus Overload: Cognitive demand has exceeded available learning capacity. Your current revision load of {totalEffort} hours threatens to trigger retention degradation. We recommend postponing non-critical study blocks to safeguard core exam readiness.",
      empty: "Your revision runway is completely pristine. No active study goals or exam milestones are registered. Map a new syllabus topic to begin active recall tracking."
    }
  },
  developer: {
    title: 'Engineering Mode',
    subtitle: 'Sprint Brief',
    systemRole: 'Senior Staff Engineer',
    tone: 'technical, concise, engineering-focused, authoritative',
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
    
    sidebarLabels: {
      briefing: "Sprint Brief",
      tasks: "Sprint Backlog",
      strategic: "Sprint Decisions",
      plans: "Sprint Roadmap",
      recovery: "Incident Recovery",
      simulator: "Sprint Simulator"
    },
    dailyBriefingLabels: {
      morningBriefing: "Sprint Performance Audit",
      morningBriefingDesc: "Real-time analysis of build blockages, delivery timelines, and technical debt indicators.",
      recalibrateButton: "RECALIBRATE SPRINT RUNWAY",
      failureForecast: "SLA Failure Risk Forecast",
      failureProbability: "Delivery Slippage Probability",
      systemCalibrated: "SATELLITE COMPILER NOMINAL",
      highestRiskObjective: "CRITICAL PATH BLOCKER",
      criticalRiskReasoning: "UNRESOLVED SYSTEM DEPENDENCY",
      aiMitigationStrategy: "REALLOCATED DEPLOYMENT PATHWAY",
      strategicIntelTitle: "ENGINEERING INTEL TERMINAL",
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
      optimal: "Development Velocity is tracking optimally at a nominal cadence. Your sprint backlog requires {totalEffort} hours of engineering cycles, well within available operational bandwidth. Continue with active ticket resolution and keep regression risk low.",
      warning: "Sprint Velocity Warning: Unresolved code dependencies have introduced delivery risk. There are {remainingCount} tickets nearing critical milestones with delivery confidence down to {successProbability}%. We recommend a code freeze and focusing on blocking pull requests.",
      overloaded: "Critical Sprint Congestion: Backlog density of {totalEffort} developer hours has saturated available team capacity. Cognitive overload threatens system stability. Postpone non-essential refactoring to unblock core feature delivery.",
      empty: "Your active sprint backlog is empty. No features or tech debt items are currently tracking in the queue. Register a new sprint ticket to initialize velocity tracking."
    }
  },
  job_seeker: {
    title: 'Careers Mode',
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
    
    sidebarLabels: {
      briefing: "Career Brief",
      tasks: "Application Registry",
      strategic: "Career Strategy",
      plans: "Career Planner",
      recovery: "Milestone Recovery",
      simulator: "Placement Simulator"
    },
    dailyBriefingLabels: {
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
    title: 'Corporate Mode',
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
      noTasks: 'No corporate objectives recorded',
      adjustFilters: 'Adjust filters or add a new strategic project, stakeholder presentation, or milestone.'
    },
    promptInstructions: 'You are an Executive Ops Manager. Respond using concise, highly polished, confident, and direct executive communication. Focus on stakeholder alignment, target execution delivery, key metrics (KPIs), resource coordination, operational dependencies, and risk management. Sound like an experienced engineering or product manager speaking to executives. Always replace generic terms like "task" or "productivity" with executive vocabulary such as "Operational Objective", "SLA Deliverable", "Strategic Milestone", or "Key Performance Target". Example style: "Align with key stakeholders to unblock the milestone delivery. Reschedule non-essential discussions to safeguard the core project schedule."',
    
    sidebarLabels: {
      briefing: "Executive Brief",
      tasks: "SLA Initiative Matrix",
      strategic: "Executive Decisions",
      plans: "Execution Roadmap",
      recovery: "SLA Recovery Hub",
      simulator: "Decision Simulator"
    },
    dailyBriefingLabels: {
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
      chartVelocityLabel: "Corporate Objectives Resolved",
      chartCadenceLabel: "Operational Hours Mapped"
    },
    strategicLabels: {
      headerTitle: "Corporate Initiative Matrix",
      headerSubtitle: "Prune operational overhead, align with key business stakeholders, and protect core delivery SLAs.",
      newTaskBtn: "ADD STRATEGIC OBJECTIVE",
      workspacePressure: "Corporate Initiative pressure",
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
      deployButton: "DEPLOY CORPORATE CONTINGENCY",
      loadingDeploy: "GENERATING CONTINGENCY MEMO...",
      blueprintTitle: "OPERATIONAL SECURITY SCHEMATIC",
      lockLabel: "SLA Recovery Interlock Active",
      activeNominal: "Business Pipeline Active & Nominal",
      nominalDesc: "All corporate initiatives are currently tracking safely inside agreed stakeholder SLAs.",
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
      searchPlaceholder: "Search corporate initiatives, SLA deliverables, or KPIs...",
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
      editMilestone: "Edit Corporate Objective",
      registerMilestone: "Register SLA Milestone",
      milestoneTitle: "Initiative Title / KPI / Deliverable",
      milestonePlaceholder: "e.g., Deliver Board Presentation on Q2 Strategy",
      deliverablesSummary: "SLA Deliverables / Expected Outputs",
      deliverablesPlaceholder: "Define core operational metrics, milestones, or reports to align...",
      hardDeadline: "SLA Agreement / Milestone Deadline",
      effortHours: "Operational Hours Mapped",
      workspaceCategory: "Corporate Workspace Epic",
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
