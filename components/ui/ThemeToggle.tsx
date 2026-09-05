"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

export const THEME_KEY = "ma-theme";

/**
 * Subscribe to the applied theme, which lives on <html data-theme>.
 *
 * The DOM attribute is the single source of truth, not React state and not
 * localStorage. The inline boot script in app/layout.tsx sets it before first
 * paint — that is the whole reason there is no dark-to-light flash — so by the
 * time this component exists the decision has already been made somewhere it
 * cannot see. Reading the attribute is how it finds out.
 *
 * `useSyncExternalStore` rather than useState + useEffect. The effect version
 * called setState in its body on mount, which React 19 flags as a cascading
 * render, and it also could not notice a change made from anywhere else. A
 * MutationObserver subscription fixes both: it is the correct shape for
 * "mirror external state into React", and the button stays right even if the
 * attribute is changed by another component or from the console.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/*
  On the server there is no attribute to read, and guessing would render the
  wrong accessible label for half of all readers. `null` means "not known yet",
  and the button below renders without an icon or a specific label until it is.
  A wrong aria-label is an accessibility bug; a briefly generic one is not.
*/
function getServerSnapshot(): Theme | null {
  return null;
}

/**
 * Dark/light switch.
 *
 * Dark is the default and the brand choice. Light exists because /research is
 * the one surface on this site that gets read end to end, and light text on a
 * dark ground makes sustained reading measurably harder — the pupil dilates,
 * depth of field drops, and thin light strokes smear. That is halation, and a
 * toggle is the only real fix for it.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    // Set the attribute, and let the subscription above report it back. There
    // is deliberately no setState here: one source of truth, one direction.
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode, or site data blocked. The theme still applies for this
      // page view; it just will not be remembered. Not worth surfacing.
    }
  };

  const label = theme === null ? "Toggle theme" : theme === "light" ? "Switch to dark" : "Switch to light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--line)] text-[var(--text-dim)] transition-colors hover:border-[var(--line-bright)] hover:text-[var(--text)]"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" aria-hidden />
      ) : theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <span className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
