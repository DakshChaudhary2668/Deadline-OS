import { Task, DayPlan, WeekPlan } from '../types';

export function generateDayPlan(tasks: Task[], role: string): DayPlan {
  const pending = tasks.filter(t => t.status !== 'completed');
  
  // Sort tasks by priority
  const sortedTasks = [...pending].sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));
  
  let slots = [];
  if (role === 'developer') {
    slots = [
      { time: '09:00 AM', activity: 'Morning Sync / Unblock PRs', notes: 'Check CI/CD statuses' },
      { time: '10:00 AM', activity: 'Deep Work: Core Development', taskTitle: sortedTasks[0]?.title || 'Architecture Design', notes: 'No meetings' },
      { time: '12:30 PM', activity: 'Lunch / Context Switch', notes: 'Disconnect from IDE' },
      { time: '01:30 PM', activity: 'Code Reviews / Bug Triaging', taskTitle: sortedTasks[1]?.title || 'QA Testing', notes: 'Clear review queue' },
      { time: '04:00 PM', activity: 'Documentation / Admin', notes: 'Update Jira/Linear' }
    ];
  } else if (role === 'student') {
    slots = [
      { time: '08:00 AM', activity: 'Morning Review', notes: 'Spaced repetition flashcards' },
      { time: '09:30 AM', activity: 'Heavy Study Session', taskTitle: sortedTasks[0]?.title || 'Core Subject Study', notes: 'Focus on weak concepts' },
      { time: '12:00 PM', activity: 'Lunch Break', notes: 'Hydrate and rest' },
      { time: '01:00 PM', activity: 'Secondary Subject / Assignments', taskTitle: sortedTasks[1]?.title || 'Homework', notes: 'Complete deliverables' },
      { time: '03:30 PM', activity: 'Light Reading / Prep', notes: 'Prepare for tomorrow' }
    ];
  } else if (role === 'job_seeker') {
    slots = [
      { time: '09:00 AM', activity: 'Application Sourcing', notes: 'Check job boards for new postings' },
      { time: '10:30 AM', activity: 'Resume Tailoring & Apply', taskTitle: sortedTasks[0]?.title || 'High Priority Application', notes: 'Use STAR method' },
      { time: '12:30 PM', activity: 'Lunch', notes: 'Take a break' },
      { time: '01:30 PM', activity: 'Interview Preparation', taskTitle: sortedTasks[1]?.title || 'Leetcode / Mock Interview', notes: 'Practice aloud' },
      { time: '04:00 PM', activity: 'Networking / Cold Outreach', notes: 'Send LinkedIn messages' }
    ];
  } else {
    // corporate
    slots = [
      { time: '08:30 AM', activity: 'Inbox Zero & Escalation Check', notes: 'Clear urgent emails' },
      { time: '10:00 AM', activity: 'Strategic Deliverables', taskTitle: sortedTasks[0]?.title || 'Client Proposal', notes: 'Highest ROI task' },
      { time: '12:00 PM', activity: 'Lunch / Casual Networking', notes: 'Connect with peers' },
      { time: '01:00 PM', activity: 'Meetings & Syncs', taskTitle: sortedTasks[1]?.title || 'Project Update', notes: 'Unblock team' },
      { time: '03:30 PM', activity: 'Admin & Planning', notes: 'Update metrics and plan tomorrow' }
    ];
  }

  let brief = '';
  if (role === 'developer') brief = 'Optimize for deep focus during core development blocks. Minimize context switching.';
  else if (role === 'student') brief = 'Maintain high cognitive load during morning blocks; transition to lighter review by afternoon.';
  else if (role === 'job_seeker') brief = 'Balance outbound application volume with rigorous interview preparation to maintain funnel health.';
  else brief = 'Front-load strategic deliverables before reactionary meetings consume afternoon bandwidth.';

  return {
    timeSlots: slots,
    brief,
    generatedAt: new Date().toISOString()
  };
}

export function generateWeekPlan(tasks: Task[], role: string): WeekPlan {
  const pending = tasks.filter(t => t.status !== 'completed');
  const sortedTasks = [...pending].sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));

  const t1 = sortedTasks[0]?.title || 'Primary Objective';
  const t2 = sortedTasks[1]?.title || 'Secondary Objective';
  const t3 = sortedTasks[2]?.title || 'Tertiary Objective';

  let days = [];
  let advice = '';

  if (role === 'developer') {
    days = [
      { dayName: 'Monday', focus: 'Sprint Kickoff & Architecture', tasks: [t1] },
      { dayName: 'Tuesday', focus: 'Deep Implementation', tasks: [t2] },
      { dayName: 'Wednesday', focus: 'Feature Completion & Testing', tasks: [t3] },
      { dayName: 'Thursday', focus: 'Code Reviews & Bug Fixes', tasks: ['Clear PR Queue'] },
      { dayName: 'Friday', focus: 'Deployment & Tech Debt', tasks: ['Ship MVP'] }
    ];
    advice = 'Front-load complex architecture early in the week to allow sufficient QA buffering by Thursday.';
  } else if (role === 'student') {
    days = [
      { dayName: 'Monday', focus: 'Core Concept Mastery', tasks: [t1] },
      { dayName: 'Tuesday', focus: 'Application & Problem Solving', tasks: [t2] },
      { dayName: 'Wednesday', focus: 'Mid-Week Review', tasks: ['Practice Test'] },
      { dayName: 'Thursday', focus: 'Weak Area Remediation', tasks: [t3] },
      { dayName: 'Friday', focus: 'Synthesis & Summary', tasks: ['Create Cheat Sheets'] }
    ];
    advice = 'Utilize active recall on Wednesday to identify conceptual gaps before the weekend.';
  } else if (role === 'job_seeker') {
    days = [
      { dayName: 'Monday', focus: 'Pipeline Generation', tasks: [t1, 'Apply to 10 Roles'] },
      { dayName: 'Tuesday', focus: 'Technical / Behavioral Prep', tasks: [t2] },
      { dayName: 'Wednesday', focus: 'Networking & Outreach', tasks: ['Message 5 Alumni'] },
      { dayName: 'Thursday', focus: 'Portfolio & Skills', tasks: [t3] },
      { dayName: 'Friday', focus: 'Follow-ups & Review', tasks: ['Check ATS Statuses'] }
    ];
    advice = 'Consistent application volume early in the week maximizes recruiter visibility before Friday.';
  } else {
    // corporate
    days = [
      { dayName: 'Monday', focus: 'Strategic Alignment', tasks: [t1] },
      { dayName: 'Tuesday', focus: 'Execution & Deliverables', tasks: [t2] },
      { dayName: 'Wednesday', focus: 'Cross-functional Syncs', tasks: ['Unblock dependencies'] },
      { dayName: 'Thursday', focus: 'Client / Stakeholder Reviews', tasks: [t3] },
      { dayName: 'Friday', focus: 'Reporting & SLA Wrap-up', tasks: ['Submit Status Reports'] }
    ];
    advice = 'Protect Tuesday and Wednesday for core execution; reserve Friday for low-risk administrative compliance.';
  }

  return {
    days,
    strategicAdvice: advice,
    generatedAt: new Date().toISOString()
  };
}
