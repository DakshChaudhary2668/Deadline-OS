const fs = require('fs');
let code = fs.readFileSync('src/utils/modeLanguage.ts', 'utf8');

const planningLabelsStr = {
  student: {
    headerTitle: "AI Study Planner", intelligenceCore: "Academic Intelligence Core", dailyAlignment: "Daily Study Alignment",
    weeklyAlignment: "Weekly Curriculum Alignment", forecastBrief: "Academic Advisor Brief", subtitle: "Leverages study hours, exam countdowns, and homework importance to map a personalized high-mastery revision plan.",
    dailyDesc: "Generates timed revision intervals mapped against available study hours. It slots high-difficulty concepts early while leaving buffer blocks to prevent study fatigue.",
    paramPendingLabel: "Pending Syllabus Goals:", paramEffortLabel: "Aggregate Study Hours:", dailyTimelineTab: "Study Timeline",
    weeklyScheduleTab: "Weekly Syllabus", timelineParamsLabel: "Revision Parameters", hoursUnit: "study hours", timestampLabel: "Plan Stamped:", actionTargetBadge: "Study Target", timetableInactiveHeader: "Study plan inactive", timetableInactiveDesc: "Run the temporal intelligence analyzer to schedule study blocks across outstanding syllabus goals.",
    systemsChecklist: "Study Checklist", burnoutLabel: "Study fatigue mapping", resourceDispersal: "Balanced syllabus dispersal",
    weeklyPlanInactiveHeader: "Weekly plan inactive", weeklyPlanInactiveDesc: "Run the weekly planner to map revision weights across outstanding study targets.",
    weeklyPlanDesc: "Assembles a high-level academic syllabus roadmap for the week, dividing course topics into manageable day blocks to eliminate exam pressure.",
    balanceEngineText: "Balancing exam preparation weights", strategicSectorLabel: "Study Domain", coreObjectiveLabel: "Course Goal:", allocatedActionsLabel: "Assigned Milestones", weeklyAlignmentCompleted: "Weekly alignment: Completed",
    trueLabel: "True"
  },
  developer: {
    headerTitle: "AI Sprint Planner", intelligenceCore: "Sprint Intelligence Core", dailyAlignment: "Daily Sprint Alignment",
    weeklyAlignment: "Weekly Sprint Roadmap", forecastBrief: "Senior Staff Engineer Brief", subtitle: "Leverages sprint capacity, technical debt blockers, and PR priorities to schedule balanced developer workflows.",
    dailyDesc: "Generates timed sprint focus blocks mapped against available coding bandwidth. It slots core ship objectives early while leaving buffer sectors to manage incident responses.",
    paramPendingLabel: "Active Sprint Tickets:", paramEffortLabel: "Sprint Bandwidth Needed:", dailyTimelineTab: "Sprint Timeline",
    weeklyScheduleTab: "Weekly Roadmap", timelineParamsLabel: "Sprint Parameters", hoursUnit: "story hours", timestampLabel: "Deploy Stamped:", actionTargetBadge: "Deploy Target", timetableInactiveHeader: "Sprint plan inactive", timetableInactiveDesc: "Run the temporal intelligence analyzer to schedule sprint blocks across outstanding tickets.",
    systemsChecklist: "CI/CD Checklist", burnoutLabel: "Developer fatigue mapping", resourceDispersal: "Balanced repository dispersal",
    weeklyPlanInactiveHeader: "Weekly plan inactive", weeklyPlanInactiveDesc: "Run the weekly planner to map capacity weights across outstanding sprint tickets.",
    weeklyPlanDesc: "Assembles a high-level technical sprint roadmap for the week, dividing epic requirements into manageable deployment blocks.",
    balanceEngineText: "Balancing repository deployment weights", strategicSectorLabel: "Repository Scope", coreObjectiveLabel: "PR Goal:", allocatedActionsLabel: "Assigned Tickets", weeklyAlignmentCompleted: "Weekly alignment: Completed",
    trueLabel: "True"
  },
  job_seeker: {
    headerTitle: "AI Career Planner", intelligenceCore: "Career Intelligence Core", dailyAlignment: "Daily Application Alignment",
    weeklyAlignment: "Weekly Outreach Alignment", forecastBrief: "AI Career Coach Brief", subtitle: "Leverages prep hours, interview countdowns, and networking importance to map a personalized high-conversion outreach plan.",
    dailyDesc: "Generates timed networking intervals mapped against available prep hours. It slots high-impact interviews early while leaving buffer blocks to prevent fatigue.",
    paramPendingLabel: "Pending Applications:", paramEffortLabel: "Aggregate Prep Hours:", dailyTimelineTab: "Outreach Timeline",
    weeklyScheduleTab: "Weekly Pipeline", timelineParamsLabel: "Pipeline Parameters", hoursUnit: "prep hours", timestampLabel: "Pipeline Stamped:", actionTargetBadge: "Career Target", timetableInactiveHeader: "Outreach plan inactive", timetableInactiveDesc: "Run the temporal intelligence analyzer to schedule outreach blocks across outstanding applications.",
    systemsChecklist: "Pipeline Checklist", burnoutLabel: "Outreach fatigue mapping", resourceDispersal: "Balanced network dispersal",
    weeklyPlanInactiveHeader: "Weekly plan inactive", weeklyPlanInactiveDesc: "Run the weekly planner to map outreach weights across outstanding applications.",
    weeklyPlanDesc: "Assembles a high-level career growth roadmap for the week, dividing networking tasks into manageable day blocks to eliminate job search pressure.",
    balanceEngineText: "Balancing interview preparation weights", strategicSectorLabel: "Career Pathway", coreObjectiveLabel: "Outreach Goal:", allocatedActionsLabel: "Assigned Actions", weeklyAlignmentCompleted: "Weekly alignment: Completed",
    trueLabel: "True"
  },
  professional: {
    headerTitle: "Temporal Planner", intelligenceCore: "Temporal Intelligence Core", dailyAlignment: "Daily Temporal Alignment",
    weeklyAlignment: "Weekly Strategic Alignment", forecastBrief: "Chief of Staff Brief", subtitle: "Leverages task efforts, SLA priorities, and deadline countdown metrics to outline customized balanced timetables.",
    dailyDesc: "Generates timed focus blocks mapped against available hours. It slots high-cognitive objectives early while leaving buffer sectors to manage incident responses.",
    paramPendingLabel: "Pending Goals:", paramEffortLabel: "Aggregate Effort Hours:", dailyTimelineTab: "Daily Timeline",
    weeklyScheduleTab: "Weekly Schedule", timelineParamsLabel: "Timeline Parameters", hoursUnit: "hours", timestampLabel: "Generated Timestamp:", actionTargetBadge: "Action Target", timetableInactiveHeader: "Timetable inactive", timetableInactiveDesc: "Run the temporal intelligence analyzer to schedule focus blocks across outstanding milestones.",
    systemsChecklist: "Systems Checklist", burnoutLabel: "Burnout threshold mapping", resourceDispersal: "Balanced resource dispersal",
    weeklyPlanInactiveHeader: "Weekly plan inactive", weeklyPlanInactiveDesc: "Run the weekly planner to map focus weights across outstanding milestones.",
    weeklyPlanDesc: "Assembles a high-level strategic canvas for the week, allocating specific workspace modules to designated days. Prevents burnout while guaranteeing target accomplishment.",
    balanceEngineText: "Running calendar balance engines", strategicSectorLabel: "Strategic Sector", coreObjectiveLabel: "Core Objective:", allocatedActionsLabel: "Allocated Actions", weeklyAlignmentCompleted: "Weekly alignment: Completed",
    trueLabel: "True"
  }
};

const profiles = ['student', 'developer', 'job_seeker', 'professional'];

for (const profile of profiles) {
  const profileRegex = new RegExp(`export const ${profile}Config: ModeLanguageConfig = \\{([\\s\\S]*?)(^\\};)`, 'm');
  code = code.replace(profileRegex, (match, p1, p2) => {
    return `export const ${profile}Config: ModeLanguageConfig = {${p1}  planningLabels: ${JSON.stringify(planningLabelsStr[profile])},\n${p2}`;
  });
}

// Add type to ModeLanguageConfig
code = code.replace('  simulatorLabels?: any;', '  simulatorLabels?: any;\n  planningLabels?: any;');

fs.writeFileSync('src/utils/modeLanguage.ts', code);
console.log('Added planningLabels to modeLanguage.ts');
