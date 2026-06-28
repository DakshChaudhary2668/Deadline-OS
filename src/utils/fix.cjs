const fs = require('fs');
['src/utils/aiEngines.ts', 'src/utils/aiSimulation.ts'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\\`/g, '\`');
  fs.writeFileSync(file, content);
});
console.log('Fixed backticks');
