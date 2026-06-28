const fs = require('fs');

let content = fs.readFileSync('src/components/StrategicDecisions.tsx', 'utf8');

// Replace getTaskStatusLabel
const oldTaskStatusLabel = \`  const getTaskStatusLabel = (score: number) => {
    if (score >= 85) return 'URGENT ACTION REQUIRED';
    if (score >= 70) return 'HIGH VALUE';
    if (score >= 45) return 'STABLE';
    return 'LOW PRIORITY';
  };\`;

const newTaskStatusLabel = \`  const getTaskStatusLabel = (score: number) => {
    if (score >= 85) return secondaryLabels.taskStatusLabels.urgent;
    if (score >= 70) return secondaryLabels.taskStatusLabels.high;
    if (score >= 45) return secondaryLabels.taskStatusLabels.stable;
    return secondaryLabels.taskStatusLabels.low;
  };\`;

content = content.replace(oldTaskStatusLabel, newTaskStatusLabel);

// Replace getRiskLabelAndBadge
const oldRiskLabelAndBadge = \`  const getRiskLabelAndBadge = (probability: number) => {
    if (probability >= 75) {
      return { label: 'Critical', text: '🔴 Critical', color: 'text-rose-450 bg-rose-950/45 border-rose-900/40' };
    }
    if (probability >= 50) {
      return { label: 'High', text: '🟠 High', color: 'text-orange-400 bg-orange-950/45 border-orange-900/40' };
    }
    if (probability >= 30) {
      return { label: 'Moderate', text: '🟡 Moderate', color: 'text-amber-400 bg-amber-950/45 border-amber-900/40' };
    }
    return { label: 'Low', text: '🟢 Low', color: 'text-emerald-400 bg-emerald-950/45 border-emerald-900/40' };
  };\`;

const newRiskLabelAndBadge = \`  const getRiskLabelAndBadge = (probability: number) => {
    const riskTerms = (MODE_LANGUAGES[mockRole as keyof typeof MODE_LANGUAGES] || MODE_LANGUAGES.professional).riskTerminology;
    if (probability >= 75) {
      return { label: riskTerms.critical, text: '🔴 ' + riskTerms.critical, color: 'text-rose-450 bg-rose-950/45 border-rose-900/40' };
    }
    if (probability >= 50) {
      return { label: riskTerms.high, text: '🟠 ' + riskTerms.high, color: 'text-orange-400 bg-orange-950/45 border-orange-900/40' };
    }
    if (probability >= 30) {
      return { label: riskTerms.moderate, text: '🟡 ' + riskTerms.moderate, color: 'text-amber-400 bg-amber-950/45 border-amber-900/40' };
    }
    return { label: riskTerms.low, text: '🟢 ' + riskTerms.low, color: 'text-emerald-400 bg-emerald-950/45 border-emerald-900/40' };
  };\`;

content = content.replace(oldRiskLabelAndBadge, newRiskLabelAndBadge);

// Replace getExecutiveScoreLabel
const oldExecutiveScoreLabel = \`  const getExecutiveScoreLabel = (score: number) => {
    if (score >= 85) return 'High Priority';
    if (score >= 70) return 'Moderate Confidence';
    return 'Executive Readiness';
  };\`;

const newExecutiveScoreLabel = \`  const getExecutiveScoreLabel = (score: number) => {
    if (score >= 85) return secondaryLabels.executiveScoreLabels.high;
    if (score >= 70) return secondaryLabels.executiveScoreLabels.moderate;
    return secondaryLabels.executiveScoreLabels.low;
  };\`;

content = content.replace(oldExecutiveScoreLabel, newExecutiveScoreLabel);

fs.writeFileSync('src/components/StrategicDecisions.tsx', content);
console.log('done updating StrategicDecisions.tsx');
