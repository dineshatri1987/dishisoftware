const ITEMS = [
  '.NET', '★', 'Python', '★', 'Node.js', '★',
  'React', '★', 'Vue.js', '★', 'Next.js', '★',
  'JavaScript', '★', 'jQuery', '★', 'HTML / CSS', '★',
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section className="marquee-wrap" aria-hidden="true">
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((label, i) => (
            <span key={i} className={label === '★' ? 'is-accent' : ''}>{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
