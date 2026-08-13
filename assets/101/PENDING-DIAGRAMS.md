# Pending diagrams — five AI 101 entries shipped text-only

The OpenAI key had no credit and the codex CLI was absent when these five
entries (Web search, Cron, Webhooks, RAG, Second brain) were added on
2026-08-13, so they joined the eight existing diagram-less entries.
To finish them: generate each render in the sketchnote family (wobbly ink,
curved arrows, hand-lettered caps, the five linen hexes #F2ECE0 #E7DECB
#B6966F #1A1815 #B4512D, landscape 3:2, ~1500x1000), write the linen file
to assets/101/light/dg-<name>.png, recolor to assets/101/dg-<name>.png with
the mapping in recolor.py, then paste the matching figure block below back
into its entry's .entry-rail in ai-101.html (after the .analogy).

## Figure blocks, ready to paste

### dg-websearch

```html
      <figure>
        <img class="dg-img" src="assets/101/light/dg-websearch.png" width="1500" height="1000" loading="lazy" decoding="async"
             alt="A model drawn as a head inside a thought bubble full of old newspapers marked training data, with an arrow reaching out of the bubble to a fresh web page marked today, and a small tag on the answer reading source attached.">
        <figcaption class="dg-cap">Same model, two sources. Memory ends at training day; the arrow out of the bubble is what search adds.</figcaption>
      </figure>
```

### dg-cron

```html
      <figure>
        <img class="dg-img" src="assets/101/light/dg-cron.png" width="1500" height="1000" loading="lazy" decoding="async"
             alt="A wall calendar and a clock wired to a small bell. The wire runs from the clock to a task card marked run the job, with tick marks at the same hour across several calendar days showing it firing every day on the dot.">
        <figcaption class="dg-cap">Nothing clever, everything reliable. The clock reaches the set time and the job simply runs.</figcaption>
      </figure>
```

### dg-webhook

```html
      <figure>
        <img class="dg-img" src="assets/101/light/dg-webhook.png" width="1500" height="1000" loading="lazy" decoding="async"
             alt="Two panels. Left, a person walks to an empty porch again and again, each trip crossed out as wasted. Right, a courier presses a doorbell wired straight to the house, and the resident answers once, exactly when the parcel arrives.">
        <figcaption class="dg-cap">Polling versus being told. The doorbell side does no wasted trips and still reacts first.</figcaption>
      </figure>
```

### dg-rag

```html
      <figure>
        <img class="dg-img" src="assets/101/light/dg-rag.png" width="1500" height="1000" loading="lazy" decoding="async"
             alt="A question card travels toward a bookshelf, where a librarian figure pulls three pages out and clips them to the card. The card, now carrying the pages, arrives at the model, and the answer coming out has a page reference tag on it.">
        <figcaption class="dg-cap">The model never reads the whole shelf. It answers from the few pages fetched for this one question.</figcaption>
      </figure>
```

### dg-secondbrain

```html
      <figure>
        <img class="dg-img" src="assets/101/light/dg-secondbrain.png" width="1500" height="1000" loading="lazy" decoding="async"
             alt="Left, a tall pile of documents being re-read from the top for every question, with tired repeat arrows circling it. Right, a small notebook whose pages link to each other with curved lines, growing a new linked page as one more document is read once and filed.">
        <figcaption class="dg-cap">Left reads everything every time. Right read it once and wrote it down, and the notes keep linking up.</figcaption>
      </figure>
```

## dg-github (entry e-github, chapter 06 stack, after e-git)

Figure block to paste into the entry-rail after the analogy div:

```html
      <figure>
        <img class="dg-img" src="assets/101/light/dg-github.png" width="1500" height="1000" loading="lazy" decoding="async"
             alt="A large open folder drawn as a repository, with a front page marked README and a star stamp with a count beside it. A gold timeline of commit nodes runs beneath the folder. Arrows come in from a laptop pushing changes up, and go out to a stranger reading the README and to a small host machine watching the repo.">
        <figcaption class="dg-cap">One folder online: the README explains it, the stars vouch for it, and the host watches it.</figcaption>
      </figure>
```

Prompt: sketchnote style, wobbly ink outlines, curved arrows, hand-lettered caps, exactly the 5 hexes #F2ECE0 #E7DECB #B6966F #1A1815 #B4512D, ~1500x1000. Subject: a repository drawn as one big open folder with a README front page and a star-count stamp; a commit timeline underneath; a laptop pushing in from the left, a reader and a small deploy host drawing from it on the right.
