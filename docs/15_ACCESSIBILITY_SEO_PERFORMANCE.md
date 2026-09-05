---
version: 1.0.0
file_role: accessibility_seo_performance
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Accessibility, SEO & Performance

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<accessibility_goal>
The site can be immersive, but it cannot become unusable. The map is an enhancement; the content must remain accessible through normal pages and keyboard navigation.
</accessibility_goal>

<accessibility_requirements>

- Use semantic HTML.
- All map nodes must be keyboard-focusable.
- Add visible focus states.
- Provide text alternatives for every icon and image.
- Videos need captions or adjacent text summaries.
- Do not rely only on color for category meaning.
- Respect `prefers-reduced-motion`.
- Ensure contrast meets WCAG AA targets.
- Provide fallback project index at `/projects`.
- Avoid keyboard traps in drawers, modals, and command palette.

</accessibility_requirements>

<seo_requirements>

```yaml
seo:
  title_template: "{{page_title}} | {{user_name}} — Signal Map Portfolio"
  home_title: "{{user_name}} — Bay Area Signal Map Portfolio"
  description: "A Bay Area-inspired proof-of-work portfolio mapping CS projects, systems, AI workflows, product design, and technical judgment."
  open_graph_image: "/assets/brand/og-signal-map.png"
  sitemap: true
  robots: true
  project_pages_indexable: true
```

</seo_requirements>

<metadata_pages>

Each project page should include:

- title
- description
- Open Graph image
- canonical URL
- project tags
- structured summary

</metadata_pages>

<performance_requirements>

```yaml
performance:
  images:
    format: WebP/AVIF
    lazy_load: true
    responsive_sizes: true
  videos:
    use_poster: true
    lazy_load: true
    muted_autoplay_only_for_short_loops: true
  map:
    lazy_load_if_needed: true
    reduce_initial_layers: true
    cluster_if_many_nodes: true
  animation:
    animate_transform_opacity: true
    avoid_layout_thrashing: true
  bundle:
    dynamically_import_map: true
    tree_shake_icons: true
```

</performance_requirements>

<testing_checklist>

- Lighthouse Performance >= 85.
- Accessibility >= 95 if possible.
- Keyboard-only navigation works.
- Mobile bottom sheet works.
- Reduced motion works.
- Resume button works.
- GitHub/demo links open correctly.
- Map attribution visible if needed.
- OG image renders in link preview.

</testing_checklist>
