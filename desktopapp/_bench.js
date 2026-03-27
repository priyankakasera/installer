const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/config/tools.json'), 'utf8'));
const allTools = config.categories.flatMap(c => c.tools);
console.log('Tools:', allTools.length);

function detect(tool) {
  return new Promise(resolve => {
    const start = Date.now();
    const child = exec(tool.verifyCommand, {
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
  // Sequential only
  const s0 = Date.now();
  const results = [];
  for (const t of allTools) {
    const r = await detect(t);
    results.push(r);
    console.log(`  ${r.id}: ${r.installed} (${r.ms}ms)`);
  }
  console.log('Total sequential:', Date.now() - s0, 'ms');
  
  // Parallel
  const p0 = Date.now();
  const par = await Promise.all(allTools.map(t => detect(t)));
  console.log('Total parallel:', Date.now() - p0, 'ms');
  par.forEach(r => console.log(`  ${r.id}: ${r.installed} (${r.ms}ms)`));
})();
