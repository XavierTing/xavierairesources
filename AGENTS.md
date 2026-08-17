# AGENTS.md — the authoring contract for this site

Read this before adding or editing any content. It records the conventions every
existing entry follows, so that new content written by any person or model is
indistinguishable in voice, structure and art from what is already here.

The site is three tabs served as plain HTML, CSS and JavaScript with no build
step: **The tools** (a curated directory of AI tools), **AI 101** (a 59-term
plain-English course), and **The curator** (bio). Preview locally with
`python3 -m http.server` from the repo root.

It is live at **https://xaviertingai.com** on Cloudflare Workers static assets,
and a push to `main` deploys it. To preview the way the real host behaves,
including the `.html` routing rules, run `npx wrangler dev` instead of the Python
server. See the Deploying section of `README.md` before touching
`wrangler.jsonc`, `worker.js`, `_redirects`, `_headers` or `.assetsignore`:
each one is load-bearing, and `.assetsignore` is what keeps `.git` out of the
public site.

---

## 1. Who owns which file

| Source of truth | Generated from it (never hand-edit) |
|---|---|
| `tools.js` — one object per tool entry | `tools/<slug>.html`, the card block + JSON-LD in `index.html`, `sitemap.xml`, `robots.txt`, `llms.txt` |
| `ai-101.html` — the whole course, hand-owned | nothing (the generator never touches it) |
| `curator.html` — hand-owned | nothing |
| `assets/cards/*.webp` — dark-theme card art masters | `assets/cards/light/*.webp` via `python3 assets/cards/lighten.py` |
| `assets/101/light/*.png` — light-theme course art masters | `assets/101/*.png` dark set via `assets/101/recolor.py` |

After any edit to `tools.js`, run `node generate-seo.mjs` and commit the
generated files together with the source change. Skipping it leaves the static
pages, sitemap and `llms.txt` stale.

## 2. The design system in one paragraph

The system is called Signal Field and ships in two renditions. **Daylight is
the default** (on `:root`, what crawlers and no-JS visitors get): linen
`#F2ECE0`, raised sand `#E7DECB`, ink `#1A1815`, body `#4F473D`, muted
`#665C4E`, text-duty gold `#6F5631`, fill gold `#B6966F`, ember `#B4512D`.
**Night** is opt-in via `html[data-theme="dark"]`: ground `#0a0908`, ink
`#f4f2ef`, accent `#e0bf91`, ember `#d97757`. `theme.js` persists the choice in
localStorage and swaps the art directories (`assets/cards/` and `assets/101/`
against their `light/` subfolders). Type: Montserrat display, Poppins body,
Fragment Mono for labels. One container everywhere:
`--page-w: clamp(1180px, 90vw, 1440px)`. Every 1px rule takes equal air above
and below, drawn from the `--rule-air-*` scale in `styles.css` and never from a
literal (see the Even-Rule Rule in `DESIGN.md`). Every change must be checked in
BOTH themes at 1440px and 390px wide before it ships.

## 3. The voice, for all prose on the site

Write for a tertiary student with limited AI knowledge and no programming
background. That reader is the bar every sentence has to clear.

- Plain English. Gloss every technical term at its first use in the entry, in
  the sentence itself: "a repository, repo for short", "the terminal, the
  typed-command window". Never assume a term taught elsewhere is remembered;
  link to it instead.
- No em dashes and no en dashes anywhere. Use a period, comma, colon or
  parentheses.
- No hype, no marketing verbs, no "powerful", "seamless", "game-changing".
  State what the thing does and what it costs to be wrong.
- Honesty over polish: name limitations ("GPU-only", "Reviewed · Not tested",
  "not a general-purpose training service"). Nothing on this site is paid
  placement and entries say so plainly.
- **State the point. Never make the reader decode it.** Say what a thing is
  before, or instead of, painting a picture of it. Copy that sets up a reveal,
  poses a riddle or counts the contents without naming them ("Eleven words that
  explain how AI behaves") fails this rule, however well it reads aloud.
- The course carries no dedicated analogy block. It had one per entry until
  2026-08-17, when all 63 were removed and the card they sat in was given to
  the diagram caption instead. Where a comparison still earns its place inside
  prose, it must **name what it explains, in one sentence**. "An LLM is the
  engine and the chat app is the car built around it" works; "Nobody buys an
  engine. You buy a car." does not, because the reader has to work out the
  mapping. Draw it from ordinary life that reads the same anywhere: a taxi
  meter, a whiteboard, a filing cabinet, a doorbell, a spare key. **The
  audience is international.** No country-specific places, foods, names,
  institutions, schemes or currency: a reader in Lagos, Lisbon or Lima should
  never have to look something up to follow an example. Never write a
  comparison that only repeats the entry's "In one line" in different words.
- A chapter's `.plate` description and its row in both contents lists must name
  what is actually in the chapter, not promise what it will do for you.
- Second person, present tense. "You point them at your repository" rather
  than "users can configure".
- Before shipping new copy, run a cold-read gate: have a fresh agent role-play
  the tertiary-student persona, read only the new content, and report back
  what each term means in their own words. Fix anything they mark opaque.

## 4. The tools: adding an entry to tools.js

Append one object to `TOOLS` and bump `LOG_UPDATED` (DD.MM.YYYY). Fields:

| Field | Convention |
|---|---|
| `num` | Next two-digit string ("27"). |
| `name` | Product name as its maker writes it. |
| `category` | One of exactly six. Design (making interfaces and visuals) · Workflow (ways of working with agents: planning, specs, loops, observation) · Connections (plugging an assistant into something real: browser, database, docs, device) · Coding (utilities in the build stack: packers, routers, context tools, security) · Knowledge (notes, memory, personal knowledge bases) · Writing (prose tools). Choose by what the reader is trying to do, not by what the tool is built on. |
| `tagline` | Verb-first, present tense, one line, no trailing period: "Lets an AI agent run model experiments overnight". It answers "what does this do for me". |
| `blurb` | 2–3 sentences for the card. Concrete, second person, one specific detail that proves you looked (a number, a mechanism, a limit). |
| `repo` + `repoLabel` | The canonical link. Label is uppercase: "GITHUB REPO", "PROJECT PAGE", "DOCS". |
| `maker` | Optional. Omit when the GitHub URL owner is the right answer (the site derives it). |
| `needs` | Prerequisites in plain English, jargon glossed: "The uv helper, Python 3.10 or newer, an NVIDIA graphics card". |
| `cost` | Honest, including the indirect part: "Free (the coding agent you point at it has its own plan)". Surfaces in `llms.txt` only; the tool page meta card deliberately does not show it. |
| `why` | One paragraph. The problem a person actually has, then how this tool answers it, then honest scoping of what it is not. |
| `when` | The situations you would reach for it, plus hard requirements and platform caveats. |
| `how` | Exactly 3 imperative steps. Safety caveats live inside the step they belong to (fresh folder, disposable branch, review before keeping). |
| `command` + `commandTarget` | One copy-paste line. Target is `"terminal"`, `"claude"` or `"assistant"`; it renders the location label ("Paste into the Terminal app" etc.). Omit both only if there is genuinely nothing to paste. |
| `status` | Optional. Defaults to "In daily use". If you have not run it, say so: "Reviewed · Not tested". Never claim daily use falsely. Surfaces in `llms.txt` only, same as `cost`. |
| `note` | Curator's note, one or two sentences of judgment or warning. Surfaces in `llms.txt` only. |

The generator auto-links the first occurrence of AI 101 terms (agent, tokens,
MCP, RAG, cron, GitHub and the rest of `AI101_TERMS` in `generate-seo.mjs`) on
each tool page, so write those words in plain linkable form. If the entry
teaches a concept the course covers, mention the concept by name once.

The tool page's meta card shows Category, Made by, You'll need and Source,
in that order, and nothing else. Cost and Curator's status are curation data
that answer engines read from `llms.txt`; they are not printed on the page.

Prose inside a how step may carry links, so the step list must never be a grid
or flex container: those blockify each inline `<a>` into its own item and tear
the sentence apart. `.section ol li` hangs its number with absolute positioning
for exactly this reason.

## 5. The tools: card infographic style (assets/cards/)

Every card carries one monoline blueprint illustration: a technical-drawing
metaphor of what the tool does (a UI under calipers, an experiment tree, a
browser on strings). These are the acceptance numbers, measured across the set;
verify a new card against them with PIL/numpy before shipping.

- **File**: `assets/cards/<slug>.webp`, 384×384, RGBA with real transparency,
  lossy webp ~q90. Slug = name lowercased, runs of non-alphanumerics to `-`.
- **The dark file is the master.** Linework is pale gold, roughly
  RGB (236, 205, 166). Nothing else: no drop shadows, no glows, no dark
  pixels, no solid filled shapes, no background.
- **Stroke weight**: hairline, 1–2px at 384. Median alpha of nonzero pixels
  45–60, maximum ~210. The lines are meant to glow faintly on Night; solid
  strokes read chunky next to the set.
- **Density**: the drawing fills the frame. 10–16% of pixels nonzero. A sparse
  glyph floating in space is off-style.
- **Blueprint furniture is part of the grammar**: small `+` registration
  crosses scattered near the edges (6–8 of them), and one or two dashed
  construction guide lines tied to the drawing's geometry.
- **Light variant is never drawn by hand.** Run `python3 assets/cards/lighten.py`;
  it re-inks every card to `#6F5631` and lifts alpha 2.2× into
  `assets/cards/light/`. If the light render looks wrong, fix the dark master
  and rerun.

## 6. AI 101: adding an entry to the course

The course is `ai-101.html`, entirely hand-owned. An entry is an
`<article class="entry" id="e-<slug>">` with this exact anatomy, in this order:

```html
<article class="entry" id="e-slug">
  <h3 class="display">Term</h3>
  <div class="bar"></div>
  <div class="entry-flow">
    <div class="field"><span class="label">What it is</span>
      <p>…</p>
      <p style="margin-top:.9em">…</p></div>
    <div class="field"><span class="label">For example</span>
      <p>…</p></div>
  </div>
  <div class="entry-rail">
    <figure>…diagram; the figcaption renders as the gold-barred card…</figure>
  </div>
  <div class="oneline"><span class="label">In one line</span><p>…</p></div>
</article>
```

"What it is" runs 2–3 paragraphs: definition with terms glossed, then why the
reader should care, then the builder's habit or caveat. "For example" is one
concrete scene, ideally from this site or everyday life. The one-liner is a
memorable sentence, and the recap reuses it verbatim. Cross-link related
entries with `<a href="#e-other">` (forward links are fine). Place the entry
next to its conceptual sibling, not at the end of the chapter.

The course counts eight chapters. The closing section "Where to start"
(`data-slug="monday"`) sits after chapter 08 and is deliberately outside that
count: it carries no plate number, it is absent from both contents lists, and
it gets no step in the chapter bar's `.chapbar-dots`. It stays a routable
chapter, so prev/next and the deep link `#monday` still reach it. Do not add
it back to the stepper when the counts are next resynced.

Each chapter opens with a `.plate`: number, tag, an `h2` title and a one
sentence description. Both the title and the description must sit on a single
line at every desktop width the container supports, down to 1180px, so keep
the title under about 30 characters and the description under about 80. Never
force the break with a `<br>`; write it short enough that it does not need one.

**The sync checklist.** Every entry addition must also touch ALL of these, or
the course lies about itself:

1. The chapter's `nav.wordnav` line gains the term.
2. BOTH contents lists gain it in `.c-words`: the chapmenu copy and the cover
   copy (marked with SYNC comments). Adjust both `.c-time` values if the
   chapter's reading minutes change (~1 min per entry).
3. The chapter's `.objectives` list gains a bullet when the term earns one.
4. The recap `<dl>` gains `<dt><a href="#e-slug">Term</a></dt><dd>one-liner</dd>`
   in the right chapter group.
5. JSON-LD `teaches[]` gains the term; `timeRequired` and `dateModified` update.
6. Every spelled-out count updates: the head comment, meta description,
   og:description, WebPage description, and the closing "Fifty-nine words"
   paragraph all carry the term count as a word.
7. `generate-seo.mjs`: the `llms.txt` course line's counts, and a new
   `AI101_TERMS` pattern if tool pages should link the term. Rerun the generator.
8. `README.md` and `.impeccable/surfaces/ai-101-html.md` count references.

Then verify with a browser: the deep link `ai-101.html#e-slug` opens the right
chapter, the recap link lands, both themes render, no console errors, no
horizontal overflow at 390px.

## 7. AI 101: diagram style (assets/101/)

Course figures are friendly hand-drawn sketchnotes: wobbly ink outlines,
curved arrows, hand-lettered caps. Exactly five colours, the Daylight palette:
`#F2ECE0` linen ground, `#E7DECB` sand, `#B6966F` gold, `#1A1815` ink,
`#B4512D` ember. Around 1500×1000, PNG.

- The **light** render is the master, saved to `assets/101/light/dg-<slug>.png`.
- The dark version is produced by `assets/101/recolor.py` (it maps the palette
  to Night and corrects ink trapped inside gold fills). Recolor only the new
  files; the script's bulk source directory is stale.
- Markup: `img.dg-img` with exact width/height, `loading="lazy"
  decoding="async"`, a full descriptive alt, and a `figcaption.dg-cap` that
  adds one insight rather than repeating the alt. Since 2026-08-17 the
  figcaption renders as the gold-barred glass card the analogy blocks used to
  occupy, so it is now the only piece of copy in the rail and carries the
  emphasis on its own. Write it to be read, not skimmed past.
- The diagram is what fills the rail, so an entry without one has an empty
  right column at ≥1240px. 61 of the 63 entries carry a diagram; CLI and
  Desktop app are still pending art. A new entry should ship with one; if art
  generation is unavailable, park the ready-to-paste figure block in
  `assets/101/PENDING-DIAGRAMS.md` and its subject in
  `assets/101/diagram-prompts.json`.
- The pipeline is generate (Codex `image_gen`, on a ChatGPT subscription) →
  `assets/101/make-diagram.py` (trim, 1500px, snap to the five) →
  `assets/101/recolor.py <explicit paths>` → `assets/101/verify-diagrams.py`.
  Never run `recolor.py` or `optimise.py` bare: their source directory holds 13
  superseded diagrams that would overwrite shipped art in both themes.

## 8. Site-wide invariants

- Xavier is positioned as "Vice President at OCBC", everywhere, with no
  department name. The bio page, footer, README and JSON-LD already comply.
- Light mode is the default; dark is the opt-in.
- Every page carries the same `footer.colophon`: a "Logged & maintained"
  block (portrait, one line on who Xavier is, the three profile links) on the
  left, and "Status" pushed to the right. Nothing else goes in it. Credentials
  live in the Person JSON-LD and in `llms.txt`, not in the footer. Four copies
  exist, so a change to one is a change to all: `index.html`, `curator.html`,
  the template in `generate-seo.mjs`, and `ai-101.html`.
- The footer date comes from `LOG_UPDATED` everywhere except `ai-101.html`,
  which does not load `tools.js`; bump that page's hand-written date in the
  same commit that bumps `LOG_UPDATED`.
- Everything on the site is free to read and free of affiliate links, and the
  copy may say so.
- The nav tab label stays the short "AI 101" even though the course's full
  title is "Artificial Intelligence 101".
- Page URLs keep the `.html` on the end (`/ai-101.html`, not `/ai-101`). Every
  internal link, every sitemap entry and every canonical tag agrees on that
  shape, and the host is configured to serve it literally. Dropping the
  extension is a site-wide migration, not a per-page choice.
- Commit messages: imperative subject, a prose body explaining why (not a
  bullet list of the diff), and the repo's existing Co-Authored-By trailer
  convention when an agent wrote it.
