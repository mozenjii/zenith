---
version: 1.0.0
file_role: component_blueprint
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Component Blueprint

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<component_tree>

```txt
App
└── HomePage
    ├── TopNav
    ├── HeroSignalMapSection
    │   ├── ModeSwitcher
    │   ├── SignalMap
    │   │   ├── BaseMap
    │   │   ├── SignalNode[]
    │   │   ├── RouteLayer
    │   │   ├── HeatmapLayer
    │   │   └── MapControls
    │   ├── SignalLegend
    │   └── TimelineSlider
    ├── MetricsStrip
    ├── FeaturedSignals
    ├── BuilderMemoPreview
    ├── ResumeCTA
    ├── ContactCTA
    ├── ProjectDrawer
    └── Footer
```

</component_tree>

<components>

## `SignalMap`

Responsibility:

- Render map engine.
- Render nodes and route lines.
- Handle selected node.
- Handle filters and mode changes.

Props:

```ts
interface SignalMapProps {
  nodes: SignalNode[];
  projects: Project[];
  activeMode: PersonaMode;
  selectedNodeId?: string;
  onNodeSelect: (nodeId: string) => void;
}
```

## `SignalNode`

Responsibility:

- Render marker.
- Handle hover preview.
- Expose accessible button/label.
- Show category styling.

## `ProjectDrawer`

Responsibility:

- Show selected project proof.
- Provide links to case study, GitHub, demo.
- Adapt content based on mode.

## `ModeSwitcher`

Responsibility:

- Switch between Founder, Recruiter, Engineer modes.
- Save selected mode in state/local storage.
- Update node priority and copy.

## `TimelineSlider`

Responsibility:

- Filter nodes by stage/year.
- Animate timeline transitions.
- Provide keyboard controls.

## `CommandPalette`

Responsibility:

- Fast navigation/search.
- Project search.
- Mode switching.
- Map reset.

## `ProjectMedia`

Responsibility:

- Render images/videos with poster and lazy loading.
- Use captions.
- Provide fallback if video missing.

</components>

<state_model>

```ts
interface AppState {
  activeMode: PersonaMode;
  selectedNodeId?: string;
  activeFilters: SignalCategory[];
  timelineStage: SignalStage | "all";
  isDrawerOpen: boolean;
  isCommandPaletteOpen: boolean;
  reducedMotion: boolean;
}
```

</state_model>

<component_rules>

- Components should be data-driven.
- No project content hardcoded inside components.
- All map nodes should be generated from `data/nodes.ts`.
- Every media asset must have alt text or captions.
- Drawer should not block resume/contact access.

</component_rules>
