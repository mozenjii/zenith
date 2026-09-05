import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { SignalField } from "@/components/visual/SignalField";
import { coveredModuli, preprint, verification } from "@/data/research";

/**
 * The research band, and the one place on the site with expensive motion.
 *
 * The instrument behind this is P(n,3) itself — the actual graph the paper is
 * about — cycling through the four divisibility families the certificates
 * cover. It earns its place by being the finding rather than an illustration of
 * it, and it is captioned in text immediately beside it, so a reader never has
 * to guess what they are looking at.
 *
 * Everything the animation shows is also stated in words below it. Nothing here
 * depends on the canvas rendering, or on JavaScript at all.
 */
export function ResearchBand() {
  return (
    <section
      id="research"
      className="relative isolate overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] px-5 py-20 sm:px-8 lg:py-28"
      aria-labelledby="research-title"
    >
      <SignalField scene="petersen" className="-z-10 opacity-[0.55]" speed={0.9} fade="edges" />

      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label text-[var(--warm)]">
              Preprint · not yet submitted
            </p>

            <h2 id="research-title" className="display-title mt-5 text-[clamp(1.375rem,2.6vw,1.875rem)]">
              Weighted Fourier certificates for maximum nullity in generalized Petersen graphs
            </h2>

            <p className="prose-measure mt-6 text-[1.0625rem] leading-8 text-[var(--text-dim)]">
              {preprint.plainSummary}
            </p>

            <p className="prose-measure mt-5 text-[0.9375rem] leading-8 text-[var(--text-dim)]">
              The shape rotating behind this section is{" "}
              <code className="math">P(n,3)</code> — the graph the paper is about. Its outer cycle,
              spokes, and step-3 inner chords are drawn exactly as defined, and{" "}
              <code className="math">n</code> cycles through{" "}
              <span className="mono text-[var(--warm)]">{coveredModuli.join(", ")}</span>: the four
              divisibility families for which the certificates prove{" "}
              <code className="math">M(P(n,3)) = Z(P(n,3)) = 8</code>.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/research" className="btn btn-warm">
                Read the paper <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href={preprint.pdf} className="btn btn-ghost" download>
                <Download className="h-4 w-4" aria-hidden /> PDF, {preprint.pages} pages
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="panel bg-[color-mix(in_srgb,var(--panel)_86%,transparent)] p-6">
              <p className="label text-[var(--text-dim)]">Verification shipped with it</p>
              <dl className="mt-5 grid gap-5">
                {verification.map((item) => (
                  <div key={item.label} className="border-b border-[var(--line)] pb-4 last:border-0 last:pb-0">
                    <dt className="label-sm text-[var(--text-mute)]">{item.label}</dt>
                    <dd className="mono mt-1 text-sm text-[var(--text)]">{item.value}</dd>
                    <dd className="label-sm mt-1 text-[var(--text-mute)]">{item.source}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
