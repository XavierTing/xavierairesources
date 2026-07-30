/* ============================================================
   THE LOG — tools.js
   This file is the curation. Adding a tool = adding one object.
   Fields:
     num      — log entry number (immutable once assigned)
     name     — tool name
     category — one of: Design | Writing | Coding | Agents & MCP | Workflow | Knowledge
     tagline  — one line on the card face
     repo     — canonical URL
     repoLabel— link text (VIEW REPO ↗ / VIEW GIST ↗ / VIEW DOCS ↗)
     maker    — optional; who made it. Omit for GitHub URLs (derived from the
                owner); set it for non-GitHub sources.
     why      — the argument (2–3 sentences, peer voice)
     when     — concrete reach-for-it scenarios
     how      — numbered steps
     command  — copyable install/run command (null = link-only entry)
     note     — personal field note, curator's voice
   ============================================================ */

const TOOLS = [
  {
    num: "01",
    name: "Impeccable",
    category: "Design",
    tagline: "Design taste for AI coding agents",
    repo: "https://github.com/pbakaus/impeccable",
    repoLabel: "VIEW REPO",
    why: "Every model ships the same website: cream hero, gradient text, three identical cards. Impeccable gives your agent an actual design education: one skill, 23 commands, and 60 deterministic detectors that catch AI anti-patterns the moment they're written.",
    when: "Any frontend work you do with an agent. Audit before shipping, run polish passes after building, and let its edit-hooks flag design lapses in real time while you work.",
    how: [
      "Run the installer in your project — it detects Claude Code, Cursor, Codex and more.",
      "Run /impeccable init once so it learns your product and users.",
      "Build, then finish with /impeccable audit or /impeccable polish."
    ],
    command: "npx impeccable install",
    note: "Its detector ran on every edit of this page."
  },
  {
    num: "02",
    name: "Superpowers",
    category: "Workflow",
    tagline: "Engineering discipline for Claude Code",
    repo: "https://github.com/obra/superpowers",
    repoLabel: "VIEW REPO",
    why: "Raw agents jump straight to code and guess. Superpowers makes them work like senior engineers: brainstorm the design first, write the plan, test-drive the implementation, review before merging. The difference shows up in week-two maintainability.",
    when: "Any feature bigger than a one-liner. It earns its keep on greenfield builds and gnarly debugging, where process beats enthusiasm.",
    how: [
      "Install the plugin from the official marketplace.",
      "Start any task — it routes through brainstorming and planning skills automatically.",
      "Follow the checkpoints; approve the design before code gets written."
    ],
    command: "claude plugin install superpowers@claude-plugins-official",
    note: "This site went through its brainstorm → plan → build flow."
  },
  {
    num: "03",
    name: "Spec-Kit",
    category: "Workflow",
    tagline: "Spec-driven development, by GitHub",
    repo: "https://github.com/github/spec-kit",
    repoLabel: "VIEW REPO",
    why: "Vibe-coding drifts: by feature three, the agent is guessing what you meant in feature one. Spec-Kit inverts the relationship: an executable spec becomes the source of truth and implementations are derived from it.",
    when: "Multi-session projects, team work, anything where “what we're building” has to outlive a single chat context.",
    how: [
      "Install the specify CLI (needs uv).",
      "Run specify init inside your project.",
      "Drive with /speckit.specify → /speckit.plan → /speckit.implement in your agent."
    ],
    command: "uvx --from git+https://github.com/github/spec-kit.git specify init",
    note: "The spec survives. Chat context doesn't."
  },
  {
    num: "04",
    name: "Chrome DevTools MCP",
    category: "Agents & MCP",
    tagline: "Gives your coding agent eyes in the browser",
    repo: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
    repoLabel: "VIEW REPO",
    why: "An agent that can't see the page is coding blind, claiming fixes it never verified. This official MCP server hands it real Chrome: console errors, network requests, performance traces, screenshots, live DOM.",
    when: "Debugging web apps, chasing Core Web Vitals, and every “make a change, prove it actually rendered” loop.",
    how: [
      "Add the MCP server to your agent's config.",
      "Ask the agent to open your page and read the console.",
      "Let it trace, screenshot, and verify its own work before it reports done."
    ],
    command: "claude mcp add chrome-devtools npx chrome-devtools-mcp@latest",
    note: "The single biggest upgrade to agent frontend work I know."
  },
  {
    num: "05",
    name: "Context7",
    category: "Agents & MCP",
    tagline: "Current library docs, injected at generation time",
    repo: "https://github.com/upstash/context7",
    repoLabel: "VIEW REPO",
    why: "Models memorize last year's APIs and hallucinate the diff. Context7 pulls version-specific, up-to-date documentation straight into the prompt, so generated code compiles against the library you actually installed.",
    when: "Coding against anything that moves fast: Next.js, Tailwind, LangChain, any SDK younger than the model's training cutoff.",
    how: [
      "Add the MCP server to your agent.",
      "Append “use context7” to a prompt, or let a rule auto-invoke it.",
      "Get code written against live docs instead of training-data memories."
    ],
    command: "claude mcp add context7 -- npx -y @upstash/context7-mcp",
    note: "Killed my “that method was renamed months ago” class of bugs."
  },
  {
    num: "06",
    name: "Repomix",
    category: "Coding",
    tagline: "Your whole repo, packed into one AI-readable file",
    repo: "https://github.com/yamadashy/repomix",
    repoLabel: "VIEW REPO",
    why: "Context is the bottleneck. Repomix flattens an entire codebase into one structured file (directory tree, token counts, .gitignore respected, secrets scanned out) sized for pasting into any model.",
    when: "Second opinions from web chats, code review by a model with no repo access, onboarding an agent to unfamiliar code.",
    how: [
      "Run it at the repo root.",
      "Grab repomix-output.xml.",
      "Paste it into the model of your choice; add --compress for big repos."
    ],
    command: "npx repomix@latest",
    note: "My “let another model sanity-check this” button."
  },
  {
    num: "07",
    name: "Agent-Reach",
    category: "Agents & MCP",
    tagline: "Your agent, unblocked on the real internet",
    repo: "https://github.com/Panniantong/Agent-Reach",
    repoLabel: "VIEW REPO",
    why: "The useful internet is walled: X wants API fees, Reddit blocks server IPs, video sites geo-fence. Agent-Reach ships the most reliable access path for each platform — chosen, installed, and health-checked — behind one interface.",
    when: "Research agents that need to actually read tweets, Reddit threads, and YouTube transcripts, or sweep several platforms in one run.",
    how: [
      "Paste the install prompt below into your agent — it self-installs.",
      "It detects your environment and reports what's reachable.",
      "Ask for content by URL or search; it picks the working path."
    ],
    command: "Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md",
    note: "Turns “I can't access that site” into an answer."
  },
  {
    num: "08",
    name: "LLM Wiki",
    category: "Knowledge",
    tagline: "A second brain your model maintains for you",
    repo: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    repoLabel: "VIEW GIST",
    why: "RAG re-reads everything on every question and synthesizes nothing. Karpathy's pattern makes the LLM maintain a persistent markdown wiki over your sources: ingest, cross-link, flag contradictions. Knowledge compiles once and stays current.",
    when: "Building a durable personal knowledge base out of notes, papers, and bookmarks that should get better with every source you add.",
    how: [
      "Read the gist — it's a pattern, not a package.",
      "Write your schema doc: how pages, entities, and links should be structured.",
      "Point your agent at new sources to ingest; query the wiki, lint it periodically."
    ],
    command: null,
    note: "The rare idea that improves the longer you run it."
  },
  {
    num: "09",
    name: "Humanizer",
    category: "Writing",
    tagline: "Deletes the AI accent from your writing",
    repo: "https://github.com/blader/humanizer",
    repoLabel: "VIEW REPO",
    why: "Em-dash chains, “it's not X, it's Y”, bold on everything: readers smell AI prose instantly. Humanizer strips 33 documented patterns of machine writing and can calibrate to your voice from samples of your own work.",
    when: "The last pass before anything goes public: posts, documentation, emails, portfolio copy.",
    how: [
      "Install it as a skill or Claude Code plugin.",
      "Run /humanizer on pasted text or point it at a file.",
      "Feed it a few writing samples once, so rewrites keep your voice."
    ],
    command: "npx skills add blader/humanizer --global",
    note: "The final gate before anything ships with my name on it."
  },
  {
    num: "10",
    name: "Figma MCP",
    category: "Design",
    tagline: "Your design file, readable by your coding agent",
    repo: "https://developers.figma.com/docs/figma-mcp-server/",
    repoLabel: "VIEW DOCS",
    maker: "Figma",
    why: "Screenshot handoff makes agents guess: they eyeball spacing, invent hex values, and rebuild components you already shipped. Figma's official MCP server hands the agent the real source instead — variables, components, layout data, and Code Connect mappings — and it writes back to canvas, so the loop runs both directions.",
    when: "Any build that starts from a design file, and any time production drift needs pulling back to the system. Select a frame, point the agent at it, and review what it generates against the tokens rather than the picture.",
    how: [
      "Add the remote server to your agent (or install the Figma plugin, if your client offers one).",
      "Open the Figma desktop or web file and select the frame you want built.",
      "Ask your agent to implement the selection; it reads variables and components instead of pixels."
    ],
    command: "claude mcp add --transport http figma https://mcp.figma.com/mcp",
    note: "The handoff step I stopped doing by hand."
  }
];

/* Margin notes — short curator asides typeset between entries.
   afterNum = the entry number the note follows. */
const MARGIN_NOTES = [
  { afterNum: "03", text: "No tool lands here on launch-week hype." },
  { afterNum: "06", text: "Taste is a stack decision." }
];

/* Bump this when you edit the log — it feeds the colophon status line.
   Also regenerate og-image.png when the tool count changes. */
const LOG_UPDATED = "30.07.2026";
