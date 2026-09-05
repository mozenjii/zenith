import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ResearchBand } from "@/components/home/ResearchBand";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { TopNav } from "@/components/navigation/TopNav";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Section } from "@/components/ui/Section";
import { currentRole, roles } from "@/data/career";
import { awards, educationLadder, profile } from "@/data/profile";
import { flagshipProjects } from "@/data/projects";

/**
 * Five sections, each with one heading and one job:
 *
 *   hero      who this is, and the one place to go next
 *   work      three flagship projects, one uniform card shape
 *   research  the preprint, and the only expensive motion on the site
 *   record    education and roles, chunked
 *   contact   one action
 *
 * Read the headings alone, top to bottom, and they say what the page contains.
 * That is the check DESIGN.md sets, and it is why the section furniture is gone.
 */
export default function Home() {
  const recentRoles = roles.slice(0, 4);

  return (
    <>
      <TopNav />

      <main id="main">
        <Hero />

        <Section
          id="work"
          title="Selected work"
          context="Three projects that carry the most weight. Each card states the claim; the case study behind it carries the evidence, and the limitations."
          aside={
            <Link href="/work" className="nav-link inline-flex items-center gap-1.5 text-[var(--red)]">
              All work <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          }
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {flagshipProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>

        <ResearchBand />

        <Section
          id="record"
          title="Record"
          context="Education, then roles. Four of these were founding roles — I tend to start the thing rather than join it."
          tone="surface"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <h3 className="label text-[var(--text-dim)]">Education</h3>
              <ol className="mt-6 grid gap-6">
                {educationLadder.map((stage) => (
                  <li key={stage.stage} className="border-b border-[var(--line)] pb-6 last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="text-[1.0625rem] text-[var(--text)]">{stage.stage}</p>
                      <p className="mono text-sm text-[var(--yellow)]">{stage.result}</p>
                    </div>
                    <p className="label-sm mt-1.5 text-[var(--text-mute)]">
                      {stage.institution} · {stage.period}
                    </p>
                    {stage.usEquivalent ? (
                      <p className="mt-2 text-[0.8125rem] leading-6 text-[var(--text-mute)]">
                        {stage.usEquivalent}
                      </p>
                    ) : null}
                    {stage.distinctions.length ? (
                      <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">
                        {stage.distinctions.join(" · ")}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>

              <h3 className="label mt-10 text-[var(--text-dim)]">Awards</h3>
              <ul className="mt-4 grid gap-2">
                {awards.map((award) => (
                  <li key={award.label} className="text-sm leading-7 text-[var(--text-dim)]">
                    <span className="text-[var(--text)]">{award.label}</span> — {award.detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <h3 className="label text-[var(--text-dim)]">Roles</h3>
              <ol className="mt-6 grid gap-6">
                {recentRoles.map((role) => (
                  <li key={role.id} className="border-b border-[var(--line)] pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2.5">
                      {role.current ? <span className="mark bg-[var(--red)]" aria-hidden /> : null}
                      <p className="text-[1.0625rem] text-[var(--text)]">{role.title}</p>
                    </div>
                    <p className="label-sm mt-1.5 text-[var(--text-mute)]">
                      {role.org} · {role.period}
                    </p>
                    {role.metrics?.length ? (
                      <ul className="mt-3 grid gap-1.5">
                        {role.metrics.slice(0, 3).map((metric) => (
                          <li key={metric} className="mono text-[0.8125rem] text-[var(--text-dim)]">
                            {metric}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ol>

              <Link
                href="/about"
                className="nav-link mt-6 inline-flex items-center gap-1.5 text-[var(--red)]"
              >
                Full record <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </Section>

        <Section
          id="contact"
          title="Get in touch"
          context={`Currently ${currentRole.title.toLowerCase()} at ${currentRole.org}. Open to conversations about engineering roles, research, and collaboration.`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {profile.email} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              LinkedIn
            </a>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
