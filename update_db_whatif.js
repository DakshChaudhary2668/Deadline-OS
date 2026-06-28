import fs from 'fs';
import path from 'path';

let fp = path.join(process.cwd(), 'src/components/DailyBriefing.tsx');
let code = fs.readFileSync(fp, 'utf8');

// Replace {mockRole === 'student' ? 'Course Progress' : ... 'Operational Bandwidth'}
code = code.replace(/{mockRole === 'student' \? 'Course Progress' : [^}]+}/g, '{secondaryLabels.bandwidthLabel}');

// Replace {mockRole === 'student' ? 'Milestones' : ... 'Objectives'}
code = code.replace(/{mockRole === 'student' \? 'Milestones' : [^}]+}/g, '{secondaryLabels.unitPlural}');

// Replace mockRole === 'student' ? 'assignments' : ...
code = code.replace(/mockRole === 'student' \? 'assignments' :\s*mockRole === 'developer' \? 'sprint deliverables' :\s*mockRole === 'job_seeker' \? 'job leads' :\s*'milestones'/g, 'secondaryLabels.unitLower');

// Replace name={mockRole === 'student' ? "Milestones Added" : ... "Objectives Logged"}
code = code.replace(/name={mockRole === 'student' \? "Milestones Added" : [^}]+}/g, 'name={secondaryLabels.chartAdded}');

// Replace name={mockRole === 'student' ? "Milestones Completed" : ... "Objectives Delivered"}
code = code.replace(/name={mockRole === 'student' \? "Milestones Completed" : [^}]+}/g, 'name={secondaryLabels.chartCompleted}');

fs.writeFileSync(fp, code);

// Now WhatIfSimulator.tsx
let fpWhat = path.join(process.cwd(), 'src/components/WhatIfSimulator.tsx');
let codeWhat = fs.readFileSync(fpWhat, 'utf8');

codeWhat = codeWhat.replace(/const getSecondaryWhatIfLabels = \(role: RoleType\) => \{[\s\S]*?(?=interface WhatIfSimulatorProps)/, `const getSecondaryWhatIfLabels = (role: RoleType) => {
  const config = MODE_LANGUAGES[role] || MODE_LANGUAGES.professional;
  return config.dailySecondary; // we can reuse dailySecondary for now since it contains the needed ones
};

`);

// Also we need to ensure getSecondaryWhatIfLabels is being used
codeWhat = codeWhat.replace(/const labels = getWhatIfLabels\(mockRole as RoleType\);/, `const labels = getWhatIfLabels(mockRole as RoleType);\n  const secondaryLabels = getSecondaryWhatIfLabels(mockRole as RoleType);`);

// Replace const taskLabel = mockRole === 'student' ? 'milestone' : ...
codeWhat = codeWhat.replace(/const taskLabel = mockRole === 'student' \? 'milestone' : [^;]+;/, `const taskLabel = secondaryLabels.taskSingularLower;`);

// Replace {mockRole === 'student' ? 'study hours' : ...}
codeWhat = codeWhat.replace(/{mockRole === 'student' \? 'study hours' : [^}]+}/g, '{secondaryLabels.hoursLabel}');

fs.writeFileSync(fpWhat, codeWhat);
console.log('components updated');
