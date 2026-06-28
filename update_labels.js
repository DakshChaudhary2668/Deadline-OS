import fs from 'fs';
import path from 'path';

// Define the data to inject
const dynamicData = {
  student: {
    dailySecondary: {
      statusAccelerating: 'HIGH WORK ETHIC',
      statusStable: 'STABLE PROGRESS',
      statusDeclining: 'ACADEMIC FATIGUE',
      statusOverloaded: 'ACADEMIC CRUSH',
      activeNarrativeSummary: 'AI STUDY ADVISOR // NARRATIVE SUMMARY',
      narrativeLoading: 'Analyzing academic syllabus metrics and formulating study insight...',
      nominalRiskLabel: 'SAFE',
      thresholdTargetLabel: 'EXAM GAP TARGET',
      activeProbabilityMatrix: 'ACTIVE SYLLABUS RISK ANALYSIS MODEL',
      noThreatHeader: 'No Urgent Study Milestone Threats Detected',
      noThreatReasoning: 'All revision intervals and assignment deadlines are safely structured relative to estimated study hours.',
      noThreatMitigation: 'Maintain current study pacing. Allocate secondary focus blocks prior to exam gates.',
      awaitingScansText: 'Awaiting study alignment scans. Please trigger recalibration.',
      awaitingVisualsText: 'Regenerating curriculum visual streams...',
      awaitingHistoryText: 'Awaiting curriculum study telemetry.',
      noPendingTasksText: 'No active pending study topics registered.',
      resolvedUnitsLabel: 'Milestones'
    },
    taskListDynamic: {
      catWork: '🏫 Curriculum',
      catStudy: '📚 Study Blocks',
      catCareer: '🎖️ Academic Growth',
      catPersonal: '👤 Personal Tasks',
      tabAll: 'All Milestones',
      tabPending: 'Active Study',
      tabOverdue: 'Overdue Gates',
      tabCompleted: 'Completed Topics',
      allCategories: 'All Syllabus Categories'
    },
    planningDynamic: {
      compilingTimeline: 'COMPILING REVISION TIMELINE...',
      compilingRoadmap: 'COMPILING REVISION ROADMAP...',
      scanningFocus: 'Scanning study intervals...',
      precisionSla: 'Generating high precision syllabus slots',
      plottingMilestones: 'Plotting study milestones...',
      timelineTitle: '24h Syllabus Timetable',
      precisionBuffer: 'Precision study buffers',
      weeklyRoadmap: 'WEEKLY SYLLABUS ROADMAP',
      balancedAllocation: 'Balanced Revision Allocation'
    },
    recoveryDynamic: {
      nominalStatus: '⚠️ Study Deficit',
      nominalOverdue: '🛑 Lapsed Gate',
      planLoaded: 'Curriculum Plan Loaded',
      laborEffort: 'Study Hours',
      turnaroundMission: 'SYLLABUS GAP ALIGNMENT PLAN',
      selectPending: '-- Select Study Milestone --'
    },
    strategicDynamic: {
      awaitingIntel: 'Awaiting strategic alignment scans. Please trigger AI evaluation.',
      noIntel: 'No active strategic intelligence reports detected.',
      decisionHeader: 'ACADEMIC DECISION MATRIX',
      categoryInsights: 'Syllabus Insights',
      priorityFocus: 'Primary Revision Focus',
      strategicMetrics: 'Academic Metrics'
    }
  },
  developer: {
    dailySecondary: {
      statusAccelerating: 'ACCELERATING VELOCITY',
      statusStable: 'STEADY VELOCITY',
      statusDeclining: 'BURNOUT IMMINENT',
      statusOverloaded: 'SPRINT BOTTLENECK',
      activeNarrativeSummary: 'AI STAFF ASSISTANT // NARRATIVE SUMMARY',
      narrativeLoading: 'Analyzing developer tickets and formulating sprint insight...',
      nominalRiskLabel: 'NOMINAL',
      thresholdTargetLabel: 'SPRINT SLA TARGET',
      activeProbabilityMatrix: 'ACTIVE SPRINT INTEGRATION ANALYSIS',
      noThreatHeader: 'No Urgent Sprint Delivery Blockers Detected',
      noThreatReasoning: 'All sprint tickets and codebase releases are safely structured relative to available developer capacity.',
      noThreatMitigation: 'Maintain current developer sprint velocity. Allocate secondary buffers for technical debt.',
      awaitingScansText: 'Awaiting developer sprint scans. Please trigger recalibration.',
      awaitingVisualsText: 'Regenerating repository visual streams...',
      awaitingHistoryText: 'Awaiting sprint commit telemetry.',
      noPendingTasksText: 'No active pending sprint tickets registered.',
      resolvedUnitsLabel: 'Tickets'
    },
    taskListDynamic: {
      catWork: '💻 Sprint Tickets',
      catStudy: '📚 Tech Debt / Refactoring',
      catCareer: '🎖️ Professional Skillup',
      catPersonal: '👤 Individual Tasks',
      tabAll: 'All Tickets',
      tabPending: 'Open Issues',
      tabOverdue: 'Missed Sprints',
      tabCompleted: 'Closed/Merged',
      allCategories: 'All Repository Scope'
    },
    planningDynamic: {
      compilingTimeline: 'COMPILING SPRINT TIMELINE...',
      compilingRoadmap: 'COMPILING SPRINT ROADMAP...',
      scanningFocus: 'Scanning sprint focus blocks...',
      precisionSla: 'Generating high precision sprint slots',
      plottingMilestones: 'Plotting sprint tickets...',
      timelineTitle: '24h Sprint Timetable',
      precisionBuffer: 'Precision incident buffers',
      weeklyRoadmap: 'WEEKLY SPRINT ROADMAP',
      balancedAllocation: 'Balanced Capacity Allocation'
    },
    recoveryDynamic: {
      nominalStatus: '⚠️ Velocity At Risk',
      nominalOverdue: '🛑 Blocked Ticket',
      planLoaded: 'Sprint Blueprint Loaded',
      laborEffort: 'Developer Hours',
      turnaroundMission: 'SPRINT VELOCITY RECOVERY ROADMAP',
      selectPending: '-- Select Sprint Ticket --'
    },
    strategicDynamic: {
      awaitingIntel: 'Awaiting sprint alignment scans. Please trigger AI evaluation.',
      noIntel: 'No active sprint insights or technical reports detected.',
      decisionHeader: 'TECHNICAL DECISION MATRIX',
      categoryInsights: 'Repository Insights',
      priorityFocus: 'Primary Engineering Focus',
      strategicMetrics: 'Velocity Metrics'
    }
  },
  job_seeker: {
    dailySecondary: {
      statusAccelerating: 'INTENSE OUTREACH',
      statusStable: 'CONSISTENT COHORT',
      statusDeclining: 'MOMENTUM COMPRESSION',
      statusOverloaded: 'COGNITIVE OVERLOAD',
      activeNarrativeSummary: 'AI CAREER COACH // NARRATIVE SUMMARY',
      narrativeLoading: 'Analyzing pipeline progress and formulating outreach insight...',
      nominalRiskLabel: 'PENDING',
      thresholdTargetLabel: 'APPLICATION DEADLINE TARGET',
      activeProbabilityMatrix: 'ACTIVE OPPORTUNITY PIPELINE ANALYSIS',
      noThreatHeader: 'No Urgent Pipeline Attrition Detected',
      noThreatReasoning: 'All interviews and application follow-ups are safely structured relative to preparation capacity.',
      noThreatMitigation: 'Maintain current application velocity. Allocate secondary buffers for interview prep.',
      awaitingScansText: 'Awaiting career alignment scans. Please trigger recalibration.',
      awaitingVisualsText: 'Regenerating pipeline visual streams...',
      awaitingHistoryText: 'Awaiting outreach metrics telemetry.',
      noPendingTasksText: 'No active pending career opportunities registered.',
      resolvedUnitsLabel: 'Offers/Leads'
    },
    taskListDynamic: {
      catWork: '💼 Job Applications',
      catStudy: '📚 Interview Prep',
      catCareer: '🎖️ Networking Outreaches',
      catPersonal: '👤 Personal Routine',
      tabAll: 'All Pipeline',
      tabPending: 'Active Loops',
      tabOverdue: 'Missed Followups',
      tabCompleted: 'Offers Secured',
      allCategories: 'All Pipeline Goals'
    },
    planningDynamic: {
      compilingTimeline: 'COMPILING CAREER AGENDA...',
      compilingRoadmap: 'COMPILING GROWTH ROADMAP...',
      scanningFocus: 'Scanning outreach intervals...',
      precisionSla: 'Generating high precision outreach slots',
      plottingMilestones: 'Plotting outreach goals...',
      timelineTitle: '24h Career Timetable',
      precisionBuffer: 'Precision follow-up buffers',
      weeklyRoadmap: 'WEEKLY CAREER TILES',
      balancedAllocation: 'Balanced Growth Allocation'
    },
    recoveryDynamic: {
      nominalStatus: '⚠️ Pipeline Stall',
      nominalOverdue: '🛑 Deadline Missed',
      planLoaded: 'Pipeline Rescue Plan Loaded',
      laborEffort: 'Prep Hours',
      turnaroundMission: 'OPPORTUNITY CONVERSION BLUEPRINT',
      selectPending: '-- Select Application Goal --'
    },
    strategicDynamic: {
      awaitingIntel: 'Awaiting career alignment scans. Please trigger AI evaluation.',
      noIntel: 'No active pipeline insights or conversion reports detected.',
      decisionHeader: 'CAREER DECISION MATRIX',
      categoryInsights: 'Pipeline Insights',
      priorityFocus: 'Primary Outreach Focus',
      strategicMetrics: 'Conversion Metrics'
    }
  },
  professional: {
    dailySecondary: {
      statusAccelerating: 'ACCELERATING CADENCE',
      statusStable: 'STABLE OPERATIONS',
      statusDeclining: 'VELOCITY COMPRESSION',
      statusOverloaded: 'CRITICAL CONGESTION',
      activeNarrativeSummary: 'AI CHIEF OF STAFF // NARRATIVE SUMMARY',
      narrativeLoading: 'Analyzing system metrics and formulating narrative insight...',
      nominalRiskLabel: 'NOMINAL',
      thresholdTargetLabel: 'THRESHOLD TARGET',
      activeProbabilityMatrix: 'ACTIVE PROBABILITY ASSESSMENT MATRIX',
      noThreatHeader: 'No Urgent Scheduling Threat Detected',
      noThreatReasoning: 'All task deadlines are safely structured relative to estimated cognitive hours.',
      noThreatMitigation: 'Maintain current delivery rate. Allocate secondary buffers where available.',
      awaitingScansText: 'Awaiting executive alignment scans. Please trigger recalibration.',
      awaitingVisualsText: 'Regenerating dynamic visual streams...',
      awaitingHistoryText: 'Awaiting historic metrics telemetry.',
      noPendingTasksText: 'No active pending strategic milestones registered.',
      resolvedUnitsLabel: 'Units'
    },
    taskListDynamic: {
      catWork: '💼 Operations',
      catStudy: '📚 Skill Acquisition',
      catCareer: '🎖️ Strategic Career',
      catPersonal: '👤 Personal Habits',
      tabAll: 'All Deliverables',
      tabPending: 'Pending Actions',
      tabOverdue: 'SLA Overdue',
      tabCompleted: 'Done/Archived',
      allCategories: 'All Operational Domains'
    },
    planningDynamic: {
      compilingTimeline: 'COMPILING TIMELINE...',
      compilingRoadmap: 'COMPILING ROADMAP...',
      scanningFocus: 'Scanning focus blocks...',
      precisionSla: 'Generating high precision SLA timetable slots',
      plottingMilestones: 'Plotting weekly milestones...',
      timelineTitle: '24h Task Timetable',
      precisionBuffer: 'Precision SLA buffers',
      weeklyRoadmap: 'WEEKLY MILESTONE TILES',
      balancedAllocation: 'Balanced Resource Allocation'
    },
    recoveryDynamic: {
      nominalStatus: '⚠️ SLA Breach Risk',
      nominalOverdue: '🛑 Overdue SLA',
      planLoaded: 'Action Plan Loaded',
      laborEffort: 'Operational Hours',
      turnaroundMission: 'CRITICAL ESCALATION ALIGNMENT',
      selectPending: '-- Select Escalated Objective --'
    },
    strategicDynamic: {
      awaitingIntel: 'Awaiting executive alignment scans. Please trigger AI evaluation.',
      noIntel: 'No active strategic intelligence reports detected.',
      decisionHeader: 'EXECUTIVE DECISION MATRIX',
      categoryInsights: 'Operational Insights',
      priorityFocus: 'Primary Strategic Focus',
      strategicMetrics: 'Performance Metrics'
    }
  }
};

const modeLangPath = path.join(process.cwd(), 'src/utils/modeLanguage.ts');
let code = fs.readFileSync(modeLangPath, 'utf8');

for (const role in dynamicData) {
  const replacementString = `    dailySecondary: ${JSON.stringify(dynamicData[role].dailySecondary, null, 4).replace(/\\n/g, '\\n')},
    taskListDynamic: ${JSON.stringify(dynamicData[role].taskListDynamic, null, 4).replace(/\\n/g, '\\n')},
    planningDynamic: ${JSON.stringify(dynamicData[role].planningDynamic, null, 4).replace(/\\n/g, '\\n')},
    recoveryDynamic: ${JSON.stringify(dynamicData[role].recoveryDynamic, null, 4).replace(/\\n/g, '\\n')},
    strategicDynamic: ${JSON.stringify(dynamicData[role].strategicDynamic, null, 4).replace(/\\n/g, '\\n')},
`;

  // Find the role block in the code
  const roleRegex = new RegExp(`(${role}:\\s*{[\\s\\S]*?)(sidebarLabels:)`, 'g');
  code = code.replace(roleRegex, `$1${replacementString}\n    $2`);
}

fs.writeFileSync(modeLangPath, code);
console.log('Successfully updated modeLanguage.ts');
