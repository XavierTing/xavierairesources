"""Generate the missing AI 101 sketchnote diagrams.

Reads subjects from diagram-prompts.json, composes each with the constant
STYLE block below, and writes raw renders to an output directory. It touches
nothing in the repo: the raw PNGs go wherever you point it, and turning one
into a shippable master is make-diagram.py's job, then recolor.py's.

    export OPENAI_API_KEY=...
    python3 assets/101/generate-diagrams.py <outdir>              # all pending
    python3 assets/101/generate-diagrams.py <outdir> dg-loops     # named only
    python3 assets/101/generate-diagrams.py <outdir> --preflight  # credit check

Then:
    python3 assets/101/make-diagram.py <outdir>/dg-loops.png staged/
    python3 assets/101/recolor.py staged/dg-loops.png
    python3 assets/101/verify-diagrams.py

STYLE is one string shared by every diagram and that is the point. The 42
diagrams already shipped read as one family because they were drawn to one
description; the way to make 14 more join them is to vary only the subject.
Do not tune the style per image.

The word whitelist in each subject is not decoration. Generated hand
lettering is the top failure mode of this style: models will happily write
CONTETX or invent extra labels. Naming the only permitted words, and keeping
them to five short caps or fewer, is what makes a render usable first time.
"""
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
PROMPTS = HERE / "diagram-prompts.json"
ENDPOINT = "https://api.openai.com/v1/images/generations"

MODEL = "gpt-image-1.5"
SIZE = "1536x1024"      # 3:2 landscape, matching the shipped set
QUALITY = "high"        # lettering has to survive the downscale to 1500px

STYLE = """A hand-drawn sketchnote diagram, friendly and loose, like a whiteboard drawing from a course slide.

STYLE, follow exactly:
- Wobbly hand-drawn ink outlines with slightly uneven fineliner line weight.
- Curved hand-drawn arrows with simple open arrowheads.
- All lettering is short hand-lettered CAPITALS, imperfect but perfectly legible and spelled exactly as given.
- Completely flat colour. NO gradients, NO shadows, NO 3D, NO photorealism, NO halftone, NO texture.
- EXACTLY five colours and nothing else: linen #F2ECE0 as the entire background, sand #E7DECB for soft fill shapes, gold #B6966F for main fills, near-black ink #1A1815 for every line and every letter, ember #B4512D used once as a single small accent.
- Ember appears ONLY as thin line work or a tiny mark: one arrow, one circled ring, one small cross. NEVER as a filled shape, NEVER as the background of a label or box, and never behind lettering. Filled panels are gold or sand, never ember.
- Landscape 3:2. A generous even linen margin on all four sides; nothing touches or bleeds off any edge.
- The drawn area itself must be about 3 units wide to 2 units tall, filling the frame in BOTH directions. Use the full width, but also use the full height: no thin horizontal ribbon of elements across the middle, and no tall square cluster in the centre. (The pipeline crops to the drawing's bounding box and expects that 3:2 shape, so a drawing that fills only one axis comes out the wrong proportion.)
- No signature, no watermark, no border frame, no title text."""


def compose(subject: str, words: list) -> str:
    allowed = ", ".join(words)
    return (f"{STYLE}\n\nSUBJECT: {subject}\n\n"
            f"The ONLY words anywhere in the image are: {allowed}. "
            f"Write no other text of any kind.")


def call(prompt: str, key: str, model=MODEL, size=SIZE, quality=QUALITY) -> bytes:
    body = json.dumps({"model": model, "prompt": prompt, "size": size,
                       "quality": quality, "n": 1}).encode()
    req = urllib.request.Request(ENDPOINT, data=body, headers={
        "Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        item = json.load(r)["data"][0]
    return base64.b64decode(item["b64_json"])


def explain(e: urllib.error.HTTPError) -> str:
    try:
        err = json.loads(e.read().decode()).get("error", {})
    except Exception:
        return f"HTTP {e.code}"
    code = err.get("code") or err.get("type") or ""
    msg = err.get("message", "")
    if code in ("credit_balance_exhausted", "insufficient_quota"):
        # The exact state this repo was in on 2026-08-13. Say so plainly rather
        # than letting a 429 read as rate limiting, which it is not.
        return ("no API credit. This is a billing state, not a rate limit, and "
                "no amount of waiting or retrying clears it. Add credit at "
                "platform.openai.com/settings/organization/billing, then rerun.")
    return f"HTTP {e.code} {code}: {msg[:200]}"


def main():
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        sys.exit("OPENAI_API_KEY is not set")
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        sys.exit("usage: generate-diagrams.py <outdir> [dg-slug ...] [--preflight]")
    outdir, wanted = Path(args[0]), set(args[1:])
    spec = json.loads(PROMPTS.read_text())["diagrams"]

    if "--print" in sys.argv:
        # For generating by hand in the ChatGPT app instead of over the API.
        # A ChatGPT subscription includes image generation in the app, but its
        # Codex token is scoped to coding only (api.model.request is missing),
        # so the app is the only way a subscription can draw these.
        for slug, d in sorted(spec.items()):
            if wanted and slug not in wanted:
                continue
            print(f"\n{'=' * 70}\n{slug}   -> save the download as {slug}.png\n{'=' * 70}")
            print(compose(d["subject"], d["words"]))
        print(f"\n{'=' * 70}\nAsk for a WIDE / landscape image each time. A square render "
              f"fails\nthe aspect check in verify-diagrams.py.\n{'=' * 70}")
        return

    if "--preflight" in sys.argv:
        # One cheap render. A 200 from /v1/models proves the key authenticates,
        # not that the account can pay, and those are different failures.
        try:
            call("a single small hand-drawn circle on a flat beige background",
                 key, model="gpt-image-1-mini", size="1024x1024", quality="low")
            print("preflight OK: credit available")
            return
        except urllib.error.HTTPError as e:
            sys.exit(f"preflight FAILED: {explain(e)}")

    todo = {k: v for k, v in spec.items() if not wanted or k in wanted}
    if wanted - set(spec):
        sys.exit(f"unknown slugs: {sorted(wanted - set(spec))}")
    outdir.mkdir(parents=True, exist_ok=True)
    done, failed = [], []
    for i, (slug, d) in enumerate(sorted(todo.items()), 1):
        out = outdir / f"{slug}.png"
        if out.exists():
            print(f"[{i}/{len(todo)}] {slug:18} already rendered, skipping")
            done.append(slug)
            continue
        t = time.time()
        try:
            out.write_bytes(call(compose(d["subject"], d["words"]), key))
            print(f"[{i}/{len(todo)}] {slug:18} {out.stat().st_size // 1024:>4} KB  {time.time()-t:.0f}s")
            done.append(slug)
        except urllib.error.HTTPError as e:
            why = explain(e)
            print(f"[{i}/{len(todo)}] {slug:18} FAILED: {why}")
            failed.append(slug)
            if "no API credit" in why:
                # Every following call fails the same way; stop rather than
                # burn through 13 more identical errors.
                print(f"\nstopping: {len(done)} rendered, {len(todo)-len(done)} not attempted")
                break
    print(f"\nrendered {len(done)}/{len(todo)} into {outdir}")
    if failed:
        print("failed: " + ", ".join(failed))
        sys.exit(1)


main()
