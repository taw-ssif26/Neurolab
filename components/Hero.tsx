const L = [3, 5, 5, 2];
const C = ["#ffc83d", "#ffffff", "#1fb58f", "#2d9cdb"];
const cx = (l: number) => 60 + l * 160;
const cy = (l: number, j: number) => 150 + (j - (L[l] - 1) / 2) * 52;

export default function Hero() {
  const e = [];
  for (let l = 0; l < 3; l++)
    for (let a = 0; a < L[l]; a++)
      for (let b = 0; b < L[l + 1]; b++)
        e.push(<line key={`${l}${a}${b}`} x1={cx(l)} y1={cy(l, a)} x2={cx(l + 1)} y2={cy(l + 1, b)} stroke="white" strokeOpacity="0.3" />);
  return (
    <svg viewBox="0 0 600 300" className="w-full max-w-xl" role="img" aria-label="A small neural network">
      {e}
      {L.map((n, l) =>
        Array.from({ length: n }, (_, j) => (
          <circle key={`${l}${j}`} cx={cx(l)} cy={cy(l, j)} r="11" fill={C[l]} className="pulse" style={{ animationDelay: l * 0.4 + j * 0.15 + "s" }} />
        ))
      )}
    </svg>
  );
}
