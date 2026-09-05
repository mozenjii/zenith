/**
 * The data-aware layer over `cyclotomic.ts`.
 *
 * `cyclotomic.ts` knows the geometry and nothing else. This module joins it to
 * `data/research.ts`, so a signature's caption, color and factorization all
 * come from the same rows that feed the research page's table. It is imported
 * only by server components; the client-side canvas path stops at
 * `cyclotomic.ts` and never pulls the paper's prose into the browser bundle.
 */

import { CERTIFICATE_ORDERS, certificateRootIndices } from "./cyclotomic";
import { coveredModuli, modulusColors, rationalCertificates, type Modulus } from "@/data/research";

export { pointAt, primitiveRootIndices } from "./cyclotomic";

/**
 * Development-only drift guard.
 *
 * `CERTIFICATE_ORDERS` mirrors the `orders` field of `rationalCertificates` so
 * the client bundle does not have to import the data module. A mirror that can
 * silently fall out of step is worse than the bundle cost it saves, so this
 * throws in development the moment the two disagree — including when a modulus
 * gains or loses a rational certificate.
 *
 * Same pattern as the stack-layer guard in `data/stack.ts`, for the same
 * reason: the duplication is a deliberate trade, and the guard is the price.
 */
function assertOrdersMatchData() {
  for (const modulus of coveredModuli) {
    const certificate = rationalCertificates.find((row) => row.L === modulus) ?? null;
    const mirrored = CERTIFICATE_ORDERS[modulus] ?? null;
    const expected = certificate ? certificate.orders : null;

    const same =
      (expected === null && mirrored === null) ||
      (expected !== null &&
        mirrored !== null &&
        expected.length === mirrored.length &&
        expected.every((order, i) => order === mirrored[i]));

    if (!same) {
      throw new Error(
        `CERTIFICATE_ORDERS[${modulus}] is ${JSON.stringify(mirrored)} but data/research.ts says ` +
          `${JSON.stringify(expected)}. Update components/visual/cyclotomic.ts to match.`
      );
    }
  }
}

if (process.env.NODE_ENV !== "production") {
  assertOrdersMatchData();
}

/**
 * English ordinal suffix. Only needed because 42 is in the covered set and
 * "the 42th roots of unity" is the kind of thing a mathematician notices
 * before they notice anything else on the page.
 */
function ordinal(n: number): string {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export type Signature = {
  modulus: Modulus;
  /** CSS custom property carrying this modulus's color. */
  token: string;
  /** The certificate's factorization, or null when it is not rational. */
  factors: string | null;
  /** What distinguishes this family from the other three. */
  note: string;
  /** Ring indices of the marked roots, empty when the certificate is not rational. */
  roots: number[];
  /** One line describing what the mark shows. Used as the accessible name. */
  caption: string;
};

export function signatureFor(modulus: Modulus): Signature {
  const certificate = rationalCertificates.find((row) => row.L === modulus) ?? null;
  const { token, note } = modulusColors[modulus];
  const roots = certificateRootIndices(modulus);

  /*
    The caption is the SVG's accessible name, so it has to stand on its own for
    a screen-reader user who will never see the ring. It deliberately does not
    reuse `note` from `modulusColors`: that string names the factorization too,
    and reading "the 8 roots of Phi-5 Phi-10 marked - Phi-5 Phi-10, the
    smallest certificate" is worse than useless.
  */
  return {
    modulus,
    token,
    factors: certificate ? certificate.factors : null,
    note,
    roots,
    caption: certificate
      ? `The ${ordinal(modulus)} roots of unity, with the ${roots.length} roots of ${certificate.factors} marked.`
      : `The ${ordinal(modulus)} roots of unity. The certificate at this modulus is algebraic, with no rational cyclotomic factorization, so no roots are singled out.`
  };
}

/**
 * Which modulus each page carries.
 *
 * There are four certificates and five pages, so the rule has to be stated
 * rather than guessed at. The four content pages take the four moduli in
 * ascending order, and /contact reuses 10 because red is also the action color
 * and /contact is nothing but actions.
 *
 * The consequence worth knowing: a reader moving through the site sees four
 * different marks turning at four different rates, and the color of the page
 * they are on always means the same thing it means everywhere else.
 */
export const pageModulus = {
  home: 10,
  work: 24,
  about: 28,
  research: 42,
  contact: 10
} as const satisfies Record<string, Modulus>;
