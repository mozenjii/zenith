"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Four destinations plus one call to action, which is the cap DESIGN.md sets
 * on this nav. The previous version had five items plus a persona switcher and
 * no obvious main path.
 *
 * Labels name their destination literally. "Signal map" and "Memo" are gone —
 * a reader should not have to learn a vocabulary to find the projects.
 */
const navItems = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /*
    The mobile sheet closes on the click that navigates, not in an effect
    watching `pathname`. Doing it in an effect means setState during render
    commit and a cascading re-render, and it also fails to close when the
    reader taps the link for the page they are already on.
  */

  // Escape closes it, which is the behavior a keyboard user will try first.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  /*
    The header takes a solid background, not a translucent blur. The design
    system forbids blurs outright, and a `backdrop-filter` on a sticky element
    also promotes it to its own compositing layer — which is what made scrolled
    screenshots come back blank during verification. A flat surface fill costs
    nothing, and the header reads as a distinct plane against --bg on its own.
  */
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="mono text-sm tracking-tight text-[var(--text)]" aria-label="Mohib Ahmad, home">
          Mohib Ahmad
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`nav-link ${isActive(item.href) ? "text-[var(--text)]" : "text-[var(--text-mute)] hover:text-[var(--text)]"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn btn-primary !min-h-9 !px-4 !py-1.5 !text-xs">
            Get in touch
          </Link>
        </div>

        <button
          type="button"
          className="panel-high flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-[var(--line)] bg-[var(--surface)] px-5 py-2 md:hidden" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`block border-b border-[var(--line)] py-4 font-mono text-sm ${
                isActive(item.href) ? "text-[var(--accent)]" : "text-[var(--text-dim)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary my-4 w-full">
            Get in touch
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
