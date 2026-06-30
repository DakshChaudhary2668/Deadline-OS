const fs = require('fs');
let code = fs.readFileSync('src/utils/modeLanguage.ts', 'utf8');

const chatLabels = {
  student: "AI Academic Coach",
  developer: "AI Engineering Lead",
  job_seeker: "AI Career Agent",
  professional: "AI Chief of Staff"
};

code = code.replace(/simulator: string;/g, 'simulator: string;\n    chat: string;');

for (const profile in chatLabels) {
  code = code.replace(
    new RegExp(`(export const ${profile}Config: ModeLanguageConfig = \\{[\\s\\S]*?sidebarLabels: \\{[\\s\\S]*?)("?simulator"?: "[^"]*")`, 'm'),
    `$1$2,\n      chat: "${chatLabels[profile]}"`
  );
}

fs.writeFileSync('src/utils/modeLanguage.ts', code);
console.log('Added chat to sidebarLabels');
