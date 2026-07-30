/* ============================================================
   SITE CONFIG — the only place URLs and identity live.
   Change SITE_URL here after deploying and every canonical tag,
   og:url, sitemap entry and JSON-LD reference follows.
   No trailing slash.
   ============================================================ */

const SITE = {
  /* ---- CHANGE THIS ONE LINE AFTER YOU DEPLOY ---- */
  url: "https://ai-resources.vercel.app",

  name: "AI Resources",
  tagline: "AI for the rest of us",
  description:
    "The AI tools Xavier Ting uses every day to design, build and write. What each one does, when it is worth using, and how to set it up, explained without jargon.",

  curator: {
    name: "Xavier Ting",
    jobTitle: "Vice President, Customer Experience Design",
    worksFor: "OCBC",
    summary:
      "AI & Design Leader. I build with AI daily and write up what works, so the tools stay usable by people who don't ship code for a living.",
    linkedin: "https://www.linkedin.com/in/xavierting/",
    x: "https://x.com/xaviertingai",
    xHandle: "@xaviertingai",
    portfolio: "https://www.xavierting.com/",
    credentials: [
      "Master Certified Nielsen Norman Group UX Specialist",
      "Certified Scrum Master and Product Owner",
      "Certified LEGO® SERIOUS PLAY® facilitator"
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Generative AI",
      "AI Agents",
      "Customer Experience Design",
      "Product Design",
      "Design Systems",
      "Prompt Engineering",
      "User Experience",
      "Product Management"
    ]
  }
};

if (typeof module !== "undefined" && module.exports) module.exports = { SITE };
