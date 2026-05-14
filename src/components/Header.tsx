import { useEffect, useState } from 'react';

type NavItem = { id: string; label: string; cta?: boolean };

const NAV: NavItem[] = [
  { id: 'services', label: 'Services' },
  { id: 'tech', label: 'Tech' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Get in touch →', cta: true },
];

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section[id]')
    );
    if (sections.length === 0 || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(id);
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="siteHeader">
      <div className="container header-inner">
        <a href="#home" className="brand" data-cursor="hover" onClick={handleClick('home')}>
          <span className="brand-mark">
            <img src="/logo.svg" alt="Dishi Software Solutions" width={40} height={40} />
          </span>
          <span className="brand-text">
            <span className="brand-name">Dishi</span>
            <span className="brand-sub">Software Solutions</span>
          </span>
        </a>

        <nav className={`main-nav${open ? ' is-open' : ''}`} id="mainNav">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor="hover"
              className={`${item.cta ? 'nav-cta' : ''}${active === item.id ? ' active' : ''}`}
              onClick={handleClick(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          id="menuToggle"
          className={`menu-toggle${open ? ' is-open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
