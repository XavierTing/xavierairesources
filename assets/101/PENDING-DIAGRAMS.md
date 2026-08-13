# Diagram queue — AI 101

## Status (2026-08-13)

**All 56 entries now carry a diagram.** The 14 that shipped text-only were
generated, quantised, recoloured and pasted in on 2026-08-13. Nothing is
pending; what remains below is the redraw queue for art-level flaws in older
diagrams.

## How these are made

Generation runs through the **Codex CLI on a ChatGPT subscription**, not the
OpenAI REST API. This matters: the API key on this machine has no credit
(`credit_balance_exhausted`), and a Codex token is scoped to coding sessions
so `/v1/images/generations` returns 401 `Missing scopes: api.model.request`.
Codex nevertheless carries its own `image_gen__imagegen` tool, which draws on
the subscription and needs no API credit at all.

```sh
npm install -g @openai/codex && codex login       # once
python3 assets/101/generate-diagrams.py /tmp/dg/raw --print dg-loops   # see the prompt
# drive codex exec per slug with that prompt (see the loop in the commit message),
# then:
python3 assets/101/make-diagram.py /tmp/dg/raw/*.png /tmp/dg/staged
python3 assets/101/recolor.py /tmp/dg/staged/*.png     # explicit paths, never bare
python3 assets/101/verify-diagrams.py                  # must exit 0
```

`generate-diagrams.py` still holds a working OpenAI REST path (`--preflight`
checks credit first) for the day the API account is funded. Either route feeds
the same `make-diagram.py`.

### Three prompt rules learned the hard way

Every first-pass reject on 2026-08-13 came from one of these, and all three are
now in the shared STYLE block or the subjects:

1. **Pin each word to its object.** A word offered in the whitelist without a
   home gets applied everywhere it plausibly fits: "FULL" landed on all sixty
   sticky notes, "PICTURE" on two panels, "SOURCE" on the wrong object. Say
   "the word SOURCE must be on the tag attached to the answer sheet, never on a
   newspaper inside the bubble", and state the total count of words.
2. **Ask for a 3:2 drawn area, not a direction.** "Spread across the width"
   produced a 1500x475 ribbon; the previous "fill the frame" produced a
   1500x1083 block. Name the target ratio and say the pipeline crops to the
   drawing's bounding box, so the model understands why.
3. **Ember is line work only.** Never a filled shape or a label background. One
   ember-filled label pushed a diagram to 1.22% ember; the family runs 0.15% to
   1.24% but always as thin strokes and small marks.

### Do not run recolor.py or optimise.py bare

`xaviers-ai-101/art/` still holds **13 superseded flat-poster `dg-*.png`** from
the previous art era (4 colours, no terracotta), and that directory is
`recolor.py`'s bulk source. A bare run recolours those and copies them over the
shipped diagrams in **both** `assets/101/` and `assets/101/light/`, silently
reverting 13 entries. `recolor.py` now refuses a bare run for exactly this
reason; pass explicit paths. `optimise.py` belongs to that dead era too and its
4-colour diagram palette is wrong for this set: `make-diagram.py` supersedes it.

---

## Redraw queue (added 2026-08-13, from the three-persona review)

Ten existing diagrams have art-level flaws that captions/alt text now
compensate for; redraw these in the same family and the caption patches can be
simplified:

- dg-hitl — row label UNDOABLE reads as "cannot be done"; relabel REVERSIBLE
- dg-git — flag says JUMP BACK but the arc's arrowhead lands on a LATER node;
  reverse it, and draw the small branch the prose describes
- dg-database — funnel shows three bars in, three out; draw many in, few out
  so the narrowing is visible
- dg-llm — the dial reads as a clock; draw five small candidate-word marks
  on its face so "picks one of several" is visible
- dg-frontback — REQUEST/RESPONSE arcs visually bypass the backend; route
  them through the middle box
- dg-tiers — first box "ROUTINE?" collides with the taught word Routines;
  relabel "ORDINARY JOB?"
- dg-promptinjection — add a visible stop/cross where the smuggled
  instruction meets the gate
- dg-fresheyes — the two figures read as humans; draw them as two agent
  sessions in the style of dg-subagent
- dg-generative — the three sorting containers read as rubbish bins; label
  them as trays/bins
- dg-planmode — give the top path visibly more loop-back arrows than the
  bottom so the "shorter path" claim is checkable

Add a subject for each to `assets/101/diagram-prompts.json` and run the same
pipeline. Replacing art needs no HTML change beyond the width/height attributes
if the new render's dimensions differ, which `verify-diagrams.py` will catch.
