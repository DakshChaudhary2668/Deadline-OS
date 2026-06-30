import { Task } from '../types';

export function calculateStrategicDecision(task: Task, allTasks: Task[], role?: string): NonNullable<Task['strategicDecision']> {
  const r = role || 'professional';
  if (r === 'developer') return devLogic(task, allTasks);
  if (r === 'student') return studentLogic(task, allTasks);
  if (r === 'job_seeker') return careerLogic(task, allTasks);
  return corpLogic(task, allTasks);
}

function getBaseMetrics(task: Task, allTasks: Task[]) {
  const now = Date.now();
  const deadlineTime = new Date(task.deadline).getTime();
  const msRemaining = deadlineTime - now;
  const daysRemaining = msRemaining / (1000 * 60 * 60 * 24);
  const pending = allTasks.filter(t => t.status !== 'completed');
  const totalEffort = pending.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);
  return { daysRemaining, pending, totalEffort };
}

function devLogic(task: Task, allTasks: Task[]) {
  const { daysRemaining, pending, totalEffort } = getBaseMetrics(task, allTasks);
  const sprintCapacity = 40; 
  const currentVelocity = Math.max(1, (allTasks.length - pending.length) * 5); // Mock points
  const sprintLoad = totalEffort;
  const techDebtFactor = task.category === 'Work' ? 1.2 : 1;
  const blockRisk = task.importance === 'Critical' ? 90 : 30;

  let decisionType: any = 'CONTINUE';
  let reasoning = '';
  let expectedBenefit = '';
  let opportunityCost = '';
  let recommendedAction = '';
  let whyThisDecision = '';
  let whyNotOtherActions = '';
  let tradeoffSummary = '';
  let cosSummary = '';
  let primaryRisk = '';

  if (task.status === 'completed') {
    decisionType = 'CONTINUE';
    reasoning = 'Ticket successfully merged to master branch.';
    expectedBenefit = 'Frees up sprint capacity and eliminates branch conflicts.';
    opportunityCost = 'None.';
    recommendedAction = 'Verify deployment pipeline stability.';
    whyThisDecision = 'The pull request is already merged and validated.';
    whyNotOtherActions = 'No further developer action required.';
    tradeoffSummary = 'Code shipped without lingering technical debt.';
    cosSummary = 'Ticket closed. Monitor deployment logs for regressions.';
    primaryRisk = 'None.';
  } else if (daysRemaining <= 1) {
    decisionType = 'ACCELERATE';
    reasoning = 'Code freeze is imminent. Immediate merge required.';
    expectedBenefit = 'Prevents SLA breach and protects the release cycle.';
    opportunityCost = 'Delays refactoring of less critical technical debt.';
    recommendedAction = 'Ship MVP requirements and freeze feature scope.';
    whyThisDecision = `Only ${daysRemaining.toFixed(1)} days left in the sprint. Skipping this impacts the entire deployment pipeline.`;
    whyNotOtherActions = 'Dropping this ticket creates downstream build failures.';
    tradeoffSummary = 'Focus solely on this PR to secure the release candidate.';
    cosSummary = 'Accelerate this ticket to prevent a blocked release.';
    primaryRisk = 'Increased risk of minor bugs due to rapid shipping.';
  } else if (sprintLoad > sprintCapacity) {
    decisionType = 'SCOPE REDUCE';
    reasoning = 'Sprint capacity exceeded. Reduce code churn.';
    expectedBenefit = 'Ensures core functionality ships without compromising architecture.';
    opportunityCost = 'Delays nice-to-have UI polish and edge-case testing.';
    recommendedAction = 'Delay refactor and ship MVP functionality only.';
    whyThisDecision = `Sprint load (${sprintLoad}h) exceeds capacity. Pushing full scope risks complete sprint failure.`;
    whyNotOtherActions = 'Attempting full scope will result in unfinished, unmerged branches.';
    tradeoffSummary = 'Sacrifice polish to ensure build stability and merged PRs.';
    cosSummary = 'Reduce code churn. Ship MVP to protect the sprint goal.';
    primaryRisk = 'Slightly higher technical debt carried to next sprint.';
  } else if (task.estimatedEffort >= 8) {
    decisionType = 'REPLAN';
    reasoning = 'Epic is too large and risks branch divergence.';
    expectedBenefit = 'Minimizes merge conflicts and enables parallel development.';
    opportunityCost = 'Requires up-front architecture design time.';
    recommendedAction = 'Split epic into smaller, independent pull requests.';
    whyThisDecision = 'Large monolithic commits increase review time and regression risk.';
    whyNotOtherActions = 'Continuing as a single PR blocks reviewers and slows velocity.';
    tradeoffSummary = 'Invest time splitting the ticket to increase merge velocity.';
    cosSummary = 'Deconstruct this Epic to prevent review bottlenecks.';
    primaryRisk = 'Minor delay in starting actual coding.';
  } else {
    decisionType = 'CONTINUE';
    reasoning = 'Branch development is pacing well against sprint timeline.';
    expectedBenefit = 'Steady progress towards sprint goals without sacrificing code quality.';
    opportunityCost = 'Maintains current resource allocation.';
    recommendedAction = 'Continue development and open draft PR early.';
    whyThisDecision = 'Velocity is stable and tech debt is under control.';
    whyNotOtherActions = 'No aggressive intervention needed. Current trajectory is optimal.';
    tradeoffSummary = 'Maintain steady development cadence to ensure stable deployment.';
    cosSummary = 'Trajectory is stable. Continue normal development cadence.';
    primaryRisk = 'Unforeseen dependency blockers.';
  }

  return { decisionType, reasoning, expectedBenefit, opportunityCost, recommendedAction, whyThisDecision, whyNotOtherActions, tradeoffSummary, cosSummary, primaryRisk };
}

function studentLogic(task: Task, allTasks: Task[]) {
  const { daysRemaining, totalEffort } = getBaseMetrics(task, allTasks);
  const examReadiness = task.importance === 'Critical' ? 80 : 40; 
  
  let decisionType: any = 'CONTINUE';
  let reasoning = '', expectedBenefit = '', opportunityCost = '', recommendedAction = '', whyThisDecision = '', whyNotOtherActions = '', tradeoffSummary = '', cosSummary = '', primaryRisk = '';

  if (task.status === 'completed') {
    decisionType = 'CONTINUE';
    reasoning = 'Subject revision successfully logged.';
    expectedBenefit = 'Increases long-term memory retention and syllabus mastery.';
    opportunityCost = 'None.';
    recommendedAction = 'Schedule spaced repetition in 7 days.';
    whyThisDecision = 'This topic is mastered and requires no immediate attention.';
    whyNotOtherActions = 'Over-studying yields diminishing learning returns.';
    tradeoffSummary = 'Topic secured. Bandwidth freed for weaker subjects.';
    cosSummary = 'Revision complete. Focus shifted to low-retention topics.';
    primaryRisk = 'None.';
  } else if (daysRemaining <= 2) {
    decisionType = 'ACCELERATE';
    reasoning = 'Exam date is critically close. Cognitive overload risk is high.';
    expectedBenefit = 'Maximizes short-term retention of high-weightage topics.';
    opportunityCost = 'Forces you to skip low-weightage chapters.';
    recommendedAction = 'Prioritize high-weightage units and begin mock testing.';
    whyThisDecision = `With ${daysRemaining.toFixed(1)} days until examination, you must lock down core conceptual mastery.`;
    whyNotOtherActions = 'Reading textbooks cover-to-cover now is mathematically impossible and will destroy your GPA.';
    tradeoffSummary = 'Sacrifice comprehensive reading to guarantee passing the major grading rubric.';
    cosSummary = 'Cram cycle initiated. Focus purely on past-paper questions and core frameworks.';
    primaryRisk = 'Lower understanding of edge-case syllabus details.';
  } else if (totalEffort > 25) {
    decisionType = 'DROP';
    reasoning = 'Study load exceeds available cognitive bandwidth.';
    expectedBenefit = 'Protects mental health and preserves energy for core subjects.';
    opportunityCost = 'Accepting a slightly lower theoretical maximum grade.';
    recommendedAction = 'Skip low-weightage topics entirely.';
    whyThisDecision = `Attempting ${totalEffort} hours of revision will lead to burnout and memory decay across all subjects.`;
    whyNotOtherActions = 'Grinding through exhaustion decreases your actual exam readiness.';
    tradeoffSummary = 'Strategic dropping of minor topics ensures peak performance on heavily weighted exams.';
    cosSummary = 'Prune elective revision. Protect your primary GPA contributors.';
    primaryRisk = 'Losing points on obscure multiple-choice questions.';
  } else {
    decisionType = 'CONTINUE';
    reasoning = 'Revision schedule is pacing perfectly with the syllabus timeline.';
    expectedBenefit = 'Balanced retention without cramming.';
    opportunityCost = 'Requires consistent daily discipline.';
    recommendedAction = 'Maintain current study hours and begin spaced repetition.';
    whyThisDecision = 'Your exam readiness is tracking linearly with the calendar.';
    whyNotOtherActions = 'No radical schedule changes needed. Trust the curriculum plan.';
    tradeoffSummary = 'Maintain steady focus to avoid last-minute exam panic.';
    cosSummary = 'Syllabus pacing is optimal. Continue scheduled study blocks.';
    primaryRisk = 'Complacency leading to skipped sessions.';
  }
  return { decisionType, reasoning, expectedBenefit, opportunityCost, recommendedAction, whyThisDecision, whyNotOtherActions, tradeoffSummary, cosSummary, primaryRisk };
}

function careerLogic(task: Task, allTasks: Task[]) {
  const { daysRemaining, totalEffort } = getBaseMetrics(task, allTasks);
  
  let decisionType: any = 'CONTINUE';
  let reasoning = '', expectedBenefit = '', opportunityCost = '', recommendedAction = '', whyThisDecision = '', whyNotOtherActions = '', tradeoffSummary = '', cosSummary = '', primaryRisk = '';

  if (task.status === 'completed') {
    decisionType = 'CONTINUE';
    reasoning = 'Application deployed and recruiter contacted.';
    expectedBenefit = 'Expands your active interview pipeline.';
    opportunityCost = 'None.';
    recommendedAction = 'Prepare for technical screens and behaviorals.';
    whyThisDecision = 'The outreach phase for this role is complete.';
    whyNotOtherActions = 'Following up too early signals desperation.';
    tradeoffSummary = 'Pipeline expanded. Focus now shifts to interview readiness.';
    cosSummary = 'Placement milestone achieved. Shift focus to interview prep.';
    primaryRisk = 'None.';
  } else if (daysRemaining <= 1) {
    decisionType = 'ACCELERATE';
    reasoning = 'Interview date is tomorrow. Immediate preparation required.';
    expectedBenefit = 'Maximizes performance during the actual interview rounds.';
    opportunityCost = 'Halts all new outbound job applications.';
    recommendedAction = 'Practice DSA and schedule mock interviews immediately.';
    whyThisDecision = 'An upcoming interview is the highest leverage event in your pipeline.';
    whyNotOtherActions = 'Applying to more jobs while unprepared for an active interview is a critical error.';
    tradeoffSummary = 'Pause top-of-funnel outreach to ensure bottom-of-funnel conversion.';
    cosSummary = 'Halt applications. Dedicate 100% bandwidth to mock interviews.';
    primaryRisk = 'Temporary dip in new application volume.';
  } else if (totalEffort > 15) {
    decisionType = 'DELEGATE';
    reasoning = 'Resume tailoring and cover letters are consuming too much time.';
    expectedBenefit = 'Increases top-of-funnel application volume.';
    opportunityCost = 'Slightly less personalized initial outreach.';
    recommendedAction = 'Automate ATS formatting and use AI for cover letters.';
    whyThisDecision = 'Manual tailoring is a bottleneck. You must increase your application velocity.';
    whyNotOtherActions = 'Spending hours on one application statistically lowers your overall offer probability.';
    tradeoffSummary = 'Trade extreme personalization for higher application volume.';
    cosSummary = 'Improve ATS efficiency. Stop over-indexing on single applications.';
    primaryRisk = 'Slightly lower response rate per application, but higher overall absolute responses.';
  } else {
    decisionType = 'CONTINUE';
    reasoning = 'Recruiter pipeline and application cadence are healthy.';
    expectedBenefit = 'Steady flow of inbound interview requests.';
    opportunityCost = 'Requires ongoing daily networking effort.';
    recommendedAction = 'Strengthen portfolio and reach out to warm connections.';
    whyThisDecision = 'Consistency in the job hunt yields compounding networking returns.';
    whyNotOtherActions = 'Changing strategy now interrupts a working funnel.';
    tradeoffSummary = 'Maintain daily outreach to ensure a full interview calendar.';
    cosSummary = 'Pipeline is stable. Maintain current networking cadence.';
    primaryRisk = 'Market macro-economic shifts.';
  }
  return { decisionType, reasoning, expectedBenefit, opportunityCost, recommendedAction, whyThisDecision, whyNotOtherActions, tradeoffSummary, cosSummary, primaryRisk };
}

function corpLogic(task: Task, allTasks: Task[]) {
  const { daysRemaining, totalEffort } = getBaseMetrics(task, allTasks);
  
  let decisionType: any = 'CONTINUE';
  let reasoning = '', expectedBenefit = '', opportunityCost = '', recommendedAction = '', whyThisDecision = '', whyNotOtherActions = '', tradeoffSummary = '', cosSummary = '', primaryRisk = '';

  if (task.status === 'completed') {
    decisionType = 'CONTINUE';
    reasoning = 'SLA fulfilled and deliverables formally signed off.';
    expectedBenefit = 'Protects revenue and maintains client trust.';
    opportunityCost = 'None.';
    recommendedAction = 'Archive initiative and reallocate resources.';
    whyThisDecision = 'The operational milestone is officially closed.';
    whyNotOtherActions = 'No further resource expenditure is justified.';
    tradeoffSummary = 'Objective achieved with zero outstanding liabilities.';
    cosSummary = 'Deliverable closed. Reallocate operational bandwidth.';
    primaryRisk = 'None.';
  } else if (daysRemaining <= 2) {
    decisionType = 'ACCELERATE';
    reasoning = 'Imminent risk of SLA breach and client escalation.';
    expectedBenefit = 'Protects critical deliverables and mitigates revenue risk.';
    opportunityCost = 'Requires pulling resources from long-term strategic projects.';
    recommendedAction = 'Escalate blockers and realign immediate priorities.';
    whyThisDecision = 'SLA compliance is paramount. Missing this milestone damages core operations.';
    whyNotOtherActions = 'Allowing a breach to occur while working on non-critical tasks is a fireable offense.';
    tradeoffSummary = 'Sacrifice long-term R&D to protect immediate operational delivery.';
    cosSummary = 'Red alert. Swarm this deliverable to prevent SLA breach.';
    primaryRisk = 'Team burnout due to emergency resource reallocation.';
  } else if (totalEffort > 20) {
    decisionType = 'DELEGATE';
    reasoning = 'Operational capacity is maxed out. Risk of bottleneck.';
    expectedBenefit = 'Distributes the load and reduces single-point-of-failure risk.';
    opportunityCost = 'Requires time for knowledge transfer and onboarding.';
    recommendedAction = 'Delegate execution to direct reports or cross-functional teams.';
    whyThisDecision = 'Executive bandwidth should not be spent on granular execution when capacity is strained.';
    whyNotOtherActions = 'Micromanaging this will cause failures across your entire portfolio of responsibilities.';
    tradeoffSummary = 'Trade direct control for scalable operational throughput.';
    cosSummary = 'Escalation probability exceeds tolerance. Delegate two deliverables immediately.';
    primaryRisk = 'Short-term drop in quality control during handoff.';
  } else {
    decisionType = 'CONTINUE';
    reasoning = 'Resource allocation is balanced and SLA compliance is on track.';
    expectedBenefit = 'Predictable delivery without excessive operational stress.';
    opportunityCost = 'Maintains current risk appetite.';
    recommendedAction = 'Monitor execution and protect team from ad-hoc meeting load.';
    whyThisDecision = 'Current operational metrics indicate a healthy delivery trajectory.';
    whyNotOtherActions = 'Over-optimizing a healthy system introduces unnecessary friction.';
    tradeoffSummary = 'Maintain steady execution to ensure predictable quarterly results.';
    cosSummary = 'Operations nominal. Protect team bandwidth from external interruptions.';
    primaryRisk = 'Sudden scope creep from stakeholders.';
  }
  return { decisionType, reasoning, expectedBenefit, opportunityCost, recommendedAction, whyThisDecision, whyNotOtherActions, tradeoffSummary, cosSummary, primaryRisk };
}
