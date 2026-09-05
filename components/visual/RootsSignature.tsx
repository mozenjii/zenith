import { pointAt, signatureFor } from "@/components/visual/rootsOfUnity";
import type { Modulus } from "@/data/research";

/**
 * The site's signature mark: one page, one modulus, one certificate.
 *
 * This is the piece that makes the identity recur. Every page header carries
 * the unit circle with the L-th roots of unity as radial ticks and the eight
 * roots of that modulus's certificate marked in that modulus's color. It is
 * the same object the home-page instrument animates in 3D, reduced to a
 * flat mark — so the mark and the instrument are the same mathematics at two
 * scales rather than two unrelated graphics.
 *
 * Deliberately server-rendered SVG with CSS-only motion. It is in the header
 * of every page, so it is in the critical path on every page; a canvas here
 * would mean five more rAF loops and a hydration boundary for something that
 * never responds to input.
 *
 * Marked roots are filled nodes; unmarked ones are ticks on the circle. That
 * distinction is doing real work: a ring of small filled circles is the
 * generated-UI status-dot signature, and ticks read as a mathematical scale
 * instead. Nothing here pulses.
 */
export function RootsSignature({
  modulus,
  size = 132,
  className = ""
}: {
  modulus: Modulus;
  size?: number;
  className?: string;
}) {
  const signature = signatureFor(modulus);
  const color = `var(${signature.token})`;

  const R = 38;
  const TICK_OUTER = 41;
  const TICK_INNER = 36;

  // Higher modulus turns slower, so the four pages read at four different
  // tempos from the same rule. 10 → 60s, 42 → 252s: slow enough to notice
  // only if you look, which is the intent for something in every header.
  const orbitSeconds = modulus * 6;

  const ticks = Array.from({ length: signature.modulus }, (_, index) => {
    const outer = pointAt(index, signature.modulus, TICK_OUTER);
    const inner = pointAt(index, signature.modulus, TICK_INNER);
    return { index, outer, inner };
  });

  const marked = signature.roots
    .slice()
    .sort((a, b) => a - b)
    .map((index) => ({ index, point: pointAt(index, signature.modulus, R) }));

  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={signature.caption}
      className={className}
      style={{ ["--orbit-duration" as string]: `${orbitSeconds}s` }}
    >
      {/* The unit circle. */}
      <circle cx="0" cy="0" r={R} fill="none" stroke="var(--line-bright)" strokeWidth="0.5" />

      {/* Real and imaginary axes, faint — they are what makes it read as the
          complex plane rather than as a decorative ring. */}
      <line x1={-R} y1="0" x2={R} y2="0" stroke="var(--line)" strokeWidth="0.4" />
      <line x1="0" y1={-R} x2="0" y2={R} stroke="var(--line)" strokeWidth="0.4" />

      {/* Every L-th root, as a tick. */}
      <g stroke="var(--line-bright)" strokeWidth="0.5">
        {ticks.map((tick) => (
          <line
            key={tick.index}
            x1={tick.inner.x}
            y1={tick.inner.y}
            x2={tick.outer.x}
            y2={tick.outer.y}
          />
        ))}
      </g>

      {/* The sweeping arm. Its own group so it turns independently of the
          nodes — one arm, one revolution against the certificate's rotation,
          which is what stops the whole mark reading as a single rigid spin. */}
      <g className="roots-sweep">
        <line x1="0" y1="0" x2={R} y2="0" stroke={color} strokeWidth="0.5" opacity="0.34" />
      </g>

      <g className="roots-orbit">
        {/* Chords between consecutive marked roots. The certificate's shape:
            Φ₅·Φ₁₀ closes into a decagon missing two vertices, Φ₃·Φ₆·Φ₈ does
            not close at all. Different mathematics, visibly different mark. */}
        {marked.length > 0 ? (
          <polygon
            points={marked.map((root) => `${root.point.x.toFixed(2)},${root.point.y.toFixed(2)}`).join(" ")}
            fill={color}
            fillOpacity="0.07"
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
        ) : null}

        {marked.map((root) => (
          <circle
            key={root.index}
            cx={root.point.x}
            cy={root.point.y}
            r="2"
            fill={color}
          />
        ))}
      </g>

      {/* Center. Present in both variants, so the algebraic case still has an
          origin and does not look like a failed render. */}
      <circle cx="0" cy="0" r="1" fill="var(--text-mute)" />
    </svg>
  );
}

/**
 * The mark plus its label. The label is what turns an abstract ring into a
 * claim a reader can check: it names the modulus and the factorization, both
 * of which appear in the paper.
 */
export function RootsSignatureBlock({
  modulus,
  className = ""
}: {
  modulus: Modulus;
  className?: string;
}) {
  const signature = signatureFor(modulus);

  return (
    <figure className={`m-0 flex items-center gap-5 ${className}`}>
      <RootsSignature modulus={modulus} size={112} />
      <figcaption className="min-w-0">
        <p className="label" style={{ color: `var(${signature.token})` }}>
          n ≡ 0 (mod {signature.modulus})
        </p>
        <p className="mono mt-2 text-[0.8125rem] leading-6 text-[var(--text-dim)]">
          {signature.factors ?? "algebraic — no rational factorization"}
        </p>
        <p className="label-sm mt-1 text-[var(--text-mute)]">{signature.note}</p>
      </figcaption>
    </figure>
  );
}
