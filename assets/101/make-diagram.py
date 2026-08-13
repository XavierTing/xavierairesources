"""Turn a raw generated sketchnote into a shippable AI 101 light master.

The step between "the image model gave us a PNG" and
`assets/101/light/dg-<slug>.png`. It exists because recolor.py maps colours
by palette index from a fixed five-entry source palette, so its input has to
already be exactly those five RGBs and nothing else. A raw render is a
24-bit approximation of them with thousands of anti-aliased in-between
pixels, so something has to snap it back first.

    python3 assets/101/make-diagram.py raw/dg-loops.png staged/
    python3 assets/101/make-diagram.py raw/*.png staged/ --check

Then, and only with explicit paths (see the guard in recolor.py):

    python3 assets/101/recolor.py staged/dg-loops.png

WHY NOT xaviers-ai-101/art/optimise.py: that script is the previous art era's
tool. Its PALETTE_DIAGRAM is four colours with terracotta deliberately left
out, which was right for the flat-poster diagrams it produced but is wrong
for the shipped sketchnote set, where every dg-*.png carries all five. Its
trim() is still the right idea, so it is reproduced below rather than
imported (both scripts call main() at import time, so neither is importable).

THE TERRA GUARD is the one subtle part. optimise.py's comment records the
failure that made it drop terracotta: offering terracotta to the quantiser
snapped anti-aliased ink-on-gold edges to a rusty brown, haloing every box.
Dropping the colour fixed the halo and cost the ember accent. This gets both
by quantising twice and choosing per pixel: a pixel keeps its five-colour
result only where the ORIGINAL pixel was genuinely close to ember, and takes
the four-colour result everywhere else. Real ember strokes land within a few
units of #B4512D. The ink/gold edge midpoint is about (104, 87, 66), roughly
79 away, so it stays outside the radius and snaps to ink or gold as before.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops

# The five, in recolor.py's SOURCES order. These exact RGBs are the contract
# between this script and recolor.py; changing one means changing both.
LINEN = (242, 236, 224)
SAND = (231, 222, 203)
GOLD = (182, 150, 111)
INK = (26, 24, 21)
TERRA = (180, 81, 45)

FIVE = [LINEN, SAND, GOLD, INK, TERRA]
FOUR = [LINEN, SAND, GOLD, INK]          # the halo-free set, used off-ember
TERRA_RADIUS = 60                         # see THE TERRA GUARD above
WIDTH = 1500                              # matches every shipped dg-*.png
MAX_TERRA_SHARE = 0.03                    # above this, the guard has leaked


def palette_image(colours):
    """A PIL palette padded with its own last colour.

    Padding with zeros would offer quantize 250-odd slots of pure #000 to
    snap dark pixels into, and there is no pure black anywhere in this
    system. Lifted from optimise.py, which learned it the hard way.
    """
    pal = Image.new("P", (1, 1))
    flat = [c for rgb in colours for c in rgb]
    pad = list(colours[-1]) * ((768 - len(flat)) // 3)
    pal.putpalette(flat + pad)
    return pal


def trim(im: Image.Image, margin: float = 0.035) -> Image.Image:
    """Crop back to the drawing, then re-pad evenly.

    Image generation composes its own margins and is inconsistent about them.
    Trimming to the ink and re-padding by a fixed fraction is what makes a
    set of separately generated diagrams sit the same on the page.
    (Reproduced from xaviers-ai-101/art/optimise.py.)
    """
    bg = Image.new("RGB", im.size, im.getpixel((1, 1)))
    box = ImageChops.difference(im, bg).convert("L").point(
        lambda v: 255 if v > 12 else 0).getbbox()
    if not box:
        return im
    pad = round(im.size[0] * margin)
    l, t, r, b = box
    return im.crop((max(0, l - pad), max(0, t - pad),
                    min(im.size[0], r + pad), min(im.size[1], b + pad)))


def snap(im: Image.Image) -> Image.Image:
    """Quantise to exactly the five, without the ink-on-gold halo."""
    # int32, not int16: a squared channel difference reaches 255*255 = 65025
    # and three of them sum past 32767, which wraps negative in int16 and makes
    # the sqrt below NaN. NaN < TERRA_RADIUS is False, so the pixel would still
    # fall to the four-colour set and the output would look right, which is
    # exactly why this would have gone unnoticed.
    src = np.array(im, dtype=np.int32)
    # No dither: flat vector art speckles around the lettering when dithered.
    five = np.array(im.quantize(palette=palette_image(FIVE),
                                dither=Image.NONE).convert("RGB"))
    four = np.array(im.quantize(palette=palette_image(FOUR),
                                dither=Image.NONE).convert("RGB"))
    dist = np.sqrt(((src - np.array(TERRA, dtype=np.int16)) ** 2).sum(axis=2))
    is_ember = (dist < TERRA_RADIUS)[:, :, None]
    return Image.fromarray(np.where(is_ember, five, four).astype(np.uint8))


def make(path: Path, outdir: Path, check: bool) -> str:
    im = Image.open(path).convert("RGB")
    raw_size = im.size
    if check:
        n = len(im.getcolors(maxcolors=2_000_000) or [])
        return f"{path.name:24} {raw_size[0]}x{raw_size[1]} colours={n}"

    im = trim(im)
    if im.size[0] != WIDTH:
        h = round(im.size[1] * WIDTH / im.size[0])
        # Never blur a diagram: softening the hand lettering is the one thing
        # that would make it unreadable.
        im = im.resize((WIDTH, h), Image.LANCZOS)
    im = snap(im)

    a = np.array(im)
    cols = {tuple(c) for c in np.unique(a.reshape(-1, 3), axis=0)}
    stray = cols - set(FIVE)
    if stray:
        raise SystemExit(f"{path.name}: {len(stray)} colours outside the five: {sorted(stray)[:4]}")
    terra_share = float((a == np.array(TERRA)).all(axis=2).mean())
    if terra_share > MAX_TERRA_SHARE:
        raise SystemExit(
            f"{path.name}: ember is {terra_share:.1%} of the image (limit "
            f"{MAX_TERRA_SHARE:.0%}). The terra guard has leaked, or the render "
            f"used ember as a fill rather than one small accent.")

    outdir.mkdir(parents=True, exist_ok=True)
    out = outdir / path.name
    im.save(out, optimize=True)
    return (f"{path.name:24} {raw_size[0]}x{raw_size[1]} -> {im.size[0]}x{im.size[1]}  "
            f"{out.stat().st_size // 1024:>3} KB  colours={len(cols)}  ember={terra_share:.2%}")


def main():
    check = "--check" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        sys.exit(__doc__.strip().splitlines()[0] + "\n\nusage: make-diagram.py <raw.png ...> <outdir> [--check]")
    if check:
        srcs, outdir = [Path(a) for a in args], Path(".")
    else:
        *srcs, outdir = args
        srcs, outdir = [Path(s) for s in srcs], Path(outdir)
        if not srcs:
            sys.exit("give at least one source PNG and an output directory")
    for s in srcs:
        if not s.is_file():
            sys.exit(f"not a file: {s}")
        print(make(s, outdir, check))


main()
