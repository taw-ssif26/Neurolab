type P = { l: string; v: number; a: number; b: number; s?: number; o: (n: number) => void };

export default function Slider({ l, v, a, b, s = 0.01, o }: P) {
  return (
    <label className="my-1 flex items-center gap-3 text-sm">
      <span className="w-14">{l}</span>
      <input className="flex-1 accent-pu" type="range" min={a} max={b} step={s} value={v} onChange={(e) => o(+e.target.value)} />
      <span className="w-12 text-right font-medium text-pu">{v.toFixed(s >= 1 ? 0 : 2)}</span>
    </label>
  );
}
