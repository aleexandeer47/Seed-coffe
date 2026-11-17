/** Radiating rays, from the neon heart in the dining room and the salsa labels. */
export function Sunburst({ rays = 48, className = "" }: { rays?: number; className?: string }) {
  const lines = Array.from({ length: rays }, (_, i) => {
    const angle = (i / rays) * Math.PI * 2;
    const inner = 34;
    const outer = i % 2 === 0 ? 98 : 84;
    // Rounded so server and browser render identical markup (no hydration drift).
    const r = (n: number) => Math.round(n * 100) / 100;
    return {
      x1: r(100 + Math.cos(angle) * inner),
      y1: r(100 + Math.sin(angle) * inner),
      x2: r(100 + Math.cos(angle) * outer),
      y2: r(100 + Math.sin(angle) * outer),
    };
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round">
      {lines.map((l, i) => (
        <line key={i} {...l} strokeWidth={1.4} />
      ))}
      <circle cx="100" cy="100" r="22" strokeWidth={1.4} />
    </svg>
  );
}
