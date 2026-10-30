import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-40">
      <p className="label">Error 404</p>
      <h1 className="h-display mt-4 text-5xl">No signal at this address.</h1>
      <Link href="/" className="btn mt-10">Return to overview</Link>
    </div>
  );
}
