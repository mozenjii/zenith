---
version: 1.0.0
file_role: video_asset_plan
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Video Asset Plan

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<video_goal>
Videos should prove that projects are real. Keep them short, silent-friendly, captioned, compressed, and useful inside drawers/case studies.
</video_goal>

<global_video_specs>

```yaml
video_specs:
  formats: [webm, mp4]
  desktop_resolution: "1920x1080 or 1600x900"
  mobile_resolution: "1080x1920 if mobile app/UI"
  drawer_loop_duration: "5-12 seconds"
  case_study_demo_duration: "30-90 seconds"
  audio: "optional, avoid relying on it"
  captions: required
  max_file_size_target:
    drawer_loop: "under 3MB"
    full_demo: "under 15MB if self-hosted"
  poster_image: required
```

</global_video_specs>

<required_videos>

| Video | Duration | Use | Content | Priority |
|---|---:|---|---|---|
| Hero ambient map loop | 8–12s loop | landing background | slow signal pulses, fog, route glow | High |
| SIDS demo | 45–75s | project drawer + case study | backend endpoints, SQL logic, analytics response | High |
| Deenflix UI walkthrough | 30–60s | product/design node | login, home, details, profile, dark/light | High |
| AI workflow demo/mock | 45–75s | AI/data node | document → extraction → risk → generated output | High |
| Architecture reveal video | 15–30s | case study intro | boxes animate into frontend/backend/db/API | Medium |
| GitHub/proof timelapse | 10–20s | metrics node | contribution graph, repo list, commit activity | Medium |
| Resume quick-scan video | 8–12s | recruiter mode | resume panel slides in, key sections highlight | Low |
| Mobile responsive preview | 15–20s | QA/proof | desktop → tablet → mobile transition | Medium |

</required_videos>

<video_storyboards>

## Hero Ambient Map Loop

```yaml
shots:
  - 0s: dark foggy Bay Area map fades in
  - 2s: 6 signal nodes pulse once
  - 4s: route lines draw between nodes
  - 7s: timeline tick glows
  - 10s: loop returns to calm state
style: subtle, not distracting
```

## SIDS Demo

```yaml
shots:
  - title card: "SIDS — Startup Intelligence Backend"
  - show API route list
  - show login/auth request
  - show due diligence endpoint response
  - show market analytics endpoint
  - show database diagram briefly
  - end card: "Signal: backend architecture + data modeling"
```

## Deenflix UI Walkthrough

```yaml
shots:
  - onboarding screen
  - profile selection
  - home page
  - content details
  - search flow
  - dark/light transition
  - end card: "Signal: product polish + UX systems"
```

## AI Workflow Demo

```yaml
shots:
  - input document/mock patient case
  - extraction step
  - policy retrieval/search step
  - denial risk prediction/mock output
  - appeal/submission draft
  - end card: "Signal: AI workflow + product thinking"
```

## Architecture Reveal

```yaml
shots:
  - user action appears
  - frontend block appears
  - API block appears
  - database block appears
  - auth/data flow arrows draw
  - key tradeoff appears as caption
```

</video_storyboards>

<recording_tools>

Use any of these:

- OBS Studio for high-quality screen recording.
- Browser DevTools device toolbar for mobile screenshots/videos.
- Screen Studio / Tella / Loom if available.
- Figma prototype recording for UI walkthroughs.
- DaVinci Resolve / CapCut for quick editing.
- FFmpeg for compression.

</recording_tools>

<caption_style>

```yaml
caption_style:
  font: mono or clean sans
  placement: lower-left
  background: translucent dark
  max_words_per_caption: 8
  tone: direct
examples:
  - "JWT login returns role-based access."
  - "Stored procedure generates diligence view."
  - "Route line shows project dependency."
```

</caption_style>

<video_file_names>

```bash
/public/assets/videos/hero-signal-map-loop.webm
/public/assets/videos/sids-demo-short.webm
/public/assets/videos/deenflix-ui-walkthrough.webm
/public/assets/videos/ai-workflow-demo.webm
/public/assets/videos/architecture-reveal.webm
/public/assets/videos/github-proof-timelapse.webm
```

</video_file_names>
