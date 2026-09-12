import type { Metadata } from "next";
import { Download } from "lucide-react";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { TopNav } from "@/components/navigation/TopNav";
import { Portrait } from "@/components/ui/Portrait";
import { Section } from "@/components/ui/Section";
import { RootsSignatureBlock } from "@/components/visual/RootsSignature";
import { pageModulus } from "@/components/visual/rootsOfUnity";
import { foundingRoleCount, roles } from "@/data/career";
import { awards, educationLadder, profile } from "@/data/profile";
import { largestLayerSize, stackLayers, uniqueStack } from "@/data/stack";

export const metadata: Metadata = {
  title: "About",
  description:
    "The full record for Mohib Ahmad — education, roles, technical range, and how I work."
};

/**
 * /about replaces both /resume and /memo.
 *
 * Two pages carrying overlapping versions of one record is exactly the clutter
 * the reader complained about: it forces a choice before you know what is
 * behind either door. One page, chunked into four sections, and the PDF is a
 * download rather than a rival page.
 */
export default function AboutPage() {
  return (
    <>
      <TopNav />

      <main id="main">
        <header className="px-5 pb-6 pt-14 sm:px-8 lg:pt-20">
          <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="display text-[clamp(2.5rem,6vw,4rem)]">About</h1>
              <p className="prose-measure mt-6 text-[1.125rem] leading-8 text-[var(--text-dim)]">
                I am a {profile.education.standing.toLowerCase()}-year computer science undergraduate at FAST NUCES
                Lahore, class of {profile.education.classOf}, with a {profile.education.gpa} CGPA. Currently{" "}
                {profile.current.role.toLowerCase()} at the {profile.current.org}. Before that I founded an
                AI services company and co-founded a B2B SaaS startup.
              </p>
              <p className="prose-measure mt-5 text-[1.0625rem] leading-8 text-[var(--text-dim)]">
                {foundingRoleCount} of the {roles.length} roles below are founding roles, across three stages of
                education. The pattern is starting things rather than joining them.
              </p>
              <div className="mt-8">
                <a href={profile.resumePath} className="btn btn-ghost" download>
                  <Download className="h-4 w-4" aria-hidden /> Download resume, PDF
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              {/*
                3:4, the photograph's own ratio, so the frame crops nothing.

                This was a square tile fed by a separate `portrait-square.jpg`,
                and it was the most closed-in image on the site: a square window
                on a 3:4 photograph puts the subject's head at roughly 46% of
                the frame whatever you do with it, because the source has no
                more width to give. Re-cropping could not fix that. Changing the
                frame could, so the square source is gone and this renders the
                same photograph as the home page.
              */}
              <div className="relative aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded border border-[var(--line)]">
                <Portrait
                  base="portrait"
                  alt={profile.name}
                  sizes="300px"
                  className="portrait-framed absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/*
                28 is the odd one out and this is the page that says so: the
                certificate at this modulus exists, but the paper proves it is
                genuinely algebraic, so there is no cyclotomic factorization
                and the mark has no eight roots to pick out. It draws the ring
                and marks nothing.

                That is the honest render, and it is not special-cased — 28
                simply has no row in `rationalCertificates`, so the component
                finds nothing to mark. Under the portrait rather than beside
                the heading, because two figures competing for the same corner
                is the clutter this rebuild was meant to remove.
              */}
              <RootsSignatureBlock modulus={pageModulus.about} className="mt-8 max-w-[300px]" />
            </div>
          </div>
        </header>

        <Section id="education" title="Education" tone="surface">
          <ol className="grid gap-px overflow-hidden rounded border border-[var(--line)] bg-[var(--line)]">
            {educationLadder.map((stage) => (
              <li key={stage.stage} className="grid gap-3 bg-[var(--panel)] px-6 py-6 sm:grid-cols-12 sm:items-baseline">
                <div className="sm:col-span-5">
                  <p className="text-[1.0625rem] text-[var(--text)]">{stage.stage}</p>
                  <p className="label-sm mt-1.5 text-[var(--text-mute)]">{stage.institution}</p>
                </div>
                <p className="label-sm text-[var(--text-mute)] sm:col-span-2">{stage.period}</p>
                <p className="mono text-[var(--yellow)] sm:col-span-2">{stage.result}</p>
                <div className="sm:col-span-3">
                  {/* A US reader has never seen an A-Level. Spelling out what the
                      qualification is worth costs one line and prevents the top
                      grade in the country reading as a typo. */}
                  {stage.usEquivalent ? (
                    <p className="text-[0.8125rem] leading-6 text-[var(--text-mute)]">{stage.usEquivalent}</p>
                  ) : null}
                  <p className="mt-2 text-[0.8125rem] leading-6 text-[var(--text-dim)]">
                    {stage.distinctions.join(" · ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="label mt-10 text-[var(--text-dim)]">Awards</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {awards.map((award) => (
              <li key={award.label} className="panel p-4">
                <p className="text-[0.9375rem] text-[var(--text)]">{award.label}</p>
                <p className="label-sm mt-1 text-[var(--text-mute)]">{award.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="roles"
          title="Roles"
          context="Most recent first. Metrics are outcomes with a number attached; anything that could not be stated as a number stayed in prose rather than being inflated."
        >
          <ol className="grid gap-px overflow-hidden rounded border border-[var(--line)] bg-[var(--line)]">
            {roles.map((role) => (
              <li key={role.id} className="bg-[var(--panel)] px-6 py-7">
                <div className="grid gap-4 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-2.5">
                      {role.current ? <span className="mark bg-[var(--red)]" aria-hidden /> : null}
                      <p className="text-[1.0625rem] leading-7 text-[var(--text)]">{role.title}</p>
                    </div>
                    <p className="mt-1.5 text-[0.9375rem] text-[var(--text-dim)]">{role.org}</p>
                    <p className="label-sm mt-1.5 text-[var(--text-mute)]">
                      {role.period} · {role.type}
                      {role.founding ? " · founding" : ""}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-[0.9375rem] leading-7 text-[var(--text-dim)]">{role.summary}</p>
                    {role.link ? (
                      <a
                        href={role.link}
                        target="_blank"
                        rel="noreferrer"
                        className="nav-link mt-3 inline-block text-[var(--accent)]"
                      >
                        {role.link.replace("https://", "")}
                      </a>
                    ) : null}
                  </div>

                  {role.metrics?.length ? (
                    <ul className="grid h-fit gap-1.5 lg:col-span-3">
                      {role.metrics.map((metric) => (
                        <li key={metric} className="mono text-[0.8125rem] leading-6 text-[var(--text-dim)]">
                          {metric}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="stack"
          title="Technical range"
          context={`${uniqueStack.length} distinct technologies across the recorded projects, grouped by the layer of the system each one sits in. The count is derived from the project data, never typed by hand.`}
          tone="surface"
        >
          <div className="grid gap-6">
            {stackLayers.map((layer) => (
              <div key={layer.id} className="grid gap-3 lg:grid-cols-12 lg:items-baseline">
                <div className="lg:col-span-3">
                  <p className="text-[0.9375rem] text-[var(--text)]">{layer.label}</p>
                  <p className="label-sm mt-1 text-[var(--text-mute)]">{layer.items.length} tools</p>
                </div>
                <div className="lg:col-span-9">
                  {/* The bar is a proportion, and the tags below it are the data.
                      Nothing here depends on reading the bar. */}
                  <div
                    className="grow-x h-px w-full origin-left"
                    style={{
                      background: `var(--${layer.accent === "text" ? "line-bright" : layer.accent})`,
                      maxWidth: `${(layer.items.length / largestLayerSize) * 100}%`
                    }}
                    aria-hidden
                  />
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {layer.items.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="how" title="How I work">
          <div className="prose-measure grid gap-6 text-[1.0625rem] leading-8 text-[var(--text-dim)]">
            <p>
              <span className="text-[var(--text)]">Claims get checked before they go out.</span> In a real
              browser, not a fetch that never runs the script — a tool that reads HTML without executing
              JavaScript will report a client-rendered page as broken when it is not. Nothing on this
              site claims a number that has no artifact behind it.
            </p>
            <p>
              <span className="text-[var(--text)]">The limits go next to the result.</span> RuleWeaver&rsquo;s
              own documentation says its OpenFisca export is a structural claim, because nobody has run
              the generated package and compared the output. That sentence is worth more to a reader than
              a rounded-up feature list, so it is on the case study rather than buried.
            </p>
            <p>
              <span className="text-[var(--text)]">Rejecting your own framing is part of the work.</span>{" "}
              Priora started as a denial-risk predictor. The architecture that replaced it forbids a
              denial probability from sorting a queue or feeding a gate, because a probability tells a
              reviewer nothing they can act on or defend. The earlier version is still on the record.
            </p>
            <p>
              <span className="text-[var(--text)]">Prefer the tool that costs nothing to keep.</span> The
              3D instrument on the home page is hand-rolled rather than built on a 3D library — three.js
              would have added roughly 150KB to draw two rings and some chords.
            </p>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
