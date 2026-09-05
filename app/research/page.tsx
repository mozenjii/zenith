import type { Metadata } from "next";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { TopNav } from "@/components/navigation/TopNav";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import {
  coveredModuli,
  preprint,
  rationalCertificates,
  researchTracks,
  verification,
  zeroForcingTable
} from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "A preprint on weighted Fourier certificates for maximum nullity in generalized Petersen graphs, with the verification code that ships alongside it."
};

export default function ResearchPage() {
  return (
    <>
      <TopNav />

      <main id="main">
        <header className="px-5 pb-14 pt-14 sm:px-8 lg:pt-20">
          <div className="mx-auto max-w-[1240px]">
            {/*
              The status line is the first thing on the page, on purpose.
              This manuscript is complete and not submitted anywhere. Stating
              that before the title is the difference between a portfolio a
              referee trusts and one they stop reading.
            */}
            <p className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-[var(--warm)]">
              <span className="mark bg-[var(--yellow)]" aria-hidden />
              Preprint · complete, not yet posted or submitted
            </p>

            <h1 className="display prose-measure mt-6 text-[clamp(2.25rem,5vw,3.5rem)]">{preprint.title}</h1>

            <p className="mt-6 text-[1.0625rem] text-[var(--text-dim)]">
              {preprint.authors} · Independent Researcher ·{" "}
              <a
                href={profile.orcidUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--line-bright)] underline-offset-4 hover:text-[var(--accent)]"
              >
                ORCID {profile.orcid}
              </a>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={preprint.pdf} className="btn btn-primary" download>
                <Download className="h-4 w-4" aria-hidden /> Download PDF · {preprint.pages} pages
              </a>
              <a href={preprint.supplement} className="btn btn-ghost" download>
                <FileText className="h-4 w-4" aria-hidden /> Verification code
              </a>
            </div>

            {/*
              An explicit statement of what this is not. Anyone arriving from a
              submission system will look for exactly this, and its absence is
              what makes a portfolio claim look inflated.
            */}
            <div className="panel mt-10 max-w-3xl border-l-2 border-l-[var(--warm)] p-5">
              <p className="label text-[var(--text-dim)]">Status, stated plainly</p>
              <p className="mt-3 text-[0.9375rem] leading-7 text-[var(--text-dim)]">
                Finalized {preprint.date} and packaged for {preprint.preparedFor.join(" and ")}. It has{" "}
                <strong className="text-[var(--text)]">not</strong>{" "}
                been posted to arXiv, submitted to a journal, peer-reviewed, or accepted anywhere, and
                it carries no DOI or arXiv identifier.
                The author&rsquo;s ORCID record registers no works. Every internal check it makes of itself
                passes; none of that is peer review, and this page does not present it as such.
              </p>
            </div>
          </div>
        </header>

        <Section id="abstract" title="Abstract" tone="surface">
          <div className="grid gap-10 lg:grid-cols-12">
            <p className="prose-measure text-[1.0625rem] leading-8 text-[var(--text-dim)] lg:col-span-8">
              {preprint.abstract}
            </p>
            <dl className="lg:col-span-3 lg:col-start-10">
              <dt className="label text-[var(--text-dim)]">MSC 2020</dt>
              <dd className="mono mt-2 text-sm text-[var(--text)]">{preprint.msc}</dd>
              <dt className="label mt-6 text-[var(--text-dim)]">Keywords</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {preprint.keywords.map((keyword) => (
                  <span key={keyword} className="tag">
                    {keyword}
                  </span>
                ))}
              </dd>
            </dl>
          </div>
        </Section>

        <Section
          id="results"
          title="What it proves"
          context="Four results. The third and fourth are the ones worth reading twice — one bounds the method itself, and the other generalizes it."
        >
          <ol className="grid gap-5 lg:grid-cols-2">
            {preprint.results.map((result, index) => (
              <li key={result.claim} className="panel flex flex-col p-6">
                <span className="mono text-sm text-[var(--warm)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[1.0625rem] leading-8 text-[var(--text)]">{result.claim}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-[var(--text-dim)]">{result.detail}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="certificates"
          title="The rational certificates"
          context="Fourteen degree-8 products of distinct cyclotomic polynomials were enumerated. Eight are degenerate. These six are what remain — the complete rational part of the construction."
          tone="surface"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                The six valid rational certificates, with weight parameters and minimal modulus
              </caption>
              <thead>
                <tr className="border-b border-[var(--line-bright)]">
                  <th scope="col" className="label-sm py-3 pr-6 font-normal text-[var(--text-mute)]">
                    Cyclotomic factors
                  </th>
                  <th scope="col" className="label-sm py-3 pr-6 font-normal text-[var(--text-mute)]">
                    p
                  </th>
                  <th scope="col" className="label-sm py-3 pr-6 font-normal text-[var(--text-mute)]">
                    q
                  </th>
                  <th scope="col" className="label-sm py-3 pr-6 font-normal text-[var(--text-mute)]">
                    τ
                  </th>
                  <th scope="col" className="label-sm py-3 font-normal text-[var(--text-mute)]">
                    Minimal modulus L
                  </th>
                </tr>
              </thead>
              <tbody>
                {rationalCertificates.map((certificate) => (
                  <tr key={certificate.factors} className="border-b border-[var(--line)]">
                    <td className="mono py-3.5 pr-6 text-sm text-[var(--text)]">{certificate.factors}</td>
                    <td className="mono py-3.5 pr-6 text-sm text-[var(--text-dim)]">{certificate.p}</td>
                    <td className="mono py-3.5 pr-6 text-sm text-[var(--text-dim)]">{certificate.q}</td>
                    <td className="mono py-3.5 pr-6 text-sm text-[var(--text-dim)]">{certificate.tau}</td>
                    <td className="mono py-3.5 text-sm text-[var(--warm)]">{certificate.L}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="prose-measure mt-8 text-[0.9375rem] leading-8 text-[var(--text-dim)]">
            The rational moduli are <span className="mono text-[var(--warm)]">10, 24, 40, 42</span>. The
            certificates prove the result on <span className="mono text-[var(--warm)]">{coveredModuli.join(", ")}</span>{" "}
            — so the modulus-28 certificate is not rational at all, and is genuinely algebraic. Those
            indices have natural density <code className="math">1/6</code>.
          </p>
        </Section>

        <Section
          id="computation"
          title="Computed independently"
          context="Zero forcing numbers for P(n,3), from the exhaustive search in the supplement. It reproduces Krishnan's boundary counterexample rather than assuming it."
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-1.5" role="list" aria-label="Zero forcing numbers by n">
                {zeroForcingTable.map((row) => {
                  const notable = row.n === 12 || row.n === 10;
                  return (
                    <div
                      key={row.n}
                      role="listitem"
                      className={`panel flex w-[76px] flex-col items-center px-2 py-3 ${
                        notable ? "border-[var(--warm)]" : ""
                      }`}
                    >
                      <span className="label-sm text-[var(--text-mute)]">n = {row.n}</span>
                      <span className={`mono mt-1 text-lg ${notable ? "text-[var(--warm)]" : "text-[var(--text)]"}`}>
                        {row.z}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="prose-measure mt-6 text-[0.9375rem] leading-8 text-[var(--text-dim)]">
                <code className="math">Z(P(12,3)) = 7</code> is the counterexample that broke the
                previously published claim, and it falls out of this computation independently. Values
                continue at 8 through <code className="math">n = 27</code>.
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="label text-[var(--text-dim)]">Checks that ship with the paper</p>
              <dl className="mt-5 grid gap-4">
                {verification.map((item) => (
                  <div key={item.label} className="border-b border-[var(--line)] pb-4 last:border-0 last:pb-0">
                    <dt className="label-sm text-[var(--text-mute)]">{item.label}</dt>
                    <dd className="mono mt-1 text-sm text-[var(--text)]">{item.value}</dd>
                    <dd className="label-sm mt-0.5 text-[var(--text-mute)]">{item.source}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        <Section
          id="limits"
          title="What it does not settle"
          context="The paper is explicit about the boundary of its own method, which is the less common half of a result."
          tone="surface"
        >
          <ul className="prose-measure grid gap-5">
            {preprint.limits.map((limit) => (
              <li key={limit} className="border-l-2 border-l-[var(--line-bright)] pl-5 text-[0.9375rem] leading-8 text-[var(--text-dim)]">
                {limit}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="engineering"
          title="Open engineering questions"
          context="Separate from the mathematics. Each of these is grounded in a project in this repository, so it can be traced to code rather than taken on trust."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {researchTracks.map((track) => {
              const project = projects.find((item) => item.id === track.groundedIn);
              return (
                <article key={track.id} className="panel flex flex-col p-6">
                  <p className="label-sm text-[var(--warm)]">{track.area}</p>
                  <h3 className="mt-4 text-[1.0625rem] leading-8 text-[var(--text)]">{track.question}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-7 text-[var(--text-dim)]">{track.approach}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {track.methods.slice(0, 4).map((method) => (
                      <span key={method} className="tag">
                        {method}
                      </span>
                    ))}
                  </div>
                  {project ? (
                    <Link
                      href={`/work/${project.slug}`}
                      className="nav-link mt-6 inline-flex items-center gap-1.5 text-[var(--accent)]"
                    >
                      {project.title} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
