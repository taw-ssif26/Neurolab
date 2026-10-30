"use client";
import { useMemo, useState } from "react";
import Slider from "./Slider";

export default function NetworkBuilder() {
  const [inputs, setInputs] = useState(3);
  const [hidden, setHidden] = useState(2);
  const [width, setWidth] = useState(5);
  const [outputs, setOutputs] = useState(2);
  const [sel, setSel] = useState<[number, number] | null>(null);

  const layers = useMemo(() => [inputs, ...Array(hidden).fill(width), outputs] as number[], [inputs, hidden, width, outputs]);
  const px = (l: number) => 70 + (l * 460) / (layers.length - 1);
  const py = (l: number, j: number) => 170 + (j - (layers[l] - 1) / 2) * 34;
  const edges = useMemo(() => {
    const out: { l: number; a: number; b: number }[] = [];
    for (let l = 0; l < layers.length - 1; l++) for (let a = 0; a < layers[l]; a++) for (let b = 0; b < layers[l + 1]; b++) out.push({ l, a, b });
    return out;
  }, [layers]);
  const params = layers.slice(1).reduce((s, n, i) => s + layers[i] * n + n, 0);
  const valid = sel && sel[0] < layers.length && sel[1] < layers[sel[0]] ? sel : null;
  const kind = (l: number) => (l === 0 ? "input" : l === layers.length - 1 ? "output" : `hidden ${l}`);
  const isHot = (e: { l: number; a: number; b: number }) => !!valid && ((valid[0] === e.l && valid[1] === e.a) || (valid[0] === e.l + 1 && valid[1] === e.b));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.7fr]">
      <div className="panel">
        <Slider label="inputs" value={inputs} min={1} max={8} step={1} digits={0} onChange={setInputs} />
        <Slider label="hidden" value={hidden} min={1} max={4} step={1} digits={0} onChange={setHidden} />
        <Slider label="width" value={width} min={1} max={8} step={1} digits={0} onChange={setWidth} />
        <Slider label="outputs" value={outputs} min={1} max={6} step={1} digits={0} onChange={setOutputs} />
        <div className="readout mt-5" aria-live="polite">
          architecture <b>{layers.join("–")}</b><br />
          connections <b>{edges.length}</b><br />
          parameters <b>{params}</b> <span className="text-mute">(weights + biases)</span><br />
          {valid
            ? <>selected <b>{kind(valid[0])} · n{valid[1] + 1}</b>: {valid[0] > 0 ? layers[valid[0] - 1] : 0} incoming, {valid[0] < layers.length - 1 ? layers[valid[0] + 1] : 0} outgoing</>
            : <span>select a neuron to inspect its links</span>}
        </div>
      </div>
      <div className="panel">
        <svg viewBox="0 0 600 340" className="w-full" role="group" aria-label="Network diagram. Neurons are selectable.">
          {edges.map((e, i) => (
            <line key={i} x1={px(e.l)} y1={py(e.l, e.a)} x2={px(e.l + 1)} y2={py(e.l + 1, e.b)} stroke={isHot(e) ? "#55D6E8" : "#527BFF"} strokeOpacity={isHot(e) ? 0.95 : valid ? 0.08 : 0.28} />
          ))}
          {layers.map((n, l) => Array.from({ length: n }, (_, j) => {
            const on = valid && valid[0] === l && valid[1] === j;
            const color = l === 0 ? "#929EAD" : l === layers.length - 1 ? "#F0B35A" : "#55D6E8";
            return (
              <circle
                key={`${l}-${j}`} cx={px(l)} cy={py(l, j)} r={on ? 12 : 9} fill={on ? color : "#080B10"} stroke={color} strokeWidth={1.5}
                tabIndex={0} role="button" aria-label={`${kind(l)} neuron ${j + 1}`} className="cursor-pointer outline-none focus-visible:stroke-white"
                onClick={() => setSel(on ? null : [l, j])}
                onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSel(on ? null : [l, j]); } }}
              />
            );
          }))}
          {layers.map((_, l) => <text key={l} x={px(l)} y={332} textAnchor="middle" className="fill-mute font-mono" fontSize={10}>{kind(l).toUpperCase()}</text>)}
        </svg>
      </div>
    </div>
  );
}
