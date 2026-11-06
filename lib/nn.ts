export const sig = (z: number) => 1 / (1 + Math.exp(-z));
export const relu = (z: number) => Math.max(0, z);
export const acts: Record<string, (z: number) => number> = { sigmoid: sig, relu, tanh: Math.tanh };

export function softmax(z: number[]) {
  const m = Math.max(...z);
  const e = z.map((v) => Math.exp(v - m));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / s);
}

export const mse = (y: number, p: number) => (y - p) ** 2;
export const bce = (y: number, p: number) => -(y * Math.log(p) + (1 - y) * Math.log(1 - p));

export function rng(s: number) {
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Net {
  W: number[][][] = [];
  B: number[][] = [];

  constructor(sz: number[], seed = 11) {
    const r = rng(seed);
    for (let l = 1; l < sz.length; l++) {
      const k = Math.sqrt(6 / (sz[l - 1] + sz[l]));
      this.W.push(Array.from({ length: sz[l] }, () => Array.from({ length: sz[l - 1] }, () => (r() * 2 - 1) * k)));
      this.B.push(new Array(sz[l]).fill(0));
    }
  }

  f(x: number[]) {
    const A = [x];
    const n = this.W.length - 1;
    for (let l = 0; l <= n; l++) {
      A.push(
        this.W[l].map((w, j) => {
          const z = w.reduce((s, v, i) => s + v * A[l][i], this.B[l][j]);
          return l == n ? sig(z) : Math.tanh(z);
        })
      );
    }
    return A;
  }

  p(x: number[]) {
    const A = this.f(x);
    return A[A.length - 1][0];
  }

  fit(X: number[][], Y: number[], lr: number) {
    const n = this.W.length;
    const gw = this.W.map((m) => m.map((r) => r.map(() => 0)));
    const gb = this.B.map((b) => b.map(() => 0));
    let L = 0;
    let c = 0;
    X.forEach((x, t) => {
      const A = this.f(x);
      const p = A[n][0];
      const y = Y[t];
      L += bce(y, Math.min(Math.max(p, 1e-9), 1 - 1e-9));
      if (p > 0.5 == (y == 1)) c++;
      let d = [p - y];
      for (let l = n - 1; l >= 0; l--) {
        d.forEach((e, j) => {
          gb[l][j] += e;
          A[l].forEach((a, i) => {
            gw[l][j][i] += e * a;
          });
        });
        if (l > 0) d = A[l].map((a, i) => d.reduce((s, e, j) => s + this.W[l][j][i] * e, 0) * (1 - a * a));
      }
    });
    const k = lr / X.length;
    this.W.forEach((m, l) =>
      m.forEach((r, j) => {
        this.B[l][j] -= k * gb[l][j];
        r.forEach((_, i) => {
          r[i] -= k * gw[l][j][i];
        });
      })
    );
    return { loss: L / X.length, acc: c / X.length };
  }
}
