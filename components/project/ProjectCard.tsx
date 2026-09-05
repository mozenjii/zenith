import { ArrowUpRight, GitBranch, Lock } from "lucide-react";
import Link from "next/link";
import { categoryStyles } from "@/data/categories";
import type { Project } from "@/data/types";

/**
 * One uniform card shape for every project, with the same slots in the same
 * order every time: kind, status, title, one-line claim, exactly three metrics,
 * then one link row.
 *
 * "A reader learns the pattern once" is the rule in DESIGN.md. The previous
 * grid mixed feature cards, plain cards, and rotated metric stickers, so the
 * eye had to re-parse every tile and could not tell a project from an ornament.
 *
 * Metrics are capped at three deliberately. The card carries the claim; the
 * case study carries the evidence.
 */
export function ProjectCard({ project }: { project: Project }) {
  const category = categoryStyles[project.signalType];
  const metrics = project.proofMetrics.slice(0, 3);

  return (
    <article className="panel panel-link group relative flex flex-col p-6">
      <div className="flex items-center gap-3">
        <span className="mark" style={{ background: category.color }} aria-hidden />
        <span className="label-sm text-[var(--text-mute)]">{category.label}</span>
        <span className="label-sm ml-auto text-[var(--text-mute)]">
          {project.year} · {project.status}
        </span>
      </div>

      <h3 className="display mt-5 text-[1.75rem]">
        <Link href={`/work/${project.slug}`} className="hover:text-[var(--accent)]">
          {/* The whole card is the target; this span makes it so without
              nesting interactive elements, which would break tab order. */}
          <span className="absolute inset-0" aria-hidden />
          {project.title}
        </Link>
      </h3>

      <p className="mt-3 text-[0.9375rem] leading-7 text-[var(--text-dim)]">{project.shortPitch}</p>

      {metrics.length ? (
        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-5">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="label-sm text-[var(--text-mute)]">{metric.label}</dt>
              <dd className="mono mt-1 text-sm text-[var(--text)]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-6 flex items-center gap-4 pt-1">
        <span className="label-sm inline-flex items-center gap-1.5 text-[var(--accent)]">
          Case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
        {project.links.github ? (
          <span className="label-sm inline-flex items-center gap-1.5 text-[var(--text-mute)]">
            <GitBranch className="h-3.5 w-3.5" aria-hidden /> Source
          </span>
        ) : null}
        {project.visibility === "private" ? (
          <span className="label-sm inline-flex items-center gap-1.5 text-[var(--text-mute)]">
            <Lock className="h-3.5 w-3.5" aria-hidden /> Private
          </span>
        ) : null}
      </div>
    </article>
  );
}
