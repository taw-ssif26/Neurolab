"use client";
import { useState } from "react";
import { Network } from "@/lib/nn";
import { useRaf } from "@/hooks/useRaf";

const X = [[0, 0], [0, 1], [1, 0], [1, 1]];
const Y = [0, 1, 1, 0];
const create = () => ({ single: new Network([2, 1], 2), deep: new Network([2, 4, 1], 9) });

export default function XorLab() {
  const [nets, setNets] = useState(create);
  const [epoch, setEpoch] = useState(0);
  const [running, setRunning] = useState(false);

  useRaf(running, () => {
    for (let i = 0; i < 25; i++) { nets.single.step(X, Y, 0.8); nets.deep.step(X, Y, 0.8); }
    setEpoch((e) => e + 25);
  });

  const ps = X.map((x) => nets.single.predict(x));
  const pd = X.map((x) => nets.deep.predict(x));
  const acc = (p: number[]) => (p.filter((v, i) => v > 0.5 === (Y[i] === 1)).length / 4) * 100;

  return (
    <div className="panel">
      <div className="mb-5 flex gap-2">
        <button className="btn btn-primary" onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Train both"}</button>
        <button className="btn" onClick={() => { setRunning(false); setNets(create()); setEpoch(0); }}>Reset</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] font-mono text-[13px]">
          <thead>
            <tr className="border-b border-line text-left text-mute"><th className="py-2">x₁ x₂</th><th>target</th><th>single neuron</th><th>2-4-1 network</th></tr>
          </thead>
          <tbody>
            {X.map((x, i) => (
              <tr key={i} className="border-b border-line">
                <td className="py-2">{x.join("  ")}</td><td className="text-find">{Y[i]}</td><td>{ps[i].toFixed(3)}</td><td className="text-signal">{pd[i].toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="readout mt-4" aria-live="polite">
        epoch <b>{epoch}</b><br />
        single neuron accuracy <b>{acc(ps)}%</b> · a linear boundary can classify at most 3 of 4 points<br />
        2-4-1 network accuracy <b>{acc(pd)}%</b>
      </div>
    </div>
  );
}
