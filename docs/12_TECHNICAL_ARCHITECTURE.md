---
version: 1.0.0
file_role: technical_architecture
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Technical Architecture

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<recommended_stack>

```yaml
frontend:
  framework: Next.js
  language: TypeScript
  styling: Tailwind CSS
  animation: Motion for React
  map_premium: Mapbox GL JS
  map_mvp: Leaflet
  icons: lucide-react or custom SVG
  content: MDX or typed JSON
  deployment: Vercel
```

</recommended_stack>

<why_stack>

- Next.js gives file-based routing, layouts, static pages, metadata support, and easy Vercel deployment.
- Tailwind is fast for building a custom visual system.
- Motion for React handles UI transitions, gestures, scroll animation, and layout changes.
- Mapbox GL JS is best for a premium animated map experience.
- Leaflet is best if you want a simpler MVP.

</why_stack>

<repo_structure>

```bash
bay-area-signal-map/
  app/
    layout.tsx
    page.tsx
    projects/
      page.tsx
      [slug]/
        page.tsx
    memo/
      page.tsx
    metrics/
      page.tsx
    resume/
      page.tsx
    contact/
      page.tsx
  components/
    map/
      SignalMap.tsx
      SignalNode.tsx
      SignalLegend.tsx
      TimelineSlider.tsx
      MapControls.tsx
      RouteLayer.tsx
      HeatmapLayer.tsx
    navigation/
      TopNav.tsx
      CommandPalette.tsx
      ModeSwitcher.tsx
    project/
      ProjectDrawer.tsx
      ProjectCard.tsx
      ProjectMedia.tsx
      ArchitectureDiagram.tsx
      CaseStudySection.tsx
    ui/
      GlassPanel.tsx
      MetricBadge.tsx
      Pill.tsx
      Button.tsx
  data/
    nodes.ts
    projects.ts
    metrics.ts
    routes.ts
    videos.ts
  content/
    projects/
      sids.md
      priora.md
      deenflix.md
    memo.md
  public/
    assets/
      brand/
      map/
      projects/
      videos/
  styles/
    globals.css
  lib/
    map-utils.ts
    scoring.ts
    filters.ts
    seo.ts
```

</repo_structure>

<environment_variables>

```bash
NEXT_PUBLIC_MAPBOX_TOKEN={{mapbox_public_token}}
NEXT_PUBLIC_SITE_URL={{site_url}}
```

</environment_variables>

<implementation_priorities>

1. Data model.
2. Project content.
3. Static map MVP.
4. Node drawer.
5. Responsive layout.
6. Motion polish.
7. Full Mapbox/Leaflet integration.
8. Timeline and heatmap.
9. SEO/performance/accessibility pass.

</implementation_priorities>

<performance_budget>

```yaml
performance_budget:
  initial_js: "keep as low as practical; lazy-load map if heavy"
  lcp_target: "under 2.5s on good connection"
  images: "WebP/AVIF preferred"
  videos: "lazy-load, use poster images"
  map: "load after hero shell if needed"
  animations: "GPU-friendly transforms and opacity"
```

</performance_budget>

<deployment_plan>

```yaml
deployment:
  platform: Vercel
  branch_strategy:
    main: production
    dev: preview
  checks:
    - typecheck
    - lint
    - build
    - lighthouse
    - accessibility smoke test
```

</deployment_plan>

<thought>
Build the content system before the map. If the data is clean, the map, drawer, filters, and case studies become easier.
</thought>
