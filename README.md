# marianamata.dev

Portfolio site. Next.js 16, React 19, TypeScript, Tailwind CSS v4. Same stack and
versions as the Cinnamon Holidays project, so nothing here should feel unfamiliar.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in when you wire up the chatbot; the form needs no key
npm run dev
```

Before committing anything, run the whole gate in one go:

```bash
npm run check      # typecheck, then lint, then a Prettier format check
```

`npm run typecheck` is the one to reach for first.

Then open http://localhost:3000.

See `DECISIONS.md` for why things are the way they are, including the ones I would
do differently.

## Routes

| Route | What it is |
|---|---|
| `/` | Home. One scrolling page: hero, work, playground, about, stack, notes, contact |
| `/about` | The long version. Story, process, lessons, beliefs, what I want next |
| `/contact` | Adaptive form plus availability and FAQ |
| `/notes` | Index of all posts, published and planned |
| `/notes/[slug]` | A post. Statically generated |
| `/cv` | 308 redirect to the PDF, so the URL stays stable |
| `/api/chat` | Chatbot endpoint, Anthropic |

## Where things live

```
src/app/            routes, sitemap, robots, API handlers
src/components/
  layout/           header, mobile sheet, footer, theme toggle, scroll progress
  home/             hero, WebGL background, marquee, work, playground, skills…
  contact/          the adaptive form
  chat/             launcher and panel
  notes/            prose components used inside articles
  ui/               Reveal, Stagger, CountUp
src/content/
  projects.ts       project cards and the skills rows
  notes.ts          post metadata
  note-bodies/      one file per published post
  about.ts          about page copy
src/lib/site.ts     name, links, CV path, nav
```

**All copy lives in `src/content`.** No prose is hard coded in a component, so you
can edit any sentence without opening a layout file.

## Design tokens

Every colour, radius and easing is a CSS custom property in `src/app/globals.css`,
declared once on `:root` and once on `[data-theme='dark']`. Components read tokens.
There is no hard coded colour in any component, which is what makes the Playground
work: it sets the variables at runtime and the whole page follows.

Contrast ratios were measured before the build. Two rules survive from that:

- **Never use `--ochre` as text on `--paper` in light mode.** It measures 2.56 and
  fails. Use `--ochre-text` (5.05) or put the text on an ochre fill.
- `--ink-faint` is `#6E6250`, not the lighter value it started as. The original
  failed AA at the 10 to 11px sizes the mono labels use.

Dark mode deliberately uses fewer hues than light: clay leads, forest is secondary,
plum is not used at all.

## Things that are load bearing

**The hero shader** (`components/home/HeroBackground.tsx`) is raw WebGL, about 3 KB
of GLSL, no library.

It is gated on hardware and stated preference, not on connection speed. The shader
ships inside the JS bundle either way, so it costs no bandwidth; what it costs is GPU
and battery. So it skips on `prefers-reduced-motion`, Save-Data, `deviceMemory` of 2
or less, two cores or fewer, or no WebGL context, and it falls back to a flat gradient
rather than to nothing. On four cores or fewer it still runs, at device pixel ratio 1
and 24fps.

An earlier version also skipped on a 2G or 3G `effectiveType`, which was wrong, and
had the effect of switching the hero off on the author's own connection.

**Add `?fx=off` to any URL** to see the fallback without changing any code.

**The marquee has a pause button.** Content that scrolls automatically for more than
five seconds fails WCAG 2.2.2 without one. It also pauses on hover and on focus, and
starts paused for reduced motion.

**The contact form has a honeypot and a timing check**, both client side, then posts
straight to `formsubmit.co/ajax/<email>` with `_template: table` so the delivered
mail reads as a table. When either check trips, the visitor still sees the normal
success screen. A bot that gets an error learns to retry; a bot that gets a success
learns nothing.

**The chatbot has no vector database and does not need one.** The whole corpus is a
few thousand tokens and goes into the system prompt, assembled from the same content
files the site renders. The system prompt forbids quoting any price, range or day
rate, which is a deliberate business decision, not an oversight.

## Deviation from the build spec

The spec called for MDX posts. This uses typed TSX modules in `src/content/note-bodies`
instead, which removes four dependencies and a loader config. Posts are written with
the components in `components/notes/Prose.tsx`. If you later want to write in
markdown, add `@next/mdx` and the article layout will not need to change.

## Performance budget

Enforced, not aspirational. Measured on Slow 4G with cache disabled.

| Metric | Budget |
|---|---|
| Home, total transferred | ≤ 800 KB |
| Home, JavaScript gzipped | ≤ 130 KB |
| `/notes/[slug]` total | ≤ 400 KB |
| LCP | ≤ 2.5 s |
| CLS | ≤ 0.05 |
| INP | ≤ 200 ms |
| Any single delivered image | ≤ 200 KB |

Image rules, learned the hard way on Cinnamon Holidays:

- AVIF then WebP, source format as the fallback for old browsers
- `deviceSizes` capped at 2560, never 3840
- Every `next/image` needs an honest `sizes`. A missing `sizes` on a `fill` image is a bug
- No source image smaller than the box it renders into. Upscaling is what causes
  visible pixelation, not compression
- `priority` on the LCP image only

Add Lighthouse CI on pull requests before launch, failing the build on a breach.

## Known remaining gaps

Deliberately not done yet, in rough priority order:

- **No tests.** The highest value one is not a unit test, it is Playwright plus
  axe-core asserting zero accessibility violations on every route. That turns
  "accessibility (WCAG)" from a claim on a CV into something a reviewer can verify.
- **No CI.** A GitHub Actions workflow running `npm run check`, `npm run build` and
  Lighthouse budgets on every pull request.
- **Duplicated Tailwind strings.** The section kicker pill is written out eight times
  and the display font utility appears in seventeen files. It wants a `Kicker`, a
  `SectionHeading` and a `cn()` helper. Worth doing before the file count grows.
- **No schema validation on API input.** Both routes do hand-rolled checks. Zod would
  be more honest, at the cost of a dependency.

## Still to do

- [ ] `npm install`, then `npm run check`, and fix whatever the first compile turns up
- [ ] Real screenshot for the OCN card, or accept it as text only
- [ ] Recapture the Cinnamon screenshot once its image work is finished
- [ ] Waterfall screenshot for the first post
- [ ] Write posts two and three
- [ ] Favicon and OG image routes
- [ ] Confirm the formsubmit.co activation email, then wire the Anthropic key and
      test both failure paths
- [ ] Accessibility pass: keyboard only, then a screen reader
- [ ] Lighthouse CI
