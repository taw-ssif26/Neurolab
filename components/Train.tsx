"use client";
import { useEffect, useRef, useState } from "react";
import { Net } from "@/lib/nn";
import { mk, Kind } from "@/lib/data";
import Slider from "./Slider";

const S = 420;
const K: [Kind, string][] = [["circle", "Circle"], ["xor", "XOR"], ["blobs", "Blobs"], ["spiral", "Spiral"]];

export default function Train() {
  const cv = useRef<HTMLCanvasElement>(null);
  const net = useRef<Net | null>(null);
  const d = useRef(mk("circle"));
  const ep = useRef(0);
  const [k, setK] = useState<Kind>("circle");
  const [lr, setLr] = useState(0.3);
  const [u, setU] = useState(8);
  const [on, setOn] = useState(false);
  const [r, setR] = useState(0);
  const [st, setSt] = useState({ e: 0, l: NaN, a: NaN });
  const [h, setH] = useState<number[]>([]);
  const lrr = useRef(lr);
  lrr.current = lr;

  const draw = () => {
    const c = cv.current?.getContext("2d");
    const n = net.current;
    if (!c || !n) return;
    c.clearRect(0, 0, S, S);
    const g = S / 35;
    for (let i = 0; i < 35; i++)
      for (let j = 0; j < 35; j++) {
        const p = n.p([((i + 0.5) / 35) * 2 - 1, 1 - ((j + 0.5) / 35) * 2]);
        c.fillStyle = `rgba(${Math.round(45 + p * 210)},${Math.round(156 - p * 56)},${Math.round(219 - p * 160)},0.35)`;
        c.fillRect(i * g, j * g, g + 1, g + 1);
      }
    d.current.X.forEach((q, i) => {
      c.beginPath();
      c.arc(((q[0] + 1) / 2) * S, ((1 - q[1]) / 2) * S, 4, 0, 7);
      c.fillStyle = d.current.Y[i] ? "#ff9f1c" : "#2d9cdb";
      c.fill();
      c.strokeStyle = "white";
      c.stroke();
    });
  };

  useEffect(() => {
    setOn(false);
    d.current = mk(k);
    net.current = new Net([2, u, u, 1], 5);
    ep.current = 0;
    setSt({ e: 0, l: NaN, a: NaN });
    setH([]);
    draw();
  }, [k, u, r]);

  useEffect(() => {
    if (!on) return;
    let id = 0;
    const go = () => {
      const n = net.current;
      if (!n) return;
      let q = { loss: 0, acc: 0 };
      for (let i = 0; i < 6; i++) {
        q = n.fit(d.current.X, d.current.Y, lrr.current);
        ep.current++;
      }
      setSt({ e: ep.current, l: q.loss, a: q.acc });
      setH((v) => (v.length > 400 ? v.filter((_, i) => i % 2 == 0) : v).concat(q.loss));
      draw();
      id = requestAnimationFrame(go);
    };
    id = requestAnimationFrame(go);
    return () => cancelAnimationFrame(id);
  }, [on]);

  const m = Math.max(0.8, ...h);
  const pts = h.map((v, i) => `${(i / Math.max(h.length - 1, 1)) * 400},${100 - (v / m) * 95}`).join(" ");

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          {K.map(([id, t]) => (
            <button key={id} className={"btn " + (k == id ? "" : "btn2")} onClick={() => setK(id)}>
              {t}
            </button>
          ))}
        </div>
        <Slider l="rate" v={lr} a={0.01} b={1} o={setLr} />
        <Slider l="units" v={u} a={2} b={16} s={1} o={setU} />
        <div className="my-3 flex gap-2">
          <button className="btn" onClick={() => setOn(!on)}>{on ? "Pause" : "Train"}</button>
          <button className="btn btn2" onClick={() => setR(r + 1)}>Reset</button>
        </div>
        <p className="text-sm">
          Epoch <b className="text-pu">{st.e}</b> | Loss <b className="text-pk">{isNaN(st.l) ? "-" : st.l.toFixed(4)}</b> | Accuracy{" "}
          <b className="text-gr">{isNaN(st.a) ? "-" : (st.a * 100).toFixed(1) + "%"}</b>
        </p>
        <svg viewBox="0 0 400 100" className="mt-3 w-full rounded border bg-white">
          <polyline points={pts} fill="none" stroke="#ff5d8f" strokeWidth="2" />
        </svg>
        <p className="text-xs text-ink/60">Loss over time (lower is better)</p>
      </div>
      <div>
        <canvas ref={cv} width={S} height={S} className="w-full rounded border bg-white" />
        <p className="mt-1 text-xs text-ink/60">Blue area = class 0, orange area = class 1. Dots are the training data.</p>
      </div>
    </div>
  );
}
