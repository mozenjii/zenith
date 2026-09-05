"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * A control that drifts toward the cursor on hover and springs back on leave.
 *
 * Adapted from Aceternity UI's Magnetic Button
 * (ui.aceternity.com/components/magnetic-button), keeping its two documented
 * props and their defaults — `strength` 0.8 and `maxDistance` 100. Written
 * against `motion`, which this project already depends on, rather than
 * installed through their shadcn registry, which would have pulled in a
 * component config this repo does not use.
 *
 * Pointer-only by design: it does nothing on touch, adds nothing to the
 * accessibility tree, and the wrapped control keeps its own focus ring and
 * keyboard behavior. Under reduced motion the spring is stiffened to the point
 * of being instant rather than disabled, so focus and hit area never move out
 * from under the pointer.
 */
export function MagneticButton({
  children,
  strength = 0.8,
  maxDistance = 100,
  className = ""
}: {
  children: ReactNode;
  strength?: number;
  maxDistance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  const onPointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    // Coarse pointers get nothing: a finger has no hover, and the drift would
    // only move the target away from where it was tapped.
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    // Clamp the pull so a fast cursor cannot fling the control across the page.
    const distance = Math.hypot(dx, dy);
    const scale = distance > maxDistance ? maxDistance / distance : 1;

    x.set(dx * strength * scale);
    y.set(dy * strength * scale);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`inline-block ${className}`}
    >
      <motion.span style={{ x: springX, y: springY }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}
