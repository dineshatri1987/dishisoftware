import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Service = {
  title: string;
  desc: string;
  bullets: string[];
  icon: ReactNode;
};

const SERVICES: Service[] = [
  {
    title: 'Web applications',
    desc: 'Production-grade SaaS, dashboards and customer portals built to scale, on a stack you can hire for.',
    bullets: ['SPA & SSR with React / Next.js / Vue', 'REST & GraphQL APIs', 'Auth, billing, multi-tenant'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 4v5" />
      </svg>
    ),
  },
  {
    title: 'Backend & APIs',
    desc: 'Robust services in .NET, Python and Node.js — with proper testing, observability and CI/CD baked in.',
    bullets: ['ASP.NET Core microservices', 'FastAPI & Django', 'Node.js / Express / NestJS'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 7h16M4 12h16M4 17h10" />
      </svg>
    ),
  },
  {
    title: 'Marketing websites',
    desc: 'Fast, accessible, brand-perfect sites that convert. Built with semantic HTML, JS and the right CMS.',
    bullets: ['Custom HTML / JS / jQuery', 'Headless CMS integrations', 'Core Web Vitals tuned'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: 'Maintenance & support',
    desc: 'Already shipped? We keep things healthy — security patches, performance work, feature releases.',
    bullets: ['Bug fixes & small features', 'Performance audits', 'Dedicated support email'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z" />
      </svg>
    ),
  },
  {
    title: 'Performance & SEO',
    desc: 'Slow site? We profile, prune and tune until pages load fast and search engines actually find them.',
    bullets: ['Lighthouse-driven tuning', 'Bundle splitting & caching', 'On-page SEO & schema'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      </svg>
    ),
  },
  {
    title: 'Integrations',
    desc: 'Payments, mail, CRMs, analytics, third-party APIs — we plug them in cleanly and keep them maintainable.',
    bullets: ['Stripe / Razorpay / PayPal', 'HubSpot / Salesforce / Zoho', 'Webhooks & queues'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLElement | null>(null);

  // Reveal-on-scroll + tilt + spotlight, all on the same DOM node.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let io: IntersectionObserver | null = null;
    if (!reduced && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      io.observe(el);
    } else {
      el.classList.add('is-visible');
    }

    if (!finePointer || reduced) return () => io?.disconnect();

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
      const rx = (y - 0.5) * -16;
      const ry = (x - 0.5) * 16;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <article ref={ref} className="service-card reveal" data-cursor="hover">
      <div className="service-icon">{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <ul>
        {service.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </article>
  );
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow"><span className="dot" /> What we do</p>
          <h2>Engineering services, end to end.</h2>
          <p className="lead">From the first whiteboard sketch to a production deploy — one team, full ownership.</p>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
