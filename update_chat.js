import fs from 'fs';
import path from 'path';

const fp = path.join(process.cwd(), 'src/utils/modeLanguage.ts');
let code = fs.readFileSync(fp, 'utf8');

const updates = {
  student: { 
    chatWelcome: 'Greetings. I am your Academic Advisor AI. I have consolidated your current coursework metadata, active syllabus constraints, and historical study velocity.\\n\\nHow should we align your study capacity today? I can help you deconstruct monolithic assignments, calculate grade trade-offs, draft emergency revision timelines, or simulate study load options.',
    flushTooltip: 'Flush conversational buffers'
  },
  developer: { 
    chatWelcome: 'Greetings. I am your Senior Staff Assistant AI. I have consolidated your codebase metadata, active sprint constraints, and deployment velocity records.\\n\\nHow should we align your sprint bandwidth today? I can help you deconstruct epic tickets, calculate tech-debt trade-offs, draft incident recovery playbooks, or simulate scope-reduction options.',
    flushTooltip: 'Flush conversational buffers'
  },
  job_seeker: { 
    chatWelcome: 'Greetings. I am your Career Placement Coach AI. I have consolidated your pipeline metadata, active interview constraints, and historical prep velocity.\\n\\nHow should we align your placement strategy today? I can help you deconstruct monolithic prep tasks, calculate interview trade-offs, draft emergency pipeline recovery timelines, or simulate networking outreach options.',
    flushTooltip: 'Flush conversational buffers'
  },
  professional: { 
    chatWelcome: 'Greetings. I am your Gemini Chief of Staff. I have consolidated your current workspace metadata, active deadline constraints, and historical velocity records.\\n\\nHow should we align your strategic capacity today? I can help you deconstruct monolithic deliverables, calculate high-value trade-offs, draft emergency recovery timelines, or simulate scope-reduction options.',
    flushTooltip: 'Flush conversational buffers'
  }
};

for (const role in updates) {
  const d = updates[role];
  const replaceStr = `        chatWelcome: \`${d.chatWelcome}\`,
        flushTooltip: '${d.flushTooltip}',`;
  const regex = new RegExp(`(${role}: \\{[\\s\\S]*?dailySecondary: \\{)`);
  code = code.replace(regex, `$1\n${replaceStr}`);
}

fs.writeFileSync(fp, code);
console.log('done chat updates');
