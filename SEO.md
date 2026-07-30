# SEO / AEO / SEM playbook

What is already built into the site, and what only you can do (accounts, DNS, money).

---

## 0. Do this first — one line, then one command

The site is live at **https://xavierairesources.netlify.app** and `site.js` now
declares that. If the domain ever changes, edit `SITE.url` and re-run the generator:

```bash
# 1. edit SITE.url in site.js
node generate-seo.mjs
```

That rewrites every canonical tag, `og:url`, `og:image`, the `sitemap.xml`,
`robots.txt`, `llms.txt` and all JSON-LD references. **A wrong canonical URL
actively suppresses ranking** — the site shipped for a day pointing at a dead
Vercel URL, which is exactly how pages get dropped from an index.

The generator now owns every URL-bearing tag and the tool count in the index
title, so neither can go stale by hand-editing again.

Re-run the same command any time you edit `tools.js` — it keeps the static pages,
sitemap and llms.txt in sync with your curation.

---

## 1. What was built (SEO)

**The structural fix.** Every tool now has its own real, static, crawlable page at
`tools/<slug>.html` — twelve indexable URLs instead of one JavaScript-rendered page.
The index card grid also ships as real HTML. This matters because Google renders
JavaScript slowly and most other crawlers don't render it at all.

`tool.html?tool=<slug>` still works — it redirects to the new page and is marked
`noindex` so it can't compete with the real one.

| Item | Where |
|---|---|
| Unique `<title>` + meta description per page | all 13 pages |
| `rel=canonical` on every page | all 13 pages |
| Open Graph + Twitter card, absolute image URL | all 13 pages |
| `twitter:creator` / `twitter:site` = `@xaviertingai` | all 13 pages |
| `sitemap.xml` (13 URLs, lastmod, priority) | generated |
| `robots.txt` with sitemap reference | generated |
| Semantic headings — one `<h1>` per page | all pages |
| `favicon.svg` in brand gold | root |

**Titles are keyword-led, not brand-led** — "AI Resources — 12 AI tools I use
daily | Xavier Ting" beats "AI Resources" because nobody searches your site name
before they know it exists.

---

## 2. What was built (AEO — answer engines)

AEO is getting **cited** by ChatGPT, Perplexity, Claude, and Google AI Overviews.
Three things make that happen, and all three are now in place.

**a. `llms.txt`** — the entire log as clean markdown at `/llms.txt`: every tool
with its Why / When / How, your bio, your links, and a citation request. This is
the emerging convention for AI crawlers, and it removes any dependency on
JavaScript execution.

**b. `FAQPage` structured data on every tool page.** Your Why / When / How format
was already shaped like questions, so each page now declares three explicit Q&A
pairs:

- "Why use Impeccable?"
- "When should you use Impeccable?"
- "How do you install and use Impeccable?"

Answer engines quote whole answers. Self-contained answers get quoted; fragments
don't.

**c. `robots.txt` explicitly welcomes AI crawlers** — GPTBot, OAI-SearchBot,
ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot. Silence is
often read as ambiguity; this is an explicit invitation with a pointer to
`llms.txt`.

> **A real trade-off:** allowing these crawlers means your writing may be used in
> AI training and answers, usually with a link, sometimes without. That is the
> price of being cited. To opt out of training while staying in search, change
> `Google-Extended`, `Applebot-Extended` and `CCBot` to `Disallow: /` in
> `generate-seo.mjs` and re-run it.

---

## 3. What was built (personal branding)

A `Person` schema node on every page, linked from each page as its author and
reviewer:

- Name, job title (VP, Customer Experience Design), employer (OCBC)
- `sameAs` → LinkedIn, X, portfolio — this is how Google connects the three
  profiles into one entity and becomes eligible to show a Knowledge Panel
- `knowsAbout` → AI, generative AI, AI agents, CX design, design systems,
  prompt engineering, product management
- `hasCredential` → your NN/g, Scrum, and LEGO® SERIOUS PLAY® certifications

Visibly: your "AI for the rest of us" line leads every page, your portrait and
role sit in the hero and colophon, and your credentials are now in the footer.
Google's E-E-A-T weighting rewards named, credentialed authors — and answer
engines prefer citing a person over an anonymous list.

**Left off the page on purpose:** your two 2023 OCBC Business App awards (Asian
Banker Best Corporate Mobile Initiative, Singapore Good Design). They're recorded
in `PRODUCT.md`. Say the word and I'll add them — they're strong authority
signals, but they're about a different product than this page.

---

## 4. SEM — what I cannot do, and what you should do

**I can't run paid campaigns.** SEM means Google Ads / LinkedIn Ads: accounts,
billing, bidding. No code produces it. What I can give you is the groundwork and
an honest opinion.

**My honest opinion: don't buy ads for this page.** Paid search works when a click
has a measurable value — a sale, a signup, a lead. This page's goal is reputation.
You'd be paying for clicks on content whose value is that the right people find it
organically. Your existing distribution is better and free: you already have a
LinkedIn audience and a "follow me for weekly AI tips" promise.

**Do these instead, in order:**

1. **Google Search Console** — verify the domain, submit `sitemap.xml`. Free, no
   site script, and the only way to see real queries. The site is live, so this is
   the highest-value thing you can do today.
2. **Bing Webmaster Tools** — same, and it feeds ChatGPT's search index.
3. **Post it on LinkedIn and X yourself.** One post from you, with the
   `og-image.png` card, will outperform any ad budget you'd reasonably spend.
   Your banner already promises weekly AI tips; this is the artifact.
4. **Privacy-friendly analytics** (you chose this) — see §5.

**If you do decide to advertise later,** the keyword themes with genuine intent
are below. Note that broad terms like "AI tools" are dominated by high-budget
listicle sites; your edge is the specific, opinionated long tail.

| Theme | Example queries | Why it fits |
|---|---|---|
| Curated stacks | "AI tools designers actually use", "AI stack for product designers" | Matches your positioning exactly |
| Tool + purpose | "figma mcp setup", "chrome devtools mcp claude code", "context7 mcp install" | High intent, low competition, you have real how-tos |
| Agent workflow | "claude code plugins worth installing", "spec driven development AI" | Practitioner intent |
| Your brand | "xavier ting ai", "ai for the rest of us" | Cheap, defends your name |

---

## 5. Analytics setup (5 minutes, your accounts)

You chose privacy-friendly analytics, so the colophon now reads "no cookies, no
ad tracking" — which stays true with either option below. Nothing is installed
yet; pick one and add the single line before `</head>` in `index.html` **and** in
the `detailPage` template inside `generate-seo.mjs` (then re-run the generator so
all twelve tool pages get it too).

**Option A — Cloudflare Web Analytics** (free, unlimited)

```html
<script defer src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

**Option B — Plausible** (~$9/mo, nicer dashboards, EU-hosted)

```html
<script defer data-domain="YOUR_DOMAIN" src="https://plausible.io/js/script.js"></script>
```

Both are cookieless and need no consent banner in the EU. Neither supports Google
Ads conversion tracking — if you ever want that, you'd need GA4 instead, and the
"no cookies" line would have to go.

---

## 6. Post-deploy checklist

- [ ] Set `SITE.url` in `site.js`, run `node generate-seo.mjs`
- [ ] Confirm `/robots.txt`, `/sitemap.xml`, `/llms.txt` load on the live domain
- [ ] Google Search Console: verify + submit sitemap
- [ ] Bing Webmaster Tools: verify + submit sitemap
- [ ] Validate structured data: <https://search.google.com/test/rich-results>
- [ ] Check the share card renders: <https://cards-dev.twitter.com/validator> and
      LinkedIn's Post Inspector
- [ ] Add the analytics snippet (§5)
- [ ] Add the live URL to your LinkedIn featured section and X bio — inbound links
      from your own verified profiles are what make the `sameAs` entity link stick
- [ ] Post about it once on LinkedIn and X

---

## 7. Keeping it healthy

- **After editing `tools.js`:** run `node generate-seo.mjs`. Skipping it leaves the
  static pages, sitemap and llms.txt stale — the tool would be invisible to search.
- **`og-image.png` is a rendered PNG** and shows the tool count and the portrait.
  Regenerate it when either changes — it went stale at "10 TOOLS" with an old
  portrait while the site said 12, and that card is what LinkedIn and X display.
- **Don't add a second `<h1>`** to any page, and keep one canonical URL per tool.
- **Never** fabricate ratings, review counts, or install numbers in structured
  data. Google penalises it, and the log's whole value is that it's honest.
