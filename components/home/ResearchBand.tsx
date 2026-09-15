import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { SignalField } from "@/components/visual/SignalField";
import { coveredModuli, modulusColors, preprint, verification } from "@/data/research";

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
      <SignalField scene="petersen" className="-z-10 opacity-[var(--field-opacity)]" speed={0.9} fade="edges" />

      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label text-[var(--warm)]">
              Preprint · not yet submitted
            </p>

            {/* From the data, not typed here. This heading held the previous
                title for three days after the manuscript was revised, which is
                exactly the drift a hardcoded string invites. */}
            <h2 id="research-title" className="display-title mt-5 text-[clamp(1.375rem,2.6vw,1.875rem)]">
              {preprint.title}
            </h2>

            <p className="prose-measure mt-6 text-[1.0625rem] leading-8 text-[var(--text-dim)]">
              {preprint.plainSummary}
            </p>

            {/*
              The caption is what turns the animation from decoration into
              evidence, so it names the moduli in the colors the instrument is
              using at that moment. A reader who watches one full cycle and
              reads this line has been told the site's entire color system
              without ever being shown a swatch.
            */}
            <p className="prose-measure mt-5 text-[0.9375rem] leading-8 text-[var(--text-dim)]">
              The shape rotating behind this section is{" "}
              <code className="math">P(n,3)</code> — the graph the paper is about. Its outer cycle,
              spokes, and step-3 inner chords are drawn exactly as defined, and{" "}
              <code className="math">n</code> cycles through{" "}
              {coveredModuli.map((modulus, index) => (
                <span key={modulus}>
                  <span className="mono" style={{ color: `var(${modulusColors[modulus].token})` }}>
                    {modulus}
                  </span>
                  {index < coveredModuli.length - 1 ? ", " : ""}
                </span>
              ))}
              : the four divisibility families for which the certificates prove{" "}
              <code className="math">M(P(n,3)) = Z(P(n,3)) = 8</code>. The chords change color with{" "}
              <code className="math">n</code>, and every color on this site means one of these four.
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
