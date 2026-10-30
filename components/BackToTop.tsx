"use client";

export default function BackToTop() {
  return (
    <button
      className="btn mt-6"
      onClick={() => {
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
      }}
    >
      Back to top ↑
    </button>
  );
}
