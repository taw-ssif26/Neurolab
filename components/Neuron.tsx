"use client";
import { useState } from "react";
import { acts } from "@/lib/nn";
import Slider from "./Slider";
import Plot from "./Plot";

export default function Neuron() {
  const [x, setX] = useState([0.8, -0.4, 1.2]);
  const [w, setW] = useState([0.6, 1.1, -0.5]);
  const [b, setB] = useState(0.2);
  const [a, setA] = useState("sigmoid");
  const up = (v: number[], i: number, n: number) => v.map((q, k) => (k == i ? n : q));
  const z = x.reduce((s, q, i) => s + q * w[i], b);
  const o = acts[a](z);
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        {x.map((_, i) => (
          <div key={i} className="mb-2 border-b pb-2">
            <Slider l={"x" + (i + 1)} v={x[i]} a={-2} b={2} o={(n) => setX(up(x, i, n))} />
            <Slider l={"w" + (i + 1)} v={w[i]} a={-2} b={2} o={(n) => setW(up(w, i, n))} />
          </div>
        ))}
        <Slider l="bias" v={b} a={-2} b={2} o={setB} />
        <select className="mt-3 rounded border bg-white p-2" value={a} onChange={(e) => setA(e.target.value)}>
          <option>sigmoid</option>
          <option>relu</option>
          <option>tanh</option>
        </select>
      </div>
      <div>
        <Plot f={acts[a]} x0={-5} x1={5} y0={a == "relu" ? -1 : -1.5} y1={a == "relu" ? 5 : 1.5} pt={{ x: z, y: o }} />
        <p className="mt-3 text-sm">
          z = {x.map((q, i) => `${w[i].toFixed(1)}*${q.toFixed(1)}`).join(" + ")} + {b.toFixed(1)} = <b className="text-pk">{z.toFixed(3)}</b>
        </p>
        <p className="text-sm">
          {a}(z) = <b className="text-gr">{o.toFixed(3)}</b>
        </p>
      </div>
    </div>
  );
}
