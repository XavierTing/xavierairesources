/* ============================================================
   SITE CONFIG — the only place URLs and identity live.
   Change SITE_URL here after deploying and every canonical tag,
   og:url, sitemap entry and JSON-LD reference follows.
   No trailing slash.
   ============================================================ */

const SITE = {
  /* Live canonical URL. Change this and re-run `node generate-seo.mjs`. */
  url: "https://xaviertingai.com",

  /* First published — feeds datePublished in structured data. */
  published: "2026-07-30",

  name: "AI Resources",
  tagline: "AI for the rest of us",
  description:
    "The AI tools Xavier Ting uses every day to design, build and write. What each one does, when it is worth using, and how to set it up, explained without jargon.",

  curator: {
    name: "Xavier Ting",
    jobTitle: "Vice President",
    /* worksFor.sameAs pins "OCBC" to the actual bank, so the entity graph
       resolves the employer instead of guessing. The display name stays the
       bare "OCBC" the positioning rule requires. */
    worksFor: {
      name: "OCBC",
      sameAs: ["https://www.ocbc.com/", "https://en.wikipedia.org/wiki/OCBC_Bank"]
    },
    /* Third person: search engines read this as a description OF Xavier, not
       a message FROM him. Singapore and OCBC sit in the sentence body because
       they are the anchors that disambiguate which Xavier Ting this is. */
    summary:
      "AI & Design Leader at OCBC in Singapore. He builds with AI every day and writes up what works, so the tools stay usable by people who don't ship code for a living.",
    country: "SG",
    linkedin: "https://www.linkedin.com/in/xavierting/",
    x: "https://x.com/xaviertingai",
    xHandle: "@xaviertingai",
    portfolio: "https://www.xavierting.com/",
    /* recognizedBy makes a credential checkable. Only bodies that are certain
       from the credential's own name carry one; better absent than invented. */
    credentials: [
      {
        name: "Master Certified Nielsen Norman Group UX Specialist",
        recognizedBy: { name: "Nielsen Norman Group", url: "https://www.nngroup.com/" }
      },
      {
        name: "Certified Scrum Master and Product Owner",
        recognizedBy: { name: "Scrum Alliance", url: "https://www.scrumalliance.org/" }
      },
      { name: "Certified LEGO® SERIOUS PLAY® facilitator" }
    ],
    /* Each topic pins to its Wikipedia entity so "knows about" reconciles to
       real things. Kept to six: the AI cluster plus the two design fields the
       role actually stands on. */
    knowsAbout: [
      { name: "Artificial Intelligence", sameAs: "https://en.wikipedia.org/wiki/Artificial_intelligence" },
      { name: "Generative AI", sameAs: "https://en.wikipedia.org/wiki/Generative_artificial_intelligence" },
      { name: "AI Agents", sameAs: "https://en.wikipedia.org/wiki/Intelligent_agent" },
      { name: "Prompt Engineering", sameAs: "https://en.wikipedia.org/wiki/Prompt_engineering" },
      { name: "Product Design", sameAs: "https://en.wikipedia.org/wiki/Product_design" },
      { name: "User Experience", sameAs: "https://en.wikipedia.org/wiki/User_experience" }
    ]
  }
};

if (typeof module !== "undefined" && module.exports) module.exports = { SITE };
