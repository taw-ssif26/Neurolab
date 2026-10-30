"use client";
import { useState } from "react";
import { ACT, ActName } from "@/lib/nn";
import Slider from "./Slider";
import FunctionPlot from "./FunctionPlot";

export default function NeuronLab() {
  const [x, setX] = useState([0.8, -0.4, 1.2]);
  const [w, setW] = useState([0.6, 1.1, -0.5]);
  const [b, setB] = useState(0.2);
  const [act, setAct] = useState<ActName>("sigmoid");
  const set = (arr: number[], f: (a: number[]) => void) => (i: number) => (v: number) => f(arr.map((q, k) => (k === i ? v : q)));
  const z = x.reduce((s, xi, i) => s + w[i] * xi, b);
  const a = ACT[act](z);
  const yRange = act === "relu" ? [-1, 5] : [-1.5, 1.5];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="panel">
        <p className="label-mute mb-4">Inputs · weights · bias</p>
        {x.map((_, i) => (
          <div key={i} className="mb-2 border-b border-line pb-2">
            <Slider label={`x${i + 1}`} value={x[i]} min={-2} max={2} onChange={set(x, setX)(i)} />
            <Slider label={`w${i + 1}`} value={w[i]} min={-2} max={2} onChange={set(w, setW)(i)} />
          </div>
        ))}
        <Slider label="b" value={b} min={-2} max={2} onChange={setB} />
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Activation function">
          {(["sigmoid", "relu", "tanh"] as ActName[]).map((n) => (
            <button key={n} className="chip" aria-pressed={act === n} onClick={() => setAct(n)}>{n}</button>
          ))}
        </div>
      </div>
      <div className="panel">
        <FunctionPlot fn={ACT[act]} xMin={-5} xMax={5} yMin={yRange[0]} yMax={yRange[1]} point={{ x: z, y: a }} />
        <div className="readout mt-4" aria-live="polite">
          z = {x.map((xi, i) => `${w[i].toFixed(2)}·${xi.toFixed(2)}`).join(" + ")} + {b.toFixed(2)}<br />
          z = <b>{z.toFixed(4)}</b><br />
          a = {act}(z) = <b>{a.toFixed(4)}</b>
        </div>
      </div>
    </div>
  );
}
