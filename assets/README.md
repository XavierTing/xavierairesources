# assets

## portrait.jpg — your profile picture

The site loads exactly one image file for the portrait: **`portrait.jpg`**.
It appears twice (hero byline at 68px, colophon at 44px) on `index.html` and on
every page under `tools/`. It is also the `image` on the Person entry in the
site's structured data.

**To swap in your own photo:** save it over `assets/portrait.jpg`. Square, JPG,
300×300 or larger.

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

`.colophon .avatar` needs no changes either way. It sets width and height only
and inherits the rest.
