import fs from 'fs';
import path from 'path';

const fp = path.join(process.cwd(), 'src/utils/modeLanguage.ts');
let code = fs.readFileSync(fp, 'utf8');

const updates = {
  student: { 
    wsPoints: [
      'Remaining study capacity',
      'Exam proximity pressure',
      'Target grade probability',
      'Syllabus conflicts',
      'Overall study balance'
    ],
    wsDesc: 'Higher values indicate a healthier and more achievable revision plan.'
  },
  developer: { 
    wsPoints: [
      'Remaining developer bandwidth',
      'Code freeze pressure',
      'PR merge probability',
      'Dependency conflicts',
      'Overall sprint balance'
    ],
    wsDesc: 'Higher values indicate a healthier and more achievable sprint execution.'
  },
  job_seeker: { 
    wsPoints: [
      'Remaining prep capacity',
      'Interview date pressure',
      'Offer conversion probability',
      'Scheduling conflicts',
      'Overall pipeline balance'
    ],
    wsDesc: 'Higher values indicate a healthier and more achievable hiring placement.'
  },
  professional: { 
    wsPoints: [
      'Remaining execution capacity',
      'Deadline pressure',
      'Task completion probability',
      'Scheduling conflicts',
      'Overall workload balance'
    ],
    wsDesc: 'Higher values indicate a healthier and more achievable execution plan.'
  }
};

for (const role in updates) {
  const d = updates[role];
  const replaceStr = `        wsDesc: '${d.wsDesc}',
        wsPoints: ${JSON.stringify(d.wsPoints)},`;
  const regex = new RegExp(`(${role}: \\{[\\s\\S]*?dailySecondary: \\{)`);
  code = code.replace(regex, `$1\n${replaceStr}`);
}

fs.writeFileSync(fp, code);
console.log('done WhatIf tooltips');
