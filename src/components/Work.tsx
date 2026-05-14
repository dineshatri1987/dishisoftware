import { Reveal } from './Reveal';

function scrollToId(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };
}

export function Work() {
  return (
    <section className="section work-section" id="work">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow"><span className="dot" /> Selected work</p>
          <h2>A taste of what we ship.</h2>
          <p className="lead">A glance at recent client projects — more available on request.</p>
        </Reveal>

        <Reveal as="article" className="work-card" data-cursor="hover">
          <div className="work-image">
            <iframe
              src="https://squareandcube.in/"
              loading="lazy"
              title="Square and Cube Company — website built by Dishi Software Solutions"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
            />
            <div className="work-image-overlay" />
          </div>
          <div className="work-meta">
            <span className="tag">Marketing website</span>
            <h3>Square &amp; Cube Company</h3>
            <p>
              A clean, responsive corporate website for Square &amp; Cube Company — designed and developed
              end-to-end by the Dishi team. Custom layouts, content sections and contact integration.
            </p>
            <ul className="work-stack">
              <li>HTML</li><li>CSS</li><li>ReactJS</li><li>JavaScript</li><li>jQuery</li>
            </ul>
            <a
              href="https://squareandcube.in/"
              target="_blank"
              rel="noreferrer"
              className="work-link"
              data-cursor="hover"
            >
              Visit squareandcube.in
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>

        <Reveal className="work-cta">
          <p>Want to see more case studies, code samples or references?</p>
          <a href="#contact" className="button ghost" data-cursor="hover" onClick={scrollToId('contact')}>
            Request portfolio →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
