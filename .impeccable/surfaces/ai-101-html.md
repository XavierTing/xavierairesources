---
version: 1
slug: "ai-101-html"
primary_target: "ai-101.html"
related_targets: ["101.css","101.js"]
---

# Surface: ai-101.html (+ 101.css, 101.js, assets/101/)

Scope: the "AI 101" tab — the Artificial Intelligence 101 course as the site's second page. Visitor mode: Read — a beginner must understand 48 AI terms, not adopt tools; the back half turns understanding into operational literacy for building digital products with agentic tools (Claude Code, Codex, Antigravity, Kimi).

Audience & job: people new to AI (colleagues, students, LinkedIn readers), arriving from the log tab or a shared link; "explain the words everyone keeps using — then the words you need to build." A tertiary student with zero AI knowledge must follow every sentence. Success: they finish a chapter and can define the words in it.

Content: 55 terms across 9 chapters + cover (expanded 2026-08-12 from the 27-term port, on the syllabi of four Nick Saraev 2026 courses + classic AI-foundation curricula). Chapters 06 "What you're actually building" (web-stack literacy) and 07 "Shipping it safely" (build loop, debugging, security five, audits, prompt injection) are Builder-tagged. Fixed entry anatomy: display word → gold bar → What it is → For example → analogy → diagram (now near-universal: 42 dg-* images) → In one line. Three interactives (context meter, flight walkthrough, tool filter), fix table, recap dl, Singapore UTAP note. New plates: 08-frame (stack), 09-lighthouse (ship). Art style (user-directed 2026-08-12, superseding the flat-poster diagrams and engraved plates): the whole set — 42 diagrams AND 9 plates — is a friendly hand-drawn sketchnote style (wobbly ink outlines, curved arrows, hand-lettered caps, after Nick Saraev's course slides), still strictly in the five-colour linen palette so recolor.py's dark pass keeps working.

Constraints: hand-owned page — generate-seo.mjs never touches it (it only adds the URL to sitemap/llms.txt). Duplication is deliberate for no-JS/crawlers: cover TOC = chapmenu list; each "In one line" repeats in the recap; chapend titles are hand-written — SYNC comments mark each pair. Chapter router + interactives live in 101.js; deep links (#e-mcp) open their chapter.

Chosen direction: Signal Field inherited whole (see DESIGN.md), in both themes, with Daylight (the default) restoring the course's original linen world — the markup ships the assets/101/light/ art and theme.js swaps to the dark set only for Night; tokens cascade through the aliases. Layout: centred 1240px column; at >=1240px each article.entry splits prose (.entry-flow) beside its analogy+diagram rail (.entry-rail); the ch6 section.entry stays single-column. 101.css aliases the course's token names (--linen, --rule, --gold…) onto site tokens. Course keeps its own devices in-world: 96×4 gold bar, glass chapter plates with recoloured art tiles, gold-fill numerals, chaptered navigation (sticky glass bar desktop / floating bottom bar mobile). Artwork recoloured by assets/101/recolor.py — the ember #d97757 there must match --ember in 101.css.

Memorable moment: the context meter turning ember at "turn 7"; the chapter plate with its engraved tile.

Unresolved: og:image reuses the site card (a course-specific 1200×630 could replace it); print sends dark diagrams to paper (plates are hidden, diagrams kept for meaning).
