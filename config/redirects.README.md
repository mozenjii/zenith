# Redirects — one source, two consumers

`redirects.json` is the only place these are written down.

The 2026-09 restructure renamed three routes. They are permanent (301) rather
than deletions because the old paths may already be in a resume, an application
form, or a bookmark, and a 404 from a link on a job application is an expensive
way to save five lines of config.

    /projects       -> /work
    /projects/:slug -> /work/:slug
    /resume, /memo  -> /about        (both folded into one page)

Three of the four project slugs were kept identical, so the `:slug` rule covers
them. Priora's changed, because `priora-ai-prior-authorization` described the
prediction-era prototype rather than what the project became, so it gets its own
rule *ahead of* the wildcard. Order is significant in both consumers.

## Why this file exists at all

The site ships as `output: "export"` — fully static, because it has no server
behavior to run. Next.js **ignores `redirects()` from `next.config.ts` in export
mode**, so declaring them there would be silent dead code.

Instead `scripts/prebuild.mjs` writes `public/_redirects`, which is the format
Cloudflare's static-asset host reads natively. Both `*` -> `:splat` and named
`:placeholder` capture are supported there, so the rules translate one to one.

**If this site is ever moved off Cloudflare**, `_redirects` stops being read and
these five routes start 404ing. The replacement is host-specific: `vercel.json`
on Vercel, `netlify.toml` on Netlify, or restoring `redirects()` in
`next.config.ts` and dropping `output: "export"`. Whatever the host, generate it
from this file rather than retyping the list.
