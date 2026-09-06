import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Portrait } from "@/components/ui/Portrait";
import { RootsSignature } from "@/components/visual/RootsSignature";
import { pageModulus } from "@/components/visual/rootsOfUnity";
import { profile } from "@/data/profile";

/**
 * Editorial hero: the photograph is a full-height plate on the right, running
 * from the header rule to the stats rule and bleeding off the right edge, with
 * an oversized serif headline set against it.
 *
 * The composition is adapted from the "Editorial Image Hero" pattern on 21st.dev
 * (21st.dev/s/landing-page) — a large uncropped image carrying the section, an
 * oversized serif headline at tight leading, one calm sans paragraph below.
 * The difference is orientation: that pattern runs a landscape band above the
 * type, and the only photograph of him is a 3:4 portrait, so the image takes
 * the right column at full section height instead. Cropping a portrait into a
 * landscape band would throw away the subject to copy a layout.
 *
 * The photograph is dissolved into the page on all four sides rather than
 * given a hard edge. A rectangle of photo sitting on a flat dark page reads as
 * pasted on however well it is cropped, and darkening it to make it "sit"
 * only makes the subject look grim. Full feathering plus a low warm wash
 * behind it is what actually integrates it.
 *
 * No animation behind the headline. The reader's first job is to find out who
 * this is and where to go next; the 3D instrument lives one section down, where
 * there is room to say in text what it shows.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/*
        The portrait. Out of flow on desktop only; on mobile it falls back into
        the normal flow below the text, where a bleed would make no sense.

        Wider than the visible result (60%, pushed 5% past the right edge)
        because the mask feathers all four sides: the outer band of the element
        is transparent by design, so a tighter box would eat into the subject
        instead of the background, and the right-hand falloff lands off-screen
        rather than showing as a seam.
      */}
      <div className="pointer-events-none absolute inset-y-0 -right-[5%] hidden w-[60%] lg:block">
        {/* A low warm wash behind the photo. Defined in globals.css against
            the theme tokens rather than inline here, because the two themes
            need different strengths — see `.portrait-wash`. */}
        <div className="portrait-wash absolute inset-0" aria-hidden />
        <Portrait
          base="portrait"
          alt=""
          priority
          /*
            The `1px` branch is not a typo.

            This plate is inside a `hidden lg:block` wrapper, so below 1024px it
            is `display: none` — but a hidden <img> is still fetched, and this
            one is `priority`, so a phone was eagerly downloading the 85KB
            full-width AVIF for something it never shows. `sizes` describes the
            rendered width, and the rendered width below the breakpoint really
            is nothing, so declaring 1px there makes the browser choose the
            smallest candidate: 16KB instead of 85KB, with no JavaScript and no
            second element.

            Above the breakpoint it is the LCP element and takes 60vw for real.
          */
          sizes="(min-width: 1024px) 60vw, 1px"
          className="portrait-grade portrait-feather relative h-full w-full object-cover object-top"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1240px] flex-col px-5 pb-12 pt-14 sm:px-8 lg:min-h-[78vh] lg:justify-center lg:pb-20 lg:pt-16">
        <div className="rise-in lg:max-w-[58%]">
          {/*
            The signature mark, and the first thing on the site: the tenth
            roots of unity with the eight roots of the smallest certificate
            marked. It opens the page because the same object is what the
            instrument one section down rotates in 3D, and what every other
            page header carries at its own modulus. A reader meets the
            mathematics before they meet a single claim about it.
          */}
          <RootsSignature modulus={pageModulus.home} size={88} className="-ml-1 mb-6 block" />

          <p className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-[var(--text-dim)]">
            <span className="mark bg-[var(--red)]" aria-hidden />
            {profile.current.role} · {profile.current.org}
          </p>

          {/* The largest thing on the page. Nothing competes with it, and 0.94
              leading locks the two lines together as one mass. */}
          <h1 className="display-hero mt-7 text-[clamp(3.2rem,9.5vw,7rem)]">
            Mohib
            <br />
            {/* The surname in red. At this size it is the largest area of
                colour on the site and the reason red reads as the identity
                rather than as button trim. Carried over from the previous
                build, which set "AHMAD." the same way. */}
            <span className="text-[var(--red)]">Ahmad</span>
          </h1>

          <p className="mt-8 max-w-[42ch] text-[clamp(1.125rem,1.8vw,1.4375rem)] leading-[1.45] text-[var(--text)]">
            {profile.headline}
          </p>

          <p className="mt-5 max-w-[50ch] text-[1.0625rem] leading-8 text-[var(--text-dim)]">
            {profile.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link href="/work" className="btn btn-primary">
                See the work <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </MagneticButton>
            <Link href="/research" className="btn btn-ghost">
              <FileText className="h-4 w-4" aria-hidden /> Read the paper
            </Link>
          </div>
        </div>

        {/* Mobile: the photograph in normal flow, since there is no side column
            to bleed into. The desktop plate above is hidden here. */}
        <div className="mt-12 lg:hidden">
          <Portrait
            base="portrait"
            alt={`${profile.name}, computer science undergraduate at ${profile.education.school}`}
            /* Capped at 420px by `max-w-[420px]`, so above that the image stops
               growing and asking for 90vw would fetch a needlessly large file.
               The `lg` branch is the mirror of the plate above: this block is
               `lg:hidden`, so from 1024px up its rendered width is nothing. */
            sizes="(min-width: 1024px) 1px, (max-width: 468px) 100vw, 420px"
            className="portrait-framed mx-auto block aspect-[4/5] w-full max-w-[420px] rounded border border-[var(--line)] object-cover object-top"
          />
        </div>
      </div>

      {/* The four facts a US recruiter scans for, on one rule under the fold. */}
      <div className="relative border-t border-[var(--line)] bg-[var(--bg)]">
        <dl className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-6 gap-y-6 px-5 py-7 sm:px-8 lg:grid-cols-4">
          <div>
            <dt className="label-sm text-[var(--text-mute)]">Class of</dt>
            <dd className="mono mt-1.5 text-[0.9375rem]">{profile.education.classOf}</dd>
          </div>
          <div>
            <dt className="label-sm text-[var(--text-mute)]">CGPA</dt>
            <dd className="mono mt-1.5 text-[0.9375rem] text-[var(--yellow)]">{profile.education.gpa}</dd>
          </div>
          <div>
            <dt className="label-sm text-[var(--text-mute)]">Based in</dt>
            <dd className="mono mt-1.5 text-[0.9375rem]">Lahore, Pakistan</dd>
          </div>
          <div>
            <dt className="label-sm text-[var(--text-mute)]">ORCID</dt>
            <dd className="mono mt-1.5 text-[0.9375rem]">
              <a
                href={profile.orcidUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--line-bright)] underline-offset-4 hover:text-[var(--red)]"
              >
                {profile.orcid}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
