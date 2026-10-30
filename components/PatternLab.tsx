"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Network } from "@/lib/nn";
import { Dataset, Kind, makeDataset } from "@/lib/datasets";
import { useRaf } from "@/hooks/useRaf";
import Slider from "./Slider";

const KINDS: { id: Kind; label: string }[] = [
  { id: "circle", label: "Circle" }, { id: "xor", label: "XOR quadrants" }, { id: "blobs", label: "Two blobs" }, { id: "spiral", label: "Spiral" },
];
const S = 480, CELLS = 40;

export default function PatternLab() {
  const cv = useRef<HTMLCanvasElement>(null);
  const net = useRef<Network | null>(null);
  const data = useRef<Dataset | null>(null);
  const epoch = useRef(0);
  const [kind, setKind] = useState<Kind>("circle");
  const [lr, setLr] = useState(0.3);
  const [units, setUnits] = useState(8);
  const [running, setRunning] = useState(false);
  const [stat, setStat] = useState({ epoch: 0, loss: NaN, acc: NaN });
  const [hist, setHist] = useState<number[]>([]);

  const draw = useCallback(() => {
    const c = cv.current, n = net.current, d = data.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx || !n || !d) return;
    ctx.clearRect(0, 0, S, S);
    const w = S / CELLS;
    for (let i = 0; i < CELLS; i++) for (let j = 0; j < CELLS; j++) {
      const p = n.predict([((i + 0.5) / CELLS) * 2 - 1, 1 - ((j + 0.5) / CELLS) * 2]);
      ctx.fillStyle = `rgba(${Math.round(82 + p * 158)},${Math.round(123 + p * 56)},${Math.round(255 - p * 165)},0.4)`;
      ctx.fillRect(i * w, j * w, w + 1, w + 1);
    }
    d.X.forEach((q, k) => {
      ctx.beginPath(); ctx.arc(((q[0] + 1) / 2) * S, ((1 - q[1]) / 2) * S, 4.5, 0, 7);
      ctx.fillStyle = d.Y[k] ? "#F0B35A" : "#527BFF"; ctx.fill();
      ctx.strokeStyle = "#080B10"; ctx.lineWidth = 1; ctx.stroke();
    });
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    data.current = makeDataset(kind);
    net.current = new Network([2, units, units, 1], 5);
    epoch.current = 0;
    setStat({ epoch: 0, loss: NaN, acc: NaN });
    setHist([]);
    draw();
  }, [kind, units, draw]);

  useEffect(() => { reset(); }, [reset]);

  useRaf(running, () => {
    const n = net.current, d = data.current;
    if (!n || !d) return;
    let r = { loss: 0, accuracy: 0 };
    for (let k = 0; k < 6; k++) { r = n.step(d.X, d.Y, lr); epoch.current++; }
    setStat({ epoch: epoch.current, loss: r.loss, acc: r.accuracy });
    setHist((h) => { const next = [...h, r.loss]; return next.length > 400 ? next.filter((_, i) => i % 2 === 0) : next; });
    draw();
  });

  const max = Math.max(0.8, ...hist);
  const pts = hist.map((v, i) => `${(i / Math.max(hist.length - 1, 1)) * 560},${150 - (v / max) * 140}`).join(" ");
  const fmt = (v: number, f: (x: number) => string) => (Number.isNaN(v) ? "–" : f(v));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="panel">
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Dataset pattern">
          {KINDS.map((k) => <button key={k.id} className="chip" aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>{k.label}</button>)}
        </div>
        <Slider label="rate" value={lr} min={0.01} max={1} onChange={setLr} />
        <Slider label="units" value={units} min={2} max={16} step={1} digits={0} onChange={setUnits} />
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary" onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Train"}</button>
          <button className="btn" onClick={reset}>Reset</button>
        </div>
        <div className="my-5 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
          {[["Epoch", String(stat.epoch)], ["Loss", fmt(stat.loss, (v) => v.toFixed(4))], ["Accuracy", fmt(stat.acc, (v) => (v * 100).toFixed(1) + "%")], ["Learn rate", lr.toFixed(2)]].map(([k, v]) => (
            <div key={k} className="bg-panel p-3"><p className="label-mute">{k}</p><p className="mt-1 font-mono text-lg">{v}</p></div>
          ))}
        </div>
        <svg viewBox="0 0 560 160" className="w-full border border-line" role="img" aria-label="Loss versus epoch">
          <polyline points={pts} fill="none" stroke="#55D6E8" strokeWidth={1.8} />
          <text x={8} y={16} className="fill-mute font-mono" fontSize={10}>binary cross-entropy · max {max.toFixed(2)}</text>
          <text x={552} y={154} textAnchor="end" className="fill-mute font-mono" fontSize={10}>epoch {stat.epoch}</text>
        </svg>
      </div>
      <div className="panel">
        <canvas ref={cv} width={S} height={S} className="aspect-square w-full" aria-label="Classification boundary learned by the network" />
        <p className="readout mt-3">Blue region: class 0 · amber region: class 1. Points are the 200 training samples.</p>
      </div>
    </div>
  );
}
