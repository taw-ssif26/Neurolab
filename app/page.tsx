import Link from "next/link";
import Hero from "@/components/Hero";
import Box from "@/components/Box";

const A = [
  ["Computer vision", "Recognising what is in a picture.", "pk"],
  ["Language", "Translation, chatbots, summaries.", "bl"],
  ["Healthcare", "Helping doctors read scans.", "gr"],
  ["Science", "Predicting protein shapes and weather.", "ye"],
];

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-pu to-pk text-white">
        <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 py-14 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">How do neural networks actually work?</h1>
            <p className="mt-4 text-lg text-white/90">
              A small site where you can poke at neurons, watch signals move through layers and train a real network in your browser.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/architecture" className="btn bg-ye text-ink hover:bg-yellow-300">Explore the network</Link>
              <Link href="/lab" className="btn btn2 border-white bg-transparent text-white hover:bg-white/20">Go to the lab</Link>
            </div>
          </div>
          <Hero />
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-14">
        <section>
          <h2 className="text-3xl font-bold">What is a neural network?</h2>
          <p className="mt-3 max-w-3xl">
            A neural network is a program made of lots of tiny units called neurons. Each one takes some numbers in, does a little maths and passes a number on. On their own they are simple, but connect thousands of them together and they can learn to recognise faces, translate languages or play games.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Box c="pk"><h3 className="font-semibold">Biological inspiration</h3><p className="mt-2 text-sm">Brain cells receive signals, add them up and fire if the total is big enough. Artificial neurons copy that idea.</p></Box>
            <Box c="bl"><h3 className="font-semibold">Artificial neuron</h3><p className="mt-2 text-sm">Multiply each input by a weight, add a bias, then squash the result with an activation function.</p></Box>
            <Box c="gr"><h3 className="font-semibold">Weighted connections</h3><p className="mt-2 text-sm">A weight says how much one neuron cares about another. Big weight, big influence.</p></Box>
            <Box c="ye"><h3 className="font-semibold">Learning</h3><p className="mt-2 text-sm">Training means nudging the weights bit by bit until the answers get less wrong.</p></Box>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold">The layers</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Box c="ye"><h3 className="font-semibold">Input layer</h3><p className="mt-2 text-sm">Where the raw data goes in: pixels, numbers, sensor readings. No maths happens here.</p></Box>
            <Box c="gr"><h3 className="font-semibold">Hidden layers</h3><p className="mt-2 text-sm">The middle. Each layer builds on the last, finding more complex patterns as you go deeper.</p></Box>
            <Box c="pk"><h3 className="font-semibold">Output layer</h3><p className="mt-2 text-sm">The answer comes out here, like a probability or a category.</p></Box>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold">The maths</h2>
          <div className="mt-5 grid items-center gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-ink p-6 text-xl text-ye">
              <p>z = w1*x1 + w2*x2 + ... + b</p>
              <p className="mt-2">a = f(z)</p>
            </div>
            <ul className="space-y-1 text-sm">
              <li><b className="text-pu">x</b> are the inputs</li>
              <li><b className="text-pk">w</b> are the weights (what the network learns)</li>
              <li><b className="text-gr">b</b> is the bias, which shifts the result up or down</li>
              <li><b className="text-bl">f</b> is the activation function, which adds the non-linear bit</li>
              <li><b className="text-ye">a</b> is the neuron output that goes to the next layer</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl bg-ye/30 p-8">
          <h2 className="text-3xl font-bold">Try it yourself</h2>
          <p className="mt-2">Build a network, train it on some data and see why XOR is such a famous problem.</p>
          <Link href="/lab" className="btn mt-4">Open the learning lab</Link>
        </section>

        <section>
          <h2 className="text-3xl font-bold">Where they are used</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {A.map(([t, d, c]) => (
              <Box key={t} c={c}><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm">{d}</p></Box>
            ))}
          </div>
          <Link href="/applications" className="mt-5 inline-block font-medium text-pu underline">See more</Link>
        </section>
      </div>
    </>
  );
}
