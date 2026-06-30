const fs = require('fs');
let code = fs.readFileSync('src/utils/modeLanguage.ts', 'utf8');

const chatLabels = {
  student: "AI Academic Coach",
  developer: "AI Engineering Lead",
  job_seeker: "AI Career Agent",
  professional: "AI Chief of Staff"
};

code = code.replace(/simulator: "Grade Simulator"/g, 'simulator: "Grade Simulator",\n      chat: "' + chatLabels.student + '"');
code = code.replace(/simulator: "Sprint Simulator"/g, 'simulator: "Sprint Simulator",\n      chat: "' + chatLabels.developer + '"');
code = code.replace(/simulator: "Placement Simulator"/g, 'simulator: "Placement Simulator",\n      chat: "' + chatLabels.job_seeker + '"');
code = code.replace(/simulator: "Decision Simulator"/g, 'simulator: "Decision Simulator",\n      chat: "' + chatLabels.professional + '"');

fs.writeFileSync('src/utils/modeLanguage.ts', code);
console.log('Added chat to sidebarLabels');
