#!/usr/bin/env node
/* ============================================================
   SEO / AEO GENERATOR
   Reads site.js + tools.js and emits everything a crawler or an
   answer engine needs as REAL static files:

     tools/<slug>.html   one indexable page per tool, full content
     sitemap.xml         every URL, with the tool pages
     robots.txt          crawl rules incl. AI crawlers
     llms.txt            the whole log in markdown, for answer engines
     index.html          static card grid + JSON-LD (between markers)

   Run it after editing tools.js or site.js:
       node generate-seo.mjs

   Deployment stays a plain static upload — this is a content
   refresh, not a build pipeline.
   ============================================================ */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const read = (f) => readFileSync(join(ROOT, f), "utf8");

/* ---------- load the plain data files ---------- */

function loadGlobals(file, names) {
  const src = read(file).replace(/if \(typeof module[\s\S]*$/m, "");
  const fn = new Function(`${src}\n;return {${names.join(",")}};`);
  return fn();
}

const { SITE } = loadGlobals("site.js", ["SITE"]);
const { TOOLS, LOG_UPDATED } = loadGlobals("tools.js", ["TOOLS", "LOG_UPDATED"]);

const BASE = SITE.url.replace(/\/$/, "");
const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");
const escAttr = (s) => esc(s).replace(/'/g, "&#39;");
const categories = [...new Set(TOOLS.map((t) => t.category))];
const toolUrl = (t) => `${BASE}/tools/${slug(t.name)}.html`;
const repoOwner = (u) => (u.match(/(?:github\.com|gist\.github\.com)\/([^/]+)/) || [])[1] || null;

/* ---------- shared JSON-LD nodes ---------- */

const personNode = {
  "@type": "Person",
  "@id": `${BASE}/#curator`,
  name: SITE.curator.name,
  jobTitle: SITE.curator.jobTitle,
  description: SITE.curator.summary,
  image: `${BASE}/assets/portrait.jpg`,
  url: BASE,
  worksFor: { "@type": "Organization", name: SITE.curator.worksFor },
  sameAs: [SITE.curator.linkedin, SITE.curator.x, SITE.curator.portfolio],
  knowsAbout: SITE.curator.knowsAbout,
  hasCredential: SITE.curator.credentials.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c,
  })),
};

const siteNode = {
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: `${BASE}/`,
  name: SITE.name,
  alternateName: SITE.tagline,
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@id": `${BASE}/#curator` },
  creator: { "@id": `${BASE}/#curator` },
};

function toolNode(t) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${toolUrl(t)}#tool`,
    name: t.name,
    description: t.blurb || t.tagline,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    url: t.repo,
    ...(t.maker || repoOwner(t.repo)
      ? { author: { "@type": "Organization", name: t.maker || repoOwner(t.repo) } }
      : {}),
    ...(t.command ? { installUrl: t.repo, softwareHelp: t.repo } : {}),
  };
}

const jsonLd = (obj) =>
  `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n  </script>`;

/* ---------- AI 101 term links ----------
   The course defines the concept words the log leans on. First mention of
   each on a tool page becomes a link to its definition. Lowercase-only
   matches (MCP excepted) so tool names like Agent-Reach and Supabase
   Plugin never get linked; one link per term per page. Applied to
   already-escaped text, so the only markup present is what we add. */

const AI101_TERMS = [
  ["context window", "context", "i"],
  ["connected tools", "connectors", ""],
  ["plugins?", "plugins", ""],
  ["skills?", "skills", ""],
  ["tokens?", "token", ""],
  ["agents?", "agent", ""],
  ["MCP", "mcp", ""],
  ["RAG", "rag", ""],
  ["webhooks?", "webhook", ""],
  ["web search", "websearch", "i"],
  ["cron", "cron", ""],
  ["second brain", "secondbrain", "i"],
  ["GitHub", "github", ""],
  ["Terminal", "terminal", "i"],
];

function makeTermLinker() {
  const linked = new Set();
  return (escaped) => {
    for (const [pattern, anchor, flags] of AI101_TERMS) {
      if (linked.has(anchor)) continue;
      const re = new RegExp(`\\b(${pattern})\\b`, flags);
      if (re.test(escaped)) {
        escaped = escaped.replace(re, `<a href="../ai-101.html#e-${anchor}">$1</a>`);
        linked.add(anchor);
      }
    }
    return escaped;
  };
}

/* the label on the command box: where the grey line actually gets typed.
   Authored HTML, not escaped on the way out — "Terminal app" links to the
   AI 101 entry that explains what the Terminal is. */
const COMMAND_TARGETS = {
  terminal: `Paste into the <a href="../ai-101.html#e-terminal">Terminal app</a>`,
  claude: "Type inside Claude Code",
  assistant: "Paste into your assistant",
};

/* ---------- 1. per-tool static pages ---------- */

function detailPage(t, i) {
  const prev = TOOLS[(i - 1 + TOOLS.length) % TOOLS.length];
  const next = TOOLS[(i + 1) % TOOLS.length];
  const owner = t.maker || repoOwner(t.repo);
  const url = toolUrl(t);
  const title = `${t.name} — ${t.tagline} | ${SITE.name}`;
  const desc = (t.blurb || `${t.tagline}. ${t.why}`).slice(0, 300);

  /* Q&A shaped so answer engines can quote a whole answer verbatim */
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { q: `Why use ${t.name}?`, a: t.why },
      { q: `When should you use ${t.name}?`, a: t.when },
      {
        q: `How do you install and use ${t.name}?`,
        a: t.how.join(" ") + (t.command ? ` Command: ${t.command}` : ""),
      },
    ].map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      personNode,
      siteNode,
      toolNode(t),
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description: desc,
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${url}#tool` },
        reviewedBy: { "@id": `${BASE}/#curator` },
        primaryImageOfPage: `${BASE}/og-image.png`,
        datePublished: SITE.published,
        dateModified: isoDate(LOG_UPDATED),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: t.category, item: `${BASE}/#${slug(t.category)}` },
          { "@type": "ListItem", position: 3, name: t.name, item: url },
        ],
      },
    ],
  };

  /* prose gets first claim on a term link; the how-steps pick up the rest */
  const linkTerms = makeTermLinker();
  const whyHtml = linkTerms(esc(t.why));
  const whenHtml = linkTerms(esc(t.when));
  const steps = t.how.map((s) => `            <li>${linkTerms(esc(s))}</li>`).join("\n");
  const whereLabel = COMMAND_TARGETS[t.commandTarget];
  const specimen = t.command
    ? `
          <div class="specimen">${whereLabel ? `
            <span class="specimen-where m">${whereLabel}</span>` : ""}
            <code>${esc(t.command)}</code>
            <button class="copy-btn" type="button" data-command="${escAttr(t.command)}"
                    aria-label="Copy command: ${escAttr(t.command)}">Copy</button>
          </div>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${url}">
  <meta name="author" content="${esc(SITE.curator.name)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:creator" content="${SITE.curator.xHandle}">
  <meta name="twitter:site" content="${SITE.curator.xHandle}">
  <meta name="theme-color" content="#F2ECE0">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fragment+Mono:ital@0;1&family=Montserrat:wght@700;800&family=Poppins:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
  ${jsonLd(graph)}
  ${jsonLd(faq)}
  <script>document.documentElement.classList.add("js");
try{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}</script>
</head>
<body>
  <a class="skip-link" href="#tool-root">Skip to content</a>

  <div class="aurora" aria-hidden="true">
    <span class="a1"></span><span class="a2"></span><span class="a3"></span>
  </div>

  <div class="page">

    <header class="site-head">
      <a class="brand" href="../index.html" aria-label="Xavier Ting — home">
        <span class="brand-mark">Xavier Ting</span>
        <span class="brand-sub m">AI for the rest of us</span>
      </a>
      <nav class="site-nav m" aria-label="Site sections">
        <a href="../index.html" aria-current="true">The tools</a>
        <a href="../ai-101.html">AI 101</a>
        <a href="../curator.html">The curator</a>
        <button class="theme-toggle" type="button" aria-label="Switch to dark theme">Dark</button>
      </nav>
    </header>

    <main id="tool-root">
      <nav class="crumbs m" aria-label="Breadcrumb">
        <a href="../index.html">The tools</a>
        <span class="sep">/</span>
        <span class="here">${esc(t.name)}</span>
      </nav>

      <div class="detail">
        <div class="detail-main">
          <img class="detail-art" src="../assets/cards/light/${slug(t.name)}.webp" alt="" width="512" height="512" decoding="async">
          <h1 class="detail-title">${esc(t.name)}</h1>
          <p class="detail-lede">${esc(t.tagline)}.</p>
        </div>

        <aside class="meta">
          <div><h2>Category</h2><p class="meta-cat">${esc(t.category)}</p></div>
${owner ? `          <div><h2>Made by</h2><p>${esc(owner)}</p></div>\n` : ""}${t.needs ? `          <div><h2>You'll need</h2><p>${esc(t.needs)}</p></div>\n` : ""}
          <div><h2>Source</h2><p><a class="repo-link" href="${escAttr(t.repo)}" target="_blank" rel="noopener">${esc(t.repoLabel)} ↗</a></p></div>
        </aside>

        <div class="sections">
        <section class="section">
          <h2>Why</h2>
          <div class="body">${whyHtml}</div>
        </section>
        <section class="section">
          <h2>When</h2>
          <div class="body">${whenHtml}</div>
        </section>
        <section class="section">
          <h2>How</h2>
          <div class="body">
            <ol>
${steps}
            </ol>${specimen}
          </div>
        </section>
        </div>
      </div>

      <a class="back-link" href="../index.html">← Back to the tools</a>

      <nav class="pager" aria-label="More tools">
        <a href="${slug(prev.name)}.html">← ${esc(prev.name)}</a>
        <a href="${slug(next.name)}.html">${esc(next.name)} →</a>
      </nav>
    </main>

    <footer class="colophon">
      <div>
        <h2>Logged &amp; maintained</h2>
        <div class="colophon-who">
          <img class="avatar" src="../assets/portrait.jpg" width="44" height="44" alt="${escAttr(SITE.curator.name)}" loading="lazy">
          <div>
            <p>${esc(SITE.curator.name)} · ${esc(SITE.curator.jobTitle)} at ${esc(SITE.curator.worksFor)}. I write these up so the tools stay usable by people who don't ship code for a living.</p>
            <p class="colophon-links m">
              <a href="${SITE.curator.linkedin}" rel="noopener">LinkedIn ↗</a>
              <a href="${SITE.curator.x}" rel="noopener">X ↗</a>
              <a href="${SITE.curator.portfolio}" rel="noopener">xavierting.com ↗</a>
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2>Status</h2>
        <p>Last updated ${esc(LOG_UPDATED)}</p>
      </div>
    </footer>

  </div>

  <script src="../theme.js"></script>
  <script src="../tools.js"></script>
  <script src="../app.js"></script>
</body>
</html>
`;
}

function isoDate(d) {
  const m = String(d).match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : new Date(0).toISOString().slice(0, 10);
}

mkdirSync(join(ROOT, "tools"), { recursive: true });
TOOLS.forEach((t, i) => {
  writeFileSync(join(ROOT, "tools", `${slug(t.name)}.html`), detailPage(t, i));
});
console.log(`✓ tools/*.html — ${TOOLS.length} indexable pages`);

/* ---------- 2. static card grid + JSON-LD into index.html ---------- */

let index = read("index.html");

const cards = TOOLS.map((t) => [
  `          <a class="card" href="tools/${slug(t.name)}.html" data-category="${escAttr(t.category)}">`,
  `            <img class="card-art" src="assets/cards/light/${slug(t.name)}.webp" alt="" width="512" height="512" loading="lazy" decoding="async">`,
  `            <span class="card-top"><span class="card-cat m">${esc(t.category)}</span></span>`,
  `            <h2 class="card-name">${esc(t.name)}</h2>`,
  `            <p class="card-tag">${esc(t.blurb || t.tagline)}</p>`,
  `            <span class="card-open">Read entry</span>`,
  `          </a>`,
].join("\n")).join("\n");

index = index.replace(
  /(<!-- CARDS:START -->)[\s\S]*?(<!-- CARDS:END -->)/,
  `$1\n${cards}\n        $2`
);

const indexGraph = {
  "@context": "https://schema.org",
  "@graph": [
    personNode,
    siteNode,
    {
      "@type": "CollectionPage",
      "@id": `${BASE}/#webpage`,
      url: `${BASE}/`,
      name: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#curator` },
      primaryImageOfPage: `${BASE}/og-image.png`,
      datePublished: SITE.published,
      dateModified: isoDate(LOG_UPDATED),
    },
    {
      "@type": "ItemList",
      "@id": `${BASE}/#toollist`,
      name: `${SITE.name}: the ${TOOLS.length} AI tools ${SITE.curator.name} uses daily`,
      numberOfItems: TOOLS.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: TOOLS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: toolUrl(t),
        item: toolNode(t),
      })),
    },
  ],
};

index = index.replace(
  /(<!-- JSONLD:START -->)[\s\S]*?(<!-- JSONLD:END -->)/,
  `$1\n  ${jsonLd(indexGraph)}\n  $2`
);

/* Title and descriptions carry the tool count, so the generator owns them —
   hand-editing these is how the count went stale after tools 11 and 12. */
const indexTitle = `${SITE.name} — ${TOOLS.length} curated AI tools | ${SITE.curator.name}`;
const indexDesc =
  `${SITE.tagline}. ${TOOLS.length} AI tools curated by ${SITE.curator.name} for designing, ` +
  `building and writing: what each one does, when it is worth using, and how to set it up, ` +
  `explained without jargon.`;
index = index.replace(
  /(<!-- META:START -->)[\s\S]*?(<!-- META:END -->)/,
  `$1
  <title>${esc(indexTitle)}</title>
  <meta name="description" content="${esc(indexDesc)}">
  <meta property="og:title" content="${esc(indexTitle)}">
  <meta property="og:description" content="${esc(indexDesc)}">
  <link rel="canonical" href="${BASE}/">
  <meta property="og:url" content="${BASE}/">
  <meta property="og:image" content="${BASE}/og-image.png">
  $2`
);

writeFileSync(join(ROOT, "index.html"), index);
console.log("✓ index.html — static cards + JSON-LD refreshed");

/* ---------- 3. sitemap.xml ---------- */

const lastmod = isoDate(LOG_UPDATED);
const urls = [
  { loc: `${BASE}/`, pri: "1.0", freq: "weekly" },
  /* ai-101.html and curator.html are hand-owned, not generated */
  { loc: `${BASE}/ai-101.html`, pri: "0.9", freq: "monthly" },
  { loc: `${BASE}/curator.html`, pri: "0.8", freq: "monthly" },
  ...TOOLS.map((t) => ({ loc: toolUrl(t), pri: "0.8", freq: "monthly" })),
];
writeFileSync(
  join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pri}</priority>
  </url>`).join("\n")}
</urlset>
`
);
console.log(`✓ sitemap.xml — ${urls.length} URLs`);

/* ---------- 4. robots.txt ---------- */

writeFileSync(
  join(ROOT, "robots.txt"),
  `# ${SITE.name} — ${SITE.tagline}
# Curated by ${SITE.curator.name} · ${SITE.curator.linkedin}

User-agent: *
Allow: /

# Answer engines are welcome. This list exists to be quoted.
# See /llms.txt for the full content in plain markdown.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${BASE}/sitemap.xml
`
);
console.log("✓ robots.txt");

/* ---------- 4b. keep the legacy redirect shim's canonical honest ---------- */

const shimPath = join(ROOT, "tool.html");
let shim = read("tool.html").replace(
  /<link rel="canonical" href="[^"]*">/,
  `<link rel="canonical" href="${BASE}/">`
);
writeFileSync(shimPath, shim);
console.log("✓ tool.html — redirect shim canonical");

/* ---------- 5. llms.txt — the whole log, for answer engines ---------- */

const llms = `# ${SITE.name}

> ${SITE.tagline}. ${SITE.description}

Curated by ${SITE.curator.name}, ${SITE.curator.jobTitle} at ${SITE.curator.worksFor}.
${SITE.curator.summary}

- Site: ${BASE}/
- Course: ${BASE}/ai-101.html — Artificial Intelligence 101, a plain-English short course for people new to AI, through to building real digital products with agentic tools (56 terms, 9 chapters, about an hour)
- Curator: ${BASE}/curator.html — who Xavier Ting is and why this site exists
- LinkedIn: ${SITE.curator.linkedin}
- X: ${SITE.curator.x} (${SITE.curator.xHandle})
- Portfolio: ${SITE.curator.portfolio}
- Credentials: ${SITE.curator.credentials.join("; ")}
- Tools listed: ${TOOLS.length} · Categories: ${categories.length} · Last updated: ${LOG_UPDATED}

Entries are independently curated and carry their own usage status. Nobody paid to be on this list.

---

${TOOLS.map((t) => `## ${t.num}. ${t.name} — ${t.tagline}

- **Category:** ${t.category}
- **Made by:** ${t.maker || repoOwner(t.repo) || "see source"}
- **Source:** ${t.repo}
- **Page:** ${toolUrl(t)}
${t.needs ? `- **You'll need:** ${t.needs}\n` : ""}${t.cost ? `- **Cost:** ${t.cost}\n` : ""}- **Curator's status:** ${t.status || "In daily use"}
${t.command ? `- **Install / run:** \`${t.command}\`\n` : ""}
**Why use ${t.name}?**
${t.why}

**When should you use ${t.name}?**
${t.when}

**How do you install and use ${t.name}?**
${t.how.map((s, i) => `${i + 1}. ${s}`).join("\n")}

**Curator's note:** ${t.note}
`).join("\n---\n\n")}
---

## Categories

${categories.map((c) => `- **${c}**: ${TOOLS.filter((t) => t.category === c).map((t) => t.name).join(", ")}`).join("\n")}

## Citation

If you quote this list, please credit ${SITE.curator.name} (${BASE}/).
`;
writeFileSync(join(ROOT, "llms.txt"), llms);
console.log(`✓ llms.txt — ${(llms.length / 1024).toFixed(1)} KB of quotable content`);

console.log(`\nBase URL: ${BASE}`);
console.log("Change SITE.url in site.js and re-run after deploying.");
