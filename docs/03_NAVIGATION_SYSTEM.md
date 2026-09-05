---
version: 1.0.0
file_role: navigation_system
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Unique Navigation System

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<navigation_concept>
The user does not browse pages first. They navigate signals. The Bay Area map is the primary navigation. Traditional nav exists as a fallback for accessibility, SEO, mobile, and recruiters who want speed.
</navigation_concept>

<primary_navigation_objects>

| Object | Meaning | Interaction |
|---|---|---|
| Signal Node | Project/category marker | click opens drawer |
| Route Line | Relationship between projects | hover highlights connected work |
| Timeline Slider | Evolution over time | drag filters nodes by year/stage |
| Mode Switcher | Audience-specific lens | changes copy, node priority, metrics shown |
| Signal Legend | Explains map symbols | click filters categories |
| Command Palette | Fast keyboard navigation | Cmd/Ctrl+K opens search |

</primary_navigation_objects>

<unique_navigation_flow>

1. Initial load shows all high-level signals.
2. Visitor chooses a mode or skips.
3. Map auto-focuses on the strongest relevant nodes.
4. User hovers over a node to preview one-line proof.
5. User clicks node to open a side drawer.
6. Drawer includes `Open full case study`, `View demo`, `GitHub`, and `Resume relevance`.
7. User can move through route lines like a guided journey.
8. Timeline slider reveals growth over stages.
9. Command palette provides fast non-map access.

</unique_navigation_flow>

<mode_switcher_behavior>

```json
{
  "Founder Mode": {
    "prioritize": ["speed", "ownership", "tradeoffs", "ambiguity", "product thinking"],
    "hide_or_reduce": ["generic skills lists"],
    "copy_style": "direct, proof-driven, builder language"
  },
  "Recruiter Mode": {
    "prioritize": ["resume", "skills", "role fit", "tech stack", "project outcomes"],
    "hide_or_reduce": ["long philosophical memo"],
    "copy_style": "clear, skimmable, hiring-oriented"
  },
  "Engineer Mode": {
    "prioritize": ["architecture", "data model", "APIs", "performance", "code links"],
    "hide_or_reduce": ["high-level marketing copy"],
    "copy_style": "technical, exact, tradeoff-aware"
  }
}
```

</mode_switcher_behavior>

<map_controls>

- Zoom in/out.
- Reset view.
- Filter by project type.
- Filter by signal type.
- Timeline slider.
- Toggle labels.
- Toggle heatmap.
- Toggle route lines.
- Open command palette.
- Switch mode.

</map_controls>

<command_palette_spec>

Shortcut: `Cmd/Ctrl + K`

Commands:

```yaml
commands:
  - View best project
  - Open resume
  - Show backend projects
  - Show AI projects
  - Show architecture diagrams
  - Show contact
  - Toggle Founder Mode
  - Toggle Recruiter Mode
  - Toggle Engineer Mode
  - Reset map
```

</command_palette_spec>

<mobile_navigation>

On mobile, do not rely on precise map clicking. Use a bottom-sheet interface:

1. Map remains visible but simplified.
2. Nodes appear as large touch targets.
3. A horizontal card carousel lists nodes.
4. Clicking a card centers the map and opens bottom sheet.
5. Full project page remains accessible through normal links.

</mobile_navigation>

<accessibility_fallback>

- Provide regular top nav: Home, Projects, Memo, Metrics, Resume, Contact.
- All map nodes must be keyboard-focusable.
- Every node must have accessible text.
- Timeline slider must have keyboard controls.
- Reduced motion mode must disable route flyovers and heavy pulses.

</accessibility_fallback>

<thought>
Implementation agent should first build the fallback navigation and project data model, then layer the map navigation on top. Do not make the whole portfolio dependent on WebGL.
</thought>
