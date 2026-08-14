# AI Resources — AI for the rest of us

A curated list of AI tools for designing, building, writing and working with agents.
Each entry explains why it matters, when to reach for it, and how to run it.
No hype, no affiliate links.

Curated by **[Xavier Ting](https://www.linkedin.com/in/xavierting/)** — Vice
President at OCBC · AI & Design Leader.
[LinkedIn](https://www.linkedin.com/in/xavierting/) · [X](https://x.com/xaviertingai)

![AI Resources](og-image.png)

---

## What this is

Plain HTML, CSS and JavaScript. No framework, no dependencies, no build step at
deploy time. Open `index.html` and it works.

| File | What it is |
|---|---|
| `AGENTS.md` | **The authoring contract.** Voice, entry schemas, sync checklists and the art specs. Read it before adding content (loaded automatically by coding agents; `CLAUDE.md` imports it). |
| `tools.js` | **The curation.** One object per tool — this is the only file to edit to add or change an entry. |
| `site.js` | Site identity and the canonical URL. One line to change after deploying. |
| `index.html` | The card grid, category tabs, hero. The "The tools" tab. |
| `ai-101.html` | The "AI 101" tab: the Artificial Intelligence 101 course (63 terms, 8 chapters plus an unnumbered closing section). **Hand-owned** — the generator never touches it. |
| `curator.html` | The "The curator" tab: bio and why the site exists. **Hand-owned.** |
| `101.css` / `101.js` | The course page's styles (over `styles.css` tokens) and behaviour (chapter router + interactives). |
| `theme.js` | The light/dark switch, shared by every page (light default, localStorage, art swap). |
| `assets/101/` | The course artwork in both palettes: dark recolours + the original light set in `light/`, both emitted by `assets/101/recolor.py`. |
| `tools/<slug>.html` | One static, indexable page per tool. **Generated — don't hand-edit.** |
| `styles.css` | The whole visual system, including the shared `.site-tabs` page nav. |
| `app.js` | Filtering, copy-to-clipboard, motion. Progressive enhancement over static HTML. |
| `generate-seo.mjs` | Regenerates the static pages, `sitemap.xml`, `robots.txt` and `llms.txt`. |

## Adding or changing a tool

Follow the conventions in `AGENTS.md` (voice, field-by-field schema, card art
spec). Mechanically:

1. Edit `tools.js` — add one object to `TOOLS`, bump `LOG_UPDATED`.
2. Run the generator so search engines see it:

   ```bash
   node generate-seo.mjs
   ```

Skipping step 2 leaves the static pages, sitemap and `llms.txt` stale — a new
tool would be invisible to search.

The share card `og-image.png` deliberately carries no tool count, so adding an
entry does not stale it. It renders from `og/og-image.html` (the command is in
that file's header comment); re-render only when the identity line or the
portrait changes, and force a re-scrape in LinkedIn's Post Inspector afterwards
because platforms cache the old card by URL.

## Deploying

The site is live at **https://xaviertingai.com**, served by Cloudflare Workers
static assets. There is no build command and no output directory: the repo root
is the deployable folder. Pushing to `main` triggers a Workers build, which runs
`npx wrangler deploy`.

Five files configure the hosting, and each one is load-bearing:

| File | What it does |
|---|---|
| `wrangler.jsonc` | Names the Worker, points it at the repo root, and pins `html_handling: "none"` so `/ai-101.html` is served as asked instead of being redirected to `/ai-101`. |
| `worker.js` | The only Worker code: 301s `www.xaviertingai.com` to the apex and passes everything else through to the assets. The www custom domain in `wrangler.jsonc` is what gives it a DNS record and certificate to answer on. |
| `_redirects` | Rewrites `/` to `/index.html` with a 200. `html_handling: "none"` stops the bare root resolving on its own, so without this the homepage 404s. |
| `.assetsignore` | Keeps `.git`, the docs and the art scripts out of the upload. Workers, unlike Pages, excludes nothing by default, so removing this publishes the whole git history. |
| `_headers` | One day of caching for `assets/*`. The stylesheets and scripts are deliberately left on the revalidating default because their filenames carry no content hash. |

`netlify.toml` 301s the retired `xavierairesources.netlify.app` deploy to the
new domain, so old links keep working.

**If the domain ever changes:** put the new URL in `SITE.url` inside `site.js`,
re-run `node generate-seo.mjs`, and hand-edit `ai-101.html` and `curator.html`,
which the generator does not touch. Every canonical tag, `og:url`, sitemap entry
and JSON-LD reference follows from `SITE.url`, and a wrong canonical URL
actively suppresses search ranking.

## Docs

- [`SEO.md`](SEO.md) — what's built for search and answer engines, plus the
  post-deploy checklist
- [`DESIGN.md`](DESIGN.md) — the visual system ("Signal Field": warm dark ground,
  drifting aurora, one gold accent)
- [`PRODUCT.md`](PRODUCT.md) — who this is for and what must stay true
- [`assets/README.md`](assets/README.md) — how to swap the portrait

## Built with the tools it lists

Impeccable ran its design detector on every edit. Superpowers drove the
brainstorm → plan → build flow. Chrome DevTools MCP verified every render.

## Licence

Code: MIT — take the pattern and build your own list.
Written content, curation and portrait: © Xavier Ting. Please credit if you quote it.
