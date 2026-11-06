"use client";
import { useEffect, useState } from "react";
import { Net } from "@/lib/nn";

const X = [[0, 0], [0, 1], [1, 0], [1, 1]];
const Y = [0, 1, 1, 0];
const mkn = () => ({ a: new Net([2, 1], 2), b: new Net([2, 4, 1], 9) });

export default function Xor() {
  const [n, setN] = useState(mkn);
  const [e, setE] = useState(0);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!on) return;
    let id = 0;
    const go = () => {
      for (let i = 0; i < 25; i++) {
        n.a.fit(X, Y, 0.8);
        n.b.fit(X, Y, 0.8);
      }
      setE((v) => v + 25);
      id = requestAnimationFrame(go);
    };
    id = requestAnimationFrame(go);
    return () => cancelAnimationFrame(id);
  }, [on, n]);

  const pa = X.map((x) => n.a.p(x));
  const pb = X.map((x) => n.b.p(x));
  const ac = (p: number[]) => p.filter((v, i) => v > 0.5 == (Y[i] == 1)).length * 25;

  return (
    <div>
      <button className="btn mr-2" onClick={() => setOn(!on)}>{on ? "Pause" : "Train both"}</button>
      <button className="btn btn2" onClick={() => { setOn(false); setN(mkn()); setE(0); }}>Reset</button>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">Input</th>
            <th>Target</th>
            <th className="text-pk">Single neuron</th>
            <th className="text-gr">With hidden layer</th>
          </tr>
        </thead>
        <tbody>
          {X.map((x, i) => (
            <tr key={i} className="border-b">
              <td className="py-1.5">{x.join(", ")}</td>
              <td>{Y[i]}</td>
              <td>{pa[i].toFixed(3)}</td>
              <td>{pb[i].toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-sm">
        Epoch {e}. Single neuron: <b className="text-pk">{ac(pa)}%</b>. Hidden layer: <b className="text-gr">{ac(pb)}%</b>.
      </p>
    </div>
  );
}
