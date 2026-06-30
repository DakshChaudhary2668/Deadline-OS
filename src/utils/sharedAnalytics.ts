import { Task } from '../types';

export interface WorkspaceAnalytics {
  executiveScore: number;
  codebaseStability: number;
  successProbability: number;
  threatIndex: number;
  threatLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  ticketsShipped: number;
  completionVelocity: number;
  recoveryConfidence: number;
  workloadStressLevel: 'Low' | 'Moderate' | 'Optimal' | 'High' | 'Meltdown Risk';
  remainingCapacity: number;
  burnoutIndex: number;
  debtScore: number;
  pendingEffort: number;
  highRiskCount: number;
  overdueCount: number;
  blockedCount: number;
  criticalCount: number;
  estimatedRecoveryTime: number;
  biggestRiskToday: string;
  mostImportantTask: string;
  criticalBottleneck: string;
  recommendedIntervention: string;
  recommendedActions: string[];
  recommendedStrategy: string;
  rootCause: string;
}

export function calculateWorkspaceAnalytics(tasks: Task[], role: string): WorkspaceAnalytics {
  const roleTasks = tasks.filter(t => t.profile === role);
  const completedTasks = roleTasks.filter(t => t.status === 'completed');
  const pendingTasks = roleTasks.filter(t => t.status !== 'completed');
  
  const overdueTasks = pendingTasks.filter(t => t.status === 'overdue');
  const criticalTasks = pendingTasks.filter(t => t.importance === 'Critical' || t.importance === 'High');
  const blockedTasks = pendingTasks.filter(t => 
    t.strategicDecision?.decisionType === 'BLOCKED' || 
    t.title.toLowerCase().includes('block') || 
    t.description.toLowerCase().includes('block')
  );
  
  const highRiskTasks = pendingTasks.filter(t => 
    (t.riskScore !== undefined && t.riskScore >= 70) || 
    (t.failureForecast?.failureProbability !== undefined && t.failureForecast.failureProbability >= 70)
  );

  const totalTasksCount = roleTasks.length;
  const completedTasksCount = completedTasks.length;
  const pendingTasksCount = pendingTasks.length;

  const totalPendingEffort = pendingTasks.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);
  const totalCompletedEffort = completedTasks.reduce((sum, t) => sum + (t.estimatedEffort || 0), 0);

  // 1. Completion Velocity
  const completionVelocity = totalTasksCount === 0 ? 0 : Math.round((completedTasksCount / totalTasksCount) * 100);

  // 2. Threat Index (Failure Risk)
  let threatIndex = 10;
  if (totalTasksCount > 0) {
    const overdueWeight = overdueTasks.length * 15;
    const criticalWeight = criticalTasks.length * 10;
    const blockedWeight = blockedTasks.length * 8;
    const effortWeight = Math.min(25, (totalPendingEffort / 30) * 25);
    const completionWeight = (1 - (completedTasksCount / totalTasksCount)) * 15;
    threatIndex = Math.max(10, Math.min(100, Math.round(overdueWeight + criticalWeight + blockedWeight + effortWeight + completionWeight)));
  }

  // Adjust threat score if active recovery strategy is deployed
  const hasActiveRecovery = roleTasks.some(t => t.recoveryStrategy !== undefined && t.recoveryStrategy !== null);
  if (hasActiveRecovery) {
    threatIndex = Math.max(5, Math.round(threatIndex * 0.5));
  }

  let threatLevel: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';
  if (threatIndex >= 85) threatLevel = 'Critical';
  else if (threatIndex >= 60) threatLevel = 'High';
  else if (threatIndex >= 30) threatLevel = 'Moderate';

  // 3. Success Probability
  let successProbability = 100;
  if (totalTasksCount > 0) {
    const completionRatio = completedTasksCount / totalTasksCount;
    successProbability = Math.round((completionRatio * 50) + 50 - (overdueTasks.length * 12) - (highRiskTasks.length * 6) - (totalPendingEffort > 30 ? 10 : 0));
    successProbability = Math.max(12, Math.min(100, successProbability));
  }

  // 4. Executive Score
  let executiveScore = 100;
  if (totalTasksCount > 0) {
    const completionRatio = completedTasksCount / totalTasksCount;
    executiveScore = Math.round((completionRatio * 60) + 40 - (overdueTasks.length * 8) - (blockedTasks.length * 5) - (criticalTasks.length * 2));
    executiveScore = Math.max(10, Math.min(100, executiveScore));
  }

  // 5. Codebase Stability / Curriculum Health
  let codebaseStability = 100;
  if (totalTasksCount > 0) {
    codebaseStability = Math.round(100 - (overdueTasks.length * 15) - (blockedTasks.length * 10) - (highRiskTasks.length * 5));
    codebaseStability = Math.max(15, Math.min(100, codebaseStability));
  }

  // 6. Recovery Confidence
  const recoveryConfidence = hasActiveRecovery 
    ? Math.min(98, Math.max(75, 100 - threatIndex)) 
    : Math.max(15, Math.min(85, 100 - threatIndex));

  // 7. Workload Stress
  let workloadStressLevel: 'Low' | 'Moderate' | 'Optimal' | 'High' | 'Meltdown Risk' = 'Optimal';
  if (totalPendingEffort > 35) workloadStressLevel = 'Meltdown Risk';
  else if (totalPendingEffort > 25) workloadStressLevel = 'High';
  else if (totalPendingEffort > 15) workloadStressLevel = 'Moderate';
  else if (totalPendingEffort > 5) workloadStressLevel = 'Optimal';
  else workloadStressLevel = 'Low';

  // 8. Remaining Capacity
  const remainingCapacity = Math.max(0, 40 - totalPendingEffort);

  // 9. Burnout Index
  let burnoutIndex = 10;
  if (workloadStressLevel === 'Meltdown Risk') burnoutIndex = 90;
  else if (workloadStressLevel === 'High') burnoutIndex = 75;
  else if (workloadStressLevel === 'Moderate') burnoutIndex = 50;
  else if (workloadStressLevel === 'Optimal') burnoutIndex = 30;
  else burnoutIndex = 10;

  // 10. Debt Score
  const debtScore = Math.max(0, Math.min(100, Math.round((totalPendingEffort / 45) * 100)));

  // Estimated Recovery Time
  const estimatedRecoveryTime = hasActiveRecovery ? Math.round(totalPendingEffort * 0.4) : Math.round(totalPendingEffort * 0.8);

  // --- Dynamic AI Executive Recommendations derived from actual data ---
  const highestPriorityTask = [...pendingTasks].sort((a, b) => (b.priorityScore ?? 0) - (a.priorityScore ?? 0))[0];
  const sortedHighRisk = [...highRiskTasks].sort((a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0));
  
  let biggestRiskToday = "No critical risks active; review upcoming backlog.";
  if (overdueTasks.length > 0) {
    biggestRiskToday = `Overdue task: "${overdueTasks[0].title}" is breaching target timelines.`;
  } else if (sortedHighRisk.length > 0) {
    biggestRiskToday = `High failure risk (${sortedHighRisk[0].riskScore ?? 75}%) detected on "${sortedHighRisk[0].title}".`;
  } else if (criticalTasks.length > 0) {
    biggestRiskToday = `Critical milestone threat on "${criticalTasks[0].title}".`;
  }

  let mostImportantTask = "Backlog clear. Run technical debt diagnostics.";
  if (highestPriorityTask) {
    mostImportantTask = `"${highestPriorityTask.title}" (Priority Score: ${highestPriorityTask.priorityScore ?? 80})`;
  }

  let criticalBottleneck = "Resource allocation within normal operating tolerances.";
  if (blockedTasks.length > 0) {
    criticalBottleneck = `Dependency blockage on: "${blockedTasks[0].title}".`;
  } else if (overdueTasks.length > 0) {
    criticalBottleneck = `Target schedule breached for: "${overdueTasks[0].title}".`;
  } else if (totalPendingEffort > 30) {
    criticalBottleneck = `Capacity constraints with ${totalPendingEffort}h of outstanding work.`;
  }

  let recommendedIntervention = "Pacing is nominal. Maintain scheduled focus.";
  if (overdueTasks.length > 0) {
    recommendedIntervention = `Trigger recovery routine on "${overdueTasks[0].title}" to extend scheduling buffer.`;
  } else if (blockedTasks.length > 0) {
    recommendedIntervention = `De-bottleneck blocked item "${blockedTasks[0].title}" through scope trimming.`;
  } else if (totalPendingEffort > 30) {
    recommendedIntervention = "Prune elective secondary scope to secure core milestone dates.";
  } else if (highestPriorityTask) {
    recommendedIntervention = `Allocate dedicated deep-work blocks to progress "${highestPriorityTask.title}".`;
  }

  // Recommended strategy
  let recommendedStrategy = 'Emergency Execution Plan';
  if (overdueTasks.length > 0) {
    recommendedStrategy = 'Priority Reset';
  } else if (totalPendingEffort > 35) {
    recommendedStrategy = 'Resource Reallocation';
  } else if (blockedTasks.length > 0) {
    recommendedStrategy = 'Risk Containment';
  } else if (completionVelocity > 70) {
    recommendedStrategy = 'Focus Mode';
  }

  // Narrative root cause explanation
  let rootCause = '';
  if (role === 'developer') {
    rootCause = `Based on active sprint metrics, ${criticalTasks.length} critical tickets remain unresolved, and total unresolved effort stands at ${totalPendingEffort} developer-hours before code freeze. Outstanding technical debt is compounding sprint pipeline risks.`;
  } else if (role === 'student') {
    rootCause = `Exam preparation is falling behind nominal margins. ${pendingTasks.length} syllabus revision milestones are pending, totaling ${totalPendingEffort} study-hours, creating preparation compression before active exams.`;
  } else if (role === 'job_seeker') {
    rootCause = `Outreach and application conversion is stalled. ${overdueTasks.length} pipeline follow-up tasks are overdue, and interview preparation is competing with ${pendingTasks.length} application steps, reducing general placement confidence.`;
  } else {
    rootCause = `${criticalTasks.length} critical corporate objectives are currently unaligned, and total outstanding workload stands at ${totalPendingEffort} operational hours. Unresolved stakeholder commitments are threatening SLA execution timelines.`;
  }

  // Recommended actions (list of 3-4 specific strings)
  const recommendedActions: string[] = [];
  if (overdueTasks.length > 0) {
    recommendedActions.push(`Immediately clear the overdue backlog item: "${overdueTasks[0].title}"`);
  }
  if (criticalTasks.length > 0) {
    recommendedActions.push(`Expedite high-priority goal: "${criticalTasks[0].title}"`);
  }
  const otherPendings = pendingTasks.filter(t => !overdueTasks.includes(t) && !criticalTasks.includes(t));
  if (otherPendings.length > 0) {
    recommendedActions.push(`Trim requirements and finalize: "${otherPendings[0].title}"`);
  }
  if (blockedTasks.length > 0) {
    recommendedActions.push(`Bypass blocking dependencies for: "${blockedTasks[0].title}"`);
  }

  if (recommendedActions.length < 3) {
    if (role === 'developer') {
      recommendedActions.push("Verify code coverage and deploy release candidate to production.");
    } else if (role === 'student') {
      recommendedActions.push("Complete a timed mock exam and review the grading rubric.");
    } else if (role === 'job_seeker') {
      recommendedActions.push("Send follow-up emails to recruiters and log placement progression.");
    } else {
      recommendedActions.push("Compile SLA recovery report and deliver executive briefing to stakeholders.");
    }
  }

  return {
    executiveScore,
    codebaseStability,
    successProbability,
    threatIndex,
    threatLevel,
    ticketsShipped: completedTasksCount,
    completionVelocity,
    recoveryConfidence,
    workloadStressLevel,
    remainingCapacity,
    burnoutIndex,
    debtScore,
    pendingEffort: totalPendingEffort,
    highRiskCount: highRiskTasks.length,
    overdueCount: overdueTasks.length,
    blockedCount: blockedTasks.length,
    criticalCount: criticalTasks.length,
    estimatedRecoveryTime,
    biggestRiskToday,
    mostImportantTask,
    criticalBottleneck,
    recommendedIntervention,
    recommendedActions,
    recommendedStrategy,
    rootCause
  };
}
