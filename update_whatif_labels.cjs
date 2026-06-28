const fs = require('fs');

let content = fs.readFileSync('src/utils/modeLanguage.ts', 'utf8');

function addSimulatorLabels(role, simulatorLabels, confidenceDrivers) {
  let roleIndex = content.indexOf(role + ': {');
  if (roleIndex === -1) roleIndex = content.indexOf("'" + role + "': {");
  if (roleIndex === -1) roleIndex = content.indexOf('"' + role + '": {');

  if (roleIndex !== -1) {
    let targetIndex = content.indexOf('dailyBriefingLabels:', roleIndex);
    if (targetIndex !== -1) {
      const injection = `
    simulatorLabels: ${JSON.stringify(simulatorLabels)},
    confidenceDrivers: ${JSON.stringify(confidenceDrivers)},
`;
      content = content.slice(0, targetIndex) + injection + content.slice(targetIndex);
    }
  }
}

addSimulatorLabels('student', {
  predictorPanel: "Academic Performance Predictor",
  title: "What-If Course Load Simulator",
  description: "Explore the GPA and timeline impact of skipping homeworks, delaying research milestones, or cramming extra study hours.",
  chooseTarget: "-- Choose Target Syllabus Goal --",
  originalCost: "Study Hours Required",
  constraintDeadline: "Submission Deadline",
  baselineUrgency: "Academic Weight",
  step1: "Step 1: Select Syllabus Target",
  step2: "Step 2: Hypothesize Academic Adjustments",
  executeButton: "RUN ACADEMIC PROJECTION",
  executingButton: "ANALYZING GRADE IMPACT...",
  outcomeHeader: "Projected Academic Standing",
  workspaceSuccess: "Syllabus Mastery",
  objectiveSuccess: "Goal Grade Success",
  failureRisk: "Academic Failure Risk",
  awaitingInput: "Awaiting Course Load Inputs",
  awaitingDesc: "Adjust study hours or deadlines on the left to project exam performance and grade impact.",
  outcomeMetricsLabel: "Outcome Model Metrics",
  simulatedStateLabel: "SIMULATED SYLLABUS STATE",
  aiConfidenceLabel: "AI CONFIDENCE:"
}, ['Coursework consistency', 'Submission certainty', 'Exam load volatility', 'Hypothesis complexity', 'Syllabic signal indicators']);

addSimulatorLabels('developer', {
  predictorPanel: "Sprint Performance Predictor",
  title: "What-If Sprint Simulator",
  description: "Project the sprint success, code velocity, and deployment risk of delaying tickets, scaling down scope, or working overtime.",
  chooseTarget: "-- Choose Target Sprint Ticket --",
  originalCost: "Dev Effort Required",
  constraintDeadline: "Sprint Deadline",
  baselineUrgency: "Ticket Priority",
  step1: "Step 1: Select Backlog Ticket",
  step2: "Step 2: Define Sprint Intervention",
  executeButton: "PROJECT SPRINT IMPACT",
  executingButton: "RUNNING OVERTIME SIMULATION...",
  outcomeHeader: "Projected Sprint Metrics",
  workspaceSuccess: "Sprint Completion",
  objectiveSuccess: "Build Stability",
  failureRisk: "SLA Breach Risk",
  awaitingInput: "Awaiting Sprint Parameters",
  awaitingDesc: "Configure sprint adjustments to simulate code-freeze bottlenecks and delivery velocity.",
  outcomeMetricsLabel: "Outcome Model Metrics",
  simulatedStateLabel: "SIMULATED SPRINT STATE",
  aiConfidenceLabel: "AI CONFIDENCE:"
}, ['Commit history consistency', 'Code freeze certainty', 'PR/deploy volatility', 'Scenario complexity', 'Branch telemetry signals']);

addSimulatorLabels('job_seeker', {
  predictorPanel: "Placement Pipeline Predictor",
  title: "What-If Placement Simulator",
  description: "Evaluate the conversion probability of shifting interview dates, modifying outreach strategies, or expanding job applications.",
  chooseTarget: "-- Choose Target Application --",
  originalCost: "Prep Hours Required",
  constraintDeadline: "Interview Date",
  baselineUrgency: "Role Priority",
  step1: "Step 1: Select Target Opportunity",
  step2: "Step 2: Adjust Placement Variables",
  executeButton: "SIMULATE PIPELINE IMPACT",
  executingButton: "CALCULATING CONVERSION RATIOS...",
  outcomeHeader: "Projected Hiring Funnel",
  workspaceSuccess: "Interview Pipeline Health",
  objectiveSuccess: "Offer Conversion Rate",
  failureRisk: "Rejection Risk",
  awaitingInput: "Awaiting Pipeline Adjustments",
  awaitingDesc: "Modify target variables to generate risk and conversion models for the selected role.",
  outcomeMetricsLabel: "Outcome Model Metrics",
  simulatedStateLabel: "SIMULATED PIPELINE STATE",
  aiConfidenceLabel: "AI CONFIDENCE:"
}, ['Interview funnel consistency', 'Process/round certainty', 'Hiring wave volatility', 'Scenario complexity', 'Recruiter signal indicators']);

addSimulatorLabels('professional', {
  predictorPanel: "Strategic Operations Predictor",
  title: "What-If Executive Simulator",
  description: "Model the operational consequences of delaying milestones, reallocating budget, or forcing timeline accelerations.",
  chooseTarget: "-- Choose Target SLA Initiative --",
  originalCost: "Labor Hours Required",
  constraintDeadline: "SLA Deadline",
  baselineUrgency: "Strategic Priority",
  step1: "Step 1: Select Business Initiative",
  step2: "Step 2: Model Execution Adjustments",
  executeButton: "RUN SLA PROJECTION",
  executingButton: "GENERATING IMPACT MODEL...",
  outcomeHeader: "Projected Operational State",
  workspaceSuccess: "Corporate Execution",
  objectiveSuccess: "Initiative Success",
  failureRisk: "SLA Breach Risk",
  awaitingInput: "Awaiting Simulation Inputs",
  awaitingDesc: "Adjust variables on the left to project execution outcomes, risk impacts, and resource tradeoffs.",
  outcomeMetricsLabel: "Outcome Model Metrics",
  simulatedStateLabel: "SIMULATED WORKSPACE STATE",
  aiConfidenceLabel: "AI CONFIDENCE:"
}, ['Historical deliverable consistency', 'SLA breach certainty', 'Operational capacity volatility', 'Scenario complexity', 'Contextual telemetry signals']);

// We also need to add type definitions to the interface.
let interfaceIndex = content.indexOf('export interface ModeLanguage {');
let dailyBriefingIndex = content.indexOf('dailyBriefingLabels: {', interfaceIndex);

if (dailyBriefingIndex !== -1) {
  content = content.slice(0, dailyBriefingIndex) + `  simulatorLabels?: any;
  confidenceDrivers?: string[];
  ` + content.slice(dailyBriefingIndex);
}

fs.writeFileSync('src/utils/modeLanguage.ts', content);
console.log('done updating modeLanguage.ts for WhatIfSimulator');
