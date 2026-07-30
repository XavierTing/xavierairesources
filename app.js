/* ============================================================
   SIGNAL FIELD — app.js
   Two entry points, decided by what's on the page:
   - #grid  → index: render cards from TOOLS, tabs filter, counts
   - #tool-root → detail: render one tool from ?tool=<slug>
   Shared: copy-with-pulse, scroll reveal, load choreography.
   No dependencies. No build step.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- helpers ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function slug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- counts + status: derived from TOOLS ---------- */

  function syncCounts() {
    var cats = {};
    TOOLS.forEach(function (t) { cats[t.category] = true; });

    document.querySelectorAll('[data-count="entries"]').forEach(function (node) {
      node.textContent = pad(TOOLS.length);
    });
    document.querySelectorAll('[data-count="categories"]').forEach(function (node) {
      node.textContent = pad(Object.keys(cats).length);
    });
    if (typeof LOG_UPDATED === "string") {
      document.querySelectorAll("[data-updated]").forEach(function (node) {
        node.textContent = LOG_UPDATED;
      });
    }
  }

  /* ---------- copy with pulse (shared) ---------- */

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (err) { /* nothing left to try */ }
    document.body.removeChild(ta);
  }

  function initCopy(root) {
    root.addEventListener("click", function (e) {
      var btn = e.target.closest(".copy-btn");
      if (!btn || btn.classList.contains("copied")) return;

      var text = btn.dataset.command;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
      } else {
        fallbackCopy(text);
      }

      var label = btn.textContent;
      btn.classList.add("copied");
      btn.textContent = "Copied ✓";
      window.setTimeout(function () {
        btn.classList.remove("copied");
        btn.textContent = label;
      }, 1600);
    });
  }

  /* ---------- scroll reveal (shared) ---------- */

  function initReveal(targets) {
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (item) {
        if (item.isIntersecting) {
          item.target.classList.add("in");
          observer.unobserve(item.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    targets.forEach(function (t, i) {
      t.classList.add("reveal");
      /* stagger the first grid rows on load */
      t.style.transitionDelay = Math.min(i * 45, 360) + "ms";
      observer.observe(t);
    });
  }

  /* ============================================================
     INDEX: card grid + tabs
     ============================================================ */

  function renderCard(tool) {
    var card = el("a", "card");
    card.href = "tool.html?tool=" + slug(tool.name);
    card.dataset.category = tool.category;

    var top = el("div", "card-top");
    top.appendChild(el("span", "card-cat m", tool.category));
    top.appendChild(el("span", "card-num", "№ " + tool.num));

    card.appendChild(top);
    card.appendChild(el("h2", "card-name", tool.name));
    card.appendChild(el("p", "card-tag", tool.tagline));
    card.appendChild(el("span", "card-open", "Read entry"));
    return card;
  }

  function initIndex(grid) {
    var tabsEl = document.getElementById("tabs");
    var countEl = document.getElementById("tab-count");

    /* The cards ship as real HTML (generate-seo.mjs writes them) so crawlers and
       answer engines see the whole log without running JavaScript. Only build
       them here if that static block is missing. */
    if (!grid.querySelector(".card")) {
      var frag = document.createDocumentFragment();
      TOOLS.forEach(function (tool) {
        frag.appendChild(renderCard(tool));
        MARGIN_NOTES.forEach(function (note) {
          if (note.afterNum === tool.num) {
            frag.appendChild(el("aside", "grid-note", note.text));
          }
        });
      });
      grid.appendChild(frag);
    }

    var cats = [];
    TOOLS.forEach(function (t) {
      if (cats.indexOf(t.category) === -1) cats.push(t.category);
    });

    ["All"].concat(cats).forEach(function (cat, i) {
      var tab = el("button", "tab", cat);
      tab.type = "button";
      tab.dataset.category = cat;
      tab.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      tabsEl.appendChild(tab);
    });

    function updateCount(shown) {
      countEl.textContent = "Showing " + pad(shown) + " / " + pad(TOOLS.length);
    }

    function applyFilter(category) {
      var shown = 0;
      grid.querySelectorAll(".card").forEach(function (card) {
        var match = category === "All" || card.dataset.category === category;
        if (match) {
          card.removeAttribute("data-filtered");
          /* re-reveal: surviving cards rise back in with a small stagger */
          if (!reducedMotion) {
            card.classList.remove("refilter");
            card.style.animationDelay = Math.min(shown * 35, 280) + "ms";
            void card.offsetWidth; /* restart the animation */
            card.classList.add("refilter");
          }
          shown += 1;
        } else {
          card.dataset.filtered = "out";
        }
      });
      /* curator asides read as part of the full log only */
      grid.querySelectorAll(".grid-note").forEach(function (note) {
        if (category === "All") note.removeAttribute("data-filtered");
        else note.dataset.filtered = "out";
      });
      updateCount(shown);
    }

    tabsEl.addEventListener("click", function (e) {
      var tab = e.target.closest(".tab");
      if (!tab) return;
      tabsEl.querySelectorAll(".tab").forEach(function (t) {
        t.setAttribute("aria-pressed", t === tab ? "true" : "false");
      });
      applyFilter(tab.dataset.category);
    });

    updateCount(TOOLS.length);
    initReveal(grid.querySelectorAll(".card"));
  }

  /* ============================================================
     DETAIL: one tool from ?tool=<slug>
     ============================================================ */

  function repoOwner(url) {
    var m = url.match(/(?:github\.com|gist\.github\.com)\/([^/]+)/);
    return m ? m[1] : null;
  }

  function metaBlock(title, node) {
    var wrap = el("div");
    wrap.appendChild(el("h2", null, title));
    wrap.appendChild(node);
    return wrap;
  }

  function renderDetail(root, tool) {
    document.title = tool.name + " — AI Resources";

    /* breadcrumbs */
    var crumbs = el("nav", "crumbs m");
    crumbs.setAttribute("aria-label", "Breadcrumb");
    var home = el("a", null, "The log");
    home.href = "index.html";
    crumbs.appendChild(home);
    crumbs.appendChild(el("span", "sep", "/"));
    crumbs.appendChild(el("span", "here", tool.name));

    /* header grid: title + lede left, meta right */
    var detail = el("div", "detail");

    var main = el("div", "detail-main");
    main.appendChild(el("h1", "detail-title", tool.name));
    main.appendChild(el("p", "detail-lede", tool.tagline + "."));

    var meta = el("aside", "meta");

    var catP = el("p", "meta-cat", tool.category);
    meta.appendChild(metaBlock("Category", catP));

    /* an explicit maker wins; otherwise derive it from a GitHub URL */
    var owner = tool.maker || repoOwner(tool.repo);
    if (owner) {
      var ownerP = el("p", null, owner);
      meta.appendChild(metaBlock("Made by", ownerP));
    }

    var statusP = el("p", null, "In daily use · № " + tool.num + " of " + pad(TOOLS.length));
    meta.appendChild(metaBlock("Curator's status", statusP));

    var repoP = el("p");
    var repoA = el("a", "repo-link", tool.repoLabel + " ↗");
    repoA.href = tool.repo;
    repoA.target = "_blank";
    repoA.rel = "noopener";
    repoP.appendChild(repoA);
    meta.appendChild(metaBlock("Source", repoP));

    detail.appendChild(main);
    detail.appendChild(meta);

    /* sections */
    var sections = el("div", "sections");

    [["Why", tool.why], ["When", tool.when]].forEach(function (pair) {
      var section = el("section", "section");
      section.appendChild(el("h2", null, pair[0]));
      section.appendChild(el("div", "body", pair[1]));
      sections.appendChild(section);
    });

    var how = el("section", "section");
    how.appendChild(el("h2", null, "How"));
    var howBody = el("div", "body");
    var ol = el("ol");
    tool.how.forEach(function (step) { ol.appendChild(el("li", null, step)); });
    howBody.appendChild(ol);

    if (tool.command) {
      var specimen = el("div", "specimen");
      specimen.appendChild(el("code", null, tool.command));
      var copyBtn = el("button", "copy-btn", "Copy");
      copyBtn.type = "button";
      copyBtn.dataset.command = tool.command;
      copyBtn.setAttribute("aria-label", "Copy command: " + tool.command);
      specimen.appendChild(copyBtn);
      howBody.appendChild(specimen);
    }
    how.appendChild(howBody);
    sections.appendChild(how);

    var note = el("p", "fieldnote", tool.note);

    var back = el("a", "back-link", "← Back to the log");
    back.href = "index.html";

    /* prev / next pager */
    var idx = TOOLS.indexOf(tool);
    var pager = el("nav", "pager");
    pager.setAttribute("aria-label", "More tools");
    var prev = TOOLS[(idx - 1 + TOOLS.length) % TOOLS.length];
    var next = TOOLS[(idx + 1) % TOOLS.length];
    var prevA = el("a", null, "← " + prev.name);
    prevA.href = "tool.html?tool=" + slug(prev.name);
    var nextA = el("a", null, next.name + " →");
    nextA.href = "tool.html?tool=" + slug(next.name);
    pager.appendChild(prevA);
    pager.appendChild(nextA);

    root.appendChild(crumbs);
    root.appendChild(detail);
    root.appendChild(sections);
    root.appendChild(note);
    root.appendChild(back);
    root.appendChild(pager);
  }

  function initDetail(root) {
    /* Static detail pages (tools/<slug>.html) already contain their content —
       nothing to render, the shared copy/reveal wiring below is enough. */
    if (root.querySelector(".detail")) return;

    var param = new URLSearchParams(window.location.search).get("tool");
    var tool = null;
    TOOLS.forEach(function (t) { if (slug(t.name) === param) tool = t; });

    /* ?tool=<slug> is the legacy URL shape: send it to the indexable page. */
    if (tool) {
      window.location.replace("tools/" + slug(tool.name) + ".html");
      return;
    }
    window.location.replace("index.html");
  }

  /* ---------- boot ---------- */

  var grid = document.getElementById("grid");
  var toolRoot = document.getElementById("tool-root");

  if (grid) initIndex(grid);
  if (toolRoot) initDetail(toolRoot);

  syncCounts();
  initCopy(document.body);

  window.requestAnimationFrame(function () {
    document.body.classList.add("is-loaded");
  });
})();
