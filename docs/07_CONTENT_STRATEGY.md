---
version: 1.0.0
file_role: content_strategy
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# Content Strategy

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<voice>
Confident, direct, ambitious, technical, and human. Avoid over-polished corporate writing. Use proof instead of adjectives.
</voice>

<core_message>
I am a CS builder who can work across systems, product, AI/data, UI, and execution. My portfolio is organized around proof-of-work because startup teams care about signal, speed, and judgment.
</core_message>

<copy_rules>

| Avoid | Use Instead |
|---|---|
| passionate about technology | building useful systems |
| worked on a project | built / shipped / designed / debugged |
| familiar with React | built interfaces using React |
| team player | collaborated under time pressure |
| problem solver | debugged X, redesigned Y, improved Z |
| AI enthusiast | built AI workflows / trained models / designed pipelines |

</copy_rules>

<startup_lingo_library>

Use these naturally:

- proof-of-work
- signal
- traction
- velocity
- shipped
- built in public
- technical judgment
- tradeoff
- founder mode
- diligence
- memo
- roadmap
- feedback loop
- GTM only if discussing market/product
- architecture
- leverage
- execution risk

Do not overuse:

- disrupt
- unicorn
- moonshot
- 10x
- stealth
- world-changing
- revolutionary

</startup_lingo_library>

<main_sections_copy>

## Hero

```md
# A Bay Area-inspired signal map of my proof-of-work.
Projects are mapped by what they prove: what I built, what broke, what shipped, and what I learned.
```

## Signal Legend

```md
Every node is a signal. Blue means systems. Teal means AI/data. Gold means product polish. Green means proof. Orange means thesis.
```

## Builder Memo Preview

```md
I like software that sits close to real workflows: messy data, unclear users, broken assumptions, and systems that need to become useful fast.
```

## Resume CTA

```md
Need the quick version? Open the recruiter view or download the one-page resume.
```

</main_sections_copy>

<project_summary_formula>

```md
Built {{project_name}}, a {{type_of_system}} for {{target_user/problem}}, using {{stack}}. The strongest signal is {{proof_signal}}, because {{why_it_matters}}.
```

</project_summary_formula>

<proof_metrics_guidelines>

Allowed metrics:

- commits
- endpoints built
- database tables/views/procedures
- screens designed
- model accuracy only if true and documented
- users/testers only if true
- demo/video availability
- project duration
- competition placement
- completed modules
- performance improvement if measured

Disallowed/fake metrics:

- users you did not actually have
- revenue you did not generate
- internships you did not complete
- company logos you are not affiliated with
- exaggerated AI claims

</proof_metrics_guidelines>

<about_page_as_memo>

Use this structure instead of a generic About page:

```md
# Builder Memo

## What I believe
Software should prove something: a workflow improved, a system built, a user understood, or a hard concept made real.

## What I build
Full-stack systems, AI/data workflows, product interfaces, and technical projects that connect computer science fundamentals to real use cases.

## How I work
I move from problem → prototype → architecture → demo → iteration. I care about clarity, speed, and tradeoffs.

## What I am looking for
Startup engineering, AI product, full-stack, backend, or product-minded technical teams where I can build close to users and founders.
```

</about_page_as_memo>
