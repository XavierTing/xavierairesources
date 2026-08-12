---
version: 1
slug: "curator-html"
primary_target: "curator.html"
related_targets: []
---

# Surface: curator.html

Scope: the "The curator" tab — Xavier's bio page. Visitor mode: Read/Persuade-lite — a visitor from either tab or LinkedIn learns who curates this and why to trust it.

Audience & job: peers and beginners alike; "who is behind this site?" Success: they understand the person, the credibility, and pick a tab to continue.

Content: drafted from PRODUCT.md records + Xavier's own first-person course passages (vibe-coding team story, banking/regulator line) — nothing invented. xavierting.com/about was unreachable (403) at build time; revisit for richer material. Sections: portrait + name + role lede; meta panel (role, credentials, recognition, links); three labelled sections (The short version / How I work / Why this site); "On this site" duo cards into the other tabs.

Chosen direction: Signal Field inherited whole, both themes via tokens. Reuses the tool-page grammar (.detail/.detail-main/.meta/.sections) plus .card for the duo. Loads theme.js + tools.js + app.js (app.js needs the TOOLS global; provides is-loaded choreography + copy handling).

Constraints: hand-owned — the generator only lists it in sitemap/llms.txt. Facts must stay verifiable; no metrics, no testimonials.

Unresolved: og:image reuses the site card; pull richer bio material when xavierting.com is reachable.
