import fs from 'fs';
import path from 'path';

function replaceSecondaryDailyLabels() {
  const fp = path.join(process.cwd(), 'src/components/DailyBriefing.tsx');
  let code = fs.readFileSync(fp, 'utf8');

  // Replace getSecondaryDailyLabels logic
  const replacement = `const getSecondaryDailyLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  return config.dailySecondary;
};`;

  code = code.replace(/const getSecondaryDailyLabels = \(role: RoleType\) => \{[\s\S]*?return config\.dailyBriefingLabels;\n\};/g, 'const getSecondaryDailyLabels = (role: RoleType) => {\n  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;\n  return config.dailySecondary;\n};\n\nconst getDailyBriefingLabels = (role: string) => {\n  const r = (role as RoleType) || \'professional\';\n  const config = MODE_LANGUAGES[r] || MODE_LANGUAGES.professional;\n  return config.dailyBriefingLabels;\n};');

  // Actually, wait, it's easier to just use regex on the exact block:
  code = code.replace(/const getSecondaryDailyLabels = \(role: RoleType\) => \{[\s\S]*?(?=const pendingTasks = tasks)/, `const getSecondaryDailyLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  return config.dailySecondary;
};

  `);
  
  fs.writeFileSync(fp, code);
}

function replaceTaskListLabels() {
  const fp = path.join(process.cwd(), 'src/components/TaskList.tsx');
  let code = fs.readFileSync(fp, 'utf8');

  code = code.replace(/const getCategoryLabel = \(cat: string\) => \{[\s\S]*?const getRiskLabelAndBadge =/g, `const getCategoryLabel = (cat: string) => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    const d = config.taskListDynamic;
    if (cat === 'Work') return d.catWork;
    if (cat === 'Study') return d.catStudy;
    if (cat === 'Career') return d.catCareer;
    return d.catPersonal;
  };

  const getRiskLabelAndBadge =`);

  code = code.replace(/const getTabLabel = \(tab: 'all' \| 'pending' \| 'overdue' \| 'completed'\) => \{[\s\S]*?const getAllCategoriesLabel =/g, `const getTabLabel = (tab: 'all' | 'pending' | 'overdue' | 'completed') => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    const d = config.taskListDynamic;
    if (tab === 'all') return d.tabAll;
    if (tab === 'pending') return d.tabPending;
    if (tab === 'overdue') return d.tabOverdue;
    return d.tabCompleted;
  };

  const getAllCategoriesLabel =`);

  code = code.replace(/const getAllCategoriesLabel = \(\) => \{[\s\S]*?const getSectionLabels =/g, `const getAllCategoriesLabel = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.taskListDynamic.allCategories;
  };

  const getSectionLabels =`);

  code = code.replace(/const getSectionLabels = \(\) => \{[\s\S]*?return \{[\s\S]*?\}\s*\}\s*;\s*const labels =/g, `const getSectionLabels = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return {
      benefits: config.strategicLabels.benefitsHeader,
      considerations: config.strategicLabels.considerationsHeader,
      why: config.strategicLabels.whyHeader,
      nextAction: config.strategicLabels.nextActionHeader
    };
  };

  const labels =`);

  fs.writeFileSync(fp, code);
}

function replacePlanningAgentLabels() {
  const fp = path.join(process.cwd(), 'src/components/PlanningAgent.tsx');
  let code = fs.readFileSync(fp, 'utf8');

  code = code.replace(/const getCompilingTimelineText = \(\) => \{[\s\S]*?const getCompilingRoadmapText/g, `const getCompilingTimelineText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.compilingTimeline;
  };

  const getCompilingRoadmapText`);

  code = code.replace(/const getCompilingRoadmapText = \(\) => \{[\s\S]*?const getScanningFocusText/g, `const getCompilingRoadmapText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.compilingRoadmap;
  };

  const getScanningFocusText`);

  code = code.replace(/const getScanningFocusText = \(\) => \{[\s\S]*?const getPrecisionSlaText/g, `const getScanningFocusText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.scanningFocus;
  };

  const getPrecisionSlaText`);

  code = code.replace(/const getPrecisionSlaText = \(\) => \{[\s\S]*?const getPlottingMilestonesText/g, `const getPrecisionSlaText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.precisionSla;
  };

  const getPlottingMilestonesText`);

  code = code.replace(/const getPlottingMilestonesText = \(\) => \{[\s\S]*?return \(/g, `const getPlottingMilestonesText = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return config.planningDynamic.plottingMilestones;
  };

  const pDyn = (MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional).planningDynamic;

  return (`);

  // Replace ternary blocks inline
  code = code.replace(/{mockRole === 'student' \? '24h Syllabus Timetable'[^}]*}/g, '{pDyn.timelineTitle}');
  code = code.replace(/{mockRole === 'student' \? 'Precision study buffers'[^}]*}/g, '{pDyn.precisionBuffer}');
  code = code.replace(/{mockRole === 'student' \? 'WEEKLY SYLLABUS ROADMAP'[^}]*}/g, '{pDyn.weeklyRoadmap}');
  code = code.replace(/{mockRole === 'student' \? 'Balanced Revision Allocation'[^}]*}/g, '{pDyn.balancedAllocation}');

  fs.writeFileSync(fp, code);
}

function replaceRecoveryHubLabels() {
  const fp = path.join(process.cwd(), 'src/components/RecoveryHub.tsx');
  let code = fs.readFileSync(fp, 'utf8');

  code = code.replace(/const getSecondaryRecoveryLabels = \(role: RoleType\) => \{[\s\S]*?interface RecoveryHubProps/g, `const getSecondaryRecoveryLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  return config.recoveryDynamic;
};

interface RecoveryHubProps`);

  fs.writeFileSync(fp, code);
}

function replaceStrategicDecisionsLabels() {
  const fp = path.join(process.cwd(), 'src/components/StrategicDecisions.tsx');
  let code = fs.readFileSync(fp, 'utf8');

  code = code.replace(/const getSecondaryStrategicLabels = \(role: RoleType\) => \{[\s\S]*?interface StrategicDecisionsProps/g, `const getSecondaryStrategicLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  return config.strategicDynamic;
};

interface StrategicDecisionsProps`);

  fs.writeFileSync(fp, code);
}

replaceSecondaryDailyLabels();
replaceTaskListLabels();
replacePlanningAgentLabels();
replaceRecoveryHubLabels();
replaceStrategicDecisionsLabels();

console.log('All components updated successfully.');
