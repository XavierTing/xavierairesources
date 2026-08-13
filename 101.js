/* ============================================================
   AI 101 — 101.js
   The course page's behaviour, ported from the standalone
   Xavier's AI 101 build: contents menu, chapter router, and the
   three interactives (context chat, flight walkthrough, tool
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
    // A closed chapter has no innerText, so the short name the bar shows
    // travels on the section as data-title rather than being read off the plate.
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

  /* A restored chapter would otherwise start mid-course with no explanation,
     so say it once. Dismissable, and it clears itself on the first jump. */
  function resumeCue(slug) {
    try {
      var sec = document.getElementById("ch-" + slug);
      if (!sec) return;
      var cue = document.createElement("p");
      cue.className = "filter-count";
      cue.innerHTML = 'Resuming where you left off · <a href="#cover">Back to contents</a> ';
      var drop = document.createElement("button");
      drop.type = "button";
      drop.className = "chip";
      drop.textContent = "Dismiss";
      function bin() { if (cue.parentNode) cue.parentNode.removeChild(cue); }
      drop.addEventListener("click", bin);
      window.addEventListener("hashchange", bin);
      cue.appendChild(drop);
      sec.insertBefore(cue, sec.firstChild);
    } catch (e) {}
  }

  // Deep links (ai-101.html#e-mcp) must open their chapter on first load too.
  // A bare load reopens wherever you stopped last time instead of the cover.
  if (location.hash) {
    route(false);
  } else {
    var back = lastRead();
    open(back, null, false);
    if (back !== "cover") resumeCue(back);
  }

  /* ── Context window: one chat, filling up ───────────────────────────
     Six scripted turns of a group project. The answers stay sharp while
     the whole conversation still fits, then blur, and the last one
     re-suggests the survey cancelled in turn 2 because that decision has
     been pushed out of the window. */
  var sim = document.getElementById("chatSim");
  var read = document.getElementById("meterRead");
  var addBtn = document.getElementById("meterAdd");
  var resetBtn = document.getElementById("meterReset");
  var HOLDS = 6; // bubbles the window holds; older ones grey out
  var turns = 0;
  var SCRIPT = [
    { u: "Group project on urban farming in Singapore. Help me plan it.",
      a: "Sure. Three parts: research, a field visit, and the slides. Which one is due first?" },
    { u: "Research first. And we dropped the survey, the team voted it out.",
      a: "Noted, no survey. Two local case studies instead: Citiponics in Ang Mo Kio and Edible Garden City." },
    { u: "Write the intro paragraph.",
      a: "Singapore imports most of what it eats. Urban farms are one answer, and two of them sit inside ordinary HDB estates." },
    { u: "Now the field visit plan.",
      a: "Book Citiponics for a weekday morning. Prepare five questions, bring a phone for photos, and put one person on notes so nothing gets lost." },
    { u: "Tidy up the timeline.",
      a: "A clear timeline helps a lot. Set milestones, check in with each other regularly, and leave buffer time before the deadline." },
    { u: "What is left to do?",
      a: "You still have no primary data. Run a survey with your classmates and write up the results." }
  ];
  var lines = [
    "Fresh chat. The window is empty.",
    "Turn 1. Your message, plus its reply, now get re-sent every time.",
    "Turn 2. You cancel the survey. Still sharp: the whole transcript goes back on every reply.",
    "Turn 3. Filling up. Every earlier turn is still riding along.",
    "Turn 4. Wordier, and less useful. This is where people blame the model.",
    "Turn 5. Vague and generic. The oldest messages have been pushed out of the window.",
    "Full. It just suggested the survey you cancelled at turn 2. Nothing broke: that decision fell out of the window. Start a fresh chat. That is the entire fix."
  ];
  function bubble(role, text) {
    var el = document.createElement("div");
    el.className = "msg " + role;
    el.textContent = text;
    return el;
  }
  /* Bubbles are added, never rebuilt: the live region then announces only
     the new pair, and each arrival animates once. Reset removes them all. */
  function paint() {
    while (sim.children.length > turns * 2) sim.removeChild(sim.lastElementChild);
    for (var i = sim.children.length / 2; i < turns; i++) {
      sim.appendChild(bubble("user", SCRIPT[i].u));
      sim.appendChild(bubble("bot", SCRIPT[i].a));
    }
    var kids = sim.children;
    for (var n = 0; n < kids.length; n++) {
      kids[n].classList.toggle("gone", n < kids.length - HOLDS);
    }
    sim.scrollTop = sim.scrollHeight;
    read.textContent = lines[Math.min(turns, lines.length - 1)];
    addBtn.disabled = turns >= SCRIPT.length;
    addBtn.textContent = turns >= SCRIPT.length ? "Window full" : "Send another message";
  }
  addBtn.addEventListener("click", function () { if (turns < SCRIPT.length) { turns++; paint(); } });
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
