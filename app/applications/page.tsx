import Box from "@/components/Box";

export const metadata = { title: "Applications | NEURO//LAB" };

const A = [
  ["Computer vision", "pk", "Networks can classify images, find objects in them and recognise faces. They work best when the pictures look like the ones they were trained on."],
  ["Natural language", "bl", "Language models translate, summarise and chat. The text sounds fluent, but that does not mean it is always correct."],
  ["Healthcare", "gr", "They help doctors by flagging things in scans and by screening possible medicines. A person still makes the final call."],
  ["Robotics", "ye", "Robots use networks to recognise objects and find their way around. Real environments are messy, so safety systems do not rely on a network alone."],
  ["Science", "pu", "Predicting protein structures, speeding up weather models and searching space data. They suggest ideas, but experiments still have to confirm them."],
];

const L = [
  ["Overfitting", "The network memorises its training data, noise included, and does badly on new data."],
  ["Biased data", "If the data is unfair, the network learns the unfairness."],
  ["Hard to explain", "You can see every weight and still not know why it made a certain decision."],
  ["Cost", "Big models need a lot of computing power and energy to train."],
  ["Hallucination", "Generative models sometimes make up things that sound true."],
  ["Reliability", "Performance can drop badly on inputs unlike anything seen in training."],
];

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-bold">Neural networks in the real world</h1>
      <p className="mt-2 max-w-2xl text-lg text-ink/70">
        Same idea as the lab, just with millions or billions of weights instead of a few dozen.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {A.map(([t, c, d]) => (
          <Box key={t} c={c}><h2 className="text-xl font-semibold">{t}</h2><p className="mt-2 text-sm">{d}</p></Box>
        ))}
      </div>

      <h2 className="mt-14 text-3xl font-bold">Limitations</h2>
      <p className="mt-2 text-sm">They are good at finding patterns, but they have real problems too.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {L.map(([t, d]) => (
          <div key={t} className="rounded-xl border-2 border-pk/40 bg-pk/10 p-4">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-1 text-sm">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
