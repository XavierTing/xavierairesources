# assets

## portrait.jpg — your profile picture

The site loads exactly one image file for the portrait: **`portrait.jpg`**. It is
also the `image` on the Person entry in the site's structured data, and the
share card at `og/og-image.html` renders it at 264px.

It appears at three sizes:

| Where | Size | Rule |
|---|---|---|
| Hero author card, `index.html` | 140px | `.avatar` |
| Curator page, `curator.html` | 140px | `.curator-portrait` |
| Colophon, every page | 44px | `.colophon .avatar` |

`.colophon .avatar` and `.curator-portrait` both override the base `.avatar`
rule, so changing the hero size touches the hero alone.

**To swap in your own photo:** save it over `assets/portrait.jpg`. Square, JPG.

### Size it for the hero, not the colophon

140px on a 3x phone screen needs **420px of real pixels**. Supply **512×512 or
larger** and every screen stays sharp. A 300×300 file still renders, but softly
on a modern phone.

### The gold ring is part of the image, not the CSS

The current file has the gold ring drawn into the photo itself, so `.avatar` in
`styles.css` carries no border and no padding. It sets `border-radius: 50%`,
which clips the square to exactly the circle the ring sits on.

**If you supply a plain photo with no ring**, add these two lines back to the
`.avatar` rule to get the ring from CSS instead:

```css
border: 2px solid var(--accent);
padding: 3px;
```

Leave them out for a photo that already has a ring, or you get two.

At 140px a baked ring scales to roughly 4px, which makes it the heaviest stroke
on the page. That is deliberate, and `DESIGN.md` says so. If you ever want it
finer, the CSS route above gives a fixed 2px at any portrait size.

### Framing

Crop square and tight: head and shoulders, eyes around the upper third. The
circle clips the corners, so anything below mid-chest is lost. A full-length
photo needs cropping before it goes in here.
