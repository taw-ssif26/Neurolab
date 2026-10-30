"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { mulberry } from "@/lib/nn";

type Node = { layer: number; x: number; y: number; glow: number };
type Edge = { a: number; b: number; w: number };
type Pulse = { edge: Edge; t: number };

const LAYERS = [3, 5, 5, 2];
const NAMES = ["INPUT", "HIDDEN 1", "HIDDEN 2", "OUTPUT"];
const IDLE = "Signal idle. Hover a node to inspect it.";

export default function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [info, setInfo] = useState(IDLE);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const g: CanvasRenderingContext2D = ctx;
    const rand = mulberry(5);
    let W = 0, H = 0, tick = 0, raf = 0, hover = -1;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      W = r.width; H = r.height;
      canvas.width = W * d; canvas.height = H * d;
      g.setTransform(d, 0, 0, d, 0, 0);
      nodes = []; edges = [];
      LAYERS.forEach((n, l) => {
        for (let j = 0; j < n; j++) {
          nodes.push({ layer: l, x: W * (0.1 + (0.8 * l) / (LAYERS.length - 1)), y: H * (0.5 + (j - (n - 1) / 2) * 0.15), glow: 0 });
        }
      });
      nodes.forEach((a, i) => nodes.forEach((b, j) => {
        if (b.layer === a.layer + 1) edges.push({ a: i, b: j, w: rand() * 2 - 1 });
      }));
    };

    const fire = (i: number) => {
      const out = edges.filter((e) => e.a === i);
      if (out.length) pulses.push({ edge: out[Math.floor(Math.random() * out.length)], t: 0 });
    };

    const frame = () => {
      g.clearRect(0, 0, W, H);
      edges.forEach((e) => {
        const A = nodes[e.a], B = nodes[e.b];
        const hot = hover >= 0 && (e.a === hover || e.b === hover);
        g.globalAlpha = hot ? 0.95 : Math.abs(e.w) * 0.38;
        g.strokeStyle = hot ? "#55D6E8" : e.w > 0 ? "#527BFF" : "#929EAD";
        g.lineWidth = hot ? 1.6 : 1;
        g.beginPath(); g.moveTo(A.x, A.y); g.lineTo(B.x, B.y); g.stroke();
      });
      g.globalAlpha = 1;
      pulses = pulses.filter((p) => {
        p.t += 0.02;
        const A = nodes[p.edge.a], B = nodes[p.edge.b];
        g.fillStyle = "#55D6E8";
        g.beginPath(); g.arc(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t, 2.6, 0, 7); g.fill();
        if (p.t >= 1) { B.glow = 1; fire(p.edge.b); return false; }
        return true;
      });
      nodes.forEach((n, i) => {
        n.glow *= 0.96;
        g.beginPath(); g.arc(n.x, n.y, i === hover ? 11 : 8, 0, 7);
        g.fillStyle = "#080B10"; g.fill();
        g.lineWidth = 1.5;
        g.strokeStyle = n.glow > 0.1 ? "#F0B35A" : i === hover ? "#55D6E8" : "#929EAD";
        g.stroke();
        if (n.glow > 0.1) { g.fillStyle = `rgba(240,179,90,${n.glow})`; g.beginPath(); g.arc(n.x, n.y, 5, 0, 7); g.fill(); }
      });
      g.font = "10px ui-monospace, monospace"; g.fillStyle = "#929EAD";
      NAMES.forEach((s, l) => g.fillText(s, W * (0.1 + (0.8 * l) / 3) - 20, H - 10));
      if (!reduce) {
        if (++tick % 55 === 0) fire(Math.floor(Math.random() * LAYERS[0]));
        raf = requestAnimationFrame(frame);
      }
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      hover = nodes.findIndex((n) => Math.hypot(n.x - (e.clientX - r.left), n.y - (e.clientY - r.top)) < 16);
      if (reduce) frame();
      setInfo(hover < 0 ? IDLE : `layer ${nodes[hover].layer} · node ${hover} · fan-out ${edges.filter((q) => q.a === hover).length} · activation ${nodes[hover].glow.toFixed(2)}`);
    };
    const leave = () => { hover = -1; setInfo(IDLE); if (reduce) frame(); };

    layout();
    if (reduce) { nodes.slice(0, 3).forEach((n) => (n.glow = 1)); frame(); } else { fire(0); raf = requestAnimationFrame(frame); }
    const ro = new ResizeObserver(() => { layout(); if (reduce) frame(); });
    ro.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave); };
  }, [reduce]);

  return (
    <div className="panel">
      <div className="mb-3 flex items-center justify-between">
        <span className="label-mute">FIG.01 · 3-5-5-2</span>
        <span className="flex items-center gap-2"><span className="status-dot" /><span className="label-mute">live</span></span>
      </div>
      <canvas ref={ref} className="h-[320px] w-full touch-pan-y sm:h-[440px]" aria-label="Animated feed-forward neural network with signals propagating between layers" />
      <p className="readout mt-3 min-h-8" aria-live="polite">{info}</p>
    </div>
  );
}
