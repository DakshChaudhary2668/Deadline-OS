import { Task } from '../types';

export function calculateStrategicDecision(task: Task, allTasks: Task[], role?: string): NonNullable<Task['strategicDecision']> {
  const now = Date.now();
  const deadlineTime = new Date(task.deadline).getTime();
  const msRemaining = deadlineTime - now;
  const daysRemaining = msRemaining / (1000 * 60 * 60 * 24);

  const priority = task.priorityScore ?? (
    task.importance === 'Critical' ? 90 :
    task.importance === 'High' ? 70 :
    task.importance === 'Medium' ? 45 : 20
  );

  const importanceVal = task.importance === 'Critical' ? 100 :
                        task.importance === 'High' ? 75 :
                        task.importance === 'Medium' ? 50 : 25;

  const failProb = task.failureForecast?.failureProbability ?? (
    daysRemaining <= 0 ? 100 :
    Math.min(95, Math.max(5, Math.round((task.estimatedEffort / Math.max(0.5, daysRemaining)) * 15 + (100 - priority) * 0.2)))
  );

  let alignment: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  if (task.importance === 'Critical') alignment = 'CRITICAL';
  else if (task.importance === 'High') alignment = 'HIGH';
  else if (task.importance === 'Medium') alignment = 'MEDIUM';

  const categoryScore = task.category === 'Work' ? 100 :
                        task.category === 'Study' ? 90 :
                        task.category === 'Career' ? 75 : 40;

  const strategicVal = Math.round((importanceVal * 0.6) + (categoryScore * 0.4));

  const effortPenalty = Math.min(40, task.estimatedEffort * 2.5);
  const deadlinePenalty = daysRemaining <= 0 ? 100 : Math.max(0, 50 - daysRemaining * 8);
  const feasibility = Math.max(5, Math.min(98, Math.round(100 - effortPenalty - deadlinePenalty)));

  const pending = allTasks.filter(t => t.status !== 'completed');
  const congestionIndex = Math.min(100, Math.round((pending.length * 5) + (pending.reduce((sum, t) => sum + t.estimatedEffort, 0) * 0.8)));

  let score = Math.round(
    (priority * 0.2) + 
    (importanceVal * 0.15) + 
    (strategicVal * 0.2) + 
    (feasibility * 0.15) + 
    ((100 - failProb) * 0.15) + 
    ((100 - congestionIndex) * 0.15)
  );
  score = Math.max(10, Math.min(98, score));

  if (task.status === 'completed') score = 100;

  let decisionType: Task['strategicDecision']['decisionType'] = 'CONTINUE';
  let reasoning = '';
  let expectedBenefit = '';
  let opportunityCost = '';
  let recommendedAction = '';
  let whyThisDecision = '';
  let whyNotOtherActions = '';
  let tradeoffSummary = '';
  let cosSummary = '';
  let primaryRisk = '';

  const titleLower = task.title.toLowerCase();
  const descLower = (task.description || '').toLowerCase();
  const isBlocked = titleLower.includes('blocked') || descLower.includes('blocked') || titleLower.includes('depend') || descLower.includes('depends') || descLower.includes('waiting');

  if (task.status === 'completed') {
    decisionType = 'CONTINUE';
    reasoning = 'This objective is fully completed.';
    expectedBenefit = 'Frees up active attention and clears workspace constraints.';
    opportunityCost = 'None.';
    recommendedAction = 'Verify and log the successful delivery.';
    whyThisDecision = 'This objective has been successfully resolved.';
    whyNotOtherActions = 'No further strategic interventions required.';
    tradeoffSummary = 'Work completed with zero remaining schedule overhead.';
    cosSummary = 'Objective completed. No operational actions needed.';
    primaryRisk = 'None.';
  } else if (isBlocked) {
    decisionType = 'BLOCKED';
    reasoning = 'Blocked by an external dependency.';
    expectedBenefit = 'Saves time by pausing work until the blocker is resolved.';
    opportunityCost = 'Less time available once unblocked.';
    recommendedAction = 'Contact stakeholders to resolve the blocker.';
    whyThisDecision = 'This task is blocked by another project. Working on it now would be inefficient.';
    whyNotOtherActions = 'We cannot speed up or focus on a task that is blocked. Dropping it is not recommended as it remains valuable.';
    tradeoffSummary = 'Saves immediate focus but might delay the final delivery.';
    cosSummary = 'This task is paused to keep focus on other active work.';
    primaryRisk = 'Risk of further dependency delays.';
  } else if (task.status === 'overdue' || (daysRemaining > 0 && daysRemaining <= 1 && task.importance !== 'Low')) {
    decisionType = 'ACCELERATE';
    reasoning = 'The close deadline requires immediate focus to complete on time.';
    expectedBenefit = 'Prevents missing the deadline and secures this important task.';
    opportunityCost = 'Requires postponing other less urgent tasks.';
    recommendedAction = 'Schedule a focused block today to finish this task.';
    whyThisDecision = `The risk of missing this deadline is ${failProb}%. With only ${daysRemaining.toFixed(1)} days left and ${task.estimatedEffort} hours of work remaining, this task needs immediate attention.`;
    whyNotOtherActions = 'Delaying or dropping this is not an option because it is too important. Continuing at normal speed would risk missing the deadline.';
    tradeoffSummary = 'Requires prioritizing this task now to avoid missing the deadline.';
    cosSummary = 'This task should be completed immediately because delaying it increases the risk of missing the deadline.';
    primaryRisk = 'Rushing to meet the deadline.';
  } else if (priority >= 75 && task.estimatedEffort <= 4 && daysRemaining > 0 && daysRemaining <= 3) {
    decisionType = 'FOCUS';
    reasoning = 'This is an important task that can be finished quickly.';
    expectedBenefit = 'Finishing this quickly clears your list and builds momentum.';
    opportunityCost = 'Slightly delays larger tasks.';
    recommendedAction = 'Focus on this task during your next work block.';
    whyThisDecision = `This is a high-priority task that requires only ${task.estimatedEffort} hours. Finishing it now is highly efficient.`;
    whyNotOtherActions = 'We cannot delay this due to the deadline. Delegating is not recommended because you have the best context to finish it.';
    tradeoffSummary = 'Focuses effort on one small task to get it done quickly.';
    cosSummary = 'Spend a brief, focused window to finish this quick task.';
    primaryRisk = 'Slightly less time for larger projects.';
  } else if (importanceVal <= 30 && task.estimatedEffort >= 15 && congestionIndex >= 60) {
    decisionType = 'DROP';
    reasoning = 'This is a complex, lower-priority task during a busy period.';
    expectedBenefit = 'Immediately frees up valuable time to focus on more critical tasks.';
    opportunityCost = 'Losing the long-term benefit of this task.';
    recommendedAction = 'Archive this task to keep your list clean.';
    whyThisDecision = `This task requires ${task.estimatedEffort} hours of work for a low-priority goal while your workspace is already busy.`;
    whyNotOtherActions = 'Focusing on this would take time away from more critical tasks. Continuing is not recommended due to high workload.';
    tradeoffSummary = 'Frees up over 15 hours of work by removing a non-critical task.';
    cosSummary = 'Drop this high-effort, low-priority task to protect your schedule.';
    primaryRisk = 'Missing out on secondary learning or research.';
  } else if (importanceVal <= 30 && daysRemaining > 4 && congestionIndex >= 50) {
    decisionType = 'DEFER';
    reasoning = 'This is a lower-priority task with a distant deadline, so it can be postponed.';
    expectedBenefit = 'Reduces the number of active tasks so you can focus better.';
    opportunityCost = 'Leaves less time to finish it later.';
    recommendedAction = 'Reschedule this for next week when your workload clears.';
    whyThisDecision = `This task can be safely delayed since it has ${daysRemaining.toFixed(1)} days left and other tasks are more urgent.`;
    whyNotOtherActions = 'There is no rush to accelerate this task. Dropping it is not needed as it still has value.';
    tradeoffSummary = 'Reduces current workload but leaves less time for it later.';
    cosSummary = 'Delay this task to preserve focus for critical work.';
    primaryRisk = 'Minor delay in completing non-essential tasks.';
  } else if (task.estimatedEffort >= 10 && daysRemaining <= 5 && priority >= 50) {
    decisionType = 'SCOPE REDUCE';
    reasoning = 'This is a complex task close to its deadline, so reducing scope is recommended.';
    expectedBenefit = 'Ensures the most important parts are completed on time.';
    opportunityCost = 'Postpones extra features or polish.';
    recommendedAction = 'Simplify the requirements and focus only on the essentials.';
    whyThisDecision = `Remaining effort (${task.estimatedEffort} hours) is too high given the remaining deadline.`;
    whyNotOtherActions = 'We cannot drop this because the task is valuable. Continuing at full scope is unlikely to succeed on time.';
    tradeoffSummary = 'Reduce non-essential work so the most important parts are completed on time.';
    cosSummary = 'Reduce the scope slightly to guarantee meeting the deadline.';
    primaryRisk = 'Slightly less polish or fewer features at first.';
  } else if (task.category === 'Work' && priority <= 50 && task.estimatedEffort >= 4) {
    decisionType = 'DELEGATE';
    reasoning = 'This is a standard task that can be shared or delegated.';
    expectedBenefit = 'Delegating this saves you time to focus on your core priorities.';
    opportunityCost = 'Requires a short handoff or explanation.';
    recommendedAction = 'Delegate this task to a teammate or collaborator.';
    whyThisDecision = `This task is suitable for delegation as it does not require your specific expertise.`;
    whyNotOtherActions = 'We cannot drop this as it is required. Focusing on it yourself would take time away from more critical decisions.';
    tradeoffSummary = 'Frees up your time but requires a brief review later.';
    cosSummary = 'Delegate this standard task to free up your personal focus.';
    primaryRisk = 'May require a quick review of the delegated work.';
  } else if (task.estimatedEffort >= 12 && daysRemaining > 7 && priority <= 60) {
    decisionType = 'REPLAN';
    reasoning = 'This is a large project that should be broken down into smaller steps.';
    expectedBenefit = 'Breaking it down makes it much easier to track and complete.';
    opportunityCost = 'Takes a little planning time up front.';
    recommendedAction = 'Split this task into smaller, manageable sub-tasks.';
    whyThisDecision = `This large task (${task.estimatedEffort} hours) needs a clear step-by-step plan so it does not drift.`;
    whyNotOtherActions = 'Continuing without a plan makes it hard to track progress and can lead to delays.';
    tradeoffSummary = 'Spending time planning now avoids rush and confusion later.';
    cosSummary = 'Break the task down into smaller parts to stay on track.';
    primaryRisk = 'Requires updating your list with the new sub-tasks.';
  } else if (task.estimatedEffort <= 2 && priority >= 50) {
    decisionType = 'REVIEW';
    reasoning = 'This is a quick review or admin task that should be done now.';
    expectedBenefit = 'Completing this review unblocks other related work.';
    opportunityCost = 'Requires a brief interruption.';
    recommendedAction = 'Complete this quick review between your main focus blocks.';
    whyThisDecision = `This is a quick review (${task.estimatedEffort} hours) that keeps things moving.`;
    whyNotOtherActions = 'Delaying this review would slow down related tasks.';
    tradeoffSummary = 'A quick interruption is worth it to keep the project moving.';
    cosSummary = 'Complete this review now to avoid project delays.';
    primaryRisk = 'A brief break in focus.';
  } else {
    decisionType = 'CONTINUE';
    reasoning = 'This task is on track with a healthy timeline.';
    expectedBenefit = 'Keep working at your current pace.';
    opportunityCost = 'None. Your current pace is fully optimized.';
    recommendedAction = 'Continue working on this task as scheduled.';
    whyThisDecision = `With a healthy timeline of ${daysRemaining.toFixed(1)} days and ${task.estimatedEffort} hours of work, everything is on track.`;
    whyNotOtherActions = 'No special intervention is needed. Normal pacing will get this done on time.';
    tradeoffSummary = 'Steady, balanced progress is the best approach.';
    cosSummary = 'On track. No adjustments needed.';
    primaryRisk = 'Risk of falling behind if pace slows.';
  }

  // --- Dynamic Role Adaptation Overrides ---
  if (role === 'student') {
    if (decisionType === 'ACCELERATE') {
      reasoning = 'The impending exam or assignment deadline requires immediate study block allocation.';
      expectedBenefit = 'Ensures full Exam Readiness and comprehension of core curriculum.';
      opportunityCost = 'Postpones minor review of other elective subjects.';
      recommendedAction = 'Schedule a deep study block immediately to complete this revision.';
      whyThisDecision = `Your exam risk for this subject is ${failProb}%. With only ${daysRemaining.toFixed(1)} days remaining and ${task.estimatedEffort} study hours left, this requires your immediate academic focus to secure Exam Readiness.`;
      whyNotOtherActions = 'Delaying this is not feasible because of the grade weight. Normal pacing is too slow to cover the material before test time.';
      tradeoffSummary = 'Sacrifice minor tasks to guarantee a top grade on this core paper and secure Exam Readiness.';
      cosSummary = 'This study topic is in critical status. Allocate immediate revision hours to cover essential concepts and secure Exam Readiness.';
      primaryRisk = 'Cramming under extreme temporal constraints.';
    } else if (decisionType === 'FOCUS') {
      reasoning = 'This is an important assignment that can be quickly wrapped up.';
      expectedBenefit = 'Finishing this unblocks your schedule for main exam preparation, boosting Exam Readiness.';
      opportunityCost = 'Slightly delays reading other textbook chapters.';
      recommendedAction = 'Dedicate your next focused study session to this homework.';
      whyThisDecision = `This is a high-priority topic requiring only ${task.estimatedEffort} study hours. Closing it now builds academic momentum and Exam Readiness.`;
      whyNotOtherActions = 'Delaying risks overlapping with final exam revisions. Peer study group delegation is not recommended for this personal grade metric.';
      tradeoffSummary = 'Knock out this quick assignment to clear bandwidth for large exams and secure Exam Readiness.';
      cosSummary = 'Invest a quick, single-minded revision session to finish this topic and elevate Exam Readiness.';
      primaryRisk = 'Minor disruption to the macro-study schedule.';
    } else if (decisionType === 'DROP') {
      reasoning = 'This non-critical research topic requires too much study time during high pressure.';
      expectedBenefit = 'Frees up significant revision hours for core exam topics, safeguarding Exam Readiness.';
      opportunityCost = 'Losing deep secondary learning on elective material.';
      recommendedAction = 'Archive or postpone this topic to protect your main grades.';
      whyThisDecision = `This topic requires ${task.estimatedEffort} study hours for low grade weight while your study schedule is fully congested. Drop it to protect overall Exam Readiness.`;
      whyNotOtherActions = 'Trying to cover everything will compromise your primary exam performance. Drop this to secure core subjects.';
      tradeoffSummary = 'Drop a high-effort elective topic to guarantee scoring on main curriculum topics and protect Exam Readiness.';
      cosSummary = 'Prune this high-effort, low-weight study topic to prioritize your final grades and overall Exam Readiness.';
      primaryRisk = 'Missing secondary syllabus questions.';
    } else if (decisionType === 'DEFER') {
      reasoning = 'This is a lower-importance study task with a distant deadline.';
      expectedBenefit = 'Lowers current cognitive load so you can focus on immediate tests to maximize Exam Readiness.';
      opportunityCost = 'Slightly reduces revision runway later.';
      recommendedAction = 'Postpone this study block to next week after major exams.';
      whyThisDecision = `This subject has a comfortable ${daysRemaining.toFixed(1)} days runway and other topics are more critical for Exam Readiness.`;
      whyNotOtherActions = 'No rush to start this early. Focus on immediate grade threats first to secure Exam Readiness.';
      tradeoffSummary = 'Defer this assignment to secure study hours for immediate tests and lock in Exam Readiness.';
      cosSummary = 'Postpone this lower-priority topic to safeguard focus on high-weight deadlines and protect Exam Readiness.';
      primaryRisk = 'Compressing study window in subsequent weeks.';
    } else if (decisionType === 'SCOPE REDUCE') {
      reasoning = 'This complex assignment has a high workload near the deadline.';
      expectedBenefit = 'Guarantees submitting the core requirements on time, securing minimum Exam Readiness.';
      opportunityCost = 'Sacrifices extra polish, optional bibliography, or extensive formatting.';
      recommendedAction = 'Focus strictly on the rubric requirements and essential rubric points.';
      whyThisDecision = `Estimated effort (${task.estimatedEffort} hours) is too high given the short study runway left to protect Exam Readiness.`;
      whyNotOtherActions = 'Continuing at full depth will result in an incomplete submission. Dropping is not an option.';
      tradeoffSummary = 'Prune optional research depth to secure a solid submission on time and protect Exam Readiness.';
      cosSummary = 'Compress scope to focus on core syllabus requirements, avoid grade penalties, and safeguard Exam Readiness.';
      primaryRisk = 'Slightly less comprehensive assignment depth.';
    } else if (decisionType === 'REPLAN') {
      reasoning = 'This is a massive study project or research paper that needs structuring.';
      expectedBenefit = 'Breaking it down into daily milestones prevents panic and cramming, ensuring high Exam Readiness.';
      opportunityCost = 'Requires spending immediate planning time.';
      recommendedAction = 'Deconstruct this massive topic into bite-sized daily revision blocks.';
      whyThisDecision = `This large subject (${task.estimatedEffort} hours) needs a structured revision plan to avoid exam-week panic and secure Exam Readiness.`;
      whyNotOtherActions = 'Studying a massive block without sub-milestones leads to poor retention and low stress.';
      tradeoffSummary = 'Spend 15 minutes planning sub-milestones now to save hours of stress and ensure Exam Readiness.';
      cosSummary = 'Break this massive study block down into structured, digestible micro-lessons to elevate Exam Readiness.';
      primaryRisk = 'Requires diligent management of multiple daily study notes.';
    } else if (decisionType === 'REVIEW') {
      reasoning = 'This is a quick textbook self-test or proofreading checkpoint.';
      expectedBenefit = 'Confirming your mastery unblocks deeper subject application, boosting Exam Readiness.';
      opportunityCost = 'A brief pause in continuous reading.';
      recommendedAction = 'Complete this self-assessment quiz between main study blocks.';
      whyThisDecision = `This is a quick review (${task.estimatedEffort} hours) to verify your conceptual understanding and secure Exam Readiness.`;
      whyNotOtherActions = 'Pushing forward without self-testing risks carrying unaddressed knowledge gaps.';
      tradeoffSummary = 'Briefly pause reading to quiz yourself, verify comprehension, and safeguard Exam Readiness.';
      cosSummary = 'Run a quick self-test to verify retention before moving to new syllabus modules to confirm Exam Readiness.';
      primaryRisk = 'Temporary break in focus flow.';
    } else if (decisionType === 'BLOCKED') {
      reasoning = 'You are blocked waiting for grades, assignment rubrics, or professor feedback.';
      expectedBenefit = 'Prevents wasting hours on incorrect assumptions, saving cognitive bandwidth for Exam Readiness.';
      opportunityCost = 'Delays progress on this topic once the blocker clears.';
      recommendedAction = 'Reach out to your instructor or TA immediately to clarify.';
      whyThisDecision = 'This study task cannot proceed without feedback or necessary guidelines. Pause to protect Exam Readiness.';
      whyNotOtherActions = 'Working blindly risks wasting hours on off-syllabus material. Postpone until clarified.';
      tradeoffSummary = 'Pause work here to focus on active, clear assignments to secure overall Exam Readiness.';
      cosSummary = 'This topic is temporarily paused waiting for syllabus or professor clarification to protect Exam Readiness.';
      primaryRisk = 'Compressed timeline once clarification is received.';
    } else { // CONTINUE
      reasoning = 'This study goal has a comfortable schedule and healthy pacing.';
      expectedBenefit = 'Maintain steady conceptual assimilation without stress, securing reliable Exam Readiness.';
      opportunityCost = 'None.';
      recommendedAction = 'Continue with your planned daily reading speed.';
      whyThisDecision = `With ${daysRemaining.toFixed(1)} days left and ${task.estimatedEffort} study hours, your pacing is perfectly on track for reliable Exam Readiness.`;
      whyNotOtherActions = 'No emergency interventions or cramming required. Normal progress is highly effective.';
      tradeoffSummary = 'Consistent, daily review is the best pathway to top marks and secure Exam Readiness.';
      cosSummary = 'Pacing is nominal. Maintain steady daily study slots to secure the grade and your Exam Readiness.';
      primaryRisk = 'Risk of falling behind if study blocks are skipped.';
    }
  } else if (role === 'developer') {
    if (decisionType === 'ACCELERATE') {
      reasoning = 'Impending sprint deadline or overdue ticket requires immediate implementation sprint.';
      expectedBenefit = 'Prevents breaking the build and secures core feature delivery before release to safeguard Sprint Velocity.';
      opportunityCost = 'Delays addressing secondary backlog features and technical debt.';
      recommendedAction = 'Schedule an immediate deep dev block to merge the pull request.';
      whyThisDecision = `The delivery risk for this ticket is ${failProb}%. With only ${daysRemaining.toFixed(1)} days left in the sprint and ${task.estimatedEffort} focus hours required, this is a critical delivery path to preserve Sprint Velocity.`;
      whyNotOtherActions = 'Postponing is not option due to production release SLA. Refactoring at normal speed risks missing the code freeze deadline.';
      tradeoffSummary = 'Prioritize deep work on this critical feature to ensure smooth production deployment and maintain Sprint Velocity.';
      cosSummary = 'Critical build path bottleneck detected. Dedicate immediate sprint cycles to resolve implementation and safeguard Sprint Velocity.';
      primaryRisk = 'Rushing implementation leading to regression bugs or testing shortcuts.';
    } else if (decisionType === 'FOCUS') {
      reasoning = 'A critical high-importance issue that can be patched quickly.';
      expectedBenefit = 'Resolves a major issue, keeps Sprint Velocity high, and builds dev momentum.';
      opportunityCost = 'Slightly postpones architectural planning for larger epics.';
      recommendedAction = 'Dedicate your next continuous 3-hour development sprint to this ticket.';
      whyThisDecision = `This is a high-priority ticket requiring only ${task.estimatedEffort} focus hours. Resolving it now keeps the sprint pipeline clear and protects Sprint Velocity.`;
      whyNotOtherActions = 'Delaying risks accumulating blocker debt. Delegating is inefficient as you hold the best implementation context.';
      tradeoffSummary = 'Deploy a quick hotfix now to protect Sprint Velocity and maintain product quality.';
      cosSummary = 'Isolate and resolve this high-importance backlog ticket in a single dev sprint to secure Sprint Velocity.';
      primaryRisk = 'Minor disruption to macro-epic timeline planning.';
    } else if (decisionType === 'DROP') {
      reasoning = 'Low-importance, high-effort issue during an intense sprint window.';
      expectedBenefit = 'Improves Sprint Velocity by removing non-essential scope creep.';
      opportunityCost = 'Losing long-term refactoring benefit or minor aesthetic polish.';
      recommendedAction = 'Move this issue back to the deep backlog or archive it.';
      whyThisDecision = `This issue requires ${task.estimatedEffort} dev hours for a non-critical feature while our active sprint backlog is heavily congested. Drop it to protect Sprint Velocity.`;
      whyNotOtherActions = 'Working on this will compromise primary sprint commitments. Do not waste precious engineering bandwidth.';
      tradeoffSummary = 'Prune non-essential feature scope to secure core product release commitments and protect Sprint Velocity.';
      cosSummary = 'Drop this high-effort, low-value backlog issue to protect sprint delivery schedule and maintain Sprint Velocity.';
      primaryRisk = 'Slight accumulation of secondary technical debt.';
    } else if (decisionType === 'DEFER') {
      reasoning = 'Lower-importance backlog item with comfortable runway.';
      expectedBenefit = 'Offloads developer cognitive burden, allowing focus on immediate release targets and protecting Sprint Velocity.';
      opportunityCost = 'Slightly reduces available sprint hours in the next cycle.';
      recommendedAction = 'Reschedule this ticket for the subsequent sprint planning cycle.';
      whyThisDecision = `This issue has a comfortable ${daysRemaining.toFixed(1)} days runway and other release blockers are far more critical for Sprint Velocity.`;
      whyNotOtherActions = 'There is no strategic value in starting this early. Protect active developer bandwidth.';
      tradeoffSummary = 'Defer non-critical ticket to preserve focus on core sprint targets and maintain Sprint Velocity.';
      cosSummary = 'Postpone this lower-priority backlog item to protect current sprint commitments and preserve Sprint Velocity.';
      primaryRisk = 'Slightly tighter runway for secondary goals next sprint.';
    } else if (decisionType === 'SCOPE REDUCE') {
      reasoning = 'Monolithic technical deliverable close to code freeze.';
      expectedBenefit = 'Guarantees deploying a functional, tested MVP on schedule to protect Sprint Velocity.';
      opportunityCost = 'Postpones secondary features, elaborate UI polish, or extensive logs.';
      recommendedAction = 'Isolate the core functional components and ship as an MVP first.';
      whyThisDecision = `Estimated developer effort (${task.estimatedEffort} hours) is too high given the current sprint timeline. Reduce scope to protect Sprint Velocity.`;
      whyNotOtherActions = 'Attempting full scope will miss the production release window. Dropping is impossible as it is core.';
      tradeoffSummary = 'Prune optional product requirements to secure milestone release and protect Sprint Velocity.';
      cosSummary = 'Trim feature scope immediately to guarantee safe schedule landing before code freeze and maintain Sprint Velocity.';
      primaryRisk = 'Launching with fewer secondary features or user options.';
    } else if (decisionType === 'REPLAN') {
      reasoning = 'Massive monolithic task that risks stalling sprint progress.';
      expectedBenefit = 'Breaking it into atomic tickets enables clearer tracking, team collaboration, and higher Sprint Velocity.';
      opportunityCost = 'Requires brief pause for technical scoping and ticket drafting.';
      recommendedAction = 'Deconstruct this epic into independent, well-defined user stories.';
      whyThisDecision = `This monolithic issue (${task.estimatedEffort} hours) is too large to track reliably without structured sub-tasks. Replan it to maintain Sprint Velocity.`;
      whyNotOtherActions = 'Continuing without split stories leads to untraceable Sprint Velocity and high sprint risk.';
      tradeoffSummary = 'Invest 20 minutes in technical decomposition to save hours of integration issues and safeguard Sprint Velocity.';
      cosSummary = 'Break down this monolithic task into structured sub-milestones with clear boundaries to preserve Sprint Velocity.';
      primaryRisk = 'Slightly increases the count of open sprint tickets.';
    } else if (decisionType === 'REVIEW') {
      reasoning = 'Immediate code review, pull request audit, or QA checkpoint.';
      expectedBenefit = 'Unblocks other developers and ensures code quality before merging, maintaining high Sprint Velocity.';
      opportunityCost = 'Briefly interrupts active development focus.';
      recommendedAction = 'Execute this pull request review between main coding blocks.';
      whyThisDecision = `This is a quick PR audit (${task.estimatedEffort} hours) that keeps the engineering pipeline moving and secures Sprint Velocity.`;
      whyNotOtherActions = 'Delaying this audit blocks team members and stalls development pipelines.';
      tradeoffSummary = 'A brief pause to audit code keeps the entire team unblocked, moving, and secures Sprint Velocity.';
      cosSummary = 'Run an immediate code review or pipeline checkpoint to unblock downstream integration and preserve Sprint Velocity.';
      primaryRisk = 'Minor disruption to developer focus flow.';
    } else if (decisionType === 'BLOCKED') {
      reasoning = 'Active blockage due to API downtime, server issues, or pending specs.';
      expectedBenefit = 'Prevents wasting developer hours spinning wheels on a blocked path, preserving Sprint Velocity.';
      opportunityCost = 'Compresses final implementation window once unblocked.';
      recommendedAction = 'Escalate the blocker with external teams or system administrators.';
      whyThisDecision = 'This ticket cannot proceed due to external dependency blockages. Pause to protect Sprint Velocity.';
      whyNotOtherActions = 'Attempting workarounds is highly inefficient. Pause and focus on active tickets.';
      tradeoffSummary = 'Halt progress here to optimize active sprint cycles elsewhere and safeguard Sprint Velocity.';
      cosSummary = 'This issue is physically blocked by an external dependency. Paused to preserve bandwidth and Sprint Velocity.';
      primaryRisk = 'Risk of sprint spillover if blocker resolution is delayed.';
    } else { // CONTINUE
      reasoning = 'Sprint ticket is well-scoped with stable timeline parameters.';
      expectedBenefit = 'Maintain steady development cadence and stable Sprint Velocity.';
      opportunityCost = 'None.';
      recommendedAction = 'Continue standard implementation following active sprint guidelines.';
      whyThisDecision = `With ${daysRemaining.toFixed(1)} days runway and ${task.estimatedEffort} focus hours, delivery is perfectly on track to secure Sprint Velocity.`;
      whyNotOtherActions = 'No emergency interventions or hotfixes required. Cadence is stable.';
      tradeoffSummary = 'Steady, continuous commits are the safest path to delivery and stable Sprint Velocity.';
      cosSummary = 'Sprint ticket is on track with nominal metrics. Keep coding to preserve Sprint Velocity.';
      primaryRisk = 'Risk of velocity slowdown if dev environments drift.';
    }
  } else if (role === 'job_seeker') {
    if (decisionType === 'ACCELERATE') {
      reasoning = 'An upcoming interview, application deadline, or job offer window requires immediate intensive prep.';
      expectedBenefit = 'Secures the career opportunity and ensures you make a strong impression.';
      opportunityCost = 'Postpones general skill learning or secondary networking outreach.';
      recommendedAction = 'Allocate an immediate intensive preparation block today.';
      whyThisDecision = `The opportunity risk for this goal is ${failProb}%. With only ${daysRemaining.toFixed(1)} days left and ${task.estimatedEffort} hours of prep required, this is a critical career milestone.`;
      whyNotOtherActions = 'This deadline cannot be moved. Delaying prep risks missing the window or failing the interview.';
      tradeoffSummary = 'Prioritize this high-impact application/interview now to secure the role.';
      cosSummary = 'Immediate career milestone prep required. Dedicate maximum near-term energy to secure this position.';
      primaryRisk = 'Rushing preparation under high stress.';
    } else if (decisionType === 'FOCUS') {
      reasoning = 'A critical career task (like tailoring a resume or updating portfolio) that can be completed quickly.';
      expectedBenefit = 'Unblocks your active job pipeline and builds application momentum.';
      opportunityCost = 'Slightly delays general career research or reading.';
      recommendedAction = 'Dedicate your next focused career block to finishing this application material.';
      whyThisDecision = `This high-importance task requires only ${task.estimatedEffort} prep hours. Completing it now keeps your pipeline moving.`;
      whyNotOtherActions = 'Delaying keeps your application stalled. Focus on this yourself as it defines your personal profile.';
      tradeoffSummary = 'Knock out this quick pipeline task to stay fresh and active in recruiter databases.';
      cosSummary = 'Isolate and resolve this critical profile or application update in a single focused session.';
      primaryRisk = 'Minor delay in exploring new roles.';
    } else if (decisionType === 'DROP') {
      reasoning = 'A low-yield job lead or outdated application goal during a busy interview season.';
      expectedBenefit = 'Frees up significant energy to focus on high-probability opportunities.';
      opportunityCost = 'Losing a backup option that has very low strategic alignment.';
      recommendedAction = 'Withdraw or archive this application to protect your focus.';
      whyThisDecision = `This goal requires ${task.estimatedEffort} hours for a low-probability role while your active job hunt is highly congested.`;
      whyNotOtherActions = 'Applying to everything dilutes application quality. Drop this low-yield target to win high-value roles.';
      tradeoffSummary = 'Prune a low-yield job lead to maximize preparation depth for elite targets.';
      cosSummary = 'Drop this high-effort, low-value career goal to safeguard your interview preparation bandwidth.';
      primaryRisk = 'Missing out on a minor backup option.';
    } else if (decisionType === 'DEFER') {
      reasoning = 'A lower-priority networking or skill-building task with a comfortable timeline.';
      expectedBenefit = 'Lowers near-term anxiety, letting you focus on active interview loops.';
      opportunityCost = 'Slightly reduces career networking momentum in the long run.';
      recommendedAction = 'Postpone this goal to next week once active interview rounds conclude.';
      whyThisDecision = `This item has a comfortable ${daysRemaining.toFixed(1)} days runway and active application deadlines are more pressing.`;
      whyNotOtherActions = 'There is no rush to start this networking block. Prioritize immediate interview prep.';
      tradeoffSummary = 'Postpone general outreach to secure prep hours for active recruiter loops.';
      cosSummary = 'Postpone this lower-priority career task to protect active interview preparation.';
      primaryRisk = 'Minor delay in starting long-term networking outreach.';
    } else if (decisionType === 'SCOPE REDUCE') {
      reasoning = 'A complex personal portfolio site or case study close to an interview date.';
      expectedBenefit = 'Ensures recruiters have a functional, polished MVP to review on time.';
      opportunityCost = 'Postpones secondary features, extra projects, or extensive styling.';
      recommendedAction = 'Focus strictly on your 2 best projects and ensure the landing page is polished.';
      whyThisDecision = `Estimated design effort (${task.estimatedEffort} hours) is too high given the scheduled review date.`;
      whyNotOtherActions = 'Attempting full scope will result in a half-finished portfolio. Deliver a clean, simple core.';
      tradeoffSummary = 'Prune optional portfolio details to guarantee a polished, professional presentation.';
      cosSummary = 'Trim portfolio requirements immediately to secure a pristine presentation before the recruiter review.';
      primaryRisk = 'Presenting fewer project samples than initially planned.';
    } else if (decisionType === 'REPLAN') {
      reasoning = 'A large, overwhelming career goal (like changing industry or mastering a framework).';
      expectedBenefit = 'Breaking it into daily milestone steps makes progress manageable and builds confidence.';
      opportunityCost = 'Requires brief pause for career roadmap drafting and scheduling.';
      recommendedAction = 'Deconstruct this massive career transition into bite-sized daily objectives.';
      whyThisDecision = `This massive goal (${task.estimatedEffort} hours) needs a structured career roadmap to track progress effectively.`;
      whyNotOtherActions = 'Tackling an epic goal without sub-milestones leads to quick burnout and career paralysis.';
      tradeoffSummary = 'Spend 30 minutes mapping out action steps to save weeks of directionless searching.';
      cosSummary = 'Break down this major career milestone into structured, daily actionable goals.';
      primaryRisk = 'Requires disciplined daily tracking of career roadmap logs.';
    } else if (decisionType === 'REVIEW') {
      reasoning = 'A quick application review, profile proofreading, or thank-you draft.';
      expectedBenefit = 'Ensures error-free recruiter communication and keeps your pipeline moving.';
      opportunityCost = 'A brief interruption in deep interview preparation.';
      recommendedAction = 'Proofread and send this application between main preparation blocks.';
      whyThisDecision = `This is a quick checkpoint (${task.estimatedEffort} hours) to verify submission quality before sending.`;
      whyNotOtherActions = 'Delaying this review stalls your pipeline and delays recruiter responses.';
      tradeoffSummary = 'A brief pause to proofread communications maintains professional standards.';
      cosSummary = 'Proofread and finalize your career communications to keep recruiter interactions moving.';
      primaryRisk = 'Minor break in focus flow.';
    } else if (decisionType === 'BLOCKED') {
      reasoning = 'Waiting on recruiter feedback, offer details, or background checks.';
      expectedBenefit = 'Prevents wasting hours stressing or over-preparing before details are confirmed.';
      opportunityCost = 'Delays your active application pipeline while waiting.';
      recommendedAction = 'Send a polite, structured follow-up email to the recruiter.';
      whyThisDecision = 'This career milestone cannot proceed until external feedback is received.';
      whyNotOtherActions = 'Guessing interview expectations is inefficient. Wait and focus on other active leads.';
      tradeoffSummary = 'Pause action here to optimize focus on other job hunt channels.';
      cosSummary = 'This opportunity is temporarily paused waiting for recruiter feedback or specifications.';
      primaryRisk = 'Compressed schedule once recruiter confirms the interview.';
    } else { // CONTINUE
      reasoning = 'Career target is well-paced with stable pipeline parameters.';
      expectedBenefit = 'Maintain steady preparation and steady application flow.';
      opportunityCost = 'None.';
      recommendedAction = 'Continue daily career actions following your active job-hunt strategy.';
      whyThisDecision = `With ${daysRemaining.toFixed(1)} days runway and ${task.estimatedEffort} hours of prep, everything is perfectly on track.`;
      whyNotOtherActions = 'No emergency interventions or rush required. Pacing is stable.';
      tradeoffSummary = 'Consistent, daily applications and prep are the surest path to placement.';
      cosSummary = 'Career goal is on track with nominal metrics. Keep pushing forward.';
      primaryRisk = 'Risk of pipeline stagnation if daily applications stall.';
    }
  } else { // professional (Corporate Mode / default)
    if (decisionType === 'ACCELERATE') {
      reasoning = 'An approaching milestone deadline, client deliverable, or board meeting requires immediate executive focus.';
      expectedBenefit = 'Ensures on-time delivery of business objectives and secures client trust.';
      opportunityCost = 'Requires postponing other administrative or non-critical objectives.';
      recommendedAction = 'Schedule a deep focus block today to secure this corporate deliverable.';
      whyThisDecision = `The business risk for this initiative is ${failProb}%. With only ${daysRemaining.toFixed(1)} days left and ${task.estimatedEffort} operational hours required, this is a critical timeline pathway.`;
      whyNotOtherActions = 'We cannot delay or drop this as it is tied to key business metrics. Continuing at normal speed risks missing the SLA deadline.';
      tradeoffSummary = 'Prioritize deep work on this core objective to protect company KPIs.';
      cosSummary = 'Critical initiative timeline at risk. Dedicate immediate executive bandwidth to resolve delivery.';
      primaryRisk = 'Rushing execution leading to quality compromise.';
    } else if (decisionType === 'FOCUS') {
      reasoning = 'A critical high-importance objective that can be resolved quickly.';
      expectedBenefit = 'Clears the executive pipeline and builds corporate momentum.';
      opportunityCost = 'Slightly postpones long-term strategic scoping.';
      recommendedAction = 'Dedicate your next focused execution sprint to resolving this corporate milestone.';
      whyThisDecision = `This is a high-priority task requiring only ${task.estimatedEffort} focus hours. Closing it now is highly efficient.`;
      whyNotOtherActions = 'Delaying risks accumulating operational debt. Delegating is not recommended as you hold the core context.';
      tradeoffSummary = 'Focus effort on this high-value task to keep key results moving.';
      cosSummary = 'Isolate and resolve this key objective in a single focused business session.';
      primaryRisk = 'Minor delay in exploring long-term initiatives.';
    } else if (decisionType === 'DROP') {
      reasoning = 'A low-yield, high-effort administrative or secondary task during intense operations.';
      expectedBenefit = 'Immediately frees up valuable focus to secure critical, high-impact deliverables.';
      opportunityCost = 'Losing backup options with low strategic alignment.';
      recommendedAction = 'Formally drop or archive this objective to protect core corporate schedules.';
      whyThisDecision = `This initiative requires ${task.estimatedEffort} hours for a low-impact goal while your active schedule is highly congested.`;
      whyNotOtherActions = 'Chasing minor initiatives dilutes focus. Drop this low-impact objective to protect critical metrics.';
      tradeoffSummary = 'Prune a low-yield project to maximize execution quality for core business targets.';
      cosSummary = 'Drop this high-effort, low-priority corporate task to safeguard strategic operations.';
      primaryRisk = 'Slight loss of minor secondary data or reports.';
    } else if (decisionType === 'DEFER') {
      reasoning = 'A lower-priority administrative or backburner task with a comfortable runway.';
      expectedBenefit = 'Lowers immediate operational stress, allowing focus on active deliverables.';
      opportunityCost = 'Slightly reduces execution runway in later quarters.';
      recommendedAction = 'Reschedule this milestone for the next reporting cycle.';
      whyThisDecision = `This milestone has a comfortable ${daysRemaining.toFixed(1)} days runway and other business deliverables are far more urgent.`;
      whyNotOtherActions = 'There is no strategic value in starting this early. Protect active corporate bandwidth.';
      tradeoffSummary = 'Defer this lower-priority task to secure hours for critical deadlines.';
      cosSummary = 'Postpone this lower-priority initiative to safeguard current quarter commitments.';
      primaryRisk = 'Slightly tighter runway for subsequent business cycles.';
    } else if (decisionType === 'SCOPE REDUCE') {
      reasoning = 'A complex corporate deliverable close to the scheduled launch date.';
      expectedBenefit = 'Guarantees deploying a functional, tested core launch on schedule.';
      opportunityCost = 'Postpones secondary features, extra polish, or comprehensive reporting.';
      recommendedAction = 'Focus strictly on the core functional deliverables and ship as an MVP first.';
      whyThisDecision = `Estimated execution effort (${task.estimatedEffort} hours) is too high given the current launch timeline.`;
      whyNotOtherActions = 'Attempting full scope will result in missing the launch date. Deliver a clean, high-impact core first.';
      tradeoffSummary = 'Prune optional product requirements to secure milestone delivery.';
      cosSummary = 'Trim deliverable requirements immediately to secure a safe launch before the SLA deadline.';
      primaryRisk = 'Launching with fewer secondary features or user options.';
    } else if (decisionType === 'REPLAN') {
      reasoning = 'A large, monolithic corporate initiative that risks stalling business velocity.';
      expectedBenefit = 'Breaking it into smaller sub-milestones enables clearer tracking and team coordination.';
      opportunityCost = 'Requires brief pause for technical scoping and milestone mapping.';
      recommendedAction = 'Deconstruct this massive objective into bite-sized daily milestones.';
      whyThisDecision = `This monolithic initiative (${task.estimatedEffort} hours) is too large to track reliably without structured sub-tasks.`;
      whyNotOtherActions = 'Continuing without structured sub-milestones leads to untraceable progress and high project risk.';
      tradeoffSummary = 'Invest 20 minutes in project decomposition to save hours of integration issues.';
      cosSummary = 'Break down this monolithic project into structured sub-milestones with clear boundaries.';
      primaryRisk = 'Slightly increases the count of open task tickets.';
    } else if (decisionType === 'REVIEW') {
      reasoning = 'An immediate administrative review, report audit, or stakeholder presentation checkpoint.';
      expectedBenefit = 'Ensures error-free communication and unblocks related corporate work.';
      opportunityCost = 'A brief pause in active operational execution.';
      recommendedAction = 'Proofread and complete this review between main business blocks.';
      whyThisDecision = `This is a quick review (${task.estimatedEffort} hours) that keeps the corporate pipeline moving.`;
      whyNotOtherActions = 'Delaying this review stalls related initiatives and team members.';
      tradeoffSummary = 'A brief pause to review communications maintains professional standards.';
      cosSummary = 'Review and finalize your business communications to keep corporate interactions moving.';
      primaryRisk = 'Minor break in focus flow.';
    } else if (decisionType === 'BLOCKED') {
      reasoning = 'Waiting on client approval, executive feedback, or budget confirmation.';
      expectedBenefit = 'Prevents wasting hours on incorrect assumptions.';
      opportunityCost = 'Delays progress on this initiative once the blocker clears.';
      recommendedAction = 'Escalate the blocker with key stakeholders or sponsors immediately.';
      whyThisDecision = 'This initiative cannot proceed until external feedback is received.';
      whyNotOtherActions = 'Guessing specifications is highly inefficient. Wait and focus on other active objectives.';
      tradeoffSummary = 'Pause action here to optimize focus on other business channels.';
      cosSummary = 'This project is temporarily paused waiting for stakeholder or client clarification.';
      primaryRisk = 'Compressed timeline once clarification is received.';
    } else { // CONTINUE
      reasoning = 'Initiative is well-paced with stable milestone parameters.';
      expectedBenefit = 'Maintain steady development cadence and stable velocity.';
      opportunityCost = 'None.';
      recommendedAction = 'Continue daily operations following your active corporate strategy.';
      whyThisDecision = `With ${daysRemaining.toFixed(1)} days runway and ${task.estimatedEffort} focus hours, delivery is perfectly on track.`;
      whyNotOtherActions = 'No emergency interventions or hotfixes required. Cadence is stable.';
      tradeoffSummary = 'Steady, balanced operational progress is the best approach.';
      cosSummary = 'Milestone is on track with nominal metrics. Keep pushing forward.';
      primaryRisk = 'Risk of velocity slowdown if operational workflows drift.';
    }
  }

  return {
    decisionType,
    reasoning,
    expectedBenefit,
    opportunityCost,
    recommendedAction,
    whyThisDecision,
    executiveScore: score,
    strategicAlignment: alignment,
    whyNotOtherActions,
    tradeoffSummary,
    cosSummary,
    primaryRisk
  };
}
