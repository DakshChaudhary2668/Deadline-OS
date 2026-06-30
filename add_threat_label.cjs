const fs = require('fs');
let code = fs.readFileSync('src/utils/modeLanguage.ts', 'utf8');

const threatLabels = {
  student: "Academic Risk",
  developer: "Blocker Risk",
  job_seeker: "Rejection Risk",
  professional: "SLA Threat"
};

for (const profile in threatLabels) {
  const regex = new RegExp(`(export const ${profile}Config: ModeLanguageConfig = \\{[\\s\\S]*?recoveryDynamic: \\{[\\s\\S]*?)("turnaroundMission": "[^"]*",)`, 'm');
  code = code.replace(regex, (match, p1, p2) => {
    return `${p1}"threatLabel": "${threatLabels[profile]}",\n    ${p2}`;
  });
}

fs.writeFileSync('src/utils/modeLanguage.ts', code);
console.log('Added threatLabel to modeLanguage.ts');
