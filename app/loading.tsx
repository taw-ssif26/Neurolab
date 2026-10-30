export default function Loading() {
  return (
    <div className="wrap flex min-h-[60vh] items-center gap-3" role="status" aria-live="polite">
      <span className="status-dot" />
      <span className="label">Initialising network</span>
    </div>
  );
}
