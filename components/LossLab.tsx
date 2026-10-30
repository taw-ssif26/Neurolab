"use client";
import { useState } from "react";
import { bce, mse } from "@/lib/nn";
import Slider from "./Slider";

export default function LossLab() {
  const [p, setP] = useState(0.7);
  const [y, setY] = useState<0 | 1>(1);
  const m = mse(y, p), c = bce(y, p);
  const Bar = ({ label, v, max }: { label: string; v: number; max: number }) => (
    <div className="mb-5">
      <div className="mb-1 flex justify-between font-mono text-xs"><span className="text-mute">{label}</span><span className="text-find">{v.toFixed(4)}</span></div>
      <div className="h-2 bg-raised"><div className="h-full bg-signal transition-[width] duration-200" style={{ width: `${Math.min(v / max, 1) * 100}%` }} /></div>
    </div>
  );
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="panel">
        <div className="mb-5 flex gap-2" role="group" aria-label="Target">
          <button className="chip" aria-pressed={y === 1} onClick={() => setY(1)}>target y = 1</button>
          <button className="chip" aria-pressed={y === 0} onClick={() => setY(0)}>target y = 0</button>
        </div>
        <Slider label="p" value={p} min={0.01} max={0.99} onChange={setP} />
        <p className="readout mt-4">
          MSE = (y − p)² = ({y} − {p.toFixed(2)})² = <b>{m.toFixed(4)}</b><br />
          BCE = −[y·ln p + (1−y)·ln(1−p)] = <b>{c.toFixed(4)}</b>
        </p>
      </div>
      <div className="panel">
        <Bar label="Mean squared error (max 1)" v={m} max={1} />
        <Bar label="Binary cross-entropy (bar capped at 4.6)" v={c} max={4.6} />
        <p className="text-sm leading-relaxed text-mute">
          Push p towards the wrong answer. MSE can never exceed 1, but cross-entropy keeps growing without bound, so confident mistakes produce a far stronger training signal.
        </p>
      </div>
    </div>
  );
}
