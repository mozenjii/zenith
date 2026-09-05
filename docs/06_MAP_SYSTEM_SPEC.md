---
version: 1.0.0
file_role: map_system_spec
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Map System Specification

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<map_purpose>
The map is the portfolio's main interface. It should convert projects into spatial signals, showing relationships between skills, projects, metrics, and ambition.
</map_purpose>

<recommended_map_engine>

```yaml
premium_option:
  library: Mapbox GL JS
  use_when: "you want smooth WebGL, custom styles, animated layers, camera movement, heatmaps"
  caveat: "requires access token and attention to pricing/attribution"

mvp_option:
  library: Leaflet
  use_when: "you want simpler implementation, fast MVP, markers, polylines, popups"
  caveat: "less premium for 3D/advanced animation"
```

</recommended_map_engine>

<map_layers>

```yaml
layers:
  base_map:
    description: dark, simplified Bay Area geography
  fog_overlay:
    description: soft gradient/noise overlay for SF feel
  signal_nodes:
    description: clickable project markers
  route_lines:
    description: connections between projects/signals
  heatmap:
    description: intensity layer showing activity/proof strength
  labels:
    description: custom labels for nodes and metaphor districts
  focus_ring:
    description: active node pulse/ring
  timeline_mask:
    description: controls what nodes appear by year/stage
```

</map_layers>

<node_categories>

```yaml
signal_categories:
  backend_systems:
    color_token: signal_blue
    icon: server
  ai_data:
    color_token: signal_teal
    icon: neural
  product_design:
    color_token: signal_gold
    icon: layout
  academic_depth:
    color_token: text_secondary
    icon: book
  metrics:
    color_token: success_green
    icon: chart
  founder_memo:
    color_token: warning_orange
    icon: memo
```

</node_categories>

<initial_nodes>

```json
[
  {
    "id": "sids-soma",
    "label": "SIDS Backend",
    "district": "SoMa",
    "metaphor": "Startup-style systems",
    "category": "backend_systems",
    "priority": 1,
    "stage": "shipping",
    "coords": [-122.401, 37.785],
    "proof": "Node.js + MS SQL startup intelligence backend"
  },
  {
    "id": "priora-mountain-view",
    "label": "Healthcare AI Workflow",
    "district": "Mountain View",
    "metaphor": "AI/data depth",
    "category": "ai_data",
    "priority": 2,
    "stage": "building",
    "coords": [-122.0839, 37.3861],
    "proof": "AI prior authorization/product thinking concept"
  },
  {
    "id": "deenflix-cupertino",
    "label": "Deenflix UX System",
    "district": "Cupertino",
    "metaphor": "Product polish",
    "category": "product_design",
    "priority": 3,
    "stage": "building",
    "coords": [-122.0322, 37.3229],
    "proof": "Design system, user flows, mobile UI"
  },
  {
    "id": "cs-foundations-berkeley",
    "label": "CS Systems Foundations",
    "district": "Berkeley",
    "metaphor": "Academic depth",
    "category": "academic_depth",
    "priority": 4,
    "stage": "learning",
    "coords": [-122.2585, 37.8715],
    "proof": "OS, DB, memory, synchronization, data models"
  },
  {
    "id": "metrics-financial-district",
    "label": "Proof Metrics",
    "district": "Financial District",
    "metaphor": "Signal proof",
    "category": "metrics",
    "priority": 5,
    "stage": "shipping",
    "coords": [-122.3999, 37.7946],
    "proof": "GitHub, projects, demos, achievements"
  },
  {
    "id": "builder-memo-palo-alto",
    "label": "Builder Memo",
    "district": "Palo Alto",
    "metaphor": "Ambition and thesis",
    "category": "founder_memo",
    "priority": 6,
    "stage": "future",
    "coords": [-122.143, 37.4419],
    "proof": "Career direction and startup engineering thesis"
  }
]
```

</initial_nodes>

<timeline_model>

```yaml
timeline:
  stages:
    - id: learning
      label: Learning the primitives
      shows: [academic_depth, product_design]
    - id: building
      label: Building real systems
      shows: [backend_systems, ai_data, product_design]
    - id: shipping
      label: Shipping proof-of-work
      shows: [backend_systems, metrics]
    - id: future
      label: Direction and ambition
      shows: [founder_memo]
```

</timeline_model>

<heatmap_rules>

Heat intensity should be calculated from real signals only:

```yaml
heat_score_formula:
  base: 0
  add:
    github_repo: 10
    live_demo: 15
    demo_video: 10
    architecture_diagram: 8
    project_metric: 8
    achievement: 12
    case_study_complete: 10
  cap: 100
```

</heatmap_rules>

<route_line_rules>

- SIDS connects to Financial District because it has metrics and diligence logic.
- SIDS connects to Palo Alto because it shows startup/product thinking.
- Priora connects to Mountain View because of AI/data.
- Deenflix connects to Cupertino because of product polish.
- Academic foundations connect to all major projects as underlying technical base.

</route_line_rules>

<thought>
Keep coordinates approximate and metaphorical. Do not imply real employment or physical presence at these companies/locations.
</thought>
