const LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'tech', label: 'Tech' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

function go(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="foot-brand">
          <span className="brand-name">Divora Technology</span>
          <span className="brand-sub">Crafted code. Real results.</span>
        </div>
        <div className="foot-links">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} data-cursor="hover" onClick={go(l.id)}>
              {l.label}
            </a>
          ))}
        </div>
        <p className="foot-legal">
          © {year} Divora Technology. Owner: Khajani Devi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
