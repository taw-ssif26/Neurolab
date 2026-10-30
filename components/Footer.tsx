import Link from "next/link";
import { LINKS } from "@/lib/links";
import BackToTop from "./BackToTop";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line bg-panel">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold tracking-[0.08em]">
            NEURO<span className="text-signal">//</span>LAB
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mute">
            An interactive laboratory for understanding artificial neural networks. Every experiment
            runs locally in your browser, with no server and no pre-recorded results.
          </p>
          <p className="label-mute mt-6">Pixel Contest 5.0 · Theme: Neural Networks</p>
        </div>
        <div>
          <p className="label mb-4">Navigate</p>
          <ul className="space-y-2 text-sm text-mute">
            {LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-ink">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4">Built with</p>
          <p className="font-mono text-xs leading-7 text-mute">
            Next.js · React · TypeScript<br />Tailwind CSS · Framer Motion<br />Canvas &amp; SVG
          </p>
          <BackToTop />
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap label-mute py-5">Ref. McCulloch &amp; Pitts 1943 · Rumelhart, Hinton &amp; Williams 1986 · Goodfellow et al. 2016</p>
      </div>
    </footer>
  );
}
