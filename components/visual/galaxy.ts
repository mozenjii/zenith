// Types only. See the note in ./petersen.ts — scenes.ts imports from this file,
// so a value import back the other way would form a cycle.
import type { FieldState, SceneInstance } from "./scenes";

function withAlpha(hex: string, alpha: number) {
  const n = Number.parseInt(hex.slice(1), 16);
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a.toFixed(3)})`;
}

/**
 * An interactive 3D spiral galaxy.
 *
 * Adapted from React Bits' Galaxy background
 * (reactbits.dev/backgrounds/galaxy), keeping its interaction model and its
 * prop names and defaults so the behaviour is recognisably the same one:
 * `density` 1, `starSpeed` 0.5, `rotationSpeed` 0.1, `twinkleIntensity` 0.3,
 * `glowIntensity` 0.3, `mouseInteraction` and `mouseRepulsion` with
 * `repulsionStrength` 2.
 *
 * Theirs is a fragment shader and needs `ogl` — about 50KB gzipped for one
 * decorative background. DESIGN.md sets a performance budget and says
 * decoration does not get to cost, so this is real geometry instead: stars are
 * placed on logarithmic spiral arms in three dimensions with a central bulge,
 * rotated about the galactic axis, tilted, and projected with one perspective
 * divide — the same projection already written for the P(n,3) instrument.
 *
 * Two further departures, both deliberate:
 *
 *  - Their `hueShift` defaults to 140°, which is green. Colour comes from the
 *    site tokens instead, so the galaxy is paper-white with red and yellow
 *    picked out sparsely. Adapting an external asset to local tokens is the
 *    rule in the studio's asset registry.
 *  - Repulsion is applied in screen space rather than world space. It is what
 *    the reader actually perceives, and it costs two subtractions per star
 *    instead of an inverse projection.
 *
 * The host (SignalField) supplies pause-when-offscreen, pause-on-hidden-tab,
 * DPR capping, resize, the reduced-motion static frame, and the palette.
 */

/** React Bits' defaults, kept so the tuning is comparable to theirs. */
const DENSITY = 1;
const STAR_SPEED = 0.5;
const ROTATION_SPEED = 0.1;
const TWINKLE_INTENSITY = 0.3;
const GLOW_INTENSITY = 0.3;
const REPULSION_STRENGTH = 2;
const REPULSION_RADIUS = 130;

const ARMS = 3;
const WINDINGS = 2.15;
/** Share of stars in the central bulge rather than the arms. */
const BULGE_SHARE = 0.22;

type Star = {
  /** Position in the galactic plane, before rotation. */
  x: number;
  y: number;
  z: number;
  /** Distance from the core, 0..1 — drives colour and brightness. */
  r: number;
  size: number;
  color: string;
  /** Phase and rate for the twinkle, so stars do not pulse in unison. */
  phase: number;
  rate: number;
};

/** Box–Muller, for a bulge that falls off smoothly instead of ending flat. */
function gaussian() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function galaxyScene(): SceneInstance {
  let stars: Star[] = [];
  let cx = 0;
  let cy = 0;
  let scale = 300;
  let spin = 0;
  let elapsed = 0;

  const reseed = (state: FieldState) => {
    cx = state.width * 0.5;
    cy = state.height * 0.5;
    scale = Math.min(state.width, state.height) * 0.62;

    // Count scales with area so a wide banner is not sparse and a phone is not
    // asked to draw four thousand arcs.
    const area = state.width * state.height;
    const count = Math.round(Math.min(2200, Math.max(320, area / 620)) * DENSITY * state.density);

    const { paper, red, yellow } = state.palette;
    stars = Array.from({ length: count }, () => {
      const inBulge = Math.random() < BULGE_SHARE;

      let x: number;
      let y: number;
      let z: number;
      let r: number;

      if (inBulge) {
        // Roughly spherical core.
        r = Math.abs(gaussian()) * 0.16;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi) * 0.8;
      } else {
        // sqrt keeps the surface density from spiking at the centre.
        r = 0.18 + Math.sqrt(Math.random()) * 0.82;
        const arm = Math.floor(Math.random() * ARMS);
        // Arm scatter widens outward, which is what makes arms read as arms
        // rather than as three drawn lines.
        const scatter = gaussian() * (0.055 + r * 0.16);
        const theta = (arm / ARMS) * Math.PI * 2 + r * WINDINGS * Math.PI * 2 + scatter;
        x = Math.cos(theta) * r;
        y = Math.sin(theta) * r;
        // Disk thins toward the rim.
        z = gaussian() * 0.045 * (1 - r * 0.55);
      }

      // Mostly white. Red is the site's colour and the core runs warm, so the
      // accents sit where they would physically: yellow inward, red sparse.
      const roll = Math.random();
      let color = paper;
      if (roll > 0.9) color = red;
      else if (roll > 0.76) color = yellow;

      return {
        x,
        y,
        z,
        r,
        size: 0.35 + Math.random() * 0.95 + (inBulge ? 0.25 : 0),
        color,
        phase: Math.random() * Math.PI * 2,
        rate: 0.6 + Math.random() * 2.1
      };
    });
  };

  return {
    // Full clear each frame: the stars are drawn additively, and a trail on top
    // of additive blending blooms into a white haze within a few seconds.
    trail: 0,
    reseed,
    draw: (ctx, state, step) => {
      elapsed = Math.max(0, elapsed + step);
      spin += step * ROTATION_SPEED * STAR_SPEED * 2;

      // Pointer parallax. The host already eases `state.pointer` toward the
      // cursor and drifts it when the cursor is idle, so this inherits both.
      const px = (state.pointer.x / Math.max(1, state.width) - 0.5) * 2;
      const py = (state.pointer.y / Math.max(1, state.height) - 0.5) * 2;

      // Tilt: mostly edge-on, nudged by vertical pointer position.
      const tilt = 1.02 - py * 0.22;
      const sinX = Math.sin(tilt);
      const cosX = Math.cos(tilt);
      const yaw = spin + px * 0.3;
      const sinY = Math.sin(yaw);
      const cosY = Math.cos(yaw);

      ctx.globalCompositeOperation = "lighter";

      for (const star of stars) {
        // Rotate about X (tilt), then about Y (galactic spin).
        const y1 = star.y * cosX - star.z * sinX;
        const z1 = star.y * sinX + star.z * cosX;
        const x2 = star.x * cosY + z1 * sinY;
        const z2 = -star.x * sinY + z1 * cosY;

        // Perspective. 2.6 keeps the near rim from stretching.
        const depth = 2.6 / (2.6 + z2);
        let sx = cx + x2 * scale * depth;
        let sy = cy + y1 * scale * depth;

        // Screen-space repulsion, matching their mouseRepulsion behaviour.
        const dx = sx - state.pointer.x;
        const dy = sy - state.pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPULSION_RADIUS && dist > 0.01) {
          const push = (1 - dist / REPULSION_RADIUS) ** 2 * REPULSION_STRENGTH * 18;
          sx += (dx / dist) * push;
          sy += (dy / dist) * push;
        }

        // Brightness: nearer is brighter, the core is brighter, and each star
        // twinkles on its own phase.
        const near = 1 - (z2 + 1) / 2;
        const core = 1 - star.r * 0.55;
        const twinkle = 1 + Math.sin(elapsed * star.rate + star.phase) * TWINKLE_INTENSITY;
        const alpha = Math.min(1, (0.14 + near * 0.52) * core * twinkle);
        if (alpha <= 0.01) continue;

        const radius = star.size * depth * (0.85 + near * 0.5);

        ctx.fillStyle = withAlpha(star.color, alpha);
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        // A second, wider, fainter disc on the brightest stars only. This is
        // the whole glow: a per-star radial gradient would be correct and
        // would also cost more than every other draw on the page combined.
        if (alpha > 0.34) {
          ctx.fillStyle = withAlpha(star.color, alpha * GLOW_INTENSITY * 0.5);
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 3.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
    }
  };
}
