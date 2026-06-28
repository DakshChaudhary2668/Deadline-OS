import fs from 'fs';
import path from 'path';

let fp = path.join(process.cwd(), 'src/components/TaskList.tsx');
let code = fs.readFileSync(fp, 'utf8');

const regex = /const getSectionLabels = \(\) => \{[\s\S]*?^  \};\n/m;

const replacement = `const getSectionLabels = () => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    return {
      benefits: config.strategicLabels.benefitsHeader,
      considerations: config.strategicLabels.considerationsHeader,
      why: config.strategicLabels.whyHeader,
      nextAction: config.strategicLabels.nextActionHeader
    };
  };
`;

code = code.replace(regex, replacement);
fs.writeFileSync(fp, code);
console.log('TaskList section labels updated.');
