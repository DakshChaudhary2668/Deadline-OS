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
      keyObservation = `Merge queue is congested with \${pendingEffort} points of code churn.`;
      riskAssessment = 'High risk of deployment failure.';
      executiveRecommendation = 'Freeze feature scope immediately.';
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = `Deployment cadence is high with \${recentCompleted} PRs merged.`;
      riskAssessment = 'Regression risk is actively mitigated.';
      executiveRecommendation = 'Ship current milestone before refactoring authentication.';
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = 'Architecture stability is nominal.';
      riskAssessment = 'Zero blocked tickets.';
      executiveRecommendation = 'Prepare next sprint backlog.';
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = 'Technical debt is slowing velocity.';
      riskAssessment = 'Moderate build instability risk.';
      executiveRecommendation = 'Resolve dependency graph blockers.';
    }
  } else if (role === 'student') {
    if (pendingEffort > 25) {
      momentumStatus = 'OVERLOADED';
      keyObservation = `Syllabus coverage deficit requires \${pendingEffort} hours to recover.`;
      riskAssessment = 'High risk of memory decay and exam failure.';
      executiveRecommendation = 'Reduce cognitive overload. Skip minor assignments.';
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = `Revision pacing is excellent. \${recentCompleted} concepts mastered.`;
      riskAssessment = 'Retention score is maximizing.';
      executiveRecommendation = 'Complete Organic Chemistry revision before attempting Physics mock tests.';
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = 'Subject coverage is fully up to date.';
      riskAssessment = 'Low risk of cramming.';
      executiveRecommendation = 'Increase retention intervals.';
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = 'Study hours are falling behind the syllabus.';
      riskAssessment = 'Moderate risk of concept gaps.';
      executiveRecommendation = 'Prioritize high-weightage units today.';
    }
  } else if (role === 'job_seeker') {
    if (pendingEffort > 25) {
      momentumStatus = 'OVERLOADED';
      keyObservation = `Interview prep backlog is \${pendingEffort} hours deep.`;
      riskAssessment = 'High risk of burnout and poor interview performance.';
      executiveRecommendation = 'Automate applications. Focus purely on interview readiness.';
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = `Recruiter pipeline is active with \${recentCompleted} recent engagements.`;
      riskAssessment = 'Offer probability is trending upward.';
      executiveRecommendation = 'Resume is ATS ready. Increase recruiter outreach this week.';
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = 'Portfolio completion is 100%.';
      riskAssessment = 'No immediate technical gaps.';
      executiveRecommendation = 'Expand referral network.';
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = 'Application volume is stalling.';
      riskAssessment = 'Risk of pipeline drying up.';
      executiveRecommendation = 'Strengthen portfolio and schedule mock interviews.';
    }
  } else {
    // corporate
    if (pendingEffort > 25) {
      momentumStatus = 'OVERLOADED';
      keyObservation = `Operational bandwidth exceeded by \${pendingEffort} hours.`;
      riskAssessment = 'Critical risk of SLA breach.';
      executiveRecommendation = 'Escalation probability exceeds tolerance. Delegate two deliverables.';
    } else if (recentCompleted > 2) {
      momentumStatus = 'ACCELERATING';
      keyObservation = `Operational efficiency is peaking. \${recentCompleted} SLAs secured.`;
      riskAssessment = 'Delivery confidence is extremely high.';
      executiveRecommendation = 'Realign priorities to capture new revenue opportunities.';
    } else if (pending.length === 0) {
      momentumStatus = 'STABLE';
      keyObservation = 'All client escalations resolved.';
      riskAssessment = 'Zero active delivery risks.';
      executiveRecommendation = 'Reduce operational risk on upcoming renewals.';
    } else {
      momentumStatus = 'DECLINING';
      keyObservation = 'Meeting load is choking resource capacity.';
      riskAssessment = 'Moderate risk of missed deliverables.';
      executiveRecommendation = 'Protect critical deliverables. Block focus time.';
    }
  }

  return { momentumStatus, keyObservation, riskAssessment, executiveRecommendation };
}
