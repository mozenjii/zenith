import type { Metadata } from "next";
import { ArrowUpRight, Lock } from "lucide-react";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { TopNav } from "@/components/navigation/TopNav";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Section } from "@/components/ui/Section";
import { RootsSignature } from "@/components/visual/RootsSignature";
import { pageModulus } from "@/components/visual/rootsOfUnity";
import { archive, flagshipProjects, privateWork, supportingProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { uniqueStack } from "@/data/stack";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Mohib Ahmad — a rules-as-code compiler, a prior-authorization control plane, a shipped AI services company, and supporting systems work."
};

/**
 * Three tiers, in descending prominence, each with its own heading:
 *
 *   flagship    full case study, three per row
 *   supporting  real but smaller, same card shape
 *   archive     coursework, listed as plain rows
 *
 * Tiering is the progressive-disclosure rule in DESIGN.md doing its job. The
 * previous index gave a C++ card game and a regulation compiler the same visual
 * weight, which made the reader do the sorting.
 */
export default function WorkPage() {
  return (
    <>
      <TopNav />

      <main id="main">
        <header className="px-5 pb-4 pt-14 sm:px-8 lg:pt-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex items-start justify-between gap-8">
              <h1 className="display text-[clamp(2.5rem,6vw,4rem)]">Work</h1>
              {/* The page's signature mark. 24 is this page's modulus, so
                  everything yellow below — the founding-role counts, the
                  private-work tier — is reading from the same assignment. */}
              <RootsSignature
                modulus={pageModulus.work}
                size={104}
                className="mt-1 hidden shrink-0 sm:block"
              />
            </div>
            <p className="prose-measure mt-6 text-[1.0625rem] leading-8 text-[var(--text-dim)]">
              Ordered by weight, not by date. Every project states what it does not do as clearly as
              what it does — the limitations are on each case study, not hidden behind the pitch.
            </p>
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--line)] pt-6">
              <div>
                <dt className="label-sm text-[var(--text-mute)]">Case studies</dt>
                <dd className="mono mt-1 text-sm">{flagshipProjects.length + supportingProjects.length}</dd>
              </div>
              <div>
                <dt className="label-sm text-[var(--text-mute)]">Distinct technologies</dt>
                <dd className="mono mt-1 text-sm">{uniqueStack.length}</dd>
              </div>
              <div>
                <dt className="label-sm text-[var(--text-mute)]">Public repositories</dt>
                <dd className="mono mt-1 text-sm">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-[var(--line-bright)] underline-offset-4 hover:text-[var(--accent)]"
                  >
                    12 on {profile.githubHandle}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <Section id="flagship" title="Flagship" context="The three that carry the most weight.">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {flagshipProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>

        <Section
          id="supporting"
          title="Supporting"
          context="Smaller, real, and documented to the same standard."
          tone="surface"
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supportingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>

        <Section
          id="private"
          title="Private work"
          context="Closed source, so most of these have no repository to open — but where the result is public, it is linked. A portfolio judged only on public repositories understates the set."
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {privateWork.map((item) => (
              <li key={item.name} className="panel panel-link relative flex items-start gap-3 p-4">
                {/* A padlock is wrong on an entry whose result is live and
                    linked; that one gets an outbound arrow instead. */}
                {item.href ? (
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]" aria-hidden />
                ) : (
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-mute)]" aria-hidden />
                )}
                <div>
                  {/* Not mono: these are display names now, and monospace would
                      make them read as repository identifiers again. */}
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.9375rem] text-[var(--text)] hover:text-[var(--red)]"
                    >
                      <span className="absolute inset-0" aria-hidden />
                      {item.name}
                    </a>
                  ) : (
                    <p className="text-[0.9375rem] text-[var(--text)]">{item.name}</p>
                  )}
                  <p className="mt-1 text-[0.8125rem] leading-6 text-[var(--text-dim)]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="archive"
          title="Coursework and specializations"
          context="Listed for completeness, at low prominence. Calling these product work would devalue everything above."
          tone="surface"
        >
          <ul className="grid gap-px overflow-hidden rounded border border-[var(--line)] bg-[var(--line)]">
            {archive.map((entry) => (
              <li key={entry.name} className="bg-[var(--panel)]">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-[var(--panel-high)]"
                >
                  <span className="text-[0.9375rem] text-[var(--text)]">{entry.name}</span>
                  <span className="label-sm text-[var(--text-mute)]">{entry.language}</span>
                  <span className="ml-auto flex items-center gap-1.5 text-[0.8125rem] text-[var(--text-dim)]">
                    {entry.note}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--text-mute)]" aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
