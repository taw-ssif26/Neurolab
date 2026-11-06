"use client";
import { useState } from "react";
import { bce, mse } from "@/lib/nn";
import Slider from "./Slider";

export default function Loss() {
  const [p, setP] = useState(0.7);
  const [y, setY] = useState(1);
  const m = mse(y, p);
  const c = bce(y, p);
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <div className="mb-3 flex gap-2">
          <button className={"btn " + (y == 1 ? "" : "btn2")} onClick={() => setY(1)}>
            target = 1
          </button>
          <button className={"btn " + (y == 0 ? "" : "btn2")} onClick={() => setY(0)}>
            target = 0
          </button>
        </div>
        <Slider l="guess" v={p} a={0.01} b={0.99} o={setP} />
        <p className="mt-4 text-sm">MSE = (y - p)^2 = <b className="text-bl">{m.toFixed(3)}</b></p>
        <p className="text-sm">Cross-entropy = -[y ln p + (1-y) ln(1-p)] = <b className="text-pk">{c.toFixed(3)}</b></p>
      </div>
      <div className="text-sm">
        <p>MSE</p>
        <div className="mb-3 h-4 rounded bg-bl/20"><div className="h-4 rounded bg-bl" style={{ width: Math.min(m, 1) * 100 + "%" }} /></div>
        <p>Cross-entropy</p>
        <div className="mb-3 h-4 rounded bg-pk/20"><div className="h-4 rounded bg-pk" style={{ width: Math.min(c / 4.6, 1) * 100 + "%" }} /></div>
        <p>Try a confident wrong guess. MSE stops at 1 but cross-entropy keeps climbing, so it punishes bad mistakes a lot more.</p>
      </div>
    </div>
  );
}
