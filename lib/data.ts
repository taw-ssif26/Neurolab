import { rng } from "./nn";

export type Kind = "circle" | "xor" | "blobs" | "spiral";

export function mk(k: Kind, n = 200, seed = 3) {
  const r = rng(seed);
  const X: number[][] = [];
  const Y: number[] = [];
  for (let i = 0; i < n; i++) {
    let x = 0;
    let y = 0;
    let c = 0;
    if (k == "blobs") {
      c = i % 2;
      const m = c ? 0.5 : -0.5;
      x = m + (r() + r() + r() - 1.5) * 0.4;
      y = m + (r() + r() + r() - 1.5) * 0.4;
    } else if (k == "spiral") {
      c = i % 2;
      const t = r() * 0.95 + 0.05;
      const a = t * 3.6 + c * Math.PI;
      x = t * 0.9 * Math.cos(a) + (r() - 0.5) * 0.06;
      y = t * 0.9 * Math.sin(a) + (r() - 0.5) * 0.06;
    } else {
      x = r() * 2 - 1;
      y = r() * 2 - 1;
      c = k == "circle" ? (x * x + y * y < 0.35 ? 1 : 0) : x * y > 0 ? 1 : 0;
    }
    X.push([x, y]);
    Y.push(c);
  }
  return { X, Y };
}
