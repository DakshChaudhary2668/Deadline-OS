import { Task } from '../types';

export function computeSimulation(task: Task | undefined, scenario: string, pending: Task[], tasks: Task[], role: string) {
  if (role === 'developer') return devSim(task, scenario, pending, tasks);
  if (role === 'student') return studentSim(task, scenario, pending, tasks);
  if (role === 'job_seeker') return careerSim(task, scenario, pending, tasks);
  return corpSim(task, scenario, pending, tasks);
}

function devSim(task: Task | undefined, scenario: string, pending: Task[], tasks: Task[]) {
  const effort = pending.reduce((s, t) => s + t.estimatedEffort, 0);
  const sprintCapacity = 40;
  
  let currentWorkspaceSuccess = Math.max(10, Math.min(99, 100 - (effort / sprintCapacity) * 50));
  let currentObjectiveSuccess = task ? 100 - (task.riskScore || 30) : 100;
  let currentFailureRisk = 100 - currentWorkspaceSuccess;

  let projectedWorkspaceSuccess = currentWorkspaceSuccess;
  let projectedObjectiveSuccess = currentObjectiveSuccess;
  
  let gains: string[] = [];
  let losses: string[] = [];
  let netImpact = '';
  let criticalConsequences: string[] = [];
  let recoveryRecommendations: string[] = [];
  let verdict: 'RECOMMENDED' | 'ACCEPTABLE_RISK' | 'NOT_RECOMMENDED' = 'ACCEPTABLE_RISK';
  let verdictExplanation = '';
  let impactSummary = '';

  const tName = task ? task.title : 'Ticket';

  if (scenario === 'SKIP_TASK') {
    projectedObjectiveSuccess = 0;
    projectedWorkspaceSuccess = Math.min(95, currentWorkspaceSuccess + 10);
    gains = [`Reclaims sprint capacity from \${tName}`];
    losses = [`Introduces severe technical debt for \${tName}`];
    netImpact = 'Sacrifices specific ticket to protect overall sprint stability.';
    criticalConsequences = ['Downstream dependency breakages'];
    recoveryRecommendations = ['Re-add to backlog for next sprint'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Dropping tickets arbitrarily breaks the sprint contract.';
    impactSummary = 'Skipping this ticket reduces immediate code churn but severely damages overall architecture.';
  } else if (scenario === 'DOUBLE_EFFORT') {
    projectedObjectiveSuccess = Math.min(99, currentObjectiveSuccess + 25);
    projectedWorkspaceSuccess = Math.max(10, currentWorkspaceSuccess - 15);
    gains = [`Guarantees merge for \${tName}`];
    losses = ['Burns out engineering resources', 'Delays other PR reviews'];
    netImpact = 'High sprint risk for guaranteed single-feature delivery.';
    criticalConsequences = ['Decreased team velocity', 'Missed sprint commitments elsewhere'];
    recoveryRecommendations = ['Delay secondary tickets'];
    verdict = 'ACCEPTABLE_RISK';
    verdictExplanation = 'Acceptable if this ticket blocks the entire release.';
    impactSummary = 'Doubling effort secures this PR but drains sprint capacity rapidly.';
  } else if (scenario === 'DELAY_DEADLINE') {
    projectedObjectiveSuccess = Math.max(10, currentObjectiveSuccess - 15);
    projectedWorkspaceSuccess = Math.min(95, currentWorkspaceSuccess + 5);
    gains = ['Reduces immediate code churn'];
    losses = ['Missed code freeze deadline'];
    netImpact = 'Pushes risk to the next deployment cycle.';
    criticalConsequences = ['Release delayed'];
    recoveryRecommendations = ['Communicate with product owners'];
    verdict = 'RECOMMENDED';
    verdictExplanation = 'Delaying is safer than pushing untested code.';
    impactSummary = 'Pushing the deadline allows for safer QA testing at the cost of immediate release.';
  } else {
    // FORCE_COMPLETE
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = Math.max(10, currentWorkspaceSuccess - 25);
    gains = ['Ticket closed immediately'];
    losses = ['Bypasses standard CI/CD checks', 'Introduces hidden bugs'];
    netImpact = 'Extreme technical debt incurred.';
    criticalConsequences = ['Production outage risk'];
    recoveryRecommendations = ['Schedule immediate hotfix sprint'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Forcing completion breaks deployment protocol.';
    impactSummary = 'Forcing completion skips tests and introduces massive regression risks.';
  }

  return { currentWorkspaceSuccess, projectedWorkspaceSuccess, currentObjectiveSuccess, projectedObjectiveSuccess, currentFailureRisk, projectedFailureRisk: 100 - projectedWorkspaceSuccess, confidenceScore: 88, gains, losses, netImpact, criticalConsequences, recoveryRecommendations, verdict, verdictExplanation, impactSummary };
}

function studentSim(task: Task | undefined, scenario: string, pending: Task[], tasks: Task[]) {
  const effort = pending.reduce((s, t) => s + t.estimatedEffort, 0);
  
  let currentWorkspaceSuccess = Math.max(10, Math.min(99, 100 - (effort / 20) * 40));
  let currentObjectiveSuccess = task ? 100 - (task.riskScore || 30) : 100;
  let currentFailureRisk = 100 - currentWorkspaceSuccess;

  let projectedWorkspaceSuccess = currentWorkspaceSuccess;
  let projectedObjectiveSuccess = currentObjectiveSuccess;
  
  let gains: string[] = [];
  let losses: string[] = [];
  let netImpact = '';
  let criticalConsequences: string[] = [];
  let recoveryRecommendations: string[] = [];
  let verdict: 'RECOMMENDED' | 'ACCEPTABLE_RISK' | 'NOT_RECOMMENDED' = 'ACCEPTABLE_RISK';
  let verdictExplanation = '';
  let impactSummary = '';

  if (scenario === 'SKIP_TASK') {
    projectedObjectiveSuccess = 0;
    projectedWorkspaceSuccess = Math.min(99, currentWorkspaceSuccess + 20);
    gains = ['Massive cognitive relief'];
    losses = ['Zero marks for this topic on the exam'];
    netImpact = 'Sacrifices one topic to protect the rest of the syllabus.';
    criticalConsequences = ['Guaranteed point loss on the final'];
    recoveryRecommendations = ['Hope it has low weightage'];
    verdict = 'ACCEPTABLE_RISK';
    verdictExplanation = 'Acceptable if the topic has low grade weight.';
    impactSummary = 'Skipping this study block frees up massive hours, but guarantees a zero for this specific exam section.';
  } else if (scenario === 'DOUBLE_EFFORT') {
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = Math.max(10, currentWorkspaceSuccess - 20);
    gains = ['Total mastery of this subject'];
    losses = ['Severe burnout', 'Memory decay for other subjects'];
    netImpact = 'Secures one subject at the cost of overall syllabus health.';
    criticalConsequences = ['Failing other classes'];
    recoveryRecommendations = ['Use spaced repetition to recover time'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Over-studying one topic causes systemic academic failure.';
    impactSummary = 'Cramming double hours secures this exam but guarantees you will neglect your other courses.';
  } else if (scenario === 'DELAY_DEADLINE') {
    projectedObjectiveSuccess = Math.max(10, currentObjectiveSuccess - 15);
    projectedWorkspaceSuccess = Math.min(95, currentWorkspaceSuccess + 10);
    gains = ['Reduces current study pressure'];
    losses = ['Cramming later'];
    netImpact = 'Pushes the academic stress closer to exam week.';
    criticalConsequences = ['High anxiety during finals'];
    recoveryRecommendations = ['Set strict catch-up dates'];
    verdict = 'RECOMMENDED';
    verdictExplanation = 'Good tactical delay if you have a buffer before finals.';
    impactSummary = 'Delaying this topic relieves immediate pressure, assuming the final exam is still weeks away.';
  } else {
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = Math.max(10, currentWorkspaceSuccess - 30);
    gains = ['Instant gratification'];
    losses = ['Zero long-term retention'];
    netImpact = 'You feel productive but learn nothing.';
    criticalConsequences = ['Failing the exam due to poor recall'];
    recoveryRecommendations = ['Re-study properly later'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Rushing study yields no actual memory retention.';
    impactSummary = 'Forcing completion tricks you into thinking you are ready, but your memory retention will be abysmal.';
  }

  return { currentWorkspaceSuccess, projectedWorkspaceSuccess, currentObjectiveSuccess, projectedObjectiveSuccess, currentFailureRisk, projectedFailureRisk: 100 - projectedWorkspaceSuccess, confidenceScore: 92, gains, losses, netImpact, criticalConsequences, recoveryRecommendations, verdict, verdictExplanation, impactSummary };
}

function careerSim(task: Task | undefined, scenario: string, pending: Task[], tasks: Task[]) {
  let currentWorkspaceSuccess = Math.max(10, Math.min(99, 100 - (pending.length * 5)));
  let currentObjectiveSuccess = task ? 100 - (task.riskScore || 30) : 100;
  let currentFailureRisk = 100 - currentWorkspaceSuccess;
  let projectedWorkspaceSuccess = currentWorkspaceSuccess;
  let projectedObjectiveSuccess = currentObjectiveSuccess;
  
  let gains: string[] = [], losses: string[] = [], netImpact = '', criticalConsequences: string[] = [], recoveryRecommendations: string[] = [], verdict: any = 'ACCEPTABLE_RISK', verdictExplanation = '', impactSummary = '';

  if (scenario === 'SKIP_TASK') {
    projectedObjectiveSuccess = 0;
    projectedWorkspaceSuccess = currentWorkspaceSuccess + 5;
    gains = ['Saves time on a low-yield application'];
    losses = ['Closes a potential interview door'];
    netImpact = 'Minor overall pipeline impact.';
    criticalConsequences = ['Fewer total options'];
    recoveryRecommendations = ['Apply to two other similar roles'];
    verdict = 'RECOMMENDED';
    verdictExplanation = 'Skipping low-probability roles increases overall focus.';
    impactSummary = 'Dropping this application lets you focus your energy on higher probability interview loops.';
  } else if (scenario === 'DOUBLE_EFFORT') {
    projectedObjectiveSuccess = 95;
    projectedWorkspaceSuccess = currentWorkspaceSuccess - 15;
    gains = ['Perfectly tailored resume and cover letter'];
    losses = ['Lower total application volume'];
    netImpact = 'Increases conversion rate for one specific role.';
    criticalConsequences = ['Pipeline dries up if rejected'];
    recoveryRecommendations = ['Automate other applications'];
    verdict = 'ACCEPTABLE_RISK';
    verdictExplanation = 'Worth it only for a dream role.';
    impactSummary = 'Investing double effort secures a high chance at this specific role, but shrinks your top-of-funnel pipeline.';
  } else if (scenario === 'DELAY_DEADLINE') {
    projectedObjectiveSuccess = currentObjectiveSuccess - 20;
    projectedWorkspaceSuccess = currentWorkspaceSuccess + 5;
    gains = ['More time for interview prep'];
    losses = ['Role might get filled before you apply'];
    netImpact = 'High risk of losing the opportunity entirely.';
    criticalConsequences = ['Missed hiring wave'];
    recoveryRecommendations = ['Send a quick networking message now'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Job openings close quickly. Delaying is fatal.';
    impactSummary = 'Delaying this application risks the role being filled before your resume even reaches the ATS.';
  } else {
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = currentWorkspaceSuccess - 10;
    gains = ['Application submitted today'];
    losses = ['Typos in resume', 'Poor ATS formatting'];
    netImpact = 'High volume, low quality application.';
    criticalConsequences = ['Instant rejection by ATS'];
    recoveryRecommendations = ['Fix resume for the next one'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Sloppy applications burn bridges with recruiters.';
    impactSummary = 'Rushing this application guarantees submission but likely triggers immediate ATS rejection.';
  }
  return { currentWorkspaceSuccess, projectedWorkspaceSuccess, currentObjectiveSuccess, projectedObjectiveSuccess, currentFailureRisk, projectedFailureRisk: 100 - projectedWorkspaceSuccess, confidenceScore: 85, gains, losses, netImpact, criticalConsequences, recoveryRecommendations, verdict, verdictExplanation, impactSummary };
}

function corpSim(task: Task | undefined, scenario: string, pending: Task[], tasks: Task[]) {
  let currentWorkspaceSuccess = Math.max(10, Math.min(99, 100 - (pending.length * 8)));
  let currentObjectiveSuccess = task ? 100 - (task.riskScore || 30) : 100;
  let currentFailureRisk = 100 - currentWorkspaceSuccess;
  let projectedWorkspaceSuccess = currentWorkspaceSuccess;
  let projectedObjectiveSuccess = currentObjectiveSuccess;
  
  let gains: string[] = [], losses: string[] = [], netImpact = '', criticalConsequences: string[] = [], recoveryRecommendations: string[] = [], verdict: any = 'ACCEPTABLE_RISK', verdictExplanation = '', impactSummary = '';

  if (scenario === 'SKIP_TASK') {
    projectedObjectiveSuccess = 0;
    projectedWorkspaceSuccess = currentWorkspaceSuccess + 15;
    gains = ['Reclaims operational bandwidth'];
    losses = ['SLA breach', 'Client escalation'];
    netImpact = 'Trades compliance for bandwidth.';
    criticalConsequences = ['Revenue loss', 'Stakeholder distrust'];
    recoveryRecommendations = ['Renegotiate contract terms'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Skipping deliverables violates core SLA contracts.';
    impactSummary = 'Abandoning this objective triggers immediate client escalation and violates your operational SLA.';
  } else if (scenario === 'DOUBLE_EFFORT') {
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = currentWorkspaceSuccess - 25;
    gains = ['SLA secured flawlessly'];
    losses = ['Resource exhaustion', 'Overtime costs'];
    netImpact = 'Secures client trust at high internal cost.';
    criticalConsequences = ['Team burnout'];
    recoveryRecommendations = ['Approve overtime budget'];
    verdict = 'ACCEPTABLE_RISK';
    verdictExplanation = 'Acceptable if this is a high-revenue client.';
    impactSummary = 'Doubling resources secures the SLA but drains operational capacity across the rest of the board.';
  } else if (scenario === 'DELAY_DEADLINE') {
    projectedObjectiveSuccess = currentObjectiveSuccess - 10;
    projectedWorkspaceSuccess = currentWorkspaceSuccess + 10;
    gains = ['Smooths out resource allocation'];
    losses = ['Minor SLA penalty'];
    netImpact = 'Pushes delivery to next quarter.';
    criticalConsequences = ['Delayed billing'];
    recoveryRecommendations = ['Communicate delay to stakeholders now'];
    verdict = 'RECOMMENDED';
    verdictExplanation = 'Strategic delays are better than sloppy deliveries.';
    impactSummary = 'Postponing this deadline incurs a minor SLA penalty but preserves your team’s operational bandwidth.';
  } else {
    projectedObjectiveSuccess = 90;
    projectedWorkspaceSuccess = currentWorkspaceSuccess - 20;
    gains = ['Check the box quickly'];
    losses = ['Quality control failure', 'Compliance audit risk'];
    netImpact = 'High risk of post-delivery blowback.';
    criticalConsequences = ['Regulatory fines', 'Rework required'];
    recoveryRecommendations = ['Schedule a post-mortem review'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Cutting corners in corporate operations leads to audits.';
    impactSummary = 'Forcing this deliverable through bypasses QA and guarantees a compliance audit failure later.';
  }
  return { currentWorkspaceSuccess, projectedWorkspaceSuccess, currentObjectiveSuccess, projectedObjectiveSuccess, currentFailureRisk, projectedFailureRisk: 100 - projectedWorkspaceSuccess, confidenceScore: 90, gains, losses, netImpact, criticalConsequences, recoveryRecommendations, verdict, verdictExplanation, impactSummary };
}
