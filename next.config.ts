import type { NextConfig } from "next";

/**
 * The site is a static export, and that is a deliberate architectural choice
 * rather than a limitation worked around.
 *
 * It has no server-side behavior at all: no route handlers, no middleware, no
 * `cookies()` or `headers()`, no revalidation, no dynamic rendering. Every one
 * of its routes prerenders. Deploying a Node or Worker runtime for that would
 * mean running a server whose only job is to hand back HTML that was already
 * written to disk at build time — and, on Cloudflare, permanently coupling the
 * deploy to an adapter that has to chase every Next.js release.
 *
 * Two Next features do not survive `output: "export"`, and both are handled
 * rather than dropped:
 *
 *   redirects()   Ignored in export mode. The five permanent redirects from the
 *                 2026-09 restructure now live in `config/redirects.json`, and
 *                 `scripts/prebuild.mjs` emits `public/_redirects` from it —
 *                 the format Cloudflare's static host reads natively. Declaring
 *                 them here as well would be dead code that looks live.
 *
 *   next/image    No optimizer without a server. Rather than
 *                 `images: { unoptimized: true }`, which ships the 1200x1600
 *                 original to a phone rendering it at 420px, the variants are
 *                 generated at build time by `scripts/build-images.mjs` and
 *                 served through `components/ui/Portrait.tsx`.
 *
 * If this site ever grows something genuinely dynamic, the move is to drop
 * `output` and deploy via `@opennextjs/cloudflare`, restoring `redirects()`
 * here at the same time. See config/redirects.README.md.
 */
const nextConfig: NextConfig = {
  output: "export",

  /**
   * Lets a verification build write somewhere other than `.next`, so it can run
   * without disturbing a dev server that is already using it:
   *   NEXT_DIST_DIR=.next-verify npm run build
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  /**
   * Emit `/work/foo/index.html` rather than `/work/foo.html`.
   *
   * Cloudflare's static host will serve either, but the directory form is what
   * makes the exported `out/` directory browsable with any plain file server —
   * useful for checking a build locally before it goes anywhere.
   */
  trailingSlash: false,

  experimental: {
    optimizePackageImports: ["lucide-react"]
  }
};

export default nextConfig;
