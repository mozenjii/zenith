---
version: 1.0.0
file_role: qa_checklists
project: Bay Area Signal Map Portfolio
llm_parse_mode: strict
---

# QA Checklists

<agent_note>
This document uses YAML front matter, pseudo-XML sections, fenced schemas, and {{placeholders}} so an implementation agent can parse it safely. Do not expose private reasoning. Any <thought> block is a planning placeholder, not user-visible chain of thought.
</agent_note>

<content_checklist>

- [ ] Hero clearly explains the concept in one glance.
- [ ] Site does not imply false SF employment/location.
- [ ] Every project has a clear proof signal.
- [ ] Every project has a screenshot or meaningful visual.
- [ ] Every major project has a hard part and tradeoff.
- [ ] Resume link works.
- [ ] Contact link works.
- [ ] Startup lingo feels natural, not forced.
- [ ] No fake metrics.

</content_checklist>

<ux_checklist>

- [ ] User can understand what to do in first 5 seconds.
- [ ] Nodes are clickable/tappable.
- [ ] Drawer opens and closes smoothly.
- [ ] Mode switcher changes content priority.
- [ ] Timeline slider is understandable.
- [ ] Command palette works.
- [ ] Traditional navigation exists.
- [ ] Mobile bottom sheet works.

</ux_checklist>

<visual_checklist>

- [ ] Map is premium and dark/foggy.
- [ ] Markers are readable.
- [ ] Text contrast is strong.
- [ ] Glass panels are readable over map.
- [ ] No clutter around map.
- [ ] Icons are consistent.
- [ ] Open Graph image matches brand.

</visual_checklist>

<animation_checklist>

- [ ] Node pulse is subtle.
- [ ] Route draw animation supports meaning.
- [ ] Drawer transition is fast.
- [ ] Page transitions do not feel slow.
- [ ] Reduced motion disables heavy animation.
- [ ] Animations do not hurt readability.

</animation_checklist>

<technical_checklist>

- [ ] TypeScript passes.
- [ ] Build passes.
- [ ] No console errors.
- [ ] Map token handled through env variable.
- [ ] Images optimized.
- [ ] Videos lazy-loaded.
- [ ] SEO metadata exists.
- [ ] Sitemap and robots exist.
- [ ] Links verified.

</technical_checklist>

<accessibility_checklist>

- [ ] Keyboard navigation works.
- [ ] Focus states visible.
- [ ] No keyboard trap.
- [ ] Alt text exists.
- [ ] Captions or descriptions for videos.
- [ ] Color is not the only category indicator.
- [ ] Motion respects reduced-motion setting.
- [ ] Contrast meets AA target where practical.

</accessibility_checklist>

<final_launch_checklist>

- [ ] Test desktop Chrome.
- [ ] Test desktop Firefox/Safari if possible.
- [ ] Test mobile width.
- [ ] Test slow network.
- [ ] Test resume download.
- [ ] Test GitHub links.
- [ ] Test contact form/email link.
- [ ] Share with 2–3 people for feedback.

</final_launch_checklist>
