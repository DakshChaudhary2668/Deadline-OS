import fs from 'fs';
import path from 'path';

const fp = path.join(process.cwd(), 'src/utils/modeLanguage.ts');
let code = fs.readFileSync(fp, 'utf8');

const updates = {
  student: { focusLabel: 'Study Hours', riskLabel: 'Failure Risk %' },
  developer: { focusLabel: 'Sprint Hours', riskLabel: 'Slippage Risk %' },
  job_seeker: { focusLabel: 'Prep Hours', riskLabel: 'Rejection Risk %' },
  professional: { focusLabel: 'Focus Hours', riskLabel: 'SLA Risk %' },
};

for (const role in updates) {
  const d = updates[role];
  code = code.replace(new RegExp(`(${role}: \\{[\\s\\S]*?dailySecondary: \\{[\\s\\S]*?hoursLabel: '[^']+',)`), `$1\n        focusLabel: '${d.focusLabel}',\n        riskLabel: '${d.riskLabel}',`);
}

fs.writeFileSync(fp, code);
console.log('done');
