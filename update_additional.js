import fs from 'fs';
import path from 'path';

const additionalDynamic = {
  student: { taskPlural: 'Milestones', taskSingular: 'Milestone', slaLabel: 'DEADLINE', overdueLabel: 'OVERDUE DEADLINE', slaBreachedLabel: 'Deadline Missed' },
  developer: { taskPlural: 'Tickets', taskSingular: 'Ticket', slaLabel: 'SPRINT', overdueLabel: 'OVERDUE SPRINT', slaBreachedLabel: 'Sprint Breached' },
  job_seeker: { taskPlural: 'Applications', taskSingular: 'Application', slaLabel: 'DUE DATE', overdueLabel: 'OVERDUE ACTION', slaBreachedLabel: 'Due Date Past' },
  professional: { taskPlural: 'Objectives', taskSingular: 'Objective', slaLabel: 'SLA', overdueLabel: 'OVERDUE SLA', slaBreachedLabel: 'SLA Breached' }
};

const fp = path.join(process.cwd(), 'src/utils/modeLanguage.ts');
let code = fs.readFileSync(fp, 'utf8');
for (const role in additionalDynamic) {
  const d = additionalDynamic[role];
  const replaceStr = `strategicDynamic: {
        taskPlural: '${d.taskPlural}',
        taskSingular: '${d.taskSingular}',
        slaLabel: '${d.slaLabel}',
        overdueLabel: '${d.overdueLabel}',
        slaBreachedLabel: '${d.slaBreachedLabel}',`;
  const roleRegex = new RegExp(`(strategicDynamic:\\s*{)`, 'g');
  // wait, to replace specifically in the role block, I'll just use string replacement on the block
  
  const targetStr = `${role}: {\\s*[\\s\\S]*?strategicDynamic: {`;
  code = code.replace(new RegExp(`(${role}: \\{[\\s\\S]*?strategicDynamic: \\{)`), `$1\n        taskPlural: '${d.taskPlural}',\n        taskSingular: '${d.taskSingular}',\n        slaLabel: '${d.slaLabel}',\n        overdueLabel: '${d.overdueLabel}',\n        slaBreachedLabel: '${d.slaBreachedLabel}',`);
}
fs.writeFileSync(fp, code);

const sdFp = path.join(process.cwd(), 'src/components/StrategicDecisions.tsx');
let sdCode = fs.readFileSync(sdFp, 'utf8');
sdCode = sdCode.replace(/taskPlural: role ===[\s\S]*?slaBreachedLabel: role ===[^,]+,/g, `taskPlural: config.strategicDynamic.taskPlural,
    taskSingular: config.strategicDynamic.taskSingular,
    slaLabel: config.strategicDynamic.slaLabel,
    overdueLabel: config.strategicDynamic.overdueLabel,
    slaBreachedLabel: config.strategicDynamic.slaBreachedLabel,`);
fs.writeFileSync(sdFp, sdCode);
console.log('additional replaced');
