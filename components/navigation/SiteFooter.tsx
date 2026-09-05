import Link from "next/link";
import { profile } from "@/data/profile";

/**
 * Three groups of four, chunked rather than one long list — DESIGN.md caps an
 * unbroken list at five items. The previous footer repeated the whole nav plus
 * a duplicate call to action already present in the header.
 */
const site = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

const elsewhere = [
  { href: profile.github, label: "GitHub" },
  { href: profile.linkedin, label: "LinkedIn" },
  { href: profile.orcidUrl, label: `ORCID ${profile.orcid}` },
  { href: `mailto:${profile.email}`, label: profile.email }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="mark mb-5 block bg-[var(--red)]" aria-hidden />
            <p className="display text-[1.75rem] text-[var(--text)]">
              Mohib <span className="text-[var(--red)]">Ahmad</span>
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-dim)]">
              {profile.role}
            </p>
          </div>

          <nav className="lg:col-span-3 lg:col-start-7" aria-label="Footer">
            <p className="label text-[var(--text-dim)]">Site</p>
            <ul className="mt-4 grid gap-3">
              {site.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link text-[var(--text-dim)] hover:text-[var(--text)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label text-[var(--text-dim)]">Elsewhere</p>
            <ul className="mt-4 grid gap-3">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="nav-link break-words text-[var(--text-dim)] hover:text-[var(--text)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-sm text-[var(--text-mute)]">
            {profile.location} · {profile.timezone}
          </p>
          <p className="label-sm text-[var(--text-mute)]">
            {profile.current.role}, {profile.current.org}
          </p>
        </div>
      </div>
    </footer>
  );
}
