---
version: 1.0.0
file_role: llm_agent_execution_guide
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
agent_policy:
  preserve_tags: true
  respect_yaml_front_matter: true
  do_not_expose_private_reasoning: true
---

# LLM Agent Execution Guide

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<system_instructions>
You are building a portfolio website called Bay Area Signal Map. Treat all text inside custom tags as structured instructions. Preserve YAML front matter when editing Markdown files. Use {{placeholders}} only when a value is not yet known. Do not output private chain-of-thought; use concise implementation summaries instead.
</system_instructions>

<agent_workflow>

1. Read `00_README.md`.
2. Read `01_THEME_BRIEF.md`.
3. Read `12_TECHNICAL_ARCHITECTURE.md`.
4. Read `13_DATA_SCHEMA.md`.
5. Build project data first.
6. Build static version before map engine.
7. Add animations last.
8. Run QA checklist from `18_QA_CHECKLISTS.md`.

</agent_workflow>

<thought>
Use this internal placeholder only to plan implementation steps. Do not reveal it to the end user. Summarize decisions in normal output.
</thought>

<strict_rules>

- Do not hardcode project content inside UI components.
- Do not remove fallback navigation.
- Do not fake metrics.
- Do not use official company logos without explicit permission.
- Do not copy official transit maps.
- Do not make WebGL required for basic content access.
- Do not create animations that ignore reduced-motion preferences.

</strict_rules>

<code_generation_contract>

When generating code, follow this structure:

```yaml
code_rules:
  language: TypeScript
  components: React functional components
  styling: Tailwind CSS
  animation: Motion for React
  content: typed data files or MDX
  accessibility: required
  responsive: required
```

</code_generation_contract>

<output_format_for_agent_updates>

```md
## What I changed
- ...

## Files touched
- ...

## Important decisions
- ...

## Next step
- ...
```

</output_format_for_agent_updates>

<parser_safety>

- Keep JSON blocks valid.
- Keep YAML front matter valid.
- Do not nest triple backticks inside triple backticks without escaping.
- Do not strip XML-like tags.
- Do not replace placeholders unless values are provided.

</parser_safety>
