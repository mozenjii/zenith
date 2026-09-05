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

**Kept from the old system:** the charcoal surface ladder, the three accents, the
monospace label role, `SignalField`'s canvas host, and the project data doctrine
(every claim traces to an artifact).

**Dropped:** `rotate-*` stickers, `box-shadow: 6px 6px 0`, the 2px black border on
every surface, the "Bay Area signal map" metaphor, and the persona-mode switcher.
The map metaphor was decoration that had to be explained; the work itself is the
better organising principle.

## Tokens

Defined in `app/globals.css` on `:root`. Never redefine a colour inside a media
query — this site is dark-only by deliberate choice, and the palette is committed.

### Surfaces

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#08090a` | Page ground |
| `--surface` | `#0e1011` | Header, footer, alternating sections |
| `--panel` | `#14171a` | Cards, panels |
| `--panel-high` | `#1c2024` | Raised panel, input wells |
| `--line` | `#252a30` | Hairline rules and borders |
| `--line-bright` | `#39414a` | Hover/active rules |

### Text

| Token | Value | Contrast on `--bg` | Use |
| --- | --- | --- | --- |
| `--text` | `#f4f1ec` | 16.4:1 | Body and headings |
| `--text-dim` | `#b8b2a9` | 8.9:1 | Secondary prose |
| `--text-mute` | `#8a857e` | 5.2:1 | Labels ≥12px, metadata |

`--text-mute` is the floor. Anything below 5:1 does not ship, and `--text-mute` is
never used under 12px.

### Accents

| Token | Value | Meaning |
| --- | --- | --- |
| `--accent` | `#5ad0c4` | Primary action, links, live/verified state |
| `--warm` | `#e8a33d` | Research and mathematics |
| `--alert` | `#e5533d` | Emphasis, current position marker |

**Accent rule:** accents carry *meaning*, never mood. `--warm` means "this is the
research thread". `--accent` means "this is actionable or verified". An accent used
because a section looked flat is a bug.

Accents are used as ink on dark surfaces, or as a fill behind `--bg`-coloured text.
Never accent text on an accent fill.

### Type

- **Display** — `Instrument Serif`. Headings only, ≥28px. Carries the editorial
  register and gives the mathematics somewhere to sit.
- **Body** — `Hanken Grotesk`. Prose, UI.
- **Mono** — `JetBrains Mono`. Labels, metrics, code, and all mathematical
  notation rendered as text.

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

`2px solid var(--accent)` at `2px` offset, on every interactive element, never
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
certificate moduli (10, 24, 40, 42) cycling through it.

Rules it must obey:

- **No 3D library.** Points are rotated with a hand-rolled matrix and projected to
  canvas 2D. three.js would add ~150KB gzipped to draw two rings and a circle.
  Budget: under 5KB for the scene.
- Runs inside the existing `SignalField` host, so it inherits: pause when
  offscreen, pause when the tab is hidden, DPR capped at 2, resize via
  `ResizeObserver`, palette read from CSS tokens, and one static frame under
  reduced motion.
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
- Keyboard traversal end to end; focus visible at every stop.
- Reduced motion on: no animation, canvas static, all content present.
- JS disabled: hero text, portrait, and all copy still render.
- `npm run typecheck` and `npm run lint` clean.

A tool that reads HTML without executing JavaScript will report this
client-rendered page as broken when it is not. Check in a browser that runs the
script.
