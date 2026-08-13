"""Recolour the AI 101 artwork from the course's linen palette into the
site's Signal Field palette (see DESIGN.md).

The source PNGs in xaviers-ai-101/art/ are already quantised to at most
five flat brand colours by xaviers-ai-101/art/optimise.py, so the base
pass is a pure palette swap:

    linen ground   -> the page's warm near-black  (--bg)
    sand raised    -> the raised dark             (--bg-raise)
    ink linework   -> off-white ink               (--ink)
    gold           -> the brand accent gold       (--accent)
    terracotta     -> ember                       (#d97757, must match
                      --ember in 101.css: the meter's hot state and the
                      illustrations must agree)

Two corrections ride on top of the swap, because a naive inversion breaks
the fill treatment:

  - DIAGRAMS (dg-*): ink glyphs sitting INSIDE a gold fill were dark-on-gold
    in the source (6.4:1) and would become off-white-on-gold (1.6:1). Those
    pixels map to the near-black ground instead — exactly DESIGN.md's fill
    rule: solid gold carries --bg text. Detected by neighbourhood: an ink
    pixel whose non-ink surroundings are almost entirely gold is inside a
    gold box; a box border (gold one side, ground the other) is not.
  - ILLUSTRATIONS (NN-*): pieces that are mostly gold slab (pegboard, desk,
    door) would out-shine every headline on the dark page, so any
    illustration over 18% gold gets a muted bronze gold instead. The
    monoline pieces (loom, orrery…) keep the full accent.

The original light-palette renders are ALSO copied verbatim to
assets/101/light/ — theme.js swaps the page between the two sets, so both
must ship. (The source dir is only needed to regenerate; the copies in
light/ are committed.)

    python3 assets/101/recolor.py          # writes assets/101/*.png + light/*.png
    python3 assets/101/recolor.py --check  # report only, change nothing
"""
import shutil
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

HERE = Path(__file__).parent
SRC = HERE.parent.parent / "xaviers-ai-101" / "art"

# source palette, fixed order: index in the quantised image = row here
LINEN, SAND, GOLD, INK, TERRA = range(5)
SOURCES = [
    (242, 236, 224),  # linen
    (231, 222, 203),  # sand
    (182, 150, 111),  # gold
    (26, 24, 21),     # ink
    (180, 81, 45),    # terracotta
]
TARGETS = [
    (10, 9, 8),       # --bg
    (19, 17, 16),     # --bg-raise
    (224, 191, 145),  # --accent
    (244, 242, 239),  # --ink
    (217, 119, 87),   # ember
]
# for slab-heavy illustrations: accent mixed toward the dark, so a 40%-gold
# tile reads as warm bronze instead of a beige searchlight
MUTED_GOLD = (142, 121, 93)
SLAB_THRESHOLD = 0.18  # fraction of gold pixels above which an illo is a slab
# extra output slot for "ink inside a gold fill" -> the near-black ground
INK_ON_GOLD = 5


def palette_image(colours):
    """A 256-slot palette padded with the last colour, as optimise.py does."""
    pal = Image.new("P", (1, 1))
    flat = [c for rgb in colours for c in rgb]
    pad = list(colours[-1]) * ((768 - len(flat)) // 3)
    pal.putpalette(flat + pad)
    return pal


def local_fraction(mask, radius):
    """Box-blurred mask == local coverage fraction, via Pillow's BoxBlur."""
    im = Image.fromarray((mask * 255).astype(np.uint8), "L")
    im = im.filter(ImageFilter.BoxBlur(radius))
    return np.asarray(im, dtype=np.float32) / 255.0


def recolour(path: Path, check: bool) -> str:
    im = Image.open(path).convert("RGB")
    if check:
        n = len(im.getcolors(maxcolors=1_000_000) or [])
        return f"{path.name:22} {im.size[0]}x{im.size[1]}  colours={n}"

    diagram = path.name.startswith("dg-")

    # Every pixel is already one of SOURCES, so nearest-match quantising is
    # exact and yields palette indices 0..4 in SOURCES order.
    q = im.quantize(palette=palette_image(SOURCES), dither=Image.NONE)
    idx = np.asarray(q, dtype=np.uint8).copy()

    note = ""
    if diagram:
        # ink glyphs inside gold fills -> ground-dark, so gold boxes keep
        # legible labels (DESIGN.md: fill = gold with --bg text)
        gold = local_fraction(idx == GOLD, 12)
        other = local_fraction((idx != GOLD) & (idx != INK), 12)
        inside_gold = (idx == INK) & (gold / (gold + other + 1e-6) > 0.85)
        idx[inside_gold] = INK_ON_GOLD
        if inside_gold.any():
            note = f"ink-on-gold: {int(inside_gold.sum())} px"

    targets = list(TARGETS) + [TARGETS[LINEN]]  # slot 5 = ground-dark ink
    if not diagram:
        gold_share = float((idx == GOLD).mean())
        if gold_share > SLAB_THRESHOLD:
            targets[GOLD] = MUTED_GOLD
            note = f"slab ({gold_share:.0%} gold) -> muted"

    out_im = Image.fromarray(idx, "P")
    flat = [c for rgb in targets for c in rgb]
    pad = list(targets[INK]) * ((768 - len(flat)) // 3)
    out_im.putpalette(flat + pad)

    out = HERE / path.name
    out_im.save(out, optimize=True)
    return f"{path.name:22} {im.size[0]}x{im.size[1]}  {out.stat().st_size // 1024:>3} KB  {note}"


def main():
    check = "--check" in sys.argv
    # Named files win over the bulk glob, and you almost always want them.
    # SRC still holds 13 superseded flat-poster dg-*.png from the old art era
    # (4 colours, no terracotta). A bare run recolours those and copies them
    # over the shipped 5-colour diagrams in BOTH assets/101/ and
    # assets/101/light/, silently reverting 13 entries to art nobody wants.
    # So: pass the files you actually mean.
    #     python3 assets/101/recolor.py path/to/dg-loops.png [more.png ...]
    named = [Path(a) for a in sys.argv[1:] if not a.startswith("--")]
    for f in named:
        if not f.is_file():
            sys.exit(f"not a file: {f}")
    files = named or sorted(SRC.glob("*.png"))
    if not files:
        sys.exit(f"no PNGs in {SRC}")
    if not named and "--force-bulk" not in sys.argv:
        stale = [f.name for f in files if f.name.startswith("dg-")]
        if stale:
            sys.exit(
                f"refusing a bulk run: {len(stale)} stale dg-*.png in {SRC} would\n"
                f"overwrite shipped diagrams ({', '.join(stale[:3])} ...).\n"
                f"Name the files you mean, or pass --force-bulk if you really "
                f"intend to rebuild every plate from that directory."
            )
    for f in files:
        print(recolour(f, check))
    if not check:
        light = HERE / "light"
        light.mkdir(exist_ok=True)
        for f in files:
            shutil.copyfile(f, light / f.name)
        total = sum((HERE / f.name).stat().st_size for f in files)
        light_total = sum((light / f.name).stat().st_size for f in files)
        print(f"{'total':22} {total // 1024} KB dark + {light_total // 1024} KB light across {len(files)}+{len(files)} files")


main()
