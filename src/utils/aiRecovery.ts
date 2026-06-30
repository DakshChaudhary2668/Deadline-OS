export interface RecoveryStrategy {
  strategyText: string;
  suggestedNewDeadline: string;
  actionItems: string[];
  resourceReallocation: string;
  scopeReduction: string;
  priorityShifts: string;
  riskMitigation: string;
  generatedAt: string;
}

export function getRecoveryStrategy(
  role: string,
  task: any,
  allTasks: any[],
  selectedStrategyName?: string
): RecoveryStrategy {
  const isDev = role === 'developer';
  const isStud = role === 'student';
  const isCareer = role === 'job_seeker';

  // Determine the strategy name automatically if not explicitly provided
  let strategy = selectedStrategyName;
  if (!strategy) {
    if (task.status === 'overdue') {
      strategy = 'Priority Reset';
    } else if (task.estimatedEffort > 15) {
      strategy = 'Resource Reallocation';
    } else if (task.importance === 'Critical' || task.importance === 'High') {
      strategy = 'Emergency Execution Plan';
    } else {
      strategy = 'Scope Reduction';
    }
  }

  // Calculate dynamic deadline shift: suggest 3 days extension from now, formatted to YYYY-MM-DDTHH:mm
  const now = new Date();
  const futureDate = new Date(now.getTime() + 3 * 24 * 3600 * 1000);
  const suggestedNewDeadline = futureDate.toISOString().slice(0, 16);

  // Define strategy text using precise workspace terminology and task details
  let strategyText = '';
  let actionItems: string[] = [];
  let resourceReallocation = '';
  let scopeReduction = '';
  let priorityShifts = '';
  let riskMitigation = '';

  const title = task.title || 'active milestone';

  if (isDev) {
    strategyText = `Triggering immediate ${strategy} protocol to contain sprint delivery threat. We will streamline the development path for "${title}" to secure production stability.`;
    
    resourceReallocation = `Reallocate 12 developer hours from non-blocking tech debt backlogs directly to "${title}".`;
    scopeReduction = `Trimming decorative UI edge-cases and visual polish. Ship core robust functional APIs only.`;
    priorityShifts = `De-prioritize all Q4 exploratory feature spikes and routine administrative team standups.`;
    riskMitigation = `Implement a temporary feature flag to completely isolate the code changes and prevent regression leakage.`;

    if (strategy === 'Priority Reset') {
      actionItems = [
        `Re-prioritize backlog to place "${title}" at the absolute top of active sprint sprint queue.`,
        `Re-assign blocker peer reviewers to expedite pull request validation.`,
        `Run hotfix test suite in pipeline to isolate deployment hurdles.`
      ];
    } else if (strategy === 'Resource Reallocation') {
      actionItems = [
        `Mobilize secondary backend developers to assist on "${title}".`,
        `Establish pair-programming sessions to bypass complex technical blockers.`,
        `Override standard CI/CD deployment locks under senior staff supervision.`
      ];
    } else {
      actionItems = [
        `Deconstruct "${title}" into critical MVP sub-tasks.`,
        `Deploy the core logic to production staging with strict instrumentation.`,
        `Schedule executive stakeholder debrief to re-baseline sprint delivery commitments.`
      ];
    }

  } else if (isStud) {
    strategyText = `Executing cognitive ${strategy} revision plan to address syllabus gap. We will prioritize core learning goals for "${title}" to prevent exam score degradation.`;
    
    resourceReallocation = `Reallocate 8 study hours from minor assignments and non-exam elective homework.`;
    scopeReduction = `Focus exclusively on high-weight grading rubric chapters. Skip non-essential reading list materials.`;
    priorityShifts = `Postpone secondary study group sessions and social extracurricular commitments.`;
    riskMitigation = `Enforce a strict 6-hour sleep block to protect active memory consolidation and combat burnout.`;

    if (strategy === 'Priority Reset') {
      actionItems = [
        `Identify past-paper questions directly associated with "${title}".`,
        `Formulate target concept outlines to consolidate fundamental principles.`,
        `Submit draft revision materials to course advisors for early feedback.`
      ];
    } else if (strategy === 'Resource Reallocation') {
      actionItems = [
        `Divert weekly tutoring focus hours entirely onto "${title}".`,
        `Leverage online exam simulators to highlight lingering conceptual deficits.`,
        `Review high-scoring model answers to understand rubrics.`
      ];
    } else {
      actionItems = [
        `Trim exam prep scope to core tested syllabus models.`,
        `Complete a timed mock exercise on "${title}" under strict test conditions.`,
        `Schedule a quick Q&A session with the teaching assistant.`
      ];
    }

  } else if (isCareer) {
    strategyText = `Activating emergency ${strategy} protocol to restore pipeline conversion. We will accelerate preparations for "${title}" to optimize hiring probability indices.`;
    
    resourceReallocation = `Divert 10 preparation hours from general cold applications to deep interview prep.`;
    scopeReduction = `Limit target company background research to core business metrics and immediate role fitment.`;
    priorityShifts = `Suspend general profile optimization and secondary networking conversations.`;
    riskMitigation = `Schedule an intensive mock interview loop with a peer using industry-standard platforms.`;

    if (strategy === 'Priority Reset') {
      actionItems = [
        `Prioritize "${title}" application steps above standard outbound tracking.`,
        `Conduct an exhaustive audit of resume alignment against key hiring criteria.`,
        `Draft follow-up emails using highly personalized stakeholder hooks.`
      ];
    } else if (strategy === 'Resource Reallocation') {
      actionItems = [
        `Leverage premium mock interview platforms to simulate live panel loops.`,
        `Utilize targeted company research sheets to build interview notes.`,
        `Align preparation hours to focus heavily on behavioral STAR stories.`
      ];
    } else {
      actionItems = [
        `Condense prep materials to core role requirements of "${title}".`,
        `Draft elegant code or system architecture summaries for quick review.`,
        `Establish formal follow-up sequences with the assigned recruiters.`
      ];
    }

  } else {
    // corporate
    strategyText = `Deploying SLA ${strategy} containment sequence to safeguard critical milestones. We will realign operational capacity around "${title}" to mitigate client escalation risk.`;
    
    resourceReallocation = `Reallocate operational bandwidth from long-term Q4 planning directly to "${title}".`;
    scopeReduction = `Deliver robust MVP compliance parameters to halt immediate SLA contractual penalty triggers.`;
    priorityShifts = `De-prioritize routine administrative overhead, non-essential alignment synchups, and internal surveys.`;
    riskMitigation = `Activate pre-vetted external vendor pools to absorb secondary overflow workloads.`;

    if (strategy === 'Priority Reset') {
      actionItems = [
        `Escalate blocker resolution across functional team silos.`,
        `Draft precise client containment communication detailing mitigation milestones.`,
        `Conduct daily emergency triage reviews until "${title}" exits the critical threshold.`
      ];
    } else if (strategy === 'Resource Reallocation') {
      actionItems = [
        `Swarm outstanding deliverables using senior operational staff.`,
        `Re-baseline dependencies to unblock stuck workstreams.`,
        `Provide high-visibility execution telemetry to executive steering committee.`
      ];
    } else {
      actionItems = [
        `Deconstruct "${title}" into strict phase-1 MVP delivery milestones.`,
        `Isolate blocker dependencies and draft immediate workarounds.`,
        `Establish close communication channels with key client sponsors.`
      ];
    }
  }

  return {
    strategyText,
    suggestedNewDeadline,
    actionItems,
    resourceReallocation,
    scopeReduction,
    priorityShifts,
    riskMitigation,
    generatedAt: new Date().toISOString()
  };
}
