import type { Metadata } from "next";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import NetworkBuilder from "@/components/NetworkBuilder";
import NeuronLab from "@/components/NeuronLab";
import PatternLab from "@/components/PatternLab";
import XorLab from "@/components/XorLab";

export const metadata: Metadata = { title: "The Learning Lab", description: "Build, train and test real neural networks entirely in your browser." };

export default function Lab() {
  return (
    <>
      <header className="wrap pb-8 pt-20">
        <div className="flex items-center gap-3"><span className="status-dot" /><p className="label">Page 03 / Laboratory · online</p></div>
        <h1 className="h-display mt-5 text-[clamp(2.6rem,7vw,5.6rem)]">The Learning Laboratory</h1>
        <p className="mt-6 text-xl text-mute">Observe. Experiment. Understand.</p>
      </header>

      <section className="wrap pt-20">
        <SectionHead index="E1" label="Experiment 01" title="Build a network." />
        <Reveal><NetworkBuilder /></Reveal>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="E2" label="Experiment 02" title="Neuron simulator." />
        <Reveal><NeuronLab /></Reveal>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="E3·4" label="Experiments 03 and 04" title="Pattern recognition and the learning process.">
          <p>A two-hidden-layer network with tanh units and a sigmoid output is trained by full-batch gradient descent on binary cross-entropy. Each epoch runs a forward pass, computes the loss, backpropagates gradients and updates every weight. Nothing is pre-recorded.</p>
        </SectionHead>
        <Reveal><PatternLab /></Reveal>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="E5" label="Experiment 05" title="The XOR problem.">
          <p>XOR is not linearly separable: no single straight line splits its outputs correctly, so a single neuron can classify at most three of the four cases. One hidden layer fixes this.</p>
        </SectionHead>
        <Reveal><XorLab /></Reveal>
      </section>
    </>
  );
}
