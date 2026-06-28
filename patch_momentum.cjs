const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf8');

const oldInsights = `  const config = MODE_LANGUAGES[role as keyof typeof MODE_LANGUAGES] || MODE_LANGUAGES.professional;
  const insights = config.momentumInsights;`;

const newInsights = `  const config = MODE_LANGUAGES[role as keyof typeof MODE_LANGUAGES] || MODE_LANGUAGES.professional;
  const insights = (config as any).momentumInsights || {
    overloaded: {
      keyObservation: (pendingEffort: number) => \`Workload exceeds sustainable velocity (\${pendingEffort}h).\`,
      riskAssessment: 'High risk of cascading delays.',
      executiveRecommendation: 'Initiate immediate scope reduction.'
    },
    accelerating: {
      keyObservation: (recentCompleted: number) => \`Velocity is high with \${recentCompleted} tasks recently cleared.\`,
      riskAssessment: 'Current trajectory is favorable.',
      executiveRecommendation: 'Maintain current cadence.'
    },
    stable: {
      keyObservation: 'Workflow is balanced with predictable output.',
      riskAssessment: 'Low risk. Current pacing is sustainable.',
      executiveRecommendation: 'Continue execution according to plan.'
    },
    declining: {
      keyObservation: 'Task accumulation is outpacing completion rate.',
      riskAssessment: 'Moderate risk of bottleneck formation.',
      executiveRecommendation: 'Identify and unblock stalled tasks.'
    }
  };`;

content = content.replace(oldInsights, newInsights);

fs.writeFileSync('server.ts', content);
console.log('done patching server.ts');
