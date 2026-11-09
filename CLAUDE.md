@~/.claude/greg_globals/web.md

# asXii: working guide

asXii is a browser tool for making ASCII art. It was made for NeoN+1's art and lived in the neon-1 repo
(`ascii-editor/`) until 2026-11-08. Now it has its own repo: github.com/gschomburg/asxii.

## Layout
- `dist/` is the app and the web root. **It's hand-edited**, unlike web.md's rule (where `dist/` is build output
  and `public/` is the web root). Keep it that way unless Greg asks to migrate.
- `bump.js`, `gallery-build.js`, `start-build.js` sit at the root, not in `tools/`.
- `docs/`: `PLAN.md` (the big plan), `TOOLBAR.md` (Justin's design doc), `AUTOTILE.md`, `CURSORS.md`, `TODO.md`,
  `notes/`, `meat_notes.md`.
- `reference/` is art and links to look at. `reference/ascii-art-de/` is local only (gitignored).
- `saves/` is Greg's own projects (gitignored).

## How to run
Open `dist/index.html` in Chrome, straight from disk. No server, no build.

## Rules and traps
- Version is `MAJOR.MINOR` (e.g. `0.149`), not semver, and each batch of changes ticks it +0.01:
  `node bump.js minor "note"`. bump.js also re-runs the gallery and start builders.
- `dist/gallery.js` and `dist/start.js` are generated. Edit `dist/gallery/` (the .txt files and `index.json`) or
  `dist/start/`, then run `node gallery-build.js` / `node start-build.js`.
- `dist/neon-link.js` talks to NeoN+1's editor (`tools/neon_editor.html` in neon-1, its ART tab) by postMessage,
  only with `?neon=1`. Change both ends together.
- Justin Bakse works on asXii too: fetch and check his commits before changing anything.
- Don't touch the whitespace in art: gallery `.txt` files, saved projects, and art strings in code.
