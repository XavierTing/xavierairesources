"""Generate the Daylight variants of the card monolines.

The dark-theme webps are pale-gold linework whose strokes carry LOW alpha
(median ~22%) — tuned to glow against the near-black ground. On linen the
same strokes vanish, and no CSS color filter can fix alpha. So the light
set re-inks every stroke in the text-duty gold (#6F5631) and lifts alpha
2.2x (cores clip to solid, halos stay soft), keeping the silhouette
identical. theme.js swaps assets/cards/ <-> assets/cards/light/.

    python3 assets/cards/lighten.py
"""
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).parent
OUT = HERE / "light"
INK = (111, 86, 49)  # --accent in Daylight: the text-duty gold
ALPHA_GAIN = 2.2


def main():
    OUT.mkdir(exist_ok=True)
    files = sorted(HERE.glob("*.webp"))
    if not files:
        raise SystemExit(f"no webp files in {HERE}")
    for f in files:
        im = Image.open(f).convert("RGBA")
        a = np.asarray(im).copy()
        a[..., 0] = INK[0]
        a[..., 1] = INK[1]
        a[..., 2] = INK[2]
        a[..., 3] = np.minimum(255, a[..., 3].astype(np.float32) * ALPHA_GAIN).astype(np.uint8)
        Image.fromarray(a).save(OUT / f.name, lossless=False, quality=90)
        print(f"{f.name:32} -> light/ {((OUT / f.name).stat().st_size) // 1024} KB")
    print(f"{len(files)} light card monolines written")


main()
