---
version: 1.0.0
file_role: build_roadmap
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Build Roadmap

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<roadmap_strategy>
Build the portfolio in layers. Do not start with the hardest Mapbox animation. First make the content strong, then make the navigation unique, then make the map premium.
</roadmap_strategy>

<phase_1_mvp>

## Phase 1 — Static Signal Map MVP

Goal: prove the concept quickly.

Tasks:

- Create Next.js project.
- Add Tailwind.
- Build homepage shell.
- Create project data JSON/TS.
- Create static SVG/dark map background.
- Add 6 clickable nodes.
- Add project drawer.
- Add simple mode switcher.
- Add `/projects` fallback page.
- Add resume/contact links.

Definition of done:

- User can click nodes and inspect projects.
- Site works without external map API.
- Mobile layout is usable.

</phase_1_mvp>

<phase_2_content_depth>

## Phase 2 — Content and Proof

Tasks:

- Write case studies for 5–7 projects.
- Add screenshots.
- Add architecture diagrams.
- Add proof metrics.
- Add demo videos/posters.
- Add builder memo page.
- Add resume page.

Definition of done:

- Every major project has problem, build, stack, hard part, tradeoff, proof, next version.

</phase_2_content_depth>

<phase_3_premium_map>

## Phase 3 — Interactive Map Engine

Tasks:

- Choose Mapbox GL JS or Leaflet.
- Implement actual map component.
- Convert nodes to coordinates.
- Add markers and popups/drawer events.
- Add route lines.
- Add filters.
- Add timeline slider.
- Add map attribution.

Definition of done:

- Map feels smooth and does not break the rest of the site.

</phase_3_premium_map>

<phase_4_motion_polish>

## Phase 4 — Motion and Immersion

Tasks:

- Add initial map reveal.
- Add node pulses.
- Add route-line draw animation.
- Add drawer transitions.
- Add mode switch transitions.
- Add metric count-up.
- Add reduced-motion fallback.

Definition of done:

- Site feels premium but not distracting.

</phase_4_motion_polish>

<phase_5_quality_and_deploy>

## Phase 5 — QA and Deployment

Tasks:

- Accessibility pass.
- SEO metadata.
- Open Graph image.
- Mobile testing.
- Performance testing.
- Vercel deployment.
- Link checking.
- Final copy review.

Definition of done:

- Portfolio is ready to send to founders/recruiters.

</phase_5_quality_and_deploy>

<priority_order>

```yaml
must_have:
  - strong hero concept
  - 6 signal nodes
  - project drawer
  - project case studies
  - resume CTA
  - mobile fallback
should_have:
  - mode switcher
  - timeline slider
  - animated route lines
  - demo videos
could_have:
  - heatmap
  - GitHub API integration
  - advanced 3D camera
  - network graph
avoid_until_later:
  - real-time analytics dashboard
  - too many map nodes
  - heavy 3D city models
```

</priority_order>
