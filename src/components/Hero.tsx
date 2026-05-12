import { useEffect, useRef, useState } from 'react';
import { ParticleCanvas } from './ParticleCanvas';
import { useTilt } from '../hooks/useTilt';
import { useCounter } from '../hooks/useCounter';

const ROTATIONS = [
  'scales beautifully.',
  'ships fast.',
  'feels effortless.',
  'drives revenue.',
];

const STATS = [
  { count: 40, label: 'Projects shipped' },
  { count: 25, label: 'Happy clients' },
  { count: 8,  label: 'Years in tech' },
  { count: 12, label: 'Technologies' },
];

function Stat({ count, label }: { count: number; label: string }) {
  const { ref, value } = useCounter(count);
  return (
    <div className="stat">
      <span className="num" ref={ref}>{value}</span>
      <span className="lbl">{label}</span>
    </div>
  );
}

function scrollToId(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };
}

export function Hero() {
  const trackRef = useRef<HTMLSpanElement | null>(null);
  const [idx, setIdx] = useState(0);
  const tiltRef = useTilt<HTMLDivElement>(8);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const t = window.setInterval(
      () => setIdx((i) => (i + 1) % ROTATIONS.length),
      2400
    );
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateY(-${idx * 100}%)`;
  }, [idx]);

  return (
    <section className="hero" id="home">
      <ParticleCanvas />
      <div className="hero-glow" />

      <div className="container hero-content">
        <div className="hero-text">
          <p className="eyebrow">
            <span className="dot" /> Noida, India · Available worldwide
          </p>
          <h1>
            We build software that{' '}
            <span className="rotator">
              <span className="rotator-track" ref={trackRef}>
                {ROTATIONS.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </span>
          </h1>
          <p className="hero-sub">
            Dishi Software Solutions is a Noida-based product studio. We design and engineer
            full-stack web applications with <strong>.NET, Python, Node.js</strong> on the backend
            and <strong>React, Vue and Next.js</strong> up front.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button primary" data-cursor="hover" onClick={scrollToId('contact')}>
              <span>Start a project</span>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work" className="button ghost" data-cursor="hover" onClick={scrollToId('work')}>
              See our work
            </a>
          </div>

          <div className="hero-stats">
            {STATS.map((s) => (
              <Stat key={s.label} count={s.count} label={s.label} />
            ))}
          </div>
        </div>

        <div className="hero-visual" ref={tiltRef}>
          <div className="visual-card">
            <div className="window-bar">
              <span /><span /><span />
              <em>~/dishi/app.tsx</em>
            </div>
            <pre className="code">
              <code>
                <span className="t-c">{`// Dishi Software Solutions`}</span>{'\n'}
                <span className="t-k">import</span>{' { '}<span className="t-v">Idea</span>{', '}<span className="t-v">Team</span>{', '}<span className="t-v">Code</span>{' } '}<span className="t-k">from</span>{' '}<span className="t-s">"dishi"</span>{';\n\n'}
                <span className="t-k">export const</span>{' '}<span className="t-f">build</span>{' = '}<span className="t-k">async</span>{' () => {\n'}
                {'  '}<span className="t-k">const</span>{' idea  = '}<span className="t-k">await</span>{' '}<span className="t-v">Idea</span>.<span className="t-f">listen</span>{'('}<span className="t-v">client</span>{');\n'}
                {'  '}<span className="t-k">const</span>{' team  = '}<span className="t-v">Team</span>.<span className="t-f">assemble</span>{'(['}<span className="t-s">".NET"</span>{', '}<span className="t-s">"Node"</span>{', '}<span className="t-s">"React"</span>{']);\n'}
                {'  '}<span className="t-k">return</span>{' '}<span className="t-v">Code</span>.<span className="t-f">ship</span>{'({ idea, team, '}<span className="t-v">love</span>{': '}<span className="t-n">true</span>{' });\n'}
                {'};'}
              </code>
            </pre>
          </div>

          <div className="floating-chip chip-1">⚛ React</div>
          <div className="floating-chip chip-2">.NET</div>
          <div className="floating-chip chip-3">Node.js</div>
          <div className="floating-chip chip-4">Next.js</div>
          <div className="floating-chip chip-5">Vue</div>
          <div className="floating-chip chip-6">Python</div>
        </div>
      </div>

      <a href="#services" className="scroll-hint" aria-label="Scroll down" onClick={scrollToId('services')}>
        <span />
      </a>
    </section>
  );
}
