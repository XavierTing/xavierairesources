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
     category — one of: Design | Writing | Coding | Connections | Workflow | Knowledge
     tagline  — one short line. Feeds page titles, meta descriptions,
                JSON-LD and the detail-page lede, so keep it under ~60 chars.
     blurb    — 3–4 lines on the card face: the argument in miniature.
                Aim for 150–200 characters.
     repo     — canonical URL
     repoLabel— link text (PROJECT PAGE ↗ / READ THE NOTE ↗ / VIEW DOCS ↗)
     maker    — optional; who made it. Omit for GitHub URLs (derived from the
                owner); set it for non-GitHub sources.
     needs    — what the reader must already have before step one, in a few
                words ("Claude Code, Node.js (free, from nodejs.org)" /
                "Nothing to install, a browser"). Anything they have to go and
                get carries where it comes from. Feeds the You'll need row.
     cost     — what it costs them, truthfully, in a few words ("Free" /
                "Free; scans spend your AI account's credit"). Feeds the Cost
                row in the sidebar. Say it if the entry spends their credit.
                If needs names an assistant, say the plan is separate too, in
                the house shape: "Free (Claude Code has its own plan)" or
                "Free (your AI assistant has its own plan)".
     schemaPrice — optional numeric string for a paid entry's current USD price.
                Omit for free entries; the generator defaults their offer to 0.
     schemaType — optional Schema.org type override for a non-software entry.
                Currently supports "Course"; omit for software applications.
     why      — the argument (2–4 sentences, plain language)
     when     — concrete reach-for-it scenarios
     how      — numbered steps
     command  — copyable install/run command (null = link-only entry)
     commandTarget — where the command gets typed: "terminal" (the Terminal
                app), "claude" (typed inside Claude Code), "assistant"
                (pasted into any AI assistant), or null when command is null.
                Feeds the label on the command box.
     status   — optional curator status shown on the detail page.
     note     — curator's aside. Feeds llms.txt only; not rendered on the site.
   ============================================================ */

const TOOLS = [
  {
    num: "01",
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Impeccable",
    category: "Design",
    tagline: "Stops AI building the same generic website",
    blurb: "Ask an AI to build a website and you get the same one every time: pale headline, rainbow text, three identical boxes. This teaches it what good design looks like.",
    repo: "https://github.com/pbakaus/impeccable",
    repoLabel: "PROJECT PAGE",
    needs: "An AI coding assistant, Node.js (free, from nodejs.org)",
    cost: "Free (your AI assistant has its own plan)",
    why: "Every AI model builds you the same website: a big pale heading, rainbow gradient text, three identical boxes. Impeccable gives the assistant an actual design education. It adds 23 commands you can type into your assistant and 60 automatic checks that catch those generic patterns the moment they appear on your page.",
    when: "Any time you are building a web page or an app with an AI assistant. Check it before you publish, ask it to improve what it made, or leave the checks running so it flags weak design while you work.",
    how: [
      "Run the command below in the folder your project lives in (in the Terminal: type cd, a space, then drag the folder onto the window and press enter). It works out which AI tool you use, whether that is Claude Code, Cursor, Codex or another.",
      "Inside your assistant, type /impeccable init once, so it learns what you are building and who it is for.",
      "Build as normal, then finish by typing /impeccable audit to check the result or /impeccable polish to improve it."
    ],
    command: "npx impeccable install",
    commandTarget: "terminal",
    note: "Its checks ran on every edit of this page."
  },
  {
    num: "02",
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Superpowers",
    category: "Workflow",
    tagline: "Makes Claude Code plan before it builds",
    blurb: "Left alone, an AI assistant starts typing code immediately and guesses at the rest. This slows it down: it works out the design, writes a plan, and gets your approval first.",
    repo: "https://github.com/obra/superpowers",
    repoLabel: "PROJECT PAGE",
    needs: "Claude Code",
    cost: "Free (Claude Code has its own plan)",
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
    makerType: "org",
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Spec-Kit",
    category: "Workflow",
    tagline: "Write down what you want, so the AI stops drifting",
    blurb: "Ask for feature after feature in one long chat and the AI forgets what you agreed at the start. Spec-Kit puts the requirements in a file, and that file becomes what it builds from.",
    repo: "https://github.com/github/spec-kit",
    repoLabel: "PROJECT PAGE",
    needs: "An AI coding assistant, the uv helper",
    cost: "Free (your AI assistant has its own plan)",
    why: "Building feature by feature inside one long chat drifts. By the third one, the assistant is guessing at what you asked for in the first. Spec-Kit turns that around. You write the requirements into a document, and the assistant builds from that document rather than from whatever it can still remember of the conversation.",
    when: "Projects that run across several sessions, work you share with other people, and anything where the plan has to outlive a single chat.",
    how: [
      "Run the command below in the folder your project lives in (in the Terminal: type cd, a space, then drag the folder onto the window and press enter). If it says uv is missing, install it from uv's own page at docs.astral.sh/uv; uv is the free helper this uses to fetch itself.",
      "Then, inside your assistant, type /speckit.specify to write down the requirements.",
      "Follow with /speckit.plan to plan the work, and /speckit.implement to build it."
    ],
    command: "uvx --from git+https://github.com/github/spec-kit.git specify init",
    commandTarget: "terminal",
    note: "The written spec is still there long after the chat has gone."
  },
  {
    num: "04",
    makerType: "org",
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Chrome DevTools MCP",
    category: "Connections",
    tagline: "Lets your AI assistant see the page it built",
    blurb: "An AI that cannot see your page will tell you it fixed something it never looked at. This connects it to a real Chrome browser, so it can open the page and check its own work.",
    repo: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
    repoLabel: "PROJECT PAGE",
    needs: "Claude Code, Node.js (free, from nodejs.org), Chrome",
    cost: "Free (Claude Code has its own plan)",
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
    makerType: "org",
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Context7",
    category: "Connections",
    tagline: "Gives the AI today's documentation, not last year's",
    blurb: "An AI only knows the software that existed when it was trained, so it writes code for versions that have since changed. This fetches the current documentation while it works.",
    repo: "https://github.com/upstash/context7",
    repoLabel: "PROJECT PAGE",
    needs: "Claude Code, Node.js (free, from nodejs.org)",
    cost: "Free (Claude Code has its own plan)",
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
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Repomix",
    category: "Coding",
    tagline: "Packs your whole project into one file you can paste",
    blurb: "Most AI chat windows cannot open your project folder. Repomix squashes the whole thing into a single file you can paste in, skipping the clutter and stripping anything like a password.",
    repo: "https://github.com/yamadashy/repomix",
    repoLabel: "PROJECT PAGE",
    needs: "Node.js (free, from nodejs.org), and any AI chat to paste into",
    cost: "Free",
    why: "Most AI chat windows cannot see your project folder, and pasting files one at a time is slow. Repomix flattens the whole project into one organized file. It skips the clutter folders a project collects, hides anything that looks like a password or a key, and tells you how large the result is. That hiding only covers things shaped like a credential, though: names, prices and client details sitting in your files travel with the pack, so read the output before you paste it anywhere.",
    when: "Getting a second opinion from a different AI, having code reviewed by a model that cannot open your folder, or bringing an assistant up to speed on code it has never seen.",
    how: [
      "Run the command below in the main folder of your project (in the Terminal: type cd, a space, then drag the folder onto the window and press enter).",
      "It produces a single file, named repomix-output.xml.",
      "Paste that file into whichever AI you want to ask. If the project is big, add --compress to the command to shrink it further."
    ],
    command: "npx repomix@latest",
    commandTarget: "terminal",
    note: "My button for letting a second model sanity check the work."
  },
  {
    num: "07",
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Agent-Reach",
    category: "Connections",
    tagline: "Gets your AI past sites that block it",
    blurb: "Ask an AI to read a tweet or a Reddit thread and it often simply cannot, because those sites block it. Agent-Reach finds a route that still works for each one and sets it up for you.",
    repo: "https://github.com/Panniantong/Agent-Reach",
    repoLabel: "PROJECT PAGE",
    needs: "Claude Code",
    cost: "Free (Claude Code has its own plan)",
    why: "Much of the useful internet is closed to automated tools. X charges for access, Reddit blocks the machines assistants usually call from, and video sites restrict things by country. Agent-Reach works out which route still works for each site, sets it up, tests that it really is working, and gives your assistant one consistent way to ask for any of them.",
    when: "Research where the assistant genuinely needs to read tweets, Reddit discussions or video transcripts, or to check several sites in a single run.",
    how: [
      "Paste the line below into your assistant. It installs itself: the assistant downloads the skill's instructions and saves them into its own skills folder on your machine.",
      "It checks your setup and reports which sites it can reach.",
      "Ask for a page by its web address or by searching, and it picks a route that works."
    ],
    command: "Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md",
    commandTarget: "assistant",
    note: "Turns a flat refusal to open the page into an actual answer."
  },
  {
    num: "08",
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "LLM Wiki",
    category: "Knowledge",
    tagline: "Notes your AI writes and keeps up to date for you",
    blurb: "Most setups make an AI re-read all your documents for every question and remember none of it. This has it keep a growing set of notes instead, linking new material to old.",
    repo: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    repoLabel: "READ THE NOTE",
    needs: "Nothing to install, a browser",
    cost: "Free",
    why: "Most tools that let an AI use your documents work by searching them fresh for every question. The AI re-reads everything each time and builds up no understanding at all. Andrej Karpathy, one of the best known AI researchers, suggests the opposite: have the model keep a set of plain text notes. Each new source gets read once, linked to the notes it relates to, and flagged where it contradicts something already written down. The reading work happens once instead of on every question.",
    when: "Building a second brain out of notes, articles and bookmarks: a personal knowledge base that gets more useful the more you add to it.",
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
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Humanizer",
    category: "Writing",
    tagline: "Takes the AI sound out of your writing",
    blurb: "AI prose has a tell: long dashes everywhere, the it is not this, it is that construction, bold on every other phrase. This strips out 33 documented habits and can learn your voice.",
    repo: "https://github.com/blader/humanizer",
    repoLabel: "PROJECT PAGE",
    needs: "An AI coding assistant, Node.js (free, from nodejs.org)",
    cost: "Free (your AI assistant has its own plan)",
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
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Figma MCP",
    category: "Design",
    tagline: "Lets AI read your real design file, not a screenshot",
    blurb: "Hand an AI a screenshot of a design and it guesses the spacing and invents the colors. This connects it to the real Figma file, so it reads the actual values. It can write back too.",
    repo: "https://developers.figma.com/docs/figma-mcp-server/",
    repoLabel: "VIEW DOCS",
    maker: "Figma",
    needs: "Claude Code, a Figma account",
    cost: "Free with your Figma account (Claude Code has its own plan)",
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
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Obsidian Skills",
    category: "Knowledge",
    tagline: "Teaches your AI to work inside your Obsidian notes",
    blurb: "Obsidian keeps your notes as plain files on your own computer. This teaches an AI assistant to read and write them properly: the links between notes, the canvases, the tables.",
    repo: "https://github.com/kepano/obsidian-skills",
    repoLabel: "PROJECT PAGE",
    needs: "An AI coding assistant, Obsidian",
    cost: "Free (your AI assistant has its own plan)",
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
    added: "2026-07-30",
    updated: "2026-08-13",
    name: "Ralph Loop",
    category: "Workflow",
    tagline: "Runs Claude on the same task until it is done",
    blurb: "Some jobs do not come right first time. This restarts Claude on the same task over and over, letting it read what it already tried, until it passes your check or runs out of attempts.",
    repo: "https://claude.com/plugins/ralph-loop",
    repoLabel: "VIEW PLUGIN",
    maker: "Anthropic",
    needs: "Claude Code",
    cost: "Free; each attempt uses your Claude allowance",
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
    added: "2026-08-02",
    updated: "2026-08-26",
    name: "Watch",
    category: "Connections",
    tagline: "Gives Claude selected video stills and transcript text",
    blurb: "Watch does not stream a whole video into Claude. It checks captions, selects still images from different moments and pairs both with time labels. The default keeps up to 100 images, so events between them can be missed.",
    repo: "https://github.com/bradautomates/claude-video",
    repoLabel: "GITHUB REPO",
    maker: "Brad Bonanno",
    makerType: "person",
    needs: "Claude Code and Python 3, the free software that runs Watch. On macOS, the first run can use Homebrew, a software installer, to add ffmpeg for extracting video and audio and yt-dlp for downloading supported video links. On Linux and Windows, it prints installation commands for you to run.",
    cost: "Free for captions already attached to a video and for selecting still images. Claude Code has its own plan. Optional Groq or OpenAI speech-to-text may use credits or incur charges under that provider's plan.",
    why: "A transcript tells you what was said but not what appeared on screen. Watch checks for captions already attached to the video, selects still images and pairs both with time labels so Claude can reason from more than the title. It samples rather than continuously watches the video, never taking more than two images per second, so it can miss events between images and captions can be wrong. If captions are missing and you enable the optional fallback, it sends an extracted audio clip to Groq or OpenAI for Whisper speech-to-text transcription. Whenever it downloads media, the video and extracted files stay in a temporary working folder on your computer.",
    when: "Use it for product demos, tutorials, screen recordings, social videos and local MP4 or MOV files when the visuals matter as much as the words. By default it keeps up to 100 still images selected around scene changes, so videos longer than about ten minutes get a sparse scan. Use only videos you have permission to process. The selected images and transcript text go to Claude. A captionless video's extracted audio also goes to Groq or OpenAI only when you enable that optional speech-to-text service.",
    how: [
      "In the Claude Code prompt, where you normally type requests rather than in the Terminal app, paste the marketplace command below. Then type /plugin install watch@claude-video in the same Claude Code prompt.",
      "Run /watch with a short video you have permission to process and ask a question. On macOS, the first run can install ffmpeg and yt-dlp through Homebrew; on Linux or Windows, run the installation commands it prints. Add an optional Groq or OpenAI API key, a secret that authorises access to that service, only if you accept sending captionless audio to that provider. Store it in ~/.config/watch/.env, the hidden settings file the tool creates in your home folder.",
      "Check important answers against the original video, time labels and still images because selected images and speech-to-text output can miss details. For a long video, focus the scan by typing a request such as /watch VIDEO-URL --start 2:00 --end 3:00. The tool prints the temporary working folder it used; check that Claude removes it after your final question, or delete it yourself."
    ],
    command: "/plugin marketplace add bradautomates/claude-video",
    commandTarget: "claude",
    status: "Reviewed \u00b7 Not tested",
    note: "Captions already attached to a video are the lower-cost path. Selected still images use part of the information Claude can process in one request, so focus long videos on the part that matters."
  },
  {
    num: "14",
    added: "2026-08-04",
    updated: "2026-08-13",
    name: "Codex for Claude Code",
    category: "Coding",
    tagline: "Brings in OpenAI's Codex to review code or take on jobs",
    blurb: "A second opinion from a rival company's assistant, without leaving the window you are in. Ask OpenAI's Codex to check what Claude just built, or hand over a job and let it work in the background.",
    repo: "https://github.com/openai/codex-plugin-cc",
    repoLabel: "PROJECT PAGE",
    maker: "OpenAI",
    needs: "Claude Code, a ChatGPT account",
    cost: "Free plugin; uses your ChatGPT account's Codex allowance",
    why: "Two assistants built by different companies rarely make the same mistake, and the one that wrote the code is the worst judge of it. This is OpenAI's own add-on for Claude Code. It calls in Codex, their coding assistant, to read the changes just made and report what it finds, without you switching apps. The other half is handing work over rather than checking it: Codex takes the job, runs in the background, and reports back when it is done. The plugin itself is free; the work runs against your ChatGPT account's Codex allowance, which a free account gets a small amount of, and the image making it can also do needs a paid OpenAI account.",
    when: "Straight after a change big enough that you would want someone else to look at it, or on a stubborn bug where a fresh opinion beats another attempt. Handing work over is the other half. Because Codex can write and run code of its own, a job you pass to it can go well beyond code: it can even produce finished images for you (needs a paid OpenAI account). There is no button for it, you simply ask.",
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
    added: "2026-08-05",
    updated: "2026-08-13",
    name: "Apple Design",
    category: "Design",
    tagline: "Teaches your AI what makes Apple interfaces feel right",
    blurb: "Assistants pick motion that feels slightly wrong: movement that rushes when it should settle, animations you cannot stop halfway. This hands over Apple's own principles, taken from their design talks.",
    repo: "https://github.com/emilkowalski/skills/tree/main/skills/apple-design",
    repoLabel: "VIEW SKILL",
    maker: "Emil Kowalski",
    makerType: "person",
    needs: "An AI coding assistant, Node.js (free, from nodejs.org)",
    cost: "Free (your AI assistant has its own plan)",
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
    added: "2026-08-05",
    updated: "2026-08-13",
    name: "Notchi",
    category: "Workflow",
    tagline: "Shows what Claude Code is doing, up in the notch",
    blurb: "A small character lives in your MacBook's notch and reacts while Claude Code works: thinking, waiting for permission, finished. Only for Macs that have a notch.",
    repo: "https://github.com/sk-ruban/notchi",
    repoLabel: "PROJECT PAGE",
    needs: "A MacBook with a notch, macOS 15 or newer",
    cost: "Free; the optional key spends your own credit",
    why: "While an assistant is working you either sit watching its window or wander off and lose track of it. Notchi puts a small animated character in the notch at the top of your MacBook screen and changes it as the work changes: thinking, running something, stopped and waiting for your permission, done. Every session you have open gets its own character. Click the notch and it opens out to show how long the session has run and how much of your usage allowance is left. It only runs on a MacBook that actually has a notch, on macOS 15 or newer, which rules out plenty of machines.",
    when: "Any time you set the assistant on something that will take minutes rather than seconds and you would rather glance up than keep checking. It is quickest at catching the moment it has stopped and is waiting on you to approve something, which is the easiest thing to miss.",
    how: [
      "Download the app from the releases page, linked from the project page in the sidebar, and drag Notchi into Applications. There is nothing to type.",
      "Open it once. It connects itself to Claude Code and Codex, OpenAI's equivalent, whichever you have.",
      "Skip the key. The character works without one; a key is only for the chat feature, it comes from Anthropic's or OpenAI's own website, and it spends your own credit every time it is used."
    ],
    command: null,
    commandTarget: null,
    note: "Ambient rather than useful, strictly speaking. Knowing it is waiting on you without having to look is worth more than it sounds."
  },
  {
    num: "17",
    added: "2026-08-07",
    updated: "2026-08-13",
    name: "OmniRoute",
    category: "Coding",
    tagline: "Keeps you working when your AI quota runs out",
    blurb: "Hit your usage limit mid-task and everything stops. OmniRoute sits between your AI tool and hundreds of models, and when the one you are on runs dry it switches to another and carries on.",
    repo: "https://github.com/diegosouzapw/OmniRoute",
    repoLabel: "PROJECT PAGE",
    needs: "Node.js (free, from nodejs.org), and an AI coding tool",
    cost: "Free; paid models still bill you as usual",
    why: "Running out of your usage allowance halfway through a job is a slow way to lose an afternoon. OmniRoute sits in the middle: instead of your AI tool talking to one company directly, it talks to OmniRoute, which can pass the work to more than 500 models from around 290 companies, over 90 of them free. When the model you are using hits its limit, it hands you to another and keeps going. It also trims what gets sent along the way, which the project measures at 15 to 95 percent fewer tokens, the units AI reads and bills by. Sitting in the middle is the trade: what you send travels through OmniRoute on its way to whichever company hosts the model you picked, which is worth a thought if the text is confidential.",
    when: "Long sessions where stopping is expensive, and any time you want to try a cheaper or free model without changing your setup. It works with the main AI coding tools, Claude Code, Codex, Cursor and Copilot among them.",
    how: [
      "Run the command below.",
      "Follow its guide, on the project page linked in the sidebar, to point your AI tool at it: one line to change in the tool's settings, shown for each tool.",
      "Carry on working. When a model runs out, it moves you to the next one."
    ],
    command: "npm install -g omniroute",
    commandTarget: "terminal",
    note: "MIT licensed and built by a large contributor base, so nothing here is locked behind one vendor."
  },
  {
    num: "18",
    added: "2026-08-07",
    updated: "2026-08-13",
    name: "Claude Mem",
    category: "Knowledge",
    tagline: "Lets your assistant remember earlier sessions",
    blurb: "Close the window and your assistant forgets the lot. Claude Mem records what happened while you worked, condenses it, and feeds the relevant parts back the next time you sit down.",
    repo: "https://github.com/thedotmack/claude-mem",
    repoLabel: "PROJECT PAGE",
    needs: "An AI coding assistant, Node.js (free, from nodejs.org)",
    cost: "Free (your AI assistant has its own plan)",
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
    makerType: "org",
    added: "2026-08-07",
    updated: "2026-08-13",
    name: "Headroom",
    category: "Coding",
    tagline: "Shrinks what gets sent to the model, not the answers",
    blurb: "Much of what an assistant reads is bulk: logs, command output, long files of data. Headroom squeezes that down before it is sent, which the project measures at 20 percent fewer tokens on coding work.",
    repo: "https://github.com/headroomlabs-ai/headroom",
    repoLabel: "PROJECT PAGE",
    needs: "Python 3.10 or newer",
    cost: "Free",
    why: "A lot of what your assistant reads is filler. Records of what programs printed, long stretches of data, repeated boilerplate. Every word of it uses up tokens, the units AI reads and bills by, and almost none of it makes the answer better. Headroom compresses that material before it reaches the model. The project measures around 20 percent fewer tokens on coding work and between 60 and 95 percent on data files, with the same answers coming back.",
    when: "Work that pushes a lot of material through the assistant: reading logs, handling large data files, or long runs where the assistant's working memory fills up and earlier detail starts falling out.",
    how: [
      "Run the command below. It needs Python 3.10 or newer; typing python3 --version in the Terminal tells you whether you have it. If it is missing, Python is a free install from python.org, and pip, Python's own installer, arrives with it.",
      "Follow its guide, on the project page linked in the sidebar, to add it to your assistant's connected tools. That is the simplest of its ways to run, and the guide covers the others.",
      "Carry on as normal. It compresses in the middle and the answers come back unchanged."
    ],
    command: "pip install \"headroom-ai[all]\"",
    commandTarget: "terminal",
    note: "It compresses what goes in, not what comes back, so nothing about the reply is degraded."
  },
  {
    num: "20",
    added: "2026-08-07",
    updated: "2026-08-13",
    name: "Claude Code Setup",
    category: "Workflow",
    tagline: "Reads your project and suggests what to set up",
    blurb: "Claude Code can be extended about five different ways, which is five ways to not know where to begin. This reads your project and names the one or two worth adding in each.",
    repo: "https://claude.com/plugins/claude-code-setup",
    repoLabel: "VIEW PLUGIN",
    maker: "Anthropic",
    needs: "Claude Code",
    cost: "Free (Claude Code has its own plan)",
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
    added: "2026-08-07",
    updated: "2026-08-13",
    name: "Task Observer",
    category: "Workflow",
    tagline: "Watches how you work and improves your skills",
    blurb: "For when you have written a few skills of your own, the saved instructions an assistant loads for a job. This notices the corrections you keep making and turns them into suggested improvements.",
    repo: "https://github.com/rebelytics/one-skill-to-rule-them-all",
    repoLabel: "PROJECT PAGE",
    needs: "Claude Code, and a few skills of your own",
    cost: "Free (Claude Code has its own plan)",
    why: "A skill is a set of saved instructions your assistant loads for a particular job. Writing one takes effort, and once written it never learns from how you actually use it. Task Observer runs alongside your work watching for two things: corrections you keep making, which point at a skill that is unclear, and jobs you keep doing by hand, which point at a skill that does not exist yet. It logs what it noticed and suggests specific changes. It never edits your skills itself, so you decide what to keep.",
    when: "Once you have built a few skills and keep correcting the same things. The author is upfront that the payoff grows with the size of your collection, so with two or three skills, editing them directly is still quicker.",
    how: [
      "On the project page linked in the sidebar, use GitHub's green Code button and choose Download ZIP, then unzip it.",
      "Put the folder where your assistant keeps its skills. For Claude Code that is the .claude/skills folder, and folders whose name starts with a dot are hidden: on a Mac, press Cmd+Shift+. in Finder to show them, or use Finder's Go to Folder. The guide on that page covers other assistants.",
      "Work as normal, then read the observations it logs and apply the ones you agree with."
    ],
    command: null,
    commandTarget: null,
    note: "Released under CC BY 4.0 rather than a code license, which fits. It is a method as much as a tool."
  },
  {
    num: "22",
    added: "2026-08-09",
    updated: "2026-08-13",
    name: "Playwright CLI",
    category: "Connections",
    tagline: "Lets your AI drive a browser without filling up its memory",
    blurb: "Browser control for coding assistants, given as short typed commands. It uses far less of the assistant's limited working memory, leaving room for your actual code.",
    repo: "https://github.com/microsoft/playwright-cli",
    repoLabel: "PROJECT PAGE",
    maker: "Microsoft",
    needs: "Claude Code, Node.js 18 or newer (free, from nodejs.org)",
    cost: "Free (Claude Code has its own plan)",
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
    added: "2026-08-09",
    updated: "2026-08-13",
    name: "Supabase Plugin",
    category: "Connections",
    tagline: "Lets your AI work directly with your Supabase database",
    blurb: "For apps built on Supabase, a popular service that stores an app's data. This connects your assistant to the real project, so it works with what is actually there instead of guessing.",
    repo: "https://supabase.com/docs/guides/ai-tools/plugins",
    repoLabel: "VIEW DOCS",
    maker: "Supabase",
    needs: "An AI coding assistant, a Supabase project",
    cost: "Free; Supabase and your AI assistant have their own plans",
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
    added: "2026-08-09",
    updated: "2026-08-13",
    name: "Strix",
    category: "Coding",
    tagline: "Sets an AI loose on your own app to find security holes",
    blurb: "Runs an assistant against an application you own, looking for real weaknesses rather than listing theoretical ones, then helps you close what it finds.",
    repo: "https://github.com/usestrix/strix",
    repoLabel: "PROJECT PAGE",
    maker: "Strix",
    needs: "A paid AI account key, software you own",
    cost: "Free; scans spend your AI account's credit",
    why: "Most security checking tools read your code and hand back a long list of things that might be wrong, and most of it is noise. Strix works the other way: it runs your application in a sealed box where nothing can leak out, and actually tries things against it, so what it reports is what it managed to do rather than what it suspects. It then helps you fix each one and runs again to confirm the fix held. Point it only at software you own or have written permission to test. Running this against someone else's site is not a grey area.",
    when: "Before putting something on the internet, and after any change to the parts that handle logins, payments or user uploads. It is also worth running on an older project you inherited and have never properly looked at.",
    how: [
      "Run the command below. It downloads a small program from the internet and runs it; to read that program first, paste https://strix.ai/install into your browser.",
      "Tell it which AI assistant to use and give it that assistant's key, the paid pass code from that company; the project page linked in the sidebar explains where. A scan spends that account's credit as it works: a few dollars on a small app, more on a large one. If none of that sentence made sense, this entry is for whoever builds your software, not for you.",
      "Point it at your project folder with strix --target ./your-app. The first run downloads the sealed box it tests inside, so give it time."
    ],
    command: "curl -sSL https://strix.ai/install | bash",
    commandTarget: "terminal",
    note: "It reports what it actually managed to do, not what it suspects. That is the difference from every scanner that hands you a wall of maybes."
  },
  {
    num: "25",
    added: "2026-08-09",
    updated: "2026-08-13",
    name: "Skill UI",
    category: "Design",
    tagline: "Writes down your product's look so Claude can match it",
    blurb: "Reads a website or a project and writes down its colours, fonts, spacing and reusable pieces in a form Claude Code picks up on its own, so what it builds matches instead of drifting.",
    repo: "https://github.com/amaancoderx/npxskillui",
    repoLabel: "PROJECT PAGE",
    needs: "Claude Code, Node.js 18 or newer (free, from nodejs.org)",
    cost: "Free (Claude Code has its own plan)",
    why: "Telling an assistant to make something look like your product rarely works, because it has nothing solid to work from and fills the gaps with its own taste. Skill UI goes and looks. It reads through a website, a project or a folder on your machine and pulls out the actual colours, typefaces, spacing and reusable pieces, then writes them into a folder that Claude Code reads by itself. Nothing is guessed and no AI is involved in the reading, it is plain inspection of what is there. Point it at your own product or a system you are allowed to use.",
    when: "Starting a new screen that has to sit alongside an existing product, or handing an assistant a house style it has never seen. It also works on your own site as a quick way to write down a look nobody ever documented.",
    how: [
      "Run the command below. It needs Node.js 18 or newer, a free runtime from nodejs.org.",
      "Run it against a web address, a project or a folder on your machine.",
      "Open the folder it produces and start Claude Code from inside it (in the Terminal: type cd, a space, then drag the folder onto the window and press enter), then ask for the screen you want. It already knows the style."
    ],
    command: "npm install -g skillui",
    commandTarget: "terminal",
    note: "Plain inspection rather than a model guessing, which is why what comes out actually matches."
  },
  {
    num: "26",
    added: "2026-08-13",
    updated: "2026-08-14",
    name: "Autoresearch",
    category: "Workflow",
    tagline: "Lets an AI agent run model experiments overnight",
    blurb: "Give an AI agent one small language model and one score to improve. It edits the training code, runs five-minute experiments, keeps what works, and records the rest while you sleep.",
    repo: "https://github.com/karpathy/autoresearch",
    repoLabel: "PROJECT PAGE",
    needs: "The uv helper, Python 3.10 or newer, an NVIDIA graphics card",
    cost: "Free (the coding agent you point at it has its own plan)",
    why: "Most AI research still depends on a person proposing each change, running it, reading the result and deciding what to try next. Andrej Karpathy's Autoresearch turns that loop over to an AI coding agent. The agent edits one training file, runs a fixed five-minute experiment, compares a validation score, keeps improvements and discards regressions. It is a compact demonstration of what autonomous research can look like, not a general-purpose training service.",
    when: "Exploring autonomous AI research, teaching experiment design, or testing whether a coding agent can improve a small language model through repeated measured changes. The official version needs Python 3.10 or newer, uv and one NVIDIA GPU; it was tested by the project on an H100. Mac, Windows and AMD users need community forks linked from its README.",
    how: [
      "Clone the repository into a fresh folder, then read its README and program.md before giving an agent control. The README labels the project MIT, although the repository does not currently include a standalone licence file.",
      "Run uv sync, followed by uv run prepare.py. This downloads training data from Hugging Face into your local cache and trains a tokenizer.",
      "Run uv run train.py once to establish a baseline. Then use a disposable clone on its own branch, grant Claude Code, Codex or another coding agent only the permissions it needs, point it to program.md, and review every commit and result before keeping anything."
    ],
    command: "git clone https://github.com/karpathy/autoresearch.git",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "Advanced and GPU-only. It downloads model-training data and attention kernels, then lets an agent repeatedly edit and execute training code, so use an isolated branch and review the output."
  },
  {
    num: "27",
    added: "2026-08-14",
    updated: "2026-08-14",
    name: "Agent Skills",
    category: "Workflow",
    tagline: "Makes an AI follow a repeatable build process",
    blurb: "Adds 24 step-by-step work routines to an AI that works on your project files, from defining an idea to testing and publishing it. Browse first, then install what you need.",
    repo: "https://github.com/addyosmani/agent-skills",
    repoLabel: "PROJECT PAGE",
    needs: "An AI assistant that can change project files, Node.js (free software from nodejs.org; it includes npx)",
    cost: "Free (your AI assistant has its own plan)",
    why: "An AI that can change project files can write quickly and still skip the habits that keep the work healthy: agreeing on the requirement, making a small plan, testing the change and asking for a fresh review. Addy Osmani's Agent Skills packages those habits as 24 saved workflows, the step-by-step routines an AI follows for a particular job. They cover the path from defining an idea to publishing the finished work. These are instructions that shape how your AI works, not a replacement for your judgment or approval.",
    when: "Use it when an AI is changing a software project large enough to need a repeatable process, especially a feature that crosses several files or a change you intend to publish. Start with one or two skills on an existing project rather than changing the whole workflow at once. Claude Code, Codex, Cursor and many other AI assistants can read the format, although the exact setup differs by assistant.",
    how: [
      "Open the Terminal app, the window where you type commands, in the folder that holds your project. Paste the command below and press Enter. npx arrives with Node.js and may download the open skills installer from Vercel Labs; --list tells that installer to show the 24 choices without adding Agent Skills yet.",
      "Choose a skill by name. To install all 24, run the command again after deleting --list. To install one, replace --list with --skill and its name, for example --skill code-review-and-quality. A one-skill install can omit supporting checklists, so install all 24 when you want the complete material.",
      "Try the installed skill on a duplicate of your project folder first, not on your only copy. Ask your AI assistant to use the skill you chose, read every command and file change it proposes, and keep only changes you understand. If anything goes wrong, delete the duplicate and your original stays untouched."
    ],
    command: "npx skills add addyosmani/agent-skills --list",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "A broad, MIT-licensed pack with a useful verification-first bias. Browse before installing, and watch the shared-reference gap when you add only one skill."
  },
  {
    num: "28",
    added: "2026-08-15",
    updated: "2026-08-15",
    name: "Higgsfield CLI",
    category: "Design",
    maker: "Higgsfield",
    tagline: "Makes images and videos from a line you type",
    blurb: "Describe the picture or the clip you want and it arrives as a file on your computer, with no website or design app in between. It can send that description to about fifty different AI generators, covering images, video, 3D objects and sound, and each run spends credits from a paid Higgsfield account.",
    repo: "https://github.com/higgsfield-ai/cli",
    repoLabel: "GITHUB REPO",
    needs: "Node.js (free from nodejs.org), a Higgsfield account with credits, and a coding assistant such as Claude Code for the third step. Runs on macOS, Linux or Windows",
    cost: "Free to install, then credits for every picture or clip it makes. Credits are prepaid units: a plan hands you a monthly allowance, a still image spends fewer of them than a video, and the price climbs with resolution, meaning how large and sharp the result is. Plans start at roughly fifteen US dollars a month at the time of writing, so read higgsfield.ai/pricing for today's numbers. There is a free plan, and it stamps a watermark, a visible logo, across whatever it produces.",
    why: "Making one image for a post is a small errand that quietly eats a morning: open a tab, pick a generator, wait, download the file, rename it, drag it into the right folder. Higgsfield CLI moves that errand into the terminal, the typed-command window on your computer. That matters because an AI coding agent, the kind of assistant that works on the files in a folder rather than only chatting with you, can then ask for the picture itself and save it where the page expects it. It reaches about fifty models, the individual AI generators that actually draw the picture or render the clip, across images, video, 3D objects and sound, and it can train a Soul ID, a saved likeness that holds one face steady from shot to shot. Be clear about what it is not: the program on your machine is free, but the drawing happens on Higgsfield's computers, so this is a paid service with a free tool as its front door.",
    when: "Reach for it when the artwork belongs to work you are already doing in a folder: a header image for the post you are writing, a clip for a slide presentation, or twenty versions of one advertisement image you would rather not click through by hand. It runs on macOS, Linux and Windows, and Node.js has to be installed first. The free plan watermarks its output, so anything you mean to publish is a paid activity. What one run costs depends on the model and the resolution, so look the price up before you ask for many at once: an agent told to make ten videos spends ten videos' worth of credits and does not stop to ask a second time.",
    how: [
      "Install Node.js first if you do not have it: download the installer from nodejs.org and run it like any other app. Then open the Terminal app, the window where you type commands (on a Mac, hold Command and press the space bar, type Terminal, then press Enter). Paste the line below and press Enter. It fetches the tool from npm, the software library that arrives with Node.js, and the -g means install it for the whole computer rather than one folder.",
      "Run higgsfield auth login. It opens your browser so you can sign in, then hands a pass back to the terminal. That pass is short lived, so expect to sign in again on another day. Run higgsfield account next and read your credit balance before you spend any of it.",
      "Run npx skills add higgsfield-ai/skills. The npx part comes with Node.js and runs a helper once without installing it, and skills are written instructions that teach your coding assistant these commands. Then ask that assistant for one picture in plain words, for example: use Higgsfield to make a wide header image of a night market. Look at what comes back before you ask for anything more, and approve requests one at a time rather than twenty at once, because each one spends real credits."
    ],
    command: "npm install -g @higgsfield/cli",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "The tool on your machine is free and the model list is wide, but the meter runs on someone else's computer. Watch what an agent asks for before you let it generate unattended."
  },
  {
    num: "29",
    added: "2026-08-15",
    updated: "2026-08-15",
    name: "Taste Skill",
    category: "Design",
    maker: "Leon Lin and blueemi",
    tagline: "Gives an AI assistant a point of view about design",
    blurb: "Ask an assistant for a front page and you tend to get the same one back: a centred headline, three cards, a colour-fade background. This is a pack of thirteen written instruction sets that push it toward deliberate choices instead, including named looks such as minimalist and brutalist that you can ask for by name.",
    repo: "https://github.com/Leonxlnx/taste-skill",
    repoLabel: "GITHUB REPO",
    needs: "Node.js (free from nodejs.org), and a coding assistant that reads skills, such as Claude Code, Cursor, Codex or Gemini CLI",
    cost: "Free and open source. The assistant you point it at has its own plan.",
    why: "An AI writes a page out of the average of everything it has seen, so the page looks like the average of everything it has seen: safe spacing, a gradient, three cards in a row, nothing that suggests a person made a decision. Taste Skill is a set of skills, written instructions an assistant reads before it starts work, aimed squarely at that problem. It ships thirteen of them: a default, several named looks such as minimalist and brutalist, a redesign pass for pages that already exist, and one that draws the design as a picture before writing any code. What it changes is what your assistant reaches for first. It is not a design system for your own product, and it has no opinion about whether the thing you are building is worth building.",
    when: "Reach for it when you are building an interface with an assistant and the results keep coming out generic, or when you want a particular look often enough that naming it beats describing it every time. It works with Claude Code, Cursor, Codex, Gemini CLI and several other coding assistants. The default skill is labelled experimental by its authors. If you would rather have the steadier older version, put --skill design-taste-frontend-v1 at the end of the install line, which fetches that one instead of the whole pack.",
    how: [
      "Open the Terminal app, the window where you type commands, and move to your project folder. Paste the line below. It uses npx, the helper that arrives with Node.js, to copy the skills into the place your assistant looks for them.",
      "Ask for one screen and name a look, for example: rebuild this pricing page using the minimalist skill. Put it beside what the same assistant made before, because that comparison is your only evidence the skill actually took.",
      "Keep it on a duplicate of your project until you trust it. These skills rewrite layout and styling with a firm hand, which is the point of them, but a firm hand on your only copy makes for a bad afternoon."
    ],
    command: "npx skills add Leonxlnx/taste-skill",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "Opinionated on purpose, which is the whole value. Read what a named look does to your spacing before you let it near a page that already works."
  },
  {
    num: "30",
    added: "2026-08-15",
    updated: "2026-08-15",
    name: "21st MCP",
    category: "Design",
    maker: "21st.dev",
    tagline: "Builds an interface component from one sentence",
    blurb: "Describe the piece you want, a pricing table, a sidebar, a date picker, and it writes the code straight into your project. It searches a public catalogue first, so what arrives is usually a component someone actually shipped rather than one invented on the spot. The free plan covers a hundred credits a month.",
    repo: "https://21st.dev/mcp",
    repoLabel: "PROJECT PAGE",
    needs: "Node.js (free from nodejs.org), a free 21st.dev account for an API key, and an editor that speaks MCP such as Claude Code, Cursor, VS Code or Windsurf",
    cost: "Free plan gives a hundred credits a month, and a credit is spent each time you ask it to make something. Paid plans run about 20 US dollars a month, or 40 for the larger one, less if billed yearly, at the time of writing.",
    why: "Building the ordinary furniture of an interface is the part nobody enjoys: the date picker, the pricing table, the settings sidebar, each one an afternoon of fiddling that teaches you nothing. 21st MCP connects your editor to a catalogue of components other people have already built and published, using MCP, the standard way an assistant plugs into an outside service. You describe what you want in a sentence, it finds close matches, generates the code and writes it into your project. Two honest notes. The project used to be called Magic MCP, and that older name now does nothing but forward requests here, with the old keys switched off. And every component arrives under somebody else's licence, the terms setting out how you are allowed to reuse it, which is yours to read.",
    when: "Reach for it when you need a standard interface piece quickly and would rather start from something real than from a blank file. It suits projects built with React, the most common way modern web interfaces are assembled, since that is what the catalogue is made of. Because each request spends a credit and the free plan holds a hundred a month, it rewards asking for one considered component over generating six variations to browse. Read the licence on anything that ends up in work you sell.",
    how: [
      "Make a free account at 21st.dev and generate an API key, the long password that proves the requests are yours. Keep it out of any file you upload to a shared code folder such as GitHub, because anyone who reads the key can spend your credits.",
      "Open the Terminal app, the window where you type commands, in your project folder and paste the line below. It sets up the connection for Claude Code; swap claude for cursor, vscode, windsurf or codex if you use one of those instead, and paste the key when it asks.",
      "Ask for a single component in plain words, for example: build me a pricing table with three tiers and a monthly toggle. Read the code it writes before you keep it, the same as you would read anything a stranger handed you."
    ],
    command: "npx @21st-dev/cli@latest init --client claude",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "The catalogue is the real asset, not the generating. Check what licence a component carries before it ends up in something you charge for."
  },
  {
    num: "31",
    added: "2026-08-15",
    updated: "2026-08-15",
    name: "Web Design Guidelines",
    category: "Design",
    maker: "Vercel",
    tagline: "Reviews your interface against a published list of rules",
    blurb: "Point it at the screen you just built and it reads your code against Vercel's Web Interface Guidelines, then tells you what is wrong and the exact line it is on. It covers the things that are quietly easy to skip: keyboard access, focus states (the visible outline showing which button the keyboard is sitting on), colour contrast, and how forms behave when they fail.",
    repo: "https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines",
    repoLabel: "GITHUB REPO",
    needs: "An AI assistant that can read the files in your project, Node.js for the install, and a working internet connection each time it runs",
    cost: "Free",
    why: "Everyone means to check accessibility, whether the thing still works for a person moving by keyboard rather than mouse, or listening through a screen reader, the software that reads a page aloud. Almost nobody does check, because the checking is dull and the rules live somewhere else. This skill moves the rules to where the work is. It fetches Vercel's current Web Interface Guidelines, reads the files you name, and reports each problem as a file and a line number rather than as general advice you then have to locate. Two things to know. It reads code, so it catches missing focus states and unlabelled inputs but cannot tell you the page is ugly. And it downloads the rules fresh on every run, which keeps it current but means it needs a connection and can hand you a different answer next month.",
    when: "Run it when a screen is close to finished and before anyone else sees it, or on a page that has grown by accretion and has never been checked. It is at its most useful on forms, dialogs and anything with keyboard focus. Give it specific files rather than the whole project: a narrow review you act on beats a long list you skim.",
    how: [
      "Open the Terminal app, the window where you type commands, in your project folder and paste the line below to install the skill where your assistant will find it.",
      "Ask your assistant to review specific files, for example: review my UI in app/checkout for the web design guidelines. Naming the files matters, because pointed at everything it returns more than anyone reads.",
      "Work through what it reports and fix things yourself, or approve its fixes one at a time. Treat each finding as a claim to check rather than an order: the rules are general, your screen is particular, and occasionally you will have had a reason."
    ],
    command: "npx skills add vercel-labs/agent-skills --skill web-design-guidelines",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "The rules are sound and worth reading yourself once. It catches the mechanical failures, which is most of them, and none of the judgment ones."
  },
  {
    num: "32",
    added: "2026-08-15",
    updated: "2026-08-15",
    name: "Image to Code",
    category: "Design",
    maker: "Leon Lin",
    tagline: "Draws the page as a picture before writing any code",
    blurb: "Rather than writing code straight from your description, it generates the design as an image first, studies its own picture for spacing, type and colour, then writes the HTML and CSS, the code a web page is built from, to match it. Despite the name, you do not hand it a screenshot: it makes the picture itself.",
    repo: "https://github.com/Leonxlnx/taste-skill/tree/main/skills/image-to-code-skill",
    repoLabel: "GITHUB REPO",
    needs: "An assistant that can generate pictures, not only text. It was written for Codex, OpenAI's coding assistant. Node.js (free from nodejs.org) for the install",
    cost: "Free. The pictures come from your assistant, so they are drawn against whatever plan you already pay for there.",
    why: "An assistant writing a page from a sentence is composing blind: it holds no picture of the result, so it falls back on the arrangement it has written a thousand times. This skill inserts a step. It draws the section as an image, looks hard at what it drew, writes down the spacing, the type scale (the set of text sizes a design uses) and the colours it can see, and only then writes the code to reproduce it. Working from a picture is what stops the layout drifting into the usual stack of boxes. Be clear on the direction of travel: the name sounds like you supply an image, but it produces its own, so this is for making something new rather than copying a design you already have.",
    when: "Reach for it when the look actually matters and a plain description keeps giving you the same page: a front page, a hero section at the top of it, a portfolio, a marketing site. Check before you install, because this ships as one of the thirteen skills inside Taste Skill: if you already added that pack, you already have this one and the command below is wasted. It was written for Codex, and an assistant that cannot generate pictures cannot follow the first half of it.",
    how: [
      "Skip this step if you have already installed Taste Skill, since this skill came with it. Otherwise open the Terminal app, the window where you type commands, in your project folder and paste the line below. The --skill part fetches this one skill on its own rather than all thirteen.",
      "Ask for a section rather than a whole site, for example: design and build a hero section for a badminton club, images first. One section at a time keeps the drawing large enough to read and the code small enough to check.",
      "Look at the picture it generates before you accept the code. If the picture is wrong, the code will faithfully reproduce something wrong, and it is far cheaper to reject a drawing than to unpick a built page."
    ],
    command: "npx skills add Leonxlnx/taste-skill --skill image-to-code-skill",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "The image-first idea is the good part and it survives being borrowed: ask any assistant to show you the layout before it builds. The name misleads, so read the blurb twice."
  },
  {
    num: "33",
    added: "2026-08-15",
    updated: "2026-08-15",
    name: "Awesome DESIGN.md",
    category: "Design",
    maker: "VoltAgent",
    tagline: "Hands your agent a written design system to follow",
    blurb: "Seventy-three design systems taken from real websites, each written out as one plain file an AI can read: the colours, the type scale, the spacing, the components, what to do and what to avoid. Copy one file into your project and tell your assistant to work to it.",
    repo: "https://github.com/VoltAgent/awesome-design-md",
    repoLabel: "GITHUB REPO",
    needs: "Nothing beyond an AI assistant that can read the files in your project",
    cost: "Free. It carries the MIT licence, which means you may reuse and change the files, including at work, as long as the notice stays with them",
    why: "Telling an assistant to make something look considered gets you its idea of considered. Handing it a written specification gets you the specification. This is a collection of seventy-three such specifications, each one a single DESIGN.md file describing how a known site handles colour, type, spacing, depth (its use of shadow and layering) and components, with the do and do-not list spelled out. Each entry also ships two preview pages you can open in a browser to see the palette and the text sizes before choosing. Where this needs care: these describe other people's brands. Reading how Stripe, the payments company, handles spacing in order to learn from it is ordinary practice. Dressing your own product in Stripe's face is not, and the repository says plainly that it claims no ownership of any of these identities.",
    when: "Reach for it at the start of something new, when the look is undecided and a reference beats a blank page, or when an assistant keeps drifting off-style across a project and you want one written source to hold it steady. It is also a decent way to learn: reading three of these files side by side teaches more about design systems than most articles do. Treat a file as a starting point to adapt, not a costume to wear.",
    how: [
      "Open the Terminal app, the window where you type commands, and paste the line below to download the whole collection into a folder. It uses git, the tool that copies code folders from the internet, which comes with macOS and is free for Windows from git-scm.com. The collection is text and preview pages, so it is small.",
      "Browse the folders and open a preview.html in your browser to see a system before choosing it. Copy the DESIGN.md you want into the top level of your own project.",
      "Tell your assistant to follow it, for example: read DESIGN.md and rebuild the settings page to match it. Then edit that file as your own decisions accumulate, because from here it should describe your product rather than someone else's."
    ],
    command: "git clone https://github.com/VoltAgent/awesome-design-md.git",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "The most useful thing here is the shape of the file itself. Adapt one into a DESIGN.md of your own and your assistant stops guessing what your product looks like."
  },
  {
    num: "34",
    added: "2026-08-18",
    updated: "2026-08-18",
    name: "Screenshot to Code",
    category: "Design",
    maker: "abi",
    tagline: "Turns a screenshot of a page into working front-end code",
    blurb: "Drop in a screenshot, a mockup or even a screen recording, and it writes the HTML and CSS that reproduces it. You pick what it writes in: plain HTML with Tailwind, React, Vue or Bootstrap. Seventy-four thousand people have starred it, which for a repository is roughly a review score.",
    repo: "https://github.com/abi/screenshot-to-code",
    repoLabel: "GITHUB REPO",
    needs: "An API key from Google, OpenAI or Anthropic, and either Docker or Python and Node.js if you run it on your own machine",
    cost: "The code is free under the MIT licence, which lets you use and change it, including at work. You pay the model for every conversion, so a busy afternoon costs real money. There is also a hosted version at screenshottocode.com if you would rather not install anything.",
    why: "Copying a layout you can see is one of the slowest jobs in front-end work: you know exactly what you want, and the whole cost is typing it out. This takes the picture and writes the first version for you, then lets you point at what is wrong and ask again, so you correct rather than transcribe. It handles a screen recording too, which means a short interaction can come back as something that already moves. Where it needs care: what comes out is a faithful-looking copy, not your project. It does not know your design system, your components or your spacing scale, and it invents its own names for everything. Treat the output as a starting draft to fold into your own code, and remember that copying someone else's interface pixel for pixel is a decision about their design, not just yours.",
    when: "Reach for it when a layout exists as a picture and you need it as markup: a design handed over as a flat image, a competitor's page you are studying, a whiteboard sketch, or an old internal tool nobody has the source for. It is also a fast way to get past the empty file at the start of a page. It is the wrong tool once a design system exists, because then you want your own components rather than a fresh set of class names. The log's Image to Code entry solves the neighbouring problem: that one draws the picture first and then writes the code, where this one starts from a picture you already have.",
    how: [
      "The quickest look costs nothing to set up: open screenshottocode.com, the hosted version, and try one screenshot to see whether the output is close enough to be worth installing.",
      "To run it yourself, open the Terminal app, the window where you type commands, and paste the line below to download the project. It uses git, the tool that copies code folders from the internet, which comes with macOS and is free for Windows from git-scm.com.",
      "Follow the README to add your API key, the secret pass that lets the app use a paid model, and start it with Docker if you have it. Then feed it one screenshot of a page you already know well, so you can judge how faithful the result really is before trusting it on something new."
    ],
    command: "git clone https://github.com/abi/screenshot-to-code.git",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "Judge it on a layout you know by heart. It is very good at looking right at a glance, and the gap between looking right and being right is the whole review."
  },
  {
    num: "35",
    added: "2026-08-18",
    updated: "2026-08-18",
    name: "Remotion Skills",
    category: "Design",
    maker: "Remotion",
    tagline: "Teaches your assistant to build videos in code",
    blurb: "Remotion makes videos by writing React code instead of dragging clips on a timeline, which is how you get a video that rebuilds itself when the data changes. This is the official pack of twelve skills that teaches an assistant how to do it properly: how to animate, how to add captions, how to render, how to upgrade.",
    repo: "https://github.com/remotion-dev/remotion/tree/main/packages/skills",
    repoLabel: "GITHUB REPO",
    needs: "Node.js (free, from nodejs.org), an assistant that reads skills such as Claude Code, Codex or Cursor, and a Remotion project to point them at",
    cost: "The skills are free. Remotion itself is free for individuals and companies of up to three people; past that it needs a paid company licence, which starts at $25 per seat per month, so check where your team sits before you build on it.",
    why: "An assistant that has never been told how a framework wants to be used will still write code for it, confidently and wrongly, because it is predicting what such code usually looks like rather than following the framework's own rules. Video makes that worse: timing, frame rates and rendering all have exact answers that are easy to get plausibly wrong. This pack encodes those answers as skills, the saved instruction files an assistant loads when a job matches. There are twelve, split by job: creating a project, writing the animation markup, previewing in the Studio, rendering the file, captions, maps, interactivity, searching the documentation, upgrading, and building a product around it. Installing them is closer to handing over the manual than adding a feature.",
    when: "Reach for it when a video has to be made more than once: the same explainer with next month's numbers, a hundred personalised clips, subtitles burned in from a transcript, or a chart that animates from data you already have. If you are cutting one video by hand, an ordinary editor is faster and this is the wrong shape of work.",
    how: [
      "Open the Terminal app, the window where you type commands, move into the project you want the skills in, and paste the line below. It installs all twelve at once.",
      "Ask your assistant for something small and check it renders: a five-second title card that fades in. Rendering is what proves the timing is right, so do not judge it from the preview alone.",
      "From then on name the job in your request, for example add captions from this transcript, so the assistant loads the skill built for it rather than guessing from the general one."
    ],
    command: "npx skills add remotion-dev/skills",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "The licence is the thing to check first, not the code. Remotion is free for one to three people and priced per seat above that, and that decision is much cheaper before a project depends on it."
  },
  {
    num: "36",
    added: "2026-08-18",
    updated: "2026-08-18",
    name: "Claude Plugin Directory",
    category: "Workflow",
    maker: "Anthropic",
    tagline: "The official list of what you can bolt onto Claude Code",
    blurb: "Anthropic's own directory of Claude Code plugins, close to three hundred of them. Instead of hunting through other people's recommendations, you search one maintained list, read what each does, and install it with a single line. Several entries in this log live in here.",
    repo: "https://github.com/anthropics/claude-plugins-official",
    repoLabel: "GITHUB REPO",
    needs: "Claude Code",
    cost: "Free. The directory itself costs nothing; individual plugins listed in it may have their own costs.",
    why: "Finding a plugin usually means trusting a list some stranger assembled. This one is Anthropic's, and they manage what goes in it, which is the whole point: it is not a free-for-all. It currently holds close to three hundred plugins covering database access, code review, messaging, browser control and a great deal else, and each installs with one command. Several tools in this log are in here, including Superpowers, Ralph Loop and Claude Code Setup.",
    when: "When you want to add something to Claude Code and would rather start from a maintained list than a search engine. Worth a slow browse if you are new and do not yet know what is even possible.",
    how: [
      "Browse the directory on GitHub, or ask Claude Code to search it for you.",
      "Note the plugin name you want. Each one sits under plugins or external_plugins.",
      "Install it with claude plugin install, naming the plugin and then claude-plugins-official."
    ],
    command: null,
    commandTarget: null,
    note: "Nothing to install. It is the shelf, not the thing on it."
  },
  {
    num: "37",
    added: "2026-08-18",
    updated: "2026-08-18",
    name: "Telegram",
    category: "Connections",
    maker: "Anthropic",
    tagline: "Lets you message Claude Code from Telegram",
    blurb: "Pair a Telegram bot with your session and you can hand Claude Code work from your phone. It answers in the chat, and it only listens to people you have put on a list, so a message from a stranger goes nowhere.",
    repo: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/telegram",
    repoLabel: "GITHUB REPO",
    needs: "Claude Code, a Telegram account, and Bun (free, from bun.sh)",
    cost: "Free. Creating a Telegram bot costs nothing, and Claude Code runs on its own plan.",
    why: "Claude Code runs in a terminal on one machine, so ordinarily you have to be sitting at that machine. This connects a Telegram bot to your session. You message the bot, the message reaches Claude Code, and the answer comes back into the chat. It can reply, react and edit messages the way any other participant would. Access control comes built in: you pair the bot to yourself first, and there is a list of who is allowed to talk to it.",
    when: "Starting something off, or checking on it, while away from your desk. Also good for long jobs where you would rather the result came to you than sit watching a terminal for it.",
    how: [
      "Message BotFather on Telegram and send /newbot. It asks for a name and a handle, then hands you a token.",
      "Install the plugin, then run /telegram:configure with that token.",
      "Restart your session with the channel flag the setup describes. It needs Bun, a JavaScript runtime, installed first."
    ],
    command: "claude plugin install telegram@claude-plugins-official",
    commandTarget: "terminal",
    note: "The allowlist is the part worth reading about. A bot anyone can message is a bot anyone can spend your tokens with."
  },
  {
    num: "38",
    added: "2026-08-18",
    updated: "2026-08-18",
    name: "Discord",
    category: "Connections",
    maker: "Anthropic",
    tagline: "Lets you message Claude Code from Discord",
    blurb: "The same bridge as the Telegram one, for Discord instead. Make a bot, invite it to a server you are already in, and you can pass Claude Code work from a channel or a direct message, with a list controlling who may ask.",
    repo: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/discord",
    repoLabel: "GITHUB REPO",
    needs: "Claude Code, a Discord account with a server you can add a bot to, and Bun (free, from bun.sh)",
    cost: "Free. Creating a Discord bot costs nothing, and Claude Code runs on its own plan.",
    why: "Same idea as the Telegram bridge, on Discord instead. You create a bot in Discord's developer portal, invite it to a server you are already a member of, and it forwards what you send through to your Claude Code session, replying and reacting in the channel. One setting catches people out: the bot needs Message Content Intent switched on, or every message reaches it with the text stripped out and nothing appears to work.",
    when: "Teams already living in Discord, and anyone who would rather reach their assistant from a chat window than a terminal. Discord will not let you message a bot unless you share a server with it, so there is a server step even for private use.",
    how: [
      "Create an application and bot in Discord's developer portal, and switch on Message Content Intent.",
      "Reset the token to generate one, copy it, then invite the bot to a server you are in.",
      "Install the plugin and configure it with that token. It needs Bun, a JavaScript runtime, installed first."
    ],
    command: "claude plugin install discord@claude-plugins-official",
    commandTarget: "terminal",
    note: "Message Content Intent is the one that wastes an evening. Without it the bot sees your messages as empty."
  },
  {
    num: "39",
    added: "2026-08-18",
    updated: "2026-08-18",
    name: "Linear",
    category: "Connections",
    maker: "Linear",
    tagline: "Lets your assistant work with your Linear issues",
    blurb: "Linear is the issue tracker a lot of software teams run on. This connects your assistant to your workspace, so it can open issues, move them along, update a project and search the lot without you leaving what you were doing.",
    repo: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/linear",
    repoLabel: "GITHUB REPO",
    needs: "Claude Code and a Linear account",
    cost: "The plugin costs nothing. What you pay depends on your existing Linear plan rather than on this.",
    why: "Work that falls out of a coding session usually needs writing down somewhere, and that somewhere is normally a different window you have to go and find. This wires your assistant straight into Linear, where many software teams track their issues. It can create issues, change their status, manage projects and search across workspaces. The plugin itself is thin, a small piece of configuration pointing Claude Code at Linear's own server, which is where the work actually happens.",
    when: "Teams already on Linear. It earns its place right at the end of a working session, when there are three follow-ups you would otherwise mean to write up later and then not.",
    how: [
      "Install the plugin from the official marketplace.",
      "Sign in to Linear when it asks. The plugin holds nothing itself, it points at Linear's own server.",
      "Ask in plain words, along the lines of opening an issue for the thing you just found."
    ],
    command: "claude plugin install linear@claude-plugins-official",
    commandTarget: "terminal",
    note: "Made by Linear rather than by Anthropic, though it is listed in the official directory."
  },
  {
    num: "40",
    added: "2026-08-18",
    updated: "2026-08-18",
    name: "OKF Graph Wiki",
    category: "Knowledge",
    maker: "Vivian Balakrishnan",
    makerType: "person",
    tagline: "Turns AI-written notes into a graph it can search properly",
    blurb: "The LLM Wiki idea works until the pile gets big, then the assistant has to skim half of it to answer one question. This adds structure to each page and a small local index, so it can fetch the handful of pages that actually answer you.",
    repo: "https://gist.github.com/VivianBalakrishnan/83d1ea5f929d0ae51bca7fe25129b0d7",
    repoLabel: "READ THE SPEC",
    needs: "An AI coding assistant, Bun (free, from bun.sh), Ollama running on your own machine for the search part",
    cost: "Free (your AI assistant has its own plan)",
    why: "Keeping AI-written notes works well until there are a few hundred of them. At that point the assistant either re-reads too much to answer one question, or picks a page that looks right and misses the one that was. This spec answers both by writing the facts down as structured fields at the top of each page, saying who says so and how much to trust it, then compiling all of that into a small database that gets rebuilt from the notes whenever they change. Questions are answered from the index rather than by reading. It is a written specification rather than an app you install, and it ships with finished code you can copy, so treat it as a plan to hand your assistant.",
    when: "When a set of AI-maintained notes has grown past the point where the assistant can hold it all, and answers have started coming back plausible but wrong. Skip it while the notes are still small: the plain LLM Wiki approach is less work and enough.",
    how: [
      "Read the spec first. It is long and it is a build plan, not a product, so decide whether you want this before your assistant starts making files.",
      "Give your assistant the address below and ask it to set up the folder structure and the schema notes in a fresh folder, so nothing existing is touched.",
      "Feed it sources to read in, and have it rebuild the index after each batch. Ask questions of the notes and check what it pulled back before you trust the answer."
    ],
    command: "Set up an OKF graph wiki in this folder, following https://gist.github.com/VivianBalakrishnan/83d1ea5f929d0ae51bca7fe25129b0d7",
    commandTarget: "assistant",
    status: "Reviewed \u00b7 Not tested",
    note: "The honest version of the second-brain idea: it names what breaks at scale and says what to do about it, rather than promising the pile will sort itself out."
  },
  {
    num: "41",
    makerType: "org",
    added: "2026-08-19",
    updated: "2026-08-19",
    name: "Notion Plugin for Claude Code",
    category: "Connections",
    maker: "Notion",
    tagline: "Connects Claude Code to your Notion workspace",
    blurb: "Claude Code cannot read your Notion workspace on its own. This official plugin from Notion adds a secure connection, four saved instruction packs and ten slash commands for searching, writing and turning pages into tasks.",
    repo: "https://github.com/makenotion/claude-code-notion-plugin",
    repoLabel: "GITHUB REPO",
    needs: "Claude Code and a Notion account",
    cost: "The plugin is free. Claude Code and Notion have their own plans.",
    why: "Claude Code can work with files on your computer, but it cannot see the decisions, specifications and notes stored in Notion by itself. This official plugin from Notion combines its hosted Model Context Protocol (MCP) server, a connection that Notion runs so Claude Code can use the service, with four skills, saved instruction packs that teach Claude how to handle common Notion work, and ten slash commands. After you sign in, it can search and read your workspace, create and update pages, append notes and add database rows. It is made specifically for Claude Code rather than as a general Notion connection for every assistant.",
    when: "Use it when project specifications, meeting notes, research or tasks live in Notion and you want Claude Code to use or update them without copying between windows. Notion says the connection can work with content that your signed-in account can access, not only one selected page. Ask it to name the destination and proposed change before you let it write. Workspace owners can manage MCP client access under Settings, then Connections.",
    how: [
      "In Claude Code's prompt, the same place you normally type a request, paste the marketplace command below. This adds Notion's official plugin marketplace to the list Claude Code can install from.",
      "In that same prompt, type /plugin install notion-workspace-plugin@notion-plugin-marketplace to install the Notion workspace plugin.",
      "Close and reopen Claude Code so the connection starts correctly, follow the Notion sign-in in your browser, and try /Notion:search project brief with a title or phrase you recognise before asking it to make changes."
    ],
    command: "/plugin marketplace add makenotion/claude-code-notion-plugin",
    commandTarget: "claude",
    status: "Reviewed \u00b7 Not tested",
    note: "The useful part is the complete package: the secure connection, written working methods and repeatable commands arrive together."
  },
  {
    num: "42",
    makerType: "org",
    added: "2026-08-28",
    updated: "2026-08-28",
    name: "SkillSpector",
    category: "Coding",
    tagline: "Checks an AI skill before you install it",
    blurb: "An agent skill is a saved set of instructions that tells an AI assistant how to do a task. SkillSpector checks a repository, the online project folder holding the skill's files, as well as links, zip files and folders on your computer against 71 warning patterns, then gives a risk score from 0 to 100.",
    repo: "https://github.com/NVIDIA/skillspector",
    repoLabel: "GITHUB REPO",
    needs: "The uv Python package installer (free, from docs.astral.sh/uv), Python 3.12 or newer, and the skill's repository, or repo, its online project folder",
    cost: "The non-AI scan, called a static scan, is free. Optional AI analysis may send the skill text to the company or service running the AI, called the provider, and may use paid credits or your local Claude or Codex allowance.",
    why: "An agent skill is a saved set of instructions that tells an AI assistant how to do a task, and it may let that assistant use your files and tools. A repository, or repo, is the online project folder that holds the skill's files. Reading every line yourself is easy to skip and hard to do consistently. NVIDIA's SkillSpector checks for hidden instructions that try to override your request, called prompt injection, attempts to send private information elsewhere, called data exfiltration, excessive permissions, dangerous code and other risks. It then reports severity levels and a score, but its non-AI check, called a static scan, is only a useful gate, not proof that a skill is safe. Harmless items can be flagged by mistake, called false positives, so every finding still needs human review.",
    when: "Run it before installing or updating a skill from outside a catalogue you already trust, or when reviewing a folder of skills used by Claude Code, Codex or another AI assistant. It can scan a GitHub project address, a folder on your computer, a zip file or one SKILL.md file, the main instruction file inside a skill. The quick install requires Python 3.12 or newer and uv, a free Python package installer.",
    how: [
      "Install uv from docs.astral.sh/uv if you do not already have it, then paste the command below into the Terminal app. uv installs SkillSpector separately from your project.",
      "In the Terminal app, run this exact example: `skillspector scan https://github.com/NVIDIA/skillspector --no-llm`. It checks NVIDIA's own project without sending the skill text to an AI provider, the company or service running the model. It still sends declared dependency package names, their software ecosystem and exact versions when present to OSV.dev to look for known vulnerabilities; if OSV.dev is unavailable, it falls back to local data. Replace `https://github.com/NVIDIA/skillspector` with the GitHub address or other location of the skill you want to check.",
      "Read each finding and inspect the named file before deciding. Optional AI analysis can catch meaning that automated checks miss, but it sends the skill text to the AI provider and may use paid credits. A clean report lowers risk; it does not guarantee safety."
    ],
    command: "uv tool install git+https://github.com/NVIDIA/skillspector.git",
    commandTarget: "terminal",
    status: "Reviewed · Not tested",
    note: "The static scan is the sensible default. Turn on AI analysis only when the extra review is worth sending the skill text to another provider."
  },
  {
    num: "43",
    added: "2026-08-28",
    updated: "2026-08-28",
    name: "Maker School: AI Automation",
    category: "Workflow",
    maker: "Nick Saraev",
    makerType: "person",
    tagline: "Teaches you to build and sell AI automation",
    blurb: "A paid community built around landing a first AI automation client. Its page lists 218 videos and guides, more than 50 templates, daily coaching and a 90-day client-or-refund promise.",
    repo: "https://www.skool.com/makerschool/about",
    repoLabel: "PROJECT PAGE",
    needs: "A Skool account, time to follow a daily roadmap, and a real business problem to practise on",
    cost: "US$184 per month when checked on 28 August 2026",
    schemaPrice: "184",
    schemaType: "Course",
    why: "Learning Claude Code, Codex and n8n is one job; turning that knowledge into a service a business will pay for is another. Maker School combines technical lessons with proposals, lead generation, sales material, coaching and a day-by-day route towards a first client. The provider advertises a full refund if you do not get a paying client within 90 days. That promise depends on its terms, so confirm the eligibility rules and evidence required before paying.",
    when: "Use it when you want a structured path from building automations to finding and delivering work for a client, and you will use the coaching and community rather than only watch videos. It is a recurring paid membership, not a free tool. If you only need to learn one technical workflow, official documentation and a small practice project may be enough.",
    how: [
      "Open the project page and read the current curriculum, monthly price and written refund terms. Ask the provider to confirm the 90-day guarantee's eligibility and evidence requirements before you pay.",
      "Choose one real business process you can practise on safely, with test data rather than client information, and check that the roadmap covers both delivery and finding a buyer.",
      "Join only if the recurring cost and daily schedule fit. Treat templates as starting points, and test every automation before it touches a client's accounts or data."
    ],
    command: null,
    commandTarget: null,
    status: "Reviewed · Not tested",
    note: "This is a paid course and community, not a free software tool. The link carries no referral code."
  },
];

/* Bump this when you edit the log — it feeds the colophon status line.
   og-image.png carries no tool count, so adding an entry does not stale it. */
const LOG_UPDATED = "28.08.2026";
