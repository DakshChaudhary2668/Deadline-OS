const fs = require('fs');
let content = fs.readFileSync('repair_replacement.txt', 'utf8');
content = content.replace(/\\\`/g, '\`');
content = content.replace(/\\\$/g, '\$');
fs.writeFileSync('repair_replacement.txt', content);
