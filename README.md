# Apps

## Macro Kitchen (`macro-kitchen/`)
A free iPhone/iPad web app for ingredients (macros per gram), recipes with nested sub-recipes, meal planning against macro goals, grocery lists, unit conversion and nutrition-label scanning. Data stays on the device; it works offline once installed.

Install: open the GitHub Pages link in Safari → Share → **Add to Home Screen**.

Editing: change `macro-kitchen/source/src/app.html`, then run `python3 macro-kitchen/source/build.py` to rebuild `macro-kitchen/index.html` (the label reader, tesseract.js, Apache-2.0, is embedded so scanning works offline).
