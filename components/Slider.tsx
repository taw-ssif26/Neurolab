"use client";
import { useId } from "react";

type Props = { label: string; value: number; min: number; max: number; step?: number; digits?: number; onChange: (v: number) => void };

export default function Slider({ label, value, min, max, step = 0.01, digits = 2, onChange }: Props) {
  const id = useId();
  return (
    <div className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center gap-3">
      <label htmlFor={id} className="font-mono text-xs text-mute">{label}</label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <output htmlFor={id} className="text-right font-mono text-xs text-signal">{value.toFixed(digits)}</output>
    </div>
  );
}
