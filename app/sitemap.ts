import type { MetadataRoute } from "next";
import { siteUrl as baseUrl } from "@/config/site";
import { projects } from "@/data/projects";

/**
 * Routes here must match the real route tree. It previously listed /projects,
 * /memo and /resume, all of which are now redirects — submitting redirects to
 * a search engine wastes crawl budget and is a slow way to lose indexing.
 */
/*
  Required by `output: "export"`.

  Next treats a metadata route as a route handler, and a route handler is
  dynamic by default — so under a static export it refuses to build rather than
  guess. Both of these are pure functions of data checked into the repository,
  so declaring them static is a statement of fact, not a workaround.
*/
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = ["", "/work", "/research", "/about", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    priority: path === "" ? 1 : 0.8
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified,
    priority: 0.6
  }));

  return [...routes, ...projectRoutes];
}
