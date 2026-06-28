const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
let lines = code.split('\n');
lines = lines.slice(0, 1298);
fs.writeFileSync('server.ts', lines.join('\n'));
