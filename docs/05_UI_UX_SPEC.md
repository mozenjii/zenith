---
version: 1.0.0
file_role: ui_ux_spec
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# UI/UX Specification

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<ux_goal>
Make the site impressive within 5 seconds, understandable within 15 seconds, and evaluable within 60 seconds.
</ux_goal>

<homepage_ui>

## Hero Layout

```yaml
hero:
  left_top: personal wordmark + short positioning
  center: interactive Bay Area map
  right_top: mode switcher
  bottom_left: signal legend
  bottom_center: timeline slider
  bottom_right: resume/contact buttons
```

## Hero Content

- Headline should be over or beside the map, not hidden.
- Map should immediately show 5–7 major nodes.
- First-time visitors get a tiny onboarding tooltip: `Click a signal node to inspect proof.`

</homepage_ui>

<node_drawer_ui>

When a node is clicked, open a side drawer on desktop and a bottom sheet on mobile.

Required drawer fields:

```yaml
node_drawer:
  node_name: string
  bay_area_metaphor: string
  signal_type: string
  one_line_pitch: string
  problem: string
  what_i_built: string
  stack: string[]
  proof_metrics: object[]
  hard_part: string
  tradeoff: string
  media:
    screenshot: string
    demo_video: string
    architecture_diagram: string
  links:
    github: string
    live_demo: string
    case_study: string
```

</node_drawer_ui>

<interaction_states>

| Element | Default | Hover | Active | Disabled |
|---|---|---|---|---|
| Signal Node | soft glow | pulse + label reveal | drawer opens + map focuses | low opacity |
| Route Line | low opacity | brighter line + endpoint labels | route journey starts | hidden |
| Filter Chip | muted border | glow border | filled background | muted text |
| Timeline | subtle ticks | tick label expands | nodes animate by stage | static |
| Mode Switch | three segmented buttons | small scale | active mode highlighted | none |

</interaction_states>

<empty_states>

- No project under filter: `No signal found in this layer yet. Try another lens.`
- Video missing: show screenshot + `Demo asset pending` tag.
- GitHub missing/private: `Code available on request` only if true.
- Live demo missing: `Case study available` should remain.

</empty_states>

<persona_modes_ui>

## Founder Mode

Shows:

- ownership
- speed
- messy problem-solving
- tradeoffs
- product assumptions
- future roadmap

## Recruiter Mode

Shows:

- role fit
- tech stack
- resume download
- concise project summaries
- achievements
- contact CTA

## Engineer Mode

Shows:

- architecture diagrams
- API/data model details
- code links
- performance notes
- debugging notes

</persona_modes_ui>

<global_components>

- Map Canvas
- Signal Legend
- Node Drawer
- Mode Switcher
- Timeline Slider
- Metrics Strip
- Command Palette
- Project Card
- Case Study Section
- Media Viewer
- Resume CTA
- Contact CTA
- Footer

</global_components>

<microcopy_rules>

- Use direct language.
- Use startup terms only where they add meaning.
- Replace `passionate about technology` with proof.
- Replace `worked on` with `built`, `shipped`, `designed`, `debugged`, `modeled`.
- Every project should answer: `What does this prove about you?`

</microcopy_rules>
