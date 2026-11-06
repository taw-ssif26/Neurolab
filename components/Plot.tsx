type P = {
  f: (x: number) => number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  pt?: { x: number; y: number };
  c?: string;
};

export default function Plot({ f, x0, x1, y0, y1, pt, c = "#6c4bf4" }: P) {
  const W = 500;
  const H = 250;
  const sx = (x: number) => ((x - x0) / (x1 - x0)) * W;
  const sy = (y: number) => H - ((y - y0) / (y1 - y0)) * H;
  let d = "";
  for (let i = 0; i <= 150; i++) {
    const x = x0 + ((x1 - x0) * i) / 150;
    d += (i ? "L" : "M") + sx(x).toFixed(1) + " " + sy(f(x)).toFixed(1);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded border bg-white">
      <line x1={sx(0)} x2={sx(0)} y1="0" y2={H} stroke="#ccc" />
      <line y1={sy(0)} y2={sy(0)} x1="0" x2={W} stroke="#ccc" />
      <path d={d} fill="none" stroke={c} strokeWidth="3" />
      {pt && <circle cx={Math.min(W, Math.max(0, sx(pt.x)))} cy={sy(pt.y)} r="7" fill="#ff5d8f" />}
    </svg>
  );
}
