import type { Metadata } from "next";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { TopNav } from "@/components/navigation/TopNav";
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
        <header className="px-5 pb-14 pt-14 sm:px-8 lg:pt-20">
          <div className="mx-auto max-w-[1240px]">
            <h1 className="display text-[clamp(2.5rem,6vw,4rem)]">Get in touch</h1>
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
          </div>
        </header>
      </main>

      <SiteFooter />
    </>
  );
}
