# NEURO//LAB

An interactive website about artificial neural networks, built for Pixel Contest 5.0 (theme: Neural Networks).

## Stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion. Visualisations use Canvas and SVG. There is no backend and no database.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build && npm start
```

Node 18.17 or newer is required.

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero network, foundations, architecture, mathematics, lab preview, applications |
| `/architecture` | Neuron simulator, layer explorer, activation functions, forward propagation stepper, loss functions |
| `/lab` | Network builder, neuron simulator, pattern recognition and training (backpropagation), XOR |
| `/applications` | Five application areas and six limitations |

## Structure

```
app/            routes, layout, page transition (template.tsx), loading and 404 states
components/     interface components, one per visualisation or experiment
lib/nn.ts       network, activations, losses, seeded RNG (no UI code)
lib/datasets.ts two-dimensional classification datasets
hooks/useRaf.ts animation-frame loop used by the trainers
```

## How the network trains

`Network` in `lib/nn.ts` is a fully connected network: tanh hidden units and one sigmoid output. Each `step` is one epoch of full-batch gradient descent:

1. Forward pass for every sample.
2. Binary cross-entropy loss, `-[y ln p + (1-y) ln(1-p)]`.
3. Backpropagation. For a sigmoid output with cross-entropy the output delta is `p - y`; hidden deltas are `(Σ w·δ)(1 - a²)`.
4. Update `w ← w - (lr / N) Σ ∂L/∂w` and likewise for biases.

Training is seeded, so a run is reproducible. Every dataset reaches 100% training accuracy with the default settings; XOR is learned by the 2-4-1 network while a single neuron stays at chance.

## Accessibility and performance

Reduced-motion preferences disable the hero animation, reveals and page transitions. Controls are keyboard operable, touch targets are at least 44px, and live readouts use `aria-live`. Canvas drawing runs outside React state; only statistics trigger renders.

## References

- McCulloch & Pitts (1943), A logical calculus of the ideas immanent in nervous activity.
- Rumelhart, Hinton & Williams (1986), Learning representations by back-propagating errors.
- Goodfellow, Bengio & Courville (2016), Deep Learning.
# Neurolab
