"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LINKS } from "@/lib/links";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-void/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold tracking-[0.08em]" aria-label="NEURO//LAB home">
          NEURO<span className="text-signal">//</span>LAB
        </Link>
        <nav aria-label="Primary" className="hidden h-full md:flex">
          {LINKS.map((l) => {
            const on = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={on ? "page" : undefined}
                className={`relative flex h-full items-center px-5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${on ? "text-ink" : "text-mute hover:text-ink"}`}
              >
                {l.label}
                {on && (
                  <motion.span layoutId="nav-active" className="absolute inset-x-5 bottom-0 h-[2px] bg-signal" />
                )}
              </Link>
            );
          })}
        </nav>
        <button
          className="chip md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-void md:hidden">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path === l.href ? "page" : undefined}
              className={`flex min-h-[56px] items-center gap-4 border-b border-line px-5 font-mono text-xs uppercase tracking-[0.16em] ${path === l.href ? "border-l-2 border-l-signal text-ink" : "text-mute"}`}
            >
              <span className="text-find">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
