"""Check every AI 101 diagram against the contract, before any of it ships.

    python3 assets/101/verify-diagrams.py

Checks the whole set, not only new files, because the failures worth catching
are the ones that arrive quietly: a width/height attribute that no longer
matches its file (the browser reserves layout from those attrs, so a wrong
one is a visible jump as the image loads), a light master that picked up a
sixth colour and will therefore recolour to nonsense, an alt that went
missing in an edit.

Exit code is 0 only when every check passes.
"""
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).parent.parent.parent
HTML = ROOT / "ai-101.html"
DARK = ROOT / "assets" / "101"
LIGHT = DARK / "light"

FIVE = {(242, 236, 224), (231, 222, 203), (182, 150, 111), (26, 24, 21), (180, 81, 45)}
TERRA = (180, 81, 45)
WIDTH = 1500
HEIGHT_RANGE = (700, 1100)
MAX_TERRA = 0.03
DASHES = ("—", "–")   # AGENTS.md section 3: none anywhere in site prose

fails, checked = [], 0


def bad(where, msg):
    fails.append(f"{where}: {msg}")


html = HTML.read_text(encoding="utf-8")

# ---- every dg image referenced by the page -------------------------------
imgs = re.findall(
    r'<img class="dg-img" src="(assets/101/light/dg-[\w-]+\.png)"'
    r'[^>]*?width="(\d+)"[^>]*?height="(\d+)"[^>]*?alt="([^"]*)"',
    html, re.S)
srcs_in_html = set(re.findall(r'src="(assets/101/light/dg-[\w-]+\.png)"', html))
if len(imgs) != len(srcs_in_html):
    bad("html", f"{len(srcs_in_html)} dg images but only {len(imgs)} parsed with "
                f"width/height/alt in that order; check the attribute order")

for src, w, h, alt in imgs:
    checked += 1
    name = src.rsplit("/", 1)[-1]
    light, dark = LIGHT / name, DARK / name
    if not light.exists():
        bad(name, "light master missing"); continue
    if not dark.exists():
        bad(name, "dark twin missing; run recolor.py with this file as an argument"); continue

    im = Image.open(light)
    if (im.size[0], im.size[1]) != (int(w), int(h)):
        bad(name, f'html says {w}x{h} but the file is {im.size[0]}x{im.size[1]} '
                  f'(fix the attrs, they drive layout reservation)')
    if im.size[0] != WIDTH:
        bad(name, f"width is {im.size[0]}, expected {WIDTH}")
    if not (HEIGHT_RANGE[0] <= im.size[1] <= HEIGHT_RANGE[1]):
        bad(name, f"height {im.size[1]} outside {HEIGHT_RANGE}")
    if Image.open(dark).size != im.size:
        bad(name, "dark twin has different dimensions from the light master")

    a = np.array(im.convert("RGB"))
    cols = {tuple(int(x) for x in c) for c in np.unique(a.reshape(-1, 3), axis=0)}
    if not cols <= FIVE:
        bad(name, f"{len(cols - FIVE)} colours outside the palette: {sorted(cols - FIVE)[:3]}")
    share = float((a == np.array(TERRA)).all(axis=2).mean())
    if share > MAX_TERRA:
        bad(name, f"ember is {share:.1%} of the image (limit {MAX_TERRA:.0%}); "
                  f"likely a quantise halo, see make-diagram.py")
    if len(alt.strip()) < 80:
        bad(name, f"alt is {len(alt.strip())} chars, too short to describe the drawing")
    for d in DASHES:
        if d in alt:
            bad(name, "alt contains an em or en dash")

# ---- captions ------------------------------------------------------------
for cap in re.findall(r'<figcaption class="dg-cap">(.*?)</figcaption>', html, re.S):
    text = re.sub(r"<[^>]+>", "", cap).strip()
    if not text:
        bad("figcaption", "empty caption")
    for d in DASHES:
        if d in text:
            bad("figcaption", f"em or en dash in: {text[:60]}")

# ---- coverage: every entry has a figure ----------------------------------
entries = re.findall(r'<article class="entry" id="e-([\w-]+)">(.*?)</article>', html, re.S)
missing = [s for s, b in entries if "<figure" not in b]
placed_wrong = [s for s, b in entries
                if "<figure" in b and "analogy" in b
                and b.index("<figure") < b.index('class="analogy"')]
if placed_wrong:
    bad("layout", f"figure sits before the analogy in: {', '.join(placed_wrong)}")

print(f"entries {len(entries)}  with figure {len(entries) - len(missing)}  "
      f"images checked {checked}")
if missing:
    print(f"\nstill without a diagram ({len(missing)}):")
    for m in missing:
        print(f"  e-{m}")
if fails:
    print(f"\n{len(fails)} problem(s):")
    for f in fails:
        print(f"  {f}")
    sys.exit(1)
print("\nall shipped diagrams pass" + ("" if not missing else
      f"; {len(missing)} entries still pending art"))
sys.exit(0 if not missing else 2)
