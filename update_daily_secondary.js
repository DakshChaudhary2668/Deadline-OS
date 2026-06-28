import fs from 'fs';
import path from 'path';

const dbUpdates = {
  student: {
    bandwidthLabel: 'Course Progress',
    unitPlural: 'Milestones',
    unitLower: 'assignments',
    chartAdded: 'Milestones Added',
    chartCompleted: 'Milestones Completed',
    taskSingularLower: 'milestone',
    hoursLabel: 'study hours'
  },
  developer: {
    bandwidthLabel: 'Velocity',
    unitPlural: 'Tickets',
    unitLower: 'sprint deliverables',
    chartAdded: 'Tickets Created',
    chartCompleted: 'Tickets Closed',
    taskSingularLower: 'ticket',
    hoursLabel: 'cognitive hours'
  },
  job_seeker: {
    bandwidthLabel: 'Career Readiness',
    unitPlural: 'Applications',
    unitLower: 'job leads',
    chartAdded: 'Applications Opened',
    chartCompleted: 'Applications Secured',
    taskSingularLower: 'application',
    hoursLabel: 'preparation hours'
  },
  professional: {
    bandwidthLabel: 'Operational Bandwidth',
    unitPlural: 'Objectives',
    unitLower: 'milestones',
    chartAdded: 'Objectives Logged',
    chartCompleted: 'Objectives Delivered',
    taskSingularLower: 'objective',
    hoursLabel: 'cognitive hours'
  }
};

const fp = path.join(process.cwd(), 'src/utils/modeLanguage.ts');
let code = fs.readFileSync(fp, 'utf8');

for (const role in dbUpdates) {
  const d = dbUpdates[role];
  const replaceStr = `    dailySecondary: {
        bandwidthLabel: '${d.bandwidthLabel}',
        unitPlural: '${d.unitPlural}',
        unitLower: '${d.unitLower}',
        chartAdded: '${d.chartAdded}',
        chartCompleted: '${d.chartCompleted}',
        taskSingularLower: '${d.taskSingularLower}',
        hoursLabel: '${d.hoursLabel}',`;
  const regex = new RegExp(`(${role}: \\{[\\s\\S]*?dailySecondary: \\{)`);
  code = code.replace(regex, `$1\n        bandwidthLabel: '${d.bandwidthLabel}',\n        unitPlural: '${d.unitPlural}',\n        unitLower: '${d.unitLower}',\n        chartAdded: '${d.chartAdded}',\n        chartCompleted: '${d.chartCompleted}',\n        taskSingularLower: '${d.taskSingularLower}',\n        hoursLabel: '${d.hoursLabel}',`);
}

fs.writeFileSync(fp, code);
console.log('dailySecondary updated');
