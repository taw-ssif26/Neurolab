import Reveal from "./Reveal";

export default function SectionHead({ index, label, title, children }: { index: string; label: string; title: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mb-12 grid gap-6 md:grid-cols-[180px_1fr]">
      <div>
        <p className="font-mono text-4xl text-find">{index}</p>
        <p className="label mt-2">{label}</p>
      </div>
      <div>
        <h2 className="h-display text-4xl sm:text-5xl">{title}</h2>
        {children && <div className="mt-5 max-w-2xl text-[17px] leading-relaxed text-mute">{children}</div>}
      </div>
    </Reveal>
  );
}
