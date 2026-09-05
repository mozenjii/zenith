/**
 * Canvas scenes ported from the IPS "Agency Backgrounds" set
 * (D:/Code/Epoches/animate/Agency Backgrounds.dc.html) and re-fitted to this
 * site's Neo-Graphic system.
 *
 * Four of the ten source scenes are deliberately NOT ported. Aurora drift,
 * Gradient orbs, Nebula dust and Ribbon waves all build their form from large
 * soft radial gradients, and the design system states that depth comes from
 * solid fills and hard offsets with no blurs. Dropping them keeps every scene
 * line- or point-based, which is what makes them read as technical rather than
 * ambient.
 *
 * Every scene is driven by tokens read from CSS custom properties, so the
 * palette can never drift from app/globals.css.
 */

import { galaxyScene } from "./galaxy";
import { petersenScene } from "./petersen";

export type SceneName = "warp" | "constellation" | "ripple" | "flow" | "mesh" | "petersen" | "galaxy";

export type FieldPalette = {
  background: string;
  paper: string;
  /*
    The four certificate colors, in modulus order: 10, 24, 28, 42. `violet`
    exists only because the fourth family does; nothing on canvas may use one
    of these four for anything other than its own modulus.
  */
  red: string;
  yellow: string;
  cyan: string;
  violet: string;
  /** Accent-only picks, for scenes that should stay mostly monochrome. */
  accents: string[];
};

export type FieldState = {
  width: number;
  height: number;
  /** Multiplier on element counts, before area scaling. */
  density: number;
  /** Seconds elapsed, already scaled by `speed`. */
  time: number;
  pointer: { x: number; y: number };
  ripples: Array<{ x: number; y: number; t0: number }>;
  palette: FieldPalette;
};

export type SceneInstance = {
  /** 0 clears every frame; >0 fades the previous frame to leave trails. */
  trail: number;
  reseed: (state: FieldState) => void;
  draw: (ctx: CanvasRenderingContext2D, state: FieldState, step: number) => void;
};

const REFERENCE_AREA = 1440 * 900;

function rgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function withAlpha(hex: string, alpha: number) {
  const [r, g, b] = rgb(hex);
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;
}

/** Blend two token colors and emit an rgba string — used for hover heat. */
function mix(from: string, to: string, k: number, alpha: number) {
  const a = rgb(from);
  const b = rgb(to);
  const t = Math.max(0, Math.min(1, k));
  return `rgba(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(
    a[2] + (b[2] - a[2]) * t
  )},${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;
}

function areaScale({ width, height }: FieldState) {
  return Math.min(1.6, Math.max(0.35, Math.sqrt((width * height) / REFERENCE_AREA) || 1));
}

function count(base: number, state: FieldState) {
  return Math.round(base * state.density * areaScale(state));
}

function weightedPick(palette: FieldPalette) {
  // Mostly paper so accents stay accents rather than confetti.
  const r = Math.random();
  if (r < 0.7) return palette.paper;
  if (r < 0.84) return palette.cyan;
  if (r < 0.94) return palette.red;
  return palette.yellow;
}

/* ── Cosmic warp ────────────────────────────────────────────────────────────
   Perspective starfield. The vanishing point tracks the pointer, so the whole
   field reorients toward the cursor. Used on the home hero and /contact.
   ────────────────────────────────────────────────────────────────────────── */
function warpScene(): SceneInstance {
  type Star = { x: number; y: number; z: number; pz: number; color: string };
  let stars: Star[] = [];

  const spawn = (palette: FieldPalette, fresh: boolean): Star => {
    let x = 0;
    let y = 0;
    // Reject dead center, where a star has no travel direction.
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
    } while (Math.abs(x) < 0.03 && Math.abs(y) < 0.03);
    const z = fresh ? 1 : 0.05 + Math.random() * 0.95;
    return { x, y, z, pz: z, color: weightedPick(palette) };
  };

  return {
    trail: 0.45,
    reseed(state) {
      stars = Array.from({ length: count(300, state) }, () => spawn(state.palette, false));
    },
    draw(ctx, state, step) {
      const { width: W, height: H, pointer } = state;
      const cx = W / 2 + (pointer.x - W / 2) * 0.3;
      const cy = H / 2 + (pointer.y - H / 2) * 0.3;
      const focal = Math.min(W, H) * 0.5;
      ctx.lineCap = "round";

      for (let i = 0; i < stars.length; i += 1) {
        let s = stars[i];
        s.pz = s.z;
        s.z -= step * 0.32;
        if (s.z <= 0.03) {
          s = spawn(state.palette, true);
          stars[i] = s;
        }
        const px = cx + (s.x / s.z) * focal;
        const py = cy + (s.y / s.z) * focal;
        if (px < -60 || px > W + 60 || py < -60 || py > H + 60) {
          stars[i] = spawn(state.palette, true);
          continue;
        }
        const qx = cx + (s.x / s.pz) * focal;
        const qy = cy + (s.y / s.pz) * focal;
        ctx.strokeStyle = withAlpha(s.color, Math.min(0.95, (1 - s.z) * 1.25));
        ctx.lineWidth = Math.max(0.7, (1 - s.z) * 2.6);
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }
  };
}

/* ── Constellation ──────────────────────────────────────────────────────────
   Drifting nodes that link when close, and lean toward the pointer. Reads as a
   graph of related signals — used on /resume behind the proof metrics, and on
   AI/data project pages.
   ────────────────────────────────────────────────────────────────────────── */
function constellationScene(): SceneInstance {
  type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string };
  let nodes: Node[] = [];
  const LINK = 132;

  return {
    trail: 0,
    reseed(state) {
      nodes = Array.from({ length: count(90, state) }, () => ({
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        vx: (Math.random() - 0.5) * 26,
        vy: (Math.random() - 0.5) * 26,
        r: 1 + Math.random() * 1.4,
        color: weightedPick(state.palette)
      }));
    },
    draw(ctx, state, step) {
      const { width: W, height: H, pointer, palette } = state;

      for (const p of nodes) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 240 && d > 1) {
          const f = (1 - d / 240) * 60 * step;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 44) {
          p.vx *= 44 / sp;
          p.vy *= 44 / sp;
        }
        p.x += p.vx * step;
        p.y += p.vy * step;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d >= LINK) continue;
          ctx.strokeStyle = withAlpha(palette.paper, (1 - d / LINK) * 0.16);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        const heat = Math.max(0, 1 - Math.hypot(a.x - pointer.x, a.y - pointer.y) / 220);
        ctx.fillStyle = withAlpha(a.color, 0.4 + 0.5 * heat);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + heat * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
}

/* ── Dot-grid ripple ────────────────────────────────────────────────────────
   A regular grid displaced by the cursor, with expanding rings on click. The
   grid itself is the point: used on /projects behind the gallery index.
   ────────────────────────────────────────────────────────────────────────── */
function rippleScene(): SceneInstance {
  let dots: Array<{ x: number; y: number }> = [];

  return {
    trail: 0,
    reseed(state) {
      // Spacing tightens slightly with density but never below a readable grid.
      const gap = Math.max(34, Math.round(46 / Math.sqrt(state.density)));
      dots = [];
      for (let y = gap / 2; y < state.height + gap; y += gap) {
        for (let x = gap / 2; x < state.width + gap; x += gap) {
          dots.push({ x, y });
        }
      }
    },
    draw(ctx, state) {
      const { pointer, ripples, time, palette } = state;

      for (const dot of dots) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        const lift = Math.exp(-(d * d) / (2 * 150 * 150));
        let ox = (dx / d) * lift * 30;
        let oy = (dy / d) * lift * 30;
        let heat = lift;

        for (const r of ripples) {
          const age = time - r.t0;
          const rd = Math.hypot(dot.x - r.x, dot.y - r.y) || 1;
          const front = rd - age * 340;
          const w = Math.exp(-(front * front) / (2 * 46 * 46)) * Math.exp(-age * 1.2);
          ox += ((dot.x - r.x) / rd) * w * 26;
          oy += ((dot.y - r.y) / rd) * w * 26;
          if (w > heat) heat = w;
        }

        const wobble = Math.sin(time * 1.3 + (dot.x + dot.y) * 0.011) * 2;
        ctx.fillStyle = mix(palette.paper, palette.cyan, heat, 0.2 + 0.7 * heat);
        ctx.beginPath();
        ctx.arc(dot.x + ox, dot.y + oy + wobble, 1.2 + 3 * heat, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
}

/* ── Flow field ─────────────────────────────────────────────────────────────
   Particles advected by a noise-ish vector field, leaving trails. Reads as
   throughput — used on backend/pipeline project pages.
   ────────────────────────────────────────────────────────────────────────── */
function flowScene(): SceneInstance {
  type Particle = { x: number; y: number; life: number; color: string };
  let particles: Particle[] = [];

  const spawn = (state: FieldState): Particle => ({
    x: Math.random() * state.width,
    y: Math.random() * state.height,
    life: 1 + Math.random() * 5,
    color: state.palette.accents[Math.floor(Math.random() * state.palette.accents.length)]
  });

  const angleAt = (x: number, y: number, t: number) =>
    (Math.sin(x * 0.0021 + t * 0.26) + Math.sin(y * 0.0026 - t * 0.2) + Math.sin((x + y) * 0.0012 + t * 0.12)) * 1.7;

  return {
    // The source used a 0.085-alpha background fill per frame; here `trail` is
    // how much of the previous frame is KEPT, so that inverts to ~0.9. Flow
    // needs long trails — the streaks *are* the field lines.
    trail: 0.91,
    reseed(state) {
      particles = Array.from({ length: count(420, state) }, () => spawn(state));
    },
    draw(ctx, state, step) {
      const { width: W, height: H, pointer, time } = state;
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1.1;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        let a = angleAt(p.x, p.y, time);
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (d < 280) a += (1 - d / 280) * 2.6;
        const dist = 70 * step;
        const nx = p.x + Math.cos(a) * dist;
        const ny = p.y + Math.sin(a) * dist;
        ctx.strokeStyle = withAlpha(p.color, 0.34);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        p.life -= step;
        if (p.life <= 0 || nx < -10 || nx > W + 10 || ny < -10 || ny > H + 10) particles[i] = spawn(state);
      }

      ctx.globalCompositeOperation = "source-over";
    }
  };
}

/* ── Wireframe mesh ─────────────────────────────────────────────────────────
   A triangulated grid that lifts toward the cursor. Reads as structure and
   architecture — used on CS-foundations project pages.
   ────────────────────────────────────────────────────────────────────────── */
function meshScene(): SceneInstance {
  type Point = { bx: number; by: number; phase: number; x: number; y: number; heat: number };
  let points: Point[] = [];
  let cols = 0;
  let rows = 0;

  return {
    trail: 0,
    reseed(state) {
      const gap = 105;
      cols = Math.ceil(state.width / gap) + 2;
      rows = Math.ceil(state.height / gap) + 2;
      points = [];
      for (let j = 0; j < rows; j += 1) {
        for (let i = 0; i < cols; i += 1) {
          points.push({
            bx: (i - 0.5) * gap + (Math.random() - 0.5) * 44,
            by: (j - 0.5) * gap + (Math.random() - 0.5) * 44,
            phase: Math.random() * Math.PI * 2,
            x: 0,
            y: 0,
            heat: 0
          });
        }
      }
    },
    draw(ctx, state) {
      const { pointer, time, palette } = state;

      for (const p of points) {
        let x = p.bx + Math.sin(time * 0.55 + p.phase) * 9;
        let y = p.by + Math.cos(time * 0.45 + p.phase * 1.4) * 9;
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        const lift = Math.exp(-(d * d) / (2 * 190 * 190));
        x += (dx / d) * lift * 26;
        y += (dy / d) * lift * 26;
        p.x = x;
        p.y = y;
        p.heat = lift;
      }

      ctx.lineWidth = 1;
      for (let j = 0; j < rows - 1; j += 1) {
        for (let i = 0; i < cols - 1; i += 1) {
          const p00 = points[j * cols + i];
          const p10 = points[j * cols + i + 1];
          const p01 = points[(j + 1) * cols + i];
          const p11 = points[(j + 1) * cols + i + 1];
          for (const tri of [
            [p00, p10, p01],
            [p10, p11, p01]
          ]) {
            const heat = (tri[0].heat + tri[1].heat + tri[2].heat) / 3;
            ctx.beginPath();
            ctx.moveTo(tri[0].x, tri[0].y);
            ctx.lineTo(tri[1].x, tri[1].y);
            ctx.lineTo(tri[2].x, tri[2].y);
            ctx.closePath();
            ctx.fillStyle = withAlpha(palette.cyan, 0.012 + 0.1 * heat);
            ctx.fill();
            ctx.strokeStyle = withAlpha(palette.paper, 0.05 + 0.34 * heat);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        ctx.fillStyle = mix(palette.paper, palette.cyan, p.heat, 0.32 + 0.55 * p.heat);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3 + 2.4 * p.heat, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
}

export const sceneFactories: Record<SceneName, () => SceneInstance> = {
  warp: warpScene,
  petersen: petersenScene,
  galaxy: galaxyScene,
  constellation: constellationScene,
  ripple: rippleScene,
  flow: flowScene,
  mesh: meshScene
};
