/* ============================================================
   THEME — theme.js
   The light/dark switch, shared by every page. Daylight is the
   default and lives on :root, so no-JS visitors and crawlers get
   it from the static markup; "dark" is stored in localStorage and
   applied as html[data-theme="dark"], which the Night token blocks
   in styles.css / 101.css key off.
   A tiny inline snippet in each <head> sets the attribute before
   first paint; this file does everything after: the toggle
   buttons, the theme-color meta, and swapping the artwork between
   its light and dark inkings.
   ============================================================ */
(function () {
  "use strict";
  var KEY = "theme";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) { /* private mode */ }
  }

  /* themed artwork ships in two palettes: the AI 101 art (assets/101/light/
     linen vs assets/101/ dark) and the card monolines (assets/cards/light/
     vs assets/cards/ — their stroke alpha is tuned per ground, see
     lighten.py). The markup ships the light paths, so this only rewrites
     when Night is on. Lazy-loading means most swaps happen before the
     image was ever fetched. */
  var ART_DIRS = ["assets/101/", "assets/cards/"];
  function swapArt(theme) {
    for (var d = 0; d < ART_DIRS.length; d++) {
      var dir = ART_DIRS[d];
      var light = dir + "light/";
      var imgs = document.querySelectorAll('img[src*="' + dir + '"]');
      for (var i = 0; i < imgs.length; i++) {
        var src = imgs[i].getAttribute("src");
        var want = theme === "light"
          ? (src.indexOf(light) !== -1 ? src : src.replace(dir, light))
          : src.replace(light, dir);
        if (want !== src) imgs[i].setAttribute("src", want);
      }
    }
  }

  function apply(theme) {
    var root = document.documentElement;
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#F2ECE0" : "#0a0908");

    swapArt(theme);

    var btns = document.querySelectorAll(".theme-toggle");
    for (var i = 0; i < btns.length; i++) {
      /* the button names the theme it takes you to */
      btns[i].textContent = theme === "light" ? "Dark" : "Light";
      btns[i].setAttribute("aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    }
  }

  var current = stored() === "dark" ? "dark" : "light";
  apply(current);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".theme-toggle") : null;
    if (!btn) return;
    current = current === "light" ? "dark" : "light";
    store(current);
    apply(current);
  });
})();
