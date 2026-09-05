---
version: 1.0.0
file_role: animation_motion_spec
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Animation & Motion Specification

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<motion_principle>
Motion should feel like signal intelligence: calm pulses, route drawing, drawer transitions, and map focus. Avoid gaming-style animations.
</motion_principle>

<motion_library>
Use Motion for React for UI transitions, layout animations, hover/tap states, scroll-linked progress, and gestures. Use map engine animation APIs for camera movement and geographic layers.
</motion_library>

<animation_inventory>

| Animation | Trigger | Duration | Purpose | Priority |
|---|---|---:|---|---|
| Initial map reveal | page load | 900ms | create immersion | High |
| Signal node pulse | idle loop | 2200ms | show active signals | High |
| Route line draw | node hover/click | 500–900ms | show relationships | High |
| Drawer slide-in | node click | 260ms | open project proof | High |
| Mode switch transition | mode change | 300ms | update lens smoothly | High |
| Timeline node morph | slider change | 400ms | show career evolution | Medium |
| Metric count-up | metrics enter view | 800ms | make proof feel alive | Medium |
| Command palette fade/scale | shortcut | 160ms | fast navigation | Medium |
| Page transition | route change | 220ms | premium feel | Medium |
| Reduced motion fallback | system setting | instant/fade only | accessibility | High |

</animation_inventory>

<recommended_easing>

```yaml
easing:
  standard: [0.22, 1, 0.36, 1]
  quick: [0.2, 0, 0, 1]
  drawer: [0.16, 1, 0.3, 1]
  pulse: "sine-like opacity/scale loop"
```

</recommended_easing>

<node_animation_spec>

```yaml
node_idle:
  scale: [1, 1.12, 1]
  opacity: [0.75, 1, 0.75]
  duration: 2.2
  repeat: Infinity
  delay_by_priority: true
node_hover:
  scale: 1.18
  label_opacity: 1
  ring_opacity: 1
node_active:
  scale: 1.25
  route_lines: draw_connected
  map_camera: focus_node
```

</node_animation_spec>

<route_animation_spec>

Route lines should look like signal paths, not roads.

```yaml
route_line:
  stroke_width: 1.5
  default_opacity: 0.18
  hover_opacity: 0.85
  active_dash_animation: true
  draw_duration: 700ms
```

</route_animation_spec>

<drawer_motion_spec>

```yaml
desktop_drawer:
  initial: { x: "100%", opacity: 0 }
  animate: { x: 0, opacity: 1 }
  exit: { x: "100%", opacity: 0 }
  duration: 260ms
mobile_bottom_sheet:
  initial: { y: "100%" }
  animate: { y: 0 }
  exit: { y: "100%" }
  drag_to_close: true
```

</drawer_motion_spec>

<scroll_motion>

- Project case studies can use scroll-triggered reveal sections.
- Architecture diagrams can progressively reveal layers.
- Do not animate long paragraphs letter-by-letter.
- Use scroll progress bar on long case studies.

</scroll_motion>

<reduced_motion_rules>

When `prefers-reduced-motion` is enabled:

- Disable pulsing loops.
- Disable map fly-to animation.
- Replace drawer slide with fade.
- Disable route dash movement.
- Keep hover focus states visible without motion.
- Keep all content accessible.

</reduced_motion_rules>

<thought>
Animation must support the content. If performance drops, remove animation before removing content.
</thought>
