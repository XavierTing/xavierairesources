/* ============================================================
   AI 101 — 101.js
   The course page's behaviour, ported from the standalone
   Xavier's AI 101 build: contents menu, chapter router, and the
   three interactives (context meter, flight walkthrough, tool
   filter). ai-101.html loads this and nothing else — tools.js
   and app.js belong to the log pages.
   ============================================================ */
(function () {
  "use strict";
  document.body.classList.add("js");

  /* ── Contents menu ──────────────────────────────────────────────────
     One mechanism at every width: a panel under the bar on a desktop, a
     sheet above the bottom bar on a phone. */
  var menu = document.getElementById("chapmenu");
  var menuBtn = document.getElementById("chapMenuBtn");
  function closeMenu() {
    if (!menu.hasAttribute("hidden")) {
      menu.setAttribute("hidden", "");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  }
  menuBtn.addEventListener("click", function () {
    var isOpen = !menu.hasAttribute("hidden");
    if (isOpen) { closeMenu(); return; }
    menu.removeAttribute("hidden");
    menuBtn.setAttribute("aria-expanded", "true");
    var first = menu.querySelector("a");
    if (first) first.focus();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeMenu(); menuBtn.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (menu.hasAttribute("hidden")) return;
    if (!menu.contains(e.target) && e.target !== menuBtn) closeMenu();
  });

  /* ── Chapter router ─────────────────────────────────────────────────
     Chapters render by default; this is what switches to one at a time.
     Every word anchor still resolves: it opens its parent chapter first. */
  var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
  var slugs = chapters.map(function (c) { return c.getAttribute("data-slug"); });
  var dots = Array.prototype.slice.call(document.querySelectorAll(".chapbar-dots a"));
  var chapNow = document.getElementById("chapNow");
  var chapCount = document.getElementById("chapCount");
  var chapPrev = document.getElementById("chapPrev");
  var chapNext = document.getElementById("chapNext");
  document.body.classList.add("chaptered");

  /* Where you stopped, remembered. Storage throws in private mode, so
     every touch of it is wrapped and nothing here is allowed to matter. */
  var LAST = "ai101-last";
  function remember(slug) {
    try { localStorage.setItem(LAST, slug); } catch (e) {}
  }
  function lastRead() {
    var slug = null;
    try { slug = localStorage.getItem(LAST); } catch (e) {}
    return slugs.indexOf(slug) !== -1 ? slug : "cover";
  }

  function titleOf(slug) {
    // The plate heading carries a <br>, and a closed chapter has no innerText,
    // so the short name travels on the section as data-title.
    var sec = document.getElementById("ch-" + slug);
    return sec ? sec.getAttribute("data-title") : "Contents";
  }
  function resolve(hash) {
    var h = (hash || "").replace(/^#/, "");
    if (!h) return { slug: "cover", target: null };
    if (slugs.indexOf(h) !== -1) return { slug: h, target: null };
    var el = document.getElementById(h);
    var sec = el && el.closest ? el.closest(".chapter") : null;
    if (sec) return { slug: sec.getAttribute("data-slug"), target: el };
    return { slug: "cover", target: null };
  }
  function open(slug, target, moveFocus) {
    var i = slugs.indexOf(slug);
    if (i === -1) { slug = "cover"; i = slugs.indexOf("cover"); }
    chapters.forEach(function (c, n) { c.classList.toggle("is-open", n === i); });
    remember(slug);

    var isCover = slug === "cover";
    document.body.setAttribute("data-ch", slug);
    chapCount.textContent = isCover ? "" : i + " / " + (chapters.length - 1);
    chapNow.textContent = isCover ? "Nine chapters" : titleOf(slug);
    dots.forEach(function (a) {
      var on = a.getAttribute("data-slug") === slug;
      if (on) a.setAttribute("aria-current", "step"); else a.removeAttribute("aria-current");
    });
    chapPrev.setAttribute("href", "#" + (i > 0 ? slugs[i - 1] : "cover"));
    chapPrev.setAttribute("aria-disabled", i === 0 ? "true" : "false");
    chapNext.setAttribute("href", "#" + (i < chapters.length - 1 ? slugs[i + 1] : "cover"));
    if (target) {
      /* one scroll only: a follow-up scrollBy cancels this one under the
         site's smooth scroll-behavior. The bar offset comes from
         scroll-margin-top in 101.css instead. */
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
    if (moveFocus) {
      var h = chapters[i].querySelector('[tabindex="-1"]');
      if (h) h.focus({ preventScroll: true });
    }
    closeMenu();
  }
  function route(moveFocus) {
    var r = resolve(location.hash);
    open(r.slug, r.target, moveFocus);
  }
  window.addEventListener("hashchange", function () { route(true); });
  // Deep links (ai-101.html#e-mcp) must open their chapter on first load too.
  // A bare load reopens wherever you stopped last time instead of the cover.
  if (location.hash) route(false); else open(lastRead(), null, false);

  /* ── Context window meter ───────────────────────────────── */
  var fill = document.getElementById("meterFill");
  var read = document.getElementById("meterRead");
  var addBtn = document.getElementById("meterAdd");
  var resetBtn = document.getElementById("meterReset");
  var turns = 0;
  var lines = [
    "Fresh chat. The window is empty.",
    "Turn 1. Your message, plus its reply, now get re-sent every time.",
    "Turn 2. Still sharp. The whole transcript goes back on every reply.",
    "Turn 4. Filling up. You have changed the subject twice by now.",
    "Turn 7. Answers are getting vaguer. This is where people blame the model.",
    "Turn 10. It is losing the thread. Nothing broke. The board is full.",
    "Full. Start a fresh chat. That is the entire fix."
  ];
  function paint() {
    var pct = Math.min(100, turns * 17);
    fill.style.transform = "scaleX(" + (pct / 100) + ")";
    fill.classList.toggle("hot", pct >= 68);
    read.textContent = lines[Math.min(turns, lines.length - 1)];
    addBtn.disabled = turns >= 6;
    addBtn.textContent = turns >= 6 ? "Window full" : "Send another message";
  }
  addBtn.addEventListener("click", function () { if (turns < 6) { turns++; paint(); } });
  resetBtn.addEventListener("click", function () { turns = 0; paint(); });
  paint();

  /* ── Flight walkthrough: one request, three layers ──────── */
  var lanes = Array.prototype.slice.call(document.querySelectorAll("#flightPanel .lane"));
  var steps = lanes.map(function (l) { return Array.prototype.slice.call(l.querySelectorAll("li")); });
  var verdict = document.getElementById("flightVerdict");
  var nextBtn = document.getElementById("flightNext");
  var overBtn = document.getElementById("flightReset");
  var TOTAL = 5;
  var step = 0;
  function paintFlight() {
    steps.forEach(function (list) {
      list.forEach(function (li, i) {
        li.hidden = i >= step;
        li.classList.toggle("now", i === step - 1);
      });
    });
    verdict.classList.toggle("shown", step >= TOTAL);
    nextBtn.disabled = step >= TOTAL;
    nextBtn.textContent = step === 0 ? "Send the request" : (step >= TOTAL ? "Finished" : "Next step");
  }
  nextBtn.addEventListener("click", function () { if (step < TOTAL) { step++; paintFlight(); } });
  overBtn.addEventListener("click", function () { step = 0; paintFlight(); });
  paintFlight();

  /* ── Tool filter ────────────────────────────────────────── */
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-filter]"));
  var tools = Array.prototype.slice.call(document.querySelectorAll("#toolList li"));
  var toolCount = document.getElementById("toolCount");
  var names = { all: "all", write: "Write & think", admin: "Admin & business", research: "Research",
                build: "Build software", design: "Design & visuals", meetings: "Meetings & notes",
                automate: "Connect & automate" };
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      var shown = 0;
      tools.forEach(function (li) {
        // data-cat carries one or more jobs, space separated: "write admin".
        var cats = (" " + (li.getAttribute("data-cat") || "") + " ");
        var match = f === "all" || cats.indexOf(" " + f + " ") !== -1;
        li.hidden = !match;
        if (match) shown++;
      });
      toolCount.textContent = f === "all"
        ? "Showing all " + shown + " tools"
        : "Showing " + shown + " for " + names[f].toLowerCase();
    });
  });
  // Counted from the DOM so the number cannot drift from the list.
  toolCount.textContent = "Showing all " + tools.length + " tools";

  /* cover entrance — same choreography as the index hero */
  window.requestAnimationFrame(function () { document.body.classList.add("is-loaded"); });
})();
