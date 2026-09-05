---
version: 1.0.0
file_role: visual_design_system
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Visual Design System

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<visual_direction>
Foggy startup intelligence map. It should feel like a private dashboard used by a founder, recruiter, or investor to inspect signals.
</visual_direction>

<design_keywords>

- fog
- signal
- route
- memo
- intelligence dashboard
- market map
- startup data room
- premium developer tool
- glass panels
- soft glow
- thin vector lines
- muted geographic texture

</design_keywords>

<color_palette>

```yaml
colors:
  background_primary: "#07111F" # deep navy
  background_secondary: "#0B1727"
  panel_dark: "rgba(13, 23, 38, 0.72)"
  panel_border: "rgba(175, 214, 255, 0.14)"
  text_primary: "#F4F7FB"
  text_secondary: "#A9B7C8"
  text_muted: "#6F8196"
  signal_teal: "#38E8C6"
  signal_blue: "#5DA8FF"
  signal_gold: "#F7B955"
  warning_orange: "#FF8A3D"
  success_green: "#44D17D"
  map_land: "#111C2C"
  map_water: "#06101E"
  map_line: "#2B435F"
```

</color_palette>

<typography>

```yaml
font_strategy:
  primary: "Inter, Geist, or similar modern sans"
  mono: "JetBrains Mono, IBM Plex Mono, or Geist Mono"
  usage:
    hero: "large, clean, confident"
    labels: "mono for signal IDs and node metadata"
    body: "simple sans for readability"
```

</typography>

<layout_rules>

- Use large empty space around the map.
- Keep cards glassy but readable.
- Do not overload the hero with too many nodes.
- Use thin borders and low-opacity glow.
- Use mono labels for coordinates, signal IDs, metrics, and tags.
- Keep project drawers structured like startup one-pagers.

</layout_rules>

<map_style>

```yaml
map_style:
  base: dark desaturated Bay Area map
  water: deep navy
  land: muted charcoal-blue
  roads: thin low-contrast lines
  labels: minimal
  landmark_labels: custom, not crowded
  fog_overlay: radial gradients + transparent noise texture
  route_lines: BART-inspired but original
  signal_nodes: glowing rings with category-specific icons
```

</map_style>

<marker_system>

| Marker Type | Shape | Meaning |
|---|---|---|
| Core Project | glowing filled dot | best work |
| Learning Node | outlined dot | academic/technical learning |
| Metric Node | diamond | proof/traction/stat |
| Memo Node | document icon | philosophy/thesis |
| Video Node | play triangle | demo/video asset |
| Architecture Node | hexagon | systems/design depth |

</marker_system>

<logo_direction>

Potential logo: a simple monogram inside a signal ring.

Options:

- `SM` inside a route-circle.
- `{{initials}}` with a small map pin cutout.
- Abstract bridge line + signal dot.
- Wordmark: `Signal Map` with mono subtitle `proof-of-work interface`.

</logo_direction>

<visual_dont>

- No cheesy Golden Gate stock-photo hero.
- No bright Google Maps default colors.
- No fake 3D city if it hurts performance.
- No excessive startup buzzword badges.
- No cluttered dashboards.

</visual_dont>
