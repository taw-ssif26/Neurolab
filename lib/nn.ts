export type ActName = "sigmoid" | "relu" | "tanh";

export const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
export const relu = (z: number) => Math.max(0, z);
export const ACT: Record<ActName, (z: number) => number> = { sigmoid, relu, tanh: Math.tanh };

export function softmax(z: number[]): number[] {
  const m = Math.max(...z);
  const e = z.map((v) => Math.exp(v - m));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / s);
}

export const mse = (y: number, p: number) => (y - p) ** 2;
export const bce = (y: number, p: number) => -(y * Math.log(p) + (1 - y) * Math.log(1 - p));

/** Small deterministic generator so experiments are reproducible. */
export function mulberry(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fully connected network: tanh hidden units, single sigmoid output,
 * binary cross-entropy loss, full-batch gradient descent.
 */
export class Network {
  W: number[][][] = [];
  B: number[][] = [];

  constructor(public sizes: number[], seed = 11) {
    const rand = mulberry(seed);
    for (let l = 1; l < sizes.length; l++) {
      const fanIn = sizes[l - 1];
      const fanOut = sizes[l];
      const limit = Math.sqrt(6 / (fanIn + fanOut));
      this.W.push(
        Array.from({ length: fanOut }, () =>
          Array.from({ length: fanIn }, () => (rand() * 2 - 1) * limit)
        )
      );
      this.B.push(new Array(fanOut).fill(0));
    }
  }

  forward(x: number[]): number[][] {
    const acts: number[][] = [x];
    const last = this.W.length - 1;
    for (let l = 0; l <= last; l++) {
      acts.push(
        this.W[l].map((row, j) => {
          const z = row.reduce((s, w, i) => s + w * acts[l][i], this.B[l][j]);
          return l === last ? sigmoid(z) : Math.tanh(z);
        })
      );
    }
    return acts;
  }

  predict(x: number[]): number {
    const a = this.forward(x);
    return a[a.length - 1][0];
  }

  /** One epoch over the full batch. Returns mean loss and accuracy. */
  step(X: number[][], Y: number[], lr: number): { loss: number; accuracy: number } {
    const L = this.W.length;
    const gW = this.W.map((m) => m.map((r) => r.map(() => 0)));
    const gB = this.B.map((b) => b.map(() => 0));
    let loss = 0;
    let correct = 0;

    X.forEach((x, n) => {
      const acts = this.forward(x);
      const p = acts[L][0];
      const y = Y[n];
      loss += bce(y, Math.min(Math.max(p, 1e-9), 1 - 1e-9));
      if (p > 0.5 === (y === 1)) correct++;

      // sigmoid + cross-entropy: dL/dz = p - y
      let delta = [p - y];
      for (let l = L - 1; l >= 0; l--) {
        delta.forEach((d, j) => {
          gB[l][j] += d;
          acts[l].forEach((a, i) => {
            gW[l][j][i] += d * a;
          });
        });
        if (l > 0) {
          delta = acts[l].map(
            (a, i) => delta.reduce((s, d, j) => s + this.W[l][j][i] * d, 0) * (1 - a * a)
          );
        }
      }
    });

    const k = lr / X.length;
    this.W.forEach((m, l) =>
      m.forEach((row, j) => {
        this.B[l][j] -= k * gB[l][j];
        row.forEach((_, i) => {
          row[i] -= k * gW[l][j][i];
        });
      })
    );
    return { loss: loss / X.length, accuracy: correct / X.length };
  }
}
