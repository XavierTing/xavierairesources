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
     commandTarget — where the command gets typed: "terminal" (the Terminal
                app), "claude" (typed inside Claude Code), "assistant"
                (pasted into any AI assistant), or null when command is null.
                Feeds the label on the command box.
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
    why: "Every AI model builds you the same website: a big pale heading, rainbow gradient text, three identical boxes. Impeccable gives the assistant an actual design education. It adds 23 commands you can type into your assistant and 60 automatic checks that catch those generic patterns the moment they appear on your page.",
    when: "Any time you are building a web page or an app with an AI assistant. Check it before you publish, ask it to improve what it made, or leave the checks running so it flags weak design while you work.",
    how: [
      "Run the command below in the folder your project lives in. It works out which AI tool you use, whether that is Claude Code, Cursor, Codex or another.",
      "Inside your assistant, type /impeccable init once, so it learns what you are building and who it is for.",
      "Build as normal, then finish by typing /impeccable audit to check the result or /impeccable polish to improve it."
    ],
    command: "npx impeccable install",
    commandTarget: "terminal",
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
    why: "Left alone, an AI assistant starts writing code straight away and guesses at whatever you did not spell out. Superpowers makes it work the way an experienced engineer does. It thinks through the design first, writes a plan, checks its own work automatically, then reviews before anything is final. You notice the difference a couple of weeks later, when you come back and can still follow what it built.",
    when: "Anything bigger than a quick fix. It is most useful on projects you are starting from scratch, and on bugs that have already survived a few attempts.",
    how: [
      "Install it with the command below, from the official catalogue of Claude Code add-ons.",
      "Start any task as normal. It brings in the planning steps by itself.",
      "Work through the checkpoints it offers, and approve the design before it writes any code."
    ],
    command: "claude plugin install superpowers@claude-plugins-official",
    commandTarget: "terminal",
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
      "Run the command below in the folder your project lives in. If it says uv is missing, install uv first from its site; that is the free helper it uses to fetch itself.",
      "Then, inside your assistant, type /speckit.specify to write down the requirements.",
      "Follow with /speckit.plan to plan the work, and /speckit.implement to build it."
    ],
    command: "uvx --from git+https://github.com/github/spec-kit.git specify init",
    commandTarget: "terminal",
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
      "Add it to your assistant's connected tools with the command below. MCP is simply the agreed standard for plugging outside tools into an AI assistant.",
      "Ask the assistant to open your page and read the errors.",
      "Let it take screenshots and check its own work before it tells you it is finished."
    ],
    command: "claude mcp add chrome-devtools npx chrome-devtools-mcp@latest",
    commandTarget: "terminal",
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
    when: "Working with software that changes quickly (web-building kits such as Next.js and Tailwind are the classic case), or with any tool released more recently than the model itself.",
    how: [
      "Add it to your assistant's connected tools with the command below.",
      "Add the words use context7 to your request, or set a rule so it happens every time.",
      "You get code written against current documentation instead of the model's memory."
    ],
    command: "claude mcp add context7 -- npx -y @upstash/context7-mcp",
    commandTarget: "terminal",
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
    why: "Most AI chat windows cannot see your project folder, and pasting files one at a time is slow. Repomix flattens the whole project into one organized file. It skips the clutter folders a project collects, hides anything that looks like a password or a key, and tells you how large the result is before you paste it anywhere.",
    when: "Getting a second opinion from a different AI, having code reviewed by a model that cannot open your folder, or bringing an assistant up to speed on code it has never seen.",
    how: [
      "Run the command below in the main folder of your project.",
      "It produces a single file, named repomix-output.xml.",
      "Paste that file into whichever AI you want to ask. If the project is big, add --compress to the command to shrink it further."
    ],
    command: "npx repomix@latest",
    commandTarget: "terminal",
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
    why: "Much of the useful internet is closed to automated tools. X charges for access, Reddit blocks the machines assistants usually call from, and video sites restrict things by country. Agent-Reach works out which route still works for each site, sets it up, tests that it really is working, and gives your assistant one consistent way to ask for any of them.",
    when: "Research where the assistant genuinely needs to read tweets, Reddit discussions or video transcripts, or to check several sites in a single run.",
    how: [
      "Paste the line below into your assistant. It installs itself.",
      "It checks your setup and reports which sites it can reach.",
      "Ask for a page by its web address or by searching, and it picks a route that works."
    ],
    command: "Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md",
    commandTarget: "assistant",
    note: "Turns a flat refusal to open the page into an actual answer."
  },
  {
    num: "08",
    name: "LLM Wiki",
    category: "Knowledge",
    tagline: "Notes your AI writes and keeps up to date for you",
    blurb: "Most setups make an AI re-read all your documents for every question and remember none of it. This has it keep a growing set of notes instead, linking new material to old.",
    repo: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    repoLabel: "VIEW GIST",
    why: "Most tools that let an AI use your documents work by searching them fresh for every question. The AI re-reads everything each time and builds up no understanding at all. Andrej Karpathy, one of the best known AI researchers, suggests the opposite: have the model keep a set of plain text notes. Each new source gets read once, linked to the notes it relates to, and flagged where it contradicts something already written down. The reading work happens once instead of on every question.",
    when: "Building a personal knowledge base out of notes, articles and bookmarks, where you want it to get more useful the more you add to it.",
    how: [
      "Read the page (a gist is simply a note published on GitHub). It describes an approach to follow, not something you install.",
      "Write down your own structure: what belongs on a page, and how pages should link to each other.",
      "Point your assistant at new material to read in. Ask the notes questions, and have it tidy them up now and then."
    ],
    command: null,
    commandTarget: null,
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
      "Run the command below. It installs Humanizer as a skill, which is a saved set of instructions your assistant loads when the job calls for it.",
      "Type /humanizer, then paste in the text, or name a file for it to work on.",
      "Give it a few samples of your own writing once, so later edits still sound like you."
    ],
    command: "npx skills add blader/humanizer --global",
    commandTarget: "terminal",
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
    why: "Hand an assistant a screenshot and it has to guess. It eyeballs the spacing, invents color values, and rebuilds buttons you already have. Figma's official connection, built on MCP, the standard plug between AI apps and other software, gives it the real file instead: the actual colors you chose, the reusable pieces you built, the spacing you set. It can write back into Figma as well, so work moves in both directions.",
    when: "Any build that starts from a design file, and any time the live product has drifted away from the design. Select a frame, point the assistant at it, and check what it makes against the real values rather than against the picture.",
    how: [
      "Add it to your assistant's connected tools with the command below.",
      "Open the file in Figma and select the frame you want built.",
      "Ask your assistant to build the selection. It reads the real values instead of guessing from pixels."
    ],
    command: "claude mcp add --transport http figma https://mcp.figma.com/mcp",
    commandTarget: "terminal",
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
    when: "Any time you want an assistant working inside your notes rather than in a chat window. Turning research into linked notes, laying out a canvas, or building one of Obsidian's tables without learning the format yourself.",
    how: [
      "Run the command below. The skills follow an open standard, so Claude Code, Codex and other assistants all read the same files.",
      "Point the assistant at your vault, which is simply the folder your notes already live in.",
      "Ask for what you want in plain words. It handles the links, the properties and the canvas format itself."
    ],
    command: "npx skills add https://github.com/kepano/obsidian-skills",
    commandTarget: "terminal",
    note: "Five skills on an open standard, so they are not tied to one assistant."
  },
  {
    num: "12",
    name: "Ralph Loop",
    category: "Workflow",
    tagline: "Runs Claude on the same task until it is done",
    blurb: "Some jobs do not come right first time. This restarts Claude on the same task over and over, letting it read what it already tried, until it passes your check or runs out of attempts.",
    repo: "https://claude.com/plugins/ralph-loop",
    repoLabel: "VIEW PLUGIN",
    maker: "Anthropic",
    why: "Some work does not come right on the first attempt, and sitting there restarting the assistant yourself gets old quickly. Ralph Loop catches the moment a session ends and feeds your original request straight back in, keeping every file change and the record of earlier attempts. Claude reads what it already tried, sees which checks failed, and goes again. It stops when it reports the finish word you picked, or when it reaches the number of attempts you allowed.",
    when: "Work where you can say plainly what finished looks like and something can check it for you automatically. The loop needs a finish line it can recognize, so open ended tasks are a poor fit.",
    how: [
      "Install it with the command below.",
      "Inside Claude Code, type /ralph-loop followed by your request. Add --max-iterations 10 to cap the attempts at ten, and --completion-promise DONE to set the finish word.",
      "Leave it to work. Stop it early at any point with /cancel-ralph."
    ],
    command: "claude plugin install ralph-loop@claude-plugins-official",
    commandTarget: "terminal",
    note: "Needs a finish line it can check. Without one it just runs until the attempts are gone."
  },
  {
    num: "13",
    name: "Watch",
    category: "Agents & MCP",
    tagline: "Lets Claude actually watch a video and answer",
    blurb: "Ask an assistant about a video and it answers from the title, because it never saw it. This one downloads the video, takes still pictures through it, and turns the speech into text on your own computer.",
    repo: "https://github.com/mathiaschu/watch",
    repoLabel: "VIEW REPO",
    maker: "Mathias Schusterman",
    why: "Ask an assistant about a video and it will usually answer from the title and the description, because it never watched anything. This one does. It downloads the file, saves still pictures from across its length, and turns the speech into written text, then answers from those two things together. Videos that already carry subtitles use them straight away. The rest are transcribed on your own computer, so there is no account to open, no key to paste in, and no fee per minute.",
    when: "Any time the answer sits inside a video rather than a page: a product demo you want the gist of, an hour long talk you cannot sit through, a specific moment you need found and described. It is also the quickest way to get the steps out of a tutorial that nobody ever wrote down.",
    how: [
      "Type the command below inside Claude Code. It adds the catalogue the tool lives in.",
      "Then install the tool itself by typing /plugin install watch@claude-video",
      "Type /watch, paste a video link, and ask your question. The first run fetches the few pieces it needs, so allow it a minute."
    ],
    command: "/plugin marketplace add mathiaschu/watch",
    commandTarget: "claude",
    note: "It answers from what is on the screen rather than from the title. The difference shows up on the first question."
  },
  {
    num: "14",
    name: "Codex for Claude Code",
    category: "Coding",
    tagline: "Brings in OpenAI's Codex to review code or take on jobs",
    blurb: "A second opinion from a rival company's assistant, without leaving the window you are in. Ask OpenAI's Codex to check what Claude just built, or hand over a job and let it work in the background.",
    repo: "https://github.com/openai/codex-plugin-cc",
    repoLabel: "VIEW REPO",
    maker: "OpenAI",
    why: "Two assistants built by different companies rarely make the same mistake, and the one that wrote the code is the worst judge of it. This is OpenAI's own add-on for Claude Code. It calls in Codex, their coding assistant, to read the changes just made and report what it finds, without you switching apps. The other half is handing work over rather than checking it: Codex takes the job, runs in the background, and reports back when it is done. It needs a ChatGPT account, and a free one is enough to start. What you use counts towards that account's Codex allowance, so it is worth saving for work that matters.",
    when: "Straight after a change big enough that you would want someone else to look at it, or on a stubborn bug where a fresh opinion beats another attempt. Handing work over is the other half. Because Codex can write and run code of its own, a job you pass to it can go well beyond code: it can even produce finished images for you, though that part needs a paid OpenAI account. There is no button for it, you simply ask.",
    how: [
      "Type the command below inside Claude Code. It adds OpenAI's catalogue.",
      "Install it by typing /plugin install codex@openai-codex, then /reload-plugins",
      "Type /codex:setup once. It checks Codex is ready and offers to fetch it if not. After that, /codex:review looks over your current work."
    ],
    command: "/plugin marketplace add openai/codex-plugin-cc",
    commandTarget: "claude",
    note: "A review from a model that did not write the code catches what checking your own work never will."
  },
  {
    num: "15",
    name: "Apple Design",
    category: "Design",
    tagline: "Teaches your AI what makes Apple interfaces feel right",
    blurb: "Assistants pick motion that feels slightly wrong: movement that rushes when it should settle, animations you cannot stop halfway. This hands over Apple's own principles, taken from their design talks.",
    repo: "https://github.com/emilkowalski/skills/tree/main/skills/apple-design",
    repoLabel: "VIEW SKILL",
    maker: "Emil Kowalski",
    why: "An AI assistant has no feel for motion. It will slow an animation down as it arrives when it should speed up, or build one that locks you out until it has finished playing. This hands the assistant Apple's own thinking, taken from their design talks and rewritten for the web. The rules are specific: react the instant a finger goes down rather than when it lifts, keep a dragged thing stuck to the finger the whole way, and let any animation be caught and reversed halfway through. That last one is most of the difference between an interface that feels alive and one that feels like a slideshow. It was written by Emil Kowalski, who spent years building interfaces at Vercel and Linear, two software companies known for exactly this kind of polish.",
    when: "Anything a person touches and drags: panels that slide up from the bottom, side drawers, swipe gestures, anything that should carry momentum. It is also worth reaching for when an animation you already built feels slightly off and you cannot put your finger on why.",
    how: [
      "Run the command below. It installs Emil's whole set of nine skills, not this one on its own.",
      "Ask your assistant to follow the apple-design skill while it builds or reviews an interface.",
      "The rest of the set is worth knowing about: animate builds an animation from scratch, review-animations goes over what you already have."
    ],
    command: "npx skills@latest add emilkowalski/skills",
    commandTarget: "terminal",
    note: "The rule about catching an animation mid-flight is the one almost no assistant thinks of on its own."
  },
  {
    num: "16",
    name: "Notchi",
    category: "Workflow",
    tagline: "Shows what Claude Code is doing, up in the notch",
    blurb: "A small character lives in your MacBook's notch and reacts while Claude Code works: thinking, waiting for permission, finished. Only for Macs that have a notch.",
    repo: "https://github.com/sk-ruban/notchi",
    repoLabel: "VIEW REPO",
    why: "While an assistant is working you either sit watching its window or wander off and lose track of it. Notchi puts a small animated character in the notch at the top of your MacBook screen and changes it as the work changes: thinking, running something, stopped and waiting for your permission, done. Every session you have open gets its own character. Click the notch and it opens out to show how long the session has run and how much of your usage allowance is left. It only runs on a MacBook that actually has a notch, on macOS 15 or newer, which rules out plenty of machines.",
    when: "Any time you set the assistant on something that will take minutes rather than seconds and you would rather glance up than keep checking. It is quickest at catching the moment it has stopped and is waiting on you to approve something, which is the easiest thing to miss.",
    how: [
      "Download the app from the releases page on the site linked above, and drag Notchi into Applications. There is nothing to type.",
      "Open it once. It connects itself to Claude Code and Codex, OpenAI's equivalent, whichever you have.",
      "If you want the character to react to the mood of what you wrote, paste an Anthropic or OpenAI key into Settings. A key is a paid pass code for their models, it spends your own credit, and Notchi works fine without one."
    ],
    command: null,
    commandTarget: null,
    note: "Ambient rather than useful, strictly speaking. Knowing it is waiting on you without having to look is worth more than it sounds."
  },
  {
    num: "17",
    name: "OmniRoute",
    category: "Coding",
    tagline: "Keeps you working when your AI quota runs out",
    blurb: "Hit your usage limit mid-task and everything stops. OmniRoute sits between your AI tool and hundreds of models, and when the one you are on runs dry it switches to another and carries on.",
    repo: "https://github.com/diegosouzapw/OmniRoute",
    repoLabel: "VIEW REPO",
    why: "Running out of your usage allowance halfway through a job is a slow way to lose an afternoon. OmniRoute sits in the middle: instead of your AI tool talking to one company directly, it talks to OmniRoute, which can pass the work to more than 500 models from around 290 companies, over 90 of them free. When the model you are using hits its limit, it hands you to another and keeps going. It also trims what gets sent along the way, which the project measures at 15 to 95 percent fewer tokens, the units AI reads and bills by.",
    when: "Long sessions where stopping is expensive, and any time you want to try a cheaper or free model without changing your setup. It works with the main AI coding tools, Claude Code, Codex, Cursor and Copilot among them.",
    how: [
      "Run the command below.",
      "Follow its guide, on the page linked above, to point your AI tool at it: one line to change in the tool's settings, shown for each tool.",
      "Carry on working. When a model runs out, it moves you to the next one."
    ],
    command: "npm install -g omniroute",
    commandTarget: "terminal",
    note: "MIT licensed and built by a large contributor base, so nothing here is locked behind one vendor."
  },
  {
    num: "18",
    name: "Claude Mem",
    category: "Knowledge",
    tagline: "Lets your assistant remember earlier sessions",
    blurb: "Close the window and your assistant forgets the lot. Claude Mem records what happened while you worked, condenses it, and feeds the relevant parts back the next time you sit down.",
    repo: "https://github.com/thedotmack/claude-mem",
    repoLabel: "VIEW REPO",
    why: "Every new session starts from nothing. You re-explain the project, the decisions you already settled, and the approaches that did not work. Claude Mem captures what the assistant does as you go, compresses it, then puts the parts that matter back into later sessions. You get an assistant that picks up roughly where you left off instead of asking again.",
    when: "Projects you return to across days or weeks, and any work where re-explaining the background eats the time you meant to spend building.",
    how: [
      "Run the command below. It sets itself up for whichever assistant you use.",
      "Work as normal. It records and condenses each session in the background.",
      "Next time you start, the relevant history is already in front of the assistant."
    ],
    command: "npx claude-mem install",
    commandTarget: "terminal",
    note: "Reaches past Claude Code to Codex, Gemini and Copilot, so the memory is not stranded in one tool."
  },
  {
    num: "19",
    name: "Headroom",
    category: "Coding",
    tagline: "Shrinks what gets sent to the model, not the answers",
    blurb: "Much of what an assistant reads is bulk: logs, command output, long files of data. Headroom squeezes that down before it is sent, which the project measures at 20 percent fewer tokens on coding work.",
    repo: "https://github.com/headroomlabs-ai/headroom",
    repoLabel: "VIEW REPO",
    why: "A lot of what your assistant reads is filler. Records of what programs printed, long stretches of data, repeated boilerplate. Every word of it uses up tokens, the units AI reads and bills by, and almost none of it makes the answer better. Headroom compresses that material before it reaches the model. The project measures around 20 percent fewer tokens on coding work and between 60 and 95 percent on data files, with the same answers coming back.",
    when: "Work that pushes a lot of material through the assistant: reading logs, handling large data files, or long runs where the assistant's working memory fills up and earlier detail starts falling out.",
    how: [
      "Run the command below. It needs Python 3.10 or newer; typing python3 --version in the Terminal tells you whether you have it.",
      "Follow its guide, on the page linked above, to add it to your assistant's connected tools. That is the simplest of its ways to run, and the guide covers the others.",
      "Carry on as normal. It compresses in the middle and the answers come back unchanged."
    ],
    command: "pip install \"headroom-ai[all]\"",
    commandTarget: "terminal",
    note: "It compresses what goes in, not what comes back, so nothing about the reply is degraded."
  },
  {
    num: "20",
    name: "Claude Code Setup",
    category: "Workflow",
    tagline: "Reads your project and suggests what to set up",
    blurb: "Claude Code can be extended about five different ways, which is five ways to not know where to begin. This reads your project and names the one or two worth adding in each.",
    repo: "https://claude.com/plugins/claude-code-setup",
    repoLabel: "VIEW PLUGIN",
    maker: "Anthropic",
    why: "Claude Code can be extended in several directions: skills it loads for particular jobs, outside tools it connects to, actions that fire automatically as you work, and shortcut commands you can type. Working out which of those your particular project would actually benefit from is the hard part. This reads your project and names the top one or two in each category, with its reasoning. It only reads and changes nothing, so running it costs you the time and nothing else.",
    when: "Setting up a project you have just started working in, or returning to one where you never got round to configuring anything past the defaults.",
    how: [
      "Install it with the command below.",
      "Then open Claude Code and ask in plain words, along the lines of recommending automations for this project.",
      "Read what it suggests and add whichever you want. It will not change anything itself."
    ],
    command: "claude plugin install claude-code-setup@claude-plugins-official",
    commandTarget: "terminal",
    note: "Read only, so there is no risk in running it purely to see what it says."
  },
  {
    num: "21",
    name: "Task Observer",
    category: "Workflow",
    tagline: "Watches how you work and improves your skills",
    blurb: "For when you have written a few skills of your own, the saved instructions an assistant loads for a job. This notices the corrections you keep making and turns them into suggested improvements.",
    repo: "https://github.com/rebelytics/one-skill-to-rule-them-all",
    repoLabel: "VIEW SKILL",
    why: "A skill is a set of saved instructions your assistant loads for a particular job. Writing one takes effort, and once written it never learns from how you actually use it. Task Observer runs alongside your work watching for two things: corrections you keep making, which point at a skill that is unclear, and jobs you keep doing by hand, which point at a skill that does not exist yet. It logs what it noticed and suggests specific changes. It never edits your skills itself, so you decide what to keep.",
    when: "Once you have built a few skills and keep correcting the same things. The author is upfront that the payoff grows with the size of your collection, so with two or three skills, editing them directly is still quicker.",
    how: [
      "On the page linked above, use GitHub's green Code button and choose Download ZIP, then unzip it.",
      "Put the folder where your assistant keeps its skills. For Claude Code that is the .claude/skills folder; the guide on that page covers other assistants.",
      "Work as normal, then read the observations it logs and apply the ones you agree with."
    ],
    command: null,
    commandTarget: null,
    note: "Released under CC BY 4.0 rather than a code license, which fits. It is a method as much as a tool."
  },
  {
    num: "22",
    name: "Playwright CLI",
    category: "Agents & MCP",
    tagline: "Lets your AI drive a browser without filling up its memory",
    blurb: "Browser control for coding assistants, given as short typed commands. It uses far less of the assistant's limited working memory, leaving room for your actual code.",
    repo: "https://github.com/microsoft/playwright-cli",
    repoLabel: "VIEW REPO",
    maker: "Microsoft",
    why: "An assistant that needs to click through your website can be given a browser in two ways. The usual way loads a large description of the page into the assistant's working memory, and that memory is a fixed size, so the more the page takes the less is left for your code. Microsoft built this the other way around. It hands the assistant short typed commands instead, the CLI in the name stands for command line, and does not push page contents at it. On a big project that difference is what decides whether the assistant can hold your code and the browser in mind at the same time.",
    when: "Writing or repairing tests that click through a website, checking a sign-up or checkout flow really works end to end, and any job where you want the assistant working against a real browser rather than guessing from the code.",
    how: [
      "Run the command below. It needs Node.js 18 or newer, a free runtime from nodejs.org.",
      "Then run playwright-cli install --skills so Claude Code and similar tools learn the commands.",
      "Ask your assistant in plain words, for example: test the add to basket flow on my site using playwright-cli."
    ],
    command: "npm install -g @playwright/cli@latest",
    commandTarget: "terminal",
    note: "The token argument is the whole point. On a large repo it is the difference between the assistant coping and running out of room."
  },
  {
    num: "23",
    name: "Supabase Plugin",
    category: "Agents & MCP",
    tagline: "Lets your AI work directly with your Supabase database",
    blurb: "For apps built on Supabase, a popular service that stores an app's data. This connects your assistant to the real project, so it works with what is actually there instead of guessing.",
    repo: "https://supabase.com/docs/guides/ai-tools/plugins",
    repoLabel: "VIEW DOCS",
    maker: "Supabase",
    why: "Supabase is the service many apps use to store their data and run their behind-the-scenes code. An assistant that cannot see yours will invent table names and write code against a shape that does not exist. This is Supabase's own add-on. It gives the assistant a real connection to your project, so it can read the data, make structural changes safely, and publish the small pieces of server code an app runs. It also brings two sets of written guidance, one on using Supabase properly and one on Postgres, the database underneath, so the assistant follows the house rules rather than whatever it half remembers.",
    when: "Any project already using Supabase. It earns its place fastest on database structure changes, where an assistant working blind will happily write something that does not match your real tables.",
    how: [
      "Run the command below. It works out which assistants you have and sets them up.",
      "Add --yes to the end of the command if you would rather it did not stop to ask.",
      "The first time you use it, it walks you through signing in to your Supabase project. After that, ask about your data in plain words."
    ],
    command: "npx plugins add supabase-community/supabase-plugin",
    commandTarget: "terminal",
    note: "It bundles the connection and the written guidance together, which is why it beats wiring up the connection on its own."
  },
  {
    num: "24",
    name: "Strix",
    category: "Coding",
    tagline: "Sets an AI loose on your own app to find security holes",
    blurb: "Runs an assistant against an application you own, looking for real weaknesses rather than listing theoretical ones, then helps you close what it finds.",
    repo: "https://github.com/usestrix/strix",
    repoLabel: "VIEW REPO",
    maker: "Strix",
    why: "Most security checking tools read your code and hand back a long list of things that might be wrong, and most of it is noise. Strix works the other way: it runs your application in a sealed box where nothing can leak out, and actually tries things against it, so what it reports is what it managed to do rather than what it suspects. It then helps you fix each one and runs again to confirm the fix held. Point it only at software you own or have written permission to test. Running this against someone else's site is not a grey area.",
    when: "Before putting something on the internet, and after any change to the parts that handle logins, payments or user uploads. It is also worth running on an older project you inherited and have never properly looked at.",
    how: [
      "Run the command below. It downloads a small program from the internet and runs it, so read it first if that matters to you.",
      "Tell it which AI assistant to use and give it that assistant's key, the paid pass code from that company. Its own page explains where. The scanning costs whatever that assistant charges.",
      "Point it at your project folder with strix --target ./your-app. The first run downloads the sealed box it tests inside, so give it time."
    ],
    command: "curl -sSL https://strix.ai/install | bash",
    commandTarget: "terminal",
    note: "It reports what it actually managed to do, not what it suspects. That is the difference from every scanner that hands you a wall of maybes."
  },
  {
    num: "25",
    name: "Skill UI",
    category: "Design",
    tagline: "Writes down your product's look so Claude can match it",
    blurb: "Reads a website or a project and writes down its colours, fonts, spacing and reusable pieces in a form Claude Code picks up on its own, so what it builds matches instead of drifting.",
    repo: "https://github.com/amaancoderx/npxskillui",
    repoLabel: "VIEW REPO",
    why: "Telling an assistant to make something look like your product rarely works, because it has nothing solid to work from and fills the gaps with its own taste. Skill UI goes and looks. It reads through a website, a project or a folder on your machine and pulls out the actual colours, typefaces, spacing and reusable pieces, then writes them into a folder that Claude Code reads by itself. Nothing is guessed and no AI is involved in the reading, it is plain inspection of what is there. Point it at your own product or a system you are allowed to use.",
    when: "Starting a new screen that has to sit alongside an existing product, or handing an assistant a house style it has never seen. It also works on your own site as a quick way to write down a look nobody ever documented.",
    how: [
      "Run the command below. It needs Node.js 18 or newer, a free runtime from nodejs.org.",
      "Run it against a web address, a project or a folder on your machine.",
      "Open the folder it produces and start Claude Code from inside it, then ask for the screen you want. It already knows the style."
    ],
    command: "npm install -g skillui",
    commandTarget: "terminal",
    note: "Plain inspection rather than a model guessing, which is why what comes out actually matches."
  }
];

/* Bump this when you edit the log — it feeds the colophon status line.
   Also regenerate og-image.png when the tool count changes. */
const LOG_UPDATED = "12.08.2026";
