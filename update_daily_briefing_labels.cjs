const fs = require('fs');

let content = fs.readFileSync('src/utils/modeLanguage.ts', 'utf8');

function addDailyBriefingLabels(role, extraLabels) {
  let roleIndex = content.indexOf(role + ': {');
  if (roleIndex === -1) roleIndex = content.indexOf("'" + role + "': {");
  if (roleIndex === -1) roleIndex = content.indexOf('"' + role + '": {');

  if (roleIndex !== -1) {
    let targetIndex = content.indexOf('dailyBriefingLabels: {', roleIndex);
    if (targetIndex !== -1) {
      let openBraceIndex = targetIndex + 'dailyBriefingLabels: {'.length;
      const injection = `
      realTimeForecast: "${extraLabels.realTimeForecast}",
      realTimeSynthesis: "${extraLabels.realTimeSynthesis}",
      bySector: "${extraLabels.bySector}",
      `;
      content = content.slice(0, openBraceIndex) + injection + content.slice(openBraceIndex);
    }
  }
}

addDailyBriefingLabels('student', {
  realTimeForecast: 'REAL-TIME FORECAST',
  realTimeSynthesis: 'Real-Time Synthesis',
  bySector: 'BY COURSE'
});

addDailyBriefingLabels('developer', {
  realTimeForecast: 'REAL-TIME FORECAST',
  realTimeSynthesis: 'Real-Time Synthesis',
  bySector: 'BY EPIC'
});

addDailyBriefingLabels('job_seeker', {
  realTimeForecast: 'REAL-TIME FORECAST',
  realTimeSynthesis: 'Real-Time Synthesis',
  bySector: 'BY STAGE'
});

addDailyBriefingLabels('professional', {
  realTimeForecast: 'REAL-TIME FORECAST',
  realTimeSynthesis: 'Real-Time Synthesis',
  bySector: 'BY SECTOR'
});

// Update the TypeScript interface ModeLanguage
let interfaceIndex = content.indexOf('export interface ModeLanguage {');
let dailyBriefingIndex = content.indexOf('dailyBriefingLabels: {', interfaceIndex);

if (dailyBriefingIndex !== -1) {
  content = content.slice(0, dailyBriefingIndex) + `  dailyBriefingLabels: {
    realTimeForecast?: string;
    realTimeSynthesis?: string;
    bySector?: string;
` + content.slice(dailyBriefingIndex + 23);
}

fs.writeFileSync('src/utils/modeLanguage.ts', content);
console.log('done updating modeLanguage.ts for DailyBriefing');
