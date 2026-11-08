const C: Record<string, string> = {
  pu: "border-pu",
  pk: "border-pk",
  ye: "border-ye",
  gr: "border-gr",
  bl: "border-bl",
};

export default function Box({ c = "pu", children }: { c?: string; children: React.ReactNode }) {
  return <div className={"rounded-xl border-t-4 bg-white p-5 shadow " + C[c]}>{children}</div>;
}
