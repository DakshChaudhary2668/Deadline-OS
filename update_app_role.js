import fs from 'fs';
import path from 'path';

let fp = path.join(process.cwd(), 'src/App.tsx');
let code = fs.readFileSync(fp, 'utf8');

const regex = /const getRoleNameAndSymbol = \(role: RoleType\) => \{[\s\S]*?^  \};\n/m;

const replacement = `const getRoleNameAndSymbol = (role: RoleType) => {
    const label = MODE_LANGUAGES[role]?.title || 'Mode';
    switch (role) {
      case 'student': return { label, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
      case 'developer': return { label, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' };
      case 'job_seeker': return { label, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'professional': return { label, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' };
    }
  };
`;

code = code.replace(regex, replacement);

// Replace the <option> tag in App.tsx
// <option value="student">{MODE_LANGUAGES.student?.title || "Academic Mode"}</option>
// Wait, they are already using MODE_LANGUAGES.

fs.writeFileSync(fp, code);
console.log('App.tsx getRoleNameAndSymbol updated.');
