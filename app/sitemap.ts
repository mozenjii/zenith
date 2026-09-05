import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Routes here must match the real route tree. It previously listed /projects,
 * /memo and /resume, all of which are now redirects — submitting redirects to
 * a search engine wastes crawl budget and is a slow way to lose indexing.
 */
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
