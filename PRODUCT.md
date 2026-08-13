# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: peers in the design/product/AI-builder community — designers, PMs, and engineers who already work with AI tooling and want a trusted, opinionated shortlist. They arrive from Xavier's portfolio, LinkedIn, or shared links, typically on desktop at work or mobile from a feed. Their job: "tell me what's actually worth installing, and how."

Secondary: Xavier himself, as maintainer — adding a tool must stay a one-object edit.

## Product Purpose

A one-page, personally curated directory of the AI tools Xavier Ting uses daily. Each entry points to its GitHub repo and answers three questions: why it matters, when to reach for it, and how to install/use it. Success is dual and equal: the page itself is a portfolio-grade artifact that gets bookmarked and shared, AND visitors actually adopt the tools (copy a command, install, use).

## Positioning

"Tools I use daily." Not an exhaustive directory like claude.com/plugins — a daily-driver stack vouched for by one practitioner (a CX Design Lead who designs and ships with these tools). The curation and the craft of the page are the same statement: this person has taste.

## Operating Context

Visitors scan a card grid, filter by category tabs, open a tool's detail page to read why/when/how, copy an install command, and jump to GitHub. Commands get pasted into Claude Code, Cursor, or a terminal. The page is shared as a link on social/professional feeds, so first-viewport impression and og-metadata matter.

## Capabilities and Constraints

- Plain HTML/CSS/JS. No framework, no dependencies, no deploy-time build. One optional Node generator (`generate-seo.mjs`) refreshes SEO artefacts on demand. Static deploy on Vercel/Netlify.
- Three artefacts: index.html (hero → tabs → static card grid → colophon), tools/<slug>.html (one static, indexable page per tool), and tool.html (noindex redirect shim for legacy ?tool= links).
- Tool data lives in `tools.js` as a plain array; curation = editing that file, then running `node generate-seo.mjs` to regenerate the static pages, sitemap and llms.txt. Site identity and the canonical URL live in `site.js` (one line to change after deploy). Deployment is still a plain static upload — no build pipeline.
- Current set: 25 tools and counting — the list lives in `tools.js`. Categories: Design, Writing, Coding, Connections, Workflow, Knowledge. The set grows; page copy must never hardcode the count (numbers derive from tools.js).
- Content voice: confident, opinionated, concise — and readable by a newcomer. User directive (2026-08-12): a tertiary student with limited AI knowledge must be able to follow every log entry, so terms of art get explained at first use, every command box says where its line gets typed, and concept words link to their AI 101 definitions, and AI 101 itself spells out every acronym at first use.

## Brand Commitments

- Xavier Ting personal brand. Positioning (user directive 2026-08-12, superseding the CX-design title on record): **Vice President at OCBC · AI & Design Leader** — "Customer Experience Design" no longer appears anywhere on the site. Banner identity from LinkedIn (read 2026-07-30): banner line **"AI for the rest of us"**; headline promise "I build with AI daily and share what I learn / Making AI accessible for everyone". Profile links (both, labelled, in the hero byline and colophon): linkedin.com/in/xavierting and x.com/xaviertingai.
- **Accent colour #E0BF91** (his brand gold, from the LinkedIn banner) is user-pinned as the single accent. Montserrat + Poppins remain the brand type thread.
- His portrait appears on the page (hero byline + colophon) from `assets/portrait.jpg` — one swappable file, see `assets/README.md`.
- Credentials on record (from xavierting.com/about, not currently shown on the site): Master Certified NN/g UX Specialist, Certified Scrum Master & Product Owner, LEGO® SERIOUS PLAY® facilitator; OCBC Business App revamp won Best Corporate Mobile Initiative 2023 (Asian Banker) and Singapore Good Design Award 2023.
- User's binding layout reference (2026-07-30): claude.com/plugins — card grid on the index, a fuller detail page per tool, category tabs kept.
- User's confirmed visual direction (2026-07-30): dark ground, "modern and futuristic," aurora-drift background. Explicitly rejected: the quad-grid background. Earlier white-minimal pin is superseded for this site.
- User directive (2026-08-12): the entire site carries **both light and dark themes**, with **light as the default** — toggle in the header strip, choice persisted, dark available on request. The light rendition ("Daylight") derives from the AI 101 course's linen palette; see DESIGN.md.
- Three surfaces (2026-08-12): The log (index + tool pages), AI 101 (ai-101.html, the course), The curator (curator.html, bio). One shared tab bar; the two hand-owned pages are never touched by the generator.
- Standing directive: "design wise be as creative as possible — show what the world can do." Craft ambition is a binding brief, not decoration.

## Evidence on Hand

All 9 tools are real, with real repos/gists the user supplied or approved. No testimonials, install counts, or metrics exist for this site — do not fabricate any. GitHub star counts must not be hardcoded (they go stale) or fetched live (rate limits).

## Product Principles

1. Curation over completeness — 9 vouched-for tools beat 900 listed ones; every entry earns its place.
2. Why before how — peers need the argument for a tool before the install command.
3. The page is the proof — craft level of the site itself is evidence for the curator's taste.
4. Zero-friction adoption — from curiosity to copied install command in two clicks.
5. Hand-editable forever — no tooling between Xavier and his own curation.

## SEO / AEO / Discovery

- Every tool has a real static page at `tools/<slug>.html` — content must never be JS-only, because most AI crawlers do not execute JavaScript.
- `llms.txt`, `robots.txt` (AI crawlers explicitly allowed), `sitemap.xml` and JSON-LD (`Person`, `WebSite`, `ItemList`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`) are generated, never hand-edited.
- The `Person` node's `sameAs` (LinkedIn, X, portfolio) is the personal-branding spine: it is how search engines resolve the three profiles into one entity.
- User chose privacy-friendly analytics (Plausible or Cloudflare) — colophon says "no cookies, no ad tracking". Not yet installed; see `SEO.md` §5.
- Never fabricate ratings, review counts or install numbers in structured data.
- Full playbook and post-deploy checklist: `SEO.md`.
