import fs from 'fs';
import path from 'path';

let fp = path.join(process.cwd(), 'src/components/TaskForm.tsx');
let code = fs.readFileSync(fp, 'utf8');

const regex = /const getCategoryLabel = \(cat: string\) => \{[\s\S]*?^  \};\n/m;

const replacement = `const getCategoryLabel = (cat: string) => {
    const config = MODE_LANGUAGES[roleKey] || MODE_LANGUAGES.professional;
    const d = config.taskListDynamic;
    if (cat === 'Work') return d.catWork.replace(/[^a-zA-Z\\s]/g, '').trim();
    if (cat === 'Study') return d.catStudy.replace(/[^a-zA-Z\\s]/g, '').trim();
    if (cat === 'Career') return d.catCareer.replace(/[^a-zA-Z\\s]/g, '').trim();
    return d.catPersonal.replace(/[^a-zA-Z\\s]/g, '').trim();
  };
`;

code = code.replace(regex, replacement);
fs.writeFileSync(fp, code);
console.log('TaskForm category label updated.');
