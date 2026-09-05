---
version: 1.0.0
file_role: asset_inventory
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Asset Inventory

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<asset_goal>
Collect every asset needed before building the full immersive version. Assets must make the site feel real, not like a concept mockup.
</asset_goal>

<brand_assets>

| Asset | Format | Size | Purpose | Priority |
|---|---|---:|---|---|
| Personal wordmark | SVG | flexible | navbar + loading screen | High |
| Signal Map logo | SVG | flexible | hero + favicon | High |
| Favicon | ICO/PNG/SVG | 32x32, 180x180 | browser identity | High |
| Open Graph image | PNG/JPG | 1200x630 | link previews | High |
| Resume PDF | PDF | 1 page | recruiter CTA | High |
| Personal photo/avatar | JPG/PNG/WebP | 800x800 | optional human trust asset | Medium |

</brand_assets>

<map_assets>

| Asset | Format | Description | Priority |
|---|---|---|---|
| Dark Bay Area map style | Mapbox style / tile provider / SVG | base visual environment | High |
| Custom signal markers | SVG | category-specific marker shapes | High |
| Route-line overlay | SVG/GeoJSON | BART-inspired original lines | High |
| Fog overlay | PNG/WebP/SVG/CSS gradient | soft SF atmospheric layer | Medium |
| Noise texture | PNG/WebP | subtle texture over background | Medium |
| Golden Gate abstract line | SVG | tiny watermark, not main hero | Low |
| Node icons | SVG | backend, AI, product, metrics, memo | High |
| Legend icons | SVG | explains map categories | High |

</map_assets>

<project_assets>

For each major project:

```yaml
project_asset_pack:
  screenshot_hero: "16:9 WebP"
  screenshot_mobile: "9:16 WebP if applicable"
  demo_video: "30-60s MP4/WebM"
  demo_gif: "short loop WebP/GIF for drawer"
  architecture_diagram: "SVG/PNG"
  data_model_diagram: "SVG/PNG if relevant"
  stack_icons: "SVG"
  github_readme_preview: "screenshot/WebP"
  case_study_markdown: "MDX/Markdown"
```

</project_assets>

<project_specific_assets>

## SIDS

- Backend architecture diagram.
- Database ERD screenshot.
- API route list screenshot.
- PowerShell/Postman test screenshot.
- Demo video showing login, dashboard endpoint, diligence endpoint, analytics response.

## Priora / Healthcare AI

- Workflow diagram: medical document → extraction → policy retrieval → denial risk → appeal draft.
- Model/pipeline diagram.
- Demo mock video if not deployed.
- Policy retrieval UI mock if available.

## Deenflix

- Figma screen collage.
- Mobile flow video.
- Design system board screenshot.
- Dark/light mode transition clip.

## OS/DB/CS Foundations

- Diagram collage: mmap, semaphores, paging, ERD, SQL queries.
- Code screenshot with clean syntax highlighting.
- “Foundations behind the build” card assets.

## Embedded Fire Detection

- Circuit diagram.
- Proteus screenshot.
- Hardware/component photo if available.
- Short simulation video.

## Hackathon

- Team photo if available.
- Certificate/award image if available.
- Demo screenshot.
- Problem-solution slide.

</project_specific_assets>

<icon_system>

Required icons:

```yaml
icons:
  - server
  - database
  - api
  - lock
  - neural-network
  - chart-line
  - map-pin
  - play
  - github
  - linkedin
  - resume
  - command
  - terminal
  - code
  - route
  - memo
  - rocket-subtle
```

</icon_system>

<asset_naming_convention>

```bash
/public/assets/brand/signal-map-logo.svg
/public/assets/map/marker-backend.svg
/public/assets/map/route-core.svg
/public/assets/projects/sids/sids-hero.webp
/public/assets/projects/sids/sids-demo.webm
/public/assets/projects/sids/sids-architecture.svg
```

</asset_naming_convention>

<legal_brand_safety>

- Avoid using official Apple, Google, YC, BART, or company logos unless you have rights or it is clearly allowed.
- Use location names as metaphors, not company affiliation.
- Use original transit-line visuals instead of copying official maps.
- Keep OpenStreetMap/Mapbox attribution visible if using their tiles/services.

</legal_brand_safety>
