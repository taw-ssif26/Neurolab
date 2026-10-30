import type { Metadata } from "next";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import NeuronLab from "@/components/NeuronLab";
import NetworkBuilder from "@/components/NetworkBuilder";
import ActivationLab from "@/components/ActivationLab";
import ForwardProp from "@/components/ForwardProp";
import LossLab from "@/components/LossLab";

export const metadata: Metadata = { title: "Network Architecture", description: "Neurons, layers, activations, forward propagation and loss functions, each with an interactive demonstration." };

export default function Architecture() {
  return (
    <>
      <header className="wrap pb-8 pt-20">
        <p className="label">Page 02 / Architecture</p>
        <h1 className="h-display mt-5 text-[clamp(2.6rem,7vw,5.6rem)]">Anatomy of a Neural Network</h1>
        <p className="mt-6 text-xl text-mute">Every prediction begins with a signal.</p>
      </header>

      <section className="wrap pt-20">
        <SectionHead index="01" label="Artificial neurons" title="One neuron, fully exposed.">
          <p>Change any input, weight or bias. The weighted sum z and the activated output a are recomputed on every movement, and the marker shows where z lands on the activation curve.</p>
        </SectionHead>
        <Reveal><NeuronLab /></Reveal>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="02" label="Layers" title="Neurons in layers.">
          <p>Every neuron in a layer connects to every neuron in the next. Select a neuron to light up its incoming and outgoing links, and resize the network to see how quickly the parameter count grows.</p>
        </SectionHead>
        <Reveal><NetworkBuilder /></Reveal>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="03" label="Activation functions" title="The nonlinearity.">
          <p>Activation functions let networks represent curved, non-linear relationships. Choose one and drag z to see its output.</p>
        </SectionHead>
        <Reveal><ActivationLab /></Reveal>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="04" label="Forward propagation" title="Following the signal.">
          <p>A fixed 2-3-1 network (tanh hidden units, sigmoid output). Play it, pause it, or advance one computational step at a time.</p>
        </SectionHead>
        <Reveal><ForwardProp /></Reveal>
      </section>

      <section className="wrap pt-32">
        <SectionHead index="05" label="Loss functions" title="Measuring being wrong.">
          <p>Training needs a single number describing prediction error. Mean squared error suits regression; binary cross-entropy is the standard for two-class probabilities.</p>
        </SectionHead>
        <Reveal><LossLab /></Reveal>
      </section>
    </>
  );
}
