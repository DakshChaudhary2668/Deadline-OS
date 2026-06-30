export function calculateBriefing(pending: any[], role: string) {
  let successReason = '';
  let strategicFocusArea = '';

  if (role === 'developer') {
    const storyPoints = pending.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);
    const blockedTickets = pending.filter(t => t.riskScore >= 60).length;
    const velocity = Math.max(10, 100 - (pending.length * 5));
    
    if (storyPoints > 30) {
      successReason = `Sprint load (${storyPoints}h) exceeds capacity. Reduce code churn.`;
      strategicFocusArea = "Delay refactor";
    } else if (blockedTickets > 0 || velocity < 75) {
      successReason = `Regression risk elevated. ${blockedTickets} blocked tickets detected.`;
      strategicFocusArea = "Resolve dependency";
    } else {
      successReason = `Merge stability optimal. Sprint velocity at ${velocity}%.`;
      strategicFocusArea = "Ship MVP";
    }
  } else if (role === 'student') {
    const studyHours = pending.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);
    const weakSubjects = pending.filter(t => t.riskScore >= 60).length;
    const readiness = Math.max(10, 100 - (pending.length * 5));

    if (studyHours > 30) {
      successReason = `Cognitive overload detected (${studyHours} hours scheduled).`;
      strategicFocusArea = "Skip low-weightage topics";
    } else if (weakSubjects > 0 || readiness < 75) {
      successReason = `Memory decay warning on ${weakSubjects} core subjects.`;
      strategicFocusArea = "Revise difficult chapters";
    } else {
      successReason = `Exam readiness is tracking at ${readiness}%. Retention optimal.`;
      strategicFocusArea = "Begin spaced repetition";
    }
  } else if (role === 'job_seeker') {
    const prepHours = pending.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);
    const staleApps = pending.filter(t => t.riskScore >= 60).length;
    const pipelineHealth = Math.max(10, 100 - (pending.length * 5));

    if (prepHours > 30) {
      successReason = `Application volume is bottlenecking interview prep.`;
      strategicFocusArea = "Improve ATS";
    } else if (staleApps > 0 || pipelineHealth < 75) {
      successReason = `Response rate dropping. ${staleApps} applications aging.`;
      strategicFocusArea = "Reach recruiters";
    } else {
      successReason = `Recruiter pipeline healthy (${pipelineHealth}% conversion).`;
      strategicFocusArea = "Practice DSA";
    }
  } else {
    // corporate
    const opHours = pending.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);
    const escalations = pending.filter(t => t.riskScore >= 60).length;
    const compliance = Math.max(10, 100 - (pending.length * 5));

    if (opHours > 30) {
      successReason = `Operational capacity exceeded by ${opHours} hours.`;
      strategicFocusArea = "Delegate";
    } else if (escalations > 0 || compliance < 75) {
      successReason = `Delivery confidence at risk. ${escalations} client escalations active.`;
      strategicFocusArea = "Escalate";
    } else {
      successReason = `SLA compliance is ${compliance}%. Resource allocation nominal.`;
      strategicFocusArea = "Protect critical deliverables";
    }
  }

  return { successReason, strategicFocusArea };
}

export function calculateMomentum(pending: any[], completed: any[], role: string) {
  let momentumStatus = 'STABLE';
  let keyObservation = '';
  let riskAssessment = '';
  let executiveRecommendation = '';

  const pendingEffort = pending.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);
  const recentCompleted = completed.length;

  if (role === 'developer') {
    if (pendingEffort > 25) {
      momentumStatus = 'OVERLOADED';
      keyObservation = `Merge queue is congested with ${pendingEffort} points of code churn.`;
      riskAssessment = 'High risk of deployment failure and broken CI/CD pipelines.';
      executiveRecommendation = 'Freeze feature scope immediately and halt new feature branches.';
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = `Deployment cadence is high with ${recentCompleted} PRs merged successfully.`;
      riskAssessment = 'Regression risk is actively mitigated with strong test coverage.';
      executiveRecommendation = 'Ship current release candidate milestone before refactoring auth logic.';
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = 'Architecture stability and master branch integration are nominal.';
      riskAssessment = 'Zero blocked tickets or critical dependency halts.';
      executiveRecommendation = 'Prepare next sprint backlog and run technical debt diagnostics.';
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = 'Technical debt and unresolved blockers are dragging down velocity.';
      riskAssessment = 'Moderate risk of build instability and delayed code freeze.';
      executiveRecommendation = 'Resolve outstanding dependency graph blockers in core modules.';
    }
  } else if (role === 'student') {
    if (pendingEffort > 25) {
      momentumStatus = 'OVERLOADED';
      keyObservation = `Syllabus coverage deficit is massive, requiring ${pendingEffort} hours to recover.`;
      riskAssessment = 'High risk of cognitive overload, poor retention, and exam failure.';
      executiveRecommendation = 'Reduce cognitive load immediately. Skip minor assignments to focus on heavily weighted finals.';
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = `Revision pacing is exceptional, with ${recentCompleted} key concepts mastered.`;
      riskAssessment = 'Retention score and conceptual memory are maximizing.';
      executiveRecommendation = 'Complete Organic Chemistry syllabus revision before attempting comprehensive Physics mock exams.';
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = 'Subject revision intervals are fully synchronized with the syllabus timeline.';
      riskAssessment = 'Low risk of concept gaps or last-minute academic cramming.';
      executiveRecommendation = 'Increase retention intervals and engage in active recall sessions.';
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = 'Study hours and subject revision are falling behind the curriculum plan.';
      riskAssessment = 'Moderate risk of memory decay on previously studied chapters.';
      executiveRecommendation = 'Prioritize high-weightage chapters and schedule spaced repetition blocks.';
    }
  } else if (role === 'job_seeker') {
    if (pendingEffort > 25) {
      momentumStatus = 'OVERLOADED';
      keyObservation = `Interview preparation backlog is critically deep at ${pendingEffort} hours.`;
      riskAssessment = 'High risk of interview burnout, poor behaviorals, and pipeline drop-off.';
      executiveRecommendation = 'Automate applications. Shift 100% bandwidth to mock interviews and STAR method prep.';
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = `Interview pipeline is highly active with ${recentCompleted} recruiter engagements.`;
      riskAssessment = 'Offer probability and funnel conversion rates are trending upward.';
      executiveRecommendation = 'Resume is ATS optimized. Increase personalized recruiter outreach this week.';
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = 'Portfolio completion and core technical profiles are 100% finalized.';
      riskAssessment = 'Zero immediate skill gaps or outbound application blockages.';
      executiveRecommendation = 'Expand warm referral network and touch base with existing pipeline connections.';
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = 'Outbound application volume and recruiter follow-ups are stalling.';
      riskAssessment = 'High risk of active interview pipeline drying up entirely.';
      executiveRecommendation = 'Strengthen GitHub portfolio and schedule daily mock behavioral screens.';
    }
  } else {
    // corporate
    if (pendingEffort > 25) {
      momentumStatus = 'OVERLOADED';
      keyObservation = `Operational capacity is severely exceeded by ${pendingEffort} hours.`;
      riskAssessment = 'Critical risk of contractual SLA breaches and client escalations.';
      executiveRecommendation = 'Escalation probability exceeds tolerance. Delegate or defer two secondary deliverables.';
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = `Operational efficiency is peaking with ${recentCompleted} SLA deliverables secured.`;
      riskAssessment = 'Delivery confidence is extremely high with healthy stakeholder sentiment.';
      executiveRecommendation = 'Realign team capacity to capture expansion revenue opportunities.';
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = 'All client escalations are successfully resolved. Bandwidth is nominal.';
      riskAssessment = 'Zero active delivery or compliance risks in the operational queue.';
      executiveRecommendation = 'Conduct pro-active risk modeling on upcoming quarterly renewals.';
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = 'Ad-hoc meeting load and administrative overhead are choking resource capacity.';
      riskAssessment = 'Moderate risk of missed deadlines and operational friction.';
      executiveRecommendation = 'Protect critical deliverables by blocking focused execution slots and limiting syncs.';
    }
  }

  return { momentumStatus, keyObservation, riskAssessment, executiveRecommendation };
}
