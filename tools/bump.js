// Change asXii's version everywhere: VERSION in public/app.js, the header in public/index.html,
// the ?v= tags on the CSS / JS links (so a normal reload picks up the new files), and public/version.json
// (what a running copy checks to offer "a new version is out · Refresh").
//   node tools/bump.js minor                       (0.09 -> 0.10)
//   node tools/bump.js 0.20                        (set it)
//   node tools/bump.js minor "Shape tool"          (optional: a short note shown with the update notice)
'use strict';
if (['-h', '--help'].includes(process.argv[2])) { console.log("usage: node tools/bump.js minor | major | 0.20 [\"note\"]"); process.exit(0); }
const fs = require('fs'), path = require('path');
const web = path.join(__dirname, '..', 'public');
const appPath = path.join(web, 'app.js'), htmlPath = path.join(web, 'index.html');
let app = fs.readFileSync(appPath, 'utf8'), html = fs.readFileSync(htmlPath, 'utf8');

const m = app.match(/const VERSION = '(\d+)\.(\d+)';/);
if (!m) { console.log('VERSION not found in public/app.js'); process.exit(1); }
let maj = +m[1], min = +m[2];
const arg = process.argv[2];
if (arg === 'minor') min++;
else if (arg === 'major') { maj++; min = 0; }
else if (/^v?\d+\.\d+$/.test(arg || '')) { const [a, b] = arg.replace(/^v/, '').split('.'); maj = +a; min = +b; }
else { console.log(`now v${m[1]}.${m[2]}. usage: node tools/bump.js minor | major | 0.20`); process.exit(1); }
const v = `${maj}.${String(min).padStart(2, '0')}`;

app = app.replace(/const VERSION = '[^']*';/, `const VERSION = '${v}';`);
html = html.replace(/(<span class="ver">)v[^<]*(<\/span>)/, `$1v${v}$2`)
  .replace(/(href="style\.css)(\?v=[^"]*)?"/, `$1?v=${v}"`)
  .replace(/(src="(?:app|cursors|fonts|gallery|neon-link)\.js)(\?v=[^"]*)?"/g, `$1?v=${v}"`);
fs.writeFileSync(appPath, app);
fs.writeFileSync(htmlPath, html);
const note = (process.argv[3] || '').trim();
fs.writeFileSync(path.join(web, 'version.json'), JSON.stringify({ version: v, note }) + '\n');
console.log(`asXii is now v${v}` + (note ? ` (${note})` : ''));
require('./gallery-build.js')(true);   // the file:// bundle of public/gallery/
require('./start-build.js')(true);     // the welcome document and the 3D examples (public/start/)
