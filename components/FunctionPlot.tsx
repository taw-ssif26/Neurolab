type Props = {
  fn: (x: number) => number;
  xMin: number; xMax: number; yMin: number; yMax: number;
  point?: { x: number; y: number };
  color?: string;
};

export default function FunctionPlot({ fn, xMin, xMax, yMin, yMax, point, color = "#55D6E8" }: Props) {
  const W = 600, H = 300, N = 180;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
  const sy = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;
  const d = Array.from({ length: N + 1 }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / N;
    return `${i ? "L" : "M"}${sx(x).toFixed(1)} ${sy(fn(x)).toFixed(1)}`;
  }).join("");
  const gridX = []; for (let x = Math.ceil(xMin); x <= xMax; x++) gridX.push(x);
  const gridY = []; for (let y = Math.ceil(yMin); y <= yMax; y++) gridY.push(y);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Function plot">
      {gridX.map((x) => <line key={"x" + x} x1={sx(x)} x2={sx(x)} y1={0} y2={H} stroke="white" strokeOpacity={x === 0 ? 0.3 : 0.06} />)}
      {gridY.map((y) => <line key={"y" + y} y1={sy(y)} y2={sy(y)} x1={0} x2={W} stroke="white" strokeOpacity={y === 0 ? 0.3 : 0.06} />)}
      <path d={d} fill="none" stroke={color} strokeWidth={2} />
      {point && (
        <g>
          <line x1={sx(point.x)} x2={sx(point.x)} y1={sy(point.y)} y2={sy(0)} stroke="#F0B35A" strokeDasharray="3 3" />
          <circle cx={sx(Math.min(Math.max(point.x, xMin), xMax))} cy={sy(point.y)} r={6} fill="#F0B35A" />
        </g>
      )}
      <text x={8} y={16} className="fill-mute font-mono" fontSize={11}>y ∈ [{yMin}, {yMax}]</text>
      <text x={W - 8} y={H - 8} textAnchor="end" className="fill-mute font-mono" fontSize={11}>x ∈ [{xMin}, {xMax}]</text>
    </svg>
  );
}
