/**
 * Root-of-unity geometry. No imports, by design.
 *
 * Both the flat SVG signature mark and the 3D canvas instrument need the same
 * answer to one question: where on the unit circle do a certificate's eight
 * roots actually sit? That answer lives here so the two never disagree.
 *
 * This module holds no data beyond `CERTIFICATE_ORDERS`, which is a mirror of
 * the `orders` field in `data/research.ts`. It is duplicated rather than
 * imported because the canvas path is client-side: importing the data module
 * would pull the paper's abstract, keyword list and every research track into
 * the browser bundle to look up four small arrays. `assertOrdersMatchData` in
 * `rootsOfUnity.ts` fails loudly in development if the mirror ever drifts.
 */

/** Euclid, for the primitivity test. */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * The primitive d-th roots of unity, as indices on a circle divided into
 * `scale` equal parts.
 *
 * A primitive d-th root is exp(2πik/d) with gcd(k, d) = 1. Rewriting k/d as
 * (k · scale/d) / scale puts it on the coarser division, which is what lets
 * roots from Φ₃, Φ₆ and Φ₈ share one ring of 24 points. `scale` must be a
 * multiple of d for that to land on integers, which it always does here: the
 * minimal modulus L is by construction the lcm of the factor orders.
 */
export function primitiveRootIndices(d: number, scale: number): number[] {
  const step = scale / d;
  const indices: number[] = [];
  for (let k = 1; k <= d; k += 1) {
    if (gcd(k, d) === 1) indices.push(k * step);
  }
  return indices;
}

/**
 * The cyclotomic factor orders of the certificate at each covered modulus.
 *
 * 28 maps to `null` and that is the interesting entry: the paper proves the
 * modulus-28 certificate is genuinely algebraic, with no factorization into
 * cyclotomic polynomials at rational weights. There is no set of primitive
 * roots to mark, so nothing is marked. Drawing eight points there anyway —
 * evenly spaced, or sampled at n/8 — would be inventing mathematics, and an
 * earlier version of the canvas instrument did exactly that.
 *
 * 42 has two valid certificates, Φ₃·Φ₁₄ and Φ₆·Φ₇. The first is used, so the
 * mark is stable across renders.
 */
export const CERTIFICATE_ORDERS: Record<number, number[] | null> = {
  10: [5, 10],
  24: [3, 6, 8],
  28: null,
  42: [3, 14]
};

/** Ring indices of the marked roots at `modulus`, empty when none are. */
export function certificateRootIndices(modulus: number): number[] {
  const orders = CERTIFICATE_ORDERS[modulus];
  if (!orders) return [];
  return orders.flatMap((order) => primitiveRootIndices(order, modulus));
}

/** Cartesian position of ring index `i`, on a circle of radius `r`. */
export function pointAt(index: number, modulus: number, r: number): { x: number; y: number } {
  const theta = (2 * Math.PI * index) / modulus;
  return { x: Math.cos(theta) * r, y: -Math.sin(theta) * r };
}
