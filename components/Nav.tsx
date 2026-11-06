"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const L = [
  ["/", "Overview"],
  ["/architecture", "Network Architecture"],
  ["/lab", "Learning Lab"],
  ["/applications", "Applications"],
];

export default function Nav() {
  const p = usePathname();
  return (
    <header className="bg-pu text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          NEURO<span className="text-ye">//</span>LAB
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm">
          {L.map(([h, t]) => (
            <Link key={h} href={h} className={"rounded-full px-3 py-1.5 " + (p == h ? "bg-white text-pu font-semibold" : "hover:bg-white/20")}>
              {t}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
