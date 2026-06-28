import fs from 'fs';
import path from 'path';

let fp = path.join(process.cwd(), 'src/components/StrategicDecisions.tsx');
let code = fs.readFileSync(fp, 'utf8');

const regex = /const getCategoryLabel = \(cat: string\) => \{[\s\S]*?^  \};\n/m;

const replacement = `const getCategoryLabel = (cat: string) => {
    const config = MODE_LANGUAGES[mockRole as 'professional'] || MODE_LANGUAGES.professional;
    const d = config.taskListDynamic;
    if (cat === 'Work') return d.catWork;
    if (cat === 'Study') return d.catStudy;
    if (cat === 'Career') return d.catCareer;
    return d.catPersonal;
  };
`;

code = code.replace(regex, replacement);
fs.writeFileSync(fp, code);
console.log('StrategicDecisions category label updated.');
