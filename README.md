# NEURO//LAB

Website about neural networks for Pixel Contest 5.0. It explains how they work and has small experiments you can play with. Built with Next.js, TypeScript and Tailwind. Everything runs in the browser, there is no backend.
## Pages

- `/` overview, what a neural network is, layers, the maths
- `/architecture` neuron sliders, layer builder, activation functions, step by step forward pass, loss functions
- `/lab` build a network, neuron simulator, training on 4 datasets, XOR
- `/applications` uses and limitations

## Folders

- `app/` pages and layout
- `components/` the interactive parts
- `lib/nn.ts` the network code (forward pass, backprop, activations, losses)
- `lib/data.ts` the datasets used in the training demo

## How training works

The network in `lib/nn.ts` has tanh hidden layers and a sigmoid output. Each epoch it runs every sample through, works out the cross-entropy loss, backpropagates the error and updates all the weights with plain gradient descent. Weights start from a seeded random generator so results are the same every run.

## References

- McCulloch & Pitts (1943)
- Rumelhart, Hinton & Williams (1986), backpropagation
- Goodfellow, Bengio & Courville, Deep Learning (2016)
# Neurolab
