"use client";
import { useEffect, useState } from "react";
import { sigmoid } from "@/lib/nn";
import Slider from "./Slider";

const W1 = [[0.5, -0.6], [0.9, 0.3], [-0.4, 0.8]];
const B1 = [0.1, -0.2, 0.05];
const W2 = [0.7, -0.5, 0.9];
const B2 = 0.0;
const STAGES = [
  "Inputs enter the network",
  "Hidden pre-activations: z = W·x + b",
  "Hidden activations: a = tanh(z)",
  "Output pre-activation: z = w·a + b",
  "Output activation: ŷ = σ(z)",
];
const IX = 90, HX = 300, OX = 510;
const iy = (i: number) => 110 + i * 100;
const hy = (j: number) => 60 + j * 90;

export default function ForwardProp() {
  const [x, setX] = useState([0.8, 0.3]);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);

  const z1 = W1.map((r, j) => r[0] * x[0] + r[1] * x[1] + B1[j]);
  const a1 = z1.map(Math.tanh);
  const z2 = a1.reduce((s, a, j) => s + W2[j] * a, B2);
  const out = sigmoid(z2);

  useEffect(() => {
    if (!playing) return;
    if (stage >= 4) { setPlaying(false); return; }
    const t = setTimeout(() => setStage((s) => s + 1), 1100);
    return () => clearTimeout(t);
  }, [playing, stage]);

  const hv = (j: number) => (stage >= 2 ? a1[j] : stage >= 1 ? z1[j] : null);
  const ov = stage >= 4 ? out : stage >= 3 ? z2 : null;
  const hot1 = stage === 1, hot2 = stage === 3;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="panel">
        <svg viewBox="0 0 600 320" className="w-full" role="img" aria-label="Forward propagation through a 2-3-1 network">
          {W1.map((r, j) => r.map((w, i) => (
            <line key={`a${i}${j}`} x1={IX} y1={iy(i)} x2={HX} y2={hy(j)} stroke={hot1 ? "#55D6E8" : "#527BFF"} strokeOpacity={hot1 ? 0.9 : 0.3} strokeWidth={0.8 + Math.abs(w) * 1.6} />
          )))}
          {W2.map((w, j) => (
            <line key={`b${j}`} x1={HX} y1={hy(j)} x2={OX} y2={170} stroke={hot2 ? "#55D6E8" : "#527BFF"} strokeOpacity={hot2 ? 0.9 : 0.3} strokeWidth={0.8 + Math.abs(w) * 1.6} />
          ))}
          {x.map((v, i) => <Node key={i} cx={IX} cy={iy(i)} text={v.toFixed(2)} tag={`x${i + 1}`} on />)}
          {[0, 1, 2].map((j) => <Node key={j} cx={HX} cy={hy(j)} text={hv(j) === null ? "" : hv(j)!.toFixed(2)} tag={`h${j + 1}`} on={stage >= 1} amber={stage === 2} />)}
          <Node cx={OX} cy={170} text={ov === null ? "" : ov.toFixed(3)} tag="ŷ" on={stage >= 3} amber={stage === 4} />
        </svg>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn btn-primary" onClick={() => { if (stage >= 4) setStage(0); setPlaying(true); }} disabled={playing}>Start</button>
          <button className="btn" onClick={() => setPlaying(false)} disabled={!playing}>Pause</button>
          <button className="btn" onClick={() => setPlaying(true)} disabled={playing || stage >= 4 || stage === 0}>Continue</button>
          <button className="btn" onClick={() => { setPlaying(false); setStage((s) => Math.min(s + 1, 4)); }} disabled={stage >= 4}>Step →</button>
          <button className="btn" onClick={() => { setPlaying(false); setStage(0); }}>Reset</button>
        </div>
      </div>
      <div className="panel">
        <Slider label="x₁" value={x[0]} min={-1.5} max={1.5} onChange={(v) => setX([v, x[1]])} />
        <Slider label="x₂" value={x[1]} min={-1.5} max={1.5} onChange={(v) => setX([x[0], v])} />
        <p className="label mt-5">Step {stage + 1} / 5</p>
        <p className="mt-1 text-sm text-ink">{STAGES[stage]}</p>
        <div className="readout mt-3" aria-live="polite">
          {stage >= 1 && z1.map((v, j) => <div key={j}>z<sub>h{j + 1}</sub> = <b>{v.toFixed(3)}</b>{stage >= 2 && <> → a = <b>{a1[j].toFixed(3)}</b></>}</div>)}
          {stage >= 3 && <div>z<sub>out</sub> = <b>{z2.toFixed(3)}</b></div>}
          {stage >= 4 && <div>ŷ = σ(z) = <b>{out.toFixed(4)}</b></div>}
        </div>
      </div>
    </div>
  );
}

function Node({ cx, cy, text, tag, on, amber }: { cx: number; cy: number; text: string; tag: string; on: boolean; amber?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={26} fill="#080B10" stroke={amber ? "#F0B35A" : on ? "#55D6E8" : "#929EAD"} strokeWidth={1.5} />
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-ink font-mono" fontSize={12}>{text}</text>
      <text x={cx} y={cy - 33} textAnchor="middle" className="fill-mute font-mono" fontSize={11}>{tag}</text>
    </g>
  );
}
