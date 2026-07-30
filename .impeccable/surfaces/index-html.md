---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["tool.html"]
---

# Surface: index.html (+ tool.html detail template)

Scope: two-template curated AI tools directory. Visitor mode: Persuade — a peer must trust the curation, adopt a tool (copy install command / open repo), and remember the page.

Audience & job: design/product/engineering peers arriving from Xavier's portfolio or a shared link; "tell me what's worth installing, and how." Success is dual: the page impresses AND tools get adopted.

Action/proof: 9 vouched-for tools as cards (index) opening detail pages (tool.html?tool=slug) with WHY/WHEN/HOW + copyable install command + repo link + curator's note. No fabricated metrics.

Constraints: plain HTML/CSS/JS, no build step, works as local file, deploys static (Vercel/Netlify). Tool data lives in tools.js only; counts and dates derive from it.

Chosen direction: Signal Field (see DESIGN.md) — dark ground, aurora-drift background, glass cards, pulse-blue/ember signals. Layout pinned by user to claude.com/plugins: card grid + per-tool detail page + category tabs. Replaced the earlier Field Log world (user redirect 2026-07-30: rejected grid background, wanted modern/futuristic dark).

Memorable moment: the breathing aurora + card lift-glow; ember pulse-ring on copy.

Unresolved: og:image needs its absolute URL after deploy.
