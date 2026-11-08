import Builder from "@/components/Builder";
import Neuron from "@/components/Neuron";
import Train from "@/components/Train";
import Xor from "@/components/Xor";
import Box from "@/components/Box";

export const metadata = { title: "Learning Lab | NEURO//LAB" };

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-10">
      <div>
        <h1 className="text-4xl font-bold">The learning lab</h1>
        <p className="mt-2 text-lg text-ink/70">Observe, experiment, understand.</p>
      </div>

      <section>
        <h2 className="mb-3 text-2xl font-bold text-pu">Experiment 1: build a network</h2>
        <Box c="pu"><Builder /></Box>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-bold text-pk">Experiment 2: neuron simulator</h2>
        <Box c="pk"><Neuron /></Box>
      </section>

      <section>
        <h2 className="mb-1 text-2xl font-bold text-gr">Experiments 3 and 4: pattern recognition and learning</h2>
        <p className="mb-4 text-sm">
          This network really is being trained. Each epoch it makes a guess for every dot, measures the error and uses backpropagation to adjust every weight. Pick a pattern and press Train. Spiral is the hard one, so try more units.
        </p>
        <Box c="gr"><Train /></Box>
      </section>

      <section>
        <h2 className="mb-1 text-2xl font-bold text-bl">Experiment 5: the XOR problem</h2>
        <p className="mb-4 text-sm">
          XOR says the output is 1 only when exactly one input is 1. No single straight line can separate that, so one neuron tops out at 3 out of 4. Add a hidden layer and it works.
        </p>
        <Box c="bl"><Xor /></Box>
      </section>
    </div>
  );
}
