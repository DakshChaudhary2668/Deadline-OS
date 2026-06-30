import { Task } from '../types';

export function computeSimulation(task: Task | undefined, scenario: string, pending: Task[], tasks: Task[], role: string) {
  if (role === 'developer') return devSim(task, scenario, pending, tasks);
  if (role === 'student') return studentSim(task, scenario, pending, tasks);
  if (role === 'job_seeker') return careerSim(task, scenario, pending, tasks);
  return corpSim(task, scenario, pending, tasks);
}

function devSim(task: Task | undefined, scenario: string, pending: Task[], tasks: Task[]) {
  const effort = pending.reduce((s, t) => s + (t.estimatedEffort || 0), 0);
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
    gains = [`Reclaims sprint capacity from ${tName}`];
    losses = [`Introduces severe technical debt for ${tName}`];
    netImpact = 'Sacrifices specific ticket to protect overall sprint stability.';
    criticalConsequences = ['Downstream dependency breakages', 'Release candidate blocker'];
    recoveryRecommendations = ['Re-add to backlog for next sprint', 'Document as known technical debt'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Dropping committed tickets breaks the sprint contract and delays shipping.';
    impactSummary = 'Skipping this ticket reduces immediate code churn but compromises repository architecture and downstream builds.';
  } else if (scenario === 'DOUBLE_EFFORT') {
    projectedObjectiveSuccess = Math.min(99, currentObjectiveSuccess + 25);
    projectedWorkspaceSuccess = Math.max(10, currentWorkspaceSuccess - 15);
    gains = [`Guarantees merge for ${tName}`];
    losses = ['Burns out developer resources', 'Delays peer code reviews'];
    netImpact = 'High sprint risk for guaranteed single-feature delivery.';
    criticalConsequences = ['Decreased team velocity', 'Missed sprint commitments on secondary tasks'];
    recoveryRecommendations = ['Delay secondary tickets', 'Approve developer overtime compensatory hours'];
    verdict = 'ACCEPTABLE_RISK';
    verdictExplanation = 'Acceptable risk only if this ticket directly blocks a production-critical deployment.';
    impactSummary = 'Doubling developer cycles secures this PR but drains team capacity, risking velocity slippage.';
  } else if (scenario === 'DELAY_DEADLINE') {
    projectedObjectiveSuccess = Math.max(10, currentObjectiveSuccess - 15);
    projectedWorkspaceSuccess = Math.min(95, currentWorkspaceSuccess + 5);
    gains = ['Reduces immediate code churn', 'Enables deeper QA and testing'];
    losses = ['Missed code freeze deadline', 'Delayed deployment train'];
    netImpact = 'Pushes risk to the next deployment cycle.';
    criticalConsequences = ['Production release delayed', 'Stakeholder alignment friction'];
    recoveryRecommendations = ['Communicate with product owners immediately', 'Coordinate new deployment train window'];
    verdict = 'RECOMMENDED';
    verdictExplanation = 'Delaying is highly recommended compared to pushing untested or fragile code to production.';
    impactSummary = 'Pushing the sprint deadline allows for thorough testing and code stability at the cost of immediate delivery.';
  } else {
    // FORCE_COMPLETE
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = Math.max(10, currentWorkspaceSuccess - 25);
    gains = ['Ticket closed immediately', 'Fast-tracked merge'];
    losses = ['Bypasses standard CI/CD and lint checks', 'Introduces hidden regression bugs'];
    netImpact = 'Incurs severe technical debt for instant delivery.';
    criticalConsequences = ['Production outage risk', 'Broken master branch build'];
    recoveryRecommendations = ['Schedule immediate hotfix sprint', 'Run post-mortem code review'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Bypassing quality assurance and forcing completion violates software development best practices.';
    impactSummary = 'Forcing completion skips standard testing gates and risks severe regression bugs in production.';
  }

  return { currentWorkspaceSuccess, projectedWorkspaceSuccess, currentObjectiveSuccess, projectedObjectiveSuccess, currentFailureRisk, projectedFailureRisk: 100 - projectedWorkspaceSuccess, confidenceScore: 88, gains, losses, netImpact, criticalConsequences, recoveryRecommendations, verdict, verdictExplanation, impactSummary };
}

function studentSim(task: Task | undefined, scenario: string, pending: Task[], tasks: Task[]) {
  const effort = pending.reduce((s, t) => s + (t.estimatedEffort || 0), 0);
  
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

  const tName = task ? task.title : 'Study Topic';

  if (scenario === 'SKIP_TASK') {
    projectedObjectiveSuccess = 0;
    projectedWorkspaceSuccess = Math.min(99, currentWorkspaceSuccess + 20);
    gains = ['Substantial cognitive relief', 'Time reclaimed for other classes'];
    losses = [`Zero marks for ${tName} on the exam`, 'Incomplete syllabus coverage'];
    netImpact = 'Sacrifices one topic to protect overall syllabus preparation.';
    criticalConsequences = ['Guaranteed grade loss on exam questions covering this concept', 'Weak foundation for advanced coursework'];
    recoveryRecommendations = ['Identify if topic has low grading weightage', 'Borrow notes for a 15-minute quick review'];
    verdict = 'ACCEPTABLE_RISK';
    verdictExplanation = 'Acceptable risk if this specific module constitutes less than 5% of the overall GPA score.';
    impactSummary = 'Skipping this study block frees up massive hours for other exams, but guarantees grade slippage on this topic.';
  } else if (scenario === 'DOUBLE_EFFORT') {
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = Math.max(10, currentWorkspaceSuccess - 20);
    gains = [`Total mastery of ${tName}`, 'High exam confidence'];
    losses = ['Severe student burnout', 'Memory decay in other registered courses'];
    netImpact = 'Secures one grade at the expense of overall semester balance.';
    criticalConsequences = ['Cramming fatigue', 'Failing secondary subjects due to neglect'];
    recoveryRecommendations = ['Implement spaced repetition', 'Schedule a full day of rest post-exam'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Not recommended unless this exam is a high-stakes prerequisite or core class.';
    impactSummary = 'Cramming double hours secures conceptual mastery of this topic, but threatens overall student performance across other subjects.';
  } else if (scenario === 'DELAY_DEADLINE') {
    projectedObjectiveSuccess = Math.max(10, currentObjectiveSuccess - 15);
    projectedWorkspaceSuccess = Math.min(95, currentWorkspaceSuccess + 10);
    gains = ['Reduces current study pressure', 'Allows for deeper conceptual absorption'];
    losses = ['Cluttered calendar during exam week', 'Cramming multiple subjects simultaneously'];
    netImpact = 'Pushes study stress closer to the final examination gates.';
    criticalConsequences = ['High anxiety during finals week', 'Syllabus backlog congestion'];
    recoveryRecommendations = ['Create a strict daily study timetable', 'Form a study group for accelerated review'];
    verdict = 'RECOMMENDED';
    verdictExplanation = 'Recommended if you have a comfortable buffer window before finals.';
    impactSummary = 'Postponing this assignment provides immediate cognitive relief, assuming the final exam timeline is not congested.';
  } else {
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = Math.max(10, currentWorkspaceSuccess - 30);
    gains = ['Instant gratification', 'Completed homework status'];
    losses = ['Surface-level learning only', 'Zero long-term memory retention'];
    netImpact = 'Secures completion points but fails to build exam readiness.';
    criticalConsequences = ['Failure on exam questions requiring deep recall', 'Concept gaps in future modules'];
    recoveryRecommendations = ['Schedule a proper active recall session later', 'Do past papers under timed conditions'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Rushing study yields extremely poor recall and retention under exam conditions.';
    impactSummary = 'Forcing submission ticks the compliance box but guarantees abysmal retention when exam questions are presented.';
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

  const tName = task ? task.title : 'Application';

  if (scenario === 'SKIP_TASK') {
    projectedObjectiveSuccess = 0;
    projectedWorkspaceSuccess = currentWorkspaceSuccess + 5;
    gains = ['Reclaims prep time from low-probability vacancy', 'Avoids application fatigue'];
    losses = [`Closes potential interview door for ${tName}`, 'Slightly smaller pipeline size'];
    netImpact = 'Concentrates job hunt energy on high-conversion roles.';
    criticalConsequences = ['Fewer active recruiters in your funnel', 'Missed outlier opportunities'];
    recoveryRecommendations = ['Apply to two target tier-1 roles', 'Engage in direct recruiter outreach'];
    verdict = 'RECOMMENDED';
    verdictExplanation = 'Skipping low-probability roles increases overall focus.';
    impactSummary = 'Dropping this application lets you channel high-quality energy into higher-priority recruiter screens.';
  } else if (scenario === 'DOUBLE_EFFORT') {
    projectedObjectiveSuccess = 95;
    projectedWorkspaceSuccess = currentWorkspaceSuccess - 15;
    gains = [`Perfectly ATS-tailored resume for ${tName}`, 'Custom-crafted cover letter', 'Deep company research'];
    losses = ['Lower weekly application velocity', 'Slower pipeline momentum'];
    netImpact = 'Maximizes conversion probability for one specific premier role.';
    criticalConsequences = ['Pipeline stagnation if rejected', 'High emotional investment in one lead'];
    recoveryRecommendations = ['Utilize AI for boilerplate tailoring', 'Automate generic outbound application phases'];
    verdict = 'ACCEPTABLE_RISK';
    verdictExplanation = 'Acceptable risk only for dream tier-1 roles with high career runway ROI.';
    impactSummary = 'Investing double effort ensures a strong initial screen callback, but temporarily shrinks top-of-funnel pipeline volume.';
  } else if (scenario === 'DELAY_DEADLINE') {
    projectedObjectiveSuccess = currentObjectiveSuccess - 20;
    projectedWorkspaceSuccess = currentWorkspaceSuccess + 5;
    gains = ['Extra buffer for mock interview preparation', 'Time to polish portfolio project'];
    losses = [`Role ${tName} might close or be filled`, 'Missed early hiring waves'];
    netImpact = 'Risks losing the opportunity entirely to more agile candidates.';
    criticalConsequences = ['Application reviewed after major cohorts are filled', 'Loss of referral leverage'];
    recoveryRecommendations = ['Send warm networking message to recruiter', 'Submit draft application to secure stamp'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Job openings close quickly. Delaying is fatal in active markets.';
    impactSummary = 'Postponing this submission risks having the role closed or filled by the time your profile enters the ATS queue.';
  } else {
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = currentWorkspaceSuccess - 10;
    gains = [`${tName} submitted instantly`, 'Maximum pipeline velocity maintained'];
    losses = ['Potential typos in resume', 'Poor ATS keyword optimization', 'Incorrect company name in cover letter'];
    netImpact = 'High volume but extremely low-yield outbound pipeline.';
    criticalConsequences = ['Immediate automated ATS rejection', 'Bridges burned with company talent team'];
    recoveryRecommendations = ['Run a thorough checklist review on next submission', 'Optimize core resume keywords'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Sloppy applications burn bridges with recruiters and lead to instant automated rejection.';
    impactSummary = 'Rushing submission satisfies your daily quota but likely results in an automated rejection from poorly aligned ATS screening.';
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

  const tName = task ? task.title : 'Deliverable';

  if (scenario === 'SKIP_TASK') {
    projectedObjectiveSuccess = 0;
    projectedWorkspaceSuccess = currentWorkspaceSuccess + 15;
    gains = ['Saves critical team operational bandwidth', 'Reduces immediate meeting overhead'];
    losses = [`Direct contractual SLA breach for ${tName}`, 'Client escalation and penalty clauses'];
    netImpact = 'Trades compliance for bandwidth.';
    criticalConsequences = ['Contract termination risk', 'Severely damaged stakeholder trust', 'Revenue leakage'];
    recoveryRecommendations = ['Initiate proactive contract renegotiation', 'Brief executive steering committee on risk'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Skipping deliverables violates core SLA contracts and risks business ARR retention.';
    impactSummary = 'Abandoning this objective triggers immediate client escalations and breaches key SLA contract terms.';
  } else if (scenario === 'DOUBLE_EFFORT') {
    projectedObjectiveSuccess = 99;
    projectedWorkspaceSuccess = currentWorkspaceSuccess - 25;
    gains = [`SLA milestone ${tName} secured flawlessly`, 'Enhanced client trust and renewal probability'];
    losses = ['Exorbitant overtime or resource costs', 'Exhausted team capacity'];
    netImpact = 'Secures client trust at high internal cost.';
    criticalConsequences = ['Team burnout', 'Budget overruns on project delivery'];
    recoveryRecommendations = ['Approve immediate emergency overtime budget', 'Reallocate administrative tasks to other teams'];
    verdict = 'ACCEPTABLE_RISK';
    verdictExplanation = 'Acceptable if this involves a marquee enterprise client representing significant business ARR.';
    impactSummary = 'Swarming this objective secures the SLA but heavily drains department capacity, leaving other operations vulnerable.';
  } else if (scenario === 'DELAY_DEADLINE') {
    projectedObjectiveSuccess = currentObjectiveSuccess - 10;
    projectedWorkspaceSuccess = currentWorkspaceSuccess + 10;
    gains = ['Smooths out operational resource leveling', 'Ensures rigorous quality control'];
    losses = [`Minor SLA penalty for ${tName}`, 'Missed quarterly target milestones'];
    netImpact = 'Pushes delivery to next quarter.';
    criticalConsequences = ['Delayed client billing and deferred revenue', 'Stakeholder alignment friction'];
    recoveryRecommendations = ['Draft proactive delayed-delivery brief for client', 'Renegotiate milestone dates with stakeholders'];
    verdict = 'RECOMMENDED';
    verdictExplanation = 'Strategic delays are better than sloppy, un-vetted deliveries.';
    impactSummary = 'Postponing the target deadline incurs minor delayed-delivery friction but protects the output from critical compliance failures.';
  } else {
    projectedObjectiveSuccess = 90;
    projectedWorkspaceSuccess = currentWorkspaceSuccess - 20;
    gains = [`Check off ${tName} quickly`, 'Immediate checkbox fulfillment'];
    losses = ['Severe quality control failure', 'Compliance audit risk', 'Undetected operational liabilities'];
    netImpact = 'High risk of post-delivery blowback.';
    criticalConsequences = ['Contract disputes', 'Regulatory audit penalties', 'Costly post-delivery rework'];
    recoveryRecommendations = ['Schedule a formal post-mortem assessment', 'Initialize QA patch sprints'];
    verdict = 'NOT_RECOMMENDED';
    verdictExplanation = 'Cutting corners in operational compliance leads to expensive audits, disputes, and client churn.';
    impactSummary = 'Forcing this deliverable bypasses key QA gates and almost certainly triggers an expensive operational audit failure.';
  }
  return { currentWorkspaceSuccess, projectedWorkspaceSuccess, currentObjectiveSuccess, projectedObjectiveSuccess, currentFailureRisk, projectedFailureRisk: 100 - projectedWorkspaceSuccess, confidenceScore: 90, gains, losses, netImpact, criticalConsequences, recoveryRecommendations, verdict, verdictExplanation, impactSummary };
}
