import Neuron from "@/components/Neuron";
import Builder from "@/components/Builder";
import Acts from "@/components/Acts";
import Forward from "@/components/Forward";
import Loss from "@/components/Loss";
import Box from "@/components/Box";

export const metadata = { title: "Network Architecture | NEURO//LAB" };

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-10">
      <div>
        <h1 className="text-4xl font-bold">Anatomy of a neural network</h1>
        <p className="mt-2 text-lg text-ink/70">Every prediction starts with a signal.</p>
      </div>

      <section>
        <h2 className="mb-1 text-2xl font-bold text-pu">1. One neuron</h2>
        <p className="mb-4 text-sm">Move the sliders. The weighted sum z is worked out, then the activation function squashes it. The pink dot shows where z lands on the curve.</p>
        <Box c="pu"><Neuron /></Box>
      </section>

      <section>
        <h2 className="mb-1 text-2xl font-bold text-pk">2. Layers</h2>
        <p className="mb-4 text-sm">Every neuron connects to every neuron in the next layer, so the number of weights grows fast. Change the shape and watch the counts.</p>
        <Box c="pk"><Builder /></Box>
      </section>

      <section>
        <h2 className="mb-1 text-2xl font-bold text-gr">3. Activation functions</h2>
        <p className="mb-4 text-sm">Without these, a network with a hundred layers would still just be one straight-line equation. They are what lets it learn curves.</p>
        <Box c="gr"><Acts /></Box>
      </section>

      <section>
        <h2 className="mb-1 text-2xl font-bold text-bl">4. Forward propagation</h2>
        <p className="mb-4 text-sm">Press Next step to follow one set of inputs all the way to the output of a small 2-3-1 network.</p>
        <Box c="bl"><Forward /></Box>
      </section>

      <section>
        <h2 className="mb-1 text-2xl font-bold text-ink">5. Loss functions</h2>
        <p className="mb-4 text-sm">A loss function turns &quot;how wrong was that?&quot; into a single number. Training tries to make that number small.</p>
        <Box c="ye"><Loss /></Box>
      </section>
    </div>
  );
}
