import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";

export const metadata: Metadata = { title: "Applications", description: "How neural networks shape modern technology, and where they fall short." };

const FIELDS = [
  { id: "01", name: "Computer vision", tag: "Image · Video", body: "Convolutional and transformer networks classify images, detect and localise objects, segment scenes and recognise faces. Accuracy depends heavily on how closely deployment conditions resemble the training data.", items: ["Image classification", "Object detection", "Facial recognition", "Visual understanding"] },
  { id: "02", name: "Natural language processing", tag: "Text · Speech", body: "Language models learn the statistical structure of text and use it to translate, summarise, classify sentiment and hold conversations. Fluent output is not a guarantee of factual accuracy.", items: ["Language modelling", "Translation", "Sentiment analysis", "Conversational AI"] },
  { id: "03", name: "Healthcare", tag: "Clinical · Biomedical", body: "Networks help clinicians read scans, flag possible disease and screen candidate molecules. They assist rather than replace professionals, and require careful clinical validation.", items: ["Medical image analysis", "Disease-detection assistance", "Biomedical research"] },
  { id: "04", name: "Robotics", tag: "Perception · Control", body: "Learned perception lets machines identify objects and map surroundings, while learned policies can guide control. Physical environments are noisy, so safety-critical systems rarely trust a network alone.", items: ["Object recognition", "Navigation", "Control systems", "Autonomous decisions"] },
  { id: "05", name: "Scientific research", tag: "Discovery", body: "Networks predict protein structures, emulate expensive physical simulations and sift large astronomical surveys. They generate hypotheses faster; experiments and theory still have to confirm them.", items: ["Molecular prediction", "Weather modelling", "Astronomy", "Computational discovery"] },
];
const LIMITS = [
  ["Overfitting", "A network can memorise noise in its training data and then generalise poorly. Regularisation, more data and early stopping reduce this."],
  ["Data bias", "Models reproduce the patterns, and the imbalances, of the data they are trained on."],
  ["Interpretability", "Every weight can be inspected, yet explaining why a deep network produced a given output remains an open research problem."],
  ["Computational cost", "Training large models needs substantial energy and specialised hardware."],
  ["Hallucination", "Generative systems can produce plausible but false statements, with no built-in signal of uncertainty."],
  ["Reliability and generalisation", "Performance can fall sharply on inputs unlike the training distribution."],
];

export default function Applications() {
  return (
    <>
      <header className="wrap pb-8 pt-20">
        <p className="label">Page 04 / Applications</p>
        <h1 className="h-display mt-5 text-[clamp(2.6rem,7vw,5.6rem)]">Intelligence Beyond the Laboratory</h1>
        <p className="mt-6 max-w-2xl text-xl text-mute">The same loop of weighted sums, nonlinearities and gradient descent that you can run on the previous page, scaled up by many orders of magnitude.</p>
      </header>

      <section className="wrap pt-20">
        {FIELDS.map((f) => (
          <Reveal key={f.id}>
            <article className="grid gap-6 border-t border-line py-14 lg:grid-cols-[160px_1fr_1fr] lg:gap-12">
              <div><p className="font-mono text-5xl text-find">{f.id}</p><p className="label mt-3">{f.tag}</p></div>
              <div><h2 className="h-display text-3xl sm:text-4xl">{f.name}</h2><p className="mt-5 leading-relaxed text-mute">{f.body}</p></div>
              <ul className="self-end border-t border-line">
                {f.items.map((it) => <li key={it} className="border-b border-line py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink">{it}</li>)}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="wrap pt-24">
        <SectionHead index="!" label="Honest limits" title="Limitations and challenges.">
          <p>Neural networks are powerful statistical tools, not general reasoners. Knowing where they fail matters as much as knowing where they succeed.</p>
        </SectionHead>
        <div className="grid border-l border-t border-line md:grid-cols-2">
          {LIMITS.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 0.06}>
              <div className="h-full border-b border-r border-line p-7">
                <p className="font-mono text-xs text-find">0{i + 1}</p>
                <h3 className="mt-3 font-display text-xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
