// The only Worker code on the site. Every request runs through here first
// (run_worker_first in wrangler.jsonc) so that www.xaviertingai.com can be
// answered with a redirect instead of a second live copy of the site.
// Everything else falls through to the static assets, which keep applying
// _redirects, _headers and html_handling exactly as before.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.xaviertingai.com") {
      url.hostname = "xaviertingai.com";
      // 301 so any ranking a www link earns transfers to the canonical apex,
      // and the full path and query survive the hop.
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
