import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { TopNav } from "@/components/navigation/TopNav";
import { categoryStyles } from "@/data/categories";
import { getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return { title: project.title, description: project.shortPitch };
}

const architectureLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Data",
  aiMl: "AI / ML",
  auth: "Auth",
  deployment: "Deployment",
  diagrams: "Diagrams"
};

/**
 * One case study, in a fixed reading order that never varies between projects:
 *
 *   claim → problem → what was built → architecture → the hard part →
 *   the tradeoff → evidence → limits → next
 *
 * A reader who has read one of these knows where to look in all of them, which
 * is the whole point of a uniform template. `limits` is not optional and is
 * given the same weight as the evidence, because that is the site's content
 * doctrine rather than a stylistic choice.
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const category = categoryStyles[project.signalType];
  const architectureEntries = Object.entries(project.architecture).filter(
    ([, items]) => Array.isArray(items) && items.length > 0
  ) as Array<[string, string[]]>;

  return (
    <>
      <TopNav />

      <main id="main">
        <header className="border-b border-[var(--line)] px-5 pb-14 pt-10 sm:px-8 lg:pt-14">
          <div className="mx-auto max-w-[1240px]">
            <Link href="/work" className="nav-link inline-flex items-center gap-1.5 text-[var(--text-mute)] hover:text-[var(--text)]">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All work
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="label inline-flex items-center gap-2 text-[var(--text-dim)]">
                <span className="mark" style={{ background: category.color }} aria-hidden />
                {category.label}
              </span>
              <span className="label-sm text-[var(--text-mute)]">
                {project.year} · {project.status} · {project.visibility.replace("-", " ")}
              </span>
              {project.license ? (
                <span className="label-sm text-[var(--text-mute)]">{project.license}</span>
              ) : null}
            </div>

            <h1 className="display mt-5 text-[clamp(2.5rem,6vw,4rem)]">{project.title}</h1>
            <p className="prose-measure mt-5 text-[1.125rem] leading-8 text-[var(--text-dim)]">
              {project.shortPitch}
            </p>

            {(project.links.github || project.links.liveDemo) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.liveDemo ? (
                  <a href={project.links.liveDemo} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <ExternalLink className="h-4 w-4" aria-hidden /> Visit the live site
                  </a>
                ) : null}
                {project.links.github ? (
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <GitBranch className="h-4 w-4" aria-hidden /> Source
                  </a>
                ) : null}
                {project.links.docs ? (
                  <a href={project.links.docs} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    Project status <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="grid gap-12 lg:col-span-7">
            <section aria-labelledby="problem-title">
              <h2 id="problem-title" className="label text-[var(--text-dim)]">
                The problem
              </h2>
              <p className="prose-measure mt-4 text-[1.0625rem] leading-8">{project.problem}</p>
              <p className="prose-measure mt-4 text-[0.9375rem] leading-7 text-[var(--text-dim)]">
                <span className="text-[var(--text-mute)]">For: </span>
                {project.user}
              </p>
            </section>

            <section aria-labelledby="built-title">
              <h2 id="built-title" className="label text-[var(--text-dim)]">
                What I built
              </h2>
              <p className="prose-measure mt-4 text-[1.0625rem] leading-8">{project.whatIBuilt}</p>
            </section>

            <section aria-labelledby="hard-title">
              <h2 id="hard-title" className="label text-[var(--text-dim)]">
                The hard part
              </h2>
              <p className="prose-measure mt-4 text-[1.0625rem] leading-8">{project.hardPart}</p>
            </section>

            <section aria-labelledby="tradeoff-title">
              <h2 id="tradeoff-title" className="label text-[var(--text-dim)]">
                The tradeoff
              </h2>
              <p className="prose-measure mt-4 text-[1.0625rem] leading-8">{project.tradeoff}</p>
            </section>

            {project.whatBroke ? (
              <section aria-labelledby="broke-title">
                <h2 id="broke-title" className="label text-[var(--text-dim)]">
                  What went wrong
                </h2>
                <p className="prose-measure mt-4 text-[1.0625rem] leading-8">{project.whatBroke}</p>
              </section>
            ) : null}

            {/*
              Limits sit in the main column at full weight, not in a footnote.
              A case study without them is incomplete, per DESIGN.md.
            */}
            <section aria-labelledby="limits-title">
              <h2 id="limits-title" className="label text-[var(--alert)]">
                What this does not do
              </h2>
              <ul className="prose-measure mt-4 grid gap-4">
                {project.limits.map((limit) => (
                  <li
                    key={limit}
                    className="border-l-2 border-l-[var(--line-bright)] pl-5 text-[0.9375rem] leading-8 text-[var(--text-dim)]"
                  >
                    {limit}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="grid h-fit gap-8 lg:col-span-4 lg:col-start-9">
            <section className="panel p-6" aria-labelledby="evidence-title">
              <h2 id="evidence-title" className="label text-[var(--text-dim)]">
                Evidence
              </h2>
              <dl className="mt-5 grid gap-4">
                {project.proofMetrics.map((metric) => (
                  <div key={metric.label} className="border-b border-[var(--line)] pb-4 last:border-0 last:pb-0">
                    <dt className="label-sm text-[var(--text-mute)]">{metric.label}</dt>
                    <dd className="mono mt-1 text-sm text-[var(--text)]">{metric.value}</dd>
                    {metric.evidence ? (
                      <dd className="mt-1 text-[0.8125rem] leading-6 text-[var(--text-mute)]">{metric.evidence}</dd>
                    ) : null}
                  </div>
                ))}
              </dl>
            </section>

            <section className="panel p-6" aria-labelledby="stack-title">
              <h2 id="stack-title" className="label text-[var(--text-dim)]">
                Stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {architectureEntries.length ? (
              <section className="panel p-6" aria-labelledby="architecture-title">
                <h2 id="architecture-title" className="label text-[var(--text-dim)]">
                  Architecture
                </h2>
                <dl className="mt-5 grid gap-4">
                  {architectureEntries.map(([key, items]) => (
                    <div key={key}>
                      <dt className="label-sm text-[var(--text-mute)]">{architectureLabels[key] ?? key}</dt>
                      <dd>
                        <ul className="mt-1.5 grid gap-1">
                          {items.map((item) => (
                            <li key={item} className="text-[0.8125rem] leading-6 text-[var(--text-dim)]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {project.nextVersion.length ? (
              <section className="panel p-6" aria-labelledby="next-title">
                <h2 id="next-title" className="label text-[var(--text-dim)]">
                  Next
                </h2>
                <ul className="mt-4 grid gap-2.5">
                  {project.nextVersion.map((item) => (
                    <li key={item} className="text-[0.8125rem] leading-6 text-[var(--text-dim)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
