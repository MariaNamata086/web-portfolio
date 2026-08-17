# Decisions

Why this codebase is the way it is. Written for me, and for anyone who asks me
about it in an interview.

Each entry is a decision I made, the alternative I did not take, and what would
make me change my mind. If I cannot answer the third one, I did not really make
a decision.

---

## 1. No animation library

**Chose:** CSS transitions driven by IntersectionObserver, in a `Reveal` component.

**Instead of:** Framer Motion, which I have used before and know well.

**Why:** The whole motion system is four CSS classes and about twenty lines of
JavaScript. Framer Motion is roughly 40 KB gzipped. On a site whose argument is
that page weight matters, importing a library to fade things in would contradict
the argument in the first section a visitor scrolls past.

**Would change if:** I needed layout animations, shared element transitions
between routes, or gesture handling. Hand-rolling those is a bad trade.

---

## 2. Raw WebGL for the hero, not Three.js

**Chose:** About 40 lines of GLSL and 60 lines of setup.

**Instead of:** Three.js, which is roughly 150 KB.

**Why:** I need one full-screen fragment shader with no geometry, no camera, no
lights and no scene graph. Three.js exists to manage all of the things I do not
have. The shader is a single triangle covering the viewport.

**Would change if:** the hero ever needed real 3D objects, orbit controls, or
loaded models.

---

## 3. The shader is gated on hardware, not connection speed

**Chose:** skip on `prefers-reduced-motion`, `Save-Data`, `deviceMemory <= 2`,
`hardwareConcurrency <= 2`, or no WebGL context. On four cores or fewer it runs
at device pixel ratio 1 and 24fps instead of being switched off.

**Instead of:** what I had first, which also skipped on a 2G or 3G
`effectiveType`.

**Why:** the shader ships inside the JavaScript bundle whether it runs or not, so
it costs no extra bandwidth. Connection speed is the wrong proxy. What it
actually costs is GPU time and battery, which track hardware.

**How I found out:** the hero was blank on my own machine. My connection reports
3G, so my own guard was switching it off. The fix was to work out what the effect
actually costs rather than assuming slow network meant slow everything.

**Would change if:** profiling on a real low-end Android showed the reduced
quality mode still dropping frames.

---

## 4. No vector database for the chatbot

**Chose:** the whole corpus goes into the system prompt, assembled at request
time from `content/projects.ts` and `content/notes.ts`.

**Instead of:** embeddings, a vector store, and retrieval.

**Why:** the corpus is four projects, five skill rows, three post summaries and a
contact block. A few thousand tokens. Retrieval would add a database, an
embedding step and a sync problem, to select from a set small enough to send
whole.

**Bonus:** because the prompt is built from the same files the pages render, the
assistant cannot drift out of date. There is no second copy of the truth.

**Would change if:** the corpus passed roughly 30,000 tokens, which at current
rate is around thirty blog posts.

---

## 5. The assistant may never quote a price

**Chose:** the system prompt forbids any figure, range or day rate, and the
contact page explains the process instead. The project form has an optional
"budget you have in mind" field.

**Why:** a published number anchors every negotiation before it starts. Too low
and a well funded client pays me less than they were willing to. Too high and I
never hear from the small job that would have been worth taking. Asking for their
number instead means I get the information without giving up the position.

**Would change if:** I ever productise a fixed-scope offering, where a price is
the product.

---

## 6. Contact spam: honeypot and timing, no CAPTCHA

**Chose:** a hidden `website` field and a three second minimum, checked client side
before the form posts to formsubmit.co. Both show the normal success screen.

**Instead of:** reCAPTCHA or Turnstile.

**Why:** a CAPTCHA adds a third party script, a privacy question, and an
accessibility burden for real people, to stop bots that a honeypot stops for
free. Showing success rather than an error matters: an error teaches a bot to
retry with different input, a success teaches it nothing.

**Would change if:** real spam got through. Then Turnstile, which at least does
not require solving anything.

---

## 7. Design tokens in `@theme inline`, not `@theme`

**Chose:** `@theme inline` mapping `--color-clay: var(--clay)` and so on.

**Why:** `inline` keeps the utility referencing the variable, so `bg-clay`
compiles to `background-color: var(--clay)`. Without it Tailwind resolves the
value at build time and bakes in the hex, which would freeze every utility and
break both dark mode and the Playground.

**This is the single most load-bearing line in the CSS.** If someone removes
`inline` the site will still build and still look correct in light mode, and the
theme toggle will half work in a way that is hard to trace.

---

## 8. Posts are TSX modules, not MDX

**Chose:** one component per post in `content/note-bodies`, using the prose
components in `components/notes/Prose.tsx`.

**Instead of:** MDX, which the plan originally called for.

**Why:** MDX needs `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` and `@types/mdx`
plus loader configuration, to render three posts. The custom components a post
actually uses, the metric band and the pull quote, are React either way.

**Trade-off I accepted:** writing a post now means writing JSX rather than
markdown, which is more friction per post.

**Would change if:** I were writing weekly, or if anyone other than me needed to
add a post.

---

## 9. Content lives in `src/content`, never in components

**Why:** so a copy change never risks a layout change, and so the chatbot can
read the same source the pages render. It also means I can edit any sentence on
the site without opening a file that contains JSX.

---

## 10. `deviceSizes` capped at 2560

**Why:** the Next.js default reaches 3840. On the Cinnamon Holidays site I had
`sizes="100vw"` on a hero, which resolved to a 3840px image on every desktop
visit. The largest was 943 KB for something nobody could tell apart from a
1920px version.

**Related rule:** no source image smaller than the box it renders into.
Pixelation on large screens is a resolution problem, not a compression one. I
spent a while treating it as a format problem before I measured it.

---

## Things I know are missing

Being able to name these is worth more than pretending they are not there.

- **No tests.** The one I want most is Playwright with axe-core asserting zero
  accessibility violations per route, because accessibility is on my CV and that
  would make it checkable rather than claimed.
- **No CI.** `npm run check` exists but nothing enforces it.
- **Repeated Tailwind strings.** The section kicker is written out eight times.
  It wants a `Kicker` component. I know, it is on the list.
- **Hand-rolled validation** in both API routes rather than a schema library.
- **The rate limiter is per-instance and in memory**, so it resets on cold start.
  Acceptable at this traffic, not acceptable if the site ever gets busy.

---

## How this was built

I designed this with AI assistance and scaffolded the first version with it, then
debugged, measured and rewrote from there. The decisions above are mine and I can
defend each one. The bug in entry 3 is a good example of why the second half of
that sentence matters: the tool wrote a guard that was reasonable-sounding and
wrong, and it took looking at my own blank hero to catch it.
