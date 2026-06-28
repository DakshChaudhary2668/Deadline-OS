const fs = require('fs');

let content = fs.readFileSync('src/utils/modeLanguage.ts', 'utf8');

function injectStrategicLabels(role, taskStatusLabels, executiveScoreLabels) {
  let roleIndex = content.indexOf(role + ': {');
  if (roleIndex === -1) roleIndex = content.indexOf("'" + role + "': {");
  if (roleIndex === -1) roleIndex = content.indexOf('"' + role + '": {');
  
  if (roleIndex !== -1) {
    let awaitingIndex = content.indexOf('"awaitingIntel"', roleIndex);
    if (awaitingIndex !== -1) {
      const injection = "\n    taskStatusLabels: " + JSON.stringify(taskStatusLabels) + ",\n    executiveScoreLabels: " + JSON.stringify(executiveScoreLabels) + ",\n    ";
      content = content.slice(0, awaitingIndex) + injection + content.slice(awaitingIndex);
    }
  }
}

injectStrategicLabels('student', 
  { urgent: 'URGENT STUDY REQUIRED', high: 'HIGH VALUE SUBJECT', stable: 'ON TRACK', low: 'LOW PRIORITY' },
  { high: 'High Priority Topic', moderate: 'Moderate Confidence', low: 'Exam Readiness' }
);

injectStrategicLabels('developer', 
  { urgent: 'CRITICAL BUG/BLOCKER', high: 'HIGH PRIORITY TICKET', stable: 'STABLE SPRINT', low: 'BACKLOG' },
  { high: 'High Priority Ticket', moderate: 'Moderate Confidence', low: 'Sprint Readiness' }
);

injectStrategicLabels('job_seeker', 
  { urgent: 'URGENT ACTION REQUIRED', high: 'HIGH IMPACT', stable: 'STABLE PIPELINE', low: 'LOW PRIORITY' },
  { high: 'High Priority Application', moderate: 'Moderate Confidence', low: 'Interview Readiness' }
);

injectStrategicLabels('professional', 
  { urgent: 'URGENT ACTION REQUIRED', high: 'HIGH VALUE', stable: 'STABLE', low: 'LOW PRIORITY' },
  { high: 'High Priority', moderate: 'Moderate Confidence', low: 'Executive Readiness' }
);

fs.writeFileSync('src/utils/modeLanguage.ts', content);
console.log('done updating modeLanguage.ts for strategic decisions');
