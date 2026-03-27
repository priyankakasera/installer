const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/config/tools.json'), 'utf8'));
const allTools = config.categories.flatMap(c => c.tools);

function detect(tool) {
  return new Promise(resolve => {
    const start = Date.now();
    exec(tool.verifyCommand, {
      encoding: 'utf8', timeout: 10000, windowsHide: true, shell: true
    }, (err, stdout, stderr) => {
      const ms = Date.now() - start;
      const combined = (stdout || '') + (stderr || '');
      let installed = false;
      try { installed = !!combined.match(new RegExp(tool.verifyRegex)); } catch {}
      resolve({ id: tool.id, installed, ms });
    });
  });
}

(async () => {
  console.log('--- PARALLEL DETECTION ---');
  console.log('Tools: ' + allTools.length);
  const p0 = Date.now();
  const results = await Promise.all(allTools.map(t => detect(t)));
  const total = Date.now() - p0;
  results.forEach(r => console.log('  ' + r.id + ': ' + r.installed + ' (' + r.ms + 'ms)'));
  console.log('Total PARALLEL: ' + total + 'ms');
  console.log('Done.');
})();
