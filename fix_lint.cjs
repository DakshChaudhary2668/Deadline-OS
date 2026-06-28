const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace('let strategicFocusArea = config.strategicLabels.executeLabel;', 'let strategicFocusArea = (config.strategicLabels as any).executeLabel || config.strategicLabels.statusLabel || "Execute";');

fs.writeFileSync('server.ts', content);
console.log('Fixed server.ts');
