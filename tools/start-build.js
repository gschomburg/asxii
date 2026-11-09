// Start content: what a first visit opens (and Help › Welcome), and the 3D editor's Examples. Plain asXii project
// files, so they're made and changed in asXii itself (File › Save project, then copy the file in):
//   public/start/welcome.asxii.json         the welcome document
//   public/start/blocks/*.asxii.json        3D examples: their blocks (and block look); sorted by file name, named
//                                         by the project's name. A number prefix sets the order (1-edge-cube...).
// This bundles them into public/start.js, which the app loads when it needs them (works from file:// and served).
//   node tools/start-build.js      (bump.js runs it too)
'use strict';
if (['-h', '--help'].includes(process.argv[2])) { console.log("usage: node tools/start-build.js   (bundles public/start/ into public/start.js)"); process.exit(0); }
const fs = require('fs'), path = require('path');
function buildStart(quiet) {
  const dir = path.join(__dirname, '..', 'public', 'start'), bdir = path.join(dir, 'blocks');
  const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
  const welcome = fs.existsSync(path.join(dir, 'welcome.asxii.json')) ? read(path.join(dir, 'welcome.asxii.json')) : null;
  const files = fs.existsSync(bdir) ? fs.readdirSync(bdir).filter(f => /\.json$/i.test(f)).sort() : [];
  const blocks = files.map(f => {
    const d = read(path.join(bdir, f)), b = d.blocks || {};
    return { file: f, name: d.name || f.replace(/^\d+-|\.asxii\.json$|\.json$/gi, '').replace(/-/g, ' '),
      blocks: { dcells: b.dcells || [], size: b.size, depth: b.depth, dir: b.dir, fill: b.fill, solid: b.solid, seams: b.seams, flat: b.flat } };
  });
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'start.js'),
    '// asXii start content, made by tools/start-build.js from public/start/ (change those files, not this).\n' +
    'window.ASXII_START = ' + JSON.stringify({ welcome, blocks }) + ';\n');
  if (!quiet) console.log(`start: welcome ${welcome ? 'yes' : 'missing'}, ${blocks.length} 3D examples (${blocks.map(b => b.name).join(', ')})`);
}
module.exports = buildStart;
if (require.main === module) buildStart();
