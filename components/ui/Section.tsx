import type { ReactNode } from "react";

/**
 * One section, one heading, and at most one line of context.
 *
 * The previous build stacked an index number, an eyebrow, a title and a
 * standfirst above every section — four lines of furniture, three of which
 * carried no information. DESIGN.md caps this at a title plus optional context,
 * and this component is what enforces it: there is no prop for an eyebrow or an
 * index, so neither can come back without an explicit decision.
 */
export function Section({
  id,
  title,
  context,
  aside,
  children,
  tone = "bg",
  className = ""
}: {
  id?: string;
  title: string;
  /** One line, only where it genuinely helps the reader. */
  context?: string;
  /** A single secondary control, right-aligned against the title. */
  aside?: ReactNode;
  children: ReactNode;
  tone?: "bg" | "surface";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-[var(--line)] px-5 py-20 sm:px-8 lg:py-28 ${
        tone === "surface" ? "bg-[var(--surface)]" : "bg-[var(--bg)]"
      } ${className}`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 id={id ? `${id}-title` : undefined} className="display text-[2rem] sm:text-[2.5rem]">
            {title}
          </h2>
          {aside}
        </div>
        {context ? <p className="prose-measure mt-4 text-[1.0625rem] leading-8 text-[var(--text-dim)]">{context}</p> : null}
        <div className="mt-10 lg:mt-12">{children}</div>
      </div>
    </section>
  );
}
