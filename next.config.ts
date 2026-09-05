import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Lets a verification build write somewhere other than `.next`, so it can run
   * without disturbing a dev server that is already using it:
   *   NEXT_DIST_DIR=.next-verify npm run build
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },

  /**
   * The 2026-09 restructure renamed three routes. These are permanent
   * redirects rather than deletions because the old paths may already be in a
   * resume, an application form, or someone's bookmarks — and a 404 from a link
   * on a job application is an expensive way to save four lines of config.
   *
   *   /projects       → /work
   *   /projects/:slug → /work/:slug
   *   /resume, /memo  → /about        (both were folded into one page)
   *
   * Three of the four project slugs were kept identical so the wildcard covers
   * them. Priora's changed, because "priora-ai-prior-authorization" described
   * the prediction-era prototype rather than what the project became, so it
   * gets its own rule ahead of the wildcard.
   */
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      {
        source: "/projects/priora-ai-prior-authorization",
        destination: "/work/priora-prior-authorization-control-plane",
        permanent: true
      },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
      { source: "/resume", destination: "/about", permanent: true },
      { source: "/memo", destination: "/about", permanent: true }
    ];
  }
};

export default nextConfig;
