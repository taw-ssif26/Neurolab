"use client";
import { useState } from "react";
import Slider from "./Slider";

export default function Builder() {
  const [i, setI] = useState(3);
  const [h, setH] = useState(2);
  const [w, setW] = useState(5);
  const [o, setO] = useState(2);
  const L = [i, ...Array(h).fill(w), o] as number[];
  const x = (l: number) => 60 + (l * 480) / (L.length - 1);
  const y = (l: number, j: number) => 160 + (j - (L[l] - 1) / 2) * 32;
  const e = [];
  let p = 0;
  let c = 0;
  for (let l = 0; l < L.length - 1; l++) {
    p += L[l] * L[l + 1] + L[l + 1];
    c += L[l] * L[l + 1];
    for (let a = 0; a < L[l]; a++)
      for (let b = 0; b < L[l + 1]; b++)
        e.push(<line key={`${l}-${a}-${b}`} x1={x(l)} y1={y(l, a)} x2={x(l + 1)} y2={y(l + 1, b)} stroke="#6c4bf4" strokeOpacity="0.25" />);
  }
  const col = (l: number) => (l == 0 ? "#ffc83d" : l == L.length - 1 ? "#ff5d8f" : "#1fb58f");
  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1.8fr]">
      <div>
        <Slider l="inputs" v={i} a={1} b={8} s={1} o={setI} />
        <Slider l="hidden" v={h} a={1} b={4} s={1} o={setH} />
        <Slider l="width" v={w} a={1} b={8} s={1} o={setW} />
        <Slider l="outputs" v={o} a={1} b={6} s={1} o={setO} />
        <p className="mt-4 text-sm">Shape: <b className="text-pu">{L.join("-")}</b></p>
        <p className="text-sm">Connections: <b className="text-pu">{c}</b></p>
        <p className="text-sm">Weights + biases: <b className="text-pu">{p}</b></p>
      </div>
      <svg viewBox="0 0 600 320" className="w-full rounded border bg-white">
        {e}
        {L.map((n, l) => Array.from({ length: n }, (_, j) => <circle key={`${l}-${j}`} cx={x(l)} cy={y(l, j)} r="9" fill={col(l)} />))}
      </svg>
    </div>
  );
}
