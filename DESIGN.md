---
name: AI Resources — Signal Field
description: Xavier Ting's daily AI stack — a warm dark instrument panel under a drifting aurora, in his brand gold
colors:
  bg: "#0a0908"
  bg-raise: "#131110"
  ink: "#f4f2ef"
  body-ink: "#c4bfb6"
  muted: "#948d82"
  accent-gold: "#e0bf91"
typography:
  display:
    fontFamily: "Montserrat, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  detail-title:
    fontFamily: "Montserrat, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.2rem, 5.4vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  card-name:
    fontFamily: "Montserrat, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  lead:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.6vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.7
  lede-detail:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Fragment Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  command:
    fontFamily: "Fragment Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  card: "16px"
  control: "10px"
  chip: "999px"
  hairline: "2px"
spacing:
  base: "8px"
  card-pad: "26px"
  grid-gap: "20px"
  page-pad: "clamp(20px, 5vw, 48px)"
components:
  card:
    backgroundColor: "rgba(255,255,255,0.025)"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "26px 26px 22px"
  category-chip:
    textColor: "{colors.accent-gold}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "5px 10px"
  copy-button:
    textColor: "{colors.accent-gold}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  copy-button-hover:
    textColor: "{colors.bg}"
    backgroundColor: "{colors.accent-gold}"
---

# Design System: AI Resources — Signal Field

## Overview

**Creative North Star: "The Signal Field"**

A warm dark instrument panel under a drifting aurora: near-black warm ground with three enormous, slow-breathing glow fields (gold, copper, bronze) providing all the atmosphere, glass-edged rounded cards floating above, and one accent doing all the talking — Xavier's brand gold, #e0bf91, the same gold as his LinkedIn banner and the ring around his portrait. The layout follows the user-pinned claude.com/plugins reference: a card grid on the index, a full detail page per tool, category tabs kept. Modern and futuristic without the clichés: no neon outlines, no scanlines, no gradient text — the futurism is atmospheric depth, restraint, and motion that breathes. The curator is present on the page: his portrait in a gold ring sits under the hero and in the colophon.

Confirmed anti-references: the quad-grid/graph-paper background (explicitly rejected by the user); light/cream grounds; "hacker terminal" neon; cool blue-grey neutrals (they fought the gold).

**Key Characteristics:**
- Warm near-black sheet (#0a0908) with a fixed aurora layer drifting behind everything (60–90s cycles)
- Glass cards: 2.5% white fill, 1px 10% warm-white border, 16px radius; hover lifts with a gold-tinted glow
- One accent, two treatments: gold as **outline/text** = information (chips, labels, links); gold as **fill** = action (active tab, copy on hover)
- Warmed neutrals throughout — no cool greys anywhere
- Mono is measurement and code — labels, №, commands — never body costume
- Index card → detail page; detail = big title + lede left, meta panel right, WHY/WHEN/HOW sections below

## Colors

One accent on warm deep neutrals. The accent is the curator's own brand gold, taken from his LinkedIn identity.

### Primary
- **Brand Gold** (#e0bf91): category chips, section labels (WHY/WHEN/HOW), links, kicker, focus rings, active tab underline, copy button, the curator's-note rule, the portrait ring. The only non-neutral hue on content. **11.2:1 on bg.**
  - **Outline treatment** (gold text, gold hairline, 13% gold fill) = information.
  - **Fill treatment** (solid gold, `--bg` text) = action: copy-on-hover, active states.

### Neutral
- **Warm Void** (#0a0908): the ground. The aurora sits on it; content never gets tinted panels beyond the card fill.
- **Raise** (#131110): command blocks.
- **Ink** (#f4f2ef): headings, card names, meta values. 17:1.
- **Body Ink** (#c4bfb6): prose, taglines. 11:1.
- **Muted** (#948d82): meta labels, counts, inactive tabs. 6:1.
- **Line** (warm white @ 10%): card borders, rules; 24% for hover borders.

### Aurora (background only, never on content)
- Gold `rgba(224,191,145,.10)`, copper `rgba(190,130,80,.14)`, bronze `rgba(140,95,55,.12)` — huge radial blobs, blur 90px, drifting 64–88s alternate cycles. Gold is luminous, so its alpha runs lowest of the three; raising it greys out the black.

### Named Rules
**The One-Gold Rule.** Gold is the only non-neutral hue that ever touches content. A second accent hue is never introduced — differentiate by treatment (outline vs fill), never by adding a colour.
**The Atmosphere-Not-Chrome Rule.** Colour lives in the background field and small signals — never in gradient text, coloured panels, or neon outlines.
**The Warm-Neutral Rule.** Every grey carries a warm cast. A cool blue-grey next to this gold reads as a mistake.

## Typography

**Display Font:** Montserrat (Helvetica Neue fallback) — the brand thread from xavierting.com; 800 display, 700 card names
**Body Font:** Poppins (system-ui fallback), 400–500
**Label/Mono Font:** Fragment Mono — labels, №, commands; italic for the curator's notes

**Character:** Confident geometric display over an even body, with a precise mono for everything measured. Unchanged from the brand thread; the world around it changed.

### Hierarchy
- **Display** (800, clamp(2.6–5.25rem), 1.0): index headline.
- **Detail title** (800, clamp(2.2–4rem), 1.02): tool name on its page.
- **Card name** (700, 1.5rem/24px): tool names in the grid. Marked up as `<h2>` — the correct outline level under the page's single `<h1>`, and ten keyword-bearing headings for search.
- **Lede** (400, clamp(1.05–1.3rem), 1.6): the detail page's opening line.
- **Lead** (400, clamp(1–1.125rem)): index hero subline.
- **Body** (400, 1rem, 1.7): sections and taglines, 72ch max.
- **Label** (mono, 0.72rem/11.5px, +0.08em, uppercase): tabs, meta labels, counts, section headings, chips, profile links. **The only micro size** — nothing functional goes below it.
- **Command** (mono, 1rem): install commands and italic curator notes. Sits on the body step so the ramp stays two literal steps (11.5px label / 16px body) plus the fluid display clamps.

### Named Rules
**The Measured-Mono Rule.** Fragment Mono appears only where the world measures, labels, or codes. Body prose is never mono.

## Layout

Index: max-width 1180px; hero (kicker → headline → sub → byline → counts) → tabs row on a hairline → 3-column card grid (2 at ≤1020px, 1 at ≤640px; 20px gap, 14px at ≤640px) → colophon. Curator asides (`.grid-note`, gold-ruled mono italic) span the full grid row after tools 03 and 06, visible on the unfiltered log only. Detail: breadcrumb strip → two-column header (title + lede left, 300px meta panel right; stacks at ≤1020px) → full-width WHY/WHEN/HOW sections (110px label column, stacks at ≤640px) → curator's note → back link → prev/next pager → colophon. 8px rhythm; generous vertical clamp spacing.

## Elevation & Depth

Depth comes from the aurora behind and glass in front. Cards: translucent fill + hairline border at rest; hover adds `translateY(-3px)` and one gold-tinted soft shadow (`0 12px 40px -18px rgba(224,191,145,.3)`) — the only box-shadow in the system besides the active tab's gold glow and the copy pulse-ring. Nothing else casts.

## Shapes

Rounded, in three steps: 16px cards and meta panels, 10px controls and command blocks, 999px category chips. Hairline 1px borders everywhere; the gold tab underline (2px), the note rule (2px), and the portrait ring (2px, 1px in the colophon) are the only heavier strokes. The portrait is the one circle in the system.

## Components

### Category Tabs
- Mono uppercase text buttons on the grid's top hairline; `aria-pressed`.
- Inactive: Muted. Hover: Ink. Active: Ink + 2px gold underline with a soft gold glow, animated scaleX from the left.

### Tool Card (index)
- An `<a>` to `tool.html?tool=<slug>`: chip + № top row, name, tagline, "READ ENTRY →" footer.
- Hover: border brightens, fill to 4%, lifts 3px with the blue glow, arrow nudges right.
- Cards reveal on load/scroll with a ≤360ms stagger; on tab filtering, surviving cards rise back in (`card-in` 0.4s, ≤280ms stagger, skipped under reduced motion).

### Detail Meta Panel
- Glass card (same material as tool cards): Category / Made by (derived from repo URL) / Curator's status / Source link. Mono micro-labels over Ink values.

### Sections (detail)
- WHY / WHEN / HOW with pulse-blue mono headings in a 110px column; HOW is a decimal-leading-zero list ending in the command block.

### Command Block + Copy
- Raise ground, hairline border, 10px radius, mono command. Copy button: ember outline; hover fills ember; on copy it fills, swaps to "Copied ✓", and emits one pulse-ring (0.5s), reverting after 1.6s.

### Portrait (signature)

- One square photo, `assets/portrait.jpg`, circled and ringed in CSS: 68px in the hero byline (2px gold border, 3px padding), 44px in the colophon (1px border, 2px padding). Never cropped in code; swap the file to change the photo.
- Sits beside a three-line byline: name (Ink, plain text — not a link, since two destinations exist), role, then labelled profile links (gold, mono label step, ↗). Name over role (body 1rem, Body Ink). The role is identity content, not a micro-label, so it stays on the body step — putting it on the label step made it illegible, and giving it its own step muddied the ramp.

### Curator's Note
- Blue-less: ink mono italic behind a 2px ember left rule with an ember ✎ — the one place ember touches prose.

### Aurora (signature)
- Fixed, `z-index:-1`, three blurred radial blobs on slow alternate drift loops. Static under `prefers-reduced-motion`; hidden in print.

## Do's and Don'ts

### Do:
- **Do** let the aurora carry all atmosphere — content surfaces stay glass-neutral.
- **Do** keep the portrait as the one human element: a plain square photo, circled and gold-ringed in CSS (see `assets/README.md`).
- **Do** keep hover physics consistent: lift + border-brighten + one soft glow, 0.25s ease-out.
- **Do** respect `prefers-reduced-motion` everywhere: static aurora, no lifts, instant reveals.
- **Do** keep every functional text at 0.72rem or above — there is no smaller step.

### Don't:
- **Don't** use gradient text, neon outlines, scanlines, or grid/graph backgrounds (user-rejected).
- **Don't** add a second accent hue or put aurora colours on content elements.
- **Don't** cast shadows except the card hover glow, active-tab glow, and copy pulse-ring.
- **Don't** hardcode GitHub stars, install counts, or any metric the log cannot verify.
