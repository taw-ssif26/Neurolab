# NEURO//LAB

This is my entry for Pixel Contest 5.0, where the theme was neural networks. I wanted to make something that explains how they work without just throwing equations at you, so the site is mostly things you can click, drag and watch. You can play with a single neuron, build a network layer by layer, follow a signal through it one step at a time, and even train a small network on a few datasets and see it learn in real time.

Everything runs in the browser. There's no backend, no database and no API calls, so once it's running there's nothing else to set up.

## What's on the site

There are four pages.

The overview is the starting point. It has an animated network in the header, a short explanation of what a neural network actually is (the brain comparison, what an artificial neuron does, why weights matter, what learning means), a look at input, hidden and output layers, and the basic maths of a neuron laid out in plain terms. It finishes with a few real-world uses and a link into the lab.

The network architecture page is where the individual pieces get explained, each with something to play with. First is a single neuron where you change the inputs, weights, bias and activation function and watch the output move along the curve. Next is a layer builder, where you pick how many inputs, hidden layers, neurons per layer and outputs you want and it draws the network and counts the connections and parameters. After that come the activation functions (sigmoid, ReLU, tanh and softmax), a step-by-step forward propagation demo on a small 2-3-1 network, and the two loss functions, mean squared error and cross-entropy, side by side so you can see how differently they punish a wrong guess.

The learning lab is the hands-on bit. It has the network builder and the neuron simulator again, and then the main experiment, where you pick a pattern (a circle, XOR quadrants, two blobs or a spiral), hit Train and watch the coloured decision boundary bend around the data while the loss curve drops. You can change the learning rate and the number of hidden units, which is a good way to get a feel for why the spiral is so much harder than the blobs. The last experiment is the XOR problem, which trains a single neuron and a network with a hidden layer side by side so you can see one fail and the other succeed.

The applications page covers where neural networks get used (vision, language, healthcare, robotics, science) and also where they fall down: overfitting, biased data, being hard to explain, the cost of training, hallucination and unreliable behaviour on unfamiliar inputs. I didn't want it to read like an advert.

## How it's built

It's a Next.js 14 project using the app router, with TypeScript and Tailwind for styling. The font is Poppins through next/font. Most pages are plain server components, and only the interactive pieces are client components. The charts and diagrams are drawn with SVG, and the decision boundary in the training lab is drawn on a canvas.

The code is split up like this:

- `app/` holds the layout and the four pages.
- `components/` holds the interactive parts. Each experiment has its own file, like `Neuron.tsx`, `Builder.tsx`, `Train.tsx` and `Xor.tsx`, plus a few small shared ones such as `Slider.tsx`, `Plot.tsx` and `Box.tsx`.
- `lib/nn.ts` is the neural network itself, along with the activation functions and loss functions.
- `lib/data.ts` generates the datasets for the training demo.

## How the training works

I wrote the network from scratch rather than pulling in a library, mostly because I wanted to understand it properly. It lives in `lib/nn.ts`. The hidden layers use tanh and the output is a single sigmoid neuron, and the loss is binary cross-entropy.

Each time you press Train, it goes through the whole dataset once per epoch. For every point it does a forward pass, works out how wrong the prediction was, and then runs backpropagation to find how much each weight and bias contributed to the error. Once it has added those up over the dataset it nudges every weight a small step in the direction that lowers the loss, and the size of that step is the learning rate slider. Because the output is a sigmoid with cross-entropy loss, the error at the output simplifies to just the prediction minus the target, which keeps the maths pretty tidy. Weights start from a seeded random generator, so you get the same result every time you reset.

The page runs a few epochs per animation frame, which is why the boundary seems to move smoothly rather than jumping.

## Things worth knowing

The XOR demo only has two possible outcomes for the single neuron. It can never get more than three of the four points right, because one straight line can't split XOR. When it sits around 50% that's not a bug, it's the point of the experiment.

On the spiral dataset the default 8 units will get there eventually but slowly, so bump the units up if you want it to look good.

The animations respect the reduced motion setting in your OS, so the pulsing network in the header stops if you've asked for that.

## References

These are the sources I leaned on while working out what to include:

- McCulloch and Pitts (1943), A logical calculus of the ideas immanent in nervous activity
- Rumelhart, Hinton and Williams (1986), Learning representations by back-propagating errors
- Goodfellow, Bengio and Courville (2016), Deep Learning
