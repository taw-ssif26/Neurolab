import Link from "next/link";
import HeroNetwork from "@/components/HeroNetwork";
import NeuronSketch from "@/components/NeuronSketch";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const LAYERS = [
  ["L0", "Input layer", "Holds the raw numbers: pixel intensities, word embeddings, sensor readings. It performs no computation of its own."],
  ["L1…n", "Hidden layers", "Each neuron weighs every output of the layer before it. Stacking layers lets the network compose simple features into complicated ones."],
  ["Lₙ", "Output layer", "Produces the prediction: a probability, a class score or a continuous value. During inference, information flows strictly forward."],
];
const APPS = [
  ["Computer vision", "Image classification, detection and segmentation."],
  ["Language", "Translation, summarisation and conversational systems."],
  ["Healthcare", "Assisting clinicians in reading medical images."],
  ["Science", "Protein structure, weather emulation and astronomy."],
];
const STATS: [number, string][] = [[5, "live experiments"], [4, "activation functions"], [2, "loss functions"], [0, "servers required"]];

export default function Home() {
  return (
    <>
      <section className="wrap grid min-h-[calc(100vh-4rem)] items-center gap-12 py-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="label">Computational Intelligence / 001</p>
          <h1 className="h-display mt-6 text-[clamp(2.8rem,7.4vw,6rem)]">Inside the Architecture of Intelligence.</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mute">
            NEURO//LAB is a working research environment for artificial neural networks. Nothing here is a mock-up: every network is computing, and every curve is measured from real arithmetic running in your browser.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/architecture" className="btn btn-primary">Explore the network</Link>
            <Link href="/lab" className="btn">Enter the lab</Link>
          </div>
        </div>
        <HeroNetwork />
      </section>

      <section className="border-y border-line bg-panel/60">
        <dl className="wrap grid grid-cols-2 md:grid-cols-4">
          {STATS.map(([n, t], i) => (
            <div key={t} className={`py-8 ${i ? "md:border-l md:border-line md:pl-8" : ""}`}>
              <dt className="font-mono text-4xl text-find"><CountUp to={n} /></dt>
              <dd className="label-mute mt-2">{t}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="01" label="Foundations" title="What is a neural network?">
          <p>A neural network is a function with adjustable numbers inside it. Its design borrows loosely from biology: neurons receive signals through synapses of differing strength, and fire when the combined input is large enough.</p>
        </SectionHead>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="panel"><NeuronSketch /></Reveal>
          <Reveal delay={0.1}>
            <ol className="divide-y divide-line border-y border-line">
              {[["Biological inspiration", "Dendrites collect signals, a cell body integrates them, an axon passes the result on."],
                ["Artificial neuron", "Keeps only that skeleton: weighted inputs, a sum, and a threshold-like response."],
                ["Weighted connections", "Each weight sets how strongly one neuron influences the next. These are what get learned."],
                ["Computational learning", "Weights are nudged to reduce prediction error across many examples."]].map(([h, p], i) => (
                <li key={h} className="grid grid-cols-[48px_1fr] gap-4 py-5">
                  <span className="font-mono text-sm text-find">0{i + 1}</span>
                  <div><p className="font-display text-lg">{h}</p><p className="mt-1 text-sm leading-relaxed text-mute">{p}</p></div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="02" label="Structure" title="The architecture" />
        {LAYERS.map(([k, t, p], i) => (
          <Reveal key={t} delay={i * 0.05}>
            <div className="grid gap-4 border-t border-line py-8 md:grid-cols-[120px_1fr_1.6fr] md:gap-8">
              <span className="font-mono text-sm text-find">{k}</span>
              <h3 className="font-display text-2xl">{t}</h3>
              <p className="leading-relaxed text-mute">{p}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="wrap pt-32">
        <SectionHead index="03" label="Mathematics" title="One equation, repeated billions of times." />
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="panel">
            <p className="font-mono text-2xl leading-[2.4] text-find sm:text-3xl">z = Σ(wᵢxᵢ) + b<br />a = f(z)</p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-line border-y border-line">
              {[["xᵢ", "the inputs arriving at the neuron"], ["wᵢ", "learned weights scaling each input"], ["b", "bias, shifting the point at which the neuron activates"], ["z", "the pre-activation: a weighted sum plus the bias"], ["f", "a nonlinear activation. Without it, stacked layers collapse into one linear map"], ["a", "the neuron’s output, passed to the next layer"]].map(([s, d]) => (
                <div key={s} className="grid grid-cols-[56px_1fr] py-3"><dt className="font-mono text-signal">{s}</dt><dd className="text-sm text-mute">{d}</dd></div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="wrap pt-32">
        <Reveal className="panel grid items-end gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label">Section 04 · The Learning Lab</p>
            <h2 className="h-display mt-4 text-4xl sm:text-5xl">Train a network and watch the boundary form.</h2>
            <p className="mt-5 max-w-xl text-mute">Build architectures, run backpropagation on four datasets, and see why a single neuron cannot learn XOR.</p>
          </div>
          <div><Link href="/lab" className="btn btn-primary">Open the laboratory →</Link></div>
        </Reveal>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="05" label="In the world" title="Applications" />
        <div className="border-t border-line">
          {APPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.04}>
              <Link href="/applications" className="group grid grid-cols-[48px_1fr] items-baseline gap-4 border-b border-line py-7 transition-colors hover:bg-panel sm:grid-cols-[48px_1fr_1.2fr_auto] sm:px-3">
                <span className="font-mono text-sm text-find">0{i + 1}</span>
                <span className="font-display text-2xl sm:text-3xl">{t}</span>
                <span className="col-span-2 text-sm text-mute sm:col-span-1">{d}</span>
                <span className="hidden text-mute transition-transform group-hover:translate-x-1 group-hover:text-signal sm:block">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
