---
version: 1.0.0
file_role: prompt_pack
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Prompt Pack for Coding / Design Agents

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<prompt_static_mvp>

```md
You are building the MVP of the Bay Area Signal Map portfolio. Read the planning files. Build a Next.js + TypeScript + Tailwind site with a static dark Bay Area-inspired SVG/map background, 6 clickable signal nodes, a project drawer, mode switcher, timeline slider placeholder, and fallback project index page. Use typed data from data/nodes.ts and data/projects.ts. Do not hardcode project content in components. Keep the design premium, foggy, startup-dashboard-like, and accessible.
```

</prompt_static_mvp>

<prompt_project_data>

```md
Create typed data files for the portfolio using the schemas in 13_DATA_SCHEMA.md. Include nodes for SIDS, Priora/Healthcare AI, Deenflix, CS foundations, Proof Metrics, and Builder Memo. Use placeholders for missing links. Do not invent fake metrics. Every project must include problem, user, whatIBuilt, architecture, hardPart, tradeoff, proofMetrics, media, links, and nextVersion.
```

</prompt_project_data>

<prompt_mapbox_upgrade>

```md
Upgrade the static map to Mapbox GL JS. Use nodes from data/nodes.ts as GeoJSON. Add markers, route lines, selected-node camera focus, map controls, and attribution. Keep the traditional navigation and project index available. Lazy-load the map component if needed. Respect reduced motion by disabling fly-to animation.
```

</prompt_mapbox_upgrade>

<prompt_animation>

```md
Add Motion for React animations based on 11_ANIMATION_MOTION_SPEC.md. Implement node hover/tap states, drawer enter/exit, mode switch transition, route-line draw animation, and metric count-up. Add reduced-motion fallback. Do not animate long text or make interactions slower.
```

</prompt_animation>

<prompt_case_study>

```md
Write a project case study using 08_PROJECT_CASE_STUDY_TEMPLATE.md. Tone: direct, technical, founder-friendly. Include problem, user, what I built, architecture, hard part, tradeoff, proof, what broke, and next version. Use only true metrics and placeholders for missing links/assets.
```

</prompt_case_study>

<prompt_qa>

```md
Audit the portfolio using 18_QA_CHECKLISTS.md. Return a table with issue, severity, affected file/component, recommended fix, and whether it blocks launch. Focus on content clarity, accessibility, mobile UX, performance, map usability, and credibility.
```

</prompt_qa>
