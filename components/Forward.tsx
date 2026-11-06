"use client";
import { useState } from "react";
import { sig } from "@/lib/nn";
import Slider from "./Slider";

const W1 = [[0.5, -0.6], [0.9, 0.3], [-0.4, 0.8]];
const B1 = [0.1, -0.2, 0.05];
const W2 = [0.7, -0.5, 0.9];
const M = [
  "Step 0: the inputs go in.",
  "Step 1: each hidden neuron computes z = w1*x1 + w2*x2 + b.",
  "Step 2: each hidden neuron applies tanh to its z.",
  "Step 3: the output neuron adds up the hidden outputs.",
  "Step 4: sigmoid turns that into the final answer.",
];

function N({ x, y, t, c }: { x: number; y: number; t: string; c: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="26" fill={c} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill="white">{t}</text>
    </g>
  );
}

export default function Forward() {
  const [x, setX] = useState([0.8, 0.3]);
  const [s, setS] = useState(0);
  const z = W1.map((r, j) => r[0] * x[0] + r[1] * x[1] + B1[j]);
  const a = z.map(Math.tanh);
  const zo = a.reduce((t, v, j) => t + W2[j] * v, 0);
  const h = (j: number) => (s >= 2 ? a[j].toFixed(2) : s >= 1 ? z[j].toFixed(2) : "?");
  const o = s >= 4 ? sig(zo).toFixed(3) : s >= 3 ? zo.toFixed(2) : "?";
  return (
    <div className="grid gap-5 md:grid-cols-[1.5fr_1fr]">
      <svg viewBox="0 0 600 320" className="w-full rounded border bg-white">
        {[0, 1, 2].map((j) => [0, 1].map((i) => <line key={`${i}${j}`} x1="90" y1={110 + i * 100} x2="300" y2={60 + j * 90} stroke={s == 1 ? "#ff5d8f" : "#ccc"} strokeWidth="2" />))}
        {[0, 1, 2].map((j) => <line key={j} x1="300" y1={60 + j * 90} x2="510" y2="170" stroke={s == 3 ? "#ff5d8f" : "#ccc"} strokeWidth="2" />)}
        {x.map((v, i) => <N key={i} x={90} y={110 + i * 100} t={v.toFixed(2)} c="#ffc83d" />)}
        {[0, 1, 2].map((j) => <N key={j} x={300} y={60 + j * 90} t={h(j)} c="#6c4bf4" />)}
        <N x={510} y={170} t={o} c="#1fb58f" />
      </svg>
      <div>
        <Slider l="x1" v={x[0]} a={-1.5} b={1.5} o={(n) => setX([n, x[1]])} />
        <Slider l="x2" v={x[1]} a={-1.5} b={1.5} o={(n) => setX([x[0], n])} />
        <p className="my-4 text-sm">{M[s]}</p>
        <button className="btn mr-2" onClick={() => setS(Math.min(s + 1, 4))}>Next step</button>
        <button className="btn btn2" onClick={() => setS(0)}>Reset</button>
      </div>
    </div>
  );
}
