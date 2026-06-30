const fs = require('fs');
let code = fs.readFileSync('src/utils/modeLanguage.ts', 'utf8');

code = code.replace(/recoveryDynamic: \{/g, 'recoveryDynamic: {\n    "threatLabel": "Threat",\n');

fs.writeFileSync('src/utils/modeLanguage.ts', code);
console.log('Added threatLabel to modeLanguage.ts');
