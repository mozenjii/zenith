"use client";

import { useEffect, useRef } from "react";
import { type FieldState, type SceneName, sceneFactories, withAlpha } from "./scenes";

/**
 * Canvas host for the background scenes in ./scenes.ts.
 *
 * Responsibilities kept here rather than in the scenes:
 *  - sizing to its own container via ResizeObserver, so a scene can back one
 *    section instead of owning the viewport
 *  - pointer tracking in container space, with idle drift when the cursor rests
 *  - pausing when scrolled out of view or when the tab is hidden
 *  - a single static frame under `prefers-reduced-motion`
 *  - reading the palette from CSS custom properties so it tracks globals.css
 *
 * Purely decorative: `aria-hidden`, `pointer-events: none`, renders no content.
 */

function readToken(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/** Standard contrast protection, so headlines never sit on raw scene noise. */
const fadeClass = {
  none: "",
  left: "bg-[linear-gradient(95deg,var(--background)_0%,rgba(10,10,10,0.9)_28%,rgba(10,10,10,0.5)_48%,transparent_66%)]",
  vertical: "bg-[linear-gradient(180deg,rgba(10,10,10,0.35)_0%,rgba(10,10,10,0.72)_55%,var(--background)_100%)]",
  edges: "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.55)_70%,var(--background)_100%)]"
} as const;

export function SignalField({
  scene = "warp",
  className = "",
  density = 1,
  speed = 1,
  fade = "none"
}: {
  scene?: SceneName;
  className?: string;
  /** Multiplier on element counts, before container-area scaling. */
  density?: number;
  speed?: number;
  fade?: keyof typeof fadeClass;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const instance = sceneFactories[scene]();

    const state: FieldState = {
      width: 1,
      height: 1,
      density,
      time: 0,
      pointer: { x: 0, y: 0 },
      ripples: [],
      palette: {
        background: readToken("--background", "#0a0a0a"),
        paper: readToken("--paper", "#fffaf3"),
        cyan: readToken("--cyan", "#64d8ff"),
        red: readToken("--red", "#ff4938"),
        yellow: readToken("--yellow", "#ffcf4a"),
        accents: [readToken("--cyan", "#64d8ff"), readToken("--red", "#ff4938"), readToken("--yellow", "#ffcf4a")]
      }
    };

    const fadeFill = instance.trail > 0 ? withAlpha(state.palette.background, 1 - instance.trail) : null;

    let raf = 0;
    let running = false;
    let lastTs = 0;
    const target = { x: 0, y: 0, movedAt: 0 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const rect = host.getBoundingClientRect();
      state.width = Math.max(1, Math.round(rect.width));
      state.height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(state.width * dpr);
      canvas.height = Math.round(state.height * dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.pointer.x = target.x = state.width / 2;
      state.pointer.y = target.y = state.height * 0.45;
      instance.reseed(state);
    };

    const paint = (step: number, fullClear: boolean) => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = fullClear || !fadeFill ? state.palette.background : fadeFill;
      ctx.fillRect(0, 0, state.width, state.height);
      instance.draw(ctx, state, step);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    const tick = (ts: number) => {
      /*
        Clamped at both ends. `lastTs` is seeded from performance.now() in
        start(), and the first requestAnimationFrame timestamp can be very
        slightly EARLIER than that, which made dt negative — and a negative dt
        propagates into every scene's accumulated time. One scene indexed an
        array with it and got -1. Math.max(0, ...) is the fix; the `|| 0.016`
        only ever caught NaN.
      */
      const dt = Math.max(0, Math.min(0.05, (ts - lastTs) / 1000)) || 0.016;
      lastTs = ts;
      const step = dt * Math.min(2.5, Math.max(0.2, speed));
      state.time += step;

      // Idle drift: keep the scene alive when the cursor is not moving.
      if (performance.now() - target.movedAt > 2600) {
        target.x = state.width * 0.5 + Math.cos(state.time * 0.33) * state.width * 0.28;
        target.y = state.height * 0.46 + Math.sin(state.time * 0.24) * state.height * 0.22;
      }
      const ease = Math.min(1, dt * 5);
      state.pointer.x += (target.x - state.pointer.x) * ease;
      state.pointer.y += (target.y - state.pointer.y) * ease;

      state.ripples = state.ripples.filter((r) => state.time - r.t0 < 3);

      paint(step, false);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion.matches) return;
      running = true;
      lastTs = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const toLocal = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onPointerMove = (event: PointerEvent) => {
      const p = toLocal(event);
      target.x = p.x;
      target.y = p.y;
      target.movedAt = performance.now();
    };

    const onPointerDown = (event: PointerEvent) => {
      const p = toLocal(event);
      if (p.x < 0 || p.y < 0 || p.x > state.width || p.y > state.height) return;
      state.ripples.push({ x: p.x, y: p.y, t0: state.time });
      target.movedAt = performance.now();
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionPreferenceChange = () => {
      stop();
      if (reduceMotion.matches) paint(0, true);
      else start();
    };

    resize();
    if (reduceMotion.matches) paint(0, true);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) paint(0, true);
    });
    resizeObserver.observe(host);

    const visibility = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
        else stop();
      },
      { rootMargin: "120px" }
    );
    visibility.observe(host);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, [scene, density, speed]);

  return (
    <div ref={hostRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {fade === "none" ? null : <div className={`absolute inset-0 ${fadeClass[fade]}`} />}
    </div>
  );
}
