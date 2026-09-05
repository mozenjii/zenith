---
version: 1.0.0
project: Bay Area Signal Map Portfolio
file_role: master_index
owner: "{{user_name}}"
status: planning_complete
recommended_stack:
  frontend: Next.js + TypeScript
  styling: Tailwind CSS
  animation: Motion for React
  map: Mapbox GL JS for premium version OR Leaflet for MVP
  deployment: Vercel
llm_parse_mode: strict
---

# Bay Area Signal Map Portfolio — Master Plan

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<project_summary>
Create an immersive portfolio website where the visitor navigates a Bay Area-inspired signal map. Each map node represents a proof-of-work signal: full-stack systems, AI/data work, UI/UX thinking, academic depth, metrics, founder mindset, and technical ambition.
</project_summary>

<core_positioning>

**Theme:** Bay Area Signal Map  
**Tagline:** Less portfolio. More proof-of-work.  
**Primary metaphor:** A startup intelligence map where your career is represented through nodes, routes, signals, metrics, and case studies.  
**Audience:** startup recruiters, founders, engineers, VC-style evaluators, hackathon judges, and ambitious technical peers.  
**Important boundary:** This is not claiming you are based in San Francisco. It is a metaphorical Silicon Valley-inspired portfolio interface.

</core_positioning>

<file_index>

| File | Purpose |
|---|---|
| `01_THEME_BRIEF.md` | Overall concept, narrative, audience psychology, uniqueness rules. |
| `02_INFORMATION_ARCHITECTURE.md` | Pages, sections, user journeys, content hierarchy. |
| `03_NAVIGATION_SYSTEM.md` | Unique map navigation, modes, routes, drawer behavior, fallback navigation. |
| `04_VISUAL_DESIGN_SYSTEM.md` | Colors, typography, map style, UI motifs, visual rules. |
| `05_UI_UX_SPEC.md` | Component-level UX, states, empty states, interactions, responsive behavior. |
| `06_MAP_SYSTEM_SPEC.md` | Map nodes, coordinates, categories, layers, filters, timeline, heatmap rules. |
| `07_CONTENT_STRATEGY.md` | Portfolio copy, project content, lingo, voice, case-study structure. |
| `08_PROJECT_CASE_STUDY_TEMPLATE.md` | Reusable project template for every project page/drawer. |
| `09_ASSET_INVENTORY.md` | Every image, icon, SVG, screenshot, diagram, and brand asset needed. |
| `10_VIDEO_ASSET_PLAN.md` | Separate videos/GIFs/screen recordings needed for the site. |
| `11_ANIMATION_MOTION_SPEC.md` | Microinteractions, map motion, transitions, timing, easing, reduced motion. |
| `12_TECHNICAL_ARCHITECTURE.md` | Stack, repo structure, libraries, performance, deployment. |
| `13_DATA_SCHEMA.md` | JSON/TypeScript data contracts for nodes, projects, metrics, videos. |
| `14_COMPONENT_BLUEPRINT.md` | Component list and responsibilities. |
| `15_ACCESSIBILITY_SEO_PERFORMANCE.md` | Accessibility, SEO, metadata, performance budgets, testing. |
| `16_BUILD_ROADMAP.md` | Phase-by-phase build plan from MVP to premium. |
| `17_LLM_AGENT_EXECUTION_GUIDE.md` | Rules for using these files with a coding agent. |
| `18_QA_CHECKLISTS.md` | Final review checklists for content, UX, animation, build, deploy. |
| `19_PROMPT_PACK.md` | Agent prompts to generate code, content, assets, and QA tasks. |
| `20_SOURCE_NOTES.md` | External source notes and implementation references. |

</file_index>

<final_experience>

Visitor lands on a foggy, premium Bay Area-inspired map. Pulsing signal nodes appear across SF/Silicon Valley. The user can choose `Founder Mode`, `Recruiter Mode`, or `Engineer Mode`. Clicking a node opens a glass-panel drawer with project proof: pitch, problem, stack, architecture, hard part, metrics, demo, and links. A timeline slider animates your growth from learning to building to shipping.

</final_experience>

<non_negotiables>

- The site must not feel like a generic resume.
- The map must not be touristy or childish.
- SF/Bay Area references must be metaphors for startup signals.
- Every major claim must be backed by a project, metric, demo, screenshot, or explanation.
- Use startup lingo naturally: signal, proof-of-work, traction, velocity, demo, memo, ship, architecture, tradeoff, runway, diligence, thesis.
- Never fake numbers, users, internships, or SF location history.

</non_negotiables>
