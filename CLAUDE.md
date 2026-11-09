@~/.claude/greg_globals/web.md

# asXii: working guide

asXii is a browser tool for making ASCII art. It was made for NeoN+1's art and lived in the neon-1 repo
(`ascii-editor/`) until 2026-11-08. Now it has its own repo: github.com/gschomburg/asxii.

## Layout
- `public/` is the app and the web root, edited by hand. There's no build step, so there's no `dist/`.
- `tools/` holds `bump.js`, `gallery-build.js` and `start-build.js`.
- `docs/`: `PLAN.md` (the big plan), `TOOLBAR.md` (Justin's design doc), `AUTOTILE.md`, `CURSORS.md`, `TODO.md`,
  `notes/`, `meat_notes.md`.
- `reference/` is art and links to look at. `reference/ascii-art-de/` is local only (gitignored).
- `saves/` is Greg's own projects (gitignored).

## How to run
Open `public/index.html` in Chrome, straight from disk. No server, no build.

## Rules and traps
- Version is `MAJOR.MINOR` (e.g. `0.149`), not semver, and each batch of changes ticks it +0.01:
  `node tools/bump.js minor "note"`. bump.js also re-runs the gallery and start builders.
- `public/gallery.js` and `public/start.js` are generated. Edit `public/gallery/` (the .txt files and `index.json`) or
  `public/start/`, then run `node tools/gallery-build.js` / `node tools/start-build.js`.
- `public/neon-link.js` talks to NeoN+1's editor (`tools/neon_editor.html` in neon-1, its ART tab) by postMessage,
  only with `?neon=1`. Change both ends together.
- Justin Bakse works on asXii too: fetch and check his commits before changing anything.
- Don't touch the whitespace in art: gallery `.txt` files, saved projects, and art strings in code.
