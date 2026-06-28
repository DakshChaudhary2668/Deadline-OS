const fs = require('fs');
const path = require('path');

let fp = path.join(process.cwd(), 'src/utils/modeLanguage.ts');
let code = fs.readFileSync(fp, 'utf8');

const interfaceUpdates = `
  momentumInsights: {
    overloaded: {
      keyObservation: (effort: number) => string;
      riskAssessment: string;
      executiveRecommendation: string;
    };
    accelerating: {
      keyObservation: (completed: number) => string;
      riskAssessment: string;
      executiveRecommendation: string;
    };
    stable: {
      keyObservation: string;
      riskAssessment: string;
      executiveRecommendation: string;
    };
    declining: {
      keyObservation: string;
      riskAssessment: string;
      executiveRecommendation: string;
    };
  };
`;

code = code.replace(/export interface ModeLanguageConfig \\{/, "export interface ModeLanguageConfig {\\n" + interfaceUpdates);

const studentInsights = `
    momentumInsights: {
      overloaded: {
        keyObservation: (effort) => \`Pending assignments and exam prep peak at \${effort} study hours, saturating your academic timeline.\`,
        riskAssessment: 'Academic fatigue risk. High volume of outstanding coursework may reduce Exam Readiness and comprehension.',
        executiveRecommendation: 'Pause elective research. Focus fully on high-impact core curriculum and optimize study blocks.'
      },
      accelerating: {
        keyObservation: (completed) => \`Academic timeline shows excellent momentum with \${completed} syllabus milestones mastered in the last 72 hours.\`,
        riskAssessment: 'Exam risk is minimized. Comprehension metrics on core subjects are scaling highly favorably.',
        executiveRecommendation: 'Leverage the current study momentum. Initiate advanced practice tests and refine subject understanding.'
      },
      stable: {
        keyObservation: 'Syllabus coverage is currently at 100%. All scheduled assignments and study blocks are successfully secured.',
        riskAssessment: 'Zero academic threat detected. Exam Readiness levels are optimal.',
        executiveRecommendation: 'Formulate future research goals or schedule deep reading blocks to broaden conceptual understanding.'
      },
      declining: {
        keyObservation: 'Study momentum shows gradual compression with active recall sessions slipping below scheduled thresholds.',
        riskAssessment: 'Syllabus coverage threat detected. Conceptual bottlenecks present a 30% risk of reducing Exam Readiness.',
        executiveRecommendation: 'Re-engineer study intervals. Focus on short pomodoro blocks and resolve one small concept blocker immediately.'
      }
    },`;

const developerInsights = `
    momentumInsights: {
      overloaded: {
        keyObservation: (effort) => \`Pending backlog tickets peak at \${effort} developer hours, saturating your sprint capacity.\`,
        riskAssessment: 'Sprint fatigue risk. High volume of outstanding code may reduce deployment stability and Sprint Velocity.',
        executiveRecommendation: 'Pause non-critical features. Focus fully on high-impact release blockers and optimize code reviews.'
      },
      accelerating: {
        keyObservation: (completed) => \`Sprint pipeline shows excellent momentum with \${completed} pull requests merged in the last 72 hours.\`,
        riskAssessment: 'Deployment risk is minimized. Sprint Velocity on core epics is scaling highly favorably.',
        executiveRecommendation: 'Leverage the current Sprint Velocity. Initiate technical debt refactoring and refine automated tests.'
      },
      stable: {
        keyObservation: 'Codebase coverage is currently at 100%. All scheduled sprint tickets are successfully merged.',
        riskAssessment: 'Zero delivery threat detected. Sprint Velocity and code quality levels are optimal.',
        executiveRecommendation: 'Formulate future architectural goals or schedule deep refactoring blocks to broaden system stability.'
      },
      declining: {
        keyObservation: 'Sprint Velocity shows gradual compression with active commits slipping below scheduled thresholds.',
        riskAssessment: 'Sprint delivery threat detected. Technical debt presents a 30% risk of deployment timeline compression.',
        executiveRecommendation: 'Re-engineer sprint intervals. Focus on atomic commits and resolve one small code blocker immediately.'
      }
    },`;

const job_seekerInsights = `
    momentumInsights: {
      overloaded: {
        keyObservation: (effort) => \`Pending applications and interview prep blocks peak at \${effort} action hours, saturating your career search pipeline.\`,
        riskAssessment: 'Hiring pipeline fatigue risk. High volume of outstanding actions may reduce mock interview preparation quality.',
        executiveRecommendation: 'Pause cold application submittals. Focus fully on high-impact active interview loops and optimize target role matching.'
      },
      accelerating: {
        keyObservation: (completed) => \`Hiring pipeline shows excellent momentum with \${completed} application steps finalized in the last 72 hours.\`,
        riskAssessment: 'Opportunity risk is minimized. Conversion metrics on active applications are scaling highly favorably.',
        executiveRecommendation: 'Leverage the current callback momentum. Initiate direct networking outreach and refine target portfolio highlights.'
      },
      stable: {
        keyObservation: 'Hiring outreach pipeline is clean with zero outstanding follow-ups. Active loops are currently running in recruiter bays.',
        riskAssessment: 'Minimal pipeline threat detected. Opportunity readiness is stable.',
        executiveRecommendation: 'Re-assess resume positioning, study market compensation rates, or conduct mock portfolio presentations.'
      },
      declining: {
        keyObservation: 'Outreach velocity indicates compression with fewer follow-up actions and customized submittals completed.',
        riskAssessment: 'Hiring funnel stagnation threat. Delayed touchpoints risk reducing callback rates on active applications.',
        executiveRecommendation: 'Streamline portfolio highlights, send tailored notes to recruiters, and schedule dedicated follow-up blocks.'
      }
    },`;

const professionalInsights = `
    momentumInsights: {
      overloaded: {
        keyObservation: (effort) => \`SLA deliverables peak at \${effort} required operational hours, putting significant strain on team resource capacity.\`,
        riskAssessment: 'Critical risk of SLA breach. Remaining milestones have an 80% threat probability of timeline delay.',
        executiveRecommendation: 'Postpone secondary operational objectives. Delegate minor issues and concentrate resources to protect core deliverables.'
      },
      accelerating: {
        keyObservation: (completed) => \`Operational execution shows rapid upward acceleration with \${completed} milestone completions in the last 72 hours.\`,
        riskAssessment: 'SLA safety margins are highly secure, and performance indexes indicate robust team delivery capacity.',
        executiveRecommendation: 'Lock in this efficient operational cycle. Broaden strategic scoping and present status reports to stakeholders.'
      },
      stable: {
        keyObservation: 'All major SLA deliverables have been successfully finalized. Operational pipelines are running at perfect compliance.',
        riskAssessment: 'Zero delivery threat detected. General compliance profiles are nominal.',
        executiveRecommendation: 'Perform long-range strategic roadmapping and refine operational objectives for the next quarter.'
      },
      declining: {
        keyObservation: 'SLA delivery velocity indicates gradual compression with completion ratios trailing active targets.',
        riskAssessment: 'Timeline compression threat. Delayed milestones represent a 35% delay risk over the next 72 hours.',
        executiveRecommendation: 'Re-calibrate near-term targets. Postpone non-essential discussions to safeguard the core project schedule.'
      }
    },`;

code = code.replace(/(student: \\{[\\s\\S]*?strategicLabels: \\{[\\s\\S]*?\\},)/, "$1\\n" + studentInsights);
code = code.replace(/(developer: \\{[\\s\\S]*?strategicLabels: \\{[\\s\\S]*?\\},)/, "$1\\n" + developerInsights);
code = code.replace(/(job_seeker: \\{[\\s\\S]*?strategicLabels: \\{[\\s\\S]*?\\},)/, "$1\\n" + job_seekerInsights);
code = code.replace(/(professional: \\{[\\s\\S]*?strategicLabels: \\{[\\s\\S]*?\\},)/, "$1\\n" + professionalInsights);

fs.writeFileSync(fp, code);
console.log('done momentum insights');
