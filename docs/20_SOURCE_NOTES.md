---
version: 1.0.0
file_role: source_notes
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Source Notes & External References

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<implementation_sources>

These references support implementation decisions. Confirm current versions before coding.

```yaml
sources:
  mapbox_gl_js:
    url: "https://docs.mapbox.com/mapbox-gl-js/guides/"
    relevance: "Mapbox supports custom styles, client-side data, markers/popups, layers, camera movement, and map interactivity."
  mapbox_heatmap:
    url: "https://docs.mapbox.com/mapbox-gl-js/example/heatmap-layer/"
    relevance: "Useful for signal intensity/heatmap layer concept."
  leaflet_quick_start:
    url: "https://leafletjs.com/examples/quick-start/"
    relevance: "Leaflet supports mobile-friendly interactive maps, markers, polylines, popups, events, and provider attribution."
  nextjs_project_structure:
    url: "https://nextjs.org/docs/app/getting-started/project-structure"
    relevance: "Use App Router project structure and file conventions."
  motion_react:
    url: "https://motion.dev/docs/react"
    relevance: "Use for React animations, gestures, scroll, layout animations, and reduced-motion-aware UI."
  wcag_22:
    url: "https://www.w3.org/TR/WCAG22/"
    relevance: "Accessibility guidance for perceivable, operable, understandable, and robust web content."
  bart_system_map:
    url: "https://www.bart.gov/system-map"
    relevance: "Reference only. Do not copy official system map; create original transit-inspired route visuals."
```

</implementation_sources>

<source_usage_rules>

- Use official docs before blog tutorials when implementing core libraries.
- Check current package versions before installing.
- Respect attribution requirements for maps/tiles.
- Do not directly copy official transit maps or brand assets.

</source_usage_rules>
