---
version: 1.0.0
file_role: information_architecture
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Information Architecture

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<site_map>

```yaml
routes:
  /:
    name: Signal Map Home
    role: immersive landing + map navigation
  /projects:
    name: Project Index
    role: non-map fallback list of all projects
  /projects/[slug]:
    name: Project Case Study
    role: full project deep dive
  /memo:
    name: Builder Memo
    role: about page written like a founder memo
  /metrics:
    name: Signal Metrics
    role: GitHub, project, stack, and execution metrics
  /resume:
    name: Resume
    role: downloadable resume + quick recruiter view
  /contact:
    name: Contact
    role: work-with-me CTA
```

</site_map>

<homepage_sections>

1. Hero Map
2. Persona Mode Switcher: Founder / Recruiter / Engineer
3. Signal Legend
4. Featured Nodes
5. Timeline Slider
6. Metrics Strip
7. Project Drawer Preview
8. Builder Memo Preview
9. Resume and Contact CTA

</homepage_sections>

<primary_user_journeys>

<journey persona="recruiter">
1. Land on hero.
2. Select `Recruiter Mode`.
3. See simplified highlights: skills, strongest projects, resume button.
4. Click best project node.
5. Scan problem, stack, proof, demo.
6. Download resume or contact.
</journey>

<journey persona="founder">
1. Land on hero.
2. Select `Founder Mode`.
3. See nodes sorted by ownership, speed, ambiguity, product thinking.
4. Click SoMa / Mission / Palo Alto nodes.
5. Read tradeoffs and hard-part sections.
6. Visit memo and contact.
</journey>

<journey persona="engineer">
1. Land on hero.
2. Select `Engineer Mode`.
3. See architecture-heavy project cards.
4. Open project case studies.
5. Inspect data models, APIs, stack, diagrams, GitHub.
6. Evaluate code depth.
</journey>

<journey persona="vc_explorer">
1. Land on hero.
2. Explore the Financial District and Sand Hill nodes.
3. Read signal metrics, traction-like proof, market thinking, risks.
4. Scan builder thesis.
5. Leave with memorable narrative.
</journey>

</primary_user_journeys>

<content_hierarchy>

```yaml
level_1_immediate_signal:
  - headline
  - role/title
  - mode switcher
  - best 3 project nodes
  - resume/contact CTA
level_2_evidence:
  - project drawer
  - screenshots
  - demos
  - metrics
  - tech stack
level_3_depth:
  - full case study
  - architecture diagram
  - tradeoffs
  - future roadmap
  - code links
```

</content_hierarchy>

<required_portfolio_content>

- Name and positioning line.
- Short builder memo.
- Resume PDF.
- GitHub and LinkedIn links.
- 5–7 strongest projects.
- Skills grouped by actual use.
- Project demos/videos.
- Project screenshots.
- Architecture diagrams.
- Metrics/proof signals.
- Contact CTA.
- Optional blog/log section if you can maintain it.

</required_portfolio_content>

<recommended_projects_to_map>

```yaml
projects:
  - slug: sids-startup-intelligence
    bay_node: SoMa
    signal: backend_architecture + startup_analysis
  - slug: priora-healthcare-ai
    bay_node: Mountain View
    signal: ai_workflow + product_thinking
  - slug: deenflix-uiux
    bay_node: Cupertino
    signal: product_design + ux_systems
  - slug: os-db-lab-systems
    bay_node: Berkeley
    signal: cs_foundations
  - slug: hackathon-ai-project
    bay_node: Mission District
    signal: speed + prototype + teamwork
  - slug: embedded-fire-detection
    bay_node: Oakland
    signal: hardware_debugging + execution
```

</recommended_projects_to_map>
