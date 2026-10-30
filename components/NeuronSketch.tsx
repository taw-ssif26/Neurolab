export default function NeuronSketch() {
  return (
    <svg viewBox="0 0 460 260" className="w-full" role="img" aria-label="Diagram of an artificial neuron: inputs, weights, summation, activation, output">
      <g stroke="#527BFF" strokeWidth="1.4" fill="none">
        <path d="M70 50L250 130M70 130L250 130M70 210L250 130" />
        <path d="M280 130H430" stroke="#55D6E8" />
      </g>
      <g fill="#080B10" stroke="#929EAD">
        {[50, 130, 210].map((y) => <circle key={y} cx={58} cy={y} r={12} />)}
      </g>
      <circle cx={265} cy={130} r={30} fill="#121923" stroke="#55D6E8" strokeWidth={2} />
      <g fontFamily="ui-monospace, monospace" fontSize={12} fill="#929EAD">
        <text x={51} y={54}>x₁</text><text x={51} y={134}>x₂</text><text x={51} y={214}>x₃</text>
        <text x={130} y={74}>w₁</text><text x={130} y={122}>w₂</text><text x={130} y={178}>w₃</text>
        <text x={249} y={134} fill="#F0B35A">Σ → f</text>
        <text x={253} y={182}>+ b</text>
        <text x={340} y={120} fill="#55D6E8">a = f(z)</text>
      </g>
    </svg>
  );
}
