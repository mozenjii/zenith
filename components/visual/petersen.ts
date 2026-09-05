// Types only, so nothing is imported from ./scenes at runtime.
//
// scenes.ts imports petersenScene from this file, so a value import back the
// other way forms a cycle: whichever module the bundler evaluates second sees
// a partially-initialised copy of the first. That is what made `graphs[index]`
// come back undefined and threw "Cannot read properties of undefined (reading
// 'n')" on the home page. `import type` is erased at build time and cannot
// cycle, and the one helper actually needed at runtime is defined below.
import type { FieldState, SceneInstance } from "./scenes";

// Pure geometry, no data module and no cycle. This is the same function the
// flat SVG signature mark uses, so the marked roots here and the marked roots
// in every page header are literally the same eight numbers.
import { certificateRootIndices } from "./cyclotomic";

/** Local copy of the alpha helper, to keep this module free of runtime imports. */
function withAlpha(hex: string, alpha: number) {
  const n = Number.parseInt(hex.slice(1), 16);
  const clamped = Math.max(0, Math.min(1, alpha));
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamped.toFixed(3)})`;
}

/**
 * The generalized Petersen graph P(n,3), rendered in real 3D.
 *
 * This is the object of the research paper, not decoration. P(n,k) has outer
 * vertices u_0..u_{n-1} on a cycle, inner vertices v_0..v_{n-1}, and edges
 *
 *     u_i u_{i+1}      the outer cycle
 *     u_i v_i          the spokes
 *     v_i v_{i+k}      the inner step-k chords
 *
 * all subscripts mod n. With k = 3 the inner chords form the star polygon that
 * carries the visual, and it is exactly the structure the certificates act on.
 *
 * The moduli cycled through below — 10, 24, 28, 42 — are the four divisibility
 * families for which the paper proves M(P(n,3)) = Z(P(n,3)) = 8. They are the
 * result, so the animation is the finding rather than an illustration of it.
 *
 * ── Why there is no 3D library here ─────────────────────────────────────────
 * three.js would add roughly 150KB gzipped to draw two rings and some chords.
 * Points are rotated by hand and projected with one divide. The whole scene is
 * under 5KB and holds 60fps at 1440x900, which is the budget DESIGN.md sets.
 *
 * The host (SignalField) supplies pause-when-offscreen, pause-on-hidden-tab,
 * DPR capping, resize, reduced-motion static frame, and the palette. This file
 * only has to produce frames.
 */

const STEP = 3;
/** The four families the certificates cover. */
const MODULI = [10, 24, 28, 42];

/**
 * Which palette key each modulus wears, in the same order.
 *
 * This is what makes the color system legible in motion rather than only in
 * the legend on /research: as the instrument cycles 10 - 24 - 28 - 42 its
 * inner chords go red - yellow - cyan - violet, so a reader watching one full
 * cycle has seen the whole palette explained without reading a word. The
 * structural parts, outer cycle and spokes, stay neutral, because they are the
 * same at every n and coloring them would say otherwise.
 */
const MODULUS_KEYS = ["red", "yellow", "cyan", "violet"] as const;
/** Seconds each modulus is held, and the crossfade between them. */
const HOLD = 6.5;
const FADE = 1.4;

type Vec3 = { x: number; y: number; z: number };

/** Vertex positions for P(n,3), as two concentric rings in the z = 0 plane. */
function buildGraph(n: number) {
  const outer: Vec3[] = [];
  const inner: Vec3[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    outer.push({ x: Math.cos(a), y: Math.sin(a), z: 0 });
    // 0.54 keeps the inner star clear of the spokes at every n in MODULI.
    inner.push({ x: Math.cos(a) * 0.54, y: Math.sin(a) * 0.54, z: 0 });
  }
  return { n, outer, inner };
}

type Graph = ReturnType<typeof buildGraph>;

/** Rotate about X then Y, then project with a single perspective divide. */
function project(p: Vec3, sinX: number, cosX: number, sinY: number, cosY: number, scale: number, cx: number, cy: number) {
  // Rotate about X.
  const y1 = p.y * cosX - p.z * sinX;
  const z1 = p.y * sinX + p.z * cosX;
  // Rotate about Y.
  const x2 = p.x * cosY + z1 * sinY;
  const z2 = -p.x * sinY + z1 * cosY;
  // Perspective. 3.2 is far enough that the ring never inverts through the eye.
  const depth = 3.2 / (3.2 + z2);
  return { x: cx + x2 * scale * depth, y: cy + y1 * scale * depth, depth, z: z2 };
}

type Segment = { ax: number; ay: number; bx: number; by: number; z: number; kind: 0 | 1 | 2 };

export function petersenScene(): SceneInstance {
  let graphs: Graph[] = MODULI.map(buildGraph);
  let radius = 200;
  let cx = 0;
  let cy = 0;
  let elapsed = 0;
  const segments: Segment[] = [];

  const reseed = (state: FieldState) => {
    graphs = MODULI.map(buildGraph);
    cx = state.width * 0.5;
    cy = state.height * 0.5;
    // Fit the outer ring to the smaller axis, with room for the perspective tilt.
    radius = Math.min(state.width, state.height) * 0.34;
  };

  const drawGraph = (
    ctx: CanvasRenderingContext2D,
    state: FieldState,
    graph: Graph,
    spin: number,
    alpha: number,
    accent: string
  ) => {
    if (alpha <= 0.004) return;

    // A slow nod on X keeps it reading as a solid object rather than a flat disc.
    const tilt = 1.02 + Math.sin(elapsed * 0.21) * 0.16;
    const sinX = Math.sin(tilt);
    const cosX = Math.cos(tilt);
    const sinY = Math.sin(spin);
    const cosY = Math.cos(spin);

    const { n, outer, inner } = graph;
    const po = outer.map((p) => project(p, sinX, cosX, sinY, cosY, radius, cx, cy));
    const pi = inner.map((p) => project(p, sinX, cosX, sinY, cosY, radius, cx, cy));

    // Collect every edge with its mean depth, then paint far-to-near so the
    // ring genuinely occludes itself instead of looking like a wire tangle.
    segments.length = 0;
    for (let i = 0; i < n; i += 1) {
      const j = (i + 1) % n;
      const m = (i + STEP) % n;
      segments.push({ ax: po[i].x, ay: po[i].y, bx: po[j].x, by: po[j].y, z: (po[i].z + po[j].z) / 2, kind: 0 });
      segments.push({ ax: po[i].x, ay: po[i].y, bx: pi[i].x, by: pi[i].y, z: (po[i].z + pi[i].z) / 2, kind: 1 });
      segments.push({ ax: pi[i].x, ay: pi[i].y, bx: pi[m].x, by: pi[m].y, z: (pi[i].z + pi[m].z) / 2, kind: 2 });
    }
    segments.sort((a, b) => b.z - a.z);

    const { paper } = state.palette;
    for (const seg of segments) {
      // Nearer edges are brighter and heavier; this is the whole depth cue.
      const near = 1 - (seg.z + 1) / 2;
      const fade = (0.16 + near * 0.62) * alpha;
      if (seg.kind === 0) {
        ctx.strokeStyle = withAlpha(paper, fade * 0.68);
        ctx.lineWidth = 0.7 + near * 0.9;
      } else if (seg.kind === 1) {
        // Spokes are structural and identical at every n, so they stay neutral.
        ctx.strokeStyle = withAlpha(paper, fade * 0.3);
        ctx.lineWidth = 0.5 + near * 0.5;
      } else {
        // The inner step-3 chords are the structure the theorem acts on, so
        // they carry this modulus's color.
        ctx.strokeStyle = withAlpha(accent, fade * 0.95);
        ctx.lineWidth = 0.8 + near * 1.25;
      }
      ctx.beginPath();
      ctx.moveTo(seg.ax, seg.ay);
      ctx.lineTo(seg.bx, seg.by);
      ctx.stroke();
    }

    // Vertices last, so they sit on top of their own edges.
    for (let i = 0; i < n; i += 1) {
      const nearO = 1 - (po[i].z + 1) / 2;
      ctx.fillStyle = withAlpha(paper, (0.3 + nearO * 0.7) * alpha);
      ctx.beginPath();
      ctx.arc(po[i].x, po[i].y, 1.1 + nearO * 1.5, 0, Math.PI * 2);
      ctx.fill();

      const nearI = 1 - (pi[i].z + 1) / 2;
      ctx.fillStyle = withAlpha(accent, (0.26 + nearI * 0.62) * alpha);
      ctx.beginPath();
      ctx.arc(pi[i].x, pi[i].y, 0.9 + nearI * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  /**
   * The unit circle carrying the eight roots of the certificate polynomial.
   * Drawn flat behind the graph, because the roots live in the complex plane
   * and tilting them would be a lie about what they are.
   */
  const drawUnitCircle = (
    ctx: CanvasRenderingContext2D,
    state: FieldState,
    n: number,
    alpha: number,
    accent: string
  ) => {
    if (alpha <= 0.004) return;
    const r = radius * 1.28;
    ctx.strokeStyle = withAlpha(state.palette.paper, 0.09 * alpha);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    /*
      The n-th roots of unity, with the certificate's eight lifted out at their
      real positions.

      This used to mark every root where `k % round(n/8) === 0`, which is an
      evenly spaced sample and not a certificate at all - at n = 10 it marked
      all ten. The roots of a cyclotomic factor are the primitive d-th roots of
      unity, so the marked set is computable, and now is computed. At n = 28 the
      set is empty, because that certificate is algebraic and has no cyclotomic
      factorization; the ring is drawn bare, which is the truth about it.
    */
    const marked = new Set(certificateRootIndices(n));
    for (let k = 0; k < n; k += 1) {
      const a = (k / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      const carries = marked.has(k);
      ctx.fillStyle = withAlpha(carries ? accent : state.palette.paper, (carries ? 0.78 : 0.15) * alpha);
      ctx.beginPath();
      ctx.arc(x, y, carries ? 2.1 : 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return {
    // A short trail softens the rotation without smearing the chords.
    trail: 0.34,
    reseed,
    draw: (ctx, state, step) => {
      // Never let the clock go backwards. A negative step here once produced
      // a negative `elapsed`, and JS `%` keeps the sign of its left operand,
      // so the index below came out as -1 and graphs[-1] was undefined.
      elapsed = Math.max(0, elapsed + step);

      const cycle = HOLD + FADE;
      const total = elapsed % (cycle * MODULI.length);
      // Wrapped both ways, so the index is in range for any finite `total`.
      const index = ((Math.floor(total / cycle) % MODULI.length) + MODULI.length) % MODULI.length;
      const withinCycle = total - Math.floor(total / cycle) * cycle;

      const currentGraph = graphs[index];
      const nextGraph = graphs[(index + 1) % graphs.length];
      const currentAccent = state.palette[MODULUS_KEYS[index]];
      const nextAccent = state.palette[MODULUS_KEYS[(index + 1) % MODULUS_KEYS.length]];

      // Crossfade only during the last FADE seconds of each hold.
      const t = withinCycle > HOLD ? (withinCycle - HOLD) / FADE : 0;
      const eased = t * t * (3 - 2 * t);

      const spin = elapsed * 0.15;

      drawUnitCircle(ctx, state, currentGraph.n, 1 - eased, currentAccent);
      if (eased > 0) drawUnitCircle(ctx, state, nextGraph.n, eased, nextAccent);

      drawGraph(ctx, state, currentGraph, spin, 1 - eased, currentAccent);
      if (eased > 0) drawGraph(ctx, state, nextGraph, spin, eased, nextAccent);
    }
  };
}

/** The modulus on screen right now, so a caption can name it in text. */
export const petersenModuli = MODULI;
