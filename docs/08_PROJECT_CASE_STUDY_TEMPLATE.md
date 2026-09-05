---
version: 1.0.0
file_role: project_case_study_template
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Project Case Study Template

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<case_study_purpose>
Every project page should read like a mini startup memo: problem, user, build, architecture, hard part, tradeoff, proof, next version.
</case_study_purpose>

<template>

```md
---
title: "{{project_title}}"
slug: "{{project_slug}}"
bay_node: "{{bay_area_node}}"
signal_type: "{{signal_type}}"
status: "{{status}}"
year: "{{year}}"
stack:
  - "{{tech_1}}"
  - "{{tech_2}}"
  - "{{tech_3}}"
links:
  github: "{{github_url}}"
  demo: "{{demo_url}}"
  video: "{{video_url}}"
---

# {{project_title}}

<signal_summary>
{{one_sentence_pitch}}
</signal_summary>

<problem>
What problem did this solve? Who had the pain? Why was it worth building?
</problem>

<user>
Who is the target user? Student, recruiter, admin, founder, analyst, patient, doctor, etc.
</user>

<what_i_built>
Describe the actual system, not the idea.
</what_i_built>

<architecture>
- Frontend:
- Backend:
- Database:
- APIs:
- Auth:
- External services:
- Deployment:
</architecture>

<hard_part>
What was technically difficult? Be specific.
</hard_part>

<tradeoff>
What did you choose and what did you sacrifice?
</tradeoff>

<proof>
- Demo:
- GitHub:
- Screenshots:
- Metrics:
- Achievement:
</proof>

<what_broke>
What failed, blocked you, or forced redesign?
</what_broke>

<next_version>
What would you improve next?
</next_version>
```

</template>

<example_sids>

```md
# SIDS — Startup Intelligence & Due-Diligence System

<signal_summary>
A backend system for analyzing startups, funding rounds, fund exposure, diligence signals, and investment candidates.
</signal_summary>

<problem>
Startup data is fragmented. Investors and analysts need structured ways to inspect market trends, startup credibility, portfolio exposure, and candidate quality.
</problem>

<what_i_built>
I built a Node.js + Express + MS SQL backend with authentication, diligence stored procedures, market analytics views, funding-growth endpoints, and investment candidate logic.
</what_i_built>

<architecture>
- Backend: Node.js, Express
- Database: MS SQL Server
- Auth: JWT, role-based access
- Data model: startups, founders, funds, investments, milestones, sources, funding rounds
- SQL features: views, stored procedures, joins, aggregation, nested queries
</architecture>

<hard_part>
The hardest part was connecting the database design to useful diligence workflows instead of only storing tables.
</hard_part>

<tradeoff>
I used stored procedures and views to keep analytics close to the database, trading some backend flexibility for clearer SQL-side business logic.
</tradeoff>
```

</example_sids>
