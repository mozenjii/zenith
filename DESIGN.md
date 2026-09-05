# DESIGN.md — Mohib Ahmad, personal record

The durable visual contract for this site. Written from the state of the product on
2026-09-05, at the point the site was restructured to carry a mathematics paper
alongside the engineering work.

## Design read

> For a recruiter scanning in thirty seconds, an engineer reading for depth, and a
> referee checking a proof — a dark, editorial, instrument-precise personal record
> whose hero is Mohib's own theorem, rendered as a rotating generalized Petersen
> graph. Medium-high density. Restrained, purposeful motion.

**Direction mode: editorial.** One mode, not stacked.

### Why the direction changed

The previous system was "Neo-Graphic": neo-brutalist, dark, with rotated stickers,
2px black borders and 6px hard offsets. It was internally consistent and carefully
built. It is no longer the right fit, for one reason:

The site now has to carry a pure-mathematics manuscript on zero forcing and maximum
nullity. Rotated stickers and hard drop-shadows actively fight an eighth-degree
reciprocal polynomial. A referee arriving from a submission does not read a sticker
as confidence; they read it as noise.

So the *character* is kept — dark, high contrast, monospace-labelled, technical — and
the *mannerisms* are dropped. What replaces them is typographic structure: a real
type scale, rules instead of borders, and hairlines instead of offsets. The result
still reads as an engineer's site, and now also holds a proof.

**Kept from the old system:** the charcoal surface ladder, the red/yellow accents, the
monospace label role, `SignalField`'s canvas host, and the project data doctrine
(every claim traces to an artifact).

**Dropped:** `rotate-*` stickers, `box-shadow: 6px 6px 0`, the 2px black border on
every surface, the "Bay Area signal map" metaphor, and the persona-mode switcher.
The map metaphor was decoration that had to be explained; the work itself is the
better organising principle.

## Tokens

Defined in `app/theme.css`, in two themes. `app/globals.css` holds type, surfaces,
controls and motion, all of which reference tokens and are therefore theme-agnostic.

**Dark is declared on bare `:root`, and `prefers-color-scheme` is never consulted.**
Dark is the brand choice, not a response to an OS setting: a reader whose system is
light still gets the dark site first. Light applies only under an explicit
`[data-theme="light"]`, which the toggle sets and `localStorage` remembers.

Two rules that cannot be broken:

1. **Every color is defined in both blocks.** A token that exists in only one theme
   ships as invisible text. This is also why a hardcoded `rgba()` anywhere in a
   component is a bug — see `.portrait-wash`, which was exactly that.
2. **Never `#fff` on `#000`.** Maximum-contrast pairs are where halation is worst.
   The site pairs `#fffaf3` with `#0a0a0a`, and `#14120f` with `#faf8f4`.

**Why light mode exists.** On a dark page the pupil dilates, depth of field drops,
and thin light strokes smear — halation, worst for astigmatic readers. The portfolio
is scanned in bursts and dark suits it. `/research` is the one surface anyone reads
end to end, and that reader should get the choice.

### Surfaces

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0a0a0a` | Page ground |
| `--surface` | `#111113` | Header, footer, alternating sections |
| `--panel` | `#16171a` | Cards, panels |
| `--panel-high` | `#1e2024` | Raised panel, input wells |
| `--line` | `#26282d` | Hairline rules and borders |
| `--line-bright` | `#3a3d44` | Hover/active rules |

`--background` and `--paper` are duplicated as literal hex for the canvas
scenes, which read tokens back with `getComputedStyle()` and cannot parse a
`var()` reference. Keep them in step with `--bg` and `--text` by hand.

### Text

| Token | Value | Contrast on `--bg` | Use |
| --- | --- | --- | --- |
| `--text` | `#fffaf3` | 18.9:1 | Body and headings |
| `--text-dim` | `#cfc7bd` | 12.1:1 | Secondary prose |
| `--text-mute` | `#a09a92` | 7.0:1 | Labels ≥12px, metadata |

`--text-mute` is the floor. Anything below 5:1 does not ship, and `--text-mute` is
never used under 12px.

### Accents — the palette is the theorem

There are exactly four accents, because the paper proves
`M(P(n,3)) = Z(P(n,3)) = 8` on exactly four divisibility families. Each color means
one modulus and nothing else, site-wide.

| Modulus | Token | Dark | Light | Why this family is different |
| --- | --- | --- | --- | --- |
| 10 | `--red` | `#ff4938` | `#c62a18` | The smallest certificate, and red was already the identity |
| 24 | `--yellow` | `#ffcf4a` | `#8a6100` | Three cyclotomic factors, not two |
| 28 | `--cyan` | `#64d8ff` | `#0b6079` | Algebraic, not rational — the only family with no factorization |
| 42 | `--violet` | `#a78bfa` | `#5b3fd6` | Two distinct certificates, Φ₃·Φ₁₄ and Φ₆·Φ₇ |

The mapping lives in `modulusColors` in `data/research.ts`, and the legend is the
"four families" section of `/research` — inside the mathematics, because that is
the only place it means anything.

**Do not add a fifth accent, and do not use one of these four for anything that is
not its modulus.** An accent chosen because a section looked flat is a bug. This is
the whole reason the system is uncopyable: it is not a palette, it is a result.

The light values are not the dark values dimmed. Yellow and cyan at dark-theme
brightness measure under 2:1 on paper, so each is darkened until it clears 4.5:1
while keeping its identity. Both themes are audited; see **Verification**.

**Red is the primary action color as well as modulus 10.** That double duty is
deliberate — 10 is the first and smallest certificate — and it is what keeps red on
every screen:

- the surname in the hero `<h1>`, the largest area of color on the site
- a `.mark` rule above every section title
- the active navigation item, the primary button, and link hover
- the home and `/contact` signature marks
- the inner chords of the P(n,3) instrument while it is showing n ≡ 0 (mod 10)

**Area versus frequency.** Increase how often an accent recurs, not how much surface
it covers. These hues are saturated, and large fills on near-black vibrate and hurt
reading. Accents as ink, rules and small fills; never as a page-sized background.
Never accent text on an accent fill — use `--on-accent`, which flips per theme.

### The signature mark

Every page header carries the unit circle with the L-th roots of unity as radial
ticks and that page's certificate roots marked in that page's color
(`components/visual/RootsSignature.tsx`). It is the recurrence that makes the
identity an identity rather than one clever hero.

- **The marked positions are computed, never drawn by eye.** The roots of Φ_d are the
  primitive d-th roots of unity, so `components/visual/cyclotomic.ts` computes them.
  An earlier canvas version marked every root where `k % round(n/8) === 0`, which is
  an evenly spaced sample and not a certificate — at n = 10 it marked all ten.
- **Modulus 28 marks nothing, and that is correct.** Its certificate is algebraic, so
  there are no primitive-root positions to mark. This falls out of 28 having no row
  in `rationalCertificates`; it is not special-cased on the number.
- **Marked roots are filled nodes, unmarked ones are ticks.** A ring of small filled
  circles is the generated-UI status-dot signature. Ticks read as a mathematical
  scale. Nothing pulses, ever.
- Page assignment is `pageModulus`: home 10, work 24, about 28, research 42, contact
  10. Server-rendered SVG with CSS-only motion — a canvas in five headers would mean
  five more rAF loops and a hydration boundary for something that never takes input.

### Type

- **Display** — `Instrument Serif`. Headings only, ≥28px. Carries the editorial
  register and gives the mathematics somewhere to sit.
- **Body** — `Geist`. Prose, UI.
- **Mono** — `Geist Mono`. Labels, metrics, code, and all mathematical notation
  rendered as text.

All three are drawn from the target lists in the `minimalist-ui` skill, which
also rules out Inter, Roboto and Open Sans by name. Geist and Geist Mono are
one family, so numerals align between a label and the metric beneath it. Do
not substitute a face that is not on those lists.

Scale: 12 / 14 / 16 / 18 / 21 / 28 / 38 / 52 / 72 / 96. Headings use
`text-wrap: balance`, prose uses `text-wrap: pretty`.

Mathematical notation in prose is set in mono inside `<code>`, never italic body
text. `M(P(n,3)) = Z(P(n,3)) = 8` must survive being copied out of the page.

### Spacing and shape

4px base. Section rhythm is 96px mobile / 144px desktop.

- Radius: `2px` on controls, `4px` on panels, `0` on full-bleed rules. No pills.
- Depth comes from the surface ladder and hairlines. **No blurs, no drop shadows.**
- Borders are `1px solid var(--line)`. The old 2px black border is gone.

### Focus

`2px solid var(--red)` at `2px` offset, on every interactive element, never
removed. Focus is visible on all six surface levels.

## Motion

Motion level: **restrained**. It orients, confirms, or explains. It does not
decorate.

- Entry animation is CSS, not JS. A Framer `initial` prop renders the hero at
  opacity 0 in the server HTML and leaves it invisible until hydration — bad for
  LCP and broken without JS. This is a hard rule, learned the hard way.
- Scroll reveals use `animation-timeline: view()` behind `@supports`, so browsers
  that cannot drive it show content at full opacity instead of hiding it. Never
  an IntersectionObserver reveal that leaves content at `opacity: 0` when its
  script fails.
- `prefers-reduced-motion: reduce` collapses every animation to a snap and renders
  one static canvas frame.

### The hero instrument

The home hero renders **P(n,3)**, the generalized Petersen graph the paper is
about, in real 3D, beside the unit circle carrying the eight roots of the
certificate polynomial.

This is the one piece of expensive motion on the site, and it earns its place by
being *the content*: it is the actual object of the theorem, with the actual
certificate moduli cycling through it — 10, 24, 28 and 42, the four
divisibility families the paper actually covers. (10, 24, 40 and 42 are the
*rational* moduli, which is a different set; 28 is covered but not rational,
and 40 is rational but not a covered family. Do not conflate them.)

**The instrument teaches the palette.** Its inner step-3 chords take the current
modulus's color, so one full cycle runs red → yellow → cyan → violet and a reader
who never scrolls to `/research` has still been shown what the four colors mean.
The outer cycle and the spokes stay neutral, because they are identical at every n
and coloring them would claim otherwise.

Its unit circle marks the same computed root positions as the flat signature mark —
literally the same function, from `cyclotomic.ts`. The two can never disagree.

Rules it must obey:

- **No 3D library.** Points are rotated with a hand-rolled matrix and projected to
  canvas 2D. three.js would add ~150KB gzipped to draw two rings and a circle.
  Budget: under 5KB for the scene.
- Runs inside the existing `SignalField` host, so it inherits: pause when
  offscreen, pause when the tab is hidden, DPR capped at 2, resize via
  `ResizeObserver`, palette read from CSS tokens, and one static frame under
  reduced motion.
- The host watches `data-theme` with a `MutationObserver` and re-reads the palette,
  so the canvas follows the toggle. Canvas colors come from `--background` and
  `--paper`, which are **literal hex duplicates** of `--bg` and `--text`: the scenes
  hand the string to a parser expecting `#rrggbb`, and a `var()` reference parses to
  `NaN`, producing `rgba(NaN,NaN,NaN,a)` — an invalid color that fails silently.
- Target 60fps at 1440×900; degrade by vertex count, not frame rate.
- `aria-hidden`, `pointer-events: none`. It renders no information that is not
  also in text.

## Navigation and cognitive load

The single loudest complaint about the previous build was that it was hard to
navigate: too much on screen, and real effort needed to locate the important
thing. That is a design defect, not a taste difference, and these rules exist
to fix it. They override any visual preference.

### What was actually causing it

Named plainly, so it is not reintroduced:

1. **Four layers of heading furniture per section** — an index number, an
   eyebrow, a title, and a standfirst, stacked before any content. Three of the
   four carried no information.
2. **Metric tiles interleaved into the project grid**, so the eye could not tell
   a project from an ornament, and the grid had no scannable rhythm.
3. **A metaphor that had to be decoded.** "Signal map", "Bay nodes", districts —
   the reader had to learn a vocabulary before they could read a project.
4. **Rotated stickers and hard shadows** competing with real content for
   attention, at the same visual weight.
5. **Five nav items plus a persona switcher**, none of which was obviously the
   main path.

### The rules

- **One primary action per screen.** Everything else is visibly secondary. If
  two things look equally important, neither is.
- **Hick's law on the nav.** Four destinations, maximum, plus one call to
  action. The current count is four: Work, Research, About, Contact.
- **One heading level per section, not four.** A section gets a title and, only
  where it genuinely helps, one line of context. Index numbers and eyebrows are
  gone.
- **Chunk to five.** No unbroken list longer than five items without a
  subheading or a rule to group it. Long lists are collapsed behind a summary.
- **Progressive disclosure.** The card carries the claim; the case study carries
  the evidence. Never both in full, in the same place.
- **Uniform cards.** Every card of a given type has the same shape, the same
  slots, and the same number of metrics. A reader learns the pattern once.
- **Recognition, not recall.** Labels say where they go. No invented vocabulary
  a reader has to hold in their head.
- **Location is always answerable.** A skip link, one `<h1>` per page, real
  landmarks, and an on-this-page rail on any page longer than three screens.
- **Colour is a code, not decoration.** Three accents, each with one fixed
  meaning. An accent used to liven up a flat area is a bug.
- **Empty space is load-bearing.** It is what separates groups. Filling it is
  what created the problem.

### How it gets checked

Not by opinion. Before a page ships:

- Name the one thing the page is for. It must be visible without scrolling.
- Count what competes with it at the same visual weight. The answer must be zero.
- Count nav destinations. Four or fewer.
- Count heading-furniture lines above the first real content in a section. One,
  or two where context genuinely helps.
- Tab through the page. The order must match the reading order, with no traps.
- Read only the headings, top to bottom. That alone should say what the page
  contains.

## Content doctrine

This is the part of the contract most likely to be violated by a future edit, and
the part that matters most. The site's whole value is that it does not overclaim.

1. **Every claim links to an artifact.** A metric with no `evidence` field is not
   a metric.
2. **Never claim a venue, peer review, citation, or acceptance that does not
   exist.** The paper is a *preprint*, prepared for submission and not yet posted
   or accepted. It is labelled that way everywhere, without exception. The status
   field is `preprint`; the day it is accepted somewhere, that changes — not
   before.
3. **Prefer the honest smaller number.** RuleWeaver's own README says its
   OpenFisca export is "a structural claim" because nobody has run the generated
   package under OpenFisca. The site says the same. That sentence is worth more
   to a reader than a rounded-up feature list.
4. **Record what is not built.** Each project carries its own limitations. A
   project page with no `limits` is incomplete, not finished.
5. **Sources disagree; pick one and say why.** The KAN and Physics-Computing
   sessions are credited to GDG, not MLSA, because that is where the detailed
   record sits. Resolved once, here, so the site does not contradict itself.

## Verification

Before any UI change is called complete:

- Real browser, at 390 / 768 / 1440 widths.
- **Both themes, on all five routes.** A light theme that is wired but never
  rendered is not a light theme. Contrast is audited programmatically rather than
  by eye — walk every text node, resolve its first opaque ancestor background, and
  assert 4.5:1 (3:1 for large text). Current state: zero failures in either theme.
- Keyboard traversal end to end; focus visible at every stop.
- Reduced motion on: no animation, canvas static, all content present.
- JS disabled: hero text, portrait, signature marks and all copy still render.
- `npm run typecheck` and `npm run lint` clean.

Two things about verifying *this* project specifically:

- A tool that reads HTML without executing JavaScript will report this
  client-rendered page as broken when it is not. Check in a browser that runs the
  script.
- The canvas instruments cannot be checked by screenshot — the host pauses them in a
  background tab, so a hidden tab captures a frozen frame. Front the tab, then read
  the canvas back with `getImageData` and assert on the pixels. That is how the
  chord-color cycle was confirmed to follow the modulus.
