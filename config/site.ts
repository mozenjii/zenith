/**
 * Where this site lives.
 *
 * A committed constant rather than an environment variable, because the
 * canonical URL is neither a secret nor environment-specific — and because
 * `.gitignore` excludes `.env*`, so an env file would be missing from exactly
 * the build that matters, the one running in CI. The previous arrangement fell
 * back to `http://localhost:3000` for Open Graph and `https://example.com` for
 * the sitemap, and the first static export duly emitted both: every social
 * preview would have pointed at localhost, and the sitemap at a domain nobody
 * owns.
 *
 * `NEXT_PUBLIC_SITE_URL` still overrides it, which is what a preview deployment
 * on a different hostname needs.
 *
 * ── Changing this ───────────────────────────────────────────────────────────
 * On a custom domain, change this one line and redeploy. Nothing else reads a
 * hostname: `app/layout.tsx` derives `metadataBase` from it and `app/sitemap.ts`
 * derives every entry from it. `scripts/postbuild.mjs` fails the build if a
 * placeholder host ever reaches the exported output again.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohibahmad.pages.dev"
).replace(/\/$/, "");
