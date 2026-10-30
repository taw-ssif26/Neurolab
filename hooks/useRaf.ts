"use client";
import { useEffect, useRef } from "react";

/** Runs `tick` on every animation frame while `active` is true. */
export function useRaf(active: boolean, tick: () => void) {
  const latest = useRef(tick);
  latest.current = tick;
  useEffect(() => {
    if (!active) return;
    let id = requestAnimationFrame(function loop() {
      latest.current();
      id = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(id);
  }, [active]);
}
