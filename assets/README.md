# assets

## portrait.jpg — your profile picture

The site loads exactly one image file for the portrait: **`portrait.jpg`**.
It appears twice (hero byline at 68px, colophon at 44px) on both `index.html`
and `tool.html`.

**To swap in your own photo:** save it over `assets/portrait.jpg`. Nothing else
to edit — no code, no other files. Square, 640×640 or larger, JPG.

The current file is a headshot crop of the portrait from www.xavierting.com,
used as a stand-in.

### If your photo already has a gold ring drawn into it

The design adds the gold ring in CSS (a 2px `#e0bf91` border with 3px of
padding), so supply a **plain photo without a ring** for the cleanest result.

If your file already has a ring baked in, delete these two lines from the
`.avatar` rule in `styles.css` to avoid a double ring:

```css
border: 2px solid var(--accent);
padding: 3px;
```
