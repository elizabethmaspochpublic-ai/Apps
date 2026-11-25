# Apps

## Macro Kitchen (`macro-kitchen/`)
A free iPhone/iPad web app for ingredients (macros per gram), recipes with nested sub-recipes, meal planning against macro goals, grocery lists, unit conversion and nutrition-label scanning. Data stays on the device; it works offline once installed.

Install: open the GitHub Pages link in Safari → Share → **Add to Home Screen**.

Editing: change `macro-kitchen/source/src/app.html`, then run `python3 macro-kitchen/source/build.py` to rebuild `macro-kitchen/index.html` (the label reader, tesseract.js, Apache-2.0, is embedded so scanning works offline).

## Game Night (`game-night/`)
Twenty-six board, card, dice and puzzle games on one device: play solo, pass the phone around the table, or play against the computer. Four looks to choose from in Settings, a rules button in every game, and search by common names. Works offline once installed.

Install: open the GitHub Pages link in Safari → Share → **Add to Home Screen**.

Editing: the app is built from separate source files into `game-night/index.html`. `words.txt` is the word list used by Word Tiles; `sw.js` caches everything for offline play (its cache name changes with each build, so phones pick up updates the next time they open the app online).
