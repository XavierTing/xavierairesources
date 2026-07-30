/* ============================================================
   THE LOG — tools.js
   This file is the curation. Adding a tool = adding one object.

   VOICE: written for someone new to AI. Assume the reader has used a
   chatbot and nothing else. Any term of art gets explained the first
   time it appears in an entry, because entries are read standalone.
   No unexplained acronyms, no "just", no insider shorthand.

   Fields:
     num      — log entry number (immutable once assigned)
     name     — tool name
     category — one of: Design | Writing | Coding | Agents & MCP | Workflow | Knowledge
     tagline  — one short line. Feeds page titles, meta descriptions,
                JSON-LD and the detail-page lede, so keep it under ~60 chars.
     blurb    — 3–4 lines on the card face: the argument in miniature.
                Aim for 150–200 characters.
     repo     — canonical URL
     repoLabel— link text (VIEW REPO ↗ / VIEW GIST ↗ / VIEW DOCS ↗)
     maker    — optional; who made it. Omit for GitHub URLs (derived from the
                owner); set it for non-GitHub sources.
     why      — the argument (2–4 sentences, plain language)
     when     — concrete reach-for-it scenarios
     how      — numbered steps
     command  — copyable install/run command (null = link-only entry)
     note     — curator's aside. Feeds llms.txt only; not rendered on the site.
   ============================================================ */

const TOOLS = [
  {
    num: "01",
    name: "Impeccable",
    category: "Design",
    tagline: "Stops AI building the same generic website",
    blurb: "Ask an AI to build a website and you get the same one every time: pale headline, rainbow text, three identical boxes. This teaches it what good design looks like.",
    repo: "https://github.com/pbakaus/impeccable",
    repoLabel: "VIEW REPO",
    why: "Every AI model builds you the same website: a big pale heading, rainbow gradient text, three identical boxes. Impeccable gives the assistant an actual design education. It adds 23 commands you can run and 60 automatic checks that catch those generic patterns the moment they appear on your page.",
    when: "Any time you are building a web page or an app with an AI assistant. Check it before you publish, ask it to improve what it made, or leave the checks running so it flags weak design while you work.",
    how: [
      "Run the installer inside your project folder. It works out which AI tool you use, whether that is Claude Code, Cursor, Codex or another.",
      "Run /impeccable init once, so it learns what you are building and who it is for.",
      "Build as normal, then finish with /impeccable audit to check the result or /impeccable polish to improve it."
    ],
    command: "npx impeccable install",
    note: "Its checks ran on every edit of this page."
  },
  {
    num: "02",
    name: "Superpowers",
    category: "Workflow",
    tagline: "Makes Claude Code plan before it builds",
    blurb: "Left alone, an AI assistant starts typing code immediately and guesses at the rest. This slows it down: it works out the design, writes a plan, and gets your approval first.",
    repo: "https://github.com/obra/superpowers",
    repoLabel: "VIEW REPO",
    why: "Left alone, an AI assistant starts writing code straight away and guesses at whatever you did not spell out. Superpowers makes it work the way an experienced engineer does. It thinks through the design first, writes a plan, checks its own work with tests, then reviews before anything is final. You notice the difference a couple of weeks later, when you come back and can still follow what it built.",
    when: "Anything bigger than a quick fix. It is most useful on projects you are starting from scratch, and on bugs that have already survived a few attempts.",
    how: [
      "Install the plugin from the official Claude Code marketplace.",
      "Start any task as normal. It brings in the planning steps by itself.",
      "Work through the checkpoints it offers, and approve the design before it writes any code."
    ],
    command: "claude plugin install superpowers@claude-plugins-official",
    note: "This site was built through its plan-first flow."
  },
  {
    num: "03",
    name: "Spec-Kit",
    category: "Workflow",
    tagline: "Write down what you want, so the AI stops drifting",
    blurb: "Ask for feature after feature in one long chat and the AI forgets what you agreed at the start. Spec-Kit puts the requirements in a file, and that file becomes what it builds from.",
    repo: "https://github.com/github/spec-kit",
    repoLabel: "VIEW REPO",
    why: "Building feature by feature inside one long chat drifts. By the third one, the assistant is guessing at what you asked for in the first. Spec-Kit turns that around. You write the requirements into a document, and the assistant builds from that document rather than from whatever it can still remember of the conversation.",
    when: "Projects that run across several sessions, work you share with other people, and anything where the plan has to outlive a single chat.",
    how: [
      "Install the specify command line tool. It needs uv, a Python package manager.",
      "Run specify init inside your project folder.",
      "Then work through it in your assistant: /speckit.specify to write the spec, /speckit.plan to plan the work, /speckit.implement to build it."
    ],
    command: "uvx --from git+https://github.com/github/spec-kit.git specify init",
    note: "The written spec is still there long after the chat has gone."
  },
  {
    num: "04",
    name: "Chrome DevTools MCP",
    category: "Agents & MCP",
    tagline: "Lets your AI assistant see the page it built",
    blurb: "An AI that cannot see your page will tell you it fixed something it never looked at. This connects it to a real Chrome browser, so it can open the page and check its own work.",
    repo: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
    repoLabel: "VIEW REPO",
    why: "An assistant that cannot see the page is working blind, and it will report things as fixed that it never checked. This official tool from Google connects your assistant to a real Chrome browser. It can then read the error messages, watch what the page loads, measure how fast it runs, and take screenshots of what it actually looks like.",
    when: "Fixing anything that shows up in a browser, making a slow page faster, and any time you want proof that a change worked rather than a claim that it did.",
    how: [
      "Add it to your assistant's connected tools. MCP is simply the agreed standard for plugging outside tools into an AI assistant.",
      "Ask the assistant to open your page and read the errors.",
      "Let it take screenshots and check its own work before it tells you it is finished."
    ],
    command: "claude mcp add chrome-devtools npx chrome-devtools-mcp@latest",
    note: "The single biggest upgrade to how an assistant handles web work."
  },
  {
    num: "05",
    name: "Context7",
    category: "Agents & MCP",
    tagline: "Gives the AI today's documentation, not last year's",
    blurb: "An AI only knows the software that existed when it was trained, so it writes code for versions that have since changed. This fetches the current documentation while it works.",
    repo: "https://github.com/upstash/context7",
    repoLabel: "VIEW REPO",
    why: "An AI model only knows the versions of software that existed when it was trained, so it confidently writes code for features that have since been renamed or removed. Context7 fetches the current documentation while the assistant is working. What it writes then matches the version you actually have installed.",
    when: "Working with anything that changes often, such as Next.js, Tailwind or LangChain, or with any tool released more recently than the model itself.",
    how: [
      "Add it to your assistant's connected tools.",
      "Add the words use context7 to your request, or set a rule so it happens every time.",
      "You get code written against current documentation instead of the model's memory."
    ],
    command: "claude mcp add context7 -- npx -y @upstash/context7-mcp",
    note: "Killed a whole class of bug where a method had quietly been renamed months earlier."
  },
  {
    num: "06",
    name: "Repomix",
    category: "Coding",
    tagline: "Packs your whole project into one file you can paste",
    blurb: "Most AI chat windows cannot open your project folder. Repomix squashes the whole thing into a single file you can paste in, skipping the clutter and stripping anything like a password.",
    repo: "https://github.com/yamadashy/repomix",
    repoLabel: "VIEW REPO",
    why: "Most AI chat windows cannot see your project folder, and pasting files one at a time is slow. Repomix flattens the whole project into one organized file. It leaves out the files your project already ignores, scans out anything that looks like a password or a key, and tells you how large the result is before you paste it anywhere.",
    when: "Getting a second opinion from a different AI, having code reviewed by a model that cannot open your folder, or bringing an assistant up to speed on code it has never seen.",
    how: [
      "Run it in the top folder of your project.",
      "Take the repomix-output.xml file it produces.",
      "Paste that into whichever AI you want to ask. Add --compress if the project is large."
    ],
    command: "npx repomix@latest",
    note: "My button for letting a second model sanity check the work."
  },
  {
    num: "07",
    name: "Agent-Reach",
    category: "Agents & MCP",
    tagline: "Gets your AI past sites that block it",
    blurb: "Ask an AI to read a tweet or a Reddit thread and it often simply cannot, because those sites block it. Agent-Reach finds a route that still works for each one and sets it up for you.",
    repo: "https://github.com/Panniantong/Agent-Reach",
    repoLabel: "VIEW REPO",
    why: "Much of the useful internet is closed to automated tools. X charges for access, Reddit blocks the kind of servers that assistants run on, and video sites restrict things by country. Agent-Reach works out which route still works for each site, sets it up, tests that it really is working, and puts them all behind one way of asking.",
    when: "Research where the assistant genuinely needs to read tweets, Reddit discussions or video transcripts, or to check several sites in a single run.",
    how: [
      "Paste the line below into your assistant. It installs itself.",
      "It checks your setup and reports which sites it can reach.",
      "Ask for a page by its address or by searching, and it picks a route that works."
    ],
    command: "Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md",
    note: "Turns a flat refusal to open the page into an actual answer."
  },
  {
    num: "08",
    name: "LLM Wiki",
    category: "Knowledge",
    tagline: "Notes your AI writes and keeps up to date for you",
    blurb: "The usual setup makes an AI re-read all your documents for every question and remember none of it. This has it keep a growing set of notes instead, linking new material to old.",
    repo: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    repoLabel: "VIEW GIST",
    why: "The usual way of giving an AI your documents has it search through them fresh for every question. It re-reads everything each time and builds up no understanding at all. Karpathy's approach has the model keep a set of plain text notes instead. Each new source gets read once, linked to the notes it relates to, and flagged where it contradicts something already written down. You pay the reading cost once rather than on every question.",
    when: "Building a personal knowledge base out of notes, articles and bookmarks, where you want it to get more useful the more you add to it.",
    how: [
      "Read the gist. It describes an approach to follow, not something you install.",
      "Write down your own structure: what belongs on a page, and how pages should link to each other.",
      "Point your assistant at new material to read in. Ask the notes questions, and have it tidy them up now and then."
    ],
    command: null,
    note: "One of the rare ideas that gets better the longer you run it."
  },
  {
    num: "09",
    name: "Humanizer",
    category: "Writing",
    tagline: "Takes the AI sound out of your writing",
    blurb: "AI prose has a tell: long dashes everywhere, the it is not this, it is that construction, bold on every other phrase. This strips out 33 documented habits and can learn your voice.",
    repo: "https://github.com/blader/humanizer",
    repoLabel: "VIEW REPO",
    why: "AI prose has a recognizable accent. Long dashes strung through the sentences, the it is not this, it is that construction, bold text on every other phrase. Most readers pick it up within a sentence or two. Humanizer works through 33 documented habits of machine writing and takes them back out. Give it a few samples of your own writing and it keeps your voice while it does.",
    when: "The last thing you do before anything goes public: posts, documentation, emails, or anything at all with your name on it.",
    how: [
      "Install it as a skill, or as a Claude Code plugin.",
      "Run /humanizer on text you paste in, or point it at a file.",
      "Give it a few samples of your own writing once, so later edits still sound like you."
    ],
    command: "npx skills add blader/humanizer --global",
    note: "The last gate before anything ships with my name on it."
  },
  {
    num: "10",
    name: "Figma MCP",
    category: "Design",
    tagline: "Lets AI read your real design file, not a screenshot",
    blurb: "Hand an AI a screenshot of a design and it guesses the spacing and invents the colors. This connects it to the real Figma file, so it reads the actual values. It can write back too.",
    repo: "https://developers.figma.com/docs/figma-mcp-server/",
    repoLabel: "VIEW DOCS",
    maker: "Figma",
    why: "Hand an assistant a screenshot and it has to guess. It eyeballs the spacing, invents color values, and rebuilds buttons you already have. Figma's official server gives it the real file instead: the actual colors you chose, the components you built, the spacing you set, and the links between those components and your code. It can write back into Figma as well, so work moves in both directions.",
    when: "Any build that starts from a design file, and any time the live product has drifted away from the design. Select a frame, point the assistant at it, and check what it makes against the real values rather than against the picture.",
    how: [
      "Add it to your assistant's connected tools, or install the Figma plugin if your tool offers one.",
      "Open the file in Figma and select the frame you want built.",
      "Ask your assistant to build the selection. It reads the real values instead of guessing from pixels."
    ],
    command: "claude mcp add --transport http figma https://mcp.figma.com/mcp",
    note: "The handover step I stopped doing by hand."
  },
  {
    num: "11",
    name: "Obsidian Skills",
    category: "Knowledge",
    tagline: "Teaches your AI to work inside your Obsidian notes",
    blurb: "Obsidian keeps your notes as plain files on your own computer. This teaches an AI assistant to read and write them properly: the links between notes, the canvases, the tables.",
    repo: "https://github.com/kepano/obsidian-skills",
    repoLabel: "VIEW REPO",
    why: "Obsidian stores your notes as ordinary text files on your own machine, which means an assistant can work on them directly. Left to itself though, it writes plain text and misses everything that makes a set of notes worth having: the links between them, the properties at the top of each one, the canvases, the tables. These five skills teach it the real formats, so what it writes behaves like an actual Obsidian note rather than a file that happens to sit in the folder.",
    when: "Any time you want an assistant working inside your notes rather than in a chat window. Turning research into linked notes, laying out a canvas, or building one of Obsidian's tables without learning the syntax yourself.",
    how: [
      "Install the skills into whichever assistant you use. They follow the open Agent Skills standard, so Claude Code, Codex and Open Code all read the same files.",
      "Point the assistant at your vault, which is simply the folder your notes already live in.",
      "Ask for what you want in plain words. It handles the links, the properties and the canvas format itself."
    ],
    command: "npx skills add https://github.com/kepano/obsidian-skills",
    note: "Five skills on an open standard, so they are not tied to one assistant."
  }
];

/* Bump this when you edit the log — it feeds the colophon status line.
   Also regenerate og-image.png when the tool count changes. */
const LOG_UPDATED = "30.07.2026";
