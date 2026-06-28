const fs = require('fs');
const path = require('path');

let fp = path.join(process.cwd(), 'server.ts');
let code = fs.readFileSync(fp, 'utf8');
const lines = code.split('\n');

const startIndex = lines.findIndex(l => l.startsWith('function old_calculateStrategicDecision'));
const endIndex = lines.findIndex(l => l.startsWith('// Fetch current Day and Week plans if cached'));

const replacement = fs.readFileSync(path.join(process.cwd(), 'repair_replacement.txt'), 'utf8');

const newLines = [
  ...lines.slice(0, startIndex),
  replacement,
  ...lines.slice(endIndex)
];

fs.writeFileSync(fp, newLines.join('\n'));
console.log('done server repair');
