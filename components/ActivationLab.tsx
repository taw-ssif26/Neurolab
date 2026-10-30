"use client";
import { useState } from "react";
import { sigmoid, relu, softmax } from "@/lib/nn";
import Slider from "./Slider";
import FunctionPlot from "./FunctionPlot";

const FNS = {
  Sigmoid: { f: sigmoid, formula: "σ(z) = 1 / (1 + e⁻ᶻ)", note: "Squashes any input into (0, 1). Saturates for large |z|, which slows learning.", range: [-0.5, 1.5] },
  ReLU: { f: relu, formula: "f(z) = max(0, z)", note: "Cheap and non-saturating for z > 0. Neurons with z < 0 output exactly zero.", range: [-1, 5] },
  Tanh: { f: Math.tanh, formula: "tanh(z) = (eᶻ − e⁻ᶻ) / (eᶻ + e⁻ᶻ)", note: "Zero-centred output in (−1, 1). Used for the hidden units in this lab.", range: [-1.5, 1.5] },
} as const;
type Name = keyof typeof FNS | "Softmax";

export default function ActivationLab() {
  const [name, setName] = useState<Name>("Sigmoid");
  const [z, setZ] = useState(1);
  const logits = [z, 1, 0];
  const sm = softmax(logits);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div className="panel">
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Function">
          {(["Sigmoid", "ReLU", "Tanh", "Softmax"] as Name[]).map((n) => (
            <button key={n} className="chip" aria-pressed={name === n} onClick={() => setName(n)}>{n}</button>
          ))}
        </div>
        <Slider label="z" value={z} min={-5} max={5} step={0.05} onChange={setZ} />
        <div className="readout mt-5" aria-live="polite">
          {name === "Softmax" ? (
            <>
              softmax(zᵢ) = eᶻⁱ / Σⱼ eᶻʲ<br />
              logits = [{logits.map((v) => v.toFixed(2)).join(", ")}]<br />
              output = [<b>{sm.map((v) => v.toFixed(3)).join(", ")}</b>]<br />
              Σ = {sm.reduce((s, v) => s + v, 0).toFixed(3)}
            </>
          ) : (
            <>
              {FNS[name].formula}<br />
              f({z.toFixed(2)}) = <b>{FNS[name].f(z).toFixed(4)}</b>
            </>
          )}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-mute">
          {name === "Softmax" ? "Turns a vector of scores into a probability distribution over classes. Raise z and watch the first class absorb the probability mass." : FNS[name].note}
        </p>
      </div>
      <div className="panel">
        {name === "Softmax" ? (
          <svg viewBox="0 0 600 300" className="w-full" role="img" aria-label="Softmax output probabilities">
            {sm.map((v, i) => (
              <g key={i}>
                <rect x={60 + i * 180} y={270 - v * 240} width={110} height={v * 240} fill={i === 0 ? "#F0B35A" : "#527BFF"} />
                <text x={115 + i * 180} y={262 - v * 240} textAnchor="middle" className="fill-ink font-mono" fontSize={13}>{v.toFixed(3)}</text>
                <text x={115 + i * 180} y={292} textAnchor="middle" className="fill-mute font-mono" fontSize={11}>class {i + 1} · z={logits[i].toFixed(1)}</text>
              </g>
            ))}
          </svg>
        ) : (
          <FunctionPlot fn={FNS[name].f} xMin={-6} xMax={6} yMin={FNS[name].range[0]} yMax={FNS[name].range[1]} point={{ x: z, y: FNS[name].f(z) }} />
        )}
      </div>
    </div>
  );
}
