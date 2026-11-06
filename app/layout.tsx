import "./globals.css";
import { Poppins } from "next/font/google";
import Nav from "@/components/Nav";

const f = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "NEURO//LAB",
  description: "Learn how neural networks work and try them out.",
};

export default function L({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={f.className}>
        <Nav />
        {children}
        <footer className="bg-ink mt-16 py-8 text-center text-sm text-white/70">
          <p className="font-semibold text-white">NEURO//LAB</p>
          <p className="mt-1">Made for Pixel Contest 5.0 - theme: Neural Networks</p>
          <p className="mt-1">Everything here runs in your browser. No server needed.</p>
        </footer>
      </body>
    </html>
  );
}
