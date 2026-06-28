const fs = require('fs');
const path = require('path');

let fp = path.join(process.cwd(), 'server.ts');
let code = fs.readFileSync(fp, 'utf8');

const regex = /if \\(role === 'student'\\) \\{[\\s\\S]*?\\} else if \\(role === 'job_seeker'\\) \\{[\\s\\S]*?\\} else \\{[\\s\\S]*?\\}/;

const replacement = `
    const config = MODE_LANGUAGES[role as keyof typeof MODE_LANGUAGES] || MODE_LANGUAGES.professional;
    const insights = config.momentumInsights;

    if (pendingEffort > 25) {
      momentumStatus = 'OVERLOADED';
      keyObservation = insights.overloaded.keyObservation(pendingEffort);
      riskAssessment = insights.overloaded.riskAssessment;
      executiveRecommendation = insights.overloaded.executiveRecommendation;
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = insights.accelerating.keyObservation(recentCompleted);
      riskAssessment = insights.accelerating.riskAssessment;
      executiveRecommendation = insights.accelerating.executiveRecommendation;
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = insights.stable.keyObservation;
      riskAssessment = insights.stable.riskAssessment;
      executiveRecommendation = insights.stable.executiveRecommendation;
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = insights.declining.keyObservation;
      riskAssessment = insights.declining.riskAssessment;
      executiveRecommendation = insights.declining.executiveRecommendation;
    }
`;

code = code.replace(regex, replacement.trim());
fs.writeFileSync(fp, code);
console.log('done server.ts');
