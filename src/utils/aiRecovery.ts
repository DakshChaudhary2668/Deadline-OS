export function getRecoveryStrategy(role: string) {
  if (role === 'developer') {
    return {
      strategyText: 'Deploy immediate hotfix branch and alert reviewers.',
      suggestedNewDeadline: new Date(Date.now() + 24 * 3600000).toISOString(),
      actionItems: ['Create hotfix branch', 'Revert conflicting commits', 'Trigger CI/CD override'],
      resourceReallocation: 'Pull 2 engineers from technical debt reduction.',
      scopeReduction: 'Drop UI polishing. Ship core logic only.',
      priorityShifts: 'De-prioritize all non-blocking pull requests.',
      riskMitigation: 'Implement temporary feature flag to isolate blast radius.',
      generatedAt: new Date().toISOString()
    };
  } else if (role === 'student') {
    return {
      strategyText: 'Execute cram cycle for core grading rubric.',
      suggestedNewDeadline: new Date(Date.now() + 24 * 3600000).toISOString(),
      actionItems: ['Isolate past paper questions', 'Memorize high-weight formulas', 'Skip elective readings'],
      resourceReallocation: 'Reallocate 4 study hours from minor assignments.',
      scopeReduction: 'Focus exclusively on topics worth >15% of the final grade.',
      priorityShifts: 'De-prioritize all non-exam related coursework.',
      riskMitigation: 'Ensure 6 hours of sleep to prevent absolute memory decay.',
      generatedAt: new Date().toISOString()
    };
  } else if (role === 'job_seeker') {
    return {
      strategyText: 'Activate emergency interview prep protocol.',
      suggestedNewDeadline: new Date(Date.now() + 24 * 3600000).toISOString(),
      actionItems: ['Review Top 50 LeetCode', 'Rehearse STAR behavioral answers', 'Research company financials'],
      resourceReallocation: 'Halt all outbound applications. Focus 100% on prep.',
      scopeReduction: 'Skip deep-dive technical readings. Focus on standard questions.',
      priorityShifts: 'De-prioritize networking calls and resume tweaking.',
      riskMitigation: 'Schedule a mock interview tonight.',
      generatedAt: new Date().toISOString()
    };
  } else {
    // corporate
    return {
      strategyText: 'Initiate SLA breach containment protocol.',
      suggestedNewDeadline: new Date(Date.now() + 24 * 3600000).toISOString(),
      actionItems: ['Draft client escalation email', 'Swarm available capacity', 'Update executive steering committee'],
      resourceReallocation: 'Reallocate operational bandwidth from Q4 planning.',
      scopeReduction: 'Deliver MVP compliance to halt penalty clauses.',
      priorityShifts: 'De-prioritize all internal administrative overhead.',
      riskMitigation: 'Activate secondary vendors to absorb overflow capacity.',
      generatedAt: new Date().toISOString()
    };
  }
}
