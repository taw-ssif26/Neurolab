"use client";
import { useState } from "react";
import { sig, relu, softmax } from "@/lib/nn";
import Slider from "./Slider";
import Plot from "./Plot";

const F: Record<string, { f: (z: number) => number; t: string; r: number[] }> = {
  Sigmoid: { f: sig, t: "1 / (1 + e^-z). Squashes everything into 0 to 1.", r: [-0.5, 1.5] },
  ReLU: { f: relu, t: "max(0, z). Negative inputs become zero, positive ones pass through.", r: [-1, 5] },
  Tanh: { f: Math.tanh, t: "Like sigmoid but goes from -1 to 1. Used in the hidden layers of the lab.", r: [-1.5, 1.5] },
  Softmax: { f: sig, t: "Turns a list of scores into probabilities that add up to 1. Here the scores are [z, 1, 0].", r: [0, 1] },
};

export default function Acts() {
  const [n, setN] = useState("Sigmoid");
  const [z, setZ] = useState(1);
  const s = softmax([z, 1, 0]);
  const c = ["bg-pk", "bg-bl", "bg-gr"];
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          {Object.keys(F).map((k) => (
            <button key={k} className={"btn " + (k == n ? "" : "btn2")} onClick={() => setN(k)}>
              {k}
            </button>
          ))}
        </div>
        <Slider l="z" v={z} a={-5} b={5} s={0.05} o={setZ} />
        <p className="mt-3 text-sm">{F[n].t}</p>
        <p className="mt-2 text-sm">
          {n == "Softmax" ? (
            <>output = <b className="text-gr">[{s.map((v) => v.toFixed(2)).join(", ")}]</b></>
          ) : (
            <>f({z.toFixed(2)}) = <b className="text-gr">{F[n].f(z).toFixed(3)}</b></>
          )}
        </p>
      </div>
      <div>
        {n == "Softmax" ? (
          <div className="flex h-56 items-end justify-around rounded border bg-white p-4">
            {s.map((v, i) => (
              <div key={i} className="text-center text-xs">
                {v.toFixed(2)}
                <div className={"mt-1 w-16 " + c[i]} style={{ height: v * 170 }} />
                class {i + 1}
              </div>
            ))}
          </div>
        ) : (
          <Plot f={F[n].f} x0={-6} x1={6} y0={F[n].r[0]} y1={F[n].r[1]} pt={{ x: z, y: F[n].f(z) }} c="#ff5d8f" />
        )}
      </div>
    </div>
  );
}
