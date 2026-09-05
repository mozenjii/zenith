import type { Metadata } from "next";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { TopNav } from "@/components/navigation/TopNav";
import { RootsSignature } from "@/components/visual/RootsSignature";
import { SignalField } from "@/components/visual/SignalField";
import { pageModulus } from "@/components/visual/rootsOfUnity";
import { currentRole } from "@/data/career";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mohib Ahmad — email, GitHub, LinkedIn, and ORCID."
};

/**
 * Deliberately a page of links rather than a contact form.
 *
 * A form here would need a backend, would silently drop messages when that
 * backend was misconfigured, and would collect a name and message the reader
 * has no reason to trust this site with. Email is one click, it works without
 * JavaScript, and the reader keeps a copy of what they sent.
 */
const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    note: "The fastest route. Checked daily.",
    primary: true
  },
  {
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.github,
    note: "12 public repositories, including RuleWeaver."
  },
  {
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedin,
    note: "Roles and professional history."
  },
  {
    label: "ORCID",
    value: profile.orcid,
    href: profile.orcidUrl,
    note: "For anything on the research side."
  }
];

export default function ContactPage() {
  return (
    <>
      <TopNav />

      <main id="main">
        {/*
          The interactive galaxy lives here rather than on the home page.
          /contact is the sparsest surface on the site and the end of the
          reading path, so expensive motion competes with nothing — and the
          pointer interaction gives a page that is otherwise a list of links
          something to do. The home hero stays deliberately still.

          `fade="left"` lays a scrim across the copy column only. The vertical
          scrim was tried first and fades to solid `--background` by its lower
          edge, which erased half the galaxy to protect text that was not
          there.
        */}
        <header className="relative isolate overflow-hidden px-5 pb-20 pt-14 sm:px-8 lg:pb-28 lg:pt-20">
          <SignalField scene="galaxy" className="-z-10 opacity-[calc(var(--field-opacity)+0.35)]" speed={0.85} density={1.15} fade="left" />

          <div className="relative mx-auto max-w-[1240px]">
            <div className="flex items-start justify-between gap-8">
              <h1 className="display text-[clamp(2.5rem,6vw,4rem)]">Get in touch</h1>
              {/* 10 here, the same as the home page: red is the action color
                  and this page is nothing but actions. */}
              <RootsSignature
                modulus={pageModulus.contact}
                size={104}
                className="mt-1 hidden shrink-0 sm:block"
              />
            </div>
            <p className="prose-measure mt-6 text-[1.125rem] leading-8 text-[var(--text-dim)]">
              Currently {currentRole.title.toLowerCase()} at {currentRole.org}, in {profile.location} —{" "}
              {profile.timezone}. Open to conversations about engineering roles, research, and
              collaboration.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded border border-[var(--line)] bg-[var(--line)] lg:max-w-3xl">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex flex-wrap items-center gap-x-6 gap-y-2 bg-[var(--panel)] px-6 py-6 transition-colors hover:bg-[var(--panel-high)]"
                >
                  <span className="label w-24 shrink-0 text-[var(--text-mute)]">{channel.label}</span>
                  <span
                    className={`mono text-[0.9375rem] ${
                      channel.primary ? "text-[var(--accent)]" : "text-[var(--text)]"
                    }`}
                  >
                    {channel.value}
                  </span>
                  <span className="ml-auto flex items-center gap-2 text-[0.8125rem] text-[var(--text-dim)]">
                    {channel.note}
                    {channel.primary ? (
                      <Mail className="h-4 w-4 shrink-0 text-[var(--text-mute)]" aria-hidden />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-mute)]" aria-hidden />
                    )}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <a href={profile.resumePath} className="btn btn-ghost" download>
                <Download className="h-4 w-4" aria-hidden /> Download resume, PDF
              </a>
            </div>

            <p className="label-sm mt-12 max-w-md text-[var(--text-mute)]">
              The spiral is P(n,3)&rsquo;s quieter cousin — move the cursor through it.
            </p>
          </div>
        </header>
      </main>

      <SiteFooter />
    </>
  );
}
